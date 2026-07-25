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
