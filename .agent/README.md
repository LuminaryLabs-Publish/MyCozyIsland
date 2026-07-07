# MyCozyIsland agent notes

**Latest tracker:** `.agent/trackers/2026-07-07T15-40-06-04-00/project-breakdown.md`

**Last updated:** `2026-07-07T15:40:06-04:00`

## Current status

`MyCozyIsland` is a standalone static Nexus-style Cozy Island app. It vendors domain kits under `src/kits/`, loads through `index.html`, and renders from `src/main.js` with Three.js from jsDelivr.

The live runtime already includes landform, ocean floor, foliage, path network, grass, fenced clearing, invisible player anchor, campfire, smoke, water, shoreline foam, low/high point-cloud cloud layers, a scroll-driven sky-to-eye camera rail, and first-person movement inside the clearing.

## Latest breakdown focus

```txt
MyCozyIsland Host Diagnostics + Source Snapshot ActionJournal Fixture Cutover
```

The next safe cutover should make source state, host diagnostics, ActionFrame/ActionResult journals, rail snapshots, movement acceptance, and cloud cache descriptors serializable before render extraction, pointer-lock movement, mobile controls, high-fidelity grass, ocean shader expansion, or save/load work.

## Immediate next build order

```txt
preserve current index.html, src/main.js visual behavior, and globalThis.CozyIsland compatibility
-> expose globalThis.CozyIslandHost beside globalThis.CozyIsland
-> create cozy-source-state-profile-kit as the source-owned composition boundary
-> serialize source summaries for islandState, landform, oceanFloor, graph, clearing, grassPlacement, grassWind, campfireGraph, smokeDescriptor, cloudContract, and player anchor
-> add cozy-scene-source-snapshot-kit with validation and comparison helpers
-> add cozy-action-frame-contract-kit for DOM and fixture input
-> add cozy-action-result-contract-kit with accepted, rejected, unchanged, reason, before, after, frame, elapsed, source, and payload fields
-> add rejection reasons: not_first_person_yet, outside_clearing, campfire_keepout, no_move_vector, invalid_payload, unsupported_action, duplicate_frame
-> move scrollProgress, pointer look, and WASD movement behind result-returning reducers
-> return explicit movement results instead of silent no-ops
-> move railPose sampling into serializable rail state and snapshot kits
-> expose rail phases: sky_approach, island_approach, clearing_approach, shoulder, near_head, first_person
-> expose cloud cache descriptors instead of only saved BufferGeometry references
-> add host helpers for state, diagnostics, action journal, source snapshot, rail snapshot, cloud snapshot, runSmoke, and fixture scripts
-> add DOM-free smoke for source snapshot shape, scroll action, rail stability, movement rejection, movement acceptance, cloud descriptor stability, and action journal replay parity
-> defer render extraction, pointer lock, mobile touch controls, save/load, ocean shader expansion, and high-fidelity grass patch rebuild
```

## Kit registry

See `.agent/kit-registry.json` for current explicit kits, runtime-implied kits, next-cut kits, domain families, and target service surfaces.

## Validation note

This documentation pass did not change runtime source and did not run a local build or smoke test.
