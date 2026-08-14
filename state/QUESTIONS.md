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
