// Abrar Zamil — portfolio
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Count up the proof numbers once, when they scroll into view.
  var counters = document.querySelectorAll('[data-count]');
  function run(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target) || reduce) return;
    var start = null, dur = 1600;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(counters, function (el) { io.observe(el); });
  }

  // Hero parallax: the floating cards drift with the pointer.
  if (!reduce) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-parallax]'), function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        el.style.setProperty('--mx', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
        el.style.setProperty('--my', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
      });
      el.addEventListener('mouseleave', function () {
        el.style.setProperty('--mx', '0');
        el.style.setProperty('--my', '0');
      });
    });
  }
  // Contact form: show the thank-you note after FormSubmit redirects back with ?sent=1.
  var note = document.getElementById('sent-note');
  if (note && /[?&]sent=1(&|$)/.test(window.location.search)) note.hidden = false;
  // Mobile menu: toggle the stacked page links; close on link tap, Escape, or when the viewport widens.
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    var navEl = toggle.closest('nav');
    var setMenu = function (open) {
      navEl.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    Array.prototype.forEach.call(navEl.querySelectorAll('.nav-links a'), function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navEl.classList.contains('open')) { setMenu(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 760px)').addEventListener('change', function (m) {
      if (m.matches) setMenu(false);
    });
  }
})();
