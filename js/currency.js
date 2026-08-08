/**
 * @file currency.js
 * @description CURRENCY MODULE — handles JPY-to-HKD/GBP conversion with live rates.
 */

let JPY_EXCHANGE_RATES = {
  hkd: 0.051,   // approx. Aug 2026
  gbp: 0.0050   // approx. Aug 2026
};

/* ─── Init ─── */
function initCurrencySelector() {
  const currentCurr = localStorage.getItem('user-curr') || 'hkd';
  setCurrency(currentCurr);

  const btns = document.querySelectorAll('.curr-btn');
  btns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.curr === currentCurr);
    btn.addEventListener('click', (e) => {
      const selected = e.target.dataset.curr;
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
  document.body.classList.remove('curr-hkd', 'curr-gbp');
  document.body.classList.add(curr === 'gbp' ? 'curr-gbp' : 'curr-hkd');
  localStorage.setItem('user-curr', curr);

  const switcher = document.querySelector('.currency-switcher');
  if (switcher) {
    switcher.classList.toggle('slide-right', curr === 'gbp');
  }

  updateConvertedBudgets();
}

/* ─── Recalculate & Display Converted Budget Values ─── */
function updateConvertedBudgets() {
  const activeCurr = localStorage.getItem('user-curr') || 'hkd';
  const rate = JPY_EXCHANGE_RATES[activeCurr];
  const symbol = activeCurr === 'gbp' ? '£' : '$';
  const isGbp = activeCurr === 'gbp';

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

    if (el.classList.contains('budget-total-val')) {
      el.innerHTML = `<strong>${symbol}${fMin}–${symbol}${fMax}</strong>`;
    } else {
      el.innerHTML = `${symbol}${fMin}–${symbol}${fMax}`;
    }
  });
}

if (typeof window !== 'undefined') {
  window.JPY_EXCHANGE_RATES = JPY_EXCHANGE_RATES;
  window.initCurrencySelector = initCurrencySelector;
  window.fetchExchangeRates = fetchExchangeRates;
  window.setCurrency = setCurrency;
  window.updateConvertedBudgets = updateConvertedBudgets;
}
