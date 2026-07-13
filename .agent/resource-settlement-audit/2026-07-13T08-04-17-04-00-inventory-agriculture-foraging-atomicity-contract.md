# Resource-settlement audit: Inventory, Agriculture and Foraging atomicity contract

**Timestamp:** `2026-07-13T08-04-17-04-00`

## Summary

Core Transaction Ledger correctly provides repeat-safe operation records, but it is not a multi-participant transaction manager. MyCozyIsland currently relies on nested ledger calls, sequential writes and snapshot restoration to approximate atomic settlement across Inventory, Agriculture and Foraging.

## Plan ledger

**Goal:** specify the exact atomicity and recovery contract required before cross-domain settlement can be considered durable and repeat-safe.

- [x] Inspect the pinned Core Transaction Ledger implementation.
- [x] Inspect official Agriculture planning and commit behavior.
- [x] Inspect product Agriculture settlement and recovery.
- [x] Inspect Foraging and nested Inventory mutations.
- [x] Inspect save and frame projection ordering.
- [x] Define mandatory recovery classifications and fixtures.
- [ ] Implement the contract.

## Core Transaction Ledger boundary

`applyOnce()` performs:

```txt
check existing record
  -> execute callback
  -> record callback result
```

It owns idempotency for the named operation. It does not:

```txt
prepare multiple participant candidates
lock expected participant revisions
buffer domain events
atomically publish several states
roll back participant writes
verify nested operation parity
classify partial attempts
```

## Agriculture settlement boundary

Current successful order:

```txt
1. capture Inventory, Agriculture and ledger snapshots
2. Inventory.applyChanges
3. Agriculture.commitPlan
4. Agriculture state write and event emission
5. aggregate cozy-agriculture-actions record
```

Current failure handling restores snapshots in a catch block. This is insufficient as an atomicity proof because:

```txt
participant writes already occurred
Agriculture events may already have been emitted
observers may have read intermediate state
rollback loads increment or replace participant revisions
rollback failure is converted to console output rather than a terminal aggregate result
```

## Agriculture recovery boundary

Current recovery condition:

```txt
aggregate record absent
inner Agriculture record present
  -> record aggregate success from Agriculture result
```

Missing evidence:

```txt
matching Inventory operation exists
Inventory result was successful
current Inventory balance matches the planned resource changes
current plot state matches the Agriculture result
participant fingerprints share one predecessor generation
save and frame projections did not adopt partial state
```

## Foraging settlement boundary

Current order:

```txt
outer Foraging applyOnce callback
  -> Inventory.add coconut
  -> optional Inventory.add coconut-sprout
  -> Foraging node depletion write
return success
outer Foraging record
```

The Inventory results are ignored. No rollback or recovery contract joins the nested operations to the node transition.

## Required atomicity contract

```txt
prepare phase
  all affected participants validate expected revisions and return detached candidates
  no state, ledger record or event is published

commit phase
  aggregate authority validates every candidate fingerprint
  participant state and aggregate ledger evidence adopt under one settlement generation
  event buffer releases only after successful adoption

failure phase
  no participant successor is published
  terminal rejection includes participant prepare evidence

recovery phase
  inspect aggregate and participant records plus current-state fingerprints
  converge only when evidence is complete and non-divergent
  otherwise quarantine with zero additional mutation
```

## Mandatory participant receipts

```txt
InventorySettlementReceipt
  predecessor revision
  successor revision
  exact item deltas
  balance fingerprint
  nested ledger record

AgricultureSettlementReceipt
  plot predecessor revision
  plot successor revision
  plan ID
  event list
  state fingerprint

ForagingSettlementReceipt
  node predecessor revision
  node successor revision
  collected resources
  state fingerprint

AggregateSettlementReceipt
  SettlementId
  generation
  participant receipt fingerprints
  terminal status
```

## Save consistency rule

Save capture must record only terminal committed settlement generations. Restore must reject or quarantine a payload where aggregate settlement records and participant state disagree.

## Mandatory fixtures

```txt
failure before first participant adoption
failure between Inventory and Agriculture adoption
failure after participant adoption but before aggregate record
Agriculture event observer during attempted settlement
Foraging first Inventory add failure
Foraging optional sprout add failure
participant-only retry
aggregate-only retry
divergent participant fingerprint
save captured at every injected boundary
restore partial settlement payload
duplicate command after successful recovery
first visible frame after commit or recovery
```

## Validation boundary

Documentation only. No transactional primitive or fixture was added.
