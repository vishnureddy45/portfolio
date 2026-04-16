/**
 * Vishnu Varra Portfolio – main.js
 */
(function () {
  'use strict';

  // Preloader
  window.addEventListener('load', function() {
    var pre = document.getElementById('preloader');
    if (pre) { pre.style.opacity = '0'; setTimeout(function(){ pre.remove(); }, 400); }
  });

  // Scroll-top button
  var scrollTop = document.getElementById('scroll-top');
  if (scrollTop) {
    var toggleScrollTop = function() {
      window.scrollY > 200 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    };
    window.addEventListener('scroll', toggleScrollTop);
    scrollTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    toggleScrollTop();
  }

  // Header scroll effect
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function() {
      window.scrollY > 20 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
    });
  }

  // ── MOBILE NAV DRAWER ──
  // Build a drawer element appended directly to <body>
  // so it is never trapped inside the header's stacking context
  var mobileToggle = document.querySelector('.mobile-nav-toggle');
  var navmenu = document.querySelector('.navmenu');

  if (mobileToggle && navmenu) {
    // Clone nav links
    var navLinks = navmenu.querySelectorAll('ul li');

    // Build drawer HTML
    var drawer = document.createElement('div');
    drawer.className = 'mobile-nav-drawer';
    drawer.setAttribute('id', 'mobileNavDrawer');

    var backdrop = document.createElement('div');
    backdrop.className = 'mobile-nav-backdrop';

    var panel = document.createElement('div');
    panel.className = 'mobile-nav-panel';

    var ul = document.createElement('ul');
    navLinks.forEach(function(li) {
      var clone = li.cloneNode(true);
      ul.appendChild(clone);
    });

    panel.appendChild(ul);
    drawer.appendChild(backdrop);
    drawer.appendChild(panel);
    document.body.appendChild(drawer);

    function openNav() {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      mobileToggle.classList.remove('bi-list');
      mobileToggle.classList.add('bi-x');
    }

    function closeNav() {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
      mobileToggle.classList.add('bi-list');
      mobileToggle.classList.remove('bi-x');
    }

    mobileToggle.addEventListener('click', function() {
      drawer.classList.contains('open') ? closeNav() : openNav();
    });

    // Close on backdrop click
    backdrop.addEventListener('click', closeNav);

    // Close on link click
    ul.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', closeNav);
    });

    // Close on resize back to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 991) closeNav();
    });
  }

  // AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 650, easing: 'ease-out-cubic', once: true, offset: 50 });
  }

  // Typed.js
  var typedEl = document.querySelector('.typed');
  if (typedEl && typeof Typed !== 'undefined') {
    var items = (typedEl.dataset.typedItems || '').split(',').map(function(s){ return s.trim(); }).filter(Boolean);
    if (items.length) {
      new Typed('.typed', { strings: items, typeSpeed: 50, backSpeed: 28, backDelay: 2200, loop: true });
    }
  }

  // Skill bar animation
  var fills = document.querySelectorAll('.skill-fill');
  if (fills.length) {
    var animateFills = function() {
      fills.forEach(function(fill) {
        var rect = fill.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40 && !fill.dataset.done) {
          fill.dataset.done = '1';
          var w = fill.style.width;
          fill.style.width = '0';
          requestAnimationFrame(function(){ fill.style.width = w; });
        }
      });
    };
    window.addEventListener('scroll', animateFills, { passive: true });
    animateFills();
  }

})();
