# Next Steps: MyCozyIsland

Last updated: `2026-07-11T12-50-35-04-00`

## Summary

Keep adaptive quality behind the existing runtime-session, Core World and render-commit prerequisites. When those exist, replace frame-count callbacks with one elapsed-time quality transaction that can prepare, commit, rollback, recover fully and prove the first visible frame.

## Plan ledger

**Goal:** implement a cadence-independent adaptive-quality authority without allowing presentation changes to bypass session or renderer ownership.

- [ ] Complete Runtime Session Lifecycle Authority.
- [ ] Complete Core World Reset / Re-prepare Authority.
- [ ] Complete pinned Core World focus transaction and materialization readiness.
- [ ] Complete Core World render commit and visible-frame proof.
- [ ] Define a versioned `QualityPolicy` with elapsed-time dwell values.
- [ ] Add monotonic performance samples with session, generation, frame and visibility identity.
- [ ] Replace 90/360 frame counters with elapsed-time windows.
- [ ] Add a typed quality transition command and admission result.
- [ ] Fence transitions during booting, quiescing, reset, stop and disposal.
- [ ] Build one immutable consumer plan per target level.
- [ ] Add prepare/commit/rollback adapters for cloud, fog, post and pixel ratio.
- [ ] Restore the startup pixel ratio when returning to level 0.
- [ ] Publish canonical effective quality state and fingerprint.
- [ ] Correlate one visible frame with the committed quality revision.
- [ ] Add cadence, full-recovery, partial-failure and lifecycle fixtures.

## Ordered implementation queue

```txt
1. Runtime Session Lifecycle Authority
2. Core World Reset / Re-prepare Authority
3. Pinned Core World Focus Transaction Authority
4. Live Materialization Readiness Commit Authority
5. Core World Render Commit Authority
6. Camera Rail Baseline Authority
7. Dynamic Environment Frame Authority
8. Adaptive Quality Transaction Authority
```

## Candidate adaptive-quality kits

```txt
quality-policy-schema-kit
performance-sample-envelope-kit
performance-window-timebase-kit
quality-level-decision-kit
quality-transition-command-kit
quality-transition-admission-kit
quality-session-fence-kit
quality-consumer-plan-kit
quality-consumer-prepare-kit
quality-consumer-commit-kit
quality-consumer-rollback-kit
effective-quality-state-kit
pixel-ratio-restore-kit
quality-transition-result-kit
quality-transition-journal-kit
quality-frame-ack-kit
quality-cadence-parity-fixture-kit
quality-full-recovery-fixture-kit
quality-partial-failure-fixture-kit
```

## Required policy shape

```txt
QualityPolicy {
  id
  revision
  targetFrameMs
  degradeThresholdMs
  recoverThresholdMs
  degradeDwellMs
  recoverDwellMs
  minimumLevelDwellMs
  visibilityPolicy
  levels[]
  fingerprint
}
```

## Required transition

```txt
admit QualityTransitionCommand
  -> verify session and renderer generations
  -> verify expected quality revision
  -> resolve exact target values
  -> prepare all consumers
  -> commit all consumers
  -> rollback all on any failure
  -> publish EffectiveQualityState
  -> render one frame
  -> publish QualityFrameReceipt
  -> return detached QualityTransitionResult
```

## Consumer plan

```txt
cloud step scale
fog step scale
fog resolution scale
pixel ratio cap scale
```

Future adaptive dimensions must not be added until they implement the same prepare/commit/rollback contract.

## Fixture matrix

```txt
30/60/90/120 Hz cadence parity
irregular frame schedule parity
hidden-tab policy
stalled-frame policy
minimum level dwell
0 -> 1 -> 2 degrade completeness
2 -> 1 -> 0 full recovery
pixel ratio returns to startup value
consumer prepare rejection
consumer commit failure rollback
stale session/revision rejection
duplicate transition idempotency
reset/stop/dispose fencing
WebGPU/WebGL2 parity
effective fingerprint stability
first visible frame acknowledgement
```

## Acceptance conditions

```txt
transition timing is based on elapsed evidence
all consumers share one quality revision
no partial quality state survives failure
level 0 equals original startup effective state
quality callbacks cannot mutate retired sessions
observations expose every effective consumer value
one visible frame acknowledges the committed revision
```
