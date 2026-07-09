# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T05-38-20-04-00`

**Change type:** documentation-only repo breakdown and central-ledger sync

## Plan ledger

**Goal:** compare the accessible `LuminaryLabs-Publish` repository list against `LuminaryLabs-Dev/LuminaryLabs` tracking, select exactly one eligible repo, refresh repo-local `.agent/` docs, identify interaction loop/domains/services/kits, and log the central ledger update.

### Checklist

- [x] Compared accessible `LuminaryLabs-Publish` repositories.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome` by standing rule.
- [x] Compared central ledger state in `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Sampled root `.agent/START_HERE.md` state for the selected repo.
- [x] Selected one repo only: `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Read `index.html`, `package.json`, `src/main-cloudform.js`, and key local kit source.
- [x] Identified interaction loop.
- [x] Identified all active domains in use.
- [x] Identified services exposed by current and planned kits.
- [x] Identified implemented, runtime-implied, and next-cut kits.
- [x] Added timestamped tracker and turn-ledger entry.
- [x] Added architecture, render, interaction, cloud-system, grass-system, host-proof, and deploy audits.
- [x] Refreshed root `.agent` docs.
- [x] Refreshed `.agent/kit-registry.json`.
- [x] Updated the central repo ledger.
- [x] Added a central internal change-log entry.
- [x] Pushed directly to `main` without creating a branch.

## Selection result

```txt
LuminaryLabs-Publish/MyCozyIsland
```

No checked non-Cavalry Publish repo was fully new, missing from central tracking, missing sampled root `.agent/START_HERE.md`, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

`MyCozyIsland` was selected as the oldest eligible central fallback because its central ledger was still behind repo-local `.agent` state and the host-state/cloud/grass readback fixture gate remains unresolved.

## Publish repo comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T03-50-12-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T04-30-54-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T05-11-22-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T05-20-42-04-00
LuminaryLabs-Publish/MyCozyIsland         selected / oldest eligible central fallback / central latest 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T03-29-29-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T04-50-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T03-10-05-04-00
```

## Product read

`MyCozyIsland` is a standalone static Three.js cozy island route.

It uses local source-domain kits for island landform, ocean floor, foliage, grass, wind, fenced clearing, campfire, smoke, Mattatz-style clouds, and hero-cloud form intent.

The active route is:

```txt
index.html
  -> canvas#game
  -> #cloud-loader
  -> #error
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> local source-domain descriptor kits
  -> inline Three render host / camera / movement / cloud drift / grass instance adapters
  -> legacy globalThis.CozyIsland diagnostics
```

## Current interaction loop

```txt
static browser route
  -> load src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN and local source-domain kits
  -> construct island, floor, foliage, grass, wind, clearing, fire, smoke, cloud, and hero-cloud descriptors
  -> create Three.js renderer, scene, camera, lights, fog, terrain, ocean floor, water, foam, path, foliage, fence, campfire, smoke, grass, and point-cloud clouds
  -> install resize, keyboard, wheel, pointerdown, pointerup, and pointermove handlers
  -> wheel input mutates scroll progress directly
  -> pointer drag mutates yaw before first-person and yaw/pitch after first-person
  -> rail() samples the sky-to-eye camera curve while progress < 0.985
  -> keyboard first-person movement unlocks at progress >= 0.985
  -> valid(next) accepts or rejects movement by clearing radius and campfire keepout only
  -> frame updates sea bob, rail or first-person camera, smoke, flame, cloud drift, and renderer
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

## Services that the kits offer

```txt
route shell and script-token boot
loader/error projection
island state creation, height sampling, and mask sampling
ocean floor state and render-contract creation
foliage object graph generation
fenced clearing graph and clearance zone generation
campfire object graph creation
smoke particle descriptor creation
grass wind descriptor creation
grass patch placement contract creation
grass static batch descriptor summarization
Mattatz cloud state and render contract creation
hero cloud form/layer/render contract creation
terrain/floor/water/foam/path/foliage/fence/campfire/smoke/grass/cloud render adaptation
keyboard, wheel, and pointer input capture
rail camera sampling
first-person movement integration
movement validity check
cloud geometry cache creation
cloud drift frame mutation
legacy CozyIsland diagnostic exposure
planned route/source/action/movement/rail/grass/cloud/render host readback
planned DOM-free browser consumer fixture rows
planned central ledger readback and sync
```

## Kits identified

### Implemented explicit kits

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

### Runtime-implied kits

```txt
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
```

### Next-cut proof kits

```txt
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

The next implementation should not be a visual rewrite. The live scene already composes useful source kits; the missing boundary is fixture-readable proof that the browser route consumed the route token, source descriptors, input decisions, movement rules, rail state, grass placement, cloud cache/drift, and render host state.

The safe cut is an additive `globalThis.CozyIslandHost.getState()` surface plus pure `src/host-proof/*` modules and a DOM-free fixture script. Preserve `globalThis.CozyIsland` and the current visual route.

## Required repo-local `.agent` outputs added or refreshed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T05-38-20-04-00-host-state-readback-ledger-sync-dsk-map.md
.agent/render-audit/2026-07-09T05-38-20-04-00-cloud-grass-render-host-state-readback.md
.agent/interaction-audit/2026-07-09T05-38-20-04-00-input-movement-rail-fixture-contract.md
.agent/cloud-system-audit/2026-07-09T05-38-20-04-00-hero-cloud-cache-drift-readback-gate.md
.agent/grass-system-audit/2026-07-09T05-38-20-04-00-grass-placement-instance-readback-gate.md
.agent/host-proof-audit/2026-07-09T05-38-20-04-00-cozy-island-host-state-readback-contract.md
.agent/deploy-audit/2026-07-09T05-38-20-04-00-browser-consumer-fixture-check-map.md
.agent/trackers/2026-07-09T05-38-20-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T05-38-20-04-00.md
```

## Validation status

```txt
runtime source changed: no
local checkout performed: no
npm install run: no
npm start run: no
npm run check run: no, no check script exists yet
browser smoke run: no
fixture run: no, fixture files do not exist yet
branch created: no
pull request created: no
pushed to main: yes
```

## Next safe ledge

```txt
MyCozyIsland Host State Readback Consumer Freeze + Cloud/Grass Fixture Gate
```

Start with pure host-proof modules and fixture rows. Do not change the island look, cloud renderer, grass renderer, rail threshold, movement constraints, route token, or legacy diagnostic object during that ledge.
