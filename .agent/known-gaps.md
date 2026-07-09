# Known Gaps: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-09T02-31-41-04-00`

## Selection / ledger gaps

```txt
No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root .agent/START_HERE.md state.

MyCozyIsland was selected as the oldest eligible sampled fallback.

TheCavalryOfRome remains excluded.
```

## Route gaps

```txt
index.html loads ./src/main-cloudform.js?v=hero-cloud-4.
The route token is visible in HTML but not projected as a typed RouteTokenReadback.
There is no accepted/rejected route token row.
There is no source fingerprint that ties the route token to descriptor outputs.
```

## Source authority gaps

```txt
main-cloudform.js creates landform, floor, clearing, foliage, fire, smoke, grass, and cloud descriptors inline in main().
Descriptor source facts are not summarized as SourceProfile.
Scene source facts are not summarized as SceneSourceSnapshot.
No stable source fingerprint exists for same-input replay.
Local kit outputs are consumed immediately by render adapters, not first journaled as proof data.
createGrassPatchBatchDescriptors exists but is not used by the live route or host proof surface.
```

## Interaction and movement gaps

```txt
wheel input mutates progress directly.
pointer drag mutates yaw/pitch directly.
keyboard state is held in a Set without ActionFrame rows.
progress >= 0.985 is an implicit first-person gate, not a MovementUnlockResult.
valid(next) returns boolean only.
movement rejection reason is not recorded.
clearing-boundary rejection and campfire-keepout rejection are not distinguishable.
accepted movement is not recorded as a MovementPolicyResult.
```

## Camera rail gaps

```txt
rail() constructs CatmullRom curves every call.
rail control points are not exported as a CameraRailSource.
rail output is not recorded as CameraRailSnapshot.
no fixture proves progress 0, middle, threshold, handoff, and first-person eye samples.
```

## Render host gaps

```txt
renderer, scene, camera, mesh counts, point-cloud counts, and frame counters are not projected to a render host snapshot.
terrain, floor, foam, path, foliage, fence, fire, smoke, grass, and cloud render consumption is not summarized.
render-readback cannot be validated without opening the browser.
```

## Grass system gaps

```txt
grass placement returns requestedCount, patchCount, and patches.
grassMesh creates an InstancedMesh from placement.patches.
createGrassPatchBatchDescriptors can summarize batchKey instance counts but is not currently tied into a proof row.
There is no GrassPlacementSnapshot.
There is no GrassInstanceSnapshot that proves placement.patchCount equals the WebGL instance count.
There is no fixture row for exclusion zones, path clearance, deterministic seed replay, static-batch descriptor parity, or future static-batch promotion.
```

## Cloud system gaps

```txt
mattatz-clouds-domain delegates to cozy-hero-cloud-form-kit.
heroCloudGeometry caches geometry by cloud id in a module-level Map.
cloud point-count, savedPointClouds, geometry cache hits, and drift delta are not projected as proof records.
CloudDriftResult does not exist yet.
HeroCloudDescriptorSnapshot does not exist yet.
HeroCloudCacheSnapshot does not exist yet.
```

## Host proof gaps

```txt
globalThis.CozyIsland remains the only browser diagnostic surface.
globalThis.CozyIslandHost does not exist yet.
There is no additive host state projection for route, source, action, movement, rail, grass, cloud, render, or validation rows.
No DOM-free fixture exists for the browser consumer splice.
```

## Validation gaps

```txt
package.json has only npm run start.
There is no npm test or fixture script yet.
No runtime source changed in this documentation pass.
No browser or GitHub Pages live validation ran in this documentation pass.
```

## Architectural risk

```txt
The current source is good enough to preserve, but fragile to keep expanding inline.
A visual rewrite before host proof would make later diagnostics harder.
Shared-kit promotion before repo-local fixture proof would export unstable seams.
Cloud/grass optimization before proof rows would hide current consumer behavior instead of stabilizing it.
```
