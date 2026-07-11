# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T01-50-30-04-00`

## Critical

1. No route-owned runtime session controls startup rollback, animation-loop, listeners, timeouts, resource disposal, restart, or stale-session admission.
2. Pre-first-person pointer drag mutates authored camera-rail positions in place, and reset does not restore them.
3. The live environment clock advances while most clock-derived environment descriptors remain frozen at startup.
4. Scenario snapshots replace clock and camera only; they do not publish a current environment frame.
5. Sky, light, cloud, fog, vegetation, and campfire consumers have no common frame identity or application result.
6. Adaptive-quality level 0 can report recovery while renderer pixel ratio remains degraded.

## Temporal environment gaps

- illumination is sampled once even though its service reads the live clock
- wind is sampled independently by vegetation, campfire, clouds, and fog during startup
- cloud lighting is sampled once from illumination
- sky texture, sun, hemisphere light, exposure, and scene fog are startup-only
- cloud/fog shader time is presentation time, not semantic environment provenance
- vegetation sway is generic elapsed-time sine motion rather than current wind-field application
- campfire smoke retains startup wind direction and strength
- environment update cadence is undefined
- reset has no environment-frame result or consumer restoration proof

## Proof gaps

- no route lifecycle/resource fixture
- no camera baseline/reset fixture
- no environment frame ID, revision, fingerprint, or bounded journal
- no consumer applied/skipped/rejected rows
- no stale frame or stale session rejection
- no clock/wind/illumination coherence fixture
- no browser consumer-coherence smoke
- no applied-quality transition journal

## Secondary risks

- wheel deltas are consumed without `deltaMode` normalization
- rail yaw is unbounded
- host readback exposes live renderer and service objects
- `globalThis.CozyIsland.getState()` omits lifecycle, camera baseline, environment frame, consumer revisions, resource counts, and bounded results
- tests do not execute `main-cloudform.js` in a browser-like environment
- a future dynamic weather feature could accidentally update each consumer at different times

## Not currently blocked by

- kit catalog count or descriptor validation
- deterministic terrain, vegetation, rock, and shoreline composition
- missing visual content
- missing volumetric renderer features
- deployment configuration
