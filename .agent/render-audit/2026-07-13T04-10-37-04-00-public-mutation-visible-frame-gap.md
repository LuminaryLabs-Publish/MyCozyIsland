# Render audit: public mutation visible-frame gap

**Timestamp:** `2026-07-13T04-10-37-04-00`

## Summary

The public host exposes the live renderer, scene and camera plus simulation mutation paths. A caller can alter presentation or authoritative state outside the normal frame transaction, but no result identifies the first frame that contains the effect or whether the effect was superseded by the host loop.

## Plan ledger

**Goal:** bind every permitted public capability effect to an admitted render generation and visible-frame receipt.

- [x] Confirm raw renderer, scene and camera references are public.
- [x] Confirm raw engine/adventure mutation can occur outside the animation loop.
- [x] Confirm `getState()` is not a visible-frame receipt.
- [x] Define render-generation and effect-ack requirements.
- [ ] Implement and execute render-capability fixtures.

## Current path

```txt
external caller
  -> mutate renderer/scene/camera directly
  or mutate engine/domain state directly
  -> no render command or expected surface revision
  -> animation loop continues
  -> post pipeline renders later
  -> no record proves which frame included or overwrote the effect
```

## Missing render contract

```txt
RenderSurfaceId
RenderGeneration
ExpectedRenderRevision
CapabilityEffectId
renderer participant receipt
scene/camera mutation policy
first matching frame ID
visible effect fingerprint
superseded-effect result
failed-effect result
```

## Required policy

```txt
production
  -> expose no raw Three.js owners
  -> expose renderer-neutral read-only diagnostics only

development/support
  -> admit declared debug commands
  -> validate current render generation
  -> apply through renderer participant adapters
  -> return typed participant results
  -> acknowledge the first frame carrying the effect
```

## Required fixtures

```txt
raw renderer/scene/camera absent from production projection
stale render generation rejected
camera debug command produces typed result
scene debug command cannot mutate authoritative gameplay
superseded effect classified
first matching visible frame acknowledged
WebGPU/WebGL2 parity
source/build/Pages parity
```

## Non-claims

No presentation mutation, render generation, effect receipt or visible-frame behavior changed.
