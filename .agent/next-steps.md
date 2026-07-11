# Next Steps: MyCozyIsland

Last updated: `2026-07-11T16-10-58-04-00`

## Summary

Keep the existing implementation order. Browser startup and runtime-session ownership remain prerequisites, while adaptive quality is the ninth bounded slice. When implemented, every transition must be derived from the immutable startup baseline, applied through typed consumer results, rolled back on partial failure and acknowledged by the visible frame.

## Plan ledger

**Goal:** convert the current callback-based adaptive quality path into a complete and reversible quality transaction without creating a second lifecycle, frame or renderer authority.

- [ ] Complete Browser Startup Admission and Failure Rollback Authority.
- [ ] Complete Runtime Session Lifecycle Authority.
- [ ] Reuse the runtime session generation for quality-command admission.
- [ ] Reuse committed-frame identity for quality visible-frame acknowledgement.
- [ ] Define a versioned `QualityPolicyDescriptor`.
- [ ] Replace frame-count thresholds with an elapsed-time policy or prove cadence equivalence.
- [ ] Add visibility and long-stall sample barriers.
- [ ] Define one immutable level-0 baseline from admitted startup quality.
- [ ] Define complete level-1 and level-2 candidate settings.
- [ ] Declare each quality field mutable, rebuild-required or startup-fixed.
- [ ] Add `QualityTransitionCommand`, `QualityTransitionPlan` and `QualityTransitionResult`.
- [ ] Assign transition and quality revision identities.
- [ ] Apply cloud, fog, post and renderer settings through typed consumer commands.
- [ ] Verify actual applied values after each consumer command.
- [ ] Roll back all already-applied consumers when any required consumer fails.
- [ ] Restore pixel ratio explicitly when recovering to level 0.
- [ ] Reject stale results from previous revisions or sessions.
- [ ] Publish a visible-frame receipt carrying the committed quality revision.
- [ ] Add cadence, recovery, failure, visibility, resize and browser fixtures.

## Ordered implementation queue

```txt
1. Browser Startup Admission + Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. Core World Reset / Re-prepare Authority
4. Pinned Core World Focus Transaction Authority
5. Live Materialization Readiness Commit Authority
6. Core World Render Commit Authority
7. Camera Rail Baseline Authority
8. Dynamic Environment Frame Authority
9. Adaptive Quality Transaction Authority
```

## Candidate quality kits

```txt
quality-policy-descriptor-kit
quality-sample-command-kit
visibility-sample-barrier-kit
quality-transition-id-kit
quality-revision-kit
quality-transition-admission-kit
quality-candidate-plan-kit
quality-consumer-capability-kit
quality-consumer-command-kit
quality-consumer-result-kit
quality-transition-commit-kit
quality-transition-rollback-kit
full-recovery-policy-kit
stale-quality-result-rejection-kit
quality-visible-frame-ack-kit
quality-observation-kit
quality-journal-kit
cadence-parity-fixture-kit
full-recovery-fixture-kit
partial-failure-rollback-fixture-kit
browser-quality-frame-smoke-kit
```

## Required policy model

```txt
QualityPolicyDescriptor
  id
  schemaVersion
  startupQualityFingerprint
  backendCapabilityFingerprint
  targetFrameMs
  degradeDurationMs
  recoverDurationMs
  hiddenSamplePolicy
  longStallPolicy
  levels
    0 -> full admitted baseline
    1 -> bounded reduction
    2 -> stronger bounded reduction
  consumerCapabilities
    cloudSteps -> mutable
    fogSteps -> mutable
    fogResolutionScale -> mutable
    pixelRatio -> mutable
    shadowMapSize -> rebuild-required or fixed
    terrainResolution -> rebuild-required or fixed
    vegetationScale -> rebuild-required or fixed
    oceanSegments -> rebuild-required or fixed
    cloudTextureSize -> rebuild-required or fixed
    postBlur -> mutable or fixed, explicitly declared
```

## Required transaction

```txt
receive normalized performance sample
  -> verify session, visibility and frame identity
  -> update elapsed-time pressure state
  -> decide no-op, degrade or recover
  -> create transitionId and qualityRevision
  -> derive complete candidate from immutable baseline
  -> send typed command to each participating consumer
  -> read back actual applied value
  -> classify accepted, clamped, rejected or failed
  -> rollback all accepted consumers on required failure
  -> commit level and revision only after all required consumers accept
  -> render and acknowledge first visible frame for that revision
  -> publish clone-safe observation and bounded journal
```

## Minimum consumer result

```txt
QualityConsumerResult
  transitionId
  qualityRevision
  consumerId
  requestedValue
  appliedValue
  previousValue
  status
    accepted
    accepted-clamped
    no-op
    rejected-stale
    rejected-capability
    failed
    rolled-back
  errorCode
  fingerprint
```

## Fixture matrix

```txt
baseline observation before any transition
30 Hz, 60 Hz and 120 Hz wall-time-equivalent sampling
level 0 -> level 1
level 1 -> level 2
level 2 -> level 1
level 1 -> level 0
full baseline restoration, including pixel ratio
partial failure at cloud consumer
partial failure at fog consumer
partial failure at post consumer
partial failure at renderer pixel-ratio consumer
rollback order and final fingerprint
hidden tab and resumed tab
100 ms and multi-second stalls
resize during degraded state
resize during recovery
stale transition completion
rapid opposite-direction decisions
WebGPU capability set
WebGL2 capability set
first visible frame revision parity
```

## Acceptance conditions

```txt
performance level and applied renderer state cannot disagree
level 0 always restores every mutable baseline field
transition timing is defined in elapsed time, not display frame count
hidden or stalled samples have a classified policy
partial transitions never remain visible as committed state
consumer clamping is observable
stale revisions cannot overwrite newer quality state
startup-fixed fields are explicitly classified
one visible frame proves the committed revision
public state exposes applied values without raw renderer authority
```

## Next safe ledge

```txt
MyCozyIsland Adaptive Quality Transaction Authority
+ Cadence Parity / Full Recovery / Partial Failure / Visible-Frame Fixture Gate
```

Do not implement this slice before startup and runtime-session ownership are available. Reuse those identities and the committed-frame proof path.