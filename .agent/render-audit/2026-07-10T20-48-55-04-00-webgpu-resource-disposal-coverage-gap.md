# Render Audit: WebGPU Resource Disposal Coverage Gap

Timestamp: `2026-07-10T20-48-55-04-00`

## Active render surface

```txt
WebGPURenderer
sky CanvasTexture + material + sphere geometry
stylized world group + layered grass resources
ocean plane geometry + node material
foam ribbon geometries + materials
cloud/fog Storage3DTexture or Data3DTexture resources
cloud shared box geometry + node materials
fog box geometry + VolumeNodeMaterial
post-processing pipeline and render targets
lights, scene, and camera
```

## Current disposal coverage

```txt
route-level dispose(): absent
world renderer dispose(): absent
layered grass dispose(): absent
volume texture dispose(): absent
cloud renderer dispose(): absent
fog renderer dispose(): absent
ocean renderer dispose(): absent
foam renderer dispose(): absent
post pipeline dispose(): not composed by host
sky resource owner: absent
renderer disposal coordination: absent
```

Factories return live meshes, groups, materials, update controls, or tuning controls. They do not consistently return resource counts, ownership rows, or idempotent release functions.

## Failure modes

- repeated mount or hot reload can allocate a second scene without releasing the first
- partial startup failures after renderer initialization can leave earlier resources live
- shared cloud geometry/material references can be double-disposed if ownership is added ad hoc
- volume textures and compute nodes can outlive their scene consumers
- anonymous listener closures can retain session objects after the scene is no longer visible
- the global host keeps live Three references reachable

## Required resource row

```txt
{
  sessionId,
  resourceId,
  family,
  ownerId,
  shared,
  createdAtSequence,
  state,
  releasedAtSequence,
  releaseReason
}
```

## Required release order

```txt
stop frame loop
remove input/resize listeners
stop diagnostics
release post targets
release fog/cloud consumers
release atmosphere textures/compute resources
release foam/ocean
release world and layered grass
release sky
release renderer
clear host live references
publish disposed snapshot
```

## Visual invariants

The lifecycle slice must not change:

```txt
Three/WebGPU 0.185.0
backend selection
quality policy
camera rail or first-person behavior
terrain/ocean/grass/cloud/fog appearance
post-processing composition
route token
```

## Gate

Browser proof must compare live resource and listener counts before start, after start, after dispose, and after restart. Counts must return to baseline after disposal.
