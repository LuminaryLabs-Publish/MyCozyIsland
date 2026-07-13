# Interaction audit: resource plan, participant and result map

**Timestamp:** `2026-07-13T08-04-17-04-00`

## Summary

Contextual interaction generates stable operation IDs, but Agriculture and Foraging return different nested result shapes and expose no common participant receipt. The interaction state therefore cannot distinguish a fully committed settlement from participant-only, recovered, rolled-back or quarantined work.

## Plan ledger

**Goal:** normalize every resource-changing interaction into one terminal result with participant evidence.

- [x] Trace operation-ID construction.
- [x] Compare Agriculture and Foraging return shapes.
- [x] Map nested ledger operations.
- [x] Define a normalized result and zero-mutation rejection paths.
- [ ] Implement command/result adapters.

## Current operation identity

```txt
interaction:{targetKind}:{targetId}:r{targetRevision}:f{inputFrameIndex}:{selectedCrop}
```

This identity is useful for repeat safety but does not bind expected Inventory revision, aggregate ledger sequence, settlement generation or participant fingerprints.

## Current Agriculture result map

```txt
settleCozyAgricultureInteraction
  -> existing aggregate record
     { applied:false, duplicate:true, result, record }
  -> recovered inner Agriculture record
     { applied, duplicate, record, result, recovered:true }
  -> validation rejection
     { applied:false, duplicate:false, result:{ok:false,...} }
  -> success
     { applied, duplicate, record, result }
  -> catch rollback
     { applied:false, duplicate:false, rolledBack:true, result:{ok:false,...} }
```

None of these shapes contains explicit Inventory and Agriculture commit receipts.

## Current Foraging result map

```txt
coreTransactionLedger.applyOnce("cozy-foraging", operationId, callback)
  -> callback returns { ok:true, action:"forage", ... }
  -> applyOnce wraps as { applied, duplicate, record, result }
```

The wrapper does not include receipts for the nested coconut and optional sprout Inventory operations.

## Required normalized result

```txt
ResourceSettlementResult {
  settlementId
  operationId
  generation
  action
  target
  status: committed | duplicate | rejected | recovered | rolled-back | quarantined
  reason?
  expectedRevisions
  actualPredecessorRevisions
  successorRevisions
  participantReceipts: {
    inventory?
    agriculture?
    foraging?
    aggregateLedger
  }
  bufferedEventsReleased
  saveEligibility
  frameAck?
}
```

## Required result flow

```txt
input frame
  -> ResourceSettlementCommand
  -> participant prepare results
  -> aggregate commit decision
  -> ResourceSettlementResult
  -> InteractionState.lastAction references result ID
  -> HUD projects status from the terminal result
  -> render frame carries settlement generation
```

## Required rejection reasons

```txt
unknown-target
unknown-item
missing-resource
stale-inventory
stale-plot
stale-node
stale-ledger
participant-prepare-failed
participant-commit-failed
duplicate-settlement
partial-attempt-detected
recovery-evidence-divergent
settlement-quarantined
```

Every rejected result must prove zero mutation. Every recovered result must identify the evidence used.

## Validation boundary

Documentation only. Interaction behavior is unchanged.
