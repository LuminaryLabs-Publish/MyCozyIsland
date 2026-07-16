# Interaction audit: save compatibility command and result map

**Timestamp:** `2026-07-16T05-41-12-04-00`

## Summary

Restore currently returns one generic success result after ordered participant loading. It does not expose the compatibility decision, migration graph, world rebuild, topology rebind or first matching frame as separately inspectable results.

## Plan ledger

**Goal:** define stable command and result identities from save discovery through playable restored state.

- [x] Map current save calls.
- [x] Map current result shapes.
- [x] Define compatibility and restore generations.
- [x] Define rejection and fallback classes.
- [ ] Implement command/result surfaces and fixtures.

## Current result map

```txt
loadSave
  -> { ok:false, reason:"empty" }
  -> { ok:false, error }
  -> cozySave.restore(snapshot)

cozySave.restore
  -> { ok:true, checksum, schema, migrated }
  -> { ok:false, rolledBack:true, error }
```

The successful result does not state:

```txt
exact compatibility versus tolerated drift
world-generation identity
world-config or content digest
participant schema compatibility
migration steps executed
model rebuild or topology rebind
fallback selection
restore generation
first visible frame
```

## Required command/result map

```txt
SaveDiscoveredCommand
  -> SaveEnvelopeObservationResult

SaveCompatibilityAdmissionCommand
  -> ExactCompatibilityResult
  -> MigrationRequiredResult
  -> WorldRebuildRequiredResult
  -> IncompatibleSaveResult
  -> CorruptSaveResult

RestoreGenerationCommand
  -> RestoreGenerationResult
  -> RestoreRollbackResult
  -> RestoreAmbiguousResult

IncompatibleSaveDispositionCommand
  -> QuarantineResult
  -> NewIslandFallbackResult
  -> UserDecisionRequiredResult

RestoredFrameProjectionCommand
  -> RestoredFrameProjectionResult
  -> FirstRestoredWorldFrameAck
```

Every result must cite the save checksum, release manifest, expected participant fingerprints and restore generation. Duplicate or stale commands must return the prior terminal result without mutating participants again.