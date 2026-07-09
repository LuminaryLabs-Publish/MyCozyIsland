# Host Proof Audit: Host State Browser Fixture Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-21-06-04-00`

## Current host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache: clouds.userData.savedPointClouds,
  getScrollProgress: () => progress
}
```

## Missing additive host surface

```txt
globalThis.CozyIslandHost = {
  getState() {
    return {
      route,
      source,
      input,
      movement,
      camera,
      grass,
      clouds,
      render,
      validation
    };
  }
}
```

## Required source proof chain

```txt
RouteTokenReadback
  -> SourceProfile
  -> SourceFingerprint
  -> SceneSourceSnapshot
  -> BrowserInputActionFrame
  -> ActionResult
  -> MovementPolicyResult
  -> CameraRailSnapshot
  -> GrassPlacementSnapshot
  -> GrassInstanceSnapshot
  -> HeroCloudDescriptorSnapshot
  -> HeroCloudCacheSnapshot
  -> CloudDriftResult
  -> RenderHostSnapshot
  -> CozyIslandHostSnapshot
```

## Fixture acceptance

```txt
scripts/my-cozy-island-browser-consumer-fixture.mjs
  -> imports source/host-proof helpers
  -> does not require document/window/canvas/WebGL
  -> asserts route token hero-cloud-4
  -> asserts stable source fingerprint
  -> asserts descriptor counts
  -> asserts grass placement/instance counts
  -> asserts cloud descriptor/cache counts
  -> asserts movement policy result cases
  -> asserts rail camera snapshots
  -> asserts host snapshot shape
```

## Compatibility rule

Do not remove or rename `globalThis.CozyIsland`.

Only add `globalThis.CozyIslandHost` after the source/fixture helpers exist.

## Main finding

The next implementation should make the route self-describing and fixture-readable before changing visuals or extracting the renderer.
