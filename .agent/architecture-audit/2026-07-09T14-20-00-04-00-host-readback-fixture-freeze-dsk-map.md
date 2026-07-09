# Architecture Audit: Host Readback Fixture Freeze DSK Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-20-00-04-00`

## Summary

`MyCozyIsland` has a usable source-domain-kit layer for scene descriptors, but the route consumer is still a monolithic browser adapter in `src/main-cloudform.js`.

The next architecture cut should not alter the scene. It should make the existing descriptors and browser decisions fixture-readable.

## Current horizontal composition

```txt
static HTML route
  -> cloudform browser entry
  -> local source-domain descriptors
  -> inline Three.js render adapters
  -> inline input/action/movement/camera policy
  -> inline grass/cloud consumers
  -> legacy diagnostic object
```

## DSK / domain breakdown

| Boundary | Current implementation | Service | Next cut |
|---|---|---|---|
| Route shell | `index.html` | canvas, loader, error panel, module route token | `route-token-readback-kit` |
| Source profile | inline constants/imports | declares active local kits and route token | `source-profile-kit` |
| Source fingerprint | missing | stable descriptor identity | `source-fingerprint-kit` |
| Scene source | `create*` calls in `main()` | island/floor/clearing/grass/cloud/smoke descriptor build | `scene-source-snapshot-kit` |
| Input | raw DOM listeners | keyboard, wheel, pointer mutation | `browser-input-action-frame-kit` |
| Action result | missing | accepted/rejected/skipped records | `action-result-kit` |
| Movement policy | `valid(next)` | clearing/campfire acceptance | `movement-policy-result-kit` |
| Camera rail | `rail()` | progress-to-camera position/look | `camera-rail-snapshot-kit` |
| Grass consumer | `grassMesh(placement)` | InstancedMesh projection | `grass-instance-snapshot-kit` |
| Cloud consumer | `heroCloudGroup`, `heroCloudGeometry`, frame drift | descriptor/cache/drift projection | `hero-cloud-cache-snapshot-kit`, `cloud-drift-result-kit` |
| Render host | inline renderer/camera/scene | render frame | `render-host-snapshot-kit` |
| Host readback | `globalThis.CozyIsland` only | legacy cloud diagnostics | `cozy-island-host-snapshot-kit` |
| Fixture | missing | DOM-free acceptance gate | `browser-consumer-fixture-kit` |

## Interaction loop captured

```txt
index.html
  -> src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN + local kits
  -> descriptor construction
  -> Three.js scene projection
  -> DOM input mutation
  -> rail camera until progress >= 0.985
  -> first-person movement with clearing/campfire validity
  -> smoke/flame/cloud/sea frame updates
  -> renderer.render(scene, camera)
  -> globalThis.CozyIsland legacy diagnostics
```

## Main architecture finding

The repo has enough source kits. The blocker is that the browser consumer does not report what it accepted, rendered, cached, rejected, or exposed.

## Next safe ledge

```txt
MyCozyIsland Host Readback Fixture Freeze + Browser Consumer Gate
```
