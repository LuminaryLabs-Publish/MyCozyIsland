# Current Audit: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Audit timestamp:** `2026-07-09T14-39-07-04-00`

## Summary

`MyCozyIsland` is a stable static Three.js publish route that composes local source-domain kits into a cozy island scene.

The current issue is proofability, not visuals. `src/main-cloudform.js` owns descriptor construction, browser consumption, input mutation, movement policy, rail camera sampling, grass instancing, cloud geometry caching, cloud drift, frame rendering, and legacy diagnostics inline.

This pass refreshes repo-local `.agent` state and central tracking around the unresolved host readback parity and browser consumer fixture gate.

## Repo selection result

```txt
No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root .agent/START_HERE.md state.

MyCozyIsland was selected because repo-local .agent state was ahead of central tracking.

TheCavalryOfRome remains excluded.
```

## Current interaction loop

```txt
index.html
  -> src/main-cloudform.js?v=hero-cloud-4
  -> local source-domain kits and Three.js CDN
  -> source descriptor construction
  -> inline Three.js render consumers
  -> browser input handlers
  -> camera rail or first-person movement
  -> smoke/flame/cloud frame update
  -> renderer.render(scene, camera)
  -> globalThis.CozyIsland legacy diagnostics
```

## Domains in use

```txt
static-route-domain
route-token-domain
loader-status-domain
error-panel-domain
source-descriptor-domain
island-landform-domain
ocean-floor-domain
foliage-object-graph-domain
fenced-clearing-domain
campfire-object-domain
smoke-particle-domain
grass-placement-domain
grass-wind-domain
mattatz-cloud-domain
hero-cloud-point-cache-domain
three-render-host-domain
scene-composition-domain
resize-consumer-domain
keyboard-input-domain
wheel-progress-domain
pointer-look-domain
camera-rail-domain
first-person-movement-domain
movement-validity-domain
render-frame-domain
legacy-host-diagnostics-domain
host-readback-proof-domain
browser-consumer-fixture-domain
central-ledger-sync-domain
```

## Main finding

The next cut should add a host-state proof layer and DOM-free fixture rows before any visual rewrite. The useful seam is `CozyIslandHost.getState()`, source fingerprints, scene/source snapshots, grass/cloud readback, movement action results, camera rail snapshots, render-host snapshots, and legacy parity.
