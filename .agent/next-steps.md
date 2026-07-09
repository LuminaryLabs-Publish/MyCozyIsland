# My Cozy Island Next Steps

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-09T14-39-07-04-00`

## Next safe ledge

```txt
MyCozyIsland Host Readback Central Parity + Browser Consumer Fixture Gate
```

Build an additive host-state readback layer around the existing route, then wire a DOM-free browser consumer fixture.

## Preserve first

```txt
preserve index.html
preserve ./src/main-cloudform.js?v=hero-cloud-4
preserve current Three.js CDN import
preserve local source-domain kits
preserve globalThis.CozyIsland
preserve scroll threshold 0.985
preserve clearing boundary and campfire keepout policy
preserve current grass and cloud visual consumers
```

## Add next

```txt
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/input-action-frame.js
src/host-proof/action-result.js
src/host-proof/input-journal.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/grass-readback.js
src/host-proof/cloud-readback.js
src/host-proof/render-host-snapshot.js
src/host-proof/cozy-island-host-snapshot.js
scripts/cozy-island-browser-consumer-fixture.mjs
```

## Fixture rows to prove

```txt
route token row
source fingerprint row
scene source snapshot row
wheel progress accepted/clamped row
pointer look accepted/clamped row
movement accepted row
movement rejected row
camera rail sample row
first-person camera row
grass source/render parity row
cloud descriptor/cache/drift row
render host snapshot row
legacy parity row
```

## Stop condition

Stop the ledge when `npm run check` can run the DOM-free fixture and `globalThis.CozyIslandHost.getState()` remains additive and compatibility-safe.
