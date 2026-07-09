# Project Breakdown: MyCozyIsland

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T19-50-20-04-00`

## Goal

Refresh the internal `.agent` docs for one eligible `LuminaryLabs-Publish` repo, identify interaction loop/domains/services/kits, and log the result in `LuminaryLabs-Dev/LuminaryLabs`.

## Checklist

- [x] Listed the accessible `LuminaryLabs-Publish` repo set.
- [x] Compared Publish repos against central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Read repo-local `.agent` state.
- [x] Read source anchors: `index.html`, `package.json`, `src/main-cloudform.js`.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by current kits and host adapters.
- [x] Identified implemented, runtime-implied, and next-cut kits.
- [x] Updated required root `.agent` files.
- [x] Added architecture, render, interaction, cloud-system, grass-system, host-proof, and deploy audits.
- [x] Added timestamped turn ledger.
- [x] Updated central repo ledger.
- [x] Added central internal change log.
- [x] Pushed to `main`.

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / sampled alignment 2026-07-08T18-19-43-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / sampled alignment 2026-07-08T18-58-10-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / sampled alignment 2026-07-08T17-31-22-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / sampled alignment 2026-07-08T18-41-41-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / sampled alignment 2026-07-08T19-30-31-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / sampled alignment 2026-07-08T19-21-15-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / sampled alignment 2026-07-08T18-09-21-04-00
LuminaryLabs-Publish/MyCozyIsland        selected / central catch-up plus unresolved host-proof fixture gate
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / sampled alignment 2026-07-08T18-51-55-04-00
```

## Selection reason

No checked non-Cavalry Publish repo was fully new, absent from central tracking, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`MyCozyIsland` was selected because repo-local `.agent` state had advanced beyond the central ledger and the browser-consumer host proof fixture remains unresolved.

## Source anchors read

```txt
index.html
package.json
src/main-cloudform.js
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
```

## Current route

```txt
index.html
  -> canvas#game
  -> #cloud-loader
  -> #error
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> local descriptor kits
  -> inline render/interaction/cloud/movement loop
  -> globalThis.CozyIsland compatibility diagnostics
```

## Interaction loop

```txt
static browser route
  -> load src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN and local source-domain kits
  -> create island/floor/foliage/grass/wind/clearing/campfire/smoke/cloud descriptors
  -> create scene renderer, camera, meshes, lights, fog, water, foam, path, grass, cloud geometry cache
  -> install resize, keyboard, wheel, pointer, and drag handlers
  -> wheel changes scroll progress
  -> rail() samples sky-to-eye camera curve
  -> pointer changes yaw/look
  -> keyboard movement unlocks at progress >= 0.985
  -> valid(next) accepts/rejects by clearing radius and campfire keepout
  -> frame updates sea, movement, rail/camera, smoke, flame, cloud drift, render
  -> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
```

## Domains in use

```txt
static-browser-shell
route-version-token
three-cdn-runtime
local-source-domain-runtime
island-landform-source
ocean-floor-source
foliage-object-graph
grass-placement-contract
grass-wind-descriptor
fenced-clearing-source
campfire-object-graph
smoke-particle-descriptor
mattatz-cloud-source
hero-cloud-form-source
hero-cloud-cache-runtime
hero-cloud-drift-runtime
renderer-host
camera-rail-authority
movement-policy-authority
legacy-global-diagnostics
host-proof-snapshot
browser-consumer-fixture-authority
central-ledger-sync
```

## Services

```txt
landform services: createOceanIslandLandformState, createOceanIslandLandformRenderContract, sampleIslandHeight, sampleIslandMasks
foliage services: createDenseCozyIslandObjectGraph, path network, object exclusions
ocean floor services: createOceanFloorState, createOceanFloorRenderContract
grass services: createGrassPatchPlacementContract, createGrassPatchBatchDescriptors, createGrassWindDescriptor
clearing services: createFencedClearingGraph, player anchor, collision boundary, clearance zones
campfire/smoke services: createCampfireObjectGraph, createSmokeParticleDescriptor, updateSmoke
cloud services: createMattatzCloudsState, createMattatzCloudRenderContract, heroCloudGeometry, heroCloudGroup
render services: meshGrid, terrainMesh, floorMesh, waterMesh, foamMesh, pathMesh, objGroup, fenceGroup, grassMesh, frame
interaction services: wheel progress, pointer look, keyboard movement, valid(next), rail(), fp()
host services: globalThis.CozyIsland compatibility projection
```

## Kits

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
  cozy-grass-instancing-kit
  cozy-hero-cloud-cache-kit
  cozy-hero-cloud-drift-kit
  cozy-scroll-camera-rail-kit
  cozy-pointer-look-kit
  cozy-keyboard-movement-kit
  cozy-legacy-global-host-kit

next-cut proof kits:
  cozy-route-version-result-kit
  cozy-source-profile-kit
  cozy-source-fingerprint-kit
  cozy-scene-source-snapshot-kit
  cozy-action-frame-contract-kit
  cozy-action-result-contract-kit
  cozy-movement-policy-result-kit
  cozy-camera-rail-snapshot-kit
  cozy-grass-instance-snapshot-kit
  cozy-hero-cloud-cache-snapshot-kit
  cozy-cloud-drift-result-kit
  cozy-render-host-snapshot-kit
  cozy-host-snapshot-kit
  cozy-browser-consumer-fixture-kit
  cozy-central-ledger-sync-kit
```

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T19-50-20-04-00-host-proof-central-catchup-dsk-map.md
.agent/render-audit/2026-07-08T19-50-20-04-00-render-host-readback-fixture-gap.md
.agent/interaction-audit/2026-07-08T19-50-20-04-00-route-action-movement-result-gap.md
.agent/cloud-system-audit/2026-07-08T19-50-20-04-00-cloud-cache-drift-readback-gap.md
.agent/grass-system-audit/2026-07-08T19-50-20-04-00-grass-instance-parity-gap.md
.agent/host-proof-audit/2026-07-08T19-50-20-04-00-central-ledger-catchup-fixture-scope.md
.agent/deploy-audit/2026-07-08T19-50-20-04-00-static-route-proof-validation.md
.agent/trackers/2026-07-08T19-50-20-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T19-50-20-04-00.md
```

## Central files changed

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/2026-07-08T19-50-20-04-00-my-cozy-island-central-catchup-host-proof-fixture.md
```

## Next safe ledge

```txt
MyCozyIsland Central Ledger Catch-up + Host Proof Browser Consumer Fixture Scope
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm run start: no
browser smoke: no
fixture run: no
connector read/write validation: yes
pushed to main: yes
```
