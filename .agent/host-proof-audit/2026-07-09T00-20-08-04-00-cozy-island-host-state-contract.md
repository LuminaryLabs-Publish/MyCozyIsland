# Host Proof Audit: CozyIslandHost State Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T00-20-08-04-00`

## Current host surface

The current browser diagnostic surface is:

```js
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache: clouds.userData.savedPointClouds,
  getScrollProgress: () => progress
};
```

This must remain compatible.

## Missing host surface

`globalThis.CozyIslandHost` does not exist yet.

The source route has no single fixture-readable host state containing:

```txt
route
source
fingerprint
scene
input/action
movement
rail
grass
cloud
render
validation
legacy compatibility
```

## Required additive state shape

```txt
globalThis.CozyIslandHost.getState()
  -> route: RouteVersionResult
  -> source: SourceProfile + SourceFingerprint + SceneSourceSnapshot
  -> action: last BrowserInputActionFrame + last ActionResult + input journal count
  -> movement: last MovementPolicyResult + first-person unlock state
  -> rail: last CameraRailSnapshot
  -> grass: GrassInstanceSnapshot
  -> cloud: HeroCloudDescriptorSnapshot + HeroCloudCacheSnapshot + last CloudDriftResult
  -> render: RenderHostSnapshot
  -> validation: fixture row names + last status
  -> legacy: CozyIsland compatibility flags
```

## Fixture acceptance rule

```txt
DOM-free fixture must pass before source splice.
Visible route splice must be read-only and additive first.
globalThis.CozyIsland must remain unchanged.
globalThis.CozyIslandHost must not require WebGL-only objects to build its plain-data snapshot.
```

## Finding

The host proof surface should be added as a diagnostic contract, not as a gameplay/controller rewrite. The current visible route is the source of truth until fixture rows prove parity.