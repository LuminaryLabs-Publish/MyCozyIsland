# Turn Ledger: Core Startup Domain Integration

**Date:** 2026-07-13  
**Branch:** `main`

## Goal

Replace the product-owned manual loading percentage chain with the optional NexusEngine Core Startup Domain while keeping splash order, player-facing copy, visual transitions and DOM rendering outside Core.

## Implemented

- Installed `n:core-startup` before renderer initialization.
- Added the product-side `createCozyStartupHost()` adapter.
- Declared required preparation facts for runtime, renderer, composition, continuation, world and input.
- Reused one engine instance for startup and the complete adventure composition.
- Added renderer and atmosphere initialization timeouts.
- Reported structured browser-host failures into Core Startup.
- Selected new or restored continuation after save inspection.
- Kept product copy in `formatCozyStartupDescriptor()`.
- Drove the existing DOM loader from the renderer-neutral startup descriptor.
- Prevented loader completion before one successful `postPipeline.render()` call.
- Exposed startup state through `CozyIsland.startup` and `adventure.getState()`.
- Added a headless startup integration smoke.
- Pinned NexusEngine to the immutable Core Startup commit.

## Boundary

```txt
Core Startup
  factual launch and playable-readiness state

MyCozyIsland startup host
  product wording and browser coordination

DOM / CSS
  loading-screen presentation

Future startup sequence
  splash order, tips, minimum display time, skip and fade rules
```

## Validation

- Source syntax checked for startup host, composition runtime and browser entry module.
- `npm test` now runs startup-domain smoke before the Agriculture adventure smoke.
- GitHub Actions workflow remains configured to install dependencies and run `npm test` on pushes to `main`.

## Truth label

Do not claim live browser or GitHub Actions success until the deployed Pages route and workflow result are observed. The implementation and test wiring are on `main`; deployment propagation remains an external verification step.
