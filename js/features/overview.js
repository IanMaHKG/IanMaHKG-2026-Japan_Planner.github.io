/* ─── Overview Section ─── */
function renderOverview(plan) {
  const currentPlan = plan || localStorage.getItem('user-plan') || 'plan-a';
  const data = (typeof window !== 'undefined' && window.SITE_DATA) ? window.SITE_DATA.overview : null;
  if (!data) return;

  const gridEl = document.getElementById('overview-grid');
  if (gridEl && data.cards) {
    gridEl.innerHTML = data.cards.map(card => `
      <div class="overview-card" id="${card.id}">
        <div class="ov-icon">${card.icon}</div>
        <h3>
          <span class="lang-en">${card.title.en}</span>
          <span class="lang-zh">${card.title.zh}</span>
        </h3>
        <p class="lang-en">${card.desc.en}</p>
        <p class="lang-zh">${card.desc.zh}</p>
      </div>
    `).join('');
  }

  // Update JR Board line branding & direction based on plan
  const lineTitleEl = document.querySelector('.jr-line-title');
  if (lineTitleEl) {
    if (currentPlan === 'plan-b') {
      lineTitleEl.innerHTML = `
        <span class="lang-en">Tokaido &amp; Shizuoka Scenic Loop · Winter 2026</span>
        <span class="lang-zh">東海道・靜岡悠閒環線 · 2026 冬</span>
      `;
    } else {
      lineTitleEl.innerHTML = `
        <span class="lang-en">Tokaido &amp; Kansai Main Line · Winter 2026</span>
        <span class="lang-zh">東海道・關西橫斷本線 · 2026 冬</span>
      `;
    }
  }

  const directionEl = document.querySelector('.jr-direction');
  if (directionEl) {
    if (currentPlan === 'plan-b') {
      directionEl.innerHTML = `
        <span class="lang-en">Loop via Fuji, Hakone &amp; Atami 方面 <span class="jr-arrow">▶</span></span>
        <span class="lang-zh">經 富士山、箱根、熱海 環線方面 <span class="jr-arrow">▶</span></span>
      `;
    } else {
      directionEl.innerHTML = `
        <span class="lang-en">Bound for Osaka 方面 <span class="jr-arrow">▶</span></span>
        <span class="lang-zh">往 大阪 方面 <span class="jr-arrow">▶</span></span>
      `;
    }
  }

  const stops = (currentPlan === 'plan-b' && data.routeStopsB) ? data.routeStopsB : (data.routeStopsA || data.routeStops);
  const stopsEl = document.getElementById('route-stops');
  if (stopsEl && stops) {
    stopsEl.innerHTML = stops.map(stop => `
      <div class="route-stop jr-station-node" data-stop="${stop.label}">
        <div class="jr-station-top">
          <div class="jr-station-code" style="--code-color: ${stop.color};">
            <span class="jr-code-prefix">${stop.label}</span>
            <span class="jr-code-num">${stop.code}</span>
          </div>
          <div class="jr-station-kanji">${stop.kanji}</div>
          <div class="jr-station-kana">${stop.hiragana}</div>
        </div>

        <div class="jr-station-dot-wrapper">
          <div class="stop-dot ${stop.dotClass}" style="--dot-color: ${stop.color};">
            <span class="dot-inner-core"></span>
          </div>
        </div>

        <div class="jr-station-bottom">
          <div class="jr-station-romaji">${stop.romaji}</div>
          <div class="jr-station-days">
            <span class="lang-en">${stop.days.en}</span>
            <span class="lang-zh">${stop.days.zh}</span>
          </div>
        </div>
      </div>
    `).join('');
  }
}

