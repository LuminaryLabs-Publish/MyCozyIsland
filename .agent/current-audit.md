# Current Audit: MyCozyIsland Browser Input Command Authority

Last updated: `2026-07-12T06-51-27-04-00`

## Summary

MyCozyIsland wires browser wheel, pointer, keyboard, blur, and resize events directly into mutable camera-sequence state. The active route has no normalized input envelope, command sequence, frame queue, focus/visibility policy, replay stream, or visible-frame receipt.

Two source-backed determinism gaps are central:

1. `input.wheel()` consumes `deltaY` without `WheelEvent.deltaMode`, so pixel, line, and page units are treated as equivalent.
2. Rail pointer orbit clamps each `pointermove` delta before mutating canonical rail points. One large event and several smaller events with the same total movement can produce different camera rails.

## Plan ledger

**Goal:** define one deterministic path from browser device samples through normalized input commands, frame admission, camera mutation, world focus, render projection, readback, and first-visible-frame proof.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `MyCozyIsland` as the oldest eligible repository.
- [x] Inspect active route listeners and camera-sequence input mutators.
- [x] Inspect rail and first-person mode transitions, movement, reset, frame projection, public readback, and current tests.
- [x] Identify the complete interaction loop and active domains.
- [x] Reconcile 50 cataloged kits, one extra runtime kit, nine providers, and five imported services.
- [x] Confirm wheel-unit ambiguity and pointer-cadence divergence.
- [x] Confirm browser input mutates canonical state outside a frame-scoped transaction.
- [x] Define normalization, admission, queue, reducer, leases, result, replay, and frame-proof contracts.
- [x] Change documentation only.
- [ ] Implement and run executable input fixtures.

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

## Complete interaction loop

```txt
startup
  -> validate catalog
  -> initialize renderer and world
  -> construct camera sequence and scenario
  -> bind wheel, pointer, key, blur, resize, pagehide listeners
  -> start renderer animation loop

wheel event
  -> prevent browser default
  -> send raw event.deltaY
  -> progress += deltaY * 0.00072
  -> clamp progress to 0..1

pointer event
  -> pointerdown stores client coordinates
  -> pointermove computes delta from prior event
  -> yaw and pitch mutate immediately
  -> rail mode mutates every canonical rail point after a per-event clamp
  -> pointerup or pointercancel clears local drag state

keyboard event
  -> keydown adds code to pressed Set
  -> keyup removes code
  -> blur clears pressed Set
  -> no command edge, sequence, frame target, or runtime generation exists

animation frame
  -> derive callback dt
  -> scenario.tick reads current pressed Set
  -> camera descriptor reads progress, rail points, yaw, pitch, and player state
  -> Core World focus follows camera position and mode
  -> renderer submits world and post pipeline
  -> public readback exposes current camera descriptor only
```

## Concrete defects

### Wheel unit ambiguity

The host forwards `event.deltaY` but not `event.deltaMode`. DOM wheel deltas may be expressed in pixels, lines, or pages. The same physical wheel gesture can therefore produce materially different rail progress across devices and browser settings.

### Pointer cadence divergence

Rail drag applies:

```txt
orbitInfluence = clamp(deltaX * 0.00008, -0.035, 0.035)
railPoint.x += orbitInfluence * abs(railPoint.z) * 0.02
```

Because the clamp is applied per event, event segmentation changes the result. A single 1000-pixel delta is clamped once to `0.035`; ten 100-pixel deltas contribute `0.008` ten times. Equivalent total motion can therefore create different rail geometry.

### Ambient mutation outside frame admission

Wheel and pointer handlers mutate camera state immediately. Keyboard handlers mutate a persistent `Set`. The next RAF reads whichever partial event sequence arrived before its callback. No immutable `InputFrame` records the accepted samples.

### Incomplete focus and capture lifecycle

`blur` clears held keys but does not clear the host's local `drag` record. There is no `visibilitychange` policy, `lostpointercapture` handler, pointer-capture lease, stale event fence, or typed clear result.

### Missing result-to-frame correlation

The public host exposes the latest camera descriptor and scenario, but no input command result, input-state revision, camera revision, or frame receipt proves which accepted commands produced the visible frame.

## Domains in use

```txt
browser startup, loader, error and debug projection
kit catalog declaration, validation and completeness
browser wheel, pointer, keyboard, focus and resize input
camera rail progress, orbit, landing and first-person movement
input normalization, command admission and frame reduction gap
scenario clock, tick, reset and render snapshots
Core World focus, providers, materialization and query
legacy/Core world lifecycle and compatibility
WebGPU/WebGL2 backend and quality policy
adaptive performance sampling and renderer mutation
island, sea floor, terrain, biome, shoreline and ground contact
vegetation, rocks, props, path, campfire and population
ocean, foam, caustics, underwater optics and sun glitter
cloud, fog, weather, wind, illumination and sky
render layers, depth, blend, post and output transform
runtime lifecycle, public readback, tests and Pages deployment
```

## All implemented kits and offered services

### Catalog-admitted kits: 50

```txt
debug-overlay-host-kit                     diagnostics projection
webgl2-fallback-renderer-kit                fallback rendering policy
webgpu-compute-atmosphere-renderer-kit      atmosphere texture generation
webgpu-foam-renderer-kit                    shoreline foam rendering and animation
webgpu-ocean-renderer-kit                   ocean displacement, normals and optics
webgpu-performance-budget-kit               moving average, hysteresis and level callbacks
webgpu-post-processing-renderer-kit         depth, fog, foam and output composition
webgpu-rolling-fog-renderer-kit              volume fog and advection
webgpu-stylized-material-renderer-kit       world materials and animation
webgpu-volumetric-cloud-renderer-kit        cloud volume rendering
camera-rail-sequence-kit                    wheel/drag/key input, rail, FPS movement, reset and descriptors
cozy-island-scenario-kit                    clock tick, camera tick, reset and render snapshots
terrain-surface-domain-kit                  island surface
vegetation-placement-domain-kit             deterministic placement graph
aerial-perspective-domain-kit               haze and exposure
campfire-atmosphere-domain-kit               fire, light, embers, smoke and wind descriptor
cloud-density-field-domain-kit              cloud density recipe
cloud-horizon-band-domain-kit               horizon continuation
cloud-lighting-domain-kit                   cloud lighting and extinction
cloud-lod-domain-kit                        texture and ray-step policy
cloud-shadow-domain-kit                     projected shadow policy
cloud-weather-domain-kit                    weather-to-cloud mapping
fog-advection-domain-kit                    wind-derived fog direction and speed
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
render-quality-domain-kit                   base tier and resource policy
render-snapshot-domain-kit                  immutable render aggregation
rock-archetype-domain-kit                   rock graph
shoreline-field-domain-kit                  signed coast field
shoreline-foam-domain-kit                   foam contours and animation parameters
stylized-material-descriptor-domain-kit     palettes and surface parameters
sun-glitter-domain-kit                      glitter lobe
terrain-biome-field-domain-kit              biome weights
terrain-lod-domain-kit                      terrain detail policy
underwater-atmosphere-domain-kit            underwater extinction
vegetation-archetype-domain-kit             vegetation catalog
vegetation-lod-domain-kit                   plant LOD
vegetation-wind-domain-kit                  bend and gust descriptors
weather-state-domain-kit                    stable weather intent
wind-field-domain-kit                       deterministic clock-driven wind
deterministic-seed-domain-kit               scoped random streams
environment-clock-domain-kit                elapsed time, scale, pause and reset
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

## Required parent domain

```txt
cozy-island-browser-input-command-authority-domain
```

## Candidate kits

```txt
input-session-id-kit
input-runtime-generation-kit
input-command-id-kit
input-command-sequence-kit
input-device-descriptor-kit
wheel-unit-normalization-kit
pointer-sample-kit
pointer-coalescing-policy-kit
keyboard-edge-hold-kit
input-command-envelope-kit
input-admission-policy-kit
camera-mode-input-policy-kit
input-frame-queue-kit
input-frame-reducer-kit
input-command-result-kit
input-state-revision-kit
input-clear-command-kit
pointer-capture-lease-kit
focus-visibility-input-gate-kit
stale-input-rejection-kit
camera-input-adapter-kit
input-frame-commit-kit
input-observation-kit
input-journal-kit
wheel-delta-mode-fixture-kit
pointer-cadence-parity-fixture-kit
blur-capture-loss-fixture-kit
input-replay-parity-fixture-kit
input-visible-frame-smoke-kit
```

## Required transaction

```txt
browser device sample
  -> identify device, unit, timestamp, session and runtime generation
  -> normalize wheel, pointer and keyboard semantics
  -> admit against focus, visibility, capture lease and camera-mode policy
  -> enqueue one immutable command with monotonic sequence
  -> at frame start reduce accepted commands into one InputFrame
  -> apply edges, holds, wheel and pointer deltas exactly once
  -> publish input result and state revision
  -> derive camera and world-focus revisions
  -> render one frame using those revisions
  -> publish first visible input-frame acknowledgement
```

## Required proof

```txt
pixel, line and page wheel inputs normalize to equivalent rail progress
one large pointer delta and equivalent segmented deltas produce the same camera result
browser event rate does not change rail or first-person outcome
blur, visibility loss and pointer-capture loss clear or reject stale input
old runtime-generation events cannot mutate replacement state
keyboard edge and hold semantics are explicit
input replay reproduces camera descriptors and player positions
public readback cites input, camera and visible-frame revisions
```

## Validation boundary

```txt
runtime source changed: no
input implementation changed: no
camera behavior changed: no
render output changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm test: not run
browser input smoke: not run
input fixtures: not implemented
```