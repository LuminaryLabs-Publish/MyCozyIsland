# Consumer Fixture Script Gate

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T17-48-20-04-00`

## Current package surface

```json
{
  "scripts": {
    "start": "python3 -m http.server 8080"
  }
}
```

The repository has no build, check, fixture, browser smoke, or deploy validation script.

## Current deploy risk

A static host can serve the route successfully even when:

```txt
source and renderer counts diverge
movement policy changes silently
input thresholds drift
cloud cache reuses stale geometry
grass instances no longer match placements
legacy diagnostics break
route token and source fingerprint disagree
```

The current hosting surface has no pre-deploy proof gate for these regressions.

## Required scripts

```json
{
  "scripts": {
    "start": "python3 -m http.server 8080",
    "fixture:consumer": "node scripts/cozy-island-browser-consumer-fixture.mjs",
    "check": "npm run fixture:consumer"
  }
}
```

The fixture must be DOM-free and GPU-free. It should import pure source/proof modules, not execute `src/main-cloudform.js` directly.

## Fixture responsibilities

```txt
construct canonical source profile
compute stable source fingerprint
construct source snapshots
run wheel/pointer/movement result matrix
sample deterministic rail and first-person camera states
reconcile grass placement and instance descriptors
reconcile cloud descriptors, cache results, and fixed-dt drift
build render-consumption ledger rows
build serializable host snapshot
verify legacy compatibility projection
print concise pass/fail summary
exit non-zero on mismatch
```

## Deployment gate order

```txt
npm run check
  -> optional static file validation
  -> publish static artifact
```

No Pages or static deployment workflow should publish a new route revision unless `npm run check` passes.

## Validation output contract

```txt
route token
source fingerprint
fixture row count
accepted/rejected/no-change input result counts
render source-family row count
parity mismatch count
legacy compatibility status
final status
```

## Current validation status

```txt
npm install: not run
npm start: not run
npm run fixture:consumer: unavailable
npm run check: unavailable
browser smoke: not run
runtime source changed: no
```

## Next safe ledge

```txt
DOM-Free Consumer Fixture + npm run check Pre-Deploy Gate
```