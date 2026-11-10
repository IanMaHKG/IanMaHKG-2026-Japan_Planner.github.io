/**
 * @file render.js
 * @description DOM INJECTION ORCHESTRATOR — calls the section renderers that live in
 * js/features/*.js (car, overview, tips-packing, budget, hotels, itinerary, flights)
 * and exposes them on window.
 * Must load AFTER all js/features/*.js files.
 */

/* ─── Orchestrator ─── */
function renderSiteContent() {
  renderOverview();
  renderCarRental();
  renderTips();
  renderPacking();
  renderBudget();
  renderHotels();
  renderFlights();
}

if (typeof window !== 'undefined') {
  window.renderSiteContent  = renderSiteContent;
  window.renderOverview     = renderOverview;
  window.renderCarRental    = renderCarRental;
  window.renderTips         = renderTips;
  window.renderPacking      = renderPacking;
  window.renderBudget       = renderBudget;
  window.renderHotels       = renderHotels;
  window.renderItinerary    = renderItinerary;
  window.toggleDay          = toggleDay;
  window.selectActivityOption = selectActivityOption;
  window.renderFlights      = renderFlights;
  window.flightsSelectTab   = flightsSelectTab;
  if (typeof fetchLiveWeather === 'function') window.fetchLiveWeather = fetchLiveWeather;
}
