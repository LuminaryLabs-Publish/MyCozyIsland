# Interaction audit: host-clock command/result map

**Timestamp:** `2026-07-15T05-00-28-04-00`  
**Status:** `host-clock-fixed-step-simulation-authority-audited`

## Summary

The current host passes an anonymous numeric delta into the engine. No command identity, expected revision, lifecycle classification, step result or matching frame receipt crosses the browser-to-simulation boundary.

## Plan ledger

**Goal:** replace anonymous per-callback delta admission with one typed, revisioned command/result interaction.

- [x] Identify the existing numeric-delta path.
- [x] Define command identity and admission predicates.
- [x] Define accepted and rejected result fields.
- [x] Bind domain consumers and presentation.
- [ ] Implement and fixture the protocol.

## Current interaction

```txt
requestAnimationFrame(now)
  -> Number dt
  -> adventure.tick(dt)
  -> engine.tick(dt)
  -> frame snapshot
  -> render
```

## Required interaction

```txt
HostClockFrameCommand
  commandId
  documentGeneration
  runtimeGeneration
  rafGeneration
  clockGeneration
  previousTimestamp
  currentTimestamp
  expectedSimulationRevision
  fixedStepSeconds
  maxStepsPerFrame
  maxAccumulatedSeconds

HostClockFrameResult
  commandId
  accepted
  classification
  elapsedWallSeconds
  admittedSeconds
  executedSteps
  residualSeconds
  discardedSeconds
  previousSimulationRevision
  simulationRevision
  interpolationAlpha
  reason

FirstClockAlignedFrameAck
  commandId
  simulationRevision
  renderRevision
  frameId
  backend
  interpolationAlpha
```

## Admission predicates

```txt
monotonic timestamp
matching document/runtime/RAF/clock generations
non-stale expected simulation revision
known lifecycle classification
valid fixed-step descriptor
bounded accumulated time
bounded step budget
non-duplicate command ID
```

## Rejection results

```txt
stale-generation
non-monotonic-timestamp
revision-conflict
duplicate-command
suspended
invalid-policy
budget-exceeded
superseded
```

Rejected commands must not advance scenario time, player state, Agriculture, Foraging or autosave state.

## Consumer binding

```txt
accepted fixed steps
  -> input frame admission
  -> scenario/environment clock
  -> player movement and stamina
  -> Agriculture growth
  -> Foraging respawn
  -> interaction and camera
  -> save policy
  -> render snapshot
```

No typed clock interaction currently exists.