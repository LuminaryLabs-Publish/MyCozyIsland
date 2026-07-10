# Deploy Audit: Source Consumer Fixture Gate

**Timestamp:** `2026-07-10T04-29-10-04-00`

## Current package surface

```txt
npm start -> python3 -m http.server 8080
npm run check -> unavailable
npm run fixture:consumer -> unavailable
```

## Current deploy risk

The scene can be served statically, but there is no automated source/consumer proof before deploy. Browser and GPU behavior are inspected manually, while source descriptors and runtime consumers are not reconciled through fixture rows.

## Required next scripts

```txt
scripts/cozy-island-browser-consumer-fixture.mjs
npm run fixture:consumer
npm run check
```

`npm run check` should execute the fixture and any future static validation without requiring a browser, GPU, or network.

## Gate criteria

```txt
route token is stable
source fingerprint is stable
source snapshot is serializable
input/movement result rows cover accepted, rejected, and no-change outcomes
grass placement/instance counts reconcile
cloud descriptor/cache/drift rows reconcile
render consumption rows cover every source family
CozyIslandHost.getState() is serializable
legacy globalThis.CozyIsland remains compatible
```

## Validation this pass

Documentation only. No runtime source changed and no local/browser validation was run.
