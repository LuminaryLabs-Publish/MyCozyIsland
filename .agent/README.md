# MyCozyIsland agent notes

**Latest tracker:** `.agent/trackers/2026-07-07T23-31-44-04-00/project-breakdown.md`

**Last updated:** `2026-07-07T23:31:44-04:00`

## Current status

`MyCozyIsland` is a public standalone static Three.js cozy island scene. It serves `index.html`, mounts a full-canvas `canvas#game`, shows a compact Cozy Cloud Loading bar, keeps an error panel, and now loads `./src/main-cloudform.js?v=hero-cloud-2` as the active module entry.

The live runtime includes island landform, ocean floor, shoreline foam, water, foliage, path network, grass, fenced clearing, invisible player anchor, campfire, smoke, a single large hero cloud point-cloud layer, a scroll-driven sky-to-eye camera rail, pointer look, and keyboard first-person movement inside the clearing once `progress >= 0.985`.

The active blocker is route and host authority. `src/main-cloudform.js` owns DOM input mutation, source-state construction, renderer construction, hero cloud cache generation, rail sampling, movement policy, movement rejection behavior, cloud drift, animation, and limited `globalThis.CozyIsland` projection inline.

## Latest breakdown focus

```txt
MyCozyIsland Cloudform Entry Authority + Hero Cloud Snapshot Replay Gate
```

This pass corrects the active entry from the older `src/main.js` reference path to the live `src/main-cloudform.js?v=hero-cloud-2` route. The next safe cutover should keep visuals and `globalThis.CozyIsland` compatibility unchanged while adding additive `globalThis.CozyIslandHost`, stable route/source profiles, source fingerprints, source snapshots, hero cloud descriptor snapshots, hero cloud cache snapshots, HostState, ActionFrame records, ActionResult records, action/result journals, rail snapshots, cloud drift summaries, host smoke state, diagnostics, and DOM-free replay fixtures.

## Immediate next build order

```txt
preserve index.html, current hero cloud scene, current render loop, and globalThis.CozyIsland compatibility
-> make active route authority explicit for ./src/main-cloudform.js?v=hero-cloud-2
-> add additive globalThis.CozyIslandHost without removing globalThis.CozyIsland
-> add source profile, source fingerprint, and source snapshot helpers for the live cloudform route
-> add HeroCloudDescriptorSnapshot for id, layer, silhouette, pointCloud, placement, lighting, drift, driftSpeed, and rendererBoundary
-> add HeroCloudCacheSnapshot for cache key, point count, bounding sphere, attribute names, size/alpha/tint ranges, and fingerprint
-> add HostState with progress, player pose, pointer state, key state, latestResult, frame, rail phase, hero cloud drift summary, input journal, and result journal
-> normalize wheel, pointer, key, frame, and fixture commands into ActionFrame records
-> add ActionResult records for accepted, rejected, and unchanged outcomes
-> split valid(next) into ClearingBoundaryResult and CampfireKeepoutResult records
-> add explicit rejection reasons: not_first_person_yet, outside_clearing, campfire_keepout, no_move_vector, invalid_payload, unsupported_action, duplicate_frame
-> move rail() logic behind railState.sampleRailPose and emit serializable rail phase snapshots
-> wrap hero cloud drift in cloudDriftReducer.applyFrameDrift and journal drift summaries
-> expose host methods for state, diagnostics, source snapshot, source fingerprint, hero cloud snapshot, hero cloud cache snapshot, action journal, rail snapshot, host smoke state, runSmoke, applyActionFrame, and applyFixtureScript
-> add DOM-free fixtures for active route detection, source fingerprint stability, hero cloud descriptor shape, hero cloud cache stability, scroll acceptance, scroll clamp, pointer gating, rail phase sampling, first-person gate rejection, clearing rejection, campfire keepout rejection, movement acceptance, cloud drift replay, and action journal parity
-> defer renderer extraction, pointer lock, touch controls, save/load, ocean shader upgrades, grass fidelity rebuilds, and performance budget work until host contract and replay parity are stable
```

## Kit registry

See `.agent/kit-registry.json` for current explicit kits, runtime-implied kits, next-cut kits, domain families, source facts, fixture matrix, and target service surfaces.

## Validation note

This documentation pass did not change runtime source and did not run a local build or smoke test.
