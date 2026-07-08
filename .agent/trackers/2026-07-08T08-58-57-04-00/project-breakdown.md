# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T08:58:57-04:00`

## Selection

```txt
selected repo: LuminaryLabs-Publish/MyCozyIsland
selection rule: compare full LuminaryLabs-Publish list against LuminaryLabs-Dev/LuminaryLabs tracked ledger first
excluded repo: LuminaryLabs-Publish/TheCavalryOfRome
selection reason: no checked non-Cavalry repo was fully new, ledger-absent, undocumented, or missing root .agent/START_HERE.md; selected oldest eligible fallback needing host-proof implementation wiring
branch used: main
new branch created: no
runtime source changed: no
```

## Publish repos checked

```txt
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/PrehistoricRush
LuminaryLabs-Publish/TheCavalryOfRome   excluded
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/TheUnmappedHouse
LuminaryLabs-Publish/ZombieOrchard
```

## Interaction loop

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-3
  -> canvas#game, loader, and error panel
  -> Three.js CDN import
  -> local domain-kit imports
  -> landform/floor/foliage/grass/wind/clearing/campfire/smoke/cloud descriptors
  -> inline Three.js adapters build the visual scene
  -> wheel scroll samples camera rail progress
  -> pointer drag adjusts yaw/look state
  -> keyboard movement unlocks after first-person threshold
  -> movement policy accepts/rejects clearing and campfire movement
  -> animation loop updates campfire, smoke, camera, movement, and hero-cloud drift
  -> globalThis.CozyIsland exposes legacy compatibility diagnostics
  -> target globalThis.CozyIslandHost exposes additive proof diagnostics
```

## Domains in use

```txt
static browser shell
route authority
source authority
scene composition
renderer host
terrain render
water/shoreline render
ocean floor render
path render
foliage render
fence render
campfire render
smoke runtime
grass placement/render
cloud source
hero-cloud point-cache render
scroll camera rail
pointer look
keyboard movement
movement policy
host diagnostics
fixture proof
```

## Services that kits offer

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

grass-wind-domain:
  createGrassWindDescriptor

campfire-object-domain:
  createCampfireObjectGraph

smoke-particle-domain:
  createSmokeParticleDescriptor

fenced-clearing-domain:
  createFencedClearingGraph

mattatz-clouds-domain:
  createMattatzCloudsState
  createMattatzCloudRenderContract

cozy-hero-cloud-form-kit:
  create readable hero-cloud descriptor intent
  preserve lobe/point/placement/drift assumptions for renderer handoff
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
cozy-route-version-result-kit
cozy-source-profile-kit
cozy-source-fingerprint-kit
cozy-scene-source-snapshot-kit
cozy-host-snapshot-kit
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

## Files changed in publish repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T08-58-57-04-00-host-proof-dsk-breakdown.md
.agent/render-audit/2026-07-08T08-58-57-04-00-render-host-proof-readback.md
.agent/host-proof-audit/2026-07-08T08-58-57-04-00-implementation-wire-map.md
.agent/trackers/2026-07-08T08-58-57-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T08-58-57-04-00.md
.agent/kit-registry.json
```

## Main finding

`MyCozyIsland` does not need a visual rewrite next. It needs a host-proof cutover that turns the browser facts already present in `index.html` and `src/main-cloudform.js` into typed, replayable records.

The most important implementation boundary is:

```txt
pure src/host-proof helpers first
  -> DOM-free fixture-cases.mjs
  -> additive main-cloudform.js wiring
  -> additive globalThis.CozyIslandHost
  -> preserve globalThis.CozyIsland
```

## Next safe ledge

```txt
MyCozyIsland Host Proof Implementation Wire Map
```

Stop when the fixture can prove route version, source fingerprint determinism, scene source snapshot completeness, movement rejection reasons, camera rail determinism, hero-cloud descriptor/cache readback, cloud drift determinism, and additive host snapshot output without opening a browser.

## Validation limits

```txt
performed:
  GitHub connector repo search/read
  GitHub connector file reads
  GitHub connector writes to main
  docs consistency pass

not performed:
  local checkout
  npm install
  npm run start
  static server
  browser smoke
  Playwright smoke
  GitHub Pages live route check
  runtime source edit
```
