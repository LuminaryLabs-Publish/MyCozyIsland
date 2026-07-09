# Deploy Audit: Check Fixture Main Push Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-39-50-04-00`

## Current deploy/validation surface

```txt
package.json:
  npm start -> python3 -m http.server 8080

missing:
  npm run check
  scripts/my-cozy-island-browser-consumer-fixture.mjs
  DOM-free source/host fixture modules
```

## Required next validation path

```txt
npm run check
  -> node scripts/my-cozy-island-browser-consumer-fixture.mjs
  -> import pure src/host-proof/* modules
  -> assert route token, source fingerprint, descriptor counts, movement decisions, rail snapshots, grass counts, cloud cache counts, drift result, render host snapshot shape
```

## Main push rules

```txt
push only to main
create no branches
open no PRs
keep runtime visual changes out of this documentation pass
```

## Current pass validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm start: not run
npm run check: not run because check script does not exist yet
browser smoke: not run
DOM-free fixture: not run because fixture does not exist yet
```
