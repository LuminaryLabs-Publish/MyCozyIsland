# Project Breakdown: MyCozyIsland Foam Depth Proxy Authority

Timestamp: `2026-07-12T00-20-01-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

## Summary

The runtime changes after the previous render-layer audit partially close the visible foam-occlusion defect. `renderer-post.js` now creates a separate foam-depth scene, clones every current foam mesh into a depth proxy, samples that depth against the fused scene depth, and masks final foam color.

The fix is still outside the logical six-pass graph and outside a resource lifecycle. The proxy topology is captured once at pipeline construction, only transforms are synchronized per frame, the depth material and proxy scene have no disposal path, and the Node test verifies source tokens rather than submitted GPU resources or visible frames. Water-mask, water-surface-depth, and fog-transmittance remain declared logical inputs without physical bindings.

## Plan ledger

**Goal:** preserve the new depth-correct foam behavior while making proxy topology, resource ownership, pass identity, disposal, backend parity, and visible-frame proof authoritative.

- [x] Compare all 10 accessible `LuminaryLabs-Publish` repositories against central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` because its central audit was oldest and a runtime foam/camera series postdated that audit.
- [x] Inspect the active route, package tests, logical composition graph, physical post pipeline, browser host, public readback, and retained audits.
- [x] Identify the interaction loop, domains, 50 cataloged kits, one uncataloged runtime composition kit, nine Core World providers, and five imported NexusEngine services.
- [x] Record which prior finding was closed, partially closed, or remains open.
- [x] Define a DSK boundary for foam-depth proxy topology and lifecycle.
- [x] Add timestamped architecture, render, gameplay, interaction, proxy-lifecycle, and deployment audits.
- [x] Refresh required root `.agent` files and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable browser/GPU fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

MyCozyIsland       central 2026-07-11T22-20-00-04-00; runtime series at 23:14-23:17; selected
IntoTheMeadow      central 2026-07-11T23-10-51-04-00
HorrorCorridor     central 2026-07-11T23-18-16-04-00
PhantomCommand     central 2026-07-11T23-28-29-04-00
ZombieOrchard      central 2026-07-11T23-48-14-04-00
TheUnmappedHouse   central 2026-07-12T00-01-25-04-00
AetherVale         central 2026-07-12T00-10-23-04-00
PrehistoricRush    newer than the selected central entry
TheOpenAbove       newer than the selected central entry
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/MyCozyIsland` is changed in the Publish organization.

## Interaction loop

```txt
startup
  -> validate 50-entry kit catalog
  -> construct uncataloged cozy-ocean-composition-kit
  -> initialize WebGPU/WebGL2 renderer and quality
  -> prepare legacy or Core World runtime
  -> build scene, water, cloud, fog, foam and post pipeline
  -> snapshot current foam mesh membership into a depth-proxy scene
  -> install input, resize, loader timers and animation loop
  -> expose raw CozyIsland runtime objects and string pass orders

per frame
  -> tick scenario and camera
  -> update Core World focus
  -> animate world and foam source meshes
  -> copy foam group and mesh transforms into fixed proxy pairs
  -> render fused base scene and opaque depth
  -> render fog
  -> render foam depth proxy
  -> compare foam depth with scene depth
  -> mask and composite foam color
  -> process bounded materialization
  -> update diagnostics periodically

page exit
  -> domains.dispose()
  -> post pipeline, renderer, listeners, animation loop, proxy scene and proxy material remain outside that call
```

## Domains in use

```txt
browser startup, DOM loader, error and debug projection
kit catalog declaration, validation and completeness
logical render composition declaration and validation
physical pass construction, depth proxying and output composition
WebGPU/WebGL2 backend selection and quality policy
legacy/Core world lifecycle and compatibility snapshot
Core World grid, focus, providers, active cells and materialization
camera rail, first-person input, scenario and environment clock
island terrain, sea-floor terrain, biome, shoreline and contact
vegetation, rocks, props, grass, paths and campfire
ocean waves, optics, caustics, foam and underwater atmosphere
clouds, rolling fog, weather, wind, illumination and sky
render layers, depth, blend, post-processing and output transform
foam proxy topology, transform synchronization and resource lifecycle
adaptive performance, renderer resolution and debug diagnostics
browser pointer, keyboard, resize, timers, page lifecycle and public host
static tests, browser proof and Pages deployment
```

## Implemented kits and services

### Catalog-admitted kits: 50

```txt
debug-overlay-host-kit                     diagnostics projection
webgl2-fallback-renderer-kit                fallback volume/render policy
webgpu-compute-atmosphere-renderer-kit      cloud/fog texture generation
webgpu-foam-renderer-kit                    foam geometry, material and animation
webgpu-ocean-renderer-kit                   water displacement and optics
webgpu-performance-budget-kit               frame sampling, degradation and recovery
webgpu-post-processing-renderer-kit         depth, fog, foam and output composition
webgpu-rolling-fog-renderer-kit              fog raymarch and depth clipping
webgpu-stylized-material-renderer-kit       terrain/population materials
webgpu-volumetric-cloud-renderer-kit        cloud volume rendering
camera-rail-sequence-kit                    aerial rail, orbit, landing and FPS input
cozy-island-scenario-kit                    scenario state, camera and snapshots
terrain-surface-domain-kit                  continuous island surface
vegetation-placement-domain-kit             deterministic placement graph
aerial-perspective-domain-kit               haze and exposure
campfire-atmosphere-domain-kit               fire, light, embers and smoke
cloud-density-field-domain-kit              cloud density recipe
cloud-horizon-band-domain-kit               horizon continuation
cloud-lighting-domain-kit                   cloud lighting/extinction
cloud-lod-domain-kit                        texture and ray-step policy
cloud-shadow-domain-kit                     projected shadow policy
cloud-weather-domain-kit                    weather-to-cloud mapping
fog-advection-domain-kit                    fog offset and dissipation
fog-field-domain-kit                        terrain-aware fog density
fog-volume-placement-domain-kit             fog bounds
ground-contact-domain-kit                   terrain seating and rejection
illumination-domain-kit                     sun, sky and exposure
ocean-caustics-domain-kit                   caustic descriptor
ocean-floor-profile-domain-kit              shelf, reef and deep floor
ocean-optics-domain-kit                     absorption, Fresnel and refraction
ocean-wave-domain-kit                       deterministic wave spectrum
prop-archetype-domain-kit                   fence, path, driftwood and clearing
render-archetype-domain-kit                 semantic render mapping
render-quality-domain-kit                   backend/DPR quality selection
render-snapshot-domain-kit                  immutable render aggregation
rock-archetype-domain-kit                   rock graph
shoreline-field-domain-kit                  signed coast field
shoreline-foam-domain-kit                   foam contours and decay
stylized-material-descriptor-domain-kit     palettes and surface parameters
sun-glitter-domain-kit                      glitter lobe
terrain-biome-field-domain-kit              biome weights
terrain-lod-domain-kit                      terrain detail policy
underwater-atmosphere-domain-kit            underwater extinction
vegetation-archetype-domain-kit             vegetation catalog
vegetation-lod-domain-kit                   plant LOD
vegetation-wind-domain-kit                  bend and gust descriptors
weather-state-domain-kit                    stable weather intent
wind-field-domain-kit                       deterministic wind
deterministic-seed-domain-kit               scoped random streams
environment-clock-domain-kit                deterministic time
```

### Active source-backed kit outside catalog

```txt
cozy-ocean-composition-kit
  -> six-pass logical graph
  -> dependency/order validation
  -> depth/blend contracts
  -> terrain handoff validation
```

### Core World providers: 9

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

### Imported NexusEngine services: 5

```txt
createEngine
createCoreWorldDomain
createUniformGridPartition
createFlatWorldSurface
defineWorldEffectProvider
```

## Main source-backed finding

```txt
logical graph
  6 passes
  no foam-occlusion-depth pass
  foam depth source references opaque-depth
  foam reads water-mask, water-surface-depth and fog-transmittance

physical graph
  adds manual foam-occlusion-depth pass
  captures foamRenderer.meshes once
  shares source geometry and owns one new MeshDepthMaterial
  copies transforms each frame
  binds scene depth for one visibility mask
  still has no water-mask or fog-transmittance binding

lifecycle and proof
  no proxy topology revision
  no added/removed mesh reconciliation
  no proxy resource lease or dispose method
  pagehide disposes only the world domain
  pass orders remain hand-authored strings
  test checks source tokens, not GPU attachments or rendered pixels
```

## Required parent domain

```txt
cozy-island-foam-depth-proxy-authority-domain
```

Candidate kits:

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
admit composition graph and foam topology revision
  -> derive one proxy plan from current source mesh identities
  -> create or reuse proxy meshes and depth resources
  -> record geometry-sharing and material ownership explicitly
  -> synchronize current transforms under the same frame revision
  -> bind current opaque depth and publish one typed binding result
  -> execute depth and color passes
  -> acknowledge visible foam result with graph, topology, resource and frame IDs
  -> reconcile added/removed foam meshes atomically
  -> retire proxy meshes/materials/passes in reverse dependency order
```

## Validation boundary

```txt
runtime source changed by this documentation pass: no
render output changed by this documentation pass: no
package scripts changed by this documentation pass: no
dependencies changed by this documentation pass: no
deployment changed by this documentation pass: no
branch created: no
pull request created: no
npm test: not run
browser WebGPU/WebGL2 smoke: not run
proxy topology mutation fixture: unavailable
proxy disposal fixture: unavailable
visible foam frame receipt: unavailable
```
