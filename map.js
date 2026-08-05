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
 *   4. Adds a custom DivIcon marker for each stop with a 3-letter code label.
 *   5. Binds a popup to each marker with the stop name, description, and days — text
 *      is set in the active language and re-bound on 'langchange' CustomEvent (fired by ui.js).
 *   6. Opens Tokyo's popup after 1 second (default welcome state).
 *   7. Fits the map bounds to all 7 markers with 40px padding.
 *   8. Enables scroll-wheel zoom after the first user click (prevents accidental page hijack).
 *   9. Calls map.invalidateSize() on window resize to prevent blank tile areas.
 *
 * DATA CONTRACT (each entry in SITE_DATA.overview.routeStops must have):
 *   { dotClass, name:{en,zh}, days:{en,zh}, desc:{en,zh},
 *     lat, lng, color, markerClass, label }
 *
 * NOTE: The `color` field on each stop is reserved for future use (e.g. coloured popups).
 * Polyline colours are currently hardcoded to match the BA palette.
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
