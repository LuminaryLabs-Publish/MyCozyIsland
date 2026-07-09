# Deploy Audit: Browser Fixture Check Gate

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T08-20-00-04-00`

## Current package surface

```txt
npm start
  -> python3 -m http.server 8080
```

## Missing deploy validation

```txt
npm run check does not exist
scripts/my-cozy-island-browser-consumer-fixture.mjs does not exist
no DOM-free source fixture is wired
no browser smoke was run in this docs-only pass
```

## Required next deploy gate

```txt
package.json:
  check: node scripts/my-cozy-island-browser-consumer-fixture.mjs

fixture assertions:
  route token is hero-cloud-4
  source profile is stable
  source fingerprint is stable
  scene descriptor counts are stable
  grass placement and instance counts match
  cloud descriptor/cache summaries are stable
  movement policy returns accepted/rejected reason codes
  camera rail snapshots cover rail and first-person thresholds
  render host snapshot shape is serializable
```

## Release rule

Do not treat visual changes as accepted until `npm run check` proves source/readback parity and the browser route still loads with the legacy `globalThis.CozyIsland` surface intact.
