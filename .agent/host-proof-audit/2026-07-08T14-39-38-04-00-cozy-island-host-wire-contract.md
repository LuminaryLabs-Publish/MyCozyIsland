# Host Proof Audit: CozyIslandHost Wire Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T14-39-38-04-00`

## Contract purpose

Add a proof-oriented host surface without replacing the legacy compatibility surface.

Current compatibility surface:

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache,
  getScrollProgress
}
```

Target additive proof surface:

```txt
globalThis.CozyIslandHost = {
  getState,
  getDiagnostics,
  getLastActionResult,
  getJournal
}
```

## Required snapshot shape

```txt
CozyIslandHostSnapshot:
  route:
    RouteVersionResult
  source:
    SourceProfile
    SourceFingerprint
    SceneSourceSnapshot
  actions:
    latestActionFrame
    latestActionResult
    actionJournalCount
  movement:
    latestMovementPolicyResult
    clearingBoundary
    campfireKeepout
  camera:
    railProgress
    latestCameraRailSnapshot
  clouds:
    HeroCloudDescriptorSnapshot
    HeroCloudCacheSnapshot
    latestCloudDriftResult
  render:
    RenderHostSnapshot
  compatibility:
    hasLegacyCozyIsland
    hasCozyIslandHost
```

## First fixture matrix

```txt
cozy-route-version-accepted-001
cozy-route-version-stale-hero-cloud-3-001
cozy-route-version-missing-token-001
cozy-source-profile-hero-cloud-4-001
cozy-source-fingerprint-stable-001
cozy-scene-source-snapshot-001
cozy-wheel-action-progress-001
cozy-pointer-action-yaw-001
cozy-pointer-action-look-001
cozy-keyboard-before-fp-001
cozy-keyboard-no-input-001
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

## Implementation order

```txt
1. Add pure route-version module.
2. Add pure source profile and fingerprint modules.
3. Add pure scene source snapshot module.
4. Add pure action frame and action result modules.
5. Add pure movement policy result module.
6. Add pure camera rail snapshot module using current rail constants.
7. Add pure hero cloud descriptor/cache/drift snapshot modules.
8. Add pure render/host snapshot module.
9. Add DOM-free fixture cases.
10. Add package script for the fixture.
11. Wire additive CozyIslandHost into src/main-cloudform.js.
12. Run browser smoke only after fixture passes.
```

## Non-goals

```txt
Do not change art.
Do not tune camera rail values.
Do not tune movement speed.
Do not change clouds.
Do not rename hero-cloud-4.
Do not delete globalThis.CozyIsland.
Do not require browser runtime for pure fixture rows.
```

## Acceptance rule

The next implementation is acceptable when a command can run the fixture in Node and produce stable pass/fail rows for route, source, action, movement, rail, cloud, render, and host snapshots without launching the browser.
