/* ─── Hotels & Ryokan Section ─── */
function renderHotels(plan) {
  const currentPlan = plan || localStorage.getItem('user-plan') || 'plan-a';
  const rootData = (typeof window !== 'undefined' && window.SITE_DATA) ? window.SITE_DATA.hotels : null;
  if (!rootData) return;

  const data = (currentPlan === 'plan-b') ? rootData.planB : rootData.planA;
  if (!data) return;

  const quickLegsEl = document.getElementById('quick-leg-pills');
  if (quickLegsEl && data.quickLegs) {
    quickLegsEl.innerHTML = data.quickLegs.map((leg, idx) => `
      <button class="leg-pill ${idx === 0 ? 'active' : ''}" data-dest="${leg.dest}" data-checkin="${leg.checkin}" data-checkout="${leg.checkout}">
        <span class="lang-en">${leg.label.en}</span>
        <span class="lang-zh">${leg.label.zh}</span>
      </button>
    `).join('');
  }

  const gridEl = document.getElementById('itinerary-hotels-grid');
  if (gridEl && data.legs) {
    gridEl.setAttribute('data-count', data.legs.length);
    gridEl.innerHTML = data.legs.map(leg => {
      const tagsHtml = leg.tags.map(tag => `<span>${tag}</span>`).join('');
      const badgeCls = leg.badgeClass ? ` ${leg.badgeClass}` : '';
      const cardCls = leg.highlight ? 'hotel-leg-card highlight-card' : 'hotel-leg-card';
      const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(leg.dest)}&checkin=${leg.checkin}&checkout=${leg.checkout}&group_adults=2&no_rooms=1`;

      return `
        <div class="${cardCls}">
          <div class="hotel-leg-badge${badgeCls}">
            <span class="lang-en">${leg.nights.en}</span>
            <span class="lang-zh">${leg.nights.zh}</span>
          </div>
          <div class="hotel-leg-body">
            <h4>
              <span class="lang-en">${leg.title.en}</span>
              <span class="lang-zh">${leg.title.zh}</span>
            </h4>
            <p class="hotel-leg-dates">${leg.dates}</p>
            <p class="hotel-leg-desc">
              <span class="lang-en">${leg.desc.en}</span>
              <span class="lang-zh">${leg.desc.zh}</span>
            </p>
            <div class="hotel-leg-tags">
              ${tagsHtml}
            </div>
            <a href="${bookingUrl}" target="_blank" rel="noopener" class="hotel-leg-btn" data-dest="${leg.dest}" data-checkin="${leg.checkin}" data-checkout="${leg.checkout}">
              <span class="lang-en">${leg.btnText.en}</span>
              <span class="lang-zh">${leg.btnText.zh}</span>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  if (typeof initHotelSearch === 'function') initHotelSearch();
}
