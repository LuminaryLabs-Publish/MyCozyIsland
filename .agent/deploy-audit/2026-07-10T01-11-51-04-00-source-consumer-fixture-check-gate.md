# Deploy Audit: Source Consumer Fixture Check Gate

**Timestamp:** `2026-07-10T01-11-51-04-00`

## Current package scripts

```txt
npm start
```

There is no `npm run check` yet.

## Current validation state

```txt
runtime source changed: no
npm install: not run
npm start: not run
npm run check: unavailable
browser smoke: not run
DOM-free fixture: unavailable
```

## Required next scripts

```txt
npm run fixture:consumer
npm run check
```

## Required fixture

```txt
scripts/cozy-island-browser-consumer-fixture.mjs
```

## Fixture should prove

```txt
route token
source fingerprints
stable source snapshot
input result rows
movement result rows
camera rail samples
grass placement-to-instance parity
cloud descriptor/cache/drift parity
render consumption rows
CozyIslandHost JSON serialization
legacy CozyIsland compatibility
```

## Deploy finding

Do not claim visual, browser, or fixture validation until `npm run check` exists and passes. This pass is documentation-only.
