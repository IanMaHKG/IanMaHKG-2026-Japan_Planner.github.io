/* ─── Flight Options Section ─── */
/**
 * Renders the Flight Options section from window.FLIGHTS_DATA.
 * Displays up to 5 route options per tab, each with a legs table.
 */
function renderFlights(plan) {
  const el = document.getElementById('flights-section-content');
  if (!el) return;
  const data = (typeof window !== 'undefined' && window.FLIGHTS_DATA) ? window.FLIGHTS_DATA : null;
  if (!data || !data.routes || !data.routes.length) return;

  // Routes without `plans` show on both plans; others only on the plans they list.
  const currentPlan = plan || localStorage.getItem('user-plan') || 'plan-a';
  const routes = data.routes.filter(r => !r.plans || r.plans.includes(currentPlan));
  const hasPlanRoutes = data.routes.some(r => r.plans && r.plans.includes(currentPlan));

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
    'British Airways':    '✈',
    'Finnair':            '🇫🇮',
    'Lufthansa':          '🇩🇪',
    'SWISS':              '🇨🇭',
    'Etihad Airways':     '🇦🇪',
    'Cathay Pacific':     '🇭🇰',
    'Hong Kong Express':  '🇭🇰',
    'All Nippon Airways': '🇯🇵',
    'Japan Airlines':     '🇯🇵',
    'Peach Aviation':     '🍑',
  };

  // Winter UTC offsets live once in FLIGHTS_DATA.tz (also read by scripts/validate.mjs)
  const AIRPORT_TZ_OFFSETS = data.tz || {};

  function parseUtcMs(dtStr, iata) {
    if (!dtStr) return NaN;
    const offsetHours = AIRPORT_TZ_OFFSETS[iata];
    if (offsetHours === undefined) return NaN;   // unknown airport: show no duration rather than a wrong one
    const [datePart, timePart] = dtStr.split(' ');
    const [y, m, d] = datePart.split('-').map(Number);
    const [hh, mm] = timePart.split(':').map(Number);
    return Date.UTC(y, m - 1, d, hh - offsetHours, mm);
  }

  // Build tabs HTML
  const tabsHtml = routes.map((route, i) => `
    <button class="flights-route-tab${i === 0 ? ' active' : ''}"
            onclick="flightsSelectTab(${i})" role="tab"
            id="flights-tab-${i}">
      <span class="lang-en">${route.label.en}</span>
      <span class="lang-zh">${route.label.zh}</span>
    </button>
  `).join('');

  // Build panels HTML
  const panelsHtml = routes.map((route, ri) => {
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

      // Total duration in UTC (first dep → last arr, accounting for airport time zones)
      const firstLeg = opt.legs[0];
      const lastLeg  = opt.legs[opt.legs.length - 1];
      const depUtc   = parseUtcMs(firstLeg.dep, firstLeg.from);
      const arrUtc   = parseUtcMs(lastLeg.arr, lastLeg.to);
      const durMs    = arrUtc - depUtc;
      const durH     = Math.floor(durMs / 3600000);
      const durM     = Math.round((durMs % 3600000) / 60000);
      const durStr   = !isNaN(durH) && durMs > 0 ? `${durH}h ${durM}m` : '';

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

  // Interim note: shown while the active plan has no route of its own (e.g. Tokyo returns for Plan B)
  const planNoteHtml = hasPlanRoutes ? '' : `
    <p class="section-subtitle">
      <span class="lang-en">Return flights for this plan depart from Tokyo (HND/NRT); verified options will be added here.</span>
      <span class="lang-zh">此方案回程由東京（羽田/成田）出發，經核實的航班選擇將會在此補充。</span>
    </p>`;

  el.innerHTML = `
    <div class="flights-route-tabs" role="tablist">${tabsHtml}</div>
    ${panelsHtml}
    ${planNoteHtml}
  `;
}

/** Tab switcher for the flights section */
function flightsSelectTab(index) {
  document.querySelectorAll('.flights-route-tab').forEach((t, i) =>
    t.classList.toggle('active', i === index));
  document.querySelectorAll('.flights-route-panel').forEach((p, i) =>
    p.classList.toggle('active', i === index));
}

