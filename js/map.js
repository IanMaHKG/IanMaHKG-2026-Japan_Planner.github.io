/**
 * @file map.js
 * @description MAP MODULE — renders interactive maps using MapLibre GL JS + OpenFreeMap.
 */

/* ═══════════════════════════════════════════════════
   STYLE CONSTANTS & GLOBAL MAP REGISTRY
   ═══════════════════════════════════════════════════ */

const STYLE_LIGHT = 'https://tiles.openfreemap.org/styles/positron';
const STYLE_DARK  = 'https://tiles.openfreemap.org/styles/fiord';

/** Returns the correct OpenFreeMap style URL for the current theme. */
function getStyle() {
  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? STYLE_DARK
    : STYLE_LIGHT;
}

/** Returns true when dark mode is currently active. */
function isDarkMode() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

/** Resolves a CSS custom property from palette.css at runtime. */
function getPaletteColor(varName, fallbackColor) {
  if (typeof window !== 'undefined' && window.getComputedStyle) {
    const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    if (val) return val;
  }
  return fallbackColor;
}

/** Global registry — tracks every live MapLibre instance for theme switching. */
let _routeMap = null;
const _dayMaps     = {};   // dayId → maplibregl.Map instance
const _dayMarkers  = {};   // dayId → [{ popup, point }] for langchange updates

/** Module-level themechange listener */
window.addEventListener('themechange', (e) => {
  const s = e.detail.theme === 'dark' ? STYLE_DARK : STYLE_LIGHT;
  if (_routeMap) _routeMap.setStyle(s);
  Object.values(_dayMaps).forEach(m => m.setStyle(s));
});

/** Single module-level langchange listener */
window.addEventListener('langchange', (e) => {
  const l = e.detail.lang === 'zh-hk' ? 'zh' : 'en';
  Object.entries(_dayMarkers).forEach(([, refs]) => {
    refs.forEach(({ popup, point }) => {
      popup.setHTML(`<strong>${point.label[l]}</strong>`);
    });
  });
});

/* ═══════════════════════════════════════════════════
   ROUTE OVERVIEW MAP
   ═══════════════════════════════════════════════════ */

function initRouteMap() {
  const mapEl = document.getElementById('route-map');
  if (!mapEl || typeof maplibregl === 'undefined') return;
  const data = (typeof window !== 'undefined' && window.SITE_DATA) ? window.SITE_DATA : null;
  if (!data || !data.overview) return;

  const stops = data.overview.routeStops;

  const map = new maplibregl.Map({
    container: 'route-map',
    style: getStyle(),
    center: [137.5, 35.1],
    zoom: 6,
    scrollZoom: false,
    attributionControl: true
  });

  _routeMap = map;

  const getLang = () => document.body.classList.contains('lang-zh-hk') ? 'zh' : 'en';
  let markersAdded = false;
  const markerRefs = [];

  const coords = stops.map(s => [s.lng, s.lat]);
  const bounds = coords.reduce(
    (b, c) => b.extend(c),
    new maplibregl.LngLatBounds(coords[0], coords[0])
  );

  const addLine = (id, lineCoords, color, width, opacity, dashArray) => {
    map.addSource(id, {
      type: 'geojson',
      data: { type: 'Feature', geometry: { type: 'LineString', coordinates: lineCoords } }
    });
    const paint = { 'line-color': color, 'line-width': width, 'line-opacity': opacity };
    if (dashArray) paint['line-dasharray'] = dashArray;
    map.addLayer({
      id, type: 'line', source: id,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint
    });
  };

  const addRouteLayers = () => {
    const dark = isDarkMode();

    // Tokyo → Kawaguchiko → Hakone → Nagoya (self-drive, navy/sky dashed)
    addLine('route-drive',
      stops.slice(0, 4).map(s => [s.lng, s.lat]),
      getPaletteColor('--route-drive', dark ? '#60BBFF' : '#075AAA'), 3, 0.85, [3, 2]);

    // Nagoya → Kyoto (Shinkansen, red solid)
    addLine('route-shinkansen',
      [[stops[3].lng, stops[3].lat], [stops[4].lng, stops[4].lat]],
      getPaletteColor('--route-shinkansen', dark ? '#FF7070' : '#BA0C2F'), 3, 0.85);

    // Kyoto → Nara → Osaka (local train, gold solid)
    addLine('route-local',
      stops.slice(4).map(s => [s.lng, s.lat]),
      getPaletteColor('--route-local', dark ? '#F5D070' : '#C9A96E'), 3, 0.85);

    map.fitBounds(bounds, { padding: 50, duration: 0 });
  };

  let mapReady = false;
  map.on('load', () => {
    mapReady = true;
    addRouteLayers();

    markersAdded = true;
    stops.forEach((stop, i) => {
      const el = document.createElement('div');
      el.className = `custom-marker ${stop.markerClass}`;
      el.textContent = stop.label;

      const lang = getLang();
      const popup = new maplibregl.Popup({ maxWidth: '240px', offset: 20 })
        .setHTML(`
          <h4>${stop.name[lang]}</h4>
          <p>${stop.desc[lang]}</p>
          <span class="popup-days">${stop.days[lang]}</span>
        `);

      const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat([stop.lng, stop.lat])
        .setPopup(popup)
        .addTo(map);

      markerRefs.push({ marker, popup, stop });

      if (i === 0) setTimeout(() => marker.togglePopup(), 1000);
    });
  });

  map.on('style.load', () => {
    if (!mapReady) return;
    addRouteLayers();
  });

  window.addEventListener('langchange', (e) => {
    const l = e.detail.lang === 'zh-hk' ? 'zh' : 'en';
    markerRefs.forEach(({ popup, stop }) => {
      popup.setHTML(`
        <h4>${stop.name[l]}</h4>
        <p>${stop.desc[l]}</p>
        <span class="popup-days">${stop.days[l]}</span>
      `);
    });
  });

  map.once('click', () => map.scrollZoom.enable());
  window.addEventListener('resize', () => map.resize());
}

/* ═══════════════════════════════════════════════════
   PER-DAY MINI MAP
   ═══════════════════════════════════════════════════ */

function initDayMap(dayId) {
  if (typeof maplibregl === 'undefined') return;
  const itinData = (typeof window !== 'undefined' && window.ITINERARY_DATA) ? window.ITINERARY_DATA : null;
  if (!itinData) return;

  const mapEl = document.getElementById('day-map-' + dayId);
  if (!mapEl) return;

  if (mapEl.dataset.mapInited) return;
  mapEl.dataset.mapInited = 'true';

  const day = itinData.find(d => d.id === dayId);
  if (!day) return;

  const points = [];
  day.blocks.forEach(block => {
    if (block.activity && block.activity.locations) {
      block.activity.locations.forEach(loc => points.push(loc));
    }
  });

  if (points.length === 0) {
    mapEl.style.display = 'none';
    return;
  }

  const centre = [
    points.reduce((s, p) => s + p.lng, 0) / points.length,
    points.reduce((s, p) => s + p.lat, 0) / points.length
  ];

  const map = new maplibregl.Map({
    container: mapEl,
    style: getStyle(),
    center: centre,
    zoom: 12,
    scrollZoom: false,
    attributionControl: true
  });

  _dayMaps[dayId] = map;
  mapEl._leafletMap = { invalidateSize: () => map.resize() };

  const getLang = () => document.body.classList.contains('lang-zh-hk') ? 'zh' : 'en';

  const fitAll = () => {
    if (points.length === 1) {
      map.flyTo({ center: [points[0].lng, points[0].lat], zoom: 14, duration: 0 });
    } else {
      const b = points.reduce(
        (acc, p) => acc.extend([p.lng, p.lat]),
        new maplibregl.LngLatBounds([points[0].lng, points[0].lat], [points[0].lng, points[0].lat])
      );
      map.fitBounds(b, { padding: 50, maxZoom: 15, duration: 0 });
    }
  };

  mapEl._leafletFitAll = fitAll;

  const addDayLayers = () => {
    if (points.length < 2) return;
    const dark = isDarkMode();
    map.addSource('day-route-' + dayId, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: { type: 'LineString', coordinates: points.map(p => [p.lng, p.lat]) }
      }
    });
    map.addLayer({
      id: 'day-route-' + dayId,
      type: 'line',
      source: 'day-route-' + dayId,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: {
        'line-color':     getPaletteColor('--route-drive', dark ? '#60BBFF' : '#075AAA'),
        'line-width':     2.5,
        'line-opacity':   dark ? 0.85 : 0.65,
        'line-dasharray': [2, 2]
      }
    });
  };

  let markersAdded = false;
  const markerRefs = [];
  let dayMapReady = false;

  map.on('load', () => {
    dayMapReady = true;
    addDayLayers();

    markersAdded = true;
    const lang = getLang();
    points.forEach((point, idx) => {
      const el = document.createElement('div');
      el.className = 'day-map-marker';
      el.innerHTML = `<span class="day-map-marker-num">${idx + 1}</span>`;

      const popup = new maplibregl.Popup({
        maxWidth: '200px',
        closeButton: false,
        offset: 14
      }).setHTML(`<strong>${point.label[lang]}</strong>`);

      const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat([point.lng, point.lat])
        .setPopup(popup)
        .addTo(map);

      markerRefs.push({ marker, popup, point });
    });

    _dayMarkers[dayId] = markerRefs;
    setTimeout(() => { map.resize(); fitAll(); }, 30);
  });

  map.on('style.load', () => {
    if (!dayMapReady) return;
    addDayLayers();
    setTimeout(() => { map.resize(); fitAll(); }, 30);
  });

  map.once('click', () => map.scrollZoom.enable());
}

function destroyDayMap(dayId) {
  const map = _dayMaps[dayId];
  if (!map) return;
  map.remove();
  delete _dayMaps[dayId];
  delete _dayMarkers[dayId];

  const mapEl = document.getElementById('day-map-' + dayId);
  if (mapEl) {
    delete mapEl.dataset.mapInited;
    mapEl._leafletMap   = undefined;
    mapEl._leafletFitAll = undefined;
  }
}

if (typeof window !== 'undefined') {
  window.initRouteMap = initRouteMap;
  window.initDayMap   = initDayMap;
  window.destroyDayMap = destroyDayMap;
}
