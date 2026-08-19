/**
 * @file flights-data.js
 * @description FLIGHTS DATA MODULE — Japan Winter Journey 2026.
 * Contains the top 5 flight options for each of the 6 routes,
 * verified live on Google Flights via Playwright on 19 Aug 2026.
 * Each route contains an array of options; each option contains
 * an ordered array of legs (one row per flight sector).
 */

window.FLIGHTS_DATA = {

  routes: [

    /* ─────────────────────────────────────────────────────
       ROUTE 1: Edinburgh (EDI) → Tokyo (HND / NRT)
       Arriving Sunday, 20 December 2026
    ───────────────────────────────────────────────────── */
    {
      id: 'edi-to-tokyo',
      label: { en: 'Edinburgh → Tokyo', zh: '愛丁堡 → 東京' },
      date:  { en: 'Sat 19 Dec 2026 (depart)', zh: '2026年12月19日（出發）' },
      arrive: '2026-12-20',
      options: [
        {
          id: 'edi-tyo-1',
          label: { en: 'British Airways via London', zh: '英國航空轉倫敦' },
          airline: 'British Airways',
          hub: 'LHR',
          legs: [
            { airline: 'British Airways', flight: 'BA1439', from: 'EDI', to: 'LHR', dep: '2026-12-19 08:35', arr: '2026-12-19 10:05' },
            { airline: 'British Airways', flight: 'BA5',    from: 'LHR', to: 'HND', dep: '2026-12-19 11:40', arr: '2026-12-20 10:25' },
          ]
        },
        {
          id: 'edi-tyo-2',
          label: { en: 'Finnair via Helsinki (to HND)', zh: '芬蘭航空轉赫爾辛基（飛羽田）' },
          airline: 'Finnair',
          hub: 'HEL',
          legs: [
            { airline: 'Finnair', flight: 'AY1372', from: 'EDI', to: 'HEL', dep: '2026-12-19 08:10', arr: '2026-12-19 13:10' },
            { airline: 'Finnair', flight: 'AY61',   from: 'HEL', to: 'HND', dep: '2026-12-19 17:55', arr: '2026-12-20 14:25' },
          ]
        },
        {
          id: 'edi-tyo-3',
          label: { en: 'Finnair via Helsinki (to NRT)', zh: '芬蘭航空轉赫爾辛基（飛成田）' },
          airline: 'Finnair',
          hub: 'HEL',
          legs: [
            { airline: 'Finnair', flight: 'AY1372', from: 'EDI', to: 'HEL', dep: '2026-12-19 08:10', arr: '2026-12-19 13:10' },
            { airline: 'Finnair', flight: 'AY73',   from: 'HEL', to: 'NRT', dep: '2026-12-19 18:10', arr: '2026-12-20 14:10' },
          ]
        },
        {
          id: 'edi-tyo-4',
          label: { en: 'Lufthansa via Frankfurt', zh: '漢莎航空轉法蘭克福' },
          airline: 'Lufthansa',
          hub: 'FRA',
          legs: [
            { airline: 'Lufthansa', flight: 'LH963', from: 'EDI', to: 'FRA', dep: '2026-12-19 06:10', arr: '2026-12-19 09:05' },
            { airline: 'Lufthansa', flight: 'LH716', from: 'FRA', to: 'HND', dep: '2026-12-19 11:35', arr: '2026-12-20 08:45' },
          ]
        },
        {
          id: 'edi-tyo-5',
          label: { en: 'SWISS via Zurich', zh: '瑞士航空轉蘇黎世' },
          airline: 'SWISS',
          hub: 'ZRH',
          legs: [
            { airline: 'SWISS', flight: 'LX359', from: 'EDI', to: 'ZRH', dep: '2026-12-19 07:40', arr: '2026-12-19 10:50' },
            { airline: 'SWISS', flight: 'LX160', from: 'ZRH', to: 'NRT', dep: '2026-12-19 13:00', arr: '2026-12-20 10:20' },
          ]
        },
      ]
    },

    /* ─────────────────────────────────────────────────────
       ROUTE 2: London Heathrow (LHR) → Tokyo (HND / NRT)
       Saturday, 19 December 2026 — Arriving Sunday, 20 December 2026
    ───────────────────────────────────────────────────── */
    {
      id: 'lhr-to-tokyo',
      label: { en: 'London Heathrow → Tokyo', zh: '倫敦希斯路 → 東京' },
      date:  { en: 'Sat 19 Dec 2026', zh: '2026年12月19日' },
      arrive: '2026-12-20',
      options: [
        {
          id: 'lhr-tyo-1',
          label: { en: 'British Airways direct (morning)', zh: '英國航空直航（早班）' },
          airline: 'British Airways',
          hub: null,
          legs: [
            { airline: 'British Airways', flight: 'BA7', from: 'LHR', to: 'HND', dep: '2026-12-19 09:10', arr: '2026-12-20 07:35' },
          ]
        },
        {
          id: 'lhr-tyo-2',
          label: { en: 'British Airways direct (midday)', zh: '英國航空直航（午班）' },
          airline: 'British Airways',
          hub: null,
          legs: [
            { airline: 'British Airways', flight: 'BA5', from: 'LHR', to: 'HND', dep: '2026-12-19 11:40', arr: '2026-12-20 10:25' },
          ]
        },
        {
          id: 'lhr-tyo-3',
          label: { en: 'Finnair via Helsinki', zh: '芬蘭航空轉赫爾辛基' },
          airline: 'Finnair',
          hub: 'HEL',
          legs: [
            { airline: 'Finnair', flight: 'AY1332', from: 'LHR', to: 'HEL', dep: '2026-12-19 10:20', arr: '2026-12-19 15:15' },
            { airline: 'Finnair', flight: 'AY73',   from: 'HEL', to: 'NRT', dep: '2026-12-19 18:10', arr: '2026-12-20 14:10' },
          ]
        },
        {
          id: 'lhr-tyo-4',
          label: { en: 'Lufthansa via Frankfurt', zh: '漢莎航空轉法蘭克福' },
          airline: 'Lufthansa',
          hub: 'FRA',
          legs: [
            { airline: 'Lufthansa', flight: 'LH903', from: 'LHR', to: 'FRA', dep: '2026-12-19 08:30', arr: '2026-12-19 11:10' },
            { airline: 'Lufthansa', flight: 'LH716', from: 'FRA', to: 'HND', dep: '2026-12-19 13:45', arr: '2026-12-20 10:45' },
          ]
        },
        {
          id: 'lhr-tyo-5',
          label: { en: 'SWISS via Zurich', zh: '瑞士航空轉蘇黎世' },
          airline: 'SWISS',
          hub: 'ZRH',
          legs: [
            { airline: 'SWISS', flight: 'LX317', from: 'LHR', to: 'ZRH', dep: '2026-12-19 08:45', arr: '2026-12-19 11:30' },
            { airline: 'SWISS', flight: 'LX160', from: 'ZRH', to: 'NRT', dep: '2026-12-19 13:00', arr: '2026-12-20 10:20' },
          ]
        },
      ]
    },

    /* ─────────────────────────────────────────────────────
       ROUTE 3: Osaka Kansai (KIX) → Edinburgh (EDI)
       Thursday, 31 December 2026
    ───────────────────────────────────────────────────── */
    {
      id: 'osaka-to-edi',
      label: { en: 'Osaka → Edinburgh', zh: '大阪 → 愛丁堡' },
      date:  { en: 'Thu 31 Dec 2026', zh: '2026年12月31日' },
      arrive: '2027-01-01',
      options: [
        {
          id: 'kix-edi-1',
          label: { en: 'Finnair via Helsinki', zh: '芬蘭航空轉赫爾辛基' },
          airline: 'Finnair',
          hub: 'HEL',
          legs: [
            { airline: 'Finnair', flight: 'AY68',   from: 'KIX', to: 'HEL', dep: '2026-12-31 23:25', arr: '2027-01-01 06:10' },
            { airline: 'Finnair', flight: 'AY1371', from: 'HEL', to: 'EDI', dep: '2027-01-01 08:55', arr: '2027-01-01 09:10' },
          ]
        },
        {
          id: 'kix-edi-2',
          label: { en: 'Lufthansa via Munich (direct to EDI)', zh: '漢莎航空轉慕尼黑（直抵愛丁堡）' },
          airline: 'Lufthansa',
          hub: 'MUC',
          legs: [
            { airline: 'Lufthansa', flight: 'LH743',  from: 'KIX', to: 'MUC', dep: '2026-12-31 10:45', arr: '2026-12-31 17:00' },
            { airline: 'Lufthansa', flight: 'LH2524', from: 'MUC', to: 'EDI', dep: '2026-12-31 18:45', arr: '2026-12-31 20:05' },
          ]
        },
        {
          id: 'kix-edi-3',
          label: { en: 'Lufthansa via Munich + Frankfurt', zh: '漢莎航空轉慕尼黑再轉法蘭克福' },
          airline: 'Lufthansa',
          hub: 'MUC / FRA',
          legs: [
            { airline: 'Lufthansa', flight: 'LH743',  from: 'KIX', to: 'MUC', dep: '2026-12-31 10:45', arr: '2026-12-31 17:00' },
            { airline: 'Lufthansa', flight: 'LH119',  from: 'MUC', to: 'FRA', dep: '2026-12-31 18:00', arr: '2026-12-31 19:00' },
            { airline: 'Lufthansa', flight: 'LH966',  from: 'FRA', to: 'EDI', dep: '2026-12-31 21:30', arr: '2026-12-31 22:25' },
          ]
        },
        {
          id: 'kix-edi-4',
          label: { en: 'Lufthansa + British Airways via London', zh: '漢莎 + 英航轉倫敦' },
          airline: 'Lufthansa / British Airways',
          hub: 'MUC / LHR',
          legs: [
            { airline: 'Lufthansa',       flight: 'LH743',  from: 'KIX', to: 'MUC', dep: '2026-12-31 10:45', arr: '2026-12-31 17:00' },
            { airline: 'Lufthansa',       flight: 'LH2480', from: 'MUC', to: 'LHR', dep: '2026-12-31 18:15', arr: '2026-12-31 19:25' },
            { airline: 'British Airways', flight: 'BA1464', from: 'LHR', to: 'EDI', dep: '2026-12-31 21:05', arr: '2026-12-31 22:30' },
          ]
        },
        {
          id: 'kix-edi-5',
          label: { en: 'Finnair + British Airways via London', zh: '芬蘭航空 + 英航轉倫敦' },
          airline: 'Finnair / British Airways',
          hub: 'HEL / LHR',
          legs: [
            { airline: 'Finnair',         flight: 'AY68',   from: 'KIX', to: 'HEL', dep: '2026-12-31 23:25', arr: '2027-01-01 06:10' },
            { airline: 'Finnair',         flight: 'AY1331', from: 'HEL', to: 'LHR', dep: '2027-01-01 08:00', arr: '2027-01-01 09:10' },
            { airline: 'British Airways', flight: 'BA1442', from: 'LHR', to: 'EDI', dep: '2027-01-01 11:20', arr: '2027-01-01 12:45' },
          ]
        },
      ]
    },

    /* ─────────────────────────────────────────────────────
       ROUTE 4: Osaka Kansai (KIX) → London Heathrow (LHR)
       Thursday, 31 December 2026
    ───────────────────────────────────────────────────── */
    {
      id: 'osaka-to-lhr',
      label: { en: 'Osaka → London Heathrow', zh: '大阪 → 倫敦希斯路' },
      date:  { en: 'Thu 31 Dec 2026', zh: '2026年12月31日' },
      arrive: '2027-01-01',
      options: [
        {
          id: 'kix-lhr-1',
          label: { en: 'Finnair via Helsinki (early arrival)', zh: '芬蘭航空轉赫爾辛基（早到）' },
          airline: 'Finnair',
          hub: 'HEL',
          legs: [
            { airline: 'Finnair', flight: 'AY68',   from: 'KIX', to: 'HEL', dep: '2026-12-31 23:25', arr: '2027-01-01 06:10' },
            { airline: 'Finnair', flight: 'AY1331', from: 'HEL', to: 'LHR', dep: '2027-01-01 08:00', arr: '2027-01-01 09:10' },
          ]
        },
        {
          id: 'kix-lhr-2',
          label: { en: 'Finnair via Helsinki (afternoon arrival)', zh: '芬蘭航空轉赫爾辛基（下午到）' },
          airline: 'Finnair',
          hub: 'HEL',
          legs: [
            { airline: 'Finnair', flight: 'AY68',   from: 'KIX', to: 'HEL', dep: '2026-12-31 23:25', arr: '2027-01-01 06:10' },
            { airline: 'Finnair', flight: 'AY1337', from: 'HEL', to: 'LHR', dep: '2027-01-01 16:00', arr: '2027-01-01 17:10' },
          ]
        },
        {
          id: 'kix-lhr-3',
          label: { en: 'Lufthansa via Munich (early evening)', zh: '漢莎航空轉慕尼黑（傍晚到）' },
          airline: 'Lufthansa',
          hub: 'MUC',
          legs: [
            { airline: 'Lufthansa', flight: 'LH743',  from: 'KIX', to: 'MUC', dep: '2026-12-31 10:45', arr: '2026-12-31 17:00' },
            { airline: 'Lufthansa', flight: 'LH2480', from: 'MUC', to: 'LHR', dep: '2026-12-31 18:15', arr: '2026-12-31 19:25' },
          ]
        },
        {
          id: 'kix-lhr-4',
          label: { en: 'Lufthansa via Munich (late evening)', zh: '漢莎航空轉慕尼黑（晚間到）' },
          airline: 'Lufthansa',
          hub: 'MUC',
          legs: [
            { airline: 'Lufthansa', flight: 'LH743',  from: 'KIX', to: 'MUC', dep: '2026-12-31 10:45', arr: '2026-12-31 17:00' },
            { airline: 'Lufthansa', flight: 'LH2482', from: 'MUC', to: 'LHR', dep: '2026-12-31 20:05', arr: '2026-12-31 21:15' },
          ]
        },
        {
          id: 'kix-lhr-5',
          label: { en: 'Etihad via Abu Dhabi', zh: '阿提哈德轉阿布扎比' },
          airline: 'Etihad Airways',
          hub: 'AUH',
          legs: [
            { airline: 'Etihad Airways', flight: 'EY878', from: 'KIX', to: 'AUH', dep: '2026-12-31 18:30', arr: '2027-01-01 00:35' },
            { airline: 'Etihad Airways', flight: 'EY11',  from: 'AUH', to: 'LHR', dep: '2027-01-01 08:10', arr: '2027-01-01 12:40' },
          ]
        },
      ]
    },

    /* ─────────────────────────────────────────────────────
       ROUTE 5: Osaka Kansai (KIX) → Hong Kong (HKG)
       Departing Thursday, 31 December 2026
       Source: kix_to_hkg_20261231.csv
       Verified live on Google Flights 19 Aug 2026
    ───────────────────────────────────────────────────── */
    {
      id: 'kix-to-hkg',
      label: { en: 'Osaka → Hong Kong', zh: '大阪 → 香港' },
      date:  { en: 'Thu 31 Dec 2026 (depart)', zh: '2026年12月31日（出發）' },
      depart: '2026-12-31',
      arrive: '2026-12-31',
      options: [
        {
          id: 'kix-hkg-1',
          label: { en: 'Cathay Pacific (afternoon)', zh: '國泰航空（下午班）' },
          airline: 'Cathay Pacific',
          hub: null,
          legs: [
            { airline: 'Cathay Pacific', flight: 'CX 561', from: 'KIX', to: 'HKG', dep: '2026-12-31 16:55', arr: '2026-12-31 20:25' },
          ]
        },
        {
          id: 'kix-hkg-2',
          label: { en: 'Cathay Pacific (morning)', zh: '國泰航空（上午班）' },
          airline: 'Cathay Pacific',
          hub: null,
          legs: [
            { airline: 'Cathay Pacific', flight: 'CX 567', from: 'KIX', to: 'HKG', dep: '2026-12-31 09:25', arr: '2026-12-31 13:00' },
          ]
        },
        {
          id: 'kix-hkg-3',
          label: { en: 'HK Express (early afternoon)', zh: '香港快運（下午早班）' },
          airline: 'Hong Kong Express',
          hub: null,
          legs: [
            { airline: 'Hong Kong Express', flight: 'UO 687', from: 'KIX', to: 'HKG', dep: '2026-12-31 13:50', arr: '2026-12-31 17:30' },
          ]
        },
        {
          id: 'kix-hkg-4',
          label: { en: 'Peach Aviation (late night)', zh: '樂桃航空（深夜班）' },
          airline: 'Peach Aviation',
          hub: null,
          legs: [
            { airline: 'Peach Aviation', flight: 'MM 67', from: 'KIX', to: 'HKG', dep: '2026-12-31 21:05', arr: '2027-01-01 00:45' },
          ]
        },
        {
          id: 'kix-hkg-5',
          label: { en: 'HK Express (late night)', zh: '香港快運（深夜班）' },
          airline: 'Hong Kong Express',
          hub: null,
          legs: [
            { airline: 'Hong Kong Express', flight: 'UO 863', from: 'KIX', to: 'HKG', dep: '2026-12-31 21:15', arr: '2027-01-01 00:55' },
          ]
        },
      ]
    },

    /* ─────────────────────────────────────────────────────
       ROUTE 6: Hong Kong (HKG) → Edinburgh (EDI)
       Departing Thursday, 14 January 2027
       Source: hkg_to_edi_20270114.csv
       Verified live on Google Flights 19 Aug 2026
    ───────────────────────────────────────────────────── */
    {
      id: 'hkg-to-edi',
      label: { en: 'Hong Kong → Edinburgh', zh: '香港 → 愛丁堡' },
      date:  { en: 'Thu 14 Jan 2027 (depart)', zh: '2027年1月14日（出發）' },
      depart: '2027-01-14',
      arrive: '2027-01-15',
      options: [
        {
          id: 'hkg-edi-1',
          label: { en: 'British Airways via London', zh: '英國航空轉倫敦' },
          airline: 'British Airways',
          hub: 'LHR',
          legs: [
            { airline: 'British Airways', flight: 'BA 32',   from: 'HKG', to: 'LHR', dep: '2027-01-14 22:45', arr: '2027-01-15 05:35' },
            { airline: 'British Airways', flight: 'BA 1440', from: 'LHR', to: 'EDI', dep: '2027-01-15 07:35', arr: '2027-01-15 09:00' },
          ]
        },
        {
          id: 'hkg-edi-2',
          label: { en: 'Finnair via Helsinki', zh: '芬蘭航空轉赫爾辛基' },
          airline: 'Finnair',
          hub: 'HEL',
          legs: [
            { airline: 'Finnair',                   flight: 'AY 100',  from: 'HKG', to: 'HEL', dep: '2027-01-14 21:45', arr: '2027-01-15 05:45' },
            { airline: 'Finnair (opr. Nordic Reg)', flight: 'AY 1371', from: 'HEL', to: 'EDI', dep: '2027-01-15 08:15', arr: '2027-01-15 09:10' },
          ]
        },
        {
          id: 'hkg-edi-3',
          label: { en: 'Cathay Pacific & Lufthansa via Frankfurt', zh: '國泰航空及漢莎航空轉法蘭克福' },
          airline: 'Cathay Pacific / Lufthansa',
          hub: 'FRA',
          legs: [
            { airline: 'Cathay Pacific', flight: 'CX 289', from: 'HKG', to: 'FRA', dep: '2027-01-14 00:25', arr: '2027-01-14 07:05' },
            { airline: 'Lufthansa',      flight: 'LH 960', from: 'FRA', to: 'EDI', dep: '2027-01-14 10:55', arr: '2027-01-14 11:55' },
          ]
        },
        {
          id: 'hkg-edi-4',
          label: { en: 'Lufthansa via Frankfurt', zh: '漢莎航空轉法蘭克福' },
          airline: 'Lufthansa',
          hub: 'FRA',
          legs: [
            { airline: 'Lufthansa', flight: 'LH 797', from: 'HKG', to: 'FRA', dep: '2027-01-14 23:45', arr: '2027-01-15 06:10' },
            { airline: 'Lufthansa', flight: 'LH 960', from: 'FRA', to: 'EDI', dep: '2027-01-15 10:55', arr: '2027-01-15 11:55' },
          ]
        },
        {
          id: 'hkg-edi-5',
          label: { en: 'SWISS & Edelweiss via Zurich', zh: '瑞士航空及雪絨花航空轉蘇黎世' },
          airline: 'SWISS / Edelweiss Air',
          hub: 'ZRH',
          legs: [
            { airline: 'SWISS',                      flight: 'LX 139', from: 'HKG', to: 'ZRH', dep: '2027-01-14 23:30', arr: '2027-01-15 06:10' },
            { airline: 'Edelweiss Air (for SWISS)',  flight: 'WK 290', from: 'ZRH', to: 'EDI', dep: '2027-01-15 17:45', arr: '2027-01-15 19:10' },
          ]
        },
      ]
    },

  ]
};
