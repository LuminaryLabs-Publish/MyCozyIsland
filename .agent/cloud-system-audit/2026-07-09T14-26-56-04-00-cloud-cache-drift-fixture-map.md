# Cloud System Audit: Cloud Cache / Drift Fixture Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-26-56-04-00`

## Current cloud path

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
  -> createMattatzCloudRenderContract(...)
  -> heroCloudGroup(cloudContract)
  -> heroCloudGeometry(cloud)
  -> cloudCache keyed by cloud.id
  -> savedPointClouds stored on group.userData
  -> frame loop mutates child position by drift vector/speed
  -> globalThis.CozyIsland.cloudContract and cloudPointCache
```

## Existing services

```txt
cloud source-state creation
cloud render-contract creation
cloud shader material creation
point geometry generation
point geometry cache reuse by cloud id
saved point-cloud geometry collection
per-frame x/z drift mutation
per-frame y bob mutation
legacy cloudContract/cloudPointCache exposure
```

## Gaps

```txt
no HeroCloudDescriptorSnapshot
no HeroCloudCacheSnapshot
no CloudDriftResult
no cache key list exposed through a stable host-state object
no deterministic fixture row for point counts
no drift row that can be checked without Three.js object mutation
```

## Required fixture rows

```txt
cloud-descriptor-snapshot:
  - cloud count
  - ids
  - placement bounds
  - point count summary
  - material opacity summary

cloud-cache-snapshot:
  - cache key count
  - per-key point count
  - savedPointCloud count
  - cache reuse expected true on repeated snapshot

cloud-drift-result:
  - dt
  - before position
  - after position
  - drift vector
  - speed
  - y bob phase
```

## Main finding

Cloud visuals should stay unchanged. The next pass should only add readback and fixture proof around the existing cloud descriptor/cache/drift path.
