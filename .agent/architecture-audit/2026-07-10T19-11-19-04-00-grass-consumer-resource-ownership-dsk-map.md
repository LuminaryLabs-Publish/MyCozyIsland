# Architecture Audit: Grass Consumer and Resource Ownership DSK Map

Timestamp: `2026-07-10T19-11-19-04-00`

## Current composition

```txt
vegetation-placement-domain-kit
  -> produces grass-patch source rows

render-snapshot-domain-kit
  -> carries vegetation.byType["grass-patch"]

webgpu-stylized-material-renderer-kit
  -> public render capability

renderers.js
  -> redirects createStylizedWorldRenderer to layered wrapper

grass-render-substitution-adapter-kit
  -> filters grass rows from the base snapshot
  -> invokes renderer-world.js
  -> invokes layered grass consumer with original snapshot

layered-alpha-grass-render-consumer-kit
  -> atlas generation
  -> geometry generation
  -> material generation
  -> instance projection
  -> group composition

webgpu-render-host-kit
  -> adds returned world group to the scene
  -> calls update each frame
  -> exposes only aggregate CozyIsland diagnostics
```

## Domain-to-service map

| Domain | Current owner | Services | Gap |
|---|---|---|---|
| grass source production | `vegetation-placement-domain-kit` | deterministic rows, transforms, phase, tint, grouping | no handoff fingerprint |
| render snapshot | `render-snapshot-domain-kit` | immutable composition envelope | no grass-consumer result |
| legacy suppression | wrapper adapter | filtered shallow snapshot | no suppression ledger |
| atlas intent | local renderer function | three procedural blade panels | browser-only, no pure descriptor |
| geometry intent | local renderer function | three crossed quad layers | no pure descriptor or policy ID |
| material policy | local renderer function | unlit alpha-test depth-writing material | atlas handle hidden in material factory |
| instance projection | inner grass renderer | matrix and color writes | no validation or accepted/rejected rows |
| resource ownership | none | implicit graph reachability | no named owner or disposal |
| lifecycle composition | outer world wrapper | per-frame update delegation | inner handle discarded, no dispose |
| host diagnostics | `globalThis.CozyIsland` | aggregate backend/quality/camera/performance state | no grass readback |
| validation | static/domain Node tests | catalog and deterministic domain checks | no browser adapter execution |

## Complete kit inventory

### Declared DomainServiceKits

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

### Runtime-implied kits

```txt
webgpu-static-shell-kit
webgpu-importmap-kit
webgpu-route-token-kit
webgpu-render-host-kit
webgpu-quality-selection-kit
webgpu-scene-composition-kit
sky-gradient-kit
lighting-composition-kit
world-render-consumer-kit
layered-alpha-grass-render-consumer-kit
grass-alpha-atlas-generator-kit
grass-render-substitution-adapter-kit
ocean-render-consumer-kit
foam-render-consumer-kit
atmosphere-texture-compute-kit
volumetric-cloud-consumer-kit
rolling-fog-consumer-kit
post-pipeline-consumer-kit
performance-budget-consumer-kit
input-consumer-kit
resize-consumer-kit
animation-loop-kit
legacy-CozyIsland-diagnostics-kit
node-static-check-kit
node-domain-smoke-kit
```

## Target DSK cut

```txt
layered-grass-render-policy-kit
  owns immutable visual/update policy

layered-grass-source-validator-kit
  owns typed source acceptance and rejection

layered-grass-source-consumption-ledger-kit
  owns source fingerprint and count reconciliation

layered-grass-atlas-descriptor-kit
  owns deterministic panel and blade intent

layered-grass-geometry-descriptor-kit
  owns deterministic layer intent

layered-grass-resource-owner-kit
  owns texture, geometry, material, mesh, and group handles

layered-grass-disposal-result-kit
  owns disposed and dispose-noop results

layered-grass-readback-kit
  owns immutable JSON-safe host projection

node-layered-grass-consumer-fixture-kit
  proves pure contracts

browser-layered-grass-lifecycle-smoke-kit
  proves Three.js resource construction and disposal
```

## Required boundary

```txt
source snapshot
  -> validate and fingerprint
  -> create source-consumption ledger
  -> create pure policy/atlas/geometry descriptors
  -> browser adapter creates resources through one resource owner
  -> renderer returns group, update, getState, dispose
  -> outer world renderer composes lifecycle
  -> host exposes immutable grass state
```

## Architectural decision

Keep the current wrapper composition and visual output. Change ownership and proof, not presentation.