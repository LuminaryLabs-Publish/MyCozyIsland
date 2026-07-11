# Current Audit: MyCozyIsland Browser Startup Admission Authority

Last updated: `2026-07-11T14-41-28-04-00`

## Summary

`MyCozyIsland` has a clear successful startup path, but no authoritative startup transaction. Static CDN imports are evaluated before `main()` and are outside `main().catch(fail)`. Once `main()` begins, renderer, Core World and GPU resources are allocated incrementally, but failures only update DOM text and do not roll back already-acquired resources.

The result is a split contract: module-graph failures can strand the initial loader with no application error state, while later startup failures can display an error but leave partial renderer/world resources alive. No startup ID, generation, stage journal, resource ledger, retry policy or first-frame receipt proves that the page became ready exactly once.

## Plan ledger

**Goal:** define one ordered browser-startup transaction with module admission, backend classification, rollback, retry and first-visible-frame proof.

- [x] Reconcile the complete Publish inventory with central tracking.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` as the oldest eligible repository.
- [x] Read `index.html`, `src/main-cloudform.js`, Core World runtime, renderer factories and the test entrypoint.
- [x] Identify the interaction loop, domains, implemented kits and services.
- [x] Trace every startup stage and the point at which its cleanup becomes reachable.
- [x] Define a composed startup authority domain and fixture matrix.
- [x] Change no runtime behavior.

## Runtime identity

```txt
route script:         src/main-cloudform.js?v=core-world-3
Three.js import:      0.185.0 three.webgpu.js
NexusEngine commit:   38229f59c22cb40024ffd13a9f48040de759f5d7
package version:      0.3.1
world id:             world:cozy-island-webgpu-v3
world seed:           cozy-island-webgpu-v2
default world mode:   core
rollback query mode:  ?world=legacy
local kit count:      50
Core World providers: 7
```

## Startup interaction loop

```txt
browser parses index.html
  -> import map pins Three.js and NexusEngine URLs
  -> browser fetches and evaluates main-cloudform.js graph
  -> static Three.js imports resolve before main()
  -> main() validates kit catalog
  -> construct WebGPURenderer
  -> await renderer.init()
  -> inspect renderer backend
  -> choose quality and mutate renderer settings
  -> create Core World or legacy runtime
  -> await domains.prepare()
  -> create compatibility render snapshot
  -> create scene, camera, sky and lights
  -> allocate world, ocean and foam renderers
  -> allocate or compute cloud/fog volume textures
  -> allocate cloud, fog and post-processing renderers
  -> create performance and debug services
  -> install input and resize listeners
  -> schedule loader completion timers
  -> start renderer animation loop
  -> install pagehide handler
  -> publish global CozyIsland host
```

## Domain map

```txt
browser module admission
  import map, CDN source identity, static module graph and route evaluation

startup authority
  command, transaction, generation, stage plan, results, rollback, retry and readiness

renderer backend admission
  WebGPURenderer initialization, backend detection, startup quality and fallback claims

runtime lifecycle
  renderer/world/session ownership, callbacks, stop, dispose and restart

Core World
  engine, domain, partition, surface, provider registration, focus, effects and snapshots

semantic world
  terrain, clearing, biome, shoreline, paths, population, ocean and atmosphere

environment
  deterministic seed, clock, wind, weather, illumination, clouds, fog and aerial perspective

scenario and interaction
  camera rail, wheel, drag, keys, blur reset, resize and frame tick

rendering
  sky, lights, world, ocean, foam, cloud, fog, post processing and debug projection

validation and deployment
  static Node checks, domain/world/provider/materialization/render utility tests and Pages
```

## Provider domains

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

## Services offered by the 50 local kits

```txt
determinism and time
  stable seeds, scoped RNG, environment clock, wind, weather and illumination

terrain and classification
  height, normal, slope, curvature, moisture, exposure, plateau, biome, shoreline, LOD, contact and paths

population
  vegetation, rocks, props, grass and campfire placement/archetypes

ocean and atmosphere
  floor, waves, optics, underwater, caustics, glitter, foam, clouds, fog and aerial perspective

render descriptors and adapters
  quality selection, material/archetype descriptors, snapshots, WebGPU/WebGL2 adapters, post processing and debug

scenario
  camera rail, first-person movement, input state, tick, reset and render snapshots

Core World integration
  grid partition, focus, provider order, cell lifecycle, portable snapshots, lazy materialization, query and legacy bridge

performance
  frame sampling, degrade/recover decisions, volumetric step scaling, fog-resolution scaling and pixel-ratio scaling
```

## Complete local kit inventory

```txt
debug-overlay-host-kit
webgl2-fallback-renderer-kit
webgpu-compute-atmosphere-renderer-kit
webgpu-foam-renderer-kit
webgpu-ocean-renderer-kit
webgpu-performance-budget-kit
webgpu-post-processing-renderer-kit
webgpu-rolling-fog-renderer-kit
webgpu-stylized-material-renderer-kit
webgpu-volumetric-cloud-renderer-kit
camera-rail-sequence-kit
cozy-island-scenario-kit
terrain-surface-domain-kit
vegetation-placement-domain-kit
aerial-perspective-domain-kit
campfire-atmosphere-domain-kit
cloud-density-field-domain-kit
cloud-horizon-band-domain-kit
cloud-lighting-domain-kit
cloud-lod-domain-kit
cloud-shadow-domain-kit
cloud-weather-domain-kit
fog-advection-domain-kit
fog-field-domain-kit
fog-volume-placement-domain-kit
ground-contact-domain-kit
illumination-domain-kit
ocean-caustics-domain-kit
ocean-floor-profile-domain-kit
ocean-optics-domain-kit
ocean-wave-domain-kit
prop-archetype-domain-kit
render-archetype-domain-kit
render-quality-domain-kit
render-snapshot-domain-kit
rock-archetype-domain-kit
shoreline-field-domain-kit
shoreline-foam-domain-kit
stylized-material-descriptor-domain-kit
sun-glitter-domain-kit
terrain-biome-field-domain-kit
terrain-lod-domain-kit
underwater-atmosphere-domain-kit
vegetation-archetype-domain-kit
vegetation-lod-domain-kit
vegetation-wind-domain-kit
weather-state-domain-kit
wind-field-domain-kit
deterministic-seed-domain-kit
environment-clock-domain-kit
```

## Imported NexusEngine services

```txt
createEngine
createCoreWorldDomain
createUniformGridPartition
createFlatWorldSurface
createTerrainProviderAdapter
defineWorldEffectProvider
```

## Main findings

### Static module failures bypass the route error handler

`three/webgpu`, `three/tsl` and renderer modules are static imports. If the CDN module graph fails to fetch, parse or evaluate, `main()` is never entered and `main().catch(fail)` cannot update the error panel.

### Startup has no transaction identity

There is no `startupId`, generation, expected stage, monotonic revision or typed result. The loader percentage is a presentation side effect, not an authoritative stage record.

### Partial allocation has no rollback

The renderer is initialized before Core World and all render consumers. A failure during world preparation, volume-texture creation or later renderer construction leaves earlier resources without a registered reverse cleanup stack.

### Cleanup becomes reachable too late

The `pagehide` callback is installed after the animation loop begins, and it calls only `domains.dispose()`. It does not stop the renderer loop, cancel loader timers, remove input/resize listeners, dispose the renderer or retire cloud/fog/ocean/post resources.

### Backend readiness is inferred, not admitted

The route reads `renderer.backend?.isWebGPUBackend` after `renderer.init()` and labels the other case `webgl2`. There is no candidate record, capability negotiation result, fallback reason or proof that all selected consumers support the effective backend.

### First frame is not part of startup commit

The loader is hidden by timers before any structured first-frame acknowledgement. No frame ID ties startup configuration, backend, world snapshot and render output to one ready receipt.

## Required parent domain

```txt
cozy-island-browser-startup-admission-authority-domain
```

Candidate kits:

```txt
module-source-manifest-kit
module-graph-admission-kit
startup-command-kit
startup-transaction-id-kit
startup-generation-kit
startup-stage-plan-kit
startup-stage-result-kit
renderer-backend-candidate-kit
renderer-backend-admission-kit
startup-quality-admission-kit
startup-resource-ledger-kit
startup-cleanup-stack-kit
startup-rollback-kit
startup-failure-classification-kit
loader-state-projection-kit
startup-retry-kit
first-frame-readiness-kit
startup-result-kit
startup-journal-kit
startup-observation-kit
module-fetch-failure-fixture-kit
renderer-backend-fallback-fixture-kit
partial-startup-rollback-fixture-kit
browser-startup-smoke-kit
```

## Required result shape

```txt
StartupResult {
  startupId
  generation
  status
  failedStage
  moduleManifestFingerprint
  backendCandidate
  admittedBackend
  qualityFingerprint
  acquiredResources[]
  rollbackReceipts[]
  worldRevision
  firstFrameId
  startedAt
  committedAt
  failureCode
}
```

## Existing proof surface

`npm test` checks kit metadata, source tokens, pinned import strings, world/provider behavior, lazy materialization, cell caching and renderer utility disposal. It does not execute the browser module graph, simulate CDN failure, inject renderer initialization failure, prove backend fallback, verify partial-startup rollback or capture a first-frame readiness receipt.