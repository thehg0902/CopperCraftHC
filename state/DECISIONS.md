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
