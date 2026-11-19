/**
 * @file flights-data.js
 * @description FLIGHTS DATA MODULE — Japan Winter Journey 2026.
 * Contains curated flight options for each of the 5 routes (Tokyo round trip for 25–31 Dec 2026,
 * plus Hong Kong → Edinburgh on 21 Jan 2027), verified live on Google Flights.
 * Each route contains an array of options; each option contains
 * an ordered array of legs (one row per flight sector).
 */

window.FLIGHTS_DATA = {

  /* Winter (Dec/Jan) UTC offsets, in hours, for every airport used below.
     Single source for duration maths in js/features/flights.js and scripts/validate.mjs.
     Add a new airport here BEFORE using it in a leg. */
  tz: { EDI: 0, LHR: 0, HEL: 2, FRA: 1, MUC: 1, ZRH: 1, WAW: 1, AUH: 4, HKG: 8, HND: 9, NRT: 9, DOH: 3 },

  routes: [

    /* ─────────────────────────────────────────────────────
       ROUTE 1B: Edinburgh (EDI) → Tokyo (HND / NRT)
       Departing Thursday, 24 December 2026 (arriving Dec 25)
       Source: edi_to_tokyo_b_20261224.csv
    ───────────────────────────────────────────────────── */
    {
      id: 'edi-to-tokyo-b',
      label: { en: 'Edinburgh → Tokyo', zh: '愛丁堡 → 東京' },
      date:  { en: 'Thu 24 Dec 2026 (depart)', zh: '2026年12月24日（出發）' },
      depart: '2026-12-24',
      arrive: '2026-12-25',
      options: [
        {
          id: 'edi-tyo-b1',
          label: { en: 'British Airways via London', zh: '英國航空轉倫敦' },
          airline: 'British Airways',
          hub: 'LHR',
          legs: [
            { airline: 'British Airways', flight: 'BA1463', from: 'EDI', to: 'LHR', dep: '2026-12-24 06:50', arr: '2026-12-24 08:30' },
            { airline: 'British Airways', flight: 'BA5',    from: 'LHR', to: 'HND', dep: '2026-12-24 11:40', arr: '2026-12-25 10:25' },
          ]
        },
        {
          id: 'edi-tyo-b3',
          label: { en: 'Lufthansa via Frankfurt', zh: '漢莎航空轉法蘭克福' },
          airline: 'Lufthansa',
          hub: 'FRA',
          legs: [
            { airline: 'Lufthansa', flight: 'LH965', from: 'EDI', to: 'FRA', dep: '2026-12-24 06:00', arr: '2026-12-24 08:55' },
            { airline: 'Lufthansa', flight: 'LH716', from: 'FRA', to: 'HND', dep: '2026-12-24 14:00', arr: '2026-12-25 10:45' },
          ]
        },
        {
          id: 'edi-tyo-b5',
          label: { en: 'British Airways & Lufthansa via London + Frankfurt', zh: '英國航空及漢莎航空轉倫敦及法蘭克福' },
          airline: 'British Airways / Lufthansa',
          hub: 'LHR / FRA',
          legs: [
            { airline: 'British Airways', flight: 'BA1461', from: 'EDI', to: 'LHR', dep: '2026-12-24 06:00', arr: '2026-12-24 07:40' },
            { airline: 'Lufthansa',       flight: 'LH901',  from: 'LHR', to: 'FRA', dep: '2026-12-24 09:30', arr: '2026-12-24 12:05' },
            { airline: 'Lufthansa',       flight: 'LH716',  from: 'FRA', to: 'HND', dep: '2026-12-24 14:00', arr: '2026-12-25 10:45' },
          ]
        },
        {
          id: 'edi-tyo-b6',
          label: { en: 'British Airways & Etihad Airways via London + Abu Dhabi (Narita)', zh: '英國航空及阿提哈德航空轉倫敦及阿布扎比（成田）' },
          airline: 'British Airways / Etihad Airways',
          hub: 'LHR / AUH',
          legs: [
            { airline: 'British Airways', flight: 'BA1461', from: 'EDI', to: 'LHR', dep: '2026-12-24 06:00', arr: '2026-12-24 07:40' },
            { airline: 'Etihad Airways',  flight: 'EY62',   from: 'LHR', to: 'AUH', dep: '2026-12-24 08:40', arr: '2026-12-24 19:40' },
            { airline: 'Etihad Airways',  flight: 'EY800',  from: 'AUH', to: 'NRT', dep: '2026-12-24 21:05', arr: '2026-12-25 11:40' },
          ]
        },
        {
          id: 'edi-tyo-b2',
          label: { en: 'Finnair via Helsinki', zh: '芬蘭航空轉赫爾辛基' },
          airline: 'Finnair',
          hub: 'HEL',
          legs: [
            { airline: 'Finnair', flight: 'AY1372', from: 'EDI', to: 'HEL', dep: '2026-12-24 08:10', arr: '2026-12-24 12:45' },
            { airline: 'Finnair', flight: 'AY61',   from: 'HEL', to: 'HND', dep: '2026-12-24 18:00', arr: '2026-12-25 14:25' },
          ]
        },
        {
          id: 'edi-tyo-b7',
          label: { en: 'British Airways & LOT Polish Airlines via London + Warsaw (Narita)', zh: '英國航空及波蘭航空轉倫敦及華沙（成田）' },
          airline: 'British Airways / LOT Polish Airlines',
          hub: 'LHR / WAW',
          legs: [
            { airline: 'British Airways',     flight: 'BA1447', from: 'EDI', to: 'LHR', dep: '2026-12-24 13:25', arr: '2026-12-24 15:00' },
            { airline: 'British Airways',     flight: 'BA850',  from: 'LHR', to: 'WAW', dep: '2026-12-24 17:55', arr: '2026-12-24 21:25' },
            { airline: 'LOT Polish Airlines', flight: 'LO79',   from: 'WAW', to: 'NRT', dep: '2026-12-24 22:50', arr: '2026-12-25 19:40' },
          ]
        },
        {
          id: 'edi-tyo-b4',
          label: { en: 'British Airways & Finnair via London + Helsinki', zh: '英國航空及芬蘭航空轉倫敦及赫爾辛基' },
          airline: 'British Airways / Finnair',
          hub: 'LHR / HEL',
          legs: [
            { airline: 'British Airways', flight: 'BA1461', from: 'EDI', to: 'LHR', dep: '2026-12-24 06:00', arr: '2026-12-24 07:40' },
            { airline: 'Finnair',         flight: 'AY1332', from: 'LHR', to: 'HEL', dep: '2026-12-24 10:20', arr: '2026-12-24 15:15' },
            { airline: 'Finnair',         flight: 'AY61',   from: 'HEL', to: 'HND', dep: '2026-12-24 18:00', arr: '2026-12-25 14:25' },
          ]
        },
        {
          id: 'edi-tyo-b8',
          label: { en: 'British Airways & LOT Polish Airlines via London + Warsaw (LOT Warsaw leg, Narita)', zh: '英國航空及波蘭航空轉倫敦及華沙（波蘭航空倫敦往華沙，成田）' },
          airline: 'British Airways / LOT Polish Airlines',
          hub: 'LHR / WAW',
          legs: [
            { airline: 'British Airways',     flight: 'BA1463', from: 'EDI', to: 'LHR', dep: '2026-12-24 06:50', arr: '2026-12-24 08:30' },
            { airline: 'LOT Polish Airlines', flight: 'LO282',  from: 'LHR', to: 'WAW', dep: '2026-12-24 10:35', arr: '2026-12-24 14:05' },
            { airline: 'LOT Polish Airlines', flight: 'LO79',   from: 'WAW', to: 'NRT', dep: '2026-12-24 22:50', arr: '2026-12-25 19:40' },
          ]
        },
      ]
    },

    /* ─────────────────────────────────────────────────────
       ROUTE 2B: London Heathrow (LHR) → Tokyo (HND / NRT)
       Departing Thursday, 24 December 2026 (arriving Dec 25)
       Source: lhr_to_tokyo_b_20261224.csv
    ───────────────────────────────────────────────────── */
    {
      id: 'lhr-to-tokyo-b',
      label: { en: 'London Heathrow → Tokyo', zh: '倫敦希斯路 → 東京' },
      date:  { en: 'Thu 24 Dec 2026 (depart)', zh: '2026年12月24日（出發）' },
      depart: '2026-12-24',
      arrive: '2026-12-25',
      options: [
        {
          id: 'lhr-tyo-b1',
          label: { en: 'British Airways (direct morning)', zh: '英國航空（直航上午班）' },
          airline: 'British Airways',
          hub: null,
          legs: [
            { airline: 'British Airways', flight: 'BA7', from: 'LHR', to: 'HND', dep: '2026-12-24 09:10', arr: '2026-12-25 07:35' },
          ]
        },
        {
          id: 'lhr-tyo-b2',
          label: { en: 'British Airways (direct midday)', zh: '英國航空（直航中午班）' },
          airline: 'British Airways',
          hub: null,
          legs: [
            { airline: 'British Airways', flight: 'BA5', from: 'LHR', to: 'HND', dep: '2026-12-24 11:40', arr: '2026-12-25 10:25' },
          ]
        },
        {
          id: 'lhr-tyo-b4',
          label: { en: 'Japan Airlines (direct morning)', zh: '日本航空（直航上午班）' },
          airline: 'Japan Airlines',
          hub: null,
          legs: [
            { airline: 'Japan Airlines', flight: 'JL42', from: 'LHR', to: 'HND', dep: '2026-12-24 08:50', arr: '2026-12-25 07:40' },
          ]
        },
        {
          id: 'lhr-tyo-b5',
          label: { en: 'Japan Airlines (direct evening)', zh: '日本航空（直航傍晚班）' },
          airline: 'Japan Airlines',
          hub: null,
          legs: [
            { airline: 'Japan Airlines', flight: 'JL44', from: 'LHR', to: 'HND', dep: '2026-12-24 18:30', arr: '2026-12-25 17:20' },
          ]
        },
        {
          id: 'lhr-tyo-b3',
          label: { en: 'All Nippon Airways (direct evening)', zh: '全日空（直航傍晚班）' },
          airline: 'All Nippon Airways',
          hub: null,
          legs: [
            { airline: 'All Nippon Airways', flight: 'NH212', from: 'LHR', to: 'HND', dep: '2026-12-24 19:00', arr: '2026-12-25 17:55' },
          ]
        },
        {
          id: 'lhr-tyo-b6',
          label: { en: 'Lufthansa via Frankfurt', zh: '漢莎航空轉法蘭克福' },
          airline: 'Lufthansa',
          hub: 'FRA',
          legs: [
            { airline: 'Lufthansa', flight: 'LH901', from: 'LHR', to: 'FRA', dep: '2026-12-24 09:30', arr: '2026-12-24 12:05' },
            { airline: 'Lufthansa', flight: 'LH716', from: 'FRA', to: 'HND', dep: '2026-12-24 14:00', arr: '2026-12-25 10:45' },
          ]
        },
        {
          id: 'lhr-tyo-b7',
          label: { en: 'British Airways & Lufthansa via Munich', zh: '英國航空及漢莎航空轉慕尼黑' },
          airline: 'British Airways / Lufthansa',
          hub: 'MUC',
          legs: [
            { airline: 'British Airways', flight: 'BA944', from: 'LHR', to: 'MUC', dep: '2026-12-24 07:10', arr: '2026-12-24 10:05' },
            { airline: 'Lufthansa',       flight: 'LH714', from: 'MUC', to: 'HND', dep: '2026-12-24 12:55', arr: '2026-12-25 09:15' },
          ]
        },
        {
          id: 'lhr-tyo-b8',
          label: { en: 'Lufthansa via Munich', zh: '漢莎航空轉慕尼黑' },
          airline: 'Lufthansa',
          hub: 'MUC',
          legs: [
            { airline: 'Lufthansa', flight: 'LH2485', from: 'LHR', to: 'MUC', dep: '2026-12-24 06:35', arr: '2026-12-24 09:25' },
            { airline: 'Lufthansa', flight: 'LH714',  from: 'MUC', to: 'HND', dep: '2026-12-24 12:55', arr: '2026-12-25 09:15' },
          ]
        },
        {
          id: 'lhr-tyo-b9',
          label: { en: 'British Airways & Lufthansa via Frankfurt', zh: '英國航空及漢莎航空轉法蘭克福' },
          airline: 'British Airways / Lufthansa',
          hub: 'FRA',
          legs: [
            { airline: 'British Airways', flight: 'BA900', from: 'LHR', to: 'FRA', dep: '2026-12-24 07:45', arr: '2026-12-24 10:25' },
            { airline: 'Lufthansa',       flight: 'LH716', from: 'FRA', to: 'HND', dep: '2026-12-24 14:00', arr: '2026-12-25 10:45' },
          ]
        },
        {
          id: 'lhr-tyo-b10',
          label: { en: 'Etihad Airways via Abu Dhabi (Narita)', zh: '阿提哈德航空轉阿布扎比（成田）' },
          airline: 'Etihad Airways',
          hub: 'AUH',
          legs: [
            { airline: 'Etihad Airways', flight: 'EY62',  from: 'LHR', to: 'AUH', dep: '2026-12-24 08:40', arr: '2026-12-24 19:40' },
            { airline: 'Etihad Airways', flight: 'EY800', from: 'AUH', to: 'NRT', dep: '2026-12-24 21:05', arr: '2026-12-25 11:40' },
          ]
        },
        {
          id: 'lhr-tyo-b11',
          label: { en: 'Finnair via Helsinki', zh: '芬蘭航空轉赫爾辛基' },
          airline: 'Finnair',
          hub: 'HEL',
          legs: [
            { airline: 'Finnair', flight: 'AY1332', from: 'LHR', to: 'HEL', dep: '2026-12-24 10:20', arr: '2026-12-24 15:15' },
            { airline: 'Finnair', flight: 'AY61',   from: 'HEL', to: 'HND', dep: '2026-12-24 18:00', arr: '2026-12-25 14:25' },
          ]
        },
        {
          id: 'lhr-tyo-b12',
          label: { en: 'British Airways & LOT Polish Airlines via Warsaw (Narita)', zh: '英國航空及波蘭航空轉華沙（成田）' },
          airline: 'British Airways / LOT Polish Airlines',
          hub: 'WAW',
          legs: [
            { airline: 'British Airways',     flight: 'BA848', from: 'LHR', to: 'WAW', dep: '2026-12-24 15:15', arr: '2026-12-24 18:50' },
            { airline: 'LOT Polish Airlines', flight: 'LO79',  from: 'WAW', to: 'NRT', dep: '2026-12-24 22:50', arr: '2026-12-25 19:40' },
          ]
        },
        {
          id: 'lhr-tyo-b13',
          label: { en: 'LOT Polish Airlines via Warsaw (Narita)', zh: '波蘭航空轉華沙（成田）' },
          airline: 'LOT Polish Airlines',
          hub: 'WAW',
          legs: [
            { airline: 'LOT Polish Airlines', flight: 'LO282', from: 'LHR', to: 'WAW', dep: '2026-12-24 10:35', arr: '2026-12-24 14:05' },
            { airline: 'LOT Polish Airlines', flight: 'LO79',  from: 'WAW', to: 'NRT', dep: '2026-12-24 22:50', arr: '2026-12-25 19:40' },
          ]
        },
      ]
    },

    /* ─────────────────────────────────────────────────────
       ROUTE 8: Tokyo (HND) → London Heathrow (LHR)
       Thursday, 31 December 2026 – Friday, 1 January 2027
       Source: tokyo_to_lhr_20261231.csv
    ───────────────────────────────────────────────────── */
    {
      id: 'tokyo-to-lhr',
      label: { en: 'Tokyo → London Heathrow', zh: '東京 → 倫敦希斯路' },
      date:  { en: 'Thu 31 Dec 2026 – Fri 1 Jan 2027', zh: '2026年12月31日 – 2027年1月1日' },
      depart: '2026-12-31',
      arrive: '2027-01-01',
      options: [
        {
          id: 'tyo-lhr-4',
          label: { en: 'Japan Airlines (1 Jan red-eye direct)', zh: '日本航空（1月1日紅眼直航）' },
          airline: 'Japan Airlines',
          hub: null,
          legs: [
            { airline: 'Japan Airlines', flight: 'JL41', from: 'HND', to: 'LHR', dep: '2027-01-01 01:00', arr: '2027-01-01 06:25' },
          ]
        },
        {
          id: 'tyo-lhr-2',
          label: { en: 'British Airways (1 Jan morning direct)', zh: '英國航空（1月1日上午直航）' },
          airline: 'British Airways',
          hub: null,
          legs: [
            { airline: 'British Airways', flight: 'BA8', from: 'HND', to: 'LHR', dep: '2027-01-01 09:35', arr: '2027-01-01 15:35' },
          ]
        },
        {
          id: 'tyo-lhr-1',
          label: { en: 'British Airways (31 Dec afternoon direct)', zh: '英國航空（12月31日下午直航）' },
          airline: 'British Airways',
          hub: null,
          legs: [
            { airline: 'British Airways', flight: 'BA6', from: 'HND', to: 'LHR', dep: '2026-12-31 13:15', arr: '2026-12-31 19:20' },
          ]
        },
        {
          id: 'tyo-lhr-3',
          label: { en: 'British Airways (1 Jan afternoon direct)', zh: '英國航空（1月1日下午直航）' },
          airline: 'British Airways',
          hub: null,
          legs: [
            { airline: 'British Airways', flight: 'BA6', from: 'HND', to: 'LHR', dep: '2027-01-01 13:15', arr: '2027-01-01 19:20' },
          ]
        },
        {
          id: 'tyo-lhr-5',
          label: { en: 'Finnair via Helsinki (31 Dec night)', zh: '芬蘭航空轉赫爾辛基（12月31日夜班）' },
          airline: 'Finnair',
          hub: 'HEL',
          legs: [
            { airline: 'Finnair', flight: 'AY62',   from: 'HND', to: 'HEL', dep: '2026-12-31 21:55', arr: '2027-01-01 04:00' },
            { airline: 'Finnair', flight: 'AY1331', from: 'HEL', to: 'LHR', dep: '2027-01-01 07:50', arr: '2027-01-01 09:10' },
          ]
        },
      ]
    },

    /* ─────────────────────────────────────────────────────
       ROUTE 9: Tokyo (HND) → Hong Kong (HKG)
       Thursday, 31 December 2026 (New Year's Eve)
       Source: tokyo_to_hkg_20261231.csv
    ───────────────────────────────────────────────────── */
    {
      id: 'tokyo-to-hkg',
      label: { en: 'Tokyo → Hong Kong', zh: '東京 → 香港' },
      date:  { en: 'Thu 31 Dec 2026 (depart)', zh: '2026年12月31日（出發）' },
      depart: '2026-12-31',
      arrive: '2026-12-31',
      options: [
        {
          id: 'tyo-hkg-4',
          label: { en: 'All Nippon Airways (morning departure)', zh: '全日空（上午班）' },
          airline: 'All Nippon Airways',
          hub: null,
          legs: [
            { airline: 'All Nippon Airways', flight: 'NH859', from: 'HND', to: 'HKG', dep: '2026-12-31 08:50', arr: '2026-12-31 12:55' },
          ]
        },
        {
          id: 'tyo-hkg-5',
          label: { en: 'HK Express (early morning)', zh: '香港快運（清晨班）' },
          airline: 'Hong Kong Express',
          hub: null,
          legs: [
            { airline: 'Hong Kong Express', flight: 'UO625', from: 'HND', to: 'HKG', dep: '2026-12-31 06:35', arr: '2026-12-31 10:50' },
          ]
        },
        {
          id: 'tyo-hkg-3',
          label: { en: 'Japan Airlines (morning departure)', zh: '日本航空（上午班）' },
          airline: 'Japan Airlines',
          hub: null,
          legs: [
            { airline: 'Japan Airlines', flight: 'JL29', from: 'HND', to: 'HKG', dep: '2026-12-31 09:35', arr: '2026-12-31 13:50' },
          ]
        },
        {
          id: 'tyo-hkg-1',
          label: { en: 'Cathay Pacific (morning departure)', zh: '國泰航空（上午班）' },
          airline: 'Cathay Pacific',
          hub: null,
          legs: [
            { airline: 'Cathay Pacific', flight: 'CX543', from: 'HND', to: 'HKG', dep: '2026-12-31 10:10', arr: '2026-12-31 14:25' },
          ]
        },
        {
          id: 'tyo-hkg-2',
          label: { en: 'Cathay Pacific (afternoon departure)', zh: '國泰航空（下午班）' },
          airline: 'Cathay Pacific',
          hub: null,
          legs: [
            { airline: 'Cathay Pacific', flight: 'CX549', from: 'HND', to: 'HKG', dep: '2026-12-31 16:00', arr: '2026-12-31 20:15' },
          ]
        },
      ]
    },

    /* ─────────────────────────────────────────────────────
       ROUTE 6: Hong Kong (HKG) → Edinburgh (EDI)
       Departing Thursday, 21 January 2027
       Source: hkg_to_edi_20270121.csv
    ───────────────────────────────────────────────────── */
    {
      id: 'hkg-to-edi',
      label: { en: 'Hong Kong → Edinburgh', zh: '香港 → 愛丁堡' },
      date:  { en: 'Thu 21 Jan 2027 (depart)', zh: '2027年1月21日（出發）' },
      depart: '2027-01-21',
      arrive: '2027-01-22',
      options: [
        {
          id: 'hkg-edi-2',
          label: { en: 'Cathay Pacific & British Airways via London (overnight)', zh: '國泰航空及英國航空轉倫敦（夜班）' },
          airline: 'Cathay Pacific / British Airways',
          hub: 'LHR',
          legs: [
            { airline: 'Cathay Pacific',  flight: 'CX 251',  from: 'HKG', to: 'LHR', dep: '2027-01-21 23:00', arr: '2027-01-22 05:25' },
            { airline: 'British Airways', flight: 'BA 1440', from: 'LHR', to: 'EDI', dep: '2027-01-22 07:35', arr: '2027-01-22 09:00' },
          ]
        },
        {
          id: 'hkg-edi-1',
          label: { en: 'British Airways via London (early arrival)', zh: '英國航空轉倫敦（早班抵達）' },
          airline: 'British Airways',
          hub: 'LHR',
          legs: [
            { airline: 'British Airways', flight: 'BA 32',   from: 'HKG', to: 'LHR', dep: '2027-01-21 22:45', arr: '2027-01-22 05:35' },
            { airline: 'British Airways', flight: 'BA 1440', from: 'LHR', to: 'EDI', dep: '2027-01-22 07:35', arr: '2027-01-22 09:00' },
          ]
        },
        {
          id: 'hkg-edi-3',
          label: { en: 'Cathay Pacific & British Airways via London (morning departure)', zh: '國泰航空及英國航空轉倫敦（早班出發）' },
          airline: 'Cathay Pacific / British Airways',
          hub: 'LHR',
          legs: [
            { airline: 'Cathay Pacific',  flight: 'CX 257',  from: 'HKG', to: 'LHR', dep: '2027-01-21 08:10', arr: '2027-01-21 15:00' },
            { airline: 'British Airways', flight: 'BA 1456', from: 'LHR', to: 'EDI', dep: '2027-01-21 17:05', arr: '2027-01-21 18:30' },
          ]
        },
        {
          id: 'hkg-edi-4',
          label: { en: 'Cathay Pacific & British Airways via London (midday departure)', zh: '國泰航空及英國航空轉倫敦（午班出發）' },
          airline: 'Cathay Pacific / British Airways',
          hub: 'LHR',
          legs: [
            { airline: 'Cathay Pacific',  flight: 'CX 239',  from: 'HKG', to: 'LHR', dep: '2027-01-21 10:40', arr: '2027-01-21 17:20' },
            { airline: 'British Airways', flight: 'BA 1464', from: 'LHR', to: 'EDI', dep: '2027-01-21 20:35', arr: '2027-01-21 22:00' },
          ]
        },
        {
          id: 'hkg-edi-5',
          label: { en: 'British Airways via London (mid-morning arrival)', zh: '英國航空轉倫敦（上午抵達）' },
          airline: 'British Airways',
          hub: 'LHR',
          legs: [
            { airline: 'British Airways', flight: 'BA 32',   from: 'HKG', to: 'LHR', dep: '2027-01-21 22:45', arr: '2027-01-22 05:35' },
            { airline: 'British Airways', flight: 'BA 1442', from: 'LHR', to: 'EDI', dep: '2027-01-22 08:55', arr: '2027-01-22 10:25' },
          ]
        },
      ]
    },

  ]
};
