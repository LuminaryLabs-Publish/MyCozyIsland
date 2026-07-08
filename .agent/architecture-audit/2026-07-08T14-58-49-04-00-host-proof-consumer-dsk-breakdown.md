# Architecture Audit — Host Proof Consumer DSK Breakdown

**Timestamp:** `2026-07-08T14-58-49-04-00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

## Summary

`MyCozyIsland` already composes useful local source-domain kits, but the browser entry file is still the consumer and authority boundary for route state, source snapshots, input actions, movement policy, camera rail samples, cloud cache, cloud drift, render host state, and diagnostics.

The next cut should add a pure host-proof layer that can be tested without DOM/Canvas/Three.js, then splice those records into `src/main-cloudform.js` as additive diagnostics.

## Current composition

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> local descriptor kits
  -> inline Three.js adapters
  -> inline input / movement / rail / cloud / frame loop
  -> globalThis.CozyIsland compatibility diagnostics
```

## Target composition

```txt
src/host-proof/* pure modules
  -> DOM-free fixture rows
  -> source/action/movement/rail/cloud/render/host records
  -> src/main-cloudform.js consumes proven helpers
  -> globalThis.CozyIsland remains unchanged
  -> globalThis.CozyIslandHost exposes additive proof records
```

## DSK split

```txt
my-cozy-island-host-proof-domain
├─ route-authority
│  ├─ cozy-route-script-token-kit
│  ├─ cozy-active-route-version-kit
│  └─ cozy-route-version-result-kit
├─ source-authority
│  ├─ cozy-source-profile-kit
│  ├─ cozy-source-fingerprint-kit
│  └─ cozy-scene-source-snapshot-kit
├─ action-authority
│  ├─ cozy-action-frame-contract-kit
│  ├─ cozy-action-result-contract-kit
│  ├─ cozy-action-rejection-reason-kit
│  ├─ cozy-action-journal-kit
│  └─ cozy-input-journal-kit
├─ movement-authority
│  ├─ cozy-movement-policy-result-kit
│  ├─ cozy-clearing-boundary-result-kit
│  └─ cozy-campfire-keepout-result-kit
├─ camera-rail-authority
│  ├─ cozy-rail-state-kit
│  └─ cozy-camera-rail-snapshot-kit
├─ cloud-authority
│  ├─ cozy-hero-cloud-descriptor-snapshot-kit
│  ├─ cozy-hero-cloud-cache-snapshot-kit
│  └─ cozy-cloud-drift-result-kit
├─ render-readback-authority
│  └─ cozy-render-host-snapshot-kit
└─ proof-authority
   ├─ cozy-host-state-contract-kit
   ├─ cozy-host-snapshot-kit
   ├─ cozy-gamehost-diagnostics-kit
   ├─ cozy-dom-free-fixture-runner-kit
   └─ cozy-replay-parity-smoke-kit
```

## Source files to add next

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

## Browser consumer splice points

```txt
index.html:
  route token remains ./src/main-cloudform.js?v=hero-cloud-4

src/main-cloudform.js imports:
  add host-proof imports after local kit imports

source construction block:
  create SourceProfile, SourceFingerprint, and SceneSourceSnapshot after descriptor construction

input handlers:
  convert wheel/pointer/key/frame intent to ActionFrame and ActionResult records

valid(next):
  preserve boolean return for now, but call MovementPolicyResult helper for diagnostics

rail():
  preserve current sampled camera behavior, but project CameraRailSnapshot rows

heroCloudGeometry / heroCloudGroup / frame cloud loop:
  project HeroCloudDescriptorSnapshot, HeroCloudCacheSnapshot, and CloudDriftResult records

frame/render setup:
  project RenderHostSnapshot and CozyIslandHostSnapshot

global exports:
  keep globalThis.CozyIsland unchanged
  add globalThis.CozyIslandHost after fixture proof
```

## Stop line

Do not retune art, change route token, alter rail points, change movement speed, alter clearing/campfire policy, remove `globalThis.CozyIsland`, or promote proof kits to NexusEngine before local fixture proof exists.

## Next safe ledge

```txt
MyCozyIsland Host Proof Consumer Splice Map + Central Ledger Catch-up
```