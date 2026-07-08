# MyCozyIsland DSK / Domain Breakdown

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T11-40-00-04-00`

## Selection result

The current `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

No checked non-Cavalry Publish repo was found that was fully new, absent from the central ledger, missing root `.agent` state, or otherwise undocumented.

`MyCozyIsland` was selected as the fallback follow-up because the repo has a stable visual route and an unresolved host-proof seam: source, route, movement, camera rail, and hero-cloud runtime facts are still browser-visible facts rather than fixture-readable proof records.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Current interaction loop

```txt
index.html
  -> canvas#game, loader, and error panel
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN import
  -> local island/foliage/ocean/grass/wind/campfire/smoke/fence/cloud domain-kit imports
  -> construct island, ocean floor, clearing, foliage, grass, campfire, smoke, wind, and cloud source descriptors
  -> adapt descriptors into local Three.js render objects
  -> wheel mutates scroll rail progress
  -> pointer drag mutates yaw/look
  -> keyboard movement unlocks at first-person threshold
  -> movement is accepted/rejected by clearing and campfire policy inline
  -> frame loop animates sea, fire, smoke, camera, hero-cloud drift, and renderer
  -> legacy globalThis.CozyIsland exposes cloud contract, cloud cache, and scroll progress
```

## Domain map

```txt
my-cozy-island
├─ route-authority
│  ├─ static-browser-shell
│  ├─ script-token-authority
│  ├─ active-route-version: hero-cloud-4
│  ├─ missing RouteVersionResult
│  └─ missing stale-token rejection record
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
├─ render-authority
│  ├─ terrain mesh adapter
│  ├─ ocean-floor mesh adapter
│  ├─ water plane adapter
│  ├─ shoreline foam adapter
│  ├─ path mesh adapter
│  ├─ foliage object adapter
│  ├─ fence object adapter
│  ├─ campfire object adapter
│  ├─ smoke particle runtime
│  ├─ grass instancing adapter
│  └─ hero-cloud point renderer
├─ interaction-authority
│  ├─ wheel-to-scroll-progress
│  ├─ pointer-drag-to-yaw-look
│  ├─ keyboard-to-movement-vector
│  ├─ first-person-threshold gate
│  ├─ missing ActionFrame
│  └─ missing ActionResult
├─ movement-authority
│  ├─ clearing boundary policy
│  ├─ campfire keepout policy
│  ├─ heightfield re-sampling
│  ├─ missing MovementPolicyResult
│  ├─ missing ClearingBoundaryResult
│  └─ missing CampfireKeepoutResult
├─ camera-rail-authority
│  ├─ scroll progress
│  ├─ CatmullRom rail samples
│  ├─ first-person camera override
│  └─ missing CameraRailSnapshot
├─ hero-cloud-authority
│  ├─ Mattatz cloud source state
│  ├─ hero-cloud render contract
│  ├─ point geometry cache
│  ├─ per-frame drift update
│  ├─ missing HeroCloudDescriptorSnapshot
│  ├─ missing HeroCloudCacheSnapshot
│  └─ missing CloudDriftResult
└─ proof-authority
   ├─ legacy globalThis.CozyIsland
   ├─ missing additive globalThis.CozyIslandHost
   ├─ missing HostSnapshot
   ├─ missing input/action journals
   └─ missing DOM-free fixture runner
```

## Services offered by current kits

```txt
ocean-island-landform-domain:
  createOceanIslandLandformState
  sampleIslandHeight
  sampleIslandMasks
  createOceanIslandLandformRenderContract

island-foliage-domain:
  createIslandPathNetwork
  createDenseCozyIslandObjectGraph
  createDenseCozyIslandRenderContract

ocean-floor-domain:
  createOceanFloorState
  createOceanFloorRenderContract

grass-object-domain:
  createGrassPatchPlacementContract
  createGrassPatchBatchDescriptors
  placement filtering by water/beach/wet-sand/rock/cliff/path/exclusion zones

grass-wind-domain:
  createGrassWindDescriptor

campfire-object-domain:
  createCampfireObjectGraph

smoke-particle-domain:
  createSmokeParticleDescriptor

fenced-clearing-domain:
  createFencedClearingGraph
  emits fence posts, player-avatar anchor, collision boundary, clearance zones, and object-exclusion zones

mattatz-clouds-domain:
  createMattatzCloudsState
  createMattatzCloudRenderContract

cozy-hero-cloud-form-kit:
  readable hero-cloud form descriptor intent
  point-cloud/lobe/placement/drift render handoff
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
cozy-scroll-camera-rail-kit
cozy-pointer-look-kit
cozy-keyboard-movement-kit
cozy-clearing-boundary-policy-kit
cozy-campfire-keepout-policy-kit
cozy-hero-cloud-point-render-kit
cozy-hero-cloud-cache-kit
cozy-cloud-drift-kit
cozy-legacy-global-host-kit
```

Next-cut proof kits:

```txt
cozy-route-version-result-kit
cozy-source-profile-kit
cozy-source-fingerprint-kit
cozy-scene-source-snapshot-kit
cozy-host-snapshot-kit
cozy-action-frame-contract-kit
cozy-action-result-contract-kit
cozy-movement-policy-result-kit
cozy-camera-rail-snapshot-kit
cozy-hero-cloud-descriptor-snapshot-kit
cozy-hero-cloud-cache-snapshot-kit
cozy-cloud-drift-result-kit
cozy-dom-free-fixture-runner-kit
cozy-replay-parity-smoke-kit
```

## Main architectural finding

The current visual route is acceptable and should not be rewritten first.

The next implementation needs additive proof helpers beside `src/main-cloudform.js`, not a renderer rewrite.

The host-proof surface should make current route/source/input/movement/rail/cloud facts inspectable through stable result records while keeping the existing `globalThis.CozyIsland` compatibility surface intact.
