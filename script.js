/* ═══════════════════════════════════════════════════
   JAPAN WINTER JOURNEY 2026 — Interactive Scripts
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNav();
  initDayCards();
  initFilters();
  initScrollReveal();
  initSmoothScroll();
});


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
    // Give some particles a warm tint
    if (Math.random() > 0.6) {
      p.style.background = 'rgba(244, 114, 182, 0.2)';
    } else if (Math.random() > 0.5) {
      p.style.background = 'rgba(129, 140, 248, 0.2)';
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
  const sections = ['overview', 'tips', 'itinerary', 'packing', 'budget'];
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


/* ─── Scroll Reveal Animation ─── */
function initScrollReveal() {
  // Add reveal class to elements
  const selectors = [
    '.overview-card',
    '.tip-card',
    '.day-card',
    '.packing-card',
    '.route-visual',
    '.budget-table-wrap'
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
