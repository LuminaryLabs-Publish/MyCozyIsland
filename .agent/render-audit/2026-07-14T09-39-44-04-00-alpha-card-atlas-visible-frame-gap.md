# Render audit: alpha-card atlas visible-frame gap

**Timestamp:** `2026-07-14T09-39-44-04-00`

## Plan ledger

**Goal:** separate authored source shape from proven browser-visible postcard output.

- [x] Inspect frond and flower atlas generation.
- [x] Inspect UV ranges, filtering, mipmaps, alpha mode, camera and pipeline.
- [x] Inspect static smoke coverage.
- [ ] Add browser-visible frame evidence.

## Implemented render path

```txt
four-cell frond canvas atlas
  -> eight five-segment cards
  -> alphaTest 0.48
  -> opaque depth-writing materials
  -> TSL vertex wind

three-cell flower atlas
  -> three transparent cards

postcard scene
  -> sky + glow + fog
  -> shoreline + animated water strip
  -> trunk + crown hub + frond cards
  -> directional and hemisphere lighting
  -> RenderPipeline + restrained bloom
```

## Confirmed source values

```txt
frond cells: 4 x 320 by 256
frond cards: 8
card segments: 5
frond mipmaps: enabled
frond minification: LinearMipmapLinearFilter
frond magnification: LinearFilter
frond atlas gutters: not authored
flower atlas cells: 3 x 128 by 128
flower mipmaps: enabled
first menu-frame acknowledgement: absent
browser screenshot fixture: absent
WebGPU/WebGL2 image comparison: absent
```

## Main gap

The new smoke asserts constants and source patterns. It does not initialize a renderer or prove that the new visual appears. No evidence binds the runtime revision, backend, viewport, DPR, atlas content, scene graph and presented frame.

## Atlas-cell risk

Frond UVs are written from exact cell start to exact cell end. Flower UVs do the same. Linear mip filtering can sample beyond the intended source texels, and no gutters or edge extrusion are authored. This is an unverified visual-risk classification, not a claim that visible bleeding has already occurred.

## Required evidence

```txt
VisualRevision
BackendId and adapter/device metadata
Viewport and DPR
ReducedMotion state
FrondAtlasHash and FlowerAtlasHash
AtlasCellManifest
UVInteriorValidationResult
AlphaOccupancyResult
MipPolicyResult
SceneManifestHash
MenuFrameId
ScreenshotHash
FirstMenuPostcardFrameAck
```

## Acceptance cases

```txt
WebGPU normal frame
WebGL2 fallback frame
DPR 1 and 1.5
wide, square and narrow viewports
reduced motion
oblique frond angles
mip-sensitive distance
transparent-edge halo probe
adjacent-cell contamination probe
first frame after resize
frame before game preload begins
frame before menu retirement
```

## Do not claim

Do not claim atlas isolation, alpha-cut correctness, backend parity, exact postcard appearance or visible-frame completion until browser artifacts are correlated to one admitted frame.