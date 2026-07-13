# Project breakdown: MyCozyIsland durable save commit authority

**Timestamp:** `2026-07-12T20-40-56-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Status:** `durable-save-commit-authority-audited`

## Summary

MyCozyIsland has a strong renderer-neutral save DSK with checksums, v1-to-v2 migration and participant rollback, but the browser persistence adapter does not distinguish an in-memory capture from a durable storage commit. `capture()` marks the save state as `captured` before `localStorage.setItem()` succeeds, and the HUD maps that state directly to `Saved`. A quota, security or storage failure can therefore display a successful save that was never persisted.

Restore rollback reporting is also optimistic. If a participant restore fails and the rollback attempt itself fails, the function logs the rollback error but still returns `rolledBack: true`.

## Plan ledger

**Goal:** make save capture, durable storage, restore, rollback and visible status one revisioned transaction with typed receipts and truthful failure reporting.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Avoid the active partial ZombieOrchard documentation pass.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` as the oldest stable synchronized eligible repository.
- [x] Trace startup restore, five-second autosave, pagehide save, DSK capture, migration, participant restore, rollback and HUD projection.
- [x] Identify the complete interaction loop and all domains in use.
- [x] Preserve all 64 source-backed kit surfaces and their offered services.
- [x] Define the durable-save parent DSK and fixture boundary.
- [x] Add the timestamped tracker and audit family.
- [x] Refresh the required root `.agent` files and machine registry.
- [x] Update the central ledger and internal change log on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable storage-failure fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible after Cavalry exclusion: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

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

## Complete interaction loop

```txt
startup
  -> create renderer and install 13 engine kits
  -> localStorage.getItem(SAVE_KEY)
  -> JSON parse
  -> cozySave.restore(snapshot)
  -> checksum validation and optional v1 migration
  -> sequential participant load
  -> rollback attempt after failure
  -> construct world and begin presentation

runtime frame
  -> tick simulation and project renderer-neutral frame
  -> update HUD from frame.save.status
  -> every five admitted seconds compare durable fingerprint
  -> if changed, call storeSave()
  -> cozySave.capture() mutates SaveState to captured
  -> localStorage.setItem()
  -> update lastSaveFingerprint only after adapter success

pagehide
  -> call storeSave() once
  -> dispose gameplay renderer
```

## Domains in use

```txt
browser document, canvas, HUD, localStorage, pagehide and diagnostics
NexusEngine composition, ECS phases, snapshots and scheduler
Core Object and Core Transaction Ledger
seeded world and terrain queries
input normalization and frame admission
Inventory and official Agriculture
wild Foraging
player movement, scenario time and contextual interaction
camera descriptors
save capture, checksum validation, migration, restore, rollback and reset
browser durable persistence adapter and storage failure classification
renderer-neutral snapshots
WebGPU/WebGL2 rendering and adaptive quality
Node validation, CI and Pages deployment
```

## Kit and service census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed kit surfaces: 64
active route kit surfaces: 62
retained inactive catalog entries: 2
ordered Core World providers: 9
```

Engine-installed services cover object registration, repeat-safe transactions, seeded world queries, input frames, Inventory, Agriculture, Foraging, movement, scenario time, interaction, camera descriptors, portable save capture/validation/migration/restore/rollback/reset and renderer-neutral snapshots.

Cataloged services cover WebGPU/WebGL2 hosts, atmosphere, ocean, foam, fog, clouds, lighting, materials, post-processing, quality, terrain, vegetation, rocks, props, weather, wind, deterministic seed/time, debugging and composition validation.

## Source-backed findings

```txt
capture marks SaveState.status = captured before durable write: yes
HUD treats captured as Saved: yes
storage write receipt in save DSK: absent
storage generation or slot identity: absent
write/readback verification: absent
previous-good fallback slot: absent
quota/security/error classification: absent
pagehide completion receipt: absent
rollback success tracked separately: no
restore returns rolledBack=true after rollback failure: yes
first visible durable-save frame acknowledgement: absent
```

## Required parent domain

```txt
cozy-island-durable-save-commit-authority-domain
```

## Required transaction

```txt
SaveCommitCommand
  -> bind runtime session, run generation and expected durable fingerprint
  -> capture an immutable candidate without publishing durable success
  -> validate schema, version and checksum
  -> allocate storage slot and commit generation
  -> write candidate through the browser adapter
  -> read back and validate the stored envelope
  -> atomically publish DurableSaveReceipt or preserve the predecessor
  -> update HUD only from the durable receipt

RestoreCommand
  -> read and validate a durable slot
  -> migrate into a detached candidate
  -> capture every predecessor participant
  -> apply participants under one restore generation
  -> validate post-restore fingerprint
  -> on failure, rollback every participant and report actual rollback status
  -> acknowledge the first visible frame citing the restore generation
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

## Validation boundary

No runtime source, save behavior, rendering, package scripts, dependencies or deployment configuration changed. The existing Node smoke proves in-memory capture, v2 restore and v1 migration only. It does not exercise localStorage failure, durable readback, backup fallback, rollback failure, pagehide completion or visible save-status parity.