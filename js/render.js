/**
 * @file render.js
 * @description DOM INJECTION ORCHESTRATOR — calls the section renderers that live in
 * js/features/*.js (car, overview, tips-packing, budget, hotels, itinerary, flights),
 * wires the 'planchange' re-render, and exposes them on window.
 * Must load AFTER all js/features/*.js files.
 */

/* ─── Orchestrator ─── */
function renderSiteContent() {
  const plan = localStorage.getItem('user-plan') || 'plan-a';
  renderOverview(plan);
  renderCarReturn(plan);
  renderCarRental();
  renderTips();
  renderPacking();
  renderBudget(plan);
  renderHotels(plan);
  renderFlights(plan);
}

if (typeof window !== 'undefined') {
  window.addEventListener('planchange', (e) => {
    // The initial planchange fires right after bootstrap already rendered with the saved plan;
    // re-rendering would just duplicate ~0.5 MB of DOM work.
    if (e.detail && e.detail.isInitial) return;
    const plan = (e.detail && e.detail.plan) ? e.detail.plan : (localStorage.getItem('user-plan') || 'plan-a');
    renderOverview(plan);
    renderCarReturn(plan);
    renderBudget(plan);
    renderHotels(plan);
    renderItinerary(plan);
    renderFlights(plan);
  });

  window.renderSiteContent  = renderSiteContent;
  window.renderOverview     = renderOverview;
  window.renderCarReturn    = renderCarReturn;
  window.renderCarRental    = renderCarRental;
  window.renderTips         = renderTips;
  window.renderPacking      = renderPacking;
  window.renderBudget       = renderBudget;
  window.renderHotels       = renderHotels;
  window.renderItinerary    = renderItinerary;
  window.toggleDay          = toggleDay;
  window.toggleCarTips      = toggleCarTips;
  window.selectRentalPickup = selectRentalPickup;
  window.initDayCards       = initDayCards;
  window.renderFlights      = renderFlights;
  window.flightsSelectTab   = flightsSelectTab;
}
