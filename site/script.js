/* Home page behavior: the hero pinned stage (idle loop -> scroll-scrub ->
   story-2), driven by scroll position.
   Carousels live in shared/main.js — /our-work/ runs one too and does not
   load this file. */
(function () {
  'use strict';

  /* ==========================================================
     TUNING CONSTANTS — the knobs worth adjusting first.
     All values are progress 0..1 along the hero runway
     (340svh wrapper - 100svh sticky stage = 240svh of travel).

     The stage runs three media layers that hand off by opacity only:
       idle loop  --XFADE_A-->  sequence A (hero-transition)
                  --XFADE_B-->  sequence B (story-2)
     ========================================================== */
  var LEAD_OUT_START = 0.00;  // lead copy starts fading out
  var LEAD_OUT_END   = 0.14;  // ...gone (~34svh)

  var XFADE_A_START  = 0.01;  // epsilon, NOT 0 — at rest, resize/sub-pixel
                              // jitter around 0 would otherwise flip the
                              // loop->canvas swap back and forth
  var XFADE_A_END    = 0.05;  // canvas A opaque; the loop is now invisible
  var SCRUB_A_START  = 0.01;
  var SCRUB_A_END    = 0.42;  // ~98svh of scrub, then A HOLDS frame 0061

  var NEXT_IN_START  = 0.16;  // problem copy in
  var NEXT_IN_END    = 0.38;
  var NEXT_OUT_START = 0.42;  // ...and clears before the dissolve begins
  var NEXT_OUT_END   = 0.48;

  /* The requested seam. Measured SSIM between A's last frame and B's first
     is 0.940 (chroma 0.985, luma 0.917) — a smooth dissolve, not the
     near-identity of the loop->A seam (0.986). So this window is longer
     than XFADE_A, and SCRUB_B does not start until it finishes: A holds
     frame 0061 and B holds frame 0001 for the whole blend, making it a
     clean A->B dissolve instead of two moving images cross-dissolving. */
  var XFADE_B_START  = 0.44;
  var XFADE_B_END    = 0.56;
  var SCRUB_B_START  = 0.56;
  var SCRUB_B_END    = 0.95;  // final frame reached, then held for the last 5%

  var PROMISE_IN_START = 0.60;
  var PROMISE_IN_END   = 0.92;

  var LEAD_RISE_PX   = -40;   // lead copy drift while leaving
  var NEXT_RISE_PX   = 40;    // centred layers drift while arriving

  /* Portrait crop tracking (mobile only). A: condenser -> fireplace.
     B: fireplace (~24%) -> wall unit (~35%). Continuous across the seam. */
  var FOCAL_A_START  = 40;
  var FOCAL_A_END    = 32;
  var FOCAL_B_START  = 32;
  var FOCAL_B_END    = 36;

  var SCRIM_START    = 1.00;  // gradient scrim at rest (lead copy contrast)
  var SCRIM_END      = 0.55;  // ...lifted as the interior warms up
  var FLAT_SCRIM_MAX = 0.45;  // flat wash behind the centred copy layers

  var PRELOAD_STRIDE = 4;     // load every Nth frame, then backfill
  var PRELOAD_B_AT   = 0.25;  // defer B's bulk preload until the run is
                              // underway (B is ~3.5MB of WebP)

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function range(p, a, b) { return clamp01((p - a) / (b - a)); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ==========================================================
     Scroll-scrub frame sequence (canvas + preloaded WebP stills).

     NEVER video.currentTime — keyframe seeking is janky on mobile Safari
     (hero-media references/scroll-scrub.md).

     Manifest values come from data-* attributes, NOT fetch(): fetch is
     blocked under file://, and contracts/file-structure.md rule 2 requires
     site/index.html to open standalone from disk. The attributes must match
     assets/images/scrub/<slot>/manifest.json.
     ========================================================== */
  function createFrameSequence(canvas) {
    if (!canvas || !canvas.getContext) return null;
    var total = parseInt(canvas.getAttribute('data-scrub-frames'), 10);
    var base = canvas.getAttribute('data-scrub-base');
    var pattern = canvas.getAttribute('data-scrub-pattern') || 'frame-%04d.webp';
    if (!total || !base) return null;

    var ctx = canvas.getContext('2d');
    var frames = new Array(total);
    var exact = -1;   // index currently drawn, only when it was the exact frame

    function src(i) {
      return base + pattern.replace('%04d', String(i + 1).padStart(4, '0'));
    }
    function load(i, cb) {
      if (frames[i]) { if (cb) cb(); return; }
      var img = new Image();
      img.onload = function () { frames[i] = img; if (cb) cb(); };
      img.src = src(i);
    }
    function nearestLoaded(i) {
      for (var d = 1; d < total; d++) {
        if (frames[i - d]) return frames[i - d];
        if (frames[i + d]) return frames[i + d];
      }
      return null;
    }
    function draw(i) {
      if (i === exact) return;
      var hit = frames[i];
      var img = hit || nearestLoaded(i);   // never blank while loading
      if (!img) return;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      exact = hit ? i : -1;                // fallback doesn't lock: retry next tick
    }
    function preload() {
      var order = [], i;
      for (i = 0; i < total; i += PRELOAD_STRIDE) order.push(i);
      for (i = 0; i < total; i++) if (i % PRELOAD_STRIDE) order.push(i);
      order.forEach(function (i) { load(i); });
    }
    return {
      total: total, draw: draw, load: load, preload: preload,
      indexFor: function (p) { return Math.round(p * (total - 1)); }
    };
  }

  /* Progress along a pinned stage: 0 when its top hits the viewport top,
     1 when the sticky child has travelled its full runway.

     The denominator is the STICKY CHILD's height, not window.innerHeight.
     Both the wrapper and the child are sized in svh, which stays put when
     the mobile URL bar retracts — innerHeight does not. Mixing the two makes
     the runway breathe with the browser chrome and the scrub drift against
     the scroll. Child height is passed in cached: reading offsetHeight here
     would force a second layout every tick. */
  function stageProgress(el, stickyH) {
    var rect = el.getBoundingClientRect();              // READ before any write
    var runway = el.offsetHeight - (stickyH || window.innerHeight);
    if (runway <= 0) return null;
    return clamp01(-rect.top / runway);
  }

  /* Scroll driver: passive, guarded by an actual scrollY change, and
     deliberately NOT wrapped in requestAnimationFrame — rAF suspends in
     hidden/background/preview panes, which freezes the scrub on frame 0. */
  function onScrollDrive(update, remeasure) {
    var lastY = -1;
    function tick() {
      var y = window.pageYOffset;
      if (y === lastY) return;
      lastY = y;
      update();
    }
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', function () {
      if (remeasure) remeasure();
      lastY = -1;
      update();
    });
    if (remeasure) remeasure();
    update();
  }

  /* ==========================================================
     HERO STAGE — one pinned run, three media layers, opacity-only handoffs
     ========================================================== */
  (function heroStage() {
    var stage = document.querySelector('[data-hero-stage]');
    if (!stage) return;
    var inner   = stage.querySelector('.hero-stage__inner');
    var video   = stage.querySelector('[data-hero-loop]');
    var canvasA = stage.querySelector('[data-scrub-a]');
    var canvasB = stage.querySelector('[data-scrub-b]');
    var lead    = stage.querySelector('[data-hero-layer="lead"]');
    var next    = stage.querySelector('[data-hero-layer="next"]');
    var promise = stage.querySelector('[data-hero-layer="promise"]');
    if (!inner) return;

    // Scoped to their own layer, NOT the stage: a stage-wide '.line' query
    // would match all six and smear both staggers together.
    var nextLines    = next    ? next.querySelectorAll('.line')    : [];
    var promiseLines = promise ? promise.querySelectorAll('.line') : [];

    /* No native `loop` attribute: the clip is not confirmed seamless, so a
       native loop would silently freeze on its last frame. Restarting on
       'ended' makes a non-seamless clip hard-cut instead — visible, honest,
       and fixable in the footage rather than hidden in the player. */
    if (video) {
      video.addEventListener('ended', function () {
        video.currentTime = 0;
        var pr = video.play();
        if (pr && pr.catch) pr.catch(function () {});
      });
    }

    // Reduced motion: the driver never runs. CSS has already collapsed the
    // runway to a normal stacked document; the video rests on its poster.
    if (reduced) { if (video) video.pause(); return; }

    var seqA = createFrameSequence(canvasA);
    var seqB = createFrameSequence(canvasB);
    if (seqA) { seqA.load(0, function () { seqA.draw(0); }); seqA.preload(); }
    // B's frame 0001 is needed the moment the dissolve starts, but its bulk
    // (~3.5MB) can wait until the run is actually underway.
    if (seqB) seqB.load(0, function () { seqB.draw(0); });
    var seqBPreloaded = false;

    // Fully-faded layers keep their invisible links out of the tab order.
    function setLayer(el, opacity, rise) {
      if (!el) return;
      el.style.opacity = opacity;
      el.style.transform = 'translate3d(0,' + rise + 'px,0)';
      el.style.visibility = opacity <= 0.001 ? 'hidden' : 'visible';
    }
    function stagger(lines, p, from, to) {
      var span = (to - from) / Math.max(lines.length, 1);
      for (var i = 0; i < lines.length; i++) {
        var start = from + i * span;
        var t = range(p, start, start + span * 1.4);
        lines[i].style.opacity = t;
        lines[i].style.transform = 'translate3d(0,' + ((1 - t) * 24) + 'px,0)';
      }
    }

    var stickyH = 0;
    function measure() { stickyH = inner.offsetHeight; }

    onScrollDrive(function update() {
      var p = stageProgress(stage, stickyH);
      if (p === null) return;

      var leadOut  = range(p, LEAD_OUT_START, LEAD_OUT_END);
      var fadeA    = range(p, XFADE_A_START, XFADE_A_END);
      var scrubA   = range(p, SCRUB_A_START, SCRUB_A_END);
      var nextIn   = range(p, NEXT_IN_START, NEXT_IN_END);
      var nextOut  = range(p, NEXT_OUT_START, NEXT_OUT_END);
      var fadeB    = range(p, XFADE_B_START, XFADE_B_END);
      var scrubB   = range(p, SCRUB_B_START, SCRUB_B_END);
      var promiseIn = range(p, PROMISE_IN_START, PROMISE_IN_END);

      setLayer(lead, 1 - leadOut, leadOut * LEAD_RISE_PX);
      setLayer(next, nextIn * (1 - nextOut), (1 - nextIn) * NEXT_RISE_PX);
      setLayer(promise, promiseIn, (1 - promiseIn) * NEXT_RISE_PX);
      if (nextIn > 0 && nextOut < 1) stagger(nextLines, p, NEXT_IN_START, NEXT_IN_END);
      if (promiseIn > 0) stagger(promiseLines, p, PROMISE_IN_START, PROMISE_IN_END);

      if (canvasA) canvasA.style.opacity = fadeA;
      if (canvasB) canvasB.style.opacity = fadeB;
      if (seqA) seqA.draw(seqA.indexFor(scrubA));
      if (seqB) seqB.draw(seqB.indexFor(scrubB));

      if (seqB && !seqBPreloaded && p >= PRELOAD_B_AT) {
        seqBPreloaded = true;
        seqB.preload();
      }

      // Published per tick, no CSS transition, or they lag the scroll.
      inner.style.setProperty('--hero-scrim', lerp(SCRIM_START, SCRIM_END, scrubA).toFixed(3));
      inner.style.setProperty('--story-scrim', (FLAT_SCRIM_MAX * Math.max(nextIn, promiseIn)).toFixed(3));
      inner.style.setProperty('--hero-focal-x',
        (fadeB > 0 ? lerp(FOCAL_B_START, FOCAL_B_END, scrubB)
                   : lerp(FOCAL_A_START, FOCAL_A_END, scrubA)).toFixed(2) + '%');

      // The loop is fully covered once canvas A is opaque — stop decoding it.
      if (video) {
        if (fadeA >= 1) { if (!video.paused) video.pause(); }
        else if (video.paused) {
          var pr = video.play();
          if (pr && pr.catch) pr.catch(function () {});
        }
      }
    }, measure);
  })();

})();
