# MyCozyIsland Project Breakdown

**Generated:** `2026-07-09T08-29-38-04-00`

## Plan ledger

**Goal:** Compare `LuminaryLabs-Publish` against central tracking, choose one eligible repo, update repo-local `.agent` docs, and sync the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

**Checklist:**

- [x] Listed accessible Publish repos.
- [x] Compared checked repos against central ledger/root-agent state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected exactly one repo: `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified services that kits offer.
- [x] Identified kits.
- [x] Updated root `.agent` docs.
- [x] Added architecture, render, interaction, cloud-system, grass-system, host-proof, deploy, tracker, and turn-ledger docs.
- [x] Updated `kit-registry.json`.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [ ] Runtime source files were not changed.
- [ ] Local/browser/fixture validation was not run.

## Selection result

```txt
selected repo:
  LuminaryLabs-Publish/MyCozyIsland

reason:
  No checked non-Cavalry repo was new, central-ledger absent, root-agent missing, recently added but undocumented, or otherwise undocumented.
  MyCozyIsland was selected because the central ledger pointer still lagged behind repo-local state and remained the oldest eligible fallback pointer.
```

## Publish repo comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T06-28-53-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T07-05-52-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T06-01-30-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T07-41-29-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T08-02-33-04-00
LuminaryLabs-Publish/MyCozyIsland         selected / central ledger stale at 2026-07-09T05-38-20-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T06-20-00-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T07-19-41-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T06-10-35-04-00
```

## Interaction loop

```txt
index.html
  -> canvas#game + cloud loader + error panel
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN import
  -> local source-domain kit imports
  -> source descriptors: island, ocean floor, foliage graph, clearing graph, grass placement, grass wind, campfire, smoke, clouds
  -> renderer/scene/camera/light/fog setup
  -> mesh adapters: terrain, floor, water, foam, path, foliage, fence, campfire, smoke, grass, point clouds
  -> resize/keyboard/wheel/pointer events mutate inline state
  -> rail camera runs while progress < 0.985
  -> first-person movement unlocks when progress >= 0.985
  -> valid(next) enforces clearing radius and campfire keepout only
  -> frame updates sea, camera, smoke, flame, cloud drift, and renderer
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
planned-host-state-readback-domain
planned-browser-consumer-fixture-domain
central-ledger-sync-domain
```

## Services offered by kits

```txt
route HTML shell
route token/version selection
cloud loader progress projection
error display projection
Three.js module import
island heightfield and mask sampling
ocean floor heightfield construction
shoreline contract creation
path network mesh projection
foliage object graph projection
fenced clearing object/collision zone construction
campfire graph projection
smoke particle descriptor creation and animation
grass wind descriptor creation
grass patch placement creation
grass instanced mesh projection
hero cloud descriptor creation
hero cloud point geometry caching
cloud shader material creation
cloud drift frame update
resize handling
keyboard capture
wheel-to-scroll-progress mutation
pointer yaw/pitch mutation
rail camera sampling
first-person movement integration
movement validity check
sea bob update
flame scale update
frame render submission
legacy host diagnostic exposure
central ledger pointer sync
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

`MyCozyIsland` should not receive a visual rewrite next. The current route already composes useful local descriptor kits and a coherent Three.js scene. The missing layer is host-state proof: route/source/input/movement/rail/grass/cloud/render state should be exposed in stable records and validated by a DOM-free fixture.

## Next safe ledge

```txt
MyCozyIsland Central Ledger Host Proof Refresh + Browser Consumer Fixture Gate
```

## Validation status

Docs-only pass. No runtime source changed, no branch was created, no PR was opened, and no local/browser validation was run.
