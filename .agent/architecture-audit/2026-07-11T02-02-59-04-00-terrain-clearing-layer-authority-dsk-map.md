# Architecture Audit: Terrain Clearing Layer Authority DSK Map

Timestamp: `2026-07-11T02-02-59-04-00`

## Current source graph

```txt
createDeterministicSeedService
  -> createTerrainSurface
       -> naturalHeightAt
       -> hidden twelve-sample clearingPlateauHeight
       -> rawHeight/sampleHeight
       -> sampleNormal/sampleFields
  -> createTerrainBiomeField
  -> createShorelineField
  -> createTerrainLodPolicy
  -> createGroundContactService
  -> createVegetationPlacementGraph
  -> createRockGraph
  -> createPropGraph
  -> createCampfireAtmosphereDescriptor
  -> createRenderSnapshot
  -> createStylizedWorldRenderer
```

## Current ownership problem

`terrain-surface-domain-kit` owns the calculation but publishes only function-backed service methods plus static options. Its most important new decision, the terrain-relative plateau height, remains an inaccessible closure value.

Dependent domains consume the terrain service during startup but do not record a dependency revision:

```txt
terrain biome
shoreline
contact seating
vegetation placement
rock placement
fence/driftwood placement
campfire placement
camera rail
render snapshot
terrain mesh
paths
layered grass
```

The snapshot is deterministic but has no proof that all dependent outputs were generated from the same algorithm version or surface fingerprint.

## Existing kits and service boundaries

| Kit | Current services |
|---|---|
| `deterministic-seed-domain-kit` | Stable seed, scoped randomness, hash and noise support |
| `terrain-surface-domain-kit` | Coast radius, natural/blended height, normal and field sampling |
| `terrain-biome-field-domain-kit` | Normalized wet sand, dry sand, grass, soil, forest floor, moss and rock weights |
| `shoreline-field-domain-kit` | Signed distance, breaker, wetness, normal and contour generation |
| `terrain-lod-domain-kit` | Resolution and distance policy by quality tier |
| `ground-contact-domain-kit` | Slope/height admission and seated transform |
| `vegetation-placement-domain-kit` | Path clearance, suitability, spacing and deterministic instances |
| `rock-archetype-domain-kit` | Deterministic rock graph and ground contact |
| `prop-archetype-domain-kit` | Fence and driftwood graph |
| `campfire-atmosphere-domain-kit` | Central campfire seat, light and smoke descriptor |
| `render-snapshot-domain-kit` | Frozen aggregate source snapshot |
| `webgpu-stylized-material-renderer-kit` | Terrain, paths, props, rocks and vegetation rendering |

## Proposed parent domain

```txt
terrain-clearing-surface-authority-domain
```

Owns:

```txt
algorithm identity
terrain option normalization
natural source samples
plateau aggregation
blend policy
surface variation policy
terrain revision and fingerprint
field-frame publication
consumer dependency admission
consumer result journal
fixture adapter
```

## Proposed kits

### `terrain-source-revision-kit`

Provides:

```txt
algorithmVersion
terrainRevision
sourceOptionsFingerprint
compatibility check
stale revision rejection
```

### `terrain-clearing-descriptor-kit`

Provides an immutable JSON-safe descriptor:

```txt
seed
clearingRadius
sourceSampleRadius
sourceSampleCount
sourceSamples
plateauHeight
innerBlendRadius
outerBlendRadius
variation policy
fingerprint
```

### `terrain-source-sample-kit`

Provides deterministic source-ring probes and explicit aggregate inputs rather than an opaque closure computation.

### `terrain-plateau-aggregation-kit`

Provides a typed result for mean or future robust aggregation:

```txt
status
sampleCount
minimum
maximum
mean
spread
plateauHeight
fingerprint
```

### `terrain-blend-policy-kit`

Provides the inner/outer thresholds, blend curve identity and boundary probe set.

### `terrain-surface-variation-kit`

Provides deterministic micro-variation with declared seed, frequency, octave, gain and amplitude limits.

### `terrain-field-frame-kit`

Publishes one immutable sample result containing height, normal, slope, curvature, moisture, exposure, rock exposure, shoreline distance, water and clearing fields plus `terrainRevision`.

### Consumer kits

```txt
terrain-biome-consumer-kit
ground-contact-consumer-kit
world-placement-consumer-kit
terrain-render-consumer-kit
```

Each must return:

```txt
consumerId
terrainRevision
inputFingerprint
outputFingerprint
status: applied | unchanged | skipped | rejected
reason
```

### `terrain-layer-observation-kit`

Provides bounded, detached, JSON-safe source and consumer rows to debug/host readback.

### `terrain-layer-coherence-fixture-kit`

Runs deterministic probes without DOM or GPU requirements and emits a compact proof packet.

## Admission rules

```txt
consumer terrainRevision must equal current terrainRevision
consumer input fingerprint must include algorithm version and normalized options
stale placement/render snapshots must be rejected, not silently reused
all world-placement records must include their seating revision
render terrain probes must match authoritative sampleHeight values
```

## DSK decision

Update existing terrain, biome, contact, placement, snapshot and render DSK boundaries first. Do not create a separate generic terrain engine or replace the current 50-kit architecture. New local kits are justified only for revision, descriptor, consumer-result and fixture responsibilities that are currently absent.
