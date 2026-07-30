# Agency OS Upgrade: Agentic Workflow  (proposed template v1.8.0)

Port document — apply these changes to the MASTER template repo, then they ship
with every future client clone. Derived from the CopperCraftHC build retrospective
(P0–P2, 2026-07). Nothing here touches `contracts/` or the hard invariants.

## Evidence (why — from the CopperCraftHC baseline build)

- ~7 operator round-trips in P0–P2; **3 were avoidable** (copper rework, two
  seamless-gap passes). Operator attention, not tokens, was the binding cost.
- The scroll-scrub gap shipped to a gate because Claude self-verified with DOM
  math ("gap: 0px") instead of adversarial visual review; the operator's eyes
  caught it. Twice.
- Taste decisions were presented as ONE option → iterate loops. Variants would
  have converted them to single-pick selection moments.
- Zero work ran during multi-hour/day gate waits (fonts never fetched, footage
  never pre-mapped, next-phase copy never drafted).
- ~25 browser-debug tool calls (viewport/scroll mismatches) burned main-loop
  context that later phases now carry as dead weight.

## The five patterns being installed

1. **Adversarial pre-gate review** — before ANY human gate, a fresh-context agent
   tries to REFUTE the work. Visual gates: it must scroll/screenshot the real
   preview at 360/768/1280 — DOM measurements alone never count as verification.
2. **Variant fan-out for taste** — subjective calls (palette treatment, motion
   feel, hero style) reach the operator as 2–3 labeled variants in one preview.
   Design references stay human; generating the menu is agent work.
3. **Draft-ahead during gate waits** — while blocked on the operator, background
   agents do the next phase's gate-independent work (copy drafts, font fetch,
   asset pre-mapping, validators). Discard-on-reject is accepted.
4. **Context firewall** — browser debugging, long QA loops, and bulk research run
   in subagents; only conclusions enter the main context.
5. **Parallel research fan-out** — market research runs as 3–4 concurrent agents
   (competitors, keywords/SERP, programs/rebates, review-language mining), not
   one serial pass.

---

## Change 1 — `CLAUDE.md`: add an always-on section

Insert after "## Token economy (always on)":

```markdown
## Agent orchestration (always on)

- Operator attention is the scarcest resource: optimize for FEWER, RICHER
  round-trips. Batch operator questions (one ask, up to 4 questions);
  never drip-feed.
- Before ANY human gate: run an adversarial pre-gate review — a
  fresh-context subagent prompted to REFUTE the work (see the
  agent-orchestration skill). Visual gates require the agent to scroll
  and screenshot the real preview at 360/768/1280; DOM measurements
  alone are never proof.
- Taste/aesthetic decisions are presented as 2–3 labeled variants in one
  preview; the operator picks once. One-option-then-iterate is an
  anti-pattern.
- While waiting at a gate, launch draft-ahead background agents for the
  next phase's gate-independent work. Rejected-gate waste is accepted;
  idle waits are not.
- Browser debugging, visual QA loops, and bulk research run in
  subagents (context firewall) — only conclusions and artifacts return
  to the main loop.
- Mechanical work (pushes, validators, font/asset fetches) runs as
  background tasks, never as foreground conversation turns.
- Subagents obey all hard invariants; the media approval gate and QA
  gate can never be delegated away.
```

## Change 2 — NEW skill `.claude/skills/agent-orchestration/SKILL.md`

```markdown
---
name: agent-orchestration
description: Run the build's agentic patterns - adversarial pre-gate
  review, taste-variant fan-out, draft-ahead during operator waits,
  research fan-out, and context-firewall subagents. Use before every
  human gate, at Phase 1 research, and whenever the pipeline blocks on
  the operator. Not for the QA gate script itself (qa-review) or visual
  debugging technique (visual-qa).
metadata: {version: 1.0.0, category: process, tier: A}
---
# Agent Orchestration

## Purpose
Convert operator round-trips into single-pick moments and idle gate
waits into finished work, using subagents as fresh eyes and parallel
hands.

## Inputs
Current phase + gate from state/BUILD_STATE.md; audience brief and
decisions in state/DECISIONS.md; the artifact about to be gated.

## Outputs
Pre-gate review verdicts (fixed before presenting), variant previews,
completed draft-ahead work, research briefs — all logged in
BUILD_STATE.md notes.

## Rules
1. PRE-GATE REVIEW (mandatory before every HUMAN gate): spawn one
   fresh-context subagent whose prompt is to REFUTE, not confirm:
   "Try to prove this artifact fails its spec. List every failure with
   evidence." Visual artifacts: the agent must load the real preview,
   scroll it end-to-end, and screenshot at 360/768/1280 (desktop AND
   mobile) — geometry/DOM checks alone are insufficient (a 0px DOM gap
   can still render as a full-viewport visual gap; learned from the
   sticky-release incident). Fix findings, re-run once, then present.
2. TASTE VARIANTS: when the decision is aesthetic (palette treatment,
   motion intensity, hero composition), produce 2–3 labeled variants in
   ONE artifact (side-by-side grid or toggled preview). Present with a
   one-line trade-off per variant. Never present a single option for a
   taste call unless the operator pre-constrained it fully.
3. DRAFT-AHEAD: at every gate stop, list the next phase's work items
   that do NOT depend on the gated decision, and launch background
   agents for them. Standard menu: Phase 3 copy (depends on brief +
   architecture, not visuals), font fetching, asset pre-mapping and
   budget checks, validator runs. Mark results "draft-ahead, pending
   gate" in BUILD_STATE notes.
4. RESEARCH FAN-OUT (Phase 1 / market research): run competitors,
   keywords/SERP, programs-and-rebates, and review-language mining as
   parallel subagents; the main loop only synthesizes their briefs into
   the audience brief. Web-sourced facts stay research context, never
   client claims.
5. CONTEXT FIREWALL: any loop expected to exceed ~10 tool calls of
   debugging/inspection (browser QA, screenshot hunts, bulk file
   sweeps) runs inside a subagent that returns conclusions + at most 3
   artifacts. The main context never carries the debugging transcript.
6. DELEGATION LIMITS: subagents never approve gates, never trigger paid
   media, never deploy. Approval verbs stay with the operator; the main
   loop stays the single writer for state/ files (subagents report,
   main loop writes).
7. Log each pattern use in BUILD_STATE.md notes (one line each) so
   /usage-audit can score round-trips-per-gate.

## Anti-patterns
- Confirmation-framed review prompts ("check this looks right") — the
  reviewer must be prompted to attack.
- Variant fan-out for objective decisions (contrast failures, budget
  violations — just fix those).
- Draft-ahead on gate-DEPENDENT work (building components before the
  layout preview is approved).
- Parallel subagents writing the same file (single-page sites: one
  writer, many reviewers/researchers).

## Changelog
- 1.0.0 initial (v1.8.0 — from CopperCraftHC retrospective)
```

## Change 3 — `.claude/commands/build.md`: per-phase insertions

- **Phase 1** (before the audience brief): "Market research runs as a parallel
  fan-out per agent-orchestration rule 4 when Target Audience is thin or the
  operator requests research."
- **Phase 2** (at both gate stops): "Before presenting either preview, run the
  agent-orchestration pre-gate review (rule 1). Taste-sensitive choices in the
  style preview (palette treatment, motion feel) are presented as variants
  (rule 2). While stopped, launch draft-ahead agents (rule 3: Phase 3 copy,
  font fetch, asset pre-map)."
- **Phase 3**: "After drafting, run one adversarial copy critic (fresh context)
  against the audience brief: tone (no upsell-pressure), zero invented facts,
  claim audit (no unconfirmed 24/7 / licence / price claims), placeholder
  audit. Fix, then continue."
- **Phase 4** (at the STOP): "Draft-ahead: pre-map any operator-dropped footage
  to slot names, probe duration/resolution, and pre-check weight budgets in a
  background agent; report with the shopping list."
- **Phase 5**: "Browser verification loops run in subagents (context firewall);
  the main loop receives verdicts + screenshots only."
- **Phase 6/7**: "Pre-gate review before presenting QA results; pushes and
  packaging run as background tasks."

## Change 4 — small edits to existing skills

- `.claude/skills/visual-qa/SKILL.md` — add rule: "When invoked pre-gate (not
  /visual-qa), run INSIDE a subagent per agent-orchestration rule 5; screenshots
  at 360/768/1280 are mandatory; DOM metrics alone never constitute a pass."
  Changelog bump.
- `.claude/skills/token-economy/SKILL.md` — add rule: "Structural containment
  beats behavioral discipline: any >10-call inspection loop belongs in a
  subagent (agent-orchestration rule 5)." Changelog bump.
- `/usage-audit` command — add KPI: "operator round-trips per human gate
  (target ≤1); count avoidable re-gates (rework caused by unverified or
  single-option presentations)."

## Change 5 — housekeeping

- Bump template version (BUILD_STATE.md template header) to v1.8.0.
- Run `/lint-os` after applying (skill registry + description checks).
- Optional: note in the retainer flow (maintenance-retainer) that /client-edit
  uses pre-gate review only for visual-touching edits (reduced form).

## Application checklist (master repo)

1. [ ] CLAUDE.md — insert "Agent orchestration (always on)" section (Change 1)
2. [ ] Create `.claude/skills/agent-orchestration/SKILL.md` (Change 2)
3. [ ] Edit `.claude/commands/build.md` phase steps (Change 3)
4. [ ] Edit visual-qa + token-economy skills, /usage-audit KPIs (Change 4)
5. [ ] Version bump + `/lint-os` (Change 5)
6. [ ] Test on the next client clone; compare /usage-audit round-trips-per-gate
       against the CopperCraftHC baseline (~7 round-trips, 3 avoidable, P0–P2)
