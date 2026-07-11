# Project Breakdown: MyCozyIsland Runtime Session Lifecycle

Timestamp: `2026-07-11T17-50-37-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Branch: `main`

## Summary

`MyCozyIsland` was selected after the full accessible `LuminaryLabs-Publish` inventory was compared against the central ledger. Every eligible repository was already tracked and had root `.agent` state, so the oldest documented-selection rule applied.

The current route creates one renderer, world runtime, scene graph, post pipeline, volume textures, animation loop, timers, global object and several anonymous browser listeners. On `pagehide`, it only calls `domains.dispose()`. The animation loop is not stopped, listeners and timers are not retired, render resources are not disposed, the global object is not cleared, and there is no `pageshow` restart policy. A bfcache restore can therefore resume callbacks against a world runtime that was reset during `pagehide`.

## Plan ledger

**Goal:** identify the full interaction, domain, kit and service graph, then define one session-owned stop, dispose and restart transaction before later world, frame and adaptive-quality authority depends on runtime identity.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries.
- [x] Confirm all nine eligible repositories have root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` as the oldest eligible entry.
- [x] Read the route host, world runtime, renderer factories, package tests and retained audits.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all 50 implemented kits and their offered services.
- [x] Trace animation-loop, listener, timeout, GPU-resource, Core World and global-object ownership.
- [x] Define the runtime-session lifecycle authority domain and fixture gate.
- [x] Change documentation only.
- [x] Push directly to `main` without creating a branch or pull request.
- [ ] Runtime lifecycle implementation and executable browser fixtures remain future work.

## Repository comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

MyCozyIsland       2026-07-11T16-10-58-04-00 selected
TheOpenAbove       2026-07-11T16-30-25-04-00
HorrorCorridor     2026-07-11T16-38-10-04-00
PhantomCommand     2026-07-11T16-49-51-04-00
ZombieOrchard      2026-07-11T17-01-11-04-00
TheUnmappedHouse   2026-07-11T17-10-50-04-00
AetherVale         2026-07-11T17-20-20-04-00
IntoTheMeadow      2026-07-11T17-30-56-04-00
PrehistoricRush    2026-07-11T17-39-47-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/MyCozyIsland` was changed in the Publish organization.

## Interaction loop

```txt
module evaluation
  -> query DOM nodes
  -> call main()

main startup
  -> validate 50-kit catalog
  -> create and initialize WebGPURenderer
  -> choose backend and startup quality
  -> create Core World runtime and prepare initial focus
  -> create scene, sky, lights and camera
  -> create world, ocean, foam, volume, cloud, fog and post resources
  -> create performance budget and debug overlay
  -> install anonymous wheel, pointer, keyboard, blur and resize listeners
  -> schedule loader timers
  -> install renderer.setAnimationLoop(callback)
  -> install one pagehide callback
  -> publish raw live resources through globalThis.CozyIsland

one animation callback
  -> derive frame delta
  -> tick scenario
  -> update camera and world focus
  -> update world and foam presentation
  -> sample adaptive performance
  -> render post pipeline
  -> materialize cells
  -> periodically update diagnostics

pagehide today
  -> domains.dispose()
  -> Core World and materializer reset
  -> animation loop remains registered
  -> browser listeners remain installed
  -> loader timers remain untracked
  -> scene, GPU and post resources remain live
  -> globalThis.CozyIsland retains references
  -> no pageshow resume or restart transaction
```

## Domains in use

```txt
browser module and DOM startup
backend selection and startup quality
runtime session and page lifecycle
animation-loop ownership and frame sampling
browser input and resize adapters
loader timeout ownership
Core World registration, providers, focus and reset
lazy cell materialization
camera rail and first-person scenario
semantic terrain, classification and population
ocean, foam, cloud, fog and illumination
Three.js scene graph and GPU resource ownership
post-processing and render submission
adaptive performance and quality callbacks
debug diagnostics and global readback
validation and Pages deployment
missing stop, dispose, restart and stale-callback authority
```

## Providers

```txt
FOUNDATION
  cozy-island-terrain-provider

CLASSIFICATION
  biome-classification-provider
  shoreline-classification-provider

POPULATION
  vegetation-provider
  rock-provider
  prop-provider

PRESENTATION
  cell-presentation-provider
```

## Implemented kits and offered services

```txt
debug-overlay-host-kit                     backend, quality, FPS, volumetric and kit-count projection
webgl2-fallback-renderer-kit                deterministic CPU-volume and reduced-ray fallback policy
webgpu-compute-atmosphere-renderer-kit      cloud/fog storage-texture generation and compute submission
webgpu-foam-renderer-kit                    shoreline foam geometry and animated presentation
webgpu-ocean-renderer-kit                   wave displacement, normals and ocean material presentation
webgpu-performance-budget-kit               frame sampling, pressure counters and quality-level callbacks
webgpu-post-processing-renderer-kit         scene/depth/fog composition, denoise and final output
webgpu-rolling-fog-renderer-kit              depth-aware rolling-fog volume and mutable ray steps
webgpu-stylized-material-renderer-kit       terrain, seabed, vegetation, rock, prop, path and campfire presentation
webgpu-volumetric-cloud-renderer-kit        bounded cloud raymarching and mutable step counts
camera-rail-sequence-kit                    aerial rail, first-person transition and input state
cozy-island-scenario-kit                    scenario tick, reset and render snapshot composition
terrain-surface-domain-kit                  height, slope, curvature, moisture, exposure and coast fields
vegetation-placement-domain-kit             deterministic biome/slope/clearing-aware placement
aerial-perspective-domain-kit               haze, horizon blend, extinction and exposure descriptors
campfire-atmosphere-domain-kit               fire, local light, embers and wind-reactive smoke descriptors
cloud-density-field-domain-kit              cloud volume, noise, erosion and density recipe
cloud-horizon-band-domain-kit               distant low-cost cloud descriptors
cloud-lighting-domain-kit                   top, underside, silver-lining and extinction lighting
cloud-lod-domain-kit                        volume size, ray steps, termination and horizon policy
cloud-shadow-domain-kit                     projected shadow scale, opacity, motion and cadence
cloud-weather-domain-kit                    weather-to-cloud coverage, altitude, depth and drift
fog-advection-domain-kit                    wind/clock-derived fog offset, curl and dissipation
fog-field-domain-kit                        fog density, height, shore concentration and quality recipe
fog-volume-placement-domain-kit             bounded lowland, shore and ocean fog placement
ground-contact-domain-kit                   terrain seating and slope/burial rejection
illumination-domain-kit                     deterministic sun, sky, ambient and exposure state
ocean-caustics-domain-kit                   caustic projection frequency, intensity and attenuation
ocean-floor-profile-domain-kit              shelf, submerged mound, reef and deep-floor surface
ocean-optics-domain-kit                     absorption, Fresnel, refraction, roughness and clearcoat
ocean-wave-domain-kit                       multidirectional wave spectrum for displacement and consumers
prop-archetype-domain-kit                   fence, driftwood, path, clearing and campfire descriptors
render-archetype-domain-kit                 semantic type to geometry/material/shadow/instance mapping
render-quality-domain-kit                   backend/capability-driven immutable startup quality
render-snapshot-domain-kit                  immutable world and presentation descriptor aggregation
rock-archetype-domain-kit                   deterministic boulder, shore, reef and submerged rocks
shoreline-field-domain-kit                  signed distance, wetness, breakers, normals and contact
shoreline-foam-domain-kit                   breaker contours, contact foam, advection and decay
stylized-material-descriptor-domain-kit     palette, shadow tint, roughness, rim and outline classes
sun-glitter-domain-kit                      view-dependent wave-normal glitter descriptor
terrain-biome-field-domain-kit              blended sand, grass, soil, forest, moss and rock weights
terrain-lod-domain-kit                      terrain density, detail, shadows and culling policy
underwater-atmosphere-domain-kit            underwater haze, color shift, extinction and thresholds
vegetation-archetype-domain-kit             plant silhouettes, scale, canopy, wind and LOD metadata
vegetation-lod-domain-kit                   near, mid, impostor and cull-distance policy
vegetation-wind-domain-kit                  bend, gust, stiffness and per-instance phase
weather-state-domain-kit                    stable sunrise-haze atmosphere and precipitation intent
wind-field-domain-kit                       shared deterministic wind, gust and turbulence
deterministic-seed-domain-kit               scoped RNG, stable identity and reproducible hashes
environment-clock-domain-kit                deterministic environment-time advancement
```

Imported NexusEngine services:

```txt
createEngine
createCoreWorldDomain
createUniformGridPartition
createFlatWorldSurface
createTerrainProviderAdapter
defineWorldEffectProvider
```

## Main finding

```txt
pagehide
  -> domains.dispose()
  -> world prepared=false and snapshots/materialization reset
  -> renderer animation callback still owns references to domains
  -> renderer and scene resources are not retired
  -> anonymous listeners cannot be removed by the current host
  -> global readback still exposes disposed/live mixed state

possible bfcache pageshow
  -> existing page object resumes
  -> no explicit resume or restart policy
  -> animation callback may continue against reset world state
  -> pagehide listener was once-only and is no longer available
```

Additional source-backed gaps:

```txt
runtime session ID: absent
session generation: absent
lifecycle state machine: absent
animation-loop lease: absent
stop result: absent
resource inventory: absent
listener registry: absent
timeout registry: absent
stale callback fence: absent
render-resource disposal contract: absent
renderer.setAnimationLoop(null): absent
renderer.dispose(): absent
post-pipeline disposal: absent
volume-texture disposal: absent
scene traversal retirement: absent
global readback revocation: absent
pageshow policy: absent
restart transaction: absent
first restarted frame receipt: absent
bounded lifecycle journal: absent
```

## Required parent domain

```txt
cozy-island-runtime-session-lifecycle-authority-domain
```

Candidate coordinating kits:

```txt
runtime-session-id-kit
runtime-session-generation-kit
runtime-lifecycle-state-kit
lifecycle-command-envelope-kit
lifecycle-command-admission-kit
animation-loop-lease-kit
page-lifecycle-adapter-kit
bfcache-policy-kit
event-listener-registry-kit
timeout-registry-kit
renderer-resource-registry-kit
scene-resource-inventory-kit
stale-callback-fence-kit
runtime-stop-transaction-kit
runtime-dispose-transaction-kit
core-world-retirement-adapter-kit
gpu-resource-retirement-kit
global-readback-revocation-kit
runtime-restart-transaction-kit
lifecycle-result-kit
lifecycle-journal-kit
first-restarted-frame-ack-kit
runtime-lifecycle-fixture-kit
browser-pagehide-pageshow-smoke-kit
```

## Required lifecycle transaction

```txt
StopCommand(sessionId, generation)
  -> reject stale or duplicate command
  -> move running -> stopping
  -> revoke new frame/input/quality/world work
  -> renderer.setAnimationLoop(null)
  -> fence queued callbacks by generation
  -> cancel tracked timers
  -> remove tracked listeners
  -> publish stopped result

DisposeCommand(sessionId, generation)
  -> require stopped or perform stop first
  -> dispose post passes and render targets
  -> dispose volume textures and compute-owned resources
  -> traverse scene and retire geometries, materials and textures once
  -> dispose renderer and backend resources
  -> dispose Core World/materializer/scenario ownership
  -> clear global readback
  -> publish resource-retirement receipts
  -> move disposing -> disposed

RestartCommand(previousSessionId)
  -> create new sessionId and generation
  -> rebuild admitted startup graph
  -> install one listener/timer/loop set
  -> prepare world and first render plan
  -> commit one first-restarted-frame receipt
  -> move starting -> running
```

## Repo-local output

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

Added:

```txt
.agent/trackers/2026-07-11T17-50-37-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T17-50-37-04-00.md
.agent/architecture-audit/2026-07-11T17-50-37-04-00-runtime-session-lifecycle-authority-dsk-map.md
.agent/render-audit/2026-07-11T17-50-37-04-00-pagehide-gpu-resource-retirement-gap.md
.agent/gameplay-audit/2026-07-11T17-50-37-04-00-pagehide-pageshow-world-session-loop.md
.agent/interaction-audit/2026-07-11T17-50-37-04-00-page-lifecycle-command-admission-map.md
.agent/runtime-lifecycle-audit/2026-07-11T17-50-37-04-00-stop-dispose-restart-ownership-contract.md
.agent/deploy-audit/2026-07-11T17-50-37-04-00-runtime-lifecycle-browser-fixture-gate.md
```

## Validation

```txt
runtime source changed: no
rendering changed: no
package scripts changed: no
dependencies changed: no
deployment configuration changed: no
branch created: no
pull request created: no
npm test: not run
browser/WebGPU smoke: not run
pagehide/pageshow smoke: absent
resource-retirement fixture: absent
restart fixture: absent
```
