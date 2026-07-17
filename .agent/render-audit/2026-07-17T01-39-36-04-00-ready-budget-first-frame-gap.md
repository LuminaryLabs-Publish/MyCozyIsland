# Render audit — Ready-budget first-frame gap

**Timestamp:** `2026-07-17T01-39-36-04-00`

## Current render modes

```txt
preload mode
  renderer DPR = min(devicePixelRatio, 1, quality.dprCap)
  target rendered FPS = 24

idle-ready mode
  renderer DPR = min(devicePixelRatio, quality.dprCap)
  target rendered FPS = 30

interactive-ready mode
  renderer DPR = min(devicePixelRatio, quality.dprCap)
  target rendered FPS = 60 for 900 ms
```

The direct renderer correctly removes dynamic shadow-map work, full-screen bloom and half-float post buffers. It merges palm fronds into one geometry and all wind motes, sparkles and petals into one particle surface.

## Visible-frame gap

`setPreloading(false)` changes renderer sizing policy and clears `lastFrame`, but it does not immediately publish a rendered frame result. The next accepted animation-loop callback performs the visible commit.

The host enables Play in the same `markReady()` call after requesting this transition. There is no proof that the canvas visible at Play enablement uses the ready DPR, ready frame mode, current viewport or current recipe generation.

```txt
renderer initialized: yes
backend reported: yes
quality tier reported: yes
preloading state reported: yes
current frame-rate target reported: yes
DPR set during resize: yes

presentation generation: no
DPR revision: no
viewport revision: no
render commit result: no
FirstReadyMenuFrameAck: no
Play-to-frame generation binding: no
```

## Required render result

```txt
MenuRenderCommitResult {
  presentationGeneration,
  preloadSessionId,
  backend,
  viewportRevision,
  width,
  height,
  devicePixelRatio,
  appliedPixelRatio,
  frameMode,
  qualityTier,
  recipeId,
  committedAt
}
```

The first result with `frameMode=ready` should publish `FirstReadyMenuFrameAck`. Play should admit only that matching generation.

## Fixture requirement

A real browser fixture must:

1. hold the game iframe in preload mode;
2. verify the menu uses the preload DPR/frame policy;
3. emit one valid ready result;
4. attempt immediate Play activation;
5. prove Play remains blocked until the matching ready frame commits;
6. prove stale and duplicate ready messages do not unlock another generation;
7. verify reduced-motion behavior;
8. repeat on WebGPU and WebGL2 fallback;
9. repeat from built and Pages-hosted output.

No visual failure was reproduced in this audit.