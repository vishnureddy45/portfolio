/**
 * Vishnu Varra Portfolio – main.js
 */
(function () {
  'use strict';

  // Preloader
  window.addEventListener('load', () => {
    const pre = document.getElementById('preloader');
    if (pre) { pre.style.opacity = '0'; setTimeout(() => pre.remove(), 400); }
  });

  // Scroll-top button
  const scrollTop = document.getElementById('scroll-top');
  if (scrollTop) {
    const toggle = () => window.scrollY > 200 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    window.addEventListener('scroll', toggle);
    scrollTop.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    toggle();
  }

  // Header scroll effect
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      window.scrollY > 20 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
    });
  }

  // Mobile nav
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      document.body.classList.toggle('mobile-nav-active');
      mobileToggle.classList.toggle('bi-list');
      mobileToggle.classList.toggle('bi-x');
    });
    document.querySelectorAll('.navmenu a').forEach(a => {
      a.addEventListener('click', () => {
        if (document.body.classList.contains('mobile-nav-active')) {
          document.body.classList.remove('mobile-nav-active');
          mobileToggle.classList.add('bi-list');
          mobileToggle.classList.remove('bi-x');
        }
      });
    });
  }

  // AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 650, easing: 'ease-out-cubic', once: true, offset: 50 });
  }

  // Typed.js
  const typedEl = document.querySelector('.typed');
  if (typedEl && typeof Typed !== 'undefined') {
    const items = (typedEl.dataset.typedItems || '').split(',').map(s => s.trim()).filter(Boolean);
    if (items.length) {
      new Typed('.typed', { strings: items, typeSpeed: 50, backSpeed: 28, backDelay: 2200, loop: true });
    }
  }

  // Skill bar animation
  const fills = document.querySelectorAll('.skill-fill');
  if (fills.length) {
    const animate = () => {
      fills.forEach(fill => {
        const rect = fill.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40 && !fill.dataset.done) {
          fill.dataset.done = '1';
          const w = fill.style.width;
          fill.style.width = '0';
          requestAnimationFrame(() => { fill.style.width = w; });
        }
      });
    };
    window.addEventListener('scroll', animate, { passive: true });
    animate();
  }

})();
