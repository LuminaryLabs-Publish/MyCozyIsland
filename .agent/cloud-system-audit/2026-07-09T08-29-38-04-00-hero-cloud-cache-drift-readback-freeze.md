# MyCozyIsland Cloud System Audit

**Generated:** `2026-07-09T08-29-38-04-00`

## Current cloud path

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
  -> createMattatzCloudRenderContract(...)
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud) cached by cloud.id
  -> THREE.Points per cloud
  -> frame mutates cloud.position by drift/speed/dt and sinusoidal y bob
  -> globalThis.CozyIsland.cloudContract and cloudPointCache expose partial legacy diagnostics
```

## Cloud domains

```txt
mattatz-cloud-source-domain
hero-cloud-descriptor-domain
hero-cloud-point-cache-domain
cloud-material-shader-domain
cloud-drift-frame-domain
legacy-cloud-diagnostic-domain
planned-cloud-readback-domain
```

## Cloud services

```txt
create deterministic cloud source state
create render contract descriptors
create point cloud geometry per cloud id
cache BufferGeometry by cloud id
create shader material with size/alpha/tint attributes
animate x/z drift by drift vector and drift speed
animate y by slow sine bob
store point geometries in legacy savedPointClouds array
```

## Gaps

```txt
No HeroCloudDescriptorSnapshot exists.
No HeroCloudCacheSnapshot exists.
No CloudDriftResult exists.
No stable cache-key count exists.
No stable point-count total exists.
No fixture proves cloud descriptor count equals rendered cloud group children.
No fixture proves frame drift without mutating actual Three.js Points.
```

## Required next records

```txt
HeroCloudDescriptorSnapshot:
  cloudCount
  ids
  placement summary
  lobe counts
  point count range
  opacity range

HeroCloudCacheSnapshot:
  cacheKeyCount
  geometryCount
  totalPointCount
  minPointCount
  maxPointCount

CloudDriftResult:
  cloudId
  dt
  speed
  driftVector
  deltaX
  deltaZ
  bobY
```

## Freeze rule

Do not replace the current point-cloud look or shader. Add readback and fixture rows around the current cloud system first.
