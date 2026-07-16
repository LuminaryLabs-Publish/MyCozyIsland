# Renderer recovery audit: WebGPU device and WebGL context loss contract

**Timestamp:** `2026-07-16T00-59-16-04-00`  
**Status:** `renderer-device-context-loss-recovery-authority-audited`

## Summary

The product needs one backend-neutral recovery contract with provider-specific WebGPU and WebGL adapters. Initial renderer startup success cannot stand in for lifetime renderer health.

## Plan ledger

**Goal:** recover or fail visibly and deterministically after backend loss while preserving renderer-neutral game truth.

- [x] Identify both active renderer surfaces.
- [x] Define backend-neutral loss and recovery state.
- [x] Define WebGPU and WebGL adapter responsibilities.
- [x] Define resource and frame proof requirements.
- [ ] Implement and run forced-loss fixtures.

## Backend-neutral state

```txt
healthy
loss-observed
suspended
recovering
rehydrating
awaiting-first-frame
recovered
fallback
fatal
retired
```

Each transition must bind:

```txt
documentGeneration
routeGeneration
rendererGeneration
deviceOrContextGeneration
resourceRegistryRevision
recoveryAttemptId
policyRevision
```

## WebGPU adapter

Responsibilities:

- Observe the active device-loss signal exposed by the renderer/backend integration.
- Normalize loss reason and provider metadata.
- Retire the active renderer and device generation once.
- Cancel stale compute, upload and render work.
- Recreate the renderer/backend under a bounded deadline.
- Recreate storage buffers, procedural textures, render targets and post resources.
- Publish a provider receipt for the new generation.

## WebGL2 adapter

Responsibilities:

- Listen for `webglcontextlost` on the active canvas.
- Apply the declared `preventDefault` restoration policy.
- Stop presentation immediately and clear stale queued work.
- Listen for `webglcontextrestored` or recreate the renderer when policy requires it.
- Rebuild all context-owned resources.
- Publish a provider receipt for the restored or replaced generation.

## Resource registry

The recovery authority needs stable reconstruction descriptors for:

```txt
menu frond atlas
menu wind storage/compute state
menu RenderPipeline and bloom pass
game sky and environment textures
world and gameplay renderer resources
ocean and foam resources
cloud and fog volume textures
cloud and fog renderers
post-processing targets and layer graph
shadow maps and renderer settings
debug and HUD presentation bindings
```

The registry must not store stale GPU handles as durable truth. It stores stable IDs, renderer-neutral descriptors, source snapshot revisions and reconstruction callbacks.

## Hidden preload rule

```txt
presentation sleeping
  -> renderer loss observed
  -> preload readiness revoked or marked recovering
  -> Play remains blocked
  -> renderer is reconstructed
  -> one fresh hidden first frame is presented
  -> readiness is republished for the new renderer generation
```

Restoring the old animation callback alone is not sufficient proof.

## Failure fallback

When recovery is unavailable or exhausted:

- Preserve save and renderer-neutral simulation state.
- Stop world-changing input.
- Show a semantic failure surface with retry or reload.
- Optionally admit a WebGL2 fallback only through a typed backend transition.
- Never report entry or recovery success before a matching frame acknowledgement.

## Validation boundary

No backend loss was forced, no browser recovery behavior was observed and no resource rehydration was executed.