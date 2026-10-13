/**
 * @file itinerary-data.js
 * @description DATA SOURCE — the complete 12-day Japan Winter Journey 2026 schedule.
 * Sets window.ITINERARY_DATA, an array of day objects consumed by renderItinerary() in render.js.
 *
 * STRUCTURE OF window.ITINERARY_DATA  (array of 12 day objects):
 *
 *   Each day object:
 *   {
 *     id:        string  — HTML element id, e.g. "day-1". Used for anchor links.
 *     dayNum:    string  — Zero-padded display number, e.g. "01".
 *     date:      string  — Short date label, e.g. "Dec 20".
 *     region:    string  — Filter category: "tokyo" | "fuji" | "kansai".
 *                          Must match a .day-tab[data-region] value in index.html.
 *     title:     { en, zh }   — Full day title shown in the accordion header.
 *     tags:      Tag[]        — Chip badges shown in the header. See Tag types below.
 *     blocks:    Block[]      — Time slots (morning / afternoon / evening).
 *     tip?:      { en, zh }   — Optional pro-tip shown at the bottom of the day body.
 *   }
 *
 *   Tag types:
 *     { type:"city",      text }                 — Location badge (always bilingual in text)
 *     { type:"transport", text }                 — Transit badge (e.g. "🚗 Self-Drive")
 *     { type:"pace",      en, zh }               — Pace badge (e.g. Relaxed / 輕鬆悠閒)
 *     { type:"special",   text }                 — Single-language special badge (e.g. "🎌 Christmas Eve")
 *     { type:"special",   en, zh }               — Bilingual special badge
 *
 *   Block structure:
 *   {
 *     time:     { en, zh }   — Period label: e.g. "🌅 Morning" / "🌅 早上"
 *     activity: {
 *       title:  { en, zh }
 *       desc:   { en, zh }
 *       meal?:  { icon, en, zh }  — Optional restaurant / meal recommendation
 *     }
 *   }
 *
 * REGIONS MAP:
 *   "tokyo"  → Days 1–4  (Tokyo city)
 *   "fuji"   → Days 5–7  (Kawaguchiko, Hakone, drive to Nagoya)
 *   "kansai" → Days 7–12 (Kyoto, Nara, Osaka)
 *
 * TO ADD A DAY: push a new object following the pattern above and update itinerary length.
 * TO EDIT AN ACTIVITY: find the day by id and edit the relevant block directly — no other
 *   files need to change.
 * TO CHANGE REGION FILTERS: update the `region` field here AND the .day-tab buttons in index.html.
 */

const ITINERARY_DATA_A = [
  /* ════ DAY 1 ════ */
  {
    id: "day-1",
    dayNum: "01",
    date: "Dec 20",
    region: "tokyo",
    title: {
      en: "Arrival in Tokyo (東京) — Asakusa (淺草) & Skytree (晴空塔)",
      zh: "抵達東京 — 淺草寺參拜與登晴空塔賞夜景"
    },
    tags: [
      { type: "city", text: "🏙️ Tokyo (東京)" },
      { type: "pace", en: "🧘 Relaxed", zh: "🧘 輕鬆悠閒" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Arrive at Narita (成田) / Haneda (羽田) Airport",
            zh: "抵達成田 / 羽田機場"
          },
          desc: {
            en: "Clear customs, pick up your <strong>Suica card</strong> at the airport station, and take the Narita Express or Limousine Bus to your hotel. Check in and rest after the flight.",
            zh: "辦理入境手續，在機場車站領取/購買 <strong>Suica 卡</strong>，乘搭成田特快 (N'EX) 或機場利木津巴士直達市區酒店。辦理 Check-in 並稍作休息，舒緩飛行疲勞。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast / Brunch:</strong> Grab a quick meal at a <strong>konbini (便利店)</strong> (7-Eleven onigiri, sandwiches, and hot coffee) — surprisingly delicious and perfect after a long flight.",
            zh: "<strong>早餐 / 早午餐：</strong> 在機場或酒店附近的<strong>便利店 (Konbini)</strong> 買點輕食（7-Eleven 飯糰、三文治和熱咖啡）—— 日式便利店食品水準極高，方便快捷。"
          },
          locations: [
            { lat: 35.7720, lng: 140.3929, label: { en: "Narita Airport", zh: "成田機場" } },
            { lat: 35.5494, lng: 139.7798, label: { en: "Haneda Airport", zh: "羽田機場" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Senso-ji Temple (淺草寺) & Nakamise-dori (仲見世通)",
            zh: "淺草寺與仲見世通"
          },
          desc: {
            en: "Tokyo's oldest temple. Walk through the iconic <strong>Kaminarimon (雷門 / Thunder Gate)</strong> and browse the traditional shopping street. Pick up souvenirs, taste <strong>ningyo-yaki (人形燒)</strong> (sweet bean cakes) and <strong>age-manju (炸饅頭)</strong> (fried pastries).",
            zh: "參訪東京最古老的寺廟。穿過寫有巨型紅燈籠的<strong>雷門</strong>，沿著<strong>仲見世通</strong>傳統商店街漫步。一邊選購特色手工藝品，一邊品嚐現烤的<strong>人形燒</strong>和酥脆的<strong>炸饅頭</strong>。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Sometaro (染太郎)</strong> (Asakusa) — A charming, family-friendly spot where you cook your own okonomiyaki on a tabletop griddle. Fun and delicious.",
            zh: "<strong>午餐：</strong> <strong>染太郎 (Sometaro)</strong> （淺草）— 懷舊的塌塌米老店，讓一家人圍著鐵板親自動手煎大阪燒/御好燒，既好玩又美味。"
          },
          locations: [
            { lat: 35.7148, lng: 139.7967, label: { en: "Senso-ji Temple", zh: "淺草寺" } },
            { lat: 35.7116, lng: 139.7972, label: { en: "Nakamise-dori", zh: "仲見世通" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 傍晚與晚上" },
        activity: {
          title: {
            en: "Tokyo Skytree (東京晴空塔) & Solamachi (晴空街道)",
            zh: "東京晴空塔與 Solamachi 購物中心"
          },
          desc: {
            en: "Head to <strong>Tokyo Skytree (東京晴空塔)</strong> (634m) for sunset and city lights views. The Tembo Deck offers a 360° panorama. Browse Solamachi shopping complex below.",
            zh: "前往高 634 米的<strong>東京晴空塔</strong>。登上帝國觀景台 (Tembo Deck) 俯瞰 360 度東京大都會夕陽與無邊夜景。隨後可到塔下的 Solamachi 商場逛街購物。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Asakusa Imahan (淺草今半)</strong> — A legendary sukiyaki restaurant (est. 1895). The A5 wagyu sukiyaki set is an unforgettable first-night-in-Japan dinner. Reserve ahead.",
            zh: "<strong>晚餐：</strong> <strong>淺草今半 (Asakusa Imahan)</strong> — 創立於1895年的壽喜燒百年名店。精選頂級 A5 黑毛和牛壽喜燒套餐，為日本之旅第一晚留下最驚艷的味覺記憶。<strong>（必須提前預約）</strong>"
          },
          locations: [
            { lat: 35.7101, lng: 139.8107, label: { en: "Tokyo Skytree", zh: "東京晴空塔" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> If arriving early, consider visiting <strong>Ueno Park (上野公園)</strong> (10 min from Asakusa) for a peaceful stroll by Shinobazu Pond. The Ameyoko market nearby is great for snacks.",
      zh: "<strong>💡 實用貼士：</strong> 若航班較早抵達，可先到鄰近的<strong>上野公園</strong>不忍池散步，或到旁邊的<strong>阿美橫丁 (Ameyoko)</strong> 感受熱鬧的傳統市場氣氛。"
    }
  },

  /* ════ DAY 2 ════ */
  {
    id: "day-2",
    dayNum: "02",
    date: "Dec 21",
    region: "tokyo",
    title: {
      en: "Tokyo Highlights — Shibuya (澀谷), Harajuku (原宿) & Illuminations (冬季燈飾)",
      zh: "東京潮流與自然 — 明治神宮、澀谷 Sky 展望台與浪漫青之洞窟"
    },
    tags: [
      { type: "city", text: "🏙️ Tokyo (東京)" },
      { type: "pace", en: "⚖️ Balanced", zh: "⚖️ 步調適中" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Meiji Shrine (明治神宮) & Harajuku (原宿)",
            zh: "明治神宮與原宿散策"
          },
          desc: {
            en: "Start with a serene walk through the forested approach to <strong>Meiji Shrine (明治神宮)</strong> — one of Tokyo's most important Shinto shrines. Then stroll <strong>Takeshita Street (竹下通)</strong> for Harajuku's famous youth culture and unique shops.",
            zh: "清晨漫步於<strong>明治神宮</strong>被林蔭環繞的碎石步道，感受鬧市中難得的莊嚴與寧靜。隨後步行前往潮流發源地<strong>原宿竹下通</strong>，欣賞獨特的日本街頭文化。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> <strong>Bills Omotesando (表參道)</strong> — Famous for \"the world's best scrambled eggs\" and fluffy ricotta pancakes. A relaxed, Western-style brunch ideal for senior comfort.",
            zh: "<strong>早餐：</strong> <strong>Bills 表參道 (Omotesando)</strong> — 被譽為擁有「世界第一早餐」的美名。招牌香蕉蜂蜜法式熱班戟和極致香滑的炒蛋，非常適合長輩同行享受精緻悠閒的早晨。"
          },
          locations: [
            { lat: 35.6763, lng: 139.6993, label: { en: "Meiji Shrine", zh: "明治神宮" } },
            { lat: 35.6715, lng: 139.7025, label: { en: "Harajuku / Takeshita St.", zh: "原宿竹下通" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Shibuya Crossing (澀谷十字路口) & Shibuya Sky (澀谷 Sky)",
            zh: "澀谷十字路口與 Shibuya Sky 展望台"
          },
          desc: {
            en: "Experience the world's busiest pedestrian crossing from above at <strong>Shibuya Sky</strong> (230m rooftop observation). Then explore the vibrant streets below. Visit the <strong>Hachiko statue (忠犬八公像)</strong> for the classic photo op.",
            zh: "登上極具人氣的 <strong>Shibuya Sky 露天展望台</strong>（高 230 米），俯瞰全東京最繁忙的<strong>澀谷十字路口</strong>全景。下樓後可與地標<strong>忠犬八公像</strong>合照留念。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Gyukatsu Motomura (牛かつ もと村)</strong> (Shibuya) — Deep-fried wagyu cutlet served with a hot stone to sear it to your liking. An absolute must-try.",
            zh: "<strong>午餐：</strong> <strong>牛かつ もと村 (Gyukatsu Motomura)</strong> （澀谷）— 吉列炸牛排。外皮酥脆而內裡保持粉嫩的和牛排，讓您在個人小石板上親自加熱煎熟，口感極佳。"
          },
          locations: [
            { lat: 35.6595, lng: 139.7004, label: { en: "Shibuya Crossing", zh: "澀谷十字路口" } },
            { lat: 35.6580, lng: 139.7016, label: { en: "Hachiko Statue", zh: "忠犬八公像" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Omotesando Illuminations (表參道燈飾) & Roppongi (六本木)",
            zh: "表參道與六本木冬日璀璨燈飾"
          },
          desc: {
            en: "Walk along <strong>Omotesando (表參道)</strong> boulevard to see the elegant champagne-gold winter illuminations draped across the zelkova trees. Then head to <strong>Roppongi Hills Keyakizaka (六本木之丘櫸坂)</strong> for the stunning blue-and-white light tunnel.",
            zh: "沿著<strong>表參道</strong>寬敞的林蔭大道散步，欣賞冬日限定的香檳金路樹燈飾。隨後前往<strong>六本木櫸坂通</strong>，觀賞以藍白光芒點亮、直落東京鐵塔背景的絕美光之隧道。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Gonpachi Nishi-Azabu (權八 西麻布)</strong> (the \"Kill Bill\" restaurant) — Beautiful traditional interiors, great soba noodles and yakitori. Fun atmosphere and foreigner-friendly.",
            zh: "<strong>晚餐：</strong> <strong>權八 西麻布 (Gonpachi)</strong> — 《標殺令 (Kill Bill)》經典電影場景靈感來源地。極具傳統大氣的大正時期裝潢，提供優質的日式串燒、蕎麥麵與清酒，氣氛熱鬧且對遊客非常友善。"
          },
          locations: [
            { lat: 35.6653, lng: 139.7129, label: { en: "Omotesando", zh: "表參道" } },
            { lat: 35.6605, lng: 139.7292, label: { en: "Roppongi Hills", zh: "六本木之丘" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> Book <strong>Shibuya Sky</strong> tickets online 1–2 weeks ahead to skip the queue. Sunset time slot (~16:00) is best for both daylight and night views.",
      zh: "<strong>💡 實用貼士：</strong> <strong>Shibuya Sky 必須提前 1-2 星期上網搶購門票</strong>。最推介挑選下午 4 點左右的日落場次，能同時拍到日落與亮燈後的東京都夜景。"
    }
  },

  /* ════ DAY 3 ════ */
  {
    id: "day-3",
    dayNum: "03",
    date: "Dec 22",
    region: "tokyo",
    title: {
      en: "Tsukiji Market (築地), teamLab & Tokyo Tower (東京鐵塔)",
      zh: "東京海鮮與藝術 — 築地場外市場美食、teamLab 與東京鐵塔"
    },
    tags: [
      { type: "city", text: "🏙️ Tokyo (東京)" },
      { type: "pace", en: "⚖️ Balanced", zh: "⚖️ 步調適中" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Tsukiji Outer Market (築地場外市場)",
            zh: "築地場外市場美食巡禮"
          },
          desc: {
            en: "The original Tokyo fish market's outer stalls are still bustling with fresh seafood, tamagoyaki (sweet egg omelette), and street food. Arrive by 8:30 AM for the best selection. Walk through the narrow lanes sampling as you go.",
            zh: "保留了傳統風貌的築地場外市場依然活力十足。清晨 8:30 抵達最能避開人潮。漫步於熙來攘往的小巷中，沿途品嚐現燒海鮮、玉子燒及新鮮刺身，這是最地道的東京早餐體驗。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> <strong>Tsukiji market grazing</strong> — Must-try: fresh sushi at <strong>Sushi Dai (寿司大)</strong> or <strong>Daiwa Sushi (大和寿司)</strong>, tamagoyaki from <strong>Yamazaki (山崎)</strong>, and grilled scallops from street vendors.",
            zh: "<strong>早餐推薦：</strong> 築地市場掃街 —— 必嚐：<strong>壽司大</strong>或<strong>大和壽司</strong>的即製握壽司、<strong>山崎</strong>的微甜玉子燒，以及現烤的扇貝和生蠔。"
          },
          locations: [
            { lat: 35.6654, lng: 139.7707, label: { en: "Tsukiji Outer Market", zh: "築地場外市場" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "teamLab Borderless (Azabudai Hills / 麻布台之丘)",
            zh: "teamLab Borderless 沉浸式數碼藝術展"
          },
          desc: {
            en: "Immerse yourselves in the stunning <strong>teamLab Borderless</strong> digital art museum in Azabudai Hills. Rooms of flowing light, interactive waterfalls, and infinite crystal universes. It's magical for all ages — a mesmerising sensory experience with step-free navigation. Allow 2–3 hours.",
            zh: "前往東京新地標麻布台之丘，觀賞世界頂級的 <strong>teamLab Borderless 數位美術館</strong>。置身於流動的光影瀑布、無邊際的水晶宇宙與夢幻茶屋中。視覺震撼非常適合全家同樂。建議遊覽 2 至 3 小時。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Azabudai Hills food hall</strong> — Upscale dining options right at the complex. Try <strong>Niku Kappo (肉割烹)</strong> for premium wagyu bowls, or <strong>Afuri (阿夫利)</strong> for their signature yuzu-shio (yuzu salt) ramen.",
            zh: "<strong>午餐：</strong> 麻布台之丘地下美食廣場 —— 選擇多元且環境極佳。推介品嚐 <strong>肉割烹 (Niku Kappo)</strong> 的頂級和牛丼，或 <strong>AFURI (阿夫利)</strong> 招牌清爽的柚子鹽拉麵。"
          },
          locations: [
            { lat: 35.6563, lng: 139.7378, label: { en: "teamLab Borderless", zh: "teamLab Borderless" } },
            { lat: 35.6563, lng: 139.7378, label: { en: "Azabudai Hills", zh: "麻布台之丘" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Tokyo Tower (東京鐵塔) at Night",
            zh: "東京鐵塔浪漫夜景"
          },
          desc: {
            en: "A 15-minute walk from Azabudai Hills. See <strong>Tokyo Tower</strong> lit up in its iconic orange glow — especially beautiful in winter. Go up to the Main Deck (150m) for city views, or simply admire it from <strong>Shiba Park (芝公園)</strong> below.",
            zh: "從麻布台之丘步行約 15 分鐘即可抵達。冬日裡散發溫暖橘紅色光芒的東京鐵塔是永恆的經典。可以選擇登上 150 米的主觀景台看夜景，或者在塔下的<strong>芝公園</strong>草地上拍照，感受老東京的復古浪漫情懷。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Ukai Toriyama (うかい鳥山)</strong> (near Tokyo Tower) — A refined charcoal-grilled chicken restaurant in a beautiful traditional garden setting. Perfect for a special dinner. Or go casual at <strong>T's TanTan</strong> in nearby Tokyo Station for outstanding vegan ramen.",
            zh: "<strong>晚餐：</strong> <strong>東京芝豆腐屋吉兆 / 鵜飼鳥山 (Ukai)</strong> —— 位於鐵塔腳下，隱密於傳統日式庭園中的高級炭火燒烤與豆腐料理名店，環境極美，是享用精緻奢華晚餐的絕佳之選。<strong>（必須提前預約）</strong>"
          },
          locations: [
            { lat: 35.6585, lng: 139.7454, label: { en: "Tokyo Tower", zh: "東京鐵塔" } },
            { lat: 35.6566, lng: 139.7491, label: { en: "Shiba Park", zh: "芝公園" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> <strong>teamLab Borderless</strong> tickets sell out quickly — book online at least 2 weeks ahead! Choose a weekday afternoon slot for fewer crowds.",
      zh: "<strong>💡 實用貼士：</strong> <strong>teamLab 門票必須提前於官網預約</strong>，不設現場售票。館內有許多鏡面地板，建議避免穿裙子前往。"
    }
  },

  /* ════ DAY 4 ════ */
  {
    id: "day-4",
    dayNum: "04",
    date: "Dec 23",
    region: "tokyo",
    title: {
      en: "Imperial Palace (皇居), Akihabara (秋葉原) & Marunouchi Lights (丸之內燈飾)",
      zh: "皇室庭園與動漫天堂 — 皇居東御苑、秋葉原電器街與丸之內金黃燈飾"
    },
    tags: [
      { type: "city", text: "🏙️ Tokyo (東京)" },
      { type: "pace", en: "🧘 Relaxed", zh: "🧘 輕鬆悠閒" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Imperial Palace East Gardens (皇居東御苑)",
            zh: "皇居外苑與東御苑"
          },
          desc: {
            en: "Free entry to the serene gardens of the Imperial Palace. Beautifully maintained lawns with historic stone walls, moats, and seasonal plantings. Flat, easy walking — perfect for senior comfort. Walk to the <strong>Nijubashi Bridge (二重橋)</strong> for the classic photo op.",
            zh: "免費進入氣勢磅礴的皇居東御苑。漫步於古色古香的城牆、護城河與日式松柏庭園之間。這裡地勢平坦開闊，非常適合長輩悠閒散步。隨後前往外苑拍攝著名的地標<strong>二重橋</strong>。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> Any classic café near Tokyo Station — try a Japanese-style morning toast set at an old-school <strong>kissaten (喫茶店)</strong>.",
            zh: "<strong>早餐：</strong> 東京站周邊舊式<strong>喫茶店 (Kissaten)</strong> — 品嚐日式傳統「Morning Set」（厚切多士配水煮蛋及黑咖啡），體驗經典的日本昭和晨間儀式感。"
          },
          locations: [
            { lat: 35.6852, lng: 139.7528, label: { en: "Imperial Palace Gardens", zh: "皇居東御苑" } },
            { lat: 35.6800, lng: 139.7530, label: { en: "Nijubashi Bridge", zh: "二重橋" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Akihabara \"Electric Town\" (秋葉原電器街)",
            zh: "秋葉原動漫電器天堂"
          },
          desc: {
            en: "Take the train to <strong>Akihabara (秋葉原)</strong> — Tokyo's famous electronics and anime district. Browse multi-floor arcades, retro game shops, and electronics outlets. Visit <strong>Yodobashi Camera (友都八喜)</strong> for tax-free shopping.",
            zh: "搭乘地鐵前往次文化重鎮<strong>秋葉原</strong>。即使對動漫不感興趣，琳瑯滿目的高科技電器大樓、懷舊電玩店及色彩斑斕的霓虹招牌也極具視覺衝擊力。可到 <strong>Yodobashi Camera</strong> 購買免稅相機或家庭電器。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Kanda Matsuya (神田まつや)</strong> (near Akihabara) — A beloved 140-year-old soba noodle shop. The cold seiro soba with warm tempura is heavenly. No-frills, authentic, and affordable.",
            zh: "<strong>午餐：</strong> <strong>神田まつや (Kanda Matsuya)</strong> — 創立超過140年的傳奇蕎麥麵老字號。木質調的老店鋪氣氛極佳，招牌的天婦羅竹蒸蕎麥麵 (Tempura Soba) 麵條爽滑，湯頭鮮美。"
          },
          locations: [
            { lat: 35.7022, lng: 139.7741, label: { en: "Akihabara", zh: "秋葉原" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Ginza (銀座) & Marunouchi Naka-dori (丸之內仲通) Lights",
            zh: "銀座逛街與丸之內仲通香檳金燈飾"
          },
          desc: {
            en: "Head to <strong>Ginza (銀座)</strong> for upscale window shopping (Uniqlo flagship, MUJI, and Mitsukoshi). Then walk to <strong>Marunouchi Naka-dori</strong> to see the elegant champagne-gold winter illuminations draped across the zelkova trees along the European-style boulevard.",
            zh: "前往高檔地段<strong>銀座</strong>，朝聖 Uniqlo 全球旗艦店、MUJI 旗艦店及傳統的三越百貨。隨後散步至<strong>丸之內仲通</strong>，此處林蔭大道兩側的樹木在冬季會亮起高貴的香檳金色燈飾，充滿濃厚的節日氣氛。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Ginza Kagari (銀座 篝)</strong> — Famous for their rich, creamy chicken <em>tori-paitan</em> ramen. Small shop, big flavours. Alternatively, splurge at <strong>Ginza Kyubey (吉兵衛)</strong> for a world-class omakase sushi experience (reserve well ahead).",
            zh: "<strong>晚餐：</strong> <strong>銀座 篝 (Ginza Kagari)</strong> — 以極其濃郁如濃湯般的雞白湯拉麵聞名遐邇，是拉麵界的人氣王。若想享用精緻日料，亦可選擇前往名店<strong>銀座久兵衛 (Kyubey)</strong> 享用頂級手握壽司（須極早預約）。"
          },
          locations: [
            { lat: 35.6717, lng: 139.7650, label: { en: "Ginza", zh: "銀座" } },
            { lat: 35.6805, lng: 139.7633, label: { en: "Marunouchi Naka-dori", zh: "丸之內仲通" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> This is your last night in Tokyo before the road trip. Pack your bags tonight! Buy any snacks or <strong>Uniqlo HEATTECH</strong> layers you need for the colder Mt Fuji region tomorrow.",
      zh: "<strong>💡 實用貼士：</strong> 明天將開啟自駕之旅前往寒冷的富士山區。建議今晚先整理好行李。銀座 Uniqlo 旗艦店款式齊全，適合出發前添置保暖的 <strong>HEATTECH 保暖內衣</strong>。"
    }
  },

  /* ════ DAY 5 ════ */
  {
    id: "day-5",
    dayNum: "05",
    date: "Dec 24",
    region: "fuji",
    title: {
      en: "Drive to Kawaguchiko (河口湖) — Christmas Eve at Mt Fuji (富士山) 🎄",
      zh: "租車自駕至河口湖 — 聖誕平安夜與富士山溫泉旅館 🎄"
    },
    tags: [
      { type: "city", text: "🚗 Tokyo → Kawaguchiko (東京 → 河口湖)" },
      { type: "transport", text: "🚗 Driving (自駕)" },
      { type: "special", text: "🎄 Christmas Eve (平安夜)" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Pick Up Rental Car & Depart Tokyo",
            zh: "東京市區取車與出發"
          },
          desc: {
            en: "Pick up your rental car at <strong>Shinjuku (新宿)</strong> (Toyota / Nissan Rent-a-Car). Confirm <strong>studless winter tyres</strong> and English GPS. Drive west on the <strong>Chuo Expressway (中央自動車道)</strong> towards Kawaguchiko (~2 hours). Depart by 8:00 AM to avoid traffic.",
            zh: "在<strong>新宿</strong>的豐田或日產租車點取車。<strong>當場確認配備雪地無釘胎</strong>並將導航設定為英文/中文。隨後經由中央自動車道向西往河口湖前進（車程約2小時）。建議早上 8:00 前出發以避開東京早高峰出城車潮。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> <strong>Shinjuku station food hall</strong> — Try fresh pastries at <strong>Boul'Ange</strong> or a teishoku (set meal) at any station restaurant.",
            zh: "<strong>早餐：</strong> 新宿站地下美食街 —— 可到人氣麵包店 <strong>Boul'Ange</strong> 買現烤牛角包，或在傳統日式定食店快吃一份早餐。"
          },
          locations: [
            { lat: 35.6896, lng: 139.7006, label: { en: "Shinjuku (Car Pickup)", zh: "新宿（取車）" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Chureito Pagoda (忠靈塔) & Lake Kawaguchi (河口湖)",
            zh: "新倉山淺間公園忠靈塔與河口湖畔"
          },
          desc: {
            en: "Visit the iconic <strong>Chureito Pagoda (忠靈塔)</strong> — 398 steps up, but the view of Mt Fuji behind the red pagoda is priceless. Then drive to the north shore of <strong>Lake Kawaguchi</strong> for mirror-like reflections of Fuji. Stop at <strong>Oishi Park (大石公園)</strong> for a lakeside stroll.",
            zh: "前往最經典的明信片取景地<strong>忠靈塔</strong>，拾級而上 398 級階梯（可緩慢步行），便能將朱紅五重塔與富士山同框的絕景收入眼底。隨後駕車沿河口湖北岸行駛，在<strong>大石公園</strong>欣賞冬日湖光山色。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Hoto Fudo (ほうとう不動)</strong> (Kawaguchiko) — Famous for <em>hoto</em>, a hearty flat-noodle miso soup with seasonal vegetables. The ultimate winter comfort food. The cave-like restaurant branch is unique.",
            zh: "<strong>午餐：</strong> <strong>ほうとう不動 (Hoto Fudo)</strong> —— 山梨縣代表性鄉土料理「餺飥麵」（以南瓜及大量冬令蔬菜熬製的味噌扁平粗麵，用鐵鍋呈上）。溫暖驅寒，其東戀路店如白雲般的半球形建築外觀亦非常吸睛。"
          },
          locations: [
            { lat: 35.4986, lng: 138.7730, label: { en: "Chureito Pagoda", zh: "忠靈塔" } },
            { lat: 35.5116, lng: 138.7650, label: { en: "Lake Kawaguchi", zh: "河口湖" } },
            { lat: 35.5155, lng: 138.7451, label: { en: "Oishi Park", zh: "大石公園" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Christmas Eve Kaiseki at Your Ryokan",
            zh: "聖誕平安夜：溫泉旅館極致懷石饗宴"
          },
          desc: {
            en: "Check into your <strong>ryokan</strong> by Lake Kawaguchi. Enjoy a traditional multi-course <strong>kaiseki dinner (懷石料理)</strong> served in your room, followed by a soak in the hot spring baths with snow-capped Mt Fuji glowing under the stars.",
            zh: "入住河口湖畔的一流溫泉旅館。在聖誕平安夜，一家人在房間內享用精緻的頂級日式<strong>懷石料理</strong>。晚飯後，浸泡在露天風呂中，遠眺在星光和夜色下若隱若現的雪白富士山，度過溫馨神聖的夜晚。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Kaiseki (懷石料理) at your ryokan</strong> — Included with your stay. Expect 8–12 courses featuring seasonal ingredients, local freshwater fish, and beautifully presented dishes.",
            zh: "<strong>晚餐：</strong> <strong>一泊二食溫泉旅館懷石料理</strong> —— 包含於房費內。享用精緻呈獻的 8 至 12 道時令佳餚，包含甲州和牛、名水豆腐及當季鮮魚。"
          },
          locations: [
            { lat: 35.5100, lng: 138.7600, label: { en: "Kawaguchiko Ryokan", zh: "河口湖溫泉旅館" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> The <strong>Chureito Pagoda (忠靈塔)</strong> steps may be icy — wear grip shoes and take it slowly for senior safety. If the steps are strenuous, the lower viewpoint still offers a magnificent view.",
      zh: "<strong>💡 實用貼士：</strong> 冬季新倉山公園步道可能會有結冰現象，請慢步注意安全。若梯級對膝蓋負擔較大，在山腳的淺間神社旁同樣能輕鬆觀賞到宏偉的富士山。"
    }
  },

  /* ════ DAY 6 ════ */
  {
    id: "day-6",
    dayNum: "06",
    date: "Dec 25",
    region: "fuji",
    title: {
      en: "Kawaguchiko (河口湖) to Hakone (箱根) — Christmas Day 🎄",
      zh: "河口湖自駕前往箱根 — 聖誕節與大涌谷奇觀"
    },
    tags: [
      { type: "city", text: "🚗 Kawaguchiko → Hakone (河口湖 → 箱根)" },
      { type: "transport", text: "🚗 Driving (自駕)" },
      { type: "special", text: "🎄 Christmas (聖誕節)" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Sunrise at Lake Kawaguchi & Iyashi no Sato (療癒之里根場)",
            zh: "富士山日出與療癒之里根場合掌屋"
          },
          desc: {
            en: "Wake early for a stunning Christmas morning sunrise over Mt Fuji. After breakfast, drive to <strong>Iyashi no Sato</strong> — a reconstructed traditional thatched-roof village with Mt Fuji as backdrop. Peaceful and easy walking.",
            zh: "清晨在旅館醒來，迎接聖誕節清晨金黃色的「逆富士」日出奇景。早餐後開車前往被譽為「富士山下合掌村」的<strong>西湖療癒之里根場</strong>。漫步於传统茅草屋之間，以富士山為背景拍照留念。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> <strong>Traditional Japanese breakfast at ryokan</strong> — Grilled fish, miso soup, rice, and tamago (egg). A wholesome start to Christmas Day.",
            zh: "<strong>早餐：</strong> <strong>旅館傳統日式早餐</strong> —— 享用鹽烤溪魚、熱味噌湯、日式漬物與溫熱的白飯，健康而暖胃。"
          },
          locations: [
            { lat: 35.5100, lng: 138.7600, label: { en: "Lake Kawaguchi (Sunrise)", zh: "河口湖日出" } },
            { lat: 35.4858, lng: 138.6872, label: { en: "Iyashi no Sato", zh: "療癒之里根場" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Drive to Hakone & Owakudani (大涌谷)",
            zh: "山路自駕至箱根與大涌谷火山遺跡"
          },
          desc: {
            en: "Scenic drive through mountain roads to Hakone (~1.5 hours). Visit <strong>Owakudani</strong> volcanic valley. Try the famous <strong>black eggs (kuro tamago / 黑玉子)</strong> boiled in sulfur springs — legend says each adds 7 years to your life!",
            zh: "經由御殿場山路開往箱根（約 1.5 小時）。前往地熱谷<strong>大涌谷</strong>，觀察白煙繚繞的硫磺噴氣口。別忘了買一份著名的<strong>黑玉子（溫泉黑雞蛋）</strong>，傳說吃一顆能延長 7 年壽命！"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Amazake Chaya (甘酒茶屋)</strong> (Hakone Old Road) — A 400-year-old teahouse serving sweet, alcohol-free amazake and hot mochi. A magical winter pit stop.",
            zh: "<strong>午餐：</strong> <strong>甘酒茶屋 (Amazake Chaya)</strong> —— 位於箱根舊道上，擁有400年歷史的草頂茶屋。來一杯暖烘烘的不含酒精甘酒（酒釀），搭配現烤的黃豆粉麻糬，非常有懷舊感。"
          },
          locations: [
            { lat: 35.2494, lng: 139.0199, label: { en: "Owakudani", zh: "大涌谷" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Hakone Onsen Ryokan — Christmas Night",
            zh: "聖誕夜：箱根高級溫泉名宿"
          },
          desc: {
            en: "Check into your Hakone ryokan. Enjoy the private <strong>rotenburo (outdoor hot spring bath)</strong> surrounded by mountain scenery. Relax and recuperate in the healing waters.",
            zh: "登記入住箱根（強羅或箱根湯本）的溫泉旅館。在聖誕節的夜晚，全家享受被自然山林環繞的露天風呂溫泉。優良的泉質最能消除連日旅行的舟車勞頓。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Kaiseki at ryokan</strong> — Expect Hakone specialties like handmade tofu skin (yuba) dishes, seasonal sashimi, and local mountain vegetables.",
            zh: "<strong>晚餐：</strong> <strong>溫泉旅館節慶懷石定食</strong> —— 品嚐以箱根名產「豆腐皮 (Yuba)」製作的精緻料理，以及從相模灣新鮮直送的刺身拼盤。"
          },
          locations: [
            { lat: 35.2332, lng: 139.0560, label: { en: "Hakone Ryokan", zh: "箱根溫泉旅館" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> Owakudani Ropeway may close in bad weather or volcanic activity. Check the <a href=\"https://www.hakonenavi.jp/en/\" target=\"_blank\" rel=\"noopener\">Hakone Navi</a> website. Have a backup plan to visit the <strong>Hakone Open-Air Museum (雕刻之森美術館)</strong>.",
      zh: "<strong>💡 實用貼士：</strong> 大涌谷纜車可能因強風或火山氣體濃度高而停駛。出發前請查詢官網。如遇停駛，可改往參觀老少咸宜的<strong>箱根雕刻之森美術館</strong>。"
    }
  },

  /* ════ DAY 7 ════ */
  {
    id: "day-7",
    dayNum: "07",
    date: "Dec 26",
    region: "fuji",
    title: {
      en: "Hakone Loop (箱根環遊), Drive to Nagoya (名古屋) & Shinkansen (新幹線) to Kyoto (京都)",
      zh: "蘆之湖海盜船、長途自駕至名古屋與新幹線飛馳京都"
    },
    tags: [
      { type: "city", text: "🚗 Hakone → 🚆 Nagoya → Kyoto (箱根 → 名古屋 → 京都)" },
      { type: "transport", text: "🚗 → 🚆 Transit (轉乘)" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Lake Ashi (蘆之湖) Pirate Ship & Hakone Shrine (箱根神社)",
            zh: "蘆之湖海盜觀光船與箱根神社水中鳥居"
          },
          desc: {
            en: "Take the scenic <strong>pirate ship cruise</strong> across Lake Ashi (20 min). Walk to the iconic <strong>Hakone Shrine torii gate</strong> standing in the water — one of Japan's most photographed spots.",
            zh: "退房後前往碼頭，搭乘華麗的<strong>海盜觀光船</strong>橫渡蘆之湖（約 20 分鐘），晴朗時可於湖上遠眺富士山。下船後沿著古杉步道步行至<strong>箱根神社</strong>，拍攝佇立於湖水中的紅色「和平鳥居」。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> <strong>Ryokan breakfast</strong> — A hearty, final hot breakfast at your resort before setting off on the road.",
            zh: "<strong>早餐：</strong> <strong>溫泉旅館早餐</strong> —— 退房前吃饱熱呼呼的日式朝食，為今天的長途旅程儲備體力。"
          },
          locations: [
            { lat: 35.1897, lng: 139.0210, label: { en: "Lake Ashi Pier", zh: "蘆之湖碼頭" } },
            { lat: 35.1981, lng: 139.0249, label: { en: "Hakone Shrine", zh: "箱根神社" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Drive to Nagoya via Tomei Expressway (東名高速道路)",
            zh: "東名高速自駕前往名古屋"
          },
          desc: {
            en: "Drive along the <strong>Tomei Expressway</strong> to Nagoya (~3 hours). Return the rental car in Nagoya. Stop at a <strong>service area (SA)</strong> along the way for regional snacks — Japanese highway rest stops are famously excellent.",
            zh: "經由東名高速公路向名古屋前行（車程約 3 小時），沿途可欣賞駿河灣與太平洋海岸線美景。下午抵達名古屋市區並歸還租用車輛。中途可在高速公路<strong>服務區 (SA)</strong> 停留休息。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Expressway Service Area</strong> — Try regional specialties like Shizuoka green tea ice cream or grilled eel rice at a SA restaurant. NEOPASA Suruga Bay is recommended.",
            zh: "<strong>午餐：</strong> 高速公路服務區美食 —— 日本的 SA 設施極為先進。推介在靜岡路段服務區嘗試綠茶雪糕或現場烤製的鰻魚飯定食，味道不輸市區名店。"
          },
          locations: [
            { lat: 35.1815, lng: 136.9066, label: { en: "Nagoya (Car Return)", zh: "名古屋（還車）" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Shinkansen (新幹線) to Kyoto (京都)",
            zh: "新幹線中轉與抵達古都京都"
          },
          desc: {
            en: "Drop off the car in Nagoya, then catch the <strong>Shinkansen</strong> to Kyoto (just 35 minutes!). Check into your Kyoto hotel near <strong>Kyoto Station (京都車站)</strong> or in the <strong>Gion (祇園)</strong> area. Take a gentle evening stroll to unwind.",
            zh: "於名古屋站順利交還租車，隨後乘搭極速的<strong>新幹線</strong>前往京都（僅需 35 分鐘！）。入住鄰近<strong>京都車站</strong>或<strong>祇園</strong>區域的酒店。晚上可在市區漫步，舒緩長途坐車的緊繃感。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Yabaton (矢場とん)</strong> (Nagoya Station, before Shinkansen) — Famous for <em>miso katsu</em> (pork cutlet with rich Nagoya miso sauce). A hearty Nagoya farewell. Or dine at <strong>Kyoto Station Ramen Street (拉麵小路)</strong>.",
            zh: "<strong>晚餐：</strong> <strong>矢場豬排 (Yabaton)</strong> （名古屋站內）— 名古屋殿堂級美食「味噌炸豬排」，厚實的多汁豬排淋上香濃的紅味噌醬。或可到抵達後的京都站大樓10樓「拉麵小路」任選一碗熱氣騰騰的拉麵。"
          },
          locations: [
            { lat: 34.9854, lng: 135.7588, label: { en: "Kyoto Station", zh: "京都車站" } },
            { lat: 35.0037, lng: 135.7758, label: { en: "Gion District", zh: "祇園" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> This is the longest travel day. Buy your <strong>Shinkansen tickets</strong> at the Nagoya Station JR Ticket Office (Midori-no-窓口). Reserved seats (指定席) are recommended for family comfort.",
      zh: "<strong>💡 實用貼士：</strong> 今天是行程中移動距離最長的一天。抵達名古屋站後可直接在 JR 綠色窗口 (Midori-no-madoguchi) 購買新幹線車票，為同行長輩購買「指定席」（對號入座）最穩妥舒適。"
    }
  },

  /* ════ DAY 8 ════ */
  {
    id: "day-8",
    dayNum: "08",
    date: "Dec 27",
    region: "kansai",
    title: {
      en: "Kyoto (京都) — Fushimi Inari (伏見稻荷), Kiyomizu-dera (清水寺) & Gion (祇園)",
      zh: "京都經典巡禮 — 伏見稻荷千本鳥居、清水寺懸空舞台與夜遊祇園"
    },
    tags: [
      { type: "city", text: "⛩️ Kyoto (京都)" },
      { type: "pace", en: "⚖️ Balanced", zh: "⚖️ 步調適中" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Fushimi Inari Taisha (伏見稻荷大社) ⛩️",
            zh: "伏見稻荷大社千本鳥居"
          },
          desc: {
            en: "Arrive by 8:00 AM to beat the crowds at Kyoto's most iconic shrine. Walk through the mesmerizing <strong>thousands of vermillion torii gates</strong> winding up the mountainside. Walk to the first viewpoint (30 min up) for an easy, barrier-free loop.",
            zh: "清晨 8:00 前到達，能拍到無人的朱紅色<strong>千本鳥居</strong>通道。步道沿稻荷山蜿蜒而上，空氣清新。無須登頂，漫步至第一個平台「三德社」（約半小時）即可折返，路況良好平整。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> <strong>Vermillion Café</strong> (near Fushimi Inari station) — Excellent coffee and Western-style breakfasts in a cozy space overlooking a pond.",
            zh: "<strong>早餐：</strong> <strong>Vermillion Café</strong> —— 緊鄰神社出口旁，坐擁幽靜池塘景致。提供香醇的澳洲式咖啡與美味的牛油果煙燻三文魚多士，環境休閒。"
          },
          locations: [
            { lat: 34.9671, lng: 135.7727, label: { en: "Fushimi Inari Taisha", zh: "伏見稻荷大社" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Kiyomizu-dera Temple (清水寺) & Higashiyama (東山) Streets",
            zh: "清水寺與二年坂、三年坂老街"
          },
          desc: {
            en: "Visit the spectacular <strong>Kiyomizu-dera</strong> — the wooden terrace juts out over the hillside with panoramic views of Kyoto. Take a taxi up and walk down through <strong>Ninenzaka & Sannenzaka (二年坂及三年坂)</strong> — charming stone-paved lanes.",
            zh: "造訪京都最著名的世界文化遺產<strong>清水寺</strong>，佇立於完全不用一根釘子建成的清水懸空舞台上，俯瞰京都市景。隨後沿著著名的<strong>二年坂與三年坂</strong>石板階梯老街拾級而下，沿途布滿了日式茶屋與手信店。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Omen Kodaiji (おめん 高台寺店)</strong> — Handmade udon noodles served with seasonal vegetables, ginger, and a warm dipping broth. A Kyoto institution.",
            zh: "<strong>午餐：</strong> <strong>名代烏冬 おめん (Omen)</strong> （高台寺店）— 京都著名的手打烏冬麵館。烏冬口感彈牙，搭配當季蔬菜拼盤與濃郁的柴魚醬汁，暖心又健康。"
          },
          locations: [
            { lat: 34.9949, lng: 135.7850, label: { en: "Kiyomizu-dera", zh: "清水寺" } },
            { lat: 34.9986, lng: 135.7815, label: { en: "Ninenzaka / Sannenzaka", zh: "二年坂 / 三年坂" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Nishiki Market (錦市場) & Gion (祇園) District Walk",
            zh: "錦市場探訪與夜遊祇園花見小路"
          },
          desc: {
            en: "Browse <strong>Nishiki Market</strong> (\"Kyoto's Kitchen\") for snacks. Then wander the atmospheric <strong>Gion district</strong> geisha quarter. Walk along <strong>Hanamikoji Street (花見小路)</strong> and <strong>Shirakawa Canal (白川運河)</strong>.",
            zh: "下午短暫逛逛有「京都廚房」之稱的<strong>錦市場</strong>，品嚐各式京風小吃。天色漸暗時前往<strong>祇園花見小路</strong>，漫步於石板路和格子木窗紅牆的茶屋街，極有機會邂逅正步履匆匆赴約的藝妓。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Gion Owatari (祇園大渡)</strong> — An intimate kaiseki restaurant in the heart of Gion. Seasonal multi-course dinner with impeccable presentation. Reserve well ahead.",
            zh: "<strong>晚餐：</strong> <strong>祇園大渡 (Gion Owatari)</strong> —— 位於祇園小巷內獲得米芝蓮肯定的極致茶懷石料理，主廚手藝精湛且待人親切，為同行旅客帶來最高規格的京都名物享受。<strong>（必須極早預約）</strong>"
          },
          locations: [
            { lat: 35.0050, lng: 135.7681, label: { en: "Nishiki Market", zh: "錦市場" } },
            { lat: 35.0037, lng: 135.7758, label: { en: "Gion / Hanamikoji St.", zh: "祇園花見小路" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> Kiyomizu-dera is on a steep hill — <strong>take a taxi up to the temple gate and walk down</strong> the slopes. This avoids an exhausting uphill climb and protects the knees.",
      zh: "<strong>💡 實用貼士：</strong> 清水寺坡度較陡。**強烈建議直接從京都站搭的士上到清水寺大門口，然後一路下坡步行下山**，這能省下大量上坡力氣，最適合長輩舒適遊覽。"
    }
  },

  /* ════ DAY 9 ════ */
  {
    id: "day-9",
    dayNum: "09",
    date: "Dec 28",
    region: "kansai",
    title: {
      en: "Kyoto (京都) — Golden Pavilion (金閣寺), Arashiyama (嵐山) & Tea Ceremony (茶道)",
      zh: "京都自然與禪意 — 閃耀金閣寺、嵐山渡月橋與傳統日式茶道體驗"
    },
    tags: [
      { type: "city", text: "⛩️ Kyoto (京都)" },
      { type: "pace", en: "⚖️ Balanced", zh: "⚖️ 步調適中" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Kinkaku-ji (金閣寺 / Golden Pavilion) & Ryoan-ji (龍安寺)",
            zh: "金閣寺與龍安寺枯山水庭園"
          },
          desc: {
            en: "Kinkaku-ji's gold-leaf-covered pavilion reflected in the mirror pond is a breathtaking sight. Arrive at 9:00 AM opening. Then walk to <strong>Ryoan-ji</strong> for the famous zen rock garden containing 15 mysteriously arranged stones.",
            zh: "朝聖京都最耀眼的地標<strong>金閣寺</strong>（舍利殿），金箔覆蓋的樓閣倒映在鏡湖池中，冬日晨光下美不勝收。隨後步行或搭乘巴士前往<strong>龍安寺</strong>，靜坐於方丈庭園前，參悟聞名世界的「枯山水」十五石庭之禪意。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> <strong>Inoda Coffee (イノダコーヒ)</strong> (Sanjo Main Branch) — A beloved Kyoto institution since 1947. Their \"Kyoto Breakfast\" set is a local morning ritual.",
            zh: "<strong>早餐：</strong> <strong>Inoda Coffee (三條本店)</strong> —— 創於1947年的京都經典咖啡館。點一份招牌「京都的朝食」套餐（牛角包、煎蛋、火腿與新鮮沙律），配上一杯微酸香濃的「阿拉伯珍珠」咖啡。"
          },
          locations: [
            { lat: 35.0394, lng: 135.7292, label: { en: "Kinkaku-ji (Golden Pavilion)", zh: "金閣寺" } },
            { lat: 35.0345, lng: 135.7182, label: { en: "Ryoan-ji", zh: "龍安寺" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Arashiyama Bamboo Grove (嵐山竹林) & Togetsukyo Bridge (渡月橋)",
            zh: "嵐山渡月橋與竹林小徑"
          },
          desc: {
            en: "Travel to <strong>Arashiyama</strong>. Walk through the ethereal <strong>Bamboo Grove</strong> — towering green stalks sway above you. Cross the iconic <strong>Togetsukyo Bridge</strong> with stunning mountain vistas.",
            zh: "乘火車或的士前往風景名勝區<strong>嵐山</strong>。漫步於清幽無比的<strong>竹林小徑</strong>，聳立的綠竹遮天蔽日，風吹過時沙沙作響。隨後踱步橫跨大堰川的木質外觀<strong>渡月橋</strong>，欣賞冬日嵐山的俊秀山景。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Shoraian (松籟庵)</strong> (Arashiyama) — A riverside tofu kaiseki restaurant set on a small island. Warming winter dishes in a tranquil valley.",
            zh: "<strong>午餐：</strong> <strong>松籟庵 (Shoraian)</strong> （嵐山）— 隱藏於嵐山溪谷深處的豆腐懷石料理名店。在溪水潺潺的窗景旁，享用如白雪般精緻的熱川豆腐與精緻和食料理。<strong>（必須提前預約）</strong>"
          },
          locations: [
            { lat: 35.0171, lng: 135.6762, label: { en: "Arashiyama Bamboo Grove", zh: "嵐山竹林" } },
            { lat: 35.0095, lng: 135.6781, label: { en: "Togetsukyo Bridge", zh: "渡月橋" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Authentic Tea Ceremony (茶道體驗) & Kamogawa River (鴨川) Walk",
            zh: "傳統茶道體驗與鴨川漫步"
          },
          desc: {
            en: "Experience a <strong>private tea ceremony</strong> (book via <strong>Camellia Tea House</strong>). Beautiful for all ages — learn to whisk your own matcha. Follow with a gentle walk along the <strong>Kamogawa River</strong> promenade.",
            zh: "預約一場傳統<strong>茶道文化體驗</strong>（推介祇園的 Camellia 茶屋）。在茶道大師指導下學習日本茶道禮儀，並親自嘗試擊點抹茶。晚飯前可到市區著名的<strong>鴨川</strong>畔漫步，感受古都的優雅暮色。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Tousuiro (豆水楼)</strong> (Kyoto) — Specializes in Kyoto's famous <em>yudofu</em> (simmered tofu in hot broth) — simple, elegant, and warming. A winter classic.",
            zh: "<strong>晚餐：</strong> <strong>豆水樓 (Tousuiro)</strong> — 精緻湯豆腐料理。利用京都優質地下水製作的豆腐在木桶中溫熱慢煮，配上特製醬油與柴魚絲，鮮美暖胃，是極具禪意的冬日名菜。"
          },
          locations: [
            { lat: 35.0032, lng: 135.7727, label: { en: "Camellia Tea House", zh: "茶道體驗" } },
            { lat: 35.0105, lng: 135.7714, label: { en: "Kamogawa River", zh: "鴨川" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> The tea ceremony is a seated activity with minimal physical movement, making it very comfortable and relaxing for senior comfort. English instruction is available.",
      zh: "<strong>💡 實用貼士：</strong> 傳統茶道體驗通常設有矮凳，無須全程跪坐，對長輩膝關節非常友善舒適。大部分體驗點均提供流暢的英語講解。"
    }
  },

  /* ════ DAY 10 ════ */
  {
    id: "day-10",
    dayNum: "10",
    date: "Dec 29",
    region: "kansai",
    title: {
      en: "Day Trip to Nara (奈良) — Deer Park (奈良公園) & Transfer to Osaka (大阪)",
      zh: "古都奈良小鹿同遊 — 奈良公園、東大寺大佛殿與下榻大阪"
    },
    tags: [
      { type: "city", text: "🚆 Kyoto → Nara → Osaka (京都 → 奈良 → 大阪)" },
      { type: "transport", text: "🚆 Train (鐵路)" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Train to Nara & Nara Park (奈良公園)",
            zh: "近鐵前往奈良與奈良公園餵小鹿"
          },
          desc: {
            en: "Take the train from Kyoto to Nara (~45 min). Walk to <strong>Nara Park</strong> where 1,200+ friendly deer roam freely. Buy <strong>shika senbei (鹿仙貝)</strong> (deer crackers, ¥200) and feed them — they'll bow to you!",
            zh: "在京都站乘火車前往奈良（約 45 分鐘）。步行進入綠草如茵的<strong>奈良公園</strong>，這裡棲息了超過 1200 隻溫馴的神鹿。購買專用的<strong>鹿仙貝</strong>（每份約 ¥200）餵飼，小鹿們還會向您鞠躬點頭討食，極具樂趣。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> Grab pastries at <strong>Sizuya (志津屋)</strong> (Kyoto Station) — famous for their legendary beef cutlet sandwiches and beef buns.",
            zh: "<strong>早餐：</strong> <strong>志津屋 (Sizuya)</strong> （京都站內）— 京都老牌烘焙店。強烈推介他們的招牌「吉列牛肉三文治 (Gyu-Katsu Sandwich)」，非常美味。"
          },
          locations: [
            { lat: 34.6851, lng: 135.8331, label: { en: "Nara Park", zh: "奈良公園" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Todai-ji Temple (東大寺) & Kasuga Taisha (春日大社)",
            zh: "東大寺大佛殿與春日大社石燈籠"
          },
          desc: {
            en: "Visit <strong>Todai-ji</strong> — home to the 15-meter bronze <strong>Great Buddha (大佛)</strong>, housed in the world's largest wooden building. Walk to the atmospheric <strong>Kasuga Taisha</strong>, famous for its thousands of mossy stone lanterns.",
            zh: "參觀雄偉的<strong>東大寺</strong>。大佛殿是世界最大的木造建築，殿內供奉著高達 15 米的巨型青銅大佛，氣勢逼人。隨後沿著掛滿古老青銅與石燈籠的林道漫步至<strong>春日大社</strong>。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Kakinoha Sushi Tanaka (柿の葉すし たなか)</strong> (Nara) — Try <em>kakinoha-zushi</em>, Nara's specialty sushi wrapped in persimmon leaves. Delicate, flavorful, and uniquely local.",
            zh: "<strong>午餐：</strong> <strong>柿の葉すし たなか (Tanaka)</strong> （奈良站前）— 奈良代表名產「柿葉壽司」（用柿子葉包裹青花魚或三文魚壽司，帶有淡淡植物清香，利於防腐）。味道溫和細緻。"
          },
          locations: [
            { lat: 34.6888, lng: 135.8398, label: { en: "Todai-ji Temple", zh: "東大寺" } },
            { lat: 34.6814, lng: 135.8491, label: { en: "Kasuga Taisha", zh: "春日大社" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Transfer to Osaka & Dotonbori (道頓堀) Neon Lights",
            zh: "前往大阪與體驗道頓堀不夜城"
          },
          desc: {
            en: "Take the train to <strong>Osaka</strong> (~50 min). Check into your hotel in <strong>Namba (難波) / Shinsaibashi (心齋橋)</strong>. Dive straight into the dazzling neon-lit streets of <strong>Dotonbori</strong>.",
            zh: "乘火車前往關西最大城市<strong>大阪</strong>（約 50 分鐘）。登記入住位於繁華中心<strong>難波 / 心齋橋</strong>的酒店。夜幕降臨時，直接投入熱鬧非凡、布滿巨型立體霓虹招牌的<strong>道頓堀</strong>美食街。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Dotonbori street food</strong> — Sample local culinary delights: <strong>takoyaki (章魚燒)</strong> from Kukuru, <strong>gyoza (餃子)</strong> from Chao Chao, and <strong>kushikatsu (串炸)</strong> from Daruma. Remember: no double dipping!",
            zh: "<strong>晚餐：</strong> 道頓堀掃街美食之旅 —— 暢嚐大阪代表小吃：<strong>庫庫嚕 (Kukuru)</strong> 的爆漿章魚燒、<strong>Chao Chao</strong> 的香脆一口餃子，以及<strong>元祖串炸達摩 (Daruma)</strong> 的香脆串炸。**（注意：串炸沾醬嚴禁二次下蘸）**"
          },
          locations: [
            { lat: 34.6687, lng: 135.5005, label: { en: "Dotonbori", zh: "道頓堀" } },
            { lat: 34.6686, lng: 135.4985, label: { en: "Namba / Shinsaibashi", zh: "難波 / 心齋橋" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> The deer in Nara are wild but accustomed to tourists. They can be pushy when they see food — hold crackers up high and bow before feeding. Keep bags zipped.",
      zh: "<strong>💡 實用貼士：</strong> 奈良小鹿雖可愛但仍有野性。當牠們看見您手上有鹿仙貝時會主動圍過來。建議將仙貝高舉，並向小鹿輕輕點頭鞠躬，牠們通常也會鞠躬回禮後再行餵食。請看管好手袋及重要衣物。"
    }
  },

  /* ════ DAY 11 ════ */
  {
    id: "day-11",
    dayNum: "11",
    date: "Dec 30",
    region: "kansai",
    title: {
      en: "Osaka (大阪) — Castle (大阪城), Shinsekai (新世界) & Dotonbori (道頓堀)",
      zh: "大阪古今交融 — 宏偉大阪城天守閣、復古新世界與巨蟹懷石料理"
    },
    tags: [
      { type: "city", text: "🏙️ Osaka (大阪)" },
      { type: "pace", en: "⚖️ Balanced", zh: "⚖️ 步調適中" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Osaka Castle (大阪城天守閣) & Park",
            zh: "大阪城公園與天守閣"
          },
          desc: {
            en: "Visit <strong>Osaka Castle</strong>, surrounded by stone moats and a large park. Take the elevator inside the castle tower to the 8th floor observatory for panoramic city views. Ground paths are flat and easy for senior walking.",
            zh: "遊覽壯麗的<strong>大阪城公園</strong>，欣賞宏偉的護城河巨石城牆。進入城堡中心的天守閣，乘搭電梯直達 8 樓展望台，鳥瞰大阪市區全景。公園路面寬闊平坦，非常適合長輩悠閒慢步。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> <strong>Café Rhinebeck</strong> (Shinsaibashi) — Fluffy pancakes and specialty coffee. A relaxed start to the day.",
            zh: "<strong>早餐：</strong> <strong>Café Rhinebeck (心齋橋)</strong> —— 享用現做鬆軟的厚鬆餅 (Pancakes) 與香濃精品咖啡，開啟悠閒的一天。"
          },
          locations: [
            { lat: 34.6873, lng: 135.5262, label: { en: "Osaka Castle", zh: "大阪城" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Shinsekai (新世界) & Kuromon Market (黑門市場)",
            zh: "復古新世界與黑門市場海鮮街"
          },
          desc: {
            en: "Explore the retro <strong>Shinsekai</strong> district with its iconic <strong>Tsutenkaku Tower (通天閣)</strong>. Then visit <strong>Kuromon Market</strong> for fresh sashimi, grilled Kobe beef skewers, and sweet seasonal fruits.",
            zh: "走訪洋溢著昭和懷舊風情、掛滿河豚大燈籠的<strong>新世界</strong>街區，與地標<strong>通天閣</strong>合影。隨後前往著名的<strong>黑門市場</strong>，品嚐當日新鮮金槍魚刺身、現烤神戶牛肉串及冬季限定的日本大草莓（草莓/多士）。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Kushikatsu Daruma (串かつだるま)</strong> (Shinsekai) — Try original deep-fried skewers like shrimp, lotus root, asparagus, and cheese. Light, crispy, and delicious.",
            zh: "<strong>午餐：</strong> <strong>元祖串炸達摩 (Daruma)</strong> （新世界總店）— 體驗地道大阪串炸文化。外皮裹上極薄麵衣炸至金黃，推介大蝦、蓮藕、蘆筍和鵪鶉蛋串。**（注意： 醬汁絕不可二次蘸用，只可蘸一次）**"
          },
          locations: [
            { lat: 34.6520, lng: 135.5063, label: { en: "Shinsekai / Tsutenkaku", zh: "新世界 / 通天閣" } },
            { lat: 34.6663, lng: 135.5074, label: { en: "Kuromon Market", zh: "黑門市場" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Dotonbori (道頓堀) Cruise & HEP FIVE Ferris Wheel",
            zh: "道頓堀觀光船與 HEP FIVE 摩天輪夜景"
          },
          desc: {
            en: "Enjoy the glowing neon streetscapes of Dotonbori. Take a ride on the <strong>HEP FIVE Ferris Wheel</strong> in Umeda (梅田) — some cabins feature heated kotatsu tables for a cozy winter perspective!",
            zh: "再次漫步道頓堀，拍攝固力果奔跑小人的經典標誌。隨後前往梅田搭乘 <strong>HEP FIVE 紅色摩天輪</strong>。在寒冬中，部分車廂會特別配備溫暖的日式「被爐（Kotatsu）」，讓全家舒適地在高空中欣賞大阪夜景。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Kani Doraku (蟹道楽)</strong> (Dotonbori Main Branch) — Under the famous giant moving crab sign, enjoy a multi-course crab kaiseki feast. Reserve in advance.",
            zh: "<strong>晚餐：</strong> <strong>蟹道樂 (Kani Doraku)</strong> （道頓堀本店）— 在著名的巨型電動螃蟹招牌下，享用精緻的松葉蟹/鱈場蟹多食懷石宴（包含蟹刺身、烤蟹腳、蟹天婦羅及蟹釜飯）。極受歡迎，<strong>（必須提前數周預訂）</strong>。"
          },
          locations: [
            { lat: 34.6687, lng: 135.5005, label: { en: "Dotonbori", zh: "道頓堀" } },
            { lat: 34.7025, lng: 135.4984, label: { en: "HEP FIVE (Umeda)", zh: "HEP FIVE 摩天輪（梅田）" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> Today is Dec 30, which is close to the New Year holiday. Some small family shops may close, but major malls, markets, and tourist facilities operate normally.",
      zh: "<strong>💡 實用貼士：</strong> 12月30日已臨近日本新年除夕。個別私人小店可能休業，但大型商場、主要市場及著名景點均正常營業，也是採購日式藥妝和長輩伴手禮的最佳時機。"
    }
  },

  /* ════ DAY 12 ════ */
  {
    id: "day-12",
    dayNum: "12",
    date: "Dec 31",
    region: "kansai",
    title: {
      en: "Osaka (大阪) — Final Day & New Year's Eve (除夕 / 大晦日) 🎊",
      zh: "大阪除夕跨年夜 — 神木大社參拜、傳統蕎麥麵與深夜敲鐘倒數 🎊"
    },
    tags: [
      { type: "city", text: "🏙️ Osaka (大阪)" },
      { type: "pace", en: "🧘 Relaxed", zh: "🧘 輕鬆悠閒" },
      { type: "special", en: "🎊 NYE", zh: "🎊 除夕夜" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Option A: Kobe (神戶) Excursion | Option B: Sumiyoshi Taisha (住吉大社)",
            zh: "選項A：神戶異人館半日遊 | 選項B：住吉大社迎新春"
          },
          desc: {
            en: "<strong>Option A — Kobe (30 mins from Osaka):</strong> Visit the historic Meiji-era Western mansions in <strong>Kitano-cho (北野町)</strong>. Lunch at <strong>Steakland Kobe</strong>. <br><strong>Option B — Osaka Base:</strong> Visit <strong>Sumiyoshi Taisha</strong>, one of Japan's oldest Shinto shrines, featuring a stunning arched bridge. Feel the holy buzz as locals prepare for New Year's first prayers.",
            zh: "<strong>選項A（神戶半日遊 - 車程30分鐘）：</strong> 前往神戶山麓的<strong>北野異人館街</strong>，欣賞明治時期留存的歐洲風情洋房。午餐享用頂級神戶牛肉鐵板燒。<br><strong>選項B（留在大阪）：</strong> 前往參拜擁有千年歷史的<strong>住吉大社</strong>，欣賞其標誌性的拱形紅色「太鼓橋」。此時大社正張燈結彩，準備迎接今晚新年的百萬參拜人潮，氛圍極佳。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> <strong>Gram (心齋橋)</strong> — Famous for premium jiggly soufflé pancakes. Or if in Kobe: <strong>Nishimura's Coffee (西村咖啡店)</strong> — An institution since 1948 with rich vintage interiors.",
            zh: "<strong>早餐：</strong> <strong>Gram (心齋橋)</strong> — 搶購每日限定、口感如雲朵般軟綿的舒芙蕾厚鬆餅。若去神戶，可前往老字號 <strong>西村咖啡店 (Nishimura's)</strong>，在優雅復古的皮椅上享用英式早餐。"
          },
          locations: [
            { lat: 34.6964, lng: 135.1939, label: { en: "Kitano-cho, Kobe (Option A)", zh: "神戶北野異人館（選項A）" } },
            { lat: 34.6120, lng: 135.4930, label: { en: "Sumiyoshi Taisha (Option B)", zh: "住吉大社（選項B）" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Last-Minute Souvenir Shopping",
            zh: "新年大採購與午後休憩"
          },
          desc: {
            en: "Browse <strong>Shinsaibashi-suji</strong> shopping arcade for souvenirs — matcha Kit-Kats, local skincare, and Japanese crafts. Pick up a freshly baked, jiggly cheesecake from <strong>Rikuro Ojisan (りくろーおじさん)</strong> (¥965).",
            zh: "在長達 600 米的<strong>心齋橋筋商店街</strong>進行最後衝刺。選購藥妝、抹茶零食及特色日式工藝品。別忘了排隊買一個 <strong>Rikuro 老爺爺現烤起司蛋糕</strong>（僅約 ¥965，剛出爐時還會搖晃晃，極香濃軟綿）。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Steakland Kobe (神戶)</strong> (Option A) — Premium A5 Kobe beef grilled on a teppan griddle before your eyes. Or <strong>Ichiran Ramen (一蘭拉麵)</strong> (Option B) for hot tonkotsu soup.",
            zh: "<strong>午餐：</strong> **Steakland Kobe**（若選神戶）— 性價比極高的 A5 神戶牛肉鐵板燒，師傅在您面前現場切片煎烤；或在大阪難波吃一碗經典暖胃的 **一蘭拉麵**（若選選項B）。"
          },
          locations: [
            { lat: 34.6729, lng: 135.5002, label: { en: "Shinsaibashi Shopping", zh: "心齋橋筋商店街" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上與跨年夜" },
        activity: {
          title: {
            en: "New Year's Eve — Toshikoshi Soba (跨年蕎麥麵) & Temple Bells (除夜之鐘)",
            zh: "日本大年夜大晦日 —— 跨年蕎麥麵與除夜之鐘"
          },
          desc: {
            en: "Celebrate a traditional Japanese NYE! The local tradition is to eat <strong>toshikoshi soba (年越し蕎麥)</strong> (year-crossing buckwheat noodles) for health and longevity. At midnight, visit <strong>Shitennoji Temple (四天王寺)</strong> to hear the bells ring <strong>108 times</strong> to wash away the 108 earthly desires.",
            zh: "體驗地道的日本跨年夜！日本人習慣在除夕吃「<strong>跨年蕎麥麵 (Toshikoshi Soba)</strong>」，長長的麵條寓意長壽。深夜時分，可前往<strong>四天王寺</strong>，現場聆聽沉穩肅穆的「<strong>除夜之鐘</strong>」敲響 108 下，驅除過去一年的煩惱，迎來吉祥的一年。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Toshikoshi soba</strong> — Join the locals! Visit any traditional soba noodle shop (like <strong>Matsuya</strong>) for hot tempura soba. Alternatively, dine at <strong>Mizuno (美津の)</strong> for Osaka's best okonomiyaki.",
            zh: "<strong>晚餐：</strong> <strong>除夕跨年蕎麥麵</strong> —— 入鄉隨俗，到心齋橋的麵館（如<strong>松屋</strong>）吃一碗熱氣騰騰的炸蝦蕎麥麵。或在道頓堀的 <strong>美津の (Mizuno)</strong> 享用招牌山藥大阪燒，暖烘烘地迎接新年。"
          },
          locations: [
            { lat: 34.6540, lng: 135.5159, label: { en: "Shitennoji Temple", zh: "四天王寺" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> If departing on Jan 1, check your transport timing in advance. Trains operate, but might be on a holiday schedule. Make sure to pack the night before so you can enjoy the NYE countdown.",
      zh: "<strong>💡 實用貼士：</strong> 若於 1 月 1 日乘飛機返港，請留意往機場的特急列車可能實施假日班表，務必提前確認。今晚出門前請先收拾好行李，便能無後顧之憂地參與深夜跨年敲鐘。"
    }
  }
];

/* ═════════════════════════════════════════════════════════════════════
   PLAN B: Kanto & Shizuoka Scenic Loop (12 Days · No Kansai)
   Route: Tokyo → Kawaguchiko → Hakone → Atami → Kamakura → Yokohama → Tokyo
   ═════════════════════════════════════════════════════════════════════ */
const ITINERARY_DATA_B = [
  /* ════ DAY 1 ════ */
  {
    id: "day-1",
    dayNum: "01",
    date: "Dec 20",
    region: "tokyo",
    title: {
      en: "Arrival in Tokyo (東京) — Asakusa (淺草) & Skytree (晴空塔)",
      zh: "抵達東京 — 淺草寺參拜與登晴空塔賞夜景"
    },
    tags: [
      { type: "city", text: "🏙️ Tokyo (東京)" },
      { type: "pace", en: "🧘 Relaxed", zh: "🧘 輕鬆悠閒" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Arrive at Narita (成田) / Haneda (羽田) Airport",
            zh: "抵達成田 / 羽田機場"
          },
          desc: {
            en: "Clear customs smoothly, pick up your <strong>Suica card</strong> at the airport station, and take the Narita Express or Keikyu line to your hotel. Check in and rest after the flight.",
            zh: "辦理入境手續，在機場車站領取/購買 <strong>Suica 卡</strong>，乘搭成田特快 (N'EX) 或京急線直達市區酒店。辦理入住並稍作休息，舒緩飛行疲勞。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast / Brunch:</strong> Grab a quick meal at a <strong>konbini (便利店)</strong> (7-Eleven onigiri, sandwiches, and hot coffee) — delicious, fresh, and convenient.",
            zh: "<strong>早餐 / 早午餐：</strong> 在機場或酒店附近的<strong>便利店 (Konbini)</strong> 買點輕食（7-Eleven 飯糰、三文治和熱咖啡）—— 方便快捷又美味。"
          },
          locations: [
            { lat: 35.7720, lng: 140.3929, label: { en: "Narita Airport", zh: "成田機場" } },
            { lat: 35.5494, lng: 139.7798, label: { en: "Haneda Airport", zh: "羽田機場" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Senso-ji Temple (淺草寺) & Nakamise-dori (仲見世通)",
            zh: "淺草寺與仲見世通"
          },
          desc: {
            en: "Tokyo's oldest temple. Walk through the iconic <strong>Kaminarimon (雷門 / Thunder Gate)</strong> and browse the traditional shopping street. Flat paved grounds allow comfortable walking.",
            zh: "參訪東京最古老的寺廟。穿過寫有巨型紅燈籠的<strong>雷門</strong>，沿著<strong>仲見世通</strong>傳統商店街漫步，品嚐現烤人形燒，地面平整好走。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Sometaro (染太郎)</strong> (Asakusa) — A charming, traditional okonomiyaki spot with tabletop griddles.",
            zh: "<strong>午餐：</strong> <strong>染太郎 (Sometaro)</strong> — 淺草著名的傳統大阪燒名店，充滿昭和懷舊風情。"
          },
          locations: [
            { lat: 35.7148, lng: 139.7967, label: { en: "Senso-ji Temple", zh: "淺草寺" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Tokyo Skytree (東京晴空塔) & Sumida River Walk",
            zh: "東京晴空塔觀景台與隅田川夜景"
          },
          desc: {
            en: "Ride the high-speed elevator up to the <strong>Tembo Deck (350m)</strong> for a breathtaking 360° panorama of Tokyo's neon sea. Fully barrier-free with elevator access throughout.",
            zh: "搭乘高速升降機直達 350 米高天望甲板，俯瞰東京浩瀚無垠的璀璨夜景。全程設有無障礙升降機與平地通道。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Kura Sushi (藏壽司 淺草 ROX 店)</strong> — Global flagship conveyer-belt sushi with interactive games, or traditional grilled unagi eel at <strong>Komagata Dozeu</strong>.",
            zh: "<strong>晚餐：</strong> <strong>藏壽司 (Kura Sushi 淺草 ROX 旗艦店)</strong> — 日本最大迴轉壽司旗艦店，或在隅田川畔享用正宗蒲燒鰻魚飯。"
          },
          locations: [
            { lat: 35.7101, lng: 139.8107, label: { en: "Tokyo Skytree", zh: "東京晴空塔" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> Book Skytree tickets online in advance to skip ticket queues. Wheelchair and elevator access is available at every level.",
      zh: "<strong>💡 實用貼士：</strong> 建議提前在網上預訂晴空塔指定時段門票以避開人龍。全館無障礙設施極為完善。"
    }
  },

  /* ════ DAY 2 ════ */
  {
    id: "day-2",
    dayNum: "02",
    date: "Dec 21",
    region: "tokyo",
    title: {
      en: "Sumida River (隅田川) & teamLab Planets (豐洲) — Digital Art & Ginza",
      zh: "隅田川水岸、teamLab Planets 沉浸式光影與銀座漫步"
    },
    tags: [
      { type: "city", text: "🏙️ Tokyo (東京)" },
      { type: "pace", en: "⚖️ Balanced", zh: "⚖️ 步調適中" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Tsukiji Outer Market (築地場外市場) Breakfast",
            zh: "築地場外市場海鮮朝食"
          },
          desc: {
            en: "Stroll through the bustling outer market. Taste sweet Japanese tamagoyaki (rolled omelette), fresh scallop skewers, and fresh winter strawberries.",
            zh: "漫步築地場外市場，品嚐熱騰騰的現烤玉子燒、牛油煎帶子串以及當季新鮮大草莓。"
          },
          meal: {
            icon: "🍣",
            en: "<strong>Breakfast:</strong> <strong>Tsukiji Donburi Senmon (築地丼物專門)</strong> — Fresh kaisen-don (sashimi rice bowl) topped with salmon, tuna, and sea urchin.",
            zh: "<strong>早餐：</strong> <strong>築地海鮮丼</strong> — 滿滿厚切三文魚、吞拿魚及海膽的刺身丼，鮮甜肥美。"
          },
          locations: [
            { lat: 35.6655, lng: 139.7707, label: { en: "Tsukiji Outer Market", zh: "築地場外市場" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "teamLab Planets TOKYO (豐洲) Digital Art",
            zh: "teamLab Planets TOKYO 豐洲光影美術館"
          },
          desc: {
            en: "Step barefoot into massive digital artworks. Walk through knee-deep digital water with projecting koi fish, and wander through infinite crystal mirror universes. Truly mesmerising and gentle on the feet.",
            zh: "赤腳步入沉浸式光影美術館。涉水穿過由光影錦鯉游動的水池，走進懸浮花朵與無邊水晶鏡面宇宙。視覺震撼且步調節奏極為舒適。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Vegan Ramen UZU Tokyo</strong> (at teamLab Planets) — Michelin-recognised ramen eaten in a mirrored digital art chamber.",
            zh: "<strong>午餐：</strong> <strong>Vegan Ramen UZU Tokyo</strong> — 位於館內的光影拉麵，在鏡面光影藝術環繞下品嚐濃郁湯頭。"
          },
          locations: [
            { lat: 35.6491, lng: 139.7898, label: { en: "teamLab Planets", zh: "teamLab Planets" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Ginza (銀座) Window Shopping & Winter Illuminations",
            zh: "銀座名店街漫步與冬日香檳金彩燈"
          },
          desc: {
            en: "Explore Ginza's wide boulevards, Mitsukoshi department store food hall (depachika), and see the elegant street illuminations.",
            zh: "漫步銀座寬闊林蔭大道，探訪三越百貨頂級地下美食街 (Depachika)，欣賞冬日璀璨的香檳金色街道彩燈。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Ginza Kagari (銀座 篝)</strong> — Renowned rich chicken tori-paitan ramen, or traditional sukiyaki hotpot.",
            zh: "<strong>晚餐：</strong> <strong>銀座 篝 (Ginza Kagari)</strong> — 濃郁滑順的頂級雞白湯拉麵，或在銀座名店享用熱騰騰的壽喜燒。"
          },
          locations: [
            { lat: 35.6717, lng: 139.7650, label: { en: "Ginza", zh: "銀座" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> teamLab Planets requires walking barefoot in shallow warm water — wear trousers that can be easily rolled up to the knee. Lockers and towels are provided.",
      zh: "<strong>💡 實用貼士：</strong> teamLab Planets 需要赤腳走進及膝溫水展區，建議穿著方便捲起褲腳的長褲。館方免費提供儲物櫃及毛巾。"
    }
  },

  /* ════ DAY 3 ════ */
  {
    id: "day-3",
    dayNum: "03",
    date: "Dec 22",
    region: "tokyo",
    title: {
      en: "Meiji Jingu (明治神宮) & Omotesando (表參道) — Shibuya Sky Sunset",
      zh: "明治神宮森林步道、表參道悠閒漫步與澀谷展望台夕陽"
    },
    tags: [
      { type: "city", text: "🏙️ Tokyo (東京)" },
      { type: "pace", en: "🧘 Relaxed", zh: "🧘 輕鬆悠閒" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Meiji Jingu Shrine (明治神宮)",
            zh: "明治神宮清晨森呼吸"
          },
          desc: {
            en: "A tranquil walk through 170 acres of evergreen sacred forest in the heart of Tokyo. Broad, flat gravel avenues make walking gentle and peaceful.",
            zh: "清晨漫步於佔地 70 公頃的莊嚴常綠森林，穿過巨型木造鳥居，享受城市核心難得的寧靜祥和。平坦路面適合長輩悠閒漫步。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> <strong>Bills Omotesando</strong> — Famous ricotta hotcakes and scrambled eggs in a stylish sunlit setting.",
            zh: "<strong>早餐：</strong> <strong>Bills 表參道</strong> — 品嚐被譽為「世界第一早餐」的蜂蜜香蕉熱班戟與滑蛋，環境優雅舒適。"
          },
          locations: [
            { lat: 35.6763, lng: 139.6993, label: { en: "Meiji Shrine", zh: "明治神宮" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Omotesando Boulevard (表參道) Architecture & Cafés",
            zh: "表參道林蔭大道與精品建築散策"
          },
          desc: {
            en: "Known as Tokyo's Champs-Élysées. Wide pavements, designer architectural marvels, and relaxed upscale tea houses.",
            zh: "有「東京香榭麗舍大道」之稱。寬闊的行人道兩旁種滿櫸樹，世界頂級建築師設計的大樓林立，可悠閒品茶享用甜點。"
          },
          meal: {
            icon: "🍰",
            en: "<strong>Afternoon Tea:</strong> <strong>Aoyama Flower Market Tea House</strong> — Organic herbal teas and delicate pastries surrounded by fresh greenhouse blooms.",
            zh: "<strong>下午茶：</strong> <strong>青山花茂花園茶室</strong> — 被綠植鮮花環繞的溫室茶座，享用時令花果茶與精緻法式甜品。"
          },
          locations: [
            { lat: 35.6653, lng: 139.7123, label: { en: "Omotesando", zh: "表參道" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Shibuya Crossing (澀谷十字路口) & Shibuya Sky Sunset",
            zh: "澀谷十字路口與 Shibuya Sky 屋頂落日"
          },
          desc: {
            en: "Ride the elevator to <strong>Shibuya Sky</strong> rooftop (229m). Watch the setting sun bathe Mt Fuji in amber light, then witness the famous scramble crossing illuminate below.",
            zh: "搭乘景觀升降機登上 229 米高的 <strong>Shibuya Sky</strong> 露天展望台。夕陽西下時遠眺染上金黃的富士山剪影，俯瞰腳下熙來攘往的十字路口夜景。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Tonkatsu Maisen Aoyama (邁泉豬排)</strong> — Legendary melt-in-the-mouth Kurobuta pork cutlet in a converted historic bathhouse.",
            zh: "<strong>晚餐：</strong> <strong>邁泉豬排 (Tonkatsu Maisen 青山本店)</strong> — 由歷史澡堂改建的招牌黑豚炸豬排，肉質酥嫩、入口即化。"
          },
          locations: [
            { lat: 35.6595, lng: 139.7005, label: { en: "Shibuya Sky", zh: "Shibuya Sky" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> Reserve sunset tickets for Shibuya Sky (approx. 16:00–16:30 in late December) 4 weeks in advance, as golden-hour slots sell out quickly.",
      zh: "<strong>💡 實用貼士：</strong> 12 月底東京日落約在 16:30，建議提前 4 週預訂 16:00–16:30 的 Shibuya Sky 門票，才能同時飽覽日落與夜景。"
    }
  },

  /* ════ DAY 4 ════ */
  {
    id: "day-4",
    dayNum: "04",
    date: "Dec 23",
    region: "tokyo",
    title: {
      en: "Imperial Palace East Gardens (皇居東御苑) & Nihombashi — Road Trip Prep",
      zh: "皇居東御苑散步、日本橋歷史美食街與自駕出發前夕"
    },
    tags: [
      { type: "city", text: "🏙️ Tokyo (東京)" },
      { type: "pace", en: "🧘 Relaxed", zh: "🧘 輕鬆悠閒" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Imperial Palace East Gardens (皇居東御苑)",
            zh: "皇居東御苑與二重橋"
          },
          desc: {
            en: "Walk through the historic Edo Castle ruins and manicured palace gardens. Flat, wide stone avenues provide easy, barrier-free walking with classic views of Nijubashi Bridge.",
            zh: "漫步於昔日江戶城遺址與皇居松柏庭園。平坦寬闊的石路極具無障礙便利，亦可前往外苑拍攝著名的地標<strong>二重橋</strong>。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> Morning set at a classic <strong>kissaten (喫茶店)</strong> near Tokyo Station — hot coffee with thick toasted milk bread.",
            zh: "<strong>早餐：</strong> 東京站周邊懷舊<strong>喫茶店</strong> — 香濃熱咖啡搭配厚切牛油多士與水煮蛋。"
          },
          locations: [
            { lat: 35.6852, lng: 139.7528, label: { en: "Imperial Palace Gardens", zh: "皇居東御苑" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Historic Nihombashi (日本橋) & Mitsukoshi Depachika",
            zh: "日本橋歷史商圈與三越百貨地下街"
          },
          desc: {
            en: "Browse Nihombashi Mitsukoshi, Japan's oldest department store. The gourmet basement food hall (depachika) offers seasonal winter pastries and traditional delicacies.",
            zh: "造訪日本首間百貨公司三越日本橋本店。地下奢華美食街匯聚了全日本頂級和菓子、時令烤物與日式熟食便當。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Kanda Matsuya (神田まつや)</strong> — 140-year-old traditional soba house serving delicate buckwheat noodles with crispy tempura.",
            zh: "<strong>午餐：</strong> <strong>神田まつや (Kanda Matsuya)</strong> — 百年老牌蕎麥麵館，現炸天婦羅配搭爽滑冰涼沾麵或熱湯蕎麥麵。"
          },
          locations: [
            { lat: 35.6865, lng: 139.7735, label: { en: "Nihombashi Mitsukoshi", zh: "日本橋三越" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Marunouchi Winter Illuminations & Road Trip Packing",
            zh: "丸之內林蔭香檳金燈飾與自駕行裝準備"
          },
          desc: {
            en: "Stroll along Marunouchi Naka-dori boulevard lit by hundreds of thousands of champagne gold LEDs. Return to hotel to pack overnight bags for tomorrow's road trip.",
            zh: "漫步於丸之內仲通，兩側數百棵櫸樹掛滿璀璨香檳金 LED 冬日彩燈。隨後返回酒店整理自駕行李，迎接明日啟程。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Tokyo Shiba Tofuya Ukai (東京芝豆腐屋)</strong> or charcoal yakitori in Marunouchi — exquisite garden dining.",
            zh: "<strong>晚餐：</strong> <strong>東京芝豆腐屋吉兆 / 鵜飼 (Ukai)</strong> — 位於鐵塔腳下日式庭園中的傳統豆腐與炭火燒烤料理。"
          },
          locations: [
            { lat: 35.6805, lng: 139.7633, label: { en: "Marunouchi Naka-dori", zh: "丸之內仲通" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> Pack a smaller overnight duffle bag with clothing and toiletries for the onsen ryokan nights. Large 75L suitcases can stay neatly stowed flat in the car boot.",
      zh: "<strong>💡 實用貼士：</strong> 今晚整理行李時，建議將 2 晚溫泉旅館所需的衣物和隨身用品分裝入隨身軟袋，兩件 75L 大行李箱可直接平放在車尾箱，上下車最為省力。"
    }
  },

  /* ════ DAY 5 ════ */
  {
    id: "day-5",
    dayNum: "05",
    date: "Dec 24",
    region: "fuji",
    title: {
      en: "Christmas Eve: Mt Fuji & Lake Kawaguchiko (河口湖) — Onsen Ryokan Stay",
      zh: "平安夜：自駕啟程前往富士山河口湖 — 湖畔溫泉旅館一泊二食"
    },
    tags: [
      { type: "city", text: "🗻 Lake Kawaguchiko (河口湖)" },
      { type: "transport", text: "🚗 Self-Drive (自駕)" },
      { type: "special", text: "🎄 Christmas Eve (平安夜)" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Collect Rental Car & Drive Chuo Expressway (中央自動車道)",
            zh: "領取自駕車輛並經中央高速公路啟程"
          },
          desc: {
            en: "Pick up your AWD Mid-size SUV or Prius E-Four (fitted with studless winter tyres and English GPS) in central Tokyo. Drive west along the Chuo Expressway towards Mt Fuji (~100 km, 2 hrs).",
            zh: "在東京市中心辦理取車手續（確認配備雪地無釘輪胎及英文 GPS）。沿中央高速公路西行前往富士山河口湖（約 100 公里，2 小時車程）。"
          },
          meal: {
            icon: "☕",
            en: "<strong>Highway Rest Stop:</strong> <strong>Dangozaka SA (談合坂服務區)</strong> — Grab fresh baked melon pan, steamed pork buns, and hot green tea.",
            zh: "<strong>休息站美食：</strong> <strong>談合坂 SA</strong> — 品嚐著名的現烤蜜瓜包、熱騰騰的甲州肉包及日本熱綠茶。"
          },
          locations: [
            { lat: 35.6900, lng: 139.7000, label: { en: "Tokyo Car Pickup", zh: "東京租車點" } },
            { lat: 35.6186, lng: 139.0433, label: { en: "Dangozaka SA", zh: "談合坂服務區" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Lake Kawaguchiko North Shore & Oishi Park (大石公園)",
            zh: "河口湖大石公園與富士山絕景步道"
          },
          desc: {
            en: "Drive along the northern lakeshore to Oishi Park. Enjoy completely unobstructed, postcard-perfect views of snow-capped Mt Fuji reflecting across the calm winter waters.",
            zh: "驅車前往河口湖北岸的大石公園。漫步於湖畔無障礙步道，欣賞壯麗巍峨的白雪富士山倒映在平靜湖面上的絕景。"
          },
          meal: {
            icon: "🍲",
            en: "<strong>Lunch:</strong> <strong>Hoto Fudo (ほうとう不動 河口湖北本店)</strong> — Iconic Yamanashi specialty: flat noodles simmered with pumpkin and mountain vegetables in a hot iron pot.",
            zh: "<strong>午餐：</strong> <strong>餺飥不動 (Hoto Fudo 湖北本店)</strong> — 山梨縣傳奇名物！在鑄鐵鍋中以南瓜和山野蔬菜滾熱慢煮的扁烏冬麵，暖身可口。"
          },
          locations: [
            { lat: 35.5230, lng: 138.7470, label: { en: "Oishi Park", zh: "大石公園" } },
            { lat: 35.5280, lng: 138.7610, label: { en: "Hoto Fudo", zh: "餺飥不動" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Check-in to Onsen Ryokan & Christmas Eve Kaiseki Banquet",
            zh: "入住湖畔溫泉旅館與平安夜會席料理"
          },
          desc: {
            en: "Check in by 16:00. Unwind in your private open-air hot spring bath (rotenburo) overlooking Mt Fuji, followed by a lavish multi-course Christmas Eve kaiseki dinner.",
            zh: "下午 16:00 前辦妥入住手續。享受眺望富士山的露天風呂溫泉，洗滌身心疲勞，隨後享用精緻豐富的平安夜懷石料理晚餐。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Christmas Eve Kaiseki Banquet</strong> — Multi-course banquet included with your ryokan stay featuring Koshu wagyu beef and seasonal delicacies.",
            zh: "<strong>晚餐：</strong> <strong>平安夜溫泉會席晚宴</strong> — 旅館一泊二食包含的頂級套餐，品嚐甲州和牛壽喜燒及富士名水豆腐刺身。"
          },
          locations: [
            { lat: 35.5100, lng: 138.7600, label: { en: "Kawaguchiko Ryokan", zh: "河口湖溫泉旅館" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> Expressways are well-cleared in winter, but mountain road temperatures drop below freezing by late afternoon. Arrive at your ryokan before dark.",
      zh: "<strong>💡 實用貼士：</strong> 高速公路除雪良好，但山區午後氣溫會降至冰點以下。建議於天黑前（16:30 前）抵達溫泉旅館辦妥入住。"
    }
  },

  /* ════ DAY 6 ════ */
  {
    id: "day-6",
    dayNum: "06",
    date: "Dec 25",
    region: "fuji",
    title: {
      en: "Christmas Day: Lake Kawaguchiko to Hakone (箱根) — Volcanic Valley & Pirate Cruise",
      zh: "聖誕節：箱根溫泉探索 — 蘆之湖海盜船與大涌谷火山谷地"
    },
    tags: [
      { type: "city", text: "♨️ Hakone (箱根)" },
      { type: "transport", text: "🚗 Self-Drive (自駕)" },
      { type: "special", text: "🎄 Christmas Day (聖誕節)" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Sunrise Over Mt Fuji & Scenic Drive to Hakone via Gotemba",
            zh: "湖畔富士晨曦與經御殿場前往箱根"
          },
          desc: {
            en: "Wake up to clear morning air and stunning sunrise views of Mt Fuji. Drive south via Gotemba and the Hakone mountain pass (~45 km, 1 hr).",
            zh: "清晨在房間或露天風呂欣賞晨曦中的富士山。隨後驅車南下，經御殿場前往箱根國立公園（約 45 公里，1 小時車程）。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Breakfast:</strong> Traditional Japanese ryokan breakfast featuring grilled local fish, steaming miso soup, and seasonal pickled vegetables.",
            zh: "<strong>早餐：</strong> 溫泉旅館傳統日式朝食 — 烤魚、溫泉玉子及熱騰騰的白米飯與味噌湯。"
          },
          locations: [
            { lat: 35.2329, lng: 139.1069, label: { en: "Hakone", zh: "箱根" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Owakudani Volcanic Valley (大涌谷) & Lake Ashi Pirate Cruise",
            zh: "大涌谷地熱谷火山黑玉子與蘆之湖海盜船"
          },
          desc: {
            en: "Ride the Hakone Ropeway over steaming volcanic vents to Owakudani. Taste famous black eggs (kuro-tamago) boiled in volcanic spring water (said to add 7 years to life). Board the Lake Ashi sightseeing pirate ship.",
            zh: "搭乘箱根空中纜車飛越地熱蒸氣騰騰的大涌谷，品嚐地熱溫泉煮熟的長壽黑玉子。隨後在桃源台登上海盜觀光船巡遊蘆之湖，全程皆設有無障礙通道。"
          },
          meal: {
            icon: "🥪",
            en: "<strong>Lunch:</strong> <strong>Bakery & Table Hakone</strong> — Waterfront bakery café at Moto-Hakone with panoramic Lake Ashi views and outdoor foot baths.",
            zh: "<strong>午餐：</strong> <strong>Bakery & Table 箱根</strong> — 蘆之湖畔著名烘焙餐廳，落地玻璃盡覽湖光山色，下層更設有邊吃麵包邊泡腳的足湯席。"
          },
          locations: [
            { lat: 35.2428, lng: 139.0203, label: { en: "Owakudani", zh: "大涌谷" } },
            { lat: 35.2045, lng: 139.0305, label: { en: "Lake Ashi", zh: "蘆之湖" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Hakone Onsen Ryokan Christmas Dinner & Forest Hot Springs",
            zh: "箱根頂級溫泉旅館聖誕盛宴與森林礦物風呂"
          },
          desc: {
            en: "Check into your luxury Hakone hot spring ryokan in Gora or Miyanoshita. Relax in mineral-rich thermal waters and celebrate Christmas night with an artisan kaiseki feast.",
            zh: "入住箱根強羅或宮之下溫泉旅館。在富含礦物質的天然溫泉中放鬆身心，慶祝聖誕之夜，享用主廚特製的節日懷石料理。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Christmas Night Ryokan Banquet</strong> — Multi-course banquet featuring fresh Sagami Bay sashimi and local mountain delicacies.",
            zh: "<strong>晚餐：</strong> <strong>聖誕夜溫泉盛宴</strong> — 享用相模灣直送海鮮刺身、特選和牛陶板燒及精緻節慶甜點。"
          },
          locations: [
            { lat: 35.2480, lng: 139.0480, label: { en: "Hakone Gora Ryokan", zh: "箱根強羅旅館" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> The Hakone Ropeway and Lake Ashi sightseeing cruise are barrier-free with elevator access. Parking lots at Togendai and Owakudani offer step-free access to terminals.",
      zh: "<strong>💡 實用貼士：</strong> 箱根纜車站與蘆之湖海盜船碼頭均設有無障礙升降機與平路斜道，非常適合長輩同行。"
    }
  },

  /* ════ DAY 7 ════ */
  {
    id: "day-7",
    dayNum: "07",
    date: "Dec 26",
    region: "fuji",
    title: {
      en: "Boxing Day: Hakone to Atami (熱海) & Coastal Izu — Ocean View Onsen",
      zh: "節禮日：沿海自駕前往熱海 — 來宮神社千年巨楠與相模灣海景溫泉"
    },
    tags: [
      { type: "city", text: "🌊 Atami & Izu Coast (熱海與伊豆海岸)" },
      { type: "transport", text: "🚗 Self-Drive (自駕)" },
      { type: "special", text: "🎁 Boxing Day (節禮日)" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Scenic Downhill Drive via Izu Skyline to Atami Bay",
            zh: "沿伊豆景觀公路順坡下行俯瞰相模灣"
          },
          desc: {
            en: "Leisurely breakfast in Hakone. Drive down the scenic ridge road to Atami on Sagami Bay (~35 km, 50 mins). The coastal climate is noticeably milder with blue ocean vistas.",
            zh: "在箱根享用悠閒早餐後，驅車沿伊豆天際線下行，直達相模灣畔的熱海（約 35 公里，50 分鐘車程）。沿海氣候溫和舒適，沿途飽覽蔚藍海岸景色。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> Ryokan breakfast in Hakone with local onsen eggs and hot tofu broth.",
            zh: "<strong>早餐：</strong> 箱根旅館日式清晨料理配溫泉玉子與熱湯豆腐。"
          },
          locations: [
            { lat: 35.0963, lng: 139.0716, label: { en: "Atami", zh: "熱海" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Kinomiya Shrine (來宮神社) & MOA Museum of Art",
            zh: "來宮神社 2,000 年大楠神木與 MOA 美術館"
          },
          desc: {
            en: "Visit Kinomiya Shrine to see the sacred 2,000-year-old camphor tree (Okusu). The shrine has dedicated elevator access for seniors. Then visit MOA Museum of Art for its spectacular escalator tunnel and ocean-view tea gardens.",
            zh: "參拜來宮神社，朝聖樹齡逾 2,000 年的日本第二大巨楠神木。神社貼心設有長輩專用升降機直達神木觀景台。隨後造訪 MOA 美術館，體驗著名的萬花筒光影長廊與俯瞰大海的日式庭園。"
          },
          meal: {
            icon: "🍣",
            en: "<strong>Lunch:</strong> <strong>Atami Fish Market Diner (熱海市海鮮定食)</strong> — Pristine Pacific sashimi bowl and crispy golden fried horse mackerel (aji fry).",
            zh: "<strong>午餐：</strong> <strong>熱海海鮮定食</strong> — 品嚐當地漁港直送的鮮甜海鮮丼與酥脆現炸竹筴魚。"
          },
          locations: [
            { lat: 35.1001, lng: 139.0667, label: { en: "Kinomiya Shrine", zh: "來宮神社" } },
            { lat: 35.1090, lng: 139.0740, label: { en: "MOA Museum of Art", zh: "MOA 美術館" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Atami Coastal Hot Spring Hotel & Pacific Seafood Feast",
            zh: "入住熱海海景溫泉酒店與相模灣活海鮮晚宴"
          },
          desc: {
            en: "Check into your coastal onsen hotel overlooking Sagami Bay. Soak in mineral hot spring waters with ocean breezes, and enjoy an authentic Pacific seafood kaiseki dinner.",
            zh: "入住俯瞰相模灣的頂級海景溫泉酒店。一邊泡湯一邊聆聽海浪聲音，晚上享用包含伊勢龍蝦或鮑魚的豪華海鮮會席晚宴。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Seaside Kaiseki Feast</strong> — Featuring freshly caught local seafood, simmered sea bream, and sashimi boat.",
            zh: "<strong>晚餐：</strong> <strong>海景會席料理</strong> — 享用熱海漁港特產金目鯛姿煮、豪華刺身盛合及時令鮮魚天婦羅。"
          },
          locations: [
            { lat: 35.0960, lng: 139.0750, label: { en: "Atami Onsen Hotel", zh: "熱海溫泉酒店" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> Kinomiya Shrine is one of Japan's most barrier-free historical shrines, equipped with elevators and flat wooden walkways for senior visitors.",
      zh: "<strong>💡 實用貼士：</strong> 來宮神社為日本少數設有無障礙升降機的神社之一，全區設有木棧平道，長輩能無負擔近距離參觀 2,000 年神木。"
    }
  },

  /* ════ DAY 8 ════ */
  {
    id: "day-8",
    dayNum: "08",
    date: "Dec 27",
    region: "coastal",
    title: {
      en: "Atami to Kamakura (鎌倉), Enoshima & Yokohama — Coastal Drive & Great Buddha",
      zh: "湘南沿海自駕 — 鎌倉大佛平路參觀、江之島海岸線與橫濱港灣"
    },
    tags: [
      { type: "city", text: "⛩️ Kamakura & Yokohama (鎌倉與橫濱)" },
      { type: "transport", text: "🚗 Self-Drive (自駕)" },
      { type: "pace", en: "⚖️ Balanced", zh: "⚖️ 步調適中" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Scenic Coastal Drive along Route 134 past Enoshima (江之島)",
            zh: "湘南海岸線國道 134 號觀海自駕"
          },
          desc: {
            en: "Drive northeast from Atami along the Seisho Bypass and Route 134 (~60 km, 1.5 hrs). Enjoy glittering ocean views of Sagami Bay with Mt Fuji occasionally visible across the water.",
            zh: "沿西湘繞道及著名的國道 134 號海岸公路北上（約 60 公里，1.5 小時）。右側是一望無際的蔚藍相模灣，途經著名景點江之島。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> Coastal hotel breakfast overlooking Sagami Bay sunrise.",
            zh: "<strong>早餐：</strong> 酒店海景餐廳享用日西合璧朝食。"
          },
          locations: [
            { lat: 35.3013, lng: 139.4800, label: { en: "Enoshima Coast", zh: "江之島海岸" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Kotoku-in Great Buddha (鎌倉大佛) & Hasedera (長谷寺)",
            zh: "高德院鎌倉大佛與長谷寺"
          },
          desc: {
            en: "Visit the iconic 11-metre bronze outdoor statue of Amida Buddha at Kotoku-in. The courtyard approach is completely flat and wheelchair-accessible. Stroll down charming Hase shopping lanes.",
            zh: "參拜建於 1252 年的高德院國寶青銅鎌倉大佛。庭園完全平坦，無任何台階即可近距離仰望莊嚴大佛。隨後可逛長谷寺老街。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Kamakura Matsubara-an (鎌倉 松原庵)</strong> — Renowned soba noodles and crisp vegetable tempura in a restored traditional wooden residence.",
            zh: "<strong>午餐：</strong> <strong>鎌倉 松原庵</strong> — 古色古香的日式木造古民家蕎麥麵館，手打蕎麥麵與現炸時令天婦羅口碑極佳。"
          },
          locations: [
            { lat: 35.3167, lng: 139.5361, label: { en: "Kamakura Great Buddha", zh: "鎌倉大佛" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Drive to Yokohama Minato Mirai (橫濱港未來) & Red Brick Warehouse",
            zh: "抵達橫濱港未來與紅磚倉庫聖誕市集夜景"
          },
          desc: {
            en: "Drive 30 mins to Yokohama Minato Mirai and check into your bay-view hotel. Take a gentle evening stroll past the illuminated Yokohama Red Brick Warehouse waterfront.",
            zh: "驅車 30 分鐘抵達橫濱港未來，入住海灣景觀酒店。傍晚散步至著名的紅磚倉庫，欣賞港灣浪漫摩天輪與冬日彩燈。"
          },
          meal: {
            icon: "🥟",
            en: "<strong>Dinner:</strong> <strong>Yokohama Chinatown (橫濱中華街)</strong> — Enjoy comforting dim sum, soup dumplings (xiao long bao), and Cantonese roast duck.",
            zh: "<strong>晚餐：</strong> <strong>橫濱中華街著名老店</strong> — 享用暖胃點心、招牌小籠包及正宗粵式燒味料理。"
          },
          locations: [
            { lat: 35.4533, lng: 139.6380, label: { en: "Yokohama Minato Mirai", zh: "橫濱港未來" } },
            { lat: 35.4428, lng: 139.6450, label: { en: "Yokohama Chinatown", zh: "橫濱中華街" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> Kotoku-in (Great Buddha) has flat, paved gravel access with zero stairs required, making it one of the easiest cultural sites in Japan for seniors.",
      zh: "<strong>💡 實用貼士：</strong> 鎌倉高德院大佛庭院地面極為平坦寬闊，完全無須攀爬台階，長輩參觀輕鬆愜意。"
    }
  },

  /* ════ DAY 9 ════ */
  {
    id: "day-9",
    dayNum: "09",
    date: "Dec 28",
    region: "coastal",
    title: {
      en: "Yokohama Exploration & Car Return — Train Return to Tokyo Base",
      zh: "橫濱紅磚倉庫與中華街、零附加費交還車輛及鐵路返回東京"
    },
    tags: [
      { type: "city", text: "🏙️ Yokohama → Tokyo (橫濱 → 東京)" },
      { type: "transport", text: "🚗 Return Car & JR Train (還車及鐵路)" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Cup Noodles Museum (合味道紀念館) & Yamashita Park",
            zh: "合味道紀念館與山下公園海濱散步"
          },
          desc: {
            en: "Visit the interactive Cup Noodles Museum to design custom noodle cups with your own ingredients. Then stroll through Yamashita Park looking out at cargo ships across Tokyo Bay.",
            zh: "參觀合味道紀念館，親手繪製杯麵並挑選專屬湯頭配料。隨後在海傍的山下公園散步，遠眺停泊於東京灣的歷史郵輪。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> Waterfront hotel breakfast in Yokohama overlooking the harbour.",
            zh: "<strong>早餐：</strong> 橫濱酒店海灣景觀餐廳早餐。"
          },
          locations: [
            { lat: 35.4554, lng: 139.6389, label: { en: "Cup Noodles Museum", zh: "合味道紀念館" } },
            { lat: 35.4450, lng: 139.6500, label: { en: "Yamashita Park", zh: "山下公園" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Return Rental Car (Zero Drop-Off Fee!) & JR Train to Tokyo",
            zh: "歸還自駕車輛（零異地還車費！）並乘 JR 返回東京"
          },
          desc: {
            en: "Return the car at the Yokohama depot (or Tokyo depot) with <strong>¥0 one-way penalty fee</strong>! Board a comfortable 30-min JR Tokaido Line rapid train straight into central Tokyo and check in for your final 3 nights.",
            zh: "在橫濱分店（或東京分店）交還車輛，<strong>免收任何異地還車附加費</strong>！隨後攜帶行李乘搭舒適的 JR 東海道線快速列車（30 分鐘直達）返回東京市區酒店，展開最後 3 晚深度遊。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Dim Sum Banquet</strong> in Yokohama Chinatown before returning the car.",
            zh: "<strong>午餐：</strong> 還車前於橫濱中華街享用點心午餐。"
          },
          locations: [
            { lat: 35.4660, lng: 139.6226, label: { en: "Yokohama Station", zh: "橫濱車站" } },
            { lat: 35.6812, lng: 139.7671, label: { en: "Tokyo Station", zh: "東京車站" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Check into Central Tokyo Hotel & Relaxing Sukiyaki Dinner",
            zh: "入住東京市區核心酒店與暖心壽喜燒料理"
          },
          desc: {
            en: "Check in and unpack at your central Tokyo hotel base. Celebrate the completed road loop with a warming sukiyaki beef hotpot dinner.",
            zh: "在東京市區酒店安頓好行李。慶祝圓滿順利的富士山與伊豆半島自駕之旅，晚上享用熱氣騰騰的頂級和牛壽喜燒。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Ningyocho Imahan (人形町今半)</strong> — Tokyo's premier historic sukiyaki institution featuring melt-in-the-mouth Kuroge Wagyu beef.",
            zh: "<strong>晚餐：</strong> <strong>人形町今半 (Ningyocho Imahan)</strong> — 創立於明治 28 年的日本壽喜燒第一名店，油花如雪的特選黑毛和牛配特製甘甜醬汁。"
          },
          locations: [
            { lat: 35.6858, lng: 139.7820, label: { en: "Ningyocho Imahan", zh: "人形町今半" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> Returning the car in Yokohama/Tokyo saves ¥15,000–20,000 in one-way fees. All major JR stations between Yokohama and Tokyo have level elevators for luggage.",
      zh: "<strong>💡 實用貼士：</strong> 在首都圈歸還車輛可節省高達 ¥15,000–20,000 異地還車手續費。橫濱至東京間之 JR 車站全程設有大型升降機，搬運行李輕鬆順暢。"
    }
  },

  /* ════ DAY 10 ════ */
  {
    id: "day-10",
    dayNum: "10",
    date: "Dec 29",
    region: "tokyo",
    title: {
      en: "Tokyo Year-End Atmosphere — Nihombashi Mitsukoshi Depachika & Roppongi Illuminations",
      zh: "東京歲末氣氛 — 日本橋三越百貨美食街與六本木冬日彩燈"
    },
    tags: [
      { type: "city", text: "🏙️ Tokyo (東京)" },
      { type: "pace", en: "🧘 Relaxed", zh: "🧘 輕鬆悠閒" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Tokyo Station Marunouchi Brick Facade & Front Plaza",
            zh: "東京車站丸之內紅磚建築與外苑漫步"
          },
          desc: {
            en: "Admire the magnificent 1914 red-brick Tokyo Station building. Stroll the pedestrianized Gyoko-dori avenue in crisp winter sunshine.",
            zh: "欣賞 1914 年建成的宏偉文藝復興式紅磚東京站舍。在冬日晴空下漫步於開闊平坦的行宮大道，拍攝經典城市風光。"
          },
          meal: {
            icon: "☕",
            en: "<strong>Breakfast:</strong> <strong>Sarabeth's Tokyo</strong> (Tokyo Station) — Fluffy French toast and eggs benedict, or traditional morning bakery.",
            zh: "<strong>早餐：</strong> <strong>Sarabeth's 東京店</strong> — 享用鬆軟的法式吐司與班尼迪克蛋。"
          },
          locations: [
            { lat: 35.6812, lng: 139.7671, label: { en: "Tokyo Station", zh: "東京車站" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Nihombashi Mitsukoshi (日本橋三越) & Takashimaya Holiday Food Halls",
            zh: "日本橋百貨地下街品嚐歲末節慶點心"
          },
          desc: {
            en: "Explore the legendary basement food halls (depachika) bustling with holiday preparations. Sample seasonal roasted chestnuts, strawberry daifuku, and gourmet tea.",
            zh: "探訪全東京最負盛名的百貨地下街。欣賞新年傳統年節禮盒 (Osechi)，品嚐即烤栗子、士多啤梨大福及產地直送日式焙茶。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Lunch:</strong> <strong>Nodaiwa (野田岩)</strong> (Nihombashi / Ginza) — Historic Michelin-starred grilled eel over steamed rice in lacquered boxes.",
            zh: "<strong>午餐：</strong> <strong>野田岩 (Nodaiwa)</strong> — 米芝蓮名店，傳承五代的炭火烤野生鰻魚飯，醬汁醇厚焦香。"
          },
          locations: [
            { lat: 35.6865, lng: 139.7735, label: { en: "Nihombashi Mitsukoshi", zh: "日本橋三越" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Roppongi Hills & Tokyo Midtown Winter Illuminations",
            zh: "六本木之丘與東京 Midtown 夢幻藍白雪景燈飾"
          },
          desc: {
            en: "Wander Keyakizaka street in Roppongi, adorned with 800,000 sparkling blue and white LEDs framing Tokyo Tower in the distance. Stroll through Tokyo Midtown's outdoor ice rink and light installations.",
            zh: "漫步於六本木櫸坂通，80 萬顆閃爍的冷白與冰藍色 LED 彩燈將整條林蔭道點綴如夢似幻，遠方橘紅色的東京鐵塔映襯其中，是東京最美冬季風景。"
          },
          meal: {
            icon: "🍲",
            en: "<strong>Dinner:</strong> <strong>Roppongi Inakaya (田舍家)</strong> — Authentic theatrical Robatayaki (food served across the grill on long wooden paddles).",
            zh: "<strong>晚餐：</strong> <strong>六本木爐端燒 (Robatayaki)</strong> 或精緻天婦羅定食，師傅用長木槳將現烤海鮮送到席前。"
          },
          locations: [
            { lat: 35.6605, lng: 139.7292, label: { en: "Roppongi Hills", zh: "六本木之丘" } },
            { lat: 35.6660, lng: 139.7310, label: { en: "Tokyo Midtown", zh: "東京 Midtown" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> Department store depachikas in Nihombashi are fully wheelchair and senior accessible with wide aisles and spacious elevators.",
      zh: "<strong>💡 實用貼士：</strong> 日本橋主要百貨公司無障礙設施極為齊備，地下美食街設有多部大型升降機直達，長輩逛街非常輕鬆舒服。"
    }
  },

  /* ════ DAY 11 ════ */
  {
    id: "day-11",
    dayNum: "11",
    date: "Dec 30",
    region: "tokyo",
    title: {
      en: "Traditional Year-End Culture — Ueno Park & Ameyoko Market New Year Bustle",
      zh: "傳統歲末盛會 — 上野公園悠閒漫步與阿美橫丁年宵市集熱鬧體驗"
    },
    tags: [
      { type: "city", text: "🏙️ Tokyo (東京)" },
      { type: "pace", en: "⚖️ Balanced", zh: "⚖️ 步調適中" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Ueno Park (上野恩賜公園) & Tokyo National Museum Gardens",
            zh: "上野公園清晨散步與文化殿堂"
          },
          desc: {
            en: "A relaxing stroll through spacious Ueno Park. Visit Shinobazu Pond with its scenic winter reed beds and pagoda views. Level paths ensure gentle walking.",
            zh: "在寬敞平坦的上野恩賜公園漫步，欣賞不忍池冬日蓮塘風光與五重塔景致，吸收清新空氣。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> Park café brunch at <strong>Ueno Seiyoken</strong>, a historic Western restaurant opened in 1872.",
            zh: "<strong>早餐：</strong> <strong>上野精養軒</strong> — 創立於 1872 年的歷史西餐廳，俯瞰公園林蔭景致享用悠閒早餐。"
          },
          locations: [
            { lat: 35.7140, lng: 139.7740, label: { en: "Ueno Park", zh: "上野公園" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Ameyoko Market (アメ橫) Festive Year-End Market",
            zh: "阿美橫丁體驗日本年宵市場熱鬧氛圍"
          },
          desc: {
            en: "Experience the vibrant buzz of Ameyoko as Tokyo locals stock up on traditional New Year foods (crab, tuna, dried fruit, mochi). The energetic cries of vendors make for an authentic Japanese cultural experience.",
            zh: "感受一年中最熱鬧的阿美橫丁年宵市集！當地居民紛紛採購新年食材（雪蟹腳、魚子、乾果年糕）。攤販充滿活力的叫賣聲洋溢著濃郁的節慶氣氛。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch:</strong> <strong>Kanda Matsuya (神田まつや)</strong> — Hot duck soba (kamo-nanban) or tendon tempura rice bowl.",
            zh: "<strong>午餐：</strong> <strong>神田鴨南蠻蕎麥麵</strong> — 暖笠笠的熱湯配上鮮美鴨肉與大蔥，暖心又滋味。"
          },
          locations: [
            { lat: 35.7100, lng: 139.7745, label: { en: "Ameyoko Market", zh: "阿美橫丁" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Farewell Celebration Dinner — Premium Wagyu Beef Teppanyaki",
            zh: "歲末圓滿慶祝盛宴 — 頂級黑毛和牛鐵板燒"
          },
          desc: {
            en: "Celebrate your final evening in Tokyo with an unforgettable culinary feast. Master chefs prepare A5 Kuroge Wagyu, fresh seafood, and garlic rice right before your eyes.",
            zh: "在東京度過旅程最後一個夜晚，以一頓豐盛頂級的 A5 黑毛和牛鐵板燒犒賞全家，主廚現場煎烤和牛與極品龍蝦，慶祝旅途圓滿。"
          },
          meal: {
            icon: "🍱",
            en: "<strong>Dinner:</strong> <strong>Teppanyaki Ukai-tei (銀座 うかい亭)</strong> or <strong>Mon Cher Ton Ton (赤坂)</strong> — Premier celebratory teppanyaki.",
            zh: "<strong>晚餐：</strong> <strong>銀座 Ukai-tei (うかい亭)</strong> — 米芝蓮推薦鐵板燒殿堂，在優雅歐日古董氛圍中品嚐入口即化的極品和牛。"
          },
          locations: [
            { lat: 35.6690, lng: 139.7670, label: { en: "Ginza Ukai-tei", zh: "銀座 Ukai-tei" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> Dec 30 is the peak day for New Year shopping. Keep personal belongings secure in the crowds at Ameyoko, or enjoy the atmosphere from the perimeter.",
      zh: "<strong>💡 實用貼士：</strong> 12 月 30 日阿美橫丁人潮最為鼎盛，可悠閒漫步外圍感受氣氛，並注意保管好隨身隨身物品。"
    }
  },

  /* ════ DAY 12 ════ */
  {
    id: "day-12",
    dayNum: "12",
    date: "Dec 31",
    region: "tokyo",
    title: {
      en: "New Year's Eve: Tokyo Departure — Direct Transit to Haneda / Narita",
      zh: "除夕跨年日：東京告別出發 — 直達羽田/成田機場乘機返程"
    },
    tags: [
      { type: "city", text: "✈️ Tokyo → Airport (東京 → 機場)" },
      { type: "transport", text: "✈️ Flight (航班)" },
      { type: "special", text: "🎆 NYE (除夕大晦日)" }
    ],
    blocks: [
      {
        time: { en: "🌅 Morning", zh: "🌅 早上" },
        activity: {
          title: {
            en: "Leisurely Hotel Breakfast & Final Packing",
            zh: "悠閒早餐、整理行李與最後採購"
          },
          desc: {
            en: "Enjoy a relaxed breakfast, pack suitcases, and pick up last-minute tax-free souvenirs and Japanese confections near the hotel.",
            zh: "享用酒店豐盛早餐，從容收拾 6 件行李，在酒店附近選購最後的免稅伴手禮與精緻和菓子。"
          },
          meal: {
            icon: "🍳",
            en: "<strong>Breakfast:</strong> Hotel buffet with both Western and Japanese morning dishes.",
            zh: "<strong>早餐：</strong> 酒店自助早餐，享用熱咖啡與日式精緻小菜。"
          },
          locations: [
            { lat: 35.6812, lng: 139.7671, label: { en: "Central Tokyo Hotel", zh: "東京酒店" } }
          ]
        }
      },
      {
        time: { en: "🌤️ Afternoon", zh: "🌤️ 下午" },
        activity: {
          title: {
            en: "Smooth Airport Transit (Haneda 25 mins / Narita 55 mins)",
            zh: "輕鬆直達機場（羽田 25 分鐘 / 成田 55 分鐘）"
          },
          desc: {
            en: "For Haneda (HND): Direct 25-min taxi or Keikyu / Monorail line. For Narita (NRT): Reserved-seat Narita Express (N'EX) with dedicated luggage racks. Arrive 3 hours before departure.",
            zh: "前往羽田機場 (HND)：直接乘搭 25 分鐘的士或京急線；前往成田機場 (NRT)：搭乘全對號坐席之成田特快 (N'EX)，車廂設有專屬大件行李架。於航班起飛前 3 小時抵達機場。"
          },
          meal: {
            icon: "🍜",
            en: "<strong>Lunch / Pre-flight meal:</strong> Airport dining: hot ramen at Rokurinsha or fresh sushi at the international departure lounge.",
            zh: "<strong>午餐 / 候機餐點：</strong> 機場航廈品嚐六厘舍沾麵或登機大堂的現做壽司。"
          },
          locations: [
            { lat: 35.5494, lng: 139.7798, label: { en: "Haneda Airport", zh: "羽田機場" } },
            { lat: 35.7720, lng: 140.3929, label: { en: "Narita Airport", zh: "成田機場" } }
          ]
        }
      },
      {
        time: { en: "🌆 Evening", zh: "🌆 晚上" },
        activity: {
          title: {
            en: "Departure Flight — Fly Home to UK / Hong Kong! ✈️",
            zh: "啟程返航 — 滿載美好回憶告別日本！✈️"
          },
          desc: {
            en: "Clear tax-free customs using your Visit Japan Web / passport, complete boarding, and take off. Reflect on 12 unforgettable winter days across Tokyo, Mt Fuji, and the scenic coast!",
            zh: "順利辦理登機與免稅品出境手續。在萬家燈火的璀璨夜色中起飛，回味 12 天東京、富士山、溫泉與海岸的難忘冬日回憶！よい旅を！"
          },
          meal: {
            icon: "✈️",
            en: "<strong>Flight Dinner:</strong> In-flight service on British Airways / Cathay Pacific.",
            zh: "<strong>晚餐：</strong> 航班機上精緻餐飲服務。"
          },
          locations: [
            { lat: 35.5494, lng: 139.7798, label: { en: "International Departure", zh: "國際線出發" } }
          ]
        }
      }
    ],
    tip: {
      en: "<strong>💡 Tip:</strong> Plan B enables round-trip flights in and out of Tokyo (HND/NRT), avoiding multi-city transit through Osaka and allowing direct flights back to the UK.",
      zh: "<strong>💡 實用貼士：</strong> 方案 B 實現東京 (HND/NRT) 原地往返，無需拖著行李橫跨關西，更可享受英國航空直飛往返倫敦或轉機愛丁堡。"
    }
  }
];

/* ─── Export Logic ─── */
const currentPlan = (typeof localStorage !== 'undefined' && localStorage.getItem('user-plan') === 'plan-b') ? 'plan-b' : 'plan-a';
const ITINERARY_DATA = currentPlan === 'plan-b' ? ITINERARY_DATA_B : ITINERARY_DATA_A;

if (typeof window !== 'undefined') {
  window.ITINERARY_DATA_A = ITINERARY_DATA_A;
  window.ITINERARY_DATA_B = ITINERARY_DATA_B;
  window.ITINERARY_DATA = ITINERARY_DATA;
}
