# MyCozyIsland Host Proof Browser Consumer DSK Map

**Timestamp:** `2026-07-08T19-40-00-04-00`

## Goal

Map the current route into source-owned, browser-consumer-readable records before any visual rewrite.

## Active route

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> local source-domain descriptors
  -> inline render/interaction/cloud frame loop
  -> globalThis.CozyIsland compatibility diagnostics
```

## Current domain composition

```txt
static-browser-shell
  -> cloud-loader-ui
  -> error-panel-ui
  -> module-entry-route
  -> route-version-token

source-domain-runtime
  -> ocean-island-landform-domain
  -> island-foliage-domain
  -> ocean-floor-domain
  -> grass-object-domain
  -> grass-wind-domain
  -> fenced-clearing-domain
  -> campfire-object-domain
  -> smoke-particle-domain
  -> mattatz-clouds-domain
  -> cozy-hero-cloud-form-kit

render-domain-runtime
  -> terrain-render-adapter
  -> ocean-floor-render-adapter
  -> water-plane-kit
  -> shoreline-foam-kit
  -> path-render-kit
  -> foliage-render-kit
  -> fence-render-kit
  -> campfire-render-kit
  -> smoke-runtime-kit
  -> grass-instancing-kit
  -> hero-cloud-point-render-kit

interaction-domain-runtime
  -> scroll-progress-state
  -> pointer-look-state
  -> keyboard-input-state
  -> first-person-threshold-gate
  -> movement-policy-authority
  -> camera-rail-authority

host-proof-domain-next
  -> route-version-result
  -> source-profile
  -> source-fingerprint
  -> scene-source-snapshot
  -> action-frame
  -> action-result
  -> movement-policy-result
  -> camera-rail-snapshot
  -> grass-instance-snapshot
  -> hero-cloud-cache-snapshot
  -> cloud-drift-result
  -> render-host-snapshot
  -> CozyIslandHost.getState
```

## Current kit services

```txt
createOceanIslandLandformState
createOceanIslandLandformRenderContract
sampleIslandHeight
sampleIslandMasks
createDenseCozyIslandObjectGraph
createOceanFloorState
createOceanFloorRenderContract
createGrassPatchPlacementContract
createGrassWindDescriptor
createCampfireObjectGraph
createSmokeParticleDescriptor
createFencedClearingGraph
createMattatzCloudsState
createMattatzCloudRenderContract
```

## Inline services that need proof wrappers

```txt
fail
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
rand
cloudMaterial
heroCloudGeometry
heroCloudGroup
rail
valid
fp
frame
globalThis.CozyIsland
```

## Next DSK boundary

Do not extract all render behavior. First add small pure modules that record what the current route already does.

```txt
route token
  -> source descriptors
  -> source snapshot
  -> user action frame
  -> movement/camera/cloud/render proof records
  -> additive host snapshot
  -> DOM-free fixture rows
```

## Stop condition for next implementation

```txt
- legacy globalThis.CozyIsland remains unchanged
- additive globalThis.CozyIslandHost.getState() exists
- DOM-free fixture proves route/source/action/movement/rail/grass/cloud/render/host rows
- no visible renderer behavior changes
- central ledger points at the latest tracker and audits
```
