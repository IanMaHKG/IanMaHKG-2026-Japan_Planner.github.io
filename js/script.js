/**
 * @file script.js
 * @description APPLICATION BOOTSTRAP — Japan Winter Journey 2026.
 */

/* ── Service Worker Registration (PWA) ── */
if ('serviceWorker' in navigator && (location.protocol === 'http:' || location.protocol === 'https:')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        console.log('ServiceWorker registered with scope:', reg.scope);
      })
      .catch(err => {
        console.log('ServiceWorker registration failed:', err);
      });
  });
}

/* ── DOM Bootstrapping ── */
function bootstrap() {
  /* Step 0: Theme */
  if (typeof initTheme === 'function') initTheme();

  /* Step 1: Inject data-driven HTML content */
  if (typeof renderSiteContent === 'function') renderSiteContent();
  if (typeof renderItinerary === 'function') renderItinerary();

  /* Step 2: UI & interaction wiring */
  if (typeof initLanguageSelector === 'function') initLanguageSelector();
  if (typeof initCurrencySelector === 'function') initCurrencySelector();
  if (typeof initParticles === 'function') initParticles();
  if (typeof initNav === 'function') initNav();
  if (typeof initDayCards === 'function') initDayCards();
  if (typeof initFilters === 'function') initFilters();
  if (typeof initScrollReveal === 'function') initScrollReveal();
  if (typeof initSmoothScroll === 'function') initSmoothScroll();
  if (typeof initHotelSearch === 'function') initHotelSearch();

  /* Step 3: Map rendering */
  if (typeof initRouteMap === 'function') initRouteMap();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
