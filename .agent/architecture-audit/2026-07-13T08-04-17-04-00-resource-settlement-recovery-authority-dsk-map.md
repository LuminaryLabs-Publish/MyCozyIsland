# Architecture audit: resource settlement and recovery authority DSK map

**Timestamp:** `2026-07-13T08-04-17-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

## Summary

Inventory, Agriculture, Foraging and Core Transaction Ledger each own valid bounded state, but the product settlement path composes them through sequential writes. The missing architecture is a coordinating DSK that owns cross-domain preparation, atomic adoption, event release, recovery evidence and terminal results without taking over the participant domains.

## Plan ledger

**Goal:** retain bounded domain ownership while introducing one explicit authority for multi-participant resource settlement.

- [x] Map current participant ownership.
- [x] Map current write order and nested ledger operations.
- [x] Separate participant services from coordinating services.
- [x] Define the parent authority and planned kits.
- [x] Define command, result and recovery contracts.
- [ ] Implement and validate the authority.

## Existing bounded ownership

```txt
Core Transaction Ledger
  owns stable ledger and operation identity, repeat detection and portable records

Inventory
  owns item balances, seed selection and inventory snapshots

Agriculture
  owns plots, soil, crop lifecycle, plans, commits, events and snapshots

Foraging
  owns wild-node availability, collection count, respawn and snapshots

Interaction
  owns nearest-target selection, prompt and last action projection

Save
  owns portable aggregate capture, checksum, migration, restore and reset orchestration

Render Snapshot
  owns renderer-neutral projection of participant state
```

## Current dependency graph

```txt
Interaction
  -> Inventory
  -> Agriculture
  -> Foraging
  -> Core Transaction Ledger

Agriculture product settlement
  -> Inventory.applyChanges
  -> Agriculture.commitPlan
  -> aggregate ledger.record

Foraging settlement
  -> Inventory.add
  -> optional Inventory.add
  -> Foraging node write
  -> outer applyOnce record
```

## Missing parent authority

```txt
cozy-island-resource-settlement-recovery-authority-domain
```

This authority owns only:

```txt
SettlementId and generation
expected participant revisions
participant prepare/adopt coordination
aggregate commit decision
buffered event release
partial-attempt classification
recovery evidence and convergence result
participant receipts
save eligibility
visible settlement-frame acknowledgement
```

It does not own:

```txt
item definitions or balances
plot and crop rules
forage-node rules
input mapping
target selection
renderer objects
storage transport
```

## Planned DSK family

```txt
cozy-island-resource-settlement-recovery-authority-domain
├─ settlement-id-kit
├─ settlement-generation-kit
├─ resource-settlement-command-kit
├─ expected-participant-revision-kit
├─ inventory-settlement-candidate-kit
├─ agriculture-settlement-candidate-kit
├─ foraging-settlement-candidate-kit
├─ resource-balance-preflight-kit
├─ transaction-ledger-predecessor-kit
├─ participant-prepare-kit
├─ participant-event-buffer-kit
├─ participant-commit-kit
├─ participant-rollback-kit
├─ duplicate-settlement-rejection-kit
├─ stale-participant-rejection-kit
├─ partial-ledger-recovery-kit
├─ recovery-evidence-kit
├─ inventory-settlement-receipt-kit
├─ agriculture-settlement-receipt-kit
├─ foraging-settlement-receipt-kit
├─ aggregate-ledger-record-kit
├─ resource-settlement-result-kit
├─ settlement-observation-kit
├─ settlement-journal-kit
├─ save-consistency-check-kit
├─ visible-settlement-frame-kit
├─ first-visible-settlement-ack-kit
├─ fault-injection-fixture-kit
├─ partial-save-recovery-fixture-kit
└─ source-build-pages-settlement-parity-fixture-kit
```

## Command contract

```txt
ResourceSettlementCommand {
  settlementId
  generation
  actorId
  targetKind
  targetId
  action
  expected: {
    inventoryRevision
    agricultureRevision?
    plotRevision?
    foragingRevision?
    nodeRevision?
    ledgerSequence
  }
  inputFrameId?
  selectedResourceId?
}
```

## Prepare contract

Each participant returns a detached candidate:

```txt
ParticipantPrepareResult {
  participant
  predecessorRevision
  successorRevision
  statePatch
  ledgerIntent
  bufferedEvents
  validation
  fingerprint
}
```

No participant publishes state or events during preparation.

## Commit contract

```txt
ResourceSettlementResult {
  settlementId
  generation
  status: committed | duplicate | rejected | recovered | quarantined
  reason?
  participantReceipts
  aggregateLedgerReceipt
  saveEligibilityReceipt
  frameRevision?
}
```

A committed result is published only after every participant and the aggregate ledger record adopt successfully. Buffered events release after commit.

## Recovery classifications

```txt
none
  no participant or aggregate evidence

complete
  aggregate record and every participant receipt agree

participant-only
  one or more participant records exist without aggregate completion

aggregate-only
  aggregate record exists but participant evidence is missing or divergent

divergent
  fingerprints or expected revisions disagree

quarantined
  automatic convergence is unsafe
```

Recovery must never infer Inventory success solely from an Agriculture record.

## Required invariants

```txt
one SettlementId maps to one terminal result
all participant revisions advance together or none advance
no buffered event is visible before commit
no aggregate record exists without matching participant receipts
no participant-only attempt is reported as success without evidence-based recovery
save capture includes only committed settlement generations
visible frames identify the settlement generation they project
```

## Validation boundary

Architecture documentation only. No runtime behavior changed and no atomicity fixture was executed.
