/* ─── Budget Table Section ─── */
function renderBudget(plan) {
  const currentPlan = plan || localStorage.getItem('user-plan') || 'plan-a';
  const rootData = (typeof window !== 'undefined' && window.SITE_DATA) ? window.SITE_DATA.budget : null;
  const tbodyEl = document.getElementById('budget-tbody');
  if (!tbodyEl || !rootData) return;

  const data = (currentPlan === 'plan-b') ? rootData.planB : rootData.planA;
  if (!data || !data.items) return;

  const subEl = document.getElementById('budget-subtitle');
  if (subEl) {
    const b = currentPlan === 'plan-b';
    subEl.innerHTML = b
      ? `<span class="lang-en">Approximate costs for 2 adults, 7 days (1 Twin Room throughout, moderate comfort level).</span>
         <span class="lang-zh">兩位成人同行，7天日本之旅大約費用估算（全程 1 間雙床房，以中等舒適標準計算，未含機票）。</span>`
      : `<span class="lang-en">Approximate costs for 2 adults, 12 days (1 Twin Room throughout, moderate comfort level).</span>
         <span class="lang-zh">兩位成人同行，12天日本之旅大約費用估算（全程 1 間雙床房，以中等舒適標準計算，未含機票）。</span>`;
  }

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
