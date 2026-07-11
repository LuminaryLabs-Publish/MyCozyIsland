# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T04-09-54-04-00`

## Critical

1. No route-owned runtime session controls startup transaction, failure rollback, running, stop, disposal, restart, or stale-session admission.
2. `main()` returns no owner handle and keeps renderer, scene, consumers, listeners, timeouts, animation-loop state, and global publication as local side effects.
3. Anonymous canvas/window callbacks cannot be removed by function identity.
4. Loader completion uses two untracked timeouts that can mutate UI after stop, failure, or restart.
5. The animation loop is never cleared with `renderer.setAnimationLoop(null)`.
6. World, grass, ocean, foam, atmosphere-volume, cloud, fog, post, sky, light, and renderer resources have no common disposal contract.
7. Partial startup failure updates the error UI but does not roll back resources already acquired.
8. `globalThis.CozyIsland` exposes live renderer/service objects and has no epoch, stop, dispose, restart, tombstone, or resource journal.
9. Pre-first-person pointer drag mutates authored camera-rail positions in place, and reset does not restore them.
10. Terrain, environment, and adaptive-quality authority remain incomplete behind the lifecycle gate.

## Runtime lifecycle gaps

- no lifecycle state machine
- no monotonic session epoch
- no startup attempt identity
- no resource acquisition registry
- no reverse-order rollback stack
- no listener lease service
- no timeout lease service
- no animation-loop lease
- no input/frame admission by epoch
- no stop result
- no idempotent dispose result
- no deterministic restart result
- no stale callback rejection
- no global-host retirement policy
- no bounded lifecycle journal
- no resource counts by kind

## Render resource gaps

- sky `CanvasTexture`, material and geometry have no named owner
- layered-grass inner renderer handle is discarded
- layered-grass atlas texture is created inline and has no explicit release handle
- base world geometry and materials expose no `dispose()`
- ocean geometry/material expose no `dispose()`
- foam mesh geometries/materials expose no `dispose()`
- cloud shared geometry and materials expose no deduplicated disposal
- fog geometry/material expose no `dispose()`
- cloud/fog 3D or storage textures and compute nodes expose no release result
- post pipeline, passes, blur nodes and uniforms expose no release result
- lights and shadow resources are not inventoried for teardown
- renderer/backend disposal is absent
- no proof that shared resource identities are disposed exactly once

## Existing world and scenario gaps

- camera authored baseline and runtime orbit state are not separated
- clearing plateau descriptor, algorithm revision and fingerprint are hidden
- terrain consumers do not carry a shared terrain revision
- environment clock advances while many downstream semantic descriptors remain startup-frozen
- adaptive-quality level 0 can report recovery while renderer pixel ratio remains degraded

## Proof gaps

- no DOM-free runtime lifecycle fixture
- no partial-startup rollback fixture
- no listener/timer/loop leak fixture
- no repeated restart browser smoke
- no WebGPU/WebGL2 disposal comparison
- no camera baseline/reset fixture
- no terrain edge/seating/layer-coherence fixture
- no environment-frame coherence fixture
- no adaptive-quality full-recovery fixture
- tests do not execute `main-cloudform.js` in a browser-like environment

## Secondary risks

- wheel deltas are consumed without `deltaMode` normalization
- rail yaw is unbounded
- performance callbacks have no session-epoch admission
- loader and debug UI can be mutated by stale callbacks after a future restart
- global host live references can keep retired resources reachable
- adding more GPU resources before lifecycle ownership increases leak and restart complexity

## Not currently blocked by

- kit catalog count or descriptor validation
- deterministic source generation
- deterministic inner-clearing flatness
- missing visual content
- missing volumetric renderer features
- deployment configuration
