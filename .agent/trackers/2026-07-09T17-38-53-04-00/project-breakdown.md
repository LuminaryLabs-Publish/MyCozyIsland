# My Cozy Island Project Breakdown

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T17-38-53-04-00`

## Plan ledger

**Goal:** Compare the full accessible `LuminaryLabs-Publish` repository set against central tracking, select one eligible repository, document its current interaction/domain/kit architecture, and synchronize repo-local and central audit state without changing runtime source.

- [x] List the full accessible Publish organization repository set.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare each eligible repository against `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state.
- [x] Confirm central tracking records root `.agent` state for every eligible repository.
- [x] Select only one repository.
- [x] Read `index.html`, `package.json`, `src/main-cloudform.js`, and current `.agent` state.
- [x] Identify the interaction loop.
- [x] Identify domains in use.
- [x] Identify kit services.
- [x] Identify explicit, runtime-implied, and next-cut kits.
- [x] Add timestamped architecture, render, interaction, grass, cloud, host-proof, deploy, tracker, and turn-ledger entries.
- [x] Refresh root `.agent` pointers and kit registry.
- [x] Update the central repo ledger and internal change log.
- [x] Push only to `main`; create no branch or pull request.

## Selection result

No accessible non-Cavalry Publish repository was new, missing from the central ledger, recorded as missing root `.agent` state, or otherwise undocumented.

`MyCozyIsland` was selected under the oldest documented-selection fallback because its central ledger timestamp, `2026-07-09T14-39-07-04-00`, was the oldest current eligible timestamp observed.

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent recorded / central latest 2026-07-09T16-00-13-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent recorded / central latest 2026-07-09T17-08-15-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent recorded / central latest 2026-07-09T15-09-09-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by standing rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent recorded / central latest 2026-07-09T16-29-23-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent recorded / central latest 2026-07-09T15-31-40-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent recorded / central latest 2026-07-09T16-38-14-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent recorded / central latest 2026-07-09T15-39-08-04-00
LuminaryLabs-Publish/MyCozyIsland         selected / central latest 2026-07-09T14-39-07-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent recorded / central latest 2026-07-09T16-58-52-04-00
```

## Current interaction loop

```txt
index.html
  -> mounts canvas#game, #cloud-loader, and #error
  -> loads ./src/main-cloudform.js?v=hero-cloud-4
  -> imports Three.js 0.160.0 from jsDelivr
  -> imports local island, foliage, ocean-floor, grass, wind, campfire, smoke, clearing, and cloud kits
  -> creates landform, floor, clearing, foliage, campfire, smoke, grass, wind, and cloud source descriptors
  -> creates renderer, scene, camera, lights, fog, water, terrain, floor, shoreline foam, path, foliage, fence, fire, smoke, grass, and point-cloud clouds
  -> installs resize, keydown, keyup, wheel, pointerdown, pointerup, and pointermove consumers
  -> wheel mutates progress through clamp01
  -> pointer drag mutates yaw before first-person and yaw/pitch after first-person
  -> rail() samples a Catmull-Rom sky-to-eye camera path while progress < 0.985
  -> fp(dt) integrates WASD movement when progress >= 0.985
  -> valid(next) silently accepts or rejects movement by clearing radius and campfire keepout
  -> frame(now) updates sea bob, camera mode, smoke, flame, cloud drift, and renderer submission
  -> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
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
ocean-water-material
shoreline-foam
path-network-rendering
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

## Services offered by kits and runtime consumers

```txt
ocean-island-landform-domain:
  deterministic island state, heightfield contract, shoreline contract, height sampling, mask sampling

island-foliage-domain:
  seeded dense island object graph, path network, tree/rock placement descriptors

ocean-floor-domain:
  floor state, floor heightfield, shallow shelf masks, water material contract

grass-object-domain:
  seeded grass patch placement, path avoidance, exclusion-zone avoidance, terrain/mask sampling

grass-wind-domain:
  wind direction, strength, response, and grass motion descriptor

campfire-object-domain:
  campfire hierarchy and root transform descriptor

smoke-particle-domain:
  particle count, lifespan, spawn radius, turbulence, wind response, and source position descriptor

fenced-clearing-domain:
  clearing hierarchy, fence posts, player anchor, collision boundary, and exclusion zones

mattatz-clouds-domain:
  seeded cloud state and cloud render contract

main-cloudform runtime:
  source composition, Three.js mesh projection, event consumption, camera policy, movement policy, animation, rendering, and legacy diagnostics
```

## Kits

### Explicit kits

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

## Findings

The source descriptors are meaningful, but the browser consumers are not auditable. Input mutates state directly, movement rejection is silent, grass source patches are converted to one cone instance per patch without parity rows, cloud geometry is cached by cloud id without cache/source verification, and renderer submission has no consumption ledger.

The next implementation should preserve the current scene and add source/consumer proof around it.

## Next safe ledge

```txt
MyCozyIsland Source/Consumer Parity Ledger + Input Result Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm start: not run
npm run check: unavailable
browser smoke: not run
fixture: not run because proof modules do not exist yet
```
