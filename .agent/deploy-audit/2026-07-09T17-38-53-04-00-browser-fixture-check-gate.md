# My Cozy Island Browser Fixture Check Gate

**Timestamp:** `2026-07-09T17-38-53-04-00`

## Current script surface

```json
{
  "scripts": {
    "start": "python3 -m http.server 8080"
  }
}
```

There is no build, check, lint, test, fixture, or browser-smoke script.

## Required first validation gate

```txt
scripts/cozy-island-browser-consumer-fixture.mjs
  -> imports pure host-proof modules
  -> builds stable source fixtures
  -> replays input/movement rows
  -> compares grass source and instance snapshots
  -> compares cloud descriptor/cache/drift snapshots
  -> verifies normalized render-host snapshot shape
  -> verifies legacy compatibility fields
  -> exits nonzero on mismatch
```

Recommended package scripts:

```json
{
  "scripts": {
    "start": "python3 -m http.server 8080",
    "fixture:consumer": "node scripts/cozy-island-browser-consumer-fixture.mjs",
    "check": "npm run fixture:consumer"
  }
}
```

## Gate order

```txt
1. pure source-profile fixture
2. input result fixture
3. movement policy fixture
4. camera rail snapshot fixture
5. grass parity fixture
6. cloud cache/drift fixture
7. render-host snapshot fixture
8. legacy parity fixture
9. optional browser smoke after DOM adapter wiring
```

## Main-branch rule

All changes must be committed directly to `main`. Do not create a branch or pull request for this scheduled documentation lane.

## Current validation status

```txt
npm install: not run
npm start: not run
npm run check: unavailable
browser smoke: not run
runtime source: unchanged
```
