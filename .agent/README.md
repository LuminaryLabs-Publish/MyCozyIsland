# MyCozyIsland agent notes

**Latest tracker:** `.agent/trackers/2026-07-07T16-49-08-04-00/project-breakdown.md`

**Last updated:** `2026-07-07T16:49:08-04:00`

## Current status

`MyCozyIsland` is a public standalone static Cozy Island app. It vendors domain kits under `src/kits/`, loads through `index.html`, and renders from `src/main.js` with Three.js from jsDelivr.

The live runtime includes island landform, ocean floor, shoreline foam, water, foliage, path network, grass, fenced clearing, invisible player anchor, campfire, smoke, low/high point-cloud cloud layers, a scroll-driven sky-to-eye camera rail, pointer look, and keyboard first-person movement inside the clearing.

## Latest breakdown focus

```txt
MyCozyIsland Reducer Gate + Cloud Snapshot Fixture Cutover
```

The next safe cutover should keep the visuals unchanged while making source state, host state, scroll/pointer/movement reducers, ActionFrame/ActionResult records, rail snapshots, movement rejection reasons, and cloud cache descriptors serializable and fixture-testable.

## Immediate next build order

```txt
preserve current index.html, src/main.js render output, and globalThis.CozyIsland compatibility
-> add globalThis.CozyIslandHost as an additive diagnostics host
-> create cozy-source-state-profile-kit to group all vendored kit source outputs
-> serialize SourceSnapshot with ids, seeds, counts, bounds, anchor, clearing, and object summaries
-> create HostState with scrollProgress, player pose, pointer state, input journal, rail phase, cloud summaries, and latest result
-> normalize wheel, pointer, keyboard, and fixture commands into ActionFrame records
-> add ActionResult records with status, reason, before, after, payload, frame, elapsed, and source
-> add stable rejection reasons: not_first_person_yet, outside_clearing, campfire_keepout, no_move_vector, invalid_payload, unsupported_action, duplicate_frame
-> move scroll wheel changes behind scrollReducer.applyWheelDelta
-> move pointer delta updates behind pointerReducer.applyPointerDelta
-> move WASD movement behind movementReducer.applyMoveVector
-> make valid(next) return a ClearingBoundaryResult instead of boolean only
-> make campfire keepout return a named CampfireKeepoutResult
-> move railPose() into railState.sampleRailPose and emit named rail phases
-> describe cloud geometry cache with key, source id, index, point count, bounds, band, speed, and drift
-> expose getState, getDiagnostics, getActionJournal, getRailSnapshot, getCloudCacheSnapshot, getSourceSnapshot, runSmoke, applyActionFrame, and applyFixtureScript
-> add DOM-free smokes for source snapshot shape, scroll action acceptance, pointer gating, rail phase sampling, first-person movement rejection, first-person movement acceptance, cloud snapshot stability, and replay parity
-> defer pointer lock, touch controls, render extraction, ocean shader upgrades, save/load, and grass patch fidelity rebuild until reducer and fixture parity exist
```

## Kit registry

See `.agent/kit-registry.json` for current explicit kits, runtime-implied kits, next-cut kits, domain families, and target service surfaces.

## Validation note

This documentation pass did not change runtime source and did not run a local build or smoke test.
