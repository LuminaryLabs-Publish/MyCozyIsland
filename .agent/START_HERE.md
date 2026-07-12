# START HERE: MyCozyIsland Host Save Persistence Central Reconciliation

Last updated: `2026-07-12T14-59-01-04-00`

## Summary

MyCozyIsland is a NexusEngine-composed island adventure with official Agriculture, product Inventory and Foraging, deterministic world generation, normalized input, portable save snapshots and WebGPU/WebGL2 presentation.

The current technical boundary is browser save durability. `cozy-save-domain-kit` marks a snapshot as captured before the browser host proves that localStorage accepted it. A failed write can therefore leave capture state and the visible `Saved` status ahead of physical storage truth.

This run reconciles the newer `2026-07-12T14-51-49-04-00` host persistence audit with the central repository ledger. The prior Agriculture cutover recovery audit remains an upstream transaction dependency.

## Plan ledger

**Goal:** keep the local and central architecture records synchronized around one truthful path from dirty gameplay state through verified storage commit, restore, reset and first visible frame.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland`.
- [x] Confirm the repo-local persistence audit is newer than the central record.
- [x] Preserve the complete interaction, domain, kit and service breakdown.
- [x] Add a new timestamped reconciliation tracker and turn entry.
- [x] Add architecture, render, persistence and deployment reconciliation records.
- [x] Update central ledger and internal change log.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime persistence implementation and browser fixtures remain future work.

## Active route

```txt
index.html
  -> pinned NexusEngine and NexusEngine-Kits import map
  -> src/main-adventure.js
  -> browser localStorage adapter
  -> src/adventure/composition-runtime.js
  -> 13 engine-installed kits
  -> official Agriculture DSK
  -> procedural WebGPU/WebGL2 presentation
```

## Read order

1. `trackers/2026-07-12T14-59-01-04-00/project-breakdown.md`
2. `turn-ledger/2026-07-12T14-59-01-04-00.md`
3. `architecture-audit/2026-07-12T14-59-01-04-00-host-save-persistence-central-reconciliation-dsk-map.md`
4. `save-persistence-audit/2026-07-12T14-59-01-04-00-central-ledger-reconciliation.md`
5. `render-audit/2026-07-12T14-59-01-04-00-save-status-central-provenance-reconciliation.md`
6. `deploy-audit/2026-07-12T14-59-01-04-00-host-save-persistence-central-sync-gate.md`
7. `current-audit.md`
8. `architecture-audit/2026-07-12T14-51-49-04-00-host-save-persistence-authority-dsk-map.md`
9. `save-persistence-audit/2026-07-12T14-51-49-04-00-capture-commit-conflict-quarantine-contract.md`
10. `architecture-audit/2026-07-12T12-50-46-04-00-agriculture-cutover-recovery-dsk-map.md`
11. `known-gaps.md`
12. `next-steps.md`
13. `validation.md`

## Interaction loop

```txt
startup
  -> compose 13 engine-installed kits
  -> install official Agriculture
  -> generate island, plots and wild resources
  -> load browser record
  -> restore save-v2 or migrate save-v1
  -> construct WebGPU/WebGL2 presentation
  -> start RAF

frame
  -> input, time, Agriculture, Foraging, player and interaction updates
  -> derive camera, HUD, save and render snapshots
  -> render
  -> compare durable fingerprint every five simulation seconds
  -> capture portable save candidate
  -> attempt localStorage write

lifecycle
  -> one-shot pagehide save attempt
  -> no pageshow re-arm after bfcache restore

reset
  -> reset engine participants
  -> durable storage catches up through a later host path
```

## Main findings

```txt
capture truth
  engine capture is not browser durability
  failed storage can still project Saved
  saveCount counts captures rather than verified commits

restore truth
  corrupt active record is not quarantined
  rollback failure can still report rolledBack true

storage ownership
  .v1 key stores /2 schema
  no staged write, readback, pointer commit or bounded backup

concurrency
  no tab identity, writer lease or predecessor admission
  last writer silently wins

lifecycle
  pagehide is once-only
  bfcache pageshow does not re-arm
  reset is not immediately durable

render and proof
  no durable commit/storage generation in the HUD frame
  no first restored-frame acknowledgement
  Node smoke bypasses browser storage and lifecycle behavior
```

## Kit census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits:     50
additional runtime composition kit:    1
source-backed kit surfaces:            64
active route kit surfaces:             62
retained inactive catalog entries:      2
ordered Core World providers:           9
```

## Required authority

```txt
cozy-island-host-save-persistence-authority-domain
```

It must own save command and storage generation identity, dirty revision, canonical key migration, tab identity, writer lease, predecessor admission, staged write, readback verification, active-pointer commit, backup retention, corrupt-record quarantine, truthful rollback, lifecycle flush/re-arm, reset durability, durable save-status projection and first restored-frame acknowledgement.

## Ownership boundary

```txt
Agriculture -> cultivated state
Inventory   -> balances and settlement
Foraging    -> wild resources
save domain -> portable snapshot semantics
browser host persistence authority -> physical durability
renderer    -> projection only
```

## Next safe ledge

Implement the authority as a browser-host adapter around `cozy-save-domain-kit`. Do not move gameplay state ownership into localStorage and do not replace the official Agriculture DSK.