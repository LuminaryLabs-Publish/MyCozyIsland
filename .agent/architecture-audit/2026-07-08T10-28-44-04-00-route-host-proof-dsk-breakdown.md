# Route Host Proof DSK Breakdown

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T10-28-44-04-00`

## Selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

No checked non-Cavalry Publish repo was found that was fully new, central-ledger absent, undocumented, or missing root `.agent/START_HERE.md` state.

`MyCozyIsland` was selected as the oldest eligible fallback follow-up. Its root `.agent` state was present, but this pass found a concrete docs/source mismatch: prior agent docs still referenced `./src/main-cloudform.js?v=hero-cloud-3`, while `index.html` now loads `./src/main-cloudform.js?v=hero-cloud-4`.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Publish repos checked

```txt
LuminaryLabs-Publish/AetherVale          ledgered with root .agent; newer alignment observed at 2026-07-08T10-19-57-04-00
LuminaryLabs-Publish/HorrorCorridor      ledgered with root .agent; newer alignment observed at 2026-07-08T09:40:52-04:00
LuminaryLabs-Publish/IntoTheMeadow       ledgered with root .agent; newer alignment observed at 2026-07-08T09:11:03-04:00
LuminaryLabs-Publish/MyCozyIsland        selected fallback follow-up; stale route token docs found
LuminaryLabs-Publish/PhantomCommand      ledgered with root .agent; newer alignment observed at 2026-07-08T09:19:43-04:00
LuminaryLabs-Publish/PrehistoricRush     ledgered with root .agent; newer alignment observed at 2026-07-08T09:29:20-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        ledgered with root .agent; newer alignment observed at 2026-07-08T10-10-34-04-00
LuminaryLabs-Publish/TheUnmappedHouse    ledgered with root .agent; newer alignment observed at 2026-07-08T10-01-57-04-00
LuminaryLabs-Publish/ZombieOrchard       ledgered with root .agent; newer alignment observed at 2026-07-08T09-48-58-04-00
```

## Current interaction loop

```txt
index.html
  -> canvas#game
  -> cloud loader and error panel DOM
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN import
  -> local source/domain kit imports
  -> create island, ocean floor, clearing, grass, wind, campfire, smoke, and cloud descriptors
  -> build Three.js render objects inline
  -> requestAnimationFrame(frame)
  -> wheel updates scroll rail progress
  -> pointer drag updates yaw/pitch state
  -> first-person threshold unlocks keyboard movement
  -> movement policy accepts/rejects clearing/campfire movement inline
  -> smoke, campfire, sea, and hero cloud drift animate per frame
  -> renderer.render(scene, camera)
  -> globalThis.CozyIsland exposes compatibility diagnostics only
```

## Target proof loop

```txt
RouteScriptToken
  -> RouteVersionResult(hero-cloud-4)
  -> SourceProfile
  -> SourceFingerprint
  -> SceneSourceSnapshot
  -> ActionFrame
  -> ActionResult
  -> MovementPolicyResult
  -> CameraRailSnapshot
  -> HeroCloudDescriptorSnapshot
  -> HeroCloudCacheSnapshot
  -> CloudDriftResult
  -> CozyIslandHostSnapshot
  -> DOM-free fixture cases
  -> additive globalThis.CozyIslandHost readback
```

## DSK/domain breakdown

```txt
my-cozy-island
├─ static-browser-shell
│  ├─ cozy-static-shell-kit
│  ├─ cozy-cloud-loader-kit
│  └─ cozy-error-panel-kit
├─ route-authority
│  ├─ cozy-route-script-token-kit
│  ├─ cozy-active-route-version-kit
│  └─ cozy-route-version-result-kit
├─ source-authority
│  ├─ ocean-island-landform-domain
│  ├─ island-foliage-domain
│  ├─ ocean-floor-domain
│  ├─ grass-object-domain
│  ├─ grass-wind-domain
│  ├─ campfire-object-domain
│  ├─ smoke-particle-domain
│  ├─ fenced-clearing-domain
│  ├─ mattatz-clouds-domain
│  ├─ cozy-hero-cloud-form-kit
│  ├─ cozy-source-profile-kit
│  ├─ cozy-source-fingerprint-kit
│  └─ cozy-scene-source-snapshot-kit
├─ render-host
│  ├─ cozy-three-render-host-kit
│  ├─ cozy-terrain-render-kit
│  ├─ cozy-ocean-floor-render-kit
│  ├─ cozy-water-plane-kit
│  ├─ cozy-shoreline-foam-kit
│  ├─ cozy-path-render-kit
│  ├─ cozy-foliage-render-kit
│  ├─ cozy-fence-render-kit
│  ├─ cozy-campfire-render-kit
│  ├─ cozy-smoke-runtime-kit
│  ├─ cozy-grass-instancing-kit
│  ├─ cozy-hero-cloud-point-render-kit
│  ├─ cozy-hero-cloud-cache-kit
│  └─ cozy-hero-cloud-drift-kit
├─ interaction-authority
│  ├─ cozy-scroll-camera-rail-kit
│  ├─ cozy-pointer-look-kit
│  ├─ cozy-keyboard-movement-kit
│  ├─ cozy-action-frame-contract-kit
│  ├─ cozy-action-result-contract-kit
│  ├─ cozy-action-rejection-reason-kit
│  ├─ cozy-action-journal-kit
│  └─ cozy-input-journal-kit
├─ movement-authority
│  ├─ cozy-clearing-boundary-policy-kit
│  ├─ cozy-campfire-keepout-policy-kit
│  ├─ cozy-movement-policy-result-kit
│  ├─ cozy-clearing-boundary-result-kit
│  └─ cozy-campfire-keepout-result-kit
├─ camera-authority
│  ├─ cozy-rail-state-kit
│  └─ cozy-camera-rail-snapshot-kit
├─ cloud-authority
│  ├─ cozy-hero-cloud-descriptor-snapshot-kit
│  ├─ cozy-hero-cloud-cache-snapshot-kit
│  └─ cozy-cloud-drift-result-kit
└─ diagnostics-proof
   ├─ cozy-legacy-global-host-kit
   ├─ cozy-gamehost-diagnostics-kit
   ├─ cozy-host-snapshot-kit
   ├─ cozy-dom-free-fixture-runner-kit
   └─ cozy-replay-parity-smoke-kit
```

## Services offered by current kits

```txt
ocean-island-landform-domain:
  createOceanIslandLandformState
  sampleIslandHeight
  sampleIslandMasks
  createOceanIslandLandformRenderContract

island-foliage-domain:
  createIslandPathNetwork
  createDenseCozyIslandObjectGraph
  createDenseCozyIslandRenderContract

ocean-floor-domain:
  createOceanFloorState
  createOceanFloorRenderContract

grass-object-domain:
  createGrassPatchPlacementContract
  createGrassPatchBatchDescriptors
  placement filtering for masks, paths, and exclusion zones

grass-wind-domain:
  createGrassWindDescriptor

campfire-object-domain:
  createCampfireObjectGraph

smoke-particle-domain:
  createSmokeParticleDescriptor

fenced-clearing-domain:
  createFencedClearingGraph
  player-avatar anchor descriptors
  collision boundary descriptors
  clearance and object-exclusion zones

mattatz-clouds-domain:
  createMattatzCloudsState
  createMattatzCloudRenderContract

cozy-hero-cloud-form-kit:
  readable hero-cloud form descriptor
  lobe/point-cloud/placement/drift intent for renderer handoff
```

## Services needed next

```txt
resolve active route token from index.html and fixture input
return RouteVersionResult for hero-cloud-4
centralize SourceProfile constants for seeds, radii, rail samples, movement policy, cloud profile, and route token
create SourceFingerprint from SourceProfile
create SceneSourceSnapshot summaries without Three.js objects
normalize wheel/pointer/keyboard/tick into ActionFrame
return ActionResult for accepted, rejected, no-op, and changed-state outcomes
return MovementPolicyResult with locked-before-first-person, inside-clearing, clearing-boundary, and campfire-keepout reasons
sample CameraRailSnapshot without a camera object
summarize HeroCloudDescriptorSnapshot and HeroCloudCacheSnapshot
reduce CloudDriftResult deterministically for fixed dt/time inputs
expose additive CozyIslandHostSnapshot while preserving globalThis.CozyIsland
run DOM-free fixture cases without canvas, WebGL, CDN imports, or browser state
```

## Current finding

The next source implementation should start with route token authority, not renderer polish.

The stale docs were still routing acceptance around `hero-cloud-3`, while `index.html` has moved to `hero-cloud-4`. The immediate risk is that the planned fixture gate will validate the wrong route token unless route authority is promoted into its own helper and all docs/fixture IDs are synchronized before runtime source wiring.

## Next safe ledge

```txt
MyCozyIsland Route Version Authority Sync + Host Proof Fixture Gate
```

Stop after a DOM-free route/source/host fixture proves `hero-cloud-4`, source fingerprints, scene snapshots, action/result records, movement rejections, camera rail samples, cloud cache/drift summaries, and additive `globalThis.CozyIslandHost` compatibility without changing the visible scene.
