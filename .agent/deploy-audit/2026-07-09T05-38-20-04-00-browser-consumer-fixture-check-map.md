# Deploy Audit: Browser Consumer Fixture Check Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T05-38-20-04-00`

## Current deploy / validation surface

`package.json` currently exposes only:

```txt
npm start
```

There is no `npm run check` and no DOM-free browser consumer fixture script yet.

## Current static route

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
```

The route should remain static and browser-compatible.

## Required next deploy work

```txt
scripts/my-cozy-island-browser-consumer-fixture.mjs
package.json check script
```

## Check contract

```txt
npm run check
  -> node scripts/my-cozy-island-browser-consumer-fixture.mjs
```

The fixture should not require:

```txt
browser
DOM
canvas
Three.js renderer
network
GitHub Pages
```

The fixture should prove pure source/readback helpers.

## Acceptance rows

```txt
route token = hero-cloud-4
source fingerprint is stable
descriptor snapshot includes island, floor, clearing, grass, smoke, and cloud records
input rows produce bounded action results
movement rows produce accepted and rejected results
rail rows cover start/mid/near/first-person states
grass rows prove requestedCount / patchCount / instanceCount parity
cloud rows prove descriptor / cache / drift summaries
render host row exposes additive state shape
legacy CozyIsland compatibility row remains true
```

## Current validation status

```txt
runtime source changed: no
npm start run: no
npm run check run: no, no check script exists yet
browser smoke run: no
fixture run: no, fixture files do not exist yet
branch created: no
pull request created: no
```
