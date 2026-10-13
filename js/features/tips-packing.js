/* ─── Practical Tips Section ─── */
function renderTips() {
  const tips = (typeof window !== 'undefined' && window.SITE_DATA) ? window.SITE_DATA.tips : null;
  const tipsEl = document.getElementById('tips-grid');
  if (!tipsEl || !tips) return;

  tipsEl.innerHTML = tips.map(tip => {
    const itemsHtml = tip.items.map(item => `
      <li>
        <span class="lang-en">${item.en}</span>
        <span class="lang-zh">${item.zh}</span>
      </li>
    `).join('');

    return `
      <div class="tip-card" id="${tip.id}">
        <div class="tip-header">
          <span class="tip-icon">${tip.icon}</span>
          <h3>
            <span class="lang-en">${tip.title.en}</span>
            <span class="lang-zh">${tip.title.zh}</span>
          </h3>
        </div>
        <ul>
          ${itemsHtml}
        </ul>
      </div>
    `;
  }).join('');
}

/* ─── Packing Essentials Section ─── */
function renderPacking() {
  const packing = (typeof window !== 'undefined' && window.SITE_DATA) ? window.SITE_DATA.packing : null;
  const packEl = document.getElementById('packing-grid');
  if (!packEl || !packing) return;

  packEl.innerHTML = packing.map(pack => {
    const itemsHtml = pack.items.map(item => `
      <li>
        <span class="lang-en">${item.en}</span>
        <span class="lang-zh">${item.zh}</span>
      </li>
    `).join('');

    return `
      <div class="packing-card" id="${pack.id}">
        <h3>
          <span class="lang-en">${pack.icon} ${pack.title.en}</span>
          <span class="lang-zh">${pack.icon} ${pack.title.zh}</span>
        </h3>
        <ul>
          ${itemsHtml}
        </ul>
      </div>
    `;
  }).join('');
}

