# Project Breakdown: MyCozyIsland

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T21-58-34-04-00`

## Selection

The accessible `LuminaryLabs-Publish` repository list was compared against central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`MyCozyIsland` was selected as the oldest eligible fallback by current central alignment. Its last central alignment was `2026-07-08T19-50-20-04-00`, older than the checked non-excluded follow-up set.

## Publish repo comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central alignment 2026-07-08T20-21-59-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / central alignment 2026-07-08T20-38-28-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central alignment 2026-07-08T21-08-41-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / central alignment 2026-07-08T21-18-39-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / central alignment 2026-07-08T21-00-12-04-00
LuminaryLabs-Publish/MyCozyIsland        selected / oldest eligible central alignment 2026-07-08T19-50-20-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central alignment 2026-07-08T20-10-32-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / central alignment 2026-07-08T20-52-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central alignment 2026-07-08T21-40-45-04-00
```

## Current route

```txt
index.html
  -> canvas#game
  -> #cloud-loader
  -> #error
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN import
  -> local descriptor kit imports
  -> inline browser/render/interaction loop
```

## Current interaction loop

```txt
static browser route
  -> load src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN and local source-domain kits
  -> create island, floor, foliage, grass, wind, clearing, campfire, smoke, and cloud descriptors
  -> create Three.js renderer, scene, camera, meshes, points, lights, fog, water, foam, path, grass, and cloud geometry cache
  -> install resize, keyboard, wheel, pointerdown, pointerup, pointermove handlers
  -> wheel changes scroll progress directly
  -> rail() samples sky-to-eye camera curve while progress < 0.985
  -> pointer changes yaw before first-person and yaw/pitch after first-person
  -> keyboard movement unlocks at progress >= 0.985
  -> valid(next) accepts/rejects movement by clearing radius and campfire keepout
  -> frame updates sea bob, first-person movement or camera rail, smoke, flame, cloud drift, and renderer
  -> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
```

## Target interaction loop

```txt
RouteVersionResult
  -> SourceProfile
  -> SourceFingerprint
  -> SceneSourceSnapshot
  -> BrowserInputActionFrame
  -> ActionResult
  -> MovementPolicyResult
  -> CameraRailSnapshot
  -> GrassInstanceSnapshot
  -> HeroCloudDescriptorSnapshot
  -> HeroCloudCacheSnapshot
  -> CloudDriftResult
  -> RenderHostSnapshot
  -> CozyIslandHostSnapshot
  -> globalThis.CozyIslandHost.getState()
  -> DOM-free browser consumer fixture rows
```

## Domains in use

```txt
static-browser-shell
cloud-loader-ui
error-panel-ui
module-entry-route
route-version-token
three-cdn-runtime
local-source-domain-runtime
island-landform-source
ocean-floor-source
foliage-source
path-network-source
grass-placement-source
grass-wind-source
fenced-clearing-source
campfire-source
smoke-particle-source
mattatz-cloud-source
cozy-hero-cloud-source
inline-three-render-host
terrain-render-consumer
floor-render-consumer
water-render-consumer
shoreline-foam-render-consumer
path-render-consumer
foliage-render-consumer
fence-render-consumer
campfire-render-consumer
smoke-runtime-consumer
grass-instancing-consumer
hero-cloud-point-render-consumer
hero-cloud-geometry-cache
hero-cloud-drift-runtime
scroll-camera-rail
pointer-look-input
keyboard-first-person-input
movement-policy
clearing-boundary-policy
campfire-keepout-policy
frame-loop-runtime
legacy-global-diagnostics
host-proof-source-records
host-state-projection
fixture-replay-contract
central-ledger-readback
```

## Services the kits offer

```txt
implemented descriptor services:
  createOceanIslandLandformState
  createOceanIslandLandformRenderContract
  sampleIslandHeight
  sampleIslandMasks
  createDenseCozyIslandObjectGraph
  createOceanFloorState
  createOceanFloorRenderContract
  createGrassPatchPlacementContract
  createGrassPatchBatchDescriptors
  createGrassWindDescriptor
  createCampfireObjectGraph
  createSmokeParticleDescriptor
  createFencedClearingGraph
  createMattatzCloudsState
  createMattatzCloudRenderContract
  createCozyHeroCloudRenderContract

implemented inline browser services:
  meshGrid
  terrainMesh
  floorMesh
  waterMesh
  foamMesh
  pathMesh
  objGroup
  fenceGroup
  campfireMesh
  smokeMesh
  updateSmoke
  grassMesh
  cloudMaterial
  heroCloudGeometry
  heroCloudGroup
  resize
  rail
  valid
  fp
  frame
  globalThis.CozyIsland

needed source/proof services:
  createRouteVersionResult
  createSourceProfile
  createSourceFingerprint
  createSceneSourceSnapshot
  createBrowserInputActionFrame
  createActionResult
  appendInputJournalEntry
  createMovementPolicyResult
  createCameraRailSnapshot
  createGrassInstanceSnapshot
  createHeroCloudDescriptorSnapshot
  createHeroCloudCacheSnapshot
  createCloudDriftResult
  createRenderHostSnapshot
  createCozyIslandHostSnapshot
  runBrowserConsumerFixtureRows
```

## Kits identified

```txt
implemented explicit kits:
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

runtime-implied kits:
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

next-cut proof kits:
  cozy-route-version-result-kit
  cozy-source-profile-kit
  cozy-source-fingerprint-kit
  cozy-scene-source-snapshot-kit
  cozy-browser-input-action-frame-kit
  cozy-action-result-kit
  cozy-input-journal-kit
  cozy-movement-policy-result-kit
  cozy-camera-rail-snapshot-kit
  cozy-grass-instance-snapshot-kit
  cozy-hero-cloud-descriptor-snapshot-kit
  cozy-hero-cloud-cache-snapshot-kit
  cozy-cloud-drift-result-kit
  cozy-render-host-snapshot-kit
  cozy-island-host-state-kit
  cozy-browser-consumer-fixture-kit
```

## Main finding

`MyCozyIsland` should not receive visual expansion next. The scene is already composed from meaningful source kits, but the browser host loses proof because it mutates runtime state and renders descriptors inline.

The next source pass should add pure source records and a DOM-free fixture first, then consume those records additively in `src/main-cloudform.js` through `globalThis.CozyIslandHost.getState()`.

## Next safe ledge

```txt
MyCozyIsland Browser Consumer Source Wire + Host Projection Fixture Gate
```

## Files updated in this pass

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

## Files added in this pass

```txt
.agent/trackers/2026-07-08T21-58-34-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T21-58-34-04-00.md
.agent/architecture-audit/2026-07-08T21-58-34-04-00-browser-consumer-source-wire-dsk-breakdown.md
.agent/render-audit/2026-07-08T21-58-34-04-00-render-host-consumer-projection-map.md
.agent/interaction-audit/2026-07-08T21-58-34-04-00-input-action-result-consumer-map.md
.agent/cloud-system-audit/2026-07-08T21-58-34-04-00-cloud-drift-cache-result-map.md
.agent/grass-system-audit/2026-07-08T21-58-34-04-00-grass-instance-host-projection-map.md
.agent/host-proof-audit/2026-07-08T21-58-34-04-00-cozy-island-host-state-splice-contract.md
.agent/deploy-audit/2026-07-08T21-58-34-04-00-fixture-static-route-validation-map.md
```

## Validation status

```txt
runtime source changed: no
local validation run: no
browser validation run: no
branch created: no
pushed to main: yes
```
