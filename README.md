# 🗾 Japan Winter Journey 2026

**A detailed, interactive day-by-day family travel itinerary for Japan.**

📅 **Dec 20 – Dec 31, 2026** · 👨‍👩‍👦 **Family of 3** · 🚗 **Self-drive + Shinkansen**

---

## Route

**Tokyo** (Days 1–4) → **Kawaguchiko / Mt Fuji** (Day 5) → **Hakone** (Days 6–7) → **Nagoya** (Day 7, transit) → **Kyoto** (Days 7–9) → **Nara** (Day 10) → **Osaka** (Days 10–12)

---

## Features

- ✈️ **BA-inspired design** — Midnight Navy, BA Red & Gold palette with glassmorphism cards
- 🌙 **Dark / Light mode toggle** — persistent across sessions via `localStorage`; maps switch styles automatically (Positron ↔ Fiord)
- 🚉 **JR Station Sign Route Board** — Authentic Japanese station sign (駅名標) timeline with Kanji, Furigana, Romaji, Station Codes & day badges
- 📅 **12 expandable day cards** with morning / afternoon / evening schedules and meal picks
- 🗺️ **Interactive route map** (MapLibre GL JS) — colour-coded route with driving, Shinkansen & rail segments
- 🗾 **Per-day mini-maps** — lazy-initialised MapLibre map inside each accordion day card
- 🎌 **Senior-friendly Bilingual Switcher** — Always-visible English & Traditional Chinese (`EN | 繁中`) toggle in top navigation bar with high-contrast tactile active pills
- 💴 **Live currency conversion** — JPY → HKD or GBP via open.er-api.com
- 🏨 **Booking.com hotel search** — pre-filled for each leg (destination, dates, 3 adults)
- 🏷️ **Region filter tabs** — Tokyo / Mt Fuji Drive / Kansai
- 📋 **Practical tips** — Transport passes, advance bookings, etiquette, winter driving
- 🧳 **Packing checklist** — winter-specific, self-drive aware
- 💰 **Budget estimate table** — per-category with live converted values
- 📱 **Fully responsive** — pixel-aligned desktop and mobile layouts

---

## Live Site

🔗 [View the itinerary](https://ianmahkg.github.io/IanMaHKG-2026-Japan_Planner.github.io/)

---

## Project Structure

```
├── index.html          # Semantic shell (no hardcoded content)
├── style.css           # Full design system — BA tokens, components, dark mode, responsive
│
├── site-data.js        # Overview, Tips, Packing, Budget, Hotels data (SITE_DATA)
├── itinerary-data.js   # 12-day itinerary (ITINERARY_DATA)
│
├── render.js           # DOM injection — all section renderers
├── currency.js         # Exchange rate fetch, HKD/GBP conversion, switcher
├── ui.js               # Nav, language toggle, dark mode toggle, particles, scroll reveal, hotel search
├── map.js              # MapLibre GL JS — route overview map + per-day mini maps
└── script.js           # Entry point — DOMContentLoaded bootstrap only
```

### JS → HTML Lineage Map

The diagram below traces every data source and module function to the exact HTML container it populates.

```mermaid
flowchart LR

    %% ── Entry point ──────────────────────────────────────────────
    BOOT["⚙️ script.js\nDOMContentLoaded"]

    %% ── Data layer ───────────────────────────────────────────────
    subgraph DATA["📦 Data Layer"]
        direction TB
        SD["site-data.js\nwindow.SITE_DATA\n\nOverview · Tips · Packing\nBudget · Hotels · Map stops"]
        ID["itinerary-data.js\nwindow.ITINERARY_DATA\n\n12-day schedule\nblocks · tags · tips"]
    end

    %% ── render.js ────────────────────────────────────────────────
    subgraph RENDER["🖨️ render.js"]
        direction TB
        rOV["renderOverview()"]
        rTIP["renderTips()"]
        rPACK["renderPacking()"]
        rBUD["renderBudget()"]
        rHOT["renderHotels()"]
        rIT["renderItinerary()\ninitDayCards()"]
    end

    %% ── currency.js ──────────────────────────────────────────────
    subgraph CURR["💴 currency.js"]
        direction TB
        cINIT["initCurrencySelector()"]
        cFETCH["fetchExchangeRates()\nopen.er-api.com"]
        cUPD["updateConvertedBudgets()"]
        cINIT --> cFETCH --> cUPD
    end

    %% ── ui.js ────────────────────────────────────────────────────
    subgraph UI["🎛️ ui.js"]
        direction TB
        uTHEME["initTheme()\nsetTheme()\n'themechange' event"]
        uLANG["initLanguageSelector()\nsetLanguage()"]
        uNAV["initNav()\nupdateActiveNav()"]
        uPART["initParticles()"]
        uREV["initScrollReveal()"]
        uSCR["initSmoothScroll()"]
        uFILT["initFilters()"]
        uHOT["initHotelSearch()"]
    end

    %% ── map.js ───────────────────────────────────────────────────
    subgraph MAP["🗺️ map.js"]
        mROUTE["initRouteMap()\nMapLibre GL JS\n+ OpenFreeMap"]
        mDAY["initDayMap(dayId)\nlazy per-day mini-map"]
    end

    %% ── HTML sections ────────────────────────────────────────────
    subgraph HTML["📄 index.html — Target Sections"]
        direction TB
        H_HERO["✨ Hero\n#hero · #particles"]
        H_NAV["🧭 Nav\n#main-nav · #nav-links\n#theme-toggle"]
        H_OV["🗺️ Overview\n#overview-grid · #route-stops"]
        H_RMAP["🗾 Route Map\n#route-map"]
        H_TIP["💡 Tips\n#tips-grid"]
        H_IT["📅 Itinerary\n#timeline · .day-card · .day-tab\n.day-map-*"]
        H_PACK["🧳 Packing\n#packing-grid"]
        H_BUD["💰 Budget\n#budget-tbody · .converted-val · .live-rate-date"]
        H_HOT["🏨 Hotels\n#itinerary-hotels-grid\n#quick-leg-pills · #hotel-search-form"]
        H_LANG["🎌 Language\nbody.lang-* · .lang-switcher"]
        H_CURR["💱 Currency\n.currency-switcher"]
    end

    %% ── Orchestration ────────────────────────────────────────────
    BOOT --> UI
    BOOT --> RENDER
    BOOT --> CURR
    BOOT --> MAP

    %% ── Data feeds ───────────────────────────────────────────────
    SD --> rOV & rTIP & rPACK & rBUD & rHOT
    SD --> mROUTE
    ID --> rIT
    ID --> mDAY

    %% ── render.js → HTML ─────────────────────────────────────────
    rOV   --> H_OV
    rTIP  --> H_TIP
    rIT   --> H_IT
    rPACK --> H_PACK
    rBUD  --> H_BUD
    rHOT  --> H_HOT

    %% ── currency.js → HTML ───────────────────────────────────────
    cINIT --> H_CURR
    cUPD  --> H_BUD

    %% ── map.js → HTML ────────────────────────────────────────────
    mROUTE --> H_RMAP
    mDAY   --> H_IT

    %% ── ui.js → HTML ─────────────────────────────────────────────
    uTHEME -. "'themechange' event → map style switch" .-> MAP
    uTHEME --> H_NAV
    uLANG  --> H_LANG
    uNAV   --> H_NAV
    uPART  --> H_HERO
    uFILT  --> H_IT
    uHOT   --> H_HOT
    uREV   -. "adds .reveal to all sections" .-> HTML
    uSCR   -. "intercepts all anchor links" .-> HTML

    %% ── Styles ───────────────────────────────────────────────────
    classDef data    fill:#e8f4fd,stroke:#075AAA,color:#01295C,font-weight:bold
    classDef module  fill:#fff8f0,stroke:#C9A96E,color:#3d2600,font-weight:bold
    classDef section fill:#f0f7f0,stroke:#3a7d44,color:#1a3d1f
    classDef boot    fill:#01295C,stroke:#D4163C,color:#ffffff,font-weight:bold

    class SD,ID data
    class RENDER,CURR,UI,MAP module
    class H_HERO,H_NAV,H_OV,H_RMAP,H_TIP,H_IT,H_PACK,H_BUD,H_HOT,H_LANG,H_CURR section
    class BOOT boot
```

**Arrow key:** solid `-->` = direct injection or data supply · dashed `-.->`= ambient effect across all sections

| Section | Rendered by | Data source | Also touched by |
|---|---|---|---|
| Overview | `renderOverview()` | `SITE_DATA.overview` | `initScrollReveal()` |
| Route Map | `initRouteMap()` | `SITE_DATA.overview.routeStops` | `themechange` event, `langchange` event |
| Day Maps | `initDayMap(dayId)` | `ITINERARY_DATA[n].blocks[].activity.locations` | `themechange` event |
| Tips | `renderTips()` | `SITE_DATA.tips` | `initScrollReveal()` |
| Itinerary | `renderItinerary()` | `ITINERARY_DATA` | `initFilters()`, `initScrollReveal()` |
| Packing | `renderPacking()` | `SITE_DATA.packing` | `initScrollReveal()` |
| Budget | `renderBudget()` | `SITE_DATA.budget` | `updateConvertedBudgets()` (currency.js) |
| Hotels | `renderHotels()` | `SITE_DATA.hotels` | `initHotelSearch()` (ui.js) |

---

## Tech

Pure **HTML + CSS + JavaScript** — no frameworks, no build step. Open `index.html` directly or deploy to any static host.

- [MapLibre GL JS](https://maplibre.org/) — interactive WebGL maps (open source, no API key)
- [OpenFreeMap](https://openfreemap.org/) — free map tiles, no account required (Positron light / Fiord dark)
- [open.er-api.com](https://www.exchangerate-api.com) — live JPY exchange rates
- [Google Fonts](https://fonts.google.com/) — Inter + Noto Sans JP

---

よい旅を！*(Yoi tabi wo!)* — Have a wonderful journey! 🇯🇵