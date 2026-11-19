/**
 * @file ui.js
 * @description UI INTERACTION MODULE — navigation, language/theme selectors,
 * scroll observers, particle backgrounds, filters, and booking widgets.
 */

function safeGetStorage(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}

function safeSetStorage(key, val) {
  try { localStorage.setItem(key, val); } catch (e) { /* ignore storage restrictions */ }
}

/* ─── Language Selector ─── */
function initLanguageSelector() {
  const currentLang = safeGetStorage('user-lang') === 'zh-hk' ? 'zh-hk' : 'en';
  setLanguage(currentLang);

  const btns = document.querySelectorAll('.lang-btn');
  btns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === currentLang));
    btn.addEventListener('click', (e) => {
      const selected = e.currentTarget.dataset.lang === 'zh-hk' ? 'zh-hk' : 'en';
      setLanguage(selected);
      btns.forEach(b => {
        b.classList.toggle('active', b.dataset.lang === selected);
        b.setAttribute('aria-pressed', String(b.dataset.lang === selected));
      });
    });
  });
}

function setLanguage(lang) {
  const safeLang = lang === 'zh-hk' ? 'zh-hk' : 'en';
  document.body.classList.remove('lang-en', 'lang-zh-hk');
  document.body.classList.add(safeLang === 'zh-hk' ? 'lang-zh-hk' : 'lang-en');
  document.documentElement.setAttribute('lang', safeLang === 'zh-hk' ? 'zh-Hant' : 'en');
  safeSetStorage('user-lang', safeLang);

  const switcher = document.querySelector('.lang-switcher');
  if (switcher) switcher.classList.toggle('slide-right', safeLang === 'zh-hk');

  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: safeLang } }));
}

/* ─── Theme (Dark / Light Mode) ─── */
function initTheme() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = safeGetStorage('user-theme');
  const initialTheme = saved === 'dark' || saved === 'light' ? saved : (prefersDark ? 'dark' : 'light');
  setTheme(initialTheme, true);

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
}

function setTheme(theme, isInitial = false) {
  const safeTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', safeTheme);
  if (!isInitial) safeSetStorage('user-theme', safeTheme);
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.setAttribute('aria-pressed', String(safeTheme === 'dark'));

  if (!isInitial) {
    document.documentElement.classList.add('theme-transitioning');
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 400);
  }

  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: safeTheme } }));
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
  }, { passive: true });

  const pairs = getNavPairs();
  if (pairs.length && typeof IntersectionObserver !== 'undefined') {
    const linkBySec = new Map(pairs.map(({ sec, link }) => [sec, link]));
    const spy = new IntersectionObserver((entries) => {
      const hit = entries.find(e => e.isIntersecting);
      if (hit) setActiveNavLink(linkBySec.get(hit.target));
    }, { rootMargin: '-25% 0px -65% 0px' });
    pairs.forEach(({ sec }) => spy.observe(sec));
  }
}

let _navPairs = null;
function getNavPairs() {
  if (!_navPairs) {
    _navPairs = [...document.querySelectorAll('section[id], header[id]')].map(sec => ({
      sec,
      link: document.querySelector(`.nav-links a[href="#${sec.getAttribute('id')}"]`)
    })).filter(p => p.link);
  }
  return _navPairs;
}

function setActiveNavLink(activeLink) {
  getNavPairs().forEach(({ link }) => link.classList.toggle('active', link === activeLink));
}

function updateActiveNav() {
  const scrollPos = window.scrollY + 120;
  for (const { sec, link } of getNavPairs()) {
    const top = sec.offsetTop;
    if (scrollPos >= top && scrollPos < top + sec.offsetHeight) {
      setActiveNavLink(link);
      break;
    }
  }
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
  }, { threshold: 0.01 });

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
        const navEl = document.getElementById('main-nav');
        const offset = (navEl ? navEl.offsetHeight : 60) + 10;
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

if (typeof window !== 'undefined') {
  window.initLanguageSelector = initLanguageSelector;
  window.setLanguage = setLanguage;
  window.initTheme = initTheme;
  window.setTheme = setTheme;
  window.initNav = initNav;
  window.updateActiveNav = updateActiveNav;
  window.initParticles = initParticles;
  window.initScrollReveal = initScrollReveal;
  window.initSmoothScroll = initSmoothScroll;
  window.initFilters = initFilters;
}
