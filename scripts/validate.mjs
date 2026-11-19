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

/* 2. JSON validation (all repo JSON files + manifest) */
const jsonFiles = walk('.', '.json').filter((f) => !f.startsWith('.git') && !f.startsWith('.agents'));
for (const f of jsonFiles) {
  try {
    const data = JSON.parse(read(f));
    checks++;
    if (f === 'manifest.json') {
      for (const ic of data.icons || []) ok(exists(ic.src), `manifest icon missing: ${ic.src}`);
    }
  } catch (e) {
    fail(`json syntax: ${f}: ${e.message}`);
  }
}

/* 3. HTML validation (index.html structure, tags, references, unique ids) */
const html = read('index.html');
ok(/<!doctype html>/i.test(html), 'index.html missing <!DOCTYPE html>');
ok(/<html[^>]*lang=["'](?:en|zh)["'][^>]*>/i.test(html), 'index.html missing <html lang="...">');
ok(/<head>[\s\S]*<\/head>/i.test(html), 'index.html missing <head>...</head>');
ok(/<body>[\s\S]*<\/body>/i.test(html), 'index.html missing <body>...</body>');

const refs = [...html.matchAll(/<(?:script|link)[^>]+(?:src|href)="([^"#?]+)"/g)].map((m) => m[1]).filter((u) => !/^(https?:)?\/\//.test(u));
for (const r of refs) ok(exists(r), `index.html references missing file: ${r}`);

const imgRefs = [...html.matchAll(/<img[^>]+src="([^"#?]+)"/g)].map((m) => m[1]).filter((u) => !/^(https?:)?\/\//.test(u) && !u.startsWith('data:'));
for (const img of imgRefs) ok(exists(img), `index.html img missing on disk: ${img}`);

// Tag balance validation (excluding void and self-closing elements)
const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const cleanHtml = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '');
const tagMatches = cleanHtml.matchAll(/<\/?([a-zA-Z0-9-]+)(?:\s+[^>]*)?\/?>/g);
const tagStack = [];
for (const m of tagMatches) {
  const full = m[0];
  const tag = m[1].toLowerCase();
  if (voidTags.has(tag) || full.endsWith('/>')) continue;
  if (full.startsWith('</')) {
    const last = tagStack.pop();
    if (last !== tag) {
      fail(`index.html mismatched tag: expected </${last}>, found </${tag}>`);
      break;
    }
  } else {
    tagStack.push(tag);
  }
}
ok(tagStack.length === 0, `index.html unclosed tags: ${tagStack.join(', ')}`);

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
for (const svg of walk('assets/airlines', '.svg')) ok(assets.includes(svg), `sw.js STATIC_ASSETS lacks ${svg}`);

/* 5. CSS validation: syntax, balance, and linking */
for (const f of walk('css', '.css')) {
  ok(refs.includes(f), `css file not linked by index.html: ${f}`);
  const css = read(f);
  const stripped = css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, '""');
  const openBraces = (stripped.match(/\{/g) || []).length;
  const closeBraces = (stripped.match(/\}/g) || []).length;
  ok(openBraces === closeBraces, `css syntax in ${f}: mismatched braces (${openBraces} open, ${closeBraces} close)`);

  const openParens = (stripped.match(/\(/g) || []).length;
  const closeParens = (stripped.match(/\)/g) || []).length;
  ok(openParens === closeParens, `css syntax in ${f}: mismatched parens (${openParens} open, ${closeParens} close)`);
}
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
const ITIN = ctx.ITINERARY_DATA || ctx.window.ITINERARY_DATA;
ok(Array.isArray(ITIN) && ITIN.length === 7, `Itinerary should have 7 days, Dec 25-31 (got ${ITIN && ITIN.length})`);
if (Array.isArray(ITIN)) {
  ITIN.forEach((d, i) => ok(d.date === `Dec ${25 + i}`, `day ${i + 1} should be dated Dec ${25 + i} (got ${d.date})`));
  for (const d of ITIN) for (const b of d.blocks) for (const o of (b.activity.options || [])) {
    ok(o.label && o.label.en && o.label.zh && Array.isArray(o.places) && o.places.length > 0, `${d.id}: activity option needs a bilingual label and places`);
  }
}
ok(!!ctx.SITE_DATA, 'SITE_DATA not defined');
const FL = ctx.FLIGHTS_DATA;
ok(FL && Array.isArray(FL.routes) && FL.routes.length > 0, 'FLIGHTS_DATA.routes missing');
const expandedOutboundRoutes = new Set(['edi-to-tokyo-b', 'lhr-to-tokyo-b']);
if (FL && FL.routes) {
  for (const r of FL.routes) {
    const withinCap = expandedOutboundRoutes.has(r.id) || r.options.length <= 5;
    ok(Array.isArray(r.options) && r.options.length > 0 && withinCap, `route ${r.id || '?'} option count invalid (${r.options && r.options.length})`);
  }
}

/* 7a. budget: hand-typed totals must equal the sum of their rows */
{
  const b = ctx.SITE_DATA && ctx.SITE_DATA.budget;
  ok(b && Array.isArray(b.items) && b.total, 'budget missing');
  if (b && b.items) {
    const sum = (k) => b.items.reduce((s, i) => s + i[k], 0);
    ok(sum('min') === b.total.min, `budget: sum of min (${sum('min')}) != total.min (${b.total.min})`);
    ok(sum('max') === b.total.max, `budget: sum of max (${sum('max')}) != total.max (${b.total.max})`);
  }
}

/* 7a2. hotels: the cards must cover each night of the trip (Dec 25-30, 6 nights) exactly once */
const dayNum = (s) => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d) / 864e5; };
const nightsOf = (list) => list.flatMap((l) => { const out = []; for (let n = dayNum(l.checkin); n < dayNum(l.checkout); n++) out.push(n); return out; }).sort((a, b) => a - b);
const tripNights = Array.from({ length: 6 }, (_, i) => dayNum('2026-12-25') + i);
{
  const h = ctx.SITE_DATA && ctx.SITE_DATA.hotels;
  ok(h && h.legs, 'hotels missing legs');
  if (h && h.legs) ok(JSON.stringify(nightsOf(h.legs)) === JSON.stringify(tripNights), 'hotels.legs must cover each night of the trip exactly once');
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
  const allowedMultiAirlines = new Set([
    'British Airways', 'Finnair', 'Lufthansa', 'SWISS',
    'Austrian', 'Austrian Airlines', 'LOT Polish Airlines', 'Etihad Airways',
  ]);
  for (const r of FL.routes) {
    let prevOpt = null;
    for (const opt of r.options || []) {
      const legs = opt.legs || [];
      const f = legs[0];
      const l = legs[legs.length - 1];
      ok(legs.length > 0, `option ${opt.id} has no legs`);
      for (const leg of legs) {
        ok(leg.from in AIRPORT_TZ_OFFSETS && leg.to in AIRPORT_TZ_OFFSETS, `airport unknown in option ${opt.id} (${leg.from}-${leg.to})`);
      }
      for (let i = 0; i < legs.length - 1; i++) {
        const cur = legs[i];
        const nxt = legs[i + 1];
        ok(cur.to === nxt.from, `option ${opt.id} leg ${i + 1}→${i + 2} airport mismatch: ${cur.to} != ${nxt.from}`);
        if (cur.to in AIRPORT_TZ_OFFSETS && nxt.from in AIRPORT_TZ_OFFSETS) {
          ok(parseUtcMs(nxt.dep, nxt.from) > parseUtcMs(cur.arr, cur.to), `option ${opt.id} leg ${i + 1}→${i + 2} non-positive layover`);
        }
      }
      if (f && l && f.from in AIRPORT_TZ_OFFSETS && l.to in AIRPORT_TZ_OFFSETS) {
        const depUtc = parseUtcMs(f.dep, f.from);
        const arrUtc = parseUtcMs(l.arr, l.to);
        const durMs = arrUtc - depUtc;
        const durHours = durMs / 3600000;
        ok(durHours > 1 && durHours < 35, `flight duration for ${opt.id} unreasonable: ${durHours.toFixed(1)}h`);
        if (expandedOutboundRoutes.has(r.id)) {
          ok(f.dep.startsWith('2026-12-24'), `option ${opt.id} must depart 2026-12-24 (got ${f.dep})`);
          ok(['HND', 'NRT'].includes(l.to), `option ${opt.id} must arrive HND or NRT (got ${l.to})`);
          ok(l.arr.slice(0, 10) <= '2026-12-25', `option ${opt.id} must arrive on or before 2026-12-25 (got ${l.arr})`);
          if (r.id === 'edi-to-tokyo-b') {
            const hasLhrTransit = legs.slice(0, -1).some((leg) => leg.to === 'LHR');
            ok(legs.length <= (hasLhrTransit ? 3 : 2), `option ${opt.id} exceeds leg limit (${legs.length} legs, LHR transit: ${hasLhrTransit})`);
          } else if (r.id === 'lhr-to-tokyo-b') {
            ok(legs.length <= 2, `option ${opt.id} exceeds 2-leg limit (${legs.length} legs)`);
            if (legs.length > 1) {
              for (const leg of legs) ok(allowedMultiAirlines.has(leg.airline), `option ${opt.id} uses disallowed multi-leg airline "${leg.airline}"`);
            }
          }
        }
        if (prevOpt) {
          const inOrder = prevOpt.durMs < durMs
            || (prevOpt.durMs === durMs && (prevOpt.stops < legs.length || (prevOpt.stops === legs.length && prevOpt.arrUtc <= arrUtc)));
          ok(inOrder, `route ${r.id}: ${opt.id} (${(durMs / 60000)}m) out of sort order after ${prevOpt.id} (${(prevOpt.durMs / 60000)}m)`);
        }
        prevOpt = { id: opt.id, durMs, stops: legs.length, arrUtc };
      }
    }
  }
}

/* 8. CSVs exist in data-src and are not deployed paths */
ok(exists('data-src/flights'), 'data-src/flights missing');
ok(!html.includes('data-src/'), 'index.html must not reference data-src/');

/* 8b. CSV-first rule (AGENTS.md): every curated leg in flights-data.js must exist in its route's CSV archive.
       CSV may hold more candidate legs than the curated options. File: <route id with _>_<yyyymmdd>.csv */
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

/* 9. flight dates and logos: every option lands by its route's `arrive` date; every airline has a logo */
const logoSrc = read('js/features/flights.js');
const logoByAirline = Object.fromEntries([...logoSrc.matchAll(/'([^']+)':\s+'(assets\/airlines\/[^']+)'/g)].map((m) => [m[1], m[2]]));
if (FL && FL.routes) {
  for (const r of FL.routes) {
    for (const o of r.options) {
      const last = o.legs[o.legs.length - 1];
      ok(!r.arrive || last.arr.slice(0, 10) <= r.arrive, `route ${r.id} option ${o.id} lands ${last.arr.slice(0, 10)}, after arrive ${r.arrive}`);
      for (const l of o.legs) ok(logoByAirline[l.airline] && exists(logoByAirline[l.airline]), `no airline logo for "${l.airline}" (option ${o.id})`);
    }
  }
}

/* 10. content rules from .agents/AGENTS.md: British spelling, no family labels, no Simplified Chinese in data files */
for (const f of ['data/site-data.js', 'data/itinerary-data.js']) {
  const src = read(f);
  const us = src.match(/\b(tires?|sulfur|specialties|mesmerizing|cozy|5-story|Savor|favorite|traveling|canceled)\b/);
  ok(!us, `${f}: American spelling "${us && us[0]}" (use British English)`);
  const pii = src.match(/\b(Mum|Mother|Father)\b/);
  ok(!pii, `${f}: family label "${pii && pii[0]}" must not appear on the public site`);
  const simp = src.match(/[传饱们这说]/);
  ok(!simp, `${f}: Simplified Chinese character "${simp && simp[0]}" (use HK Traditional)`);
}

console.log(`${checks} checks run.`);
if (failures.length) { console.error('\nFAILED:\n - ' + failures.join('\n - ')); process.exit(1); }
console.log('All validation checks passed.');
