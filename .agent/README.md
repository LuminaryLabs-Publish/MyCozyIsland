# MyCozyIsland agent notes

**Latest tracker:** `.agent/trackers/2026-07-07T20-50-10-04-00/project-breakdown.md`

**Last updated:** `2026-07-07T20:50:10-04:00`

## Current status

`MyCozyIsland` is a public standalone static Cozy Island app. It vendors domain kits under `src/kits/`, loads through `index.html`, and renders from `src/main.js` with Three.js `0.160.0` from jsDelivr.

The live runtime includes island landform, ocean floor, shoreline foam, water, foliage, path network, grass, fenced clearing, invisible player anchor, campfire, smoke, low/high point-cloud cloud layers, a scroll-driven sky-to-eye camera rail, pointer look, and keyboard first-person movement inside the clearing once `scrollProgress >= 0.985`.

The active blocker is runtime authority. Host state, reducer results, source fingerprints, rail snapshots, cloud-cache descriptors, movement rejection records, and replay fixtures are still implicit inside `src/main.js`.

## Latest breakdown focus

```txt
MyCozyIsland CozyIslandHost Smoke Fixture + Rail Cloud Replay Lock
```

The next safe cutover should keep visuals and `globalThis.CozyIsland` compatibility unchanged while adding additive `globalThis.CozyIslandHost`, stable source profiles, source fingerprints, source snapshots, ActionFrame records, ActionResult records, rail snapshots, cloud cache snapshots, host smoke state, and DOM-free replay fixtures.

## Immediate next build order

```txt
preserve index.html, current visuals, and globalThis.CozyIsland compatibility
-> add additive globalThis.CozyIslandHost without removing globalThis.CozyIsland
-> add source profile, source fingerprint, and source snapshot helpers
-> add host state with scrollProgress, player pose, pointer state, key state, latest result, frame, rail phase, and cloud summaries
-> normalize wheel, pointer, key, and fixture commands into ActionFrame records
-> add ActionResult records for accepted, rejected, and unchanged outcomes
-> split valid(next) into ClearingBoundaryResult and CampfireKeepoutResult records
-> add explicit rejection reasons: not_first_person_yet, outside_clearing, campfire_keepout, no_move_vector, invalid_payload, unsupported_action, duplicate_frame
-> move railPose logic behind railState.sampleRailPose and emit rail phase snapshots
-> describe cloud cache entries with key, source id, index, point count, bounds, band, speed, drift, and fingerprint
-> expose host methods for state, diagnostics, source snapshot, source fingerprint, action journal, rail snapshot, cloud cache snapshot, host smoke state, runSmoke, applyActionFrame, and applyFixtureScript
-> add DOM-free fixtures for source fingerprint stability, source snapshot shape, scroll acceptance, pointer gating, rail phase sampling, first-person gate rejection, clearing rejection, campfire keepout rejection, movement acceptance, cloud cache fingerprint stability, and replay parity
-> defer renderer extraction, pointer lock, touch controls, save/load, ocean shader upgrades, and grass fidelity rebuilds until host contract and replay parity are stable
```

## Kit registry

See `.agent/kit-registry.json` for current explicit kits, runtime-implied kits, next-cut kits, domain families, source facts, fixture matrix, and target service surfaces.

## Validation note

This documentation pass did not change runtime source and did not run a local build or smoke test.
