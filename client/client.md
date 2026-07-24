# Client Brief

<!-- v2 (paste-based). Everything is optional. Fastest path: paste the
     business's Google Business Profile / Maps listing text into the
     Business Profile Paste section at the bottom, answer whatever you
     can in Creative, then run /build. See client.schema.md for rules. -->

## Creative
<!-- Filled from the Business Profile Paste + market research (WWP + audience
     study). Only paste-grounded facts are asserted; unknowns are marked
     [PLACEHOLDER] with a {operator: confirm} note — never invented. -->
- What makes this business better than competitors: Owner-operator care over
  call-centre volume. Honest recommendations, quality workmanship, and clear
  communication — a technician who tells you when you *don't* need the expensive
  fix. Fair pricing and doing the job right the first time. Reviews single out
  the personal touch ("takes pride in his work," "genuinely cares about his
  customers") — the anti-corporate-HVAC angle in a market dominated by big
  brands (Reliance, Cozy World, Econoair) that compete on 24/7 call centres.
- The story / why they started: Not featured (operator: founding story/year is
  irrelevant — skip). Lead with PROOF (the wall of real 5-star reviews) rather than
  an origin story. "Joe" is the technician customers name repeatedly — fine to
  reference in testimonials, but no fabricated backstory.
- Ideal customer: Richmond Hill / York Region homeowners in a trigger moment —
  furnace down in a cold snap, AC dead in a heatwave, or planning a furnace/AC
  replacement or heat-pump upgrade. They respect the trade, fear being gouged,
  and want a licensed pro who answers, explains, and comes fast. (Full psych
  profile in Target Audience below.)
- Offer / guarantee / promo: Quality guarantee on workmanship (operator-confirmed).
  No current promo, no gimmick offer — the conversion lever is the volume of real,
  glowing testimonials + honest/fair-price reputation, not a discount.
- Mood (3-6 adjectives): dependable, honest, warm, neighbourly, craftsman-precise
  {claude-proposed from positioning — override if off.}
- Never say / avoid: high-pressure / salesy language; unverifiable superlatives
  ("#1", "best in the GTA"); anything that reads as upsell — upsell suspicion is
  this audience's single biggest trust blocker. Do not claim 24/7 unless the
  operator confirms after-hours service.

## Vibe
<!-- Optional feel channel. Drop reference images into client/assets-intake/vibe/
     and list them as `- vibe/<file>: what to take from it`. -->
- Proposed feel: warm, trustworthy, and clean — copper/warm-metal accents nodding to
  the "CopperCraft" name, against a calm neutral base. Craftsman-solid, not flashy
  tech-startup; a pro who shows up on time, not a lead-gen funnel.
- vibe/brand board.png: THE authoritative brand system (operator-authored). Take
  everything — hex CC logo, copper+cooling-blue palette, Poppins headings / Inter body,
  8pt spacing, 4–24px radii, the 3 shadow levels, copper + cooling gradients, the
  outlined icon style, and the imagery mood (interiors, condensers, and the copper/blue
  light-streak abstract that suits the scroll-scrub sections). {1604KB — compress to
  ~500KB when convenient; it is context-only, never shipped.}

## Target Audience
<!-- Market-research writeup: WWP diagnostic + audience study (HVAC reads the
     electrician study per the audience-research rule) + live web research on the
     Richmond Hill / York Region HVAC market. This section (client.md level 2)
     wins over the niche study at build time. -->

**Primary persona — "No-Heat Nadia & Ravi"**: Richmond Hill / York Region
homeowners, 33–60, household income ~$100k–$200k, own a 15–50-year-old home.
They don't browse for HVAC — a *trigger* brings them: furnace won't fire on the
coldest night, AC quits in a July heatwave, a 15-year-old furnace finally dies,
or they're weighing a heat-pump upgrade for the rebates. Decision style: fast
shortlist (2–3 calls), award the job to whoever answers, quotes clearly, and can
come soonest.

**Secondary segments**:
- *Replacement planners* — old furnace/AC on borrowed time; getting 2–3 quotes
  for a planned install; price + trust + financing decide it.
- *Heat-pump / rebate seekers* (fast-growing) — researched heat pumps online,
  chasing the Ontario Home Renovation Savings + Canada Greener Homes stack; want
  a contractor who handles the rebate paperwork and sizes it right.
- *Maintenance-minded* — want a seasonal tune-up and "a guy on file" so the next
  breakdown is a text, not a panic.
- *Small commercial* — the GBP says "homes and businesses"; light-commercial
  comfort jobs where reliability and response decide it.

**Market awareness**: mostly Level 3 (solution-aware, choosing a provider) with a
hot Level 4 *panic lane* (no-heat/no-AC emergencies — answered phone = closed
deal). **Sophistication**: Stage 4–5 — the market is saturated with "24/7,
same-day, family-owned" claims; don't out-claim, out-*position* (owner-operator
honesty, licensing proof, price transparency).

**Starting levels** (1–10): Desire 7 (trigger-driven, already motivated) ·
Certainty 4 (do they believe *this* outfit is legit and won't gouge?) · Trust 3
(trades-distrust + a no-name vs. big brands). The site's job: convert desire that
already exists by lifting **certainty and trust** to threshold.

**Top pains (in their words)**:
- "It's freezing and the furnace won't turn on — who can come *today*?"
- "Is this a $200 fix or a $6,000 new furnace? Will they invent problems once
  they're in there?"
- "I called three places and nobody called me back."

**Deep desire / biggest motivator**: comfort restored *and* a contractor they
never have to doubt again — "our HVAC guy." Beneath every job: a warm/cool home
and the certainty they weren't overcharged. Hierarchy: (1) fix the emergency
fast, (2) price certainty before commitment, (3) licensed/legit peace of mind,
(4) the long-term relationship.

**Decision triggers**: the first outfit that answers live, gives a concrete price
frame (service-call fee, ranges, or firm-quote-before-work promise), and offers a
real appointment window wins — often without further comparison.

**Objections to pre-answer**: "Can I trust a smaller/newer outfit?" (answer with the
5.0★ wall of reviews + owner replies, not licence claims — licence unconfirmed) ·
"Will they upsell me a repair/replacement I don't need?" (the reviews' loudest theme —
lean in) · "Will they actually show up and respond fast?" · "Is the price fair?"

**Conversion implications (build-ready)**:
- **Primary CTA: click-to-call**, sticky on mobile. Dual-lane hero: "AC or furnace
  down? Call now — fast same-day response" (urgent) vs. "Book a visit" (planned).
- **Trust stack** (CONFIRMED facts only): 5.0★ Google rating + the wall of real
  testimonials (honesty / no-oversell / punctual / fair-price / "Joe" by name) as the
  lead proof. NO licensing/insured badge until the operator confirms TSSA/WSIB — do
  not assert it.
- **Honesty-over-price positioning** (replaces a price-transparency block — operator
  skips published fees): reviews repeatedly cite "didn't upsell," "no fuss," "fair,"
  "reasonable price" — surface those verbatim instead of stated numbers.
- **Anti-upsell positioning**: "We'll tell you when a repair beats a replacement"
  — mirrors the exact trust moment reviewers keep praising (Anahita: "no fuss and
  overselling"; Negar: "didn't try to upsell me on things I didn't need").
- **Heat-pump / rebate landing angle** (growth engine): sizing help + "we handle
  the rebate paperwork." {research context — Ontario Home Renovation Savings
  (Enbridge/IESO) + Canada Greener Homes stack can reach several thousand $$;
  programs change without notice, so state ranges generically and link official
  sources rather than promising a dollar figure.}
- **Response-speed proof**: emphasize fast, same-day response **during business
  hours** (Mon–Fri 9–10, Sat 10–3:30). NOT 24/7 — no after-hours/emergency claim.

**Search intent / target terms**: "furnace repair Richmond Hill", "AC repair near
me", "no heat emergency [city]", "furnace replacement cost Ontario", "heat pump
installation Richmond Hill", "HVAC maintenance Richmond Hill".

## Overrides
<!-- Optional. Anything typed here BEATS the paste and the Auto section.
     Fill ONLY what you want to force - EMPTY VALUES ARE IGNORED.
     Pages accepts the markup syntax: home | hero | about / menu | menu-list
     Stack flag values are free text; known values with defined behavior:
       animation: gsap | css-only | none | placeholder
       3d: yes | no | placeholder
       booking: calendly | none | placeholder
       forms: formspree | none | placeholder
       email-marketing: brevo | none | placeholder
       analytics: ga4 | plausible | none | placeholder
       hero-media: video | loop | intro-loop | scroll-scrub | static
                   | propose | placeholder
       framework: vanilla | react-cdn | tailwind-cdn | free text
                  (vanilla preferred; requests always honored)
     placeholder = build the front-end slot, wire any provider later.
     Autonomy: low | normal | high (high relaxes non-safety gates;
     media approval gate ALWAYS holds).
     Hosting plan: hostinger-business | hostinger-premium | free text
       (business/cloud = CDN budget profile; anything else or empty =
        tighter no-CDN budgets - see performance skill)
     Accuracy fields (v1.3.4) known values:
       Primary action: call | book | form | visit | order
       Languages: en | en+fr | ... (site copy languages)
       Photos policy: real-only | ai-allowed | mix
       People in imagery: yes | no
       Color mode: light | dark | either -->
### Identity & contact
- Name: CopperCraft Heating & Cooling
- Phone: (647) 250-6072
- Email: info@coppercraft.ca
- Address: 9555 Yonge St, Richmond Hill, ON L4C 9M5
- Hours: Mon 9am–10pm; Tue 9am–10pm; Wed 9am–10pm; Thu 9am–10pm; Fri 9am–10pm; Sat 10am–3:30pm; Sun Closed
### Content facts
- Services:
{claude-proposed from the GBP about-text — confirm/edit, then move to a real value
 above: furnace repair, furnace installation, AC repair, AC installation, heat
 pumps, ductless/mini-split systems, thermostats, preventative maintenance;
 residential + light commercial.}
- Audience:
- Years in business / founded:
{operator: needed — a real founding year unlocks a strong trust line. Not invented.}
- Service area:
{claude-proposed: Richmond Hill + York Region (Markham, Vaughan, Thornhill,
 Aurora, Newmarket) — confirm the true radius.}
- Certifications / licenses: {operator unsure — do NOT display any TSSA licence #,
 G2/G1, or "licensed/insured" claim until confirmed. Trust rests on the 5.0 Google
 rating + review volume instead.}
- Price range / starting price: {operator: skip — no published prices. Positioning is
 "fair, honest, no overselling" (strongly evidenced in reviews), not stated fees.}
- Payment methods:
- Emergency / after-hours: No 24/7 service. Urgent/priority response DURING business
 hours with fast deployment (same-day where possible). Site must NOT claim 24/7.
- Testimonials: APPROVED for site use (operator-supplied verbatim) — full set in the
 Auto → Testimonial candidates list, marked [approved]. Display as a horizontal
 sliding carousel (see Special requests).
- Photos (what exists / what's needed):
### Conversion & SEO
- Primary action:
{claude-proposed: call (with a secondary "book a free estimate" path) — matches the
 trigger-driven, panic-lane audience.}
- Target search terms:
{claude-proposed: furnace repair Richmond Hill; AC repair Richmond Hill; no heat
 emergency; furnace replacement Ontario; heat pump installation Richmond Hill;
 HVAC maintenance York Region.}
- Languages:
{claude-proposed: en (Richmond Hill has a large Persian/Farsi + Chinese community —
 consider en+fa or en+zh if the operator serves them; confirm before adding).}
- Pages: home | hero | scroll-story-1 | scroll-story-2 | trust-bar | services | service-area | testimonials | cta | contact
  {SEAMLESS: nothing sits between hero → scroll-story-1 → scroll-story-2 — one
   continuous dark cinematic journey, no strips/bands. Trust bar moved to AFTER the
   sequence.}
- Domain:
### Integrations
- Google Maps:
- Google Business Profile:
- Socials:
- Existing website:
- Booking link:
- Formspree ID:
- Form notify email:
- GA4 ID / Plausible domain:
- Hosting plan: hostinger-business (CDN budget profile; operator self-hosting)
### Media policy
- Photos policy: real-only
  {hero loop + both scroll-scrub source videos are operator-provided footage, not
   AI-generated — no paid-media generation gate for these slots.}
- People in imagery: no (hero + scrub videos are product/atmosphere/equipment only,
  no people)
### Visual constraints
- Brand colors:
Core Brand Colors
Role	Color	Hex
Primary Copper	Burnished copper-orange	#C96A32
Copper Highlight	Brighter copper accent	#E98543
Deep Copper	Darker hover/detail tone	#8F431F
Cooling Blue	Professional HVAC blue	#23679D
Cool Highlight	Brighter air-flow blue	#4CA6D8
Deep Blue	Premium navy accent	#123A5A
Neutral Colors
Role	Color	Hex
Primary Background	Warm off-white	#F7F5F1
Secondary Background	Soft cool gray	#EEF1F3
Card Background	Clean white	#FFFFFF
Main Text	Near-black charcoal	#17191B
Secondary Text	Medium slate gray	#616970
Borders	Light neutral gray	#D9DEE2
Dark Sections
Role	Color	Hex
Dark Background	Premium charcoal	#111416
Elevated Dark Surface	Soft black-blue	#1A2024
Light Text	Warm white	#F7F5F1
Muted Dark-Section Text	Silver gray	#AAB2B8
- Logo:
- Brand fonts:
- Color mode:
- Avoid (visual):
- Competitors:
- Style references:
### Stack flags
- animation: gsap
- 3d:
- booking:
- forms: placeholder
- email-marketing:
- analytics:
- hero-media: loop
- framework: vanilla
### Meta
- Autonomy:
- Special requests: FIRST THREE HOME SECTIONS = one continuous cinematic scroll
  journey. Build them in this exact order and behavior:
  ALL video assets are MUTED (no audio track / muted+playsinline) — operator directive.
  1) HERO — a branded PRELOADER (loading screen) shows while media preloads, then
     reveals a single LOOPING full-bleed background video (slot `hero-loop.mp4`).
     No intro clip. Poster is mandatory (LCP) and is a complete hero on its own;
     prefers-reduced-motion and blocked-autoplay fall back to the poster. Optional
     returning-visitor skip of the preloader (localStorage, site-slug prefixed).
  2) SCROLL-STORY-1 — full-viewport SCROLL-SCRUB background (canvas frame sequence
     from operator-provided source, slot `scroll-story-1-scrub.mp4`) with FLOATING
     TEXT overlaid. Its opening frame should read as a continuation of the hero
     loop's resting frame (soft transition, no hard cut).
  3) SCROLL-STORY-2 — a SECOND full-viewport SCROLL-SCRUB background (slot
     `scroll-story-2-scrub.mp4`) with FLOATING TEXT. HARD CONTINUITY REQUIREMENT:
     this sequence's FIRST frame must equal SCROLL-STORY-1's LAST frame, so the two
     scrubs read as one unbroken shot. (This continuity is authored into the
     operator-provided footage — media-generation/ingest just slice frames.)
  Floating text = GSAP ScrollTrigger, pinned per scrub stage, synced to scrub
  progress; text copy comes from Phase 3 copywriting. Both scrub sections: frame
  0001 doubles as poster + reduced-motion fallback. Watch page weight (two frame
  sequences) — set Hosting plan for the correct performance budget profile.

  SEAMLESS: sections 1→2→3 must read as ONE continuous shot — NO strips, bands,
  headers, padding gaps, or colour breaks between them. All three share the dark
  cinematic backdrop; hero loop's resting frame → story-1 opening frame → story-2
  (story-1 last frame = story-2 first frame). The first non-cinematic element (the
  trust bar) appears only AFTER story-2.

  TESTIMONIALS SECTION = a horizontal sliding CAROUSEL (slides sideways). Use the
  full approved review set (Auto → Testimonial candidates). Requirements: swipe/drag
  on touch, prev/next controls + keyboard access, pauses on hover/focus, respects
  prefers-reduced-motion (no auto-advance / no motion), one-card mobile → multi-card
  desktop. Reviewer name + verbatim quote per card; truncated quotes stay as-is (never
  fabricate the cut-off text). No star rating unless it's the real 5★. (Phase 5:
  components + frontend-animation; GSAP already enabled.)

## Business Profile Paste
CopperCraft Heating & Cooling
5.011 Google reviews
HVAC contractor in Richmond Hill, Ontario
Directions
Reviews
Save
Share
Call

Address: 9555 Yonge St, Richmond Hill, ON L4C 9M5
Get There:
35 mins
·
16 mins
Phone: (647) 250-6072
Hours:
Open · Closes 10 p.m.
Updated by this business 3 weeks ago
Province: Ontario
Suggest an edit · Own this business?
Add missing information
Add website



Reviews
Shima Bonakdar	"I had a great experience with CopperCraft Heating & Cooling for my AC service."
Sarah Andrade	"It's clear he takes pride in his work and genuinely cares about his customers."
Shirin Bonakdar	"Joe was fantastic from start to finish."
View all Google reviews
From CopperCraft Heating & Cooling
"CopperCraft Heating & Cooling provides dependable heating, cooling and indoor comfort solutions for homes and businesses. From furnace and air-conditioning repairs to new installations, heat pumps, ductless systems, thermostats and preventative maintenance, our skilled technicians deliver honest recommendations and quality workmanship. We take pride in clear communication, fair pricing and doing the job right the first time. When comfort matters, trust CopperCraft to keep your space comfortable in every season."

## Auto (generated — do not hand-edit)
<!-- Written by the system at Phase 0 (client-enrichment). Corrections go
     in Overrides, never here. Regenerated whole on each run. -->
- name: CopperCraft Heating & Cooling  [paste][unconfirmed]
- niche: HVAC contractor  [paste][unconfirmed]
- phone: (647) 250-6072  [paste][unconfirmed]
- address: 9555 Yonge St, Richmond Hill, ON L4C 9M5  [paste][unconfirmed]
- hours: see Overrides (operator supplied full weekly schedule)  [overrides]
- email: see Overrides — info@coppercraft.ca (operator)  [overrides]
- google rating: 5.0★ on Google (review count grew past the 11 shown on GBP; treat count as "5.0 / dozens of reviews" unless a live number is confirmed)  [paste][unconfirmed]
- services: furnace repair; A/C repair; new installations; heat pumps; ductless systems; thermostats; preventative maintenance  [paste][unconfirmed]
- serves: homes and businesses (residential + light commercial)  [paste][unconfirmed]
- website: none previously; new site being built  [paste]
- socials: not in paste  [none]
- years in business / founding: operator says skip (not featured)  [n/a]

### Testimonial candidates  [approved — operator supplied verbatim, use on site]
<!-- Full quotes where given; "…" marks where the operator's paste was truncated —
     display as-is, NEVER fabricate the missing text. -->
- Shima Bonakdar (Local Guide): "I had a great experience with CopperCraft Heating & Cooling for my AC service. The team was professional, punctual, and knowledgeable. They took the time to explain everything clearly, completed the work efficiently, and made sure my air conditioner was running perfectly before they left. Their attention to detail and commitment to customer satisfaction really stood out. I highly recommend CopperCraft Heating & Cooling to anyone looking for reliable and high-quality AC service."  [approved]
- Negar Zaraby (Local Guide): "I've dealt with a lot of contractors over the years, and these guys were one of the best. They showed up when they said they would, explained everything clearly, and didn't try to upsell me on things I didn't need. …"  [approved][truncated]
- Shirin Bonakdar: "Joe was fantastic from start to finish. He was professional, knowledgeable, and took the time to explain everything in a way that made sense. He showed up when he said he would, worked efficiently, and made sure everything was done …"  [approved][truncated]
- ANAHITA B. (Local Guide): "5 star service! if you are looking for an honest, reliable and patient technician, Joe is your guy. My AC was not working and turned out it was just an electrical glitch which was fixed with no fuss and overselling."  [approved]
- mehri salmaninejad: "Great price. Best service out there. Truly dependable and honest approach. Pricing is fair …"  [approved][truncated]
- Sherri A. (Local Guide): "What a great company. Our AC stopped working and they were very quick to respond and were able to fix the unit same day. It was great that they had the required part without having to order it and come back. Extremely reasonable price. Do not hesitate to use this company. …"  [approved][truncated]
- Melwin Gonsalves: "Joe and his team have been extremely helpful and reliable whenever I needed something. You can be definitely depend on them in an emergency. …"  [approved][truncated]
- Mehmet Kismetli: "Great experience from start to finish! The team was professional, knowledgeable, and very efficient. They took the time to explain everything clearly and provided excellent service. Highly recommend this HVAC company to anyone looking for reliable and quality work!"  [approved]
- Sarah Andrade: "It's clear he takes pride in his work and genuinely cares about his customers."  [approved]
