# Render Audit: Agriculture Transaction Frame Provenance Gap

Timestamp: `2026-07-12T12-50-46-04-00`

## Current projection

`cozy-render-snapshot-domain-kit` reads World, Scenario, Player, Inventory, Agriculture, Foraging, Interaction and Save directly. Its composite revision contains participant revisions, but no product transaction ID, transaction phase, recovery generation, child-record parity or event-publication receipt.

```txt
interaction settlement
  -> Inventory may mutate
  -> Agriculture may mutate and emit event
  -> parent ledger may record
  -> frame snapshot reads current owners
  -> WebGPU/WebGL2 renderer presents descriptors
```

## Gap

If settlement fails after Agriculture commit, snapshot reload can restore owner state while queued events and ECS journal entries still describe the candidate. Render snapshots can show the restored predecessor, while observers consume a candidate Agriculture event from the same tick. No shared receipt proves that Inventory, Agriculture, interaction result, HUD and visible crop mesh came from one committed transaction.

## Missing fields

```txt
transactionId
transactionGeneration
transactionPhase
transactionRevision
inventoryChildRecordId
agricultureChildRecordId
parentRecordId
resourceDeltaFingerprint
agriculturePlanId
recoveryResultId
eventPublicationRevision
frameId
firstVisibleFrameReceipt
```

## Required render admission

```txt
committed AgricultureTransactionResult
  -> verify participant and ledger parity
  -> publish committed transaction revision
  -> build immutable frame snapshot
  -> project crop descriptors and HUD result
  -> render WebGPU/WebGL2 frame
  -> acknowledge first visible frame with matching revision
```

Rejected, rolled-back or indeterminate candidates must not be presented as successful farm actions. Backend parity proof must confirm WebGPU and WebGL2 present the same transaction revision and crop descriptor generation.