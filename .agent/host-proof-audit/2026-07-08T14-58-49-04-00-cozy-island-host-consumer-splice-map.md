# Host-Proof Audit — CozyIslandHost Consumer Splice Map

**Timestamp:** `2026-07-08T14-58-49-04-00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

## Purpose

Define the exact splice between pure host-proof modules and the browser runtime.

The next implementation should add `globalThis.CozyIslandHost` as an additive diagnostics surface while preserving `globalThis.CozyIsland` exactly as the compatibility surface.

## Existing compatibility surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache,
  getScrollProgress
}
```

## Target additive surface

```js
globalThis.CozyIslandHost = {
  version: "hero-cloud-4",
  getState() {
    return {
      route,
      source,
      actionJournal,
      movement,
      cameraRail,
      cloud,
      render,
      compatibility,
      fixtureStatus
    };
  }
}
```

## Required state buckets

```txt
route:
  RouteVersionResult for hero-cloud-4

source:
  SourceProfile
  SourceFingerprint
  SceneSourceSnapshot

actionJournal:
  latest ActionFrame / ActionResult records

movement:
  latest MovementPolicyResult
  clearing boundary readback
  campfire keepout readback

cameraRail:
  latest live rail sample
  fixed fixture sample rows

cloud:
  HeroCloudDescriptorSnapshot
  HeroCloudCacheSnapshot
  latest CloudDriftResult summary

render:
  RenderHostSnapshot

compatibility:
  globalThis.CozyIsland present
  globalThis.CozyIsland.cloudContract present
  globalThis.CozyIsland.cloudPointCache present
  globalThis.CozyIsland.getScrollProgress present

fixtureStatus:
  fixture ids and pass/fail/not-run status
```

## Pure first, browser second

```txt
1. Build pure modules under src/host-proof/.
2. Build fixture rows that do not import Three.js or touch DOM.
3. Only after fixture proof, import host-proof modules in src/main-cloudform.js.
4. During scene construction, collect source/render/cloud snapshots.
5. During event handlers and frame loop, update action/movement/rail/cloud result records.
6. Expose globalThis.CozyIslandHost.
7. Keep globalThis.CozyIsland unchanged.
```

## Minimal fixture gate

```txt
cozy-route-version-accepted-001
cozy-source-profile-hero-cloud-4-001
cozy-source-fingerprint-stable-001
cozy-scene-source-snapshot-001
cozy-wheel-action-progress-001
cozy-keyboard-clearing-accepted-001
cozy-keyboard-clearing-boundary-rejected-001
cozy-keyboard-campfire-keepout-rejected-001
cozy-camera-rail-samples-001
cozy-cloud-descriptor-001
cozy-cloud-cache-001
cozy-cloud-cache-reuse-001
cozy-cloud-drift-001
cozy-render-host-snapshot-001
cozy-host-snapshot-001
cozy-host-legacy-compatibility-001
cozy-host-dom-free-001
```

## Implementation stop line

Stop before any visual retune. This ledge is complete when the browser can expose stable host proof records and the fixture can prove the same record shapes without browser APIs.

## Validation command to add later

```bash
node src/host-proof/fixture-cases.mjs
```

Add the package script only after the fixture file exists.
