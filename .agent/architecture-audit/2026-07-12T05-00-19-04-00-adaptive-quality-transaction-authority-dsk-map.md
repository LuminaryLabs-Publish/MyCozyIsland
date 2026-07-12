# Architecture Audit: Adaptive Quality Transaction Authority DSK Map

Timestamp: `2026-07-12T05-00-19-04-00`

## Parent domain

```txt
cozy-island-adaptive-quality-transaction-authority-domain
```

## Intent

Own the full path from a valid frame-cost observation through policy evaluation, accepted quality transition, symmetric renderer mutation, diagnostic projection, and visible-frame proof.

## Existing boundaries

```txt
render-quality-domain-kit
  owns immutable startup tier and base resource settings

webgpu-performance-budget-kit
  owns moving average, frame counters and mutable level

host applyPerformanceLevel callback
  directly mutates renderer and three render subsystems

debug-overlay-host-kit
  projects base tier and selected runtime metrics
```

These boundaries do not form one transaction and expose no shared revision.

## Proposed DSK composition

```txt
cozy-island-adaptive-quality-transaction-authority-domain
  -> quality-policy-id-kit
  -> quality-policy-descriptor-kit
  -> quality-override-policy-kit
  -> frame-cost-sample-kit
  -> frame-cost-source-kit
  -> frame-cost-validity-kit
  -> quality-observation-window-kit
  -> quality-transition-command-kit
  -> quality-transition-id-kit
  -> quality-transition-revision-kit
  -> quality-transition-admission-kit
  -> quality-transition-result-kit
  -> quality-dwell-time-kit
  -> quality-consumer-plan-kit
  -> quality-consumer-receipt-kit
  -> pixel-ratio-quality-adapter-kit
  -> volumetric-quality-adapter-kit
  -> immutable-quality-resource-policy-kit
  -> quality-resize-transaction-kit
  -> quality-visibility-suspension-kit
  -> quality-recovery-transaction-kit
  -> quality-frame-commit-kit
  -> quality-observation-kit
  -> quality-transition-journal-kit
  -> stale-quality-transition-rejection-kit
  -> adaptive-quality-cadence-fixture-kit
  -> pixel-ratio-recovery-fixture-kit
  -> quality-override-policy-fixture-kit
  -> quality-visible-frame-smoke-kit
```

## Ownership rules

```txt
base quality policy
  -> immutable descriptor for startup-only allocations

active quality state
  -> revisioned mutable descriptor for runtime consumers

measurement
  -> typed and validity-classified; no ambient RAF number enters policy directly

transition
  -> admitted against expected session, renderer generation and quality revision

consumer application
  -> planned before mutation; every required adapter returns a receipt

commit
  -> active revision changes only after all required receipts succeed

render proof
  -> first visible frame cites the committed quality revision
```

## Required result model

```txt
QualityTransitionResult {
  transitionId
  commandId
  previousRevision
  committedRevision
  previousLevel
  committedLevel
  reason
  dwellMs
  policyId
  sampleWindowFingerprint
  consumerReceipts[]
  accepted
  rejectionReason
}
```

## Dependency order

```txt
Runtime Session Lifecycle Authority
  -> Render Layer Graph / Physical Resource Authority
  -> Core World Render Commit Authority
  -> Dynamic Environment Frame Authority
  -> Adaptive Quality Transaction Authority
```

## Proof boundary

The domain is not complete until cadence, full recovery, override policy, hidden-tab, resize, partial failure, backend parity, diagnostics, and first-visible-frame fixtures pass.