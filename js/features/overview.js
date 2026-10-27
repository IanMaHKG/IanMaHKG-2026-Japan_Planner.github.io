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
        <span class="lang-en">Loop via Fuji, Hakone &amp; Kamakura 方面 <span class="jr-arrow">▶</span></span>
        <span class="lang-zh">經 富士山、箱根、鎌倉 環線方面 <span class="jr-arrow">▶</span></span>
      `;
    } else {
      directionEl.innerHTML = `
        <span class="lang-en">Bound for Osaka 方面 <span class="jr-arrow">▶</span></span>
        <span class="lang-zh">往 大阪 方面 <span class="jr-arrow">▶</span></span>
      `;
    }
  }

  const legendEl = document.getElementById('map-legend');
  if (legendEl) {
    const legs = currentPlan === 'plan-b'
      ? [['leg-tokyo', 'Tokyo (東京) (Days 1–2)', '東京 (第 1–2 天)'],
         ['leg-fuji', 'Mt Fuji & Hakone Drive (Days 3–5)', '富士山及箱根自駕 (第 3–5 天)'],
         ['leg-kansai', 'Kamakura, Yokohama & Tokyo Finale (Days 5–7)', '鎌倉、橫濱及東京終站 (第 5–7 天)']]
      : [['leg-tokyo', 'Tokyo (東京) (Days 1–4)', '東京 (第 1–4 天)'],
         ['leg-fuji', 'Mt Fuji Drive (富士山自駕) (Days 5–7)', '富士山自駕路段 (第 5–7 天)'],
         ['leg-kansai', 'Kansai (關西) (Days 7–12)', '關西 (第 7–12 天)']];
    legendEl.innerHTML = legs.map(([cls, en, zh]) => `
      <div class="legend-item">
        <div class="legend-dot ${cls}"></div>
        <span><span class="lang-en">${en}</span><span class="lang-zh">${zh}</span></span>
      </div>`).join('');
  }

  const stops = currentPlan === 'plan-b' ? data.routeStopsB : data.routeStopsA;
  const trackWrapEl = document.querySelector('.route-track-wrap');
  if (trackWrapEl) {
    trackWrapEl.setAttribute('data-plan', currentPlan);
    trackWrapEl.style.setProperty('--stops-count', stops ? stops.length : 7);
  }
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
