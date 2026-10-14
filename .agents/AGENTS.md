# Japan Trip Planner — Agent Rules
# ──────────────────────────────────────────────────────────────────────
# These rules apply to ALL AI-assisted work on this repository.
# Read and follow them before writing or editing any content.
# ──────────────────────────────────────────────────────────────────────

## Documentation Integrity & Anti-Drift Rule (CRITICAL)

- **Mandatory Review on Every Change:** Whenever ANY code, architecture, directory structure, data schema, styling token, or feature change is made, the agent **MUST** immediately review and update all relevant markdown files (`README.md`, `.agents/AGENTS.md`, and active artifacts/walkthroughs).
- **Zero Documentation Drift:** Documentation must always strictly match the living code. Never allow file paths, architectural diagrams, feature descriptions, or design token references to become outdated.
- **British English in Documentation:** All markdown files, code comments, and documentation must adhere to British English conventions (see Language Style Rules below).

---

## Pre-Response Checklist (MANDATORY)

Before making **any** code change, data edit, or documentation update, the agent **MUST** silently verify all of the following:

- [ ] **British English** — All English prose uses British spellings: `tyres` (not tires), `colour` (not color), `licence` (not license), `travelling` (not traveling), `organise` (not organize), etc.
- [ ] **HK Traditional Chinese** — All `zh:` fields use Hong Kong Traditional Chinese (繁體中文, natural HK register). No Simplified characters, no Mainland/Taiwan-specific vocabulary.
- [ ] **Bilingual completeness** — Every user-facing string has **both** an `en:` and a `zh:` field updated. Never update one without the other.
- [ ] **No orphan grid rows** — No card grid may end with a single item alone on the last row (2+1, 4+1, 5+1 layouts are forbidden). Use the explicit grid rules in the *Column / Grid Layout Rule* section below.
- [ ] **Data-driven pattern** — Displayed text lives in `data/site-data.js` or `data/itinerary-data.js`, never hard-coded into `index.html` or `js/render.js` unless it is a structural shell label.
- [ ] **Documentation updated** — If architecture, file structure, features, or design tokens changed, `README.md` and this `AGENTS.md` have been updated to match **before** the response is finalised.
- [ ] **Flight Selection & Long-Haul Airline Preference** — If editing or adding flight routes: (1) All legs must be live-verified via Google Flights, or Kayak (`kayak.co.uk`) when Google Flights is unavailable, by opening each result's details panel; (2) Only flights **operated by the selling airline itself** — exclude codeshares/wet-leases (e.g. JAL-operated flights sold as BA, Finnair-operated flights sold as BA); record the **operating carrier's flight number**; (3) Long-haul (intercontinental) legs MUST strictly adhere to the priority hierarchy: 1st: BA / Iberia (oneworld), 2nd: Finnair (oneworld), 3rd: Lufthansa / SWISS / Austrian (Star Alliance), 4th: Etihad Airways; (4) Options ordered by total journey time (shortest first); (5) CSV created first in `data-src/flights/` before updating `flights-data.js`; (6) Both depart and arrive dates recorded; (7) Max 5 best options per route.
- [ ] **Privacy / PII** — No personal names, specific family member labels, or home city details exposed in any user-visible text.

> **Tip for the agent:** If any box cannot be ticked, fix the issue before proceeding. Do not respond with a partially compliant change.

---

## Language Style Rules

### English — Use British English (NOT American English)

All English-language content in `data/site-data.js`, `data/itinerary-data.js`,
`index.html`, `js/render.js`, `README.md`, and any other human-readable
file **must use British English spelling and conventions**.

#### Key spelling differences to enforce

| ❌ American (avoid) | ✅ British (use) |
|---|---|
| color (in prose) | colour |
| organize / recognize / realize | organise / recognise / realise |
| customize / emphasize / minimize | customise / emphasise / minimise |
| analyze / prioritize / visualize | analyse / prioritise / visualise |
| traveling / canceled / modeling | travelling / cancelled / modelling |
| center / theatre / metre (prose) | centre / theatre / metre |
| favorite / honor / labor | favourite / honour / labour |
| catalog / dialog (noun) | catalogue / dialogue |
| program (non-technical) | programme |
| check (bank) | cheque |
| license (noun) | licence |

> **Exception:** CSS property names (`color`, `text-align: center`, etc.)
> and JavaScript identifiers must remain as-is — these are code, not prose.
> Mermaid diagram definitions in README also use their own syntax.

#### Punctuation & style

- Use **-ise / -isation** suffixes throughout, not **-ize / -ization**.
- Dates: write `24 December 2026` or `Dec 24` — never `December 24th`
  or American `12/24`.
- Currency: always write Japanese yen as `¥15,000` (symbol before,
  comma thousands separator).
- Distances: use metric (km, m) not imperial.

---

### Chinese — Use Hong Kong Chinese (Traditional, 繁體中文)

All Chinese-language content in `zh:` fields throughout `data/site-data.js`,
`data/itinerary-data.js`, and any other data file **must use Hong Kong
Traditional Chinese** — not Simplified Chinese (簡體) and not
Taiwan-specific vocabulary.

#### Hong Kong Chinese conventions

| Topic | HK Convention |
|---|---|
| Script | 繁體中文 (Traditional characters only) |
| Tone / Register | Natural Hong Kong written Chinese (港式繁體中文/書面語) as written by a HK native. |
| Expressions | Use natural HK Cantonese written terms (e.g. 有型, 好玩, 車尾箱, 貼士, 上落). |
| Currency | 港幣 (HKD), 日圓 (JPY) — not 元 alone |
| Transport | 新幹線, 地鐵, 電車, 的士 (never 出租車/打的) |
| Hotel | 酒店 (not 旅館 for modern hotels); 溫泉旅館/民宿 for ryokan/guesthouses |
| Luggage | 行李箱 (suitcase), 手提行李 (cabin bag), 背包 (backpack), 車尾箱 (boot) |
| Meals | 早餐, 午餐, 晚餐 |
| Days | 第 X 天 (not 第X日) |
| Numbers | Use Arabic numerals for quantities (3 件, not 三件) unless in a fixed idiomatic phrase |

#### Words & Expressions to AVOID (Mainland / Beijing / Taiwan)

| ❌ Avoid (Mainland / Beijing / Northern / Taiwan) | ✅ Hong Kong Native Equivalent |
|---|---|
| 玩意兒 / 玩意 (Beijing 兒化音) | 好玩 / 玩意 / 嘢 / 有型 |
| 出租车 / 打的 | 的士 / 搭的士 |
| 地铁 / 捷運 | 地鐵 |
| 後備箱 / 行李廂 | 車尾箱 / 尾箱 |
| 排量 (engine capacity) | CC 數 / 引擎排氣量 |
| 超小型車 (PRC classification term) | 微型車 / K-Car / 輕型車 |
| 優化 (overused Mainland term) | 改善 / 提升 / 優化 (only if appropriate) |
| 景區 (PRC travel term) | 景點 / 旅遊點 |
| 攻略 (Mainland internet slang) | 指南 / 貼士 / 行程建議 |
| 溫馨提示 (PRC/Taiwan sign phrase) | 實用貼士 / 注意事項 |
| 套餐 (when referring to meals) | 定食 / 套餐 / 菜單 |

---

## Architecture & Content Rules

### Modular File Structure

```
├── index.html              # Semantic shell & PWA metadata
├── manifest.json           # Web App Manifest for mobile installation
├── sw.js                   # Service Worker (offline caching)
│
├── assets/                 # Static media and icons
│   └── favicon.svg         # SVG favicon & PWA icon
│
├── css/                    # Modular Design System
│   ├── palette.css         # Central tokens, brand colours, dark mode overrides
│   ├── base.css            # CSS reset, typography, container, a11y (focus, reduced motion), back-to-top
│   ├── components.css      # UI components (buttons, tags, JR dots, markers)
│   ├── sections/           # One stylesheet per page section (link order = cascade order!)
│   │   ├── nav, hero, overview, map, tips, car-return, car-rental, itinerary,
│   │   │   packing, budget, hotels, footer, dark-overrides, flights (.css)
│   └── responsive.css      # Responsive media queries (must stay last)
│
├── data/                   # Data Modules (Universal format)
│   ├── flights/flights-data.js   # FLIGHTS_DATA — routes (each tagged with `plans`), `tz` table, ≤5 options each
│   ├── site-data.js        # Overview, tips, packing, budget, hotels, car rental
│   └── itinerary-data.js   # 12-day schedule, blocks, location coordinates
│
├── data-src/flights/       # Source-of-truth CSVs (NOT deployed to GitHub Pages)
│   ├── edi_to_tokyo_20261219.csv
│   ├── lhr_to_tokyo_20261219.csv
│   ├── osaka_to_edi_20261231.csv
│   ├── osaka_to_lhr_20261231.csv
│   ├── kix_to_hkg_20261231.csv
│   ├── tokyo_to_edi_20261231.csv
│   ├── tokyo_to_lhr_20261231.csv
│   ├── tokyo_to_hkg_20261231.csv
│   └── hkg_to_edi_20270114.csv
│
└── js/                     # Application Logic (classic scripts, window.* globals)
    ├── currency.js         # Exchange rate fetch & JPY conversion
    ├── map.js              # MapLibre GL JS — overview & lazy day maps
    ├── features/           # Section renderers (load BEFORE render.js)
    │   ├── car.js          # renderCarRental / renderCarReturn / toggleCarTips
    │   ├── overview.js     # renderOverview
    │   ├── tips-packing.js # renderTips / renderPacking
    │   ├── budget.js       # renderBudget
    │   ├── hotels.js       # renderHotels
    │   ├── itinerary.js    # renderItinerary / toggleDay / initDayCards
    │   └── flights.js      # renderFlights (reads FLIGHTS_DATA → #flights-section-content)
    ├── render.js           # Orchestrator: renderSiteContent, planchange re-render, window exports
    ├── ui.js               # Navigation, language/theme selectors, observers
    └── script.js           # Application bootstrapper & SW registration
```

### Data-Driven Pattern

- All text content lives in **`data/site-data.js`** (overview, tips, packing,
  budget, car return, car rental) or **`data/itinerary-data.js`** (day-by-day).
- `js/render.js` reads data and injects HTML into placeholder IDs in
  `index.html`. Do **not** hardcode displayed text in `index.html`
  unless it is a structural label that does not need i18n.
- Every user-facing string must have both `en:` (British English) and
  `zh:` (HK Traditional Chinese) variants.

### Trip Context (do not alter without user approval)

- **Party Size & Rooms:** **2 Adults** (Ian + Mum), 1 Twin Room throughout. Senior-friendly accessible pacing (2–3 activities/day, step-free access).
- **Privacy & PII Protection:** Do NOT display personal names, specific family member mappings ("Mother", "Father"), or home cities in website text. State passport rules strictly by passport type (BC, BN(O), HKSAR, Portuguese). Refer in public UI only to "2 Adults / 2 位成人".
- **Passports:** BC, BN(O), Portuguese, & HKSAR passports. **All 4 passports enjoy 90-day visa-free entry to Japan.**
- **Driving Licences:** 1 designated driver holds a **UK Photocard Driving Licence**. Japan strictly requires a **1949 Geneva Convention IDP** obtained from a UK Post Office (£5.50) before departure.
- **Dates:** 20 Dec – 31 Dec 2026.
- **Dual-Route Architecture:**
  - **Plan A (Kansai Golden Route, 11 Days):** Tokyo → Kawaguchiko / Mt Fuji → Hakone → Nagoya (car return Day 7) → Kyoto / Nara → Osaka (KIX departure).
  - **Plan B (Kanto & Shizuoka Scenic Loop, 12 Days):** Tokyo → Kawaguchiko / Mt Fuji → Hakone → Atami Onsen (Boxing Day) → Kamakura & Yokohama (night of 27 Dec in Yokohama; car return Day 9, zero drop-off fee) → Tokyo Finale (Dec 28–31) → Haneda/Narita departure. Hotel cards: Hakone 25–26, Atami 26–27, Yokohama 27–28, Tokyo 28–31 (6 cards in total).
- **Car rental:** Pick up Day 5 (24 Dec) leaving Tokyo; return Day 7 (Plan A in Nagoya/Kyoto) or Day 9 (Plan B in Yokohama/Tokyo with ¥0 drop-off fee).
- **Vehicle Picks (4-Card Grid for 2 Adults + 6 Luggage Pieces):**
  1. Mid-size SUV (RAV4, X-Trail, Forester 4WD/AWD) — **Recommended**
  2. Liftback / Wagon (Prius 5th Gen E-Four, Corolla Touring) — **Agility & Economy Alternative**
  3. Minivan / MPV (Voxy/Noah, Serena, Alphard) — **Senior Comfort**
  4. Kei Car (660cc) — **Avoid**
  - Note: Enthusiast hatchbacks (GR Yaris / GR Corolla) ruled out due to tiny boot capacity and harsh ride for senior comfort.
- **Language switch:** Always visible top of page next to the theme toggle and hamburger menu.
- **Route Plan switch:** Available via Hero segment toggle and navbar switcher (`Plan A | Plan B`). Stored in `localStorage` under `'user-plan'`; dispatches `'planchange'` event that updates itinerary data, route board, route map, budget, hotels, and car return.
- **Dark mode toggle:** Moon/sun button in the nav bar; persists in `localStorage` as `user-theme`; dispatches a `'themechange'` CustomEvent that switches MapLibre map styles (Positron ↔ Fiord) and re-applies all CSS variable overrides.

### Column / Grid Layout Rule (CRITICAL)

- **Strict Requirement:** **NEVER leave a single item alone in the last row** of any card grid on desktop, tablet, or mobile.
- **Each row MUST contain 2–4 items.** Single-item orphan rows (e.g. 5+1 or 4+1) are strictly unacceptable.
- **Do NOT use `repeat(auto-fit, minmax(...))` for card grids.** On wide desktop monitors (1320px–1600px container), `auto-fit` dynamically calculates 5+ columns and spills a single item onto the last row.
- **Explicit Grid Rules by Item Count:**
  - **6 items** (e.g. `.tips-grid`): Use `repeat(3, 1fr)` on desktop (2 rows of 3: 3+3), `repeat(2, 1fr)` on tablet (3 rows of 2: 2+2+2), `1fr` on mobile.
  - **5 items** (e.g. `.itinerary-hotels-grid` in Plan A): Use a 6-column backbone (`grid-template-columns: repeat(6, 1fr)`) with `grid-column: span 2` and `nth-child(4)` / `nth-child(5)` offsets so the last 2 items sit centered (3+2 layout).
  - **6 hotel cards** (`.itinerary-hotels-grid[data-count="6"]` in Plan B): 6-column backbone with `span 2` (3+3) on desktop; 2+2+2 on tablet (the `nth-child(5)` offset is reset in `responsive.css`); `1fr` on mobile.
  - **4 items** (e.g. `.overview-grid`, `.vr-grid`): Use `repeat(4, 1fr)` on desktop (1 row of 4), `repeat(2, 1fr)` on tablet (2 rows of 2), `1fr` on mobile.
  - **3 items** (e.g. `.packing-grid`, `.cr-grid`, `.rental-companies-grid`): Use `repeat(3, 1fr)` on desktop (1 row of 3), `repeat(2, 1fr)` or `1fr` on tablet/mobile.

---

## Flight Options — Agentic Rules

### Data Architecture

The flight options system has a two-layer architecture:

1. **CSV layer** — `data-src/flights/<route_key>_<date>.csv` — human-readable raw/archive export. `flights-data.js` is curated from it: every leg in the JS must exist in the CSV (enforced by `validate.mjs`), but the CSV may hold extra candidate legs.
2. **JS layer** — `data/flights/flights-data.js` — `window.FLIGHTS_DATA`, consumed directly by `renderFlights()` in `js/features/flights.js`.

> **Rule:** Always create/update the CSV first, then convert it into `flights-data.js`. Never skip the CSV step.

### CSV Naming Convention

```
<origin_iata_lowercase>_to_<dest_city_lowercase>_<yyyymmdd>.csv
```

Examples:
- `edi_to_tokyo_20261219.csv` — Edinburgh to Tokyo, departing 19 Dec 2026
- `lhr_to_tokyo_20261219.csv` — London Heathrow to Tokyo, departing 19 Dec 2026
- `osaka_to_edi_20261231.csv` — Osaka Kansai to Edinburgh, departing 31 Dec 2026

Use the **departure date** in the filename, even when the flight lands the following day.

### CSV Column Schema (MUST follow exactly)

```
Airline,Flight Number,Departing Station,Arrival Station,Departure Date and time,Arrival Date and Time
```

- **All date-times** must be in `YYYY-MM-DD HH:MM` format (24-hour, local time at the relevant airport).
- Multi-leg options are represented as consecutive rows (leg 1 then leg 2) with no separator row.
- Different options are simply appended sequentially — the agent is responsible for grouping them when converting to JS.

### flights-data.js Route Object Schema

Each entry in `window.FLIGHTS_DATA.routes` must conform to this structure:

```js
{
  id: 'string',          // kebab-case, unique (e.g. 'edi-to-tokyo')
  label: {
    en: 'String',        // British English, e.g. 'Edinburgh → Tokyo'
    zh: 'String',        // HK Traditional Chinese, e.g. '愛丁堡 → 東京'
  },
  date: {
    en: 'String',        // e.g. 'Sat 19 Dec 2026 (depart)'
    zh: 'String',        // e.g. '2026年12月19日（出發）'
  },
  depart: 'YYYY-MM-DD',  // Earliest possible departure date for this route
  arrive: 'YYYY-MM-DD',  // Required arrival date (FIXED — do not alter without user approval)
  plans: ['plan-a'],     // Optional. Which plan(s) show this route (omit = all plans). Osaka/KIX returns are Plan A only; Plan B departs Tokyo (HND/NRT).
  options: [ /* see below */ ]
}
```

Each option object:

```js
{
  id: 'string',           // kebab-case, unique globally (e.g. 'edi-tyo-1')
  label: { en, zh },      // Short description of the option
  airline: 'string',      // Primary or combined airline(s), e.g. 'Finnair / British Airways'
  hub: 'string | null',   // Hub IATA code(s) or null for non-stop
  legs: [
    {
      airline: 'string',  // Full airline name as it appears on the ticket
      flight: 'string',   // IATA flight number, e.g. 'BA5'
      from: 'string',     // Departure IATA airport code
      to: 'string',       // Arrival IATA airport code
      dep: 'YYYY-MM-DD HH:MM',  // Local departure time
      arr: 'YYYY-MM-DD HH:MM',  // Local arrival time
    }
  ]
}
```

Every airport used in a leg must exist in the top-level `FLIGHTS_DATA.tz` table (airport → UTC offset in hours, winter) — `renderFlights()` uses it for durations and `validate.mjs` checks it. Add new hubs there.

### Adding a New Route — Step-by-Step

When asked to add a new route, an agent **MUST** follow these steps in order:

1. **Verify live on Google Flights, or Kayak if Google Flights is blocked** using the browser subagent.
   - Google Flights: `https://www.google.com/travel/flights`. Kayak: `https://www.kayak.co.uk/flights/<ORIGIN>-<DEST>/<yyyy-mm-dd>?sort=duration_a`.
   - Search for the exact departure and arrival airports and date.
   - Expand each candidate and read the details panel (flight number, "Operated by" line, airports, local times). Keep only flights **operated by the selling airline itself**; skip codeshares and record the operating carrier's flight number.
   - Never bypass a CAPTCHA, bot check or "denied" block; fall back to the other source or ask the user.
   - **Do not save any flight data that has not been verified live.**

2. **Create the CSV file** at `data-src/flights/<route_key>_<date>.csv`.
   - Follow the CSV column schema exactly.
   - Include all candidate legs, even ones that may not make the final top 5.

3. **Select the top 5 options** using the ranking criteria below.
   - If fewer than 5 verified options exist, include all available.

4. **Append the new route object** to `window.FLIGHTS_DATA.routes` in `data/flights/flights-data.js`.
   - Do **not** re-sort or re-number existing routes.
   - Assign a new unique `id` in `kebab-case`.

5. **The `#flights` section tab is automatically rendered** — no `index.html` changes are required. The `renderFlights()` function reads `FLIGHTS_DATA.routes` at runtime and creates one tab per route dynamically.

6. **Update documentation:**
   - Add the new CSV filename to the `data-src/flights/` tree in both `AGENTS.md` and `README.md`.
   - Update the route count description (e.g. "4 routes, 5 options each" → "5 routes, …").
   - Record the change in the active `walkthrough.md` artifact.

### Airline Preference for Long-Haul Legs

When selecting the top 5 options, prefer the following airlines **for long-haul (intercontinental) legs**:

| Priority | Airline(s) |
|---|---|
| 1st | British Airways / Iberia (oneworld) |
| 2nd | Finnair (oneworld) |
| 3rd | Lufthansa / SWISS / Austrian (Star Alliance) |
| 4th | Etihad Airways |

For **short-haul connecting legs** (e.g. EDI–LHR, HEL–EDI, MUC–FRA), there is no airline restriction — use whichever connects best to the preferred long-haul carrier.

### Option Ranking

Within each route, order options **by total journey time, shortest first** (calculated as last leg arrival minus first leg departure, in local wall-clock times converted to UTC).

- Break ties by: (1) fewest stops, then (2) earlier arrival time.

### Date Integrity Rules (CRITICAL)

- The `arrive` field on each route is a **fixed constraint** set by the user. **Never change it without explicit user approval.**
- All flight legs must be scheduled such that the final leg arrives on or before the `arrive` date.
- If a route requires an overnight connection (e.g. departing 18 Dec to connect on 19 Dec), the **departure date in the CSV filename and in the `depart` field should reflect the earliest leg**, not the nominal travel date.
- Record all date-times in **local airport time** — never UTC — and include the full `YYYY-MM-DD` prefix on every `dep` and `arr` field so cross-date legs are unambiguous.

### Rendering — Do Not Modify Without Cause

- `renderFlights()` in `js/features/flights.js` is the single source of rendering logic. Do not duplicate flight rendering in `index.html` or other JS files.
- The tab-switcher (`flightsSelectTab()`) is globally scoped and handles all routes dynamically — no per-route JS is needed.
- Layover rows are automatically inserted between consecutive legs using the existing template literal in `renderFlights()`. No extra markup is needed in the data.

---

## Service Worker, Build & Validation Rules

- **Do NOT manually bump `CACHE_NAME` in `sw.js`.** It contains the `__BUILD__` placeholder; the deploy workflow replaces it with the short commit SHA.
- When you add/remove a CSS, JS, data or image file that `index.html` loads, add/remove it in `STATIC_ASSETS` in `sw.js` too.
- **CSS cascade:** stylesheets in `css/sections/*.css` are linked individually in `index.html`; the link order equals the old single-file order (`dark-overrides`, `flights` come late on purpose) and `responsive.css` must stay last. Do not reorder them.
- **JS load order:** `data/*` -> `currency.js` -> `map.js` -> `js/features/*.js` -> `render.js` -> `ui.js` -> `script.js`. New section renderers go in `js/features/` and must be exported in `render.js` and listed in `index.html` and `sw.js`.
- Flight CSV sources live in `data-src/flights/` (not deployed). `flights-data.js` is what the site reads.
- **MapLibre** is pinned to an exact version with an SRI `integrity` hash in `index.html` and precached in `sw.js` (offline maps). When bumping it, update both places plus the hash; `validate.mjs` checks all three.
- `validate.mjs` also checks: budget totals per plan, hotel nights (legs and quick-pills each cover 20–30 Dec exactly once), flight route sanity (every plan shows ≥1 route) and the CSV-superset rule.
- Before committing run `node scripts/validate.mjs` (also runs in CI and blocks deploys).