/**
 * @file ui.js
 * @description UI INTERACTION MODULE — navigation, language/theme selectors,
 * scroll observers, particle backgrounds, filters, and booking widgets.
 */

/* ─── Route Plan Switcher (Plan A / Plan B) ─── */
function initPlanSwitcher() {
  const currentPlan = localStorage.getItem('user-plan') || 'plan-a';
  setPlan(currentPlan, true);

  // Nav switcher buttons
  const navBtns = document.querySelectorAll('.plan-nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = e.currentTarget.dataset.plan;
      setPlan(selected);
    });
  });

  // Hero switcher buttons
  const heroBtns = document.querySelectorAll('.plan-hero-btn');
  heroBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = e.currentTarget.dataset.plan;
      setPlan(selected);
    });
  });
}

function setPlan(plan, isInitial = false) {
  const safePlan = plan === 'plan-b' ? 'plan-b' : 'plan-a';
  localStorage.setItem('user-plan', safePlan);

  // Update nav buttons
  const navBtns = document.querySelectorAll('.plan-nav-btn');
  navBtns.forEach(b => {
    const on = b.dataset.plan === safePlan;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', String(on));
  });

  const navSwitcher = document.querySelector('.plan-nav-switcher');
  if (navSwitcher) {
    navSwitcher.classList.toggle('slide-right', safePlan === 'plan-b');
  }

  // Update hero buttons
  const heroBtns = document.querySelectorAll('.plan-hero-btn');
  heroBtns.forEach(b => b.classList.toggle('active', b.dataset.plan === safePlan));

  // Dispatch custom planchange event
  window.dispatchEvent(new CustomEvent('planchange', { detail: { plan: safePlan, isInitial } }));
}

/* ─── Language Selector ─── */
function initLanguageSelector() {
  const currentLang = localStorage.getItem('user-lang') || 'en';
  setLanguage(currentLang);

  const btns = document.querySelectorAll('.lang-btn');
  btns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === currentLang));
    btn.addEventListener('click', (e) => {
      const selected = e.currentTarget.dataset.lang;
      setLanguage(selected);
      btns.forEach(b => {
        b.classList.toggle('active', b.dataset.lang === selected);
        b.setAttribute('aria-pressed', String(b.dataset.lang === selected));
      });
    });
  });
}

function setLanguage(lang) {
  document.body.classList.remove('lang-en', 'lang-zh-hk');
  document.body.classList.add(lang === 'zh-hk' ? 'lang-zh-hk' : 'lang-en');
  document.documentElement.setAttribute('lang', lang === 'zh-hk' ? 'zh-Hant' : 'en');
  localStorage.setItem('user-lang', lang);

  const switcher = document.querySelector('.lang-switcher');
  if (switcher) switcher.classList.toggle('slide-right', lang === 'zh-hk');

  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

/* ─── Theme (Dark / Light Mode) ─── */
function initTheme() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('user-theme') || (prefersDark ? 'dark' : 'light');
  setTheme(saved, true);

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
  if (!isInitial) localStorage.setItem('user-theme', theme);
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.setAttribute('aria-pressed', String(theme === 'dark'));

  if (!isInitial) {
    document.documentElement.classList.add('theme-transitioning');
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 400);
  }

  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

/* ─── Sticky Nav & Active Spy ─── */
function initNav() {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Back-to-top button */
  const topBtn = document.createElement('button');
  topBtn.type = 'button';
  topBtn.className = 'back-to-top';
  topBtn.setAttribute('aria-label', 'Back to top');
  topBtn.textContent = '\u2191';
  topBtn.addEventListener('click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
  document.body.appendChild(topBtn);

  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 80);
    }
    topBtn.classList.toggle('visible', window.scrollY > 600);
    updateActiveNav();
  }, { passive: true });
}

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ─── Hero Particle Canvas ─── */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const count = 35;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 8 + 6}s;
      animation-delay: ${Math.random() * 5}s;
      opacity: ${Math.random() * 0.6 + 0.2};
    `;
    container.appendChild(p);
  }
}

/* ─── Scroll Reveal Observer ─── */
function initScrollReveal() {
  document.querySelectorAll('section.section').forEach(s => s.classList.add('reveal'));
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

/* ─── Smooth Scroll Anchor Links ─── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const targetId = a.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 70;
        const bodyRect = document.body.getBoundingClientRect().top;
        const targetRect = target.getBoundingClientRect().top;
        const targetPos = targetRect - bodyRect - offset;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: targetPos, behavior: reduce ? 'auto' : 'smooth' });
      }
    });
  });
}

/* ─── Region Filters for Itinerary ─── */
function initFilters() {
  const tabs = document.querySelectorAll('.day-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.region || tab.dataset.filter;
      const cards = document.querySelectorAll('.day-card');
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.region === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ─── Booking.com Hotel Search Form ─── */
function initHotelSearch() {
  const form          = document.getElementById('hotel-search-form');
  const destInput     = document.getElementById('hotel-destination') || document.getElementById('hotel-dest');
  const checkinInput  = document.getElementById('hotel-checkin');
  const checkoutInput = document.getElementById('hotel-checkout');
  const adultsSelect  = document.getElementById('hotel-adults');
  const pills         = document.querySelectorAll('.leg-pill');

  function buildBookingUrl(dest, checkin, checkout, adults) {
    const params = new URLSearchParams({
      ss: dest,
      checkin: checkin,
      checkout: checkout,
      group_adults: adults,
      no_rooms: '1',
      group_children: '0'
    });
    return `https://www.booking.com/searchresults.html?${params.toString()}`;
  }

  pills.forEach(pill => {
    if (pill.dataset.bound) return;
    pill.dataset.bound = 'true';
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (destInput)     destInput.value     = pill.dataset.dest     || '';
      if (checkinInput)  checkinInput.value  = pill.dataset.checkin  || '';
      if (checkoutInput) checkoutInput.value = pill.dataset.checkout || '';
    });
  });

  if (form && !form.dataset.bound) {
    form.dataset.bound = 'true';
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const dest     = destInput     ? destInput.value.trim() : 'Tokyo, Japan';
      const checkin  = checkinInput  ? checkinInput.value     : '2026-12-20';
      const checkout = checkoutInput ? checkoutInput.value    : '2026-12-24';
      const adults   = adultsSelect  ? adultsSelect.value     : '2';
      window.open(buildBookingUrl(dest, checkin, checkout, adults), '_blank', 'noopener,noreferrer');
    });
  }
}

if (typeof window !== 'undefined') {
  window.initPlanSwitcher     = initPlanSwitcher;
  window.setPlan              = setPlan;
  window.initLanguageSelector = initLanguageSelector;
  window.setLanguage          = setLanguage;
  window.initTheme             = initTheme;
  window.setTheme              = setTheme;
  window.initNav               = initNav;
  window.updateActiveNav       = updateActiveNav;
  window.initParticles         = initParticles;
  window.initScrollReveal      = initScrollReveal;
  window.initSmoothScroll      = initSmoothScroll;
  window.initFilters           = initFilters;
  window.initHotelSearch       = initHotelSearch;
}
