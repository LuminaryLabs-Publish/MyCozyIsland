# Render audit: public render-owner visible-frame reconciliation gap

**Timestamp:** `2026-07-13T04-21-10-04-00`

## Summary

`globalThis.CozyIsland` exposes the live Three.js renderer, scene and camera. A caller can mutate presentation state outside renderer-neutral snapshots, post-pipeline ordering, quality transitions and the normal frame loop, with no render revision or visible-frame receipt.

## Plan ledger

**Goal:** ensure public inspection cannot mutate render ownership and every permitted presentation command is revision-bound and visibly acknowledged.

- [x] Confirm raw renderer, scene and camera publication.
- [x] Confirm top-level freezing does not freeze those owners.
- [x] Trace the normal frame through snapshot projection and post rendering.
- [x] Identify missing render-generation and visible-frame evidence.
- [ ] Replace raw owners with detached read-only projections.
- [ ] Add permitted presentation-command receipts and frame acknowledgement.

## Current gap

```txt
normal render path
  -> committed adventure frame
  -> camera, lighting, world, gameplay, foam and HUD projection
  -> postPipeline.render()

public path
  -> read CozyIsland.renderer / scene / camera
  -> mutate live presentation owner directly
  -> no expected render revision
  -> no participant receipt
  -> no rollback result
  -> no first visible matching frame acknowledgement
```

## Reachable consequences

```txt
camera differs from committed camera descriptor
scene graph contains untracked additions/removals
renderer settings bypass quality policy
post-processing assumptions can be invalidated
public getState can disagree with the visible frame
later lifecycle disposal cannot prove ownership completeness
```

## Required render boundary

```txt
PublicRenderProjection
  -> detached backend, quality, pass-order and frame-revision data

PublicPresentationCommand
  -> explicit capability
  -> expected render generation
  -> bounded permitted operation
  -> participant receipt
  -> VisibleCapabilityEffectAck
```

## Validation boundary

Documentation only. No render source or behavior changed, and no browser, backend, production-build or Pages frame fixture was run.