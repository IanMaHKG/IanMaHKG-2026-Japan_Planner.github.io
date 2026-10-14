/* ─── Car Rental Search Section ─── */
function renderCarRental() {
  const data = (typeof window !== 'undefined' && window.SITE_DATA) ? window.SITE_DATA.carRental : null;
  if (!data) return;

  // Search card: intro + pickup pills
  const searchEl = document.getElementById('rental-search-card');
  if (searchEl) {
    const pillsHtml = data.quickPickup.map((p, i) => `
      <button class="rental-pickup-pill${i === 0 ? ' active' : ''}"
              onclick="selectRentalPickup(this)"
              data-location="${p.location}">
        <span class="lang-en">${p.label.en}</span>
        <span class="lang-zh">${p.label.zh}</span>
      </button>`).join('');

    searchEl.innerHTML = `
      <div class="rental-search-header">
        <div class="rental-search-brand">
          <span class="rental-brand-icon">🚗</span>
          <div>
            <h3>
              <span class="lang-en">Japan Rental Car Finder</span>
              <span class="lang-zh">日本租車搜尋器</span>
            </h3>
            <p class="rental-intro">
              <span class="lang-en">${data.intro.en}</span>
              <span class="lang-zh">${data.intro.zh}</span>
            </p>
          </div>
        </div>
        <div class="rental-pickup-row">
          <span class="rental-pickup-label">
            <span class="lang-en">📍 Pickup location:</span>
            <span class="lang-zh">📍 取車地點：</span>
          </span>
          <div class="rental-pickup-pills">${pillsHtml}</div>
        </div>
      </div>
    `;
  }

  // Vehicle size recommendation
  const vehicleEl = document.getElementById('rental-vehicle-rec');
  if (vehicleEl && data.vehicleRec) {
    const vr = data.vehicleRec;
    const picksHtml = vr.picks.map(p => `
      <div class="vr-card vr-${p.verdict}" id="${p.id}">
        <div class="vr-card-top">
          <span class="vr-icon">${p.icon}</span>
          <div class="vr-info">
            <h4 class="vr-category">
              <span class="lang-en">${p.category.en}</span>
              <span class="lang-zh">${p.category.zh}</span>
            </h4>
            <p class="vr-models">
              <span class="lang-en">${p.models.en}</span>
              <span class="lang-zh">${p.models.zh}</span>
            </p>
          </div>
          <span class="vr-badge ${p.badgeClass}">
            <span class="lang-en">${p.badge.en}</span>
            <span class="lang-zh">${p.badge.zh}</span>
          </span>
        </div>
        <p class="vr-boot">
          🧳 <span class="lang-en"><strong>Boot:</strong> ${p.boot.en}</span>
              <span class="lang-zh"><strong>尾箱：</strong>${p.boot.zh}</span>
        </p>
        <p class="vr-why">
          <span class="lang-en">${p.why.en}</span>
          <span class="lang-zh">${p.why.zh}</span>
        </p>
      </div>`).join('');

    vehicleEl.innerHTML = `
      <div class="vr-heading">
        <span class="vr-heading-icon">🧳</span>
        <div>
          <h3 class="vr-heading-title">
            <span class="lang-en">Which Car Size for Your Group?</span>
            <span class="lang-zh">應選哪種車型？</span>
          </h3>
          <p class="vr-luggage-context">
            <span class="lang-en">${vr.luggageContext.en}</span>
            <span class="lang-zh">${vr.luggageContext.zh}</span>
          </p>
        </div>
      </div>
      <div class="vr-grid">${picksHtml}</div>
    `;
  }

  // Company cards
  const gridEl = document.getElementById('rental-companies-grid');
  if (gridEl) {
    gridEl.innerHTML = data.companies.map(co => {
      const featuresHtml = co.features.map(f => `
        <li>
          <span class="lang-en">${f.en}</span>
          <span class="lang-zh">${f.zh}</span>
        </li>`).join('');

      return `
        <div class="rental-card" id="${co.id}">
          <div class="rental-card-header">
            <span class="rental-logo">${co.logo}</span>
            <div class="rental-name-wrap">
              <h3 class="rental-name">${co.name}</h3>
              <p class="rental-name-jp">${co.nameJp}</p>
            </div>
            <span class="rental-badge ${co.badgeClass}">
              <span class="lang-en">${co.badge.en}</span>
              <span class="lang-zh">${co.badge.zh}</span>
            </span>
          </div>
          <p class="rental-tagline">
            <span class="lang-en">${co.tagline.en}</span>
            <span class="lang-zh">${co.tagline.zh}</span>
          </p>
          <ul class="rental-features">${featuresHtml}</ul>
          <div class="rental-note">
            <span class="lang-en">${co.note.en}</span>
            <span class="lang-zh">${co.note.zh}</span>
          </div>
          <a href="${co.searchUrl}" target="_blank" rel="noopener"
             class="rental-book-btn" id="${co.id}-btn">
            <span class="lang-en">Book on ${co.name} ↗</span>
            <span class="lang-zh">前往 ${co.nameJp} 預訂 ↗</span>
          </a>
        </div>
      `;
    }).join('');
  }
}

function selectRentalPickup(btn) {
  const all = btn.closest('.rental-pickup-pills').querySelectorAll('.rental-pickup-pill');
  all.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ─── Car Return Decision Helper Section ─── */
function renderCarReturn(plan) {
  const currentPlan = plan || localStorage.getItem('user-plan') || 'plan-a';
  const rootData = (typeof window !== 'undefined' && window.SITE_DATA) ? window.SITE_DATA.carReturn : null;
  if (!rootData) return;

  const data = (currentPlan === 'plan-b') ? rootData.planB : rootData.planA;
  if (!data) return;

  const ctxEl = document.getElementById('car-return-context');
  if (ctxEl && data.context) {
    ctxEl.innerHTML = `
      <span class="lang-en">${data.context.en}</span>
      <span class="lang-zh">${data.context.zh}</span>
    `;
  }

  const gridEl = document.getElementById('car-return-grid');
  if (gridEl && data.options) {
    gridEl.innerHTML = data.options.map(opt => {
      const prosHtml = opt.pros.map(p => `
        <li class="cr-pro">
          <span class="cr-bullet cr-bullet-pro">✓</span>
          <span class="lang-en">${p.en}</span>
          <span class="lang-zh">${p.zh}</span>
        </li>`).join('');

      const consHtml = opt.cons.map(c => `
        <li class="cr-con">
          <span class="cr-bullet cr-bullet-con">✗</span>
          <span class="lang-en">${c.en}</span>
          <span class="lang-zh">${c.zh}</span>
        </li>`).join('');

      const tipsHtml = (opt.tips || []).map(tip => `
        <div class="cr-tip-item">
          <span class="cr-tip-icon">${tip.icon}</span>
          <div class="cr-tip-body">
            <strong class="cr-tip-label">
              <span class="lang-en">${tip.label.en}</span>
              <span class="lang-zh">${tip.label.zh}</span>
            </strong>
            <p class="cr-tip-detail">
              <span class="lang-en">${tip.detail.en}</span>
              <span class="lang-zh">${tip.detail.zh}</span>
            </p>
          </div>
        </div>
      `).join('');

      return `
        <div class="cr-card verdict-${opt.verdict}" id="${opt.id}">
          <div class="cr-card-header">
            <div class="cr-city-icon">${opt.icon}</div>
            <div class="cr-city-info">
              <h3 class="cr-city-name">
                <span class="lang-en">${opt.title.en}</span>
                <span class="lang-zh">${opt.title.zh}</span>
              </h3>
              <p class="cr-subtitle">
                <span class="lang-en">${opt.subtitle.en}</span>
                <span class="lang-zh">${opt.subtitle.zh}</span>
              </p>
            </div>
            <div class="cr-verdict-badge verdict-badge-${opt.verdict}">
              <span class="lang-en">${opt.verdictLabel.en}</span>
              <span class="lang-zh">${opt.verdictLabel.zh}</span>
            </div>
          </div>
          <div class="cr-lists">
            <div class="cr-list-col">
              <h4 class="cr-list-heading cr-pros-heading">
                <span class="lang-en">✅ Pros</span>
                <span class="lang-zh">✅ 優點</span>
              </h4>
              <ul class="cr-list">${prosHtml}</ul>
            </div>
            <div class="cr-list-col">
              <h4 class="cr-list-heading cr-cons-heading">
                <span class="lang-en">❌ Cons</span>
                <span class="lang-zh">❌ 缺點</span>
              </h4>
              <ul class="cr-list">${consHtml}</ul>
            </div>
          </div>
          ${tipsHtml ? `
          <div class="cr-tips-toggle" onclick="toggleCarTips(this)" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleCarTips(this);}" role="button" tabindex="0" aria-expanded="false">
            <span class="cr-tips-toggle-icon">🗺️</span>
            <span class="cr-tips-toggle-label">
              <span class="lang-en">If you choose this — Hotels, Food &amp; Logistics</span>
              <span class="lang-zh">若選擇此方案 — 住宿、美食及行李安排</span>
            </span>
            <span class="cr-chevron">▼</span>
          </div>
          <div class="cr-tips-panel">
            ${tipsHtml}
          </div>` : ''}
        </div>
      `;
    }).join('');
  }

  const recEl = document.getElementById('car-return-rec');
  if (recEl && data.recommendation) {
    recEl.innerHTML = `
      <span class="lang-en">${data.recommendation.en}</span>
      <span class="lang-zh">${data.recommendation.zh}</span>
    `;
  }
}

function toggleCarTips(btn) {
  const panel = btn.nextElementSibling;
  const chevron = btn.querySelector('.cr-chevron');
  const isOpen = panel.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
  if (chevron) chevron.style.transform = isOpen ? 'rotate(180deg)' : '';
}

