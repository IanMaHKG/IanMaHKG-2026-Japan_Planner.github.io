/* ─── Overview Section ─── */
function renderOverview() {
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

  const stops = data.routeStops;
  const trackWrapEl = document.querySelector('.route-track-wrap');
  if (trackWrapEl) {
    trackWrapEl.style.setProperty('--stops-count', stops ? stops.length : 6);
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
