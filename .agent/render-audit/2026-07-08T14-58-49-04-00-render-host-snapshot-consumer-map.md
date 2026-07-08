# Render Audit — Render Host Snapshot Consumer Map

**Timestamp:** `2026-07-08T14-58-49-04-00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

## Current render surface

The visual route is a static Three.js scene composed in `src/main-cloudform.js`.

```txt
WebGLRenderer
PerspectiveCamera
Scene background/fog/lights
floorMesh
terrainMesh
waterMesh
foamMesh
pathMesh
objGroup
fenceGroup
campfireMesh
smokeMesh
grassMesh
heroCloudGroup
frame loop
```

## Current readback gap

The renderer is visually stable, but it does not expose stable readback records for fixture or host diagnostics.

```txt
renderer dimensions are not summarized
camera progress / first-person state is not summarized
scene object counts are not summarized
grass instance count is not summarized
smoke particle count is not summarized
cloud point count is not summarized
cloud cache geometry count is not summarized
campfire flame/light presence is not summarized
legacy globalThis.CozyIsland exposes geometry references, not stable render snapshots
globalThis.CozyIslandHost does not exist yet
```

## RenderHostSnapshot target

Add a pure projection helper that accepts plain inputs and emits serializable fields only.

```js
RenderHostSnapshot = {
  routeVersion,
  renderer: {
    antialias,
    powerPreference,
    pixelRatioCap,
    toneMapping,
    toneMappingExposure
  },
  camera: {
    fov,
    near,
    far,
    progress,
    mode,
    railSampleId
  },
  scene: {
    fogType,
    hasHemisphereLight,
    hasSunLight,
    objectGroups
  },
  counts: {
    grassInstances,
    smokeParticles,
    heroClouds,
    heroCloudPoints,
    cachedCloudGeometries
  },
  compatibility: {
    cozyIslandGlobalPresent,
    cozyIslandHostGlobalPresent
  }
}
```

## Browser splice order

```txt
1. Add src/host-proof/host-snapshot.js.
2. Fixture-test RenderHostSnapshot using plain fake counts.
3. In src/main-cloudform.js, collect counts after scene construction.
4. During frame or host projection, expose renderHostSnapshot through globalThis.CozyIslandHost.getState().render.
5. Keep globalThis.CozyIsland.cloudPointCache unchanged.
```

## Do not do in this render pass

```txt
Do not change the WebGLRenderer setup.
Do not change tone mapping.
Do not change camera FOV/near/far.
Do not change sea, terrain, grass, smoke, cloud, or light visuals.
Do not replace point clouds with another render strategy.
Do not make globalThis.CozyIslandHost required for rendering.
```

## Validation target

```txt
cozy-render-host-snapshot-001:
  proves renderer/camera/scene/count/compatibility fields are serializable and stable

browser smoke after splice:
  confirms the route still renders and globalThis.CozyIsland remains available
```