# Render Audit: Ready Cell Render Consumption Gap

Timestamp: `2026-07-11T09-08-59-04-00`

## Summary

Lazy materialization now runs in production, but visible rendering remains bound to the startup compatibility snapshot. A cell can become semantically ready without preparing, committing, or acknowledging any new Three/WebGPU resource.

## Current render path

```txt
startup
  -> createLegacyRenderSnapshot()
  -> createStylizedWorldRenderer(snapshot)
  -> attach one whole-island group

frame
  -> worldRenderer.update(elapsedSeconds)
  -> postPipeline.render()
  -> processMaterializationFrame()
```

Materialization occurs after the visible frame and produces no render transaction.

## Disconnected surfaces

```txt
worldRuntime.getPresentationDescriptors()
createRendererCellCache()
disposeRendererObject()
cell-aware renderer controller
provider runtime fields
```

None is consumed by `src/main-cloudform.js`.

## Consequences

- Terrain, biome, and shoreline arrays can complete without changing the visible world.
- Presentation descriptor versions can advance without a renderer revision.
- Debug counters can report complete cells while scene resources remain unchanged.
- No failed cell prepare can roll back because no prepare transaction exists.
- No released cell resource can be proven disposed because cell resources are not live.
- The compatibility snapshot has no provenance link to later provider revisions.

## Required renderer plan

```txt
RendererCellPlan {
  worldId
  worldRevision
  cellId
  cellGeneration
  cellReadinessRevision
  presentationDescriptorVersion
  providerReadinessFingerprint
  operation
  resourceRecipe
  bounds
  expectedPreviousRendererRevision
}
```

Operations:

```txt
prepare
update
release
no-op
```

## Required commit result

```txt
RendererCellCommitResult {
  cellId
  cellReadinessRevision
  rendererRevision
  status
  preparedResourceCounts
  releasedResourceCounts
  rollbackApplied
  visibleFrameSequence
  diagnostics
  fingerprint
}
```

## Acceptance gate

```txt
same readiness revision prepares once
failed preparation leaves prior visuals intact
successful update commits atomically
released cell disposes once
visible-frame readback cites renderer revision
compatibility island remains until cell commit is proven
```
