# Build State

Client: CopperCraft Heating & Cooling
Template version: v1.7.1
Started: 2026-07-24

| phase | name         | status  | gate                      | completed |
|-------|--------------|---------|---------------------------|-----------|
| 0     | intake       | done    | HUMAN: confirm table      | 2026-07-24 |
| 1     | architecture | done    | -                         | 2026-07-24 |
| 2     | design       | done    | HUMAN: approve style prev | 2026-07-24 |
| 3     | content      | done    | -                         | 2026-07-24 |
| 4     | media        | done    | -                         | 2026-07-24 |
| 5     | build        | in-progress | -                     | -         |
| 6     | qa           | pending | scripts must pass         | -         |
| 7     | deploy       | pending | HUMAN: confirm deploy     | -         |
| 8     | handoff      | pending | -                         | -         |

status: pending | in-progress | blocked | done
Notes:
- P0 (2026-07-24): niche=HVAC contractor. Contact/hours/email/guarantee confirmed
  → Overrides. No 24/7, no licence claims, no published prices, no founding story
  (operator). Full review set approved → sliding testimonials carousel. Home pages:
  hero → scroll-story-1 → scroll-story-2 → services → testimonials → contact.
- P2 (2026-07-24): tokens.css written from brand board (1 contrast fix: action copper
  → #A85422 for AA; vibrant #C96A32 kept decorative). Style preview: 61 tokens, 0
  contrast fails. Layout preview authored + self-checked in browser (hero, dual scrub +
  GSAP floating text w/ reduced-motion & no-GSAP fallbacks, services, service-area,
  sliding testimonials carousel, cta, contact placeholder form, mobile nav @360, sticky
  call bar). 0 console errors. AWAITING operator approval of BOTH previews (gate).
- P2 copper refinement (operator: orange "felt cheap"): retuned to premium metallic
  copper (deeper #A05628 action + reflective sheen/gilded stars/CTA sweep, reduced-motion
  gated). 0 contrast fails. Re-presented at gate.
- Pending: Poppins/Inter woff2 files needed at site/assets/fonts/ (system fallback for
  now — flagged); domain (deploy-time). NOT yet committed/pushed since the copper +
  seamless-opener changes.
- P2 seamless opener: removed the trust strip from between hero/story-1/story-2 (now one
  continuous dark cinematic sequence); trust bar relocated to after story-2. Verified live.
- P2 seamless FIX: root-caused a 1-viewport gap between story1/story2 to CSS
  sticky/GSAP 'end:bottom bottom' both releasing 1vh early by design. Switched scrub
  pin technique to explicit end:'+='+sectionHeight — story1 unpins at the EXACT pixel
  story2 pins (verified via ScrollTrigger start/end + live screenshot at the boundary:
  0px gap, canvas fills edge-to-edge under header). Documented in DECISIONS.md as the
  required Phase 5 hero-media technique for adjacent pinned scrub sections.
- P2 GATE (2026-07-24): operator approved both style-preview.html and
  layout-preview.html in-chat. Layout preview is now BINDING for Phase 5.
  Phase 2 marked done. Proceeding to Phase 3 content.
- P3 (2026-07-24): final copy for all 9 home sections written directly into
  site/index.html (single-page site). Hero register chosen (warm/honest
  craftsman, see DECISIONS.md). Full approved testimonial set (9 reviews)
  used verbatim. No invented facts. site/style.css, site/script.js,
  site/shared/base.css, site/shared/main.js created as empty Phase-5 stubs.
  Phase 3 done. Proceeding to Phase 4 media.
- P4 (2026-07-24): intake swept — all 3 required video slots (hero-loop,
  scroll-story-1-scrub, scroll-story-2-scrub) already supplied by operator
  footage; moved into placement folders under client/assets-intake/slots/,
  pre-ticked [x], MEDIA_LOG rows model=client/credits=0. ZERO gaps — no
  generation prompts, no paid-media gate needed. logo-*.png files noted as
  unused (layout uses text logotype, not image).
- P4 ingest (2026-07-24): operator confirmed slot mapping, ran /ingest.
  ffmpeg was missing locally — installed via Homebrew with operator
  approval; regular ffmpeg formula lacked libwebp support (scrub frames
  collapsed into one animated .webp instead of a real sequence) — switched
  to ffmpeg-full (has libwebp) and added an explicit `-c:v libwebp` flag
  to scripts/ingest-assets.py's do_scrub() so the still-image encoder is
  always used regardless of the local ffmpeg build's default. Re-ran:
  hero-loop.mp4 (1.2MB, CRF20) + poster, scroll-story-1-scrub (61 frames,
  12fps) + manifest, scroll-story-2-scrub (61 frames, 12fps) + manifest —
  all DONE, MEDIA_LOG rows flipped to in-use. Phase 4 done. Proceeding to
  Phase 5 build.
- P5 layout/hero-media/animation (2026-07-24): built out shared/base.css
  (reset, buttons, header, footer, preloader, mobile nav/call bar) and
  style.css (hero, scrolly, services, area, testimonials, cta, contact)
  from the binding layout preview's tokens/spacing/classes. Wired real
  assets: hero <video> (poster + muted loop), GSAP-pinned scrub player in
  script.js reading the ingested manifest.json + frame-NNNN.webp sequences
  (canvas draws the frame matching scroll progress), no-GSAP/reduced-motion
  fallbacks. GSAP 3.12.5 + ScrollTrigger pinned via cdnjs with SRI hashes.
  Verified live in-browser: seamless 0px-gap hero→story1→story2 handoff,
  both scrub sequences play correctly, testimonials carousel (arrows +
  drag), mobile nav toggle, sticky mobile call bar, contact form — 0
  console errors. forms/maps sections remain placeholder pending Phase 5
  forms/maps-gbp integration pass. Continuing Phase 5 (accessibility,
  performance, mobile-polish, integrations) before QA.
- P5 header + real logo (2026-07-24, operator request): removed the solid top
  bar — header is now fixed + fully transparent so the hero runs edge-to-edge
  (sticky had been reserving a light 68px strip above it). Both text
  placeholders replaced with the operator's real artwork: logo-mark.png +
  logo-wordmark.png, cropped from logo-Image.png / logo-text.png to their
  content bounds (the sources were ~1254px canvases that were mostly empty
  padding, plus two stray edge artifacts on the mark). Added
  logo-wordmark-light.png — a knockout variant recolouring only the neutral
  near-black glyphs to warm white, copper/blue accents untouched — because a
  transparent header floats over the dark cinematic run where the original
  near-black wordmark is invisible. Header swaps state via [data-header-dark]
  + .scrolled (shared/main.js). New --header-h token. All 3 logos ingested
  with alpha preserved, MEDIA_LOG rows in-use. DEVIATION from the binding
  layout preview logged in DECISIONS.md. Verified at 1280/800/360: no bar,
  correct state swap over light sections, mobile drawer links legible, 0
  console errors.
- P5 hero pinned stage (2026-07-24, operator request): rebuilt the hero per the
  hero-media scroll-scrub treatment AND merged the story section into it, so the
  loop -> hero-transition -> story-2 handoffs are all the SAME opacity crossfade.
  One 340svh runway, one sticky 100svh inner, three stacked media layers, three
  copy layers, one progress value, one scroll driver. Removed the ~1-viewport
  dead slide between the old two sections (cinematic run 400svh -> 340svh).
  Canvas frames only (never video.currentTime); manifest values come from
  data-scrub-* attributes, NOT fetch(), so the page still scrubs from file://;
  progressive preload (every 4th, then backfill) with nearest-loaded fallback;
  sequence B's bulk preload deferred to p>=0.25. Passive scroll listener guarded
  by a scrollY-change check, NOT rAF. Runway denominator is the sticky child's
  height, not innerHeight — both are svh-based, so the scrub no longer drifts
  when mobile browser chrome retracts. Removed GSAP (unused since the sticky
  rewrite): the page now ships ZERO external subresources.
  VERIFIED in-browser: full progress sweep exact at every named boundary;
  dissolve integrity (A frozen on frame 0061, B frozen on 0001, opacity ramp
  0.08/0.50/0.92 monotonic); frames step distinctly and reverse EXACTLY once
  preload settles; loop plays at rest, pauses when covered, resumes on the way
  back up; reduced-motion collapses to a stacked document (runway auto, layers
  static, canvases hidden, video on poster); header transparent across the whole
  run and light over content sections; 0 console errors; no fetch/XHR and all
  paths relative. Two bugs found and fixed by measuring rather than assuming:
  (1) the global `section{padding-block}` rule was inflating offsetHeight and
  desyncing the runway, (2) a stray comment terminator I introduced silently
  invalidated `.hero-stage`, collapsing 340svh to 908px — caught because the
  measured stage height did not match 340svh.
- NOTE (env): .claude/launch.json had hardcoded Windows Python paths — fixed
  to python3. preview_start still cannot launch the server on this Mac (the
  launcher process has no Desktop access: getcwd/chdir "Operation not
  permitted"), so the preview runs as a background `python3 -m http.server
  8080` from site/ and the browser attaches to http://localhost:8080. Granting
  the launcher Full Disk / Desktop access, or moving the repo out of
  ~/Desktop, would restore the normal preview_start path.
