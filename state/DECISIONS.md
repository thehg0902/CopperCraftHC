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
2026-07-29 | logo refresh (v2 art) | Operator dropped new mark/wordmark PNGs (1536x1024 canvases, 3D-glossy hexagon "C" mark + "CopperCraft Heating [maple leaf] Cooling" wordmark) into site/assets/images/ as logo-*-new.png. Identified by content, cropped to alpha bounds, downsized to logo-mark.png (492x512) and logo-wordmark.png (1183x272), quantized to keep both under 45KB. New wordmark's charcoal "Craft" glyphs are unreadable on the dark hero — generated logo-wordmark-light.png by relightening only the neutral/charcoal pixels above the Heating/Cooling bar (orange "Copper" and the bar left untouched), matching the old knockout treatment. Updated all 9 pages' width/height attrs (old 256x257 / 680x136 -> new 492x512 / 1183x272) since the wordmark's aspect ratio changed (5:1 -> 4.35:1). Old logo files + raw new sources archived to client/assets-intake/archive/2026-07-29-logo-refresh/. | claude | operator: "i've added new logowordmark and logo mark, identify them and replace old ones with new, then put them in an archive folder"
2026-08-12 | homepage financing band | Added a financing teaser section to the homepage, inserted directly after the "The CopperCraft difference" (.why) band and before Services. Placement is deliberate: it lands immediately after "No Unnecessary Upselling", so the trust frame is already set and financing reads as removing a barrier rather than as an upsell — which matches client.md's "upsell suspicion is this audience's single biggest trust blocker" (lines 33-36). Hook drawn from the operator-built /financing/ page's own persuasion order: the blocking belief ("I thought I'd have to pay thousands up front") -> the coffee-a-day payoff. Homepage carries the coffee framing but ZERO figures per operator instruction (qualitative only); the illustrative $65/$70/$95 examples and the lender disclaimer stay on /financing/, one click away and linked twice from the band. This does NOT overturn the 2026-07-24 "no published prices; no promo" decision — no price is published on the homepage, and financing is presented as an option, never a promo. Styled as its own copper band rather than a .tone-* section: financing is an offer, not another content band, and a third tone avoids duplicating a tone against either neighbour (why=charcoal, services=cream) which would have forced a cascade of tone flips through the rest of the page. Carries data-header-dark so the header picks up its dark surface. Verified: contrast 7.2:1 body / 5.8:1 accent on the copper, header state correct over the band, no horizontal overflow at 375/1280. | claude | operator: "create a new section that allows the user to know that we have financing options for less than a cup of coffee a day ... add the new section under the 'The coppercraft Difference' section" + in-chat answers: qualitative only, keep the no-prices decision
2026-08-12 | financing is a CONFIRMED client fact | Financeit is CopperCraft's third-party lending partner. Evidence: the operator's own equipment sticker PDF carries the Financeit logo, and the operator built site/financing/ naming Financeit explicitly. This resolves what was previously unconfirmed — client.md's `Payment methods:` Override is still blank and client.md line 67 only noted financing as a *buyer decision factor*, not an offered service. Recorded here so financing copy is no longer an invented-fact risk under the CLAUDE.md invariant. Operator should still fill in the client.md Override for completeness. | claude | operator-built /financing/ page + Financeit logo on operator equipment sticker

2026-08-14 | problem-selector: card links + conversion copy | Made 5 of the 6 "How can we help" cards whole-card links (stretched-link from the h3, mirroring the services-page grid pattern in services/style.css:5-10); the existing contact CTA is raised to z-index:1 so it still reaches contact/?need=… — both paths survive per card. Destinations: furnace->services/#furnace-repair, AC->services/#ac-repair, heat pump->services/#heat-pumps, maintenance->services/#preventative-maintenance, and "My System Is Getting Old"->financing/. "Something Sounds or Smells Wrong" deliberately left UNLINKED: no services-page section matches a generic symptom, and inventing a destination would break the promise the card makes. Copy rewritten across all six cards at the same time. Rationale is the Phase 1 audience brief, not taste: starting levels are Desire 7 / Certainty 4 / Trust 3, so desire is not the bottleneck — the old card bodies merely described symptoms and moved no threshold. Each body now pre-answers its lane's objection (cards 1-2 answer the verbatim "$200 fix or $6,000 furnace / will they invent problems" fear; card 4 carries the anti-upsell line where replacement planners need it) and each CTA names its real destination. The anti-upsell line is placed on two cards only, not six — repeated six times it reads as protesting too much. The financing destination is the load-bearing one: client.md line 66-67 defines the replacement-planner lane as "price + trust + financing decide it", making financing the cost-threshold lever for the one segment whose roadblock is cost; it also satisfies the update-note brief's "financing reminders throughout equipment pages" ask at zero build cost. No prices, no 24/7, no licence claim, and no "Apply Now" anywhere — the Financeit application URL is still a placeholder. Verified in-browser: click regression on card body vs CTA, anchor lands clear of the sticky header, focus ring outlines the full card, no layout change at 375/1280. | claude | operator: "connect the How can we help section, link each card to the corresponding service page card" + "my system is getting old should go to the Financing option" + in-chat: whole-card clickable keeping the CTA, rewrite all six bodies/CTAs
2026-08-14 | financing page: build note hidden | Commented out the operator-facing warning at financing/index.html:189 ("Placeholder form — no submission endpoint is wired yet… [PLACEHOLDER: Financeit application URL]"). It was rendering to visitors, and the new problem-selector card now sends replacement-lane traffic to that page. Kept in source as an HTML comment rather than deleted, so it stays a build reminder. The form itself is untouched and still posts nowhere; all four open items in QUESTIONS.md remain open. | claude | operator chose "hide the placeholder note now" in-chat
2026-08-12 | financing band surface | Iterated the band surface twice on operator feedback. v1 flat --color-primary-dark (#7E4520) — operator: "i really hate the brown color". v2 --color-accent-dark navy (#123A5A), justified as the "Cool" half of the Copper & Cool direction — operator wanted it to stay in the copper family. v3 (shipped): a gradient down the deep end of the copper ramp, --color-primary-dark -> --metal-copper-shade (#6B3A1B, the palette's darkest copper). A gradient rather than a flat fill is the actual fix for what looked wrong: at section scale one mid-brown reads as flat paint, whereas a slow shift between the two darkest copper stops reads as metal. The three Higgsfield icons were re-tinted from --color-primary-light to --metal-copper-spec at the same time — the original copper art measured only 4.0:1 against the lightest gradient stop (fails AA for 14px text) and copper-on-copper read muddy. Re-tint reused the cached source masks, so no additional paid generation. Contrast verified against the LIGHTEST stop as worst case: body 7.2:1, accents 5.8:1. | claude | operator: "i want a color thats within the colour pallet and within the copper feeling"

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

2026-07-24 | NEW SECTION "Honest, Quality Work" (job-photo gallery) | Operator supplied six of their own job-site photos and asked for a gallery section. Placed between service-area and testimonials, so the page escalates: what we do -> where -> proof of the work -> proof from customers -> CTA. Given a DARK band (var(--color-dark-bg), data-header-dark): the photos carry the section, and it sets rhythm between the tinted service-area strip and the light reviews section. Nav gains a 5th anchor "Our Work" (architecture allows <=6). Grid uses EXPLICIT column counts (2 at mobile, 3 from 640px) rather than auto-fit — 6 items divide evenly by both, so no breakpoint strands a widow (rules/css.md). Mixed native aspects (565x862 and 765x1020) normalised with aspect-ratio:3/4 + object-fit:cover. Copy leans on the honesty positioning — "Real jobs, photographed on site... No stock photos, no stand-ins" — which is literally true and answers the audience brief's loudest objection ("can I trust a smaller outfit?") better than a claim could. Alt text describes only what is visible; no invented job details, locations or dates. | human (request) + claude (placement/treatment) | operator request
2026-07-24 | ingest bug: cwebp branch upscaled small sources (FIXED in scripts/ingest-assets.py) | `encode_image()` passed `-resize MAX_W 0` unconditionally, so MAX_W acted as a TARGET rather than a CAP and a 565px-wide photo was blown up to 1440px — more bytes, zero extra detail. The Pillow branch in the same function already guarded with `if im.width > MAX_W`; the cwebp branch did not. Added `image_width()` (ffprobe, returns None if unavailable) and now only pass -resize when the source is actually wider than the cap; unknown width keeps the old capping behaviour. Effect on this build: the gallery set went from 1624KB across q75–q90 to 1048KB all at q90 — 35% smaller AND better quality, and the one over-budget image came inside the 300KB cap on its own. | claude | found while ingesting the gallery; affects every client build, not just this one

2026-07-24 | SITE ARCHITECTURE: single-page -> 9 pages (SUPERSEDES the Phase 1 "Site type: SINGLE PAGE + anchor nav" decision) | Operator supplied a full copy/layout spec. Pages: Home, Services, What to Expect, Our Work, Reviews, Contact, Thank You, Privacy Policy, Terms of Use. Nav (7): Home · Services · What to Expect · Our Work · Reviews · FAQs · Contact, plus Book a Visit + Call buttons. "FAQs" anchors to the homepage #faq section (there is no FAQs page). Thank You + both legal pages carry `noindex` and stay out of the nav. Per file-structure contract each page is site/<slug>/index.html with its own style.css/script.js; everything used by 2+ pages was moved into shared/base.css rather than duplicated 8 times. Pages are generated from ONE chrome template so the announce bar / header / footer / mobile bar are provably identical everywhere (verified: 7 nav links + announce + mobile bar + footer present on all 9; 277 internal links all resolve). | human (spec) + claude (structure) | operator request
2026-07-24 | HERO IS FROZEN — text only | Operator: "do not mess with the hero scroll scrub and looping video sequence, only change the text element." The `.hero-stage__media` block (video + both canvases + both scrims) and the entire script.js driver were left untouched; only the copy inside the three `[data-hero-layer]` blocks changed. VERIFIED by diffing the media well against the previous commit — byte-for-byte identical — and by re-running the full choreography sweep afterwards (340svh runway, dissolve integrity A/B frozen, both sequences stepping). New hero copy adds a trust line and the story layers now carry an h2 + copy + a phone CTA; the CTA links needed `pointer-events:auto` because the story layers are `pointer-events:none` so they don't swallow clicks on the hero buttons underneath. | human (constraint) + claude (verification) | operator constraint
2026-07-24 | SERVICE AREA NARROWED to Richmond Hill only | The spec says not to publish Markham, Vaughan, Thornhill, Aurora or Newmarket until the radius is confirmed — and it never was (client.md Overrides still has "Service area:" as a claude-proposed guess). The previously shipped York Region town chips were therefore an unconfirmed claim; they are now removed and replaced with "Based in Richmond Hill" plus "For service outside Richmond Hill, call to confirm whether your location is currently covered." This is a correction, not a preference. | human | client.md accuracy; CLAUDE.md invariant against inventing client facts
2026-07-24 | WATER HEATERS added as a service | Four of the six gallery photos are water heaters, which was in neither the services list nor the filter list — so the photos implied a service that had never been confirmed. Asked; operator confirmed CopperCraft does water heaters. Added to the homepage services grid, the Services page, the footer services list, the contact form's "what do you need help with" options, and used as a gallery category. | human | operator confirmation; could not be assumed
2026-07-24 | Announcement bar + header as one fixed top unit | The bar is fixed at top:0 and the header sits at top:var(--announce-h), so the hero still runs full-bleed from y=0 underneath instead of being pushed down by a strip. New --announce-h token (36px) drives the header offset, the mobile drawer offset and every anchor's scroll-margin. The bar is kept dark so it blends into the cinematic opening rather than cutting a light band across it, and its content must never wrap (a shorter message swaps in below 860px) because its height is load-bearing for those three derived values. | claude | operator spec asked for a small unobtrusive bar

2026-07-25 | CACHE-BUSTING added to the deploy path (scripts/stamp-assets.py) | The staged demo rendered with a broken header: announce bar unstyled, nav jammed into the logo, oversized buttons. DIAGNOSED rather than guessed — staging's CSS was byte-identical to local, and the live host was already serving the correct file, so the deployed bytes were never wrong. The cause was `cache-control: public, max-age=604800` (7 days) on the host: the browser had cached the PRE-revamp base.css and was pairing it with the POST-revamp HTML. Every rule added in the revamp (.announce, .btn-sm, the new .nav) was simply missing, which is exactly the observed damage. This would hit every returning visitor on every deploy and is invisible to anyone testing in a fresh browser. Fix: stamp-assets.py rewrites every local CSS/JS link to `?v=<8-char content hash>`; changed files get a new URL and are refetched, unchanged files keep theirs and stay cached. Idempotent (an existing ?v= is replaced, never stacked). Wired into BOTH stage-split.sh and deploy-split.sh so it cannot be forgotten. | claude | found from the operator's screenshot of the staged demo
2026-07-25 | nav drawer breakpoint 1024px -> 1099px | Measured the desktop nav: brand + 7 links + 2 CTA buttons needs ~998px. At 1030px that fit with only ~32px spare — one label change from wrapping. Handing over to the mobile drawer at 1099px keeps real headroom. | claude | measured, not estimated

2026-07-25 | SERVICE AREA now operator-CONFIRMED | Richmond Hill, Markham, Vaughan, Thornhill, Aurora, Newmarket. These were pulled off the site on 2026-07-24 precisely because they were a claude-proposed guess; the operator confirmed them in-chat, client.md Overrides updated from the guess to the fact, and the six now publish as chips. Outside them the copy still invites a call to confirm rather than implying coverage. | human | operator confirmation
2026-07-25 | CSS SPECIFICITY CLASS-OF-BUG — three instances, one root cause | A scoped element rule (`.scope p`, 0,1,1) silently outranks a bare modifier class (`.modifier`, 0,1,0). Found in three places, two of which were shipping broken: (1) `.sec-foot a` beat `.btn-primary` → "Speak With CopperCraft" and "Call to Confirm Your Area" rendered copper-on-copper at **1.0:1** contrast, unreadable — now 5.45:1; (2) `.hero-stage__layer p.line` beat `.hero-stage__layer .line--muted` → the story straplines NEVER got their smaller/dimmer treatment, which is the actual reason the story beats read as "messy": every line was the same size and colour; (3) `.trustbar p` beat `.trustbar__rating` → the featured rating rendered at 14px instead of display size. Fixes: `:not(.btn)` guards on every scoped link rule (including `.announce`/`.site-footer` which had no buttons yet but were latent traps), and element-qualified modifiers (`p.line--muted`, `.trustbar p.trustbar__rating`). Worth remembering as a pattern, not three one-offs. | claude | found by audit + measured contrast/computed styles
2026-07-25 | Mobile polish pass | Hero: softer `.btn-soft` copper (dropped the hard inset/specular metal) and a `.btn-glass` translucent secondary that sits IN the footage rather than punching through it; trust line centred on phones and switched off gradient-clip (muddy at 14px over video). Story layers: real four-role hierarchy (28px headline / 16px body / 12px uppercase strapline / glass button CTA) and the CTA opts back into pointer-events since the layers are pointer-events:none. Trust bar: rating leads as a centred gradient feature with a decorative glow, the other four support beneath (4 divides by 2 and 4 — no widow). Services: descriptions cut to one line, grid 2-across on mobile / 5 at desktop (10 divides by both). Testimonials + Our Work: one shared carousel player in shared/main.js (NOT the home page's script.js — /our-work/ runs one too and doesn't load that file), autoplay pausing on hover/focus/hidden-tab and disabled entirely under reduced motion, long quotes clamped with Read more to the Google profile, work captions overlaid on a bottom scrim. `.track` scroll-behavior gated behind prefers-reduced-motion and dropped while dragging (it was animating every pointermove and making the grab rubbery). Contact: Service address removed from both forms. | human (direction) + claude (implementation) | operator mobile review

2026-07-25 | Announcement bar removed entirely | Operator dropped the top CTA banner. Removed from all 9 pages and from the page generator, the `.announce` CSS deleted, and the `--announce-h` token retired — the header returns to `top:0` and the anchor scroll-margin, mobile drawer offset and page-hero padding all drop the bar's height from their calcs. Those three derived values were the reason the bar's height had to be a token in the first place, so they had to move together.
2026-07-25 | Mobile header: brand centred, toggle at the edge | The brand is taken out of flow (`position:absolute; left:50%`) so it centres on the VIEWPORT rather than on the space left beside the hamburger — centring it in flow would sit it off-centre by half the toggle's width.
2026-07-25 | Buttons sized to their labels | Dropped `flex:1 1 100%` from the hero actions and `flex:1` from the mobile bar. Buttons are `inline-flex`, so they now hug their text with a consistent 52px of padding instead of stretching to the full column (443px for a 156px label).
2026-07-25 | Our Work: infinite marquee on the homepage, grid on /our-work/ | The homepage section reuses the trust band's CSS-only marquee (doubled set, -50% travel, duplicate aria-hidden) so it loops forever with captions overlaid inside each image; "View All Projects" removed. /our-work/ went back to a browsable grid — it is the see-everything destination, so a static grid serves it better than a moving one. The JS carousel now drives only the testimonials.
2026-07-25 | Contact details added to the homepage | NAP, hours and the Google Map embed now sit after the low-pressure form, matching the contact page. `.contact-details`/`.contact-grid`/`.map` moved from contact/style.css into shared/base.css since two pages use them (file-structure contract).

2026-07-25 | Sticky mobile bar: full-width buttons, revealed only past the hero stage | Operator reverted the bar's two buttons to fill the screen width (the hero's own buttons stay sized to their labels — only the bottom bar fills). The bar is now hidden until the pinned hero stage clears the viewport: a fixed bar sitting over the cinematic run cuts the "one continuous shot" the opening is built around. The trigger is `stage.getBoundingClientRect().bottom <= 0`, NOT scrub progress p>=1 — the stage still fills the screen for its final 100svh as it scrolls away, so revealing at p=1 would still overlay the footage. Pages with no hero stage (all 8 sub-pages) show it immediately. Reveal is a transform gated behind prefers-reduced-motion. | human (direction) + claude (trigger choice) | operator request

2026-07-25 | Wordmark artwork replaced (operator-supplied v2) | Operator dropped `logo-wordmark-2.png` and `logo-wordmark-light-2.png` into site/assets/images — tighter crops of both wordmarks, same 680x136, alpha intact. Routed through the pipeline rather than left in place: the new artwork replaced the SLOT sources under `Home - Brand/`, the two slots were unticked, /ingest re-ran and regenerated site/assets from them, and the -2 drops were deleted. site/assets stays derived, never hand-authored (asset-slots contract).
2026-07-25 | stamp-assets.py now cache-busts IMAGES and video, not just CSS/JS | Swapping the wordmark exposed the other half of the caching bug fixed earlier: the FILE changed but `src="assets/images/logo-wordmark.png"` did not, so returning visitors would keep the old logo for the full 7-day max-age. Extended the matcher to png/webp/jpg/svg/mp4 and to the `poster` attribute — 45 stamped links became 102. Scrub frames are deliberately excluded: they are requested from JS via data-scrub-base + pattern, never from a markup attribute, so there is nothing to rewrite. | claude | found while replacing the logo

2026-07-25 | Card icons: hand-drawn inline SVG, NOT Higgsfield (no credits spent) | Operator asked for icons on all "How can we help?" and "The Right Service for Every Season" cards and said to use Higgsfield. Counted from the markup first: 16 cards (6 problem + 10 service), not the 14 the operator recalled — Heat Pumps and Preventative Maintenance appear in BOTH sections and share a glyph, so it is 12 unique designs across 16 slots, which is probably where 14 came from. Recommended inline SVG over paid raster and the operator agreed: three icons were already shipped inline in the trust band, so raster would have sat inconsistently beside them; stroke:currentColor lets one set tint itself per background with no second asset; ~1KB total instead of 16 image requests on a page already at 9.9MB; and 16 AI icons rarely come out stylistically uniform, so retries would have cost more credits. NOTHING was paid-generated — the CLAUDE.md per-row approval gate was never reached because no generation was needed. Icons are inline in markup, so they never enter site/assets and need no MEDIA_LOG rows (file-structure rule 5 covers generated assets landing in assets/). Two glyphs (furnace unit, AC unit) were redrawn after review: at 24px the original AC mark read as a crosshair and the furnace was too dense — simplified to a louvred grille and a single-vent body, and the size went to 32px desktop / 28px mobile. | human (choice) + claude (recommendation + drawing) | operator request

2026-07-25 | 5 copper stars on every testimonial card | Added to all 18 review cards (9 on the homepage carousel, 9 on /reviews/). ACCURACY BASIS: a 5.0 average is only possible if every individual review is 5 stars, so showing five on each card is arithmetic rather than an assumption — and ANAHITA B.'s review says "5 star service!" outright. Filled stars, not outlined: an outlined star reads as an EMPTY rating. Solid --color-primary rather than the metallic gradient, for the same reason the hero trust line is solid — the gradient goes muddy at 16px. Glyphs are aria-hidden with one sr-only "Rated 5 out of 5" per card, so a screen reader hears the rating once instead of five unlabelled graphics. Operator then asked for them on the trust band marquee chips too, so all 12 chips (6 real + 6 aria-hidden duplicates) carry them as well — 21 star rows on the homepage. The chips use --color-primary-light at 13px rather than --color-primary at 16px: the deep copper is too dark against the footage, and the chips are compact. Re-measured after: the taller chips still leave 160px of headroom inside the 100svh stage. | claude | operator request

2026-07-25 | Preloader on EVERY visit + staged hero entrance | Operator: the loading screen should run on every load and the hero copy should arrive in sequence with a pause between each element. Removed the localStorage returning-visitor skip — client.md offered it as OPTIONAL ("Optional returning-visitor skip of the preloader"), so dropping it is an operator override of an optional item, not a spec violation. The hero's five children (eyebrow, h1, sub, CTAs, trust line) now lift in at 240ms intervals over a 700ms ease-out-expo. Three things this had to respect: (1) the LAYER's opacity belongs to the scroll driver, so the stagger only ever touches the CHILDREN — otherwise the two fight; (2) the children default to opacity 0, so the <noscript> block un-hides them or a JS-less visitor would get an empty hero; (3) `window.load` waits on the hero video and every image, so a PRELOADER_MAX_MS cap (4s) lifts the curtain regardless — the visitor is never trapped behind a slow connection. Under prefers-reduced-motion the curtain is removed and all copy shows at once, no stagger, no transform. Verified the full cascade by sampling opacity over time: curtain gone by ~660ms, then each element arriving one at a time, all settled by ~2.0s. Timings are named constants (PRELOADER_HOLD_MS / PRELOADER_MAX_MS / CURTAIN_LEAD_MS in main.js, the nth-child delays in style.css). | human (direction) + claude (implementation) | operator request

2026-07-25 | Story 1 typography: colour + weight hierarchy, same element count | Operator found the beat monotone and messy. Fixed WITHOUT adding elements — still four .line blocks, so the driver's stagger is untouched; all the variation is inside them. The copy is an argument ("not this / but THIS"), so the two halves are now typographically opposed instead of one flat grey slab: `.line__aside` carries what the visitor does NOT need (smaller, dimmer, set back on its own line via display:block inside the same .line), and `<strong>` carries what they DO get, in copper — the only saturated colour in the beat. The headline accents "Feel Like Home" the same way, and the strapline's three phrases are joined by copper separators rather than full stops. Went from ~2 tones to 4 distinct colours. Two specifics worth keeping: every accent uses --color-primary-light, never --color-primary (the deep copper goes muddy over dark footage — same reason the hero trust line is solid light copper); and `.line__aside` sizes in em rather than a token, because the parent is --text-lg on desktop and --text-base on mobile, so a fixed size collapsed the contrast on phones (measured: 13.1px vs 16px after the fix). Fits the stage with 426px headroom. | human (direction) + claude (implementation) | operator request

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
- Desktop (>=1024px) hero lead copy moved from flush-left to centred with a
  clamp(0,4vw,72px) rightward nudge; the --lead scrim switches from the
  90deg left-weighted ramp to a vignette anchored at 54% so it follows the
  copy. Deviation from the approved layout preview's left-aligned desktop
  hero, at operator request. Verified: white-text contrast over the copy box
  IMPROVED (worst 5.80:1 -> 7.90:1 across the loop + first 20 scrub frames);
  <1024px composition byte-unchanged; site/script.js identical to HEAD and
  its write surface (layer opacity/transform/visibility + --hero-scrim /
  --story-scrim / --hero-focal-x) does not intersect either new rule.
  | operator | layout-systems rule 7
- Scroll entrances added across 7 pages (77 elements) via a single
  [data-animate] reveal in shared/base.css + shared/main.js, per
  frontend-animation references/css-only.md (threshold .2, fires once).
  Values dialled UP from the skill's rule-4 defaults on operator request
  ("more noticeable, but not too crazy"): 36px travel (default 16-24),
  0.98->1 scale, 750ms via calc(--duration-slow * 1.25), 110ms stagger
  (default 60-90). Logged as a deliberate deviation, not drift.
  CSS-only rather than the Stack's `animation: gsap` flag — consistent with
  the 2026-07-24 entry recording that no GSAP has shipped since the CSS-sticky
  rewrite; adding it for this alone would mean a CDN + SRI dependency for one
  effect. Three judgement calls worth recording: (1) reveals are NOT reversed
  on scroll-out — content that fades while still on screen cannot be finished
  reading and re-animates on every direction change (skill rule 4 "once");
  (2) the resting state flips a --reveal-shift custom property instead of
  declaring transform:none, because a .is-visible{transform:none} rule scores
  (0,3,0) and would have permanently killed .problem-card:hover's (0,2,0)
  lift; (3) stagger buckets by visual row (shared offsetTop) and recomputes on
  resize, so a 10-card grid never delays its last card 675ms. Excluded on
  purpose: the hero stage and its trust band (the scroll driver owns those
  layers), the Our Work marquee and testimonial carousel (already moving),
  <form> elements (conversion path stays instant), the site footer (persistent
  chrome), and the legal pages. | operator | frontend-animation rules 1-5
- All grid track lists use repeat(N,minmax(0,1fr)), never repeat(N,1fr).
  BUG FOUND on mobile: `1fr` is shorthand for `minmax(auto,1fr)`, so a track
  cannot shrink below its content's min-content width. Service cards have a
  min-content of 179-188px but only 158px of track at 375px, so the two
  columns grew to 191.9px each and .service-grid overflowed its 327px
  container by 67px — which pushes the layout viewport past the device width
  and lets a phone pinch-zoom out past the design. Hardened all 11 grids
  across shared/base.css, style.css and reviews/style.css. Verified: tracks
  now 157.5+157.5=327 exactly with zero card content spilling (long words
  break on their own, so no overflow-wrap was needed), and desktop is
  unchanged because minmax(0,1fr) only differs from 1fr when content would
  otherwise force overflow. Same family as the flex min-width:auto traps in
  the announce bar and trust band. | claude | mobile QA
- .track (testimonials carousel) carries contain:paint — load-bearing, not an
  optimisation. ROOT CAUSE of the operator's "zoom out extremely far" on phone
  and "strange horizontal scroll bar" on desktop: this flex scroll container
  leaked its intrinsic max-content width to the document, so <html> reported
  scrollWidth 3649 against a 1280px viewport (2369px of phantom overflow).
  That inflates the layout viewport past device width, which is exactly what
  lets a phone pinch-zoom out of the design. Isolated by hiding candidates and
  re-measuring documentElement.scrollWidth: body -> main -> .reviews ->
  .container -> .tcar -> .track -> figure.review. Measured, overflow-x:auto
  did NOT contain it, and neither did overflow:hidden or overflow:clip on
  .track or on the .tcar wrapper — all three left scrollWidth at 3649. Only
  paint containment capped the contribution. Verified after: 1280/1280 and
  375/375 with zero sections leaking, and the carousel still scrolls (its
  refusal of programmatic scrollLeft is scroll-snap-type:x mandatory snapping
  back, identical with and without contain). NOTE the earlier grid entry above
  fixed a REAL but separate 67px .service-grid overflow; it was not the cause
  of the zoom-out. I had also seen scrollWidth 3969 vs 1920 during the desktop
  hero pass and wrongly dismissed it as a false alarm because scrollLeft would
  not move — but this pane cannot scroll anything programmatically, so that
  was a broken signal, not evidence. | claude | operator bug report

2026-08-13 | Services page: photo-real GENERATED imagery (scoped override of "Photos policy: real-only") | The services page is being rebuilt as an informational page — one section per service (10 total) with homeowner tips and one image each, all Higgsfield-generated. Offered the operator three styles with copper line-art recommended (the financing-icon precedent, safe under the real-photos-only policy); the operator explicitly chose PHOTO-REAL generated scenes (in-chat 2026-08-13). Scope of the override: the 10 services-page section illustrations ONLY. The gallery/Our Work remains exclusively real job photos ("Real jobs, photographed on site" stays literally true — these educational scene-setters never enter the gallery or claim to be CopperCraft's work), and the "no people in imagery" rule still applies to the generated set. All 10 go through the MEDIA_LOG per-row approval gate before generation. | human (choice) + claude (scoping) | operator decision in-chat

## 2026-08-20 | SEO LAYER BUILT — 15 pages, 5 new location pages
Operator-approved in-session. Decisions:
- **Domain:** `https://coppercraft.ca`, apex (no www). Recorded in client.md.
  Drives every canonical, og:url, sitemap `<loc>` and the robots Sitemap line.
- **Keyword state:** State A. Operator supplied three head terms with "near me";
  "near me" is resolved by Google from searcher location + GBP proximity and is
  never an on-page string, so per the operator's own instruction each was
  area-substituted to Richmond Hill. Nine further State B terms generated from
  the confirmed Services x Service area and approved in the same session.
  Full list is now owner-typed in client.md.
- **SUPERSEDES "HERO IS FROZEN — text only" (2026-07-24).** Operator explicitly
  approved rewriting all H1s including home. Implementation keeps the visual
  result identical: each page's `<span class="eyebrow">` above the h1 became the
  h1's FIRST CHILD carrying the exact keyword, keeping the eyebrow classes and
  absorbing the h1's old top margin. Same three visual elements, same order,
  same size. The two signed-off home headline clauses are untouched.
- **Page count 10 -> 15.** Added /markham/, /vaughan/, /thornhill/, /aurora/,
  /newmarket/. 541-615 unique words each, real geographic detail per page (roads,
  neighbourhoods, housing stock). No Richmond Hill location page — home is it.
  12 indexable + 3 noindex. Protocol §3's ~30-page target is deliberately NOT
  met: Services x Service area does not reach it honestly and padding with
  low-value combos is barred.
- **Locations are NOT in the nav.** Nav was already at 8 items (protocol max 6).
  They are reached from the home service-area chips and in-copy links instead.
- **No geo in JSON-LD.** The Maps embed carries a query string, not coordinates,
  and no coordinates are confirmed anywhere. Omitted rather than invented.
- **No aggregateRating** — still blocked by the QUESTIONS.md review-count item.
  Individual `Review` schema on /reviews/ was NOT shipped; it needs operator OK.
- **NAP normalized to the owner-typed Overrides string:** `9555 Yonge St,
  Richmond Hill, ON L4C 9M5`. Three variants were live ("Yonge Street", "Ontario"
  vs "ON"). All 16 pages and the JSON-LD now match character for character.
  GBP confirmation still open — see QUESTIONS.md.
- **City display variable** (`<span data-city>`): resolves from the location page,
  then a whitelisted `?loc=` param, then the static "Richmond Hill" default in
  the markup. No IP lookup — that would add a third-party request and a privacy
  disclosure and would still not move rankings. Indexed text never varies;
  serving Googlebot a different city than a human would be cloaking.
- **`.final-cta` moved to shared/base.css**, removing three duplicate copies in
  services/, financing/ and what-to-expect/ style.css (file-structure.md: used by
  2+ pages -> shared).

## 2026-08-20 | SERVICE PAGES: /services/ split into a hub + 10 child pages
Operator-approved in-session. Site goes 15 pages -> 25 (22 indexable, 3 noindex, +404).

- **NESTED URLs, overriding contracts/file-structure.md.** The operator chose
  `/services/<slug>/` over flat `/<slug>/`. The contract's canonical tree was ONE
  flat level of page folders and its relative-path table had no depth-2 row.
  Per the CLAUDE.md precedence ladder an explicit operator instruction (level 1)
  beats a contract (level 5), so this is authorized — but rather than leave the
  site silently violating its own law, **file-structure.md was AMENDED to v2.2.0**:
  new rule 8 permits exactly one level of nesting beneath a real navigation hub,
  never deeper, and the relative-path table gained a `site/<hub>/<child>/` row
  (`../../` for shared/ and assets/). An addition, not a removal or rename.
- **Depth 2 means breadcrumbs are now correct** (protocol 2.3 — "only when the site
  is 2+ levels deep"). Each child page carries a visible trail plus BreadcrumbList
  schema. No other page on the site has breadcrumbs, and none should.
- **The hub does NOT keep the service copy.** All 10 `.svc` sections were MOVED to
  the child pages, not duplicated. Had both carried it, the 5-word-shingle check in
  scripts/seo_check.py would fail them as clones and Google would bury one. The hub
  is now hero -> card grid -> a "not sure which one you need?" guide -> CTA, 469
  words of its own copy.
- **Slugs unchanged from the old anchor ids** (`furnace-repair`, `thermostats-controls`,
  `light-commercial`, ...). That made the 215-link migration a mechanical
  `services/#<slug>` -> `services/<slug>/` transform rather than a rename.
- **Old fragments still land somewhere.** A URL fragment never reaches the server so
  `/services/#furnace-repair` cannot be 301'd. Each hub card therefore keeps
  `id="<slug>"`, so a legacy link scrolls to the right card, which links onward.
  Verified 10/10.
- **KEYWORD REMAP — the two service head terms moved to the pages that convert:**
  `air conditioning service Richmond Hill` /services/ -> /services/ac-repair/ ;
  `heater repair Richmond Hill` /what-to-expect/ -> /services/furnace-repair/ .
  The hub took `heating and cooling services Richmond Hill`, /what-to-expect/ took
  `HVAC service call Richmond Hill`, /our-work/ took `HVAC installation photos
  Richmond Hill`. No two pages now target the same query.
- **Card CTA is a SPAN, not a second anchor.** The card's whole surface is already one
  stretched link (`.service-card h3 a::after{inset:0}`). A second `<a>` to the same
  destination would split the anchor text and make a screen reader announce the
  destination twice, so the "Learn more about X" line is
  `<span class="card-cta" aria-hidden="true">`. One link per card, whole card tappable.
- **Mobile grid 2 -> 1 column** (1 / 2 / 5 at 0 / 640 / 1024). Two-across at 360px gave
  each card ~160px and hyphenated titles mid-word. 10 divides evenly by 1, 2 and 5, so
  the no-widow constraint in rules/css.md still holds at every breakpoint.
- **Service pages are NOT in the nav.** It already carries 8 items against a protocol
  cap of 6; they are reached from the hub grid, the footer column and in-copy links.
- **hasOfferCatalog slimmed.** It repeated the identical 6-city `areaServed` array
  inside all 10 Offers on every page. The business-level `areaServed` already declares
  coverage, so the per-offer copies were dropped. Sitewide JSON-LD is now 114 KB
  across 26 pages (63 blocks) where the business block alone had been ~400 lines/page.

## 2026-08-20 | COPPER FINISH: Level 2 (metal on edges and marks, not on text)
Operator picked Level 2 from a four-level preview (`style-preview-metallic.html`,
built at repo root, served on 8081, deleted after the decision).

Context: the operator asked for "more copper finishes instead of just matt colors".
Only 8 CSS rules carried any finish before this, `--metal-copper-core` and
`--metal-copper-glow` were defined but unused, and all 15 service + location pages had
zero metallic treatment. The Phase 2 guardrail — "not chrome, not too metallic" — was
surfaced in the preview so the choice was made against it, not in ignorance of it.

Shipped:
- **Metal EDGE on `.service-card`, `.chip`, `.faq-list details`** via the double-
  background technique (padding-box paints the surface, border-box paints
  `--gradient-copper` beneath). NOT `border-image`, which ignores `border-radius` and
  would square off the 16px corners.
- **`.keypoints > li` 3px rule** takes `border-image:var(--gradient-copper)` — safe
  there because that element has no radius.
- **NEW TOKEN `--bead-copper`** (contract v1.4.0) on `.subpoints`/`.svc__points`
  markers. A radial with an off-centre highlight, because a LINEAR sweep reads as a
  flat tint at 6px — the eye never sees the ramp.
- **`.card-icon`** → `--metal-copper-core` + a `--metal-copper-glow` drop-shadow.
- **`.svc__tips` checkmark** → `--metal-copper-glow`.
- **4px copper hairline added to `.final-cta`, `.site-footer`, `.work`.** These were
  the only sections without one; `.tone-cream`/`.tone-charcoal` already had it.
  `.page-hero` is DELIBERATELY EXCLUDED — it is the first section on every subpage, so
  a top hairline would sit under the fixed transparent header rather than reading as a
  boundary between two bands.

Deliberately NOT done, with reasons:
- **No gradient-clipped text anywhere.** Measured 1.49:1 on white — a hard fail at any
  size, and the same failure already recorded for `.review__stars` at 16px. Level 3
  (gilded headings) was shown and rejected on this basis.
- **`.card-cta` left at `--color-primary`.** `--metal-copper-core` would be the more
  metallic choice but measures 4.22:1 on the cream card surface; `--color-primary`
  holds 5.06:1 there and 5.45:1 on white.
- **The L3 card surface was corrected before it was ever offered** — its darkest stop
  failed muted body text at 4.41:1, fixed to #F7EDE0 (4.82:1).
- **`.btn-soft`, `.hero-trust .stars`, `.review__stars` untouched** — all three are
  recorded decisions.
- **`.fin-band` untouched** — changing its surface obligates re-tinting three PNGs
  whose copper is baked into the raster.

Correction logged: an earlier analysis claimed `.btn-primary:hover` "loses its sheen".
It does not. `:hover` sets only `background-color`, which does not reset
`background-image`, so the sheen persists over the darker base. No fix was needed and
none was made.

## 2026-08-20 | Back to all services -> button
`.sec-foot` link on all 10 service pages becomes `btn btn-ghost btn-sm`. Chosen over a
full-size or primary button because it sits ~200px above the `.final-cta` band, whose
"Call" button is a conversion action; matching that weight would teach the eye to treat
navigation and conversion as equals. Precedent for a `.btn` inside `.sec-foot` already
exists at `site/index.html:304`, and the `:not(.btn)` guard on `.sec-foot a` is what
makes it safe.

## 2026-08-20 | Homepage services: horizontal rail on phone
Operator: the section "looks empty" and is a long scroll on phone.

Root cause was a change made earlier the same day: the mobile grid went 2-across ->
1-across to stop titles hyphenating mid-word, which turned 10 cards into a 10-row wall.
The phone override in style.css also hid `.service-card p`, so each card was an icon
and two words - which is what read as empty.

- **Rail is the BASE style, grid returns at min-width:640px** (mobile-first per
  rules/css.md). Scoped by a `--rail` modifier so it applies to the HOME page only;
  `/services/` shares the `.service-grid` class and keeps its grid at every width,
  because it is the "see all" destination.
- **PHONE ONLY (<640px)** by operator choice. Tablet keeps its 2-column grid.
- **`contain:paint` is load-bearing, not an optimisation.** It is the same fix already
  documented on `.track`: a flex scroll row leaks its intrinsic max-content width to
  the document (measured there at 3649px scrollWidth against a 1280px viewport, which
  gave desktop a horizontal scrollbar and let a phone pinch-zoom out of the design).
  Verified after this change: at 360px `documentElement.scrollWidth === innerWidth`.
- **`flex:0 0 80%` is the affordance.** The next card stays visibly cut off (62px of
  peek at 360px). At 100% the rail would look identical to the stack it replaced and
  nobody would discover it scrolls.
- **No negative-margin edge bleed.** Nicer visually, but it interacts with the
  containment clip box, and that containment was not worth destabilising for polish.
- **No JS.** `makeCarousel` is hard-wired to `#track`/`#prev`/`#next` and called once,
  so a second instance needs new ids or a refactor - and its autoplay is wrong for a
  service list. CSS scroll-snap needs none of it.
- **Card description restored on phone.** The old override existed because 2-across at
  375px left 92px of text column; at 80% of the container the card is ~250px and the
  description fits. It is what makes a card worth swiping to.
- **Keyboard:** the rail has no focusable children, so it carries `tabindex="0"`,
  `role="group"` and an aria-label - the same contract `.track` uses - plus a
  `:focus-visible` ring at `outline-offset:4px`.
- **"See all services"** `.btn-primary` -> `services/`, shown at every breakpoint. The
  existing "Not sure what your system needs? Call..." line stays: that is a conversion
  path, the button is navigation.

**Operator chose to keep the homepage cards DECORATIVE** (no links), though the 10
service pages now exist. Recorded tradeoff: a swipeable rail of untappable cards means
the button is the only way out of the section, and the homepage passes no link equity
to the service pages. Raised once, decided, not re-opened.

## 2026-08-20 | Homepage service cards: scroll-reveal removed
Operator: "dont do fade in animation for the cards, just have them there so the first
time user scrolls in they can see."

`data-animate` removed from the 10 `.service-card` items on the HOME page. Not a taste
call - the reveal was actively broken once those cards became a horizontal rail:

- The stagger buckets siblings by shared `offsetTop` (main.js `assignStagger`). In a
  rail all ten cards sit on one line, so the bucket is all ten and the last card earns
  `9 x 110ms = 990ms` of delay.
- Cards scrolled off to the right are not intersecting the viewport at all, so the
  IntersectionObserver has not fired for them. They would fade in late, one at a time,
  under the reader's thumb as they swipe.

`/services/` never carried `data-animate` on its cards, so nothing changed there. The
section's `.sec-head` still reveals - it is on screen when the visitor arrives and was
not part of the complaint. The exclusion is recorded in the `revealOnScroll` comment
block in `shared/main.js`, alongside the hero stage and marquee exclusions.

## 2026-08-20 | GBP verified against the site; aggregateRating ruled out permanently
Operator supplied their Google Business Profile for checking.

**Matches, no change needed:**
- Name `CopperCraft Heating & Cooling`, phone `(647) 250-6072`, and address
  `9555 Yonge St, Richmond Hill, ON L4C 9M5` — all identical to the site and to every
  JSON-LD block, character for character. The earlier NAP normalisation to the
  owner-typed "Yonge St" (over the site's then-current "Yonge Street") was correct.

**Changed:**
- Review count 12 added to visible copy in four places (home hero, trust stat,
  testimonials heading, /reviews/). Was "5.0 on Google", now "5.0 from 12 Google
  reviews". A bare average reads like a single review; a count is what makes it
  credible. NOTE: this is a hardcoded number and will go stale — it needs updating
  whenever the GBP count moves.

**aggregateRating / Review schema — CLOSED PERMANENTLY, and NOT for the reason
previously recorded.** QUESTIONS.md had this blocked "until a review count is
confirmed". The count is now confirmed and the schema still must not ship. Google's
review-snippet documentation: "If the entity that's being reviewed controls the reviews
about itself, their pages that use LocalBusiness or any other type of Organization
structured data are ineligible for star review feature", plus "Don't aggregate reviews
or ratings from other websites." Marking up our own Google reviews on our own site is
both violations simultaneously. The earlier framing (a missing-data blocker) was wrong;
it is a policy blocker and no amount of data resolves it. Verified against Google's
current docs rather than asserted from memory.
Consequence: the previously-drafted `Review` objects for /reviews/ are cancelled, not
deferred. The rating stays as page text, which is unrestricted.

**Financeit:** no online application exists. The CTA is to contact CopperCraft, who
guide the customer through. All /financing/ CTAs already pointed at tel: or /contact/,
so only the hidden build note needed rewriting. Removing its `[PLACEHOLDER:` token took
scripts/seo_check.py to **0 fail / 0 warn** for the first time.

**Biggest finding, and it is not on the site:** the GBP has NO website link — it shows
"Add missing information → Add website". Logged in QUESTIONS.md as a launch-day action.

## 2026-08-20 | CORRECTION: the "Yonge St vs Yonge Street" question was overstated
Operator reported that GBP auto-normalises their typed address, and that the real
street name is "Street" while the profile displays "St".

Google normalises street-type suffixes and resolves both spellings to the same Place —
visible in the operator's own screenshot, where the field holds "9555 Yonge St" while
Google's autocomplete simultaneously offers "9555 Yonge Street". Same entity, two
renderings.

I had recorded this question as the highest-weight open item and told the operator a
mismatch would be "actively costing you local ranking". **That was wrong and is
withdrawn.** Character-for-character NAP matching matters where entities genuinely
differ — missing suite number, different phone, Ltd vs Inc, wrong street number. A
street-suffix abbreviation is not in that class.

Decision: site stays on `9555 Yonge St` (28 visible instances + every JSON-LD
streetAddress). It matches what the public GBP displays, which is the string citation
aggregators scrape. Changing it to "Street" would be equally fine and equally
inconsequential — not worth the churn.

Operator guidance recorded: always accept the Google autocomplete suggestion when
editing GBP. Binding the listing to the correct verified Place is what matters; the
suffix rendering is cosmetic and Google owns it either way.

## 2026-08-20 | Instagram added; sameAs finally populated
Operator supplied https://www.instagram.com/coppercraft_hvac/ — the first social account
on file.

- **/contact/**: a "Follow" block in the charcoal contact column, after Hours. Inline
  SVG on the same stroke system as `.card-icon` (24-unit box, `stroke:currentColor`,
  round caps) so it re-tints with the link instead of needing a second asset; the camera
  dot is a zero-length round-capped path, the same trick the problem-selector icons use.
  `target="_blank" rel="noopener"`, `aria-hidden` on the decorative SVG, handle in the
  link text so the destination is announced.
- **Schema `sameAs` populated on all 26 pages.** It had been deliberately omitted while
  empty rather than invented. Protocol 6.1 is explicit that an empty `sameAs` is a real
  weakness: an answer engine resolves business identity by cross-referencing that array.
- **`client.md` Socials** is now owner-typed rather than blank.

Caught in verification: `404.html` is not in `apply_meta.py`'s PAGES table — its schema
had been copied once from the contact page and was therefore stale, shipping without
`sameAs` while the other 25 pages had it. Refreshed from the live block. Worth
remembering that 404.html drifts silently on any future schema change.

## 2026-08-20 | ERV + HRV added — 12 services, 28 pages
Operator instruction. Two new child pages, cards on both the hub and the homepage rail.

- **Duplicate-content risk handled deliberately.** ERV and HRV are near-identical
  devices — the only functional difference is that an ERV also transfers moisture — so
  a shared template would have produced two pages the 5-word-shingle check correctly
  calls clones. Each is written from the OPPOSITE side of the decision: HRV as the
  Ontario default (winter condensation, stale air, heat only), ERV as the other answer
  (humidity transfer, for houses that run dry). They cross-link, because a visitor
  searching one is choosing between both. 415 / 412 words; shingle check passes.
- **Desktop grid 5 → 6 columns** (operator choice). 12 / 5 would leave a ragged final
  row of two; 12 / 6 is exactly two rows.
- **The 6-column choice REQUIRED a companion change, and it was measured, not assumed.**
  Six columns leaves 172px per card and a 106px text column. "Conditioning" at
  `--text-lg` is ~126px — it would have hyphenated mid-word, reintroducing the exact
  bug fixed earlier in this build. The 1024px rule therefore steps card titles to
  `--text-base`. Measured after the change at 1280px: title 16px, widest word
  ("Conditioning") 95px in a 106px column — **11px of headroom, fits**.
- **Images generated under the paid gate.** Two MEDIA_LOG rows written with
  `YES [in-chat 2026-08-20]` BEFORE any generation, per the CLAUDE.md hard invariant.
  Model recorded as `recraft_v4_1` rather than the provider shorthand "higgsfield" used
  by earlier rows, because the ledger feeds cost tracking and would otherwise
  misattribute. HRV needed two takes (first job returned failed). Extends the scoped
  real-only exception already logged 2026-08-13 for generated service imagery.
- **Homepage rail cards stay DECORATIVE** — no links, matching the ten already there
  (operator's earlier choice, unchanged).
- **New symptom-router bucket on the hub**: "The air itself feels wrong" → HRV / ERV.
  Ventilation is a genuinely distinct symptom from the four temperature/age buckets.

Fixed while in there:
- **`aria-current="page"` was on "What to Expect"** in the nav on every service child
  page, copied from whatever the template was cloned from. Corrected on all 12.
- **`404.html` added to `apply_meta.py`'s PAGES table.** It had been outside the
  generator, so its JSON-LD was a one-time copy that silently went stale TWICE — first
  shipping without `sameAs`, then still advertising 10 services after the catalog grew
  to 12. Now regenerated with every other page. Also repaired the malformed
  `og-default.webp` row in MEDIA_LOG, which I had appended in the wrong column order.

## 2026-08-21 | Real operator photographs replace 7 generated service images
Operator dropped 10 photographs into `site/assets/`. This moves the site BACK toward
its own `Photos policy: real-only`; the generated service imagery was only ever a
scoped exception (2026-08-13) taken because real photos did not exist.

- **7 slots now carry real photographs**: furnace-repair, furnace-installation,
  ac-installation, heat-pumps, preventative-maintenance, light-commercial,
  water-heaters. **The 2026-08-13 generated-imagery exception narrows from 12 slots to
  5** — ac-repair, ductless-systems, thermostats-controls, hrv, erv, which nothing in
  the drop covers.
- **`People in imagery: no` is OVERRIDDEN for real photographs only** (operator,
  in-chat). This is broader than the owner shot alone: `FurnaceRepair.png` and
  `Preventative Maintenance.png` both show technicians at work. The rule still binds
  GENERATED imagery, which stays people-free.
- **Filenames are hints, not proof — and one was wrong.** `Water Heaters.png` turned
  out to be a bank of three COMMERCIAL A.O. Smith Cyclone units in a plant room, not a
  residential water heater, and /our-work/ already carries that subject. The slot went
  to `tankless waterheater.png` instead. Every photo was opened before its alt text was
  written; none was mapped on filename alone.
- **All 12 service images are now 780x780 squares, NOT 1040x1040.** Eight sources are
  portrait 1086x1448 against landscape 1040x780 slots, so square was chosen to lose
  ~25% either way instead of 44% off a portrait. 780 rather than 1040 because the five
  retained generated images are 1040x780 — their largest possible square IS 780, and
  targeting 1040 would have upscaled five of twelve by 33% and visibly softened them.
  Per-image vertical crop bias was set by where the subject actually sits in frame.
- **The owner portrait is NOT squared.** Squaring a person to match a service grid
  crops the subject for no reason. It stays portrait at 900x1200 in a two-column
  section on /what-to-expect/, inserted between `wte-decide` (cream) and `reassure`
  (charcoal) as a default-tone band so the page's alternating rhythm survives.
- **Owner copy is built only from confirmed facts.** client.md never states who the
  owner is; it names "Joe" solely as "the technician customers name repeatedly", and
  bars fabricated backstory. The operator confirmed in-chat that Joe is the
  owner/operator; no surname was supplied, so first name only. No years in business, no
  founding story, no licence or certification claim — all are empty or explicitly
  excluded. The one quoted line is verbatim from an approved testimonial, and the
  section links to /reviews/ so the claim is checkable rather than asserted.
- **Originals archived, not shipped.** ~25 MB of PNG/JPEG moved to
  `client/assets-intake/2026-08-21-operator-drop/`. `site/assets` stays derived and is
  never hand-authored (contracts/asset-slots.md; same resolution as DECISIONS.md:116).
  `scripts/ingest-assets.py` could not do this job — it reads only
  `client/assets-intake/slots/`, matches on exact basename, and does not crop.
- **2 spares retained**: `Water Heaters.png` (commercial bank) and `hot water tank.png`
  (tall tank, would not survive a square crop). Logged `available` in MEDIA_LOG.

## 2026-08-21 | Two more real photos: ac-repair + ductless-systems
Second operator drop. Both content-verified before mapping, not trusted on filename —
the check that caught `Water Heaters.png` being a commercial three-tank bank in the
first drop.

- `AC repair.png` (1402x1122 landscape) -> `service-ac-repair.webp`. A CopperCraft
  technician at an open condenser working on the service-panel wiring. Third technician
  photo, under the `People in imagery` override already logged for REAL photographs.
- `ductless systems.png` (1086x1448 portrait) -> `service-ductless-systems.webp`.
  Mitsubishi wall head reading 72 in a living room. Crop biased UP (0.05) rather than
  centred: the head sits high in frame, so a centred square would have trimmed the unit
  instead of the sofa.

**The 2026-08-13 generated-imagery exception narrows again, 5 slots -> 3.** Only
thermostats-controls, hrv and erv still run generated images; nothing in either drop
covers them. **9 of 12 service pages now carry real photographs.**

Noted and kept: the ductless photo includes a small framed family photograph on the
console. At 780px output it is ~40px and unidentifiable, and it is what makes the shot
read as a lived-in home rather than a showroom. Flagged to the operator as reversible
(a tighter crop would remove it at the cost of the room context).
