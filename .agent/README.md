# MyCozyIsland agent notes

**Latest tracker:** `.agent/trackers/2026-07-07T18-10-03-04-00/project-breakdown.md`

**Last updated:** `2026-07-07T18:10:03-04:00`

## Current status

`MyCozyIsland` is a public standalone static Cozy Island app. It vendors domain kits under `src/kits/`, loads through `index.html`, and renders from `src/main.js` with Three.js from jsDelivr.

The live runtime includes island landform, ocean floor, shoreline foam, water, foliage, path network, grass, fenced clearing, invisible player anchor, campfire, smoke, low/high point-cloud cloud layers, a scroll-driven sky-to-eye camera rail, pointer look, and keyboard first-person movement inside the clearing.

## Latest breakdown focus

```txt
MyCozyIsland Host Smoke State + Source Fingerprint Replay Gate
```

The next safe cutover should keep the visuals unchanged while making source profiles, source fingerprints, source snapshots, host state, scroll/pointer/movement reducers, ActionFrame/ActionResult records, rail snapshots, movement rejection reasons, cloud cache descriptors, host smoke state, and replay fixtures serializable and DOM-free.

## Immediate next build order

```txt
preserve current index.html, src/main.js render output, and globalThis.CozyIsland compatibility
-> add globalThis.CozyIslandHost as an additive host without removing globalThis.CozyIsland
-> group all vendored source outputs inside cozy-source-state-profile-kit
-> create SourceFingerprint from stable ids, seeds, counts, bounds, thresholds, and source kit versions
-> expose getSourceFingerprint and assert it from runSmoke
-> serialize SourceSnapshot with island, floor, graph, clearing, grass, campfire, smoke, cloud, and anchor summaries
-> create HostState with scrollProgress, player pose, pointer state, input journal, rail phase, cloud summaries, last frame, latest result, and smoke status
-> normalize wheel, pointer, keyboard, and fixture commands into ActionFrame records
-> return ActionResult records from scroll, pointer, and movement reducers
-> use stable rejection reasons: not_first_person_yet, outside_clearing, campfire_keepout, no_move_vector, invalid_payload, unsupported_action, duplicate_frame
-> make valid(next) return ClearingBoundaryResult and CampfireKeepoutResult records rather than boolean-only control flow
-> move railPose() into railState.sampleRailPose and emit named rail phases
-> describe cloud cache entries with key, source id, index, point count, bounds, band, speed, drift, and fingerprint
-> expose getState, getDiagnostics, getActionJournal, getRailSnapshot, getCloudCacheSnapshot, getSourceSnapshot, getSourceFingerprint, getHostSmokeState, runSmoke, applyActionFrame, and applyFixtureScript
-> add DOM-free smokes for source fingerprint stability, source snapshot shape, scroll action acceptance, pointer gating, rail phase sampling, movement rejection before threshold, clearing rejection, campfire keepout rejection, movement acceptance, cloud cache fingerprint stability, and action journal replay parity
-> defer pointer lock, touch controls, renderer extraction, ocean shader upgrades, save/load, and grass patch rebuild until host smoke state and replay parity are stable
```

## Kit registry

See `.agent/kit-registry.json` for current explicit kits, runtime-implied kits, next-cut kits, domain families, source facts, and target service surfaces.

## Validation note

This documentation pass did not change runtime source and did not run a local build or smoke test.
