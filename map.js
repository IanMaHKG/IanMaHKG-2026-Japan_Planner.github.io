/**
 * @file map.js
 * @description MAP MODULE — renders interactive maps using MapLibre GL JS + OpenFreeMap.
 *
 * LIBRARY : MapLibre GL JS v4  (open source, WebGL, no API key required)
 * TILES   : OpenFreeMap        (free, no account, no rate limits)
 *
 * STYLES (switched by dark mode toggle via 'themechange' CustomEvent):
 *   Light → positron  (https://tiles.openfreemap.org/styles/positron)
 *   Dark  → fiord     (https://tiles.openfreemap.org/styles/fiord)
 *
 * ⚠️  COORDINATE ORDER: MapLibre uses [longitude, latitude] (GeoJSON convention)
 *     throughout — the OPPOSITE of Leaflet's [lat, lng].
 *
 * TWO MAPS
 * ────────
 * 1. initRouteMap()   Fixed route overview in #route-map (called once on load).
 * 2. initDayMap(id)   Lazy per-day mini-map inside each accordion card;
 *                     called from toggleDay() in render.js via transitionend.
 *
 * THEME SWITCHING
 * ───────────────
 * Both maps use two separate event strategies:
 *   map.on('load')        — fires once on initial load; adds layers + markers.
 *   map.on('style.load')  — fires after every setStyle() call (theme change only,
 *                           guarded by a `mapReady` flag); re-adds GeoJSON layers.
 * HTML-element markers survive setStyle() natively so they are never re-added.
 * A `markersAdded` flag is an extra guard against any edge-case double-add.
 * Line colours are chosen based on current theme (brighter on dark fiord tiles).
 *
 * RENDER.JS INTERFACE (backward-compatible shims)
 * ────────────────────────────────────────────────
 * Day map containers expose:
 *   mapEl._leafletMap.invalidateSize()  →  map.resize()
 *   mapEl._leafletFitAll()              →  fitAll()
 *
 * DATA CONTRACTS
 * ──────────────
 * routeStops (site-data.js):
 *   { label, name:{en,zh}, desc:{en,zh}, days:{en,zh}, lat, lng, markerClass }
 * day locations (itinerary-data.js):
 *   locations: [ { lat, lng, label:{en,zh} } ]
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

/** Global registry — tracks every live MapLibre instance for theme switching. */
let _routeMap = null;
const _dayMaps     = {};   // dayId → maplibregl.Map instance
const _dayMarkers  = {};   // dayId → [{ popup, point }] for langchange updates

/**
 * Module-level themechange listener.
 * Calls setStyle() on all registered maps; their 'style.load' handlers
 * then re-add GeoJSON sources/layers automatically.
 */
window.addEventListener('themechange', (e) => {
  const s = e.detail.theme === 'dark' ? STYLE_DARK : STYLE_LIGHT;
  if (_routeMap) _routeMap.setStyle(s);
  Object.values(_dayMaps).forEach(m => m.setStyle(s));
});

/**
 * Single module-level langchange listener — covers ALL day maps.
 * Registered once here instead of once-per-day inside initDayMap(),
 * which would accumulate 12 listeners as cards are opened.
 */
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

/**
 * initRouteMap()
 * Called once by script.js DOMContentLoaded.
 * Reads SITE_DATA.overview.routeStops and renders the 7-stop Japan route.
 */
function initRouteMap() {
  const mapEl = document.getElementById('route-map');
  if (!mapEl || typeof maplibregl === 'undefined') return;
  if (!window.SITE_DATA || !window.SITE_DATA.overview) return;

  const stops = window.SITE_DATA.overview.routeStops;

  const map = new maplibregl.Map({
    container: 'route-map',
    style: getStyle(),    // respects current theme on initial load
    center: [137.5, 35.1],
    zoom: 6,
    scrollZoom: false,
    attributionControl: true
  });

  _routeMap = map;

  /* ── Marker state (HTML elements survive setStyle, so add only once) ── */
  const getLang    = () => document.body.classList.contains('lang-zh-hk') ? 'zh' : 'en';
  let markersAdded = false;
  const markerRefs = [];

  /* ── Shared bounds calculation ── */
  const coords = stops.map(s => [s.lng, s.lat]);
  const bounds = coords.reduce(
    (b, c) => b.extend(c),
    new maplibregl.LngLatBounds(coords[0], coords[0])
  );

  /* ── Helper: add a named GeoJSON LineString layer ── */
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

  /* ── Add/refresh all GeoJSON layers (called on initial load AND theme change) ── */
  const addRouteLayers = () => {
    const dark = isDarkMode();

    // Tokyo → Kawaguchiko → Hakone → Nagoya (self-drive, navy/sky dashed)
    addLine('route-drive',
      stops.slice(0, 4).map(s => [s.lng, s.lat]),
      dark ? '#60BBFF' : '#075AAA', 3, 0.85, [3, 2]);

    // Nagoya → Kyoto (Shinkansen, red solid)
    addLine('route-shinkansen',
      [[stops[3].lng, stops[3].lat], [stops[4].lng, stops[4].lat]],
      dark ? '#FF7070' : '#BA0C2F', 3, 0.85);

    // Kyoto → Nara → Osaka (local train, gold solid)
    addLine('route-local',
      stops.slice(4).map(s => [s.lng, s.lat]),
      dark ? '#F5D070' : '#C9A96E', 3, 0.85);

    // Fit all stops into view
    map.fitBounds(bounds, { padding: 50, duration: 0 });
  };

  /* ── INITIAL LOAD — fires once when map + style + resources are ready ── */
  let mapReady = false;
  map.on('load', () => {
    mapReady = true;
    addRouteLayers();

    // Add markers once — they survive all subsequent style changes
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

      // Open Tokyo popup as welcome state
      if (i === 0) setTimeout(() => marker.togglePopup(), 1000);
    });
  });

  /* ── THEME CHANGE — re-adds GeoJSON layers after setStyle clears them ── */
  map.on('style.load', () => {
    if (!mapReady) return;   // skip: the 'load' event above handles initial setup
    addRouteLayers();        // re-add lines with new theme-appropriate colours
    // Markers (HTML elements) are already on the map — no re-add needed
  });

  // Re-bind popup text on language switch
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

  // Enable scroll zoom after first click (prevents accidental page hijack)
  map.once('click', () => map.scrollZoom.enable());

  // Resize on window resize
  window.addEventListener('resize', () => map.resize());
}


/* ═══════════════════════════════════════════════════
   PER-DAY MINI MAP
   ═══════════════════════════════════════════════════ */

/**
 * initDayMap(dayId)
 * Lazily initialised when a day accordion card opens (called from render.js
 * toggleDay() via a transitionend listener — container is at full size).
 */
function initDayMap(dayId) {
  if (typeof maplibregl === 'undefined' || !window.ITINERARY_DATA) return;

  const mapEl = document.getElementById('day-map-' + dayId);
  if (!mapEl) return;

  // Guard: only initialise once.
  if (mapEl.dataset.mapInited) return;
  mapEl.dataset.mapInited = 'true';

  // Collect all location points for this day
  const day = window.ITINERARY_DATA.find(d => d.id === dayId);
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

  // Centre = average of all point coordinates [lng, lat]
  const centre = [
    points.reduce((s, p) => s + p.lng, 0) / points.length,
    points.reduce((s, p) => s + p.lat, 0) / points.length
  ];

  const map = new maplibregl.Map({
    container: mapEl,
    style: getStyle(),    // respects current theme on first open
    center: centre,
    zoom: 12,
    scrollZoom: false,
    attributionControl: true
  });

  // Register for global theme switching
  _dayMaps[dayId] = map;

  // Shim: Leaflet-compatible interface for render.js re-open handler
  mapEl._leafletMap = { invalidateSize: () => map.resize() };

  const getLang = () => document.body.classList.contains('lang-zh-hk') ? 'zh' : 'en';

  // fitAll: show every marker in the viewport
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

  // Expose fitAll for render.js re-open handler
  mapEl._leafletFitAll = fitAll;

  /* ── Helper: add day-route polyline ── */
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
        'line-color':     dark ? '#60BBFF' : '#075AAA',
        'line-width':     2.5,
        'line-opacity':   dark ? 0.85 : 0.65,
        'line-dasharray': [2, 2]
      }
    });
  };

  /* ── Marker state (HTML markers survive setStyle) ── */
  let markersAdded = false;
  const markerRefs = [];

  /* ── INITIAL LOAD ── */
  let dayMapReady = false;
  map.on('load', () => {
    dayMapReady = true;
    addDayLayers();

    // Add numbered markers once
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

    // Register refs in the module-level registry for the single langchange listener
    _dayMarkers[dayId] = markerRefs;

    setTimeout(() => { map.resize(); fitAll(); }, 30);
  });

  /* ── THEME CHANGE — re-adds GeoJSON layers after setStyle clears them ── */
  map.on('style.load', () => {
    if (!dayMapReady) return;
    addDayLayers();   // re-add polyline with new theme colour
    // Markers survive — no re-add needed
    setTimeout(() => { map.resize(); fitAll(); }, 30);
  });

  // Enable scroll zoom after first click
  map.once('click', () => map.scrollZoom.enable());
}

/**
 * destroyDayMap(dayId)
 * Removes a MapLibre GL context when the day card is closed.
 * Prevents hitting the browser WebGL context limit (~8 on Safari, ~16 on Chrome)
 * when many accordion cards have been opened. The next open re-initialises cleanly.
 */
function destroyDayMap(dayId) {
  const map = _dayMaps[dayId];
  if (!map) return;
  map.remove();
  delete _dayMaps[dayId];
  delete _dayMarkers[dayId];
  // Clear mapInited flag so the card re-initialises on next open
  const mapEl = document.getElementById('day-map-' + dayId);
  if (mapEl) {
    delete mapEl.dataset.mapInited;
    mapEl._leafletMap   = undefined;
    mapEl._leafletFitAll = undefined;
  }
}

window.initDayMap    = initDayMap;
window.destroyDayMap = destroyDayMap;
