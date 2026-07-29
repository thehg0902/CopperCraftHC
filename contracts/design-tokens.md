# Contract: Design Tokens  (v1.2.0)

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
