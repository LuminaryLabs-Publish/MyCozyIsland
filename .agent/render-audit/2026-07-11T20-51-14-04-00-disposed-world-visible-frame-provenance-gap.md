# Render Audit: Disposed World / Visible Frame Provenance Gap

Timestamp: `2026-07-11T20-51-14-04-00`

## Summary

The render graph is created from one compatibility snapshot and keeps rendering independently of the world wrapper lifecycle. Core disposal can retire world coordination while the scene, animation loop and global readback remain alive, with no frame receipt proving which world generation a visible frame represents.

## Plan ledger

**Goal:** define the render admission and acknowledgement boundary required when world lifecycle phase or generation changes.

- [x] Trace snapshot creation and persistent render resources.
- [x] Trace animation-loop world calls.
- [x] Trace pagehide disposal.
- [x] Identify missing lifecycle/frame correlation.
- [x] Define required render proof.

## Current gap

```txt
startup snapshot
  -> persistent scene/world/ocean/foam/cloud/fog/post graph
  -> animation loop renders every frame

pagehide
  -> domains.dispose()
  -> world coordination becomes reset/disposed
  -> renderer loop and scene resources are not retired here
  -> global host still references the old world wrapper and query
```

## Missing evidence

```txt
world lifecycle phase in render plan
world generation in frame identity
render admission after reset/dispose
stale-generation frame rejection
last valid frame policy
first frame after reusable reset
terminal frame/blanking result
consumer acknowledgement set
```

## Required proof

```txt
RenderFramePlan {
  sessionId
  worldMode
  worldGeneration
  lifecyclePhase
  snapshotRevision
  rendererGeneration
}

CommittedFrameReceipt
  -> reject DISPOSED world input
  -> acknowledge first READY frame after reset
  -> prevent stale world generations from reaching presentation
```

Compatibility rendering may remain as a fallback, but it must be explicitly bound to a world generation rather than surviving disposal implicitly.
