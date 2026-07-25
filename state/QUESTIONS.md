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
