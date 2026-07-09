# Current Audit: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Audit timestamp:** `2026-07-09T17-38-53-04-00`

## Summary

`MyCozyIsland` is a static Three.js scene with useful source-domain separation and a monolithic browser-consumer entry point.

The current architecture problem is not scene fidelity. `src/main-cloudform.js` directly owns source composition, mesh projection, input mutation, camera policy, movement acceptance, animation, render submission, and diagnostics. None of those consumers produce normalized source/consumer parity rows.

## Selection result

```txt
No eligible non-Cavalry Publish repo was new, ledger-absent, missing recorded root .agent state, or otherwise undocumented.
MyCozyIsland had the oldest current eligible central ledger timestamp and was selected under the fallback rule.
TheCavalryOfRome remains excluded.
```

## Current interaction loop

```txt
index.html
  -> src/main-cloudform.js?v=hero-cloud-4
  -> source kit imports and descriptor composition
  -> Three.js object creation
  -> resize/keyboard/wheel/pointer event consumers
  -> rail camera or first-person movement
  -> smoke/flame/cloud frame updates
  -> renderer.render(scene, camera)
  -> legacy globalThis.CozyIsland diagnostics
```

## Domains in use

```txt
static-route-shell
route-script-token
loader-progress-projection
error-projection
three-module-import
source-descriptor-composition
island-landform
island-height-sampling
island-mask-sampling
ocean-floor
shoreline
path-network
foliage-object-graph
fenced-clearing
campfire-object-graph
smoke-particle-source
smoke-frame-simulation
grass-wind-source
grass-placement-source
grass-instanced-rendering
mattatz-cloud-source
hero-cloud-point-generation
hero-cloud-geometry-cache
cloud-shader-material
cloud-drift-frame
three-render-host
scene-composition
resize-consumer
keyboard-input
wheel-progress-input
pointer-drag-input
player-pose
camera-rail
first-person-movement
movement-validity
render-frame
legacy-host-diagnostics
source-fingerprint-proof
input-result-proof
render-consumption-proof
browser-consumer-fixture
central-ledger-sync
```

## Main finding

The next cut should add a pure source profile, stable fingerprint, input/movement result records, camera snapshots, grass/cloud parity snapshots, a render-consumption ledger, and additive `globalThis.CozyIslandHost` readback.

Do not rewrite the visible scene before those rows are fixture-proven.
