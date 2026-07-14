# Next steps: MyCozyIsland dual-surface GPU handoff and retirement

**Timestamp:** `2026-07-13T23-58-48-04-00`  
**Publication status:** `dual-surface-gpu-handoff-retirement-authority-audited`

## Summary

Implement one narrow presentation authority above the existing cross-window protocol and renderer adapters. It should prove the resumed game frame, bound menu/game overlap and retire every menu-owned compute, render, listener, timer and public-capability participant.

## Plan ledger

**Goal:** move from timer-driven overlap and partial cleanup to typed, idempotent presentation leases and terminal results.

- [ ] Add `PresentationSurfaceGeneration` for menu and game.
- [ ] Add `BackendGeneration` and `DeviceContextGeneration`.
- [ ] Register menu and game presentation leases.
- [ ] Register menu compute, pipeline, scene, listener, timer and capability manifests.
- [ ] Convert hidden game sleep/resume into typed lease results.
- [ ] Bind resume to the current Core Startup ready revision and entry attempt.
- [ ] Return preparation failure instead of warning and continuing.
- [ ] Publish `FirstResumedGameFrameAck` from the game renderer.
- [ ] Add an explicit overlap budget and crossfade generation.
- [ ] Stop menu compute and frame submission before retirement.
- [ ] Traverse and retire application-owned menu scene resources.
- [ ] Remove resize, message, keyboard and click listeners.
- [ ] Cancel or fence entry and fade timers.
- [ ] Revoke or replace `globalThis.CozyMenu` after retirement.
- [ ] Publish `MenuPresentationRetirementResult`.
- [ ] Publish one terminal `PresentationHandoffResult`.
- [ ] Add WebGPU and WebGL2 browser fixtures.
- [ ] Add source, built-output and Pages parity checks.

## Minimal implementation order

```txt
1. presentation surface and backend generations
2. menu/game presentation leases
3. resource manifests
4. attempt-bound game resume preparation
5. first resumed game frame acknowledgement
6. bounded overlap policy
7. menu compute and frame stop results
8. scene, pipeline, compute and renderer retirement
9. listener and timer retirement
10. public capability revocation
11. reveal/history/focus terminal commit
12. browser/build/Pages fixture matrix
```

## Target files

```txt
src/menu.js
src/game-preload-bridge.js
src/main-adventure.js
src/presentation-handoff.js
tests/menu-game-shell-smoke.mjs
tests/dual-surface-gpu-handoff-browser.fixture.mjs
package.json
.github/workflows/pages.yml
```

## Required acceptance cases

```txt
WebGPU menu plus WebGPU game
WebGL2 fallback menu plus WebGL2 game
mixed backend generations when supported
normal sleeping-ready entry
repeated Play
resume preparation failure
first-frame timeout
bounded overlap success
explicit degraded reveal
compute stop failure
pipeline disposal failure
scene participant disposal failure
resize after retirement
late animation callback
pagehide during fade
reduced-motion zero-delay path
CozyMenu read after retirement
source/build/Pages semantic parity
```

## Ownership constraints

Core Startup owns factual readiness. The protocol authority owns parent/child message admission. The preload bridge owns local simulation and animation-loop manipulation. Renderers own local frame and resource receipts. The new authority owns cross-surface lease composition, overlap and terminal settlement. The parent shell commits reveal, history and focus only after consuming that result.

## Retained work

The prior cross-window protocol, page lifecycle, adaptive quality, portable-save durability, input authority and bounded public runtime capability audits remain open and must compose with this work.

## Do not claim

Do not claim bounded overlap, complete retirement, frame-correlated entry, device/context convergence or deployed parity until the executable matrix passes on `main`.