# Render audit: settlement result to visible-frame gap

**Timestamp:** `2026-07-13T08-04-17-04-00`

## Summary

The renderer-neutral frame combines current Inventory, Agriculture, Foraging and Interaction state, but its revision is only a concatenation of participant revisions. It does not identify the settlement command, aggregate ledger record, participant receipts, save eligibility or the first visible frame containing a committed settlement.

## Plan ledger

**Goal:** make visible resource changes traceable to one committed settlement generation.

- [x] Trace participant state into `cozy-render-snapshot-domain-kit`.
- [x] Trace the frame into gameplay rendering, HUD and post-processing.
- [x] Identify missing settlement and ledger provenance.
- [x] Define a settlement-aware frame envelope and acknowledgement.
- [ ] Implement browser and Pages fixtures.

## Current projection

```txt
participant state
  -> frameSnapshot()
  -> revision = scenario:player:inventory:agriculture:foraging:interaction
  -> gameplayRenderer.update(frame)
  -> updateHud(frame)
  -> postPipeline.render()
```

The combined revision can show that participant revisions differ, but it cannot prove why they changed, whether they belong to one settlement, or whether aggregate ledger completion occurred.

## Missing frame evidence

```txt
SettlementId
SettlementGeneration
ResourceSettlementResultId
aggregate ledger sequence
Inventory receipt
Agriculture or Foraging receipt
save-eligibility generation
projection candidate result
render submission result
first visible settlement-frame acknowledgement
```

## Required frame envelope

```txt
SettlementFrameEnvelope {
  frameRevision
  settlementId
  settlementGeneration
  settlementResultStatus
  aggregateLedgerSequence
  participantReceipts
  inventoryRevision
  agricultureRevision
  foragingRevision
  interactionRevision
  saveEligibilityRevision
  cameraRevision
  qualityRevision
}
```

## Required presentation transaction

```txt
committed ResourceSettlementResult
  -> build renderer-neutral SettlementFrameEnvelope
  -> validate participant receipts and revisions
  -> update gameplay objects and HUD from the same envelope
  -> submit post pipeline
  -> record visible canvas generation
  -> publish FirstVisibleSettlementFrameAck
```

## Rejection rule

A frame must not claim a committed settlement when:

```txt
participant receipts are incomplete
aggregate ledger evidence is missing
participant revisions diverge from receipts
settlement is quarantined or rolled back
frame belongs to an older settlement generation
```

## Required fixtures

```txt
planting consumes exactly one seed and shows one planted crop in the same acknowledged frame
harvest adds the exact yield and changes the plot in the same acknowledged frame
wild forage adds coconuts and depletes the node in the same acknowledged frame
participant failure produces no visible partial settlement
recovered settlement produces one recovered result and one matching visible frame
duplicate settlement produces no second visible resource change
source, built output and Pages produce equivalent acknowledgements
```

## Validation boundary

Documentation only. Rendering and HUD behavior were not changed or executed.
