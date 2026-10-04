/**
 * @file sw.js
 * @description SERVICE WORKER — provides offline capability and asset caching
 * for Japan Winter Journey 2026.
 *
 * Caching strategy: Network-First for local app shell assets (instant updates
 * on every deployment); Cache fallback for offline. Network-First for external
 * APIs and CDN tiles.
 *
 * AGENTS — IMPORTANT: Bump CACHE_NAME after ANY change to JS, CSS, HTML, or
 * data files so returning users receive the updated assets.
 *
 * @see AGENTS.md — Service Worker & PWA Rules section.
 */

const CACHE_NAME = 'japan-planner-v2';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/favicon.svg',
  './assets/apple-touch-icon.png',
  './css/palette.css',
  './css/base.css',
  './css/components.css',
  './css/sections.css',
  './css/responsive.css',
  './css/style.css',
  './data/site-data.js',
  './data/itinerary-data.js',
  './data/flights/flights-data.js',
  './js/currency.js',
  './js/map.js',
  './js/render.js',
  './js/ui.js',
  './js/script.js'
];

/* Install: cache all essential core assets */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

/* Activate: clean up old cache versions */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

/* Fetch: Network-First for local assets (instant updates), cache fallback for offline */
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // External live exchange rate API, CDN tiles: Network-first with cache fallback
  if (url.origin !== location.origin) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Local assets: Network-First ensures fresh code on every visit, fallback to cache when offline
  event.respondWith(
    fetch(event.request).then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
      }
      return networkResponse;
    }).catch(() => caches.match(event.request))
  );
});

