# Open Questions for the Client / Owner
<!-- Written by the pipeline. Answered inline by the human, then promoted
     to DECISIONS.md. Format:
     - [ ] Q: ...   A: (pending) -->
- [x] Q: Full weekly business hours? GBP only shows "Closes 10 p.m." — need each day's open/close.   A: Friday	9 a.m.–10 p.m.
Saturday	10 a.m.–3:30 p.m.
Sunday	Closed
Monday	9 a.m.–10 p.m.
Tuesday	9 a.m.–10 p.m.
Wednesday	9–10 a.m.
Thursday	9 a.m.–10 p.m.
- [x] Q: Is real after-hours / emergency service offered? (Site must NOT claim 24/7 unless yes.)   A: no but urgency care in working hours, fast deployment 
- [x] Q: TSSA contractor registration # + G2/G1 Gas Technician cert, and insurance/WSIB status? (HVAC's #1 trust artifact.)   A: not sure → do not display any licence claim
- [x] Q: Founding year / who is "Joe" (owner/lead tech named in reviews)? Unlocks the story + a trust line.   A: skip irrelevant
- [x] Q: Any workmanship warranty, free-estimate policy, maintenance plan, or promo to feature?   A: quality guarantee, no promo — feature the real testimonials
- [x] Q: Service-call fee / starting price to state for price transparency?   A: no, skip
- [x] Q: Email address + any social profiles + a domain for the site?   A: info@coppercraft.ca (no socials/domain given)
- [x] Q: Confirm Wednesday hours — you wrote "9–10 a.m."; assumed a typo for 9am–10pm.   A: 9am–10pm confirmed
- [x] Q: Do the hero/scroll-scrub videos feature people or product/atmosphere only?   A: no people
- [x] Q: Hosting plan (sets the media weight budget) + a domain for the site?   A: hostinger-business (domain still pending)
- [x] Q: [ARCH] Add 3 recommended sections?   A: yes to all
- [x] Q: [CONTACT] Contact/quote FORM or call-only?   A: placeholder form now, add Formspree ID later
- [ ] Q: Domain for the site (for SEO canonicals/sitemap)?   A: (pending — not blocking until deploy)
- [ ] Q: [FONTS] Poppins (400/500/600) + Inter (400/500) .woff2 files needed at site/assets/fonts/ (self-hosted per brand board). OK to fetch the OFL webfonts during Phase 5, or will you provide them?   A: (pending — system fallback until then)

## 2026-07-25 — Google review count (blocks aggregateRating schema)
The trust band publishes "5.0 on Google" with NO review count, because the
count has never been verified. client.md Auto records it as [unconfirmed]:
the original GBP paste showed 11 reviews with a note that the number had
since grown. Operator chose to ship without a count rather than a placeholder.

To add it later: confirm the live count from the Google Business Profile,
put it in client.md Overrides, and the stat becomes "5.0 · N Google reviews".
Until then seo-technical must NOT emit aggregateRating/reviewCount schema —
the rating is asserted as on-page text only.

## 2026-08-10 — Designer Notes v2 brief (BACKLOG — not in current build scope)
Operator committed `client/CopperCraft_Website_Designer_Notes_v2.pdf` — a
significant expansion brief. Logged for a FUTURE retainer/build phase, not
folded into the current Phase 5 (build) → Phase 6 (QA) → deploy sequence.
Revisit after this build ships.

Summary of the ask:
- **FinanceIt financing integration** (hero banner, Apply Now CTA, 3-step
  process, FAQ, footer logo, floating "Apply for Financing" button, custom
  monthly-payment calculator). Reference sites: cityhomecomfort.ca/financing,
  armourhomecomfort.ca/financing, bryant.com/en/ca/before-you-buy/financing,
  excelhomecomfort.com/financing, financeit.io.
- **New pages**: Financing, Promotions, Comfort Club (membership), Project
  Gallery, Completed Projects, Warranty, FAQ, Commercial HVAC, Emergency
  HVAC, Equipment Brands, Careers, Service Areas.
- **New per-equipment service pages**: furnaces, ACs, heat pumps, ductless,
  boilers, tankless/water heaters, rooftop units, fan coils, HRVs/ERVs,
  humidifiers, gas lines, thermostats, commercial, preventative maintenance.
- **Homepage adds**: trust badges under hero, 3 CTA buttons (Book Service /
  Free Estimate / Apply for Financing), FinanceIt banner, promotions
  section, brand-logo strip, before/after gallery, Google review carousel.
- **About Us**: owner story, team photos, certifications, values, real
  project imagery — note: founding story was explicitly marked "skip,
  irrelevant" by the operator earlier (line 14 above); would need
  re-confirming if this section is ever built.
- Explicitly preserve the current premium visual identity — content/feature
  expansion, not a redesign.

Assets staged for this future work in `client/assets-intake/brand-standby/`:
`financeit-logo-light-bg.png`, `financeit-logo-dark-bg.png`,
`coppercraft-logo-variant-02.png` (unused logo variant, gray/copper). Not
wired into any page yet.

## 2026-08-10 — Financing page (built ahead of the v2 backlog)
Operator supplied a Financing page mockup and asked for it to be built and
linked from the primary nav (one link only; no new home-page sections yet).
Shipped as `site/financing/` using the site's own design system, with the
Financeit wordmark on the "how it works" partner strip.

Open items, all needed before this page can go live:
1. **Illustrative monthly figures** ($65 furnace / $70 AC / $95 heat pump).
   Operator-supplied from the mockup and shown with an explicit "examples,
   not quotes" disclaimer. CONFIRM these are acceptable to publish, or
   replace with figures the lender will stand behind.
2. **Financeit application URL** — the page currently has no "Start Secure
   Application" button. The credit application (income, banking, ID) must
   live on Financeit's portal, never on this site. Need the live link.
3. **Form endpoint** — the interest form reuses the site-wide placeholder
   pattern (`forms: placeholder`); it posts nowhere yet.
4. **Approval turnaround** — the page says "usually answered quickly". If
   Financeit publishes a specific timeframe, use it instead.

2026-08-14: the on-page warning that named items 2 and 3 was HIDDEN (commented
out at `financing/index.html:189`) because the homepage problem-selector card
"My System Is Getting Old" now links here and visitors were seeing internal
build notes. Hiding the note changed nothing else — all four items above are
still open, and the form still posts nowhere.

## 2026-08-20 — opened by the SEO build

- [x] **GBP address string — "Yonge St" or "Yonge Street"?**
  The site had three variants. All 16 pages + JSON-LD now use the owner-typed
  Overrides string `9555 Yonge St, Richmond Hill, ON L4C 9M5`. The Google
  Business Profile string is canonical per protocol §5 and the GBP link is still
  empty in client.md, so this could not be checked. NAP must match GBP character
  for character — it is the highest-weight controllable in local SEO.
  A: (pending)

- [ ] **Social profile URLs for schema `sameAs`.**
  `Socials:` is empty, so `sameAs` is omitted rather than invented. An empty
  sameAs measurably weakens how AI answer engines resolve business identity
  (protocol §6.1). Any Facebook / Instagram / GBP URL helps.
  A: (pending)

- [ ] **Map coordinates for schema `geo`.**
  The Maps embed uses a text query, not lat/long, so `geo` was omitted. The
  coordinates from the client's own Maps listing would complete the block.
  A: (pending)

- [x] **OK to publish individual `Review` schema on /reviews/?**
  The operator-approved verbatim testimonials are displayed on the page, so
  marking them up is legitimate (unlike aggregateRating, which stays blocked
  until a review count is confirmed). NOT shipped — awaiting a yes.
  A: (pending)

- [ ] **Real job details for the 6 /our-work/ gallery photos.**
  Captions currently describe only what is VISIBLE in each photograph plus
  general context about that equipment type — no dates, locations or customer
  details, none of which were supplied. Real specifics (what the job was, which
  town, what problem it solved) would make the page materially stronger.
  A: (pending)

- [x] **Financeit application URL** — `[PLACEHOLDER: Financeit application URL]`
  on /financing/ is the ONE remaining FAIL in `scripts/seo_check.py`. Pre-existing
  open item; the SEO pass did not resolve it and did not paper over it.
  A: (pending)

- [ ] **Service pages ship at 301-388 words each — a deliberate, known weakness.**
  Operator chose ~300-400 over the protocol's 500-700 for speed. That clears the
  300-word thin-content floor but sits at the low end; established local HVAC
  competitors run substantially longer service pages, so these are beatable on depth.
  Worth revisiting once they are live and there is real Search Console data showing
  which of the ten actually earn impressions.
  A: (pending — revisit post-launch)

## 2026-08-20 — RESOLVED from the operator's Google Business Profile

- [x] **GBP address string — CLOSED, and the earlier urgency was OVERSTATED.**
  GBP *displays* `9555 Yonge St`; the operator says the real address is "Yonge Street",
  and Google's own autocomplete offers "9555 Yonge Street". Google normalises street-type
  suffixes and resolves both to the same Place — that is why the profile displays one
  form while the picker suggests the other. This is NOT a NAP mismatch.
  I had logged this as "the highest-weight item still open" and as "actively costing you
  local ranking". That was wrong. The character-for-character NAP rule bites on things
  that genuinely differ between entities — a missing suite number, a different phone,
  Ltd vs Inc, a wrong street number. "St" vs "Street" is not one of them.
  Site stays on "9555 Yonge St" (28 visible instances + schema), which matches what the
  public profile displays and what aggregators scrape from it. No change made.
- [x] **Google review count — 12.** GBP shows `5.0 ★★★★★ 12 Google reviews`. Added to
  the visible trust copy on the home page (hero, trust stat, testimonials heading) and
  on /reviews/. "5.0 from 12 Google reviews" is materially more credible than a bare
  "5.0", which reads like one happy customer.
- [x] **aggregateRating / Review schema — CLOSED PERMANENTLY. Not a data problem.**
  This was blocked pending a review count. The count now exists and the schema STILL
  must not ship, for a different and permanent reason: Google's review-snippet policy
  states that "if the entity that's being reviewed controls the reviews about itself,
  their pages that use LocalBusiness or any other type of Organization structured data
  are ineligible for star review feature", and separately "don't aggregate reviews or
  ratings from other websites". Marking up our own Google reviews on our own site is
  both of those at once. Displaying the rating as page text is fine and is what we do.
- [x] **Financeit application URL — there isn't one.** Operator confirmed no online
  application exists; the CTA is to contact CopperCraft, who guide the customer
  through it. Every CTA on /financing/ already pointed at tel: or /contact/, so no
  markup change was needed. The hidden build note was rewritten and the
  `[PLACEHOLDER:` token removed — `scripts/seo_check.py` is now 0 fail / 0 warn.

## 2026-08-20 — NEW, opened from the same GBP screenshot

- [ ] **THE GBP HAS NO WEBSITE LINK.** The profile shows "Add missing information →
  Add website". This is the single highest-value local SEO action available, and it is
  free: the GBP is currently the strongest ranking asset and it points nowhere. Add
  https://coppercraft.ca the day the site goes live. Nothing on-site substitutes for it.
  A: (pending — do at launch)

- [ ] **GBP "Areas served" says only "Richmond Hill and nearby areas".** The site and
  its JSON-LD `areaServed` publish six named towns (Richmond Hill, Markham, Vaughan,
  Thornhill, Aurora, Newmarket), and five of them now have their own page. Naming those
  same six in the GBP service-area settings makes the profile and the site corroborate
  each other, which is what Google looks for.
  A: (pending)

- [ ] **Hours: only one day verifiable from the screenshot** ("Open · Closes 10 p.m.").
  That is consistent with the site's Mon–Fri 9:00 a.m.–10:00 p.m., but Saturday
  (10:00 a.m.–3:30 p.m.) and Sunday (closed) could not be checked. Worth confirming the
  full week matches, since site hours and GBP hours disagreeing is a trust signal
  Google reads.
  A: (pending)

- [x] **Socials — RESOLVED 2026-08-20.** Nothing appeared on the GBP, so schema `sameAs` stays
  omitted rather than invented. Unchanged from before.
  A: (pending)
