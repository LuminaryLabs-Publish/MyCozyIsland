# Deploy Audit: Check Script Browser Fixture Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-21-06-04-00`

## Current deploy/check surface

```txt
package.json:
  npm run start -> python3 -m http.server 8080

missing:
  npm run check
  npm test
  DOM-free fixture script
  browser consumer readback validation
```

## Required next deploy validation

```txt
scripts/my-cozy-island-browser-consumer-fixture.mjs
  -> run through npm run check
  -> validate host-proof helpers without browser globals
  -> fail on descriptor count drift
  -> fail on route token drift
  -> fail on missing CozyIslandHost snapshot fields
```

## Suggested package script

```json
{
  "scripts": {
    "start": "python3 -m http.server 8080",
    "check": "node scripts/my-cozy-island-browser-consumer-fixture.mjs"
  }
}
```

## Do not do in deploy cut

```txt
do not introduce bundling unless needed
do not require Playwright for the first fixture
do not remove the static route
do not change GitHub Pages assumptions
do not create a branch
```

## Main finding

The repo needs a fixture-first `npm run check` gate before any further render or interaction expansion.
