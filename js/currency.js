/**
 * @file currency.js
 * @description CURRENCY MODULE — handles JPY-to-HKD/GBP conversion with live rates.
 */

let JPY_EXCHANGE_RATES = {
  hkd: 0.051,   // approx. Aug 2026
  gbp: 0.0050   // approx. Aug 2026
};

let activeCurrency = 'hkd';

function safeGetStorage(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}

function safeSetStorage(key, val) {
  try { localStorage.setItem(key, val); } catch (e) { /* ignore storage restrictions */ }
}

function normaliseCurrency(curr) {
  return curr === 'gbp' ? 'gbp' : 'hkd';
}

/* ─── Init ─── */
function initCurrencySelector() {
  const currentCurr = normaliseCurrency(safeGetStorage('user-curr'));
  setCurrency(currentCurr);

  const btns = document.querySelectorAll('.curr-btn');
  btns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.curr === currentCurr);
    btn.addEventListener('click', (e) => {
      const selected = normaliseCurrency(e.currentTarget.dataset.curr);
      setCurrency(selected);
      btns.forEach(b => b.classList.toggle('active', b.dataset.curr === selected));
    });
  });

  // Fetch live rates on page load
  fetchExchangeRates();
}

/* ─── Live Rate Fetch (open.er-api.com) ─── */
async function fetchExchangeRates() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/JPY');
    if (!res.ok) throw new Error('API fetch failed');
    const data = await res.json();

    if (data && data.result === 'success') {
      JPY_EXCHANGE_RATES.hkd = data.rates.HKD || JPY_EXCHANGE_RATES.hkd;
      JPY_EXCHANGE_RATES.gbp = data.rates.GBP || JPY_EXCHANGE_RATES.gbp;

      const timeStr = data.time_last_update_utc
        ? new Date(data.time_last_update_utc).toLocaleDateString()
        : '';
      document.querySelectorAll('.live-rate-date').forEach(el => {
        el.innerText = timeStr;
      });
    }
  } catch (err) {
    console.warn('Failed to load live exchange rates, using fallback rates:', err);
  } finally {
    updateConvertedBudgets();
  }
}

/* ─── Apply Currency to Body & Switcher ─── */
function setCurrency(curr) {
  activeCurrency = normaliseCurrency(curr);
  document.body.classList.remove('curr-hkd', 'curr-gbp');
  document.body.classList.add(activeCurrency === 'gbp' ? 'curr-gbp' : 'curr-hkd');
  safeSetStorage('user-curr', activeCurrency);

  const switcher = document.querySelector('.currency-switcher');
  if (switcher) {
    switcher.classList.toggle('slide-right', activeCurrency === 'gbp');
  }

  updateConvertedBudgets();
}

/* ─── Recalculate & Display Converted Budget Values ─── */
function updateConvertedBudgets() {
  const stored = safeGetStorage('user-curr');
  const activeCurr = stored ? normaliseCurrency(stored) : activeCurrency;
  const rate = JPY_EXCHANGE_RATES[activeCurr];
  const symbol = activeCurr === 'gbp' ? '£' : '$';
  const isGbp = activeCurr === 'gbp';

  // Rates are JPY→X, so X:JPY is the inverse.
  document.querySelectorAll('.live-rate-pair').forEach(el => {
    el.textContent = `1 ${activeCurr.toUpperCase()} = ${(1 / rate).toFixed(2)} JPY`;
  });

  document.querySelectorAll('.converted-val').forEach(el => {
    const minJpy = parseFloat(el.getAttribute('data-min'));
    const maxJpy = parseFloat(el.getAttribute('data-max'));
    if (isNaN(minJpy) || isNaN(maxJpy)) return;

    const rawMin = minJpy * rate;
    const rawMax = maxJpy * rate;

    let roundedMin, roundedMax;
    if (isGbp) {
      roundedMin = Math.round(rawMin / 5) * 5;
      roundedMax = Math.round(rawMax / 5) * 5;
    } else {
      roundedMin = Math.round(rawMin / 100) * 100;
      roundedMax = Math.round(rawMax / 100) * 100;
    }

    const fMin = roundedMin.toLocaleString('en-US');
    const fMax = roundedMax.toLocaleString('en-US');
    const rangeText = fMin === fMax ? `${symbol}${fMin}` : `${symbol}${fMin}–${symbol}${fMax}`;

    if (el.classList.contains('budget-total-val')) {
      el.innerHTML = `<strong>${rangeText}</strong>`;
    } else {
      el.innerHTML = rangeText;
    }
  });
}

if (typeof window !== 'undefined') {
  window.JPY_EXCHANGE_RATES = JPY_EXCHANGE_RATES;
  window.normaliseCurrency = normaliseCurrency;
  window.initCurrencySelector = initCurrencySelector;
  window.fetchExchangeRates = fetchExchangeRates;
  window.setCurrency = setCurrency;
  window.updateConvertedBudgets = updateConvertedBudgets;
}
