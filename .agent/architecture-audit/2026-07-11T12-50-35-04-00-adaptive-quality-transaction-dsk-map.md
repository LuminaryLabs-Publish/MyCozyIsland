# Architecture Audit: Adaptive Quality Transaction DSK Map

Timestamp: `2026-07-11T12-50-35-04-00`

## Summary

The current adaptive-quality path is a callback chain, not a domain transaction. It needs one authority that converts elapsed-time performance evidence into an admitted, reversible, fingerprinted quality transition.

## Current ownership

```txt
render-quality-domain-kit
  -> chooses immutable startup quality

webgpu-performance-budget-kit
  -> samples frameMs
  -> maintains EMA and counters
  -> calls onDegrade/onRecover

main-cloudform route callback
  -> maps level to scales
  -> mutates four consumers directly

cloud/fog/post/renderer consumers
  -> apply local mutation
  -> return no prepare/commit/rollback receipt
```

## Required parent domain

```txt
cozy-island-adaptive-quality-authority-domain
```

## DSK map

```txt
quality-policy-schema-kit
  owns levels, targets, hysteresis, dwell times and consumer values

performance-sample-envelope-kit
  owns sessionId, generation, frameId, monotonic time, duration and visibility

performance-window-timebase-kit
  converts samples into elapsed-time windows independent of refresh rate

quality-level-decision-kit
  emits stay, degrade or recover decisions with evidence

quality-transition-command-kit
  owns commandId, fromLevel, toLevel, expected revision and reason

quality-transition-admission-kit
  rejects stale session, phase, revision and duplicate work

quality-session-fence-kit
  blocks transitions during quiescing, reset, stop and disposal

quality-consumer-plan-kit
  resolves exact cloud, fog, post and pixel-ratio target values

quality-consumer-prepare-kit
  checks every consumer before mutation

quality-consumer-commit-kit
  applies the complete candidate once

quality-consumer-rollback-kit
  restores the previous effective state after any failure

effective-quality-state-kit
  publishes canonical applied values, revision and fingerprint

pixel-ratio-restore-kit
  guarantees level-zero restoration of the startup DPR cap

quality-transition-result-kit
  returns accepted, unchanged, stale, rejected, rolled-back or committed

quality-transition-journal-kit
  stores bounded evidence and consumer receipts

quality-frame-ack-kit
  proves the first visible frame consumed the committed revision

quality-cadence-parity-fixture-kit
  proves equivalent elapsed evidence across 30/60/90/120 Hz

quality-full-recovery-fixture-kit
  proves level 0 -> 1 -> 2 -> 1 -> 0 restores every consumer

quality-partial-failure-fixture-kit
  proves one failing consumer leaves no partial state
```

## Required state

```txt
QualityPolicy
QualityRevision
EffectiveQualityState
PerformanceWindow
QualityTransitionCommand
QualityConsumerPlan
QualityConsumerReceipt[]
QualityTransitionResult
QualityFrameReceipt
```

## Authority rule

A level is not committed because the budget counter changed. It is committed only after all consumers apply the same revision and one rendered frame acknowledges that revision.
