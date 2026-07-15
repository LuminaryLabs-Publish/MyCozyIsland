# Current audit: MyCozyIsland save-writer lease and revision admission

**Timestamp:** `2026-07-15T15-01-22-04-00`  
**Status:** `save-writer-lease-revision-admission-authority-audited`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit documentation head:** `e6947c349442520aaddf7e8a0788cfd4fb56f97e`

## Summary

MyCozyIsland was selected after the full Publish comparison found no higher-priority undocumented repository. The active save path has portable checksums and rollback, but durable persistence remains a last-writer-wins host effect shared by all same-origin documents.

## Plan ledger

**Goal:** prevent valid but stale documents from regressing the durable adventure slot.

- [x] Confirm selection and synchronization.
- [x] Inspect load, autosave, pagehide, hidden preload and save payload code.
- [x] Identify the missing writer/slot authority.
- [x] Preserve all kits and services.
- [x] Define 20 coordinating surfaces.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/MyCozyIsland
selection rule: oldest synchronized central timestamp
prior timestamp: 2026-07-15T10-01-08-04-00
next oldest: LuminaryLabs-Publish/IntoTheMeadow at 2026-07-15T10-40-17-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Source-backed finding

`src/main-adventure.js` owns one fixed key, loads it once during startup, writes every five admitted simulation seconds after a fingerprint change, and writes again unconditionally on `pagehide`.

`src/game-preload-bridge.js` allows any same-origin menu document to fully start and restore the game before freezing its simulation and presentation. That frozen document remains a potential writer because the host-level `pagehide` handler is still installed.

`src/adventure/persistence-render-domains.js` checks payload integrity but the envelope contains no durable commit revision, writer/document identity, base revision, timestamp, lease, or compare-and-swap token. The save-domain `revision` is in-memory diagnostic state and is not a storage-head revision.

Permitted conflict:

```txt
tab A restores save R1 and starts playing
  -> tab B or a hidden menu preload also restores R1
  -> tab A progresses and writes R2
  -> stale tab/preload B later receives pagehide
  -> B captures its older state and overwrites the same key
  -> next startup validates B's checksum and accepts the regression
```

No `storage` event observer, BroadcastChannel, Web Lock, writer heartbeat, head readback, conflict result, or stale-writer rejection was found. This is a source-backed concurrency path, not a reproduced browser incident.

## Interaction loop

```txt
menu
  -> create a same-origin hidden game iframe
  -> game restores the shared localStorage save once
  -> startup reaches playable
  -> preload bridge freezes simulation and presentation
  -> Play resumes that document

adventure
  -> input, simulation, Agriculture and Foraging settle
  -> render/HUD snapshots update
  -> every five admitted simulation seconds, changed state is captured
  -> the host writes the snapshot to one shared localStorage key

document exit
  -> pagehide captures and writes unconditionally
  -> no writer lease, slot-head comparison or stale-write rejection occurs
```

## Domains and census

```txt
static menu and game routes
same-origin iframe preload and cross-window entry messaging
browser document identity, localStorage, storage events and page lifecycle
Core Startup, Object and Transaction Ledger
seeded world, input, Inventory, Agriculture and Foraging
player, scenario, interaction and camera
portable save capture, checksum, migration, restore and rollback
save-slot head revision, writer lease, conflict arbitration and durable commit
renderer-neutral snapshots and WebGPU/WebGL2 presentation
terrain, vegetation, atmosphere, ocean, foam and post processing
HUD, diagnostics, adaptive quality, validation, build and Pages
```

```txt
implemented surfaces: 70
planned save-writer surfaces: 20
```

## Required authority

```txt
cozy-island-save-writer-lease-revision-authority-domain
```

```txt
SaveCommitCommand
  -> bind SaveSlotId, DocumentId, WriterSessionId and CommitId
  -> bind candidate base revision and durable fingerprint
  -> classify active player, hidden preload, suspended and retiring writers
  -> require an admitted writer lease before mutation
  -> read and verify the current slot head
  -> compare-and-swap one new monotonic commit revision
  -> reject stale, duplicate, expired, read-only and superseded writers
  -> preserve the predecessor and verify write/readback identity
  -> publish SaveCommitResult or SaveConflictResult
  -> synchronize other documents through storage/head-change observation
  -> release the lease on pagehide, retirement or expiry
  -> publish FirstDurableSaveFrameAck
```

## Existing proof boundary

Current Node tests can prove deterministic capture, checksum validation, migration and restore. They do not create two same-origin browser documents, arbitrate a shared slot, force stale pagehide, observe storage changes or prove the visible save label matches the durable head.
