# Render audit — BFCache disposed-child resume gap

**Timestamp:** `2026-07-17T08-01-59-04-00`

## Current render lifecycle

```txt
main host creates:
  WebGPURenderer
  scene and camera
  sky/environment textures
  world renderer
  gameplay renderer
  ocean and foam renderers
  cloud and fog volume renderers
  atmosphere textures
  post pipeline
  animation loop

pagehide:
  gameplayRenderer.dispose()
```

`gameplayRenderer.dispose()` destroys geometry/material ownership for farm plots, crops, forage markers, landmarks and the interaction target. The renderer loop and parent scene remain active-owned, and no persisted-page classification exists.

## Visible risk

On a BFCache restore, the page can return with:

- the original engine and renderer generation;
- the original animation-loop callback and frame clock;
- retained world, ocean, cloud, fog and post resources;
- a disposed gameplay presentation subtree;
- no rebuild or first resumed-frame proof.

The resulting visible frame may omit or reference disposed gameplay content. This was not reproduced in a browser and remains a source-backed convergence risk.

## Required render contract

```txt
suspend:
  finish or abandon current frame generation
  stop loop
  retain declared resources
  publish suspension digest

resume:
  validate retained scene and GPU generation
  rebase timing
  render one matching frame
  publish FirstResumedFrameAck

retire:
  stop loop
  dispose every owned render resource exactly once
  dispose WebGPU/WebGL2 renderer
  reject stale frame callbacks
```

## Evidence still required

- BFCache back/forward observation.
- WebGPU and WebGL2 variants.
- Resource and listener counts before suspend, after suspend and after resume.
- Screenshot or pixel evidence for the first resumed frame.
- Terminal navigation and repeated entry/exit proof.
