/**
 * @file map.js
 * @description MAP MODULE — renders interactive maps using MapLibre GL JS + OpenFreeMap.
 */

/* ═══════════════════════════════════════════════════
   STYLE CONSTANTS & GLOBAL MAP REGISTRY
   ═══════════════════════════════════════════════════ */

const STYLE_LIGHT = 'https://tiles.openfreemap.org/styles/positron';
const STYLE_DARK = 'https://tiles.openfreemap.org/styles/fiord';

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

/** Returns true on coarse-pointer touchscreens (phones/tablets). */
function isTouchDevice() {
  return Boolean(window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches);
}

const ZH_MAP_LOCALE = {
  'CooperativeGesturesHandler.WindowsHelpText': '按住 Ctrl 並滾動滑鼠以縮放地圖',
  'CooperativeGesturesHandler.MacHelpText': '按住 ⌘ 並滾動以縮放地圖',
  'CooperativeGesturesHandler.MobileHelpText': '請用雙指移動地圖'
};

function getMapLocale() {
  return document.body.classList.contains('lang-zh-hk') ? ZH_MAP_LOCALE : undefined;
}

/** Global registry — tracks every live MapLibre instance for theme switching. */
let _routeMap = null;
const _dayMaps = {};   // dayId → maplibregl.Map instance
const _dayMarkers = {};   // dayId → [{ popup, point }] for langchange updates

/** Resize open day mini-maps on orientation / viewport changes. */
window.addEventListener('resize', () => {
  Object.values(_dayMaps).forEach(m => m.resize());
});

/** Module-level themechange listener */
window.addEventListener('themechange', (e) => {
  const s = e.detail.theme === 'dark' ? STYLE_DARK : STYLE_LIGHT;
  if (_routeMap) _routeMap.setStyle(s, { diff: false });
  Object.values(_dayMaps).forEach(m => m.setStyle(s, { diff: false }));
});

/** Single module-level langchange listener */
window.addEventListener('langchange', (e) => {
  const l = e.detail.lang === 'zh-hk' ? 'zh' : 'en';
  Object.entries(_dayMarkers).forEach(([, refs]) => {
    refs.forEach(({ popup, point }) => {
      popup.setHTML(`<strong>${point.label[l]}</strong>`);
    });
  });
  const mobileHint = l === 'zh'
    ? ZH_MAP_LOCALE['CooperativeGesturesHandler.MobileHelpText']
    : 'Use two fingers to move the map';
  [_routeMap, ...Object.values(_dayMaps)].forEach(m => {
    const el = m && m.getContainer().querySelector('.maplibregl-mobile-message');
    if (el) el.textContent = mobileHint;
  });
});

/** Attaches a compact attribution control that stays collapsed on load, style reload, and resize. */
function attachCompactAttrib(map, mapEl) {
  map.addControl(new maplibregl.AttributionControl({ compact: true }));
  const collapse = () => {
    const el = mapEl.querySelector('.maplibregl-ctrl-attrib');
    if (el) el.classList.remove('maplibregl-compact-show');
  };
  collapse();
  map.on('load', collapse);
  map.on('style.load', collapse);
  map.on('resize', collapse);
  return collapse;
}

/* ═══════════════════════════════════════════════════
   ROUTE OVERVIEW MAP
   ═══════════════════════════════════════════════════ */

function initRouteMap() {
  const mapEl = document.getElementById('route-map');
  if (!mapEl || typeof maplibregl === 'undefined') return;
  const data = (typeof window !== 'undefined' && window.SITE_DATA) ? window.SITE_DATA : null;
  if (!data || !data.overview) return;

  const getActiveStops = () => data.overview.routeStops;

  const touch = isTouchDevice();
  const compactAttrib = touch || mapEl.clientHeight < 340;
  const map = new maplibregl.Map({
    container: 'route-map',
    style: getStyle(),
    center: [137.5, 35.1],
    zoom: 6,
    scrollZoom: false,
    cooperativeGestures: touch,
    locale: getMapLocale(),
    attributionControl: !compactAttrib
  });
  if (compactAttrib) attachCompactAttrib(map, mapEl);
  if (touch) {
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
  }

  _routeMap = map;

  const getLang = () => document.body.classList.contains('lang-zh-hk') ? 'zh' : 'en';
  let markerRefs = [];

  const addLine = (id, lineCoords, color, width, opacity, dashArray) => {
    if (map.getLayer(id)) map.removeLayer(id);
    if (map.getSource(id)) map.removeSource(id);
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

  const clearRouteLayers = () => {
    ['route-drive'].forEach(id => {
      if (map.getLayer(id)) map.removeLayer(id);
      if (map.getSource(id)) map.removeSource(id);
    });
  };

  const fitRouteBounds = () => {
    const stops = getActiveStops();
    if (!stops || !stops.length) return;
    const curCoords = stops.map(s => [s.lng, s.lat]);
    const curBounds = curCoords.reduce(
      (b, c) => b.extend(c),
      new maplibregl.LngLatBounds(curCoords[0], curCoords[0])
    );
    map.fitBounds(curBounds, { padding: touch ? { top: 52, bottom: 42, left: 44, right: 76 } : 50, duration: 600 });
  };

  const addRouteLayers = () => {
    clearRouteLayers();
    const dark = isDarkMode();
    const stops = getActiveStops();
    if (!stops || !stops.length) return;

    // One self-drive loop: Tokyo -> Kawaguchiko -> Hakone -> Odawara -> Shonan coast -> Tokyo Hamamatsucho
    addLine('route-drive',
      stops.map(s => [s.lng, s.lat]),
      getPaletteColor('--route-drive', dark ? '#60BBFF' : '#075AAA'), 3.2, 0.85, [3, 2]);
  };

  const updateMarkers = () => {
    markerRefs.forEach(ref => ref.marker.remove());
    markerRefs = [];

    const stops = getActiveStops();
    const lang = getLang();

    stops.forEach((stop, i) => {
      const el = document.createElement('div');
      el.className = `custom-marker ${stop.markerClass}`;
      el.textContent = stop.label;

      const popup = new maplibregl.Popup({ maxWidth: '240px', offset: 20, focusAfterOpen: false })
        .setHTML(`
          <h3>${stop.name[lang]}</h3>
          <p>${stop.desc[lang]}</p>
          <span class="popup-days">${stop.days[lang]}</span>
        `);

      popup.on('open', () => {
        requestAnimationFrame(() => {
          const pEl = popup.getElement();
          if (!pEl) return;
          const mr = mapEl.getBoundingClientRect();
          const pr = pEl.getBoundingClientRect();
          const padBottom = touch ? 32 : 8;
          let dx = 0, dy = 0;
          if (pr.bottom > mr.bottom - padBottom) dy = pr.bottom - (mr.bottom - padBottom);
          else if (pr.top < mr.top + 8) dy = pr.top - (mr.top + 8);
          if (pr.right > mr.right - 8) dx = pr.right - (mr.right - 8);
          else if (pr.left < mr.left + 8) dx = pr.left - (mr.left + 8);

          const ctrlTR = touch ? mapEl.querySelector('.maplibregl-ctrl-top-right') : null;
          if (ctrlTR) {
            const tr = ctrlTR.getBoundingClientRect();
            const projLeft = pr.left - dx;
            const projRight = pr.right - dx;
            const projTop = pr.top - dy;
            const projBottom = pr.bottom - dy;
            if (projRight > tr.left - 8 && projTop < tr.bottom + 8 &&
              projLeft < tr.right + 8 && projBottom > tr.top - 8) {
              const needLeft = projRight - (tr.left - 8);
              const maxLeft = projLeft - (mr.left + 8);
              const needDown = (tr.bottom + 8) - projTop;
              const maxDown = (mr.bottom - padBottom) - projBottom;
              if (needLeft <= maxLeft) dx += needLeft;
              else if (needDown <= maxDown) dy -= needDown;
              else {
                if (maxLeft > 0) dx += Math.min(needLeft, maxLeft);
                if (maxDown > 0) dy -= Math.min(needDown, maxDown);
              }
            }
          }
          if (dx || dy) map.panBy([dx, dy], { duration: 200 });
        });
      });

      const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat([stop.lng, stop.lat])
        .setPopup(popup)
        .addTo(map);

      markerRefs.push({ marker, popup, stop });

      if (i === 0) {
        const compactMap = touch || mapEl.clientHeight < 340;
        if (!compactMap) setTimeout(() => { if (marker._map) marker.togglePopup(); }, 1000);
      }
    });
  };

  let mapReady = false;
  map.on('load', () => {
    mapReady = true;
    addRouteLayers();
    fitRouteBounds();
    updateMarkers();
  });

  map.on('style.load', () => {
    if (!mapReady) return;
    addRouteLayers();
  });

  window.addEventListener('langchange', (e) => {
    const l = e.detail.lang === 'zh-hk' ? 'zh' : 'en';
    markerRefs.forEach(({ popup, stop }) => {
      popup.setHTML(`
        <h3>${stop.name[l]}</h3>
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

  const touch = isTouchDevice();
  const compactAttrib = touch || mapEl.clientHeight < 260;
  const map = new maplibregl.Map({
    container: mapEl,
    style: getStyle(),
    center: centre,
    zoom: 12,
    scrollZoom: false,
    cooperativeGestures: touch,
    locale: getMapLocale(),
    attributionControl: !compactAttrib
  });
  const collapseAttrib = compactAttrib ? attachCompactAttrib(map, mapEl) : () => { };
  if (touch) {
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
  }

  _dayMaps[dayId] = map;
  mapEl._dayMap = { invalidateSize: () => map.resize() };

  const getLang = () => document.body.classList.contains('lang-zh-hk') ? 'zh' : 'en';

  const fitAll = () => {
    if (points.length === 1) {
      map.flyTo({ center: [points[0].lng, points[0].lat], zoom: 14, duration: 0 });
    } else {
      const b = points.reduce(
        (acc, p) => acc.extend([p.lng, p.lat]),
        new maplibregl.LngLatBounds([points[0].lng, points[0].lat], [points[0].lng, points[0].lat])
      );
      map.fitBounds(b, { padding: touch ? { top: 44, bottom: 48, left: 44, right: 72 } : 50, maxZoom: 15, duration: 0 });
    }
  };

  mapEl._dayFitAll = fitAll;

  const addDayLayers = () => {
    if (points.length < 2) return;
    const id = 'day-route-' + dayId;
    if (map.getLayer(id)) map.removeLayer(id);
    if (map.getSource(id)) map.removeSource(id);
    const dark = isDarkMode();
    map.addSource(id, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: { type: 'LineString', coordinates: points.map(p => [p.lng, p.lat]) }
      }
    });
    map.addLayer({
      id,
      type: 'line',
      source: id,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: {
        'line-color': getPaletteColor('--route-drive', dark ? '#60BBFF' : '#075AAA'),
        'line-width': 2.5,
        'line-opacity': dark ? 0.85 : 0.65,
        'line-dasharray': [2, 2]
      }
    });
  };

  const markerRefs = [];
  let dayMapReady = false;

  map.on('load', () => {
    dayMapReady = true;
    addDayLayers();

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
    setTimeout(() => { map.resize(); collapseAttrib(); fitAll(); }, 30);
  });

  map.on('style.load', () => {
    if (!dayMapReady) return;
    addDayLayers();
    setTimeout(() => { map.resize(); collapseAttrib(); }, 30);
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
    mapEl._dayMap = undefined;
    mapEl._dayFitAll = undefined;
  }
}

if (typeof window !== 'undefined') {
  window.initRouteMap = initRouteMap;
  window.initDayMap = initDayMap;
  window.destroyDayMap = destroyDayMap;
}
