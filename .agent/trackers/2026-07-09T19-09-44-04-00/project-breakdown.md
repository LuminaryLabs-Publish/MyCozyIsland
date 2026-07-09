# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T19-09-44-04-00`

## Selection

The current public `LuminaryLabs-Publish` organization list was checked and compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger plus sampled root `.agent` state.

```txt
MyCozyIsland         selected
TheUnmappedHouse     tracked / newer central state
ZombieOrchard        tracked / newer central state
PhantomCommand       tracked / newer central state
HorrorCorridor       tracked / newer central state
PrehistoricRush      tracked / newer central state
IntoTheMeadow        tracked / newer central state
TheCavalryOfRome     excluded by rule
TheOpenAbove         tracked / newer central state
```

No checked non-Cavalry repo was new, missing from the central ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented. `MyCozyIsland` was selected as the oldest eligible documented fallback by central ledger recency.

## Product surface

```txt
index.html
  -> canvas#game
  -> div#cloud-loader
  -> pre#error
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js 0.160.0 CDN
  -> local source-domain kits
  -> inline browser consumer
  -> globalThis.CozyIsland legacy diagnostics
```

`package.json` only exposes `npm start`, which serves the static route with `python3 -m http.server 8080`.

## Current interaction loop

```txt
index.html loads src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js and source-domain kits
  -> create island landform state and render contract
  -> create fenced clearing, player anchor, and campfire keepout
  -> create foliage graph, ocean-floor state, grass wind, campfire graph, smoke descriptor, grass placement, and cloud render contract
  -> create Three.js renderer, scene, fog, lights, and camera
  -> adapt source contracts into floor, terrain, sea, foam, path, foliage, fence, campfire, smoke, grass, and cloud objects
  -> install resize, keyboard, wheel, pointerdown, pointerup, and pointermove handlers
  -> wheel mutates normalized progress directly
  -> pointer mutates yaw below 0.85 or yaw/pitch at and above 0.985
  -> progress below 0.985 uses rail camera
  -> progress at or above 0.985 uses first-person movement
  -> valid(next) accepts movement only inside the clearing radius and outside the 2.35 campfire keepout
  -> frame updates sea bob, smoke, flame, cloud drift, camera, and renderer
  -> globalThis.CozyIsland exposes cloudContract, live cloudPointCache, and getScrollProgress
```

## Domains in use

### Route and host domains

```txt
static-route-shell
route-script-token
cloud-loader-projection
error-projection
three-module-import
three-render-host
scene-composition
resize-consumer
render-frame-loop
legacy-host-diagnostics
```

### Source domains

```txt
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
grass-wind-descriptor
grass-placement-contract
grass-batch-descriptor
mattatz-cloud-state
hero-cloud-form-descriptor
hero-cloud-layer-descriptor
hero-cloud-render-contract
```

### Runtime consumer domains

```txt
terrain-mesh-adapter
ocean-floor-mesh-adapter
water-plane-adapter
shoreline-foam-adapter
path-mesh-adapter
foliage-mesh-adapter
fence-mesh-adapter
campfire-mesh-adapter
smoke-particle-adapter
smoke-frame-simulation
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
```

### Proof domains needed next

```txt
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

## Services that kits offer

```txt
ocean-island-landform-domain: island state, height sampling, mask sampling, heightfield contract, shoreline contract
island-foliage-domain: path network, dense object graph, render contract
ocean-floor-domain: ocean floor state, floor height, heightfield, object placements, render contract, water material
grass-object-domain: path/exclusion-aware patch placements and static batch descriptors
grass-wind-domain: normalized wind/sway/gust descriptor
fenced-clearing-domain: fence posts, player anchor, collision boundary, clearance zones, object exclusions
campfire-object-domain: campfire graph, firewood, flame, smoke anchor, light, collision
smoke-particle-domain: smoke emitter descriptor with wind response
cozy-hero-cloud-form-kit: cloud form, layer, and render contracts
mattatz-clouds-domain: cloud state and active hero-cloud render contract
main-cloudform runtime: Three.js adaptation, input mutation, camera policy, movement policy, animation, render submission, legacy diagnostics
```

## Kit inventory

### Explicit source kits

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

### Runtime-implied kits

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

### Next-cut proof kits

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

Do not visually rewrite `MyCozyIsland` next. The source descriptor layer is modular enough to preserve. The blocker is source-to-consumer proof: input mutation, movement accept/reject, camera rail samples, grass placement-to-instance parity, cloud descriptor/cache/drift parity, render consumption, and host diagnostics are not fixture-readable.

## Next safe ledge

```txt
MyCozyIsland Source/Consumer Fixture Refresh + Browser Input Result Gate
```

## Validation

Documentation-only pass. Runtime source was not changed, no branch or PR was created, `npm run check` is not available, and no browser or DOM-free fixture validation was run.