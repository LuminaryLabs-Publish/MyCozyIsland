# Gameplay Audit: Focus and Cell Transition Loop

Timestamp: `2026-07-11T06-50-30-04-00`

## Plan ledger

**Goal:** map the player-visible movement loop onto the Core World transition path and identify the missing gameplay result when a focus update is incomplete.

- [x] Trace camera modes and focus thresholds.
- [x] Trace cell-boundary movement.
- [x] Trace production world-update ordering.
- [x] Identify gameplay consequences and fixture scenarios.

## Loop

```txt
rail mode
  -> world focus remains island center

first-person mode
  -> WASD moves camera inside clearing
  -> wrapper accumulates delta and movement
  -> same cell and below threshold: unchanged
  -> boundary crossed or interval/movement threshold reached
  -> setFocus(new position)
  -> updateWorld()
  -> release old cells
  -> update changed cells
  -> prepare required cells
  -> retry non-active retained cells
  -> wrapper returns true
```

## Current gameplay result

The scenario and camera continue regardless of provider completeness. No gameplay-facing state says that the requested world area is complete, degraded, rejected or recovering.

The present clearing and radius keep the island covered, so the defect is mostly latent. It becomes material when:

- movement expands beyond the central clearing
- active radius changes
- LOD updates occur
- a provider throws or becomes blocked
- cell rendering or physics uses provider-owned cells
- the world grows beyond one island

## Required gameplay policy

```txt
accepted-complete
  player focus advances
  world revision advances
  future render/physics consumers may admit the revision

unchanged
  no mutation

failed-rolled-back
  accepted focus remains previous position
  active world remains previous complete revision
  player can retry

accepted-degraded
  camera may continue visually under compatibility policy
  diagnostics name degraded cells
  cell-owned render/physics authority does not advance

failed-partial
  explicit recovery state
  never represented as changed=true
```

## Required gameplay evidence

```txt
sessionEpoch
focusCommandId
cameraMode
requestedPosition
acceptedPosition
focusRevision
worldRevision
completeCellCount
failedCellIds
movementAllowed
consumerAdmissionAllowed
recoveryRequired
```

## Required scenarios

```txt
rail focus remains stable
same-cell movement below threshold is unchanged
minimum movement at 10 Hz updates once
crossing x=48 or z=48 changes the cell set
foundation failure preserves prior accepted world
classification failure reports the cell/provider
population failure does not disappear into Boolean true
presentation failure blocks cell-render admission
successful retry advances one revision
stale focus command after restart is rejected
```

## Decision

Do not expand the walkable area until focus transitions have a typed completion result and the exact pinned runtime passes failure/recovery fixtures.
