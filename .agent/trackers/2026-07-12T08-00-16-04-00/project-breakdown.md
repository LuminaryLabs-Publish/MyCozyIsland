# Project Breakdown: MyCozyIsland Adventure Persistence Authority

Timestamp: `2026-07-12T08:00:16-04:00`

## Plan ledger

**Goal:** make the new farming-adventure cutover persist only meaningful durable changes, commit storage truth only after the host write succeeds, restore atomically, preserve operation identity across reloads, and prove the first restored visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Prioritize only `MyCozyIsland` because 27 newer commits replaced the active route with a NexusEngine farming adventure after its previous audit.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Reconcile all engine-installed, world-generation, rendering, host, and retained legacy kits and their services.
- [x] Trace input, farming, foraging, transaction IDs, auto-save, localStorage, restore, reset, HUD projection, tests, and deployment.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh all required root `.agent` files and machine registry.
- [x] Push `LuminaryLabs-Publish/MyCozyIsland` directly to `main`.
- [x] Synchronize `LuminaryLabs-Dev/LuminaryLabs` on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime fixes and executable persistence fixtures remain future work.

## Why this repository

The full Publish organization contains ten accessible repositories. `TheCavalryOfRome` was excluded. All nine eligible repositories were already tracked and had root `.agent` state, but `MyCozyIsland` received a 27-commit adventure cutover after its previous audit. The active route, domain graph, gameplay loop, persistence path and test surface were therefore materially undocumented and took priority over the oldest-ledger fallback.

## Interaction loop

```txt
aerial intro -> first-person walking -> choose seed -> approach plot/palm
-> E contextual transaction -> crop growth or coconut respawn
-> frame snapshot -> renderer/HUD -> five-second save check
-> capture -> localStorage
```

## Domain families

```txt
host and lifecycle
NexusEngine/ECS/core object/core transaction ledger
world, terrain and procedural population
input, player, camera and interaction
inventory, farming and foraging
scenario and clock
save, checksum, adapter and restore
render snapshots, HUD and diagnostics
WebGPU/WebGL2 world, ocean, cloud, fog, foam and post
tests and deployment
```

## Key findings

1. Idle player revision churn forces recurring localStorage writes.
2. Domain status can report captured after the host write fails.
3. Restore is sequential and non-atomic.
4. Restored transaction history can collide with reset input frame IDs.
5. Reset excludes input state.
6. The new adventure smoke is not in `npm test`.
7. Browser NexusEngine imports remain on `@main`.

## Outputs

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/turn-ledger/2026-07-12T08-00-16-04-00.md
.agent/architecture-audit/2026-07-12T08-00-16-04-00-adventure-persistence-authority-dsk-map.md
.agent/render-audit/2026-07-12T08-00-16-04-00-save-status-restored-frame-truth-gap.md
.agent/gameplay-audit/2026-07-12T08-00-16-04-00-farm-forage-autosave-reload-loop.md
.agent/interaction-audit/2026-07-12T08-00-16-04-00-save-write-restore-result-map.md
.agent/persistence-audit/2026-07-12T08-00-16-04-00-autosave-restore-operation-continuity-contract.md
.agent/deploy-audit/2026-07-12T08-00-16-04-00-persistence-browser-fixture-gate.md
```
