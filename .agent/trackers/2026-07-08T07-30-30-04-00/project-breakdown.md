# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T07:30:30-04:00`

## Plan ledger

**Goal:** Compare the current `LuminaryLabs-Publish` repo list against the central ledger, choose one eligible repo, and update repo-local `.agent` docs with the next concrete host-proof acceptance slice.

**Checklist:**

- [x] Listed accessible `LuminaryLabs-Publish` repos.
- [x] Compared Publish repos against `LuminaryLabs-Dev/LuminaryLabs` central ledger entries.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Checked root `.agent/START_HERE.md` state for sampled eligible repos.
- [x] Selected one repo only: `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Updated root `.agent` docs.
- [x] Added a host-proof acceptance ledger.
- [x] Added this timestamped tracker entry.
- [x] Added a timestamped turn-ledger entry.
- [x] Updated the repo-local kit registry.
- [x] Updated central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.
- [x] Added central internal change-log entry.
- [ ] Runtime source code was not changed.
- [ ] Browser/static-server validation was not run.

## Publish repo comparison

Accessible `LuminaryLabs-Publish` repo list checked:

```txt
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheUnmappedHouse
```

Central ledger entries were found for the checked non-excluded repos:

```txt
AetherVale
TheOpenAbove
MyCozyIsland
IntoTheMeadow
ZombieOrchard
PhantomCommand
HorrorCorridor
PrehistoricRush
TheUnmappedHouse
```

Root `.agent/START_HERE.md` state was sampled for the current eligible set and found present for the checked follow-up candidates.

`LuminaryLabs-Publish/TheCavalryOfRome` was not selected and remains excluded by standing rule.

## Selection result

`LuminaryLabs-Publish/MyCozyIsland` was selected as the fallback follow-up target.

Reason:

```txt
No checked non-Cavalry Publish repo was fully new, absent from the central ledger, or missing root .agent/START_HERE.md state.

MyCozyIsland already has stable route/source docs, but the repo-local kit registry was stale relative to the latest host-proof direction, and the next implementation slice needed a concrete acceptance ledger rather than only a broad fixture-matrix label.
```

## Current product read

`MyCozyIsland` is a standalone static Three.js cozy island scene.

The active route is:

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-3
```

The browser route owns:

```txt
canvas#game
cloud-loader UI
error panel
Three.js CDN import
local source descriptor kit imports
source contract construction
inline render adapters
scroll camera rail
pointer drag look/yaw
keyboard movement after first-person threshold
clearing/campfire movement policy
campfire animation
smoke particle animation
hero-cloud geometry cache
hero-cloud drift
legacy globalThis.CozyIsland diagnostics
```

## Interaction loop

```txt
static route loads
  -> cloud loader starts
  -> main-cloudform imports Three.js and local kits
  -> source descriptors are built for island, ocean floor, grass, wind, clearing, campfire, smoke, and clouds
  -> renderer adapters convert descriptors to Three.js scene objects
  -> camera starts in sky/island view
  -> scroll advances rail progress toward first-person clearing view
  -> pointer drag controls look/yaw
  -> keyboard movement unlocks after first-person threshold
  -> movement policy accepts/rejects clearing/campfire movement
  -> frame loop updates smoke, campfire, camera, and cloud drift
  -> legacy CozyIsland diagnostics expose limited runtime facts
```

## Domains in use

```txt
my-cozy-island
├─ static-browser-shell
│  ├─ html-document
│  ├─ canvas-host
│  ├─ cloud-loader-ui
│  └─ error-panel-ui
├─ route-authority
│  ├─ script-token
│  ├─ hero-cloud-3-route-version
│  └─ missing RouteVersionResult
├─ source-authority
│  ├─ island-landform-source
│  ├─ ocean-floor-source
│  ├─ foliage-source
│  ├─ grass-placement-source
│  ├─ grass-wind-source
│  ├─ fenced-clearing-source
│  ├─ campfire-source
│  ├─ smoke-source
│  ├─ mattatz-cloud-source
│  ├─ cozy-hero-cloud-source
│  ├─ missing SourceProfile
│  ├─ missing SourceFingerprint
│  └─ missing SceneSourceSnapshot
├─ render-authority
│  ├─ terrain-mesh-adapter
│  ├─ ocean-floor-mesh-adapter
│  ├─ water-plane-adapter
│  ├─ shoreline-foam-adapter
│  ├─ path-render-adapter
│  ├─ foliage-render-adapter
│  ├─ fence-render-adapter
│  ├─ campfire-render-adapter
│  ├─ smoke-particle-runtime
│  ├─ grass-instancing-adapter
│  └─ hero-cloud-point-renderer
├─ interaction-authority
│  ├─ scroll-progress-state
│  ├─ pointer-look-state
│  ├─ keyboard-input-state
│  ├─ first-person-threshold-gate
│  ├─ missing ActionFrame
│  └─ missing ActionResult
├─ movement-authority
│  ├─ player-anchor
│  ├─ clearing-boundary-policy
│  ├─ campfire-keepout-policy
│  └─ missing MovementPolicyResult
├─ camera-authority
│  ├─ rail-progress
│  ├─ camera sample curve
│  ├─ look target
│  └─ missing CameraRailSnapshot
├─ cloud-authority
│  ├─ hero-cloud-descriptor
│  ├─ point-cloud geometry cache
│  ├─ savedPointClouds list
│  ├─ drift runtime
│  ├─ missing HeroCloudDescriptorSnapshot
│  ├─ missing HeroCloudCacheSnapshot
│  └─ missing CloudDriftResult
└─ diagnostics-proof
   ├─ legacy globalThis.CozyIsland
   ├─ missing globalThis.CozyIslandHost
   ├─ missing host snapshot
   ├─ missing journals
   └─ missing DOM-free fixture runner
```

## Services offered by current kits

```txt
ocean-island-landform-domain
  createOceanIslandLandformState
  sampleIslandHeight
  sampleIslandMasks
  createOceanIslandLandformRenderContract

island-foliage-domain
  createIslandPathNetwork
  createDenseCozyIslandObjectGraph
  createDenseCozyIslandRenderContract

ocean-floor-domain
  createOceanFloorState
  createOceanFloorRenderContract

grass-object-domain
  createGrassPatchPlacementContract
  createGrassPatchBatchDescriptors
  filters water/beach/wet-sand/rock/cliff/path/exclusion placements

grass-wind-domain
  createGrassWindDescriptor

campfire-object-domain
  createCampfireObjectGraph

smoke-particle-domain
  createSmokeParticleDescriptor

fenced-clearing-domain
  createFencedClearingGraph
  emits player anchor, collision boundary, clearance zones, and exclusion zones

mattatz-clouds-domain
  createMattatzCloudsState
  createMattatzCloudRenderContract

cozy-hero-cloud-form-kit
  creates readable hero-cloud form descriptors
  hands point-cloud/lobe/placement intent to the renderer
```

## Kits identified

Implemented explicit kits:

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
```

Next-cut proof kits:

```txt
cozy-active-route-version-kit
cozy-route-script-token-kit
cozy-source-profile-kit
cozy-source-fingerprint-kit
cozy-scene-source-snapshot-kit
cozy-action-frame-contract-kit
cozy-action-result-contract-kit
cozy-action-rejection-reason-kit
cozy-movement-policy-result-kit
cozy-clearing-boundary-result-kit
cozy-campfire-keepout-result-kit
cozy-camera-rail-snapshot-kit
cozy-hero-cloud-descriptor-snapshot-kit
cozy-hero-cloud-cache-snapshot-kit
cozy-cloud-drift-result-kit
cozy-action-journal-kit
cozy-input-journal-kit
cozy-gamehost-diagnostics-kit
cozy-dom-free-fixture-runner-kit
cozy-replay-parity-smoke-kit
```

## New audit artifact

```txt
.agent/host-proof-audit/acceptance-ledger.md
```

The new ledger defines required contracts, concrete fixture IDs, accepted/rejected result cases, implementation order, and the stop line for the next code pass.

## Next safe ledge

```txt
MyCozyIsland Host Proof Acceptance Fixture Gate
```

Build the proof records first. Do not change visuals, cloud style, terrain, or route behavior in the same pass.

## Validation

Docs-only pass.

No runtime code, package files, or route files were changed.

No local browser launch, static server, package command, Playwright test, build, or GitHub Pages validation was run.
