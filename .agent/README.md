# MyCozyIsland agent notes

**Latest tracker:** `.agent/trackers/2026-07-07T22-11-41-04-00/project-breakdown.md`

**Last updated:** `2026-07-07T22:11:41-04:00`

## Current status

`MyCozyIsland` is a public standalone static Three.js cozy island scene. It serves `index.html`, mounts a full-canvas `canvas#game`, shows a compact Cozy Cloud Loading bar, keeps an error panel, and loads `./src/main.js?v=standalone-1` as the active module entry.

The live runtime includes island landform, ocean floor, shoreline foam, water, foliage, path network, grass, fenced clearing, invisible player anchor, campfire, smoke, low/high point-cloud cloud layers, a scroll-driven sky-to-eye camera rail, pointer look, and keyboard first-person movement inside the clearing once `scrollProgress >= 0.985`.

The active blocker is host authority. `src/main.js` still owns DOM input mutation, source-state construction, renderer construction, cloud cache generation, rail sampling, movement policy, movement rejection behavior, animation, and `globalThis.CozyIsland` projection inline.

## Latest breakdown focus

```txt
MyCozyIsland Host Action Result Contract + Replay Diagnostics Gate
```

The next safe cutover should keep visuals and `globalThis.CozyIsland` compatibility unchanged while adding additive `globalThis.CozyIslandHost`, stable source profiles, source fingerprints, source snapshots, HostState, ActionFrame records, ActionResult records, action/result journals, rail snapshots, cloud cache snapshots, host smoke state, diagnostics, and DOM-free replay fixtures.

## Immediate next build order

```txt
preserve index.html, current visuals, current render loop, and globalThis.CozyIsland compatibility
-> add additive globalThis.CozyIslandHost without removing globalThis.CozyIsland
-> add source profile, source fingerprint, and source snapshot helpers
-> add HostState with scrollProgress, player pose, pointer state, key state, latestResult, frame, rail phase, cloud summaries, input journal, and result journal
-> normalize wheel, pointer, key, and fixture commands into ActionFrame records
-> add ActionResult records for accepted, rejected, and unchanged outcomes
-> split valid(next) into ClearingBoundaryResult and CampfireKeepoutResult records
-> add explicit rejection reasons: not_first_person_yet, outside_clearing, campfire_keepout, no_move_vector, invalid_payload, unsupported_action, duplicate_frame
-> move railPose logic behind railState.sampleRailPose and emit serializable rail phase snapshots
-> describe cloud cache entries with key, source id, index, point count, bounds, band, speed, drift, and fingerprint
-> expose host methods for state, diagnostics, source snapshot, source fingerprint, action journal, rail snapshot, cloud cache snapshot, host smoke state, runSmoke, applyActionFrame, and applyFixtureScript
-> add DOM-free fixtures for source fingerprint stability, source snapshot shape, scroll acceptance, scroll clamp, pointer gating, rail phase sampling, first-person gate rejection, clearing rejection, campfire keepout rejection, movement acceptance, cloud cache fingerprint stability, and replay parity
-> defer renderer extraction, pointer lock, touch controls, save/load, ocean shader upgrades, and grass fidelity rebuilds until host contract and replay parity are stable
```

## Kit registry

See `.agent/kit-registry.json` for current explicit kits, runtime-implied kits, next-cut kits, domain families, source facts, fixture matrix, and target service surfaces.

## Validation note

This documentation pass did not change runtime source and did not run a local build or smoke test.
