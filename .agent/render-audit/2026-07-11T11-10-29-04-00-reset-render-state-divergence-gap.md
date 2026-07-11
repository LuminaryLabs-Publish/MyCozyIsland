# Render Audit: Reset / Render State Divergence Gap

Timestamp: `2026-07-11T11-10-29-04-00`

## Summary

The browser renderer is built once from the startup compatibility snapshot. A semantic world reset can clear Core World and provider state while the old Three/WebGPU graph remains visible and continues updating by elapsed time.

## Plan ledger

**Goal:** identify the render-side contract required so world reset cannot leave old-generation resources presented as current state.

- [x] Trace startup compatibility snapshot creation.
- [x] Trace renderer update inputs.
- [x] Trace world reset/dispose ownership.
- [x] Identify generation, freeze, retire, rollback, and frame-acknowledgement gaps.

## Current render loop

```txt
prepare Core World
  -> create one compatibility snapshot
  -> create whole-island renderer and atmosphere resources
  -> each frame update elapsed-time uniforms
  -> world reset has no renderer transaction
```

## Gap

```txt
semantic state after reset
  world definition: removed
  active cells: cleared
  provider stores: reset/released
  materializer: reset

visible state after reset
  whole-island group: still attached
  ocean/foam/cloud/fog/post resources: still live
  animation loop: still running
  frame identity: no worldGeneration
```

## Required render contract

```txt
world recovery begins
  -> freeze new renderer-cell commits
  -> retain prior visible frame as fallback
  -> mark frame source generation closing
  -> complete semantic recovery
  -> prepare fresh renderer plan or retain compatibility graph explicitly
  -> commit new render generation
  -> acknowledge first visible frame
  -> retire replaced resources exactly once
```

## Required readback

```txt
RenderWorldState {
  worldId
  worldGeneration
  rendererGeneration
  compatibilityRevision
  cellCommitRevision
  lifecycleStatus
  firstVisibleFrameSequence
  retiredResourceCount
  diagnostics[]
}
```

## Validation required

- Reset cannot silently show an old generation as current.
- Failed re-prepare leaves the previous visible graph explicitly marked fallback or blocked.
- Terminal dispose stops rendering and retires resources once.
- Reusable reset produces a first-frame receipt for the new world generation.
- Old-generation cell cache entries cannot reattach after reset.
