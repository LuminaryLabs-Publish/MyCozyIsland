# Render Audit: Render Snapshot Source Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T17-00-36-04-00`

## Current render surface

The route renders a full-screen Three.js canvas from `src/main-cloudform.js`.

The render surface includes:

```txt
terrain heightfield mesh
ocean floor heightfield mesh
water plane
shoreline foam tube
path mesh
foliage object graph meshes
fenced clearing posts/rails
campfire mesh and point light
smoke particle Points
grass InstancedMesh
hero cloud point groups
scene fog, hemisphere light, directional sun
perspective camera
```

## Current source/render coupling

`src/main-cloudform.js` currently builds source descriptors and render objects inline.

Important render helpers are:

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

## Gap

The render surface is visible but not replayable.

There is no stable record for:

```txt
renderer pixel ratio
scene background/fog
camera near/far/fov
terrain sample count
ocean floor sample count
path segment count
foliage object count after clearing exclusion
fence post/rail count
smoke particle count
grass instance count
cloud object count
cloud point count
cached cloud geometry count
last camera rail sample
last movement result
last cloud drift result
```

## RenderHostSnapshot target

Add a pure projection helper that accepts plain facts from the browser composition and returns:

```txt
RenderHostSnapshot = {
  schema: "cozy.renderHostSnapshot.v1",
  routeVersion,
  renderer: {
    pixelRatio,
    outputColorSpace,
    toneMapping,
    toneMappingExposure
  },
  scene: {
    background,
    fogType,
    fogDensity,
    objectBuckets
  },
  camera: {
    fov,
    near,
    far,
    aspect,
    mode,
    railProgress
  },
  sourceCounts: {
    terrainSamples,
    floorSamples,
    shorelineSegments,
    pathSegments,
    grassInstances,
    smokeParticles,
    cloudGroups,
    cloudPoints,
    cachedCloudGeometries
  }
}
```

## Browser splice point

Add render snapshot projection after the render objects exist:

```txt
const renderer = new THREE.WebGLRenderer(...)
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(...)
const sea = waterMesh(...)
const fire = campfireMesh(...)
const smoke = smokeMesh(...)
const grassObj = grassMesh(grass)
const clouds = heroCloudGroup(cloudContract)
```

Then update the latest render snapshot from `frame(now)` without modifying render behavior.

## Fixture rows

```txt
cozy-render-host-snapshot-001:
  proves route version, renderer settings, camera settings, source counts, and compatibility with static route

cozy-render-host-cloud-count-001:
  proves cloud point and cached geometry counts are summarized without leaking Three.js geometry references

cozy-render-host-grass-count-001:
  proves grass instance count is exposed without changing grass rendering
```

## Guardrail

Do not split render adapters out of `src/main-cloudform.js` in the next pass.

First make the current inline render host observable and fixture-readable.