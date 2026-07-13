# Gameplay audit: frame-budget degrade/recover loop

**Timestamp:** `2026-07-12T23-08-37-04-00`

## Summary

Gameplay continues while the host mutates four render participants from frame-time callbacks. There is no command barrier, quality revision or rollback, so a frame can be assembled across mixed predecessor and successor quality settings.

## Plan ledger

**Goal:** preserve gameplay continuity while quality transitions commit as one render transaction.

- [x] Trace frame sampling and hysteresis.
- [x] Map participant mutations.
- [x] Identify mixed-setting and recovery paths.
- [ ] Add deterministic transition fixtures.

## Loop

```txt
adventure.tick
  -> update camera/world/gameplay/HUD
  -> performanceBudget.sample(frameMs)
  -> possibly mutate clouds, fog, post pipeline and DPR
  -> render post pipeline
```

## Failure path

```txt
sustained overload
  -> level 1
  -> level 2
  -> DPR reaches level-2 scale
sustained recovery
  -> level 1 callback restores cloud/fog only
  -> level 0 callback restores cloud/fog only
  -> visible world remains lower-DPR than reported quality level
```

## Needed result

`AdaptiveQualityTransitionResult` must report predecessor and successor revisions, all participant values, verification outcome, rollback outcome and the first visible frame ID.

Documentation only.