import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

function makeClassList() {
  const set = new Set();
  return {
    add: (...c) => c.forEach((x) => set.add(x)),
    remove: (...c) => c.forEach((x) => set.delete(x)),
    toggle: (c, force) => (force === undefined ? (set.has(c) ? set.delete(c) : set.add(c)) : (force ? set.add(c) : set.delete(c))),
    contains: (c) => set.has(c),
  };
}

test('currency.js: normalise, rounding, invalid storage fallback, and blocked storage', () => {
  const store = { 'user-curr': 'eur' };
  const valEl = {
    attrs: { 'data-min': '183330', 'data-max': '183330' },
    classList: makeClassList(),
    innerHTML: '',
    getAttribute(k) { return this.attrs[k] ?? null; },
  };
  const pairEl = { textContent: '' };

  const ctx = {
    console,
    localStorage: {
      getItem: (k) => store[k] ?? null,
      setItem: (k, v) => { store[k] = String(v); },
    },
    document: {
      body: { classList: makeClassList() },
      querySelector: () => null,
      querySelectorAll: (sel) => (sel === '.converted-val' ? [valEl] : sel === '.live-rate-pair' ? [pairEl] : []),
    },
  };
  ctx.window = ctx;
  vm.createContext(ctx);
  vm.runInContext(read('js/currency.js'), ctx);

  assert.equal(ctx.normaliseCurrency('gbp'), 'gbp');
  assert.equal(ctx.normaliseCurrency('hkd'), 'hkd');
  assert.equal(ctx.normaliseCurrency('usd'), 'hkd');
  assert.equal(ctx.normaliseCurrency(null), 'hkd');

  // Invalid stored currency falls back to HKD ($9,300 rounded to nearest 100)
  ctx.updateConvertedBudgets();
  assert.equal(valEl.innerHTML, '$9,300');
  assert.equal(pairEl.textContent, '1 HKD = 19.61 JPY');

  // GBP rounds to nearest £5
  ctx.setCurrency('gbp');
  assert.equal(store['user-curr'], 'gbp');
  assert.equal(valEl.innerHTML, '£915');

  // Blocked localStorage must not throw
  ctx.localStorage = {
    getItem: () => { throw new Error('SecurityError'); },
    setItem: () => { throw new Error('SecurityError'); },
  };
  assert.doesNotThrow(() => ctx.setCurrency('gbp'));
  assert.equal(valEl.innerHTML, '£915');
});

test('flights.js: UTC duration across time zones, unknown airports, and aria-selected', () => {
  const tabs = [
    { attrs: { 'aria-selected': 'true' }, classList: makeClassList(), setAttribute(k, v) { this.attrs[k] = v; } },
    { attrs: { 'aria-selected': 'false' }, classList: makeClassList(), setAttribute(k, v) { this.attrs[k] = v; } },
  ];
  const panels = [{ classList: makeClassList() }, { classList: makeClassList() }];
  const flightsEl = { innerHTML: '' };

  const ctx = {
    console,
    document: {
      body: { classList: makeClassList() },
      getElementById: (id) => (id === 'flights-section-content' ? flightsEl : null),
      querySelectorAll: (sel) => (sel === '.flights-route-tab' ? tabs : sel === '.flights-route-panel' ? panels : []),
    },
    FLIGHTS_DATA: {
      tz: { LHR: 0, HND: 9, HKG: 8, EDI: 0 },
      routes: [
        {
          id: 'r1',
          label: { en: 'London → Tokyo', zh: '倫敦 → 東京' },
          date: { en: '24 Dec', zh: '12月24日' },
          options: [
            {
              id: 'o1',
              label: { en: 'Direct', zh: '直航' },
              airline: 'British Airways',
              legs: [{ airline: 'British Airways', flight: 'BA7', from: 'LHR', to: 'HND', dep: '2026-12-24 09:10', arr: '2026-12-25 07:35' }],
            },
            {
              id: 'o2',
              label: { en: 'Unknown', zh: '未知' },
              airline: 'British Airways',
              legs: [{ airline: 'British Airways', flight: 'BA0', from: 'XXX', to: 'HND', dep: '2026-12-24 09:10', arr: '2026-12-25 07:35' }],
            },
          ],
        },
        {
          id: 'r2',
          label: { en: 'HK → EDI', zh: '香港 → 愛丁堡' },
          date: { en: '21 Jan', zh: '1月21日' },
          options: [
            {
              id: 'o3',
              label: { en: 'One stop', zh: '轉機' },
              airline: 'Cathay Pacific',
              legs: [{ airline: 'Cathay Pacific', flight: 'CX251', from: 'HKG', to: 'EDI', dep: '2027-01-21 23:00', arr: '2027-01-22 09:00' }],
            },
          ],
        },
      ],
    },
  };
  ctx.window = ctx;
  vm.createContext(ctx);
  vm.runInContext(read('js/features/flights.js'), ctx);

  ctx.renderFlights();
  assert.match(flightsEl.innerHTML, /Non-stop · 13h 25m/);
  assert.match(flightsEl.innerHTML, /Non-stop · 18h 0m/);
  assert.doesNotMatch(flightsEl.innerHTML, /NaN/);
  assert.match(flightsEl.innerHTML, /aria-selected="true"\s+id="flights-tab-0"/);

  ctx.flightsSelectTab(1);
  assert.equal(tabs[0].attrs['aria-selected'], 'false');
  assert.equal(tabs[1].attrs['aria-selected'], 'true');
  assert.equal(tabs[1].classList.contains('active'), true);
  assert.equal(panels[1].classList.contains('active'), true);
});

test('weather.js: patches live Open-Meteo badges for Dec and Jan dates and ignores offline failures', async () => {
  const RealDate = Date;
  const fixedNow = new RealDate('2026-12-20T00:00:00Z');
  class FakeDate extends RealDate {
    constructor(...args) { super(...(args.length ? args : [fixedNow.getTime()])); }
    static now() { return fixedNow.getTime(); }
  }

  const badges = {
    '#day-1 .day-weather': { outerHTML: '<span class="day-weather">old</span>' },
    '#day-7 .day-weather': { outerHTML: '<span class="day-weather">old</span>' },
  };
  const itin = [
    { id: 'day-1', date: 'Dec 25', region: 'tokyo', weather: { icon: '☀️', high: '12°C', low: '4°C', condition: { en: 'Old', zh: '舊' } } },
    { id: 'day-7', date: 'Jan 1', region: 'tokyo', weather: { icon: '☀️', high: '11°C', low: '3°C', condition: { en: 'Old', zh: '舊' } } },
  ];

  const ctx = {
    console: { info: () => {}, warn: () => {} },
    Date: FakeDate,
    AbortController,
    setTimeout,
    clearTimeout,
    ITINERARY_DATA: itin,
    weatherBadgeHtml: (d) => `<span class="day-weather">${d.weather.icon} ${d.weather.high}/${d.weather.low}</span>`,
    document: { querySelector: (s) => badges[s] ?? null },
    fetch: async () => ({
      ok: true,
      json: async () => ({
        daily: {
          time: ['2026-12-25', '2027-01-01'],
          temperature_2m_max: [10.6, 8.2],
          temperature_2m_min: [1.4, -0.6],
          weather_code: [1, 71],
        },
      }),
    }),
  };
  ctx.window = ctx;
  vm.createContext(ctx);
  vm.runInContext(read('js/features/weather.js'), ctx);

  await ctx.fetchLiveWeather();
  assert.equal(itin[0].weather.high, '11°C');
  assert.equal(itin[0].weather.low, '1°C');
  assert.equal(itin[0].weather.icon, '🌤️');
  assert.equal(itin[1].weather.high, '8°C');
  assert.equal(itin[1].weather.low, '-1°C');
  assert.equal(itin[1].weather.icon, '🌨️');
  assert.equal(badges['#day-7 .day-weather'].outerHTML, '<span class="day-weather">🌨️ 8°C/-1°C</span>');

  // Offline fetch failure falls back silently
  ctx.fetch = async () => { throw new Error('offline'); };
  await assert.doesNotReject(() => ctx.fetchLiveWeather());
});
