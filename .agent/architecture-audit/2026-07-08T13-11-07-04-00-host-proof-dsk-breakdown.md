# Architecture Audit — Host Proof DSK Breakdown

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T13-11-07-04-00`

## Current architecture read

`MyCozyIsland` is already kit-composed at the source descriptor layer, but the route host still acts as the runtime authority for route state, scene source assembly, render adaptation, input mutation, movement policy, camera rail sampling, hero-cloud cache generation, cloud drift, and diagnostics.

The right next architecture cut is not a renderer rewrite.

The right cut is an additive host-proof layer that sits beside `src/main-cloudform.js` and returns stable records that can be fixture-tested without DOM, canvas, Three.js, browser, or a static server.

## Current composition path

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN
  -> import local domain descriptor kits
  -> build source descriptors
  -> build inline Three.js render adapters
  -> register browser input handlers
  -> run camera rail / movement / animation frame loop
  -> expose legacy globalThis.CozyIsland
```

## Current DSK/domain breakdown

```txt
my-cozy-island
├─ route-authority
│  ├─ active script: ./src/main-cloudform.js?v=hero-cloud-4
│  ├─ current token: hero-cloud-4
│  ├─ missing RouteVersionResult
│  └─ missing route mismatch reason catalog
├─ source-authority
│  ├─ ocean-island-landform-domain
│  ├─ island-foliage-domain
│  ├─ ocean-floor-domain
│  ├─ grass-object-domain
│  ├─ grass-wind-domain
│  ├─ campfire-object-domain
│  ├─ smoke-particle-domain
│  ├─ fenced-clearing-domain
│  ├─ mattatz-clouds-domain
│  ├─ cozy-hero-cloud-form-kit
│  ├─ missing SourceProfile
│  ├─ missing SourceFingerprint
│  └─ missing SceneSourceSnapshot
├─ render-authority
│  ├─ terrain adapter
│  ├─ ocean floor adapter
│  ├─ water adapter
│  ├─ shoreline foam adapter
│  ├─ path adapter
│  ├─ foliage adapter
│  ├─ fence adapter
│  ├─ campfire adapter
│  ├─ smoke runtime adapter
│  ├─ grass instancing adapter
│  └─ hero cloud point renderer/cache
├─ interaction-authority
│  ├─ wheel action
│  ├─ pointer action
│  ├─ keyboard action
│  ├─ tick action
│  ├─ missing ActionFrame
│  ├─ missing ActionResult
│  ├─ missing ActionJournal
│  └─ missing InputJournal
├─ movement-authority
│  ├─ first-person threshold gate
│  ├─ clearing radius rule
│  ├─ campfire keepout rule
│  ├─ missing MovementPolicyResult
│  ├─ missing ClearingBoundaryResult
│  └─ missing CampfireKeepoutResult
├─ rail-authority
│  ├─ scroll progress
│  ├─ CatmullRom position rail
│  ├─ CatmullRom look rail
│  └─ missing CameraRailSnapshot
├─ cloud-authority
│  ├─ hero cloud descriptor
│  ├─ hero cloud geometry cache
│  ├─ cloud drift frame update
│  ├─ missing HeroCloudDescriptorSnapshot
│  ├─ missing HeroCloudCacheSnapshot
│  └─ missing CloudDriftResult
└─ diagnostics-authority
   ├─ legacy globalThis.CozyIsland
   ├─ missing globalThis.CozyIslandHost
   ├─ missing CozyIslandHostSnapshot
   └─ missing DOM-free fixture replay
```

## Services that need pure host-proof ownership

```txt
resolveRouteVersion({ entryScript, expectedToken })
createSourceProfile()
createSourceFingerprint(profile)
createSceneSourceSnapshot(descriptorBundle)
createActionFrame(input)
reduceActionResult(state, actionFrame)
resolveMovementPolicy(state, actionFrame)
sampleCameraRail(profile, progress)
createHeroCloudDescriptorSnapshot(cloudContract)
createHeroCloudCacheSnapshot(cacheRecords)
reduceCloudDrift(input)
createCozyIslandHostSnapshot(parts)
runHostProofFixtureRows(rows)
```

## Proposed source file map

```txt
src/host-proof/route-version.js
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/action-frame.js
src/host-proof/action-result.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/hero-cloud-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/host-snapshot.js
src/host-proof/fixture-cases.mjs
```

## Integration rule

Keep these modules pure first.

Only after DOM-free fixture rows pass should `src/main-cloudform.js` import or call the helpers and expose `globalThis.CozyIslandHost`.

## Non-goals for the next pass

```txt
Do not replace Three.js render adapters.
Do not retune grass, water, foliage, cloud, or camera visuals.
Do not rename hero-cloud-4.
Do not remove globalThis.CozyIsland.
Do not promote these helper modules into NexusEngine until the publish route proves them locally.
```
