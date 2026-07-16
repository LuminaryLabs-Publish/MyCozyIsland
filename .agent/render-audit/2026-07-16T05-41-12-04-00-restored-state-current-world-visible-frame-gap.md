# Render audit: restored state versus current world visible-frame gap

**Timestamp:** `2026-07-16T05-41-12-04-00`

## Summary

The first frame after restore is assembled from the current runtime model and restored participant state without a compatibility result proving that those sources share one world/content generation.

## Plan ledger

**Goal:** require every restored frame to cite one accepted restore generation and one compatible world model.

- [x] Inspect static snapshot construction.
- [x] Inspect frame snapshot revision construction.
- [x] Inspect world model and loadSnapshot ownership.
- [x] Identify the missing restored-frame acknowledgement.
- [ ] Implement and execute cross-version visual fixtures.

## Current projection

```txt
current COZY_WORLD_CONFIG
  -> current runtime model
  -> current renderBase, plots, forage nodes and surface queries

accepted save
  -> restored Inventory, Agriculture, Foraging, Player and Scenario

cozy-render-snapshot
  -> combines current model descriptors with restored participant state
  -> publishes no RestoreGeneration
  -> publishes no world/content compatibility result
  -> publishes no FirstRestoredWorldFrameAck
```

`cozyWorld.loadSnapshot()` updates the world resource but does not rebuild the closed-over runtime model. `getRenderBase()`, `getPlots()`, `getForageNodes()`, `surfaceAt()` and movement constraints continue to read the current model. The frame revision includes scenario, player, Inventory, Agriculture, Foraging and Interaction revisions, but not a save compatibility or restore-generation revision.

## Visible risk boundary

A future changed seed, farm layout, forage topology, item/crop catalog or generation algorithm could allow:

```txt
current terrain and object placement
restored crop/forage participant state
current collision and targeting queries
saved player position
```

to appear in one frame without explicit migration or rejection.

No mismatch was reproduced with the current fixed configuration.

## Required evidence

```txt
SaveCompatibilityAdmissionResult
RestoreGenerationResult
WorldModelRebuildResult or ExactModelCompatibilityReceipt
AgricultureLayoutRebindResult
ForagingLayoutRebindResult
RestoredFrameProjectionResult
FirstRestoredWorldFrameAck
```

The final acknowledgement must bind save checksum, release manifest, world model, participant revisions, renderer generation and visible frame ID.