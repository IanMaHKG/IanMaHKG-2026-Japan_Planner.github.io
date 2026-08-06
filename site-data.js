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
