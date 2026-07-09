# Host Proof Audit: Host State Consumer Parity Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-39-50-04-00`

## Existing host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache: clouds.userData.savedPointClouds,
  getScrollProgress: () => progress
}
```

## Required additive surface

```txt
globalThis.CozyIslandHost = {
  getState() {
    return {
      routeToken,
      sourceProfile,
      sourceFingerprint,
      sceneSourceSnapshot,
      inputJournalTail,
      movementPolicyTail,
      cameraRailSnapshot,
      grassPlacementSnapshot,
      grassInstanceSnapshot,
      heroCloudDescriptorSnapshot,
      heroCloudCacheSnapshot,
      cloudDriftTail,
      renderHostSnapshot
    }
  }
}
```

## Compatibility rules

```txt
preserve globalThis.CozyIsland
preserve cloudContract reference access
preserve cloudPointCache reference access
preserve getScrollProgress behavior
add CozyIslandHost without renaming old keys
make source proof rows plain data, not Three.js object references
keep fixtures DOM-free
keep browser route visually unchanged
```

## Consumer parity checks

```txt
legacy consumer:
  CozyIsland.cloudContract exists
  CozyIsland.cloudPointCache exists
  CozyIsland.getScrollProgress() returns progress

new consumer:
  CozyIslandHost.getState().routeToken reports hero-cloud-4
  CozyIslandHost.getState().sourceFingerprint is stable
  CozyIslandHost.getState().grassInstanceSnapshot.instanceCount matches renderer input
  CozyIslandHost.getState().heroCloudCacheSnapshot.totalPointCount is data-only
  CozyIslandHost.getState().renderHostSnapshot reports scene/camera/renderer facts
```

## Main host proof finding

The host readback layer should be additive and data-only. It should prove current browser behavior without forcing a renderer rewrite, source-kit promotion, or legacy diagnostic break.
