# START HERE: MyCozyIsland Browser Input Ownership Central Reconciliation

Last updated: `2026-07-12T17-10-31-04-00`

## Summary

MyCozyIsland is a NexusEngine-composed island adventure with official Agriculture, Inventory, wild Foraging, deterministic world generation, first-person movement, portable saves and WebGPU/WebGL2 presentation.

The current audit remains browser input ownership. Keyboard listeners are attached globally, pointer move and release do not enforce the stored pointer ID, no primary pointer/button or lost-capture policy exists, input generation is permanently `1`, duplicate command IDs are accepted, clear does not fence later commands, and no consumer or first-visible-frame receipt exists.

This run reconciles the complete repo-local audit family, which finished landing after the previous central ledger write, into a fresh root `.agent` route and central record.

## Plan ledger

**Goal:** synchronize the final browser-input audit while preserving the exact runtime boundary required for surface, focus, gesture, generation, consumption and visible-frame authority.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Detect MyCozyIsland repo-local audit files newer than the prior central write.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Re-read the browser adapters and `cozy-input-domain-kit`.
- [x] Preserve the complete interaction loop, domains, 64-kit census and services.
- [x] Add a fresh tracker, turn ledger and system audit family.
- [x] Refresh this entrypoint and the machine registry.
- [x] Synchronize the central ledger and internal change log on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime implementation and executable browser fixtures remain future work.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

selected: LuminaryLabs-Publish/MyCozyIsland
reason: completed repo-local input audit family was newer than the prior central write
prior repo-local audit timestamp: 2026-07-12T17-01-09-04-00
prior repo-local audit completion head: e33098b1d2b7a5de4cb015df5662f134561b03e7
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Active route

```txt
index.html
  -> src/main-adventure.js browser adapters
  -> src/adventure/composition-runtime.js
  -> cozy-input-domain-kit
  -> player / interaction / camera consumers
  -> renderer-neutral frame
  -> Three.js WebGPU/WebGL2 presentation
```

## Read order

1. `trackers/2026-07-12T17-10-31-04-00/project-breakdown.md`
2. `turn-ledger/2026-07-12T17-10-31-04-00.md`
3. `architecture-audit/2026-07-12T17-10-31-04-00-browser-input-ownership-central-reconciliation-dsk-map.md`
4. `input-system-audit/2026-07-12T17-10-31-04-00-focus-pointer-generation-central-reconciliation-contract.md`
5. `interaction-audit/2026-07-12T17-10-31-04-00-browser-event-admission-central-reconciliation-map.md`
6. `gameplay-audit/2026-07-12T17-10-31-04-00-global-input-consumption-central-reconciliation.md`
7. `render-audit/2026-07-12T17-10-31-04-00-input-visible-frame-central-reconciliation-gap.md`
8. `central-sync-audit/2026-07-12T17-10-31-04-00-browser-input-local-central-reconciliation.md`
9. `deploy-audit/2026-07-12T17-10-31-04-00-browser-input-central-fixture-gate.md`
10. `current-audit.md`
11. `known-gaps.md`
12. `next-steps.md`
13. `validation.md`

## Interaction loop

```txt
browser event
  -> global key listener or canvas pointer/wheel listener
  -> enqueue command with permanent generation 1
  -> input phase sorts by sequence and accepts generation-1 commands
  -> held keys and one-shot actions become one InputFrame
  -> player consumes movement, look and intro input
  -> interaction consumes seed and context actions
  -> camera derives from player state
  -> render snapshot and visible frame

focus loss
  -> enqueue clear command
  -> later same-frame commands remain admissible
  -> no focus generation fences predecessor work
```

## Main findings

```txt
keyboard ownership: global, no canvas-focus or editable-target admission
pointer ownership: stored ID is not enforced by move or release
primary input policy: absent
lost capture recovery: absent
command generation: permanently 1
duplicate command rejection: absent
rejection diagnostics: inert
clear generation fence: absent
consumer receipts: absent
first visible input-frame acknowledgement: absent
browser fixture harness: absent
```

## Kit census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional runtime composition kit: 1
source-backed kit surfaces: 64
active route kit surfaces: 62
retained inactive catalog entries: 2
ordered Core World providers: 9
```

## Required authority

```txt
cozy-island-browser-input-ownership-authority-domain
```

It owns input-session and surface identity, focus generations, primary pointer/button policy, gesture and pointer-capture lifecycle, command IDs and duplicate rejection, clear/fence generations, typed admission results, consumer receipts, stale-command rejection and first-visible-input-frame acknowledgement.

## Ownership boundary

```txt
browser input authority -> DOM event ownership and command admission
cozy-input-domain-kit   -> normalized renderer-neutral input frames
player                  -> movement, view and stamina
interaction             -> seed and contextual actions
camera                  -> projection from committed player state
renderer                -> visible-frame projection only
```

## Next safe ledge

Implement the browser authority as an adapter in front of `cozy-input-domain-kit`. Keep DOM event details out of Agriculture, Inventory, player and rendering domains.