# MyCozyIsland Project Breakdown

**Timestamp:** `2026-07-09T08-11-12-04-00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Selected repo:** `LuminaryLabs-Publish/MyCozyIsland`

## Plan ledger

**Goal:** Refresh the repo-local `.agent` operating memory for one eligible `LuminaryLabs-Publish` repo, keep the work on `main`, and sync the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger with the current findings.

**Checklist**

- [x] Listed the accessible `LuminaryLabs-Publish` repositories through the GitHub installation.
- [x] Compared the full Publish repo list against central repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirmed no checked non-Cavalry repo was fully new, absent from the ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.
- [x] Selected one repo only: `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Identified the active interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by current and next-cut kits.
- [x] Identified implemented, runtime-implied, and next-cut kits.
- [x] Added timestamped tracker, turn-ledger, architecture, render, interaction, cloud, grass, host-proof, and deploy audits.
- [x] Updated root `.agent` operating docs.
- [x] Updated central tracking in `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Pushed only to `main`; no branch or PR was created.

## Publish repository comparison

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T07-05-52-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T06-01-30-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T06-20-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T07-19-41-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T06-10-35-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T07-41-29-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T06-28-53-04-00
LuminaryLabs-Publish/MyCozyIsland         selected / oldest eligible central latest 2026-07-09T05-38-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T07-48-29-04-00
```

## Selection result

`MyCozyIsland` was selected because all checked non-Cavalry Publish repos were already represented in central tracking and had sampled root `.agent` state. After that comparison, `MyCozyIsland` had the oldest eligible central ledger pointer and still has the same unresolved proofability boundary.

## Current product read

`MyCozyIsland` is a standalone static Three.js cozy island route. It loads from `index.html`, imports `./src/main-cloudform.js?v=hero-cloud-4`, uses Three.js from CDN, and composes local source-domain kits under `src/kits/`.

The visible route currently includes island terrain, ocean floor, shoreline foam, path, foliage, fenced clearing, campfire, smoke, grass instances, point-cloud clouds, camera rail, first-person handoff, and legacy `globalThis.CozyIsland` diagnostics.

## Current interaction loop

```txt
static browser route
  -> index.html loads canvas#game, cloud loader, error panel
  -> script imports ./src/main-cloudform.js?v=hero-cloud-4
  -> main-cloudform imports Three.js CDN and local source-domain kits
  -> source descriptors are built for island, ocean floor, foliage, clearing, grass, wind, campfire, smoke, and clouds
  -> Three.js renderer, scene, camera, lights, fog, water, terrain, floor, foam, path, foliage, fence, campfire, smoke, grass, and point-cloud clouds are created inline
  -> resize, keyboard, wheel, pointerdown, pointerup, and pointermove handlers mutate inline route state
  -> wheel changes scroll progress
  -> pointer drag changes yaw before first person and yaw/pitch after first person
  -> rail camera samples CatmullRom camera and look curves while progress < 0.985
  -> first-person movement unlocks at progress >= 0.985
  -> valid(next) accepts movement inside clearing radius and outside campfire keepout
  -> frame updates sea bob, rail/first-person camera, smoke, flame scale, cloud drift, renderer
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

## Services offered by current kits

```txt
ocean-island-landform-domain: create island state, render contract, height sampling, mask sampling
island-foliage-domain: create dense cozy island object graph and path network
ocean-floor-domain: create ocean floor state and render contract
grass-object-domain: create grass patch placement contract
grass-wind-domain: create grass wind descriptor
fenced-clearing-domain: create clearing graph, fence objects, anchor, boundary, exclusion zones
campfire-object-domain: create campfire object graph
smoke-particle-domain: create smoke particle descriptor
mattatz-clouds-domain: create cloud state and render contract
cozy-hero-cloud-form-kit: describe hero cloud form intent for the cloud route
inline render adapters: project source descriptors into Three.js terrain/floor/water/foam/path/objects/fence/fire/smoke/grass/clouds
inline input handlers: consume keyboard, wheel, and pointer events
inline movement services: rail camera, first-person movement, movement validity, frame loop, cloud drift, smoke update, render submission
legacy diagnostics: expose globalThis.CozyIsland cloud contract, cached cloud geometries, and scroll progress
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

`MyCozyIsland` should not get a visual rewrite, cloud replacement, grass replacement, camera timing change, or renderer extraction next. The current scene is already visually functional; the unresolved boundary is host-state readback and fixture proof.

`src/main-cloudform.js` still owns source descriptor construction, adapter consumption, input mutation, movement policy, camera rail sampling, grass instancing, cloud cache/drift, and render host state inline. The next useful cut is an additive proof layer that exposes stable records without changing the visible route.

## Next safe ledge

```txt
MyCozyIsland Host State Ledger Refresh + Browser Consumer Fixture Gate
```

## Required next implementation shape

```txt
RouteTokenReadback
  -> SourceProfile
  -> SourceFingerprint
  -> SceneSourceSnapshot
  -> BrowserInputActionFrame
  -> ActionResult
  -> MovementPolicyResult
  -> CameraRailSnapshot
  -> GrassPlacementSnapshot
  -> GrassInstanceSnapshot
  -> HeroCloudDescriptorSnapshot
  -> HeroCloudCacheSnapshot
  -> CloudDriftResult
  -> RenderHostSnapshot
  -> globalThis.CozyIslandHost.getState()
  -> DOM-free browser consumer fixture rows
  -> npm run check
```

## Validation note

This pass changed documentation and central tracking only. Runtime source was not changed, no branch was created, and no PR was opened.
