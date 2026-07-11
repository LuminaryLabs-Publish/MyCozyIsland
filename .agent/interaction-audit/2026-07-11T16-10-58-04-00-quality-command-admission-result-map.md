# Interaction Audit: Quality Command Admission and Result Map

Timestamp: `2026-07-11T16-10-58-04-00`

## Summary

Adaptive quality currently has no command boundary. The performance budget calls the host callback directly, and the host mutates renderer consumers without admission, identity or results.

## Plan ledger

**Goal:** define the command/result boundary required for stale-safe, idempotent and reversible quality transitions.

- [x] Identify the current callback ingress.
- [x] Identify missing lifecycle and revision admission.
- [x] Define command, plan and result shapes.
- [x] Define stale, duplicate and failure handling.

## Current ingress

```txt
performanceBudget.sample(frameMs)
  -> internal threshold reached
  -> onDegrade({ level }) or onRecover({ level })
  -> applyPerformanceLevel(level)
  -> untyped direct mutations
```

## Target ingress

```txt
QualitySampleCommand
  sessionId
  generation
  renderFrameId
  monotonicTime
  frameDurationMs
  visibilityState

  -> lifecycle admission
  -> sample normalization
  -> policy evaluation
  -> optional QualityTransitionCommand
```

## Transition command

```txt
QualityTransitionCommand
  commandId
  transitionId
  sessionId
  generation
  expectedRevision
  requestedLevel
  cause
  policyFingerprint
  sourceFrameId
```

## Admission classifications

```txt
accepted
no-op-already-at-level
rejected-stale-session
rejected-stale-generation
rejected-stale-revision
rejected-hidden
rejected-transition-pending
rejected-capability
```

## Result map

```txt
accepted
  -> candidate plan
  -> consumer commands
  -> all required accepted
  -> commit revision
  -> visible-frame receipt

consumer failure
  -> stop remaining application
  -> rollback accepted consumers
  -> failed/rolled-back result

stale completion
  -> reject result
  -> preserve current revision

duplicate command
  -> return prior immutable result
```

## Required public observation

```txt
currentLevel
currentRevision
pendingTransitionId
lastResultStatus
appliedConsumerValues
lastVisibleFrameId
qualityFingerprint
```

Raw renderer, material, pass and uniform authority should not be exposed through the public observation.

## Validation status

Documentation only. No command, admission or result implementation exists yet.