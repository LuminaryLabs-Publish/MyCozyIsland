# Current Audit: MyCozyIsland Render Layer Graph and Physical Binding Authority

Last updated: `2026-07-11T22-20-00-04-00`

## Summary

`MyCozyIsland` now separates island terrain from the sea floor and exposes a six-pass logical ocean render graph. The browser host does not compile that graph into the physical Three.js/WebGPU pipeline. It validates the graph as data, then separately constructs a fused base-scene pass, a fog pass, a foam pass, and an output transform.

The final foam contract is the clearest mismatch. The logical graph declares depth, water-mask, water-surface-depth, shoreline, foam-state, and fog-transmittance inputs. The physical foam pass uses a separate scene with `depthBuffer: false`, while the foam material still requests `depthTest: true`. No binding receipt proves access to opaque depth, the water mask, or rolling-fog transmittance.

## Plan ledger

**Goal:** define one admitted composition source that is cataloged, compiled into physical passes, binds every declared resource, publishes execution receipts, and proves visible WebGPU/WebGL2 parity.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all eligible repositories have central and root `.agent` coverage.
- [x] Select only `MyCozyIsland` because new layered-world/render work postdated its oldest eligible audit.
- [x] Inspect `index.html`, `src/main-cloudform.js`, world runtime/config, composition graph, render layers, ocean renderer, post pipeline, package tests, and retained audits.
- [x] Trace catalog validation, graph creation, pass construction, frame execution, readback, and tests.
- [x] Identify all active domains, 50 cataloged kits, one extra runtime composition kit, nine providers, and five imported services.
- [x] Document the logical/physical binding split and catalog omission.
- [x] Change documentation only.
- [ ] Implement graph compilation, resource-binding receipts, depth-correct foam, and browser fixtures.

## Runtime identity

```txt
route:                 index.html -> src/main-cloudform.js?v=render-layer-graph-2
package:               0.4.0
Three.js:              0.185.0
NexusEngine commit:    481cbf6df742e81279bd42245c4238c6a1fc69f2
world id:              world:cozy-island-webgpu-v4
world seed:            cozy-island-webgpu-v2
cataloged kits:        50
runtime kit surfaces:  51
capabilities declared: 59
providers:             9
```

## Interaction loop

```txt
startup
  -> validate kitCatalog
  -> construct unregistered cozy-ocean-composition-kit
  -> initialize WebGPURenderer and choose backend/quality
  -> create legacy or Core world runtime
  -> prepare world and create compatibility snapshot
  -> construct scene, lights, separate terrains, water, clouds, fog, and foam
  -> construct hard-coded post pipeline
  -> attach browser input, resize, timers, and animation loop
  -> expose raw render graph, pass-order strings, and runtime objects

per frame
  -> sample renderer timestamp
  -> tick scenario and environment clock
  -> project camera
  -> update Core World focus
  -> animate world and foam
  -> sample adaptive performance
  -> execute physical post pipeline
  -> process bounded lazy materialization after rendering
  -> periodically project diagnostics
```

## Logical render graph

```txt
background
  reads sky-environment, lighting-state
  writes background-color, environment-reflection

opaque-world
  reads background-color, seafloor-height, lighting-state
  writes opaque-color, opaque-depth, opaque-normal, opaque-material-id

water-composite
  reads opaque-color, opaque-depth, opaque-normal,
        environment-reflection, ocean-wave-state, seafloor-height
  writes water-composited-color, water-mask, water-surface-depth

atmosphere-composite
  reads water-composited-color, opaque-depth, water-mask,
        fog-density, lighting-state
  writes atmosphere-composited-color, fog-transmittance

foam-overlay
  reads atmosphere-composited-color, water-mask,
        water-surface-depth, shoreline-distance,
        foam-state, fog-transmittance
  writes final-scene-color

output-transform
  reads final-scene-color
  writes display-color
```

## Physical render graph

```txt
scenePass
  fused background + opaque world + water
  layer mask: OPAQUE_WORLD, WATER_SURFACE, CLOUD_VOLUME
  produces one color node and one depth node

volumetricPass
  layer mask: FOG_VOLUME
  no depth buffer
  fog shader samples scenePass depth
  blurred and additively composed over scenePass

foamPass
  separate foam-only THREE.Scene
  layer mask: FOAM_OVERLAY
  depthBuffer: false
  alpha-composited over atmosphere result

output
  vec4(finalRgb, 1)
```

## Main source-backed mismatch

```txt
logical foam depth source: opaque-depth
physical foam depth buffer: disabled
foam material depth test: enabled
shared depth binding: absent

logical foam reads water-mask: yes
physical water-mask binding: absent

logical foam reads fog-transmittance: yes
physical rolling-fog transmittance binding: absent
```

The current graph validator verifies descriptor ordering and flags. It does not inspect the physical pass objects or resource attachments. The post pipeline checks `layerGraph.validation.valid` but does not derive the pipeline from `layerGraph.graph`. Both `getPassOrder()` and `getPhysicalPassOrder()` return manually maintained string arrays.

## Domains in use

```txt
browser module startup and DOM projection
kit catalog declaration and validation
render composition declaration and validation
logical/physical pass admission and resource binding
WebGPU/WebGL2 backend selection and quality policy
legacy/Core world-mode compatibility
Core World registration, focus, providers, and active cells
provider stores and lazy cell materialization
world query and compatibility render snapshot
camera rail, first-person scenario, and environment clock
island terrain, sea-floor terrain, biome, shoreline, and contact
vegetation, rocks, props, grass, paths, and campfire
ocean waves, optics, caustics, foam, and underwater atmosphere
clouds, rolling fog, weather, wind, illumination, and sky
scene layers, depth, blend, post-processing, and output transform
adaptive performance and renderer resolution
browser pointer, keyboard, resize, timers, and page lifecycle
diagnostics, static tests, browser proof, and Pages deployment
```

## Core World providers

```txt
FOUNDATION
  cozy-island-terrain-provider
  cozy-seafloor-terrain-provider

CLASSIFICATION
  biome-classification-provider
  shoreline-classification-provider
  seafloor-material-provider

POPULATION
  vegetation-provider
  rock-provider
  prop-provider

PRESENTATION
  cell-presentation-provider
```

## All implemented kits and offered services

### Catalog-admitted kits

```txt
debug-overlay-host-kit                     backend, quality, timing, volume, and kit diagnostics
webgl2-fallback-renderer-kit                deterministic CPU-volume/reduced-ray fallback
webgpu-compute-atmosphere-renderer-kit      cloud/fog 3D texture generation
webgpu-foam-renderer-kit                    shoreline ribbon geometry, animation, and material setup
webgpu-ocean-renderer-kit                   wave displacement, normals, transmission, and reflection
webgpu-performance-budget-kit               frame sampling, degrade, and recovery callbacks
webgpu-post-processing-renderer-kit         scene depth, fog composition, foam composition, output
webgpu-rolling-fog-renderer-kit              rolling-fog raymarch and depth clipping
webgpu-stylized-material-renderer-kit       island, sea-floor, vegetation, rock, prop, and grass rendering
webgpu-volumetric-cloud-renderer-kit        cloud density raymarch and horizon volumes
camera-rail-sequence-kit                    aerial rail, orbit, landing, and first-person input
cozy-island-scenario-kit                    scenario tick, camera state, reset, and render snapshot
terrain-surface-domain-kit                  island height and continuous terrain fields
vegetation-placement-domain-kit             deterministic suitability and spacing graph
aerial-perspective-domain-kit               horizon haze and exposure descriptors
campfire-atmosphere-domain-kit               fire, local light, embers, and smoke descriptors
cloud-density-field-domain-kit              cloud volume and erosion recipe
cloud-horizon-band-domain-kit               distant cloud continuation descriptors
cloud-lighting-domain-kit                   cloud illumination and extinction profile
cloud-lod-domain-kit                        cloud texture, ray-step, and termination policy
cloud-shadow-domain-kit                     projected cloud-shadow policy
cloud-weather-domain-kit                    weather/wind to cloud-state mapping
fog-advection-domain-kit                    clock/wind fog offsets and dissipation
fog-field-domain-kit                        terrain/shoreline-aware fog density recipe
fog-volume-placement-domain-kit             bounded fog-volume placement
ground-contact-domain-kit                   terrain seating and slope/burial rejection
illumination-domain-kit                     sun, sky, ambient, and exposure state
ocean-caustics-domain-kit                   caustic frequency, intensity, and attenuation
ocean-floor-profile-domain-kit              shelf, reef, and deep-floor surface
ocean-optics-domain-kit                     absorption, Fresnel, refraction, and roughness
ocean-wave-domain-kit                       deterministic multidirectional wave spectrum
prop-archetype-domain-kit                   fence, path, driftwood, clearing, and campfire descriptors
render-archetype-domain-kit                 semantic geometry/material/instancing mapping
render-quality-domain-kit                   backend, viewport, DPR, and preference quality selection
render-snapshot-domain-kit                  immutable renderer-facing domain aggregation
rock-archetype-domain-kit                   deterministic boulder/shore/reef/submerged rock graph
shoreline-field-domain-kit                  signed coast distance, wetness, breaker, and normal fields
shoreline-foam-domain-kit                   foam contours, contact bands, breakup, and decay
stylized-material-descriptor-domain-kit     palettes, shadow tints, roughness, rim, and outlines
sun-glitter-domain-kit                      view-dependent glitter-lobe descriptor
terrain-biome-field-domain-kit              blended sand, grass, soil, forest, moss, and rock weights
terrain-lod-domain-kit                      terrain density, detail, shadow, and culling policy
underwater-atmosphere-domain-kit            underwater haze, extinction, and camera thresholds
vegetation-archetype-domain-kit             tree/bush/fern/grass silhouettes and metadata
vegetation-lod-domain-kit                   near/mid/far plant policy
vegetation-wind-domain-kit                  bend, gust, stiffness, and instance phase
weather-state-domain-kit                    stable sunrise-haze weather intent
wind-field-domain-kit                       deterministic wind, gusts, and vertical turbulence
deterministic-seed-domain-kit               scoped random streams and stable identities
environment-clock-domain-kit                deterministic environment-time advancement
```

### Source-backed runtime kit outside the catalog

```txt
cozy-ocean-composition-kit
  creates the six-pass logical layer graph
  validates pass order, transparent depth writes, terrain handoff,
  final-scene pass identity, and declared reads/writes
  exposes per-layer depth/blend contracts
```

This kit is instantiated by the active host but is absent from `src/kits/catalog.js`, `docs/KIT_CATALOG.md`, the reported catalog count, and prior machine audit state.

### Render-layer helper services

```txt
COZY_RENDER_LAYERS
createLayerMask
assignRenderLayer
```

### Imported NexusEngine services used by the active Core path

```txt
createEngine
createCoreWorldDomain
createUniformGridPartition
createFlatWorldSurface
defineWorldEffectProvider
```

## Required parent domain

```txt
cozy-island-render-layer-binding-authority-domain
```

## Candidate authority kits

```txt
kit-catalog-completeness-kit
render-composition-admission-kit
logical-pass-identity-kit
physical-pass-identity-kit
render-resource-identity-kit
render-resource-production-kit
render-resource-binding-kit
fused-pass-plan-kit
pass-admission-result-kit
depth-provenance-kit
water-mask-provenance-kit
fog-transmittance-provenance-kit
foam-occlusion-policy-kit
render-graph-compile-result-kit
logical-physical-parity-result-kit
render-pass-observation-kit
first-layered-frame-receipt-kit
browser-foam-occlusion-fixture-kit
webgpu-webgl2-layer-parity-fixture-kit
```

## Required transaction

```txt
admit catalog and composition revision
  -> verify every source-backed kit is cataloged or explicitly classified
  -> compile logical passes into a physical fused-pass plan
  -> allocate named render resources and attachment identities
  -> bind each declared read to one current producer revision
  -> reject missing, stale, cyclic, or backend-unsupported bindings
  -> execute physical passes in the compiled order
  -> publish one detached pass receipt per physical pass
  -> acknowledge one visible frame with graph, binding, backend, and world revisions
```

## Required invariants

```txt
every runtime kit is cataloged or explicitly non-cataloged with a reason
every declared read resolves to one current producer or admitted external input
every depth test identifies the exact depth attachment used
fused physical passes preserve logical dependency and resource semantics
foam cannot render through opaque terrain or props
rolling fog integration has explicit transmittance or an explicit alternative contract
reported pass order is derived from the compiled execution plan
WebGPU and WebGL2 publish the same logical result schema
```

## Existing validation surface

```txt
catalog syntax and dependency validation: present
logical render-graph ordering/flag validation: present
terrain/provider separation token checks: present
hard-coded post-composition token checks: present
physical attachment inspection: absent
logical-to-physical binding parity: absent
foam/opaque occlusion browser fixture: absent
rolling-fog/foam integration fixture: absent
WebGPU/WebGL2 layered-frame parity: absent
first layered-frame receipt: absent
```

## Ordered queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. World Lifecycle Contract and Legacy/Core Mode Parity Authority
4. Render Layer Graph Admission and Physical Resource Binding Authority
5. Core World Reset / Re-prepare Authority
6. Pinned Core World Focus Transaction Authority
7. Live Materialization Readiness Commit Authority
8. Core World Render Commit Authority
9. Camera Rail Baseline Authority
10. Dynamic Environment Frame Authority
11. Adaptive Quality Transaction Authority
```
