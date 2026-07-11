# Interaction Audit: Frame Materialization Result Map

Timestamp: `2026-07-11T09-08-59-04-00`

## Summary

The route currently invokes materialization as an unowned helper call. The interaction boundary needs a typed command and result so stale work, failure, budget exhaustion, and readiness commits are observable and rejectable.

## Current call

```txt
domains.processMaterializationFrame({
  position: renderState.camera.position,
  cameraMode: renderState.camera.mode
})
```

Current returned fields:

```txt
frames
workSteps
processed[]
activeCells
completedCells
pendingCells
progress
```

## Missing command fields

```txt
commandId
sessionId
sessionEpoch
expectedWorldRevision
expectedFocusRevision
frameSequence
maxRows
maxMilliseconds
```

## Missing per-cell identity

```txt
cellGeneration
providerId
providerDescriptorVersion
materializationEpoch
attempt
sourceVersions
readinessRevision
```

## Missing result classes

```txt
accepted-advanced
accepted-completed
accepted-idle
budget-exhausted
rejected-session
rejected-world-revision
rejected-focus-revision
rejected-cell-generation
failed-retriable
failed-terminal
```

## Required map

```txt
animation frame
  -> MaterializationFrameCommand
  -> admission result
  -> provider-stage commands
  -> provider-stage results
  -> readiness-set validation
  -> CellReadinessRevision
  -> RendererCellPlan
  -> RendererCellCommitResult
  -> VisibleFrameAcknowledgement
```

## Observation contract

The global host should expose clone-safe bounded rows only:

```txt
lastCommand
lastResult
activeJobs
failedJobs
readinessRevisions
rendererCommits
visibleFrameAcks
journalTail
```

Do not expose mutable provider runtime stores or live Three/WebGPU objects as the proof surface.
