# MyCozyIsland agent notes

**Latest tracker:** `.agent/trackers/2026-07-07T14-21-20-04-00/project-breakdown.md`

**Last updated:** `2026-07-07T14:21:20-04:00`

## Current status

`MyCozyIsland` is a standalone static Nexus-style Cozy Island app. It vendors its domain kits under `src/kits/`, loads through `index.html`, and renders the scene from `src/main.js` with Three.js from jsDelivr.

The live runtime already includes landform, ocean floor, foliage, path, grass, fenced clearing, invisible player anchor, campfire, smoke, water, shoreline foam, low/high point-cloud cloud layers, a scroll-driven sky-to-eye camera rail, and first-person movement inside the clearing.

## Latest breakdown focus

```txt
MyCozyIsland Source State Authority + Rail Action Result Fixture Cutover
```

The next safe cutover should make the scene source, camera rail, movement acceptance, cloud cache, and host diagnostics serializable before render extraction, pointer-lock movement, mobile controls, high-fidelity grass, or save/load work.

## Immediate next build order

```txt
preserve current index.html, src/main.js visual behavior, and globalThis.CozyIsland compatibility
-> create cozy-source-state-profile-kit as the source-owned scene composition boundary
-> serialize islandState, landform summary, clearing summary, graph summary, grass summary, smoke summary, cloud summary, and campfire summary
-> expose globalThis.CozyIslandHost beside globalThis.CozyIsland
-> add getState(), getDiagnostics(), getActionJournal(), getCloudCacheSnapshot(), getRailSnapshot(), and runSmoke() host helpers
-> normalize wheel, pointerdown, pointerup, pointermove, keydown, keyup, blur, resize, frame, and fixture commands into ActionFrame records
-> add ActionResult records with accepted, reason, before, after, frame, elapsed, and source
-> move scrollProgress mutation behind cozy-scroll-action-reducer-kit
-> move drag / pointer look mutation behind cozy-pointer-look-result-kit
-> move WASD movement into cozy-first-person-movement-result-kit
-> return rejected movement results for outside clearing, inside campfire keepout, not-first-person-yet, and no-move-vector
-> move railPose into cozy-camera-rail-state-kit and cozy-camera-rail-snapshot-kit
-> create cozy-cloud-cache-descriptor-kit and cozy-cloud-cache-snapshot-kit
-> add DOM-free fixture smoke for source state, rail samples, scroll action, movement rejection, movement acceptance, cloud descriptor stability, and snapshot shape
-> defer render extraction, pointer lock, mobile touch controls, save adapter, and high-fidelity grass patch rebuild
```

## Kit registry

See `.agent/kit-registry.json` for current explicit kits, runtime-implied kits, next-cut kits, domain families, and target service surfaces.

## Validation note

This documentation pass did not change runtime source and did not run a local build or smoke test.
