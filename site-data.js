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
 *     .routeStops[]     7 journey stops used by BOTH:
 *                         (a) the JR Station Sign route board visual in render.js
 *                         (b) the Leaflet interactive map markers in map.js
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
 *     .items[]          5 budget line items. Each: { category:{en,zh}, jpy, min, max,
 *                       initial (display string), notes:{en,zh} }
 *                       `min` and `max` are plain JPY numbers used by currency.js for conversion.
 *     .total            Same shape as an item; rendered as a <tr class="budget-total"> row.
 *
 *   hotels
 *     .quickLegs[]      5 destination presets for the hotel search form pills.
 *                       Each: { active, dest, checkin, checkout, label:{en,zh} }
 *     .legs[]           5 curated accommodation cards (one per journey leg).
 *                       Each: { legNum, nights:{en,zh}, badgeClass, highlight, title:{en,zh},
 *                               dates, desc:{en,zh}, tags[], btnText:{en,zh}, dest, checkin, checkout }
 *
 * TO ADD A NEW TIP:     Push a new object into the tips[] array following the existing pattern.
 * TO ADD A BUDGET ROW:  Push into budget.items[] and update budget.total manually.
 * TO CHANGE MAP STOPS:  Edit routeStops[] — changes apply to BOTH the JR route board AND the map.
 * TO ADD AN OVERVIEW CARD: Push into overview.cards[]. style.css uses repeat(3, 1fr) grid.
 */

window.SITE_DATA = {
  /* ─── Overview Section ─── */
  overview: {
    cards: [
      {
        id: "overview-pace",
        icon: "🧘",
        title: { en: "Pace", zh: "步調節奏" },
        desc: {
          en: "Balanced to relaxed. No more than 2–3 activities per day, with rest built in for your parents.",
          zh: "平衡且輕鬆。每日安排不超過 2 至 3 個主要活動，為年長父母預留充足休息時間。"
        }
      },
      {
        id: "overview-transport",
        icon: "🚗",
        title: { en: "Transport", zh: "交通方式" },
        desc: {
          en: "Rental car for Days 5–7 (Mt Fuji drive). Shinkansen (Nagoya → Kyoto) and local trains for Tokyo/Kansai.",
          zh: "第 5 至 7 天自駕租車（富士箱根路段）。名古屋至京都乘搭新幹線。東京及關西市區搭地鐵火車。"
        }
      },
      {
        id: "overview-weather",
        icon: "🌡️",
        title: { en: "Weather", zh: "氣候與溫度" },
        desc: {
          en: "Crisp & clear. Tokyo 4–13°C, Fuji area 0–8°C, Kansai 3–12°C. Layer up!",
          zh: "寒冷乾燥且晴朗。東京 4–13°C，富士山區 0–8°C，關西 3–12°C。請準備洋蔥式穿法！"
        }
      }
    ],
    routeStops: [
      {
        code: "01",
        label: "TYO",
        kanji: "東京",
        hiragana: "とうきょう",
        romaji: "Tokyo",
        dotClass: "tokyo",
        name:  { en: "Tokyo (東京)",       zh: "東京"   },
        days:  { en: "Days 1–4",           zh: "第 1–4 天" },
        desc:  { en: "Asakusa, Shibuya, teamLab, Akihabara, winter illuminations",
                 zh: "參訪淺草寺、澀谷、teamLab、秋葉原，賞冬季燈飾" },
        lat: 35.6762, lng: 139.6503,
        color: "#D4163C", markerClass: "marker-tokyo"
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
        color: "#075AAA", markerClass: "marker-fuji"
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
        desc:  { en: "Owakudani, Lake Ashi, pirate ship, onsen ryokan",
                 zh: "走訪大涌谷地熱景區、搭蘆之湖海盜船、享頂級溫泉" },
        lat: 35.2329, lng: 139.1069,
        color: "#C9A96E", markerClass: "marker-hakone"
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
        color: "#2AAFAF", markerClass: "marker-nagoya"
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
        color: "#BA0C2F", markerClass: "marker-kyoto"
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
        color: "#4A9FD9", markerClass: "marker-nara"
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
        color: "#D4163C", markerClass: "marker-osaka"
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
    question: {
      en: "Where should you return the rental car?",
      zh: "租車應在哪裡歸還？"
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
        subtitle: { en: "Current Plan · Day 7 transit stop", zh: "現行方案 · 第 7 天中途站" },
        verdict: "current",
        verdictLabel: { en: "Current Plan", zh: "現行方案" },
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
          },
          {
            icon: "🧳",
            label: { en: "Luggage Strategy", zh: "行李安排策略" },
            detail: {
              en: "<strong>Ship bags ahead to Kyoto before departure day.</strong> Ask your Nagoya hotel's front desk to arrange <strong>takkyubin (宅配便)</strong> pickup — Yamato Transport or Sagawa. Bags sent by 12:00 noon typically arrive at your Kyoto hotel the next morning. Travel the Shinkansen Nagoya→Kyoto with only a small day bag. This transforms Kyoto into a completely stress-free experience.",
              zh: "<strong>出發前一天，在名古屋酒店安排宅配便（Yamato 黑貓宅急便 / 佐川急便）寄送行李。</strong>中午前交給前台，行李通常翌日早上送達京都酒店。持小型隨身包搭新幹線前往京都，令京都旅程輕鬆無負擔。"
            }
          },
          {
            icon: "🚗",
            label: { en: "Car Rental Return", zh: "還車安排" },
            detail: {
              en: "Major rental offices near Nagoya Station: <strong>Toyota Rent-a-Car Nagoya Ekimae</strong>, <strong>Nissan Rent-a-Car Nagoya Station</strong>, <strong>Times Car Rental Nagoya Station</strong>. Return the car first (takes ~30 min including inspection), then check in to your hotel. Tip: pre-take photos of the car at Hakone before driving to document pre-existing marks.",
              zh: "名古屋車站附近主要租車公司：<strong>Toyota 租車名古屋駅前店</strong>、<strong>Nissan 租車名古屋站</strong>、<strong>Times Car Rental 名古屋站</strong>。建議先還車（含驗車約 30 分鐘），再辦理酒店入住。還車前記得在箱根出發時先拍攝車身照片，記錄原有損傷。"
            }
          },
          {
            icon: "🚅",
            label: { en: "Nagoya → Kyoto Transfer", zh: "名古屋→京都交通" },
            detail: {
              en: "Take the <strong>JR Tokaido Shinkansen (Nozomi or Hikari)</strong> from Nagoya Station to Kyoto Station — journey is <strong>35 min (Nozomi)</strong> or 40 min (Hikari). Trains run every 10–15 min. Buy tickets at the Shinkansen ticket counter or use reserved seat booking on the JR app. Non-reserved seats are fine for a short hop.",
              zh: "在名古屋站乘搭 <strong>JR 東海道新幹線（希望號 Nozomi 或光號 Hikari）</strong>前往京都站，車程 <strong>35 分鐘（希望號）</strong>或 40 分鐘（光號）。班次頻密，每 10–15 分鐘一班。可在新幹線售票窗口或 JR App 預訂指定座席，短途亦可購自由席。"
            }
          }
        ]
      },
      {
        id: "car-return-kyoto",
        icon: "⛩️",
        title: { en: "Kyoto", zh: "京都" },
        subtitle: { en: "Drive straight to Kyoto · Day 7", zh: "直接駕車至京都 · 第 7 天" },
        verdict: "caution",
        verdictLabel: { en: "Possible — But Tricky", zh: "可行，但需注意" },
        pros: [
          { en: "<strong>No Nagoya detour needed</strong> — Drive Hakone → Kyoto directly (approx 3.5–4 hrs via Route 1 / Tomei-Meishin expressway)", zh: "<strong>無需繞道名古屋</strong> — 從箱根直接駕車往京都（約 3.5–4 小時，走名神高速）" },
          { en: "<strong>Can carry all luggage directly</strong> — No need to pre-ship bags; everything arrives with you in Kyoto", zh: "<strong>行李可直接帶到京都</strong> — 毋須預先宅配行李，隨車抵達" },
          { en: "<strong>Flexible timing</strong> — You're not tied to a Shinkansen schedule on the drive day", zh: "<strong>時間彈性較大</strong> — 無需配合新幹線班次，可按自身節奏出發" },
          { en: "<strong>One-way fee may be similar</strong> — Tokyo→Kyoto drop-off fee can be negotiated with some rental companies", zh: "<strong>異地費用或可議價</strong> — 部分租車公司東京→京都異地費可協商" }
        ],
        cons: [
          { en: "<strong>Parking in Kyoto is expensive and scarce</strong> — City centre parking costs ¥500–¥1,000/hour; many temples have no parking at all", zh: "<strong>京都市區停車費高且難找</strong> — 市中心停車約 ¥500–¥1,000/小時，許多神社寺院更無停車場" },
          { en: "<strong>Driving in Kyoto is stressful</strong> — Narrow lanes, tourist crowds on roads, and unfamiliar one-way streets near Gion / Fushimi", zh: "<strong>在京都駕車壓力大</strong> — 祗園、伏見等地巷道狹窄、遊客多、單行道複雜" },
          { en: "<strong>Higher one-way drop fee</strong> — Tokyo→Kyoto typically ¥25,000–¥35,000", zh: "<strong>異地還車費用較高</strong> — 東京→京都通常 ¥25,000–¥35,000" },
          { en: "<strong>Car drop-off location may not be central</strong> — Rental offices are often near Kyoto Station, away from hotel clusters in Gion / Arashiyama", zh: "<strong>還車地點未必方便</strong> — 租車公司多在京都車站附近，而非住宿較集中的祗園 / 嵐山一帶" },
          { en: "<strong>Luggage then becomes a problem in Kyoto</strong> — Lugging suitcases on narrow Kyoto streets and temple steps defeats the purpose", zh: "<strong>京都行李管理仍是難題</strong> — 大件行李在京都狹窄街道及寺院石階間移動非常不便" }
        ],
        tips: [
          {
            icon: "🏨",
            label: { en: "Where to Stay", zh: "住宿建議" },
            detail: {
              en: "Stay <strong>near Kyoto Station</strong> — this is where rental offices are clustered and convenient for both arrival and onward trips to Osaka/Nara. Good options: <strong>Daiwa Roynet Hotel Kyoto-Ekimae</strong> (budget-mid, 2-min walk to station), <strong>Hotel Granvia Kyoto</strong> (directly connected to JR Kyoto station), or <strong>Kyoto Tower Sando Hotel</strong> for mid-range. If your heart is set on Gion area, use <strong>The Screen Kyoto</strong> or <strong>Kyoto Granbell Hotel</strong> — but note you'll need a taxi or bus from the rental drop-off.",
              zh: "建議住在<strong>京都車站附近</strong> — 此區租車公司集中，且方便前往大阪/奈良。推薦酒店：<strong>Daiwa Roynet Hotel 京都駅前</strong>（性價比高，步行 2 分鐘至車站）、<strong>Hotel Granvia Kyoto</strong>（JR 京都站直接連接）或中價位的<strong>京都 Tower Sando Hotel</strong>。若想住祗園區，可選 <strong>The Screen Kyoto</strong> 或 <strong>Kyoto Granbell Hotel</strong>，但需留意從還車地點需乘的士或巴士。"
            }
          },
          {
            icon: "🚗",
            label: { en: "Car Rental Return", zh: "還車安排" },
            detail: {
              en: "Rental offices in Kyoto: <strong>Toyota Rent-a-Car Kyoto Station</strong> (closest to JR Kyoto), <strong>Nissan Rent-a-Car Kyoto Eki-Mae</strong>. <strong>Important:</strong> avoid arriving in Kyoto during rush hour (17:00–19:00) or on weekends — parking is almost impossible. Plan to arrive by 15:00 at the latest to return the car without stress. Do NOT drive into Gion / Higashiyama with the car — park at Kyoto Station and walk or taxi from there.",
              zh: "京都還車地點：<strong>Toyota 租車京都站</strong>（最近 JR 京都站）、<strong>Nissan 租車京都駅前</strong>。<strong>重要提示：</strong>避免在繁忙時段（17:00–19:00）或週末駕車進京都 — 停車幾乎不可能。建議最遲 15:00 前抵達，確保還車順暢。切勿開車進入祗園 / 東山 — 建議把車停在京都站還掉，再步行或乘的士前往。"
            }
          },
          {
            icon: "🧳",
            label: { en: "Luggage Strategy", zh: "行李安排策略" },
            detail: {
              en: "Even though you drove here with all your bags, <strong>do not drag suitcases around Kyoto</strong>. On your first morning, use your hotel's concierge to <strong>ship bags forward to your Osaka hotel via takkyubin</strong> before heading out for the day. This way you travel Kyoto light (small backpack only) and your bags magically appear in Osaka when you arrive. Alternatively, Kyoto Station has large-capacity coin lockers (reserve in advance at www.ecbo.io).",
              zh: "即使你駕車帶齊行李到達，<strong>切勿帶著行李箱遊覽京都。</strong>入住首日早上，請酒店協助安排<strong>宅配便，將大件行李寄往大阪酒店</strong>，再輕裝出發遊覽。如此一來，你在大阪入住時行李已準時送達。另一選擇是利用京都站的大容量儲物櫃（可在 www.ecbo.io 提前預訂）。"
            }
          },
          {
            icon: "🚌",
            label: { en: "Getting Around Kyoto", zh: "京都市內交通" },
            detail: {
              en: "Once the car is returned, use the <strong>Kyoto City Bus Day Pass (¥700/day)</strong> for unlimited rides to Kinkaku-ji, Arashiyama, Fushimi Inari, and Gion. Buy from the bus driver or at the tourist info counter inside Kyoto Station. <strong>IC card (Suica / ICOCA)</strong> also works on all buses. Taxis are available outside Kyoto Station for direct door-to-door service to Gion ryokans.",
              zh: "還車後，建議購買<strong>京都市巴士一日乘車券（¥700/日）</strong>，可無限次搭乘前往金閣寺、嵐山、伏見稻荷、祗園等地。可在巴士司機處或京都站內旅遊訊息中心購買。<strong>Suica / ICOCA 交通卡</strong>亦可在所有巴士上使用。祗園旅館住客可直接在京都站外乘的士。"
            }
          },
          {
            icon: "🍽️",
            label: { en: "Day 7 Dinner in Kyoto", zh: "第 7 天京都晚餐" },
            detail: {
              en: "After returning the car and settling in, walk to <strong>Nishiki Market (錦市場)</strong> for street food tastings (closes ~18:00), then head to Gion for dinner. Try <strong>Gion Nanba</strong> for kaiseki, or the more casual <strong>Ippudo Ramen (一風堂)</strong> near the station if you're exhausted from driving. Pontocho Alley (先斗町) is a 5-min walk from Gion and has dozens of atmospheric restaurants.",
              zh: "還車安頓後，可步行前往<strong>錦市場</strong>品嚐街頭小吃（約 18:00 收攤），再到祗園吃晚飯。推薦<strong>祗園南羽</strong>（懷石料理）或若長途駕駛後疲累，可選車站附近輕便的<strong>一風堂拉麵</strong>。先斗町（Pontocho Alley）離祗園步行 5 分鐘，有數十間氣氛一流的餐廳。"
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
          { en: "<strong>Osaka city driving is complex</strong> — Heavy traffic, taxi/bus lanes, and aggressive drivers near Dotonbori / Namba", zh: "<strong>大阪市區行車複雜</strong> — 道頓堀 / 難波一帶交通繁忙、的士巴士專線多，駕車壓力大" },
          { en: "<strong>Negates the benefit of JR Kansai Pass</strong> — You'd be driving instead of using the pass you likely already purchased", zh: "<strong>浪費 JR 關西周遊券</strong> — 若已購入關西鐵路券卻選擇自駕，變相重複花費" },
          { en: "<strong>Luggage in Kyoto problem remains</strong> — Having a car parked somewhere doesn't help carrying bags between Kyoto temples", zh: "<strong>京都行李問題依然存在</strong> — 即使有車停在某處，在京都各寺院間搬運行李仍非常不便" },
          { en: "<strong>New Year period parking</strong> — Dec 30–31 in Osaka is extremely congested; parking around Dotonbori / Tsutenkaku can be near-impossible", zh: "<strong>跨年期間泊車幾乎不可能</strong> — 12 月 30–31 日大阪道頓堀 / 通天閣一帶人山人海，泊車位極為罕有" }
        ],
        tips: [
          {
            icon: "🏨",
            label: { en: "Where to Stay", zh: "住宿建議" },
            detail: {
              en: "If returning in Osaka, stay near <strong>Osaka Station / Umeda</strong> or <strong>Namba</strong>. Rental offices are typically near Osaka Station. Recommended: <strong>Hotel Monterey Grasmere Osaka</strong> (Osaka Station area, mid-range), <strong>Cross Hotel Osaka</strong> (Shinsaibashi, great location), or the modern <strong>Daiwa Roynet Hotel Osaka-Kitahama</strong>. Avoid hotels near Dotonbori if you have a car — parking in that area on New Year's Eve is effectively impossible.",
              zh: "若選擇在大阪還車，建議住在<strong>大阪站 / 梅田</strong>或<strong>難波</strong>附近。租車公司通常在大阪站一帶。推薦酒店：<strong>Monterey Grasmere Osaka</strong>（大阪站周邊，中價）、<strong>Cross Hotel 大阪</strong>（心齋橋，地點優越）或新潮的 <strong>Daiwa Roynet Hotel 大阪北濱</strong>。如在跨年夜（12/31）仍持有租車，切勿選擇道頓堀附近酒店 — 泊車幾乎不可能。"
            }
          },
          {
            icon: "🚗",
            label: { en: "Car Rental Return", zh: "還車安排" },
            detail: {
              en: "Rental offices near Osaka Station: <strong>Toyota Rent-a-Car Osaka Umeda</strong>, <strong>Nissan Rent-a-Car Osaka Ekimae</strong>, <strong>OTS Rent-a-Car Osaka</strong>. <strong>Return as early as possible on your chosen day</strong> — do not wait until the last day of your Osaka stay. Returning on Day 10 (the day you arrive from Nara) is recommended. After return, immediately switch to Osaka Metro or JR for the rest of your stay.",
              zh: "大阪站附近還車地點：<strong>Toyota 租車大阪梅田</strong>、<strong>Nissan 租車大阪駅前</strong>、<strong>OTS 租車大阪</strong>。<strong>建議盡早還車</strong>，不要等到大阪住宿最後一天才還。推薦在第 10 天（從奈良抵達大阪當日）立即還車，之後改乘大阪地鐵或 JR。"
            }
          },
          {
            icon: "⚠️",
            label: { en: "New Year's Warning", zh: "跨年特別提示" },
            detail: {
              en: "If you keep the car into Osaka, <strong>return it on Day 10 (Dec 29) at the absolute latest</strong>. Dec 30–31 in Osaka sees massive crowds — Dotonbori, Shinsaibashi, and Namba are pedestrian-priority during countdown events. Even parking garages near Osaka Castle fill up before noon. Do not risk being stranded in a car on New Year's Eve.",
              zh: "若持車到大阪，<strong>務必最遲在第 10 天（12 月 29 日）還車。</strong>12 月 30–31 日大阪人潮洶湧 — 道頓堀、心齋橋及難波在跨年倒數期間封路管制。即使是大阪城附近的停車場也在中午前爆滿。切勿在跨年夜持有租車，以免陷入交通困境。"
            }
          },
          {
            icon: "🧳",
            label: { en: "Luggage Through Kyoto", zh: "京都段行李安排" },
            detail: {
              en: "Even if keeping the car, <strong>do not drive it around Kyoto sightseeing</strong>. Park at a hotel near Kyoto Station for the duration of your Kyoto stay, and take daily transit. Ship suitcases to your Osaka hotel by takkyubin on your last Kyoto morning so the car is lighter and you travel unencumbered. Parking at a hotel for 2–3 days typically costs ¥2,500–¥4,000/night extra.",
              zh: "即使持車前往關西，<strong>切勿開車在京都市內觀光。</strong>建議把車停在京都站附近酒店停車場，整段京都行程改乘公共交通。最後一個京都早上，用宅配便把行李箱送往大阪酒店，讓行程更輕鬆。酒店停車費通常每晚額外收費 ¥2,500–¥4,000。"
            }
          }
        ]
      }
    ]
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
     * Luggage context: 3 adults × (1 large suitcase + 1 cabin bag + 1 backpack)
     *   = 3 large suitcases (≈75L each) + 3 cabin bags + 3 backpacks
     * verdict: "recommended" | "alternative" | "avoid"
     * ──────────────────────────────────────────────────────────────── */
    vehicleRec: {
      luggageContext: {
        en: "Your party: <strong>3 adults</strong> — each bringing 1 large suitcase (check-in size, ~75L), 1 cabin bag, and 1 backpack. That's <strong>9 pieces of luggage total</strong>. You also need boot space for winter gear and snacks for the Mt Fuji drive.",
        zh: "你們共 <strong>3 位成人</strong>，每人各攜帶 1 件大型行李箱（寄艙尺寸，約 75L）、1 件手提行李及 1 個背包，合共 <strong>9 件行李</strong>。另需預留車尾空間放置冬季裝備及富士山路段補給。"
      },
      picks: [
        {
          id: "vehicle-minivan",
          verdict: "recommended",
          icon: "🚐",
          category: { en: "Minivan / MPV", zh: "廂式客貨車 / 七人車" },
          models: { en: "Toyota Alphard, Toyota Voxy/Noah, Nissan Serena", zh: "Toyota Alphard、Toyota Voxy/Noah、Nissan Serena" },
          boot: { en: "~500–900L (rear seats folded / in use)", zh: "~500–900L（後座摺疊或正常使用）" },
          why: {
            en: "The <strong>only category that comfortably fits 3 large suitcases in the boot with all rear seats occupied</strong>. Sliding rear doors make loading/unloading effortless at Mt Fuji car parks. High ride height also gives great visibility on snowy Hakone roads. The Alphard is premium and spacious; the Voxy/Noah and Serena are excellent mid-range choices.",
            zh: "<strong>三件大型行李箱可同時放入尾箱，後座全體乘坐</strong>的唯一車型。滑動式後車門令富士山停車場上落行李輕鬆無比。較高車身視野開闊，應對箱根積雪路面更有優勢。Alphard 豪華寬敞；Voxy/Noah 及 Serena 為性價比極高的中檔之選。"
          },
          badge: { en: "✅ Best for your group", zh: "✅ 最適合你們" },
          badgeClass: "vbadge-green"
        },
        {
          id: "vehicle-suv",
          verdict: "alternative",
          icon: "🚙",
          category: { en: "Mid-size SUV", zh: "中型 SUV" },
          models: { en: "Toyota RAV4, Nissan X-Trail, Honda CR-V", zh: "Toyota RAV4、Nissan X-Trail、Honda CR-V" },
          boot: { en: "~500–580L (rear seats up)", zh: "~500–580L（後座正常使用）" },
          why: {
            en: "A large SUV can <strong>just about fit 3 large suitcases</strong> in the boot if packed carefully (2 upright + 1 on its side). Cabin bags and backpacks go on laps or in footwells — it will feel tight. Good 4WD/AWD option for Hakone in snow, but the boot is borderline. Only choose this if minivans are sold out.",
            zh: "大型 SUV 若行李擺放得當（2 件直立、1 件橫放），<strong>勉強可裝下 3 件大型行李箱</strong>。手提行李和背包只能放膝蓋上或腳踏位，會較擠迫。箱根積雪路段 4WD/AWD 功能具優勢，但尾箱空間僅夠用。如廂式車售罄才考慮此選項。"
          },
          badge: { en: "⚠️ Borderline — tight fit", zh: "⚠️ 勉強合適 — 略為擠迫" },
          badgeClass: "vbadge-amber"
        },
        {
          id: "vehicle-compact",
          verdict: "avoid",
          icon: "🚗",
          category: { en: "Compact / Sedan", zh: "小型車 / 房車" },
          models: { en: "Toyota Corolla, Nissan Note, Honda Fit", zh: "Toyota Corolla、Nissan Note、Honda Fit" },
          boot: { en: "~220–340L — not enough", zh: "~220–340L — 空間不足" },
          why: {
            en: "<strong>Do not book a compact or standard sedan.</strong> The boot will only fit 1–2 large suitcases. You would need to stack bags on the rear seat and passengers would have almost no space. Roof box rental is possible but adds cost and wind noise. Avoid.",
            zh: "<strong>切勿預訂小型車或普通房車。</strong>車尾箱只能放入 1–2 件大型行李箱，其餘行李只能堆放後座，乘客幾乎無空間。雖可加租車頂行李箱，但成本增加且行車噪音大。建議避免。"
          },
          badge: { en: "❌ Not suitable", zh: "❌ 不適合" },
          badgeClass: "vbadge-red"
        },
        {
          id: "vehicle-kei",
          verdict: "avoid",
          icon: "🚗",
          category: { en: "Kei Car (軽自動車)", zh: "輕型車（軽自動車）" },
          models: { en: "Honda N-Box, Daihatsu Tanto, Suzuki Jimny, Suzuki Alto", zh: "Honda N-Box、Daihatsu Tanto、Suzuki Jimny、Suzuki Alto" },
          boot: { en: "~100–200L — far too small", zh: "~100–200L — 空間嚴重不足" },
          why: {
            en: "<strong>Absolutely not for this group.</strong> Kei cars are Japan's <em>micro</em>-cars (engine ≤660cc). Even with 3 adults seated, the boot fits at best 1 small suitcase. The Suzuki Jimny is fun off-road but has virtually zero boot with rear seats up. The 660cc engine also struggles on expressways and mountain passes — particularly the steep Hakone Skyline in December snow. Kei cars are great for solo day-trips, not family winter drives with 9 pieces of luggage.",
            zh: "<strong>絕對不適合。</strong>輕型車是日本的<em>超小型車</em>（引擎排量 ≤660cc）。即使 3 位成人坐下，尾箱最多只能放入 1 件小型行李箱。Suzuki Jimny 雖是越野玩意兒，但後座坐人後車尾箱幾乎為零。660cc 引擎在高速公路及山路行駛亦吃力 — 尤其是 12 月積雪的箱根高原，爬坡力不足。輕型車適合單人短途，絕非攜帶 9 件行李的家庭冬日自駕之選。"
          },
          badge: { en: "❌ Absolutely not", zh: "❌ 絕對不適合" },
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
          { en: "✔ Wide range: compact → 7-seat MPV for 3 people + luggage", zh: "✔ 車型齊全：小型車至 7 人 MPV，適合三人大件行李" },
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
          en: "<strong>Rental car</strong> — Book via Nissan or Toyota Rent-a-Car. Request <strong>studless winter tires + GPS with English</strong>. One-way drop-off fee applies (Tokyo → Nagoya ≈ ¥15,000–20,000).",
          zh: "<strong>自駕租車</strong> — 建議選擇日產 (Nissan) 或豐田 (Toyota) 租車。<strong>必須指定配備雪地無釘輪胎 (Studless Winter Tires)</strong> 及英文 GPS。異地還車（東京借、名古屋還）需收約 ¥15,000–20,000 附加費。"
        },
        {
          en: "<strong>International Driving Permit (IDP)</strong> — Obtain this in your home country before the trip. Required for all foreign drivers in Japan.",
          zh: "<strong>國際駕駛執照 (IDP)</strong> — 出發前必須在香港辦妥（運輸署申領）。在日本駕駛必須隨身攜帶。"
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
          en: "International Driving Permit (IDP)",
          zh: "國際駕駛執照 (IDP) 與香港駕駛執照正本"
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
    items: [
      {
        category: {
          en: "🏨 Accommodation (11 nights)",
          zh: "🏨 酒店與溫泉旅館 (11晚)"
        },
        jpy: "¥350,000–500,000",
        min: 350000,
        max: 500000,
        initial: "$18,000–26,000",
        notes: {
          en: "Mix of hotels + 2 ryokan nights",
          zh: "優質市區酒店 + 2晚一泊二食溫泉旅館"
        }
      },
      {
        category: {
          en: "🚗 Car Rental (3 days + gas/tolls)",
          zh: "🚗 租車自駕 (3天，含路費油費)"
        },
        jpy: "¥50,000–70,000",
        min: 50000,
        max: 70000,
        initial: "$2,600–3,600",
        notes: {
          en: "Incl. winter tires & one-way fee",
          zh: "包含雪胎配置、保險及異地還車費"
        }
      },
      {
        category: {
          en: "🚆 Trains & Metro",
          zh: "🚆 城市鐵路及新幹線"
        },
        jpy: "¥40,000–55,000",
        min: 40000,
        max: 55000,
        initial: "$2,100–2,800",
        notes: {
          en: "Suica, Shinkansen, JR Pass",
          zh: "新幹線車票、Suica 儲值及關西周遊券"
        }
      },
      {
        category: {
          en: "🍽️ Food & Drinks",
          zh: "🍽️ 餐飲美食"
        },
        jpy: "¥180,000–250,000",
        min: 180000,
        max: 250000,
        initial: "$9,300–13,000",
        notes: {
          en: "Mix of street food & nice diners",
          zh: "每日三餐，包括拉麵、壽喜燒及和牛料理"
        }
      },
      {
        category: {
          en: "🎫 Activities & Entrance Fees",
          zh: "🎫 景點門票及體驗活動"
        },
        jpy: "¥25,000–35,000",
        min: 25000,
        max: 35000,
        initial: "$1,300–1,800",
        notes: {
          en: "Temples, teamLab, tea ceremony",
          zh: "晴空塔、teamLab及茶道文化體驗門票"
        }
      }
    ],
    total: {
      category: {
        en: "<strong>Total (excl. flights)</strong>",
        zh: "<strong>總預算估算 (不含機票)</strong>"
      },
      jpy: "<strong>¥645,000–910,000</strong>",
      min: 645000,
      max: 910000,
      initial: "<strong>$33,300–47,200</strong>",
      notes: {
        en: "For 3 people, 12 days",
        zh: "全家三人 12 天的行程預算"
      }
    }
  },

  /* ─── Hotels & Ryokan Recommendations Section ─── */
  hotels: {
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
          en: "Convenient base near Asakusa, Ginza, or Shibuya. Look for triple rooms or twin rooms with extra bed near major metro hubs.",
          zh: "推薦入住淺草、銀座或澀谷一帶，交通極為方便，便於三人同住及攜帶行李進出地鐵。"
        },
        tags: ["🚇 Near Metro", "🛍️ Shopping", "🛏️ Triple Room"],
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
  }
};
