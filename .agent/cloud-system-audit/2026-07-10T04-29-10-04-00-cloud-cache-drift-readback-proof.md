# Cloud System Audit: Cache Drift Readback Proof

**Timestamp:** `2026-07-10T04-29-10-04-00`

## Source path

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
createMattatzCloudRenderContract(...)
heroCloudGroup(cloudContract)
heroCloudGeometry(cloud)
cloudMaterial(cloud.pointCloud.opacity)
frame -> cloud drift update
```

## Current consumer

Cloud geometry is generated in `heroCloudGeometry()`, cached in a module-level `Map`, and keyed only by `cloud.id`. The frame loop mutates cloud positions for drift and vertical bob.

## Cloud proof gaps

```txt
No descriptor fingerprint validates cache reuse.
No cache hit/miss/stale result exists.
No descriptor-to-point-count parity row exists.
No fixed-dt drift result is exposed.
Legacy globalThis.CozyIsland.cloudPointCache exposes live BufferGeometry objects.
Cloud state is not available as JSON-serializable host readback.
```

## Next cloud proof

Add cloud descriptor snapshots, cloud cache snapshots, and cloud drift result rows. The browser should keep current visuals while `CozyIslandHost.getState()` reports serializable cache and drift facts.
