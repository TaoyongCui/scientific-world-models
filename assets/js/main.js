(() => {
  'use strict';
  const header = document.getElementById('header');
  const toggle = document.querySelector('.menu-toggle');
  const backToTop = document.querySelector('.back-to-top');
  const sectionLinks = [...document.querySelectorAll('#navbar a[href^="#"]')];
  const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  function closeMenu() {
    header.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open navigation menu');
  }
  toggle?.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('menu-open')) {
      closeMenu();
      toggle.focus();
    }
  });
  document.querySelectorAll('#navbar a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) closeMenu();
  });

  function updateNavigation() {
    header.classList.toggle('scrolled', window.scrollY > 80);
    backToTop?.classList.toggle('active', window.scrollY > 250);
    const line = window.scrollY + 120;
    let activeId = sections[0]?.id;
    for (const section of sections) {
      if (section.offsetTop <= line) activeId = section.id;
    }
    for (const link of sectionLinks) {
      const active = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }
  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      updateNavigation();
      scheduled = false;
    });
  }, {passive: true});
  window.addEventListener('load', updateNavigation);
  updateNavigation();
})();
