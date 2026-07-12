# START HERE: MyCozyIsland Host Save Persistence Authority

Last updated: `2026-07-12T14-51-49-04-00`

## Summary

MyCozyIsland is a NexusEngine-composed island adventure with official Agriculture, product Inventory and Foraging, deterministic world generation, normalized input, portable save snapshots and WebGPU/WebGL2 presentation.

The current highest-priority boundary is browser save durability. `cozy-save-domain-kit` marks a snapshot as captured before the host proves that localStorage accepted it. If the storage write fails, SaveState still says `captured`, `saveCount` has advanced and the next HUD frame can say `Saved` even though no durable commit exists.

The prior Agriculture cutover recovery audit remains an upstream gameplay-transaction dependency. This new audit does not replace it; it adds the missing host persistence authority around capture, storage commit, restore, reset, page lifecycle, conflict and first-visible-frame proof.

## Plan ledger

**Goal:** establish one truthful path from dirty gameplay state through verified browser-storage commit, restore, reset and visible save status.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` as the oldest eligible central entry.
- [x] Identify the complete startup, frame, autosave, restore, reset and page lifecycle loops.
- [x] Identify every active domain.
- [x] Preserve the complete 64-surface kit and service census.
- [x] Audit capture-versus-commit truth, rollback reporting, key migration, corrupt-record handling, multi-tab conflicts and lifecycle flush.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh root `.agent` routing and machine state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime persistence implementation and executable browser fixtures remain future work.

## Active route

```txt
index.html
  -> pinned NexusEngine and NexusEngine-Kits import map
  -> src/main-adventure.js
  -> browser localStorage adapter
  -> src/adventure/composition-runtime.js
  -> 13 engine-installed kits
  -> procedural WebGPU/WebGL2 presentation
```

## Read order

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-12T14-51-49-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-12T14-51-49-04-00-host-save-persistence-authority-dsk-map.md`
5. `save-persistence-audit/2026-07-12T14-51-49-04-00-capture-commit-conflict-quarantine-contract.md`
6. `gameplay-audit/2026-07-12T14-51-49-04-00-autosave-restore-page-lifecycle-loop.md`
7. `interaction-audit/2026-07-12T14-51-49-04-00-save-command-storage-admission-map.md`
8. `render-audit/2026-07-12T14-51-49-04-00-save-status-visible-frame-provenance-gap.md`
9. `deploy-audit/2026-07-12T14-51-49-04-00-save-persistence-browser-fixture-gate.md`
10. `architecture-audit/2026-07-12T12-50-46-04-00-agriculture-cutover-recovery-dsk-map.md`
11. `next-steps.md`
12. `validation.md`

## Current save path

```txt
dirty frame
  -> five simulation-second autosave check
  -> durableFingerprint comparison
  -> cozySave.capture
       -> build v2 payload and checksum
       -> immediately set SaveState.status = captured
       -> increment saveCount
  -> localStorage.setItem
  -> update host fingerprint only on write success
```

## Main findings

```txt
capture truth
  -> engine capture is not browser durability
  -> failed storage can still project Saved
  -> saveCount counts captures, including failed host writes

restore truth
  -> invalid record remains at the same key
  -> rollback can fail
  -> result still reports rolledBack: true

storage ownership
  -> .v1 key stores /2 schema
  -> no canonical key migration receipt
  -> no staging, readback, pointer commit or backup

concurrency
  -> no tab identity or writer lease
  -> no predecessor checksum admission
  -> last writer silently wins

lifecycle
  -> autosave follows clamped simulation dt
  -> pagehide handler is once-only
  -> bfcache pageshow does not rearm it
  -> reset is not immediately durable

render
  -> HUD derives Saved from capture state
  -> no durable commit ID or first restored-frame receipt

proof
  -> Node test bypasses localStorage and page lifecycle
  -> no quota, corruption, conflict, bfcache or Pages fixture
```

## Kit census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional runtime composition kit: 1
source-backed kit surfaces: 64
active route kit surfaces: 62
retained inactive catalog entries: 2
ordered Core World providers retained: 9
```

## Required authority

```txt
cozy-island-host-save-persistence-authority-domain
```

It must own save command and storage generation identity, dirty revision, canonical key migration, writer lease, predecessor admission, staged write, readback verification, active-pointer commit, backup retention, corrupt-record quarantine, truthful rollback, lifecycle flush, reset durability, save-status projection and first restored-frame acknowledgement.

## Next safe ledge

Implement the authority as a browser-host adapter around `cozy-save-domain-kit`. Do not move gameplay state ownership into localStorage and do not replace the official Agriculture DSK.