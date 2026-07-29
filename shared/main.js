// Shared init: preloader + staged hero entrance + mobile nav toggle.
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================
     PRELOADER + HERO ENTRANCE

     Runs on EVERY visit. The returning-visitor localStorage skip that
     client.md offered as optional is deliberately gone — the operator wants
     the curtain every time.

     Timings are the knobs worth tuning:
     ========================================================== */
  var PRELOADER_HOLD_MS = 1200;  // beat held after load before the curtain lifts
  var PRELOADER_MAX_MS  = 4000;  // hard cap: never trap a visitor behind it
  var CURTAIN_LEAD_MS   = 260;   // let the curtain start lifting before copy moves

  function revealHero() {
    var intro = document.querySelector('.hero-intro');
    if (intro) intro.classList.add('is-revealed');
  }

  var pre = document.getElementById('preloader');
  if (!pre) {
    revealHero();                       // sub-pages: nothing to wait for
  } else if (reduce) {
    pre.remove();                       // no curtain, no stagger — show it all
    revealHero();
  } else {
    var lifted = false;
    function lift() {
      if (lifted) return;               // load + cap can both fire
      lifted = true;
      pre.classList.add('hidden');
      setTimeout(revealHero, CURTAIN_LEAD_MS);
    }
    // `load` waits on the hero video and every image, which can be a long
    // time on a slow connection — the cap guarantees the page appears.
    window.addEventListener('load', function () {
      setTimeout(lift, PRELOADER_HOLD_MS);
    });
    setTimeout(lift, PRELOADER_MAX_MS);
  }

  /* Header state: stay transparent (knockout logo, light nav) while a
     [data-header-dark] section sits under the bar; otherwise add .scrolled
     for the translucent light surface + original dark wordmark. Measured
     against the header's own midpoint so the swap lands on the seam.
     .tone-charcoal (site/shared/base.css section-tone bands) is included
     alongside [data-header-dark] — it is a solid dark section like any
     other, so the header has to track it the same way or it strands a
     light .scrolled bar over a dark background when the user scrolls
     through .why/.reviews/.faq/.contact-details/.reassure. */
  var header = document.getElementById('siteHeader');
  if (header) {
    var darkEls = document.querySelectorAll('[data-header-dark], .tone-charcoal');
    var lastY = -1;

    /* Not throttled through requestAnimationFrame: rAF is suspended in
       hidden/background/preview panes, which strands the header in whatever
       state it was last in (same reason the scrub driver avoids it — see
       script.js). A scrollY-change guard is the cheap equivalent, and the
       work per tick is a handful of rect reads. */
    function syncHeader() {
      // Probe the header's own vertical midpoint in viewport coordinates.
      // It sits BELOW the fixed announcement bar, so its top is not 0 —
      // measuring from the rect keeps this correct if the bar's height
      // changes (or the bar is removed entirely).
      var box = header.getBoundingClientRect();
      var probe = box.top + box.height / 2;
      var overDark = false;
      for (var i = 0; i < darkEls.length; i++) {
        var r = darkEls[i].getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) { overDark = true; break; }
      }
      header.classList.toggle('scrolled', !overDark);
    }
    function requestSync() {
      var y = window.pageYOffset;
      if (y === lastY) return;
      lastY = y;
      syncHeader();
    }

    addEventListener('scroll', requestSync, { passive: true });
    addEventListener('resize', function () { lastY = -1; syncHeader(); });
    syncHeader();
  }

  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') menu.classList.remove('open');
    });
  }

  /* ==========================================================
     STICKY MOBILE ACTION BAR — reveal only past the hero stage.
     A fixed bar sitting over the pinned cinematic run would cut the "one
     continuous shot" the opening is built around, so it stays hidden until
     the stage's bottom edge clears the viewport top. Pages with no hero
     stage (every sub-page) show it immediately.
     ========================================================== */
  (function mobileBar() {
    var bar = document.querySelector('.mobile-bar');
    if (!bar) return;
    var stage = document.querySelector('[data-hero-stage]');
    if (!stage) { bar.classList.add('is-visible'); return; }

    var lastY = -1;
    function sync() {
      // Past the stage entirely — not merely past the scrub, since the stage
      // still fills the viewport for its final 100svh as it scrolls away.
      bar.classList.toggle('is-visible', stage.getBoundingClientRect().bottom <= 0);
    }
    function onScroll() {
      var y = window.pageYOffset;
      if (y === lastY) return;
      lastY = y;
      sync();
    }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', function () { lastY = -1; sync(); });
    sync();
  })();

  /* ==========================================================
     CAROUSELS — one player, every track.
     Lives here rather than in the home page's script.js because the Our Work
     carousel also runs on /our-work/, which loads its own script.js only.
     ========================================================== */
  var AUTOPLAY_MS = 5200;

  function makeCarousel(track, prevBtn, nextBtn) {
    if (!track) return;
    // Pause scope is the whole component, not just the scroller — otherwise
    // focusing the prev/next buttons would not stop the autoplay.
    var scope = track.closest('.tcar') || track;
    var timer = null, paused = false, down = false;

    function step() {
      var first = track.firstElementChild;
      if (!first) return track.clientWidth;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return first.getBoundingClientRect().width + gap;
    }
    function go(dir) {
      var max = track.scrollWidth - track.clientWidth;
      var to = track.scrollLeft + dir * step();
      if (dir > 0 && track.scrollLeft >= max - 2) to = 0;        // wrap forward
      else if (dir < 0 && track.scrollLeft <= 2) to = max;       // wrap back
      track.scrollTo({ left: to, behavior: reduce ? 'auto' : 'smooth' });
    }

    if (nextBtn) nextBtn.addEventListener('click', function () { go(1); });
    if (prevBtn) prevBtn.addEventListener('click', function () { go(-1); });

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    });

    track.addEventListener('pointerdown', function (e) {
      down = true; var x0 = e.clientX, s0 = track.scrollLeft;
      // is-dragging drops scroll-behavior:smooth so the grab tracks 1:1
      // instead of animating every pointermove.
      track.classList.add('is-dragging');
      track.style.cursor = 'grabbing';
      function move(ev) { if (down) track.scrollLeft = s0 - (ev.clientX - x0); }
      function up() {
        down = false;
        track.classList.remove('is-dragging');
        track.style.cursor = 'grab';
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
      }
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    });

    /* Autoplay. Never under reduced motion — an auto-advancing carousel is
       precisely the motion that setting opts out of. Pauses on hover and on
       keyboard focus (WCAG 2.2.2 lets the user stop moving content), while
       dragging, and while the tab is hidden. */
    if (reduce) return;
    function start() { if (!timer) timer = setInterval(function () {
      if (!paused && !down) go(1);
    }, AUTOPLAY_MS); }
    function stop() { clearInterval(timer); timer = null; }

    ['pointerenter', 'focusin'].forEach(function (ev) {
      scope.addEventListener(ev, function () { paused = true; });
    });
    ['pointerleave', 'focusout'].forEach(function (ev) {
      scope.addEventListener(ev, function () { paused = false; });
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });
    start();
  }

  /* ==========================================================
     TRUST BAND — Placement B entrance.
     Inside a pinned hero stage the scroll driver already owns this layer, so
     only a standalone instance (one NOT inside .hero-stage__layer) gets an
     IntersectionObserver entrance. Same markup, same CSS, no rewrite.
     ========================================================== */
  (function trustBandEntrance() {
    var bands = document.querySelectorAll('.trust-band:not(.hero-stage__layer)');
    if (!bands.length || reduce || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var kids = e.target.querySelectorAll('.line');
        for (var i = 0; i < kids.length; i++) {
          kids[i].style.transition = 'opacity .6s ease ' + (i * 90) + 'ms, transform .6s ease ' + (i * 90) + 'ms';
          kids[i].style.opacity = 1;
          kids[i].style.transform = 'none';
        }
        io.unobserve(e.target);           // fire once
      });
    }, { threshold: 0.25 });
    bands.forEach(function (band) {
      band.querySelectorAll('.line').forEach(function (k) {
        k.style.opacity = 0; k.style.transform = 'translateY(60px)';
      });
      io.observe(band);
    });
  })();

  /* ==========================================================
     SCROLL ENTRANCES — [data-animate]
     Per frontend-animation references/css-only.md: add .anim-ready at init,
     observe at threshold .2, add .is-visible, unobserve. The hidden state is
     never in a stylesheet on its own, so JS off = fully visible content.

     Reveals fire ONCE and are not reversed on the way out. Content that fades
     away while it is still on screen is content you cannot finish reading, and
     it re-animates on every scroll direction change — the skill's rule 4
     ("once") exists for that reason.

     Deliberately NOT applied to: the hero stage and its trust band (the scroll
     driver in script.js owns those layers' opacity and transform — a second
     writer would fight it), the Our Work marquee, and the testimonial carousel
     slides (both already move, and the marquee's duplicate set is aria-hidden).
     ========================================================== */
  (function revealOnScroll() {
    var items = document.querySelectorAll('[data-animate]');
    if (!items.length || reduce || !('IntersectionObserver' in window)) return;
    document.body.classList.add('anim-ready');

    /* Stagger by VISUAL ROW, not by index among all siblings. The services
       grid has ten cards: indexing 0..9 would hold the last one back 675ms
       after it is already sitting on screen, which reads as jank rather than
       choreography. Cards on one row share an offsetTop, so bucket on that —
       the delay then never exceeds (columns - 1) steps, whatever the
       breakpoint's column count happens to be.

       Recomputed on resize: the row buckets describe the CURRENT column count,
       so indices measured at one breakpoint are wrong at another (a 3-col grid
       re-flowed to 2 would keep staggering 0,1,2 across rows of two). Only
       un-revealed elements are touched — a delay on something already on
       screen is spent. */
    function assignStagger() {
      for (var i = 0; i < items.length; i++) {
        var el = items[i];
        if (el.classList.contains('is-visible')) continue;
        var parent = el.parentElement, idx = 0;
        if (parent) {
          var sibs = [], row = [], k;
          for (k = 0; k < parent.children.length; k++) {
            if (parent.children[k].hasAttribute('data-animate')) sibs.push(parent.children[k]);
          }
          for (k = 0; k < sibs.length; k++) {
            if (Math.abs(sibs[k].offsetTop - el.offsetTop) < 8) row.push(sibs[k]);
          }
          idx = row.indexOf(el);
        }
        el.style.setProperty('--stagger-i', idx < 0 ? 0 : idx);
      }
    }
    assignStagger();
    addEventListener('resize', assignStagger);

    var io = new IntersectionObserver(function (entries) {
      for (var n = 0; n < entries.length; n++) {
        if (!entries[n].isIntersecting) continue;
        entries[n].target.classList.add('is-visible');
        io.unobserve(entries[n].target);      // once
      }
    }, { threshold: 0.2 });

    for (var j = 0; j < items.length; j++) io.observe(items[j]);
  })();

  makeCarousel(document.getElementById('track'),
               document.getElementById('prev'),
               document.getElementById('next'));
})();
