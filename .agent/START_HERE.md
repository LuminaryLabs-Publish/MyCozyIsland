# START HERE: MyCozyIsland durable save commit authority

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Aligned:** `2026-07-12T20-40-56-04-00`  
**Status:** `durable-save-commit-authority-audited`

## Summary

MyCozyIsland is a NexusEngine-composed procedural island adventure with official Agriculture, Inventory, wild Foraging, first-person movement, contextual interaction, portable saves, renderer-neutral snapshots and WebGPU/WebGL2 presentation.

The newest audit isolates durable-save commit authority. The portable save DSK marks a candidate `captured` before the browser adapter proves `localStorage` persistence, and the HUD maps that intermediate state to `Saved`. A storage failure can therefore report success visually. Restore also returns `rolledBack: true` even when rollback itself throws.

## Plan ledger

**Goal:** make capture, browser persistence, restore, rollback and visible save status one revisioned transaction with truthful typed receipts.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Avoid the active partial ZombieOrchard documentation pass.
- [x] Select only MyCozyIsland as the oldest stable synchronized repository.
- [x] Trace startup restore, autosave, pagehide save, migration, rollback and HUD projection.
- [x] Identify the complete interaction loop, domains, all 64 kit surfaces and offered services.
- [x] Add the timestamped tracker and architecture/system audit family.
- [x] Refresh required root documents and the machine registry.
- [x] Synchronize the central ledger and internal change log on `main`.
- [x] Create no branch or pull request.
- [ ] Implement and execute browser-storage durability fixtures.

## Read this run first

```txt
.agent/trackers/2026-07-12T20-40-56-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T20-40-56-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T20-40-56-04-00-durable-save-commit-dsk-map.md
.agent/render-audit/2026-07-12T20-40-56-04-00-save-status-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T20-40-56-04-00-capture-before-persist-loop.md
.agent/interaction-audit/2026-07-12T20-40-56-04-00-save-capture-persist-restore-map.md
.agent/save-system-audit/2026-07-12T20-40-56-04-00-storage-receipt-rollback-contract.md
.agent/deploy-audit/2026-07-12T20-40-56-04-00-save-durability-fixture-gate.md
```

## Interaction loop

```txt
startup
  -> install 13 engine kits
  -> read localStorage
  -> parse and restore portable save
  -> checksum validation and optional migration
  -> sequential participant load or rollback
  -> construct and present the world

runtime
  -> tick and render
  -> every five seconds compare durable fingerprint
  -> capture portable candidate
  -> write localStorage
  -> update host fingerprint only after adapter success
  -> project save status into HUD

pagehide
  -> attempt one final storeSave
  -> dispose gameplay renderer
```

## Main findings

```txt
capture publishes before durable write: yes
HUD maps captured to Saved: yes
durable storage receipt: absent
write/readback verification: absent
last-known-good slot authority: absent
storage error classification: absent
pagehide completion result: absent
rollback failure reported truthfully: no
first visible durable-save frame acknowledgement: absent
```

## Required parent domain

```txt
cozy-island-durable-save-commit-authority-domain
```

## Required flow

```txt
SaveCommitCommand
  -> detached candidate capture
  -> schema and checksum validation
  -> storage write and readback
  -> DurableSaveReceipt or typed failure
  -> predecessor preservation
  -> HUD projection from receipt only

RestoreCommand
  -> durable slot validation
  -> detached migration
  -> participant restore barrier
  -> post-restore fingerprint validation
  -> truthful rollback result on failure
  -> first matching visible-frame acknowledgement
```

## Guardrails

```txt
Push only to main.
Create no branch or pull request.
Do not work on TheCavalryOfRome.
Do not equate captured with persisted.
Do not display Saved without a durable receipt.
Do not report rolledBack=true after rollback failure.
Do not claim save durability until browser and Pages fixtures pass.
```

The prior browser-input ownership audit remains valid and is retained in the historical timestamped audit family.