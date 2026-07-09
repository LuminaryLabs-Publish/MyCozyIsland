# Additive Host Readback Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T17-48-20-04-00`

## Current host surface

```js
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache: clouds.userData.savedPointClouds,
  getScrollProgress: () => progress
};
```

This surface is useful for manual inspection but incomplete for deterministic fixtures:

```txt
cloudPointCache contains live THREE.BufferGeometry objects
route token is absent
source seeds and counts are absent
input results are absent
movement rejection reasons are absent
camera state is absent
render-consumption counts are absent
renderer state is absent
restart/reset is absent
```

## Compatibility requirement

Do not remove or rename `globalThis.CozyIsland`.

Add a separate serializable proof host:

```js
globalThis.CozyIslandHost = {
  getState,
  getSourceProfile,
  getInputJournal,
  getRenderConsumptionLedger,
  restartProofState
};
```

## `getState()` target

```txt
{
  schemaVersion,
  route: {
    token,
    script,
    threeVersion
  },
  source: {
    fingerprint,
    island,
    oceanFloor,
    foliage,
    clearing,
    campfire,
    smoke,
    grass,
    clouds
  },
  interaction: {
    progress,
    mode,
    dragging,
    keys,
    playerPose,
    lastInputResult,
    journalLength
  },
  camera: {
    mode,
    position,
    lookTarget,
    fov,
    near,
    far
  },
  render: {
    renderer,
    scene,
    consumptionLedger
  },
  compatibility: {
    legacyPresent,
    legacyScrollProgress,
    cloudContractFingerprint,
    cloudGeometryCount
  }
}
```

## Serialization rules

```txt
No THREE.Vector3 instances.
No THREE.BufferGeometry instances.
No renderer, scene, camera, mesh, material, texture, or DOM references.
All vectors become plain numeric objects.
All Sets and Maps become sorted arrays or plain records.
Floating-point values use stable fixture precision.
Object ordering is deterministic where arrays are compared.
```

## Source fingerprint inputs

```txt
route token
Three.js version
source kit versions where available
island seed and normalized state
ocean floor seed and normalized state
foliage seed and object counts
clearing dimensions
campfire source state
smoke descriptor
grass seed and normalized placement summary
cloud descriptor fingerprint
```

## Restart behavior

`restartProofState()` should reset proof-only state without rebuilding the scene:

```txt
clear input result journal
clear last input result
reset proof sequence counter
reset parity status aggregation
retain current live gameplay progress and visuals unless an explicit runtime reset is later defined
```

A separate future runtime restart can rebuild the route. Do not silently make the proof restart change visible scene state.

## Fixture assertions

```txt
JSON.stringify(CozyIslandHost.getState()) succeeds
repeated reads without mutations are deeply equal
legacy global remains present
legacy scroll progress equals host progress
legacy cloud contract fingerprint equals host cloud fingerprint
live geometry objects are not present in host state
source and consumption counts reconcile or report explicit mismatches
```

## Next safe ledge

```txt
Serializable CozyIslandHost Snapshot + Legacy Compatibility Fixture
```