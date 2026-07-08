# MyCozyIsland Static Route Validation Map

**Timestamp:** `2026-07-08T19-40-00-04-00`

## Current deploy shape

```txt
package.json
  -> npm run start
  -> python3 -m http.server 8080

index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
```

## Validation boundary

The next implementation can be validated without a build step if the fixture is pure Node and the browser route is served statically.

## Required checks after implementation

```bash
node scripts/my-cozy-island-browser-consumer-fixture.mjs
npm run start
```

Browser checks:

```js
globalThis.CozyIsland?.getScrollProgress?.()
globalThis.CozyIsland?.cloudContract
globalThis.CozyIsland?.cloudPointCache
globalThis.CozyIslandHost?.getState?.()
globalThis.CozyIslandHost?.getState?.().route
globalThis.CozyIslandHost?.getState?.().source
globalThis.CozyIslandHost?.getState?.().movement
globalThis.CozyIslandHost?.getState?.().rail
globalThis.CozyIslandHost?.getState?.().grass
globalThis.CozyIslandHost?.getState?.().clouds
globalThis.CozyIslandHost?.getState?.().render
```

## Deploy risks

```txt
script query token can hide stale browser cache if route changes without explicit proof
static server has no compile step, so syntax mistakes only surface at runtime or fixture time
browser host proof must remain additive to avoid breaking existing static route
DOM-free fixture must not import Three.js CDN-only modules unless mocked or isolated
```

## Stop condition

Do not update visible route behavior until the static route proof surface and fixture rows are implemented and manually or automated validated.
