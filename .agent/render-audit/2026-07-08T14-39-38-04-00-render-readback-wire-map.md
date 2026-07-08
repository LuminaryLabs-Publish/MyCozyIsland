# Render Audit: Render Readback Wire Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T14-39-38-04-00`

## Current render surface

`src/main-cloudform.js` constructs the complete visible route inline:

```txt
THREE.WebGLRenderer
THREE.Scene
THREE.PerspectiveCamera
HemisphereLight
DirectionalLight
FogExp2
floor mesh
terrain mesh
water plane
shoreline foam
path mesh
foliage object group
fence group
campfire mesh
smoke points
grass instancing
hero cloud point clouds
```

## Render adapters currently inline

```txt
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
frame
```

## Render readback gap

The renderer is functioning as a visual route, but it does not publish a stable `RenderHostSnapshot`.

The missing snapshot should not expose live Three.js objects. It should expose serializable summaries:

```txt
routeVersion
rendererPixelRatio
rendererToneMapping
cameraFov
cameraNear
cameraFar
sceneBackground
fogType
terrainResolution
floorResolution
shorelineSegmentCount
pathSegmentCount
foliageObjectCount
grassInstanceCount
smokeParticleCount
cloudCount
cloudPointTotal
cloudCacheEntryCount
hasWater
hasFoam
hasFence
hasCampfire
hasLegacyCozyIsland
hasAdditiveCozyIslandHost
```

## Required render proof rows

```txt
cozy-render-host-snapshot-001:
  verifies renderer/camera/scene counts are projected without exposing mutable objects

cozy-host-legacy-compatibility-001:
  verifies globalThis.CozyIsland still exposes cloudContract, cloudPointCache, and getScrollProgress

cozy-host-dom-free-001:
  verifies host-proof fixtures do not require DOM, canvas, Three.js, browser, or static server
```

## Wire rule

`RenderHostSnapshot` should be produced from descriptor and adapter metadata, not by walking arbitrary Three.js scene graph state.

Allowed inputs:

```txt
route result
descriptor bundle
known renderer config
known camera config
known adapter counts
cloud cache summary
legacy global availability boolean
```

Avoid relying on:

```txt
live renderer internals
canvas dimensions at runtime
browser-only globals
random geometry object references
Three.js object identity
```

## Next implementation boundary

Add `src/host-proof/host-snapshot.js` after source and cloud snapshots exist.

Then wire it additively into `src/main-cloudform.js` as:

```txt
const hostSnapshot = createCozyIslandHostSnapshot(...)
globalThis.CozyIslandHost = { getState: () => hostSnapshot }
```

Keep the legacy surface unchanged:

```txt
globalThis.CozyIsland
```
