# Deploy Audit: Browser Consumer Fixture Wire Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T05-30-27-04-00`

## Current package surface

```txt
package.json:
  type: module
  scripts:
    start: python3 -m http.server 8080
```

## Current deploy/readback state

```txt
static route exists
browser entry exists
no npm check script
no fixture script
no browser smoke in this pass
no GitHub Pages smoke in this pass
```

## Required next fixture wiring

```txt
scripts/my-cozy-island-browser-consumer-fixture.mjs
  -> import host-proof pure modules
  -> build source profile
  -> build fingerprint
  -> build scene source snapshot
  -> run action/movement rows
  -> run camera rail rows
  -> run grass placement/instance parity rows
  -> run cloud descriptor/cache/drift rows
  -> assert expected state shape

package.json
  scripts:
    start: python3 -m http.server 8080
    check: node scripts/my-cozy-island-browser-consumer-fixture.mjs
```

## Required fixture checks

```txt
routeToken == hero-cloud-4
source fingerprint stable across two runs
scene source snapshot includes island/floor/clearing/fire/smoke/grass/cloud descriptors
movement reasons distinguish accepted/rejected paths
camera mode changes from rail to first-person at progress >= 0.985
grass requested count is 140
grass rendered instance count equals placement patch count
cloud cache summary reports cached geometries and total points
render host snapshot shape exists without requiring WebGL
```

## Deployment rule

```txt
Do not add a build pipeline for this proof pass unless needed.
Do not change the static route.
Do not change the GitHub Pages route.
Add only npm run check and fixture-readback modules.
```

## Validation status for this docs pass

```txt
runtime source changed: no
local npm run check: no
browser smoke: no
branch created: no
pushed to main: yes
```
