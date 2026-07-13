# Render audit: menu/game dual-GPU surface retirement gap

**Timestamp:** `2026-07-13T14-39-40-04-00`

## Summary

The menu now owns a Three.js WebGL renderer while the hidden game owns a WebGPU/WebGL2 renderer. Both can render concurrently. The menu does not publish provider, context, renderer, resource, frame or retirement generations.

## Plan ledger

**Goal:** require observable first-frame and terminal-retirement evidence for the menu surface before the game surface becomes the sole active presentation owner.

- [x] Trace menu renderer creation and RAF ownership.
- [x] Trace hidden game renderer ownership.
- [x] Trace entry-time menu retirement.
- [x] Identify missing resource and visible-frame receipts.
- [ ] Add executable browser GPU/resource fixtures.

## Current render path

```txt
menu.html
  -> static Three.js module provider
  -> WebGLRenderer(low-power)
  -> sky shader + palm meshes/materials
  -> recursive requestAnimationFrame

hidden game.html
  -> Three.js WebGPU module provider
  -> WebGPU/WebGL2 adventure renderer
  -> renderer.setAnimationLoop

Play accepted
  -> game iframe becomes visible
  -> menu continues during 820 ms fade
  -> sceneRunning = false
  -> renderer.dispose()
```

## Missing evidence

```txt
MenuProviderGeneration: absent
MenuRendererGeneration: absent
MenuContextGeneration: absent
MenuResourceGeneration: absent
MenuFrameSubmissionId: absent
FirstMenuFrameAck: absent
GameRendererGeneration correlation: absent
DualRendererBudgetResult: absent
MenuSchedulerRetirementReceipt: absent
MenuGeometryDisposalReceipt: absent
MenuMaterialDisposalReceipt: absent
MenuContextReleaseReceipt: absent
FirstGameOnlyFrameAck: absent
```

## Resource graph retained after `renderer.dispose()`

The module continues to hold references to:

```txt
scene
camera
sky geometry and shader material
palm group
trunk geometry and material
crown group
11 frond geometries
3 leaf materials
4 coconut geometries
coconut material
lights
canvas
fronds array and userData pose state
resize, message, keyboard and Play listeners
```

Three.js renderer disposal alone is not a repository-level proof that every owned scene resource, callback and context has retired.

## Required projection lifecycle

```txt
prepare menu resources
  -> admit provider and WebGL capability
  -> create detached renderer/resource generation
  -> submit first menu frame
  -> publish FirstMenuFrameAck
  -> run one scheduler generation

handoff begins
  -> preserve menu until matching game entry is accepted
  -> acknowledge first visible game frame
  -> stop menu scheduler
  -> dispose scene resources and renderer
  -> remove listeners and clear references
  -> publish MenuPresentationRetirementResult
  -> publish FirstGameOnlyFrameAck
```

## Recovery requirements

```txt
menu provider failure
  -> local fallback or failure projection remains available
  -> hidden game preload may still proceed under policy

menu WebGL creation failure
  -> no partial scene resource ownership
  -> Play state reflects typed result

retirement partial failure
  -> report retained resource classes
  -> do not claim game-only presentation ownership

stale callback after retirement
  -> reject without rendering or scheduling a successor
```

## Validation boundary

The current smoke is source-marker based. No browser GPU context count, memory/resource lifetime, context-loss, first-frame, repeated entry or page-lifecycle fixture was executed.