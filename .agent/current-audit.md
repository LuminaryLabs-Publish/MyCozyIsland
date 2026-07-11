# Current Audit: MyCozyIsland Runtime Session Lifecycle Authority

Last updated: `2026-07-11T17-50-37-04-00`

## Summary

`MyCozyIsland` constructs one browser runtime in `main()`, but no parent authority owns it as a session. The route creates a renderer loop, browser listeners, loader timers, Core World state, scenario state, scene resources, volume textures, post processing, quality callbacks and a raw global readback.

The once-only `pagehide` handler calls only `domains.dispose()`. This resets Core World and materialization state, but it does not stop rendering, remove listeners, cancel timers, retire render resources, clear input/scenario state or revoke `globalThis.CozyIsland`. A persisted page can therefore resume with retained render/scenario state and a reset world runtime.

## Plan ledger

**Goal:** define one runtime session identity and lifecycle transaction across browser events, callbacks, world state, scene/GPU resources, diagnostics and restart evidence.

- [x] Compare the full Publish inventory and exclude Cavalry of Rome.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` through the oldest eligible rule.
- [x] Read the browser route, world runtime, renderer factories, tests and retained audits.
- [x] Trace startup, animation, input, resize, timers and page lifecycle behavior.
- [x] Identify all active domains, providers, kits and services.
- [x] Identify the mixed-session pagehide/pageshow defect.
- [x] Define session, generation, ownership, retirement and restart contracts.
- [x] Change documentation only.
- [ ] Implement and execute the lifecycle authority.

## Runtime identity

```txt
route:                src/main-cloudform.js?v=core-world-3
package:              0.3.1
Three.js:             0.185.0
NexusEngine commit:   38229f59c22cb40024ffd13a9f48040de759f5d7
world id:             world:cozy-island-webgpu-v3
local kits:           50
providers:            7
animation owner:      WebGPURenderer.setAnimationLoop
page exit behavior:   domains.dispose() only
```

## Interaction loop

```txt
startup
  -> validate catalog
  -> create renderer and quality
  -> create/prepare world runtime
  -> create scene, camera, sky and lights
  -> create world, ocean, foam, cloud, fog and post resources
  -> install browser listeners and loader timers
  -> start animation loop
  -> install pagehide callback
  -> publish global readback

frame
  -> sample dt
  -> tick scenario
  -> update camera and world focus
  -> update presentation
  -> sample performance
  -> render post pipeline
  -> process materialization
  -> update diagnostics

pagehide
  -> domains.dispose()
  -> world/materializer reset
  -> loop, listeners, timers, render resources and global references remain
```

## Domains in use

```txt
browser startup and DOM projection
renderer backend and startup quality
runtime session and page lifecycle
animation-loop and frame ownership
input, resize, pointer capture and loader timing
Core World registration, providers, focus, reset and diagnostics
lazy materialization and query
camera rail, first-person scenario and environment clock
terrain, biome, shoreline, contact and paths
vegetation, rock, prop, grass and campfire population
ocean, foam, caustics and underwater state
clouds, fog, weather, wind, illumination and aerial perspective
scene graph, GPU resources and post processing
adaptive performance and quality mutation
debug readback, validation and Pages deployment
```

## Providers

```txt
FOUNDATION:      cozy-island-terrain-provider
CLASSIFICATION:  biome-classification-provider, shoreline-classification-provider
POPULATION:      vegetation-provider, rock-provider, prop-provider
PRESENTATION:    cell-presentation-provider
```

## All implemented kits and offered services

```txt
debug-overlay-host-kit                     diagnostics projection
webgl2-fallback-renderer-kit                CPU-volume and reduced-ray fallback
webgpu-compute-atmosphere-renderer-kit      cloud/fog volume generation
webgpu-foam-renderer-kit                    shoreline foam rendering
webgpu-ocean-renderer-kit                   wave displacement and ocean shading
webgpu-performance-budget-kit               frame sampling and quality callbacks
webgpu-post-processing-renderer-kit         scene/depth/fog final composition
webgpu-rolling-fog-renderer-kit              depth-aware fog and step control
webgpu-stylized-material-renderer-kit       world geometry/material presentation
webgpu-volumetric-cloud-renderer-kit        cloud raymarch and step control
camera-rail-sequence-kit                    rail, first-person transition and input
cozy-island-scenario-kit                    scenario tick, reset and snapshots
terrain-surface-domain-kit                  height and terrain fields
vegetation-placement-domain-kit             deterministic placement graph
aerial-perspective-domain-kit               haze and horizon descriptors
campfire-atmosphere-domain-kit               fire, embers and smoke descriptors
cloud-density-field-domain-kit              cloud density recipe
cloud-horizon-band-domain-kit               distant cloud descriptors
cloud-lighting-domain-kit                   cloud lighting profile
cloud-lod-domain-kit                        cloud resolution and step policy
cloud-shadow-domain-kit                     projected cloud shadow policy
cloud-weather-domain-kit                    weather-to-cloud mapping
fog-advection-domain-kit                    wind/clock fog motion
fog-field-domain-kit                        fog density recipe
fog-volume-placement-domain-kit             bounded fog placement
ground-contact-domain-kit                   terrain seating and rejection
illumination-domain-kit                     sun, sky, ambient and exposure
ocean-caustics-domain-kit                   caustic descriptor
ocean-floor-profile-domain-kit              shelf, reef and floor surface
ocean-optics-domain-kit                     absorption, Fresnel and refraction
ocean-wave-domain-kit                       multidirectional wave spectrum
prop-archetype-domain-kit                   prop descriptor graph
render-archetype-domain-kit                 semantic render mapping
render-quality-domain-kit                   startup quality selection
render-snapshot-domain-kit                  immutable render aggregation
rock-archetype-domain-kit                   deterministic rock graph
shoreline-field-domain-kit                  coast distance and breaker fields
shoreline-foam-domain-kit                   foam contours and decay
stylized-material-descriptor-domain-kit     palette and material classes
sun-glitter-domain-kit                      view-dependent glitter descriptor
terrain-biome-field-domain-kit              blended biome weights
terrain-lod-domain-kit                      terrain detail and culling policy
underwater-atmosphere-domain-kit            underwater haze and thresholds
vegetation-archetype-domain-kit             plant silhouettes and metadata
vegetation-lod-domain-kit                   vegetation LOD policy
vegetation-wind-domain-kit                  wind bend and gust response
weather-state-domain-kit                    stable weather intent
wind-field-domain-kit                       deterministic wind and turbulence
deterministic-seed-domain-kit               scoped RNG and stable identity
environment-clock-domain-kit                deterministic environment time
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

## Main findings

```txt
runtime session ID: absent
session generation: absent
lifecycle state machine: absent
animation-loop lease and explicit stop: absent
listener identity/removal registry: absent
timeout ownership/cancellation: absent
persisted pagehide/pageshow policy: absent
stale callback fence: absent
scene/post/volume/renderer retirement transaction: absent
global readback revocation: absent
restart transaction and first new frame receipt: absent
```

Source-backed mixed-state path:

```txt
running page
  -> pagehide calls domains.dispose()
  -> Core World prepared=false and materializer reset
  -> renderer callback and scenario remain retained
  -> potential bfcache resume has no pageshow admission
  -> frame work can continue against reset world state
```

The whole-island compatibility renderer can hide this split because it retains the startup snapshot. A future cell-aware renderer would expose stale or missing content more directly.

## Required parent domain

```txt
cozy-island-runtime-session-lifecycle-authority-domain
```

Candidate kits:

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
StopCommand
  -> admit session/generation/state
  -> revoke new frame/input/world/quality work
  -> renderer.setAnimationLoop(null)
  -> fence old callbacks
  -> release pointer state and clear input
  -> cancel timers and remove listeners
  -> publish stopped result

DisposeCommand
  -> stop first when needed
  -> inventory and retire post/volume/scene/renderer resources
  -> dispose Core World, providers and materializer
  -> reset scenario/input ownership
  -> revoke global readback
  -> publish retirement receipts and final fingerprint

RestartCommand
  -> create new sessionId/generation
  -> run admitted startup construction
  -> install one listener/timer/loop set
  -> prepare world and scenario baseline
  -> render and acknowledge first new-generation frame
```

## Required fixtures

```txt
one animation-loop lease per running session
stop during frame work
late input/resize/timer rejection
persisted pagehide/pageshow
non-persisted pagehide disposal
duplicate stop and dispose
resource retirement counts and exactly-once disposal
Core World/materializer retirement
restart generation monotonicity
old generation cannot update new observation
first resumed/restarted frame generation parity
WebGPU and WebGL2 lifecycle parity
```

## Ordered queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. Core World Reset / Re-prepare Authority
4. Pinned Core World Focus Transaction Authority
5. Live Materialization Readiness Commit Authority
6. Core World Render Commit Authority
7. Camera Rail Baseline Authority
8. Dynamic Environment Frame Authority
9. Adaptive Quality Transaction Authority
```

Runtime session lifecycle remains second because every downstream command, world revision, materialization job, quality transition and frame receipt needs a stable live-session identity and stale-work fence.