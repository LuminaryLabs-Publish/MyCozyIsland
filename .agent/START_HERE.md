# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-09T17-48-20-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual work on `MyCozyIsland`.

Read it before changing runtime source.

## Selection result

The full accessible `LuminaryLabs-Publish` repository list was compared with `LuminaryLabs-Dev/LuminaryLabs` central ledger state and repo-local root `.agent` state.

No eligible non-Cavalry repository was new, ledger-absent, missing root `.agent` state, recently added but undocumented, or otherwise undocumented. `MyCozyIsland` was selected because its central ledger timestamp was still `2026-07-09T14-39-07-04-00`, the oldest eligible central entry, while repo-local audit state had advanced to `2026-07-09T17-38-53-04-00`.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

## Publish repositories checked

```txt
HorrorCorridor       central latest 2026-07-09T16-00-13-04-00
AetherVale           central latest 2026-07-09T17-33-18-04-00
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
  -> canvas#game + cloud loader + error panel
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js 0.160.0 CDN
  -> local source-domain kits
  -> inline render/input/camera/movement/animation consumers
  -> globalThis.CozyIsland legacy diagnostics
```

## Current interaction loop

```txt
build deterministic island, floor, foliage, clearing, campfire, smoke, grass, and cloud descriptors
  -> project descriptors into Three.js objects
  -> install resize, keyboard, wheel, and pointer handlers
  -> wheel mutates progress
  -> pointer mutates yaw/pitch only in permitted progress ranges
  -> rail camera while progress < 0.985
  -> first-person WASD movement while progress >= 0.985
  -> movement silently accepted or rejected by clearing and campfire radii
  -> frame updates sea, smoke, flame, clouds, camera, and renderer
  -> expose cloud contract, cached geometries, and scroll progress through legacy diagnostics
```

## Source boundary

The explicit domain kits produce deterministic descriptors and object graphs. `src/main-cloudform.js` remains the monolithic consumer for mesh creation, scene composition, browser input, camera policy, movement policy, frame simulation, render submission, and host diagnostics.

The next implementation should prove source-to-consumer parity before changing visuals.

## Latest files

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-09T17-48-20-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T17-48-20-04-00.md
.agent/architecture-audit/2026-07-09T17-48-20-04-00-source-consumer-central-catchup-dsk-map.md
.agent/render-audit/2026-07-09T17-48-20-04-00-render-consumption-readback-map.md
.agent/interaction-audit/2026-07-09T17-48-20-04-00-input-movement-result-contract.md
.agent/grass-system-audit/2026-07-09T17-48-20-04-00-grass-placement-instance-parity.md
.agent/cloud-system-audit/2026-07-09T17-48-20-04-00-cloud-descriptor-cache-drift-parity.md
.agent/host-proof-audit/2026-07-09T17-48-20-04-00-additive-host-readback-contract.md
.agent/deploy-audit/2026-07-09T17-48-20-04-00-consumer-fixture-script-gate.md
```

## Next safe ledge

```txt
MyCozyIsland Source/Consumer Parity Ledger + Browser Input Result Fixture Gate
```

## Operating rules

```txt
Only push to main.
Do not create branches.
Do not work on TheCavalryOfRome.
Keep scheduled breakdown work moving.
Preserve the current visible route until source/consumer parity is fixture-proven.
```