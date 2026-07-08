# Current Audit: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Audit timestamp:** `2026-07-08T07:30:30-04:00`

## Summary

`MyCozyIsland` is a standalone static Three.js publish app that proves a cozy island scene with local source descriptor kits, a scroll-driven sky-to-first-person camera rail, a fenced campfire clearing, grass, foliage, shoreline, ocean floor, smoke, and a readable hero-cloud form.

The app is visually coherent enough for the next pass to avoid art expansion. The highest-value seam is now host proof: route, source, action, movement, camera, and cloud facts need fixture-readable records that can run without opening the browser.

## Evidence checked

```txt
LuminaryLabs-Publish accessible repository list
LuminaryLabs-Dev/LuminaryLabs repo-ledger search results
README.md
index.html
package.json
src/main-cloudform.js excerpt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
```

## Repo selection result

```txt
Checked Publish repos:
  HorrorCorridor
  AetherVale
  TheOpenAbove
  TheCavalryOfRome
  PhantomCommand
  PrehistoricRush
  ZombieOrchard
  IntoTheMeadow
  MyCozyIsland
  TheUnmappedHouse

Excluded:
  TheCavalryOfRome

Central ledger state:
  checked non-excluded repos are represented in LuminaryLabs-Dev/LuminaryLabs repo-ledger

Root .agent state:
  checked follow-up candidates have root .agent/START_HERE.md state

Selected repo:
  LuminaryLabs-Publish/MyCozyIsland
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
  -> build island/ocean/grass/wind/clearing/campfire/smoke/cloud source contracts
  -> build Three.js scene objects inline
  -> scroll camera rail from sky view into clearing
  -> pointer drag look/yaw
  -> keyboard first-person movement after threshold
  -> movement policy accepts or rejects movement against clearing/campfire rules
  -> campfire, smoke, hero cloud drift, camera, and movement animate per frame
  -> limited globalThis.CozyIsland diagnostics surface
```

## Current domain shape

```txt
my-cozy-island
├─ static-browser-shell
│  ├─ html-canvas-host
│  ├─ cloud-loader-ui
│  └─ error-panel-ui
├─ route-authority
│  ├─ active-route-script-token
│  ├─ main-cloudform-entry
│  ├─ hero-cloud-3-version-string
│  ├─ missing RouteVersionResult
│  └─ missing route mismatch reason
├─ source-authority
│  ├─ ocean-island-landform-domain
│  ├─ island-foliage-domain
│  ├─ ocean-floor-domain
│  ├─ grass-object-domain
│  ├─ grass-wind-domain
│  ├─ campfire-object-domain
│  ├─ smoke-particle-domain
│  ├─ fenced-clearing-domain
│  ├─ mattatz-clouds-domain
│  ├─ cozy-hero-cloud-form-kit
│  ├─ missing SourceProfile
│  ├─ missing SourceFingerprint
│  └─ missing SceneSourceSnapshot
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
│  ├─ missing ActionFrame records
│  └─ missing ActionResult records
├─ movement-authority
│  ├─ clearing-boundary-policy
│  ├─ campfire-keepout-policy
│  ├─ missing MovementPolicyResult
│  ├─ missing ClearingBoundaryResult
│  └─ missing CampfireKeepoutResult
├─ cloud-runtime
│  ├─ hero-cloud-geometry-cache
│  ├─ hero-cloud-point-cloud-descriptor
│  ├─ cloud-drift-frame-update
│  ├─ missing HeroCloudDescriptorSnapshot
│  ├─ missing HeroCloudCacheSnapshot
│  └─ missing CloudDriftResult
└─ diagnostics-proof
   ├─ legacy-global-cozy-island
   ├─ missing additive CozyIslandHost surface
   ├─ missing HostSnapshot records
   ├─ missing action/input journals
   └─ missing DOM-free host-proof fixture gate
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
  createGrassPatchBatchDescriptors
  filters water, beach, wet sand, rock, cliff, path, and exclusion-zone placements

grass-wind-domain
  createGrassWindDescriptor

campfire-object-domain
  createCampfireObjectGraph

smoke-particle-domain
  createSmokeParticleDescriptor

fenced-clearing-domain
  createFencedClearingGraph
  emits fence posts, player-avatar anchor, collision boundary, clearance zones, and object-exclusion zones

mattatz-clouds-domain
  createMattatzCloudsState
  createMattatzCloudRenderContract

cozy-hero-cloud-form-kit
  creates a readable single hero cloud form descriptor
  hands off point-cloud/lobe/placement intent to the renderer
```

## Kits identified

Implemented explicit kits:

```txt
ocean-island-landform-domain
island-foliage-domain
ocean-floor-domain
grass-object-domain
grass-wind-domain
campfire-object-domain
smoke-particle-domain
fenced-clearing-domain
mattatz-clouds-domain
cozy-hero-cloud-form-kit
```

Runtime-implied kits:

```txt
cozy-static-shell-kit
cozy-cloud-loader-kit
cozy-error-panel-kit
cozy-cloudform-entry-kit
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
cozy-smoke-runtime-kit
cozy-grass-instancing-kit
cozy-hero-cloud-point-render-kit
cozy-hero-cloud-cache-kit
cozy-hero-cloud-drift-kit
cozy-scroll-camera-rail-kit
cozy-pointer-look-kit
cozy-keyboard-movement-kit
cozy-clearing-boundary-policy-kit
cozy-campfire-keepout-policy-kit
cozy-legacy-global-host-kit
```

Next-cut proof kits:

```txt
cozy-active-route-version-kit
cozy-route-script-token-kit
cozy-source-profile-kit
cozy-source-fingerprint-kit
cozy-scene-source-snapshot-kit
cozy-host-snapshot-kit
cozy-action-frame-contract-kit
cozy-action-result-contract-kit
cozy-action-rejection-reason-kit
cozy-movement-policy-result-kit
cozy-clearing-boundary-result-kit
cozy-campfire-keepout-result-kit
cozy-camera-rail-snapshot-kit
cozy-hero-cloud-descriptor-snapshot-kit
cozy-hero-cloud-cache-snapshot-kit
cozy-cloud-drift-result-kit
cozy-action-journal-kit
cozy-input-journal-kit
cozy-gamehost-diagnostics-kit
cozy-dom-free-fixture-runner-kit
cozy-replay-parity-smoke-kit
```

## Current high-value gap

The renderer can stay inline for now. The urgent gap is not a visual rewrite.

The urgent gap is that browser-host facts are not proof facts:

```txt
route token -> no RouteVersionResult
source constants -> no SourceProfile
composed descriptors -> no SceneSourceSnapshot
scroll/pointer/keyboard events -> no ActionFrame
policy checks -> no MovementPolicyResult
camera rail state -> no CameraRailSnapshot
cloud cache -> no HeroCloudCacheSnapshot
cloud animation -> no CloudDriftResult
legacy global -> no additive CozyIslandHost proof surface
```

## New audit artifact

```txt
.agent/host-proof-audit/acceptance-ledger.md
```

This ledger defines pass/fail cases for the next code pass.

## Next safe ledge

```txt
MyCozyIsland Host Proof Acceptance Fixture Gate
```

Keep the current route, visuals, and `globalThis.CozyIsland` compatibility stable.

Add pure host-proof modules and fixture cases first, then wire the browser runtime to them additively.
