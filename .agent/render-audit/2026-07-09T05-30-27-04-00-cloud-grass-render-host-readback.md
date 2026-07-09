# Render Audit: Cloud / Grass Render Host Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T05-30-27-04-00`

## Current render surface

```txt
index.html
  -> canvas#game
  -> WebGLRenderer({ antialias: true, powerPreference: high-performance })
  -> pixelRatio capped at 1.5
  -> ACESFilmicToneMapping
  -> fog and warm background
  -> PerspectiveCamera(58, 1, 0.1, 6800)
  -> HemisphereLight + DirectionalLight
```

## Render object stack

```txt
floorMesh(floor.heightfield)
terrainMesh(landform.heightfield)
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

## Cloud rendering read

```txt
cloudContract -> heroCloudGroup(contract)
cloud id -> cloudCache key
cloud pointCount -> BufferGeometry positions/sizes/alphas/tints
ShaderMaterial -> soft point sprites
per-frame drift -> c.position.x/z mutation
per-frame bob -> c.position.y = baseY + sin(now) * 3.5
legacy readback -> globalThis.CozyIsland.cloudPointCache
```

## Grass rendering read

```txt
grass placement descriptor -> grassMesh(placement)
InstancedMesh(ConeGeometry, MeshStandardMaterial)
instance count = placement.patches.length
patch transform -> Matrix4 instance
legacy readback -> none
```

## Render host gaps

```txt
no RenderHostSnapshot
no scene object count summary
no route token included in render readback
no renderer configuration summary
no camera mode summary
no cloud descriptor/cache/drift result
no grass descriptor/instance parity result
no fixture row proving descriptor consumption
```

## Required RenderHostSnapshot shape

```txt
{
  routeToken: "hero-cloud-4",
  renderer: {
    pixelRatioCap: 1.5,
    toneMapping: "ACESFilmicToneMapping",
    outputColorSpace: "SRGBColorSpace"
  },
  camera: {
    fov: 58,
    near: 0.1,
    far: 6800,
    mode: "rail" | "first-person"
  },
  scene: {
    hasFog: true,
    background: "#f3cfa6",
    objectFamilies: ["floor", "terrain", "sea", "foam", "path", "foliage", "fence", "campfire", "smoke", "grass", "clouds"]
  },
  grass: {
    requestedPatchCount: 140,
    renderedInstanceCount: number,
    sourceSeed: "cozy-island-grass"
  },
  clouds: {
    sourceSeed: "cozy-island-clouds",
    descriptorCloudCount: number,
    cachedGeometryCount: number,
    totalPointCount: number
  }
}
```

## Render acceptance

```txt
legacy visual route remains unchanged
legacy globalThis.CozyIsland remains available
new globalThis.CozyIslandHost.getState().render exists
render readback does not require WebGL context in fixture rows
browser fixture can compare expected descriptor counts against readback summaries
```
