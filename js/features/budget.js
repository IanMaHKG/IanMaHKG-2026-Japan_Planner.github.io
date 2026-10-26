/* ─── Budget Table Section ─── */
function renderBudget(plan) {
  const currentPlan = plan || localStorage.getItem('user-plan') || 'plan-a';
  const rootData = (typeof window !== 'undefined' && window.SITE_DATA) ? window.SITE_DATA.budget : null;
  const tbodyEl = document.getElementById('budget-tbody');
  if (!tbodyEl || !rootData) return;

  const data = (currentPlan === 'plan-b') ? rootData.planB : rootData.planA;
  if (!data || !data.items) return;

  const rowsHtml = data.items.map(item => `
    <tr>
      <td>
        <span class="lang-en">${item.category.en}</span>
        <span class="lang-zh">${item.category.zh}</span>
      </td>
      <td>${item.jpy}</td>
      <td class="converted-val" data-min="${item.min}" data-max="${item.max}">
        ${item.initial}
      </td>
      <td>
        <span class="lang-en">${item.notes.en}</span>
        <span class="lang-zh">${item.notes.zh}</span>
      </td>
    </tr>
  `).join('');

  const totalHtml = `
    <tr class="budget-total">
      <td>
        <span class="lang-en">${data.total.category.en}</span>
        <span class="lang-zh">${data.total.category.zh}</span>
      </td>
      <td>${data.total.jpy}</td>
      <td class="converted-val budget-total-val" data-min="${data.total.min}" data-max="${data.total.max}">
        ${data.total.initial}
      </td>
      <td>
        <span class="lang-en">${data.total.notes.en}</span>
        <span class="lang-zh">${data.total.notes.zh}</span>
      </td>
    </tr>
  `;

  tbodyEl.innerHTML = rowsHtml + totalHtml;
  if (typeof updateConvertedBudgets === 'function') updateConvertedBudgets();
}
