/**
 * @file itinerary-data.js
 * @description DATA SOURCE — the finalised 7-day Japan Winter Journey 2026 schedule (25–31 Dec 2026).
 * Sets window.ITINERARY_DATA, an array of day objects consumed by renderItinerary() in js/features/itinerary.js.
 *
 * STRUCTURE OF window.ITINERARY_DATA  (array of 7 day objects):
 *
 *   Each day object:
 *   {
 *     id:        string  — HTML element id, e.g. "day-1". Used for anchor links.
 *     dayNum:    string  — Zero-padded display number, e.g. "01".
 *     date:      string  — Short date label, e.g. "Dec 25".
 *     region:    string  — Filter category: "tokyo" | "fuji".
 *                          Must match a .day-tab[data-region] value in index.html.
 *     title:     { en, zh }   — Full day title shown in the accordion header.
 *     weather?:  Weather      — Seasonal forecast chip { icon, high, low, condition: { en, zh } }
 *     tags:      Tag[]        — Chip badges shown in the header. See Tag types below.
 *     blocks:    Block[]      — Time slots (morning / afternoon / evening).
 *     tip?:      { en, zh }   — Optional pro-tip shown at the bottom of the day body.
 *   }
 *
 *   Tag types:
 *     { type:"city",      text }                 — Location badge (always bilingual in text)
 *     { type:"transport", text }                 — Transit badge (e.g. "🚗 Self-Drive")
 *     { type:"pace",      en, zh }               — Pace badge (e.g. Relaxed / 輕鬆悠閒)
 *     { type:"special",   text }                 — Single-language special badge
 *     { type:"special",   en, zh }               — Bilingual special badge
 *
 *   Block structure:
 *   {
 *     time:     { en, zh }   — Period label: e.g. "🌅 Morning" / "🌅 早上"
 *     activity: {
 *       title:  { en, zh }
 *       desc:   { en, zh }
 *       meal?:  { icon, en, zh }  — Optional restaurant / meal recommendation
 *       options?: [{ label:{en,zh}, places:[{ name:{en,zh}, desc:{en,zh} }] }]
 *                                  — Optional "pick one" choices. Rendered as a toggle bar
 *                                    (selectActivityOption) so the choice can be made on the page.
 *       locations?: [{ lat, lng, label:{en,zh} }]  — Pins for the day mini-map
 *     }
 *   }
 *
 * REGIONS MAP:
 *   "tokyo"  → Days 1–2, 5–7  (Tokyo city)
 *   "fuji"   → Days 3–4       (Mt Fuji, Hakone & Odawara self-drive, 27–28 Dec)
 *
 * TO EDIT AN ACTIVITY: find the day by id and edit the relevant block directly — no other
 *   files need to change.
 * TO CHANGE REGION FILTERS: update the `region` field here AND the .day-tab buttons in index.html.
 */

const ITINERARY_DATA = [
  {
    "id": "day-1",
    "dayNum": "01",
    "date": "Dec 25",
    "region": "tokyo",
    "weather": {
      "icon": "☀️",
      "high": "12°C",
      "low": "4°C",
      "condition": {
        "en": "Sunny & Crisp",
        "zh": "晴朗乾燥"
      }
    },
    "title": {
      "en": "Arrival in Tokyo (東京) — Asakusa (淺草) & Skytree (晴空塔)",
      "zh": "抵達東京 — 淺草寺參拜與登晴空塔賞夜景"
    },
    "tags": [
      {
        "type": "city",
        "text": "🏙️ Tokyo (東京)"
      },
      {
        "type": "pace",
        "en": "🧘 Relaxed",
        "zh": "🧘 輕鬆悠閒"
      }
    ],
    "blocks": [
      {
        "time": {
          "en": "🌅 Morning",
          "zh": "🌅 早上"
        },
        "activity": {
          "title": {
            "en": "Arrive at Narita (成田) / Haneda (羽田) & Drop Bags at the Hotel",
            "zh": "抵達成田 / 羽田機場並寄存行李至酒店"
          },
          "desc": {
            "en": "Clear customs, pick up your <strong>Suica card</strong> (or use a digital Suica) and take the Narita Express or Keikyu line to <strong>Villa Fontaine Tokyo Nihombashi Mitsukoshimae (ヴィラフォンテーヌ東京日本橋三越前)</strong>. Drop your bags and rest after the flight — check the standard check-in time in your booking confirmation.",
            "zh": "辦理入境手續，領取 <strong>Suica 卡</strong>（或使用數碼 Suica），乘搭成田特快或京急線前往 <strong>ヴィラフォンテーヌ東京日本橋三越前 (Villa Fontaine Tokyo Nihombashi Mitsukoshimae)</strong>。先寄存行李並稍作休息，辦理入住的時間請參考訂房確認電郵。"
          },
          "meal": {
            "icon": "🍳",
            "en": "<strong>Breakfast / Brunch:</strong> Grab a quick meal at a <strong>konbini (便利店)</strong> (7-Eleven onigiri, sandwiches, and hot coffee) — delicious, fresh, and convenient.",
            "zh": "<strong>早餐 / 早午餐：</strong> 在機場或酒店附近的<strong>便利店 (Konbini)</strong> 買點輕食（7-Eleven 飯糰、三文治和熱咖啡）—— 方便快捷又美味。"
          },
          "locations": [
            {
              "lat": 35.772,
              "lng": 140.3929,
              "label": {
                "en": "Narita Airport",
                "zh": "成田機場"
              }
            },
            {
              "lat": 35.5494,
              "lng": 139.7798,
              "label": {
                "en": "Haneda Airport",
                "zh": "羽田機場"
              }
            },
            {
              "lat": 35.6866,
              "lng": 139.7735,
              "label": {
                "en": "Villa Fontaine Tokyo Nihombashi Mitsukoshimae",
                "zh": "ヴィラフォンテーヌ東京日本橋三越前"
              }
            }
          ]
        }
      },
      {
        "time": {
          "en": "🌤️ Afternoon",
          "zh": "🌤️ 下午"
        },
        "activity": {
          "title": {
            "en": "Senso-ji Temple (淺草寺) & Nakamise-dori (仲見世通)",
            "zh": "淺草寺與仲見世通"
          },
          "desc": {
            "en": "Tokyo's oldest temple. Walk through the iconic <strong>Kaminarimon (雷門 / Thunder Gate)</strong> and browse the traditional shopping street. Flat paved grounds allow comfortable walking.",
            "zh": "參訪東京最古老的寺廟。穿過寫有巨型紅燈籠的<strong>雷門</strong>，沿著<strong>仲見世通</strong>傳統商店街漫步，品嚐現烤人形燒，地面平整好走。"
          },
          "meal": {
            "icon": "🍡",
            "en": "<strong>Street Snack:</strong> Freshly baked Ningyo-yaki (doll cakes with red bean paste) and warm matcha tea along Nakamise-dori.",
            "zh": "<strong>街頭小食：</strong> 仲見世通現烤熱騰騰的人形燒（紅豆餡）配上一杯溫暖的綠茶。"
          },
          "locations": [
            {
              "lat": 35.7147,
              "lng": 139.7967,
              "label": {
                "en": "Senso-ji Temple",
                "zh": "淺草寺"
              }
            },
            {
              "lat": 35.7118,
              "lng": 139.7963,
              "label": {
                "en": "Kaminarimon Gate",
                "zh": "雷門"
              }
            }
          ]
        }
      },
      {
        "time": {
          "en": "🌆 Evening",
          "zh": "🌆 晚上"
        },
        "activity": {
          "title": {
            "en": "Tokyo Skytree (東京晴空塔) & Solamachi Dinner",
            "zh": "晴空塔俯瞰東京夜景與 Solamachi 晚餐"
          },
          "desc": {
            "en": "Ascend to the observation deck (350 m) for sweeping panoramic night views of the Tokyo metropolis. High-speed elevators are completely barrier-free. Browse Tokyo Solamachi at the base for crafts and dining.",
            "zh": "乘搭高速升降機直達 350 米展望台，俯瞰璀璨如銀河的東京無敵夜景。全館無障礙設施完善，基座的晴空街道商場美食眾多。"
          },
          "meal": {
            "icon": "🍱",
            "en": "<strong>Dinner:</strong> <strong>Toriton (トリトン)</strong> at Solamachi 6F — Renowned Hokkaido conveyor belt sushi, fresh and senior-friendly with booth seating.",
            "zh": "<strong>晚餐：</strong> 晴空街道 6 樓 <strong>迴轉壽司 根室花丸 / Toriton (トリトン)</strong> — 來自北海道的新鮮刺身壽司，座位寬敞舒適。"
          },
          "locations": [
            {
              "lat": 35.71,
              "lng": 139.8107,
              "label": {
                "en": "Tokyo Skytree",
                "zh": "東京晴空塔"
              }
            },
            {
              "lat": 35.7106,
              "lng": 139.8125,
              "label": {
                "en": "Tokyo Solamachi",
                "zh": "晴空街道購物中心"
              }
            }
          ]
        }
      }
    ],
    "tip": {
      "en": "<strong>💡 Tip:</strong> Add a digital Welcome Suica to Apple Wallet before landing for tap-and-go metro transit without waiting at airport ticket machines.",
      "zh": "<strong>💡 實用貼士：</strong> 出發前可在 iPhone 錢包內直接新增數碼 Suica 卡，入境後即可直接拍卡乘車，免除在機場排隊購票的等候時間。"
    }
  },
  {
    "id": "day-2",
    "dayNum": "02",
    "date": "Dec 26",
    "region": "tokyo",
    "weather": {
      "icon": "🌤️",
      "high": "11°C",
      "low": "3°C",
      "condition": {
        "en": "Mostly Sunny",
        "zh": "晴時多雲"
      }
    },
    "title": {
      "en": "Meiji Jingu (明治神宮) & Omotesando (表參道) — Shibuya Sky Sunset",
      "zh": "明治神宮古木參拜、表參道悠閒漫步與澀谷 SKY 絕美落日"
    },
    "tags": [
      {
        "type": "city",
        "text": "🏙️ Tokyo (東京)"
      },
      {
        "type": "pace",
        "en": "🧘 Relaxed",
        "zh": "🧘 輕鬆悠閒"
      }
    ],
    "blocks": [
      {
        "time": {
          "en": "🌅 Morning",
          "zh": "🌅 早上"
        },
        "activity": {
          "title": {
            "en": "Meiji Jingu Shrine (明治神宮) Peaceful Forest Walk",
            "zh": "明治神宮古林清晨散步與祈福"
          },
          "desc": {
            "en": "Tokyo's grandest Shinto shrine, nestled in a 170-acre evergreen forest of 120,000 trees. The gravel approach path is wide, gentle, and peaceful.",
            "zh": "東京最莊嚴的神社，被 170 英畝、12 萬株長青古木環抱。寬闊平緩的碎石林蔭大道空氣清新，洗滌心靈。"
          },
          "meal": {
            "icon": "🍳",
            "en": "<strong>Breakfast:</strong> Café brunch at <strong>Café Mori no Terrace</strong> near the shrine entrance — fresh pastries and hot hojicha latte.",
            "zh": "<strong>早餐：</strong> 神社入口旁的 <strong>森之露台 (Café Mori no Terrace)</strong> — 享用牛角包與熱焙茶拿鐵。"
          },
          "locations": [
            {
              "lat": 35.6764,
              "lng": 139.6993,
              "label": {
                "en": "Meiji Jingu Shrine",
                "zh": "明治神宮"
              }
            }
          ]
        }
      },
      {
        "time": {
          "en": "🌤️ Afternoon",
          "zh": "🌤️ 下午"
        },
        "activity": {
          "title": {
            "en": "Omotesando Boulevard (表參道) & Architectural Stroll",
            "zh": "表參道林蔭大道與建築美學漫步"
          },
          "desc": {
            "en": "Tokyo's premier tree-lined avenue, flanked by world-class architecture and designer boutiques. The wide sidewalks and gentle slopes make for an easy walk.",
            "zh": "被譽為東京香榭麗舍大道的表參道，兩旁林蔭夾道，匯聚世界頂尖大師設計的精品旗艦店，人行道寬闊好走。"
          },
          "meal": {
            "icon": "🍜",
            "en": "<strong>Lunch:</strong> <strong>Maisen Tonkatsu (舞泉豬扒 青山本店)</strong> — Legendary melt-in-the-mouth Kurobuta pork cutlet in a converted historic public bathhouse.",
            "zh": "<strong>午餐：</strong> <strong>舞泉豬扒 (Maisen) 青山本店</strong> — 昭和時期錢湯澡堂改建而成的名店，黑豚炸豬扒肉質軟讕，入口即化。"
          },
          "locations": [
            {
              "lat": 35.6652,
              "lng": 139.7123,
              "label": {
                "en": "Omotesando Hills",
                "zh": "表參道之丘"
              }
            },
            {
              "lat": 35.6698,
              "lng": 139.709,
              "label": {
                "en": "Maisen Aoyama",
                "zh": "舞泉豬扒本店"
              }
            }
          ]
        }
      },
      {
        "time": {
          "en": "🌆 Evening",
          "zh": "🌆 晚上"
        },
        "activity": {
          "title": {
            "en": "Shibuya Sky (澀谷 SKY) Open-Air Rooftop & Scramble Crossing",
            "zh": "澀谷 SKY 360 度露天展望台與澀谷十字路口"
          },
          "desc": {
            "en": "Ascend 229 m to the 360-degree open-air rooftop observation deck. On clear winter evenings, see Mt Fuji silhouetted against the brilliant crimson sunset, followed by the dazzling Shibuya Scramble Crossing below.",
            "zh": "登上 229 米高的露天停機坪展望台。冬季晴朗傍晚可清晰望見夕陽餘暉中的富士山剪影，隨後俯瞰世界最繁忙的澀谷十字路口萬人穿梭。"
          },
          "meal": {
            "icon": "🍣",
            "en": "<strong>Dinner:</strong> <strong>Midori Sushi (美登利壽司)</strong> at Shibuya Mark City 4F — Generous portions of pristine sashimi and signature unagi.",
            "zh": "<strong>晚餐：</strong> 澀谷 Mark City 4 樓 <strong>美登利壽司</strong> — 份量十足的高性價比名店，穴子壽司與特上刺身深受歡迎。"
          },
          "locations": [
            {
              "lat": 35.6585,
              "lng": 139.7022,
              "label": {
                "en": "Shibuya Sky",
                "zh": "澀谷 SKY"
              }
            },
            {
              "lat": 35.6595,
              "lng": 139.7005,
              "label": {
                "en": "Shibuya Crossing",
                "zh": "澀谷十字路口"
              }
            }
          ]
        }
      }
    ],
    "tip": {
      "en": "<strong>💡 Tip:</strong> Shibuya Sky sunset tickets sell out 4 weeks in advance. Book the 16:20 slot for optimal golden hour transitioning into Tokyo night lights.",
      "zh": "<strong>💡 實用貼士：</strong> 澀谷 SKY 日落門票通常提早 4 週售罄。建議預訂下午 4:20 左右場次，即可同時欣賞金黃夕陽、富士山遠景與璀璨夜景。"
    }
  },
  {
    "id": "day-3",
    "dayNum": "03",
    "date": "Dec 27",
    "region": "fuji",
    "weather": {
      "icon": "☀️",
      "high": "7°C",
      "low": "-2°C",
      "condition": {
        "en": "Crisp & Cold",
        "zh": "晴朗清冽"
      }
    },
    "title": {
      "en": "Self-Drive Day 1 — Lake Kawaguchi (河口湖), Arakurayama Sengen Park (新倉山淺間公園), Lake Yamanaka (山中湖) & Lake Ashi (蘆之湖)",
      "zh": "自駕第 1 天 — 河口湖、新倉山淺間公園、山中湖與蘆之湖，入住箱根仙石原溫泉酒店"
    },
    "tags": [
      {
        "type": "city",
        "text": "🗻 Tokyo → Mt Fuji → Hakone (東京 → 富士山 → 箱根)"
      },
      {
        "type": "transport",
        "text": "🚗 Self-Drive (自駕)"
      },
      {
        "type": "pace",
        "en": "⚖️ Balanced",
        "zh": "⚖️ 步調適中"
      }
    ],
    "blocks": [
      {
        "time": {
          "en": "🌅 Morning",
          "zh": "🌅 早上"
        },
        "activity": {
          "title": {
            "en": "Pick Up the Corolla Touring Hybrid & Drive to Lake Kawaguchi (河口湖)",
            "zh": "提取 Corolla Touring 油電車並自駕前往河口湖"
          },
          "desc": {
            "en": "At <strong>09:00</strong> collect your booked <strong>Toyota Corolla Touring Hybrid</strong> at the <strong>Tokyo Sta. Nihonbashi Ext. Shop</strong> (Trust Tower N Wing, B2 car park, 1-8-1 Marunouchi · tel. 03-5220-2220). Check that <strong>studless winter tyres</strong> and the <strong>ETC card</strong> are fitted, then drive the Chuo Expressway to Lake Kawaguchi (about 1.5–2 hours). Take a first Mt Fuji photo stop on the lake's northern shore at <strong>Oishi Park (大石公園)</strong>.",
            "zh": "<strong>09:00</strong> 於 <strong>東京駅日本橋口店</strong>（千代田區丸之內 1-8-1 トラストタワーN館 B2 停車場 · 電話 03-5220-2220）提取已預訂的 <strong>Toyota Corolla Touring 油電車</strong>。當場確認已配備<strong>無釘雪地胎</strong>及 <strong>ETC 卡</strong>，然後經中央自動車道前往河口湖（車程約 1.5–2 小時），並在北岸的<strong>大石公園</strong>拍攝第一張富士山照片。"
          },
          "meal": {
            "icon": "🍳",
            "en": "<strong>Breakfast:</strong> Hotel breakfast or a quick konbini stop before pick-up; hot coffee and snacks at an expressway service area (SA) on the way.",
            "zh": "<strong>早餐：</strong> 取車前在酒店或便利店簡單進食；沿途在高速公路服務區 (SA) 買熱咖啡及小食。"
          },
          "locations": [
            {
              "lat": 35.6836,
              "lng": 139.7627,
              "label": {
                "en": "Tokyo Sta. Nihonbashi Ext. Shop (Car Pick-up)",
                "zh": "東京駅日本橋口店（取車）"
              }
            },
            {
              "lat": 35.5155,
              "lng": 138.7451,
              "label": {
                "en": "Oishi Park, Lake Kawaguchi",
                "zh": "河口湖大石公園"
              }
            }
          ]
        }
      },
      {
        "time": {
          "en": "🌤️ Afternoon",
          "zh": "🌤️ 下午"
        },
        "activity": {
          "title": {
            "en": "Arakurayama Sengen Park (新倉山淺間公園) & Lake Yamanaka (山中湖)",
            "zh": "新倉山淺間公園與山中湖"
          },
          "desc": {
            "en": "Visit <strong>Arakurayama Sengen Park</strong> for the classic Chureito Pagoda and Mt Fuji view (398 steps to the top; the lower viewing area near the shrine is a gentler alternative). After lunch, drive about 30 minutes to <strong>Lake Yamanaka</strong> and enjoy close-up Mt Fuji views from the lakeside (for example Nagaike Water Park or Shiratori-hama). <strong>Aim to leave the lake by about 14:30</strong> so you reach Lake Ashi before sunset.",
            "zh": "遊覽<strong>新倉山淺間公園</strong>，欣賞忠靈塔配富士山的經典景致（登頂共 398 級石階，體力較弱者可留在神社旁較低的觀景位置）。午餐後自駕約 30 分鐘前往<strong>山中湖</strong>，在湖畔（例如長池親水公園或白鳥濱）近距離欣賞富士山。<strong>建議約 14:30 前離開山中湖</strong>，以便日落前抵達蘆之湖。"
          },
          "meal": {
            "icon": "🍜",
            "en": "<strong>Lunch:</strong> <strong>Hoto Fudo (ほうとう不動)</strong> — a hearty iron-pot miso noodle soup with pumpkin and winter vegetables, ideal on a cold day.",
            "zh": "<strong>午餐：</strong> <strong>ほうとう不動 (Hoto Fudo)</strong> — 鐵鍋盛載的南瓜蔬菜味噌餺飥麵，冬日暖胃之選。"
          },
          "locations": [
            {
              "lat": 35.5013,
              "lng": 138.8014,
              "label": {
                "en": "Arakurayama Sengen Park",
                "zh": "新倉山淺間公園"
              }
            },
            {
              "lat": 35.415,
              "lng": 138.86,
              "label": {
                "en": "Lake Yamanaka",
                "zh": "山中湖"
              }
            }
          ]
        }
      },
      {
        "time": {
          "en": "🌆 Evening",
          "zh": "🌆 傍晚與晚上"
        },
        "activity": {
          "title": {
            "en": "Lake Ashi (蘆之湖) Sunset & Check In at Hotel Kagetsuen (ホテル花月園)",
            "zh": "蘆之湖日落與入住箱根仙石原花月園酒店"
          },
          "desc": {
            "en": "Drive south via Gotemba and the Otome Pass to the <strong>northern shore of Lake Ashi (Togendai area)</strong> for a lakeside stroll and sunset (about 16:00–16:30). Then check in at <strong>Hotel Kagetsuen (ホテル花月園)</strong> in Sengokuhara (about 10 minutes away), soak in the hot spring and relax. <strong>Arrive before dark</strong> — mountain roads can be icy after sunset.",
            "zh": "經御殿場及乙女峠南下，前往<strong>蘆之湖北岸（桃源台一帶）</strong>漫步並欣賞日落（約 16:00–16:30）。隨後入住仙石原的<strong>ホテル花月園 (Hotel Kagetsuen)</strong>（車程約 10 分鐘），浸溫泉放鬆身心。<strong>請務必在天黑前抵達</strong>，日落後山路可能結冰。"
          },
          "meal": {
            "icon": "🍱",
            "en": "<strong>Dinner:</strong> At the hotel or a nearby Sengokuhara restaurant — please confirm your meal plan in the booking confirmation.",
            "zh": "<strong>晚餐：</strong> 於酒店或仙石原附近餐廳享用 — 請查閱訂房確認電郵內的餐飲安排。"
          },
          "locations": [
            {
              "lat": 35.2476,
              "lng": 139.005,
              "label": {
                "en": "Lake Ashi North Shore (Togendai)",
                "zh": "蘆之湖北岸（桃源台）"
              }
            },
            {
              "lat": 35.2578,
              "lng": 139.0036,
              "label": {
                "en": "Hotel Kagetsuen, Sengokuhara",
                "zh": "仙石原 ホテル花月園"
              }
            }
          ]
        }
      }
    ],
    "tip": {
      "en": "<strong>💡 Tip:</strong> Sunset is about 16:30 in late December, so keep to the timings above and skip Lake Yamanaka if you are running late. Check the road and weather reports, drive slowly on shaded bends where black ice forms, and fill up the tank before the mountain section.",
      "zh": "<strong>💡 實用貼士：</strong> 12 月下旬日落約為下午 4:30，請盡量依時間表行程；如進度落後，可略過山中湖。出發前查看路面及天氣資訊，經過背陰彎道須慢行以防黑冰，並在進入山路前加滿油。"
    }
  },
  {
    "id": "day-4",
    "dayNum": "04",
    "date": "Dec 28",
    "region": "fuji",
    "weather": {
      "icon": "🌤️",
      "high": "9°C",
      "low": "1°C",
      "condition": {
        "en": "Cool & Clear",
        "zh": "清涼微風"
      }
    },
    "title": {
      "en": "Owakudani (大涌谷), Odawara (小田原) Seafood & a Coastal Choice — Return the Car in Tokyo",
      "zh": "大涌谷、小田原海鮮午餐與海岸之選，傍晚返回東京還車"
    },
    "tags": [
      {
        "type": "city",
        "text": "🚗 Hakone → Odawara → Tokyo (箱根 → 小田原 → 東京)"
      },
      {
        "type": "transport",
        "text": "🚗 Self-Drive (自駕)"
      },
      {
        "type": "special",
        "en": "⏰ Car return by 20:00",
        "zh": "⏰ 20:00 前還車"
      }
    ],
    "blocks": [
      {
        "time": {
          "en": "🌅 Morning",
          "zh": "🌅 早上"
        },
        "activity": {
          "title": {
            "en": "Owakudani (大涌谷) & a Gentle Morning Stop",
            "zh": "大涌谷與悠閒的上午景點"
          },
          "desc": {
            "en": "Start at <strong>Owakudani</strong>, the steaming volcanic valley, and try the famous black eggs (<em>kuro tamago</em>). Then choose one gentle morning stop with the toggle below — the main choice is <strong>Odawara Castle Park</strong> (on the way down to lunch), while <strong>Hakone Shrine</strong> sits on Lake Ashi's southern shore, so it does not repeat yesterday's northern-shore sunset stop.",
            "zh": "先到冒著白煙的火山地熱谷<strong>大涌谷</strong>，品嚐著名的黑玉子。之後可用下方切換按鈕選擇一個輕鬆的上午景點 — 首選為順路下山的<strong>小田原城址公園</strong>；另一選擇<strong>箱根神社</strong>位於蘆之湖南岸，與昨日北岸日落景點不重複。"
          },
          "meal": {
            "icon": "🍳",
            "en": "<strong>Breakfast:</strong> At the hotel (or a nearby Sengokuhara café if breakfast is not included).",
            "zh": "<strong>早餐：</strong> 於酒店享用（如房價不含早餐，可到仙石原附近咖啡店）。"
          },
          "options": [
            {
              "label": {
                "en": "⭐ Main choice: Odawara Castle Park",
                "zh": "⭐ 首選：小田原城址公園"
              },
              "places": [
                {
                  "name": {
                    "en": "Odawara Castle Park (小田原城址公園)",
                    "zh": "小田原城址公園"
                  },
                  "desc": {
                    "en": "Reconstructed samurai castle keep with flat castle grounds and views over Sagami Bay (confirm lift access to the upper floors on the official site).",
                    "zh": "重建的武士城天守閣，城址公園地勢平坦，可遠眺相模灣（請先於官方網站確認天守閣升降機使用情況）。"
                  }
                }
              ]
            },
            {
              "label": {
                "en": "Alternative: Hakone Shrine & Heiwa no Torii",
                "zh": "備選：箱根神社與平和之鳥居"
              },
              "places": [
                {
                  "name": {
                    "en": "Heiwa no Torii (平和の鳥居)",
                    "zh": "平和之鳥居"
                  },
                  "desc": {
                    "en": "Vermilion torii gate standing in Lake Ashi, reached by a flat lakeside path on the southern shore.",
                    "zh": "矗立於蘆之湖中的朱紅鳥居，沿南岸平坦湖畔步道即可到達。"
                  }
                },
                {
                  "name": {
                    "en": "Hakone Shrine (箱根神社)",
                    "zh": "箱根神社"
                  },
                  "desc": {
                    "en": "Ancient cedar-lined shrine; the approach involves steps, so skip the main hall if it feels tiring.",
                    "zh": "古杉環繞的古老神社，參道設有石階，如感疲倦可略過本殿。"
                  }
                }
              ]
            }
          ],
          "locations": [
            {
              "lat": 35.2437,
              "lng": 139.0197,
              "label": {
                "en": "Owakudani",
                "zh": "大涌谷"
              }
            },
            {
              "lat": 35.25,
              "lng": 139.1553,
              "label": {
                "en": "Odawara Castle Park",
                "zh": "小田原城址公園"
              }
            },
            {
              "lat": 35.2022,
              "lng": 139.0242,
              "label": {
                "en": "Hakone Shrine (Alternative)",
                "zh": "箱根神社（備選）"
              }
            }
          ]
        }
      },
      {
        "time": {
          "en": "🌤️ Afternoon",
          "zh": "🌤️ 下午"
        },
        "activity": {
          "title": {
            "en": "Lunch at Totoco Odawara (漁港の駅 TOTOCO小田原) & a Coastal Choice",
            "zh": "小田原漁港之驛 TOTOCO 午餐與海岸之選"
          },
          "desc": {
            "en": "Enjoy fresh seafood at <strong>Totoco Odawara</strong> by the fishing port (aim for about 12:00). Then pick <strong>one</strong> stop on the drive back to Tokyo using the toggle below. <strong>Leave the coast by about 16:00</strong> so you reach Tokyo before the evening traffic and still have time to return the car by 20:00.",
            "zh": "在漁港旁的 <strong>TOTOCO 小田原</strong>品嚐新鮮海鮮（建議約 12:00 到達）。之後可用下方切換按鈕，在回東京途中選擇<strong>一個</strong>景點。<strong>請約 16:00 前離開海岸</strong>，以避開傍晚塞車，並預留時間於 20:00 前還車。"
          },
          "meal": {
            "icon": "🍣",
            "en": "<strong>Lunch:</strong> <strong>Totoco Odawara (漁港の駅 TOTOCO小田原)</strong> — fresh sashimi bowls and grilled seafood from the Odawara fishing port, with seating overlooking Sagami Bay.",
            "zh": "<strong>午餐：</strong> <strong>漁港の駅 TOTOCO小田原</strong> — 小田原漁港直送的新鮮刺身丼及燒烤海鮮，座位可眺望相模灣。"
          },
          "options": [
            {
              "label": {
                "en": "1. Kamakura (鎌倉)",
                "zh": "1. 鎌倉"
              },
              "places": [
                {
                  "name": {
                    "en": "Kotoku-in / Great Buddha (高徳院・鎌倉大仏)",
                    "zh": "高德院・鎌倉大佛"
                  },
                  "desc": {
                    "en": "Monumental 11-metre bronze Buddha in a flat, step-free courtyard.",
                    "zh": "高 11 米的青銅大佛，庭院地勢平坦，無需上落樓梯。"
                  }
                },
                {
                  "name": {
                    "en": "Hasedera Temple (長谷寺)",
                    "zh": "長谷寺"
                  },
                  "desc": {
                    "en": "Hillside temple with a giant golden Kannon statue, koi ponds and a coastal lookout over Yuigahama Beach.",
                    "zh": "依山而建的古寺，設有巨型金色觀音像、錦鯉池及可遠眺由比濱的觀景台。"
                  }
                },
                {
                  "name": {
                    "en": "Tsurugaoka Hachiman-gu & Komachi-dori (鶴岡八幡宮・小町通)",
                    "zh": "鶴岡八幡宮與小町通"
                  },
                  "desc": {
                    "en": "Kamakura's grand main shrine, with a lively street of sweets, matcha treats and crafts nearby.",
                    "zh": "鎌倉的主要神社，附近的小町通有各式傳統甜點、抹茶小食及手工藝品。"
                  }
                }
              ]
            },
            {
              "label": {
                "en": "2. Enoshima (江の島)",
                "zh": "2. 江之島"
              },
              "places": [
                {
                  "name": {
                    "en": "Enoshima Escar & Samuel Cocking Garden (江の島エスカー・サムエル・コッキング苑)",
                    "zh": "江之島 Escar 扶梯與 Samuel Cocking 花園"
                  },
                  "desc": {
                    "en": "Outdoor escalators carry you up the island to a botanical garden, so there is no stair-climbing.",
                    "zh": "戶外扶梯直達島上植物園，無需爬樓梯。"
                  }
                },
                {
                  "name": {
                    "en": "Enoshima Sea Candle (江の島シーキャンドル)",
                    "zh": "江之島 Sea Candle 展望燈塔"
                  },
                  "desc": {
                    "en": "Glass observation lighthouse with 360° views across Sagami Bay towards Mt Fuji.",
                    "zh": "玻璃展望燈塔，可 360 度遠眺相模灣及富士山。"
                  }
                },
                {
                  "name": {
                    "en": "Benzaiten Nakamise-dori (弁財天仲見世通り)",
                    "zh": "弁財天仲見世通"
                  },
                  "desc": {
                    "en": "Nostalgic island lane known for pressed octopus crackers and whitebait snacks.",
                    "zh": "懷舊的島上小巷，以壓製章魚煎餅及白飯魚小食聞名。"
                  }
                }
              ]
            },
            {
              "label": {
                "en": "3. Yokohama (横浜)",
                "zh": "3. 橫濱"
              },
              "places": [
                {
                  "name": {
                    "en": "Yokohama Red Brick Warehouse (横浜赤レンガ倉庫)",
                    "zh": "橫濱紅磚倉庫"
                  },
                  "desc": {
                    "en": "Historic harbourfront warehouses with shops, cafés and winter festive markets.",
                    "zh": "港畔的歷史倉庫建築，設有商店、咖啡店及冬季節慶市集。"
                  }
                },
                {
                  "name": {
                    "en": "Yamashita Park (山下公園)",
                    "zh": "山下公園"
                  },
                  "desc": {
                    "en": "Flat seaside promenade with views of the Hikawa Maru liner and the Minato Mirai skyline.",
                    "zh": "平坦的海濱步道，可欣賞冰川丸及港未來天際線。"
                  }
                },
                {
                  "name": {
                    "en": "Yokohama Chinatown (横浜中華街)",
                    "zh": "橫濱中華街"
                  },
                  "desc": {
                    "en": "Japan's largest Chinatown — steamed buns, roasted chestnuts and Chinese pastries to take away.",
                    "zh": "日本最大的中華街，有熱騰騰的包點、糖炒栗子及中式糕點可供外帶。"
                  }
                }
              ]
            }
          ],
          "locations": [
            {
              "lat": 35.235,
              "lng": 139.138,
              "label": {
                "en": "Totoco Odawara",
                "zh": "漁港の駅 TOTOCO小田原"
              }
            },
            {
              "lat": 35.3167,
              "lng": 139.5361,
              "label": {
                "en": "Kotoku-in (Kamakura option)",
                "zh": "高德院（鎌倉選項）"
              }
            },
            {
              "lat": 35.2997,
              "lng": 139.4812,
              "label": {
                "en": "Enoshima (Enoshima option)",
                "zh": "江之島（江之島選項）"
              }
            },
            {
              "lat": 35.4531,
              "lng": 139.6428,
              "label": {
                "en": "Red Brick Warehouse (Yokohama option)",
                "zh": "紅磚倉庫（橫濱選項）"
              }
            }
          ]
        }
      },
      {
        "time": {
          "en": "🌆 Evening",
          "zh": "🌆 傍晚與晚上"
        },
        "activity": {
          "title": {
            "en": "Check In at Villa Fontaine Tokyo Hamamatsucho (ヴィラフォンテーヌ東京浜松町) & Return the Car by 20:00",
            "zh": "入住東京濱松町酒店並於 20:00 前還車"
          },
          "desc": {
            "en": "Reach Tokyo by about 18:00. Unload your luggage and check in at <strong>Villa Fontaine Tokyo Hamamatsucho</strong>, refuel the tank near the return shop, then drive the few minutes to the <strong>Nishi-Shimbashi Shop</strong> (1-12-10 Nishishinbashi, Minato-ku) and <strong>return the car by 20:00</strong>. Walk back to the hotel and relax.",
            "zh": "約 18:00 抵達東京。先到<strong>ヴィラフォンテーヌ東京浜松町</strong>卸下行李並辦理入住，在還車店附近加滿油，再駕車數分鐘前往<strong>西新橋店</strong>（港區西新橋 1-12-10），並<strong>於 20:00 前還車</strong>。之後步行回酒店休息。"
          },
          "meal": {
            "icon": "🍱",
            "en": "<strong>Dinner:</strong> A casual dinner around Shimbashi or Hamamatsucho — plenty of set-meal restaurants and izakaya are within a 10-minute walk.",
            "zh": "<strong>晚餐：</strong> 在新橋或濱松町一帶享用輕鬆晚餐 — 步行 10 分鐘內有很多定食店及居酒屋。"
          },
          "locations": [
            {
              "lat": 35.656,
              "lng": 139.757,
              "label": {
                "en": "Villa Fontaine Tokyo Hamamatsucho",
                "zh": "ヴィラフォンテーヌ東京浜松町"
              }
            },
            {
              "lat": 35.6663,
              "lng": 139.7522,
              "label": {
                "en": "Nishi-Shimbashi Shop (Car Return)",
                "zh": "西新橋店（還車）"
              }
            }
          ]
        }
      }
    ],
    "tip": {
      "en": "<strong>💡 Tip:</strong> <strong>20:00 is a firm car-return deadline.</strong> If traffic or the weather turns, skip the coastal stop and drive straight back. Owakudani can close in strong winds or high volcanic-gas levels — check the Hakone Navi website first, and swap in a longer Odawara stop if it is closed.",
      "zh": "<strong>💡 實用貼士：</strong> <strong>20:00 為還車的嚴格期限。</strong>如遇塞車或天氣轉差，可略過海岸景點直接返回東京。大涌谷可能因強風或火山氣體濃度偏高而封閉，出發前請先查看箱根旅遊網站；如封閉，可延長小田原的行程。"
    }
  },
  {
    "id": "day-5",
    "dayNum": "05",
    "date": "Dec 29",
    "region": "tokyo",
    "weather": {
      "icon": "☀️",
      "high": "12°C",
      "low": "4°C",
      "condition": {
        "en": "Sunny & Crisp",
        "zh": "晴朗乾燥"
      }
    },
    "title": {
      "en": "Tokyo Highlights — Hamarikyu Gardens (浜離宮), teamLab Borderless & Tokyo Tower (東京鐵塔)",
      "zh": "東京精華 — 濱離宮恩賜庭園、teamLab Borderless 與東京鐵塔"
    },
    "tags": [
      {
        "type": "city",
        "text": "🏙️ Tokyo (東京)"
      },
      {
        "type": "pace",
        "en": "🧘 Relaxed",
        "zh": "🧘 輕鬆悠閒"
      }
    ],
    "blocks": [
      {
        "time": {
          "en": "🌅 Morning",
          "zh": "🌅 早上"
        },
        "activity": {
          "title": {
            "en": "Hamarikyu Gardens (浜離宮恩賜庭園)",
            "zh": "濱離宮恩賜庭園"
          },
          "desc": {
            "en": "A short walk from Hamamatsucho. Stroll the flat paths of this former shogun garden beside Tokyo Bay, with skyscrapers rising behind the tidal pond, and pause for matcha at the pond-side tea house.",
            "zh": "由濱松町步行即達。漫步於這座東京灣畔、昔日將軍庭園的平坦步道，潮入池背後高樓林立，並可在池畔茶屋品嚐抹茶稍作休息。"
          },
          "meal": {
            "icon": "🍳",
            "en": "<strong>Breakfast:</strong> Hotel breakfast or a bakery café around Hamamatsucho / Shiodome.",
            "zh": "<strong>早餐：</strong> 酒店早餐或濱松町 / 汐留一帶的麵包咖啡店。"
          },
          "locations": [
            {
              "lat": 35.66,
              "lng": 139.7634,
              "label": {
                "en": "Hamarikyu Gardens",
                "zh": "濱離宮恩賜庭園"
              }
            }
          ]
        }
      },
      {
        "time": {
          "en": "🌤️ Afternoon",
          "zh": "🌤️ 下午"
        },
        "activity": {
          "title": {
            "en": "teamLab Borderless (Azabudai Hills / 麻布台之丘)",
            "zh": "teamLab Borderless（麻布台之丘）"
          },
          "desc": {
            "en": "Immerse yourselves in the digital art museum at Azabudai Hills — rooms of flowing light, crystal universes and interactive waterfalls, with step-free routes. Allow 2–3 hours. <strong>Book timed tickets online in advance.</strong>",
            "zh": "前往麻布台之丘的 teamLab Borderless 數位美術館，置身流動光影、水晶宇宙與互動瀑布之中，館內設無障礙路線。建議預留 2–3 小時。<strong>請提早於網上預訂指定時段門票。</strong>"
          },
          "meal": {
            "icon": "🍜",
            "en": "<strong>Lunch:</strong> The Azabudai Hills food hall offers a wide choice of ramen, wagyu bowls and set meals under one roof.",
            "zh": "<strong>午餐：</strong> 麻布台之丘美食廣場有拉麵、和牛丼及定食等多種選擇。"
          },
          "locations": [
            {
              "lat": 35.6563,
              "lng": 139.7378,
              "label": {
                "en": "teamLab Borderless",
                "zh": "teamLab Borderless"
              }
            }
          ]
        }
      },
      {
        "time": {
          "en": "🌆 Evening",
          "zh": "🌆 傍晚與晚上"
        },
        "activity": {
          "title": {
            "en": "Shiba Park (芝公園) & Tokyo Tower (東京鐵塔) at Dusk",
            "zh": "芝公園與黃昏東京鐵塔"
          },
          "desc": {
            "en": "Walk through Shiba Park to see <strong>Tokyo Tower</strong> glow orange at dusk — close to your hotel at Hamamatsucho. Go up to the Main Deck (150 m) for the night view, or simply admire it from the park.",
            "zh": "漫步芝公園，欣賞黃昏時亮起橘紅色燈光的<strong>東京鐵塔</strong>，距離濱松町酒店不遠。可登上 150 米主觀景台欣賞夜景，或只在公園內遠觀。"
          },
          "meal": {
            "icon": "🍱",
            "en": "<strong>Dinner:</strong> A relaxed set-meal or sushi dinner around Hamamatsucho / Daimon — book ahead for a special evening if you prefer.",
            "zh": "<strong>晚餐：</strong> 在濱松町 / 大門一帶享用輕鬆的定食或壽司晚餐 — 如想特別慶祝，可提早預約。"
          },
          "locations": [
            {
              "lat": 35.6585,
              "lng": 139.7454,
              "label": {
                "en": "Tokyo Tower",
                "zh": "東京鐵塔"
              }
            },
            {
              "lat": 35.6566,
              "lng": 139.7491,
              "label": {
                "en": "Shiba Park",
                "zh": "芝公園"
              }
            }
          ]
        }
      }
    ],
    "tip": {
      "en": "<strong>💡 Tip:</strong> Your car is already returned, so today is all by metro and on foot. teamLab Borderless sells out quickly — choose a weekday-style afternoon slot if available.",
      "zh": "<strong>💡 實用貼士：</strong> 租車已於昨晚歸還，今日全程以地鐵及步行出行。teamLab Borderless 門票很快售罄，請盡早預訂。"
    }
  },
  {
    "id": "day-6",
    "dayNum": "06",
    "date": "Dec 30",
    "region": "tokyo",
    "weather": {
      "icon": "🌤️",
      "high": "11°C",
      "low": "3°C",
      "condition": {
        "en": "Clear & Festive",
        "zh": "歲末晴朗"
      }
    },
    "title": {
      "en": "Year-End Festive Tokyo — Tsukiji Outer Market, Ginza & Winter Illuminations",
      "zh": "歲末東京漫步 — 築地場外市場、銀座漫步與冬季燈飾"
    },
    "tags": [
      {
        "type": "city",
        "text": "🏙️ Tokyo (東京)"
      },
      {
        "type": "special",
        "text": "✨ Year-End Festive (歲末節慶)"
      },
      {
        "type": "pace",
        "en": "🧘 Relaxed",
        "zh": "🧘 輕鬆悠閒"
      }
    ],
    "blocks": [
      {
        "time": {
          "en": "🌅 Morning",
          "zh": "🌅 早上"
        },
        "activity": {
          "title": {
            "en": "Tsukiji Outer Market (築地場外市場) Fresh Seafood Breakfast",
            "zh": "築地場外市場晨光漫步與極鮮刺身海鮮早餐"
          },
          "desc": {
            "en": "Experience the vibrant year-end culinary atmosphere. Browse hundreds of stalls selling freshly grilled scallops, tamagoyaki (sweet omelette), dried goods, and premium fruit.",
            "zh": "感受歲末東京最具活力的市場氛圍！穿梭於充滿節慶氣息的熱鬧攤檔，品嚐現烤鮮甜帆立貝、香甜玉子燒及高檔日本時令水果。"
          },
          "meal": {
            "icon": "🍣",
            "en": "<strong>Breakfast:</strong> <strong>Tsukiji Donburi Senmon (海鮮丼專門店)</strong> — Steaming sushi rice topped with premium uni (sea urchin), salmon roe (ikura), and fatty tuna (otoro).",
            "zh": "<strong>早餐：</strong> <strong>築地海鮮丼專門店</strong> — 鋪滿極上海膽、三文魚籽與肥美大拖羅的豪華海鮮丼。"
          },
          "locations": [
            {
              "lat": 35.6654,
              "lng": 139.7707,
              "label": {
                "en": "Tsukiji Outer Market",
                "zh": "築地場外市場"
              }
            }
          ]
        }
      },
      {
        "time": {
          "en": "🌤️ Afternoon",
          "zh": "🌤️ 下午"
        },
        "activity": {
          "title": {
            "en": "Ginza (銀座) Festive Stroll & Depachika Delicacies",
            "zh": "銀座名店街漫步與百貨地下街新年美饌搜羅"
          },
          "desc": {
            "en": "Stroll along Tokyo's most elegant avenue. Visit Mitsukoshi or Ginza Six depachika (food basements) to admire elaborate traditional Osechi Ryori (New Year banquet boxes) and luxury confectionery.",
            "zh": "漫步於優雅壯麗的銀座大街，探索三越或 Ginza Six 地下美食街，欣賞日本家庭必備的精美御節料理 (Osechi) 與奢華和菓子包裝。"
          },
          "meal": {
            "icon": "☕",
            "en": "<strong>Afternoon Tea:</strong> <strong>Toraya Ginza (虎屋)</strong> — Historic confectionery house serving traditional seasonal wagashi with ceremonial matcha.",
            "zh": "<strong>下午茶：</strong> <strong>銀座 虎屋 (Toraya)</strong> — 享用數百年歷史的精緻季節和菓子與現沏手打抹茶。"
          },
          "locations": [
            {
              "lat": 35.6713,
              "lng": 139.7656,
              "label": {
                "en": "Ginza Mitsukoshi",
                "zh": "銀座三越"
              }
            },
            {
              "lat": 35.6696,
              "lng": 139.764,
              "label": {
                "en": "Ginza Six",
                "zh": "Ginza Six"
              }
            }
          ]
        }
      },
      {
        "time": {
          "en": "🌆 Evening",
          "zh": "🌆 晚上"
        },
        "activity": {
          "title": {
            "en": "Roppongi Hills Winter Illuminations & Festive Dinner",
            "zh": "六本木之丘冬季點燈夜景與精緻節慶晚餐"
          },
          "desc": {
            "en": "Experience Tokyo's breathtaking winter illuminations along Keyakizaka Dori with the illuminated Tokyo Tower in the backdrop. Browse festive boutiques and celebrate the penultimate evening of 2026.",
            "zh": "漫步於六本木櫸坂通 (Keyakizaka)，欣賞以璀璨東京鐵塔為背景的夢幻藍白冬季點燈，感受濃厚的歲末浪漫節慶氛圍。"
          },
          "meal": {
            "icon": "🥩",
            "en": "<strong>Dinner:</strong> <strong>Roppongi Kuroge Wagyu / Yakiniku</strong> — Savour premium Japanese beef or seasonal dining in festive Tokyo.",
            "zh": "<strong>晚餐：</strong> <strong>六本木黑毛和牛燒肉 / 季節御膳</strong> — 品嚐頂級黑毛和牛或精緻日式御膳料理。"
          },
          "locations": [
            {
              "lat": 35.6599,
              "lng": 139.7302,
              "label": {
                "en": "Roppongi Hills & Keyakizaka",
                "zh": "六本木之丘 櫸坂通"
              }
            },
            {
              "lat": 35.6586,
              "lng": 139.7454,
              "label": {
                "en": "Tokyo Tower View",
                "zh": "東京鐵塔眺望"
              }
            }
          ]
        }
      }
    ],
    "tip": {
      "en": "<strong>💡 Tip:</strong> Today is Dec 30, the day before New Year's Eve. Major department stores, Tsukiji stalls, and shopping districts are bustling with festive energy. Perfect for picking up gourmet souvenirs.",
      "zh": "<strong>💡 實用貼士：</strong> 今日為 12 月 30 日歲末時分，各大百貨美食街、築地與商圈充滿熱鬧迎新氣氛，是搜羅精緻伴手禮與品嚐新鮮美饌的絕佳時機。"
    }
  },
  {
    "id": "day-7",
    "dayNum": "07",
    "date": "Dec 31",
    "region": "tokyo",
    "weather": {
      "icon": "☀️",
      "high": "11°C",
      "low": "3°C",
      "condition": {
        "en": "Crisp Winter Sun",
        "zh": "冬日晴空"
      }
    },
    "title": {
      "en": "New Year's Eve: Tokyo Departure — Direct Transit to Haneda / Narita",
      "zh": "除夕告別東京：啟程回家 — 皇居漫步與濱松町直達羽田/成田機場"
    },
    "tags": [
      {
        "type": "city",
        "text": "✈️ Tokyo → Airport (東京 → 機場)"
      },
      {
        "type": "transport",
        "text": "✈️ Flight (航班)"
      },
      {
        "type": "special",
        "text": "🎆 NYE (除夕大晦日)"
      }
    ],
    "blocks": [
      {
        "time": {
          "en": "🌅 Morning",
          "zh": "🌅 早上"
        },
        "activity": {
          "title": {
            "en": "New Year's Eve Morning Stroll at Imperial Palace East Gardens (皇居東御苑)",
            "zh": "除夕清晨皇居東御苑悠閒散步與感受冬日祥和"
          },
          "desc": {
            "en": "Start the final morning of 2026 with a peaceful walk along the expansive moats and manicured pine gardens of the Imperial Palace. Wide, flat paths offer serene walking before departure.",
            "zh": "在 2026 年的最後一個清晨，漫步於皇居護城河畔與古松庭園，感受東京年末特有的祥和肅穆氣息。"
          },
          "meal": {
            "icon": "🍳",
            "en": "<strong>Breakfast:</strong> Relaxing hotel breakfast buffet or morning bakery cafe in Marunouchi.",
            "zh": "<strong>早餐：</strong> 酒店豐盛早餐或丸之內精緻烘焙咖啡館享用晨間咖啡可頌。"
          },
          "locations": [
            {
              "lat": 35.6852,
              "lng": 139.7528,
              "label": {
                "en": "Imperial Palace East Gardens",
                "zh": "皇居東御苑"
              }
            }
          ]
        }
      },
      {
        "time": {
          "en": "🌤️ Afternoon",
          "zh": "🌤️ 下午"
        },
        "activity": {
          "title": {
            "en": "Smooth Airport Transit from Hamamatsucho (Haneda ~20 mins / Narita ~1 hr 15 mins)",
            "zh": "由濱松町輕鬆前往機場（羽田約 20 分鐘 / 成田約 1 小時 15 分鐘）"
          },
          "desc": {
            "en": "For Haneda (HND): take the <strong>Tokyo Monorail</strong> directly from Hamamatsucho Station (about 20 minutes). For Narita (NRT): take the JR Yamanote Line to Tokyo or Shinagawa Station and board the Narita Express (N'EX) with reserved seats and luggage racks. Arrive 3 hours before departure.",
            "zh": "前往羽田機場 (HND)：在濱松町站乘搭<strong>東京單軌電車</strong>直達（約 20 分鐘）；前往成田機場 (NRT)：乘搭 JR 山手線到東京站或品川站，轉乘全對號坐席並設行李架的成田特快 (N'EX)。請於航班起飛前 3 小時抵達機場。"
          },
          "meal": {
            "icon": "🍜",
            "en": "<strong>Lunch / Pre-flight meal:</strong> Airport dining: hot Toshikoshi Soba or steaming ramen at the international departure terminal.",
            "zh": "<strong>午餐 / 候機餐點：</strong> 機場航廈品嚐除夕大晦日熱騰騰的蕎麥麵或拉麵。"
          },
          "locations": [
            {
              "lat": 35.5494,
              "lng": 139.7798,
              "label": {
                "en": "Haneda Airport",
                "zh": "羽田機場"
              }
            },
            {
              "lat": 35.772,
              "lng": 140.3929,
              "label": {
                "en": "Narita Airport",
                "zh": "成田機場"
              }
            }
          ]
        }
      },
      {
        "time": {
          "en": "🌆 Evening",
          "zh": "🌆 晚上"
        },
        "activity": {
          "title": {
            "en": "Departure Flight — Heading Home! ✈️",
            "zh": "啟程返家 — 滿載美好回憶告別日本！✈️"
          },
          "desc": {
            "en": "Clear tax-free customs with your Visit Japan Web QR code and passport, board and take off. Reflect on 7 unforgettable winter days across Tokyo, Mt Fuji, Hakone and the coast!",
            "zh": "憑 Visit Japan Web QR Code 及護照順利辦理免稅品及出境手續，登機起飛。回味 7 天東京、富士山、箱根與海岸的難忘冬日回憶！よい旅を！"
          },
          "meal": {
            "icon": "✈️",
            "en": "<strong>Flight Dinner:</strong> In-flight service on British Airways / Cathay Pacific / ANA / JAL.",
            "zh": "<strong>晚餐：</strong> 航班機上精緻餐飲服務。"
          },
          "locations": [
            {
              "lat": 35.5494,
              "lng": 139.7798,
              "label": {
                "en": "International Departure",
                "zh": "國際線出發"
              }
            }
          ]
        }
      }
    ],
    "tip": {
      "en": "<strong>💡 Tip:</strong> Departing on Dec 31 lets you travel home in comfort and arrive refreshed for the New Year. With Hamamatsucho's direct monorail to Haneda, the airport is an easy ride from your hotel.",
      "zh": "<strong>💡 實用貼士：</strong> 12 月 31 日出發可舒適踏上歸途，以精神飽滿的狀態迎接新年。濱松町設有直達羽田機場的單軌電車，由酒店前往機場十分方便。"
    }
  }
];

if (typeof window !== 'undefined') {
  window.ITINERARY_DATA = ITINERARY_DATA;
}
