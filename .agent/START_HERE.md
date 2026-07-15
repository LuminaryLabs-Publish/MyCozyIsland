# START HERE: MyCozyIsland embed-context route admission

**Last updated:** `2026-07-14T20-05-56-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit repository head:** `4a382d17d13425a7a5f01ef7933248ba9e0058b1`  
**Status:** `embed-context-route-admission-authority-audited`

**Retained statuses:** `preload-suspension-lease-resume-frame-authority-audited`, `menu-postcard-atlas-frame-admission-audited`, `menu-failure-game-bootstrap-fallback-authority-audited`, `dual-surface-gpu-handoff-retirement-authority-audited`, `cross-window-preload-entry-protocol-authority-audited`, `threejs-menu-presentation-lifecycle-authority-central-reconciled`, `menu-game-preload-handoff-scheduler-authority-central-reconciled`, `core-startup-integration-central-reconciled`, `resource-settlement-recovery-authority-central-reconciled`, `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

The bridge currently treats `?preload=1` or any iframe as proof that a parent shell owns the game. Once playable, it can freeze simulation and rendering before proving that a compatible parent, origin or message channel exists. Top-level preload URLs and arbitrary embeds can therefore become prepared but permanently sleeping games.

## Plan ledger

**Goal:** admit route and embed context before allowing shell-owned preload suspension, while preserving direct play and explicit recovery for unsupported embeds.

- [x] Compare all 11 Publish repositories and ten eligible central ledgers.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm no new, missing, undocumented or runtime-ahead eligible repository.
- [x] Select only MyCozyIsland through the oldest synchronized timestamp rule.
- [x] Inspect route, shell, bridge, startup and source-test paths.
- [x] Preserve all 65 source-backed kit surfaces and five adapters.
- [x] Add the `2026-07-14T20-05-56-04-00` audit family.
- [ ] Implement context admission, channel handshake and browser fixtures.

## Interaction loop

```txt
index -> menu postcard -> hidden game preload
  -> Core Startup playable
  -> shell-owned sleep
  -> Play entry
  -> visible adventure
  -> walk, farm, forage and save
```

Current classification also admits unintended loops:

```txt
top-level game.html?preload=1 -> sleep without parent
any iframe game.html -> implicit preload ownership
cross-origin iframe -> child messages target the wrong parent origin
```

## Domains

```txt
route/query classification
window hierarchy and iframe embedding
shell identity, parent origin and nonce admission
cross-window protocol
Core Startup readiness
suspension and entry leases
menu progress, focus, history and reveal
engine scheduler and renderer-loop ownership
first context-admitted frame evidence
WebGPU/WebGL2 presentation
world, player, camera, interaction, Inventory, Agriculture and Foraging
save capture, migration, restore and rollback
validation, build, Pages and central tracking
```

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
planned embed-context authority surfaces: 22
```

## Active authority

```txt
cozy-island-embed-context-route-admission-authority-domain
```

It must publish `DirectPlayAccepted`, `ShellPreloadAccepted` or `UnsupportedEmbedResolved` before suspension, bind exact parent identity and origin for shell mode, reject top-level preload without transport, and publish `FirstContextAdmittedGameFrameAck`.

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-14T20-05-56-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-14T20-05-56-04-00-embed-context-route-admission-dsk-map.md`
4. `embed-context-audit/2026-07-14T20-05-56-04-00-top-level-query-iframe-parent-contract.md`
5. `render-audit/2026-07-14T20-05-56-04-00-frozen-embedded-game-visible-frame-gap.md`
6. `gameplay-audit/2026-07-14T20-05-56-04-00-unadmitted-embed-preload-entry-loop.md`
7. `interaction-audit/2026-07-14T20-05-56-04-00-embed-context-command-result-map.md`
8. `deploy-audit/2026-07-14T20-05-56-04-00-embed-context-browser-fixture-gate.md`
9. `next-steps.md`
10. `known-gaps.md`
11. `validation.md`

## Do not claim

Do not claim safe embed classification, authenticated shell ownership, direct-route recovery, visible-frame convergence, artifact parity or production readiness until executable fixtures pass on `main`.