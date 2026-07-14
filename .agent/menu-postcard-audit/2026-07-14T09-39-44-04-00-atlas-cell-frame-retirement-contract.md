# Menu postcard audit: atlas cell, frame and retirement contract

**Timestamp:** `2026-07-14T09-39-44-04-00`

## Plan ledger

**Goal:** make procedural atlases deterministic, cell-safe, frame-provable and completely disposable.

- [x] Record current frond and flower atlas contracts.
- [x] Define cell, frame and retirement requirements.
- [ ] Implement runtime receipts and fixtures.

## Current atlas contracts

```txt
frond atlas
  canvas: 1280 x 256
  cells: 4 x 320 x 256
  deterministic seed per variant
  transparent background
  generated mipmaps
  exact cell-boundary UVs

flower atlas
  canvas: 384 x 128
  cells: 3 x 128 x 128
  generated mipmaps
  exact cell-boundary UVs
```

## Required AtlasCellManifest

```txt
AtlasId
AtlasRevision
CanvasWidth and CanvasHeight
CellId
PixelBounds
InteriorPixelBounds
UVBounds
InteriorUVBounds
GutterPixels
AlphaBounds
ContentHash
ColorSpace
MinFilter and MagFilter
MipmapPolicy
```

## Cell-safety rules

- Each card must sample an interior UV rectangle, not the exact neighboring-cell boundary.
- Transparent edges must use explicit padding or edge extrusion appropriate to the selected alpha mode.
- Mipmap policy must preserve cell isolation at the furthest admitted menu distance.
- Alpha occupancy and silhouette bounds must be checked before frame admission.
- Frond and flower atlas hashes must be bound to the visual revision.

## Frame contract

```txt
MenuFrameId
VisualRevision
BackendId
Viewport
DPR
ReducedMotion
AtlasManifestHashes
SceneManifestHash
FrameArtifactHash
PresentationTimestamp
```

## Retirement contract

```txt
stop animation loop
cancel pending callbacks
remove resize listener
dispose RenderPipeline
dispose all geometries
dispose all materials
dispose frond atlas
dispose flower atlas
dispose compute storage
dispose renderer
clear scene references
revoke globalThis.CozyMenu
publish receipts
```

## Retained constraints

The menu remains optional presentation. Failure must compose with the shell-startup fallback authority, not block the primary game. The game renderer and Core Startup retain ownership of adventure readiness and the first visible game frame.