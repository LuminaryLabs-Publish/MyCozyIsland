# Known Gaps: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-08T21-58-34-04-00`

## Selection / ledger gaps

```txt
No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root .agent/START_HERE.md state.

MyCozyIsland was selected as the oldest eligible fallback by current central alignment.

TheCavalryOfRome remains excluded.
```

## Route gaps

```txt
index.html loads ./src/main-cloudform.js?v=hero-cloud-4.
The route token is visible in HTML but not projected as a typed RouteVersionResult.
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
no fixture proves progress 0, middle, threshold, and eye-position samples.
```

## Render host gaps

```txt
renderer, scene, camera, mesh counts, and frame counters are not projected to a render host snapshot.
terrain, floor, foam, path, foliage, fence, fire, smoke, grass, and cloud render consumption is not summarized.
render-readback cannot be validated without opening the browser.
```

## Grass system gaps

```txt
grass placement returns requestedCount, patchCount, and patches.
grassMesh creates an InstancedMesh from placement.patches.
There is no GrassInstanceSnapshot that proves placement.patchCount equals the WebGL instance count.
There is no fixture row for exclusion zones, path clearance, or deterministic seed replay.
```

## Cloud system gaps

```txt
mattatz-clouds-domain currently delegates to cozy-hero-cloud-form-kit.
heroCloudGeometry caches geometry by cloud id in a module-level Map.
cloud point-count, savedPointClouds, geometry cache hits, and drift delta are not projected as proof records.
CloudDriftResult does not exist yet.
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
