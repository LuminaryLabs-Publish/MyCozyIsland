# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-09T23-41-15-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual work on `MyCozyIsland`.

Read it before changing runtime source.

## Selection result

The current public `LuminaryLabs-Publish` repository list was compared with `LuminaryLabs-Dev/LuminaryLabs` central ledger state and sampled root `.agent` state.

No eligible non-Cavalry repository was new, ledger-absent, missing root `.agent` state, recently added but undocumented, or otherwise undocumented. `MyCozyIsland` was selected as the oldest eligible documented fallback by central-ledger recency.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

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
  -> pointer mutates yaw while progress < 0.85
  -> pointer is an implicit no-op in the 0.85 to 0.985 transition band
  -> pointer mutates yaw/pitch while progress >= 0.985
  -> rail camera while progress < 0.985
  -> first-person WASD movement while progress >= 0.985
  -> movement silently accepted or rejected by clearing radius and campfire keepout
  -> frame updates sea, smoke, flame, clouds, camera, and renderer
  -> expose cloud contract, cached geometries, and scroll progress through legacy diagnostics
```

## Read this pass first

```txt
.agent/trackers/2026-07-09T23-41-15-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T23-41-15-04-00.md
.agent/architecture-audit/2026-07-09T23-41-15-04-00-host-proof-fixture-catchup-dsk-map.md
.agent/render-audit/2026-07-09T23-41-15-04-00-render-consumer-proof-ledger.md
.agent/interaction-audit/2026-07-09T23-41-15-04-00-input-movement-result-readback.md
.agent/grass-system-audit/2026-07-09T23-41-15-04-00-grass-placement-instance-parity.md
.agent/cloud-system-audit/2026-07-09T23-41-15-04-00-cloud-cache-drift-parity.md
.agent/host-proof-audit/2026-07-09T23-41-15-04-00-cozy-island-host-proof-contract.md
.agent/deploy-audit/2026-07-09T23-41-15-04-00-source-consumer-fixture-gate.md
```

## Main finding

`MyCozyIsland` should not get a visual rewrite next. The source descriptor layer is useful, but the browser consumer lacks proof rows. The next implementation should add source fingerprints, input/movement results, grass/cloud parity snapshots, render consumption rows, and a serializable additive host readback surface.

## Next safe ledge

```txt
MyCozyIsland Host Proof Catch-up + Source/Consumer Fixture Gate
```

## Operating rules

```txt
Only push to main.
Do not create branches.
Do not work on TheCavalryOfRome.
Keep scheduled breakdown work moving.
Preserve the current visible route until source/consumer parity is fixture-proven.
```
