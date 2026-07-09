# Deploy Audit: DOM-free Fixture Check Gate

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-26-56-04-00`

## Current package surface

```json
{
  "name": "my-cozy-island",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "python3 -m http.server 8080"
  }
}
```

## Current validation gap

```txt
npm run check does not exist.
scripts/my-cozy-island-browser-consumer-fixture.mjs does not exist.
no DOM-free host/source fixture can be run.
browser smoke was not run in this documentation pass.
```

## Required next deploy gate

```txt
package.json:
  scripts.check = "node scripts/my-cozy-island-browser-consumer-fixture.mjs"

scripts/my-cozy-island-browser-consumer-fixture.mjs:
  - import pure source/host-proof helpers
  - generate fixture rows without document/window/canvas
  - assert routeToken === hero-cloud-4
  - assert stable SourceFingerprint
  - assert descriptor counts for island/floor/clearing/grass/smoke/clouds
  - assert grass requested count 140 and render instance parity
  - assert cloud descriptor/cache/drift rows
  - assert movement accepted/rejected rows
  - assert rail start/mid/near/first-person snapshots
  - assert CozyIslandHost state shape
```

## Required checks after implementation

```txt
npm run check
npm start
browser smoke on index.html
confirm legacy globalThis.CozyIsland still exists
confirm additive globalThis.CozyIslandHost.getState() exists
```

## This pass validation

```txt
runtime source changed: no
package changed: no
fixture added: no
npm run check: not run
browser smoke: not run
branch created: no
pull request created: no
pushed to main: yes
```
