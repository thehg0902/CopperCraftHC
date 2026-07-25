# Build State

Client: CopperCraft Heating & Cooling
Template version: v1.7.1
Started: 2026-07-24

| phase | name         | status  | gate                      | completed |
|-------|--------------|---------|---------------------------|-----------|
| 0     | intake       | done    | HUMAN: confirm table      | 2026-07-24 |
| 1     | architecture | done    | -                         | 2026-07-24 |
| 2     | design       | done    | HUMAN: approve style prev | 2026-07-24 |
| 3     | content      | in-progress | -                     | -         |
| 4     | media        | pending | HUMAN: fill slots/approve | -         |
| 5     | build        | pending | -                         | -         |
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
