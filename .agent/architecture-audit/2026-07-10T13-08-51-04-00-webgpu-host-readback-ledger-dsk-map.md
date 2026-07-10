# Architecture Audit: WebGPU Host Readback Ledger DSK Map

Timestamp: `2026-07-10T13-08-51-04-00`

## Runtime composition

```txt
static shell
  -> WebGPU importmap
  -> main-cloudform route token
  -> DomainServiceKit catalog validation
  -> deterministic source domains
  -> render snapshot
  -> WebGPU render consumers
  -> input consumers
  -> scenario tick loop
  -> legacy CozyIsland diagnostics
```

## Source domains

```txt
deterministic-seed-service
environment-clock
wind-field
weather-state
illumination-state
terrain-surface
terrain-biome-field
shoreline-field
terrain-lod-policy
ocean-floor-profile
ocean-wave-state
ocean-optics
underwater-atmosphere
ocean-caustics
sun-glitter
shoreline-foam
vegetation-archetype-catalog
ground-contact-service
vegetation-placement-graph
vegetation-wind
vegetation-lod
rock-graph
prop-graph
campfire-atmosphere
cloud-weather-state
cloud-density-recipe
cloud-lighting-profile
cloud-lod-policy
cloud-shadow
cloud-horizon-band
fog-density-recipe
fog-advection
fog-volume-placement
aerial-perspective
stylized-material-catalog
render-archetype-catalog
webgl2-fallback-policy
render-snapshot
camera-rail-sequence
cozy-island-scenario
```

## Render / consumer domains

```txt
webgpu-render-host
stylized-world-render-consumer
webgpu-ocean-render-consumer
webgpu-foam-render-consumer
atmosphere-volume-texture-consumer
volumetric-cloud-render-consumer
rolling-fog-render-consumer
webgpu-post-pipeline-consumer
performance-budget-consumer
```

## Interaction domains

```txt
wheel-input-consumer
pointer-input-consumer
keyboard-input-consumer
blur-clear-consumer
resize-consumer
debug-toggle-consumer
```

## Current gap

The source kits create rich descriptor rows and the renderer consumes them, but the host does not expose a stable proof surface that answers:

```txt
which source rows were consumed?
which rows were ignored or fallback-rendered?
which input was accepted, rejected, clamped, or no-change?
which scenario tick and camera frame produced the current render?
which volume textures were generated and from which source recipes?
which performance decision changed render cost?
```

## Required DSK cut

```txt
webgpu-route-profile-kit
webgpu-source-fingerprint-kit
kit-catalog-readback-kit
render-snapshot-normalizer-kit
input-action-frame-kit
input-result-kit
input-readback-ledger-kit
scenario-tick-result-kit
camera-frame-readback-kit
volume-texture-result-kit
performance-level-result-kit
render-consumption-ledger-kit
cozy-island-host-readback-kit
node-webgpu-consumer-fixture-kit
```

## Next safe ledge

```txt
MyCozyIsland WebGPU Host Readback Ledger Refresh + Node Consumer Fixture Gate
```
