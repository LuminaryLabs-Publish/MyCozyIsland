# Host Proof Audit: Cozy Island Frame Journal Contract

Timestamp: 2026-07-10T14-42-01-04-00

## Legacy surface

`globalThis.CozyIsland` intentionally exposes live renderer, scene, camera, consumer objects, source snapshot, scenario, performance budget, and an aggregate `getState()` method. Preserve it for browser inspection and compatibility.

## Additive proof surface

```txt
globalThis.CozyIslandHost = {
  getState(),
  getSourceProfile(),
  getSourceFingerprint(),
  getKitCatalogStatus(),
  getJournal({ sinceSequence, kinds, limit }),
  getFrame(frameId),
  getCorrelation(correlationId),
  getActiveVolumeBuild(),
  getLatestRenderSubmit(),
  restartProofState()
}
```

## Contract requirements

- Every returned value is JSON-safe.
- Sequence values strictly increase.
- One host frame has exactly one scenario-step and at most one render-submit record.
- Camera and render records reference their scenario/frame dependencies.
- Input result records may precede a frame and must be referenced by the first consuming frame.
- Setup records use source revision rather than a synthetic frame.
- Journal capacity and eviction are deterministic and observable.
- Reset clears journal state without mutating the active scenario or renderer unless explicitly requested.
- No live DOM, Three, GPU, texture, geometry, material, or renderer object enters the proof surface.

## Minimal host state

```txt
sourceProfile
sourceFingerprint
catalogFingerprint
nextSequence
nextFrameId
activeVolumeBuildSequence
performanceLevel
journalCapacity
journalSize
latestFrameId
latestRenderSubmitSequence
```

## Decision

Implement this as an adapter around the existing host. Do not migrate runtime ownership into the proof layer.