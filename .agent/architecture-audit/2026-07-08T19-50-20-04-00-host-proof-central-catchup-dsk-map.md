# MyCozyIsland Host Proof Central Catch-up DSK Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T19-50-20-04-00`

## Purpose

This audit refreshes the DSK/domain map for `MyCozyIsland` and ties the repo-local `.agent` state back to the central `LuminaryLabs-Dev/LuminaryLabs` ledger.

## Current interaction loop

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN import
  -> local descriptor kit imports
  -> descriptor construction in main()
  -> inline render adapter construction
  -> input handlers
  -> rail/movement/frame loop
  -> legacy globalThis.CozyIsland projection
```

## Domains in use

```txt
static-browser-shell
route-version-token
three-cdn-runtime
local-source-domain-runtime
island-landform-source
ocean-floor-source
foliage-object-graph
grass-placement-contract
grass-wind-descriptor
fenced-clearing-source
campfire-object-graph
smoke-particle-descriptor
mattatz-cloud-source
hero-cloud-form-source
hero-cloud-cache-runtime
hero-cloud-drift-runtime
renderer-host
camera-rail-authority
movement-policy-authority
legacy-global-diagnostics
host-proof-snapshot
browser-consumer-fixture-authority
central-ledger-sync
```

## Services offered by current kits

```txt
ocean-island-landform-domain:
  createOceanIslandLandformState
  createOceanIslandLandformRenderContract
  sampleIslandHeight
  sampleIslandMasks

island-foliage-domain:
  createDenseCozyIslandObjectGraph
  path network generation
  object exclusion support

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
  player anchor
  collision boundary
  clearance zones

mattatz-clouds-domain:
  createMattatzCloudsState
  createMattatzCloudRenderContract
```

## Implemented kits

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

## Runtime-implied kits

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

## Next-cut kits

```txt
cozy-route-version-result-kit
cozy-source-profile-kit
cozy-source-fingerprint-kit
cozy-scene-source-snapshot-kit
cozy-action-frame-contract-kit
cozy-action-result-contract-kit
cozy-input-journal-kit
cozy-movement-policy-result-kit
cozy-camera-rail-snapshot-kit
cozy-grass-instance-snapshot-kit
cozy-hero-cloud-cache-snapshot-kit
cozy-cloud-drift-result-kit
cozy-render-host-snapshot-kit
cozy-host-snapshot-kit
cozy-browser-consumer-fixture-kit
cozy-central-ledger-sync-kit
```

## Architecture finding

The route already has good local kit composition, but `src/main-cloudform.js` immediately consumes descriptor outputs inside render adapters. The next step should not change visuals; it should add source/profile/result/snapshot records beside the existing behavior and expose them through an additive host proof surface.

## Next ledge

```txt
MyCozyIsland Central Ledger Catch-up + Host Proof Browser Consumer Fixture Scope
```
