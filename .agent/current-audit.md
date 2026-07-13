# Current audit: MyCozyIsland durable save commit authority

**Timestamp:** `2026-07-12T20-40-56-04-00`  
**Status:** `durable-save-commit-authority-audited`  
**Branch:** `main`

## Summary

MyCozyIsland has a portable, checksummed and migration-aware save DSK, but no authority joins candidate capture to browser storage durability. `cozySave.capture()` updates SaveState to `captured` before `localStorage.setItem()` executes. The HUD renders `Saved` from that intermediate state, so quota, security or storage failures can produce a false success display.

Restore is also not truthfully atomic. Participant loads happen sequentially. On failure, rollback is attempted, but a rollback failure is only logged and the function still returns `rolledBack: true`.

## Plan ledger

**Goal:** define one durable-save and restore transaction that preserves predecessor state, reports actual outcomes and correlates the visible status with a verified storage receipt.

- [x] Compare the full Publish inventory with central tracking.
- [x] Verify root `.agent` coverage for every eligible repository.
- [x] Exclude `TheCavalryOfRome`.
- [x] Avoid the active partial ZombieOrchard documentation pass.
- [x] Select only `MyCozyIsland` under the oldest stable synchronized fallback rule.
- [x] Read composition, save, host adapter, frame loop, HUD and smoke proof.
- [x] Identify the complete interaction loop, all domains, all 64 kit surfaces and services.
- [x] Confirm capture precedes durable persistence.
- [x] Confirm HUD equates captured with Saved.
- [x] Confirm rollback failure is not reflected in the returned result.
- [x] Define commit identity, storage receipts, predecessor preservation and visible-frame proof.
- [ ] Implement and execute save durability fixtures.

## Selection audit

```txt
ZombieOrchard      2026-07-12T18-48-07-04-00 active partial 20:31 docs, skipped
MyCozyIsland       2026-07-12T19-00-22-04-00 selected
TheUnmappedHouse   2026-07-12T19-11-01-04-00
AetherVale         2026-07-12T19-21-29-04-00
TheOpenAbove       2026-07-12T19-31-06-04-00
IntoTheMeadow      2026-07-12T19-49-41-04-00
PhantomCommand     2026-07-12T19-58-07-04-00
PrehistoricRush    2026-07-12T20-10-25-04-00
HorrorCorridor     2026-07-12T20-20-02-04-00
TheCavalryOfRome   excluded
```

No new, central-ledger-missing or root-`.agent`-missing eligible repository was found.

## Complete interaction loop

```txt
browser startup
  -> create WebGPU/WebGL2 renderer
  -> install 13 engine kits
  -> localStorage.getItem(SAVE_KEY)
  -> JSON.parse
  -> cozySave.restore(snapshot)
  -> validate checksum
  -> migrate v1 farming payload to v2 Agriculture when required
  -> sequentially load world, ledger, scenario, inventory,
     Agriculture, Foraging and player
  -> reset interaction
  -> on failure attempt predecessor rollback
  -> build and present the world

runtime frame
  -> adventure.tick(dt)
  -> renderer-neutral frame includes SaveState
  -> HUD maps status captured to Saved
  -> every five seconds compare durable fingerprint
  -> when changed call storeSave()
  -> cozySave.capture() publishes captured state
  -> localStorage.setItem() attempts durable persistence
  -> host advances lastSaveFingerprint only on adapter success

pagehide
  -> call storeSave()
  -> ignore completion/failure result
  -> dispose gameplay renderer
```

## Source-backed findings

### Candidate capture is published before persistence

`cozySave.capture()` creates a v2 envelope, computes its checksum and writes:

```txt
status: captured
saveCount += 1
lastHash = candidate checksum
revision += 1
```

Only after capture returns does the browser adapter call `localStorage.setItem()`.

### Visible status is based on intermediate state

The HUD displays `Saved` whenever `frame.save.status === "captured"`. A failed `setItem()` returns `{ ok: false }` but does not change SaveState, so the next frame can still display `Saved`.

### Durable storage has no receipt

```txt
storage slot ID: implicit constant only
storage generation: absent
write result in DSK: absent
readback verification: absent
last-known-good slot contract: absent
quota/security classification: absent
retry budget/backoff: absent
pagehide completion receipt: absent
```

### Rollback result can be false

If candidate restore fails, the DSK attempts to reload every predecessor snapshot. A rollback exception is logged, but the returned result remains:

```txt
ok: false
rolledBack: true
```

There is no participant receipt or post-rollback fingerprint proving predecessor restoration.

### Existing proof is in-memory only

`tests/adventure-domains-smoke.mjs` proves v2 capture/restore and v1 migration. It does not instantiate the browser persistence adapter or inject storage and rollback failures.

## Domains in use

```txt
browser document, canvas, HUD, localStorage, pagehide and diagnostics
browser storage capability and durable commit admission
NexusEngine runtime, ECS phases and snapshots
Core Object and Core Transaction Ledger
seeded procedural world and terrain queries
browser input normalization and frames
Inventory and seed selection
official Agriculture
wild Foraging
player movement, grounding, view and stamina
scenario time and objective
contextual interaction and settlement
camera intro and first-person projection
portable save capture, validation, migration, restore, rollback and reset
renderer-neutral static/HUD/debug/frame snapshots
WebGPU/WebGL2 atmosphere, ocean, cloud, fog, lighting, materials and post-processing
adaptive quality, validation, CI and Pages deployment
```

## Implemented kits

```txt
13 engine-installed kits
50 cataloged world/render/host kits
1 additional ocean-composition kit
64 total source-backed kit surfaces
```

Engine-installed kits:

```txt
core-object-kit
core-transaction-ledger-kit
cozy-world-domain-kit
cozy-input-domain-kit
cozy-inventory-domain-kit
agriculture-domain-kit
cozy-foraging-domain-kit
cozy-player-domain-kit
cozy-scenario-domain-kit
cozy-interaction-domain-kit
cozy-camera-domain-kit
cozy-save-domain-kit
cozy-render-snapshot-domain-kit
```

The exact 50-kit catalog and every service remain machine-readable in `.agent/kit-registry.json`.

## Offered services

| Kit group | Services |
|---|---|
| runtime/core | Object registration and lookup, repeat-safe transaction ledger, engine composition, ECS ticks and snapshots |
| world/gameplay | Seeded world queries, Inventory, Agriculture, Foraging, movement, stamina, scenario time and contextual settlement |
| save | Portable capture, checksum validation, v1 migration, participant restore, rollback attempt, reset and diagnostics |
| render | Camera descriptors, renderer-neutral snapshots, WebGPU/WebGL2 world, atmosphere, ocean, fog, cloud, material and post-processing services |
| host/proof | Browser storage adapter, HUD, adaptive quality, Node smoke, CI and Pages deployment |

## Required composed domain

```txt
cozy-island-durable-save-commit-authority-domain
```

## Required transaction

```txt
SaveCommitCommand
  -> bind session, run and expected durable fingerprint
  -> capture detached candidate without publishing success
  -> validate schema, version and checksum
  -> allocate slot and commit generation
  -> write through the host storage adapter
  -> read back and validate the stored envelope
  -> atomically publish DurableSaveReceipt
     or preserve the predecessor and publish typed failure
  -> derive HUD status from the receipt

RestoreCommand
  -> read and validate one durable slot
  -> migrate detached candidate
  -> capture predecessor participant set
  -> apply candidate under one restore generation
  -> validate participant revisions and durable fingerprint
  -> commit success or perform verified rollback
  -> report actual rollback success/failure
  -> acknowledge the first visible matching frame
```

## Candidate kits

```txt
save-command-id-kit
save-session-id-kit
save-commit-generation-kit
save-slot-id-kit
save-candidate-envelope-kit
save-capture-result-kit
save-storage-adapter-kit
save-storage-write-result-kit
save-storage-readback-kit
save-storage-error-classifier-kit
durable-save-receipt-kit
save-predecessor-slot-kit
save-restore-command-kit
save-restore-generation-kit
save-participant-registry-kit
save-restore-candidate-kit
save-restore-validation-kit
save-rollback-plan-kit
save-rollback-result-kit
save-stale-result-rejection-kit
save-observation-kit
save-journal-kit
save-visible-frame-ack-kit
storage-quota-failure-fixture-kit
storage-security-failure-fixture-kit
write-readback-corruption-fixture-kit
rollback-failure-fixture-kit
pagehide-save-fixture-kit
source-dist-pages-save-parity-fixture-kit
```

## Latest audit family

```txt
.agent/trackers/2026-07-12T20-40-56-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T20-40-56-04-00.md
.agent/architecture-audit/2026-07-12T20-40-56-04-00-durable-save-commit-dsk-map.md
.agent/render-audit/2026-07-12T20-40-56-04-00-save-status-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T20-40-56-04-00-capture-before-persist-loop.md
.agent/interaction-audit/2026-07-12T20-40-56-04-00-save-capture-persist-restore-map.md
.agent/save-system-audit/2026-07-12T20-40-56-04-00-storage-receipt-rollback-contract.md
.agent/deploy-audit/2026-07-12T20-40-56-04-00-save-durability-fixture-gate.md
```

## Runtime non-claims

No runtime source, save schema, browser storage behavior, gameplay, rendering, dependencies or deployment configuration changed. No durable-write, readback, predecessor preservation, truthful rollback, pagehide completion or visible save-receipt claim is made. The prior browser-input ownership audit remains unresolved.