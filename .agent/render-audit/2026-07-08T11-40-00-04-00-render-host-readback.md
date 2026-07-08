# MyCozyIsland Render Host Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T11-40-00-04-00`

## Scope

This is a documentation-only render audit.

No renderer code changed.

## Route under audit

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
```

## Render source readback

The current render host builds a full local Three.js scene from local domain-kit descriptors and inline adapters.

```txt
source descriptors:
  ocean island landform
  island foliage and path network
  ocean floor
  grass placement
  grass wind
  fenced clearing
  campfire graph
  smoke descriptor
  Mattatz cloud render contract
  hero cloud form/point contract

inline render adapters:
  terrainMesh
  floorMesh
  waterMesh
  foamMesh
  pathMesh
  objGroup
  fenceGroup
  campfireMesh
  smokeMesh + updateSmoke
  grassMesh
  heroCloudGeometry
  heroCloudGroup
```

## Current render loop

```txt
frame(now)
  -> compute dt
  -> animate sea height
  -> if first-person threshold reached, run fp(dt)
  -> else sample rail() and apply camera
  -> updateSmoke(smoke, dt, now)
  -> pulse campfire flame
  -> drift hero cloud points group
  -> renderer.render(scene, camera)
  -> requestAnimationFrame(frame)
```

## Render authority boundary

The renderer is not the first problem to split.

It is currently acting as both:

```txt
visual adapter
runtime animator
host diagnostics source
cloud cache owner
rail/camera presenter
movement presenter
```

The next split should not move all of that at once.

First split the proof records:

```txt
SceneSourceSnapshot
CameraRailSnapshot
HeroCloudDescriptorSnapshot
HeroCloudCacheSnapshot
CloudDriftResult
HostSnapshot
```

Then the renderer can continue consuming the same local data while fixtures read the proof records without a browser.

## Render gaps

```txt
- Terrain mesh projection is inline and not parity-tested against source descriptors.
- Ocean floor mesh projection is inline and not parity-tested.
- Water/foam are visually simple and not descriptor-asserted.
- Foliage is primitive-based and not a high-fidelity object kit yet.
- Grass is instanced cone geometry, not texture-patch or plane-clump batching.
- Smoke particles are generated with Math.random and not fixture-stable.
- Hero cloud geometry cache is browser-local and not summarized as a stable cache snapshot.
- Cloud drift is applied directly to Three.js objects, not emitted as CloudDriftResult.
```

## Keep-before-change rules

```txt
- Keep the current visible island route stable.
- Keep `hero-cloud-4` as the active route token unless intentionally changed with route authority docs.
- Keep `globalThis.CozyIsland` compatibility.
- Do not rewrite terrain, water, foliage, or cloud visuals before host-proof records exist.
- Add DOM-free proof helpers first.
```

## Next render proof target

```txt
MyCozyIsland Host Snapshot Acceptance Matrix + Rail/Cloud Fixture Gate
```

Stop when route/source/rail/cloud facts can be read from deterministic records while the existing visible render loop remains unchanged.
