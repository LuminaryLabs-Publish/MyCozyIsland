# Known gaps: MyCozyIsland accessible HUD, progress and interaction projection

**Timestamp:** `2026-07-15T19-58-42-04-00`

## Summary

Visual state exists, but semantic state is incomplete, mixed with action controls or updated without meaningful-change admission.

## Plan ledger

**Goal:** keep accessibility risks explicit until implementation and executable proof exist.

- [ ] Menu progress and Play action share one button.
- [ ] Menu progress has no independent progressbar/status descriptor.
- [ ] Game startup progress has no exposed numeric value.
- [ ] Stamina is visual width only.
- [ ] Seed selection is class-only and not semantically selected.
- [ ] Resource counts have no stable semantic grouping contract.
- [ ] Interaction prompts/results are not state-bound live/status results.
- [ ] Save status changes have no authored announcement policy.
- [ ] `updateHud` rewrites state every RAF callback without semantic deduplication.
- [ ] Canvas alternative does not describe current target, action or selected seed.
- [ ] Menu-to-game focus handoff has no typed admission result.
- [ ] No accessible menu/game frame acknowledgement.
- [ ] No accessibility-tree, screen-reader, focus or Pages fixture.

## Important distinction

Adding `aria-live` to every changing HUD node would create noise rather than accessibility. The required boundary must classify meaningful transitions, suppress frame-only duplicates and keep frequently changing telemetry queryable without announcing every frame.
