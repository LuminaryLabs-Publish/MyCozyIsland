# Render Consumption Readback Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T17-48-20-04-00`

## Active render route

```txt
source descriptors
  -> inline adapter functions in src/main-cloudform.js
  -> Three.js geometry/material/object creation
  -> scene.add(...)
  -> frame updates
  -> renderer.render(scene, camera)
```

## Source-to-render map

| Source family | Source output | Active consumer | Current proof gap |
|---|---|---|---|
| Island landform | 129×129 heightfield plus shoreline | `terrainMesh`, `foamMesh` | No sample/vertex/index/shoreline parity row |
| Ocean floor | 53×53 heightfield, object placements, water material | `floorMesh`, `waterMesh` | Object placements are generated but not consumed |
| Path network | 18 path segments | `pathMesh` | No segment-to-quad parity row |
| Foliage graph | Trees and non-tree objects | `objGroup` | Non-tree types collapse to generic rock geometry |
| Clearing graph | 24 posts, player anchor, boundary, exclusion zones | `fenceGroup`, movement policy, source filtering | No row proving which records are visual, collision-only, or exclusion-only |
| Campfire graph | Root plus five child descriptors | `campfireMesh` | Adapter reconstructs visual details instead of consuming all child records explicitly |
| Smoke descriptor | 96-particle emitter | `smokeMesh`, `updateSmoke` | No descriptor-to-buffer count or fixed-step result row |
| Grass placement | Up to 140 path/exclusion-aware patches | `grassMesh` | No requested/placed/instance count parity; batch descriptors unused |
| Hero cloud contract | One cloud, 420 points | `heroCloudGroup`, `heroCloudGeometry` | Cache and point-count parity not fingerprinted |

## Renderer state

```txt
renderer: THREE.WebGLRenderer
antialias: true
powerPreference: high-performance
pixel ratio cap: 1.5
output color space: sRGB
tone mapping: ACES Filmic
exposure: 1.08
scene background: #f3cfa6
fog: FogExp2 #f3cfa6 density 0.00072
camera: PerspectiveCamera fov 58 near 0.1 far 6800
lights: HemisphereLight + DirectionalLight + campfire PointLight
```

No serializable renderer snapshot currently records these values.

## Readback contract

Add one `renderConsumptionLedger` entry per source family:

```txt
sourceDomain
sourceId
sourceFingerprint
adapterId
requestedCount
generatedCount
consumedCount
skippedCount
skipReasonCounts
threeObjectCount
geometryCount
materialCount
status
```

## Required fixture assertions

```txt
terrain heightfield sample count = 129 * 129
terrain mesh vertex count = terrain sample count
ocean floor sample count = 53 * 53
shoreline source count = tube path source count
path segment count = rendered path mesh count
clearing fence post count = rendered post count
grass instance count = placement patch count
smoke buffer point count = descriptor particle count
cloud point count = descriptor pointCount
cloud cache fingerprint = current descriptor fingerprint
scene contains one consumer root for every active source family
```

## Known render defects outside this documentation pass

```txt
ocean-floor object placements are dead source output
bushes, ferns, logs, driftwood, and reefs do not have type-specific visual adapters
foliage tree geometry remains primitive cylinders and dodecahedrons
grass uses one cone per patch rather than a dense patch geometry
cloud cache can become stale when descriptor content changes without id change
```

These are real fidelity and structural issues, but the next implementation should first make consumption measurable. A visual rewrite before parity proof would make regressions harder to diagnose.

## Next safe ledge

```txt
Render Consumption Ledger + Serializable Render Host Snapshot
```