# Deploy Audit: Fixture Validation Command Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T00-20-08-04-00`

## Current package scripts

```json
{
  "start": "python3 -m http.server 8080"
}
```

## Current deploy shape

```txt
static site
  -> index.html
  -> src/main-cloudform.js
  -> local src/kits/** modules
  -> CDN Three.js import
```

## Missing validation commands

```txt
no npm test
no npm run check
no DOM-free fixture script
no browser smoke script
no Pages smoke script
```

## Required next validation command

After adding `scripts/my-cozy-island-browser-consumer-fixture.mjs`, add a package command such as:

```json
{
  "scripts": {
    "start": "python3 -m http.server 8080",
    "check": "node scripts/my-cozy-island-browser-consumer-fixture.mjs"
  }
}
```

## Deploy safety rule

```txt
preserve current static route
preserve route token hero-cloud-4
preserve CDN import unless explicitly changing runtime policy
run DOM-free fixture before browser smoke
run browser smoke before declaring visual success
```

## Finding

The next implementation should add a fixture command before runtime splice claims. This pass did not change package scripts because the fixture source files do not exist yet.