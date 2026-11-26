// Abrar Zamil — portfolio
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero parallax: the photo frame drifts gently with the pointer.
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

  var params = new URLSearchParams(window.location.search);

  // Contact form: show the thank-you note after FormSubmit redirects back with ?sent=1.
  var note = document.getElementById('sent-note');
  if (note && params.get('sent') === '1') note.hidden = false;

  // Contact form: "Ask about this" buttons on the services page pass ?service=...
  var task = document.getElementById('task');
  var service = params.get('service');
  if (task && service && !task.value) {
    task.value = 'I’m interested in: ' + service.slice(0, 60) + '\n\n';
  }

  // Copy-email button.
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var label = btn.querySelector('span');
      var done = function () {
        if (!label) return;
        var old = label.textContent;
        label.textContent = 'Copied';
        setTimeout(function () { label.textContent = old; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      }
    });
  });

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
    var mq = window.matchMedia('(min-width: 760px)');
    var onWide = function (m) { if (m.matches) setMenu(false); };
    if (mq.addEventListener) mq.addEventListener('change', onWide); else if (mq.addListener) mq.addListener(onWide);
  }
})();

// ---- Polish layer: theme, scroll progress, spotlight, reveal fallback, form state
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tb = document.querySelector('.theme-toggle');
  function setTheme(t, save) {
    root.setAttribute('data-theme', t);
    if (tb) {
      tb.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
      tb.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', t === 'dark' ? '#141414' : '#FDFDFC');
    if (save) { try { localStorage.setItem('theme', t); } catch (e) {} }
  }
  setTheme(root.getAttribute('data-theme') || 'light');
  if (tb) tb.addEventListener('click', function () {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  });

  var bar = document.querySelector('.progress'), nav = document.querySelector('.nav'),
      up = document.querySelector('.to-top'), ticking = false;
  function onScroll() {
    var h = root.scrollHeight - window.innerHeight, y = window.scrollY;
    if (bar) bar.style.setProperty('--p', h > 0 ? (y / h).toFixed(4) : 0);
    if (nav) nav.classList.toggle('stuck', y > 24);
    if (up) up.classList.toggle('show', y > 700);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  if (up) up.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  if (window.matchMedia('(hover: hover)').matches && !reduce) {
    Array.prototype.forEach.call(document.querySelectorAll('.tile'), function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--sx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--sy', (e.clientY - r.top) + 'px');
      });
    });
  }

  var native = window.CSS && CSS.supports && CSS.supports('animation-timeline: view()');
  if (!native && !reduce && 'IntersectionObserver' in window) {
    root.classList.add('js-rv');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(document.querySelectorAll('.rv'), function (el) { io.observe(el); });
  }

  var form = document.querySelector('form[action*="formsubmit"]');
  if (form) form.addEventListener('submit', function () {
    var b = form.querySelector('[type="submit"]');
    if (b) { b.disabled = true; b.firstChild.textContent = 'Sending… '; }
  });

  // Nav links: Stokt-style rolling text on hover (violet copy slides up).
  if (!reduce) {
    Array.prototype.forEach.call(document.querySelectorAll('.nav-links a'), function (a) {
      var t = a.textContent.trim();
      if (!t) return;
      a.setAttribute('data-text', t);
      a.classList.add('roll');
    });
  }

  // Loom demo: play the transcript-to-tasks sequence once when it scrolls
  // into view, then hold the finished state (no loop back to empty).
  var demos = document.querySelectorAll('.demo');
  if (demos.length && !reduce) {
    if ('IntersectionObserver' in window) {
      var dio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('play'); dio.unobserve(en.target); } });
      }, { threshold: 0.35 });
      Array.prototype.forEach.call(demos, function (el) { dio.observe(el); });
    } else {
      Array.prototype.forEach.call(demos, function (el) { el.classList.add('play'); });
    }
  }

  // Stats row: count the numbers up when they scroll into view.
  var counters = document.querySelectorAll('.stat b[data-count]');
  if (counters.length) {
    var runCount = function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var pad = parseInt(el.getAttribute('data-pad') || '0', 10);
      var fmt = function (n) { var s = String(n); while (s.length < pad) s = '0' + s; return s; };
      if (reduce) { el.textContent = fmt(target); return; }
      var start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 900, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); cio.unobserve(en.target); } });
      }, { threshold: 0.4 });
      Array.prototype.forEach.call(counters, function (el) { cio.observe(el); });
    } else {
      Array.prototype.forEach.call(counters, function (el) { runCount(el); });
    }
  }

  // Scroll parallax driver (Aceternity HeroParallax, vanilla port):
  // framer-motion useScroll target=wrap, offset ["start start", "end start"],
  // plus useSpring stiffness 300 / damping 30 / bounce 100, approximated with
  // a per-frame lerp: smoothed progress chases raw progress. One driver serves
  // both the Work showreel and the homepage banner; opts are the demo's
  // numbers per instance (tilt/rotateZ/translateY over the first 20% of the
  // scroll, rows 1+3 slide one way, row 2 the other, over the full scroll).
  var driveParallax = function (wrap, stage, opts) {
    if (!wrap || !stage || reduce) return;
    var rows = stage.querySelectorAll('[data-dir]');
    var raw = 0, smooth = 0, ticking = false, settled = true;
    var apply = function () {
      var p = smooth, q = Math.min(p / 0.2, 1);
      stage.style.transform = 'rotateX(' + (opts.tilt * (1 - q)).toFixed(2) + 'deg) rotateZ(' + (opts.rz * (1 - q)).toFixed(2) + 'deg) translateY(' + (opts.tyFrom + (opts.tyTo - opts.tyFrom) * q).toFixed(1) + 'px)';
      stage.style.opacity = (opts.opFrom + (1 - opts.opFrom) * q).toFixed(3);
      Array.prototype.forEach.call(rows, function (row) {
        var dir = parseFloat(row.getAttribute('data-dir') || '1');
        var travel = Math.min(opts.travel, row.scrollWidth * opts.travelK);
        row.style.transform = 'translateX(' + (dir * p * travel).toFixed(1) + 'px)';
      });
    };
    var step = function () {
      smooth += (raw - smooth) * 0.12;
      if (Math.abs(raw - smooth) < 0.0005) { smooth = raw; settled = true; }
      apply();
      if (!settled) requestAnimationFrame(step); else ticking = false;
    };
    var update = function () {
      var r = wrap.getBoundingClientRect();
      // totalMode "full": progress spans the whole wrap (authentic demo,
      // offset ["start start","end start"]) — the showreel's tall grid scrolls
      // through. "scrollable": progress spans wrapHeight - viewportHeight —
      // for a sticky stage, which stays pinned while the runway scrolls.
      var total = opts.totalMode === 'scrollable' ? wrap.offsetHeight - window.innerHeight : wrap.offsetHeight;
      var next = total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 0;
      if (next !== raw) { raw = next; settled = false; }
      if (!ticking) { ticking = true; requestAnimationFrame(step); }
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  };
  // Work showreel (round 5, round 6): authentic model — tall grid scrolls
  // through the 300vh runway on translateY -700->500, rows slide up to 1000px.
  driveParallax(document.querySelector('.px-wrap'), document.getElementById('px-stage'),
    { tilt: 15, rz: 20, tyFrom: -700, tyTo: 500, opFrom: 0.2, travel: 1000, travelK: 0.5 });
  // Homepage "What I work with" banner (round 7): 200vh runway, gentler tilt
  // 10->0, no translateY, rows slide up to 600px. Sticky stage, so progress
  // spans the scrollable distance (wrapHeight - viewportHeight).
  driveParallax(document.querySelector('.skx-wrap'), document.getElementById('skx-stage'),
    { tilt: 10, rz: 0, tyFrom: 0, tyTo: 0, opFrom: 0.2, travel: 600, travelK: 0.3, totalMode: 'scrollable' });
})();
