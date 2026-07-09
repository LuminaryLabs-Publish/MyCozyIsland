# My Cozy Island Render Consumption Parity Ledger Audit

**Timestamp:** `2026-07-09T17-38-53-04-00`

## Current render path

```txt
source descriptors
  -> terrainMesh / floorMesh / waterMesh / foamMesh / pathMesh
  -> objGroup / fenceGroup / campfireMesh / smokeMesh / grassMesh
  -> heroCloudGeometry / heroCloudGroup
  -> scene.add(...)
  -> frame(now)
  -> renderer.render(scene, camera)
```

## Current source-to-consumer mapping

| Source | Consumer | Current proof |
|---|---|---|
| landform heightfield | `terrainMesh()` | geometry exists; no source fingerprint or vertex-count row |
| ocean floor heightfield | `floorMesh()` | geometry exists; no source/render parity row |
| shoreline points | `foamMesh()` | tube geometry exists; no segment parity row |
| path network | `pathMesh()` | one mesh per segment; no consumed-segment ledger |
| foliage graph | `objGroup()` | trees/rocks projected; excluded objects silently skipped |
| clearing graph | `fenceGroup()` | fence posts/rails projected; no object-id readback |
| campfire graph | `campfireMesh()` | fixed logs/flame/light projection; source-child parity not exposed |
| smoke descriptor | `smokeMesh()` / `updateSmoke()` | particle count is consumed; frame results are not journaled |
| grass placement | `grassMesh()` | one cone instance per patch; no placement/instance parity row |
| cloud contract | `heroCloudGeometry()` / `heroCloudGroup()` | geometry cached by id; no cache-hit/source-fingerprint row |
| scene/camera | `renderer.render()` | submission occurs; no render-host snapshot |

## Main render gap

The scene is renderable, but the runtime cannot answer:

```txt
which source descriptor version produced the current scene
how many source objects were consumed, excluded, unsupported, or fallback-rendered
whether grass source patch count equals instance count
whether cloud cache entries match current descriptors
which camera mode and pose were submitted
what renderer size, pixel ratio, tone mapping, and object counts were active
```

## Required render-consumption rows

```txt
terrain: source sample count, geometry vertex count, geometry index count
floor: source sample count, geometry vertex count, geometry index count
shoreline: source point count, generated tube segment count
path: source segment count, generated mesh count
foliage: source object count, excluded count, rendered tree count, rendered rock count
clearing: source fence-post count, rendered post count, rendered rail count
campfire: source root id, rendered logs, flame present, light present
smoke: descriptor particle count, geometry particle count, last update timestamp
 grass: source patch count, instance count, rejected/missing transforms
cloud: descriptor count, cache entry count, cache hit/miss, total point count
host: scene child count, camera mode, camera pose, renderer dimensions, pixel ratio
```

## Recommended kits

```txt
render-consumption-ledger-kit
grass-placement-snapshot-kit
grass-instance-snapshot-kit
hero-cloud-descriptor-snapshot-kit
hero-cloud-cache-snapshot-kit
cloud-drift-result-kit
render-host-snapshot-kit
```

## Preserve

Keep the existing Three.js version, visual materials, scene object topology, route token, camera threshold, and current object creation behavior while adding readback.
