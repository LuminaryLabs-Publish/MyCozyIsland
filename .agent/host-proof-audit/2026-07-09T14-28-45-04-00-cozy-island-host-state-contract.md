# Host Proof Audit — CozyIslandHost State Contract

**Timestamp:** `2026-07-09T14-28-45-04-00`

## Current host state

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache: clouds.userData.savedPointClouds,
  getScrollProgress: () => progress
}
```

## Missing host state

```txt
globalThis.CozyIslandHost does not exist.
globalThis.CozyIslandHost.getState() does not exist.
There is no route/source/grass/cloud/render/input/movement/camera proof projection.
There is no additive fixture-readable state surface.
```

## Required additive host shape

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
      cloud,
      render,
      validation
    };
  }
}
```

## Required state sections

```txt
route:
  routeToken
  scriptPath
  versionTag

source:
  sourceProfile
  sourceFingerprint
  sceneSourceSnapshot

input:
  lastActionFrame
  lastActionResult
  inputJournalLength

movement:
  lastMovementPolicyResult
  clearingRadius
  campfireKeepoutRadius

camera:
  cameraRailSnapshot
  mode
  progress

grass:
  placementSnapshot
  instanceSnapshot

cloud:
  descriptorSnapshot
  cacheSnapshot
  lastDriftResult

render:
  renderHostSnapshot

validation:
  fixtureRows
  acceptanceRows
  status
```

## Compatibility rule

The next implementation must preserve the existing `globalThis.CozyIsland` object exactly enough for current manual/browser diagnostics. `CozyIslandHost` should be additive and should not replace or rename `CozyIsland`.

## Fixture rule

The DOM-free fixture should be able to import pure host-proof modules and assert stable rows without creating a canvas, WebGL context, DOM nodes, or browser globals.
