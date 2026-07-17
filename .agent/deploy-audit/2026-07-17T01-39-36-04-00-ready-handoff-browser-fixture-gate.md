# Deploy audit — Ready handoff browser fixture gate

**Timestamp:** `2026-07-17T01-39-36-04-00`

## Required source checks

- Menu imports `menu-three-renderer-lite.js`.
- Recipe identity is `my-cozy-island.menu-scene.v5`.
- Sixteen explicit menu domain/kit paths are present.
- Preload, idle and interactive frame targets remain declared.
- Preload DPR remains capped at one.
- Dynamic shadows and bloom remain disabled in the optimized path.
- One frond batch and one three-layer particle batch remain present.

## Required real-browser fixtures

| Fixture | Required proof |
|---|---|
| WebGPU preload | 24 FPS target, DPR <= 1, Play disabled |
| WebGL2 preload | same policy and safe fallback |
| valid ready | one admitted ready result and one presentation generation |
| ready DPR transition | applied pixel ratio and viewport revision captured |
| first ready frame | `FirstReadyMenuFrameAck` before Play enablement |
| immediate activation | pointer/touch/keyboard cannot bypass pending frame |
| duplicate ready | retained terminal result, no second transition |
| stale iframe ready | rejected without Play mutation |
| resize during pending | old viewport generation rejected |
| DPR change during pending | old DPR generation rejected |
| hidden during pending | no false ready-frame acknowledgement |
| reduced motion | zero-duration crossfade without bypassing identity |
| entry fallback timer | no duplicate entry result |
| renderer failure | Play remains disabled with safe failure state |
| menu retirement | later frames/messages rejected |

## Artifact gate

The deployed artifact must contain the same menu HTML, import map, cache key, recipe, optimized renderer, preload bridge and tests reviewed in source.

## Pages gate

From the actual Pages origin:

1. load the root route;
2. verify menu and hidden game iframe are same-origin;
3. collect ready-message and render-generation evidence;
4. verify Play unlocks after the first matching ready frame;
5. enter the game;
6. verify one game resume and one menu disposal;
7. capture console errors, backend, DPR, viewport and frame-mode evidence.

## Current status

```txt
source inspection: completed
npm test: not run
real-browser fixtures: unavailable
built artifact smoke: not run
Pages-origin smoke: not run
production gate: blocked
```

No deployment-readiness claim is made.