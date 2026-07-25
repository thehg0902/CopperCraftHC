# Decisions Log
<!-- Resolved ambiguities. Once logged here, a decision outranks skills
     and contracts (precedence level 3). Format:
     YYYY-MM-DD | topic | decision | decided-by (human/claude) | why -->
2026-07-24 | detected niche | HVAC contractor (residential + light commercial), Richmond Hill / York Region ON — feeds niche-playbook + audience study (reads electrician study per audience-research rule) | claude | GBP category line "HVAC contractor in Richmond Hill, Ontario"
2026-07-24 | hours | Mon–Fri 9am–10pm, Sat 10am–3:30pm, Sun closed (Wed "9–10 a.m." read as typo for 9am–10pm) | human | operator answer in QUESTIONS.md
2026-07-24 | after-hours | NO 24/7. Urgent/priority response during business hours only, fast same-day deployment. Site must not claim 24/7. | human | operator answer
2026-07-24 | licensing | Operator unsure of TSSA/G2/WSIB — do NOT display any licence/insured claim; trust rests on 5.0★ + review volume | human | operator answer
2026-07-24 | story/pricing | Founding story = skip (irrelevant); no published prices; no promo. Lead with real testimonials + honest/no-oversell positioning; quality guarantee on workmanship. | human | operator answers
2026-07-24 | email | info@coppercraft.ca | human | operator answer
2026-07-24 | testimonials | Full operator-supplied review set APPROVED for site; display as horizontal sliding carousel in the testimonials section | human | operator request
2026-07-24 | seamless opener | Trust bar MOVED from between hero/story-1 to AFTER story-2. Sections 1→2→3 (hero → scroll-story-1 → scroll-story-2) must read as ONE continuous shot — no strips/bands/colour breaks between them. New order: hero, scroll-story-1, scroll-story-2, trust-bar, services, service-area, testimonials, cta, contact | human | operator: "remove all the strips between the first three sections, make them feel seamless"
2026-07-24 | scroll-scrub pin technique | ROOT-CAUSED a residual 1-viewport gap between story1/story2: CSS position:sticky (and GSAP's `end:'bottom bottom'`) both release the pinned stage exactly 1 viewport-height BEFORE the section's true end — standard behavior, not a bug, but wrong for back-to-back seamless scrub sections. FIX: `pin:stage` with explicit `end:'+='+sec.offsetHeight` so the pin holds the full section height; story1 unpins at the exact scroll pixel story2 pins (verified 0px gap). This is the technique Phase 5's hero-media/scrub-player.js must use for any adjacent pinned scrub sections. | claude | operator: "there is still a gap, remove them entirely. i want seamless transition"

---

## Phase 1 — Audience Brief (distilled from client.md Target Audience; study NOT re-read, TA is rich)
- Persona: Richmond Hill / York Region homeowner (33–60, ~$100k–200k), trigger-driven — AC/furnace down or planning a replacement/heat-pump upgrade.
- Top pains (their words): "who can come today?"; "will they invent problems / upsell me?"; "nobody calls back."
- Deep desire: comfort restored + a contractor they never doubt again ("our HVAC guy").
- Biggest motivator hierarchy: (1) fix it fast, (2) not be overcharged, (3) reliable/legit, (4) long-term relationship.
- Decision trigger: first outfit that answers, feels honest, and can come soonest.
- Objections to pre-answer: trust a smaller outfit? · upsell fear (loudest theme) · will they show/respond fast? · fair price?
- Awareness L3 (+ hot panic lane); Sophistication Stage 4–5 → out-position, don't out-claim.
- Primary CTA: CALL (derived — Overrides Primary action left blank). Secondary: "book a visit".
- Trust stack (CONFIRMED only): 5.0★ Google + wall of real reviews (honest/no-oversell/"Joe"). NO licence/insured badge (unconfirmed). NO 24/7 (business-hours fast response). NO published prices.

## Phase 1 — Architecture
- Site type: SINGLE PAGE + anchor nav (one page group in Pages markup). File: site/index.html (per file-structure contract).
- Site-wide conversion action: CALL. Header shows tap-to-call phone on mobile (call-first niche, rule 4). Sticky mobile call button sitewide. CTA in first viewport (hero) and again at bottom (contact) — rule 3.
- Nav (≤6, anchors): Services · Reviews · Service Area · Contact · [Call (647) 250-6072 button].
- Section order (decision-path tuned — empathy/trust BEFORE the ask):
  1. hero — preloader → looping video; H1 + "Call now, fast same-day response" (primary CTA); phone visible.
  2. scroll-story-1 — scroll-scrub + floating text: the PROBLEM/empathy beat (no heat/no AC, the panic, the no-callback frustration).
  3. scroll-story-2 — scroll-scrub + floating text (first frame = story-1 last frame): the PROMISE beat (honest, fast, no overselling, quality guarantee).
  4. services — furnace repair · A/C repair · installations · heat pumps · ductless · thermostats · maintenance (residential + light commercial). Card grid.
  5. testimonials — horizontal sliding carousel, full approved review set.
  6. contact — NAP + Google map embed (address exists, rule 5) + hours + repeat CALL CTA + simple contact form.
- Proposed ADDITIONS (niche must-haves, not in operator markup — recommended, see QUESTIONS.md):
  a. Service Area strip (York Region towns) — local-SEO value; folds in as nav anchor above.
  b. Closing CTA band between testimonials and contact (or as contact's top) — reinforce call after proof.
  c. Compact trust strip under hero (5.0★ · reviews count · "honest, no-oversell") for above-fold certainty.
- Deferred to later phases: maps embed (maps-gbp); rebate/heat-pump content lives inside services or a sub-block, not a separate page (single-page site).

## Phase 1 — Architecture (CONFIRMED additions, 2026-07-24)
Operator approved all 3 recommended sections. Final single-page section order (index.html):
  1. hero (preloader → muted looping video; H1 + Call CTA)
  2. trust-bar (under-hero strip: 5.0★ · real reviews · "honest, no overselling")
  3. scroll-story-1 (scrub + floating text — problem/empathy)
  4. scroll-story-2 (scrub + floating text, seam-continuous — promise)
  5. services (card grid)
  6. service-area (York Region towns strip — local SEO)
  7. testimonials (horizontal sliding carousel, full approved set)
  8. cta (closing call band)
  9. contact (NAP + Google map + hours + placeholder quote form + call)
- Hosting: hostinger-business → CDN budget profile (page ≤1.5MB, hero video ≤4MB cap). ALL videos muted (operator directive).
- Forms: placeholder (no Formspree ID yet — build the form UI, wire later).
- People in imagery: NO (product/atmosphere/equipment only).
- Hours: Wed confirmed 9am–10pm.

## Phase 2 — Design Direction (rationale)
- Direction name: "Copper & Cool" — craftsman-warm meets clean-clinical comfort (implements the operator's brand board 1:1; it is the authoritative system).
- Type pairing: Poppins (Semibold/Medium) headings — sturdy friendly geometric; Inter (Regular/Medium) body — neutral, legible. Brand fonts = hard constraint.
- Color intent: warm off-white base (#F7F5F1) + charcoal text (#17191B); COPPER #C96A32 = primary action/warmth; COOLING-BLUE #23679D = trust/secondary; dark charcoal bands (#111416) host the cinematic scrub stages so copper/blue airflow light-streaks pop.
- Imagery style: photo-real, NO people (operator) — interiors, condensers/equipment, and the copper/blue light-streak abstract for scrub sections; subtle airflow-line motif.
- Layout personality: sturdy, straightforward, generous 8pt rhythm, rounded 8–16px cards, soft 3-tier shadows; zero clutter, conversion path always visible.
- Motion level: EXPRESSIVE — DEVIATION from HVAC playbook's "subtle" default, justified by client.md precedence (operator-requested cinematic scrub + Stack animation:gsap). Guardrails: prefers-reduced-motion fallbacks everywhere, poster = LCP, phone/CTA never buried, first viewport fast.
- ONE distinctive element: the continuous scroll-scrub "single unbroken shot" journey (hero loop → story-1 → story-2, seam-matched) with GSAP-pinned floating text over the copper/blue airflow visual.
- Trust approach: lead with 5.0★ + the review wall (carousel); copper-accent star/quote motifs; NO licence/insured badges (unconfirmed).
- Color mode: light-dominant with dark cinematic feature bands.
- Playbook conversion must-haves KEPT despite expressive motion: tap-to-call in header (sticky mobile), service-area list, short placeholder quote form (name/phone/issue), single clear CTA = CALL.

## Phase 2 — Copper refinement (operator feedback: flat orange "felt cheap")
Shifted from flat orange to a PREMIUM METALLIC COPPER — deeper, browner/rosier, less saturated + a restrained reflective sheen (not chrome, "not too metallic").
- tokens.css: --color-primary #A85422 → #A05628 (AA white ~5.4:1); --color-primary-vibrant #C96A32→#B26A38; --color-primary-light #E98543→#E0A46A. New metallic tokens: --metal-copper-shade/core/glow/spec; --gradient-copper (curved reflective sweep, champagne specular); --sheen-soft (button surface curvature); --sheen-sweep (slow glint).
- Applied: primary buttons = satin copper (sheen overlay + specular top edge + inset depth) with a slow low-opacity glint; CTA band = darker metallic gradient (lightest stop #A9662F keeps white text AA) + diagonal sheen sweep; trust + review stars gilded via gradient-clip text; logo mark gilded. Motion glint is prefers-reduced-motion-gated. Style preview: 67 tokens, 0 contrast fails.

2026-07-24 | header treatment (DEVIATION from binding layout preview) | The approved layout preview shipped a solid sticky bar (`rgba(247,245,241,.9)` + blur + border) with a "CC" TEXT mark. Operator: "remove top bar, make it transparent, use the logo for the icon and logo text for the logo text, don't use placeholders." Rebuilt as: (a) `position:fixed` + fully transparent header — sticky was reserving 68px of light page background ABOVE the hero, which is exactly the bar being removed; fixed takes it out of flow so the hero video runs from y=0 and the cinematic sequence is truly edge-to-edge. (b) Real brand assets replace both placeholders (mark + wordmark, see MEDIA_LOG). (c) Because a transparent header crosses both dark and light sections, sections carry `[data-header-dark]` and shared/main.js toggles `.scrolled` when none sits under the header's midpoint — transparent + knockout wordmark + white nav over the dark run, translucent light surface + the original dark wordmark over light content. New `--header-h` token (76px) single-sources the nav height, mobile drawer offset, and anchor scroll-margin. | human (ask) + claude (technique) | layout-systems rule 7 requires logging any deviation from the approved preview

2026-07-24 | hero + story merged into ONE pinned stage (SUPERSEDES the 2026-07-24 "seamless opener" and "scroll-scrub pin technique" entries above) | Operator: "make the transition effect from scroll story1 to scroll story 2 the same cross fade as hero loop to story 1." That crossfade is an opacity blend between two media stacked in ONE well, so it is only reproducible if both sequences live in the same pinned stage — two sticky siblings can only slide past each other. Merged `.story-stage` into `.hero-stage`: one 340svh runway, one sticky 100svh inner, THREE stacked media layers (loop video -> hero-transition canvas -> story-2 canvas) handing off by opacity alone, and three copy layers (lead / problem / promise). Removes the ~1-viewport dead slide that used to sit between the two sections and cuts the cinematic run from 400svh to 340svh. NOTE the two superseded entries were ALREADY stale: they mandate a GSAP `pin:stage` + `end:'+='+sectionHeight` technique, but no GSAP has shipped since the CSS-sticky rewrite — the merge removes section adjacency entirely, so the whole pin-gap problem is now moot. | human (ask) + claude (technique) | operator request; layout-systems rule 7 requires logging deviations from the approved preview
2026-07-24 | crossfade timing is asymmetric, deliberately | Measured on the INGESTED frames: hero-loop poster -> hero-transition 0001 = SSIM 0.986 (near-identity), hero-transition 0061 -> story-2 0001 = SSIM 0.940 (luma 0.917, chroma 0.985), unrelated control = 0.496. So the second seam is a real dissolve, not a hidden cut. Two consequences encoded in script.js: XFADE_B (0.44–0.56) is ~2.4x longer than XFADE_A (0.01–0.05), and SCRUB_B does not begin until XFADE_B ends, so sequence A is clamped on frame 0061 and B on frame 0001 for the entire blend — a clean A->B dissolve instead of two moving images cross-dissolving. Verified in-browser: A and B frame signatures frozen across the window, B opacity ramp 0.08/0.50/0.92 monotonic. The invariant SCRUB_A_END <= XFADE_B_START < XFADE_B_END <= SCRUB_B_START is what makes the freeze free (range() clamps); nudging one constant silently breaks it. | claude | operator chose "ship the dissolve as-is" over holding for a footage re-cut
2026-07-24 | header sync no longer uses requestAnimationFrame | shared/main.js throttled its [data-header-dark] probe through rAF, which is suspended in hidden/background/preview panes — the header stranded in whatever state it was last in, and it made the behaviour unverifiable in the preview pane. Replaced with the same scrollY-change guard the scrub driver uses. Same reasoning the operator gave for keeping rAF out of the scroll driver. | claude | consistency with the scroll-driver rule
2026-07-24 | TUNING CONSTANTS for the hero stage (all in site/script.js, top of the IIFE) | Runway `.hero-stage{height:340svh}` minus the 100svh sticky inner = 240svh of travel; every constant below is a fraction of that. LEAD_OUT 0.00–0.14 · XFADE_A 0.01–0.05 · SCRUB_A 0.01–0.42 · NEXT_IN 0.16–0.38 · NEXT_OUT 0.42–0.48 · XFADE_B 0.44–0.56 · SCRUB_B 0.56–0.95 · PROMISE_IN 0.60–0.92 · LEAD_RISE_PX -40 · NEXT_RISE_PX 40 · FOCAL_A 40%->32% · FOCAL_B 32%->36% (portrait only; the two ranges meet at 32% so the crop never jumps at the seam) · SCRIM 1.00->0.55 · FLAT_SCRIM_MAX 0.45 · PRELOAD_STRIDE 4 · PRELOAD_B_AT 0.25. Pacing is retuned by changing numbers, never structure. If the dissolve feels rushed, lengthen XFADE_B and push SCRUB_B_START with it — do not steal from the scrub windows; if it needs more room, raise the 340svh runway instead. | claude | operator asked for the tuning constants to be logged

## Phase 3 — Copy (headline register + coverage)
- Hero headline register: chose the warm/honest/craftsman register over the
  urgent-direct register, per Mood adjectives (dependable, honest, warm,
  neighbourly, craftsman-precise). Candidates considered: (A) "Furnace Down?
  A/C Dead? We Answer the Phone — and Tell You the Truth." (urgent-direct) vs
  (B) "Honest Heating & Cooling, Right Here in Richmond Hill" (warm-craftsman,
  CHOSEN). Urgency still carried in the subhead + CTA ("Call Now — Fast
  Response") so the panic-lane audience isn't lost. Register held consistent
  site-wide (services, CTA band, contact all lead with honesty/trust, not
  pressure). | claude | rule 3
- All copy written into site/index.html (single-page site per Phase 1
  architecture). No invented facts: no years-in-business, no licence claim,
  no published price, no 24/7 claim — matches Overrides. Testimonials are
  verbatim from the approved Auto list, truncated quotes kept as "[…]"
  exactly as supplied, never completed. Heat-pump service copy stays vague on
  rebates ("rebate programs available to you") per Target Audience guidance —
  no dollar figures. | claude | rule 2, 2c
- site/style.css, site/script.js, site/shared/base.css, site/shared/main.js
  created as empty stubs (page skeleton per file-structure contract) — Phase
  5 (layout-systems/components/hero-media/frontend-animation) fills these in;
  the approved layout-preview.html markup/classes are binding for that pass.
  | claude | file-structure contract rule 7, precedence with Phase 2 gate
