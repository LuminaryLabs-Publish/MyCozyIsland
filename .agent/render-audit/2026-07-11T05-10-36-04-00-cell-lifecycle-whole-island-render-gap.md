# Render Audit: Cell Lifecycle vs Whole-Island Render Graph

Timestamp: `2026-07-11T05-10-36-04-00`

## Current render path

```txt
Core World prepare at island center
  -> active provider rows
  -> createLegacyRenderSnapshot()
  -> one immutable legacy render snapshot
  -> createStylizedWorldRenderer(snapshot)
  -> scene.add(worldRenderer.group)
  -> per-frame worldRenderer.update(elapsedSeconds)
```

The renderer receives no later cell prepare, update, or release command.

## Observed mismatch

`updateWorldFocus()` can update:

```txt
worldSnapshot
activeCellIds
terrain runtime store
biome runtime store
shoreline runtime store
vegetation runtime store
rock runtime store
prop runtime store
presentation runtime store
```

The current renderer continues using the objects built from the startup snapshot. Its per-frame update receives only elapsed time.

## Existing but disconnected render infrastructure

```txt
renderer-cell-cache.js
renderer-disposal.js
renderer-world-cells.js
```

The isolated cache fixture proves deterministic prepare/update/release ordering for fake handles. It does not prove:

- connection to `src/main-cloudform.js`
- Three/WebGPU resource ownership by cell
- shared-resource retention
- world/render revision parity
- visual parity with the compatibility renderer
- focus movement in a browser
- exact disposal on release or route teardown

## Compatibility bridge behavior

The bridge uses active provider records only when their flattened counts equal the complete global population graph. Otherwise, it silently falls back to the original global vegetation, rock, or prop graph.

That preserves current visuals but obscures whether the renderer consumed cell authority or compatibility fallback.

## Required render readback

```txt
renderMode
worldId
admittedWorldRevision
renderRevision
activeCellIds
preparedCellIds
updatedCellIds
releasedCellIds
fallbackKinds
resourceCountsByKind
resourceCountsByCell
sharedResourceCount
sourceFingerprint
renderFingerprint
lastCommitResult
```

## Required release proof

```txt
release cell-only meshes and buffers exactly once
retain shared geometry/material/texture identities while referenced
release shared identities after final reference
remove released groups from scene
prevent stale world revisions from rebuilding retired cells
dispose the complete graph during route-session teardown
```

## Recommendation

Do not replace the compatibility renderer in one step. Introduce a cell-aware owner behind an explicit policy:

```txt
legacy
shadow-cell-consumer
cell-authoritative
```

Use shadow mode to compare descriptors, fingerprints, counts, bounds, and resource deltas before changing visible output.