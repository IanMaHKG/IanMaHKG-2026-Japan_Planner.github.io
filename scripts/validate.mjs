#!/usr/bin/env node
/**
 * scripts/validate.mjs — dev/CI-only checks (no runtime build step).
 * Usage: node scripts/validate.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const exists = (f) => fs.existsSync(path.join(root, f));
const failures = [];
const fail = (m) => failures.push(m);
let checks = 0;
const ok = (cond, msg) => { checks++; if (!cond) fail(msg); };

const walk = (dir, ext, out = []) => {
  for (const e of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = path.posix.join(dir, e.name);
    if (e.isDirectory()) walk(rel, ext, out);
    else if (e.name.endsWith(ext)) out.push(rel);
  }
  return out;
};

/* 1. JS syntax */
for (const f of [...walk('js', '.js'), ...walk('data', '.js'), 'sw.js']) {
  try { new vm.Script(read(f), { filename: f }); checks++; } catch (e) { fail(`syntax: ${f}: ${e.message}`); }
}

/* 2. manifest */
let manifest;
try { manifest = JSON.parse(read('manifest.json')); checks++; } catch (e) { fail('manifest.json invalid: ' + e.message); }
if (manifest) for (const ic of manifest.icons || []) ok(exists(ic.src), `manifest icon missing: ${ic.src}`);

/* 3. index.html references + unique ids */
const html = read('index.html');
const refs = [...html.matchAll(/<(?:script|link)[^>]+(?:src|href)="([^"#?]+)"/g)].map((m) => m[1]).filter((u) => !/^(https?:)?\/\//.test(u));
for (const r of refs) ok(exists(r), `index.html references missing file: ${r}`);

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
ok(dup.length === 0, `duplicate ids in index.html: ${[...new Set(dup)].join(', ')}`);
const hashes = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
for (const h of new Set(hashes)) ok(ids.includes(h), `anchor #${h} has no target id`);

/* 4. service worker asset list <-> files used by index.html */
const swSrc = read('sw.js');
const assets = [...swSrc.matchAll(/'\.\/([^']+)'/g)].map((m) => m[1]).filter((a) => /\.(css|js|json|svg|png|webp|html)$/.test(a));
for (const a of assets) ok(exists(a), `sw.js asset missing on disk: ${a}`);
for (const r of refs.filter((x) => /\.(css|js)$/.test(x))) ok(assets.includes(r), `sw.js STATIC_ASSETS lacks ${r}`);

/* 5. CSS: every file in css/ is linked (no dead stylesheets) */
for (const f of walk('css', '.css')) ok(refs.includes(f), `css file not linked by index.html: ${f}`);
const cssRefs = refs.filter((r) => r.endsWith('.css'));
ok(cssRefs.at(-1) === 'css/responsive.css', 'css/responsive.css must be the last stylesheet');

/* 5b. MapLibre: exact version + integrity in index.html, and precached by sw.js (offline maps) */
const mapTags = [...html.matchAll(/<(?:script|link)[^>]+https:\/\/unpkg\.com\/maplibre-gl@([^/"]+)\/dist\/[^"]+"[^>]*>/g)];
ok(mapTags.length === 2, `index.html should load maplibre js + css from unpkg (found ${mapTags.length})`);
for (const m of mapTags) {
  ok(/^\d+\.\d+\.\d+$/.test(m[1]), `MapLibre version must be exact, got @${m[1]}`);
  ok(/integrity="sha384-/.test(m[0]), 'MapLibre tag needs an integrity attribute');
  const url = m[0].match(/https:\/\/unpkg\.com\/[^"]+/)[0];
  ok(swSrc.includes(`'${url}'`), `sw.js STATIC_ASSETS must precache ${url}`);
}

/* 6. features load before render.js, render.js before ui.js/script.js */
const scripts = refs.filter((r) => r.endsWith('.js'));
const idx = (s) => scripts.indexOf(s);
for (const f of walk('js/features', '.js')) ok(idx(f) !== -1 && idx(f) < idx('js/render.js'), `${f} must load before js/render.js`);
ok(idx('js/render.js') < idx('js/script.js'), 'render.js must load before script.js');

/* 7. data integrity */
const ctx = { window: {}, console };
ctx.window = ctx; vm.createContext(ctx);
for (const f of ['data/site-data.js', 'data/itinerary-data.js', 'data/flights/flights-data.js']) {
  try { vm.runInContext(read(f), ctx, { filename: f }); checks++; } catch (e) { fail(`data load: ${f}: ${e.message}`); }
}
const A = ctx.ITINERARY_DATA_A || ctx.window.ITINERARY_DATA_A;
const B = ctx.ITINERARY_DATA_B || ctx.window.ITINERARY_DATA_B;
ok(Array.isArray(A) && A.length === 12, `Plan A should have 12 days, Dec 20-31 (got ${A && A.length})`);
ok(Array.isArray(B) && B.length === 7, `Plan B should have 7 days (got ${B && B.length})`);
ok(!!ctx.SITE_DATA, 'SITE_DATA not defined');
const FL = ctx.FLIGHTS_DATA;
ok(FL && Array.isArray(FL.routes) && FL.routes.length > 0, 'FLIGHTS_DATA.routes missing');
if (FL && FL.routes) {
  for (const r of FL.routes) {
    ok(Array.isArray(r.options) && r.options.length <= 5 && r.options.length > 0, `route ${r.id || '?'} must have 1-5 options`);
    ok(!r.plans || r.plans.every((p) => p === 'plan-a' || p === 'plan-b'), `route ${r.id} has an invalid plans value`);
  }
  for (const p of ['plan-a', 'plan-b']) ok(FL.routes.some((r) => !r.plans || r.plans.includes(p)), `no flight routes visible on ${p}`);
}

/* 7a. budget: hand-typed totals must equal the sum of their rows, per plan */
for (const p of ['planA', 'planB']) {
  const b = ctx.SITE_DATA && ctx.SITE_DATA.budget && ctx.SITE_DATA.budget[p];
  ok(b && Array.isArray(b.items) && b.total, `budget.${p} missing`);
  if (!b || !b.items) continue;
  const sum = (k) => b.items.reduce((s, i) => s + i[k], 0);
  ok(sum('min') === b.total.min, `budget.${p}: sum of min (${sum('min')}) != total.min (${b.total.min})`);
  ok(sum('max') === b.total.max, `budget.${p}: sum of max (${sum('max')}) != total.max (${b.total.max})`);
}

/* 7a2. hotels: nights covered by the search pills must equal nights covered by the cards,
        with no gap or overlap (Plan A: Dec 20-30, 11 nights; Plan B: Dec 25-30, 6 nights) */
const dayNum = (s) => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d) / 864e5; };
const nightsOf = (list) => list.flatMap((l) => { const out = []; for (let n = dayNum(l.checkin); n < dayNum(l.checkout); n++) out.push(n); return out; }).sort((a, b) => a - b);
const tripNightsMap = {
  planA: Array.from({ length: 11 }, (_, i) => dayNum('2026-12-20') + i),
  planB: Array.from({ length: 6 }, (_, i) => dayNum('2026-12-25') + i),
};
for (const p of ['planA', 'planB']) {
  const h = ctx.SITE_DATA && ctx.SITE_DATA.hotels && ctx.SITE_DATA.hotels[p];
  ok(h && h.quickLegs && h.legs, `hotels.${p} missing quickLegs/legs`);
  if (!h || !h.quickLegs || !h.legs) continue;
  const expectedNights = tripNightsMap[p];
  ok(JSON.stringify(nightsOf(h.legs)) === JSON.stringify(expectedNights), `hotels.${p}.legs must cover each night of trip exactly once`);
  ok(JSON.stringify(nightsOf(h.quickLegs)) === JSON.stringify(expectedNights), `hotels.${p}.quickLegs must cover each night of trip exactly once`);
}

/* 7b. flight options: valid duration calculations across airport time zones (offsets: FLIGHTS_DATA.tz) */
const AIRPORT_TZ_OFFSETS = (FL && FL.tz) || {};
const parseUtcMs = (dtStr, iata) => {
  const offsetHours = AIRPORT_TZ_OFFSETS[iata] ?? 0;
  const [datePart, timePart] = dtStr.split(' ');
  const [y, m, d] = datePart.split('-').map(Number);
  const [hh, mm] = timePart.split(':').map(Number);
  return Date.UTC(y, m - 1, d, hh - offsetHours, mm);
};
if (FL && FL.routes) {
  for (const r of FL.routes) {
    for (const opt of r.options || []) {
      const f = opt.legs && opt.legs[0];
      const l = opt.legs && opt.legs[opt.legs.length - 1];
      ok(f && l && f.from in AIRPORT_TZ_OFFSETS && l.to in AIRPORT_TZ_OFFSETS, `airport unknown in option ${opt.id}`);
      if (f && l && f.from in AIRPORT_TZ_OFFSETS && l.to in AIRPORT_TZ_OFFSETS) {
        const durHours = (parseUtcMs(l.arr, l.to) - parseUtcMs(f.dep, f.from)) / 3600000;
        ok(durHours > 1 && durHours < 35, `flight duration for ${opt.id} unreasonable: ${durHours.toFixed(1)}h`);
      }
    }
  }
}

/* 8. CSVs exist in data-src and are not deployed paths */
ok(exists('data-src/flights'), 'data-src/flights missing');
ok(!html.includes('data-src/'), 'index.html must not reference data-src/');

/* 8b. CSV-first rule (AGENTS.md): every curated leg in flights-data.js must exist in its route's CSV archive.
       CSV may hold more candidate legs than the 5 curated options. File: <route id with _>_<yyyymmdd>.csv */
const norm = (s) => s.replace(/\s+/g, '');
const csvFiles = fs.readdirSync(path.join(root, 'data-src/flights')).filter((f) => f.endsWith('.csv'));
if (FL && FL.routes) {
  for (const r of FL.routes) {
    const prefix = r.id.replace(/-/g, '_') + '_';
    const csv = csvFiles.find((f) => f.startsWith(prefix));
    ok(!!csv, `no CSV in data-src/flights for route ${r.id} (expected ${prefix}<yyyymmdd>.csv)`);
    if (!csv) continue;
    const rows = read(`data-src/flights/${csv}`).trim().split(/\r?\n/).slice(1).map((l) => l.split(','));
    const have = new Set(rows.map((c) => `${norm(c[1])}|${c[2]}|${c[3]}|${c[4]}|${c[5]}`));
    for (const o of r.options) for (const l of o.legs) {
      ok(have.has(`${norm(l.flight)}|${l.from}|${l.to}|${l.dep}|${l.arr}`), `${csv} lacks leg ${l.flight} ${l.from}-${l.to} ${l.dep} (option ${o.id})`);
    }
  }
}

console.log(`${checks} checks run.`);
if (failures.length) { console.error('\nFAILED:\n - ' + failures.join('\n - ')); process.exit(1); }
console.log('All validation checks passed.');
