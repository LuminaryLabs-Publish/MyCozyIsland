# Gameplay audit: preload freeze/resume and entry loop

**Timestamp:** `2026-07-13T12-38-45-04-00`

## Summary

The bridge freezes simulation by monkey-patching engine methods after Core Startup becomes playable, then restores them and rewrites only the player intro snapshot on entry. The operation has no simulation-boundary receipt, state revision, rollback, or post-resume frame result.

## Plan ledger

**Goal:** preserve one constructed adventure while making preload quiescence and player entry deterministic and observable.

- [x] Trace adventure tick ownership.
- [x] Confirm `adventure.tick()` dynamically calls `engine.tick()`.
- [x] Trace bridge method replacement and restoration.
- [x] Trace player intro reset and input clear.
- [x] Identify state and presentation work that continues while frozen.
- [ ] Replace monkey-patching with explicit simulation and presentation leases.

## Current loop

```txt
Core Startup enters playable
  -> bridge polling detects descriptor.playable
  -> engine.tick = no-op
  -> engine.step = no-op
  -> renderer loop continues
  -> menu reports ready

Play
  -> restore original tick/step
  -> load player snapshot with mode=intro and introProgress=0.76
  -> clear input
  -> focus game surfaces
  -> send entered
```

## Gaps

```txt
SimulationQuiescenceLease: absent
QuiescenceBoundaryTick: absent
StateRevisionBeforeFreeze: absent
StateRevisionAfterResume: absent
EntryGeneration: absent
InputGenerationReset: absent
Scenario/clock entry policy: implicit
Autosave policy while hidden: implicit
Rollback on entry failure: absent
PostResumeFrameResult: absent
```

The bridge polls every 120 ms, so simulation can advance between playable entry and method replacement. While frozen, the render loop still reads snapshots, advances renderer-local animation, samples performance, renders, and checks autosave fingerprints.

## Required behavior

```txt
PreloadReadyCommand
  -> acquire simulation quiescence at a tick boundary
  -> acquire or classify presentation quiescence
  -> publish immutable ready snapshot and receipts

PlayerEntryCommand
  -> validate ready generation
  -> reset authored entry state atomically
  -> clear predecessor input generation
  -> release simulation lease at one boundary
  -> render and acknowledge first successor frame
  -> publish terminal entry result
```

## Validation gap

No executable fixture measures ticks before freeze, proves zero simulation advancement during menu wait, verifies exact resume ordering, or correlates the entry result with visible gameplay.