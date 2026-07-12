# Current Audit: MyCozyIsland World Lifecycle Contract and Mode Parity

Last updated: `2026-07-11T20-51-14-04-00`

## Summary

`MyCozyIsland` exposes the same public world-runtime shape in legacy and Core modes, but the lifecycle semantics are incompatible. Legacy `reset()` and `dispose()` only clear `prepared` and remain reversible. Core `reset()` clears Core World definitions and provider coordination, while Core `dispose()` also resets the domain. The wrapper still exposes methods, engine, providers and query state without a `DISPOSED` phase or terminal rejection policy.

## Plan ledger

**Goal:** define one explicit lifecycle contract across both modes, with authoritative phase, generation, reusable reset, terminal disposal, read-model leases and typed operation results.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Skip actively changing `PrehistoricRush`.
- [x] Select only `MyCozyIsland` as the oldest stable eligible repository.
- [x] Read `src/main-cloudform.js`, `src/world/world-runtime.js`, package tests and retained audits.
- [x] Trace prepare, focus, materialization, reset, dispose, query and global readback.
- [x] Identify all active domains, 50 local kits, six imported services and seven providers.
- [x] Define lifecycle commands, results, phases, generations, leases and fixture gates.
- [x] Change documentation only.
- [ ] Implement and execute lifecycle parity authority.

## Runtime identity

```txt
route:                index.html -> src/main-cloudform.js?v=core-world-3
package:              0.3.1
Three.js:             0.185.0
NexusEngine commit:   38229f59c22cb40024ffd13a9f48040de759f5d7
world id:             world:cozy-island-webgpu-v3
local kits:           50
providers:            7
default world mode:   core
fallback mode:        legacy
```

## Interaction loop

```txt
startup
  -> choose mode from URL
  -> create legacy or Core wrapper
  -> prepare
  -> create one compatibility snapshot
  -> build persistent scene/render resources
  -> install loop and expose CozyIsland host

per frame
  -> scenario tick
  -> camera projection
  -> updateWorldFocus
  -> render compatibility graph
  -> process materialization

pagehide
  -> domains.dispose()
  -> global host and renderer ownership are not revoked by this call
```

## Lifecycle comparison

| Operation | Legacy mode | Core mode |
|---|---|---|
| `prepare()` | sets `prepared=true`, returns static snapshot | focuses registered world, updates 49 cells |
| duplicate `prepare()` | returns static snapshot | returns current `worldSnapshot`, including possible null poison state |
| `reset()` | sets `prepared=false` | calls `resetWorlds()`, resets materializer, clears wrapper fields |
| `dispose()` | same as reset | reset plus Core World domain reset |
| prepare after reset/dispose | accepted | definition/domain may be gone; no stable recovery contract |
| terminal state | absent | absent |
| generation | absent | absent |
| typed results | absent | absent |

## Domains in use

```txt
browser module startup and DOM projection
world-mode selection and compatibility API
world lifecycle phase, generation and command admission
legacy semantic composition and snapshot
Core World registration, focus, providers and active cells
provider runtime stores and lazy materialization
world query, diagnostics and public read models
camera rail, first-person scenario and environment clock
terrain, biome, shoreline, contact and paths
vegetation, rocks, props, grass and campfire
ocean, foam, caustics and underwater state
clouds, fog, weather, wind and illumination
scene graph, render resources and post processing
performance sampling and adaptive quality
browser listeners, timers, animation loop and page lifecycle
validation, tests and Pages deployment
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
canonical lifecycle phase: absent
world generation: absent
legacy/Core semantic parity: absent
reusable reset contract: absent
terminal dispose contract: absent
prepare/reset/dispose result schema: absent
use-after-dispose rejection: absent
query and diagnostics leases: absent
stale-generation rejection: absent
world-generation/frame correlation: absent
```

The immediate source-backed contradiction is:

```txt
legacy dispose -> reversible prepared flag
core dispose   -> world/domain teardown
same API       -> no phase or result explaining the difference
```

## Required parent domain

```txt
cozy-island-world-lifecycle-contract-authority-domain
```

Candidate kits:

```txt
world-lifecycle-phase-kit
world-runtime-generation-kit
world-mode-contract-kit
world-lifecycle-command-kit
world-lifecycle-admission-kit
world-prepare-result-kit
world-reset-policy-kit
world-reset-result-kit
world-dispose-result-kit
world-definition-lease-kit
world-query-lease-kit
world-diagnostics-lease-kit
provider-materializer-retirement-kit
stale-world-generation-rejection-kit
terminal-use-after-dispose-rejection-kit
legacy-core-lifecycle-adapter-kit
world-lifecycle-observation-kit
world-lifecycle-journal-kit
world-mode-parity-fixture-kit
world-use-after-dispose-fixture-kit
browser-world-lifecycle-smoke-kit
```

## Required lifecycle

```txt
NEW -> Prepare -> READY generation N
READY -> Reset -> RESET
RESET -> Prepare -> READY generation N+1
NEW/READY/RESET/FAILED -> Dispose -> DISPOSED
DISPOSED -> any mutation -> RejectedTerminal
```

## Required fixtures

```txt
legacy/Core result-schema parity
duplicate prepare idempotency
reset then prepare generation advance
duplicate dispose idempotency
post-dispose command rejection
stale query lease rejection
provider/materializer retirement counts
first READY frame after reusable reset
pagehide global readback revocation
```

## Ordered queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. World Lifecycle Contract and Legacy/Core Mode Parity Authority
4. Core World Reset / Re-prepare Authority
5. Pinned Core World Focus Transaction Authority
6. Live Materialization Readiness Commit Authority
7. Core World Render Commit Authority
8. Camera Rail Baseline Authority
9. Dynamic Environment Frame Authority
10. Adaptive Quality Transaction Authority
```
