# Current Audit: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Audit timestamp:** `2026-07-08T02:09:17-04:00`

## Summary

`MyCozyIsland` is a small static Three.js publish app that proves a cozy island scene with a scroll-driven sky-to-first-person camera rail, local domain-kit source descriptors, a hero cloud system, campfire, smoke, grass, foliage, shoreline, ocean floor, and water surface.

The repo has useful local kits and a working route shape, but the runtime host is still concentrated in `src/main-cloudform.js` rather than split into small source, action, host, replay, and render-handoff services.

## Evidence checked

```txt
README.md
index.html
package.json
src/main-cloudform.js
src/kits/ocean-island-landform-domain/index.js
src/kits/island-foliage-domain/index.js
docs/cloud-kits.md
LuminaryLabs-Dev/LuminaryLabs repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
```

## Current route

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-3
```

## Current interaction loop

```txt
static browser route
  -> canvas#game
  -> cloud loader + error panel
  -> Three.js CDN import
  -> local domain-kit imports
  -> build island source contracts
  -> build Three.js scene objects inline
  -> scroll camera rail from sky view into clearing
  -> pointer drag look/yaw
  -> keyboard first-person movement after threshold
  -> movement policy rejects outside clearing/campfire bounds
  -> campfire, smoke, hero cloud drift, and camera animate per frame
  -> limited globalThis.CozyIsland diagnostics surface
```

## Current domain shape

```txt
my-cozy-island
├─ static-shell
│  ├─ html-canvas-host
│  ├─ cloud-loader-ui
│  └─ error-panel-ui
├─ route-entry
│  ├─ module-version-token
│  └─ main-cloudform-entry
├─ source-authoring
│  ├─ ocean-island-landform-domain
│  ├─ island-foliage-domain
│  ├─ ocean-floor-domain
│  ├─ grass-object-domain
│  ├─ grass-wind-domain
│  ├─ campfire-object-domain
│  ├─ smoke-particle-domain
│  ├─ fenced-clearing-domain
│  ├─ mattatz-clouds-domain
│  └─ cozy-hero-cloud-form-kit
├─ renderer-host
│  ├─ terrain-mesh-adapter
│  ├─ ocean-floor-mesh-adapter
│  ├─ water-plane-adapter
│  ├─ shoreline-foam-adapter
│  ├─ path-mesh-adapter
│  ├─ foliage-object-adapter
│  ├─ fence-object-adapter
│  ├─ campfire-object-adapter
│  ├─ smoke-particle-runtime
│  ├─ grass-instancing-adapter
│  └─ hero-cloud-point-renderer
├─ interaction-host
│  ├─ scroll-progress-state
│  ├─ camera-rail-sampler
│  ├─ pointer-look-state
│  ├─ keyboard-movement-state
│  ├─ first-person-threshold-gate
│  ├─ clearing-boundary-policy
│  └─ campfire-keepout-policy
├─ cloud-runtime
│  ├─ hero-cloud-geometry-cache
│  ├─ hero-cloud-point-cloud-descriptor
│  └─ cloud-drift-frame-update
└─ diagnostics
   ├─ legacy-global-cozy-island
   └─ missing-host-action-fixture-gate
```

## Services currently offered by kits

```txt
ocean-island-landform-domain
  createOceanIslandLandformState
  sampleIslandHeight
  sampleIslandMasks
  createOceanIslandLandformRenderContract

island-foliage-domain
  createIslandPathNetwork
  createDenseCozyIslandObjectGraph
  createDenseCozyIslandRenderContract

ocean-floor-domain
  createOceanFloorState
  createOceanFloorRenderContract

grass-object-domain
  createGrassPatchPlacementContract

grass-wind-domain
  createGrassWindDescriptor

campfire-object-domain
  createCampfireObjectGraph

smoke-particle-domain
  createSmokeParticleDescriptor

fenced-clearing-domain
  createFencedClearingGraph

mattatz-clouds-domain
  createMattatzCloudsState
  createMattatzCloudRenderContract

cozy-hero-cloud-form-kit
  creates a readable single hero cloud form descriptor
  keeps the cloud out of the camera corridor
  hands off cached point-cloud puff intent to the renderer
```

## Main architectural finding

The local source kits are already fairly atomic for content generation, but `src/main-cloudform.js` still acts as a large composite host that owns renderer construction, animation, camera rail, DOM events, movement gating, cloud geometry cache, and global diagnostics.

The next improvement should not be more visual churn. It should be host-action authority and replay proof so the scene can be validated without only looking at the browser.
