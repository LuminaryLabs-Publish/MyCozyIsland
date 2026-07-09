# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-20-00-04-00`

## Plan ledger

**Goal:** Compare the full accessible `LuminaryLabs-Publish` repo list against central tracking, select one eligible repo, update root `.agent/` docs, identify the interaction loop/domains/services/kits, and sync the central LuminaryLabs ledger.

**Checklist**

```txt
[x] Listed accessible LuminaryLabs-Publish repos through the GitHub installation.
[x] Excluded LuminaryLabs-Publish/TheCavalryOfRome.
[x] Compared checked repos against central LuminaryLabs-Dev/LuminaryLabs tracking and root .agent state.
[x] Selected one repo only: LuminaryLabs-Publish/MyCozyIsland.
[x] Read repo-local .agent state.
[x] Read central repo ledger state.
[x] Read package.json.
[x] Read index.html.
[x] Read src/main-cloudform.js route, imports, descriptors, input, movement, rail, render, grass, cloud, and host surface.
[x] Identified interaction loop.
[x] Identified domains in use.
[x] Identified kit services.
[x] Identified implemented, runtime-implied, and target proof kits.
[x] Updated required root .agent docs.
[x] Added architecture, render, interaction, cloud-system, grass-system, host-proof, and deploy audits.
[x] Added timestamped tracker and turn ledger.
[x] Updated central repo ledger.
[x] Added central internal change-log entry.
[ ] Did not edit runtime source.
[ ] Did not run local/browser validation.
```

## Repo selected

```txt
LuminaryLabs-Publish/MyCozyIsland
```

## Selection reason

No checked non-Cavalry repo was new, ledger-absent, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

`MyCozyIsland` was selected as the oldest eligible documented fallback. It remains the right current target because the route is descriptor-rich but still lacks source/host proof, additive `CozyIslandHost.getState()`, and DOM-free browser consumer fixtures.

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
planned-route-token-readback-domain
planned-source-profile-domain
planned-source-fingerprint-domain
planned-scene-source-snapshot-domain
planned-browser-input-action-frame-domain
planned-action-result-domain
planned-input-journal-domain
planned-movement-policy-result-domain
planned-camera-rail-snapshot-domain
planned-grass-placement-readback-domain
planned-grass-instance-readback-domain
planned-hero-cloud-descriptor-readback-domain
planned-hero-cloud-cache-readback-domain
planned-cloud-drift-result-domain
planned-render-host-snapshot-domain
planned-cozy-island-host-state-domain
planned-browser-consumer-fixture-domain
central-ledger-sync-domain
```

## Kit services

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
planned route token readback
planned source profile/fingerprint
planned scene source snapshot
planned browser input action frame
planned action result rows
planned movement policy rows
planned camera rail snapshot rows
planned grass placement/instance rows
planned hero-cloud descriptor/cache/drift rows
planned render host snapshot
planned additive CozyIslandHost.getState()
planned DOM-free browser consumer fixture
central ledger readback refresh
```

## Kits

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

`MyCozyIsland` should not be visually rewritten yet. The live route already has coherent source descriptors and a visually useful scene, but there is still no durable proof that the browser consumer accepted, rejected, rendered, cached, drifted, or projected the expected records.

## Next safe ledge

```txt
MyCozyIsland Host Readback Fixture Freeze + Browser Consumer Gate
```

## Validation summary

```txt
runtime source changed: no
local checkout: no
npm install: no
npm run check: no, no check script exists yet
browser smoke: no
fixture run: no, fixture does not exist yet
branch created: no
pull request created: no
pushed to main: yes
```
