# MyCozyIsland Static Route Proof Validation

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T19-50-20-04-00`

## Current route

```txt
index.html
  -> canvas#game
  -> #cloud-loader
  -> #error
  -> ./src/main-cloudform.js?v=hero-cloud-4
```

## Package command

```txt
npm run start
  -> python3 -m http.server 8080
```

## Validation target after implementation

```txt
node scripts/my-cozy-island-browser-consumer-fixture.mjs
npm run start
manual browser open at static route
console check globalThis.CozyIsland
console check globalThis.CozyIslandHost.getState()
```

## Route invariants

```txt
preserve index.html
preserve src/main-cloudform.js entry path
preserve hero-cloud-4 token unless fixture intentionally updates the expected token
preserve Three.js CDN import until host proof exists
preserve legacy globalThis.CozyIsland
add CozyIslandHost only as an additive proof surface
```

## Current validation status

```txt
runtime source changed: no
local server run: no
browser smoke: no
fixture run: no
pushed docs to main: yes
```
