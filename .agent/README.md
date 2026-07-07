# MyCozyIsland agent notes

**Latest tracker:** `.agent/trackers/2026-07-07T13-11-20-04-00/project-breakdown.md`

**Last updated:** `2026-07-07T13:11:20-04:00`

## Current status

`MyCozyIsland` is a standalone static Nexus-style Cozy Island app. It vendors its domain kits under `src/kits/`, loads through `index.html`, and renders the scene from `src/main.js` with Three.js from jsDelivr.

The live runtime already includes landform, ocean floor, foliage, path, grass, fenced clearing, invisible player anchor, campfire, smoke, water, shoreline foam, and low/high point-cloud cloud layers.

## Latest breakdown focus

```txt
MyCozyIsland Host Snapshot + Camera Rail / Cloud Cache Fixture Cutover
```

The next safe cutover should add a stable host snapshot and fixture-readable state before render extraction or visual expansion.

## Immediate next build order

```txt
preserve current index.html and visual behavior
-> expose globalThis.CozyIslandHost beside current globalThis.CozyIsland
-> add host snapshot slices for sceneSource, rail, player, clearing, cloudCache, kitStatus, and diagnostics
-> normalize wheel, pointer, keyboard, blur, resize, and fixture commands into ActionFrame records
-> move scrollProgress and rail pose data into camera rail state
-> serialize camera rail snapshots with progress, phase, position, look target, and firstPersonReady
-> return explicit first-person movement accepted/rejected results
-> serialize cached cloud point descriptors with id, band, pointCount, bounds, scale, drift, speed, baseY, and cacheKey
-> add DOM-free fixtures for landform, clearing, rail samples, movement rejection, and cloud descriptor stability
-> defer render extraction, high-fidelity grass upgrades, and pointer-lock movement
```

## Kit registry

See `.agent/kit-registry.json` for current explicit kits, runtime-implied kits, and next-cut kits.

## Validation note

This documentation pass did not change runtime source and did not run a local build or smoke test.
