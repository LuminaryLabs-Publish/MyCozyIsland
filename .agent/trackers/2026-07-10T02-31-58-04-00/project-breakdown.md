# Project breakdown: My Cozy Island

**Timestamp:** `2026-07-10T02-31-58-04-00`

## Selection

Selected repo: `LuminaryLabs-Publish/MyCozyIsland`.

`LuminaryLabs-Publish/TheCavalryOfRome` stayed excluded by rule.

No checked non-Cavalry repo was new, central-ledger absent, missing root `.agent` state, recently added but undocumented, or otherwise undocumented. `MyCozyIsland` was the oldest eligible documented fallback after `TheUnmappedHouse` advanced to `2026-07-10T02-19-14-04-00`.

## Plan ledger

- [x] Checked the current public Publish repo list.
- [x] Compared checked repos against central tracking.
- [x] Excluded `TheCavalryOfRome`.
- [x] Selected one repo only: `MyCozyIsland`.
- [x] Read repo-local `.agent` state.
- [x] Read central ledger state.
- [x] Read `package.json`, `index.html`, `src/main-cloudform.js`, grass kit, cloud kit, and hero-cloud kit.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified kit services.
- [x] Identified implemented, runtime-implied, and next-cut proof kits.
- [x] Added timestamped tracker and turn-ledger.
- [x] Added architecture, render, interaction, grass, cloud, host-proof, and deploy audits.
- [x] Refreshed root `.agent` docs and kit registry.
- [x] Sync central ledger and internal change-log.
- [ ] Runtime source changed.
- [ ] Local/browser validation run.

## Current interaction loop

```txt
index.html
  -> canvas#game, cloud loader, and error panel mount
  -> ./src/main-cloudform.js?v=hero-cloud-4 loads
  -> Three.js 0.160.0 CDN imports
  -> source-domain kits create island, floor, foliage, clearing, campfire, smoke, grass, wind, and cloud descriptors
  -> browser runtime adapts descriptors into terrain, ocean floor, water, shoreline foam, path, foliage, fence, campfire, smoke, grass cones, and cloud point objects
  -> resize, keyboard, wheel, pointerdown/up/move handlers install directly
  -> wheel mutates normalized progress directly
  -> pointer mutates rail yaw while progress < 0.85
  -> pointer is an implicit no-op in 0.85 <= progress < 0.985
  -> pointer mutates first-person yaw/pitch while progress >= 0.985
  -> rail camera samples CatmullRom curves while progress < 0.985
  -> WASD first-person movement unlocks while progress >= 0.985
  -> valid(next) silently accepts/rejects movement by clearing radius and 2.35 campfire keepout
  -> frame updates sea, smoke, flame, cloud drift, camera, and renderer
  -> globalThis.CozyIsland exposes cloudContract, live cloud geometry cache, and getScrollProgress
```

## Domains

```txt
static-route-shell
canvas-route-host
cloud-loader-projection
error-projection
route-script-token
three-cdn-import
three-render-host
scene-composition
source-descriptor-composition
island-landform-state
island-height-sampling
island-mask-sampling
island-heightfield-contract
shoreline-contract
ocean-floor-state
ocean-floor-height-sampling
ocean-floor-heightfield
ocean-floor-object-placement
ocean-water-material
island-path-network
foliage-object-graph
fenced-clearing-object-graph
clearing-collision-boundary
campfire-object-graph
smoke-particle-descriptor
smoke-frame-simulation
grass-wind-descriptor
grass-placement-contract
grass-batch-descriptor
mattatz-cloud-state
hero-cloud-form-descriptor
hero-cloud-render-contract
terrain-mesh-adapter
ocean-floor-mesh-adapter
water-plane-adapter
shoreline-foam-adapter
path-mesh-adapter
foliage-mesh-adapter
fence-mesh-adapter
campfire-mesh-adapter
smoke-particle-adapter
grass-instanced-mesh-adapter
hero-cloud-point-generation
hero-cloud-geometry-cache
cloud-shader-material
cloud-drift-frame
keyboard-input
wheel-progress-input
pointer-drag-input
player-pose
camera-rail
first-person-movement
movement-validity
render-frame-loop
legacy-host-diagnostics
route-token-readback
source-profile
source-fingerprint
scene-source-snapshot
browser-input-action-frame
input-result
input-result-journal
movement-policy-result
camera-rail-snapshot
grass-placement-snapshot
grass-instance-snapshot
cloud-descriptor-snapshot
cloud-cache-snapshot
cloud-drift-result
render-consumption-ledger
render-host-snapshot
cozy-island-host-snapshot
browser-consumer-fixture
central-ledger-sync
```

## Kit services

```txt
ocean-island-landform-domain: island state, height sampling, masks, heightfield and shoreline render contracts
island-foliage-domain: path network, dense object graph, render contract
ocean-floor-domain: floor state, height sampling, heightfield, object placements, render contract, water material
grass-object-domain: path/exclusion-aware patch placement and static batch descriptors
grass-wind-domain: normalized wind/sway/gust descriptor
fenced-clearing-domain: fence posts, player anchor, collision boundary, clearance zones, object exclusions
campfire-object-domain: campfire graph, collision, flame, smoke anchor, light descriptors
smoke-particle-domain: normalized smoke emitter descriptor with wind response
cozy-hero-cloud-form-kit: cloud form, layer, point-cloud, placement, lighting, drift, and render boundary contracts
mattatz-clouds-domain: cloud state and active hero-cloud render contract
main-cloudform runtime: descriptor adaptation, browser input, camera, movement, animation, render submission, and legacy diagnostics
planned proof services: route token readback, source fingerprint, input results, movement results, grass/cloud parity, render consumption ledger, CozyIslandHost snapshot, DOM-free browser fixture
```

## Current kits

```txt
ocean-island-landform-domain
island-foliage-domain
ocean-floor-domain
grass-object-domain
grass-wind-domain
campfire-object-domain
smoke-particle-domain
fenced-clearing-domain
mattatz-clouds-domain
cozy-hero-cloud-form-kit
```

## Runtime-implied kits

```txt
cozy-static-shell-kit
cozy-cloud-loader-kit
cozy-error-panel-kit
cozy-cloudform-entry-kit
cozy-route-script-token-kit
cozy-three-render-host-kit
cozy-scene-composition-kit
cozy-terrain-render-kit
cozy-ocean-floor-render-kit
cozy-water-plane-kit
cozy-shoreline-foam-kit
cozy-path-render-kit
cozy-foliage-render-kit
cozy-fence-render-kit
cozy-campfire-render-kit
cozy-smoke-render-kit
cozy-grass-instanced-render-kit
cozy-hero-cloud-point-cache-kit
cozy-cloud-drift-frame-kit
cozy-resize-consumer-kit
cozy-keyboard-input-kit
cozy-wheel-progress-kit
cozy-pointer-look-kit
cozy-camera-rail-kit
cozy-first-person-movement-kit
cozy-movement-validity-kit
cozy-render-frame-loop-kit
cozy-legacy-host-diagnostics-kit
```

## Next-cut proof kits

```txt
route-token-readback-kit
source-profile-kit
source-fingerprint-kit
scene-source-snapshot-kit
browser-input-action-frame-kit
input-result-kit
input-result-journal-kit
movement-policy-result-kit
camera-rail-snapshot-kit
grass-placement-snapshot-kit
grass-instance-snapshot-kit
hero-cloud-descriptor-snapshot-kit
hero-cloud-cache-snapshot-kit
cloud-drift-result-kit
render-consumption-ledger-kit
render-host-snapshot-kit
cozy-island-host-snapshot-kit
browser-consumer-fixture-kit
central-ledger-readback-kit
```

## Main finding

`MyCozyIsland` should not get a visual rewrite next. The source-domain kits are useful, but `src/main-cloudform.js` still owns render adapters, input mutation, camera rail, movement validity, grass instancing, cloud cache/drift, frame rendering, and legacy diagnostics inline.

The next cut should create source/consumer proof rows and a serializable additive `CozyIslandHost`, without changing visible behavior.

## Next safe ledge

```txt
MyCozyIsland Source Consumer Host Readback Refresh + Input Fixture Gate
```

## Validation

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: unavailable
browser smoke: not run
DOM-free fixture: not run because proof files do not exist yet
pushed to main: yes
central ledger updated: pending this pass
```
