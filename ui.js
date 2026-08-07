/**
 * @file ui.js
 * @description UI INTERACTION MODULE — all user-facing interaction logic except
 * currency conversion (see currency.js) and map (see map.js).
 *
 * DEPENDS ON: nothing (self-contained; uses DOM and localStorage)
 *
 * EXPORTS (global functions, called by script.js):
 *   - initLanguageSelector()  Reads 'user-lang' from localStorage (default: 'en').
 *                             Wires .lang-btn clicks → setLanguage().
 *   - setLanguage(lang)       Adds body.lang-en or body.lang-zh-hk; persists to localStorage;
 *                             slides .lang-switcher pill; fires 'langchange' CustomEvent
 *                             (consumed by map.js to re-bind popup text).
 *   - initNav()               Makes #main-nav permanently visible (BA.com style — no hide on scroll).
 *                             Wires mobile #nav-toggle hamburger + closes on link click.
 *                             Registers scroll listener → updateActiveNav().
 *   - updateActiveNav()       Highlights the nav link matching the section currently in view.
 *   - initParticles()         Creates 35 floating <div class="particle"> elements inside #particles.
 *                             Randomises size, position, duration, delay, and colour (white/red/blue).
 *   - initScrollReveal()      Adds .reveal and .reveal-delay-N classes to card/section elements.
 *                             Uses IntersectionObserver to add .visible when they scroll into view.
 *                             Calls map.resize() via the MapLibre shim on #map-container appear.
 *   - initSmoothScroll()      Intercepts all <a href="#..."> clicks for smooth 80px-offset scroll.
 *   - initFilters()           Wires .day-tab buttons → shows/hides .day-card by data-region.
 *   - initHotelSearch()       Wires:
 *       • .leg-pill clicks  → prefill #hotel-destination / checkin / checkout fields
 *       • #hotel-search-form submit → buildBookingUrl() → window.open()
 *       • .hotel-leg-btn clicks → buildBookingUrl() → window.open()
 *       buildBookingUrl() reads current currency + language from localStorage to
 *       pass selected_currency and lang params to Booking.com.
 *
 * LANGUAGE SWITCHER CONTRACT:
 *   Two buttons with class .lang-btn and data-lang="en" / data-lang="zh-hk".
 *   One .lang-switcher container with a .switcher-slider child (CSS handles slide animation).
 *
 * REGION FILTER CONTRACT:
 *   .day-tab buttons must have data-region attribute matching .day-card data-region values.
 *   Special value "all" shows every card.
 */


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
  document.body.classList.add(lang === 'zh-hk' ? 'lang-zh-hk' : 'lang-en');
  // Update <html lang> for screen readers and browser translation tools
  document.documentElement.setAttribute('lang', lang === 'zh-hk' ? 'zh-Hant' : 'en');
  localStorage.setItem('user-lang', lang);

  const switcher = document.querySelector('.lang-switcher');
  if (switcher) switcher.classList.toggle('slide-right', lang === 'zh-hk');

  // Notify other modules (e.g. map.js popup rebind)
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}


/* ─── Theme (Dark / Light Mode) ─── */
function initTheme() {
  // Theme may already be applied by the flash-prevention <script> in <head>.
  // This function's job is to wire the toggle button click.
  const saved = localStorage.getItem('user-theme') || 'light';
  setTheme(saved, /* initial */ true);

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
}

function setTheme(theme, isInitial = false) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('user-theme', theme);

  // Apply .theme-transitioning briefly so CSS can animate
  // the colour change without permanently slowing down other transitions.
  if (!isInitial) {
    document.documentElement.classList.add('theme-transitioning');
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 400);
  }

  // Notify map.js (and any other listener) to switch map style
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}


/* ─── Navigation Bar ─── */
function initNav() {
  const nav    = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');

  // BA.com style: always show the navy nav bar
  nav.classList.add('visible', 'scrolled');

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // Mobile hamburger
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }
}

function updateActiveNav() {
  const sections = ['overview', 'map-section', 'tips', 'itinerary', 'packing', 'budget', 'hotels'];
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) current = id;
  });

  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}


/* ─── Hero Floating Particles ─── */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
    `;

    const rand = Math.random();
    if (rand > 0.7) {
      p.style.background = 'rgba(255, 255, 255, 0.12)'; // white
    } else if (rand > 0.4) {
      p.style.background = 'rgba(235, 34, 38, 0.18)';   // BA red
    } else {
      p.style.background = 'rgba(7, 90, 170, 0.18)';    // BA blue
    }

    container.appendChild(p);
  }
}


/* ─── Scroll-Reveal (IntersectionObserver) ─── */
function initScrollReveal() {
  const selectors = [
    '.overview-card',
    '.tip-card',
    '.day-card',
    '.packing-card',
    '.route-visual',
    '.budget-table-wrap',
    '.map-container',
    '.hotel-leg-card',
    '.vr-card',
    '.cr-card'
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal', `reveal-delay-${Math.min(i, 4)}`);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


/* ─── Smooth Anchor Scrolling ─── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}


/* ─── Itinerary Region Filter Tabs ─── */
function initFilters() {
  const tabs  = document.querySelectorAll('.day-tab');
  const cards = document.querySelectorAll('.day-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const region = tab.dataset.region;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      cards.forEach(card => {
        const show = region === 'all' || card.dataset.region === region;
        card.classList.toggle('hidden', !show);
        if (!show) card.classList.remove('open');
      });
    });
  });
}


/* ─── Booking.com Hotel Search Widget ─── */
function initHotelSearch() {
  const form          = document.getElementById('hotel-search-form');
  const destInput     = document.getElementById('hotel-destination');
  const checkinInput  = document.getElementById('hotel-checkin');
  const checkoutInput = document.getElementById('hotel-checkout');
  const adultsSelect  = document.getElementById('hotel-adults');
  const legPills      = document.querySelectorAll('.leg-pill');
  const legBtns       = document.querySelectorAll('.hotel-leg-btn');

  /** Build a fully-parameterised Booking.com search URL */
  function buildBookingUrl(destination, checkin, checkout, adults) {
    const activeCurr = (localStorage.getItem('user-curr') || 'hkd').toUpperCase();
    const activeLang = localStorage.getItem('user-lang') || 'en';
    const bookingLang = activeLang === 'zh-hk' ? 'zh-tw' : 'en-gb';

    const params = new URLSearchParams({
      ss: destination,
      checkin,
      checkout,
      group_adults: adults || '3',
      no_rooms: '1',
      group_children: '0',
      selected_currency: activeCurr,
      lang: bookingLang
    });

    return `https://www.booking.com/searchresults.html?${params.toString()}`;
  }

  // Quick-leg pills → populate form fields
  legPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      legPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (destInput)     destInput.value     = pill.dataset.dest     || '';
      if (checkinInput)  checkinInput.value  = pill.dataset.checkin  || '';
      if (checkoutInput) checkoutInput.value = pill.dataset.checkout || '';
    });
  });

  // Main search form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const dest     = destInput     ? destInput.value.trim() : 'Tokyo, Japan';
      const checkin  = checkinInput  ? checkinInput.value     : '2026-12-20';
      const checkout = checkoutInput ? checkoutInput.value    : '2026-12-24';
      const adults   = adultsSelect  ? adultsSelect.value     : '3';
      window.open(buildBookingUrl(dest, checkin, checkout, adults), '_blank', 'noopener,noreferrer');
    });
  }

  // Curated leg card "Search" buttons
  legBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dest     = btn.dataset.dest     || 'Tokyo, Japan';
      const checkin  = btn.dataset.checkin  || '2026-12-20';
      const checkout = btn.dataset.checkout || '2026-12-24';
      const adults   = adultsSelect ? adultsSelect.value : '3';
      window.open(buildBookingUrl(dest, checkin, checkout, adults), '_blank', 'noopener,noreferrer');
    });
  });
}
