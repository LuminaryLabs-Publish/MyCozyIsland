# Deploy Audit: Fixture Static Route Validation Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T21-58-34-04-00`

## Current package surface

```json
{
  "name": "my-cozy-island",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "python3 -m http.server 8080"
  }
}
```

## Current route surface

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
```

## Validation gap

There is currently no fixture script and no `npm test` or `npm run check` command.

The next implementation should add a DOM-free fixture script before changing browser behavior.

## Required fixture command after implementation

```bash
node scripts/my-cozy-island-browser-consumer-fixture.mjs
```

Optional package script after the fixture exists:

```json
{
  "scripts": {
    "start": "python3 -m http.server 8080",
    "test:host-proof": "node scripts/my-cozy-island-browser-consumer-fixture.mjs"
  }
}
```

## Browser validation after fixture proof

```bash
npm run start
```

Then inspect:

```js
globalThis.CozyIsland?.getScrollProgress?.()
globalThis.CozyIsland?.cloudContract
globalThis.CozyIsland?.cloudPointCache
globalThis.CozyIslandHost?.getState?.()
```

## Required live route checks

```txt
route loads with no syntax error
loader hides after descriptor construction
wheel changes scroll progress
camera rail still works
first-person movement still unlocks near progress 0.985
campfire keepout still rejects center movement
grass is still visible
hero cloud still renders and drifts
legacy globalThis.CozyIsland remains compatible
new globalThis.CozyIslandHost exposes route/source/action/movement/rail/grass/cloud/render
```

## This pass validation

```txt
runtime source edit: no
fixture created: no
fixture run: no
local server run: no
browser route check: no
GitHub Pages live check: no
branch created: no
pushed to main: yes
```
