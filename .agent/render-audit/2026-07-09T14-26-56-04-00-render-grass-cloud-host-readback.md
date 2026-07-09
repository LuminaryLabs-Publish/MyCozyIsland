# Render Audit: Render / Grass / Cloud Host Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-26-56-04-00`

## Visual surface

The repo has a browser-rendered Three.js visual surface.

```txt
index.html
  -> canvas#game
  -> src/main-cloudform.js?v=hero-cloud-4
  -> WebGLRenderer
  -> Scene + PerspectiveCamera + fog/lights
  -> terrain/floor/water/foam/path/foliage/fence/fire/smoke/grass/cloud render consumers
```

## Render consumers currently inline

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

## Runtime frame loop

```txt
frame(now)
  -> dt clamp
  -> sea bob
  -> fp(dt) when progress >= 0.985
  -> rail camera otherwise
  -> updateSmoke
  -> flame scale pulse
  -> cloud drift mutation
  -> renderer.render(scene, camera)
  -> requestAnimationFrame(frame)
```

## Readback gaps

```txt
no RenderHostSnapshot
no terrain/floor/cloud/grass consumer readback
no camera rail snapshot
no render frame counter exposed
no additive CozyIslandHost.getState()
legacy globalThis.CozyIsland only exposes cloudContract, cloudPointCache, and getScrollProgress
```

## Render-safe next step

Add additive readback only.

```txt
RenderHostSnapshot:
  - renderer pixel ratio
  - canvas size
  - camera fov/aspect/near/far
  - camera mode: rail | first-person
  - progress/easedProgress
  - scene child counts by category
  - grass instance count
  - cloud cache geometry count
  - visible route token

CozyIslandHost.getState():
  - local route/source proof
  - render host snapshot
  - grass snapshot
  - cloud snapshot
  - input/action/movement/rail journal tail
```

## Do not do in this pass

```txt
do not replace the renderer
do not replace grass rendering
do not replace cloud rendering
do not change camera thresholds
do not rewrite scene art
```
