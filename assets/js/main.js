(() => {
  const root = document.documentElement;
  root.classList.remove('no-js');

  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('[data-nav-menu]');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') {
          return;
        }
        const target = document.querySelector(targetId);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
})();
