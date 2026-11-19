/**
 * @file site-data.js
 * @description DATA SOURCE — all non-itinerary content for the Japan 2026 planner (25–31 Dec 2026).
 * Sets window.SITE_DATA, a single global object consumed by the js/features/*.js renderers and map.js.
 *
 * STRUCTURE OF window.SITE_DATA:
 *
 *   overview
 *     .cards[]          4 summary cards (pace, transport, weather, travellers).
 *                       Each: { id, icon, title:{en,zh}, desc:{en,zh} }
 *
 *     .routeStops[]     6 journey stops, used by BOTH:
 *                         (a) the JR Station Sign route board visual in features/overview.js
 *                         (b) the MapLibre interactive map markers in map.js
 *
 *                       Each stop must have ALL of these fields:
 *                       {
 *                         code:       string  — 2-digit station order ("01"–"06")
 *                         label:      string  — 3-letter code shown on map marker & station badge ("TYO")
 *                         kanji:      string  — Station name in Japanese Kanji ("東京")
 *                         hiragana:   string  — Hiragana reading / furigana ("とうきょう")
 *                         romaji:     string  — Romanised name shown below the track line ("Tokyo")
 *                         dotClass:   string  — CSS class for stop-dot colour variant ("tokyo")
 *                         name:       { en, zh }  — Localised full display name
 *                         days:       { en, zh }  — Travel days label ("Days 1–2" / "第 1–2 天")
 *                         desc:       { en, zh }  — Short description for the map popup
 *                         lat, lng:   number  — WGS84 coordinates
 *                         color:      string  — CSS colour used for the station code badge border and dot
 *                         markerClass: string — CSS class applied to the map marker
 *                       }
 *
 *   carRental           { intro:{en,zh}, booking:{ company, status, vehicle, pickup, returnShop, included[], price[], total } }
 *                       `booking` is the paid Toyota Rent a Car reservation shown in features/car.js.
 *
 *   tips[]              6 practical tip cards. Each: { id, icon, title:{en,zh}, items:[{en,zh}] }
 *
 *   packing[]           3 packing category cards. Each: { id, icon, title:{en,zh}, items:[{en,zh}] }
 *
 *   budget
 *     .items[]          5 budget line items. Each: { category:{en,zh}, jpy, min, max,
 *                       initial (display string), notes:{en,zh} }
 *                       `min` and `max` are plain JPY numbers used by currency.js for conversion.
 *     .total            Same shape as an item; rendered as a <tr class="budget-total"> row.
 *                       scripts/validate.mjs checks that total equals the sum of items.
 *
 *   hotels
 *     .legs[]         the 3 confirmed hotel bookings (cards). Each: { legNum, nights:{en,zh},
 *                     title:{en,zh}, dates, desc:{en,zh}, tags[], btnText:{en,zh}, mapUrl,
 *                     dest, checkin, checkout }
 *                     validate.mjs checks the legs cover 25–30 Dec (6 nights) exactly once.
 *
 * TO ADD A NEW TIP:     Push a new object into the tips[] array following the existing pattern.
 * TO ADD A BUDGET ROW:  Push into budget.items[] and update budget.total.
 * TO CHANGE MAP STOPS:  Edit overview.routeStops[] — changes apply to BOTH the JR route board AND the map.
 * TO ADD AN OVERVIEW CARD: Push into overview.cards[]. The overview grid uses repeat(4, 1fr).
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
          en: "Flexible hybrid model: a booked rental car for the Mt Fuji, Hakone and Odawara drive (Days 3–4, 27–28 Dec), plus Tokyo metro and rail.",
          zh: "靈活出行：第 3 至 4 天（12 月 27–28 日）自駕已預訂的租車遊覽富士山、箱根及小田原，市區搭配地鐵及鐵路。"
        }
      },
      {
        id: "overview-weather",
        icon: "🌡️",
        title: { en: "Weather", zh: "氣候與溫度" },
        desc: {
          en: "Crisp & clear. Tokyo 4–13°C, Fuji area 0–8°C, Hakone/Coast 3–12°C. Layer up with warm thermal wear!",
          zh: "寒冷乾燥且晴朗。東京 4–13°C，富士山區 0–8°C，箱根及沿海 3–12°C。請準備洋蔥式保暖穿法！"
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
    routeStops: [
      {
        code: "01",
        label: "TYO",
        kanji: "東京",
        hiragana: "とうきょう",
        romaji: "Tokyo Nihombashi",
        dotClass: "tokyo",
        name: { en: "Tokyo Nihombashi (東京日本橋)", zh: "東京日本橋" },
        days: { en: "Days 1–2", zh: "第 1–2 天" },
        desc: {
          en: "Asakusa, Skytree, Meiji Jingu, Shibuya Sky; stay at Villa Fontaine Nihombashi Mitsukoshimae",
          zh: "淺草寺、晴空塔、明治神宮、澀谷 SKY；入住日本橋三越前 Villa Fontaine"
        },
        lat: 35.6841, lng: 139.7733,
        color: "var(--marker-tokyo)", markerClass: "marker-tokyo"
      },
      {
        code: "02",
        label: "FUJ",
        kanji: "河口湖",
        hiragana: "かわぐちこ",
        romaji: "Kawaguchiko",
        dotClass: "fuji",
        name: { en: "Kawaguchiko & Yamanakako (河口湖・山中湖)", zh: "河口湖・山中湖" },
        days: { en: "Day 3", zh: "第 3 天" },
        desc: {
          en: "Pick up the car, Lake Kawaguchi, Arakurayama Sengen Park and Lake Yamanaka",
          zh: "取車後遊覽河口湖、新倉山淺間公園與山中湖"
        },
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
        name: { en: "Hakone & Lake Ashi (箱根・蘆之湖)", zh: "箱根・蘆之湖" },
        days: { en: "Days 3–4", zh: "第 3–4 天" },
        desc: {
          en: "Lake Ashi sunset, WPU HOTEL Hakone hot spring in Gora, Owakudani black eggs",
          zh: "蘆之湖日落、強羅 WPU HOTEL Hakone 溫泉、大涌谷黑玉子"
        },
        lat: 35.2511, lng: 139.0477,
        color: "var(--marker-hakone)", markerClass: "marker-hakone"
      },
      {
        code: "04",
        label: "ODW",
        kanji: "小田原",
        hiragana: "おだわら",
        romaji: "Odawara",
        dotClass: "nagoya",
        name: { en: "Odawara (小田原)", zh: "小田原" },
        days: { en: "Day 4", zh: "第 4 天" },
        desc: {
          en: "Odawara Castle Park and seafood lunch at Totoco Odawara",
          zh: "小田原城址公園及 TOTOCO 小田原海鮮午餐"
        },
        lat: 35.235, lng: 139.138,
        color: "var(--marker-nagoya)", markerClass: "marker-nagoya"
      },
      {
        code: "05",
        label: "SHN",
        kanji: "湘南",
        hiragana: "しょうなん",
        romaji: "Shonan Coast",
        dotClass: "nara",
        name: { en: "Shonan Coast (湘南海岸)", zh: "湘南海岸" },
        days: { en: "Day 4 (choose one)", zh: "第 4 天（三選一）" },
        desc: {
          en: "Your choice on the page: Kamakura, Enoshima or Yokohama on the drive back",
          zh: "於網頁選擇回程景點：鎌倉、江之島或橫濱"
        },
        lat: 35.31, lng: 139.5,
        color: "var(--marker-nara)", markerClass: "marker-nara"
      },
      {
        code: "06",
        label: "TYO",
        kanji: "東京",
        hiragana: "とうきょう",
        romaji: "Tokyo Hamamatsucho",
        dotClass: "tokyo",
        name: { en: "Tokyo Hamamatsucho (東京濱松町)", zh: "東京濱松町" },
        days: { en: "Days 4–7", zh: "第 4–7 天" },
        desc: {
          en: "Return the car at Nishi-Shimbashi by 20:00, Tokyo Tower, teamLab, NYE departure by monorail",
          zh: "西新橋還車（20:00 前）、東京鐵塔、teamLab、除夕乘單軌電車前往機場"
        },
        lat: 35.6552, lng: 139.7571,
        color: "var(--marker-tokyo)", markerClass: "marker-tokyo"
      }
    ]
  },

  /* ─── Car Rental Section ─────────────────────────────────────────────
   * The confirmed, paid Toyota Rent a Car booking. Rendered by features/car.js
   * renderCarRental() → #rental-search-card (intro) and #rental-booking.
   *
   * booking — pickup / returnShop (with a `note`), included[] options, price[] breakdown and total.
   * ──────────────────────────────────────────────────────────────────*/
  carRental: {
    intro: {
      en: "<strong>Confirmed &amp; paid:</strong> Toyota Rent a Car, pick up on <strong>Day 3 (27 Dec) at 09:00</strong> and return on <strong>Day 4 (28 Dec) by 20:00</strong> — the Mt Fuji, Hakone and Odawara self-drive loop. Everything you need on the day is below.",
      zh: "<strong>已確認及付款：</strong>豐田租車，<strong>第 3 天（12 月 27 日）09:00</strong> 取車，<strong>第 4 天（12 月 28 日）20:00 前</strong>還車 — 富士山、箱根及小田原自駕環線。當日所需資料如下。"
    },
    booking: {
      company: { en: "Toyota Rent a Car", zh: "豐田租車 (Toyota Rent a Car)", jp: "トヨタレンタカー" },
      status: { en: "✅ Paid online · ¥48,400", zh: "✅ 已網上付款 · ¥48,400" },
      vehicle: {
        en: "C3 Class — <strong>Toyota Corolla Touring Hybrid</strong> · automatic · non-smoking · studless winter tyres",
        zh: "C3 級 — <strong>Toyota Corolla Touring 油電車</strong> · 自動波 · 禁煙 · 無釘雪地胎"
      },
      pickup: {
        heading: { en: "Pick-up", zh: "取車" },
        when: { en: "Sun 27 Dec 2026 · 09:00", zh: "2026 年 12 月 27 日（日）· 09:00" },
        shop: { en: "Tokyo Sta. Nihonbashi Ext. Shop", zh: "東京駅日本橋口店" },
        address: { en: "Trust Tower N Wing, B2 car park, 1-8-1 Marunouchi, Chiyoda-ku, Tokyo 100-0005", zh: "東京都千代田區丸之內 1-8-1 トラストタワーN館 B2 停車場（100-0005）" },
        phone: "03-5220-2220",
        url: "https://rent.toyota.co.jp/global_eng/shop/route/63601_01V.html",
        note: {
          en: "Bring your UK photocard driving licence, <strong>1949 IDP</strong>, passport and booking confirmation. Arrive on time so you keep the daylight for Mt Fuji and Hakone.",
          zh: "請帶備英國駕駛執照正本、<strong>1949 IDP</strong>、護照及預訂確認書，並準時到達，以把握日間遊覽富士山及箱根。"
        }
      },
      returnShop: {
        heading: { en: "Return", zh: "還車" },
        when: { en: "Mon 28 Dec 2026 · by 20:00", zh: "2026 年 12 月 28 日（一）· 20:00 前" },
        shop: { en: "Nishi-Shimbashi Shop", zh: "西新橋店" },
        address: { en: "1-12-10 Nishishinbashi, Minato-ku, Tokyo 105-0003", zh: "東京都港區西新橋 1-12-10（105-0003）" },
        phone: "050-3132-1045",
        phoneNote: { en: "number displayed when the shop calls you", zh: "分店來電時顯示的號碼" },
        note: {
          en: "<strong>20:00 is a firm deadline</strong> — late returns can cost extra. Fill the tank first, after dropping your luggage at the Hamamatsucho hotel (a few minutes away).",
          zh: "<strong>20:00 為嚴格期限</strong>，逾時還車可能需額外收費。請先在濱松町酒店放下行李（只需數分鐘），並把油加滿後再還車。"
        }
      },
      included: [
        { en: "✔ Liability compensation (免責補償) and Double Protection Plan (NOC exemption)", zh: "✔ 免責補償及安心 W 計劃（免除營業損失補償）" },
        { en: "✔ Studless winter tyres (スタッドレスタイヤ) · 4WD not required", zh: "✔ 無釘雪地胎（スタッドレスタイヤ）· 無須四驅" },
        { en: "✔ ETC card and JAF membership certificate", zh: "✔ ETC 卡及 JAF 會員證" },
        { en: "✔ Car model selection option (車種指定)", zh: "✔ 車種指定選項" },
        { en: "✘ Not included: petrol, expressway tolls and parking", zh: "✘ 不包括：油費、高速公路費及停車費" }
      ],
      price: [
        { label: { en: "Base rate", zh: "基本費" }, jpy: "¥37,400" },
        { label: { en: "Liability compensation", zh: "免責補償" }, jpy: "¥2,200" },
        { label: { en: "Winter tyres", zh: "雪地胎" }, jpy: "¥4,400" },
        { label: { en: "Options", zh: "選項" }, jpy: "¥4,400" }
      ],
      total: { label: { en: "Total paid (tax included)", zh: "已付總額（含稅）" }, jpy: "¥48,400" }
    }
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
          en: "<strong>Airport transfers</strong> — Haneda: Tokyo Monorail direct from Hamamatsucho Station (about 20 minutes). Narita: JR Yamanote Line to Tokyo or Shinagawa, then the Narita Express (N'EX).",
          zh: "<strong>機場交通</strong> — 羽田機場：在濱松町站乘搭東京單軌電車直達（約 20 分鐘）。成田機場：乘搭 JR 山手線到東京站或品川站，再轉乘成田特快 (N'EX)。"
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
          en: "<strong>Documents Required at Car Pickup</strong> — When picking up the car in Tokyo (Day 3, 27 Dec), present: <strong>1) Original UK Photocard Driving Licence</strong>, <strong>2) 1949 IDP</strong>, and <strong>3) Passport</strong>.",
          zh: "<strong>取車時所需文件</strong> — 在東京取車時（第 3 天，12 月 27 日），必須同時出示：<strong>1) 英國駕駛執照正本</strong>、<strong>2) 1949 IDP 國際駕照</strong>及 <strong>3) 護照</strong>。"
        }
      ]
    },
    {
      id: "tip-booking",
      icon: "🎫",
      title: { en: "Advance Bookings", zh: "景點與餐飲預約" },
      items: [
        {
          en: "<strong>teamLab Borderless</strong> — Online tickets only, sell out fast. Book 2+ weeks ahead.",
          zh: "<strong>teamLab 無界美術館</strong> — 僅限網上預售門票，極快售罄。請至少提早 2 星期預購。"
        },
        {
          en: "<strong>Restaurants</strong> — Reserve popular spots 3+ weeks ahead for Christmas week. Use Tabelog or ask your hotel concierge.",
          zh: "<strong>餐廳預約</strong> — 聖誕黃金周期間，熱門餐廳必須提早 3 星期以上預約。可使用 Tabelog 網站或請酒店禮賓部協助。"
        },
        {
          en: "<strong>Shibuya Sky</strong> — Sunset slots (about 16:20) sell out weeks ahead. Book timed tickets online for Day 2.",
          zh: "<strong>澀谷 SKY</strong> — 日落時段（約下午 4:20）通常提早數星期售罄，請預先網上預訂第 2 天的指定時段門票。"
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
    items: [
      {
        category: {
          en: "🏨 Accommodation (6 nights, booked)",
          zh: "🏨 酒店住宿 (6晚，已預訂)"
        },
        jpy: "¥183,330",
        min: 183330,
        max: 183330,
        initial: "$9,350",
        notes: {
          en: "Confirmed: Villa Fontaine Nihombashi ¥58,604 + WPU HOTEL Hakone ¥38,724 + Villa Fontaine Hamamatsucho ¥86,002",
          zh: "已確認：日本橋 Villa Fontaine ¥58,604 + WPU HOTEL Hakone ¥38,724 + 濱松町 Villa Fontaine ¥86,002"
        }
      },
      {
        category: {
          en: "🚗 Car Rental (2 days, paid + petrol/tolls)",
          zh: "🚗 租車自駕 (2天，已付款，另計油費及路費)"
        },
        jpy: "¥55,400–60,400",
        min: 55400,
        max: 60400,
        initial: "$2,850–3,100",
        notes: {
          en: "¥48,400 prepaid online + roughly ¥7,000–12,000 for petrol and expressway tolls",
          zh: "¥48,400 已網上付款 + 油費及高速公路費約 ¥7,000–12,000"
        }
      },
      {
        category: {
          en: "🚆 Trains & Metro",
          zh: "🚆 地鐵及鐵路"
        },
        jpy: "¥10,000–16,000",
        min: 10000,
        max: 16000,
        initial: "$500–820",
        notes: {
          en: "Tokyo metro, Suica top-ups and the airport transfer (Haneda monorail or Narita Express)",
          zh: "東京地鐵、Suica 增值及機場交通（羽田單軌電車或成田特快）"
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
          en: "2 adults, 7 days. Mix of seafood, set meals and local favourites (check which hotel meals are included)",
          zh: "2 位成人 7 天餐飲，包含海鮮、定食及地道美食（請核對酒店是否已含餐）"
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
          en: "Skytree, Shibuya Sky, teamLab Borderless and Tokyo Tower",
          zh: "晴空塔、澀谷 SKY、teamLab Borderless 及東京鐵塔"
        }
      }
    ],
    total: {
      category: {
        en: "<strong>Total (excl. flights)</strong>",
        zh: "<strong>總預算估算 (不含機票)</strong>"
      },
      jpy: "<strong>¥335,730–392,730</strong>",
      min: 335730,
      max: 392730,
      initial: "<strong>$17,100–20,000</strong>",
      notes: {
        en: "For 2 adults, 7 days (1 Twin Room throughout). Hotels and the car rental are already booked",
        zh: "2 位成人 7 天的行程預算（全程 1 間雙床房）。酒店及租車已預訂"
      }
    }
  },

  /* ─── Hotels & Ryokan Recommendations Section ─── */
  hotels: {
    legs: [
      {
        legNum: 1,
        nights: { en: "Leg 1 • 2 Nights • Booked", zh: "第 1 站 • 2 晚 • 已預訂" },
        title: { en: "Villa Fontaine Tokyo Nihombashi Mitsukoshimae (ヴィラフォンテーヌ東京日本橋三越前)", zh: "ヴィラフォンテーヌ東京日本橋三越前" },
        dates: "🗓️ Dec 25 – Dec 27, 2026 · ¥58,604",
        desc: {
          en: "Confirmed booking for 2 nights. Next to Mitsukoshimae Station for easy metro access to Asakusa, Ginza and Shibuya; the car pick-up shop is a short taxi ride away.",
          zh: "已確認預訂 2 晚。鄰近三越前站，乘地鐵前往淺草、銀座及澀谷十分方便；取車分店只需乘的士數分鐘。"
        },
        tags: ["✅ Booked", "🚇 Mitsukoshimae Stn", "🛏️ Twin Room"],
        btnText: { en: "View on Google Maps ↗", zh: "在 Google 地圖查看 ↗" },
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Villa%20Fontaine%20Tokyo%20Nihombashi%20Mitsukoshimae",
        dest: "Villa Fontaine Tokyo Nihombashi Mitsukoshimae, Tokyo, Japan",
        checkin: "2026-12-25",
        checkout: "2026-12-27"
      },
      {
        legNum: 2,
        nights: { en: "Leg 2 • 1 Night • Booked", zh: "第 2 站 • 1 晚 • 已預訂" },
        title: { en: "WPU HOTEL Hakone (WPÜ HAKONE)", zh: "箱根強羅 WPU HOTEL Hakone (WPÜ HAKONE)" },
        dates: "🗓️ Dec 27 – Dec 28, 2026 · ¥38,724",
        desc: {
          en: "Confirmed booking for 1 night at Gora 1320-179, Hakone, Japan 250-0408, right next to Gora Station — featuring indoor milky-white natural onsen baths, an on-site restaurant and bar, and free first-come, first-served parking (approx. 10 spaces, no reservations). Check your confirmation for the meal plan and arrival details.",
          zh: "已確認預訂 1 晚，位於箱根強羅 1320-179（郵區 250-0408），緊鄰強羅站 — 設有室內乳白色天然溫泉、館內餐廳及酒吧，並提供免費先到先得停車場（約 10 個車位，不設預約）。餐飲安排及入住詳情請查閱訂房確認電郵。"
        },
        tags: ["✅ Booked", "♨️ Hot Spring", "🅿️ Free Parking (First-Come)"],
        btnText: { en: "View on Google Maps ↗", zh: "在 Google 地圖查看 ↗" },
        mapUrl: "https://www.google.com/maps/search/?api=1&query=WPU%20HOTEL%20Hakone%20Gora%201320-179",
        dest: "WPU HOTEL Hakone, 1320-179 Gora, Hakone, Japan 250-0408",
        checkin: "2026-12-27",
        checkout: "2026-12-28"
      },
      {
        legNum: 3,
        nights: { en: "Leg 3 • 3 Nights • Booked", zh: "第 3 站 • 3 晚 • 已預訂" },
        title: { en: "Villa Fontaine Tokyo Hamamatsucho (ヴィラフォンテーヌ東京浜松町)", zh: "ヴィラフォンテーヌ東京浜松町" },
        dates: "🗓️ Dec 28 – Dec 31, 2026 · ¥86,002",
        desc: {
          en: "Confirmed booking for 3 nights. A few minutes from the car-return shop, close to Tokyo Tower, Shiba Park and Hamarikyu Gardens, with a direct monorail from Hamamatsucho Station to Haneda Airport.",
          zh: "已確認預訂 3 晚。距離還車分店僅數分鐘，鄰近東京鐵塔、芝公園及濱離宮，並可在濱松町站乘單軌電車直達羽田機場。"
        },
        tags: ["✅ Booked", "✈️ Monorail to Haneda", "🛏️ Twin Room"],
        btnText: { en: "View on Google Maps ↗", zh: "在 Google 地圖查看 ↗" },
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Villa%20Fontaine%20Tokyo%20Hamamatsucho",
        dest: "Villa Fontaine Tokyo Hamamatsucho, Tokyo, Japan",
        checkin: "2026-12-28",
        checkout: "2026-12-31"
      }
    ]
  }
};

if (typeof window !== 'undefined') {
  window.SITE_DATA = SITE_DATA;
}
