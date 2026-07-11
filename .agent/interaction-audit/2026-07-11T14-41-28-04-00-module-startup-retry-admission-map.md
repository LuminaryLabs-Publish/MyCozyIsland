# Interaction Audit: Module, Startup and Retry Admission Map

Timestamp: `2026-07-11T14-41-28-04-00`

## Summary

The route has no typed admission boundary between browser module loading, startup stages, failure projection, retry and the first accepted player input. The current global catch only covers failures after module evaluation succeeds.

## Plan ledger

**Goal:** define exactly which source, startup and interaction events are admitted in each phase.

- [x] Map module load and evaluation boundaries.
- [x] Map startup stage transitions.
- [x] Map failure, retry and input admission.
- [x] Define stale-generation rejection.

## Admission phases

```txt
UNINITIALIZED
MODULE_LOADING
MODULE_ADMITTED
STARTING
ROLLING_BACK
FAILED
READY
ACTIVE
STOPPING
DISPOSED
```

## Command map

```txt
LoadModulesCommand
  admitted: UNINITIALIZED
  rejected: all later phases unless new page generation

StartupCommand
  admitted: MODULE_ADMITTED
  rejected: duplicate STARTING or terminal DISPOSED

RetryStartupCommand
  admitted: FAILED after rollback completion
  creates: new startup generation

InputCommand
  admitted: ACTIVE with matching startup/session generation
  rejected: loading, failed, stopping or disposed

StopCommand
  admitted: STARTING, READY or ACTIVE
  result: rollback/disposal transaction
```

## Current gaps

```txt
module load result: absent
startup phase source of truth: absent
retry command: absent
retry result: absent
startup generation on callbacks: absent
input admission result: absent
stale-generation rejection: absent
```

## Required result reasons

```txt
MODULE_FETCH_FAILED
MODULE_PARSE_FAILED
MODULE_EVALUATION_FAILED
MISSING_EXPORT
UNSUPPORTED_BACKEND
RENDERER_INIT_FAILED
WORLD_PREPARE_FAILED
RESOURCE_PREPARE_FAILED
FIRST_FRAME_FAILED
STALE_GENERATION
DUPLICATE_COMMAND
NOT_READY
DISPOSED
```

## Observation contract

Expose clone-safe rows only:

```txt
phase
startupId
startupGeneration
currentStage
admittedBackend
qualityFingerprint
completedStages[]
failedStage
failureCode
rollbackComplete
retryAllowed
firstFrameId
```

Do not expose raw renderer, scene, camera, Core World engine or consumer objects as startup observations.