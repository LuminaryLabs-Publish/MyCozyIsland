# Project Breakdown — MyCozyIsland

**Timestamp:** `2026-07-09T14-28-45-04-00`

## Goal

Refresh repo-local internal docs for one eligible `LuminaryLabs-Publish` repo, identify the current interaction loop/domains/services/kits, repair repo-local/central pointer drift, and log the result centrally.

## Checklist

- [x] Compared the accessible `LuminaryLabs-Publish` repository list.
- [x] Compared checked repos against `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected exactly one repo: `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Identified the current interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by current and planned kits.
- [x] Identified implemented, runtime-implied, and next-cut kits.
- [x] Updated required root `.agent` docs.
- [x] Added timestamped architecture, render, interaction, cloud-system, grass-system, host-proof, and deploy audits.
- [x] Added timestamped turn-ledger entry.
- [x] Updated repo-local kit registry.
- [x] Updated central `LuminaryLabs-Dev/LuminaryLabs` ledger and change log.
- [x] Pushed only to `main`.

## Selection result

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`MyCozyIsland` was selected because central tracking still pointed to `2026-07-09T11-39-50-04-00` while repo-local root docs claimed `2026-07-09T14-20-00-04-00` and pointed at timestamped files that were not present. This pass repairs that `.agent` pointer drift and records a complete timestamped audit set.

## Publish repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest observed 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest observed 2026-07-09T12-30-09-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest observed 2026-07-09T14-16-00-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest observed 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest observed 2026-07-09T13-38-15-04-00
LuminaryLabs-Publish/MyCozyIsland         selected / central pointer drift / root .agent timestamped target missing
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest observed 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest observed 2026-07-09T13-00-37-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest observed 2026-07-09T12-00-36-04-00
```

## Interaction loop

```txt
index.html
  -> canvas#game, cloud loader, and error panel
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN import
  -> local source-domain kit imports
  -> island, ocean floor, foliage, clearing, grass, grass wind, campfire, smoke, mattatz cloud, and hero-cloud descriptors
  -> Three.js renderer, scene, camera, lights, fog, terrain, floor, water, foam, path, foliage, fence, campfire, smoke, grass InstancedMesh, and point-cloud clouds
  -> resize / keyboard / wheel / pointer handlers mutate inline runtime state
  -> wheel mutates scroll progress directly
  -> pointer mutates yaw before first-person and yaw/pitch after first-person
  -> rail() samples sky-to-eye camera path while progress < 0.985
  -> keyboard movement unlocks when progress >= 0.985
  -> valid(next) accepts movement inside clearing radius and outside campfire keepout
  -> frame updates sea bob, camera, smoke, flame scale, cloud drift, and renderer
  -> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
```

## Domains in use

```txt
static-browser-route-domain
route-token-domain
loading-status-domain
error-panel-domain
three-render-host-domain
scene-composition-domain
island-landform-domain
ocean-floor-domain
shoreline-foam-domain
path-network-domain
foliage-object-graph-domain
fenced-clearing-domain
campfire-object-domain
smoke-particle-domain
grass-placement-domain
grass-wind-domain
hero-cloud-source-domain
hero-cloud-geometry-cache-domain
cloud-drift-domain
input-state-domain
scroll-progress-domain
pointer-look-domain
first-person-movement-domain
movement-validity-domain
camera-rail-domain
render-frame-domain
legacy-host-diagnostics-domain
planned-route-token-readback-domain
planned-source-profile-domain
planned-source-fingerprint-domain
planned-scene-source-snapshot-domain
planned-browser-input-action-frame-domain
planned-action-result-domain
planned-input-journal-domain
planned-movement-policy-result-domain
planned-camera-rail-snapshot-domain
planned-grass-placement-readback-domain
planned-grass-instance-readback-domain
planned-hero-cloud-descriptor-readback-domain
planned-hero-cloud-cache-readback-domain
planned-cloud-drift-result-domain
planned-render-host-snapshot-domain
planned-cozy-island-host-state-domain
planned-browser-consumer-fixture-domain
central-ledger-sync-domain
```

## Services offered by kits

```txt
explicit source-domain kits:
  ocean-island-landform-domain -> island state, render contract, height sampling, mask sampling
  island-foliage-domain -> dense island object graph and path network descriptors
  ocean-floor-domain -> ocean floor state and render contract
  grass-object-domain -> grass patch placement contract
  grass-wind-domain -> wind descriptor
  campfire-object-domain -> campfire object graph
  smoke-particle-domain -> smoke particle descriptor
  fenced-clearing-domain -> clearing object graph, player anchor, collision boundary, object exclusions
  mattatz-clouds-domain -> cloud state and cloud render contract
  cozy-hero-cloud-form-kit -> local hero-cloud form source named by route docs

inline browser services:
  route loader and error projection
  terrain/floor/water/foam/path/foliage/fence/campfire/smoke/grass/cloud mesh adapters
  grass InstancedMesh projection
  hero cloud geometry cache and shader material
  resize, keyboard, wheel, and pointer capture
  rail camera sampling
  first-person movement integration
  movement validity check
  cloud drift and smoke frame update
  renderer submission
  legacy globalThis.CozyIsland diagnostics
```

## Kits identified

```txt
implemented explicit kits:
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

runtime-implied kits:
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

next-cut proof kits:
  route-token-readback-kit
  source-profile-kit
  source-fingerprint-kit
  scene-source-snapshot-kit
  browser-input-action-frame-kit
  action-result-kit
  input-journal-kit
  movement-policy-result-kit
  camera-rail-snapshot-kit
  grass-placement-snapshot-kit
  grass-instance-snapshot-kit
  hero-cloud-descriptor-snapshot-kit
  hero-cloud-cache-snapshot-kit
  cloud-drift-result-kit
  render-host-snapshot-kit
  cozy-island-host-snapshot-kit
  browser-consumer-fixture-kit
  central-ledger-readback-kit
```

## Main finding

`MyCozyIsland` should not receive a visual rewrite next. The scene already composes a useful set of local descriptor kits, but the browser route still has no fixture-readable source/host proof layer, no `npm run check`, no DOM-free browser consumer fixture, and no additive `globalThis.CozyIslandHost.getState()`.

## Next safe ledge

```txt
MyCozyIsland Host Readback Pointer Repair + Browser Consumer Fixture Gate
```

## Validation

Documentation-only. Runtime source was not changed, no branch was created, no PR was created, no local npm/browser validation was run, and updates were pushed to `main`.
