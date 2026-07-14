# Render audit: menu failure and game-surface fallback gap

**Timestamp:** `2026-07-14T05-02-03-04-00`  
**Status:** `menu-failure-game-bootstrap-fallback-authority-audited`

## Summary

The parent page contains two presentation surfaces, but only the menu canvas is admitted at document load. The game iframe has no `src` until the menu’s WebGPU-first renderer, scene, compute wind and post pipeline are ready. A failure in the predecessor surface therefore prevents creation of the successor surface.

## Plan ledger

**Goal:** let the primary game presentation attempt startup independently while preserving the menu as an optional high-fidelity surface.

- [x] Trace both surface-creation paths.
- [x] Identify the exact preload assignment and scheduling point.
- [x] Identify menu import, initialization, scene and pipeline failure boundaries.
- [x] Confirm the game has its own backend and Core Startup result path.
- [x] Define degraded-menu visible-frame evidence.
- [ ] Add browser fault injection and source/build/Pages proof.

## Current render path

```txt
menu.html
  -> #menu-scene canvas exists
  -> #game-preload iframe exists without src

src/menu.js main
  -> new WebGPURenderer
  -> await renderer.init
  -> create scene, sky, palm, lights
  -> create RenderPipeline and bloom
  -> install resize and animation loop
  -> publish CozyMenu
  -> schedule startPreload
  -> iframe.src = game.html?preload=1
```

## Failure visibility

| Failure | Current visible behavior | Game route attempted? |
|---|---|---:|
| Three.js WebGPU module import | Module does not evaluate; no application handler | No |
| TSL/Bloom module import | Module does not evaluate; no application handler | No |
| `renderer.init()` rejection | Play becomes `Could Not Start` | No |
| Palm geometry/material failure | Play becomes `Could Not Start` | No |
| RenderPipeline/Bloom preparation failure | Play becomes `Could Not Start` | No |
| Menu first-frame submission failure after preload scheduling | Partially observable only through console/runtime | Possibly |

The module-import case is more severe than the normal catch path because `main().catch(reportFailure)` is never registered when static imports fail.

## Existing game presentation authority

The game route independently creates a `WebGPURenderer`, wraps initialization in a 15-second Core Startup timeout, records `webgpu` or `webgl2`, prepares the world and atmosphere, renders a first frame and only then enters playable startup state.

That evidence cannot be produced when the parent never navigates the iframe.

## Target render settlement

```txt
shell generation begins
  -> game iframe receives src immediately or from shell-owned bootstrap
  -> menu presentation attempt begins independently

menu ready + game playable
  -> authored menu remains visible until normal entry

menu failed + game working
  -> shell renders DOM-only degraded loading state
  -> progress continues from game messages

menu failed + game playable
  -> shell enables direct Play
  -> game resumes and renders first visible frame
  -> publish FirstFallbackGameFrameAck

menu failed + game failed
  -> shell renders terminal DOM failure and retry controls
```

## Required frame envelope

```txt
FirstFallbackGameFrameAck {
  shellGeneration
  gamePreloadAttemptId
  startupRevision
  frameId
  presentationId
  backend
  menuResult: degraded | failed
  visible: true
}
```

## Resource constraints

Independent preload must not reintroduce uncontrolled dual-surface GPU work. The previously documented presentation-lease and retirement authority remains required. Fault isolation changes startup admission; it does not remove overlap, sleep/resume or retirement obligations.

## Proof gap

The current smoke test checks source markers for WebGPU, TSL, compute wind, bloom, hidden preload and resume. It does not launch a browser, intercept module requests, force renderer initialization failure, throw during pipeline preparation or verify a visible game frame after menu failure.

## Do not claim

Do not claim graceful menu degradation, independent game startup, direct fallback entry, visible-frame recovery or deployed parity until executable browser and Pages fixtures pass.
