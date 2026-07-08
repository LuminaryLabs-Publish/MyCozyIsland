# Architecture Audit: Central Ledger Sync DSK Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T17-09-48-04-00`

## Current architecture read

`MyCozyIsland` is a static browser route with local source-domain kits and inline Three.js host adapters.

```txt
index.html
  -> src/main-cloudform.js?v=hero-cloud-4
  -> local descriptor/source kits
  -> inline Three.js render adapters
  -> inline input/action/movement/rail/cloud/frame loop
  -> globalThis.CozyIsland compatibility diagnostics
```

## Architecture issue

The source kits are useful, but the browser host is still the only place where source facts become runtime facts.

The central ledger also lagged repo-local `.agent` state, which means future automation could incorrectly treat this repo as older than its actual repo-local audit history.

## DSK/domain breakdown

```txt
my-cozy-island-runtime
├─ route-authority
│  ├─ active-route-token-domain
│  ├─ route-version-result-kit
│  └─ route-script-token-kit
├─ source-authority
│  ├─ source-profile-kit
│  ├─ source-fingerprint-kit
│  ├─ scene-source-snapshot-kit
│  └─ source-file-manifest-kit
├─ terrain-authority
│  ├─ ocean-island-landform-domain
│  ├─ ocean-floor-domain
│  ├─ heightfield-sampler-kit
│  └─ shoreline-contract-kit
├─ object-authority
│  ├─ island-foliage-domain
│  ├─ fenced-clearing-domain
│  ├─ campfire-object-domain
│  └─ smoke-particle-domain
├─ grass-authority
│  ├─ grass-object-domain
│  ├─ grass-wind-domain
│  ├─ grass-source-readback-kit
│  └─ grass-instance-snapshot-kit
├─ cloud-authority
│  ├─ mattatz-clouds-domain
│  ├─ cozy-hero-cloud-form-kit
│  ├─ hero-cloud-cache-snapshot-kit
│  └─ cloud-drift-result-kit
├─ interaction-authority
│  ├─ action-frame-contract-kit
│  ├─ action-result-contract-kit
│  ├─ action-rejection-reason-kit
│  └─ input-journal-kit
├─ movement-authority
│  ├─ movement-policy-result-kit
│  ├─ clearing-boundary-result-kit
│  └─ campfire-keepout-result-kit
├─ camera-authority
│  ├─ rail-state-kit
│  └─ camera-rail-snapshot-kit
├─ render-readback-authority
│  ├─ render-host-snapshot-kit
│  └─ scene-object-count-kit
├─ host-diagnostics-authority
│  ├─ cozy-host-state-contract-kit
│  ├─ cozy-host-snapshot-kit
│  ├─ cozy-gamehost-diagnostics-kit
│  └─ cozy-legacy-global-compatibility-kit
└─ tracking-authority
   ├─ repo-local-agent-state-kit
   ├─ central-ledger-sync-kit
   └─ internal-change-log-kit
```

## Required source-manifest files

```txt
src/host-proof/route-version.js
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/action-frame.js
src/host-proof/action-result.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/grass-instance-snapshot.js
src/host-proof/hero-cloud-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/host-snapshot.js
src/host-proof/fixture-cases.mjs
```

## Browser consumer splice map

```txt
src/main-cloudform.js imports
  -> descriptor construction block
  -> route/source/fingerprint snapshot construction
  -> wheel handler ActionFrame / ActionResult
  -> pointer handlers ActionFrame / ActionResult
  -> key state ActionFrame / ActionResult
  -> valid(next) MovementPolicyResult
  -> fp(dt) movement result journal
  -> rail() CameraRailSnapshot
  -> grassMesh(grass) GrassInstanceSnapshot
  -> heroCloudGroup(contract) HeroCloudDescriptorSnapshot / HeroCloudCacheSnapshot
  -> frame(now) CloudDriftResult / RenderHostSnapshot
  -> globalThis.CozyIslandHost additive export
```

## Recommendation

Do not promote any of this to `NexusEngine` yet.

First make the local publish repo produce deterministic, fixture-readable host-proof rows. Only after the local source file manifest and browser consumer splice are stable should shared-kit extraction be considered.
