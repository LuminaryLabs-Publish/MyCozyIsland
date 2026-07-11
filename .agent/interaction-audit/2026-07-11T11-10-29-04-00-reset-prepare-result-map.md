# Interaction Audit: Reset / Prepare Result Map

Timestamp: `2026-07-11T11-10-29-04-00`

## Summary

The product exposes imperative `prepare()`, `reset()`, and `dispose()` methods without command identity, lifecycle admission, or typed results. Their current return shapes cannot tell a host whether the wrapper is reusable, blocked, or terminally disposed.

## Plan ledger

**Goal:** define explicit command/result contracts for reset, recreate, prepare, and dispose.

- [x] Map current method calls and return values.
- [x] Identify ambiguous Boolean/void outcomes.
- [x] Define admission and result states.

## Current map

```txt
prepare()
  already prepared -> cached worldSnapshot
  first prepare -> commitFocus result
  after reset -> attempts commitFocus with missing definition

updateWorldFocus()
  false -> not prepared or no focus commit
  true  -> focus commit attempted

reset()
  -> void

dispose()
  -> void
```

## Required commands

```txt
PrepareWorldCommand
ResetWorldCommand
DisposeWorldCommand
```

Common identity:

```txt
commandId
sessionId
sessionEpoch
worldId
expectedWorldGeneration
requestedAtSequence
```

## Required results

```txt
PrepareWorldResult
  prepared | already-prepared | rejected | failed

WorldRecoveryResult
  reset-complete | recreated-and-prepared | rollback-complete | blocked | failed

DisposeWorldResult
  disposed | already-disposed | failed
```

Every result should include:

```txt
priorWorldGeneration
nextWorldGeneration
activeCellCount
providerCellCounts
releasedCells
providerResults
materializerResult
definitionResult
diagnostics
beforeFingerprint
afterFingerprint
```

## Admission rules

Reject when:

- session or epoch is stale;
- expected generation differs;
- startup, focus, materialization, or renderer commit is in an unsafe phase;
- terminal disposal already committed;
- command identity is duplicated with conflicting payload;
- definition/provider checkpoint is invalid.

## Host projection

The global diagnostic host should expose detached summaries only. It must not expose mutable engine/provider objects as the authority surface for recovery.
