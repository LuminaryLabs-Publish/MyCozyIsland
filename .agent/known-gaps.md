# Known gaps: page lifecycle runtime suspension and retirement

## Current focus

- [ ] `pagehide` does not inspect `event.persisted`.
- [ ] BFCache suspension and terminal retirement share one incomplete handler.
- [ ] The gameplay animation loop is not stopped on page retirement.
- [ ] Held input and active pointer drag are not retired by page lifecycle.
- [ ] Anonymous gameplay listeners have no stored leases or removal path.
- [ ] `startupHost.dispose()` is not called from gameplay retirement.
- [ ] `gameplayRenderer.dispose()` is the only explicit gameplay-host resource retirement.
- [ ] World, cloud, fog, ocean, foam, post-processing and sky ownership have no composed disposal result.
- [ ] Atmosphere volume textures and compute resources have no terminal retirement receipt.
- [ ] The WebGPU/WebGL2 renderer and canvas context are not explicitly disposed.
- [ ] `globalThis.CozyIsland` has no publication-retirement policy.
- [ ] BFCache `pageshow` has no admission or retained-resource validation.
- [ ] The frame clock is not rebased after suspension.
- [ ] Stale callbacks have no runtime-generation rejection.
- [ ] Terminal save and resource retirement have no shared apply-once transition identity.
- [ ] No `RuntimeSuspensionResult`, `RuntimeRetirementResult` or `RuntimeResumeResult` exists.
- [ ] No `FirstResumedFrameAck` exists.
- [ ] Browser BFCache, repeat-navigation and resource-count fixtures do not exist.
- [ ] Artifact and Pages lifecycle parity are unproved.

## Implemented lifecycle/resource state

- [x] Menu renderer can stop its animation loop.
- [x] Menu renderer removes its resize listener.
- [x] Menu renderer disposes scene geometry, materials, atlases and renderer.
- [x] Gameplay renderer can dispose its own group and maps.
- [x] Startup host exposes global-error listener disposal.
- [x] Input clears on window blur and hidden visibility during normal operation.
- [x] Preload bridge can freeze and resume engine ticking and renderer presentation.
- [x] Pagehide attempts a save before disposing the gameplay child renderer.

## Retained unresolved work

The save-durability audit from `2026-07-17T03-06-12-04-00`, menu ready-handoff audit from `2026-07-17T01-39-36-04-00`, adaptive-quality audit from `2026-07-16T21-38-30-04-00`, and pointer-look gesture audit from `2026-07-16T18-41-23-04-00` remain unresolved.

## Non-findings

- No BFCache restore failure was reproduced.
- No runtime resource leak was measured.
- No lifecycle implementation was added.
- No browser or deployment fixture was run.
- No production-readiness claim is made.
