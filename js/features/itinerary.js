/* ─── Itinerary Timeline ─── */
function renderItinerary(plan) {
  const currentPlan = plan || localStorage.getItem('user-plan') || 'plan-a';
  const container = document.getElementById('timeline');
  const itin = (currentPlan === 'plan-b' ? window.ITINERARY_DATA_B : window.ITINERARY_DATA_A) || window.ITINERARY_DATA;
  if (!container || !itin) return;

  // Sync window.ITINERARY_DATA so day mini-maps and lookup handlers receive active data
  window.ITINERARY_DATA = itin;

  // Update day filter tab visibility
  const planATab = document.querySelector('.plan-a-tab');
  const planBTab = document.querySelector('.plan-b-tab');
  if (planATab) planATab.style.display = currentPlan === 'plan-b' ? 'none' : '';
  if (planBTab) planBTab.style.display = currentPlan === 'plan-b' ? '' : 'none';

  // Reset active filter button to "all" and ensure day cards are shown
  document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
  const allTab = document.querySelector('.day-tab[data-region="all"]');
  if (allTab) allTab.classList.add('active');

  const html = itin.map(day => {
    const tagsHtml = day.tags.map(tag => {
      if (tag.type === 'city') {
        return `<span class="tag tag-city">${tag.text}</span>`;
      } else if (tag.type === 'transport') {
        return `<span class="tag tag-transport">${tag.text}</span>`;
      } else if (tag.type === 'pace') {
        return `
          <span class="tag tag-pace">
            <span class="lang-en">${tag.en}</span>
            <span class="lang-zh">${tag.zh}</span>
          </span>`;
      } else if (tag.type === 'special') {
        if (tag.text) {
          return `<span class="tag tag-special">${tag.text}</span>`;
        } else {
          return `
            <span class="tag tag-special">
              <span class="lang-en">${tag.en}</span>
              <span class="lang-zh">${tag.zh}</span>
            </span>`;
        }
      }
      return '';
    }).join('');

    const blocksHtml = day.blocks.map(block => {
      const mealHtml = block.activity.meal ? `
        <div class="meal-rec">
          <span class="meal-icon">${block.activity.meal.icon}</span>
          <span class="lang-en">${block.activity.meal.en}</span>
          <span class="lang-zh">${block.activity.meal.zh}</span>
        </div>` : '';

      return `
        <div class="timeline-block">
          <div class="time-badge">
            <span class="lang-en">${block.time.en}</span>
            <span class="lang-zh">${block.time.zh}</span>
          </div>
          <div class="activity">
            <h4>
              <span class="lang-en">${block.activity.title.en}</span>
              <span class="lang-zh">${block.activity.title.zh}</span>
            </h4>
            <p class="lang-en">${block.activity.desc.en}</p>
            <p class="lang-zh">${block.activity.desc.zh}</p>
            ${mealHtml}
          </div>
        </div>`;
    }).join('');

    const tipHtml = day.tip ? `
      <div class="day-tip">
        <span class="lang-en">${day.tip.en}</span>
        <span class="lang-zh">${day.tip.zh}</span>
      </div>` : '';

    return `
      <!-- ════ DAY ${day.dayNum} ════ -->
      <div class="day-card" data-region="${day.region}" id="${day.id}">
        <div class="day-header" onclick="toggleDay(this)" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleDay(this);}" role="button" tabindex="0" aria-expanded="false">
          <div class="day-badge">
            <span class="day-num">${day.dayNum}</span>
            <span class="day-date">${day.date}</span>
          </div>
          <div class="day-info">
            <h3>
              <span class="lang-en">${day.title.en}</span>
              <span class="lang-zh">${day.title.zh}</span>
            </h3>
            <div class="day-tags">
              ${tagsHtml}
            </div>
          </div>
          <div class="day-chevron">▼</div>
        </div>
        <div class="day-body">
          <div class="day-body-content">
            ${blocksHtml}
            ${tipHtml}
          </div>
          <div class="day-map" id="day-map-${day.id}"></div>
        </div>
      </div>`;
  }).join('\n');

  container.innerHTML = html;
}

/* ─── Day Card Accordion ─── */
function toggleDay(header) {
  const card = header.closest('.day-card');
  const wasOpen = card.classList.contains('open');

  // Close all other open cards and destroy their map contexts
  document.querySelectorAll('.day-card.open').forEach(c => {
    if (c !== card) {
      c.classList.remove('open');
      const hdr = c.querySelector('.day-header');
      if (hdr) hdr.setAttribute('aria-expanded', 'false');
      if (typeof window.destroyDayMap === 'function') window.destroyDayMap(c.id);
    }
  });

  // Toggle current card
  card.classList.toggle('open', !wasOpen);
  header.setAttribute('aria-expanded', !wasOpen ? 'true' : 'false');

  if (!wasOpen) {
    const dayId = card.id;
    const mapEl = document.getElementById('day-map-' + dayId);

    if (mapEl && typeof window.initDayMap === 'function') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const triggerMapInit = () => {
        if (mapEl.dataset.mapInited) {
          if (mapEl._leafletMap) mapEl._leafletMap.invalidateSize();
          if (mapEl._leafletFitAll) mapEl._leafletFitAll();
        } else {
          window.initDayMap(dayId);
        }
      };

      if (prefersReducedMotion) {
        triggerMapInit();
      } else {
        const targetProp = window.matchMedia('(orientation: landscape) and (min-width: 800px)').matches
          ? 'width' : 'height';

        let revealed = false;
        const onMapRevealed = (e) => {
          if (e && e.propertyName !== targetProp) return;
          if (revealed) return;
          revealed = true;
          mapEl.removeEventListener('transitionend', onMapRevealed);
          triggerMapInit();
        };

        mapEl.addEventListener('transitionend', onMapRevealed);
        // Safety timeout in case transitionend is dropped or interrupted
        setTimeout(onMapRevealed, 450);
      }
    }

    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  } else {
    if (typeof window.destroyDayMap === 'function') window.destroyDayMap(card.id);
  }
}

function initDayCards() {
  // All cards start collapsed
}

