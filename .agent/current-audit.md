# Current Audit: MyCozyIsland Browser Startup Admission and Failure Rollback

Last updated: `2026-07-11T19-20-22-04-00`

## Summary

`MyCozyIsland` performs browser startup as one sequential `main()` procedure. It has no startup transaction identity, phase model, acquisition ledger, rollback plan or first-frame commit result. `main().catch(fail)` only reports the exception in the DOM, leaving any renderer, world, scene, volume, post, callback, timer or loop ownership acquired before the failure without an authoritative cleanup path.

The Core World wrapper has a second concrete defect: `prepare()` sets `prepared = true` before `commitFocus()` succeeds. A thrown focus/provider update can leave the runtime reporting prepared while `worldSnapshot` is null, and a retry can immediately return that null state without attempting preparation again.

## Plan ledger

**Goal:** define one startup authority that admits configuration, records every acquired capability, commits only after a valid first frame, and restores a retryable baseline on failure.

- [x] Compare the full Publish inventory and exclude `TheCavalryOfRome`.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` through the oldest eligible central rule.
- [x] Read the active browser route, world runtime, package scripts and retained audits.
- [x] Trace startup from catalog validation through global-host publication.
- [x] Identify all active domains, providers, kits and services.
- [x] Identify partial resource leakage and poisoned world prepare state.
- [x] Define startup transaction, acquisition ledger, rollback and retry contracts.
- [x] Define first-frame and phase-failure fixture gates.
- [x] Change documentation only.
- [ ] Implement and execute startup authority.

## Runtime identity

```txt
route:                index.html -> src/main-cloudform.js?v=core-world-3
package:              0.3.1
Three.js:             0.185.0
NexusEngine commit:   38229f59c22cb40024ffd13a9f48040de759f5d7
world id:             world:cozy-island-webgpu-v3
local kits:           50
providers:            7
startup owner:        main() procedural control flow
error owner:          fail(error) DOM projection only
```

## Interaction loop

```txt
module boot
  -> resolve DOM nodes
  -> validate catalog
  -> construct/init renderer
  -> select backend, quality and world mode
  -> create Core World runtime and providers
  -> prepare initial world
  -> create snapshot, scene, camera, sky and lights
  -> create world/ocean/foam renderers
  -> create atmosphere textures
  -> create cloud/fog renderers and post pipeline
  -> create performance budget
  -> install listeners and timers
  -> install animation loop and pagehide callback
  -> publish CozyIsland host

startup error
  -> main rejects
  -> fail(error) logs and displays text
  -> no rollback or retry result
```

## Domains in use

```txt
browser startup and DOM projection
catalog, query-mode and pinned-import admission
renderer backend initialization and quality selection
Core World construction, provider registration, focus and prepare
runtime startup/session lifecycle
lazy materialization and world query
camera rail, first-person input and scenario
terrain, biome, shoreline, ground contact and paths
vegetation, rock, prop, grass and campfire population
ocean, foam, caustics and underwater state
clouds, fog, weather, wind, illumination and aerial perspective
scene graph, GPU resources and post processing
performance sampling and adaptive quality
browser listeners, pointer capture, resize and timers
animation-loop and first-frame ownership
diagnostics, tests and Pages deployment
```

## Providers

```txt
FOUNDATION:      cozy-island-terrain-provider
CLASSIFICATION:  biome-classification-provider
                 shoreline-classification-provider
POPULATION:      vegetation-provider
                 rock-provider
                 prop-provider
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
startup transaction ID: absent
startup lifecycle phase: absent
config/import admission result: absent
acquisition ledger: absent
capability identities and dependency graph: absent
partial-failure rollback: absent
reverse-order retirement: absent
rollback receipts: absent
retry eligibility/result: absent
first-frame startup commit: absent
production startup failure injection: absent
```

### Partial ownership path

```txt
renderer/world/resources acquired
  -> later constructor or first render throws
  -> fail(error) changes only DOM text
  -> acquired browser/GPU/semantic ownership remains unretired
```

### Poisoned prepare path

```txt
prepare()
  -> prepared = true
  -> commitFocus throws
  -> worldSnapshot remains null
  -> later prepare returns null because prepared is already true
```

## Required parent domain

```txt
cozy-island-browser-startup-authority-domain
```

Candidate kits:

```txt
startup-transaction-id-kit
startup-phase-kit
startup-config-admission-kit
pinned-import-admission-kit
backend-init-result-kit
startup-acquisition-ledger-kit
startup-capability-lease-kit
world-prepare-transaction-kit
startup-resource-descriptor-kit
startup-callback-lease-kit
first-frame-readiness-kit
startup-commit-result-kit
startup-failure-result-kit
startup-rollback-plan-kit
reverse-order-retirement-kit
retry-baseline-kit
startup-observation-kit
startup-journal-kit
startup-failure-injection-fixture-kit
browser-backend-startup-smoke-kit
```

## Required startup transaction

```txt
StartCommand
  -> validate catalog, DOM, query mode and pinned imports
  -> create transaction and enter STARTING
  -> acquire capabilities one by one into a ledger
  -> prepare world through atomic candidate/commit semantics
  -> install callbacks and loop under recorded leases
  -> render first valid frame
  -> publish StartupCommitResult and enter RUNNING

failure
  -> freeze acquisition
  -> classify failed phase
  -> retire acquired capabilities in reverse dependency order
  -> restore prepared=false and clean public baseline
  -> publish StartupFailureResult and rollback receipts
  -> permit retry only after mandatory lease count reaches zero
```

## Required fixtures

```txt
catalog/backend/import failure
Core World creation/provider registration failure
initial focus/world update failure
materializer sync failure
world/ocean/foam renderer failure
volume/cloud/fog/post failure
callback/timer/loop failure
first-frame failure
rollback order and exactly-once retirement
prepare failure then clean retry
no global host before commit
WebGPU/WebGL2 result parity
first committed frame parity
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

Startup authority remains first because every runtime session, world revision, callback lease, resource identity and committed frame must originate from a successfully admitted startup transaction.
