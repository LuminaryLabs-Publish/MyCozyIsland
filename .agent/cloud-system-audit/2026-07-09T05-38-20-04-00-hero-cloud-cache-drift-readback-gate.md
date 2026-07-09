# Cloud System Audit: Hero Cloud Cache / Drift Readback Gate

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T05-38-20-04-00`

## Current cloud system

The route imports Mattatz cloud descriptors and builds Three.js point-cloud adapters inline.

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
  -> createMattatzCloudRenderContract(...)
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cloudCache Map keyed by cloud.id
  -> THREE.Points per cloud
  -> frame() mutates cloud positions by drift vector and driftSpeed
  -> globalThis.CozyIsland.cloudPointCache exposes cached geometries only
```

## Cloud domains

```txt
mattatz-cloud-source-domain
hero-cloud-form-domain
hero-cloud-layer-domain
hero-cloud-render-contract-domain
hero-cloud-geometry-cache-domain
cloud-point-material-domain
cloud-drift-domain
legacy-cloud-cache-diagnostics-domain
planned-hero-cloud-descriptor-snapshot-domain
planned-hero-cloud-cache-snapshot-domain
planned-cloud-drift-result-domain
```

## Cloud services

```txt
createMattatzCloudsState
createMattatzCloudRenderContract
createCozyHeroCloudFormDescriptor
createCozyHeroCloudLayerDescriptor
createCozyHeroCloudRenderContract
heroCloudGeometry
heroCloudGroup
cloudMaterial
frame cloud drift update
legacy CozyIsland.cloudPointCache exposure
```

## Current gap

Cloud look is present and should not be rewritten.

The gap is proof: there is no stable source snapshot or cache/drift readback proving how many clouds were requested, how many point geometries were cached, which cloud IDs are present, how many points each cloud owns, or how a frame step changes drift positions.

## Required next files

```txt
src/host-proof/hero-cloud-descriptor-snapshot.js
src/host-proof/hero-cloud-cache-snapshot.js
src/host-proof/cloud-drift-result.js
```

## Acceptance rows

```txt
cloud descriptor snapshot reports cloud count, IDs, placement band, placement position, scale, point count, point size range, opacity, drift vector, and drift speed.
cloud cache snapshot reports cache key count, saved point cloud count, and geometry point counts.
cloud drift result reports before/after x/y/z deltas for at least one deterministic dt row.
legacy globalThis.CozyIsland.cloudPointCache is preserved.
```
