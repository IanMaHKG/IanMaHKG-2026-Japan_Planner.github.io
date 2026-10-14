/**
 * @file sw.js
 * @description SERVICE WORKER — provides offline capability and asset caching
 * for Japan Winter Journey 2026.
 *
 * Caching strategy:
 *  - HTML (navigations): Network-First, cache fallback when offline.
 *  - Local CSS/JS/data/images: Stale-While-Revalidate (instant load, refreshed in background).
 *  - External (exchange rates, map tiles, fonts): Network-First with a capped runtime cache.
 *
 * Versioning: __BUILD__ below is replaced with the short commit SHA by the GitHub Actions
 * deploy job, so every deployment gets a fresh cache automatically. Locally it stays
 * '__BUILD__' (no manual bump needed). If you add/remove a file, update STATIC_ASSETS
 * (scripts/validate.mjs checks this list against index.html and the disk).
 *
 * @see AGENTS.md — Service Worker & PWA Rules section.
 */

const CACHE_NAME = 'japan-planner-__BUILD__';
const RUNTIME_CACHE = 'japan-planner-runtime';
const RUNTIME_MAX_ENTRIES = 120;

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/favicon.svg',
  './assets/apple-touch-icon.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png',
  './assets/images/hero-fuji-winter.webp',
  './css/palette.css',
  './css/base.css',
  './css/components.css',
  './css/sections/nav.css',
  './css/sections/hero.css',
  './css/sections/overview.css',
  './css/sections/map.css',
  './css/sections/tips.css',
  './css/sections/car-return.css',
  './css/sections/car-rental.css',
  './css/sections/itinerary.css',
  './css/sections/packing.css',
  './css/sections/budget.css',
  './css/sections/hotels.css',
  './css/sections/footer.css',
  './css/sections/dark-overrides.css',
  './css/sections/flights.css',
  './css/sections/budget-mobile.css',
  './css/responsive.css',
  './data/site-data.js',
  './data/itinerary-data.js',
  './data/flights/flights-data.js',
  './js/currency.js',
  './js/map.js',
  './js/features/car.js',
  './js/features/overview.js',
  './js/features/tips-packing.js',
  './js/features/budget.js',
  './js/features/hotels.js',
  './js/features/itinerary.js',
  './js/features/flights.js',
  './js/render.js',
  './js/ui.js',
  './js/script.js'
];

/* Install: cache all essential core assets */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // cache:'reload' bypasses the browser HTTP cache so a new build never precaches stale files
      return cache.addAll(STATIC_ASSETS.map((u) => new Request(u, { cache: 'reload' })));
    }).then(() => self.skipWaiting())
  );
});

/* Activate: clean up old cache versions */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

/* Keep the runtime cache from growing without bound (oldest entries first) */
async function trimRuntimeCache() {
  const cache = await caches.open(RUNTIME_CACHE);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - RUNTIME_MAX_ENTRIES; i++) await cache.delete(keys[i]);
}

/* Fetch strategies */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // External (exchange-rate API, map tiles, fonts): network-first, capped runtime cache fallback
  if (url.origin !== location.origin) {
    event.respondWith(
      fetch(req).then((res) => {
        if (res && (res.status === 200 || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy)).then(trimRuntimeCache);
        }
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // HTML navigations: network-first so a new deployment is seen immediately
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(req).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
    );
    return;
  }

  // Local static assets: stale-while-revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(req).then((cached) => {
        const network = fetch(req).then((res) => {
          if (res && res.status === 200) cache.put(req, res.clone());
          return res;
        }).catch(() => cached || new Response('Offline', { status: 503, statusText: 'Offline' }));
        return cached || network;
      })
    )
  );
});

