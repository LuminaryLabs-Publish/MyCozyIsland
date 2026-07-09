# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-09T17-38-53-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual work on `MyCozyIsland`.

Read it before changing runtime source.

## Selection result

The full accessible `LuminaryLabs-Publish` repository list was compared with `LuminaryLabs-Dev/LuminaryLabs` central ledger state.

No eligible non-Cavalry repository was new, ledger-absent, recorded without root `.agent` state, or otherwise undocumented. `MyCozyIsland` was selected under the oldest documented-selection fallback because its central ledger timestamp was `2026-07-09T14-39-07-04-00`, older than every other eligible current entry.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

## Publish repositories checked

```txt
HorrorCorridor       central latest 2026-07-09T16-00-13-04-00
AetherVale           central latest 2026-07-09T17-08-15-04-00
TheOpenAbove         central latest 2026-07-09T15-09-09-04-00
TheCavalryOfRome     excluded
PhantomCommand       central latest 2026-07-09T16-29-23-04-00
PrehistoricRush      central latest 2026-07-09T15-31-40-04-00
ZombieOrchard        central latest 2026-07-09T16-38-14-04-00
IntoTheMeadow        central latest 2026-07-09T15-39-08-04-00
MyCozyIsland         selected; prior central latest 2026-07-09T14-39-07-04-00
TheUnmappedHouse     central latest 2026-07-09T16-58-52-04-00
```

## Current route

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js 0.160.0 CDN
  -> local source-domain kits
  -> inline render/input/camera/movement/animation consumers
  -> globalThis.CozyIsland legacy diagnostics
```

## Current interaction loop

```txt
build source descriptors
  -> project Three.js scene objects
  -> install browser input handlers
  -> wheel changes progress
  -> pointer changes yaw/pitch by progress range
  -> rail camera while progress < 0.985
  -> first-person WASD movement while progress >= 0.985
  -> movement silently accepted/rejected by clearing and campfire radii
  -> frame updates sea, smoke, flame, clouds, camera, and renderer
  -> expose legacy cloud/progress diagnostics
```

## Latest files

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-09T17-38-53-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T17-38-53-04-00.md
.agent/architecture-audit/2026-07-09T17-38-53-04-00-source-consumer-parity-dsk-map.md
.agent/render-audit/2026-07-09T17-38-53-04-00-render-consumption-parity-ledger.md
.agent/interaction-audit/2026-07-09T17-38-53-04-00-input-result-camera-movement-contract.md
.agent/grass-system-audit/2026-07-09T17-38-53-04-00-grass-source-instance-parity.md
.agent/cloud-system-audit/2026-07-09T17-38-53-04-00-cloud-descriptor-cache-drift-parity.md
.agent/host-proof-audit/2026-07-09T17-38-53-04-00-additive-host-snapshot-contract.md
.agent/deploy-audit/2026-07-09T17-38-53-04-00-browser-fixture-check-gate.md
```

## Next safe ledge

```txt
MyCozyIsland Source/Consumer Parity Ledger + Input Result Fixture Gate
```

## Operating rules

```txt
Only push to main.
Do not create branches.
Do not work on TheCavalryOfRome.
Keep scheduled breakdown work moving.
```
