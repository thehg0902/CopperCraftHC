# Shopping List — CopperCraft Heating & Cooling (Home)

Photos policy: **real-only** (Overrides) — no AI-generated imagery on
this site. People in imagery: **no**. All three video slots below were
already supplied by the operator (client/assets-intake/ intake sweep) —
no generation prompts needed, no gaps.

## hero-loop.mp4        [x] filled
folder: Home - Hero/
treatment: loop - muted, full-bleed background, hero section
Operator-supplied footage (Hero-loop.mp4). Poster extracted at /ingest
(frame 1) doubles as LCP image + reduced-motion/blocked-autoplay fallback.
PROMPT -> n/a — client-provided, no generation needed.

## scroll-story-1-scrub.mp4        [x] filled
folder: Home - Story 1/
treatment: scroll-scrub - sliced to a canvas frame sequence at /ingest
Operator-supplied footage (Herotransition1-2.mp4), authored by the
operator to continue from the hero loop's resting frame.
PROMPT -> n/a — client-provided, no generation needed.

## scroll-story-2-scrub.mp4        [x] filled
folder: Home - Story 2/
treatment: scroll-scrub - sliced to a canvas frame sequence at /ingest
Operator-supplied footage (Herotransition2-3.mp4). HARD CONTINUITY: this
file's first frame must equal scroll-story-1-scrub.mp4's last frame —
authored into the footage by the operator; /ingest only slices frames.
PROMPT -> n/a — client-provided, no generation needed.

## logo-mark.png        [x] filled
folder: Home - Brand/
treatment: alpha - transparent PNG, header brand mark
Derived from the operator's `logo-Image.png`: cropped to the hexagon mark's
content bounds (426x427 of the 1254px canvas, dropping the empty padding and
two stray edge artifacts), scaled to 256px. Pure copper + cooling-blue, no
black — reads on both the dark cinematic sections and the light content.
PROMPT -> n/a — client-provided, no generation needed.

## logo-wordmark.png        [x] filled
folder: Home - Brand/
treatment: alpha - transparent PNG, header logotype (dark backgrounds state)
Derived from the operator's `logo-text.png`: cropped to content bounds
(1134x227), scaled to 680px wide. Near-black "COPPERCRAFT" + copper HEATING /
blue COOLING. Used once the header passes onto light sections.
PROMPT -> n/a — client-provided, no generation needed.

## logo-wordmark-light.png        [x] filled
folder: Home - Brand/
treatment: alpha - transparent PNG, header logotype (knockout, over dark video)
Knockout variant of the wordmark for the transparent header floating over the
dark cinematic sequence: the near-black glyphs are recoloured to warm white
(--color-dark-text #F7F5F1); the copper and blue brand accents are preserved
untouched. Mechanical recolour of the operator's own artwork — no redraw.
PROMPT -> n/a — client-provided, no generation needed.

---

## Not slotted (no action needed)
- `logo-full.png` remains at `client/assets-intake/` — the lockup combines the
  mark and wordmark, but the header composes them separately (so they can
  scale and swap independently), so no slot consumes it. Not a gap.
- `vibe/brand board.png` — context-only per client.md, never shipped.
- Google Map embed (contact section) — not a media-generation slot; wired
  by the maps-gbp skill in Phase 5 using the confirmed address.
