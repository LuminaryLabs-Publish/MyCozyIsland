# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T04:10:24-04:00`

## Selection result

The full accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

Checked Publish repos:

```txt
LuminaryLabs-Publish/AetherVale          root .agent present
LuminaryLabs-Publish/HorrorCorridor      root .agent present
LuminaryLabs-Publish/IntoTheMeadow       root .agent present
LuminaryLabs-Publish/MyCozyIsland        selected by oldest follow-up alignment
LuminaryLabs-Publish/PhantomCommand      root .agent present
LuminaryLabs-Publish/PrehistoricRush     root .agent present
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        root .agent present
LuminaryLabs-Publish/TheUnmappedHouse    root .agent present
LuminaryLabs-Publish/ZombieOrchard       root .agent present
```

No checked non-Cavalry Publish repo was found that was fully new, absent from the central ledger, or missing root `.agent/START_HERE.md` state.

`MyCozyIsland` was selected as the oldest eligible root-agent follow-up target among checked repos because its latest root alignment was still `2026-07-08T02:09:17-04:00`, and its next safe ledge is still a high-value host proof seam rather than a visual rewrite.

## Interaction loop

```txt
index.html
  -> canvas#game, cloud loader, and error panel
  -> ./src/main-cloudform.js?v=hero-cloud-3
  -> Three.js CDN import
  -> local source-domain kit imports
  -> island, floor, foliage, grass, clearing, campfire, smoke, and cloud descriptors
  -> inline Three.js render adapters
  -> scroll camera rail from sky view into clearing
  -> pointer look state
  -> keyboard first-person movement after rail threshold
  -> movement accepted or rejected by clearing/campfire policy
  -> campfire, smoke, hero cloud drift, movement, and camera update in frame loop
  -> globalThis.CozyIsland compatibility diagnostics
```

## Domains in use

```txt
my-cozy-island
├─ static-browser-shell
│  ├─ html-canvas-host
│  ├─ cloud-loader-ui
│  └─ error-panel-ui
├─ route-entry-authority
│  ├─ active-route-script-token
│  └─ missing route-version descriptor
├─ scene-source-authoring
│  ├─ island-landform-source
│  ├─ ocean-floor-source
│  ├─ island-foliage-source
│  ├─ grass-placement-source
│  ├─ grass-wind-source
│  ├─ fenced-clearing-source
│  ├─ campfire-object-source
│  ├─ smoke-particle-source
│  └─ cloud-source-contracts
├─ renderer-host
│  ├─ terrain mesh adapter
│  ├─ ocean floor mesh adapter
│  ├─ water and foam adapters
│  ├─ path, foliage, fence, campfire, smoke, grass adapters
│  └─ hero cloud point renderer
├─ interaction-host
│  ├─ scroll-progress-state
│  ├─ camera-rail-sampler
│  ├─ pointer-look-state
│  ├─ keyboard-movement-state
│  ├─ first-person-threshold-gate
│  ├─ clearing-boundary-policy
│  └─ campfire-keepout-policy
├─ cloud-runtime
│  ├─ hero-cloud-geometry-cache
│  ├─ hero-cloud-point-cloud-descriptor
│  └─ cloud-drift-frame-update
└─ diagnostics
   ├─ globalThis.CozyIsland compatibility surface
   └─ missing additive CozyIslandHost proof surface
```

## Kit services offered now

```txt
ocean-island-landform-domain
  createOceanIslandLandformState
  createOceanIslandLandformRenderContract
  sampleIslandHeight
  sampleIslandMasks

island-foliage-domain
  createIslandPathNetwork
  createDenseCozyIslandObjectGraph
  createDenseCozyIslandRenderContract

ocean-floor-domain
  createOceanFloorState
  createOceanFloorRenderContract

grass-object-domain
  createGrassPatchPlacementContract

grass-wind-domain
  createGrassWindDescriptor

campfire-object-domain
  createCampfireObjectGraph

smoke-particle-domain
  createSmokeParticleDescriptor

fenced-clearing-domain
  createFencedClearingGraph

mattatz-clouds-domain
  createMattatzCloudsState
  createMattatzCloudRenderContract

cozy-hero-cloud-form-kit
  creates readable hero cloud form descriptors
  keeps cloud volume out of the camera corridor
  hands cached point-cloud puff intent to renderer
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
cozy-clearing-boundary-kit
cozy-campfire-keepout-kit
cozy-legacy-global-host-kit
```

Next-cut proof kits:

```txt
cozy-active-route-version-kit
cozy-route-query-token-kit
cozy-source-profile-kit
cozy-source-fingerprint-kit
cozy-scene-source-snapshot-kit
cozy-action-frame-contract-kit
cozy-action-result-contract-kit
cozy-action-rejection-reason-kit
cozy-movement-policy-result-kit
cozy-clearing-boundary-result-kit
cozy-campfire-keepout-result-kit
cozy-rail-state-kit
cozy-rail-snapshot-kit
cozy-hero-cloud-descriptor-snapshot-kit
cozy-hero-cloud-cache-snapshot-kit
cozy-cloud-drift-result-kit
cozy-action-journal-kit
cozy-input-journal-kit
cozy-gamehost-diagnostics-kit
cozy-fixture-script-runner-kit
cozy-replay-parity-smoke-kit
```

## Main finding

The source-domain side is comparatively healthy. The weak seam is host authority: the active route token, source fingerprint, source snapshot, camera rail state, movement rejection reasons, cloud cache state, and cloud drift results are all observable indirectly but not yet returned as stable result objects.

The next safe implementation run should add the **Cloudform Route Version Authority + Host Action Fixture Gate** without changing visuals.

## Validation status

No runtime code changed.

No local build, static server, browser smoke, or Playwright run was performed in this documentation-only pass.
