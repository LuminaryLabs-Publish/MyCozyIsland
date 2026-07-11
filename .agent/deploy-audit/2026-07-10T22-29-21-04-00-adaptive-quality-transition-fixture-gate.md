# Deploy Audit: Adaptive Quality Transition Fixture Gate

Timestamp: `2026-07-10T22-29-21-04-00`

## Current gate

```txt
npm test
  -> tests/static-check.mjs
  -> tests/domain-smoke.mjs
```

The current tests do not import or exercise `createPerformanceBudget()` and do not observe renderer-control applications.

## Proposed additive gate

```txt
tests/performance-budget-state-machine.mjs
tests/adaptive-quality-transaction.mjs
```

## Required assertions

```txt
deterministic 0 -> 1 -> 2 -> 1 -> 0 transitions
exact dwell counts at each threshold
dead-band counter behavior
immutable target rows
level-0 pixel-ratio restoration
cloud/fog step restoration
fog-resolution restoration
duplicate target no-op
partial failure rollback
URL override policy admission
bounded JSON-safe transition journal
```

## Browser smoke extension

A future browser smoke should:

```txt
capture startup applied controls
inject or simulate slow frames
observe level 1 and level 2
inject or simulate fast frames
observe return to level 0
assert renderer.getPixelRatio() equals startup target
assert debug/host state matches observed controls
```

## Deployment decision

Do not block the current static Pages deployment on nonexistent fixtures. Add the fixture gate in the same implementation slice as adaptive-quality transaction authority, after runtime-session ownership exists.
