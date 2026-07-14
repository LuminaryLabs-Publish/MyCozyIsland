# Architecture audit: postcard-menu atlas and frame admission

**Timestamp:** `2026-07-14T09-39-44-04-00`

## Plan ledger

**Goal:** place the new procedural atlas/card renderer behind one bounded admission and retirement authority while preserving existing NexusEngine and shell ownership.

- [x] Map current source participants.
- [x] Preserve existing 65-kit and five-adapter boundaries.
- [x] Define command, result, receipt and frame identities.
- [ ] Implement without restructuring NexusEngine.

## Current participants

```txt
menu.html shell
  -> cozy-menu-scene-adapter
     -> Three.js WebGPU/TSL/Bloom providers
     -> WebGPURenderer backend
     -> frond CanvasTexture atlas
     -> flower CanvasTexture atlas
     -> card geometry and node materials
     -> compute wind storage and dispatch
     -> scene, camera, lights, fog, water and shoreline
     -> RenderPipeline and animation loop
  -> cozy-menu-game-shell-adapter
     -> hidden game preload, progress, Play and reveal
  -> cozy-game-preload-bridge-adapter
     -> Core Startup evidence and sleep/resume
```

## Ownership map

| Participant | Current ownership | Missing authority |
|---|---|---|
| Frond atlas | Local `CanvasTexture`, exported through `CozyMenu` | Revision, cell manifest, hash, disposal receipt. |
| Flower atlas | Local `CanvasTexture`, reachable through scene materials | Revision, cell manifest, hash, disposal receipt. |
| Card geometry/materials | Per-mesh creation | Candidate/accepted generation and traversal disposal. |
| Wind storage/compute | Module globals | Backend-bound generation and retirement receipt. |
| Renderer/pipeline | Module globals | First-frame admission and terminal retirement result. |
| Resize listener | Window listener | Registration identity and removal receipt. |
| Public readback | `globalThis.CozyMenu` | Bounded capability and revocation result. |
| Game preload | Shell adapter | Retained independent-startup authority. |

## Required parent domain

```txt
cozy-island-menu-postcard-atlas-frame-admission-authority-domain
```

## Required child surfaces

```txt
menu-visual-revision-kit
atlas-generation-kit
atlas-cell-manifest-kit
atlas-gutter-policy-kit
alpha-occupancy-validation-kit
uv-interior-validation-kit
mipmap-policy-kit
menu-scene-candidate-kit
menu-backend-admission-kit
menu-compute-wind-candidate-kit
menu-frame-submission-kit
menu-frame-artifact-kit
menu-frame-hash-kit
menu-postcard-frame-result-kit
first-menu-postcard-frame-ack-kit
menu-resource-manifest-kit
menu-listener-retirement-kit
menu-scene-traversal-retirement-kit
menu-texture-retirement-kit
menu-compute-retirement-kit
menu-public-capability-revocation-kit
menu-postcard-retirement-result-kit
browser-build-pages-menu-parity-kit
```

## Command flow

```txt
MenuPostcardFrameAdmissionCommand
  -> bind VisualRevision, ProviderRevision, BackendId, Viewport, DPR and ReducedMotion
  -> generate deterministic atlas candidates and cell manifests
  -> validate cell isolation, UV interiors, alpha occupancy and mip policy
  -> prepare scene, cards, materials, storage and pipeline
  -> submit one frame
  -> record FrameId, scene manifest and artifact hash
  -> atomically publish MenuPostcardFrameResult
  -> enable normal shell projection only against the accepted result

MenuPostcardRetirementCommand
  -> reject new menu frames
  -> remove listener and callback ownership
  -> dispose pipeline, scene graph, textures, storage and renderer
  -> revoke CozyMenu
  -> publish participant receipts and one terminal result
```

## Composition rule

Core Startup remains authoritative for game readiness. The shell-startup authority remains responsible for independent game preload and degraded entry. This new domain owns only menu visual candidate admission, exact frame evidence and menu-resource retirement.