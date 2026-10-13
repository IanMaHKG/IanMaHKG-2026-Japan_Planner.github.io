/* ─── Flight Options Section ─── */
/**
 * Renders the Flight Options section from window.FLIGHTS_DATA.
 * Displays up to 5 route options per tab, each with a legs table.
 */
function renderFlights() {
  const el = document.getElementById('flights-section-content');
  if (!el) return;
  const data = (typeof window !== 'undefined' && window.FLIGHTS_DATA) ? window.FLIGHTS_DATA : null;
  if (!data || !data.routes || !data.routes.length) return;

  // Detect language
  const isZh = document.body.classList.contains('lang-zh-hk');

  // Helper: format "2026-12-19 09:10" → "09:10" and date portion
  function fmtTime(dt) {
    if (!dt) return '—';
    const parts = dt.split(' ');
    return parts[1] || dt;
  }
  function fmtDate(dt) {
    if (!dt) return '';
    const d = new Date(dt.replace(' ', 'T'));
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }

  // Airline icon mapping
  const airlineIcon = {
    'British Airways': '✈',
    'Finnair':         '🇫🇮',
    'Lufthansa':       '🇩🇪',
    'SWISS':           '🇨🇭',
    'Etihad Airways':  '🇦🇪',
  };

  // Build tabs HTML
  const tabsHtml = data.routes.map((route, i) => `
    <button class="flights-route-tab${i === 0 ? ' active' : ''}"
            onclick="flightsSelectTab(${i})" role="tab"
            id="flights-tab-${i}">
      <span class="lang-en">${route.label.en}</span>
      <span class="lang-zh">${route.label.zh}</span>
    </button>
  `).join('');

  // Build panels HTML
  const panelsHtml = data.routes.map((route, ri) => {
    const optionsHtml = route.options.map((opt, oi) => {
      // Build leg rows
      const legRows = opt.legs.map((leg, li) => {
        const icon = airlineIcon[leg.airline] || '✈';
        const layover = li < opt.legs.length - 1
          ? `<tr class="flight-layover-row">
               <td colspan="5">⏱ <span class="lang-en">Layover at ${opt.legs[li + 1].from}</span><span class="lang-zh">轉機：${opt.legs[li + 1].from}</span></td>
             </tr>`
          : '';
        return `
          <tr>
            <td><span class="flt-num">${leg.flight}</span></td>
            <td><span class="lang-en" style="font-size:0.78rem">${icon} ${leg.airline}</span><span class="lang-zh" style="font-size:0.78rem">${icon} ${leg.airline}</span></td>
            <td>
              <div class="flt-route">
                <span class="flt-iata">${leg.from}</span>
                <span class="flt-arrow">→</span>
                <span class="flt-iata">${leg.to}</span>
              </div>
            </td>
            <td>
              <span class="flt-time">${fmtTime(leg.dep)}</span>
              <span class="flt-date-small">${fmtDate(leg.dep)}</span>
            </td>
            <td>
              <span class="flt-time">${fmtTime(leg.arr)}</span>
              <span class="flt-date-small">${fmtDate(leg.arr)}</span>
            </td>
          </tr>${layover}`;
      }).join('');

      // Total duration (first dep → last arr)
      const firstDep = new Date(opt.legs[0].dep.replace(' ', 'T'));
      const lastArr  = new Date(opt.legs[opt.legs.length - 1].arr.replace(' ', 'T'));
      const durMs    = lastArr - firstDep;
      const durH     = Math.floor(durMs / 3600000);
      const durM     = Math.round((durMs % 3600000) / 60000);
      const durStr   = !isNaN(durH) ? `${durH}h ${durM}m` : '';

      return `
        <article class="flight-option-card" id="flight-opt-${opt.id}">
          <div class="flight-option-header">
            <div class="flight-option-badge">
              <span class="flight-option-num">${oi + 1}</span>
              <span class="flight-option-label">
                <span class="lang-en">${opt.label.en}</span>
                <span class="lang-zh">${opt.label.zh}</span>
              </span>
              <span class="flight-airline-tag">${opt.airline}</span>
            </div>
            <span class="flight-option-summary">
              <span class="lang-en">${opt.legs.length > 1 ? opt.legs.length - 1 + ' stop' + (opt.legs.length > 2 ? 's' : '') : 'Non-stop'} · ${durStr}</span>
              <span class="lang-zh">${opt.legs.length > 1 ? '轉' + (opt.legs.length - 1) + '程' : '直航'} · ${durStr}</span>
            </span>
          </div>
          <table class="flight-legs-table" role="table" aria-label="Flight legs for option ${oi + 1}">
            <thead>
              <tr>
                <th><span class="lang-en">Flight</span><span class="lang-zh">航班</span></th>
                <th><span class="lang-en">Airline</span><span class="lang-zh">航空公司</span></th>
                <th><span class="lang-en">Route</span><span class="lang-zh">航段</span></th>
                <th><span class="lang-en">Departure</span><span class="lang-zh">出發</span></th>
                <th><span class="lang-en">Arrival</span><span class="lang-zh">抵達</span></th>
              </tr>
            </thead>
            <tbody>${legRows}</tbody>
          </table>
        </article>`;
    }).join('');

    return `
      <div class="flights-route-panel${ri === 0 ? ' active' : ''}" id="flights-panel-${ri}" role="tabpanel">
        <div class="flights-route-heading">
          <h3>
            <span class="lang-en">✈ ${route.label.en}</span>
            <span class="lang-zh">✈ ${route.label.zh}</span>
          </h3>
          <span class="flights-route-date">
            <span class="lang-en">${route.date.en}</span>
            <span class="lang-zh">${route.date.zh}</span>
          </span>
        </div>
        <div class="flights-options-list">${optionsHtml}</div>
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="flights-route-tabs" role="tablist">${tabsHtml}</div>
    ${panelsHtml}
  `;
}

/** Tab switcher for the flights section */
function flightsSelectTab(index) {
  document.querySelectorAll('.flights-route-tab').forEach((t, i) =>
    t.classList.toggle('active', i === index));
  document.querySelectorAll('.flights-route-panel').forEach((p, i) =>
    p.classList.toggle('active', i === index));
}

