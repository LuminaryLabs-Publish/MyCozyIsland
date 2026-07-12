# Current Audit: MyCozyIsland Camera Rail Baseline Authority

Last updated: `2026-07-12T02-10-14-04-00`

## Summary

The active camera rail is not an immutable authored path. `createCameraRailSequence()` creates mutable `railPositions` point objects once, and rail-mode drag directly increments every point's `x` coordinate. The same sequence's `reset()` restores progress, yaw, pitch, pressed keys, and player position, but leaves the mutated rail points unchanged.

This means reset does not reproduce the initial camera path. Repeated rail drags can accumulate hidden path drift for the lifetime of the sequence. The camera descriptor exposes mode, progress, FOV, position, and look target, but no baseline identity, path revision, reset generation, command result, or visible-frame receipt.

## Plan ledger

**Goal:** document one authoritative path from immutable authored camera data through browser input, rail sampling, first-person handoff, reset, replay, diagnostics, and the first visible camera frame.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `MyCozyIsland` as the oldest fully synchronized eligible repository.
- [x] Inspect browser event adapters, camera sequence source, scenario tick/reset, public host readback, package tests, and retained audits.
- [x] Identify the complete interaction loop, active domains, 50 cataloged kits, one extra runtime kit, nine providers, and five imported services.
- [x] Confirm pre-threshold drag mutates rail point coordinates in place.
- [x] Confirm sequence reset does not restore or rebuild the rail point array.
- [x] Confirm current tests omit reset fidelity, repeated-drift, command admission, and visible-frame proof.
- [x] Define camera baseline, command, result, revision, journal, and fixture contracts.
- [x] Change documentation only.
- [ ] Implement and run the camera fidelity fixtures.

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
  -> create terrain-dependent railPositions and railLooks
  -> initialize progress = 0.14
  -> initialize yaw = 0 and pitch = -0.05
  -> initialize player at the clearing
  -> install wheel, pointer, keyboard and blur adapters

wheel
  -> browser deltaY enters input.wheel
  -> progress changes immediately
  -> no command ID, sequence, result, or stale rejection

pointer drag
  -> browser pointer delta enters input.drag
  -> yaw and pitch change immediately
  -> while progress < 0.985, each rail position x changes in place
  -> no admitted orbit plan or path revision is published

frame
  -> scenario.tick advances clock and first-person movement
  -> scenario.getRenderSnapshot reads cameraSequence.descriptor
  -> host copies descriptor position, lookAt, and FOV to Three.js camera
  -> frame renders without camera-state or baseline identity

reset
  -> scenario.reset calls clock.reset and cameraSequence.reset
  -> progress, yaw, pitch, keys, and player position reset
  -> railPositions and railLooks are not reconstructed
  -> next frame can show reset progress on a previously mutated rail
```

## Source-backed camera state

```txt
initial progress:                0.14
first-person threshold:          0.985
rail FOV:                        55 -> 80
first-person FOV:                80
player eye height:               2
rail position count:             8
rail look-target count:          8
rail point mutation during drag: yes
rail look-target mutation:       no
reset restores rail points:      no
reset returns a typed result:    no
```

## Main source-backed finding

During rail mode, drag computes:

```txt
orbitInfluence = clamp(deltaX * 0.00008, -0.035, 0.035)
point.x += orbitInfluence * abs(point.z) * 0.02
```

The authored points are therefore permanently changed inside the sequence. The furthest point receives the largest displacement because the mutation is weighted by `abs(z)`. The mutation is cumulative across pointer events and survives `reset()`.

The sequence resets only:

```txt
progress
yaw
pitch
pressed keys
player position
```

It does not reset:

```txt
railPositions
railLooks
rail baseline identity
rail path revision
input sequence
reset generation
```

## Current camera descriptor

```txt
rail mode
  id
  mode
  progress
  fov
  position
  lookAt

first-person mode
  id
  mode
  progress
  fov
  eyeHeight
  position
  lookAt
```

Missing descriptor provenance:

```txt
cameraStateRevision
railBaselineId
railBaselineFingerprint
railPathRevision
terrainRevision
resetGeneration
lastInputCommandId
lastTransitionResult
committedFrameId
```

## Domains in use

```txt
browser startup, loader, error and debug projection
kit catalog declaration, validation and completeness
logical render graph declaration and validation
physical render pass and proxy-resource construction
WebGPU/WebGL2 backend and quality policy
legacy/Core world mode and lifecycle
Core World grid, focus, providers and materialization
camera rail authored baseline and interpolation
camera progress, orbit, look and first-person movement
browser wheel, pointer, keyboard, blur and pointer capture
scenario clock, tick, reset and render snapshots
camera descriptor projection into Three.js
island, sea floor, biome, shoreline and ground contact
vegetation, rocks, props, grass, paths and campfire
ocean waves, optics, caustics, foam and underwater atmosphere
clouds, fog, weather, wind, illumination and sky
render layers, depth, blend and output transform
adaptive performance and resolution
public host, diagnostics, tests and Pages deployment
```

## All implemented kits and offered services

### Catalog-admitted kits: 50

```txt
debug-overlay-host-kit                     diagnostics projection
webgl2-fallback-renderer-kit                fallback rendering policy
webgpu-compute-atmosphere-renderer-kit      atmosphere texture generation
webgpu-foam-renderer-kit                    foam meshes, material and animation
webgpu-ocean-renderer-kit                   water displacement and optics
webgpu-performance-budget-kit               adaptive frame budget
webgpu-post-processing-renderer-kit         depth, fog, foam and output composition
webgpu-rolling-fog-renderer-kit              fog raymarch and clipping
webgpu-stylized-material-renderer-kit       world materials
webgpu-volumetric-cloud-renderer-kit        cloud volume rendering
camera-rail-sequence-kit                    rail, orbit, landing, reset and FPS input
cozy-island-scenario-kit                    scenario tick, reset and camera snapshots
terrain-surface-domain-kit                  island surface
vegetation-placement-domain-kit             deterministic placement graph
aerial-perspective-domain-kit               haze and exposure
campfire-atmosphere-domain-kit               fire, light, embers and smoke
cloud-density-field-domain-kit              cloud density recipe
cloud-horizon-band-domain-kit               horizon continuation
cloud-lighting-domain-kit                   cloud lighting and extinction
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
render-quality-domain-kit                   backend and DPR quality selection
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

### Source-backed runtime kit outside catalog

```txt
cozy-ocean-composition-kit
  -> six-pass logical layer graph
  -> pass order and dependency validation
  -> transparent depth-write validation
  -> terrain handoff validation
  -> per-layer depth and blend contracts
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

## Existing camera tests

```txt
camera-rail-ground-clearance.mjs
  -> samples several rail progress values
  -> proves camera and look target remain above terrain
  -> proves FOV remains finite and within 55..80

camera-first-person-contract.mjs
  -> forces first-person mode
  -> proves 80-degree FOV
  -> proves two-meter eye height
  -> proves forward movement remains terrain-relative
```

Not proved:

```txt
initial descriptor equals post-reset descriptor
rail point coordinates return to authored values
repeated drag/reset cycles have zero cumulative drift
wheel and drag commands are ordered and idempotently classified
multi-pointer browser input does not replace another pointer's drag state
reset is acknowledged before the next visible frame
public readback identifies the baseline and path revision
```

## Required parent domain

```txt
cozy-island-camera-rail-baseline-authority-domain
```

## Candidate kits

```txt
camera-rail-baseline-descriptor-kit
camera-rail-baseline-fingerprint-kit
camera-rail-path-revision-kit
camera-state-revision-kit
camera-input-command-kit
camera-input-admission-kit
camera-progress-command-kit
rail-orbit-command-kit
first-person-look-command-kit
camera-reset-command-kit
camera-reset-result-kit
camera-transition-result-kit
stale-camera-command-rejection-kit
camera-descriptor-provenance-kit
camera-input-journal-kit
first-visible-camera-frame-ack-kit
rail-reset-fidelity-fixture-kit
repeated-drag-drift-fixture-kit
browser-pointer-wheel-parity-smoke-kit
```

## Required transaction

```txt
admit immutable rail baseline and terrain revision
  -> compute baseline fingerprint and path revision
  -> admit one ordered camera input command
  -> derive a candidate progress, orbit, look, or movement result
  -> mutate session camera state without mutating the baseline
  -> publish one camera state revision and typed result
  -> on reset, reconstruct state from the admitted baseline
  -> reject stale old-generation commands
  -> render one frame from the committed camera revision
  -> publish first-visible-camera-frame acknowledgement
```

## Validation boundary

```txt
runtime source changed: no
camera implementation changed: no
render output changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
camera source inspected: yes
existing camera tests inspected: yes
npm test run: no
new camera fixtures implemented: no
browser camera smoke run: no
```