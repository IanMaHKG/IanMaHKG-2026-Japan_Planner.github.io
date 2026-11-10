/* --- Car Rental Section (confirmed booking) --- */
function renderCarRental() {
  const data = (typeof window !== 'undefined' && window.SITE_DATA) ? window.SITE_DATA.carRental : null;
  if (!data) return;

  const both = (o) => `<span class="lang-en">${o.en}</span><span class="lang-zh">${o.zh}</span>`;

  // Intro card
  const searchEl = document.getElementById('rental-search-card');
  if (searchEl) {
    searchEl.innerHTML = `
      <div class="rental-search-header">
        <div class="rental-search-brand">
          <span class="rental-brand-icon">🚙</span>
          <div>
            <h3>${both({ en: 'Your Confirmed Car Rental', zh: '已確認的租車預訂' })}</h3>
            <p class="rental-intro">${both(data.intro)}</p>
          </div>
        </div>
      </div>`;
  }

  // Confirmed booking: pick-up, return and price
  const bookEl = document.getElementById('rental-booking');
  if (!bookEl || !data.booking) return;
  const b = data.booking;
  const stopCard = (st, extra) => `
    <div class="rental-card rental-booking-card">
      <div class="rental-card-header">
        <div class="rental-name-wrap">
          <h3 class="rental-name">${both(st.heading)}</h3>
          <p class="rental-name-jp">${both(st.when)}</p>
        </div>
      </div>
      <ul class="rental-features">
        <li><strong>${both(st.shop)}</strong></li>
        <li>${both(st.address)}</li>
        <li>📞 <a href="tel:${st.phone.replace(/-/g, '')}">${st.phone}</a>${st.phoneNote ? ' (' + both(st.phoneNote) + ')' : ''}</li>
      </ul>
      <div class="rental-note">${both(st.note)}</div>
      ${extra}
    </div>`;
  const guideLink = `<a href="${b.pickup.url}" target="_blank" rel="noopener" class="rental-book-btn">
      <span class="lang-en">Shop route guide ↗</span><span class="lang-zh">分店路線指南 ↗</span></a>`;
  const includedHtml = b.included.map(i => `<li>${both(i)}</li>`).join('');
  const priceHtml = b.price.map(p => `<tr><td>${both(p.label)}</td><td>${p.jpy}</td></tr>`).join('');

  bookEl.innerHTML = `
    <div class="rental-booking-summary">
      <strong>${both(b.company)}</strong> · ${b.company.jp} — <span class="rental-booking-status">${both(b.status)}</span>
      <p>${both(b.vehicle)}</p>
    </div>
    <div class="rental-booking-grid">
      ${stopCard(b.pickup, guideLink)}
      ${stopCard(b.returnShop, '')}
      <div class="rental-card rental-booking-card">
        <div class="rental-card-header">
          <div class="rental-name-wrap">
            <h3 class="rental-name">${both({ en: 'Included &amp; Cost', zh: '包含項目及費用' })}</h3>
          </div>
        </div>
        <ul class="rental-features">${includedHtml}</ul>
        <table class="rental-price-table">
          ${priceHtml}
          <tr class="rental-price-total"><td>${both(b.total.label)}</td><td>${b.total.jpy}</td></tr>
        </table>
      </div>
    </div>`;
}
