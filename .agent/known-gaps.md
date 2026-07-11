# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T00-10-28-04-00`

## Critical

1. No route-owned runtime session controls animation-loop, listeners, timeouts, resource disposal, rollback, or restart.
2. Pre-first-person pointer drag mutates authored camera-rail positions in place.
3. Camera reset does not restore those rail positions, so reset is not deterministic after drag.
4. Scenario reset has no atomic result or fingerprint and inherits the camera reset defect.
5. Adaptive-quality level 0 can report recovery while renderer pixel ratio remains degraded.

## Proof gaps

- no camera baseline fingerprint
- no camera sequence revision or reset counter
- no typed wheel/drag/key/reset result
- no input/result journal
- no drag/reset/repeat Node fixture
- no browser reset/restart smoke
- no lifecycle/resource disposal fixture
- no applied-quality transition journal

## Secondary risks

- wheel deltas are consumed as raw values without `deltaMode` normalization
- rail drag changes authored geometry rather than a bounded orbit-offset state
- yaw is unbounded during the rail phase
- `globalThis.CozyIsland` exposes live renderer objects and mutable service handles
- host readback does not include lifecycle, sequence baseline, applied quality, resource counts, or bounded result rows
- tests do not execute `main-cloudform.js` in a browser-like environment

## Not currently blocked by

- kit catalog count or ID validity
- deterministic terrain/vegetation composition
- lack of visual content
- missing renderer features
- deployment configuration