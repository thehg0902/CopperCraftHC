# Herostory — skill installer

This document installs a new skill named **herostory** into an Agency OS
repository. Feed this whole file to the Agency OS chat and instruct it to
install. It is self-contained: every file's full content is below.

## Install instructions (for the receiving session)

1. Create `.claude/skills/herostory/SKILL.md` from **File 1**.
2. Create `.claude/skills/herostory/references/stage-architecture.md` from **File 2**.
3. Create `.claude/skills/herostory/templates/herostory-driver.js` from **File 3**.
4. Create `.claude/skills/herostory/templates/herostory-stage.html` from **File 4**.
5. Create `.claude/skills/herostory/templates/herostory-stage.css` from **File 5**.
6. In `.claude/skills/hero-media/SKILL.md`, extend the frontmatter
   description's "Not for" clause with: `or composing multi-beat opening
   sequences (herostory)`. Do not change anything else in hero-media.
7. If the repo keeps a skill registry/index, add herostory to it
   (category: frontend, tier: B).

Boundary between the two skills: **herostory owns the composition** of a
page-opening sequence (which beats exist, how they chain, the shared pinned
stage, the scroll driver). **hero-media owns single-treatment playback**
(loop-crossfade, intro-loop, play-once, encoding/budget rules) and stays the
authority on posters, LCP, autoplay, and weight budgets. Asset slots still
flow through media-generation → MEDIA_LOG → /ingest as usual.

---

## File 1 — `.claude/skills/herostory/SKILL.md`

```markdown
---
name: herostory
description: Compose cinematic page-opening sequences - optional intro
  video, optional looping hero, N pinned scroll-scrub story beats -
  as ONE seamless stage with opacity-only handoffs. Use when a build
  wants the signature continuous-shot opener (hero flowing into scroll
  stories with no cut). Not for single-treatment hero playback
  (hero-media), general page animation (frontend-animation), or
  generating the media itself (media-generation).
metadata: {version: 1.0.0, category: frontend, tier: B}
---
# Herostory

## Purpose
The agency's signature opener: the page begins as a cinematic shot -
(intro) -> looping hero -> scroll-scrubbed story beats - experienced as
ONE unbroken take. This skill is a composition grammar plus the proven
stage architecture, not a fixed layout: every beat is optional and the
story count is per-project.

## Inputs
client.md Stack hero-media/animation flags, ingested assets in
site/assets/ (scrub manifests per contracts/asset-slots.md), tokens.css,
contracts/file-structure.md.

## Outputs
Opening-stage markup in the hero page + driver JS in that page's
script.js + stage CSS in that page's style.css, assets wired per
contracts/file-structure.md.

## Composition grammar
A herostory is a chain of BEATS rendered inside one pinned stage:

    [intro video]? -> [looping hero]? -> [story 1]? -> ... -> [story N]?

- Any subset is valid. Examples:
  - loop hero only -> this degenerates to hero-media's loop treatment;
    use hero-media directly, no stage needed.
  - loop hero + 2 scrub stories -> the classic run (reference build).
  - intro + loop + 3 stories -> intro plays once (hero-media
    intro-loop handoff), then the run continues as normal.
  - stories only -> the page opens already inside story 1's first frame
    (frame 0001 doubles as poster/LCP).
- Each beat = one MEDIA LAYER (scrub frame-sequence on canvas, video, or
  still image) + optionally one COPY LAYER (headline/body/CTA lines).
- Every seam between beats is an opacity-only crossfade at a tuned
  progress window. Never a cut, slide, or z-index swap.
- Copy beats are independent of media beats: a copy layer may fade out
  before, during, or after its media layer hands off.

## Architecture rule (the shipped pattern)
ONE wrapper, ONE sticky stage, ALL layers stacked inside:

- Wrapper `.hero-stage` = the RUNWAY. Height = (100 + sum of per-beat
  runways)svh, `padding-block:0` (padding desyncs the driver). Budget
  ~90-120svh of runway per story beat plus ~10-15svh per crossfade.
- `.hero-stage__inner` = sticky, `top:0`, 100svh, `overflow:hidden`.
- Media well at z-index 0; DOM order = stacking order (base first,
  last story on top). Reordering markup silently reverses dissolves.
- Copy layers at z-index 1, absolutely stacked, `pointer-events:none`
  when not the active beat (their own links opt back in).
- Driver: templates/herostory-driver.js - a config array of beats;
  add a story by adding a config entry + a canvas + a copy layer.

## Rules
1. Progress = -rect.top / (wrapperHeight - stickyHeight). Size BOTH in
   svh (vh fallback first, svh second) and cache the sticky height -
   never window.innerHeight, which breathes with the mobile URL bar and
   makes the scrub drift against the scroll.
2. Scroll driver: passive scroll listener guarded by an actual scrollY
   change; deliberately NOT requestAnimationFrame (rAF suspends in
   hidden/background/preview panes and freezes the run on frame 0).
   No CSS transition on any driver-written property - it lags reverse
   scrubbing.
3. Crossfade windows start at epsilon (0.01), never 0.00: at rest,
   resize/sub-pixel jitter around 0 flips the base<->layer swap.
4. Seam quality dictates the dissolve. Compare the two boundary frames
   (SSIM or by eye): near-identical (>~0.98) -> short blend while both
   keep scrubbing; visibly different -> LONGER window and HOLD both
   sequences on their boundary frames for the whole blend (a clean
   still-to-still dissolve, never two moving images cross-dissolving).
5. Scrub = canvas + preloaded stills. NEVER video.currentTime
   (hero-media references/scroll-scrub.md). Manifest values come from
   data-* attributes, not fetch() - the page must scrub from file://.
   Preload with a stride (every 4th frame) then backfill; draw the
   nearest loaded frame while the exact one loads (never blank); defer
   later sequences' bulk preload until the run is underway.
6. Loop video: native `loop` ONLY for footage confirmed seamless;
   otherwise restart on 'ended' (an honest hard cut, fixable in the
   footage, not hidden in the player). Pause the video once fully
   covered by the next layer - stop decoding what nobody sees.
7. Copy layers: stagger lines within their own layer only (a stage-wide
   query smears the staggers together). Fully-faded layers also get
   visibility:hidden - keeps invisible links out of the tab order and
   the a11y tree.
8. Reduced motion: CSS collapses the wrapper to a normal stacked
   document (height:auto, static layers, canvases hidden) and the
   driver returns before binding anything. The poster stands. Poster,
   LCP, autoplay (muted+playsinline), and weight budgets all inherit
   from hero-media rules 4-7.
9. Scrims and focal-point tracking are published as CSS custom
   properties per tick (--hero-scrim, --story-scrim, --hero-focal-x).
   Portrait crops track the subject across beats via object-position.
10. No-JS: a <noscript> block collapses the runway to 100svh and shows
    only the first copy beat over the poster - the frozen frame must
    read as a finished hero on its own.

## Tuning workflow
The TUNING CONSTANTS block in the driver is the contract. All windows
are progress 0..1 along the runway, ordered, non-overlapping except
designed blends. Choreography changes = window changes; touch code only
when a new capability is needed. Verify seams at the exact boundary
pixel (scroll there, screenshot, check for gaps/jumps).

## References
- references/stage-architecture.md - timeline model, runway math, seam
  guidance, portrait focal tracking, and the alternate GSAP
  pinned-sections pattern (with the exact-pixel pin-end fix).

## Scripts / Templates
- templates/herostory-driver.js - config-driven N-beat driver (copy
  into the page's script.js; keep the defensive guards and comments)
- templates/herostory-stage.html - stage markup skeleton
- templates/herostory-stage.css - stage CSS incl. reduced-motion
  collapse and noscript notes

## Anti-patterns
- Scrubbing via video.currentTime; rAF-driven scroll reading; vh-only
  sizing; CSS transitions on driver-written properties.
- Separate adjacent pinned sections when one shared stage would do; if
  they ARE needed, GSAP pins without explicit end:'+='+sectionHeight
  leave a 1-viewport gap (see references).
- Native loop on unverified footage; lazy-loading the poster; copy
  layers left focusable while invisible.

## Changelog
- 1.0.0 extracted from a shipped HVAC build (2026-07): single pinned
  stage, 3 media layers, 3 copy beats, verified 0px seams.
```

---

## File 2 — `.claude/skills/herostory/references/stage-architecture.md`

```markdown
# Herostory stage architecture

## The model

    .hero-stage                    height: (100 + R)svh   <- RUNWAY
      .hero-stage__inner           sticky top:0, 100svh   <- STAGE
        .hero-stage__media         z:0, absolute inset:0
          <video data-hero-loop>   beat 0 (optional loop hero)
          <canvas data-scrub="1">  beat 1 (opacity 0 until its window)
          <canvas data-scrub="2">  beat 2
          ...                      DOM order = stacking order
          .hero-stage__scrim--lead   gradient scrim, driver-dimmed
          .hero-stage__scrim--flat   flat wash behind centred copy
        .hero-stage__layer[data-hero-layer="lead"]   copy beat 0
        .hero-stage__layer[data-hero-layer="s1"]     copy beat 1
        ...

Progress p = -stage.getBoundingClientRect().top / (offsetHeight - stickyH),
clamped 0..1. Every visual is a pure function of p - scrolling backwards
replays the run in reverse for free.

## Timeline model
Lay all windows on one 0..1 ruler. Reference run (loop + 2 stories over
240svh of travel):

    p:      0    .05        .42  .44   .56              .95  1
    media:  loop |xfadeA| scrub A | HOLD |xfadeB| scrub B | hold
    copy:   lead-out .00-.14
                     story1-in .16-.38   story1-out .42-.48
                                          story2-in .60-.92

Rules of thumb:
- First crossfade starts at 0.01 (epsilon), not 0 - rest-state jitter.
- A copy beat clears BEFORE its media dissolve begins (story1-out ends
  at .48; xfadeB runs .44-.56) so text never rides a dissolve.
- Last scrub ends ~0.95; the final 5% holds the end frame so the unpin
  doesn't clip the last movement.

## Runway math
travel = wrapper - 100svh. Budget ~90-120svh per story's scrub + copy
dwell, ~10-15svh per held dissolve. 2 stories -> 240svh travel ->
340svh wrapper. 3 stories -> ~340-360svh travel -> ~440-460svh wrapper.
Longer runway = slower, more luxurious scrub; shorter = snappier.

## Seam quality -> dissolve design
Measure or eyeball the similarity of the two frames at a seam:
- Near-identical (e.g. loop's rest frame vs sequence frame 0001,
  SSIM ~0.99): short window (~4% of progress), both may keep moving.
- Smooth-but-different (SSIM ~0.94): longer window (~12%), and HOLD
  both boundary frames for the whole blend - freeze A on its last
  frame, keep B on frame 0001, dissolve, then start B's scrub.
- Unrelated shots: consider a dip-to-black instead (hero-media
  loop-crossfade technique) or regenerate the footage so the seam
  matches (last frame of A ~= first frame of B is a media-generation
  requirement, not a code fix).

## Portrait focal tracking (mobile)
A portrait cover-crop discards most of a 16:9 frame and the subject
drifts across beats. Publish --hero-focal-x from the driver
(lerp between per-beat start/end percentages, continuous across seams)
and apply it only under @media(max-width:640px):
object-position:var(--hero-focal-x,40%) center.

## Alternate pattern: adjacent GSAP-pinned sections
Prefer the single shared stage. If a build genuinely needs separate
back-to-back pinned scrub sections (e.g. sections owned by different
templates), know this root cause: CSS position:sticky AND GSAP's
end:'bottom bottom' both release a pinned stage exactly ONE
VIEWPORT-HEIGHT before the section's true end - standard behavior, but
it leaves a 1-viewport gap between consecutive pinned sections. Fix:

    ScrollTrigger.create({
      trigger: sec, pin: stage, start: 'top top',
      end: '+=' + sec.offsetHeight,   // NOT 'bottom bottom'
      scrub: true
    });

Section 1 then unpins at the EXACT pixel section 2 pins (verified 0px
gap in the reference build). Re-measure offsetHeight on resize.

## Hard-won details worth keeping
- padding-block:0 on the wrapper is load-bearing: section padding sits
  inside offsetHeight but not inside the sticky travel -> driver desync.
- vh declared before svh: without svh support the svh line is invalid;
  if svh were the only declaration the wrapper collapses to auto,
  runway <= 0, and the driver silently disables itself.
- Cache the sticky height on resize; reading offsetHeight every tick
  forces a second layout.
- getBoundingClientRect() (READ) before any style writes in the tick.
- Scrims must ramp toward their maximum where the footage is brightest,
  measured against the WORST frame, not the average one.
```

---

## File 3 — `.claude/skills/herostory/templates/herostory-driver.js`

```javascript
/* Herostory driver — one pinned stage, N media beats + M copy beats,
   opacity-only handoffs, all a pure function of scroll progress.
   Copy into the hero page's script.js and tune BEATS/COPY below.
   Generalized from a shipped build; the comments encode the WHY —
   keep them. */
(function () {
  'use strict';

  /* ==========================================================
     TUNING — all values are progress 0..1 along the runway
     (wrapper height − 100svh stage = the travel distance).

     MEDIA beats stack in DOM order and hand off by opacity only:
       base (loop video or first canvas)
         --xfade--> scrub 1 --xfade--> scrub 2 --> ...
     Windows must be ordered and non-overlapping except designed
     blends. First xfade starts at 0.01 (epsilon, NOT 0 — at rest,
     resize/sub-pixel jitter around 0 flips the swap back and forth).

     Seam rule: if a seam's boundary frames are visibly different,
     lengthen its xfade window and leave a gap between the previous
     scrub's end and the next scrub's start — both sequences HOLD
     their boundary frame through the blend (clean dissolve, not two
     moving images). Near-identical seams can blend short and keep
     scrubbing. */
  var MEDIA = [
    /* beat 0 — looping hero video (optional; delete if none).
       No windows: it is the base layer, covered by whatever follows. */
    { sel: '[data-hero-loop]', type: 'video' },
    /* beat 1 — first scrub story */
    { sel: '[data-scrub="1"]', type: 'scrub',
      xfade: [0.01, 0.05],      // near-identical seam: short blend
      scrub: [0.01, 0.42],      // then HOLDS its last frame
      preloadAt: 0 },           // 0 = preload immediately
    /* beat 2 — second scrub story */
    { sel: '[data-scrub="2"]', type: 'scrub',
      xfade: [0.44, 0.56],      // different seam: long, held dissolve
      scrub: [0.56, 0.95],      // final 5% holds the end frame
      preloadAt: 0.25 }         // defer bulk preload until underway
    /* add beats here; extend the wrapper height accordingly
       (~90–120svh of runway per story). */
  ];

  /* COPY beats — independent of media beats. in/out are progress
     windows; omit `in` for a layer visible at rest (the lead), omit
     `out` for one that stays to the end. rise = px drift while
     arriving (positive) / leaving (negative). A copy beat should
     clear BEFORE the next media dissolve begins. */
  var COPY = [
    { sel: '[data-hero-layer="lead"]', out: [0.00, 0.14], rise: -40 },
    { sel: '[data-hero-layer="s1"]',   in: [0.16, 0.38],
      out: [0.42, 0.48], rise: 40 },
    { sel: '[data-hero-layer="s2"]',   in: [0.60, 0.92], rise: 40 }
  ];

  var PRELOAD_STRIDE = 4;   // load every Nth frame, then backfill

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function range(p, w) { return w ? clamp01((p - w[0]) / (w[1] - w[0])) : 0; }

  /* ==========================================================
     Scroll-scrub frame sequence (canvas + preloaded WebP stills).
     NEVER video.currentTime — keyframe seeking is janky on mobile
     Safari. Manifest values come from data-* attributes, NOT fetch():
     fetch is blocked under file:// and the page must open standalone.
     ========================================================== */
  function createFrameSequence(canvas) {
    if (!canvas || !canvas.getContext) return null;
    var total = parseInt(canvas.getAttribute('data-scrub-frames'), 10);
    var base = canvas.getAttribute('data-scrub-base');
    var pattern = canvas.getAttribute('data-scrub-pattern') || 'frame-%04d.webp';
    if (!total || !base) return null;

    var ctx = canvas.getContext('2d');
    var frames = new Array(total);
    var exact = -1;   // index currently drawn, only when exact

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
      exact = hit ? i : -1;                // fallback doesn't lock in
    }
    function preload() {
      var order = [], i;
      for (i = 0; i < total; i += PRELOAD_STRIDE) order.push(i);
      for (i = 0; i < total; i++) if (i % PRELOAD_STRIDE) order.push(i);
      order.forEach(function (i) { load(i); });
    }
    return {
      draw: draw, load: load, preload: preload,
      indexFor: function (t) { return Math.round(t * (total - 1)); }
    };
  }

  /* Progress along the pinned stage: 0 when its top hits the viewport
     top, 1 when the sticky child has travelled the full runway.
     Denominator = the STICKY CHILD's height (cached), not
     window.innerHeight: both are sized in svh, which stays put when
     the mobile URL bar retracts — innerHeight does not. */
  function stageProgress(el, stickyH) {
    var rect = el.getBoundingClientRect();          // READ before writes
    var runway = el.offsetHeight - (stickyH || window.innerHeight);
    if (runway <= 0) return null;
    return clamp01(-rect.top / runway);
  }

  /* Scroll driver: passive, guarded by an actual scrollY change, and
     deliberately NOT requestAnimationFrame — rAF suspends in hidden/
     background/preview panes, freezing the scrub on frame 0. */
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

  (function heroStage() {
    var stage = document.querySelector('[data-hero-stage]');
    if (!stage) return;
    var inner = stage.querySelector('.hero-stage__inner');
    if (!inner) return;

    /* Resolve MEDIA beats. Missing elements are skipped, so the same
       driver serves loop-only, stories-only, or the full chain. */
    var media = MEDIA.map(function (m) {
      var el = stage.querySelector(m.sel);
      if (!el) return null;
      var beat = { cfg: m, el: el };
      if (m.type === 'scrub') {
        beat.seq = createFrameSequence(el);
        beat.preloaded = false;
      }
      return beat;
    }).filter(Boolean);

    var video = null;
    media.forEach(function (b) { if (b.cfg.type === 'video') video = b.el; });

    /* No native `loop`: unless footage is confirmed seamless, a native
       loop can silently freeze on the last frame. Restarting on
       'ended' makes a non-seamless clip cut visibly — honest, and
       fixable in the footage rather than hidden in the player. */
    if (video) {
      video.addEventListener('ended', function () {
        video.currentTime = 0;
        var pr = video.play();
        if (pr && pr.catch) pr.catch(function () {});
      });
    }

    /* Reduced motion: the driver never runs. CSS has already collapsed
       the runway to a normal stacked document; the poster stands. */
    if (reduced) { if (video) video.pause(); return; }

    /* Kick off first frames + eager preloads. */
    media.forEach(function (b) {
      if (!b.seq) return;
      b.seq.load(0, function () { b.seq.draw(0); });
      if (!b.cfg.preloadAt) { b.seq.preload(); b.preloaded = true; }
    });

    /* Resolve COPY beats; scope .line queries to their OWN layer — a
       stage-wide query would smear all staggers together. */
    var copy = COPY.map(function (c) {
      var el = stage.querySelector(c.sel);
      if (!el) return null;
      return { cfg: c, el: el, lines: el.querySelectorAll('.line') };
    }).filter(Boolean);

    /* Fully-faded layers keep their links out of the tab order. */
    function setLayer(el, opacity, rise) {
      el.style.opacity = opacity;
      el.style.transform = 'translate3d(0,' + rise + 'px,0)';
      el.style.visibility = opacity <= 0.001 ? 'hidden' : 'visible';
    }
    function stagger(lines, p, w) {
      var span = (w[1] - w[0]) / Math.max(lines.length, 1);
      for (var i = 0; i < lines.length; i++) {
        var start = w[0] + i * span;
        var t = clamp01((p - start) / (span * 1.4));
        lines[i].style.opacity = t;
        lines[i].style.transform = 'translate3d(0,' + ((1 - t) * 24) + 'px,0)';
      }
    }

    var stickyH = 0;
    function measure() { stickyH = inner.offsetHeight; }

    onScrollDrive(function update() {
      var p = stageProgress(stage, stickyH);
      if (p === null) return;

      /* Media beats: opacity from the xfade window, frame from the
         scrub window (holds automatically outside it — range clamps). */
      var coverP = 0;   // opacity of the topmost fully-visible overlay
      media.forEach(function (b) {
        if (b.cfg.type !== 'scrub' || !b.seq) return;
        var fade = range(p, b.cfg.xfade);
        b.el.style.opacity = fade;
        if (fade >= 1) coverP = 1;
        b.seq.draw(b.seq.indexFor(range(p, b.cfg.scrub)));
        if (!b.preloaded && b.cfg.preloadAt && p >= b.cfg.preloadAt) {
          b.preloaded = true;
          b.seq.preload();
        }
      });

      copy.forEach(function (c) {
        var tIn = c.cfg.in ? range(p, c.cfg.in) : 1;
        var tOut = c.cfg.out ? range(p, c.cfg.out) : 0;
        var rise = c.cfg.in ? (1 - tIn) * c.cfg.rise : tOut * c.cfg.rise;
        setLayer(c.el, tIn * (1 - tOut), rise);
        if (c.cfg.in && tIn > 0 && tOut < 1) stagger(c.lines, p, c.cfg.in);
      });

      /* PER-BUILD EXTRAS go here, published as CSS custom properties
         with NO transitions (they'd lag the scroll). Examples from the
         reference build:
           inner.style.setProperty('--hero-scrim', ...)   scrim ramps
           inner.style.setProperty('--story-scrim', ...)  copy contrast
           inner.style.setProperty('--hero-focal-x', ...) portrait
             focal tracking, lerped per beat, continuous across seams */

      /* The loop is fully covered once an overlay is opaque — stop
         decoding it. Resume if the user scrolls back up. */
      if (video) {
        if (coverP >= 1) { if (!video.paused) video.pause(); }
        else if (video.paused && !video.ended) {
          var pr = video.play();
          if (pr && pr.catch) pr.catch(function () {});
        }
      }
    }, measure);
  })();

})();
```

---

## File 4 — `.claude/skills/herostory/templates/herostory-stage.html`

```html
<!-- HEROSTORY STAGE — one continuous pinned run. The wrapper height is
     the runway: (100 + ~90-120 per story)svh. Media layers hand off by
     opacity crossfade only; DOM order = stacking order (base first,
     last story on top) — reordering silently reverses the dissolves.
     data-scrub-* mirror each scrub/<slot>/manifest.json: read from
     attributes, never fetch()ed, so the page still scrubs from file://.
     Delete any beat this build doesn't use — the driver skips missing
     elements. -->
<section class="hero-stage" id="top" data-hero-stage data-header-dark>
  <div class="hero-stage__inner">

    <div class="hero-stage__media" aria-hidden="true">
      <!-- beat 0: looping hero (optional). Poster mandatory = LCP. -->
      <video class="hero-stage__video" data-hero-loop
             autoplay muted playsinline preload="auto"
             poster="assets/images/hero-loop-poster.webp">
        <source src="assets/video/hero-loop.mp4" type="video/mp4">
      </video>
      <!-- beat 1..N: scrub sequences. width/height = frame pixel size. -->
      <canvas class="hero-stage__canvas" data-scrub="1"
              width="1440" height="812"
              data-scrub-frames="61"
              data-scrub-base="assets/images/scrub/story-1/"
              data-scrub-pattern="frame-%04d.webp"></canvas>
      <canvas class="hero-stage__canvas" data-scrub="2"
              width="1440" height="812"
              data-scrub-frames="61"
              data-scrub-base="assets/images/scrub/story-2/"
              data-scrub-pattern="frame-%04d.webp"></canvas>
      <div class="hero-stage__scrim hero-stage__scrim--lead"></div>
      <div class="hero-stage__scrim hero-stage__scrim--flat"></div>
    </div>

    <!-- copy beat 0: visible at rest, fades out first -->
    <div class="hero-stage__layer hero-stage__layer--lead" data-hero-layer="lead">
      <div class="container">
        <span class="eyebrow eyebrow--on-dark">[PLACEHOLDER: eyebrow]</span>
        <h1><span>[PLACEHOLDER: headline]</span></h1>
        <p class="hero-sub">[PLACEHOLDER: subline]</p>
        <div class="hero-actions">
          <a class="btn btn-soft" href="#">[PLACEHOLDER: primary CTA]</a>
          <a class="btn btn-glass" href="#">[PLACEHOLDER: secondary CTA]</a>
        </div>
      </div>
    </div>

    <!-- copy beats 1..N: .line children get the driver's stagger.
         role/aria-label because the layer's h2 arrives mid-scroll. -->
    <div class="hero-stage__layer hero-stage__layer--story" data-hero-layer="s1"
         role="group" aria-label="[PLACEHOLDER: story 1 label]">
      <div class="container">
        <h2 class="line">[PLACEHOLDER: story 1 headline]</h2>
        <p class="line">[PLACEHOLDER: story 1 body]</p>
        <p class="line line--muted">[PLACEHOLDER: strapline]</p>
        <p class="line"><a class="btn btn-glass line-cta" href="#">[PLACEHOLDER: CTA]</a></p>
      </div>
    </div>

    <div class="hero-stage__layer hero-stage__layer--story" data-hero-layer="s2"
         role="group" aria-label="[PLACEHOLDER: story 2 label]">
      <div class="container">
        <h2 class="line">[PLACEHOLDER: story 2 headline]</h2>
        <p class="line">[PLACEHOLDER: story 2 body]</p>
      </div>
    </div>

  </div>
</section>

<!-- In <head>: the no-JS fallback. The runway is pure scroll distance
     the choreography would have used — collapse it and show only the
     lead beat over the poster (a finished hero on its own).
<noscript><style>
  .hero-stage{height:100svh}
  .hero-stage__layer--story{display:none}
  .hero-stage__canvas{display:none}
</style></noscript>
-->
```

---

## File 5 — `.claude/skills/herostory/templates/herostory-stage.css`

```css
/* ===== Herostory stage =====
   .hero-stage is the RUNWAY — its height is the scroll distance the
   choreography maps onto. __inner is the sticky viewport-sized stage.
   Media well at z-index 0, copy layers at z-index 1.
   Custom properties (--hero-scrim, --story-scrim, --hero-focal-x) are
   published by the driver every tick and must carry NO transition, or
   they lag the scroll.

   padding-block:0 is load-bearing: wrapper padding would both inset
   the sticky stage AND desync the driver, whose runway is
   offsetHeight − stickyHeight (padding sits inside offsetHeight but
   is NOT part of the sticky travel).

   Height = (100 + runway)svh — e.g. two stories: 340svh.
   vh first, svh second: without svh support the svh line is invalid;
   the vh fallback keeps the effect (just less stable under mobile
   browser chrome). If BOTH were missing the wrapper collapses to
   auto, runway <= 0, and the driver silently disables itself. */
.hero-stage{position:relative;height:340vh;height:340svh;padding-block:0}
.hero-stage__inner{position:sticky;top:0;height:100vh;height:100svh;
                   overflow:hidden;color:#fff}

.hero-stage__media{position:absolute;inset:0;z-index:0}
/* Desktop keeps a fixed centre crop; only the portrait query below
   tracks the subject via --hero-focal-x. */
.hero-stage__video,
.hero-stage__canvas{position:absolute;inset:0;width:100%;height:100%;
                    object-fit:cover;object-position:50% center}
/* Sequences start hidden; the driver crossfades each over the one
   beneath. Never add a transition here — it lags reverse scrubbing. */
.hero-stage__canvas{opacity:0}

.hero-stage__scrim{position:absolute;inset:0}
/* Gradient scrim aimed at the lead copy's side — the scrim must follow
   the copy or the text lands on the bright end of the ramp. Ramp
   values are per-build: measure against the BRIGHTEST frame under the
   smallest type, not the average frame. */
.hero-stage__scrim--lead{background:linear-gradient(90deg,
     rgba(0,0,0,.82),rgba(0,0,0,.38));opacity:var(--hero-scrim,1)}
.hero-stage__scrim--flat{background:rgba(0,0,0,.46);
     opacity:var(--story-scrim,0)}

.hero-stage__layer{position:absolute;inset:0;z-index:1;display:flex;
                   align-items:center;will-change:opacity,transform}
/* Story layers sit above the lead at inset:0 and would swallow clicks
   on the hero CTAs — so they opt out, and their own links opt back in.
   (The driver also flips visibility:hidden at opacity 0, keeping
   hidden copy out of the tab order and the a11y tree.) */
.hero-stage__layer--story{opacity:0;text-align:center;pointer-events:none}
.hero-stage__layer--story .line-cta,
.hero-stage__layer--story a{pointer-events:auto}

/* ===== Portrait focal tracking (phones) =====
   A portrait cover-crop discards most of a 16:9 frame; the driver
   publishes --hero-focal-x so the subject stays in the crop instead
   of sliding out of frame across beats. */
@media(max-width:640px){
  .hero-stage__video,
  .hero-stage__canvas{object-position:var(--hero-focal-x,40%) center}
}

/* ===== Reduced motion =====
   Collapse the whole choreography to a normal stacked document. The
   JS driver also exits before binding — this block is what the user
   actually sees: poster + all copy, static. */
@media(prefers-reduced-motion:reduce){
  .hero-stage{height:auto}
  .hero-stage__inner{position:relative;height:auto;min-height:100svh;
                     display:flex;flex-direction:column;justify-content:center;
                     gap:var(--space-8);padding-block:var(--space-9)}
  .hero-stage__layer{position:static;opacity:1!important;transform:none!important;
                     visibility:visible!important;pointer-events:auto}
  .hero-stage__canvas{display:none}
  .hero-stage__layer .line{opacity:1!important;transform:none!important}
}
```

---

*End of installer. After installing, verify: skill loads by description,
templates are referenced from SKILL.md, and hero-media's "Not for" clause
points composition at herostory.*
