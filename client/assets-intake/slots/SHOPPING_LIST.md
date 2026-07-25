# Shopping List — CopperCraft Heating & Cooling (Home)

Photos policy: **real-only** (Overrides) — no AI-generated imagery on
this site. People in imagery: **no**. All three video slots below were
already supplied by the operator (client/assets-intake/ intake sweep) —
no generation prompts needed, no gaps.

## hero-loop.mp4        [x] filled
folder: Home - Hero/
treatment: loop - 5.0s idle, muted, full-bleed hero media well, MP4; player = templates/loop-crossfade.js
Subject/scene: residential condenser unit beside a modern home's front entry,
late-golden-hour, slow drift. Idles under the hero copy until the visitor scrolls,
then crossfades into hero-transition. No native `loop` attribute — the clip is not
confirmed seamless, so the player restarts on 'ended' (a hard cut, never a freeze).
Poster = FRAME 1 (not the last frame): it must equal hero-transition frame 0001 so
the reduced-motion / blocked-autoplay / no-JS still is the same image the scrub
starts on. Poster is the LCP candidate.
PROMPT -> n/a — operator-supplied footage (Hero-loop.mp4), no generation needed.

## hero-transition.mp4        [x] filled
folder: Home - Hero Transition/
treatment: scroll-scrub - sliced to a canvas frame sequence at /ingest
The scroll-scrubbed move away from the idle framing, driven entirely by scroll
position inside the pinned hero stage.
HARD STORYBOARD CONSTRAINT: frame 0001 of hero-transition must be visually
IDENTICAL to the first frame of hero-loop. That identity is the whole reason the
loop -> scrub crossfade is invisible; if the two drift apart the swap becomes a
visible cut and no amount of fade duration hides it. Any regenerated or re-cut
footage must be re-checked against this before it ships.
  VERIFIED 2026-07-24 on the delivered footage: SSIM 0.982 between hero-loop
  frame 1 and hero-transition frame 0001 (vs 0.971 against the loop's last frame,
  and 0.265 for an unrelated control pair) — constraint satisfied.
PROMPT -> n/a — operator-supplied footage (Herotransition1-2.mp4), no generation needed.

## scroll-story-2-scrub.mp4        [x] filled
folder: Home - Story 2/
treatment: scroll-scrub - sliced to a canvas frame sequence at /ingest
Operator-supplied footage (Herotransition2-3.mp4). Now the THIRD stacked media
layer inside the pinned hero stage (not a separate section), handing off from
hero-transition by the same opacity crossfade the loop uses.
Seam to hero-transition's last frame: SSIM **0.940** on the ingested frames
(luma 0.917, chroma 0.985) — corrected from an earlier 0.784 figure that was
measured against the raw MP4's final frame rather than the 61st ingested frame,
which is what actually renders. 0.940 is a smooth dissolve but not the
near-identity of the hero-loop -> hero-transition seam (0.986), so the player
holds BOTH sequences still through the crossfade window and gives it a longer
ramp. To make this seam invisible too, a future re-cut should target frame 0001
matching hero-transition frame 0061 at SSIM ~0.98.
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
