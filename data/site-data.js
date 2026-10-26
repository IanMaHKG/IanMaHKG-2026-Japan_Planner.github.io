/**
 * @file site-data.js
 * @description DATA SOURCE — all non-itinerary content for the Japan 2026 planner.
 * Sets window.SITE_DATA, a single global object consumed by render.js and map.js.
 *
 * STRUCTURE OF window.SITE_DATA:
 *
 *   overview
 *     .cards[]          3 summary cards (pace, transport, weather).
 *                       Each: { id, icon, title:{en,zh}, desc:{en,zh} }
 *
 *     .routeStopsA[] / .routeStopsB[]   7 journey stops per plan, used by BOTH:
 *                         (a) the JR Station Sign route board visual in render.js
 *                         (b) the MapLibre interactive map markers in map.js
 *
 *                       Each stop must have ALL of these fields:
 *                       {
 *                         code:       string  — 2-digit station order ("01"–"07")
 *                         label:      string  — 3-letter code shown on map marker & station badge ("TYO")
 *                         kanji:      string  — Station name in Japanese Kanji ("東京")
 *                         hiragana:   string  — Hiragana reading / furigana ("とうきょう")
 *                         romaji:     string  — Romanised name shown below the track line ("Tokyo")
 *                         dotClass:   string  — CSS class for stop-dot colour variant ("tokyo")
 *                         name:       { en, zh }  — Localised full display name
 *                         days:       { en, zh }  — Travel days label ("Days 1–4" / "第 1–4 天")
 *                         desc:       { en, zh }  — Short description for Leaflet popup
 *                         lat:        number  — Latitude (WGS84)
 *                         lng:        number  — Longitude (WGS84)
 *                         color:      string  — Hex colour used for station code badge border and dot
 *                         markerClass: string — CSS class applied to the Leaflet DivIcon
 *                       }
 *
 *   tips[]              4 practical tip cards (transport, bookings, etiquette, winter driving).
 *                       Each: { id, icon, title:{en,zh}, items:[{en,zh}] }
 *
 *   packing[]           3 packing category cards (clothing, tech, misc).
 *                       Each: { id, icon, title:{en,zh}, items:[{en,zh}] }
 *
 *   budget
 *     .planA / .planB   one block per plan, each with:
 *       .items[]        5 budget line items. Each: { category:{en,zh}, jpy, min, max,
 *                       initial (display string), notes:{en,zh} }
 *                       `min` and `max` are plain JPY numbers used by currency.js for conversion.
 *       .total          Same shape as an item; rendered as a <tr class="budget-total"> row.
 *                       scripts/validate.mjs checks that total equals the sum of items.
 *
 *   hotels
 *     .planA / .planB   one block per plan, each with:
 *       .quickLegs[]    destination presets for the hotel search form pills (one per night-block).
 *                       Each: { active, dest, checkin, checkout, label:{en,zh} }
 *       .legs[]         curated accommodation cards (one per journey leg; Plan A 5, Plan B 6).
 *                       Each: { legNum, nights:{en,zh}, badgeClass, highlight, title:{en,zh},
 *                               dates, desc:{en,zh}, tags[], btnText:{en,zh}, dest, checkin, checkout }
 *                       The nights covered by quickLegs and legs must be identical (validate.mjs).
 *
 * TO ADD A NEW TIP:     Push a new object into the tips[] array following the existing pattern.
 * TO ADD A BUDGET ROW:  Push into budget.planA.items[] AND budget.planB.items[] and update that plan's total.
 * TO CHANGE MAP STOPS:  Edit overview.routeStopsA[] / routeStopsB[] — changes apply to BOTH the JR route board AND the map.
 * TO ADD AN OVERVIEW CARD: Push into overview.cards[]. style.css uses repeat(3, 1fr) grid.
 */

const SITE_DATA = {
  /* ─── Overview Section ─── */
  overview: {
    cards: [
      {
        id: "overview-pace",
        icon: "🧘",
        title: { en: "Pace", zh: "步調節奏" },
        desc: {
          en: "Balanced to relaxed. No more than 2–3 activities per day, with step-free paths and rest built in for senior comfort.",
          zh: "平衡且輕鬆。每日安排不超過 2 至 3 個主要活動，注重無障礙平路與充裕休息，專為長輩同行而設計。"
        }
      },
      {
        id: "overview-transport",
        icon: "🚗",
        title: { en: "Transport", zh: "交通方式" },
        desc: {
          en: "Flexible hybrid model: rental car for Mt Fuji drive (Days 5–7 for Plan A; Days 3–5 loop for Plan B), plus bullet train / local rail.",
          zh: "靈活出行：第 5 至 7 天（方案 A）或第 3 至 5 天（方案 B）自駕租車，市區搭配新幹線及鐵路。"
        }
      },
      {
        id: "overview-weather",
        icon: "🌡️",
        title: { en: "Weather", zh: "氣候與溫度" },
        desc: {
          en: "Crisp & clear. Tokyo 4–13°C, Fuji area 0–8°C, Kansai/Coast 3–12°C. Layer up with warm thermal wear!",
          zh: "寒冷乾燥且晴朗。東京 4–13°C，富士山區 0–8°C，關西及沿海 3–12°C。請準備洋蔥式保暖穿法！"
        }
      },
      {
        id: "overview-family",
        icon: "🛂",
        title: { en: "Travellers & Entry", zh: "同行成員與入境" },
        desc: {
          en: "2 Adults (1 Twin Room throughout). Passports held: British Citizen, BN(O), HKSAR & Portuguese — <strong>all 90-day visa-free for Japan</strong>. Driver holds UK licence + 1949 IDP.",
          zh: "2 位成人（全程 1 間雙床房）。持有護照：英國公民、BN(O)、香港特區護照及葡萄牙護照 — <strong>全部 90 天免簽證入境日本</strong>。司機持英國駕照 + 1949 IDP。"
        }
      }
    ],
    routeStopsA: [
      {
        code: "01",
        label: "TYO",
        kanji: "東京",
        hiragana: "とうきょう",
        romaji: "Tokyo",
        dotClass: "tokyo",
        name:  { en: "Tokyo (東京)",       zh: "東京"   },
        days:  { en: "Days 1–4",           zh: "第 1–4 天" },
        desc:  { en: "Asakusa, Shibuya, teamLab, Ginza, winter illuminations",
                 zh: "參訪淺草寺、澀谷、teamLab、銀座，賞冬季燈飾" },
        lat: 35.6762, lng: 139.6503,
        color: "var(--marker-tokyo)", markerClass: "marker-tokyo"
      },
      {
        code: "02",
        label: "FUJ",
        kanji: "河口湖",
        hiragana: "かわぐちこ",
        romaji: "Kawaguchiko",
        dotClass: "fuji",
        name:  { en: "Kawaguchiko (河口湖)", zh: "河口湖" },
        days:  { en: "Day 5",               zh: "第 5 天" },
        desc:  { en: "Mt Fuji views, Chureito Pagoda, ryokan & onsen",
                 zh: "賞富士山美景，登新倉山淺間公園忠靈塔，住溫泉旅館" },
        lat: 35.5104, lng: 138.7564,
        color: "var(--marker-fuji)", markerClass: "marker-fuji"
      },
      {
        code: "03",
        label: "HKN",
        kanji: "箱根",
        hiragana: "はこね",
        romaji: "Hakone",
        dotClass: "hakone",
        name:  { en: "Hakone (箱根)",       zh: "箱根"   },
        days:  { en: "Days 6–7",            zh: "第 6–7 天" },
        desc:  { en: "Explore Owakudani volcanic valley, pirate ship on Lake Ashi, stay at a top luxury hot spring ryokan",
                 zh: "走訪大涌谷地熱景點、搭蘆之湖海盜船、享頂級溫泉" },
        lat: 35.2329, lng: 139.1069,
        color: "var(--marker-hakone)", markerClass: "marker-hakone"
      },
      {
        code: "04",
        label: "NGO",
        kanji: "名古屋",
        hiragana: "なごや",
        romaji: "Nagoya",
        dotClass: "nagoya",
        name:  { en: "Nagoya (名古屋)",     zh: "名古屋" },
        days:  { en: "Day 7",              zh: "第 7 天" },
        desc:  { en: "Miso katsu dinner, drop off rental car",
                 zh: "享用味噌炸豬排晚餐，名古屋還車，轉搭新幹線" },
        lat: 35.1815, lng: 136.9066,
        color: "var(--marker-nagoya)", markerClass: "marker-nagoya"
      },
      {
        code: "05",
        label: "KYO",
        kanji: "京都",
        hiragana: "きょうと",
        romaji: "Kyoto",
        dotClass: "kyoto",
        name:  { en: "Kyoto (京都)",        zh: "京都"   },
        days:  { en: "Days 7–9",            zh: "第 7–9 天" },
        desc:  { en: "Fushimi Inari, Kinkaku-ji, Arashiyama, tea ceremony",
                 zh: "千本鳥居、金閣寺、嵐山竹林、體驗京都傳統茶道" },
        lat: 35.0116, lng: 135.7681,
        color: "var(--marker-kyoto)", markerClass: "marker-kyoto"
      },
      {
        code: "06",
        label: "NAR",
        kanji: "奈良",
        hiragana: "なら",
        romaji: "Nara",
        dotClass: "nara",
        name:  { en: "Nara (奈良)",         zh: "奈良"   },
        days:  { en: "Day 10",             zh: "第 10 天" },
        desc:  { en: "Deer Park, Todai-ji, Kasuga Taisha",
                 zh: "造訪奈良公園親近小鹿、東大寺大佛殿、春日大社" },
        lat: 34.6851, lng: 135.8048,
        color: "var(--marker-nara)", markerClass: "marker-nara"
      },
      {
        code: "07",
        label: "OSA",
        kanji: "大阪",
        hiragana: "おおさか",
        romaji: "Osaka",
        dotClass: "osaka",
        name:  { en: "Osaka (大阪)",        zh: "大阪"   },
        days:  { en: "Days 10–12",         zh: "第 10–12 天" },
        desc:  { en: "Osaka Castle, Dotonbori, street food, New Year's Eve",
                 zh: "大阪城天守閣、道頓堀夜景與街頭美食、敲鐘跨年" },
        lat: 34.6937, lng: 135.5023,
        color: "var(--marker-osaka)", markerClass: "marker-osaka"
      }
    ],
    routeStopsB: [
      {
        code: "01",
        label: "TYO",
        kanji: "東京",
        hiragana: "とうきょう",
        romaji: "Tokyo",
        dotClass: "tokyo",
        name:  { en: "Tokyo (東京)",       zh: "東京"   },
        days:  { en: "Days 1–2",           zh: "第 1–2 天" },
        desc:  { en: "Asakusa, Skytree, Meiji Jingu, Shibuya Sky",
                 zh: "淺草寺、晴空塔、明治神宮、澀谷 SKY" },
        lat: 35.6762, lng: 139.6503,
        color: "var(--marker-tokyo)", markerClass: "marker-tokyo"
      },
      {
        code: "02",
        label: "FUJ",
        kanji: "河口湖",
        hiragana: "かわぐちこ",
        romaji: "Kawaguchiko",
        dotClass: "fuji",
        name:  { en: "Kawaguchiko (河口湖)", zh: "河口湖" },
        days:  { en: "Day 3",               zh: "第 3 天" },
        desc:  { en: "Mt Fuji panoramic views, Chureito Pagoda, Lake Saiko, onsen ryokan",
                 zh: "富士山全景、新倉山忠靈塔、西湖療癒之里、會席料理溫泉旅館" },
        lat: 35.5104, lng: 138.7564,
        color: "var(--marker-fuji)", markerClass: "marker-fuji"
      },
      {
        code: "03",
        label: "HKN",
        kanji: "箱根",
        hiragana: "はこね",
        romaji: "Hakone",
        dotClass: "hakone",
        name:  { en: "Hakone (箱根)",       zh: "箱根"   },
        days:  { en: "Day 4",               zh: "第 4 天" },
        desc:  { en: "Oshino Hakkai, Owakudani geothermal valley, Lake Ashi pirate ship, onsen",
                 zh: "忍野八海、大涌谷火山谷地熱黑玉子、蘆之湖海盜船、溫泉度假" },
        lat: 35.2329, lng: 139.1069,
        color: "var(--marker-hakone)", markerClass: "marker-hakone"
      },
      {
        code: "04",
        label: "KMR",
        kanji: "鎌倉",
        hiragana: "かまくら",
        romaji: "Kamakura",
        dotClass: "nara",
        name:  { en: "Kamakura (鎌倉)",     zh: "鎌倉"   },
        days:  { en: "Day 5",               zh: "第 5 天" },
        desc:  { en: "Kotoku-in Great Buddha flat walk, scenic coastal Route 134 drive",
                 zh: "高德院大佛平路參觀、湘南海岸公路觀海自駕" },
        lat: 35.3197, lng: 139.5467,
        color: "var(--marker-nara)", markerClass: "marker-nara"
      },
      {
        code: "05",
        label: "YKH",
        kanji: "橫濱",
        hiragana: "よこはま",
        romaji: "Yokohama",
        dotClass: "nagoya",
        name:  { en: "Yokohama (橫濱)",     zh: "橫濱"   },
        days:  { en: "Day 5",               zh: "第 5 天" },
        desc:  { en: "Chinatown dim sum lunch, zero drop-off fee car return, 30-min JR to Tokyo",
                 zh: "中華街午餐點心、零附加費交還租車、30 分鐘 JR 直達東京" },
        lat: 35.4437, lng: 139.6380,
        color: "var(--marker-nagoya)", markerClass: "marker-nagoya"
      },
      {
        code: "06",
        label: "TYO",
        kanji: "東京",
        hiragana: "とうきょう",
        romaji: "Tokyo Finale",
        dotClass: "tokyo",
        name:  { en: "Tokyo Finale (東京終站)", zh: "東京終站" },
        days:  { en: "Days 5–7",            zh: "第 5–7 天" },
        desc:  { en: "Sukiyaki dinner, Tsukiji, Ginza, NYE Toshikoshi soba, temple bells & departure",
                 zh: "壽喜燒、築地市場、銀座、除夕跨年蕎麥麵、除夜之鐘與出發返程" },
        lat: 35.6812, lng: 139.7671,
        color: "var(--marker-tokyo)", markerClass: "marker-tokyo"
      }
    ]
  },

  /* ─── Car Return Decision Helper ───────────────────────────────────
   * Displays a 3-option pros/cons comparison for where to return the
   * rental car: Nagoya (current plan), Kyoto, or Osaka.
   * Each option has: id, icon, title, subtitle, verdict, pros[], cons[].
   * Rendered by render.js renderCarReturn() → #car-return-grid.
   * ──────────────────────────────────────────────────────────────────*/
  carReturn: {
    planA: {
      question: {
        en: "Where should you return the rental car? (Plan A: Kansai Route)",
        zh: "租車應在哪裡歸還？（方案 A：關西經典線）"
      },
      context: {
        en: "The plan: <strong>pick up the car on Day 5 (Dec 24, Christmas Eve) when leaving Tokyo</strong>, use it for the Mt Fuji / Kawaguchiko / Hakone self-drive segment (Days 5–7), then <strong>return it on Day 7 (Dec 26) as soon as you have checked in at your destination city</strong>. After drop-off, you're free — Kyoto, Nara, and Osaka are all best explored by train.",
        zh: "計劃安排：<strong>第 5 天（12 月 24 日平安夜）離開東京時取車</strong>，用於富士山/河口湖/箱根自駕路段（第 5 至 7 天），然後在<strong>第 7 天（12 月 26 日）辦妥目的地酒店入住後即行歸還</strong>。還車後全程以公共交通出行 — 京都、奈良及大阪均最適合以火車遊覽。"
      },
      recommendation: {
        en: "🏆 Our pick: <strong>Nagoya</strong> — lowest cost, keeps luggage light through Kyoto, and a quick Shinkansen hop gets you there.",
        zh: "🏆 建議選擇：<strong>名古屋</strong> — 費用最低，令你輕裝遊覽京都，且搭新幹線往返方便快捷。"
      },
      options: [
        {
          id: "car-return-nagoya",
          icon: "🚗",
          title: { en: "Nagoya", zh: "名古屋" },
          subtitle: { en: "Current Plan · Day 7 transit stop", zh: "現有計劃 · 第 7 天中途站" },
          verdict: "current",
          verdictLabel: { en: "Current Plan", zh: "現有計劃" },
          pros: [
            { en: "<strong>Cheapest one-way fee</strong> — Tokyo→Nagoya drop-off costs approx ¥15,000–¥20,000 (vs ¥25,000–¥35,000 to Kyoto/Osaka)", zh: "<strong>異地還車費用最低</strong> — 東京→名古屋約 ¥15,000–¥20,000（京都/大阪則需 ¥25,000–¥35,000）" },
            { en: "<strong>No driving stress in Kansai</strong> — Kyoto city centre and Osaka are notoriously car-unfriendly (narrow streets, expensive parking)", zh: "<strong>無需在關西開車</strong> — 京都市區巷道窄小、停車費高昂；大阪市區行車亦複雜" },
            { en: "<strong>Shinkansen to Kyoto in 35 min</strong> — Fast, comfortable, luggage goes in overhead rack or coin locker at Nagoya station", zh: "<strong>35 分鐘新幹線直達京都</strong> — 快捷舒適，行李可放行李架或名古屋站儲物櫃" },
            { en: "<strong>Miso katsu dinner</strong> — Makes for a natural, enjoyable transit stop with a local specialty meal", zh: "<strong>順道品嚐味噌炸豬排</strong> — 名古屋特色晚餐，讓中途換車成為享受" },
            { en: "<strong>Lighter in Kyoto</strong> — Arriving by train means you walk off with only day bags; full luggage can go to your Kyoto hotel by takkyubin delivery", zh: "<strong>京都輕裝遊覽</strong> — 以火車抵達，只需帶隨身小包，大件行李可由名古屋酒店宅配到京都酒店" }
          ],
          cons: [
            { en: "<strong>Nagoya is a transit-only stop</strong> — You won't have time to explore it as a tourist destination", zh: "<strong>名古屋只作中途換乘</strong> — 沒有額外時間深度遊覽名古屋景點" },
            { en: "<strong>One-way drop-off surcharge still applies</strong> — ¥15,000–¥20,000 fee on top of rental cost", zh: "<strong>仍需支付異地還車附加費</strong> — 約 ¥15,000–¥20,000 額外收費" },
            { en: "<strong>Need to plan luggage logistics</strong> — Consider takkyubin (宅配便) from Nagoya hotel to Kyoto hotel (¥2,000–¥3,000 per bag)", zh: "<strong>需安排行李物流</strong> — 建議使用宅配便（¥2,000–¥3,000/件）從名古屋酒店寄往京都酒店" }
          ],
          tips: [
            {
              icon: "🏨",
              label: { en: "Where to Stay", zh: "住宿建議" },
              detail: {
                en: "Stay <strong>near Nagoya Station</strong> — all rental offices are within a 5-min taxi. Good options: <strong>JR Gate Tower Hotel</strong> (right above the station, stunning city views), <strong>Marriott Associa Nagoya</strong> (connected to the station), or the more affordable <strong>Mitsui Garden Hotel Nagoya Premier</strong>. Book 1 night.",
                zh: "建議住在<strong>名古屋車站附近</strong> — 所有租車公司均在車站 5 分鐘的士範圍內。推薦酒店：<strong>JR Gate Tower Hotel</strong>（直接連接車站，城市景觀一流）、<strong>Marriott Associa 名古屋</strong>（車站連接）或性價比更高的 <strong>Mitsui Garden Hotel 名古屋 Premier</strong>。建議預訂 1 晚。"
              }
            },
            {
              icon: "🍽️",
              label: { en: "What to Eat", zh: "美食推介" },
              detail: {
                en: "Don't miss Nagoya's signature dishes: <strong>Miso Katsu</strong> (味噌豬排 — Yabaton is the classic chain; Misokatsu Matsunoya for sit-down), <strong>Hitsumabushi</strong> (ひつまぶし — grilled eel rice eaten three ways; try Atsuta Horaiken near the station), and <strong>Tebasaki</strong> (手羽先 — spicy chicken wings at Yamachan).",
                zh: "必嚐名古屋特色美食：<strong>味噌炸豬排</strong>（矢場とん是經典連鎖；松乃家為舒適坐食選擇）、<strong>鰻魚飯三吃（Hitsumabushi）</strong>（推薦車站附近的熱田蓬萊軒）及<strong>手羽先（Tebasaki）</strong>（炸辣雞翼，推薦山ちゃん）。"
              }
            }
          ]
        },
        {
          id: "car-return-kyoto",
          icon: "⛩️",
          title: { en: "Kyoto", zh: "京都" },
          subtitle: { en: "Drive direct to Kyoto · Drop off Day 7 night", zh: "直接開車到京都 · 第 7 天晚上歸還" },
          verdict: "caution",
          verdictLabel: { en: "Alternative", zh: "可行替代" },
          pros: [
            { en: "<strong>No train transfer with luggage</strong> — Pack bags in the car at Hakone and don't touch them until your Kyoto hotel lobby", zh: "<strong>無需轉車搬運行李</strong> — 箱根上車後行李全程在尾箱，直至京都酒店大堂才取下" },
            { en: "<strong>Door-to-door comfort</strong> — Drive right to your Kyoto hotel entrance, unload, then return the car nearby", zh: "<strong>點對點舒適直達</strong> — 直接開到京都酒店門口放下行李，再到附近分店還車" },
            { en: "<strong>Scenic Mei-Shin Expressway route</strong> — Beautiful drive through Shizuoka and Aichi prefectures", zh: "<strong>名神高速公路沿途風景優美</strong> — 途經靜岡及愛知縣，一路欣賞冬日景色" }
          ],
          cons: [
            { en: "<strong>Higher one-way fee</strong> — Tokyo→Kyoto costs approx ¥25,000–¥35,000 (¥10,000+ more than Nagoya)", zh: "<strong>異地還車費較高</strong> — 東京→京都約需 ¥25,000–¥35,000（比名古屋貴 ¥10,000 以上）" },
            { en: "<strong>Long driving day (~4.5–5.5 hrs)</strong> — Dec 26 traffic around Nagoya and Kyoto can be heavy; fatigue for sole driver", zh: "<strong>駕駛時間偏長（約 4.5–5.5 小時）</strong> — 12月26日名古屋至京都路段車流較多，單一司機容易疲倦" },
            { en: "<strong>Kyoto city traffic is challenging</strong> — Narrow streets, one-way systems, and expensive parking if return is delayed", zh: "<strong>京都市內交通極具挑戰</strong> — 道路狹窄、單程路多，若延遲還車停車費昂貴" }
          ],
          tips: [
            {
              icon: "🏨",
              label: { en: "Where to Stay", zh: "住宿建議" },
              detail: {
                en: "Stay near <strong>Kyoto Station South (Hachijo Exit)</strong> — this is where most car rental drop-off locations are clustered (Toyota, Nissan, Times). Recommended: <strong>Hotel Granvia Kyoto</strong> (inside the station), <strong>Miyako Hotel Kyoto Hachijo</strong>, or <strong>Daiwa Roynet Hotel Kyoto Terrace Hachijo</strong>. Easy drop-off within 500m of the hotel.",
                zh: "建議住在<strong>京都站南口（八條口）附近</strong> — 這是租車分店（Toyota、Nissan、Times）集中地。推薦：<strong>Hotel Granvia 京都</strong>（站內直通）、<strong>京都八條都酒店</strong>或 <strong>Daiwa Roynet Hotel 京都 Terrace 八條</strong>。還車點距酒店僅 500 米內。"
              }
            }
          ]
        },
        {
          id: "car-return-osaka",
          icon: "🏙️",
          title: { en: "Osaka", zh: "大阪" },
          subtitle: { en: "Keep car through Kyoto · Return Day 10–12", zh: "繼續開車遊關西 · 第 10–12 天歸還" },
          verdict: "notrecommended",
          verdictLabel: { en: "Not Recommended", zh: "不建議" },
          pros: [
            { en: "<strong>Maximum flexibility for Kansai segment</strong> — Could theoretically drive Kyoto → Nara → Osaka at your own pace", zh: "<strong>關西段行程最靈活</strong> — 理論上可自駕 京都→奈良→大阪，按自訂節奏遊覽" },
            { en: "<strong>Useful if visiting rural Nara or off-route spots</strong> — Some outer Nara temples (e.g. Hōryū-ji) are easier with a car", zh: "<strong>若遊覽奈良郊區景點較方便</strong> — 部分奈良郊外寺院（如法隆寺）有車更易到達" },
            { en: "<strong>No mid-trip vehicle switch needed</strong> — Everything in one booking for the full duration", zh: "<strong>全程一張合約</strong> — 無需中途更換預訂或安排換車" }
          ],
          cons: [
            { en: "<strong>Highest one-way drop fee</strong> — Tokyo→Osaka can cost ¥35,000–¥50,000+", zh: "<strong>異地還車費用最高</strong> — 東京→大阪可達 ¥35,000–¥50,000 甚至以上" },
            { en: "<strong>Parking in Kyoto AND Osaka is very costly</strong> — You'll pay ¥500–¥1,500/hour across multiple days in the city", zh: "<strong>京都及大阪泊車費用高昂</strong> — 多天市區停車每小時 ¥500–¥1,500，費用可觀" },
            { en: "<strong>Osaka city driving is complex</strong> — Heavy traffic, taxi/bus lanes, and aggressive drivers near Dotonbori / Namba", zh: "<strong>大阪市區行車複雜</strong> — 道頓堀 / 難波一帶交通繁忙、的士巴士專線多，駕車壓力大" }
          ],
          tips: [
            {
              icon: "🏨",
              label: { en: "Where to Stay", zh: "住宿建議" },
              detail: {
                en: "If returning in Osaka, stay near <strong>Osaka Station / Umeda</strong> or <strong>Namba</strong>. Recommended: <strong>Hotel Monterey Grasmere Osaka</strong> or <strong>Cross Hotel Osaka</strong>.",
                zh: "若選擇在大阪還車，建議住在<strong>大阪站 / 梅田</strong>或<strong>難波</strong>附近。推薦：<strong>Hotel Monterey Grasmere Osaka</strong> 或 <strong>Cross Hotel 大阪</strong>。"
              }
            }
          ]
        }
      ]
    },
    planB: {
      question: {
        en: "Where should you return the rental car in the Scenic Loop? (Plan B)",
        zh: "關東靜岡自駕環線應在哪裡歸還租車？（方案 B）"
      },
      context: {
        en: "The Plan B setup: <strong>pick up the car on Day 3 (Dec 27) leaving Tokyo</strong>, enjoy the 3-day loop across Mt Fuji, Hakone, and Kamakura, then <strong>return it on Day 5 (Dec 29) with ZERO drop-off fee</strong> before taking an easy 30-min train back to your central Tokyo base.",
        zh: "方案 B 安排：<strong>第 3 天（12 月 27 日）離開東京時取車</strong>，展開富士山、箱根及鎌倉 3 天自駕環線，在<strong>第 5 天（12 月 29 日）以零異地還車費歸還</strong>，隨後搭乘舒適短程火車直達東京市區酒店。"
      },
      recommendation: {
        en: "🏆 Our pick: <strong>Yokohama Depot (Day 5)</strong> — Zero drop-off fee, drop off after Chinatown lunch, and take a quick 30-min JR train straight back to Tokyo.",
        zh: "🏆 建議選擇：<strong>橫濱分店（第 5 天）</strong> — 零異地還車費，遊覽紅磚倉庫及中華街後交車，搭乘 30 分鐘 JR 直達東京市區酒店。"
      },
      options: [
        {
          id: "car-return-yokohama",
          icon: "🎡",
          title: { en: "Yokohama Depot (Day 5)", zh: "橫濱分店（第 5 天）" },
          subtitle: { en: "Plan B Recommended · Post-Chinatown drop-off", zh: "方案 B 推薦 · 中華街午餐後還車" },
          verdict: "current",
          verdictLabel: { en: "Best Choice", zh: "最佳首選" },
          pros: [
            { en: "<strong>¥0 one-way drop-off fee</strong> — Returning within Greater Tokyo/Kanagawa area incurs zero penalties", zh: "<strong>零異地還車附加費</strong> — 於首都圈/神奈川地區內歸還無任何異地手續費" },
            { en: "<strong>Avoids dense Tokyo city traffic</strong> — Avoids heavy Shinjuku/Shibuya expressways and parking fees", zh: "<strong>避開東京市區繁雜交通</strong> — 無須在市中心塞車或支付昂貴泊車費" },
            { en: "<strong>Direct 30-min JR train to Tokyo</strong> — JR Tokaido Line / Yokosuka Line takes you straight into central Tokyo with ease", zh: "<strong>30 分鐘 JR 直達東京</strong> — JR 東海道線 / 橫須賀線直達東京站或新橋站" }
          ],
          cons: [
            { en: "<strong>Short train ride with luggage</strong> — 30-min local rapid train journey into Tokyo station", zh: "<strong>需帶行李乘搭 30 分鐘火車</strong> — 需攜帶行李搭乘一段短途 JR 回東京" }
          ],
          tips: [
            {
              icon: "🏨",
              label: { en: "Logistics", zh: "交車物流" },
              detail: {
                en: "Drop off near Yokohama Station. Take the JR Tokaido Line straight to Tokyo Station or Shimbashi. Highly comfortable with elevators at all stations.",
                zh: "在橫濱站周邊分店交還車輛。乘搭 JR 東海道線直達東京站或新橋，各大車站全程均設有升降機。"
              }
            }
          ]
        },
        {
          id: "car-return-tokyo",
          icon: "🏙️",
          title: { en: "Central Tokyo Depot (Day 5)", zh: "東京市區分店（第 5 天）" },
          subtitle: { en: "Drive all the way to Tokyo hotel", zh: "直接開至東京酒店門口" },
          verdict: "caution",
          verdictLabel: { en: "Alternative", zh: "可行替代" },
          pros: [
            { en: "<strong>Door-to-door luggage drop</strong> — Unload all suitcases directly at your Tokyo hotel lobby before returning car", zh: "<strong>行李直接送達酒店大堂</strong> — 先在東京酒店放下行李才交還車輛" },
            { en: "<strong>Zero drop-off fee</strong> — Pick up and return in same Tokyo municipality", zh: "<strong>零異地還車費</strong> — 同在東京市區借還，無異地手續費" }
          ],
          cons: [
            { en: "<strong>Heavy Metropolitan Expressway traffic</strong> — Evening peak traffic heading into Tokyo can be slow and stressful", zh: "<strong>東京首都高易塞車</strong> — 傍晚進入東京市中心車流較大，行車需時" }
          ],
          tips: [
            {
              icon: "🚦",
              label: { en: "Timing", zh: "時間安排" },
              detail: {
                en: "Return the car early in the afternoon (by 15:00) to avoid the evening rush hour on Route 1 / Metropolitan Expressway.",
                zh: "建議下午 3 點前抵達交車，避開傍晚下班高峰期的首都高速道路擁堵。"
              }
            }
          ]
        },
        {
          id: "car-return-airport",
          icon: "✈️",
          title: { en: "Haneda Airport (Day 12)", zh: "羽田機場歸還（第 12 天）" },
          subtitle: { en: "Keep car until departure flight", zh: "一直保留至登機當日" },
          verdict: "notrecommended",
          verdictLabel: { en: "Not Recommended", zh: "不建議" },
          pros: [
            { en: "<strong>No train transit with bags</strong> — Drive straight to the terminal on departure day", zh: "<strong>最後一日直達航廈</strong> — 啟程當天直接將行李載到機場" }
          ],
          cons: [
            { en: "<strong>Wasteful rental & parking costs</strong> — You pay 3 extra rental days + ~¥3,000–5,000/night hotel parking in Tokyo where you do not need a car", zh: "<strong>額外租車與停車費用高昂</strong> — 多付 3 天租車費及東京每晚 ¥3,000–5,000 停車費，且市區完全用不上車" }
          ],
          tips: [
            {
              icon: "💡",
              label: { en: "Advice", zh: "建議" },
              detail: {
                en: "Central Tokyo has the world's best subway network. Keeping a rental car in Tokyo adds expense and stress.",
                zh: "東京市區鐵路網絡極為發達，在市區保留租車只會增加泊車成本與找車位的困擾。"
              }
            }
          ]
        }
      ]
    }
  },

  /* ─── Car Rental Search Section ─────────────────────────────────────
   * Displays a search widget + 3 rental company cards below the
   * Car Return Decision section.
   * Rendered by render.js renderCarRental() → #car-rental-section.
   *
   * quickPickup[]  — preset pickup location pills (same idea as hotel
   *                  quickLegs). Each: { label:{en,zh}, location }
   *                  where `location` is the text pre-filled in the
   *                  pickup input.
   *
   * companies[]    — 3 rental company cards.
   *                  Each: { id, logo (emoji), name, nameJp, tagline:{en,zh},
   *                          features:[{en,zh}], note:{en,zh},
   *                          badge:{en,zh}, badgeClass,
   *                          searchUrl  — deep-link to the company's
   *                          English search page with pickup location
   *                          pre-set to Tokyo. }
   * ──────────────────────────────────────────────────────────────────*/
  carRental: {
    intro: {
      en: "<strong>Plan:</strong> Pick up on <strong>Day 5 (Dec 24)</strong> when leaving Tokyo → drive Mt Fuji / Kawaguchiko / Hakone → return the car on <strong>Day 7 (Dec 26) immediately after hotel check-in</strong> at your chosen drop-off city. All three companies support one-way (異地還車) rentals, English GPS, and studless winter tyres on request. Book at least 4–6 weeks ahead — December is peak season.",
      zh: "<strong>計劃安排：</strong><strong>第 5 天（12 月 24 日）</strong>離開東京時取車 → 自駕遊覽富士山/河口湖/箱根 → 在<strong>第 7 天（12 月 26 日）辦妥目的地酒店入住後立即歸還</strong>。三家公司均提供異地還車、英文 GPS 及冬季無釘雪地輪胎（需指定）。12 月為旺季，請至少提前 4–6 週預訂。"
    },
    quickPickup: [
      { label: { en: "Tokyo (Day 5 · Dec 24)", zh: "東京（第 5 天 · 12月24日）" }, location: "Shinjuku, Tokyo" },
      { label: { en: "Haneda Airport (arrival day)", zh: "羽田機場（抵達當日）" }, location: "Haneda Airport, Tokyo" },
      { label: { en: "Narita Airport (arrival day)", zh: "成田機場（抵達當日）" }, location: "Narita Airport, Chiba" }
    ],

    /* ─── Vehicle Recommendation ──────────────────────────────────────
     * Luggage context: 2 adults × (1 large suitcase + 1 cabin bag + 1 backpack)
     *   = 2 large suitcases (≈75L each) + 2 cabin bags + 2 backpacks (6 pieces total)
     * 4-card grid: Mid-size SUV, Liftback/Wagon, Minivan/MPV, Kei Car (Avoid)
     * ──────────────────────────────────────────────────────────────── */
    vehicleRec: {
      luggageContext: {
        en: "Your party: <strong>2 adults</strong> — bringing 2 large suitcases (check-in size, ~75L), 2 cabin bags, and 2 personal backpacks. That is <strong>6 pieces of luggage total</strong>. You also need boot space for winter coats and souvenirs during the Mt Fuji drive.",
        zh: "同行共 <strong>2 位成人</strong>，攜帶 2 件大型行李箱（寄艙尺寸，約 75L）、2 件手提行李及 2 個個人背包，合共 <strong>6 件行李</strong>。另需預留車尾箱空間放置厚外套及自駕途中的特產手信。"
      },
      picks: [
        {
          id: "vehicle-suv",
          verdict: "recommended",
          icon: "🚙",
          category: { en: "Mid-size SUV (4WD/AWD)", zh: "中型 SUV (四驅)" },
          models: { en: "Toyota RAV4, Nissan X-Trail, Subaru Forester", zh: "Toyota RAV4、Nissan X-Trail、Subaru Forester" },
          boot: { en: "~500–580L (fits 2 large 75L suitcases flat)", zh: "~500–580L（可平放 2 件 75L 大行李箱）" },
          why: {
            en: "<strong>The ideal balance of luggage capacity and winter capability.</strong> The boot easily fits 2 large 75L suitcases flat side-by-side, with cabin bags and backpacks on top or on the rear seats. High ground clearance and AWD give exceptional confidence on snowy Hakone and Gotemba mountain passes.",
            zh: "<strong>行李容量與冬季駕駛性能的理想平衡。</strong>車尾箱可輕鬆平放 2 件 75L 大型行李箱，其餘手提行李及背包可放於上方或後座。較高底盤與 AWD 四驅系統在積雪的箱根與御殿場山路提供卓越的抓地力與安全感。"
          },
          badge: { en: "✅ Recommended Pick", zh: "✅ 首選推薦" },
          badgeClass: "vbadge-green"
        },
        {
          id: "vehicle-liftback",
          verdict: "alternative",
          icon: "🚗",
          category: { en: "Liftback / Wagon (Hybrid)", zh: "揭背車 / 旅行車 (油電混合)" },
          models: { en: "Toyota Prius (5th Gen E-Four), Corolla Touring", zh: "Toyota Prius (第5代 E-Four)、Corolla Touring" },
          boot: { en: "~390–410L (liftback hatch)", zh: "~390–410L（掀背大開口尾箱）" },
          why: {
            en: "<strong>Agile, whisper-quiet, and extremely economical.</strong> The 5th-gen Prius wide liftback hatch takes 2 large suitcases flat. Ultra-quiet TNGA cabin ensures a peaceful ride for senior comfort, while achieving ~30 km/L hybrid efficiency. E-Four electric AWD provides winter traction, and compact dimensions make parking in scenic towns effortless.",
            zh: "<strong>靈活好揸、車廂極靜且超級省油。</strong>第 5 代 Prius 揭背大開口尾箱可平放 2 件大行李箱。TNGA 隔音極佳，為長輩提供寧靜舒適的乘坐感，油耗達 ~30 km/L。配備 E-Four 電子四驅應對積雪，車身緊湊在溫泉小鎮窄路穿梭及泊車毫無壓力。"
          },
          badge: { en: "💡 Agility & Economy", zh: "💡 靈活省油推薦" },
          badgeClass: "vbadge-amber"
        },
        {
          id: "vehicle-minivan",
          verdict: "alternative",
          icon: "🚐",
          category: { en: "Minivan / MPV", zh: "廂式客貨車 / 七人車" },
          models: { en: "Toyota Voxy/Noah, Nissan Serena, Toyota Alphard", zh: "Toyota Voxy/Noah、Nissan Serena、Toyota Alphard" },
          boot: { en: "~500–900L (vast flat floor)", zh: "~500–900L（超大平整空間）" },
          why: {
            en: "<strong>Maximum senior passenger comfort and boarding ease.</strong> Ultra-low flat step-in floors and electric sliding doors make getting in and out completely effortless for Mum. Larger than strictly necessary for 2 adults, but offers unbeatable space and relaxation.",
            zh: "<strong>極致長輩上下車便利度與寬敞感。</strong>超低地台設計與電動雙側滑門，讓長輩上下車完全無須彎腰費力。雖然對 2 位成人而言空間偏大，但在舒適放鬆度方面無可挑剔。"
          },
          badge: { en: "🛋️ Senior Comfort", zh: "🛋️ 長輩舒適首選" },
          badgeClass: "vbadge-amber"
        },
        {
          id: "vehicle-kei",
          verdict: "avoid",
          icon: "🚗",
          category: { en: "Kei Car (軽自動車, 660cc)", zh: "輕型車 (軽自動車, 660cc)" },
          models: { en: "Honda N-Box, Suzuki Jimny, Suzuki Alto", zh: "Honda N-Box、Suzuki Jimny、Suzuki Alto" },
          boot: { en: "~100–200L — inadequate for 2 large suitcases", zh: "~100–200L — 無法容納 2 件大行李箱" },
          why: {
            en: "<strong>Avoid for winter mountain driving.</strong> Kei car boots cannot fit 2 large check-in suitcases. Additionally, the 660cc engine struggles on steep snowy mountain switchbacks (Hakone Skyline) in December. (Note: Enthusiast hatches like GR Yaris / GR Corolla were also evaluated and ruled out due to stiff damping and insufficient boot space).",
            zh: "<strong>冬季山路自駕請避免。</strong>微型車車尾箱無法容納 2 件 75L 寄艙大行李箱。此外，660cc 引擎在 12 月積雪的箱根陡峭山路與高速公路上爬坡極為吃力。（註：熱血鋼炮如 GR Yaris / GR Corolla 經評估後亦已排除，其避震過硬且尾箱極小，不適合長輩同行）。"
          },
          badge: { en: "❌ Avoid for this route", zh: "❌ 冬季山路不建議" },
          badgeClass: "vbadge-red"
        }
      ]
    },
    companies: [
      {
        id: "rental-toyota",
        logo: "🚙",
        name: "Toyota Rent a Car",
        nameJp: "トヨタレンタカー",
        tagline: {
          en: "Japan's largest rental network — most locations, widest vehicle choice.",
          zh: "日本最大租車網絡 — 分店最多、車款選擇最廣。"
        },
        badge: { en: "Most Locations", zh: "分店最多" },
        badgeClass: "badge-blue",
        features: [
          { en: "✔ One-way drop-off nationwide (Tokyo → Nagoya / Kyoto / Osaka)", zh: "✔ 全國異地還車（東京→名古屋/京都/大阪）" },
          { en: "✔ English online booking & English GPS available", zh: "✔ 提供英文網上預訂及英文 GPS" },
          { en: "✔ Studless winter tyres — request at booking (必須指定)", zh: "✔ 無釘雪地輪胎 — 預訂時請特別指定（必須指定）" },
          { en: "✔ Wide range: mid-size SUV, hybrid liftback & MPV for 2 adults + luggage", zh: "✔ 車型齊全：中型 SUV、油電掀背車及 MPV，適合兩人行李與長輩乘坐" },
          { en: "✔ ETC card rental available for expressway toll auto-pay", zh: "✔ 提供 ETC 卡租用，高速公路過路費自動繳付" }
        ],
        note: {
          en: "<strong>Pickup:</strong> Toyota Rent-a-Car Shinjuku Station East or Haneda Airport Terminal 3 on <strong>Day 5, Dec 24</strong>. <strong>Return:</strong> Drop off on <strong>Day 7 (Dec 26) at the branch closest to your hotel, immediately after check-in</strong> — hand over the keys and head straight to your room.",
          zh: "<strong>取車：</strong>豐田租車新宿駅東口店或羽田機場第 3 航廈店，<strong>第 5 天（12 月 24 日）</strong>辦理取車手續。<strong>還車：</strong>在<strong>第 7 天（12 月 26 日）辦妥酒店入住後立即</strong>前往最近分店歸還 — 交還鑰匙後即可輕鬆入房。"
        },
        searchUrl: "https://rent.toyota.co.jp/en/"
      },
      {
        id: "rental-nissan",
        logo: "🚘",
        name: "Nissan Rent a Car",
        nameJp: "日産レンタカー",
        tagline: {
          en: "Great value EV & hybrid fleet — Nissan LEAFs available nationwide.",
          zh: "超值油電/純電車隊 — 日產 LEAF 電動車全國可租。"
        },
        badge: { en: "Best for EV / Hybrid", zh: "電動車首選" },
        badgeClass: "badge-green",
        features: [
          { en: "✔ One-way rentals: Tokyo → Nagoya / Kyoto / Osaka available", zh: "✔ 提供異地還車：東京→名古屋/京都/大阪" },
          { en: "✔ Nissan LEAF (electric) & Note e-POWER (hybrid) ideal for Mt Fuji drive", zh: "✔ 日產 LEAF（電動）及 Note e-POWER（油電）— 富士山路段理想之選" },
          { en: "✔ English GPS system available at most branches", zh: "✔ 大多數分店提供英文 GPS" },
          { en: "✔ Studless winter tyres — available on request", zh: "✔ 提供無釘雪地輪胎（需預訂時指定）" },
          { en: "✔ Transparent pricing, no hidden fuel surcharges on EV models", zh: "✔ 定價透明，電動車款無隱藏燃油附加費" }
        ],
        note: {
          en: "<strong>Pickup:</strong> Nissan Rent-a-Car Shinjuku or Ikebukuro on <strong>Day 5, Dec 24</strong>. Note: EV range is reduced in cold December weather — plan charging stops around Mt Fuji. <strong>Return:</strong> Day 7 (Dec 26) immediately after hotel check-in at your chosen city.",
          zh: "<strong>取車：</strong>日産租車新宿或池袋分店，<strong>第 5 天（12 月 24 日）</strong>辦理。注意：12 月低溫令電動車續航下降，請提前規劃富士山周邊充電點。<strong>還車：</strong>第 7 天（12 月 26 日）於目的地酒店辦妥入住後立即歸還。"
        },
        searchUrl: "https://nissan-rentacar.com/en/"
      },
      {
        id: "rental-nippon",
        logo: "🚐",
        name: "Nippon Rent-A-Car",
        nameJp: "ニッポンレンタカー",
        tagline: {
          en: "Nationwide budget-friendly option — great for families watching costs.",
          zh: "全國性經濟之選 — 注重預算的家庭首選。"
        },
        badge: { en: "Best Value", zh: "最佳性價比" },
        badgeClass: "badge-gold",
        features: [
          { en: "✔ Competitive one-way fees — often lower than Toyota/Nissan for Tokyo→Nagoya", zh: "✔ 極具競爭力的異地還車費 — 東京→名古屋路段費用常低於豐田/日産" },
          { en: "✔ English online reservation system", zh: "✔ 提供英文網上預訂系統" },
          { en: "✔ Studless winter tyres available (冬用スタッドレスタイヤ)", zh: "✔ 提供冬季無釘雪地輪胎（冬用スタッドレスタイヤ）" },
          { en: "✔ Good selection of minivans & compact SUVs for family trips", zh: "✔ 廂式客貨車及 SUV 選擇充裕，適合家庭旅遊" },
          { en: "✔ Over 500 branches across Japan including all major airports", zh: "✔ 全日本逾 500 間分店，涵蓋各主要機場" }
        ],
        note: {
          en: "<strong>Pickup:</strong> Nippon Rent-A-Car Shinjuku or nearest Tokyo branch on <strong>Day 5, Dec 24</strong>. <strong>Return:</strong> Day 7 (Dec 26) immediately after hotel check-in — the earlier you return, the lower your daily charge. Compare Nippon's Tokyo→Nagoya one-way fee against Toyota before booking; it is frequently ¥3,000–¥5,000 cheaper.",
          zh: "<strong>取車：</strong>Nippon 租車新宿店或最近的東京分店，<strong>第 5 天（12 月 24 日）</strong>辦理。<strong>還車：</strong>第 7 天（12 月 26 日）辦妥酒店入住後盡早歸還 — 越早還車費用越低。預訂前請比較 Nippon 與豐田的東京→名古屋異地還車費，前者通常便宜 ¥3,000–¥5,000。"
        },
        searchUrl: "https://www.nipponrentacar.co.jp/en/"
      }
    ]
  },

  /* ─── Practical Tips Section ─── */
  tips: [
    {
      id: "tip-transport",
      icon: "🚆",
      title: { en: "Transport Passes", zh: "交通卡券" },
      items: [
        {
          en: "<strong>Suica / PASMO card</strong> — Tap-and-go for all trains, buses, and convenience stores in Tokyo. Add to Apple/Google Wallet.",
          zh: "<strong>Suica / PASMO 卡</strong> — 適用於東京所有地鐵、巴士和便利店。可以直接加入 Apple/Google Wallet。"
        },
        {
          en: "<strong>JR Kansai Area Pass (4-day)</strong> — Covers JR trains in Kyoto (京都), Osaka (大阪), Nara (奈良), Kobe (神戶). Buy online before departure for discount.",
          zh: "<strong>JR 關西地區鐵路周遊券 (4日)</strong> — 覆蓋京都、大阪、奈良、神戶的 JR 火車。出發前網上購買享優惠。"
        },
        {
          en: "<strong>Rental car</strong> — Book via Nissan or Toyota Rent-a-Car. Request <strong>studless winter tyres + GPS with English</strong>. One-way drop-off fee applies (Tokyo → Nagoya ≈ ¥15,000–20,000).",
          zh: "<strong>自駕租車</strong> — 建議選擇日產 (Nissan) 或豐田 (Toyota) 租車。<strong>必須指定配備雪地無釘輪胎 (Studless Winter Tyres)</strong> 及英文 GPS。異地還車（東京借、名古屋還）需收約 ¥15,000–20,000 附加費。"
        },
        {
          en: "<strong>1949 International Driving Permit (IDP 1949)</strong> — As UK licence holders, all drivers must obtain the <strong>1949 Geneva Convention IDP</strong> at a UK Post Office (£5.50) before travelling.",
          zh: "<strong>1949 公約國際駕駛執照 (1949 IDP)</strong> — 持英國駕照者，出發前須於英國郵局 (Post Office) 申領 <strong>1949 年公約 IDP</strong>（£5.50）。取車時須出示英國駕照正本與 1949 IDP。"
        }
      ]
    },
    {
      id: "tip-passports",
      icon: "🛂",
      title: { en: "Passport & Visa Entry Requirements", zh: "各護照入境日本簽證要求" },
      items: [
        {
          en: "<strong>British Citizen (BC) Passport</strong> — Visa-free entry for up to 90 days for tourism.",
          zh: "<strong>英國公民護照 (British Citizen)</strong> — 獲免簽證入境日本最長 90 天（觀光性質）。"
        },
        {
          en: "<strong>BN(O) Passport (British National (Overseas))</strong> — Visa-free entry for up to 90 days for tourism.",
          zh: "<strong>英國國民（海外）護照 (BN(O))</strong> — 獲免簽證入境日本最長 90 天（觀光性質）。"
        },
        {
          en: "<strong>HKSAR Passport (Hong Kong SAR)</strong> — Visa-free entry for up to 90 days for tourism.",
          zh: "<strong>香港特區護照 (HKSAR)</strong> — 獲免簽證入境日本最長 90 天（觀光性質）。"
        },
        {
          en: "<strong>Portuguese / EU Passport (Portugal)</strong> — Visa-free entry for up to 90 days for tourism.",
          zh: "<strong>葡萄牙 / 歐盟護照 (Portugal)</strong> — 獲免簽證入境日本最長 90 天（觀光性質）。"
        },
        {
          en: "<strong>Summary & Best Practice</strong> — All 4 passports held by your family enjoy 90-day visa-free entry. Ensure passports have at least 6 months validity. Use the <em>same</em> passport for check-in, Japan immigration, hotel registration, and tax-free shopping throughout the trip.",
          zh: "<strong>總結與注意事項</strong> — 全家持有的 4 種護照均享 90 天免簽證入境。請確保護照有效期至少有 6 個月。整段行程請統一使用同一本護照辦理登機、入境、酒店登記及退稅。"
        },
        {
          en: "<strong>Visit Japan Web (VJW)</strong> — All travellers should complete online immigration and customs declarations via the official <a href=\"https://services.digital.go.jp/vjw-landing/\" target=\"_blank\" rel=\"noopener\">Visit Japan Web</a> before departure to generate fast-track QR codes.",
          zh: "<strong>Visit Japan Web 網上申報</strong> — 出發前，全員請於官方 <a href=\"https://services.digital.go.jp/vjw-landing/\" target=\"_blank\" rel=\"noopener\">Visit Japan Web</a> 完成入境及海關申報，獲取 QR Code 以便快捷過關。"
        }
      ]
    },
    {
      id: "tip-uk-driving",
      icon: "🪪",
      title: { en: "UK Licence & 1949 IDP Rules", zh: "英國駕照與 1949 IDP 國際駕照指南" },
      items: [
        {
          en: "<strong>1949 Geneva Convention Requirement</strong> — Japan strictly requires International Driving Permits issued under the <strong>1949 Geneva Convention</strong>. Standard UK photocard driving licences alone are NOT valid to drive in Japan.",
          zh: "<strong>必須符合 1949 年日內瓦公約</strong> — 日本僅承認按 <strong>1949 年日內瓦公約</strong> 簽發的國際駕駛執照 (IDP)。單憑英國正本駕駛執照 (UK Photocard Licence) 不能在日本駕駛。"
        },
        {
          en: "<strong>Obtain at UK Post Office (£5.50)</strong> — All drivers must apply over the counter at participating <strong>UK Post Offices</strong> before departure. Bring your UK photocard licence, a passport photo, and £5.50 per permit.",
          zh: "<strong>於英國郵局辦理 (£5.50)</strong> — 出發前，所有司機須親身到指定<strong>英國郵局 (UK Post Office)</strong> 櫃位辦理。攜帶英國正本駕照、護照相片及 £5.50 申請費即可即時獲發。"
        },
        {
          en: "<strong>Specify the 1949 IDP</strong> — UK Post Offices also issue 1968 Convention IDPs (for Europe). You <strong>must explicitly request the 1949 Convention IDP</strong> for Japan.",
          zh: "<strong>請務必指定 1949 IDP</strong> — 英國郵局同時提供適用於歐洲的 1968 年公約 IDP。在郵局辦理時，<strong>必須特別指明申請 1949 年公約版本</strong>。"
        },
        {
          en: "<strong>Documents Required at Car Pickup</strong> — When picking up the car in Tokyo (Day 5), present: <strong>1) Original UK Photocard Driving Licence</strong>, <strong>2) 1949 IDP</strong>, and <strong>3) Passport</strong>.",
          zh: "<strong>取車時所需文件</strong> — 在東京取車時（第 5 天），必須同時出示：<strong>1) 英國駕駛執照正本</strong>、<strong>2) 1949 IDP 國際駕照</strong>及 <strong>3) 護照</strong>。"
        }
      ]
    },
    {
      id: "tip-booking",
      icon: "🎫",
      title: { en: "Advance Bookings", zh: "景點與餐飲預約" },
      items: [
        {
          en: "<strong>Ryokan (Mt Fuji / Hakone)</strong> — Book 2–3 months ahead. Request \"Fuji-view\" room specifically.",
          zh: "<strong>溫泉旅館（富士山 / 箱根）</strong> — 必須提前 2 至 3 個月預訂。預訂時請特別註明需要「富士山景房 (Fuji-view room)」。"
        },
        {
          en: "<strong>teamLab Borderless</strong> — Online tickets only, sell out fast. Book 2+ weeks ahead.",
          zh: "<strong>teamLab 無界美術館</strong> — 僅限網上預售門票，極快售罄。請至少提早 2 星期預購。"
        },
        {
          en: "<strong>Restaurants</strong> — Reserve popular spots 3+ weeks ahead for Christmas week. Use Tabelog or ask your hotel concierge.",
          zh: "<strong>餐廳預約</strong> — 聖誕黃金周期間，熱門餐廳必須提早 3 星期以上預約。可使用 Tabelog 網站或請酒店禮賓部協助。"
        },
        {
          en: "<strong>Fushimi Inari (伏見稻荷大社)</strong> — Free entry, no reservation needed, but go early (before 9 AM) to beat crowds.",
          zh: "<strong>伏見稻荷大社</strong> — 免費入場，無須預約，但建議早上 9 點前抵達以避開旅行團。"
        }
      ]
    },
    {
      id: "tip-etiquette",
      icon: "🙏",
      title: { en: "Etiquette & Culture", zh: "當地禮儀與習俗" },
      items: [
        {
          en: "<strong>Shoes off</strong> — Remove shoes when entering homes, ryokans, some restaurants, and temple halls.",
          zh: "<strong>脫鞋禮儀</strong> — 進入傳統溫泉旅館、部分餐廳、日式民居及寺廟大殿時必須脫鞋。"
        },
        {
          en: "<strong>Quiet trains</strong> — Keep phone on silent; avoid calls or loud conversations on trains.",
          zh: "<strong>乘車禮儀</strong> — 乘搭火車及地鐵時，請將電話調至靜音模式，並避免大聲說話或講電話。"
        },
        {
          en: "<strong>Onsen rules</strong> — Wash thoroughly before entering. Tattoos may need cover-up patches (ask beforehand). Towels stay out of the water.",
          zh: "<strong>溫泉守則</strong> — 進入浴池前必須先在淋浴區徹底沖洗乾淨。如有紋身可能需要使用遮蓋貼紙（請先向旅館查詢）。毛巾切勿放入池水中。"
        },
        {
          en: "<strong>Cash</strong> — Carry ¥10,000–20,000 in cash. Many small restaurants and temples are cash-only. 7-Eleven ATMs accept foreign cards.",
          zh: "<strong>現金準備</strong> — 請隨身攜帶至少 ¥10,000–20,000 現金。許多小店、神社及寺廟只收現金。7-Eleven 的 ATM 可用外國信用卡提款。"
        },
        {
          en: "<strong>Tipping</strong> — Never tip in Japan. It can be considered rude.",
          zh: "<strong>小費文化</strong> — 日本完全沒有給小費的習慣，甚至會被視為不禮貌。"
        }
      ]
    },
    {
      id: "tip-winter",
      icon: "❄️",
      title: { en: "Winter Driving Safety", zh: "冬季自駕安全" },
      items: [
        {
          en: "<strong>Drive in daylight only</strong> — Sunset is ~16:30 in December. Plan arrivals before dark.",
          zh: "<strong>日光時間駕駛</strong> — 12月日本約下午 4:30 便日落。請務必在天黑前抵達目的地旅館。"
        },
        {
          en: "<strong>Check weather daily</strong> — If heavy snow is forecast, skip the drive and take a train instead.",
          zh: "<strong>每日留意天氣</strong> — 如預測有大雪，應放棄自駕，改乘火車新幹線，安全至上。"
        },
        {
          en: "<strong>Go slow on mountain roads</strong> — Extra caution on bridges, tunnels, and shaded curves where black ice forms.",
          zh: "<strong>山路減速慢行</strong> — 橋樑、隧道出入口及背陰處容易形成肉眼難見的「黑冰 (Black Ice)」，須格外小心。"
        },
        {
          en: "<strong>Konbini pit stops</strong> — 7-Eleven, Lawson, FamilyMart are everywhere. Great for snacks, bathrooms, and hot drinks.",
          zh: "<strong>便利店補給站</strong> — 沿途的便利店是長途駕駛的最佳伴侶，可上洗手間、購買熱飲和點心。"
        }
      ]
    }
  ],

  /* ─── Packing Essentials Section ─── */
  packing: [
    {
      id: "pack-clothing",
      icon: "👕",
      title: { en: "Clothing", zh: "防寒衣物" },
      items: [
        {
          en: "Warm down jacket / puffer coat",
          zh: "防風保暖羽絨大衣 / Puffer外套"
        },
        {
          en: "Thermal base layers (Uniqlo HEATTECH recommended)",
          zh: "保暖內衣 / 發熱衣（推薦 Uniqlo HEATTECH，可在日本添置）"
        },
        {
          en: "Comfortable walking shoes (waterproof preferred)",
          zh: "好走路的防滑運動鞋（鞋面防潑水為佳）"
        },
        {
          en: "Scarf, gloves, warm hat",
          zh: "防寒三件套：圍巾、手套、毛帽"
        },
        {
          en: "Slip-on shoes (convenient for temples/ryokans)",
          zh: "易穿脫的鞋子（出入寺廟及溫泉旅館極方便）"
        }
      ]
    },
    {
      id: "pack-tech",
      icon: "📱",
      title: { en: "Tech & Travel", zh: "電子設備與旅行證件" },
      items: [
        {
          en: "Pocket Wi-Fi or eSIM (order before departure)",
          zh: "日本上網 SIM卡 / eSIM 或 Pocket Wi-Fi 蛋"
        },
        {
          en: "Power bank & USB-C cables",
          zh: "行動電源（充電寶）及充電線（低溫環境耗電快）"
        },
        {
          en: "Universal adapter (Japan uses Type A, 100V)",
          zh: "日本旅行插頭轉接器（雙平腳 Type A，電壓 100V）"
        },
        {
          en: "1949 Geneva Convention IDP + UK Photocard Driving Licence",
          zh: "1949 年公約國際駕駛執照 (IDP) 與英國駕駛執照正本 (UK Photocard Licence)"
        },
        {
          en: "Passport + copies",
          zh: "護照正本（有效期需在6個月以上）及副本"
        }
      ]
    },
    {
      id: "pack-misc",
      icon: "🎒",
      title: { en: "Handy Items", zh: "實用隨身小物" },
      items: [
        {
          en: "Small towel (for onsen foot bath visits)",
          zh: "小毛巾（方便在河口湖/箱根體驗無料足湯時擦腳）"
        },
        {
          en: "Foldable tote bag (for shopping tax-free purchases)",
          zh: "折疊環保購物袋（日本買手信/藥妝不提供免費膠袋）"
        },
        {
          en: "Cash in yen (¥50,000+ for the family)",
          zh: "日元現金（建議全家帶 ¥50,000 以上備用）"
        },
        {
          en: "Hand warmers (kairo — sold everywhere in Japan)",
          zh: "暖貼 / 暖包（Kairo，日本便利店及藥妝店均有售）"
        },
        {
          en: "Basic medications (painkillers, cold medicine)",
          zh: "常備個人藥物（止痛藥、感冒沖劑、腸胃藥）"
        }
      ]
    }
  ],

  /* ─── Budget Estimation Section ─── */
  budget: {
    planA: {
      items: [
        {
          category: {
            en: "🏨 Accommodation (11 nights)",
            zh: "🏨 酒店與溫泉旅館 (11晚)"
          },
          jpy: "¥300,000–490,000",
          min: 300000,
          max: 490000,
          initial: "$15,500–25,200",
          notes: {
            en: "1 Twin Room (9 hotel nights + 2 ryokan nights)",
            zh: "全程 1 間雙床房（9 晚市區酒店 + 2 晚一泊二食溫泉旅館）"
          }
        },
        {
          category: {
            en: "🚗 Car Rental (3 days + gas/tolls)",
            zh: "🚗 租車自駕 (3天，含路費油費)"
          },
          jpy: "¥45,000–65,000",
          min: 45000,
          max: 65000,
          initial: "$2,300–3,350",
          notes: {
            en: "SUV / Prius + winter tyres + Tokyo→Nagoya one-way fee",
            zh: "SUV / Prius + 雪胎 + 東京至名古屋異地還車費"
          }
        },
        {
          category: {
            en: "🚆 Trains & Metro",
            zh: "🚆 城市鐵路及新幹線"
          },
          jpy: "¥35,000–45,000",
          min: 35000,
          max: 45000,
          initial: "$1,800–2,300",
          notes: {
            en: "Nagoya→Kyoto Shinkansen (2 reserved seats) + Suica & Haruka",
            zh: "名古屋至京都新幹線指定席（2位）+ Suica 及 Haruka 機場特急"
          }
        },
        {
          category: {
            en: "🍽️ Food & Drinks",
            zh: "🍽️ 餐飲美食 (12天)"
          },
          jpy: "¥130,000–200,000",
          min: 130000,
          max: 200000,
          initial: "$6,700–10,300",
          notes: {
            en: "2 adults, 12 days. Mix of fine dining & local favourites",
            zh: "2 位成人 12 天餐飲，包含和牛料理、精緻懷石及地道美食"
          }
        },
        {
          category: {
            en: "🎫 Activities & Entrance Fees",
            zh: "🎫 景點門票及體驗活動"
          },
          jpy: "¥20,000–30,000",
          min: 20000,
          max: 30000,
          initial: "$1,000–1,550",
          notes: {
            en: "Skytree, teamLab, ropeways, temple entries",
            zh: "晴空塔、teamLab、箱根纜車、各名剎門票"
          }
        }
      ],
      total: {
        category: {
          en: "<strong>Total (excl. flights)</strong>",
          zh: "<strong>總預算估算 (不含機票)</strong>"
        },
        jpy: "<strong>¥530,000–830,000</strong>",
        min: 530000,
        max: 830000,
        initial: "<strong>$27,300–42,700</strong>",
        notes: {
          en: "For 2 adults, 12 days (1 Twin Room throughout)",
          zh: "2 位成人 12 天的行程預算（全程 1 間雙床房）"
        }
      }
    },
    planB: {
      items: [
        {
          category: {
            en: "🏨 Accommodation (6 nights)",
            zh: "🏨 酒店與溫泉旅館 (6晚)"
          },
          jpy: "¥160,000–250,000",
          min: 160000,
          max: 250000,
          initial: "$8,200–12,900",
          notes: {
            en: "1 Twin Room (4 hotel nights + 2 onsen ryokan nights)",
            zh: "全程 1 間雙床房（4 晚酒店 + 2 晚頂級溫泉旅館一泊二食）"
          }
        },
        {
          category: {
            en: "🚗 Car Rental (3 days loop)",
            zh: "🚗 租車自駕 (3天環線)"
          },
          jpy: "¥36,000–48,000",
          min: 36000,
          max: 48000,
          initial: "$1,850–2,470",
          notes: {
            en: "3-day MPV/SUV loop. Zero one-way fee! Gas, tolls & winter tires",
            zh: "3 天自駕環線，零異地還車費！包含油費、ETC 過路費及雪胎"
          }
        },
        {
          category: {
            en: "🚆 Trains & Metro",
            zh: "🚆 城市鐵路及地鐵"
          },
          jpy: "¥14,000–20,000",
          min: 14000,
          max: 20000,
          initial: "$720–1,030",
          notes: {
            en: "Tokyo metro, Keikyu / N'EX airport trains, Yokohama-Tokyo JR. No Shinkansen needed",
            zh: "東京地鐵、京急/成田快線機場鐵路、橫濱回東京 JR。無需新幹線！"
          }
        },
        {
          category: {
            en: "🍽️ Food & Drinks",
            zh: "🍽️ 餐飲美食 (7天)"
          },
          jpy: "¥75,000–115,000",
          min: 75000,
          max: 115000,
          initial: "$3,850–5,900",
          notes: {
            en: "2 adults (covers 5 days; 2 ryokan dinners & breakfasts included in room rate)",
            zh: "2 位成人（覆蓋其餘 5 天；2 晚一泊二食早晚餐已含在房費中）"
          }
        },
        {
          category: {
            en: "🎫 Activities & Entrance Fees",
            zh: "🎫 景點門票及體驗活動"
          },
          jpy: "¥12,000–18,000",
          min: 12000,
          max: 18000,
          initial: "$620–930",
          notes: {
            en: "Skytree, Shibuya Sky, Kamakura Buddha, Hakone ropeway & Lake Ashi cruise",
            zh: "晴空塔、澀谷 SKY、鎌倉大佛、箱根纜車與蘆之湖海盜船"
          }
        }
      ],
      total: {
        category: {
          en: "<strong>Total (excl. flights)</strong>",
          zh: "<strong>總預算估算 (不含機票)</strong>"
        },
        jpy: "<strong>¥297,000–451,000</strong>",
        min: 297000,
        max: 451000,
        initial: "<strong>$15,250–23,200</strong>",
        notes: {
          en: "For 2 adults, 7 days (saves ~¥230,000–380,000 vs 12-day Plan A)",
          zh: "2 位成人 7 天的行程預算（較 12 天方案 A 節省約 ¥230,000–380,000）"
        }
      }
    }
  },

  /* ─── Hotels & Ryokan Recommendations Section ─── */
  hotels: {
    planA: {
      quickLegs: [
        {
          active: true,
          dest: "Tokyo, Japan",
          checkin: "2026-12-20",
          checkout: "2026-12-24",
          label: { en: "Tokyo (Dec 20–24)", zh: "東京 (12/20–24)" }
        },
        {
          active: false,
          dest: "Fujikawaguchiko, Yamanashi, Japan",
          checkin: "2026-12-24",
          checkout: "2026-12-25",
          label: { en: "Mt Fuji / Kawaguchiko (Dec 24–25)", zh: "河口湖富士山 (12/24–25)" }
        },
        {
          active: false,
          dest: "Hakone, Kanagawa, Japan",
          checkin: "2026-12-25",
          checkout: "2026-12-26",
          label: { en: "Hakone (Dec 25–26)", zh: "箱根 (12/25–26)" }
        },
        {
          active: false,
          dest: "Kyoto, Japan",
          checkin: "2026-12-26",
          checkout: "2026-12-29",
          label: { en: "Kyoto (Dec 26–29)", zh: "京都 (12/26–29)" }
        },
        {
          active: false,
          dest: "Osaka, Japan",
          checkin: "2026-12-29",
          checkout: "2026-12-31",
          label: { en: "Osaka (Dec 29–31)", zh: "大阪 (12/29–31)" }
        }
      ],
      legs: [
        {
          legNum: 1,
          nights: { en: "Leg 1 • 4 Nights", zh: "第 1 站 • 4 晚" },
          badgeClass: "",
          highlight: false,
          title: { en: "Tokyo City Hotels (東京)", zh: "東京市區精選酒店" },
          dates: "🗓️ Dec 20 – Dec 24, 2026",
          desc: {
            en: "Convenient base near Asakusa, Ginza, or Shibuya. Look for comfortable twin rooms with step-free elevator access near major transit hubs.",
            zh: "推薦入住淺草、銀座或澀谷一帶，交通極為方便，挑選具升降機無障礙設施的雙床房，便於長輩出入地鐵。"
          },
          tags: ["🚇 Near Metro", "🛍️ Shopping", "🛏️ Twin Room"],
          btnText: { en: "Search Tokyo Hotels ↗", zh: "搜尋東京酒店 ↗" },
          dest: "Tokyo, Japan",
          checkin: "2026-12-20",
          checkout: "2026-12-24"
        },
        {
          legNum: 2,
          nights: { en: "Leg 2 • 1 Night (Ryokan)", zh: "第 2 站 • 1 晚 (溫泉旅館)" },
          badgeClass: "",
          highlight: false,
          title: { en: "Lake Kawaguchiko Onsen Ryokan (河口湖)", zh: "河口湖富士山景溫泉旅館" },
          dates: "🗓️ Dec 24 – Dec 25, 2026 (Christmas Eve)",
          desc: {
            en: "Traditional Japanese ryokan with private open-air hot spring bath (rotenburo), Mt Fuji views, and multi-course Kaiseki dinner.",
            zh: "平安夜入住正宗日式溫泉旅館，享有一泊二食會席料理及房間/露天風呂眺望富士山絕景。"
          },
          tags: ["🗻 Mt Fuji View", "♨️ Hot Spring", "🍱 Kaiseki Dinner"],
          btnText: { en: "Search Fuji Ryokan ↗", zh: "搜尋河口湖溫泉 ↗" },
          dest: "Fujikawaguchiko, Yamanashi, Japan",
          checkin: "2026-12-24",
          checkout: "2026-12-25"
        },
        {
          legNum: 3,
          nights: { en: "Leg 3 • 1 Night (Onsen Resort)", zh: "第 3 站 • 1 晚 (箱根溫泉)" },
          badgeClass: "",
          highlight: false,
          title: { en: "Hakone Hot Spring Resort (箱根)", zh: "箱根溫泉度假酒店 / 旅館" },
          dates: "🗓️ Dec 25 – Dec 26, 2026 (Christmas Night)",
          desc: {
            en: "Relaxing stay in Hakone Yumoto or Gora on Christmas night. Soak in natural hot springs after exploring Owakudani, before heading west via Lake Ashi & Nagoya.",
            zh: "聖誕節當晚入住箱根湯本或強羅溫泉區，造訪大涌谷後享受優質天然礦物溫泉，隔日遊覽蘆之湖後啟程經名古屋前往關西。"
          },
          tags: ["♨️ Natural Onsen", "🌲 Forest View", "🚗 Free Parking"],
          btnText: { en: "Search Hakone Stays ↗", zh: "搜尋箱根住宿 ↗" },
          dest: "Hakone, Kanagawa, Japan",
          checkin: "2026-12-25",
          checkout: "2026-12-26"
        },
        {
          legNum: 4,
          nights: { en: "Leg 4 • 3 Nights", zh: "第 4 站 • 3 晚" },
          badgeClass: "",
          highlight: false,
          title: { en: "Kyoto Historic Hotels & Machiya (京都)", zh: "京都古風酒店與傳統町屋" },
          dates: "🗓️ Dec 26 – Dec 29, 2026",
          desc: {
            en: "Stay 3 nights near Gion, Shijo-Kawaramachi, or Kyoto Station. Arrive smoothly on Dec 26 evening via Shinkansen, and wake up ready for Fushimi Inari and Arashiyama.",
            zh: "12月26日傍晚搭乘新幹線抵達後入住京都（共3晚）。建議選擇祇園、四條河原町或京都車站周邊，翌日精神飽滿地展開千本鳥居與嵐山之旅。"
          },
          tags: ["⛩️ Heritage Area", "🍵 Cultural Vibe", "🚶 Walkable"],
          btnText: { en: "Search Kyoto Hotels ↗", zh: "搜尋京都酒店 ↗" },
          dest: "Kyoto, Japan",
          checkin: "2026-12-26",
          checkout: "2026-12-29"
        },
        {
          legNum: 5,
          nights: { en: "Leg 5 • 2 Nights (New Year's Eve)", zh: "第 5 站 • 2 晚 (跨年夜)" },
          badgeClass: "",
          highlight: false,
          title: { en: "Osaka City & Dotonbori Hotels (大阪)", zh: "大阪心齋橋 / 難波市區酒店" },
          dates: "🗓️ Dec 29 – Dec 31, 2026",
          desc: {
            en: "Stay near Namba or Umeda to celebrate New Year's Eve, enjoy vibrant street food, and access Kansai Airport (KIX) effortlessly.",
            zh: "入住難波或梅田商圈，近距離體驗道頓堀跨年熱鬧氛圍，並可直達關西國際機場 (KIX)。"
          },
          tags: ["🎆 New Year's Eve", "🍜 Food Capital", "✈️ Direct Airport Link"],
          btnText: { en: "Search Osaka Hotels ↗", zh: "搜尋大阪酒店 ↗" },
          dest: "Osaka, Japan",
          checkin: "2026-12-29",
          checkout: "2026-12-31"
        }
      ]
    },
    planB: {
      quickLegs: [
        {
          active: true,
          dest: "Tokyo, Japan",
          checkin: "2026-12-25",
          checkout: "2026-12-27",
          label: { en: "Tokyo Base (Dec 25–27)", zh: "東京首站 (12/25–27)" }
        },
        {
          active: false,
          dest: "Fujikawaguchiko, Yamanashi, Japan",
          checkin: "2026-12-27",
          checkout: "2026-12-28",
          label: { en: "Kawaguchiko (Dec 27–28)", zh: "河口湖 (12/27–28)" }
        },
        {
          active: false,
          dest: "Hakone, Kanagawa, Japan",
          checkin: "2026-12-28",
          checkout: "2026-12-29",
          label: { en: "Hakone (Dec 28–29)", zh: "箱根 (12/28–29)" }
        },
        {
          active: false,
          dest: "Tokyo, Japan",
          checkin: "2026-12-29",
          checkout: "2026-12-31",
          label: { en: "Tokyo Finale (Dec 29–31)", zh: "東京終站 (12/29–31)" }
        }
      ],
      legs: [
        {
          legNum: 1,
          nights: { en: "Leg 1 • 2 Nights", zh: "第 1 站 • 2 晚" },
          badgeClass: "",
          highlight: false,
          title: { en: "Tokyo City Hotels (東京首段)", zh: "東京市區精選酒店" },
          dates: "🗓️ Dec 25 – Dec 27, 2026",
          desc: {
            en: "Comfortable twin room near Asakusa or Ginza with step-free station access. Unhurried exploration before the scenic Fuji drive.",
            zh: "入住淺草或銀座一帶無障礙設施完善的雙床房，鄰近地鐵升降機出口，出發自駕前充分享受市區精華。"
          },
          tags: ["🚇 Near Metro", "🛍️ Shopping", "🛏️ Twin Room"],
          btnText: { en: "Search Tokyo Hotels ↗", zh: "搜尋東京酒店 ↗" },
          dest: "Tokyo, Japan",
          checkin: "2026-12-25",
          checkout: "2026-12-27"
        },
        {
          legNum: 2,
          nights: { en: "Leg 2 • 1 Night (Ryokan)", zh: "第 2 站 • 1 晚 (溫泉旅館)" },
          badgeClass: "",
          highlight: false,
          title: { en: "Lake Kawaguchiko Onsen Ryokan (河口湖)", zh: "河口湖富士山景溫泉旅館" },
          dates: "🗓️ Dec 27 – Dec 28, 2026",
          desc: {
            en: "Lakeside stay with private open-air hot spring bath, panoramic snow-capped Mt Fuji views, and seasonal kaiseki feast.",
            zh: "入住正宗日式溫泉旅館，享有一泊二食會席料理及房間/露天風呂眺望富士山絕景。"
          },
          tags: ["🗻 Mt Fuji View", "♨️ Hot Spring", "🍱 Kaiseki Dinner"],
          btnText: { en: "Search Fuji Ryokan ↗", zh: "搜尋河口湖溫泉 ↗" },
          dest: "Fujikawaguchiko, Yamanashi, Japan",
          checkin: "2026-12-27",
          checkout: "2026-12-28"
        },
        {
          legNum: 3,
          nights: { en: "Leg 3 • 1 Night (Onsen Resort)", zh: "第 3 站 • 1 晚 (箱根溫泉)" },
          badgeClass: "",
          highlight: false,
          title: { en: "Hakone Hot Spring Resort (箱根)", zh: "箱根溫泉度假酒店 / 旅館" },
          dates: "🗓️ Dec 28 – Dec 29, 2026",
          desc: {
            en: "Tranquil night in Hakone's forested volcanic springs after Owakudani and Lake Ashi. (Option: can combine with Leg 2 into a single 2-night Fuji base).",
            zh: "入住箱根森林溫泉區享受天然礦物溫泉。（亦可選擇在河口湖/箱根連住 2 晚同一溫泉旅館免搬行李）。"
          },
          tags: ["♨️ Mountain Onsen", "🌲 Forest View", "🚗 Free Parking"],
          btnText: { en: "Search Hakone Stays ↗", zh: "搜尋箱根住宿 ↗" },
          dest: "Hakone, Kanagawa, Japan",
          checkin: "2026-12-28",
          checkout: "2026-12-29"
        },
        {
          legNum: 4,
          nights: { en: "Leg 4 • 2 Nights (Tokyo Finale)", zh: "第 4 站 • 2 晚 (東京終站)" },
          badgeClass: "",
          highlight: false,
          title: { en: "Tokyo Finale & Year-End Hotels (東京終站)", zh: "東京歲末酒店" },
          dates: "🗓️ Dec 29 – Dec 31, 2026",
          desc: {
            en: "Central Tokyo for year-end shopping, winter illuminations, and seamless Haneda/Narita airport departures on New Year's Eve.",
            zh: "返回東京市區享受歲末熱鬧氛圍，漫步築地、銀座與冬季點燈，除夕直達機場極為快捷。"
          },
          tags: ["🛍️ Year-End Shopping", "🎆 Illuminations", "✈️ Direct Airport Link"],
          btnText: { en: "Search Tokyo Hotels ↗", zh: "搜尋東京酒店 ↗" },
          dest: "Tokyo, Japan",
          checkin: "2026-12-29",
          checkout: "2026-12-31"
        }
      ]
    }
  }
};

if (typeof window !== 'undefined') {
  window.SITE_DATA = SITE_DATA;
}
