# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T00-20-08-04-00`

## Goal

Compare the full accessible `LuminaryLabs-Publish` repo list against central tracking, choose one eligible repo, update root `.agent` docs, identify interaction loop/domains/services/kits, and log the result centrally.

## Plan ledger

- [x] Listed accessible `LuminaryLabs-Publish` repos.
- [x] Compared sampled repo state against `LuminaryLabs-Dev/LuminaryLabs` tracking.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Read repo-local `.agent` state.
- [x] Read central ledger state.
- [x] Read `package.json`, `index.html`, `src/main-cloudform.js`, grass kit, mattatz cloud kit, and hero cloud form kit.
- [x] Identified interaction loop.
- [x] Identified all domains in use.
- [x] Identified all services that the kits offer.
- [x] Identified current and next-cut kits.
- [x] Updated required root `.agent` docs.
- [x] Added architecture, render, interaction, grass-system, cloud-system, host-proof, and deploy audits.
- [x] Added timestamped tracker and turn-ledger entries.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [ ] Did not run local/browser validation.
- [ ] Did not edit runtime/source implementation files.

## Repo selection

```txt
LuminaryLabs-Publish/MyCozyIsland
```

Reason: no checked non-Cavalry Publish repo was new, absent from central tracking, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state. `MyCozyIsland` was the oldest eligible sampled fallback and still needs host projection fixture proof.

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / sampled alignment 2026-07-08T22-51-43-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / sampled alignment 2026-07-09T00-00-41-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / sampled alignment 2026-07-08T22-19-38-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / sampled alignment 2026-07-08T22-58-02-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / sampled alignment 2026-07-09T00-09-22-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / sampled alignment 2026-07-08T23-40-55-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / sampled alignment 2026-07-08T22-38-17-04-00
LuminaryLabs-Publish/MyCozyIsland         selected / oldest eligible sampled alignment 2026-07-08T21-58-34-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / sampled alignment 2026-07-08T23-19-33-04-00
```

## Interaction loop

```txt
static browser route
  -> load src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN and local source-domain kits
  -> construct island, floor, foliage, grass, wind, clearing, campfire, smoke, and cloud descriptors
  -> create Three.js renderer, scene, camera, meshes, points, lights, fog, water, foam, path, grass, cloud cache
  -> install resize, keyboard, wheel, pointerdown, pointerup, pointermove handlers
  -> wheel mutates progress directly
  -> rail() samples camera position/look while progress < 0.985
  -> pointer mutates yaw before first-person and yaw/pitch after first-person
  -> keyboard movement unlocks at progress >= 0.985
  -> valid(next) accepts or rejects movement by clearing radius and campfire keepout
  -> frame updates sea, movement, camera, smoke, flame, cloud drift, and renderer
  -> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
```

## Domains in use

```txt
static-browser-shell, cloud-loader-ui, error-panel-ui, module-entry-route, route-version-token, three-cdn-runtime, local-source-domain-runtime, island-landform-source, ocean-floor-source, foliage-source, path-network-source, grass-placement-source, grass-wind-source, fenced-clearing-source, campfire-source, smoke-particle-source, mattatz-cloud-source, cozy-hero-cloud-source, inline-three-render-host, terrain-render-consumer, floor-render-consumer, water-render-consumer, shoreline-foam-render-consumer, path-render-consumer, foliage-render-consumer, fence-render-consumer, campfire-render-consumer, smoke-runtime-consumer, grass-instancing-consumer, hero-cloud-point-render-consumer, hero-cloud-geometry-cache, hero-cloud-drift-runtime, scroll-camera-rail, pointer-look-input, keyboard-first-person-input, movement-policy, clearing-boundary-policy, campfire-keepout-policy, frame-loop-runtime, legacy-global-diagnostics, host-proof-source-records, host-state-projection, fixture-replay-contract, central-ledger-readback.
```

## Services the kits offer

```txt
createOceanIslandLandformState
createOceanIslandLandformRenderContract
sampleIslandHeight
sampleIslandMasks
createDenseCozyIslandObjectGraph
createOceanFloorState
createOceanFloorRenderContract
createGrassPatchPlacementContract
createGrassWindDescriptor
createCampfireObjectGraph
createSmokeParticleDescriptor
createFencedClearingGraph
createMattatzCloudsState
createMattatzCloudRenderContract
createCozyHeroCloudRenderContract
meshGrid
terrainMesh
floorMesh
waterMesh
foamMesh
pathMesh
objGroup
fenceGroup
campfireMesh
smokeMesh
updateSmoke
grassMesh
heroCloudGeometry
heroCloudGroup
resize
rail
valid
fp
frame
globalThis.CozyIsland
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
  cozy-smoke-runtime-kit
  cozy-grass-instancing-kit
  cozy-hero-cloud-point-render-kit
  cozy-hero-cloud-cache-kit
  cozy-hero-cloud-drift-kit
  cozy-scroll-camera-rail-kit
  cozy-pointer-look-kit
  cozy-keyboard-movement-kit
  cozy-clearing-boundary-policy-kit
  cozy-campfire-keepout-policy-kit
  cozy-legacy-global-host-kit

next-cut proof kits:
  cozy-route-version-result-kit
  cozy-source-profile-kit
  cozy-source-fingerprint-kit
  cozy-scene-source-snapshot-kit
  cozy-browser-input-action-frame-kit
  cozy-action-result-kit
  cozy-input-journal-kit
  cozy-movement-policy-result-kit
  cozy-camera-rail-snapshot-kit
  cozy-grass-instance-snapshot-kit
  cozy-hero-cloud-descriptor-snapshot-kit
  cozy-hero-cloud-cache-snapshot-kit
  cozy-cloud-drift-result-kit
  cozy-render-host-snapshot-kit
  cozy-island-host-state-kit
  cozy-browser-consumer-fixture-kit
```

## Main finding

`MyCozyIsland` should not be visually rewritten yet. The live route has enough source-domain kits and a coherent visual path, but no durable proof that the browser consumer accepted, rejected, rendered, cached, drifted, or projected the right records.

The next implementation should add pure host-proof modules, DOM-free fixture rows, and additive `globalThis.CozyIslandHost.getState()` diagnostics while preserving `globalThis.CozyIsland`.

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T00-20-08-04-00-host-projection-fixture-catchup-dsk-map.md
.agent/render-audit/2026-07-09T00-20-08-04-00-render-consumer-readback-map.md
.agent/interaction-audit/2026-07-09T00-20-08-04-00-input-action-movement-result-map.md
.agent/cloud-system-audit/2026-07-09T00-20-08-04-00-hero-cloud-cache-drift-contract.md
.agent/grass-system-audit/2026-07-09T00-20-08-04-00-grass-instance-fixture-contract.md
.agent/host-proof-audit/2026-07-09T00-20-08-04-00-cozy-island-host-state-contract.md
.agent/deploy-audit/2026-07-09T00-20-08-04-00-fixture-validation-command-map.md
.agent/trackers/2026-07-09T00-20-08-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T00-20-08-04-00.md
```

## Next safe ledge

```txt
MyCozyIsland Host Projection Fixture Catch-up + Browser Consumer Readback Gate
```

## Validation status

```txt
runtime source changed: no
local validation run: no
browser validation run: no
branch created: no
pull request created: no
pushed to main: yes
```