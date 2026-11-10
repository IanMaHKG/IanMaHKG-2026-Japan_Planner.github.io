/**
 * @file flights-data.js
 * @description FLIGHTS DATA MODULE — Japan Winter Journey 2026.
 * Contains the top 5 flight options for each of the 7 routes (Tokyo round trip for 25–31 Dec 2026,
 * plus Hong Kong → Edinburgh on 14 Jan 2027), verified live on Google Flights.
 * Each route contains an array of options; each option contains
 * an ordered array of legs (one row per flight sector).
 */

window.FLIGHTS_DATA = {

  /* Winter (Dec/Jan) UTC offsets, in hours, for every airport used below.
     Single source for duration maths in js/features/flights.js and scripts/validate.mjs.
     Add a new airport here BEFORE using it in a leg. */
  tz: { EDI: 0, LHR: 0, HEL: 2, FRA: 1, MUC: 1, ZRH: 1, HKG: 8, HND: 9, NRT: 9, DOH: 3 },

  routes: [

    /* ─────────────────────────────────────────────────────
       ROUTE 1B: Edinburgh (EDI) → Tokyo (HND)
       Departing Thursday, 24 December 2026 (arriving Dec 25)
       Source: edi_to_tokyo_b_20261224.csv
    ───────────────────────────────────────────────────── */
    {
      id: 'edi-to-tokyo-b',
      label: { en: 'Edinburgh → Tokyo', zh: '愛丁堡 → 東京' },
      date:  { en: 'Thu 24 Dec 2026 (depart)', zh: '2026年12月24日（出發）' },
      arrive: '2026-12-25',
      options: [
        {
          id: 'edi-tyo-b1',
          label: { en: 'British Airways via London (early)', zh: '英國航空轉倫敦（早班）' },
          airline: 'British Airways',
          hub: 'LHR',
          legs: [
            { airline: 'British Airways', flight: 'BA1461', from: 'EDI', to: 'LHR', dep: '2026-12-24 06:20', arr: '2026-12-24 08:00' },
            { airline: 'British Airways', flight: 'BA5',    from: 'LHR', to: 'HND', dep: '2026-12-24 11:40', arr: '2026-12-25 10:25' },
          ]
        },
        {
          id: 'edi-tyo-b2',
          label: { en: 'Finnair via Helsinki', zh: '芬蘭航空轉赫爾辛基' },
          airline: 'Finnair',
          hub: 'HEL',
          legs: [
            { airline: 'Finnair', flight: 'AY1372', from: 'EDI', to: 'HEL', dep: '2026-12-24 09:55', arr: '2026-12-24 14:30' },
            { airline: 'Finnair', flight: 'AY61',   from: 'HEL', to: 'HND', dep: '2026-12-24 18:00', arr: '2026-12-25 14:25' },
          ]
        },
        {
          id: 'edi-tyo-b3',
          label: { en: 'British Airways via London (midday)', zh: '英國航空轉倫敦（中班）' },
          airline: 'British Airways',
          hub: 'LHR',
          legs: [
            { airline: 'British Airways', flight: 'BA1465', from: 'EDI', to: 'LHR', dep: '2026-12-24 07:25', arr: '2026-12-24 09:05' },
            { airline: 'British Airways', flight: 'BA5',    from: 'LHR', to: 'HND', dep: '2026-12-24 11:40', arr: '2026-12-25 10:25' },
          ]
        },
        {
          id: 'edi-tyo-b4',
          label: { en: 'BA + Japan Airlines via London', zh: '英國航空 + 日本航空轉倫敦' },
          airline: 'Japan Airlines',
          hub: 'LHR',
          legs: [
            { airline: 'British Airways', flight: 'BA1447', from: 'EDI', to: 'LHR', dep: '2026-12-24 13:35', arr: '2026-12-24 15:10' },
            { airline: 'Japan Airlines',  flight: 'JL44',   from: 'LHR', to: 'HND', dep: '2026-12-24 18:30', arr: '2026-12-25 17:20' },
          ]
        },
        {
          id: 'edi-tyo-b5',
          label: { en: 'Finnair + JAL via Helsinki', zh: '芬蘭航空 + 日本航空轉赫爾辛基' },
          airline: 'Finnair',
          hub: 'HEL',
          legs: [
            { airline: 'Finnair',        flight: 'AY1372', from: 'EDI', to: 'HEL', dep: '2026-12-24 09:55', arr: '2026-12-24 14:30' },
            { airline: 'Japan Airlines', flight: 'JL48',   from: 'HEL', to: 'HND', dep: '2026-12-24 17:30', arr: '2026-12-25 14:25' },
          ]
        },
      ]
    },

    /* ─────────────────────────────────────────────────────
       ROUTE 2B: London Heathrow (LHR) → Tokyo (HND)
       Departing Thursday, 24 December 2026 (arriving Dec 25)
       Source: lhr_to_tokyo_b_20261224.csv
    ───────────────────────────────────────────────────── */
    {
      id: 'lhr-to-tokyo-b',
      label: { en: 'London Heathrow → Tokyo', zh: '倫敦希斯路 → 東京' },
      date:  { en: 'Thu 24 Dec 2026 (depart)', zh: '2026年12月24日（出發）' },
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
          id: 'lhr-tyo-b3',
          label: { en: 'All Nippon Airways (direct evening)', zh: '全日空（直航傍晚班）' },
          airline: 'All Nippon Airways',
          hub: null,
          legs: [
            { airline: 'All Nippon Airways', flight: 'NH212', from: 'LHR', to: 'HND', dep: '2026-12-24 19:00', arr: '2026-12-25 17:55' },
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
      ]
    },

    /* ─────────────────────────────────────────────────────
       ROUTE 3B: Hong Kong (HKG) → Tokyo (HND)
       Departing Friday, 25 December 2026 (Christmas Day)
       Source: hkg_to_tokyo_b_20261225.csv
    ───────────────────────────────────────────────────── */
    {
      id: 'hkg-to-tokyo-b',
      label: { en: 'Hong Kong → Tokyo', zh: '香港 → 東京' },
      date:  { en: 'Fri 25 Dec 2026 (depart)', zh: '2026年12月25日（出發）' },
      arrive: '2026-12-25',
      options: [
        {
          id: 'hkg-tyo-b1',
          label: { en: 'Cathay Pacific (morning departure)', zh: '國泰航空（上午班）' },
          airline: 'Cathay Pacific',
          hub: null,
          legs: [
            { airline: 'Cathay Pacific', flight: 'CX548', from: 'HKG', to: 'HND', dep: '2026-12-25 08:55', arr: '2026-12-25 13:45' },
          ]
        },
        {
          id: 'hkg-tyo-b2',
          label: { en: 'Cathay Pacific (afternoon departure)', zh: '國泰航空（下午班）' },
          airline: 'Cathay Pacific',
          hub: null,
          legs: [
            { airline: 'Cathay Pacific', flight: 'CX542', from: 'HKG', to: 'HND', dep: '2026-12-25 16:30', arr: '2026-12-25 21:15' },
          ]
        },
        {
          id: 'hkg-tyo-b3',
          label: { en: 'All Nippon Airways (early red-eye)', zh: '全日空（清晨班）' },
          airline: 'All Nippon Airways',
          hub: null,
          legs: [
            { airline: 'All Nippon Airways', flight: 'NH814', from: 'HKG', to: 'HND', dep: '2026-12-25 00:15', arr: '2026-12-25 05:00' },
          ]
        },
        {
          id: 'hkg-tyo-b4',
          label: { en: 'All Nippon Airways (afternoon departure)', zh: '全日空（下午班）' },
          airline: 'All Nippon Airways',
          hub: null,
          legs: [
            { airline: 'All Nippon Airways', flight: 'NH860', from: 'HKG', to: 'HND', dep: '2026-12-25 14:20', arr: '2026-12-25 19:15' },
          ]
        },
        {
          id: 'hkg-tyo-b5',
          label: { en: 'Japan Airlines (afternoon departure)', zh: '日本航空（下午班）' },
          airline: 'Japan Airlines',
          hub: null,
          legs: [
            { airline: 'Japan Airlines', flight: 'JL26', from: 'HKG', to: 'HND', dep: '2026-12-25 15:35', arr: '2026-12-25 20:25' },
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

        /* ─────────────────────────────────────────────────────
       ROUTE 7: Tokyo (HND) → Edinburgh (EDI)
       Thursday, 31 December 2026 (New Year's Eve)
       Source: tokyo_to_edi_20261231.csv
    ───────────────────────────────────────────────────── */
    {
      id: 'tokyo-to-edi',
      label: { en: 'Tokyo → Edinburgh', zh: '東京 → 愛丁堡' },
      date:  { en: 'Thu 31 Dec 2026', zh: '2026年12月31日' },
      depart: '2026-12-31',
      arrive: '2026-12-31',
      options: [
        {
          id: 'tyo-edi-1',
          label: { en: 'British Airways via London (quick connection)', zh: '英國航空轉倫敦（快速中轉）' },
          airline: 'British Airways',
          hub: 'LHR',
          legs: [
            { airline: 'British Airways', flight: 'BA8',    from: 'HND', to: 'LHR', dep: '2026-12-31 09:35', arr: '2026-12-31 15:35' },
            { airline: 'British Airways', flight: 'BA1456', from: 'LHR', to: 'EDI', dep: '2026-12-31 17:15', arr: '2026-12-31 18:40' },
          ]
        },
        {
          id: 'tyo-edi-2',
          label: { en: 'JAL + Finnair via Helsinki', zh: '日本航空 + 芬蘭航空轉赫爾辛基' },
          airline: 'Japan Airlines',
          hub: 'HEL',
          legs: [
            { airline: 'Japan Airlines', flight: 'JL47',   from: 'HND', to: 'HEL', dep: '2026-12-31 08:20', arr: '2026-12-31 14:40' },
            { airline: 'Finnair',        flight: 'AY1373', from: 'HEL', to: 'EDI', dep: '2026-12-31 16:55', arr: '2026-12-31 17:50' },
          ]
        },
        {
          id: 'tyo-edi-3',
          label: { en: 'British Airways via London (evening arrival)', zh: '英國航空轉倫敦（傍晚抵達）' },
          airline: 'British Airways',
          hub: 'LHR',
          legs: [
            { airline: 'British Airways', flight: 'BA8',    from: 'HND', to: 'LHR', dep: '2026-12-31 09:35', arr: '2026-12-31 15:35' },
            { airline: 'British Airways', flight: 'BA1460', from: 'LHR', to: 'EDI', dep: '2026-12-31 18:50', arr: '2026-12-31 20:15' },
          ]
        },
        {
          id: 'tyo-edi-4',
          label: { en: 'JAL + BA via London', zh: '日本航空 + 英國航空轉倫敦' },
          airline: 'Japan Airlines',
          hub: 'LHR',
          legs: [
            { airline: 'Japan Airlines',  flight: 'JL43',   from: 'HND', to: 'LHR', dep: '2026-12-31 09:50', arr: '2026-12-31 15:15' },
            { airline: 'British Airways', flight: 'BA1460', from: 'LHR', to: 'EDI', dep: '2026-12-31 18:50', arr: '2026-12-31 20:15' },
          ]
        },
        {
          id: 'tyo-edi-5',
          label: { en: 'Qatar Airways via Doha', zh: '卡塔爾航空轉多哈' },
          airline: 'Qatar Airways',
          hub: 'DOH',
          legs: [
            { airline: 'Qatar Airways', flight: 'QR813', from: 'HND', to: 'DOH', dep: '2026-12-31 00:25', arr: '2026-12-31 07:05' },
            { airline: 'Qatar Airways', flight: 'QR29',  from: 'DOH', to: 'EDI', dep: '2026-12-31 07:55', arr: '2026-12-31 12:35' },
          ]
        },
      ]
    },

    /* ─────────────────────────────────────────────────────
       ROUTE 8: Tokyo (HND) → London Heathrow (LHR)
       Thursday, 31 December 2026 (New Year's Eve)
       Source: tokyo_to_lhr_20261231.csv
    ───────────────────────────────────────────────────── */
    {
      id: 'tokyo-to-lhr',
      label: { en: 'Tokyo → London Heathrow', zh: '東京 → 倫敦希斯路' },
      date:  { en: 'Thu 31 Dec 2026', zh: '2026年12月31日' },
      depart: '2026-12-31',
      arrive: '2026-12-31',
      options: [
        {
          id: 'tyo-lhr-1',
          label: { en: 'British Airways (direct morning)', zh: '英國航空（直航上午班）' },
          airline: 'British Airways',
          hub: null,
          legs: [
            { airline: 'British Airways', flight: 'BA8', from: 'HND', to: 'LHR', dep: '2026-12-31 09:35', arr: '2026-12-31 15:35' },
          ]
        },
        {
          id: 'tyo-lhr-2',
          label: { en: 'British Airways (direct afternoon)', zh: '英國航空（直航下午班）' },
          airline: 'British Airways',
          hub: null,
          legs: [
            { airline: 'British Airways', flight: 'BA6', from: 'HND', to: 'LHR', dep: '2026-12-31 13:15', arr: '2026-12-31 19:20' },
          ]
        },
        {
          id: 'tyo-lhr-3',
          label: { en: 'All Nippon Airways (direct morning)', zh: '全日空（直航上午班）' },
          airline: 'All Nippon Airways',
          hub: null,
          legs: [
            { airline: 'All Nippon Airways', flight: 'NH211', from: 'HND', to: 'LHR', dep: '2026-12-31 10:05', arr: '2026-12-31 15:45' },
          ]
        },
        {
          id: 'tyo-lhr-4',
          label: { en: 'Japan Airlines (direct morning)', zh: '日本航空（直航上午班）' },
          airline: 'Japan Airlines',
          hub: null,
          legs: [
            { airline: 'Japan Airlines', flight: 'JL43', from: 'HND', to: 'LHR', dep: '2026-12-31 09:50', arr: '2026-12-31 15:15' },
          ]
        },
        {
          id: 'tyo-lhr-5',
          label: { en: 'Japan Airlines (direct overnight)', zh: '日本航空（直航紅眼班）' },
          airline: 'Japan Airlines',
          hub: null,
          legs: [
            { airline: 'Japan Airlines', flight: 'JL41', from: 'HND', to: 'LHR', dep: '2026-12-31 01:00', arr: '2026-12-31 06:25' },
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
      ]
    },

  ]
};
