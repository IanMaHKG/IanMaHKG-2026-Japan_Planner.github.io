/**
 * @file script.js
 * @description ENTRY POINT — Japan Winter Journey 2026 web app.
 *
 * This file's ONLY job is to boot the application after the DOM is ready.
 * All logic lives in the four modules below. This separation keeps the
 * bootstrap lean and makes each concern easy to find and modify.
 *
 * LOAD ORDER (enforced by <script> tag order in index.html):
 *   1. site-data.js        → sets window.SITE_DATA  (overview/tips/packing/budget/hotels/map stops)
 *   2. itinerary-data.js   → sets window.ITINERARY_DATA  (12-day schedule)
 *   3. render.js           → defines renderSiteContent(), renderItinerary(), initDayCards()
 *   4. currency.js         → defines initCurrencySelector(), fetchExchangeRates(), updateConvertedBudgets()
 *   5. ui.js               → defines initLanguageSelector(), initNav(), initParticles(),
 *                            initScrollReveal(), initSmoothScroll(), initFilters(), initHotelSearch()
 *   6. map.js              → defines initRouteMap()
 *   7. script.js  ← (this file) — calls everything once DOM is ready
 *
 * HOW TO ADD A NEW FEATURE:
 *   - Add data to site-data.js or itinerary-data.js
 *   - Add a render/init function to the appropriate module
 *   - Register the call here in the DOMContentLoaded handler
 *
 * GITHUB PAGES: No build step needed. All files are plain JS/HTML/CSS.
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ── Step 1: Inject all data-driven HTML content ───────────────
     render.js reads SITE_DATA / ITINERARY_DATA and populates the
     empty container divs in index.html before any other init runs,
     so that subsequent initialisers (scroll reveal, hotel search, etc.)
     can find the dynamically-created elements in the DOM.           */
  renderSiteContent();
  renderItinerary();

  /* ── Step 2: UI & interaction wiring ───────────────────────────
     Order doesn't matter here — all DOM containers already exist.  */
  initLanguageSelector();   // ui.js      — EN ↔ 繁中 toggle + body class
  initCurrencySelector();   // currency.js — HKD ↔ GBP toggle + live rates
  initParticles();          // ui.js      — floating hero background particles
  initNav();                // ui.js      — nav bar scroll highlight + mobile menu
  initDayCards();           // render.js  — opens day-1 card by default
  initFilters();            // ui.js      — region filter tabs (All / Tokyo / Fuji / Kansai)
  initScrollReveal();       // ui.js      — IntersectionObserver fade-in animations
  initSmoothScroll();       // ui.js      — smooth scroll for all #anchor links
  initHotelSearch();        // ui.js      — Booking.com search widget + leg pill wiring

  /* ── Step 3: Map (last) ─────────────────────────────────────────
     Leaflet must be initialised after its container (#route-map)
     is visible / in the DOM.                                        */
  initRouteMap();           // map.js     — Leaflet interactive route map
});
