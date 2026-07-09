# Host Proof Audit: Route Source Host State Ledger Freeze

**Timestamp:** `2026-07-09T08-11-12-04-00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

## Current host surface

The current route exposes only the legacy diagnostic object:

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache,
  getScrollProgress
}
```

That is useful for quick inspection but too narrow for deterministic fixture proof.

## Host proof problem

`src/main-cloudform.js` has the data needed for proof, but it is not normalized into stable records:

```txt
route token
source descriptors
source fingerprint
input state
movement decisions
rail state
grass placement and instance counts
cloud descriptor and cache counts
cloud drift results
render host summary
frame summary
```

## Additive host target

```txt
globalThis.CozyIslandHost = {
  getState() {
    return {
      route,
      sourceProfile,
      sourceFingerprint,
      sceneSourceSnapshot,
      input,
      movement,
      cameraRail,
      grass,
      clouds,
      renderHost,
      frame,
      legacy
    };
  }
}
```

## Required source modules

```txt
src/host-proof/route-token-readback.js
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/browser-input-action-frame.js
src/host-proof/action-result.js
src/host-proof/input-journal.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/grass-placement-snapshot.js
src/host-proof/grass-instance-snapshot.js
src/host-proof/hero-cloud-descriptor-snapshot.js
src/host-proof/hero-cloud-cache-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/render-host-snapshot.js
src/host-proof/cozy-island-host-snapshot.js
src/host-proof/browser-consumer-fixture.js
scripts/my-cozy-island-browser-consumer-fixture.mjs
```

## Rules for implementation

```txt
preserve globalThis.CozyIsland
add CozyIslandHost as a separate additive object
keep the script token hero-cloud-4
keep current camera rail threshold progress >= 0.985
keep clearing/campfire movement constraints
keep cloud and grass visuals unchanged
make fixture helpers pure where possible
run fixture through npm run check
sync central ledger after fixture proof
```

## Main finding

The next pass should freeze the source/host contract, not the visual design. Once `CozyIslandHost.getState()` and DOM-free fixture rows exist, later renderer extraction and shared-kit promotion will be much safer.
