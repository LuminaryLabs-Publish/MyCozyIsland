# Validation: gameplay adaptive-quality recovery audit

**Timestamp:** `2026-07-18T06-40-59-04-00`

## Completed

- [x] Full `LuminaryLabs-Publish` inventory compared.
- [x] `LuminaryLabs-Publish/TheCavalryOfRome` excluded.
- [x] Ten eligible central ledgers and root `.agent` states retained.
- [x] No new, missing, undocumented or runtime-ahead repository observed.
- [x] MyCozyIsland selected by the oldest synchronized documented-selection rule.
- [x] Interaction loop, domains, kits, adapters and offered services documented.
- [x] 85 implemented surfaces preserved.
- [x] 20 proposed adaptive-quality recovery surfaces defined.
- [x] Required timestamped `.agent` documents added.
- [x] Required root `.agent` indexes refreshed.
- [ ] Runtime recovery parity implemented.
- [ ] Degrade/recover browser fixtures executed.

## Change boundary

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML or CSS changed: no
gameplay, simulation, input or save behavior changed: no
renderer behavior changed: no
tests or package scripts changed: no
workflow or deployment changed: no
branch created: no
pull request created: no
```

## Source evidence inspected

```txt
package.json
game.html
src/main-adventure.js
src/kits/index.js
src/kits/render-descriptors.js
src/kits/renderers.js
src/kits/renderer-post.js
current .agent root documents
current .agent kit registry
central MyCozyIsland ledger
current Publish repository inventory and recent heads
```

## Source-backed assertions

- Static quality tiers define a pixel-ratio cap, fog scale, step counts and target frame time.
- `createPerformanceBudget()` increments level after sustained over-budget evidence and decrements it after sustained under-budget evidence.
- Gameplay degradation changes cloud steps, fog steps, fog target resolution and renderer pixel ratio.
- Gameplay recovery changes cloud steps, fog steps and fog target resolution.
- Gameplay recovery does not call `renderer.setPixelRatio()`.
- The resize handler changes renderer dimensions and camera projection but does not explicitly reapply or read back the accepted quality effect plan.
- Existing package tests do not execute the real browser render loop.

## Executable evidence

```txt
npm test: not run
npm build: no build script declared
forced degrade fixture: unavailable
forced recover fixture: unavailable
renderer DPR readback fixture: unavailable
drawing-buffer parity fixture: unavailable
resize reconciliation fixture: unavailable
WebGPU/WebGL2 browser matrix: not run
built-output smoke: not run
Pages-origin smoke: not run
```

## Claims withheld

No adaptive-quality recovery correctness, renderer-resolution restoration, measured performance improvement, visual parity, backend parity, artifact parity, Pages parity or production readiness is claimed.