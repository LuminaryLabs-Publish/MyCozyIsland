# Next steps: MyCozyIsland renderer device and context loss recovery

**Timestamp:** `2026-07-16T00-59-16-04-00`  
**Status:** `renderer-device-context-loss-recovery-authority-audited`

## Summary

Add one backend-neutral renderer lifetime authority and thin WebGPU/WebGL2 adapters. Rebuild presentation from stable descriptors and renderer-neutral snapshots rather than treating GPU handles as durable truth.

## Plan ledger

**Goal:** recover to one proven visible frame or fail through an actionable fallback while keeping simulation, input and route ownership coherent.

- [ ] Add renderer, backend, device/context and resource-generation identities.
- [ ] Register the menu and game renderers with one lifecycle authority.
- [ ] Observe WebGPU device-loss evidence through the active backend adapter.
- [ ] Observe WebGL `webglcontextlost` and `webglcontextrestored` on the active canvas.
- [ ] Normalize provider evidence into `RendererLossObservedResult`.
- [ ] Stop the stale animation loop and reject stale renderer-generation callbacks.
- [ ] Clear held input and publish the declared simulation policy.
- [ ] Add stable reconstruction descriptors for procedural textures, storage buffers, render targets, materials and passes.
- [ ] Recreate the Three.js renderer under a bounded recovery attempt.
- [ ] Rebuild the menu pipeline or full game post pipeline and physical pass order.
- [ ] Rehydrate atmosphere, ocean, foam, cloud, fog, world and gameplay resources.
- [ ] Revoke hidden-preload readiness while recovery is pending.
- [ ] Require a fresh hidden or active frame before republishing ready/entered state.
- [ ] Publish `RenderRecoveryResult` or `RenderFallbackResult`.
- [ ] Publish `FirstRecoveredFrameAck` with route, renderer, resource and frame revisions.
- [ ] Add a semantic recovery/failure shell with retry or reload.
- [ ] Add forced WebGPU and WebGL2 browser fixtures.
- [ ] Add hidden-preload loss, stale callback and recovery-exhaustion fixtures.
- [ ] Run source, assembled artifact and Pages parity.

## Minimal implementation order

```txt
1. renderer and resource generation identities
2. backend loss observers
3. loss admission and stale-callback rejection
4. simulation/input suspension policy
5. scene resource registry
6. renderer and post-pipeline reconstruction
7. GPU resource rehydration
8. hidden-preload coordination
9. fallback and recovery result
10. first recovered frame acknowledgement
11. forced-loss browser fixtures
12. artifact and Pages parity
```

## Target files

```txt
src/menu.js
src/main-adventure.js
src/game-preload-bridge.js
src/adventure/startup-host.js
src/kits/index.js
src/kits/render-descriptors.js
src/kits/webgpu-renderers.js
src/kits/webgl2-fallback-renderers.js
tests/renderer-loss-recovery.fixture.mjs
tests/preload-renderer-loss.fixture.mjs
package.json
.github/workflows/pages.yml
```

## Preserve

Do not move world, Agriculture, Foraging, player, interaction or save truth into renderer callbacks. Recovery consumes renderer-neutral snapshots and only owns presentation-generation admission and settlement.