# Terrain System Audit: Plateau Edge, Seating and Layer Contract

Timestamp: `2026-07-11T02-02-59-04-00`

## Current clearing algorithm

```txt
naturalHeightAt(x, z)
  -> warped island coordinates
  -> coast radius
  -> radial mound
  -> broad FBM detail
  -> ridge detail

sample twelve natural heights at radius 1.32 × clearingRadius
  -> arithmetic mean
  -> hidden clearingPlateauHeight

rawHeight(x, z)
  -> natural height
  -> clearing blend from 0.78 × to 1.16 × clearingRadius
  -> deterministic low-amplitude clearing noise
  -> blended final height
```

## Numeric geometry

For the current `clearingRadius = 17`:

```txt
inner blend threshold: 13.26 m
outer blend threshold: 19.72 m
fence radius: 19.38 m
source sample ring: 22.44 m
current fixture ring: 11.56 m
```

The fixture ring is fully inside the plateau. The fence lies only `0.34 m` inside the outer blend boundary.

## Derived layer chain

```txt
final height
  -> normal
  -> slope
  -> curvature
  -> moisture/exposure/rock exposure
  -> clearing/shore/water fields
  -> biome weights
  -> ground contact
  -> suitability and placement
  -> prop/campfire seating
  -> render snapshot
  -> terrain mesh and world objects
```

## Contract defects

### Hidden decision data

The source samples and plateau height cannot be inspected. A test can observe outputs but cannot explain why a plateau moved after an algorithm change.

### Mixed descriptor/function boundary

The terrain object publishes static configuration values and live sampling functions. It does not publish one serializable source descriptor or revision.

### Consumer identity absent

Derived layers cannot identify which terrain algorithm/options produced them.

### Edge continuity unbounded

There is no declared maximum height delta, slope, normal-angle change, curvature spike or biome-weight delta across the transition.

### Fence transition unproven

Fence posts are sampled independently on the blend edge. Rails use the lower of adjacent post heights, which can hide or amplify surface variation visually.

### Algorithm cache invalidation absent

The current runtime rebuilds everything at startup, but no future editor, save, hot-reload or quality path can safely determine whether cached placement/render data is stale.

## Proposed terrain descriptor

```txt
TerrainClearingDescriptor {
  id
  algorithmVersion
  terrainRevision
  seed
  radius
  maxHeight
  beachWidth
  seaLevel
  clearingRadius
  sourceSampleRadius
  sourceSamples[]
  aggregation: "mean"
  plateauHeight
  innerBlendRadius
  outerBlendRadius
  blendCurve: "smoothstep"
  variation
  fingerprint
}
```

## Required probe rings

```txt
center
0.68 × clearingRadius
0.78 × clearingRadius
1.00 × clearingRadius
1.14 × clearingRadius  fence
1.16 × clearingRadius  outer blend
1.20 × clearingRadius
1.32 × clearingRadius  source ring
```

At least twelve angular samples per ring should capture height, normal, slope, curvature and biome weights.

## Required seating probes

```txt
campfire
28 fence posts
representative fence rails
grass patches inside and near the fence
path endpoints and transition crossings
player/camera baseline probes
```

## Acceptance packet

```txt
descriptor
ring statistics
continuity statistics
biome normalization statistics
seating rows
placement fingerprints
render probe rows
stale-revision rejection cases
```

## Recommendation

Keep the new plateau algorithm. Make its decisions explicit and propagate one terrain revision through every derived world layer before changing terrain shape or adding erosion.
