# MyCozyIsland Render Host Consumer Readback

**Timestamp:** `2026-07-08T19-40-00-04-00`

## Current render surface

`src/main-cloudform.js` currently owns the render host inline.

```txt
Three.js CDN import
  -> WebGLRenderer(canvas)
  -> Scene
  -> FogExp2
  -> PerspectiveCamera
  -> HemisphereLight / DirectionalLight
  -> floor / terrain / sea / foam / path / foliage / fence / fire / smoke / grass / clouds
  -> frame(now)
  -> renderer.render(scene, camera)
```

## Render adapters in use

```txt
terrainMesh(landform.heightfield)
floorMesh(floor.heightfield)
waterMesh(floor.waterMaterial)
foamMesh(landform.shoreline)
pathMesh(graph.pathNetwork, h)
objGroup(graph, clearing.objectExclusionZones)
fenceGroup(clearing)
campfireMesh(fireGraph)
smokeMesh(smokeD)
grassMesh(grass)
heroCloudGroup(cloudContract)
```

## Render readback gap

```txt
renderer exists but has no host-facing descriptor
scene exists but has no scene object count snapshot
camera mutates from rail or first-person path but has no CameraRailSnapshot
sea bob mutates without a water-frame record
smoke updates without a smoke-frame record
flame scales without a campfire-frame record
clouds drift without CloudDriftResult
renderer.render() has no RenderHostSnapshot beside it
```

## Required next record

```txt
RenderHostSnapshot {
  routeToken,
  rendererKind,
  pixelRatioCap,
  toneMapping,
  exposure,
  sceneBackground,
  fogDensity,
  cameraFov,
  cameraMode,
  objectGroups,
  grassInstanceCount,
  cloudPointCloudCount,
  lastFrameAt,
  lastRenderPath,
  legacyGlobalPresent
}
```

## Browser consumer fixture rows

```txt
01_render_snapshot_reports_renderer_kind
02_render_snapshot_reports_camera_mode_rail_or_first_person
03_render_snapshot_reports_grass_instance_count
04_render_snapshot_reports_cloud_point_cloud_count
05_render_snapshot_reports_legacy_global_present
06_render_snapshot_does_not_require_webgl_context
```

## Stop condition

The render pass is ready for implementation when `globalThis.CozyIslandHost.getState().render` can be created without altering `renderer.render(scene, camera)` behavior.
