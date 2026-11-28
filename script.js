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

  // Scroll sentences (home): each .sent-card reveals one by one as it
  // scrolls into view. .js-sent hides them first (CSS); without IO or
  // with reduced motion they are all shown at once.
  var sentCards = document.querySelectorAll('.sent-card');
  if (sentCards.length) {
    if (!reduce && 'IntersectionObserver' in window) {
      root.classList.add('js-sent');
      var sio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); sio.unobserve(en.target); } });
      }, { threshold: 0.15 });
      Array.prototype.forEach.call(sentCards, function (el) { sio.observe(el); });
    } else {
      Array.prototype.forEach.call(sentCards, function (el) { el.classList.add('in'); });
    }
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

  // Showreel video: sound on automatically when it scrolls into view.
  // Browsers only allow sound after the visitor has tapped or clicked
  // something, so before that the video stays muted and a "Sound on"
  // button shows; the first tap anywhere turns the sound on. A manual
  // mute is respected — scrolling will not unmute it again. Sound mutes
  // again when the video scrolls out of view.
  var sv = document.getElementById('showreelVideo');
  if (sv) {
    var srPlay = document.getElementById('showreelPlay');
    var srMute = document.getElementById('showreelMute');
    var srFull = document.getElementById('showreelFull');
    var srSound = document.getElementById('showreelSound');
    var srProg = document.getElementById('showreelProgress');
    var srFill = document.getElementById('showreelProgressFill');
    var srTime = document.getElementById('showreelTime');
    var userMuted = false;
    var srInView = false;
    var srFmt = function (s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); };
    var srPaint = function () {
      if (srFill) srFill.style.width = (sv.duration ? (sv.currentTime / sv.duration) * 100 : 0) + '%';
      if (srTime) srTime.textContent = srFmt(sv.currentTime) + ' / ' + srFmt(sv.duration);
      if (srProg) srProg.setAttribute('aria-valuenow', String(Math.round(sv.duration ? (sv.currentTime / sv.duration) * 100 : 0)));
      if (srPlay) { srPlay.classList.toggle('is-playing', !sv.paused); srPlay.setAttribute('aria-label', sv.paused ? 'Play video' : 'Pause video'); }
      if (srMute) { srMute.classList.toggle('is-muted', sv.muted); srMute.setAttribute('aria-label', sv.muted ? 'Turn sound on' : 'Turn sound off'); }
      if (srSound) srSound.classList.toggle('show', sv.muted && srInView && !userMuted);
    };
    var srTrySound = function () {
      if (userMuted || !srInView) return;
      sv.muted = false;
      var p = sv.play();
      if (p && p.catch) p.catch(function () { sv.muted = true; srPaint(); });
      srPaint();
    };
    if ('IntersectionObserver' in window) {
      var sio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          srInView = en.isIntersecting;
          if (srInView) { srTrySound(); } else if (!sv.muted) { sv.muted = true; srPaint(); }
        });
      }, { threshold: 0.35 });
      sio.observe(sv);
    }
    document.addEventListener('pointerdown', srTrySound);
    document.addEventListener('keydown', srTrySound);
    if (srSound) srSound.addEventListener('click', function () { userMuted = false; srTrySound(); });
    if (srMute) srMute.addEventListener('click', function () {
      if (sv.muted) { userMuted = false; sv.muted = false; var p = sv.play(); if (p && p.catch) p.catch(function () {}); }
      else { userMuted = true; sv.muted = true; }
      srPaint();
    });
    if (srPlay) srPlay.addEventListener('click', function () { if (sv.paused) { sv.play().catch(function () {}); } else { sv.pause(); } srPaint(); });
    if (srProg) srProg.addEventListener('click', function (e) { var r = srProg.getBoundingClientRect(); var x = (e.clientX - r.left) / r.width; if (sv.duration) sv.currentTime = Math.max(0, Math.min(1, x)) * sv.duration; srPaint(); });
    if (srFull) srFull.addEventListener('click', function () { var f = sv.parentElement; if (document.fullscreenElement) { document.exitFullscreen().catch(function () {}); } else if (f.requestFullscreen) { f.requestFullscreen().catch(function () {}); } });
    sv.addEventListener('timeupdate', srPaint);
    sv.addEventListener('play', srPaint);
    sv.addEventListener('pause', srPaint);
    sv.addEventListener('volumechange', srPaint);
    sv.addEventListener('loadedmetadata', srPaint);
    srPaint();
  }

  // Card videos (RxGuard loop): play only while on screen; the still
  // poster shows when reduced motion is on or the video cannot play.
  var cardVideos = document.querySelectorAll('.px-visual--video, .proj-visual video');
  if (cardVideos.length) {
    if (reduce) {
      Array.prototype.forEach.call(cardVideos, function (v) { v.removeAttribute('autoplay'); v.pause(); });
    } else if ('IntersectionObserver' in window) {
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.play().catch(function () {}); } else { en.target.pause(); } });
      }, { rootMargin: '200px' });
      Array.prototype.forEach.call(cardVideos, function (v) { vio.observe(v); });
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

  // Round 13 — five effects from the three-site study.
  // 4. Split-letter roll-in on the home hero headline (Purple Softworks H1):
  // each .w word is split into masked letters that roll up with a stagger.
  // The word-rise is disabled by .letters in CSS; no JS keeps the old rise.
  var heroH1 = document.querySelector('.hero .h1');
  if (heroH1 && !reduce) {
    var letterDelay = 0;
    Array.prototype.forEach.call(heroH1.querySelectorAll('.w'), function (w) {
      var text = w.textContent;
      // The gradient word is never split: background-clip:text on the parent
      // does not paint through transformed child spans, so it keeps its
      // word-rise (see the .letters exception in styles.css).
      if (w.classList.contains('grad-text')) { letterDelay += text.length; return; }
      w.textContent = '';
      text.split('').forEach(function (ch) {
        var mask = document.createElement('span');
        mask.className = 'ltr';
        var inner = document.createElement('span');
        inner.className = 'ltr-in';
        inner.textContent = ch;
        inner.style.setProperty('--d', (letterDelay * 0.026).toFixed(3) + 's');
        letterDelay++;
        mask.appendChild(inner);
        w.appendChild(mask);
      });
    });
    heroH1.classList.add('letters');
  }

  // 2. Scroll-linked word reveal (Wavespace signature): .wr headings are
  // split into word spans; each word flips grey -> ink as the heading
  // travels through the viewport. No JS leaves a plain ink heading.
  var wrHeads = document.querySelectorAll('.wr');
  if (wrHeads.length) {
    Array.prototype.forEach.call(wrHeads, function (h) {
      var words = h.textContent.trim().split(/\s+/);
      h.innerHTML = words.map(function (w) { return '<span class="wd">' + w + '</span>'; }).join(' ');
    });
    var updateWr = function () {
      var vh = window.innerHeight;
      Array.prototype.forEach.call(wrHeads, function (h) {
        var r = h.getBoundingClientRect();
        var p = Math.min(Math.max((vh * 0.88 - r.top) / (vh * 0.55), 0), 1);
        var spans = h.querySelectorAll('.wd');
        var n = spans.length;
        Array.prototype.forEach.call(spans, function (s, i) {
          s.classList.toggle('on', p > (i + 0.5) / n);
        });
      });
    };
    if (reduce) {
      Array.prototype.forEach.call(wrHeads, function (h) {
        Array.prototype.forEach.call(h.querySelectorAll('.wd'), function (s) { s.classList.add('on'); });
      });
    } else {
      var wrTicking = false;
      var onWrScroll = function () {
        if (!wrTicking) {
          wrTicking = true;
          requestAnimationFrame(function () { updateWr(); wrTicking = false; });
        }
      };
      window.addEventListener('scroll', onWrScroll, { passive: true });
      window.addEventListener('resize', updateWr);
      updateWr();
    }
  }

  // 5. "What do you need?" picker (Purple Softworks calculator pattern,
  // non-price): option buttons swap the matching service result card.
  var picker = document.querySelector('.picker');
  if (picker) {
    var pickOpts = picker.querySelectorAll('[data-pick]');
    var pickPanels = picker.querySelectorAll('.picker-panel');
    var showPick = function (id) {
      Array.prototype.forEach.call(pickOpts, function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-pick') === id ? 'true' : 'false');
      });
      Array.prototype.forEach.call(pickPanels, function (p) {
        var show = p.id === id;
        p.hidden = !show;
        if (show && !reduce) {
          p.classList.remove('swap');
          void p.offsetWidth;
          p.classList.add('swap');
        }
      });
    };
    Array.prototype.forEach.call(pickOpts, function (b) {
      b.addEventListener('click', function () { showPick(b.getAttribute('data-pick')); });
    });
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

  // Warp Carousel v2 (round 18): faithful vanilla port of the Louis Studios
  // "Warp Carousel" motion — fitted poseAt ring geometry, spinN whip-then-
  // creep curve, and autoplayProgress, ported in full from warp-carousel.tsx
  // (see ~/workspace/research_notes/warp-motion-reference.md). Cards are
  // positioned per-frame with translate3d + rotateY inside the stage's
  // perspective, so facing-away cards render as mirrored quads, exactly
  // like the original's canvas projection. Dark glowing stage. Inits every
  // [data-warp] on the page, reading its .warp-card list from the markup —
  // no per-page JS. Reduced motion: no autoplay, plain jumps.
  // v4 (round 18; Abrar rejected v3's heavy smear): the glass/mirror effect
  // lives in the BACKGROUND (iridescent prism washes + mirror sheen, see
  // styles.css .warp-stage::before / .warp-fx); the photo bleed is disabled
  // in CSS. Cards stay clean: --warp-warp / --warp-dir (ring angular
  // velocity, smoothed, 0 at rest → 1 mid-spin) now drive only a GENTLE
  // stretch (scaleX up to +10%) and the faint sliding gloss — no blur,
  // no fringe. Autoplay is the driver (automated circling, ~4s, whip
  // curve, pauses on hover/drag/hidden/off-screen); NO scroll driving —
  // Abrar corrected that ("no need to scroll").
  // v5 (round 18; Abrar rejected v4's coloured washes — "not even close"):
  // the stage is CLEAR GLASS, same colour as the page (see styles.css) —
  // glass visible only via a hairline rainbow edge, faint light streaks
  // and soft shadows. CONTROLS REMOVED: .warp-controls is display:none
  // (no "1 / 6" counter, no arrows); the code below already null-guards
  // count/prevBtn/nextBtn, so hiding them is safe. Autoplay + drag keep
  // working; the carousel is pure automated animation.
  // v6 (round 18; Abrar on v5: glass "a bit stronger, not that much" +
  // photos should warp "like the card at the animation I showed you
  // before" + the glass band "from left to right, no border, like a
  // header or footer"): stretch cap back up to +22% and the CSS motion
  // treatment is restored (img blur up to 3px + cyan/magenta
  // drop-shadow fringes, all from --warp-warp, zero at rest). The
  // stage is now a FULL-BLEED band (see styles.css .warp-carousel:
  // 100vw breakout, radius 0, rainbow hairlines top + bottom only).
  // v7 (round 18; Abrar on LIVE v6: "it's not moving automatically,
  // after moving a bit it stopped" + re-sent the original reference:
  // the side card BENDS when it travels left/right, and look at the
  // photo card size — front card is only ~1/3 of the stage): DIAGNOSED
  // with a 30s headless probe — with the mouse parked on the stage the
  // front photo FROZE for the full 30s (hover-pause), and even without
  // hover the whip-then-creep autoplay only spiked warp to ~0.15 at
  // the whip and sat at ~0.02 the rest of the cycle, so it read as
  // "moved a bit then stopped". FIX: autoplay is now CONSTANT-SPEED
  // linear circling (1 card / 4.5s) that NEVER stops — hover-pause and
  // off-screen-pause are GONE (only drag + hidden tab pause). Cards
  // are SMALLER (--warp-frac .69 -> .34, mobile .78 -> .62) and the
  // BEND is strong while travelling: stretch cap +55%, skewX up to
  // 12 deg, fringe + blur from --warp-warp, steady ~0.8 while
  // auto-circling, 0 whenever the ring is still (sharp at rest).
  // v8 (round 18; Abrar on LIVE v7: "that effect is not smooth at
  // all, it have blur motion like unplanned and the color it's not
  // looking like glass card"): ZERO motion blur — the CSS img blur
  // is deleted and the fringes are hard 0-blur rims, so the bend is
  // now a CLEAN GEOMETRIC bend only: stretch cap +18%, skewX cap
  // 5 deg (steady ~0.8 warp while auto-circling, 0 when still).
  // The glass itself moved into CSS: the photo sits inset 12px in a
  // frosted frame (see styles.css .warp-card). Constant-speed
  // linear circling (1 card / 4.5s) is UNCHANGED.
  // v10 (round 18; Abrar on the v9 preview: "extract the letters
  // inside the details and put it on a glass. Total glass, no blue
  // yellow red hue... I don't want glass border, I want the whole
  // thing glass and the details and words and everything will be on
  // top of the glass"): v8/v9 were the WRONG design — a photo inside
  // a glass frame. v10: NO PHOTOS as cards — the words/details from
  // inside the 6 photos are now REAL HTML TEXT on the cards, and the
  // WHOLE CARD is one clear colourless glass slab (see styles.css).
  // The chromatic fringe is DELETED (no coloured drop-shadows); the
  // photo-bleed layers are REMOVED entirely (no imgs left to read).
  // v11 (round 18; Abrar on the v10 preview, then chose CUTOUT):
  // the photos are BACK as transparent PNG cutouts on the whole clear
  // glass card — background gone, foreground details float directly on
  // the glass. layout() is back to the 2:1 photo ratio (cardH = 0.5x
  // cardW). Motion unchanged: zero blur,
  // clean geometric bend only (stretch +18%, skew 5 deg), constant-
  // speed linear circling (1 card / 4.5s).
  var WARP_CW = 256;
  var WARP_FOCAL = 734.103;
  var WARP_G = { qA: 0.46401, XLA: 165.774, zA: 35.354, psiA: 1.44638, a1: 1.31454, a2: 1.10948, qB: 0.74999, XB: 204.525, ZB: 355.405, bB: 0.69311, bE: 0.04614, vC: 203.134, aC: 229.260, kB: 0.01087, bP: 0.99129, qPR: 1.01828, bPL: 1.00920, qPL: 1.07139 };
  function warpPoseAt(q0) {
    var q = q0;
    if (Math.abs(q) < 1) q -= WARP_G.kB * Math.pow(Math.sin(Math.PI * q), 2);
    var s = q < 0 ? -1 : 1;
    var a = Math.abs(q);
    var half = WARP_CW / 2;
    if (a <= WARP_G.qA) {
      var t = a / WARP_G.qA;
      var xl = -half + (WARP_G.XLA + half) * Math.pow(t, WARP_G.a1);
      var zl = WARP_G.zA * Math.pow(t, 4);
      var psi = WARP_G.psiA * Math.pow(t, WARP_G.a2);
      return [s * (xl + half * Math.cos(psi)), zl + half * Math.sin(psi), s * psi];
    }
    var dXL = ((WARP_G.XLA + half) * WARP_G.a1) / WARP_G.qA;
    var dZL = (WARP_G.zA * 4) / WARP_G.qA;
    var dps = (WARP_G.psiA * WARP_G.a2) / WARP_G.qA;
    var Hx, Hz;
    if (a <= WARP_G.qB) {
      var L = WARP_G.qB - WARP_G.qA;
      var tt = (a - WARP_G.qA) / L;
      var hx = WARP_G.XLA + WARP_CW * Math.cos(WARP_G.psiA);
      var hz = WARP_G.zA + WARP_CW * Math.sin(WARP_G.psiA);
      var dhx = dXL - WARP_CW * Math.sin(WARP_G.psiA) * dps;
      var dhz = dZL + WARP_CW * Math.cos(WARP_G.psiA) * dps;
      var h00 = 2 * Math.pow(tt, 3) - 3 * Math.pow(tt, 2) + 1;
      var h10 = Math.pow(tt, 3) - 2 * Math.pow(tt, 2) + tt;
      var h01 = -2 * Math.pow(tt, 3) + 3 * Math.pow(tt, 2);
      var h11 = Math.pow(tt, 3) - Math.pow(tt, 2);
      Hx = h00 * hx + h10 * L * dhx * WARP_G.bB + h01 * WARP_G.XB + h11 * L * WARP_G.vC * WARP_G.bE;
      Hz = h00 * hz + h10 * L * dhz * WARP_G.bB + h01 * WARP_G.ZB;
    } else {
      var d = a - WARP_G.qB;
      Hx = WARP_G.XB + WARP_G.vC * d + WARP_G.aC * d * d;
      Hz = WARP_G.ZB;
    }
    var qP = s < 0 ? WARP_G.qPL : WARP_G.qPR;
    var bP = s < 0 ? WARP_G.bPL : WARP_G.bP;
    var LP = qP - WARP_G.qA;
    var tp = Math.min(1, (a - WARP_G.qA) / LP);
    var psi2 = (2 * Math.pow(tp, 3) - 3 * Math.pow(tp, 2) + 1) * WARP_G.psiA + (Math.pow(tp, 3) - 2 * Math.pow(tp, 2) + tp) * LP * dps * bP + (-2 * Math.pow(tp, 3) + 3 * Math.pow(tp, 2)) * Math.PI;
    return [s * (Hx - half * Math.cos(psi2)), Hz - half * Math.sin(psi2), s * psi2];
  }
  var WARP_TK = [0, 3, 6, 8, 10, 11, 12, 13, 14, 16, 18, 21, 25, 30, 36, 45, 55, 70, 88, 110];
  var WARP_TB = [0, 0.02175, 0.12069, 0.22549, 0.35493, 0.43254, 0.51436, 0.5952, 0.6751, 0.83199, 0.9709, 1.12669, 1.27958, 1.40975, 1.53561, 1.68385, 1.79183, 1.89191, 1.95233, 2];
  var WARP_DRIFT = 0.06511;
  var WARP_FRAMES = 110;
  var WARP_SLOPES = (function () {
    var nn = WARP_TK.length;
    var h = WARP_TK.slice(1).map(function (x, i) { return x - WARP_TK[i]; });
    var dl = h.map(function (hi, i) { return (WARP_TB[i + 1] - WARP_TB[i]) / hi; });
    var d = new Array(nn).fill(0);
    for (var k = 1; k < nn - 1; k++) {
      if (dl[k - 1] * dl[k] <= 0) d[k] = 0;
      else {
        var w1 = 2 * h[k] + h[k - 1];
        var w2 = h[k] + 2 * h[k - 1];
        d[k] = (w1 + w2) / (w1 / dl[k - 1] + w2 / dl[k]);
      }
    }
    var v = (dl[0] + dl[nn - 2]) / 2;
    d[0] = v;
    d[nn - 1] = v;
    return d;
  })();
  function warpSpin(frames) {
    if (frames <= 0) return 0;
    if (frames >= WARP_FRAMES) return 1;
    var i = 0;
    while (i < WARP_TK.length - 2 && frames > WARP_TK[i + 1]) i++;
    var h = WARP_TK[i + 1] - WARP_TK[i];
    var t = (frames - WARP_TK[i]) / h;
    var h00 = 2 * t * t * t - 3 * t * t + 1;
    var h10 = t * t * t - 2 * t * t + t;
    var h01 = -2 * t * t * t + 3 * t * t;
    var h11 = t * t * t - t * t;
    return (h00 * WARP_TB[i] + h10 * h * WARP_SLOPES[i] + h01 * WARP_TB[i + 1] + h11 * h * WARP_SLOPES[i + 1]) / 2;
  }
  function warpSpinN(frames, nn) {
    if (nn <= WARP_FRAMES + 0.5) return warpSpin((frames * WARP_FRAMES) / Math.max(1, nn));
    var knee = 80;
    if (frames <= knee) return warpSpin(frames);
    return warpSpin(knee + ((frames - knee) * (WARP_FRAMES - knee)) / (nn - knee));
  }
  // v7: warpAutoplay (whip-then-creep) REMOVED — it made the ring read
  // as "moved a bit then stopped" (fast whip, then a long near-still
  // creep with warp ~0.02). Autoplay is now constant-speed linear
  // circling (see tick). warpSpinN / warpSpin stay for manual spins.
  var WARP_AUTO_RATE = 1 / 4.5; // v7: cards per second, constant smooth circling
  Array.prototype.forEach.call(document.querySelectorAll('[data-warp]'), function (root) {
    var ring = root.querySelector('.warp-ring');
    var stage = root.querySelector('.warp-stage');
    var cards = root.querySelectorAll('.warp-card');
    var count = root.querySelector('.warp-count');
    var n = cards.length;
    if (!ring || !stage || n < 2) return;
    var progress = WARP_DRIFT; // v7: mount with card 0 front; continuous circling starts at once
    var mode = reduce ? 'idle' : 'auto';
    var spinAnim = null;
    var dragging = false;
    var lastTick = 0;
    var cardW = 0, cardH = 0, unit = 1;
    var cur = 0;
    var dragStartX = 0, dragStartProgress = 0, dragDx = 0;
    // v4: ring-velocity tracker for the gentle motion stretch (smoothed, 0 at rest).
    var prevProg = progress, prevNow = 0, warpSm = 0, warpDir = 1;
    // v7: NO hover-pause, NO off-screen-pause — those froze the ring
    // while Abrar was looking at it (diagnosed: front photo frozen
    // 30s with mouse parked). Only drag + hidden tab pause.
    function paused() { return dragging || document.hidden; }

    // Size the stage + cards: front card is --warp-frac of the stage width;
    // unit = px per pose unit; perspective focal length follows from it.
    // v11: cards are CUTOUT IMAGES again (transparent PNGs on clear
    // glass), so the height is back to the 2:1 photo ratio, as in
    // v6-v9 — cardH = 0.5x cardW on desktop and mobile alike.
    function layout() {
      var stageW = stage.clientWidth;
      if (!stageW) return;
      var frac = parseFloat(getComputedStyle(root).getPropertyValue('--warp-frac')) || 0.69;
      cardW = Math.round(stageW * frac);
      cardH = Math.round(cardW * 0.5);
      unit = cardW / WARP_CW;
      stage.style.perspective = (WARP_FOCAL * unit).toFixed(0) + 'px';
      stage.style.height = (cardH + (stageW <= 720 ? 110 : 120)) + 'px';
      var stageH = stage.clientHeight;
      Array.prototype.forEach.call(cards, function (card) {
        card.style.width = cardW + 'px';
        card.style.height = cardH + 'px';
        card.style.left = ((stageW - cardW) / 2).toFixed(1) + 'px';
        card.style.top = ((stageH - cardH) / 2).toFixed(1) + 'px';
      });
    }

    function wrapQ(q) {
      q = q % n;
      if (q > n / 2) q -= n;
      if (q <= -n / 2) q += n;
      return q;
    }

    // One frame: pose every card with the fitted geometry, projected by the
    // stage's perspective. Far cards fade out; nearer cards dim slightly.
    // v4: also tracks ring angular velocity (smoothed, ~90ms) into
    // --warp-warp / --warp-dir per card — 0 at rest, 1 mid-whip; the front
    // card stretches least so it stays readable. v7: steady ~0.8 while
    // auto-circling (constant speed), velocity-driven on manual moves,
    // 0 whenever the ring is still. Bend (v8): stretch cap +18%, skewX 5deg.
    function renderFrame() {
      var i, q, pose, aq, fade, dim;
      var nowMs = performance.now();
      var dt = prevNow ? Math.min(100, Math.max(8, nowMs - prevNow)) / 1000 : 0.016;
      prevNow = nowMs;
      var vel = (progress - prevProg) / dt;
      prevProg = progress;
      if (Math.abs(vel) > 0.05) warpDir = vel > 0 ? 1 : -1;
      // v7: steady 0.8 while auto-circling at constant speed, velocity-
      // driven on manual spins/drags, 0 when the ring is still (sharp).
      var target = reduce ? 0 : Math.min(1, Math.max(mode === 'auto' ? 0.8 : 0, Math.abs(vel) / 0.3));
      warpSm += (target - warpSm) * Math.min(1, dt / 0.09);
      if (warpSm < 0.005) warpSm = 0;
      for (i = 0; i < n; i++) {
        q = wrapQ(i - progress);
        pose = warpPoseAt(q);
        aq = Math.abs(q);
        var card = cards[i];
        var cardWarp = warpSm * (aq < 0.3 ? 0.12 : Math.min(1, 0.30 + aq * 0.55));
        // v8/v10: the BEND is clean geometry only — gentle stretch
        // (up to +18%) and a small shear (skewX up to 5 deg) while
        // travelling, like the bent side card in Abrar's reference
        // but SHARP: no blur anywhere (the card filter is none, the
        // chromatic fringes are DELETED in v10 — no colour at all).
        // The front stays near-flat (~2% stretch, ~0.5 deg). Warp is
        // 0 whenever the ring is still: perfectly sharp, no smear.
        var stretch = 1 + cardWarp * 0.18;
        var skew = (warpDir * cardWarp * 5).toFixed(1);
        card.style.transform = 'translate3d(' + (pose[0] * unit).toFixed(1) + 'px, 0, ' + (-pose[1] * unit).toFixed(1) + 'px) rotateY(' + (pose[2] * 180 / Math.PI).toFixed(2) + 'deg) skewX(' + skew + 'deg) scaleX(' + stretch.toFixed(3) + ')';
        fade = aq <= 1.5 ? 1 : aq >= 2.5 ? 0 : 1 - (aq - 1.5);
        card.style.opacity = fade.toFixed(2);
        dim = Math.min(0.35, aq * 0.18); // v7: lighter dim — side cards stay vivid like the reference, not muddy
        card.style.setProperty('--warp-dim', dim.toFixed(2));
        card.style.setProperty('--warp-warp', cardWarp.toFixed(2));
        card.style.setProperty('--warp-dir', String(warpDir));
        card.style.zIndex = String(100 - Math.round(aq * 10));
        card.classList.toggle('is-front', aq < 0.3);
      }
      var newCur = ((Math.round(progress - WARP_DRIFT) % n) + n) % n;
      if (newCur !== cur) {
        cur = newCur;
        if (count) count.textContent = (cur + 1) + ' / ' + n;
      }
    }

    // A spin: progress from its current value to toIndex + DRIFT, over
    // 110 reference frames per card of distance, on the spinN curve.
    function spinTo(toIndex) {
      if (reduce) {
        progress = toIndex + WARP_DRIFT;
        renderFrame();
        return;
      }
      var target = toIndex + WARP_DRIFT;
      target += n * Math.round((progress - target) / n);
      var dist = Math.abs(target - progress);
      var dur = Math.max(WARP_FRAMES, WARP_FRAMES * Math.ceil(dist));
      spinAnim = { from: progress, to: target, start: performance.now(), dur: dur, toIndex: toIndex };
      mode = 'spin';
    }
    function go(d) {
      spinTo(Math.round(progress - WARP_DRIFT) + d);
    }
    function goTo(i) {
      var curIdx = Math.round(progress - WARP_DRIFT);
      var d = i - curIdx;
      d = ((d % n) + n) % n;
      if (d > n / 2) d -= n;
      if (d) spinTo(curIdx + d);
    }

    // Main loop (v7): autoplay is CONSTANT-SPEED circling — progress
    // advances linearly, so the ring never stops and the bend is visible
    // through the whole left-to-right travel. Manual spins still run on
    // spinN; when one ends, linear circling resumes from there. The
    // clock is frame-dt based, so a hidden tab just pauses (no jump on
    // return) and hovering never freezes the ring.
    function tick(now) {
      var dt = lastTick ? Math.min(0.1, Math.max(0, (now - lastTick) / 1000)) : 0.016;
      lastTick = now;
      if (mode === 'auto') {
        if (!paused()) progress += dt * WARP_AUTO_RATE;
      } else if (mode === 'spin' && spinAnim) {
        var f = (now - spinAnim.start) * 30 / 1000;
        if (f >= spinAnim.dur) {
          progress = spinAnim.to;
          spinAnim = null;
          mode = reduce ? 'idle' : 'auto';
        } else {
          progress = spinAnim.from + (spinAnim.to - spinAnim.from) * warpSpinN(f, spinAnim.dur);
        }
      }
      renderFrame();
      requestAnimationFrame(tick);
    }

    var prevBtn = root.querySelector('[data-warp-prev]');
    var nextBtn = root.querySelector('[data-warp-next]');
    if (prevBtn) prevBtn.addEventListener('click', function () { go(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(1); });
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    });

    // Drag / swipe: progress follows the pointer live (one card width of
    // drag = one card of progress); on release, snap to the nearest index
    // on the spin curve. Listeners live on window during the drag (pointer
    // capture swallows synthetic pointer events in some headless browsers).
    function onDragMove(e) {
      if (!dragging) return;
      dragDx = e.clientX - dragStartX;
      progress = dragStartProgress - dragDx / (cardW || 1);
      renderFrame();
    }
    // Tap a card to bring it front. (Not a click listener: the stage's
    // pointerdown calls preventDefault, which suppresses the compatibility
    // click event — so taps are detected here, in pointerup.)
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      ring.classList.remove('is-dragging');
      window.removeEventListener('pointermove', onDragMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
      if (Math.abs(dragDx) < 8 && e && e.target) {
        var tapped = e.target.closest ? e.target.closest('.warp-card') : null;
        if (tapped) {
          var ti = Array.prototype.indexOf.call(cards, tapped);
          if (ti >= 0) { dragDx = 0; goTo(ti); return; }
        }
        // Edge zones: the peeking card's sliver is only ~35px wide (and its
        // exact edge moves with the ring's drift), so a tap near the stage's
        // left/right edge still steps prev/next, like tapping the card.
        var sr = stage.getBoundingClientRect();
        var tx = e.clientX - sr.left;
        if (tx > sr.width - 72) { dragDx = 0; go(1); return; }
        if (tx < 72) { dragDx = 0; go(-1); return; }
      }
      if (reduce) {
        progress = Math.round(progress - WARP_DRIFT) + WARP_DRIFT;
        mode = 'idle';
        renderFrame();
      } else {
        spinTo(Math.round(progress - WARP_DRIFT));
      }
      dragDx = 0;
    }
    stage.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.warp-controls')) return; // arrows/counter are buttons, not a drag
      root.focus({ preventScroll: true }); // let ArrowLeft/Right work after a mouse/touch interaction
      e.preventDefault(); // stop the browser's native drag, which would swallow the pointer stream
      dragging = true;
      mode = 'drag';
      spinAnim = null;
      dragStartX = e.clientX;
      dragStartProgress = progress;
      dragDx = 0;
      ring.classList.add('is-dragging');
      window.addEventListener('pointermove', onDragMove);
      window.addEventListener('pointerup', endDrag);
      window.addEventListener('pointercancel', endDrag);
    });
    // v7: no hover / visibility / off-screen listeners — nothing but
    // drag and document.hidden (via paused()) may stop the ring.
    window.addEventListener('resize', function () { layout(); renderFrame(); });

    layout();
    renderFrame();
    requestAnimationFrame(tick);
  });
})();
