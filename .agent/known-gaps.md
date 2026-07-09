# Known Gaps: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-09T14-26-56-04-00`

## Selection / ledger gaps

```txt
No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root .agent/START_HERE.md state.

MyCozyIsland was selected as the oldest eligible documented fallback and central-ledger catch-up target.

The central ledger still pointed at 2026-07-09T11-39-50-04-00, while repo-local docs had already advanced to 2026-07-09T14-20-00-04-00.

This pass normalizes root docs, timestamped audits, tracker, turn ledger, kit registry, central ledger, and central internal change log to 2026-07-09T14-26-56-04-00.

TheCavalryOfRome remains excluded.
```

## Route gaps

```txt
index.html loads ./src/main-cloudform.js?v=hero-cloud-4.
The route token is not exposed as a first-class RouteTokenReadback record.
The route has only the legacy globalThis.CozyIsland diagnostic object.
There is no additive globalThis.CozyIslandHost.getState() proof surface yet.
```

## Source descriptor gaps

```txt
source descriptor construction happens inline in src/main-cloudform.js.
There is no SourceProfile object.
There is no SourceFingerprint object.
There is no stable SceneSourceSnapshot summary.
There is no fixture row proving the island/clearing/grass/cloud descriptors match the browser route.
```

## Input / interaction gaps

```txt
keyboard state is a raw Set.
wheel input mutates progress directly.
pointer drag mutates yaw/pitch directly.
There is no BrowserInputActionFrame.
There is no ActionResult for accepted/rejected/skipped input.
There is no bounded InputJournal.
```

## Movement / rail gaps

```txt
first-person movement only unlocks at progress >= 0.985.
valid(next) only checks clearing radius and campfire keepout.
accepted movement and rejected movement are not recorded.
rail() computes camera position/look directly without a CameraRailSnapshot.
there is no fixture row for start/mid/near/first-person rail states.
```

## Grass gaps

```txt
grass placement exists as a source descriptor.
grass rendering uses one InstancedMesh with cone geometry.
instance count and accepted patch summaries are not exposed through host readback.
wind descriptor exists, but grass wind is not tied to a readback result.
there is no grass placement/instance fixture.
```

## Cloud gaps

```txt
cloud descriptors exist through mattatz clouds domain.
hero cloud geometry is cached by cloud id.
cloud drift mutates Three.js point positions directly during frame updates.
cloud cache point counts are only reachable through globalThis.CozyIsland.cloudPointCache.
there is no HeroCloudDescriptorSnapshot, HeroCloudCacheSnapshot, or CloudDriftResult.
```

## Render gaps

```txt
renderer, scene, camera, lights, terrain, ocean, foliage, grass, smoke, and cloud consumers are all created inline.
render host state is not summarized into a fixture-readable RenderHostSnapshot.
there is no DOM-free render/consumer fixture.
```

## Validation gaps

```txt
package.json only exposes npm start.
no npm run check exists.
no source/host fixture exists.
no browser smoke was run in this docs pass.
no runtime source changed in this docs pass.
```
