# My Cozy Island Project Breakdown

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T17-48-20-04-00`

**Branch target:** `main`

**Runtime source changed:** no

## Goal

Refresh the repo-local architecture record, identify the complete interaction loop, domains, services, and kits, and synchronize the central LuminaryLabs ledger without changing runtime behavior.

## Completion checklist

- [x] Listed all repositories available through the `LuminaryLabs-Publish` GitHub installation.
- [x] Compared eligible repositories against `LuminaryLabs-Dev/LuminaryLabs` ledger timestamps.
- [x] Confirmed root `.agent` state is recorded for every eligible repository.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repository: `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Read the active HTML route and package surface.
- [x] Read the active browser runtime.
- [x] Read every explicit source kit used by the route, including the nested hero-cloud kit.
- [x] Identified interaction loop, domains, services, and kits.
- [x] Refreshed required root `.agent` files.
- [x] Added timestamped architecture, render, interaction, grass, cloud, host-proof, deploy, and turn-ledger entries.
- [x] Pushed repo-local findings to `main`.
- [ ] Synchronize the central repo ledger and internal change log.

## Selection comparison

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T16-00-13-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T17-33-18-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T15-09-09-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T16-29-23-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T15-31-40-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T16-38-14-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T15-39-08-04-00
LuminaryLabs-Publish/MyCozyIsland         selected / central latest 2026-07-09T14-39-07-04-00 / repo-local latest 2026-07-09T17-38-53-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T16-58-52-04-00
```

`MyCozyIsland` was the oldest eligible central entry and also had newer repo-local state than central tracking.

## Product and route profile

```txt
product: standalone cozy island hero-cloud scene
host: static HTML + browser ES modules
renderer: Three.js 0.160.0 from CDN
entry: index.html
active script: ./src/main-cloudform.js?v=hero-cloud-4
package scripts: npm start only
legacy diagnostic surface: globalThis.CozyIsland
```

## Interaction loop

```txt
load index.html
  -> create canvas, cloud loader, and error panel
  -> import Three.js and source-domain kits
  -> create island state and landform contract
  -> create clearing, player anchor, and collision boundary
  -> create foliage graph and path network
  -> create ocean-floor state and render contract
  -> create wind, campfire, smoke, grass, and cloud contracts
  -> create WebGL renderer, scene, camera, lights, and fog
  -> adapt source contracts into Three.js objects
  -> add floor, terrain, water, shoreline, path, foliage, fence, fire, smoke, grass, and clouds
  -> hide loader
  -> install resize, keyboard, wheel, and pointer handlers
  -> wheel mutates normalized progress
  -> pointer drag mutates yaw/pitch according to progress range
  -> progress < 0.985 selects Catmull-Rom rail camera
  -> progress >= 0.985 selects WASD first-person movement
  -> movement checks clearing boundary and campfire keepout
  -> frame updates sea height, smoke particles, flame scale, cloud drift, camera, and renderer
  -> expose cloud contract, live cached geometries, and scroll progress through globalThis.CozyIsland
```

## Domain inventory

### Source and world domains

```txt
island-landform-state
island-height-sampling
island-mask-sampling
island-heightfield-contract
shoreline-contract
ocean-floor-state
ocean-floor-height-sampling
ocean-floor-heightfield
ocean-floor-object-placement
ocean-water-material
island-path-network
foliage-object-graph
fenced-clearing-object-graph
player-avatar-anchor
clearing-collision-boundary
clearance-zone
object-exclusion-zone
campfire-object-graph
campfire-collision
smoke-particle-descriptor
grass-wind-descriptor
grass-placement-contract
grass-static-batch-descriptor
mattatz-cloud-state
hero-cloud-form-descriptor
hero-cloud-layer-descriptor
hero-cloud-render-contract
```

### Render-consumer domains

```txt
three-render-host
scene-composition
terrain-mesh-adapter
ocean-floor-mesh-adapter
water-plane-adapter
shoreline-foam-adapter
path-mesh-adapter
foliage-mesh-adapter
fence-mesh-adapter
campfire-mesh-adapter
smoke-particle-adapter
grass-instanced-mesh-adapter
hero-cloud-point-generation
hero-cloud-geometry-cache
cloud-shader-material
lighting-and-fog
render-frame
```

### Interaction and simulation domains

```txt
loader-progress-projection
error-projection
resize-consumer
keyboard-input
wheel-progress-input
pointer-drag-input
player-pose
camera-rail
first-person-movement
movement-validity
smoke-frame-simulation
flame-frame-animation
sea-frame-animation
cloud-drift-frame
legacy-host-diagnostics
```

### Planned proof domains

```txt
route-token-readback
source-profile
source-fingerprint
scene-source-snapshot
browser-input-action-frame
input-result
input-result-journal
movement-policy-result
camera-rail-snapshot
grass-placement-snapshot
grass-instance-snapshot
cloud-descriptor-snapshot
cloud-cache-snapshot
cloud-drift-result
render-consumption-ledger
render-host-snapshot
cozy-island-host-snapshot
browser-consumer-fixture
central-ledger-readback
```

## Explicit kit inventory and services

### `ocean-island-landform-domain`

```txt
createOceanIslandLandformState
sampleIslandHeight
sampleIslandMasks
createOceanIslandLandformRenderContract
```

Owns deterministic island shape, elevation, semantic masks, heightfield samples, and shoreline points.

### `island-foliage-domain`

```txt
createIslandPathNetwork
createDenseCozyIslandObjectGraph
createDenseCozyIslandRenderContract
```

Owns path descriptors and deterministic procedural foliage/object placement.

### `ocean-floor-domain`

```txt
createOceanFloorState
sampleOceanFloorHeight
createOceanFloorHeightfield
createOceanFloorObjectPlacements
createOceanFloorRenderContract
```

Owns seabed state, height sampling, heightfield, reef/coral/rock/boulder placements, and water material data.

### `grass-object-domain`

```txt
createGrassPatchPlacementContract
createGrassPatchBatchDescriptors
```

Owns deterministic, path-aware, mask-aware, exclusion-aware grass patch placement and batch counts.

### `grass-wind-domain`

```txt
createGrassWindDescriptor
```

Owns normalized direction, sway, gust strength, gust frequency, and phase seed.

### `fenced-clearing-domain`

```txt
createFencedClearingGraph
```

Owns fence posts, player anchor, collision boundary, clearance zones, and object-exclusion zones.

### `campfire-object-domain`

```txt
createCampfireObjectGraph
createCampfireObject
```

Owns campfire root state, collision, firewood, embers, flame, smoke anchor, and warm-light descriptors.

### `smoke-particle-domain`

```txt
createSmokeParticleDescriptor
```

Owns particle count, spawn radius, lifetime, rise, turbulence, wind response, and render descriptor.

### `cozy-hero-cloud-form-kit`

```txt
createCozyHeroCloudFormDescriptor
createCozyHeroCloudLayerDescriptor
createCozyHeroCloudRenderContract
```

Owns hero-cloud silhouette, point-cloud settings, placement, lighting, drift, and renderer boundary.

### `mattatz-clouds-domain`

```txt
createMattatzCloudsState
createMattatzCloudRenderContract
```

Owns weather-level cloud state and wraps the hero-cloud kit into the active cloud contract.

## Runtime-implied kit inventory

```txt
cozy-static-shell-kit
cozy-cloud-loader-kit
cozy-error-panel-kit
cozy-cloudform-entry-kit
cozy-route-script-token-kit
cozy-three-render-host-kit
cozy-scene-composition-kit
cozy-terrain-render-kit
cozy-ocean-floor-render-kit
cozy-water-plane-kit
cozy-shoreline-foam-kit
cozy-path-render-kit
cozy-foliage-render-kit
cozy-fence-render-kit
cozy-campfire-render-kit
cozy-smoke-render-kit
cozy-grass-instanced-render-kit
cozy-hero-cloud-point-cache-kit
cozy-cloud-drift-frame-kit
cozy-resize-consumer-kit
cozy-keyboard-input-kit
cozy-wheel-progress-kit
cozy-pointer-look-kit
cozy-camera-rail-kit
cozy-first-person-movement-kit
cozy-movement-validity-kit
cozy-render-frame-loop-kit
cozy-legacy-host-diagnostics-kit
```

## Main findings

1. The source descriptor layer is already meaningfully split into atomic kits.
2. The browser consumer is still monolithic and result-poor.
3. Movement and pointer no-op/rejection paths are silent.
4. Ocean-floor object placements are generated but not consumed by the active scene.
5. Several foliage source types fall through to the generic rock adapter.
6. Grass source and instanced-consumer counts are not formally reconciled.
7. Cloud cache identity uses only `cloud.id`, so descriptor drift can reuse stale geometry.
8. Legacy diagnostics expose live Three.js geometry objects rather than serializable proof state.
9. The next improvement should prove source/consumer parity without changing visible output.

## Next safe ledge

```txt
MyCozyIsland Source/Consumer Parity Ledger + Browser Input Result Fixture Gate
```

## Validation statement

This run changed documentation only. No runtime source, route, visual behavior, package scripts, or deployment configuration was changed. No browser, GPU, npm, or DOM-free fixture validation was run.