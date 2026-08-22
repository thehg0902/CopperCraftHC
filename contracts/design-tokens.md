# Contract: Design Tokens  (v1.4.0)

All visual values are CSS custom properties defined ONCE in
`site/shared/tokens.css` on `:root`. No component may hardcode a color,
font size, spacing value, radius, shadow, or duration.

## Required token set

Colors:        --color-primary, --color-primary-dark, --color-accent,
               --color-bg, --color-surface, --color-text, --color-text-muted,
               --color-border, --color-success, --color-error
Typography:    --font-heading, --font-body,
               --text-xs, --text-sm, --text-base, --text-lg, --text-xl,
               --text-2xl, --text-3xl, --text-hero  (rem-based modular scale)
               --leading-tight, --leading-normal, --leading-loose
Spacing:       --space-1 .. --space-12 (4px base scale expressed in rem)
Layout:        --container-max (default 1200px), --section-pad-y,
               --radius-sm, --radius-md, --radius-lg, --radius-full
Elevation:     --shadow-sm, --shadow-md, --shadow-lg
Motion:        --duration-fast (150ms), --duration-base (300ms),
               --duration-slow (600ms), --ease-standard, --ease-out-expo

## Rules
1. Producer: the design-tokens skill writes `site/shared/tokens.css`.
2. Consumers: every other skill uses `var(--token)` only.
3. Dark variants (if used) override on `[data-theme="dark"]`, same names.
4. Adding a token = append here first (bump minor), then to tokens.css.
5. Renaming/removing a token = breaking change (bump major). Avoid.

## Section tone bands (v1.2.0)
Alternating section-background treatment, sampled from the operator's
equipment sticker (client/assets-intake/archive/2026-07-29-logo-refresh/;
see state/DECISIONS.md 2026-07-29 "section tone bands"). Two utility
classes apply these — `.tone-cream` and `.tone-charcoal` (defined once in
`site/shared/base.css`, per the file-structure contract) — alternated
section-by-section down a page. Each carries a 4px `--gradient-copper`
hairline as a background LAYER (not a border), so it adds zero box height
and never shifts existing padding/margin rhythm.

Tokens:  --color-tone-cream, --color-tone-cream-surface,
         --color-tone-cream-border, --color-tone-cream-muted,
         --color-tone-charcoal, --color-tone-charcoal-surface,
         --color-tone-charcoal-border, --color-tone-charcoal-text,
         --color-tone-charcoal-muted

These are additive (not part of the "Required token set" above) and do
not replace --color-bg/--color-surface/--color-bg-alt, which remain the
defaults for anything not explicitly given a tone class.

## Header surfaces (v1.3.0)
The fixed header carries a translucent surface whose TINT tracks the
section beneath it, so the bar never strands a light surface over a dark
background (or vice versa). Three states, driven by classes toggled in
`site/shared/main.js`: no class = fully transparent (hero only, so the
cinematic opener runs edge-to-edge), `.scrolled` = light surface,
`.scrolled.on-dark` = dark surface. Both surfaces are translucent +
backdrop-blurred; the logo/nav swap to their knockout variants on the
dark one.

Tokens:  --header-surface-light, --header-border-light,
         --header-surface-dark,  --header-border-dark

Additive; they replace the previously hardcoded rgba() literals in the
header block of base.css.

## Metallic copper (v1.4.0)

The brand is a copper craft business, so copper is a FINISH, not just a hue.
Phase 2 established the ramp after the operator judged flat orange "felt
cheap"; the guardrail recorded in the same breath was "not chrome, not too
metallic". v1.4.0 back-fills the tokens that shipped then but were never
listed here, and adds one.

Ramp stops:   --metal-copper-shade  (deep shadow of the curve)
              --metal-copper-core   (mid copper body)
              --metal-copper-glow   (warm specular)
              --metal-copper-spec   (champagne glint; use sparingly)

Composites:   --gradient-copper  (curved reflective sweep, dark -> body ->
                                  specular -> body -> dark)
              --sheen-soft       (surface-curvature overlay for buttons)
              --sheen-sweep      (thin moving glint band; motion-gated)
              --bead-copper      (NEW v1.4.0 - radial bead for small round
                                  marks: list dots, markers. A linear sweep
                                  reads as a flat tint at 6px; a radial with
                                  an off-centre highlight reads as a sphere.)
              --gradient-cool    (cooling-blue sweep; currently unused)

Usage rule - CONTRAST BINDS THE FINISH:
Metal goes on EDGES, MARKS and SURFACES, never on small text. Measure text
against the worst-case stop of whatever sits behind it: dark text against the
DARKEST stop, light text against the LIGHTEST. Gradient-CLIPPED text is judged
at its own lightest stop, which is the least legible part of the glyph, and
measures 1.49:1 for --gradient-copper on white - a hard fail at any size. This
is why .review__stars and .hero-trust .stars are solid copper and not clipped.

## Back-filled inventory (v1.4.0)

These shipped in tokens.css from v1.1.0 onward but were never appended here,
contrary to Rule 4. Listed now so the contract matches reality:

Brand extensions:  --color-primary-vibrant (decorative only - fails text AA),
                   --color-primary-light, --color-accent-light,
                   --color-accent-dark, --color-bg-alt
Dark sections:     --color-dark-bg, --color-dark-surface,
                   --color-dark-text, --color-dark-text-muted
Layout:            --radius-xl, --header-h
