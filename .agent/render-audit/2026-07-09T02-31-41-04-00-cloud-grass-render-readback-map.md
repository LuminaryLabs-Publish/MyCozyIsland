# Render Audit: Cloud / Grass Render Readback Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T02-31-41-04-00`

## Current render surface

The repo has a visual/render surface. `index.html` mounts a full-window `canvas#game`, then loads `src/main-cloudform.js?v=hero-cloud-4`.

The render host is inline in `src/main-cloudform.js`:

```txt
Three.WebGLRenderer
  -> Scene
  -> PerspectiveCamera
  -> HemisphereLight
  -> DirectionalLight
  -> terrain mesh
  -> ocean floor mesh
  -> water plane
  -> shoreline foam tube
  -> path mesh group
  -> foliage object group
  -> fence group
  -> campfire group
  -> smoke points
  -> grass instanced mesh
  -> hero cloud point group
```

## Render consumer map

```txt
landform.heightfield -> terrainMesh -> BufferGeometry mesh
oceanFloor.heightfield -> floorMesh -> BufferGeometry mesh
floor.waterMaterial -> waterMesh -> MeshPhysicalMaterial plane
landform.shoreline -> foamMesh -> TubeGeometry
foliage.pathNetwork -> pathMesh -> path strips
foliage.objects -> objGroup -> trunk/canopy/rock primitives
clearing.objects -> fenceGroup -> posts/rails
fireGraph -> campfireMesh -> logs/flame/light
smokeDescriptor -> smokeMesh + updateSmoke -> Points runtime
grassPlacement.patches -> grassMesh -> InstancedMesh
cloudContract.clouds -> heroCloudGroup -> Points objects + cached BufferGeometry
```

## Render readback gap

```txt
No RenderHostSnapshot exists.
No frame counter is exposed.
No mesh/points/instance count projection exists.
No terrain/floor/foam/path/foliage/fence/fire/smoke/grass/cloud consumer status is recorded.
No proof says grass patch count equals grass InstancedMesh instance count.
No proof says hero-cloud savedPointClouds count equals rendered cloud geometry count.
No proof says cloud geometry cache hit/miss behavior is deterministic.
```

## Required RenderHostSnapshot fields

```txt
routeToken: hero-cloud-4
renderer:
  type
  pixelRatioLimit
  toneMapping
  toneMappingExposure
camera:
  type
  fov
  near
  far
  aspect
scene:
  background
  fogType
  fogDensity
consumers:
  terrain
  oceanFloor
  water
  foam
  path
  foliage
  fence
  campfire
  smoke
  grass
  heroClouds
counts:
  meshCount
  pointsCount
  instancedMeshCount
  grassInstanceCount
  cloudPointGeometryCount
  savedPointCloudCount
frame:
  index
  lastDt
  progress
```

## Fixture rows required

```txt
render_row_01_reports_renderer_camera_scene
render_row_02_reports_static_consumers_present
render_row_03_reports_grass_instance_count_from_patch_count
render_row_04_reports_cloud_point_geometry_and_saved_cache_counts
render_row_05_preserves_legacy_CozyIsland_cloud_fields
```

## Stop line

Do not replace the renderer, cloud material, grass material, or camera rail while adding readback. The first implementation should only observe current consumer output.
