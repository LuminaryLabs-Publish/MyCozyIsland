# Known Gaps: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-08T19-40-00-04-00`

## Selection / ledger gaps

```txt
No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root .agent/START_HERE.md state.

MyCozyIsland was selected as the oldest eligible fallback by sampled root-agent alignment.

TheCavalryOfRome remains excluded.
```

## Route gaps

```txt
index.html loads ./src/main-cloudform.js?v=hero-cloud-4.
The route token is visible but not projected as RouteVersionResult.
There is no accepted/rejected route version row.
There is no source fingerprint that ties the route token to descriptor outputs.
```

## Source authority gaps

```txt
main-cloudform.js creates landform, floor, clearing, foliage, fire, smoke, grass, and cloud descriptors inline in main().
Descriptor source facts are not summarized as SourceProfile.
Scene source facts are not summarized as SceneSourceSnapshot.
No stable source fingerprint exists for same-input replay.
Local kit outputs are consumed immediately by render adapters, not first journaled as proof data.
```

## Interaction and movement gaps

```txt
wheel input mutates progress directly.
pointer drag mutates yaw/pitch directly.
keyboard input mutates player movement directly after progress >= 0.985.
valid(next) returns boolean only.
movement rejection has no stable reason for outside-clearing or campfire-keepout rejection.
no ActionFrame / ActionResult / InputJournal exists.
```

## Camera rail gaps

```txt
rail() returns position/look but not CameraRailSnapshot.
first-person threshold behavior is not represented as a fixture-readable gate result.
current camera path cannot be replayed without Three.js runtime objects.
```

## Grass gaps

```txt
grass placement contract is consumed by grassMesh() but not summarized as GrassInstanceSnapshot.
instanced mesh count is not compared against placement.patches.length in a fixture.
grass wind descriptor exists but does not yet participate in host proof readback.
```

## Hero-cloud gaps

```txt
cloudCache is an internal Map without stable host-facing summary.
heroCloudGeometry caches geometry by cloud id but no HeroCloudCacheSnapshot exists.
heroCloudGroup stores savedPointClouds but legacy host only exposes raw cache data.
frame() mutates cloud drift without CloudDriftResult records.
cloud point count, geometry reuse, drift deltas, and saved point-cloud counts need DOM-free fixture rows.
```

## Render and host gaps

```txt
renderer, scene, camera, water, flame, smoke, clouds, and render calls are inline.
render host state is not summarized as RenderHostSnapshot.
globalThis.CozyIsland exists but only exposes cloudContract, cloudPointCache, and getScrollProgress.
no additive globalThis.CozyIslandHost.getState() exists yet.
no BrowserConsumerFixture exists to prove legacy compatibility plus new host proof.
```

## Kit gaps

```txt
cozy-route-version-result-kit is not materialized.
cozy-source-profile-kit is not materialized.
cozy-scene-source-snapshot-kit is not materialized.
cozy-action-frame-contract-kit is not materialized.
cozy-action-result-contract-kit is not materialized.
cozy-input-journal-kit is not materialized.
cozy-movement-policy-result-kit is not materialized.
cozy-camera-rail-snapshot-kit is not materialized.
cozy-grass-instance-snapshot-kit is not materialized.
cozy-hero-cloud-cache-snapshot-kit is not materialized.
cozy-cloud-drift-result-kit is not materialized.
cozy-render-host-snapshot-kit is not materialized.
cozy-host-snapshot-kit is not materialized.
cozy-browser-consumer-fixture-kit is not materialized.
```

## Documentation gaps fixed by this pass

```txt
.agent/START_HERE.md refreshed
.agent/current-audit.md refreshed
.agent/known-gaps.md refreshed
.agent/next-steps.md refreshed
.agent/validation.md refreshed
.agent/kit-registry.json refreshed
.agent/architecture-audit/2026-07-08T19-40-00-04-00-host-proof-browser-consumer-dsk-map.md added
.agent/render-audit/2026-07-08T19-40-00-04-00-render-host-consumer-readback.md added
.agent/interaction-audit/2026-07-08T19-40-00-04-00-action-movement-browser-consumer-map.md added
.agent/cloud-system-audit/2026-07-08T19-40-00-04-00-hero-cloud-cache-drift-consumer-map.md added
.agent/grass-system-audit/2026-07-08T19-40-00-04-00-grass-instance-host-readback-map.md added
.agent/host-proof-audit/2026-07-08T19-40-00-04-00-browser-consumer-fixture-manifest.md added
.agent/deploy-audit/2026-07-08T19-40-00-04-00-static-route-validation-map.md added
.agent/trackers/2026-07-08T19-40-00-04-00/project-breakdown.md added
.agent/turn-ledger/2026-07-08T19-40-00-04-00.md added
central repo ledger refreshed
central internal change log added
```
