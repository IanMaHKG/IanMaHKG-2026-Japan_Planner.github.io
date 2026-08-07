/**
 * @file map.js
 * @description MAP MODULE — renders the interactive Leaflet.js route map.
 *
 * DEPENDS ON (must be loaded before this file):
 *   - Leaflet.js CDN  → global `L` object (loaded via <script> in <head> of index.html)
 *   - site-data.js    → window.SITE_DATA.overview.routeStops  (7 stop objects with lat/lng)
 *
 * EXPORTS (global function, called by script.js):
 *   - initRouteMap()   Initialises the Leaflet map in #route-map. Safe to call if the
 *                      element is missing or Leaflet hasn't loaded — exits silently.
 *
 * WHAT initRouteMap() DOES:
 *   1. Creates a Leaflet map centred on Japan (35.1, 137.5) with scroll-wheel zoom off.
 *   2. Adds CartoDB Positron tile layer (light/clean, matches BA.com white theme).
 *   3. Draws three polyline segments:
 *        • Tokyo → Kawaguchiko → Hakone → Nagoya   (navy dashed  = self-drive)
 *        • Nagoya → Kyoto                           (red solid    = Shinkansen)
 *        • Kyoto → Nara → Osaka                    (gold solid   = local train)
 *   4. Adds a custom DivIcon marker for each stop using stop.label as the badge text.
 *   5. Binds a popup to each marker with the stop name, description, and days — text
 *      is set in the active language and re-bound on 'langchange' CustomEvent (fired by ui.js).
 *   6. Opens Tokyo's popup after 1 second (default welcome state).
 *   7. Fits the map bounds to all 7 markers with 40px padding.
 *   8. Enables scroll-wheel zoom after the first user click (prevents accidental page hijack).
 *   9. Calls map.invalidateSize() on window resize to prevent blank tile areas.
 *
 * DATA CONTRACT — each entry in SITE_DATA.overview.routeStops must have:
 *   {
 *     label:      string  — 3-letter code displayed on the map DivIcon (e.g. "TYO")
 *     name:       { en, zh }  — Station display name for popup heading
 *     desc:       { en, zh }  — Short activity summary for popup body
 *     days:       { en, zh }  — Day label for popup footer (e.g. "Days 1–4")
 *     lat:        number  — Latitude  (WGS84)
 *     lng:        number  — Longitude (WGS84)
 *     markerClass: string — CSS class applied to the Leaflet DivIcon element
 *     color:      string  — Reserved; not used by map.js (used by render.js for the route board)
 *   }
 *
 * NOTE: The `code`, `kanji`, `hiragana`, and `romaji` fields on each stop are used exclusively
 * by render.js (JR Station Sign route board) and are ignored by this module.
 */


function initRouteMap() {
  const mapEl = document.getElementById('route-map');
  if (!mapEl || typeof L === 'undefined') return;
  if (!window.SITE_DATA || !window.SITE_DATA.overview) return;

  const stops = window.SITE_DATA.overview.routeStops;

  // Initialise Leaflet map
  const map = L.map('route-map', {
    center: [35.1, 137.5],
    zoom: 7,
    scrollWheelZoom: false,
    zoomControl: true
  });

  // CartoDB Positron tile — light, clean, matches BA.com aesthetic
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // ── Polyline segments ──────────────────────────────

  // Tokyo → Kawaguchiko → Hakone → Nagoya  (self-drive, dashed)
  L.polyline(stops.slice(0, 4).map(s => [s.lat, s.lng]), {
    color: '#075AAA',
    weight: 3,
    opacity: 0.7,
    dashArray: '8, 8',
    lineJoin: 'round'
  }).addTo(map);

  // Nagoya → Kyoto  (Shinkansen, solid red)
  L.polyline([
    [stops[3].lat, stops[3].lng],
    [stops[4].lat, stops[4].lng]
  ], {
    color: '#BA0C2F',
    weight: 3,
    opacity: 0.7,
    lineJoin: 'round'
  }).addTo(map);

  // Kyoto → Nara → Osaka  (local train, solid gold)
  L.polyline(stops.slice(4).map(s => [s.lat, s.lng]), {
    color: '#C9A96E',
    weight: 3,
    opacity: 0.7,
    lineJoin: 'round'
  }).addTo(map);

  // ── Markers ───────────────────────────────────────

  const markers = [];

  stops.forEach((stop, i) => {
    const icon = L.divIcon({
      className: `custom-marker ${stop.markerClass}`,
      html: stop.label,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -20]
    });

    const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(map);
    markers.push(marker);

    const activeLang = document.body.classList.contains('lang-zh-hk') ? 'zh' : 'en';
    marker.bindPopup(`
      <h4>${stop.name[activeLang]}</h4>
      <p>${stop.desc[activeLang]}</p>
      <span class="popup-days">${stop.days[activeLang]}</span>
    `, { maxWidth: 220 });

    // Open Tokyo popup after a short delay
    if (i === 0) setTimeout(() => marker.openPopup(), 1000);
  });

  // Re-bind popup content on language switch
  window.addEventListener('langchange', (e) => {
    const lang = e.detail.lang === 'zh-hk' ? 'zh' : 'en';
    markers.forEach((marker, idx) => {
      const stop = stops[idx];
      marker.setPopupContent(`
        <h4>${stop.name[lang]}</h4>
        <p>${stop.desc[lang]}</p>
        <span class="popup-days">${stop.days[lang]}</span>
      `);
    });
  });

  // ── Fit bounds ────────────────────────────────────

  const bounds = L.latLngBounds(stops.map(s => [s.lat, s.lng]));
  map.fitBounds(bounds, { padding: [40, 40] });

  // Enable scroll-wheel zoom after the first click
  map.once('click', () => map.scrollWheelZoom.enable());

  // Invalidate size on window resize
  window.addEventListener('resize', () => map.invalidateSize());
}


/* ─── Per-Day Mini Map ─── */
/**
 * initDayMap(dayId)
 *
 * Lazily initialises a compact Leaflet map inside the `.day-map` container of a
 * given day card when the accordion opens. Called by toggleDay() in render.js.
 *
 * - Collects all `locations` arrays from every block in the matching ITINERARY_DATA day.
 * - Renders numbered DivIcon markers (1, 2, 3…) + a polyline connecting them.
 * - Binds bilingual popups; updates on the `langchange` CustomEvent.
 * - Calls map.invalidateSize() after a short delay to handle the CSS reveal animation.
 *
 * DATA CONTRACT: each block's activity may optionally have:
 *   locations: [ { lat, lng, label: { en, zh } } ]
 */
function initDayMap(dayId) {
  if (typeof L === 'undefined' || !window.ITINERARY_DATA) return;

  const mapEl = document.getElementById('day-map-' + dayId);
  if (!mapEl) return;

  // Guard: only initialise once.
  // Re-open (invalidateSize + fitAll) is handled by toggleDay's transitionend listener.
  if (mapEl.dataset.mapInited) return;
  mapEl.dataset.mapInited = 'true';

  // Collect all location points from the day
  const day = window.ITINERARY_DATA.find(d => d.id === dayId);
  if (!day) return;

  const points = [];
  day.blocks.forEach(block => {
    if (block.activity && block.activity.locations) {
      block.activity.locations.forEach(loc => points.push(loc));
    }
  });

  if (points.length === 0) {
    // No locations — hide the map container
    mapEl.style.display = 'none';
    return;
  }

  // Determine the map centre
  const centre = [
    points.reduce((s, p) => s + p.lat, 0) / points.length,
    points.reduce((s, p) => s + p.lng, 0) / points.length
  ];

  const map = L.map(mapEl, {
    center: centre,
    zoom: 13,
    scrollWheelZoom: false,
    zoomControl: true,
    attributionControl: true
  });

  // Store reference for invalidateSize on re-open
  mapEl._leafletMap = map;

  // CartoDB Positron — identical tile layer as the main route map
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Draw polyline connecting all points
  if (points.length > 1) {
    L.polyline(points.map(p => [p.lat, p.lng]), {
      color: '#075AAA',
      weight: 2.5,
      opacity: 0.65,
      dashArray: '5, 6',
      lineJoin: 'round'
    }).addTo(map);
  }

  // Helper: get current language
  const getLang = () => document.body.classList.contains('lang-zh-hk') ? 'zh' : 'en';

  // Add numbered markers
  const markers = points.map((point, idx) => {
    const num = idx + 1;
    const icon = L.divIcon({
      className: 'day-map-marker',
      html: `<span class="day-map-marker-num">${num}</span>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -16]
    });
    const marker = L.marker([point.lat, point.lng], { icon }).addTo(map);
    const lang = getLang();
    marker.bindPopup(`<strong>${point.label[lang]}</strong>`, { maxWidth: 200, closeButton: false });
    return { marker, point };
  });

  // Helper: fit all location markers into view with comfortable padding.
  // Defined as a closure so it can be called again on every re-open.
  const fitAll = () => {
    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], 14);
    } else {
      map.fitBounds(
        L.latLngBounds(points.map(p => [p.lat, p.lng])),
        { padding: [40, 40], maxZoom: 15 }
      );
    }
  };

  // Store so the re-open guard can call it
  mapEl._leafletFitAll = fitAll;

  // Enable scroll wheel zoom after first click
  map.once('click', () => map.scrollWheelZoom.enable());

  // Update popup labels on language switch
  window.addEventListener('langchange', (e) => {
    const lang = e.detail.lang === 'zh-hk' ? 'zh' : 'en';
    markers.forEach(({ marker, point }) => {
      marker.setPopupContent(`<strong>${point.label[lang]}</strong>`);
    });
  });

  // initDayMap is called from a transitionend listener, so the container
  // already has its final pixel dimensions. One short tick lets the browser
  // paint the final layout before Leaflet measures and fits.
  setTimeout(() => {
    map.invalidateSize();
    fitAll();
  }, 30);
}

window.initDayMap = initDayMap;
