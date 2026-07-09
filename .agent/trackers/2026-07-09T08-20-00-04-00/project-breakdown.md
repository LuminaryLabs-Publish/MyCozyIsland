# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T08-20-00-04-00`

## Selection

The full accessible `LuminaryLabs-Publish` GitHub installation repo list was checked against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent/START_HERE.md` state.

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T07-05-52-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T06-01-30-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T06-20-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T07-19-41-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T06-10-35-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T07-41-29-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T06-28-53-04-00
LuminaryLabs-Publish/MyCozyIsland         selected / oldest eligible central fallback / previous central latest 2026-07-09T05-38-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T08-02-33-04-00
```

## Interaction loop

```txt
index.html
  -> canvas#game, cloud loader, error panel
  -> script ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN import
  -> local DSK imports
  -> source descriptor construction
  -> WebGL renderer/scene/camera/lights/fog
  -> descriptor-to-mesh/point-cloud adapters
  -> resize/keyboard/wheel/pointer event handlers
  -> rail camera while progress < 0.985
  -> first-person movement while progress >= 0.985
  -> valid(next) clearing/campfire policy
  -> sea/smoke/flame/cloud/frame updates
  -> renderer.render(scene, camera)
  -> legacy globalThis.CozyIsland diagnostic surface
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

## Services the kits offer

```txt
route HTML shell
route token/version selection
loading/error projection
Three render host setup
island heightfield/mask sampling
ocean floor heightfield/render contract
shoreline/path projection
foliage object graph creation
fenced clearing/collision zone construction
campfire object graph creation
smoke descriptor creation and animation
grass patch placement contract
grass wind descriptor
grass instanced mesh projection
Mattatz cloud source state/render contract
hero cloud geometry cache creation
cloud drift frame update
input capture
scroll progress mutation
pointer look mutation
movement validity check
camera rail sampling
frame render submission
legacy host diagnostic exposure
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

`MyCozyIsland` should not be visually rewritten yet. The live route already has enough source descriptors and a coherent visual surface, but there is no durable proof that the browser consumer accepted, rejected, rendered, cached, drifted, or projected the right records.

## Next ledge

```txt
MyCozyIsland Host State Cloud/Grass Readback Ledger Refresh + Browser Fixture Gate
```

## Files updated

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-09T08-20-00-04-00-host-state-cloud-grass-ledger-dsk-map.md
.agent/render-audit/2026-07-09T08-20-00-04-00-render-cloud-grass-readback-contract.md
.agent/interaction-audit/2026-07-09T08-20-00-04-00-input-action-movement-rail-contract.md
.agent/cloud-system-audit/2026-07-09T08-20-00-04-00-hero-cloud-cache-drift-fixture.md
.agent/grass-system-audit/2026-07-09T08-20-00-04-00-grass-placement-instance-fixture.md
.agent/host-proof-audit/2026-07-09T08-20-00-04-00-cozy-island-host-state-ledger.md
.agent/deploy-audit/2026-07-09T08-20-00-04-00-browser-fixture-check-gate.md
.agent/trackers/2026-07-09T08-20-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T08-20-00-04-00.md
```

## Validation

```txt
runtime source changed: no
local checkout: no
npm install: no
npm run check: no, no check script exists yet
browser smoke: no
branch created: no
pull request created: no
pushed to main: yes
```
