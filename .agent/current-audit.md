# Current Audit: MyCozyIsland Foam Depth Proxy Authority

Last updated: `2026-07-12T00-20-01-04-00`

## Summary

The runtime now depth-masks final shoreline foam against the fused scene depth. This closes the prior direct no-depth occlusion defect, but it does so through a manual physical pass that is not represented in the logical graph and is not owned by a lifecycle contract.

`createFoamDepthScene()` captures the current `foamRenderer.meshes` once, creates one proxy mesh per source mesh using shared geometry and one new `MeshDepthMaterial`, then copies source transforms every frame. There is no topology revision, membership reconciliation, resource lease, disposal result, execution receipt, or browser pixel proof. The logical foam contract still declares water-mask, water-surface-depth, and fog-transmittance inputs that the physical pass does not bind.

## Plan ledger

**Goal:** document one authoritative path from source foam topology through proxy preparation, per-frame synchronization, opaque-depth binding, visible rendering, topology replacement, and complete disposal.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `MyCozyIsland` because newer runtime work postdated its oldest central audit.
- [x] Inspect active route, package tests, composition graph, renderer-post pipeline, browser host, page exit, public readback, and retained audits.
- [x] Identify the complete interaction loop, active domains, 50 cataloged kits, one extra runtime kit, nine providers, and five imported services.
- [x] Confirm the prior opaque-depth defect is partially closed.
- [x] Confirm graph, topology, resource-lifecycle, remaining-binding, and proof gaps.
- [x] Define the foam-depth proxy authority domain and fixture matrix.
- [x] Change documentation only.
- [ ] Implement and execute topology, disposal, backend, and visible-pixel fixtures.

## Runtime identity

```txt
route:                 index.html -> src/main-cloudform.js?v=foam-depth-camera-1
package:               0.4.1
Three.js:              0.185.0
NexusEngine commit:    481cbf6df742e81279bd42245c4238c6a1fc69f2
world id:              world:cozy-island-webgpu-v4
cataloged kits:        50
runtime kit surfaces:  51
providers:             9
```

## Interaction loop

```txt
startup
  -> validate kitCatalog
  -> construct uncataloged cozy-ocean-composition-kit
  -> initialize backend and quality
  -> prepare Core or legacy world
  -> create scene, water, clouds, fog and source foam
  -> create physical post pipeline
  -> capture source foam mesh membership into proxy pairs
  -> install browser callbacks and animation loop
  -> expose raw CozyIsland host

per frame
  -> tick scenario and camera
  -> update world focus
  -> animate source foam
  -> copy source and group transforms into proxy pairs
  -> render fused base scene and scene depth
  -> render atmosphere
  -> render foam proxy depth
  -> compare foam depth with scene depth
  -> mask and composite foam color
  -> process materialization and diagnostics

pagehide
  -> domains.dispose()
  -> no explicit animation-loop, listener, renderer, post-pipeline, proxy-material or proxy-scene retirement
```

## Logical render graph

```txt
background
opaque-world
water-composite
atmosphere-composite
foam-overlay
output-transform
```

The foam pass declares:

```txt
depth.source: opaque-depth
reads: atmosphere-composited-color, water-mask, water-surface-depth,
       shoreline-distance, foam-state, fog-transmittance
```

## Physical render graph

```txt
base-scene-fused: background + opaque-world + water-composite
atmosphere-composite
foam-occlusion-depth
foam-overlay
output-transform
```

The new `foam-occlusion-depth` pass:

```txt
uses a separate proxy scene
uses one MeshDepthMaterial
shares source geometry
captures source mesh membership once
syncs transforms every frame
samples proxy depth against fused scene depth
masks final foam color and alpha
```

## Closed, partial, and open findings

### Closed

```txt
final foam is no longer unconditionally alpha-composited over opaque geometry
physical source includes a foam depth texture and scene-depth comparison
```

### Partially closed

```txt
opaque-depth is sampled physically, but no typed producer/consumer binding exists
physical pass order reports the depth pass, but the list is hand-authored
```

### Open

```txt
logical graph has no foam-occlusion-depth pass or proxy resource
composition kit remains outside the canonical catalog
proxy membership has no topology revision
added or removed source meshes are not reconciled
proxy resources have no lease or dispose method
water-mask is not physically bound
water-surface-depth is not physically bound
fog-transmittance is not physically bound
public readback has no graph, proxy, binding, pass or visible-frame revision
Node foam test checks source tokens rather than GPU work or pixels
WebGPU/WebGL2 parity is not proved
```

## Domains in use

```txt
browser startup, loader, error and debug projection
kit catalog declaration, validation and completeness
logical render graph declaration and validation
physical render pass and proxy-resource construction
foam proxy topology, transform synchronization and lifecycle
WebGPU/WebGL2 backend and quality policy
legacy/Core world mode and lifecycle
Core World grid, focus, providers and materialization
camera rail, first-person controls and scenario clock
island, sea floor, biome, shoreline and ground contact
vegetation, rocks, props, grass, paths and campfire
ocean waves, optics, caustics, foam and underwater atmosphere
clouds, fog, weather, wind, illumination and sky
render layers, depth, blend and output transform
adaptive performance and resolution
browser pointer, keyboard, resize, timers, page lifecycle and public host
static tests, browser proof and Pages deployment
```

## All implemented kits and offered services

### Catalog-admitted kits: 50

```txt
debug-overlay-host-kit                     diagnostics
webgl2-fallback-renderer-kit                fallback rendering policy
webgpu-compute-atmosphere-renderer-kit      atmosphere texture generation
webgpu-foam-renderer-kit                    foam meshes, material and animation
webgpu-ocean-renderer-kit                   water displacement and optics
webgpu-performance-budget-kit               adaptive frame budget
webgpu-post-processing-renderer-kit         depth/fog/foam/output composition
webgpu-rolling-fog-renderer-kit              fog raymarch and clipping
webgpu-stylized-material-renderer-kit       world materials
webgpu-volumetric-cloud-renderer-kit        cloud raymarch
camera-rail-sequence-kit                    rail, orbit, landing and FPS input
cozy-island-scenario-kit                    scenario and camera snapshots
terrain-surface-domain-kit                  island surface
vegetation-placement-domain-kit             placement graph
aerial-perspective-domain-kit               haze/exposure
campfire-atmosphere-domain-kit               fire/light/smoke
cloud-density-field-domain-kit              cloud recipe
cloud-horizon-band-domain-kit               horizon continuation
cloud-lighting-domain-kit                   cloud lighting
cloud-lod-domain-kit                        cloud LOD
cloud-shadow-domain-kit                     cloud shadows
cloud-weather-domain-kit                    cloud weather mapping
fog-advection-domain-kit                    fog motion
fog-field-domain-kit                        fog density
fog-volume-placement-domain-kit             fog bounds
ground-contact-domain-kit                   seating and slope rejection
illumination-domain-kit                     sun/sky/exposure
ocean-caustics-domain-kit                   caustics
ocean-floor-profile-domain-kit              sea-floor profile
ocean-optics-domain-kit                     water optics
ocean-wave-domain-kit                       wave spectrum
prop-archetype-domain-kit                   props
render-archetype-domain-kit                 render mapping
render-quality-domain-kit                   backend/DPR quality
render-snapshot-domain-kit                  render aggregation
rock-archetype-domain-kit                   rocks
shoreline-field-domain-kit                  coast field
shoreline-foam-domain-kit                   foam descriptors
stylized-material-descriptor-domain-kit     material descriptors
sun-glitter-domain-kit                      glitter
terrain-biome-field-domain-kit              biome weights
terrain-lod-domain-kit                      terrain LOD
underwater-atmosphere-domain-kit            underwater haze
vegetation-archetype-domain-kit             plant catalog
vegetation-lod-domain-kit                   plant LOD
vegetation-wind-domain-kit                  vegetation wind
weather-state-domain-kit                    weather intent
wind-field-domain-kit                       wind
deterministic-seed-domain-kit               scoped random streams
environment-clock-domain-kit                environment time
```

### Source-backed runtime kit outside catalog

```txt
cozy-ocean-composition-kit
  -> six-pass logical layer graph
  -> pass order/dependency validation
  -> transparent depth-write validation
  -> terrain handoff validation
  -> layer depth/blend contracts
```

### Core World providers

```txt
cozy-island-terrain-provider
cozy-seafloor-terrain-provider
biome-classification-provider
shoreline-classification-provider
seafloor-material-provider
vegetation-provider
rock-provider
prop-provider
cell-presentation-provider
```

### Imported NexusEngine services

```txt
createEngine
createCoreWorldDomain
createUniformGridPartition
createFlatWorldSurface
defineWorldEffectProvider
```

## Required parent domain

```txt
cozy-island-foam-depth-proxy-authority-domain
```

## Candidate kits

```txt
foam-depth-proxy-plan-kit
foam-depth-proxy-identity-kit
foam-depth-proxy-membership-kit
foam-depth-proxy-topology-revision-kit
foam-depth-proxy-transform-sync-kit
foam-depth-proxy-resource-lease-kit
foam-depth-proxy-disposal-kit
foam-depth-binding-result-kit
logical-physical-pass-adapter-kit
foam-depth-pass-observation-kit
foam-occlusion-frame-receipt-kit
foam-proxy-topology-fixture-kit
foam-proxy-disposal-fixture-kit
webgpu-webgl2-foam-depth-parity-fixture-kit
```

## Required transaction

```txt
admit graph, runtime generation and source topology
  -> derive exact proxy membership
  -> classify shared and owned resources
  -> commit proxy topology revision
  -> synchronize transforms under one frame ID
  -> bind current opaque-depth producer
  -> execute depth and color passes
  -> publish pass results and visible-frame receipt
  -> reconcile topology changes atomically
  -> retire owned proxy resources exactly once
```

## Existing validation surface

```txt
catalog/static/domain/Core World tests: present
camera terrain-clearance/FOV tests: present
foam source-token test: present
physical GPU attachment inspection: absent
proxy topology mutation fixture: absent
proxy disposal fixture: absent
browser foam pixel fixture: absent
WebGPU/WebGL2 parity fixture: absent
visible-frame receipt: absent
```

## Ordered queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. World Lifecycle Contract and Legacy/Core Mode Parity Authority
4. Render Layer Graph Admission and Physical Resource Binding Authority
4a. Foam Depth Proxy Topology and Lifecycle Authority
5. Core World Reset / Re-prepare Authority
6. Pinned Core World Focus Transaction Authority
7. Live Materialization Readiness Commit Authority
8. Core World Render Commit Authority
9. Camera Rail Baseline Authority
10. Dynamic Environment Frame Authority
11. Adaptive Quality Transaction Authority
```
