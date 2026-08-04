/* ═══════════════════════════════════════════════════
   JAPAN WINTER JOURNEY 2026 — Interactive Scripts
   British Airways × Japan Airlines Edition
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSelector();
  initCurrencySelector();
  initParticles();
  initNav();
  initDayCards();
  initFilters();
  initScrollReveal();
  initSmoothScroll();
  initRouteMap();
});

/* ─── Language Selector ─── */
function initLanguageSelector() {
  const currentLang = localStorage.getItem('user-lang') || 'en';
  setLanguage(currentLang);

  const btns = document.querySelectorAll('.lang-btn');
  btns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
    btn.addEventListener('click', (e) => {
      const selected = e.target.dataset.lang;
      setLanguage(selected);
      btns.forEach(b => b.classList.toggle('active', b.dataset.lang === selected));
    });
  });
}

function setLanguage(lang) {
  document.body.classList.remove('lang-en', 'lang-zh-hk');
  if (lang === 'zh-hk') {
    document.body.classList.add('lang-zh-hk');
  } else {
    document.body.classList.add('lang-en');
  }
  localStorage.setItem('user-lang', lang);
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

/* ─── Currency Selector ─── */
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
}

function setCurrency(curr) {
  document.body.classList.remove('curr-hkd', 'curr-gbp');
  if (curr === 'gbp') {
    document.body.classList.add('curr-gbp');
  } else {
    document.body.classList.add('curr-hkd');
  }
  localStorage.setItem('user-curr', curr);
}


/* ─── Floating Particles (Hero) ─── */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 35;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    // BA-themed particle colours
    if (Math.random() > 0.7) {
      p.style.background = 'rgba(186, 12, 47, 0.15)'; // BA red
    } else if (Math.random() > 0.5) {
      p.style.background = 'rgba(7, 90, 170, 0.15)'; // BA navy
    } else {
      p.style.background = 'rgba(168, 184, 204, 0.1)'; // Silver
    }
    container.appendChild(p);
  }
}


/* ─── Navigation ─── */
function initNav() {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  // Show/hide nav on scroll
  let lastScroll = 0;
  const heroHeight = document.getElementById('hero')?.offsetHeight || 600;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;

    // Show nav after hero
    if (scroll > heroHeight * 0.6) {
      nav.classList.add('visible', 'scrolled');
    } else {
      nav.classList.remove('visible', 'scrolled');
    }

    // Update active nav link
    updateActiveNav();
    lastScroll = scroll;
  }, { passive: true });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    // Close menu on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }
}

function updateActiveNav() {
  const sections = ['overview', 'map-section', 'tips', 'itinerary', 'packing', 'budget'];
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) {
      current = id;
    }
  });

  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}


/* ─── Day Card Accordion ─── */
function toggleDay(header) {
  const card = header.closest('.day-card');
  const wasOpen = card.classList.contains('open');

  // Close all other cards
  document.querySelectorAll('.day-card.open').forEach(c => {
    if (c !== card) c.classList.remove('open');
  });

  // Toggle clicked card
  card.classList.toggle('open', !wasOpen);

  // Scroll into view if opening
  if (!wasOpen) {
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  }
}

// Make toggleDay globally accessible
window.toggleDay = toggleDay;

function initDayCards() {
  // Open the first day card by default
  const firstCard = document.querySelector('.day-card');
  if (firstCard) firstCard.classList.add('open');
}


/* ─── Day Filters ─── */
function initFilters() {
  const tabs = document.querySelectorAll('.day-tab');
  const cards = document.querySelectorAll('.day-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const region = tab.dataset.region;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter cards
      cards.forEach(card => {
        if (region === 'all' || card.dataset.region === region) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
          card.classList.remove('open');
        }
      });
    });
  });
}


/* ─── Interactive Route Map (Leaflet) ─── */
function initRouteMap() {
  const mapEl = document.getElementById('route-map');
  if (!mapEl || typeof L === 'undefined') return;

  // BA colour palette for the map
  const COLORS = {
    crane: '#D4163C',
    navy:  '#075AAA',
    gold:  '#C9A96E',
    teal:  '#2AAFAF',
    sky:   '#4A9FD9',
    red:   '#BA0C2F'
  };

  // Route stops with coordinates
  const stops = [
    {
      name: { en: 'Tokyo (東京)', zh: '東京' },
      lat: 35.6762, lng: 139.6503,
      days: { en: 'Days 1–4', zh: '第 1–4 天' },
      desc: { en: 'Asakusa, Shibuya, teamLab, Akihabara, winter illuminations', zh: '參訪淺草寺、澀谷、teamLab、秋葉原，賞冬季燈飾' },
      color: COLORS.crane,
      markerClass: 'marker-tokyo',
      label: 'TYO'
    },
    {
      name: { en: 'Kawaguchiko (河口湖)', zh: '河口湖' },
      lat: 35.5104, lng: 138.7564,
      days: { en: 'Day 5', zh: '第 5 天' },
      desc: { en: 'Mt Fuji views, Chureito Pagoda, ryokan & onsen', zh: '賞富士山美景，登新倉山淺間公園忠靈塔，住溫泉旅館' },
      color: COLORS.navy,
      markerClass: 'marker-fuji',
      label: 'FUJ'
    },
    {
      name: { en: 'Hakone (箱根)', zh: '箱根' },
      lat: 35.2329, lng: 139.1069,
      days: { en: 'Days 6–7', zh: '第 6–7 天' },
      desc: { en: 'Owakudani, Lake Ashi, pirate ship, onsen ryokan', zh: '走訪大涌谷地熱景區、搭蘆之湖海盜船、享頂級溫泉' },
      color: COLORS.gold,
      markerClass: 'marker-hakone',
      label: 'HKN'
    },
    {
      name: { en: 'Nagoya (名古屋)', zh: '名古屋' },
      lat: 35.1815, lng: 136.9066,
      days: { en: 'Day 7 (transit)', zh: '第 7 天 (中轉)' },
      desc: { en: 'Miso katsu dinner, drop off rental car', zh: '享用味噌炸豬排晚餐，名古屋還車，轉搭新幹線' },
      color: COLORS.teal,
      markerClass: 'marker-nagoya',
      label: 'NGO'
    },
    {
      name: { en: 'Kyoto (京都)', zh: '京都' },
      lat: 35.0116, lng: 135.7681,
      days: { en: 'Days 8–9', zh: '第 8–9 天' },
      desc: { en: 'Fushimi Inari, Kinkaku-ji, Arashiyama, tea ceremony', zh: '千本鳥居、金閣寺、嵐山竹林、體驗京都傳統茶道' },
      color: COLORS.red,
      markerClass: 'marker-kyoto',
      label: 'KYO'
    },
    {
      name: { en: 'Nara (奈良)', zh: '奈良' },
      lat: 34.6851, lng: 135.8048,
      days: { en: 'Day 10', zh: '第 10 天' },
      desc: { en: 'Deer Park, Todai-ji, Kasuga Taisha', zh: '造訪奈良公園親近小鹿、東大寺大佛殿、春日大社' },
      color: COLORS.sky,
      markerClass: 'marker-nara',
      label: 'NAR'
    },
    {
      name: { en: 'Osaka (大阪)', zh: '大阪' },
      lat: 34.6937, lng: 135.5023,
      days: { en: 'Days 11–12', zh: '第 11–12 天' },
      desc: { en: 'Osaka Castle, Dotonbori, street food, New Year\'s Eve', zh: '大阪城天守閣、道頓堀夜景與街頭美食、敲鐘跨年' },
      color: COLORS.crane,
      markerClass: 'marker-osaka',
      label: 'OSA'
    }
  ];

  // Dark map tile layer (CartoDB Dark Matter)
  const map = L.map('route-map', {
    center: [35.1, 137.5],
    zoom: 7,
    scrollWheelZoom: false,
    zoomControl: true
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Add route polyline segments with different colours
  // Tokyo → Kawaguchiko → Hakone (driving - dashed)
  const drivingCoords = stops.slice(0, 4).map(s => [s.lat, s.lng]);
  L.polyline(drivingCoords, {
    color: COLORS.navy,
    weight: 3,
    opacity: 0.7,
    dashArray: '8, 8',
    lineJoin: 'round'
  }).addTo(map);

  // Nagoya → Kyoto (Shinkansen - solid)
  const shinkansenCoords = [
    [stops[3].lat, stops[3].lng],
    [stops[4].lat, stops[4].lng]
  ];
  L.polyline(shinkansenCoords, {
    color: COLORS.red,
    weight: 3,
    opacity: 0.7,
    lineJoin: 'round'
  }).addTo(map);

  // Kyoto → Nara → Osaka (train - solid)
  const kansaiCoords = stops.slice(4).map(s => [s.lat, s.lng]);
  L.polyline(kansaiCoords, {
    color: COLORS.gold,
    weight: 3,
    opacity: 0.7,
    lineJoin: 'round'
  }).addTo(map);

  // Add markers
  const markers = [];
  stops.forEach((stop, i) => {
    const icon = L.divIcon({
      className: 'custom-marker ' + stop.markerClass,
      html: stop.label,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -20]
    });

    const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(map);
    markers.push(marker);

    const activeLang = document.body.classList.contains('lang-zh-hk') ? 'zh' : 'en';
    marker.bindPopup(`
      <h4>${stop.name[activeLang]}</h4>
      <p>${stop.desc[activeLang]}</p>
      <span class="popup-days">${stop.days[activeLang]}</span>
    `, { maxWidth: 220 });

    // Open Tokyo popup by default
    if (i === 0) {
      setTimeout(() => marker.openPopup(), 1000);
    }
  });

  // Re-bind popups dynamically on language switch
  window.addEventListener('langchange', (e) => {
    const lang = e.detail.lang === 'zh-hk' ? 'zh' : 'en';
    markers.forEach((marker, index) => {
      const stop = stops[index];
      marker.setPopupContent(`
        <h4>${stop.name[lang]}</h4>
        <p>${stop.desc[lang]}</p>
        <span class="popup-days">${stop.days[lang]}</span>
      `);
    });
  });

  // Fit map to all markers with padding
  const bounds = L.latLngBounds(stops.map(s => [s.lat, s.lng]));
  map.fitBounds(bounds, { padding: [40, 40] });

  // Re-enable scroll zoom after first interaction
  map.once('click', () => {
    map.scrollWheelZoom.enable();
  });

  // Handle resize
  window.addEventListener('resize', () => {
    map.invalidateSize();
  });
}


/* ─── Scroll Reveal Animation ─── */
function initScrollReveal() {
  // Add reveal class to elements
  const selectors = [
    '.overview-card',
    '.tip-card',
    '.day-card',
    '.packing-card',
    '.route-visual',
    '.budget-table-wrap',
    '.map-container'
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger within groups
      const delay = Math.min(i, 4);
      el.classList.add('reveal-delay-' + delay);
    });
  });

  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Invalidate map size when it becomes visible
        if (entry.target.classList.contains('map-container')) {
          const mapEl = document.getElementById('route-map');
          if (mapEl && mapEl._leaflet_id) {
            setTimeout(() => {
              const map = mapEl._leaflet_map;
              if (map) map.invalidateSize();
            }, 500);
          }
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


/* ─── Smooth Scroll for anchor links ─── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
