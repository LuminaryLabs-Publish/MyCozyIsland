# Render Audit: Animation Loop / World Generation Correlation Gap

Timestamp: `2026-07-11T11-19-10-04-00`

## Summary

The renderer callback has no session, world-generation, reset-phase, or renderer-generation admission. It can continue rendering the startup compatibility graph while the semantic Core World is reset, cleared, re-created, or disposed.

## Plan ledger

**Goal:** define the render-side freeze, generation fence, resource retirement, and first-visible-frame acknowledgement required around world recovery and terminal disposal.

- [x] Trace renderer creation and animation-loop installation.
- [x] Trace frame consumers before and after `postPipeline.render()`.
- [x] Trace the world reset and pagehide paths.
- [x] Identify resource owners not covered by world disposal.
- [x] Define render-generation acceptance requirements.

## Current frame

```txt
renderer.setAnimationLoop
  -> scenario.tick
  -> camera projection
  -> updateWorldFocus
  -> worldRenderer.update
  -> foamRenderer.update
  -> performanceBudget.sample
  -> postPipeline.render
  -> processMaterializationFrame
  -> debug projection
```

No step verifies:

```txt
session phase is running
callback generation is current
world generation matches renderer generation
reset is not in progress
post pipeline is not disposed
scene resources are not retired
```

## Resource graph outside world disposal

```txt
THREE.WebGPURenderer
scene and camera
sky geometry/material/CanvasTexture
hemisphere and directional lights
worldRenderer group and resources
ocean renderer mesh/resources
foam renderer group/resources
cloud renderer group/resources
fog renderer group/resources
cloud/fog volume textures
post-processing pipeline and targets
performance budget callbacks
debug overlay
canvas ownership
```

`pagehide` calls only `domains.dispose()`. The route does not clear the animation loop or dispose this render graph.

## Required render contract

```txt
RenderFrameAdmission {
  sessionId
  sessionGeneration
  worldGeneration
  rendererGeneration
  phase
  frameSequence
}
```

```txt
RenderCommitResult {
  status
  frameSequence
  sessionGeneration
  worldGeneration
  rendererGeneration
  consumedWorldRevision
  visibleAcknowledged
  resourceFailures[]
}
```

## Reset handshake

```txt
enter quiescing
  -> reject successor animation callbacks
  -> retain last committed visible frame
  -> stop focus/materialization publication
  -> recover world generation
  -> prepare renderer-compatible snapshot
  -> commit first new-generation frame
  -> acknowledge visibility
  -> retire predecessor generation resources
  -> resume running
```

## Terminal disposal handshake

```txt
clear animation loop
  -> retire post targets and pipelines
  -> dispose cloud/fog volume textures
  -> dispose scene geometries/materials/textures
  -> dispose renderer and canvas ownership
  -> return resource counts and failures
```

## Acceptance boundary

No frame may consume semantic world state from one generation while reporting renderer state from another. Reset must preserve the last committed frame until a new-generation frame is acknowledged, and terminal disposal must leave no active animation callback or GPU resource owner.