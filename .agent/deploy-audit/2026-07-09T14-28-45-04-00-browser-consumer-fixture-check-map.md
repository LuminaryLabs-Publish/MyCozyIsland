# Deploy Audit — Browser Consumer Fixture Check Map

**Timestamp:** `2026-07-09T14-28-45-04-00`

## Current deploy/validation surface

```txt
package.json scripts:
  start: python3 -m http.server 8080

missing:
  check
  build
  DOM-free fixture
  browser consumer fixture
  GitHub Pages smoke gate
```

## Current blocker

The route can be served manually, but there is no automated fixture proving that the local source-domain descriptors are consumed by the browser route or exposed through a stable host readback shape.

## Required next files

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

## Required script change

```json
{
  "scripts": {
    "start": "python3 -m http.server 8080",
    "check": "node scripts/my-cozy-island-browser-consumer-fixture.mjs"
  }
}
```

## Acceptance gates

```txt
node scripts/my-cozy-island-browser-consumer-fixture.mjs passes
npm run check passes
fixture runs without DOM/canvas/WebGL/browser globals
fixture proves route token hero-cloud-4
fixture proves descriptor counts for island/floor/clearing/grass/smoke/cloud
fixture proves grass requested/accepted/instance counts
fixture proves cloud descriptor/cache/drift rows
fixture proves movement policy accept/reject reasons
fixture proves camera rail and first-person handoff rows
fixture proves render host snapshot shape
browser route still exposes globalThis.CozyIsland
browser route additively exposes globalThis.CozyIslandHost.getState()
```

## Current pass validation

```txt
runtime source changed: no
package.json changed: no
fixture added: no
npm run check: not run
browser smoke: not run
branch created: no
PR created: no
pushed to main: yes
```
