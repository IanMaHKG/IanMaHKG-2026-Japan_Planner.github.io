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
ok(refs.indexOf('css/responsive.css') === refs.filter((r) => r.endsWith('.css')).slice(-1).length ? true : refs.filter((r) => r.endsWith('.css')).pop() === 'css/responsive.css', 'css/responsive.css must be the last stylesheet');

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
ok(Array.isArray(B) && B.length === 12, `Plan B should have 12 days (got ${B && B.length})`);
ok(!!ctx.SITE_DATA, 'SITE_DATA not defined');
const FL = ctx.FLIGHTS_DATA;
ok(FL && Array.isArray(FL.routes) && FL.routes.length === 6, `FLIGHTS_DATA should have 6 routes (got ${FL && FL.routes && FL.routes.length})`);
if (FL && FL.routes) for (const r of FL.routes) ok(Array.isArray(r.options) && r.options.length <= 5 && r.options.length > 0, `route ${r.id || r.key || '?'} must have 1-5 options`);

/* 8. CSVs exist in data-src and are not deployed paths */
ok(exists('data-src/flights'), 'data-src/flights missing');
ok(!html.includes('data-src/'), 'index.html must not reference data-src/');

console.log(`${checks} checks run.`);
if (failures.length) { console.error('\nFAILED:\n - ' + failures.join('\n - ')); process.exit(1); }
console.log('All validation checks passed.');
