# Project Breakdown: MyCozyIsland Source Consumer Parity Host

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-10T04-29-10-04-00`

## Plan ledger

```txt
[x] Checked the current public LuminaryLabs-Publish repo list.
[x] Excluded LuminaryLabs-Publish/TheCavalryOfRome.
[x] Compared eligible repos against central LuminaryLabs-Dev/LuminaryLabs tracking.
[x] Selected one repo only: MyCozyIsland.
[x] Read current repo .agent state.
[x] Read central MyCozyIsland repo ledger.
[x] Read package.json, index.html, and src/main-cloudform.js.
[x] Identified interaction loop.
[x] Identified domains in use.
[x] Identified kit services.
[x] Identified implemented, runtime-implied, and next-cut kits.
[x] Updated required root .agent docs.
[x] Added architecture, render, interaction, grass, cloud, host-proof, and deploy audits.
[x] Added timestamped tracker and turn ledger.
[x] Updated central repo ledger.
[x] Added central internal change-log entry.
[ ] Runtime source changed.
[ ] Local/browser validation run.
```

## Selection result

`MyCozyIsland` was selected because no checked non-Cavalry Publish repo was new, missing from the central ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

After the previous eligible repo advanced to `2026-07-10T04-22-00-04-00`, `MyCozyIsland` was the oldest eligible documented fallback.

`TheCavalryOfRome` remains excluded.

## Current interaction loop

```txt
index.html
  -> canvas#game, cloud loader, and error panel
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js 0.160.0 CDN
  -> import source-domain kits
  -> create island, floor, foliage, clearing, campfire, smoke, grass, wind, and cloud descriptors
  -> adapt descriptors into terrain, floor, water, foam, path, foliage, fence, campfire, smoke, grass, and point-cloud objects
  -> install resize, keydown, keyup, wheel, pointerdown, pointerup, and pointermove handlers
  -> wheel mutates normalized progress directly
  -> pointer mutates yaw while progress < 0.85
  -> pointer is an implicit no-op in the 0.85 to 0.985 transition band
  -> pointer mutates yaw/pitch while progress >= 0.985
  -> camera rail runs while progress < 0.985
  -> WASD first-person movement runs while progress >= 0.985
  -> movement is silently accepted or rejected by clearing radius and 2.35 campfire keepout
  -> frame updates sea, smoke, flame, cloud drift, camera, and renderer
  -> globalThis.CozyIsland exposes cloudContract, live cloud geometry cache, and getScrollProgress
```

## Domains in use

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
ocean-island-landform-domain: island state, height sampling, masks, heightfield and shoreline contracts
island-foliage-domain: path network, dense object graph, render contract
ocean-floor-domain: floor state, height sampling, heightfield, object placements, render contract, water material
grass-object-domain: path/exclusion-aware patch placements and static batch descriptors
grass-wind-domain: normalized wind, sway, and gust descriptor
fenced-clearing-domain: fence posts, player anchor, collision boundary, clearance zones, object exclusions
campfire-object-domain: campfire graph, collision, flame, smoke anchor, and light descriptors
smoke-particle-domain: smoke emitter descriptor with wind response
cozy-hero-cloud-form-kit: cloud form, layer, point-cloud, placement, lighting, drift, and render boundary contracts
mattatz-clouds-domain: cloud state and active hero-cloud render contract
main-cloudform runtime: descriptor adaptation, browser input, camera, movement, animation, render submission, legacy diagnostics
planned proof services: route token readback, source fingerprint, source snapshot, input/movement results, grass/cloud parity, render ledger, CozyIslandHost snapshot, DOM-free fixture
```

## Kits

Current explicit kits:

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

Runtime-implied kits:

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

Next-cut proof kits:

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

`MyCozyIsland` should not get a visual rewrite, cloud rewrite, grass rewrite, camera retune, or renderer extraction next.

The blocker is source-to-consumer parity and host readback. `src/main-cloudform.js` still owns descriptor construction, Three.js adapters, browser input mutation, camera rail, first-person movement validity, grass instancing, cloud cache and drift, frame rendering, and legacy diagnostics inline.

## Next safe ledge

```txt
MyCozyIsland Source Consumer Parity Host Refresh + Input Fixture Gate
```

Add fixture-readable source fingerprints, input/movement result rows, camera snapshots, grass placement-to-instance parity, cloud descriptor/cache/drift parity, render consumption rows, and a serializable additive `CozyIslandHost` surface before any visible-scene change.

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: unavailable
browser smoke: not run
DOM-free fixture: not run because proof files do not exist yet
pushed to main: yes, documentation only
```
