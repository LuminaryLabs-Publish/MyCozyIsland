# Deploy Audit: Browser Input Fixture Gate

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T19-09-44-04-00`

## Current deploy and validation surface

```txt
package.json scripts:
  npm start -> python3 -m http.server 8080

missing:
  npm run check
  npm run fixture:consumer
  DOM-free source/consumer fixture
  browser smoke gate
  source-to-render parity gate
```

## Gate needed before next deploy confidence

```txt
scripts/cozy-island-browser-consumer-fixture.mjs
npm run fixture:consumer
npm run check
```

## Fixture must prove

```txt
route token and source fingerprint
scene-source snapshot stability
wheel result accepted/clamped rows
pointer accepted/no-change rows
movement accepted/rejected/no-input rows
camera rail samples
first-person threshold behavior
grass requested/placed/instanced parity
cloud descriptor/cache/drift parity
render-consumption rows for every source family
CozyIslandHost JSON serialization
legacy CozyIsland compatibility
```

## Validation status this pass

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm install: not run
npm start: not run
npm run check: unavailable
browser smoke: not run
DOM-free fixture: not run because fixture files do not exist yet
```