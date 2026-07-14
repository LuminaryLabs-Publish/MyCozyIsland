# Deploy audit: menu postcard browser fixture gate

**Timestamp:** `2026-07-14T09-39-44-04-00`

## Plan ledger

**Goal:** require source, browser, built-output and Pages evidence for the new postcard-menu revision.

- [x] Inspect current source-pattern smoke coverage.
- [x] Inspect combined commit status.
- [x] Define the missing fixture matrix.
- [ ] Execute the matrix.

## Existing coverage

`tests/menu-game-shell-smoke.mjs` checks syntax and source patterns for:

```txt
WebGPURenderer and RenderPipeline
bloom and exposure constants
eight frond cards and four variants
five-segment geometry
alphaTest and opaque depth mode
compute storage size and dispatch
camera, palm, flowers, water and shoreline
preload and entry message wiring
```

It does not import the browser modules, initialize a GPU backend, render a frame, inspect generated atlas pixels, capture an image or observe retirement.

## Required fixture matrix

```txt
source
  -> syntax and structural assertions
  -> deterministic atlas hash fixture
  -> UV interior and gutter validation

browser WebGPU
  -> first frame
  -> compute wind
  -> alpha silhouette
  -> atlas contamination probe
  -> resize and reduced motion
  -> entry and retirement receipts

browser WebGL2 fallback
  -> same semantic scene
  -> non-compute wind fallback
  -> alpha silhouette and mip probe

built output
  -> import-map and cache-key parity
  -> same scene and frame manifest

GitHub Pages
  -> public route loads
  -> exact runtime revision observed
  -> screenshot and frame manifest match policy
  -> game entry remains playable
```

## Artifact requirements

```txt
repository SHA
provider URLs and revisions
browser and backend identity
viewport, DPR and reduced-motion state
frond and flower atlas hashes
scene manifest hash
menu frame ID
screenshot hash
retirement result
source/build/Pages parity result
```

## Current validation result

```txt
combined commit statuses: none
npm test independently run: no
browser WebGPU fixture: unavailable
browser WebGL2 fixture: unavailable
built-output fixture: not run
Pages fixture: not run
```

No deployed visual-parity or production-readiness claim is made.