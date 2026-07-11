# Architecture Audit: Adaptive Quality Transaction DSK Map

Timestamp: `2026-07-11T16-10-58-04-00`

## Summary

Adaptive quality is currently split between an immutable startup descriptor, a mutable frame budget and direct host callbacks. The architecture needs one parent domain that owns transition identity, candidate derivation, consumer capability, application, rollback, commit and visible-frame proof.

## Plan ledger

**Goal:** define the DSK composition and dependency order without changing runtime code.

- [x] Identify current descriptor, budget and consumer boundaries.
- [x] Identify lifecycle and frame prerequisites.
- [x] Define atomic kits.
- [x] Define transaction ordering.
- [x] Define typed results and failure states.
- [x] Preserve the existing 50-kit catalog as source truth.

## Current composition

```txt
render-quality-domain-kit
  -> choose immutable startup tier

webgpu-performance-budget-kit
  -> sample frameMs
  -> mutate internal level
  -> invoke callback

adaptive-quality-callback-host
  -> cloudRenderer.setStepScale
  -> fogRenderer.setStepScale
  -> postPipeline.setFogResolutionScale
  -> renderer.setPixelRatio when level > 0
```

## Missing parent domain

```txt
cozy-island-adaptive-quality-transaction-authority-domain
```

## Candidate kit graph

```txt
policy
  quality-policy-descriptor-kit
  quality-consumer-capability-kit
  full-recovery-policy-kit

admission and identity
  quality-sample-command-kit
  visibility-sample-barrier-kit
  quality-transition-id-kit
  quality-revision-kit
  quality-transition-admission-kit
  stale-quality-result-rejection-kit

planning
  quality-candidate-plan-kit

execution
  quality-consumer-command-kit
  quality-consumer-result-kit
  quality-transition-commit-kit
  quality-transition-rollback-kit

observation
  quality-visible-frame-ack-kit
  quality-observation-kit
  quality-journal-kit

proof
  cadence-parity-fixture-kit
  full-recovery-fixture-kit
  partial-failure-rollback-fixture-kit
  browser-quality-frame-smoke-kit
```

## Dependency map

```txt
Browser Startup Authority
  -> admitted startup quality fingerprint
  -> backend capability fingerprint

Runtime Session Authority
  -> sessionId
  -> generation
  -> visibility/lifecycle admission

Committed Frame Authority
  -> renderFrameId
  -> visible-frame acknowledgement

Adaptive Quality Authority
  -> reuses all three
  -> does not create parallel session or frame identities
```

## Required state

```txt
QualityAuthorityState
  sessionId
  sessionGeneration
  policyId
  startupQualityFingerprint
  backendCapabilityFingerprint
  currentLevel
  currentRevision
  pendingTransition
  appliedConsumerState
  pressureWindow
  visibilityState
  lastCommittedFrameId
```

## Required transition result

```txt
QualityTransitionResult
  transitionId
  previousRevision
  nextRevision
  previousLevel
  requestedLevel
  committedLevel
  status
    no-op
    committed
    rolled-back
    rejected-stale
    rejected-lifecycle
    failed
  consumerResults
  rollbackResults
  qualityFingerprint
  errorCode
```

## Transaction ordering

```txt
sample admission
  -> policy evaluation
  -> transition identity
  -> complete candidate plan
  -> consumer capability validation
  -> ordered consumer application
  -> typed readback
  -> rollback on required failure
  -> atomic revision commit
  -> render
  -> visible-frame acknowledgement
  -> observation and journal
```

## Invariants

```txt
one revision maps to one complete applied consumer state
level 0 maps to the immutable admitted baseline
no level commit occurs before required consumer acceptance
rollback restores the previous fingerprint
stale session or revision work cannot commit
diagnostics never claim a revision before its visible frame
```

## Implementation order

This domain remains after startup, runtime-session, Core World rendering, camera and dynamic-environment authority. It should extend existing kits before introducing overlapping render-quality models.