# Project Breakdown: MyCozyIsland

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T10-28-44-04-00`

## Plan ledger

**Goal:** Refresh one eligible Publish repo's root `.agent` state after comparing the full accessible `LuminaryLabs-Publish` repo list against the central `LuminaryLabs-Dev/LuminaryLabs` ledger, then record the selected repo's interaction loop, domains, services, kits, gaps, and next safe implementation ledge.

**Checklist**

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compared non-excluded repos against central ledger and root `.agent` state.
- [x] Selected only `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Read `index.html` and confirmed the active route token is `hero-cloud-4`.
- [x] Read `src/main-cloudform.js` import, composition, movement, frame, and host-surface excerpts.
- [x] Read root `.agent` docs and kit registry.
- [x] Identified stale `hero-cloud-3` references in `.agent` docs/registry.
- [x] Added timestamped architecture, render, interaction, host-proof, tracker, and turn-ledger entries.
- [x] Updated root `.agent` docs and kit registry.
- [x] Updated central `LuminaryLabs-Dev/LuminaryLabs` ledger and internal change log.
- [ ] Did not change runtime source code.
- [ ] Did not run browser/static-server validation.

## Selection result

```txt
selected repo: LuminaryLabs-Publish/MyCozyIsland
selection rule: no new/missing/undocumented Publish repo found, so use oldest eligible fallback
reason: MyCozyIsland had the oldest observed root-agent alignment among eligible fallback candidates and still had a concrete host-proof seam
new finding: the active route is hero-cloud-4, while previous .agent docs and registry still referenced hero-cloud-3
excluded repo: LuminaryLabs-Publish/TheCavalryOfRome
```

## Publish repo comparison

```txt
AetherVale:
  state: ledgered with root .agent
  observed latest alignment: 2026-07-08T10-19-57-04-00
  not selected: newer than MyCozyIsland

HorrorCorridor:
  state: ledgered with root .agent
  observed latest alignment: 2026-07-08T09:40:52-04:00
  not selected: newer than MyCozyIsland

IntoTheMeadow:
  state: ledgered with root .agent
  observed latest alignment: 2026-07-08T09:11:03-04:00
  not selected: newer than MyCozyIsland

MyCozyIsland:
  state: ledgered with root .agent
  observed previous alignment: 2026-07-08T08:58:57-04:00
  selected: oldest eligible fallback with stale route-token docs and unresolved host-proof fixture gate

PhantomCommand:
  state: ledgered with root .agent
  observed latest alignment: 2026-07-08T09:19:43-04:00
  not selected: newer than MyCozyIsland

PrehistoricRush:
  state: ledgered with root .agent
  observed latest alignment: 2026-07-08T09:29:20-04:00
  not selected: newer than MyCozyIsland

TheCavalryOfRome:
  state: excluded by standing rule
  not selected: never work on Cavalry of Rome

TheOpenAbove:
  state: ledgered with root .agent
  observed latest alignment: 2026-07-08T10-10-34-04-00
  not selected: newer than MyCozyIsland

TheUnmappedHouse:
  state: ledgered with root .agent
  observed latest alignment: 2026-07-08T10-01-57-04-00
  not selected: newer than MyCozyIsland

ZombieOrchard:
  state: ledgered with root .agent
  observed latest alignment: 2026-07-08T09-48-58-04-00
  not selected: newer than MyCozyIsland
```

## Active route

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
```

## Interaction loop

```txt
open static page
  -> load canvas, cloud loader, error panel
  -> load ./src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js from jsDelivr
  -> import local domain kits
  -> create island/ocean/grass/wind/clearing/campfire/smoke/cloud descriptors
  -> adapt descriptors into Three.js meshes, groups, points, and instancing
  -> wheel adjusts camera rail progress
  -> pointer drag adjusts orbit yaw or first-person yaw/pitch depending on progress band
  -> keyboard movement unlocks after first-person threshold
  -> movement checks clearing radius and campfire keepout inline
  -> requestAnimationFrame animates sea, smoke, fire, camera, and hero cloud drift
  -> renderer draws the scene
  -> globalThis.CozyIsland exposes compatibility data: cloudContract, cloudPointCache, getScrollProgress
```

## Domains in use

```txt
static browser shell
route script token authority
Three.js CDN runtime
source descriptor composition
island landform source domain
heightfield sampling domain
island mask sampling domain
shoreline/foam source domain
ocean floor source domain
path network domain
foliage object graph domain
grass placement domain
grass wind domain
fenced clearing domain
player anchor domain
clearing/campfire collision policy domain
campfire object graph domain
smoke particle domain
Mattatz cloud source domain
hero cloud form domain
terrain/floor/water/foam/path render adapter domain
foliage/fence/campfire/smoke/grass/cloud render host domain
scroll camera rail domain
pointer look domain
keyboard movement domain
first-person threshold domain
cloud cache domain
cloud drift domain
legacy host diagnostics domain
missing host-proof source/result/fixture domain
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
  placement filtering against masks, paths, and exclusion zones

grass-wind-domain:
  createGrassWindDescriptor

campfire-object-domain:
  createCampfireObjectGraph

smoke-particle-domain:
  createSmokeParticleDescriptor

fenced-clearing-domain:
  createFencedClearingGraph
  emit fence posts
  emit invisible player-avatar anchor
  emit collision boundary
  emit clearance zones
  emit object-exclusion zones

mattatz-clouds-domain:
  createMattatzCloudsState
  createMattatzCloudRenderContract

cozy-hero-cloud-form-kit:
  create readable hero cloud descriptor
  carry point cloud/lobe/placement/drift intent
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
  cozy-active-route-version-kit
  cozy-route-version-result-kit
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
  cozy-host-snapshot-kit
  cozy-gamehost-diagnostics-kit
  cozy-dom-free-fixture-runner-kit
  cozy-replay-parity-smoke-kit
```

## Main finding

The route token moved to `hero-cloud-4`, but previous `.agent` docs and `kit-registry.json` still pointed at `hero-cloud-3`.

That makes the next planned host-proof fixture unsafe unless the route token becomes an explicit `RouteVersionResult` and every source profile, fingerprint, snapshot, action result, movement result, camera snapshot, cloud snapshot, and host snapshot is anchored to the same active route.

## New audit artifacts

```txt
.agent/architecture-audit/2026-07-08T10-28-44-04-00-route-host-proof-dsk-breakdown.md
.agent/render-audit/2026-07-08T10-28-44-04-00-render-route-token-readback.md
.agent/interaction-audit/2026-07-08T10-28-44-04-00-action-movement-proof-map.md
.agent/host-proof-audit/2026-07-08T10-28-44-04-00-route-version-authority-sync.md
```

## Next safe ledge

```txt
MyCozyIsland Route Version Authority Sync + Host Proof Fixture Gate
```

## Validation

Docs-only update.

No runtime source files were changed.

No local static server, package command, browser route, Playwright, or GitHub Pages validation was run.
