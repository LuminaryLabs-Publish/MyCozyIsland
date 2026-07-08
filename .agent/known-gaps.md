# Known Gaps: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-08T14-39-38-04-00`

## Selection / ledger gaps

```txt
No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root .agent/START_HERE.md state.

MyCozyIsland was selected as the oldest eligible fallback in this run.

TheCavalryOfRome remains excluded.
```

## Route gaps

```txt
index.html loads ./src/main-cloudform.js?v=hero-cloud-4.
The route token is not yet returned by a pure RouteVersionResult.
There is no fixture row for accepted hero-cloud-4.
There is no fixture row for stale hero-cloud-3 rejection.
There is no fixture row for missing-token rejection.
```

## Source gaps

```txt
SourceProfile is missing.
SourceFingerprint is missing.
SceneSourceSnapshot is missing.
Seeds, island radius, floor profile, grass count, cloud profile, movement threshold, rail control points, and route token are still implicit runtime facts.
Source descriptors are created from local kits, but no DOM-free summary proves the descriptor bundle without opening the browser.
```

## Interaction gaps

```txt
Wheel, pointer, keyboard, and frame actions are not normalized as ActionFrame records.
Accepted, rejected, and no-op outcomes are not normalized as ActionResult records.
Input history is not journaled.
Action result history is not journaled.
```

## Movement gaps

```txt
Keyboard movement is locked until progress >= 0.985, but this is not returned as locked-before-first-person.
No-input movement is not returned as no-movement-input.
Clearing-boundary rejection is silent.
Campfire-keepout rejection is folded into valid(next) and is not distinct.
MovementPolicyResult, ClearingBoundaryResult, and CampfireKeepoutResult are missing.
```

## Camera rail gaps

```txt
rail() samples camera position/look directly from runtime state.
No CameraRailSnapshot exists for fixed progress values.
No fixture rows prove progress 0, 0.25, 0.5, 0.85, 0.985, and 1.0.
No rail readback is exposed through a host snapshot.
```

## Cloud-system gaps

```txt
HeroCloudDescriptorSnapshot is missing.
HeroCloudCacheSnapshot is missing.
CloudDriftResult is missing.
The cloudCache Map is private to src/main-cloudform.js.
Per-frame cloud drift mutates Three.js point objects directly.
legacy globalThis.CozyIsland.cloudPointCache exposes geometry references, not stable summaries.
```

## Render/host gaps

```txt
RenderHostSnapshot is missing.
Renderer adapters are inline and not summarized.
Scene object counts are not exposed.
Grass instance count, smoke particle count, cloud point count, and cached geometry counts are not summarized.
globalThis.CozyIslandHost does not exist yet.
globalThis.CozyIsland remains compatibility-only and does not carry proof records.
```

## Concrete missing files for next implementation

```txt
src/host-proof/route-version.js
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/action-frame.js
src/host-proof/action-result.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/hero-cloud-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/host-snapshot.js
src/host-proof/fixture-cases.mjs
```

## Validation gaps

```txt
No runtime validation was run during this documentation-only pass.
No local static server was started.
No package test was run.
No browser route check was run.
No DOM-free fixture was run because host-proof modules do not exist yet.
```

## Safe interpretation

The repo is not broken by these gaps.

The active route is `hero-cloud-4`; the next implementation should make that route and host runtime state fixture-readable before adding visual upgrades or promoting shared kits.
