# Interaction Audit: Quality Transition Admission and Result Map

Timestamp: `2026-07-11T12-50-35-04-00`

## Current path

```txt
frame sample
  -> performanceBudget.sample
  -> internal level mutation
  -> onDegrade/onRecover callback
  -> direct consumer mutation
  -> no command
  -> no admission
  -> no result
```

## Missing admission checks

```txt
session is running
session generation matches
renderer generation matches
quality revision matches
sample is monotonic
visibility policy admits sample
transition is not duplicate
all consumers support target values
no reset/stop/dispose is active
```

## Required result

```txt
QualityTransitionResult {
  commandId
  sessionId
  sessionGeneration
  fromRevision
  toRevision
  fromLevel
  toLevel
  status
  decisionEvidence
  consumerReceipts[]
  rollbackReceipts[]
  effectiveState
  qualityFingerprint
  committedFrameId
  failures[]
}
```

## Status values

```txt
unchanged
committed
rejected-phase
rejected-stale
rejected-duplicate
unsupported
rolled-back
failed
```

Direct callbacks must not be treated as successful transitions. Success requires one typed result after consumer commit and visible-frame acknowledgement.
