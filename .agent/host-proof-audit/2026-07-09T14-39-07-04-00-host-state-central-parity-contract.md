# Host Proof Audit: Host State Central Parity Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-39-07-04-00`

## Current host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache: clouds.userData.savedPointClouds,
  getScrollProgress: () => progress
}
```

## Required additive host surface

```txt
globalThis.CozyIslandHost = {
  getState: () => ({
    route,
    sourceFingerprint,
    sceneSourceSnapshot,
    inputJournal,
    movementResults,
    cameraRailSnapshot,
    grassReadback,
    cloudReadback,
    renderHostSnapshot,
    legacyParity
  })
}
```

## Contract rules

```txt
preserve globalThis.CozyIsland
preserve existing route token hero-cloud-4
preserve current scroll threshold 0.985
preserve current movement boundary and campfire keepout
record accepted/rejected actions explicitly
record scene source descriptors before render projection
record consumer readback after render projection
make fixture DOM-free
avoid visual or renderer rewrite in proof cut
```

## Consumer rows needed

```txt
route-token row
source-fingerprint row
scene-source row
grass-placement/render parity row
cloud-descriptor/cache/drift row
movement-accepted row
movement-rejected row
rail-camera row
first-person-camera row
render-host row
legacy-parity row
```
