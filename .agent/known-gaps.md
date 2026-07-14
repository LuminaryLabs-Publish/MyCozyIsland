# Known gaps: MyCozyIsland postcard-menu atlas and frame admission

**Timestamp:** `2026-07-14T09-39-44-04-00`  
**Publication status:** `menu-postcard-atlas-frame-admission-audited`

## Summary

The new postcard menu is source-backed but not browser-proven. Atlas cells, frame identity and complete resource retirement lack typed evidence. Retained shell-startup, cross-window and game-entry gaps remain active.

## Plan ledger

**Goal:** distinguish confirmed implementation from unproved visual and lifecycle guarantees.

- [ ] Atlas and visual revision identity.
- [ ] Cell manifests, gutters and interior UVs.
- [ ] Alpha occupancy and mip isolation validation.
- [ ] Exact first menu-frame acknowledgement.
- [ ] WebGPU/WebGL2 image parity.
- [ ] Scene, texture, compute and listener retirement receipts.
- [ ] Browser/build/Pages artifact parity.

## Atlas gaps

```txt
FrondAtlasRevision: absent
FlowerAtlasRevision: absent
AtlasCellManifest: absent
cell gutters: absent
edge extrusion: absent
interior UV policy: absent
alpha occupancy result: absent
mip isolation result: absent
atlas content hash: absent
```

Frond UVs use exact four-cell boundaries. Flower UVs use exact three-cell boundaries. Both atlases generate mipmaps. The repository cannot currently rule out neighboring-cell or transparent-edge contamination.

## Frame gaps

```txt
VisualRevision: absent
SceneRevision: absent
MenuFrameId: absent
backend/device receipt: absent
viewport/DPR receipt: absent
scene manifest hash: absent
screenshot/readback hash: absent
FirstMenuPostcardFrameAck: absent
WebGPU/WebGL2 visual equivalence result: absent
```

## Retirement gaps

```txt
resize-listener removal: absent
pending idle/timer cancellation: absent
scene traversal disposal: absent
frond atlas disposal receipt: absent
flower atlas disposal receipt: absent
per-card geometry/material disposal: absent
compute storage retirement receipt: absent
CozyMenu revocation: absent
terminal MenuPostcardRetirementResult: absent
```

`revealGame()` stops the animation loop and disposes the pipeline and renderer, but that is not a complete participant settlement.

## Validation gaps

```txt
deterministic atlas hash fixture: absent
UV/gutter source fixture: absent
browser WebGPU frame fixture: absent
browser WebGL2 frame fixture: absent
alpha halo probe: absent
neighbor-cell probe: absent
mip-distance probe: absent
resize/reduced-motion fixture: absent
retirement resource-count fixture: absent
built-output parity: absent
Pages parity: absent
```

## Retained shell and gameplay gaps

```txt
independent game preload after menu failure
versioned cross-window envelopes
origin and sequence admission
first resumed game-frame acknowledgement
900 ms fallback classification
pagehide and BFCache policy
adaptive quality transitions
portable save durability
browser input authority
bounded public capabilities
```

## Dependency order

```txt
atlas identity and cell policy
  -> frame admission and artifact evidence
  -> menu retirement receipts
  -> normal/degraded shell composition
  -> source/build/Pages parity
```

## Do not claim

Do not claim atlas isolation, frame parity, complete cleanup, graceful menu fallback or production readiness until the relevant fixtures pass on `main`.