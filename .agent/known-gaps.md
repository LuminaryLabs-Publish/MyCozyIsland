# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T02-02-59-04-00`

## Critical

1. No route-owned runtime session controls startup rollback, animation-loop, listeners, timeouts, resource disposal, restart, or stale-session admission.
2. Pre-first-person pointer drag mutates authored camera-rail positions in place, and reset does not restore them.
3. The new clearing plateau is deterministic but its height, source samples, blend policy, revision, and fingerprint are hidden inside the terrain closure.
4. The fence radius sits almost exactly on the outer clearing blend edge, but transition continuity and fence seating are not fixture-proven.
5. Biome, ground-contact, vegetation, rock, prop, campfire, path, and render outputs do not carry a common terrain revision.
6. The live environment clock advances while most clock-derived environment descriptors remain frozen at startup.
7. Adaptive-quality level 0 can report recovery while renderer pixel ratio remains degraded.

## Terrain-layer gaps

- no public natural-terrain sample contract
- no clearing source-ring descriptor
- no plateau aggregate result
- no algorithm version or terrain fingerprint
- no declared continuity limits for height, normal, slope, curvature, or biome weights
- no stale terrain-revision rejection for placement or render snapshots
- no proof that campfire, fence posts, fence rails, grass, paths, rocks, and player baseline use one terrain revision
- no render-consumption row for terrain grid generation
- current test samples only the inner clearing and not the transition edge
- current test does not validate biome normalization or object seating after the plateau change

## Temporal environment gaps

- illumination is sampled once even though its service reads the live clock
- wind is sampled independently by vegetation, campfire, clouds, and fog during startup
- cloud lighting is sampled once from illumination
- sky texture, sun, hemisphere light, exposure, and scene fog are startup-only
- shader time is presentation time, not semantic environment provenance
- vegetation sway is generic elapsed-time sine motion rather than current wind-field application
- reset has no environment-frame result or consumer restoration proof

## Proof gaps

- no route lifecycle/resource fixture
- no camera baseline/reset fixture
- no terrain edge/seating/layer-coherence fixture
- no terrain consumer applied/skipped/rejected rows
- no terrain revision in host/debug readback
- no environment frame ID, revision, fingerprint, or bounded journal
- no clock/wind/illumination coherence fixture
- no applied-quality transition journal

## Secondary risks

- wheel deltas are consumed without `deltaMode` normalization
- rail yaw is unbounded
- host readback exposes live renderer and service objects
- `globalThis.CozyIsland.getState()` omits lifecycle, camera baseline, terrain revision, environment frame, resource counts, and bounded results
- tests do not execute `main-cloudform.js` in a browser-like environment
- terrain-algorithm changes can silently invalidate static placement snapshots without an explicit dependency result

## Not currently blocked by

- kit catalog count or descriptor validation
- deterministic inner-clearing flatness
- missing visual content
- missing volumetric renderer features
- deployment configuration
