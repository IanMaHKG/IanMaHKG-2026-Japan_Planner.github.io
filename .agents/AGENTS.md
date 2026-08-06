# Japan Trip Planner — Agent Rules
# ──────────────────────────────────────────────────────────────────────
# These rules apply to ALL AI-assisted work on this repository.
# Read and follow them before writing or editing any content.
# ──────────────────────────────────────────────────────────────────────

## Language Style Rules

### English — Use British English (NOT American English)

All English-language content in `site-data.js`, `itinerary-data.js`,
`index.html`, `render.js`, `README.md`, and any other human-readable
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

All Chinese-language content in `zh:` fields throughout `site-data.js`,
`itinerary-data.js`, and any other data file **must use Hong Kong
Traditional Chinese** — not Simplified Chinese (簡體) and not
Taiwan-specific vocabulary.

#### Hong Kong Chinese conventions

| Topic | HK Convention |
|---|---|
| Script | 繁體中文 (Traditional characters only) |
| Currency | 港幣 (HKD), 日圓 (JPY) — not 元 alone |
| Transport | 新幹線, 地鐵, 電車, 的士 |
| Hotel | 酒店 (not 旅館 for modern hotels); 旅館/民宿 for ryokan/guesthouses |
| Luggage | 行李箱 (suitcase), 手提行李 (cabin bag), 背包 (backpack) |
| Meals | 早餐, 午餐, 晚餐 |
| Days | 第 X 天 (not 第X日) |
| Tone/register | Polite, natural Cantonese-influenced written Chinese; avoid Mainland PRC formal bureaucratic phrasing |
| Numbers | Use Arabic numerals for quantities (3 件, not 三件) unless in a fixed idiomatic phrase |

#### Common Mainland/Taiwan words to AVOID

| ❌ Mainland / Taiwan | ✅ Hong Kong |
|---|---|
| 出租车 | 的士 |
| 地铁 / 捷運 | 地鐵 |
| 打的 | 搭的士 |
| 優化 (overused Mainland) | 改善 / 提升 |

---

## Architecture & Content Rules

### Data-Driven Pattern

- All text content lives in **`site-data.js`** (overview, tips, packing,
  budget, car return, car rental) or **`itinerary-data.js`** (day-by-day).
- `render.js` reads data and injects HTML into placeholder IDs in
  `index.html`. Do **not** hardcode displayed text in `index.html`
  unless it is a structural label that does not need i18n.
- Every user-facing string must have both `en:` (British English) and
  `zh:` (HK Traditional Chinese) variants.

### Trip Context (do not alter without user approval)

- **Travellers:** 3 adults (Ian + parents in late 50s / early 60s)
- **Dates:** 20 Dec – 31 Dec 2026 (12 nights)
- **Route:** Tokyo → Mt Fuji / Kawaguchiko → Hakone → Nagoya (car return)
  → Kyoto / Nara → Osaka (fly home from KIX)
- **Car rental:** Pick up Day 5 (24 Dec) leaving Tokyo; return Day 7
  (26 Dec) immediately after hotel check-in at drop-off city.
- **Recommended car:** Minivan / MPV (Toyota Alphard / Voxy / Noah,
  Nissan Serena) — fits 3 adults + 9 bags (3 large + 3 cabin + 3 backpack).
- **Language switch:** Always visible top of page next to hamburger menu.

### Column / Grid Layout Rule

- **Never leave a single item alone in the last row** of any card grid.
- All multi-item rows must contain **2–4 items per row**.
- Preferred patterns: 5 items → 3+2 centred; 4 items → 2+2 or 4-across.
- Use 6-column backbone with nth-child offsets to centre partial rows.
