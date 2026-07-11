# Render Audit: Plateau, Biome, Placement and Render Consumption Gap

Timestamp: `2026-07-11T02-02-59-04-00`

## Render path

```txt
terrain service
  -> render snapshot
  -> createGridGeometry(sampleHeight, biome colorFor)
  -> compute vertex normals
  -> terrain mesh

terrain service
  -> ground contact
  -> vegetation/rock/prop/campfire snapshots
  -> instanced and direct Three meshes

terrain service
  -> path network
  -> endpoint-only path heights
  -> path quads
```

## What improved

The terrain mesh now receives a naturally seated central plateau instead of a hard-coded depression. Soil weighting was reduced, allowing the clearing to retain more grass and read less like a forced dirt crater.

## Render authority gaps

### No terrain revision on the render snapshot

The world renderer receives live terrain service functions and precomputed placement graphs, but no `terrainRevision`, algorithm version or fingerprint. A future terrain change can alter mesh sampling while stale placement data remains structurally valid.

### No render-consumption row

`createGridGeometry()` samples height and biome color directly but returns only geometry. It does not report:

```txt
terrain revision consumed
sample count
probe fingerprint
height range
normal generation result
biome revision
geometry fingerprint
```

### Fence transition risk

The fence radius is `19.38 m`; the outer blend boundary is `19.72 m`. Fence posts are individually seated on the transition, while rails use the lower adjacent post height. Without an edge fixture, visual gaps, rail burial or uneven rails can appear when plateau or blend parameters change.

### Paths use endpoint heights

Path quads calculate height only at each segment endpoint. They do not conform intermediate vertices to terrain. The loop passes near the clearing edge, so future blend changes can create floating or buried path spans even when endpoint probes pass.

### Static placement and geometry have no dependency journal

Vegetation, rocks, props and campfire are generated before renderer construction and then frozen. The render host cannot prove their source revision matches the terrain grid generated moments later.

### Layered grass proof is positional only

Layered grass instances use precomputed placement Y values. The renderer does not validate those positions against current terrain samples or report maximum seating error.

## Required render rows

```txt
terrain-grid-consumption:
  terrainRevision
  biomeRevision
  resolution
  vertexCount
  probeCoordinates
  probeHeights
  geometryFingerprint
  status

world-placement-consumption:
  terrainRevision
  graphId
  instanceCount
  maximumSeatingError
  outputFingerprint
  status

path-consumption:
  terrainRevision
  segmentCount
  edgeProbeCount
  maximumConformanceError
  status
```

## Required visual/browser probes

```txt
center campfire contact
inner clearing grass contact
all fence posts
representative fence rails
path segments crossing the transition
terrain grid vertices nearest those objects
biome color samples at center, fence and outer blend
```

## Safe render boundary

Do not retune materials, grass density, colors, shadows or mesh resolution yet. First make the current terrain, biome, placement and renderer outputs revision-correlated and observable.
