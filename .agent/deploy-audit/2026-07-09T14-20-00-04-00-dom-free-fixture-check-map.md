# Deploy Audit: DOM-Free Fixture Check Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-20-00-04-00`

## Current package surface

```json
{
  "scripts": {
    "start": "python3 -m http.server 8080"
  }
}
```

## Current validation gap

```txt
npm run check: missing
DOM-free fixture: missing
browser smoke: not run this pass
runtime source changes: none this pass
branch created: no
```

## Required next deploy/check surface

```txt
package.json
  scripts.check -> node scripts/my-cozy-island-browser-consumer-fixture.mjs

scripts/my-cozy-island-browser-consumer-fixture.mjs
  imports fixture-safe source/host-proof helpers
  does not import DOM or Three.js renderer globals
  asserts route token, source fingerprint, descriptor summaries, input/movement/rail snapshots, grass/cloud/render host snapshots
```

## Main deploy finding

The repo can be served statically, but it has no deterministic check command. The next implementation must add `npm run check` before claiming source/host proof is durable.
