# MyCozyIsland Architecture Audit

**Generated:** `2026-07-09T08-29-38-04-00`

## Selection read

```txt
full Publish list checked through GitHub search:
  IntoTheMeadow
  HorrorCorridor
  AetherVale
  ZombieOrchard
  TheUnmappedHouse
  MyCozyIsland
  TheOpenAbove
  PhantomCommand
  TheCavalryOfRome
  PrehistoricRush

excluded:
  TheCavalryOfRome

result:
  no checked non-Cavalry repo was new, central-ledger absent, root-agent missing, recently added but undocumented, or otherwise undocumented
  MyCozyIsland selected because its central ledger pointer was stale/oldest eligible fallback
```

## Current architecture

```txt
index.html
  -> src/main-cloudform.js?v=hero-cloud-4
  -> local source-domain kits
  -> inline browser/render/input host
  -> legacy globalThis.CozyIsland diagnostics
```

`src/main-cloudform.js` is still the composition hub. It constructs source descriptors, converts them into Three.js objects, owns the rail/first-person input state, mutates cloud drift every frame, and exposes only the narrow legacy `CozyIsland` surface.

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

## Kit service map

```txt
ocean-island-landform-domain:
  island state, height sampling, mask sampling, heightfield render contract, shoreline render contract

ocean-floor-domain:
  ocean floor state, shelf/mound/depth descriptors, floor heightfield render contract

island-foliage-domain:
  foliage object graph, path network, tree/rock descriptors, render placement facts

grass-object-domain:
  grass patch placement contract, patch counts, terrain/path/exclusion sampling

grass-wind-domain:
  wind descriptor used by smoke and future grass readback

fenced-clearing-domain:
  clearing graph, fence posts, player anchor, object exclusions, movement exclusion zones

campfire-object-domain:
  campfire object graph and source position

smoke-particle-domain:
  smoke particle descriptor, lifespan/wind/rise/source facts

mattatz-clouds-domain:
  cloud state and render contract descriptors

cozy-hero-cloud-form-kit:
  hero cloud form contract, point cloud shape language, target cloud visual identity

inline runtime kits:
  renderer construction, mesh adapters, input mutation, rail camera, movement validation, frame loop, legacy host diagnostics
```

## Next-cut DSK map

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

## Implementation boundary

Do not refactor the visual renderer first. Add source-owned records and additive readback around the existing browser route, then wire a fixture that proves those records without a DOM/browser launch.
