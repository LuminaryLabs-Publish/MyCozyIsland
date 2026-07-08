# MyCozyIsland breakdown — Cloudform Route Version Authority + Host Action Fixture Gate

**Timestamp:** `2026-07-08T01:00:43-04:00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Branch:** `main`

**Selected next slice:** `MyCozyIsland Cloudform Route Version Authority + Host Action Fixture Gate`

## Selection reason

`LuminaryLabs-Publish/MyCozyIsland` was selected because the central `LuminaryLabs-Dev/LuminaryLabs` Publish repo ledger showed it as the oldest eligible tracked non-Cavalry repo by latest review timestamp.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest eligible central ledger timestamps checked at the start of this pass:

```txt
MyCozyIsland      2026-07-07T23:31:44-04:00  selected
IntoTheMeadow     2026-07-07T23:40:40-04:00
ZombieOrchard     2026-07-07T23:48:44-04:00
HorrorCorridor    2026-07-08T00:00:20-04:00
TheUnmappedHouse  2026-07-08T00:08:03-04:00
TheOpenAbove      2026-07-08T00:21:15-04:00
AetherVale        2026-07-08T00:28:42-04:00
PhantomCommand    2026-07-08T00:41:39-04:00
PrehistoricRush   2026-07-08T00:49:44-04:00
TheCavalryOfRome  excluded
```

Publish organization repositories observed:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland      selected
PhantomCommand
PrehistoricRush
TheCavalryOfRome  excluded
TheOpenAbove
TheUnmappedHouse
ZombieOrchard
```

## Source files checked

```txt
index.html
src/main-cloudform.js
src/kits/ocean-island-landform-domain/index.js
src/kits/island-foliage-domain/index.js
src/kits/ocean-floor-domain/index.js
src/kits/grass-object-domain/index.js
src/kits/grass-wind-domain/index.js
src/kits/campfire-object-domain/index.js
src/kits/smoke-particle-domain/index.js
src/kits/fenced-clearing-domain/index.js
src/kits/mattatz-clouds-domain/index.js
src/kits/cozy-hero-cloud-form-kit/index.js
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/*.md
```

## Current read

`MyCozyIsland` is a standalone static Three.js cozy island scene with domain-kit sourced terrain, ocean floor, foliage, clearing, campfire, smoke, grass, and hero-cloud descriptors.

The live route is now:

```txt
index.html
  -> canvas#game
  -> #cloud-loader
  -> #error
  -> ./src/main-cloudform.js?v=hero-cloud-3
```

This is an important correction over the previous `.agent` pass, which still documented `./src/main-cloudform.js?v=hero-cloud-2` as the active entry.

`src/main-cloudform.js` remains the runtime authority for source construction, mesh adapters, renderer setup, cloud point-cache creation, frame animation, scroll rail, pointer look, key state, clearing movement, and the limited `globalThis.CozyIsland` projection.

The highest-value next cut is not visual expansion. The project first needs a stable host contract around the active route version, source fingerprints, action frames, movement results, rail snapshots, cloud descriptor/cache snapshots, and deterministic fixture replay.

## Interaction loop

```txt
current static boot loop:
  browser opens index.html
  -> fixed canvas#game fills viewport
  -> loader starts at bottom of screen
  -> module import loads ./src/main-cloudform.js?v=hero-cloud-3
  -> main-cloudform imports Three.js from CDN
  -> main-cloudform imports local domain kits
  -> main() creates island, floor, foliage, grass, clearing, campfire, smoke, and cloud source contracts
  -> renderer mounts terrain, ocean, foam, path, foliage, fence, campfire, smoke, grass, and hero cloud objects
  -> loader fades after setup
  -> frame loop animates campfire, smoke, cloud drift, camera rail, and first-person movement
```

```txt
current player-facing loop:
  page loads into distant sky/island view
  -> wheel scroll changes progress along a camera rail
  -> pointer drag adjusts rail yaw/look and later first-person yaw/pitch
  -> camera approaches island and descends into clearing
  -> once progress >= firstPersonThreshold, keyboard movement is enabled
  -> movement tries to update the avatar anchor inside the fenced clearing
  -> boolean valid(next) blocks outside-clearing or campfire-keepout movement
  -> cloud point layer drifts subtly every frame
  -> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
```

```txt
target authority loop:
  active route descriptor resolves ./src/main-cloudform.js?v=hero-cloud-3
  -> source profile captures canonical seeds, dimensions, counts, radii, thresholds, and version query
  -> source fingerprint records deterministic scene-source identity
  -> scene source snapshot records source contracts without renderer object references
  -> ActionFrame normalizes wheel, pointer, key, frame, fixture, and host commands
  -> action reducer emits ActionResult accepted/rejected/unchanged
  -> movement reducer emits MovementPolicyResult with stable rejection reason
  -> camera rail service emits RailSnapshot for progress, eased phase, camera position, look target, and first-person gate
  -> hero cloud service emits HeroCloudDescriptorSnapshot, HeroCloudCacheSnapshot, and CloudDriftResult
  -> HostState records progress, player pose, pointer state, key state, journals, rail snapshot, movement result, and cloud drift summary
  -> globalThis.CozyIsland remains backward-compatible
  -> additive globalThis.CozyIslandHost exposes diagnostics, source snapshots, action application, fixture scripts, and runSmoke
```

## Domains in use

```txt
static app shell:
  html-document, viewport-lock, canvas-surface, loader-overlay, error-panel, module-entry-route

route authority:
  active-entry-version, route-query-token, source-profile, source-fingerprint, source-snapshot

runtime host:
  three-cdn-runtime, renderer-host, scene-root, camera-root, light-rig, animation-loop, resize-handler, frame-clock

source composition:
  island-landform, island-height-sampling, island-mask-sampling, shoreline-contract, ocean-floor-source, ocean-floor-heightfield, ocean-floor-object-placement, water-material, foliage-graph, path-network, object-exclusion-policy

render adapters:
  terrain-mesh-adapter, ocean-floor-mesh-adapter, water-plane-adapter, shoreline-foam-adapter, path-mesh-adapter, foliage-object-adapter, fence-post-adapter, campfire-render-adapter, smoke-points-adapter, grass-instancing-adapter, hero-cloud-point-adapter

clearing and movement:
  fenced-clearing-source, player-avatar-anchor, collision-boundary, first-person-threshold, first-person-pose, keyboard-state, pointer-look-state, clearing-boundary-policy, campfire-keepout-policy, movement-policy-result

camera rail:
  scroll-progress, rail-phase-sampler, rail-camera-position, rail-look-target, first-person-gate, rail-snapshot

atmosphere and ambient motion:
  grass-placement, grass-batch-descriptor, grass-wind, campfire-object-graph, campfire-light, smoke-particle-descriptor, smoke-runtime, hero-cloud-form, hero-cloud-layer, hero-cloud-cache, hero-cloud-drift

host and replay next:
  legacy-global-cozy-island, cozy-island-host, host-state, diagnostics-snapshot, action-frame, action-result, action-journal, input-journal, fixture-script, replay-parity-smoke
```

## Services that the kits offer

```txt
ocean-island-landform-domain:
  createOceanIslandLandformState
  sampleIslandHeight
  sampleIslandMasks
  createOceanIslandLandformRenderContract
  creates source-owned island dimensions, deterministic coastline variation, heightfield samples, masks, and shoreline points

island-foliage-domain:
  createIslandPathNetwork
  createDenseCozyIslandObjectGraph
  createDenseCozyIslandRenderContract
  creates path segments, object ids, transforms, procedural foliage, rocks, driftwood, reef objects, and render contracts

ocean-floor-domain:
  createOceanFloorState
  sampleOceanFloorHeight
  createOceanFloorHeightfield
  createOceanFloorObjectPlacements
  createOceanFloorRenderContract
  creates bathymetry, shelf/deep masks, sea-floor object placements, and water material settings

grass-object-domain:
  createGrassPatchPlacementContract
  createGrassPatchBatchDescriptors
  creates filtered grass patch placements and static batch descriptors with path/exclusion avoidance

grass-wind-domain:
  createGrassWindDescriptor
  creates normalized wind direction, base sway, gust strength, gust frequency, and phase seed

campfire-object-domain:
  createCampfireObjectGraph
  createCampfireObject
  creates campfire root, firewood ring, ember bed, flame emitter, smoke emitter anchor, warm light, and collision data

smoke-particle-domain:
  createSmokeParticleDescriptor
  creates particle count, spawn radius, lifespan, rise speed, turbulence, wind response, and soft smoke render hints

fenced-clearing-domain:
  createFencedClearingGraph
  creates fence posts, invisible player avatar anchor, clearing collision boundary, clearance zones, and object exclusion zones

cozy-hero-cloud-form-kit:
  createCozyHeroCloudFormDescriptor
  createCozyHeroCloudLayerDescriptor
  createCozyHeroCloudRenderContract
  creates the hero cloud form, layer, point-cloud parameters, placement, lighting, drift, and renderer boundary descriptor

mattatz-clouds-domain:
  createMattatzCloudsState
  createMattatzCloudRenderContract
  wraps the hero-cloud form kit into the live cloud render contract with weather, cloud count, layer id, and source kit identity

main-cloudform runtime adapters:
  fail
  setLoad
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
  rand
  cloudMaterial
  heroCloudGeometry
  heroCloudGroup
  main
  adapt source contracts into Three.js scene objects, animate ambient systems, and expose the limited legacy host surface
```

## Kit inventory

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
  cozy-clearing-boundary-kit
  cozy-campfire-keepout-kit
  cozy-legacy-global-host-kit

next-cut kits:
  cozy-active-route-version-kit
  cozy-source-profile-kit
  cozy-source-fingerprint-kit
  cozy-scene-source-snapshot-kit
  cozy-host-state-contract-kit
  cozy-action-frame-contract-kit
  cozy-action-result-contract-kit
  cozy-action-rejection-reason-kit
  cozy-action-journal-kit
  cozy-input-journal-kit
  cozy-rail-state-kit
  cozy-rail-snapshot-kit
  cozy-movement-policy-result-kit
  cozy-clearing-boundary-result-kit
  cozy-campfire-keepout-result-kit
  cozy-hero-cloud-descriptor-snapshot-kit
  cozy-hero-cloud-cache-snapshot-kit
  cozy-cloud-drift-result-kit
  cozy-gamehost-diagnostics-kit
  cozy-fixture-script-runner-kit
  cozy-replay-parity-smoke-kit

deferred kits:
  cozy-render-extraction-kit
  cozy-pointer-lock-kit
  cozy-touch-controls-kit
  cozy-save-load-kit
  cozy-ocean-shader-upgrade-kit
  cozy-grass-fidelity-rebuild-kit
  cozy-performance-budget-kit
  cozy-pages-health-kit
```

## Active blockers

```txt
1. index.html now points to ./src/main-cloudform.js?v=hero-cloud-3, while previous docs still recorded hero-cloud-2.
2. main-cloudform.js is very compact, so source seams are hard to review and patch safely.
3. No route-version descriptor exists for the active module URL and query token.
4. Source construction is deterministic in practice but not represented as a first-class source profile or fingerprint.
5. DOM wheel/pointer/key events mutate progress, drag, key, yaw, pitch, and movement state directly.
6. valid(next) returns boolean only and collapses outside-clearing and campfire-keepout into the same silent rejection.
7. First-person movement silently ignores rejected movement.
8. rail sampling is internal and does not expose serializable rail snapshots.
9. heroCloudGeometry caches BufferGeometry by cloud id without descriptor snapshots, attribute-range snapshots, or cache fingerprints.
10. hero cloud drift mutates scene object positions each frame without a replayable CloudDriftResult.
11. globalThis.CozyIsland remains too small for diagnostics or fixture replay.
12. No DOM-free replay fixture proves route detection, source determinism, movement policy, rail phase, cloud cache stability, or cloud drift replay.
```

## Recommended next work

```txt
MyCozyIsland Cloudform Route Version Authority + Host Action Fixture Gate
```

Build order:

```txt
preserve current index.html, visuals, cloud loader, error panel, canvas route, and globalThis.CozyIsland compatibility
-> add route descriptor for ./src/main-cloudform.js?v=hero-cloud-3
-> add SourceProfile constants for live seeds, dimensions, radii, counts, thresholds, and query token
-> add SourceFingerprint helper from SourceProfile and domain-kit source contracts
-> add SceneSourceSnapshot helper that excludes Three.js object references
-> add HostState contract with progress, player pose, pointer state, key state, frame, latestResult, rail snapshot, cloud drift summary, input journal, and result journal
-> add ActionFrame contract for wheel, pointer, key, frame, host, and fixture commands
-> add ActionResult contract with accepted/rejected/unchanged status and stable reason
-> split movement policy into ClearingBoundaryResult and CampfireKeepoutResult
-> add RailSnapshot service around current rail sampling
-> add HeroCloudDescriptorSnapshot from mattatz/cloud form contract
-> add HeroCloudCacheSnapshot with cache key, point count, bounding sphere, attribute names, size/alpha/tint ranges, and fingerprint
-> wrap per-frame hero cloud movement in CloudDriftResult
-> expose additive globalThis.CozyIslandHost with getState, getDiagnostics, getSourceProfile, getSourceFingerprint, getSceneSourceSnapshot, getHeroCloudSnapshot, getHeroCloudCacheSnapshot, getRailSnapshot, getActionJournal, applyActionFrame, applyFixtureScript, and runSmoke
-> add DOM-free fixtures for route version, source fingerprint stability, hero cloud descriptor shape, hero cloud cache stability, scroll clamp, pointer gate, rail phase, first-person movement rejection, clearing rejection, campfire keepout rejection, movement acceptance, cloud drift replay, and host journal parity
```

## Acceptance target

```txt
- index.html still loads the live cloudform route and existing visuals remain unchanged.
- globalThis.CozyIsland keeps cloudContract, cloudPointCache, and getScrollProgress.
- globalThis.CozyIslandHost is additive and does not replace the existing surface.
- Route version snapshot reports hero-cloud-3.
- Source fingerprint is deterministic across two in-memory builds.
- Hero cloud descriptor and cache snapshots can be read without touching DOM nodes.
- Movement rejection returns stable reasons instead of silent boolean failure.
- Rail snapshots expose progress/eased progress/camera/look/first-person gate.
- Cloud drift can be advanced by a deterministic fixture frame.
- DOM-free smoke proves accepted, rejected, unchanged, and replay parity cases.
```

## Validation

No runtime source files changed in this pass.

No local build or smoke test was run because this was an internal documentation and tracking update only.
