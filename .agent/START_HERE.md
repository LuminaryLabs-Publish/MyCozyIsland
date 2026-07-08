# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-08T17-00-36-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `MyCozyIsland`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against central `LuminaryLabs-Dev/LuminaryLabs` tracking.

No checked non-Cavalry Publish repo was found that was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`MyCozyIsland` was selected as the oldest eligible fallback in the current central readback. Its previous central ledger timestamp was `2026-07-08T14-58-49-04-00`, and the unresolved handoff is still the host-proof implementation source manifest plus browser consumer splice.

## Current product read

`MyCozyIsland` is a standalone static Three.js cozy island scene with local source-domain kits for island landform, ocean floor, foliage, grass, wind, fenced clearing, campfire, smoke, Mattatz-style clouds, and a hero-cloud form.

The current route is:

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
```

## Current interaction loop

```txt
open route
  -> canvas, cloud loader, and error panel mount from index.html
  -> src/main-cloudform.js imports Three.js CDN and local source-domain kits
  -> descriptor kits create island, ocean floor, foliage, grass, wind, clearing, campfire, smoke, and cloud contracts
  -> inline Three.js adapters build terrain, ocean, foam, path, foliage, fence, campfire, smoke, grass, and cloud objects
  -> wheel input advances the camera rail progress
  -> pointer drag mutates yaw/pitch depending on rail progress
  -> keyboard movement unlocks only near first-person mode
  -> valid(next) silently accepts/rejects movement by clearing radius and campfire keepout
  -> frame loop updates sea bob, first-person movement, rail camera, smoke, fire, cloud drift, and renderer
  -> globalThis.CozyIsland exposes compatibility state
  -> target globalThis.CozyIslandHost should expose additive proof records after fixtures pass
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T17-00-36-04-00-host-proof-source-manifest-dsk-breakdown.md
.agent/render-audit/2026-07-08T17-00-36-04-00-render-snapshot-source-readback.md
.agent/interaction-audit/2026-07-08T17-00-36-04-00-action-movement-result-rows.md
.agent/cloud-system-audit/2026-07-08T17-00-36-04-00-cloud-cache-drift-source-readback.md
.agent/grass-system-audit/2026-07-08T17-00-36-04-00-grass-instance-source-readback.md
.agent/host-proof-audit/2026-07-08T17-00-36-04-00-source-file-manifest-browser-splice.md
.agent/trackers/2026-07-08T17-00-36-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T17-00-36-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
README.md
package.json
index.html
src/main-cloudform.js
src/kits/ocean-island-landform-domain/index.js
src/kits/island-foliage-domain/index.js
src/kits/ocean-floor-domain/index.js
src/kits/grass-object-domain/index.js
src/kits/grass-wind-domain/index.js
src/kits/campfire-object-domain/index.js
src/kits/smoke-particle-domain/index.js
src/kits/fenced-clearing-domain/index.js
src/kits/mattatz-clouds-domain/index.js
src/kits/cozy-hero-cloud-form-kit/index.js
```

## Main rule

Keep the visible route and current visuals stable.

Do not turn this publish repo into a generic engine repo.

Do not remove or change the compatibility surface:

```txt
globalThis.CozyIsland
```

The next implementation should add pure host-proof modules first, prove them in DOM-free fixture rows, then wire them additively into `src/main-cloudform.js` through:

```txt
globalThis.CozyIslandHost
```

## Current next safe ledge

```txt
MyCozyIsland Host Proof Source Manifest + Browser Consumer Fixture Gate
```

Stop that ledge when exact source files, pure record shapes, fixture rows, and `src/main-cloudform.js` splice points are implemented enough to prove route, source, action, movement, rail, grass, cloud, render, and host diagnostics without changing the player-visible scene.