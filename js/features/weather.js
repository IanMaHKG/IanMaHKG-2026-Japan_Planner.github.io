/**
 * @file weather.js
 * @description LIVE WEATHER FORECAST — Open-Meteo Free API integration
 * Adapted from Hamburg Planner pattern.
 * Fetches live daily forecast for each region when within 16 days of departure.
 * Silently falls back to curated static seasonal averages when outside the window or offline.
 */

(function () {
  'use strict';

  // Regional coordinates map across Japan itinerary
  const REGION_COORDS = {
    tokyo:    { lat: 35.6895, lon: 139.6917, name: 'Tokyo' },
    fuji:     { lat: 35.5031, lon: 138.7646, name: 'Kawaguchiko' },
    hakone:   { lat: 35.2333, lon: 139.1069, name: 'Hakone' },
    coastal:  { lat: 35.4437, lon: 139.6380, name: 'Yokohama/Kamakura' },
    kansai:   { lat: 34.9858, lon: 135.7588, name: 'Kyoto/Osaka' }
  };

  // WMO weather code mapping to emoji and bilingual conditions
  const WMO_MAP = {
    0:  { icon: '☀️', en: 'Clear Sky', zh: '晴空萬里' },
    1:  { icon: '🌤️', en: 'Mainly Clear', zh: '天晴' },
    2:  { icon: '⛅', en: 'Partly Cloudy', zh: '多雲時晴' },
    3:  { icon: '☁️', en: 'Overcast', zh: '陰天' },
    45: { icon: '🌫️', en: 'Foggy', zh: '有霧' },
    48: { icon: '🌫️', en: 'Rime Fog', zh: '薄霧' },
    51: { icon: '🌦️', en: 'Light Drizzle', zh: '細雨' },
    53: { icon: '🌦️', en: 'Moderate Drizzle', zh: '微雨' },
    55: { icon: '🌧️', en: 'Dense Drizzle', zh: '毛毛雨' },
    61: { icon: '🌧️', en: 'Slight Rain', zh: '小雨' },
    63: { icon: '🌧️', en: 'Moderate Rain', zh: '中雨' },
    65: { icon: '🌧️', en: 'Heavy Rain', zh: '大雨' },
    71: { icon: '🌨️', en: 'Slight Snow', zh: '小雪' },
    73: { icon: '❄️', en: 'Moderate Snow', zh: '降雪' },
    75: { icon: '❄️', en: 'Heavy Snow', zh: '大雪' },
    77: { icon: '🌨️', en: 'Snow Grains', zh: '雪粒' },
    80: { icon: '🌦️', en: 'Rain Showers', zh: '局部陣雨' },
    81: { icon: '🌧️', en: 'Moderate Showers', zh: '陣雨' },
    82: { icon: '⛈️', en: 'Violent Showers', zh: '強烈陣雨' },
    85: { icon: '🌨️', en: 'Snow Showers', zh: '陣雪' },
    86: { icon: '❄️', en: 'Heavy Snow Showers', zh: '強陣雪' },
    95: { icon: '⛈️', en: 'Thunderstorm', zh: '雷暴' }
  };

  function parseDateToIso(dateStr) {
    if (!dateStr) return null;
    const parts = dateStr.trim().split(/\s+/);
    if (parts.length < 2) return null;
    const month = parts[0];
    const day = parts[1].padStart(2, '0');
    const year = month === 'Jan' ? '2027' : '2026';
    const m = month === 'Jan' ? '01' : '12';
    return `${year}-${m}-${day}`;
  }

  function getDayCoords(day) {
    if (day.id === 'day-6' && day.region === 'fuji') return REGION_COORDS.hakone;
    if (day.id === 'day-4' && day.region === 'fuji' && day.title.en.includes('Hakone')) return REGION_COORDS.hakone;
    return REGION_COORDS[day.region] || REGION_COORDS.tokyo;
  }

  /**
   * Fetch live weather from Open-Meteo
   * @param {Object} [opts] - { plan: 'plan-a'|'plan-b', simulate: boolean }
   */
  async function fetchLiveWeather(opts) {
    opts = opts || {};
    const plan = opts.plan || localStorage.getItem('user-plan') || 'plan-a';
    const itin = (plan === 'plan-b' ? window.ITINERARY_DATA_B : window.ITINERARY_DATA_A) || window.ITINERARY_DATA;
    if (!Array.isArray(itin) || itin.length === 0) return;

    const startDateIso = parseDateToIso(itin[0].date);
    const endDateIso   = parseDateToIso(itin[itin.length - 1].date);
    if (!startDateIso || !endDateIso) return;

    // Open-Meteo free forecast limit: 16 days ahead
    const now = new Date();
    const maxHorizon = new Date(now.getTime() + 16 * 24 * 60 * 60 * 1000);
    const tripStart = new Date(startDateIso + 'T00:00:00');

    const isSimulate = !!opts.simulate;
    const isWithinWindow = tripStart <= maxHorizon;

    if (!isWithinWindow && !isSimulate) {
      console.info('[weather] Live Open-Meteo forecast activates 16 days before departure. Displaying curated winter forecast.');
      return;
    }

    // Determine query date range (if simulated test, query today through next few days)
    let qStart = startDateIso;
    let qEnd = endDateIso;
    if (isSimulate) {
      const today = now.toISOString().slice(0, 10);
      const future = new Date(now.getTime() + (itin.length - 1) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      qStart = today;
      qEnd = future;
    }

    // Group days by region to minimize HTTP requests
    const regionMap = new Map();
    itin.forEach((day, idx) => {
      const coords = getDayCoords(day);
      const key = `${coords.lat},${coords.lon}`;
      if (!regionMap.has(key)) {
        regionMap.set(key, { coords, days: [] });
      }
      regionMap.get(key).days.push({ day, idx });
    });

    let updatedCount = 0;
    const timestamp = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    await Promise.all(
      Array.from(regionMap.values()).map(async ({ coords, days }) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Asia%2FTokyo&start_date=${qStart}&end_date=${qEnd}`;

        let controller = null;
        let timeoutId = null;
        if (typeof AbortController !== 'undefined') {
          controller = new AbortController();
          timeoutId = setTimeout(() => controller.abort(), 4000);
        }

        try {
          const res = await fetch(url, controller ? { signal: controller.signal } : {});
          if (timeoutId) clearTimeout(timeoutId);
          if (!res.ok) return;
          const data = await res.json();
          const daily = data && data.daily;
          if (!daily || !Array.isArray(daily.time) || daily.time.length === 0) return;

          days.forEach(({ day, idx }) => {
            const dateIso = isSimulate ? daily.time[idx % daily.time.length] : parseDateToIso(day.date);
            const timeIdx = daily.time.indexOf(dateIso);
            if (timeIdx === -1) return;

            const maxTemp = daily.temperature_2m_max && daily.temperature_2m_max[timeIdx];
            const minTemp = daily.temperature_2m_min && daily.temperature_2m_min[timeIdx];
            const code    = daily.weather_code && daily.weather_code[timeIdx];

            if (maxTemp != null && minTemp != null) {
              if (!day.weather) day.weather = {};
              day.weather.high = `${Math.round(maxTemp)}°C`;
              day.weather.low  = `${Math.round(minTemp)}°C`;
              day.weather._live = true;
              day.weather._liveTimestamp = timestamp;

              if (code != null && WMO_MAP[code]) {
                day.weather.icon = WMO_MAP[code].icon;
                day.weather.condition = {
                  en: WMO_MAP[code].en,
                  zh: WMO_MAP[code].zh
                };
              }
              updatedCount++;
            }
          });
        } catch (err) {
          if (timeoutId) clearTimeout(timeoutId);
          // Graceful fallback: keep existing static forecast without breaking page
          if (err && err.name !== 'AbortError') {
            console.info(`[weather] Live forecast for ${coords.name} unavailable (${err.message || 'offline'}), keeping curated forecast.`);
          }
        }
      })
    );

    if (updatedCount > 0) {
      // Patch badges in place: re-rendering would close the open day card and reset the region filter
      itin.forEach(day => {
        const el = document.querySelector('#' + day.id + ' .day-weather');
        if (el && day.weather) el.outerHTML = weatherBadgeHtml(day);
      });
      console.info(`[weather] Successfully updated ${updatedCount} day card(s) with live Open-Meteo forecast (${timestamp}).`);
    }
  }

  // Expose globally
  if (typeof window !== 'undefined') {
    window.fetchLiveWeather = fetchLiveWeather;
  }
})();
