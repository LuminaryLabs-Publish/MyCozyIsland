# My Cozy Island Next Steps

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-09T08-20-00-04-00`

## Next safe ledge

Build an additive host-state readback layer around the existing route.

```txt
MyCozyIsland Host State Cloud/Grass Readback Ledger Refresh + Browser Fixture Gate
```

## Preserve first

```txt
preserve index.html
preserve ./src/main-cloudform.js?v=hero-cloud-4
preserve current Three.js CDN import
preserve current visible cloud/island/grass/campfire look
preserve current rail threshold progress >= 0.985
preserve current clearing radius and campfire keepout movement rule
preserve legacy globalThis.CozyIsland shape
```

## Implement in this order

```txt
1. Add route/source proof modules.
   - src/host-proof/route-token-readback.js
   - src/host-proof/source-profile.js
   - src/host-proof/source-fingerprint.js
   - src/host-proof/scene-source-snapshot.js

2. Add input and movement proof modules.
   - src/host-proof/browser-input-action-frame.js
   - src/host-proof/action-result.js
   - src/host-proof/input-journal.js
   - src/host-proof/movement-policy-result.js

3. Add rail proof module.
   - src/host-proof/camera-rail-snapshot.js
   - capture mode: rail or first-person
   - capture progress, eased progress, camera position, look target, and player anchor

4. Add grass readback modules.
   - src/host-proof/grass-placement-snapshot.js
   - src/host-proof/grass-instance-snapshot.js
   - expose seed, patch count, instance count, accepted patch summary, exclusion rule summary

5. Add cloud readback modules.
   - src/host-proof/hero-cloud-descriptor-snapshot.js
   - src/host-proof/hero-cloud-cache-snapshot.js
   - src/host-proof/cloud-drift-result.js
   - expose cloud count, point count, cache key count, drift step summary

6. Add render/host proof modules.
   - src/host-proof/render-host-snapshot.js
   - src/host-proof/cozy-island-host-snapshot.js
   - src/host-proof/browser-consumer-fixture.js
   - attach additive globalThis.CozyIslandHost.getState()

7. Add fixture script and package check.
   - scripts/my-cozy-island-browser-consumer-fixture.mjs
   - npm run check should execute the DOM-free fixture
```

## Acceptance checklist

```txt
route token readback reports hero-cloud-4
source fingerprint is stable across repeated runs
scene source snapshot reports island, floor, clearing, grass, smoke, and cloud descriptors
input action frame records wheel, pointer, and keyboard effects without requiring DOM mutation
movement policy result distinguishes accepted, rejected-outside-clearing, and rejected-campfire-keepout
camera rail snapshot reports rail progress and first-person handoff state
grass placement snapshot reports 140 requested patches and accepted render instances
cloud descriptor snapshot reports mattatz cloud descriptors and cached point geometries
cloud drift result reports per-frame movement without relying only on Three.js object mutation
render host snapshot reports renderer/camera/scene summary
CozyIslandHost.getState() is additive and does not break globalThis.CozyIsland
browser consumer fixture can run without launching a browser
package.json exposes npm run check
```

## Do not do next

```txt
do not rewrite the scene visually
do not replace cloud rendering
do not replace grass rendering
do not extract the whole renderer yet
do not change the camera rail timing
do not remove the legacy CozyIsland diagnostic surface
do not create a branch
do not open a PR
```
