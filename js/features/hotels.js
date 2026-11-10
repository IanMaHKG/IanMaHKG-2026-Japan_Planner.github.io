/* ─── Hotels Section (confirmed bookings) ─── */
function renderHotels() {
  const data = (typeof window !== 'undefined' && window.SITE_DATA) ? window.SITE_DATA.hotels : null;
  const gridEl = document.getElementById('itinerary-hotels-grid');
  if (!gridEl || !data || !data.legs) return;

  gridEl.setAttribute('data-count', data.legs.length);
  gridEl.innerHTML = data.legs.map(leg => {
    const tagsHtml = leg.tags.map(tag => `<span>${tag}</span>`).join('');
    const badgeCls = leg.badgeClass ? ` ${leg.badgeClass}` : '';
    const cardCls = leg.highlight ? 'hotel-leg-card highlight-card' : 'hotel-leg-card';

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
          <a href="${leg.mapUrl}" target="_blank" rel="noopener" class="hotel-leg-btn">
            <span class="lang-en">${leg.btnText.en}</span>
            <span class="lang-zh">${leg.btnText.zh}</span>
          </a>
        </div>
      </div>
    `;
  }).join('');
}
