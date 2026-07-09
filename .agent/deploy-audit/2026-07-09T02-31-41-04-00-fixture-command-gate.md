# Deploy Audit: Fixture Command Gate

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T02-31-41-04-00`

## Current deploy / run state

```txt
static route: index.html
entry script: ./src/main-cloudform.js?v=hero-cloud-4
package command: npm run start
start script: python3 -m http.server 8080
```

## Current validation limit

```txt
No npm test exists.
No npm run check exists.
No fixture script exists.
No browser consumer proof can run without opening the route.
```

## Required next command

Add only after the fixture script exists:

```json
{
  "scripts": {
    "start": "python3 -m http.server 8080",
    "check": "node scripts/my-cozy-island-browser-consumer-fixture.mjs"
  }
}
```

## Fixture gate

```txt
node scripts/my-cozy-island-browser-consumer-fixture.mjs
  -> route token row
  -> source profile row
  -> source fingerprint row
  -> scene source snapshot row
  -> input/action rows
  -> movement policy rows
  -> camera rail rows
  -> grass placement/instance rows
  -> hero cloud descriptor/cache rows
  -> cloud drift rows
  -> render host snapshot row
  -> CozyIslandHost shape row
  -> legacy CozyIsland compatibility row
```

## Stop line

Do not add `npm run check` until `scripts/my-cozy-island-browser-consumer-fixture.mjs` exists and returns a deterministic non-browser result.
