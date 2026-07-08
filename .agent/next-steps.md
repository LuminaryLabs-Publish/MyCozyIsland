# Next Steps: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-08T14-58-49-04-00`

## Next safe ledge

```txt
MyCozyIsland Host Proof Consumer Splice Map + Central Ledger Catch-up
```

## Goal

Preserve the current route, visuals, and compatibility globals while adding pure host-proof modules and a clear browser-consumer splice order for route/source/action/movement/rail/cloud/render/host state.

The implementation should make `hero-cloud-4` an explicit accepted route result and expose an additive `globalThis.CozyIslandHost` surface only after fixtures pass.

## Implementation checklist

- [ ] Preserve `index.html -> ./src/main-cloudform.js?v=hero-cloud-4`.
- [ ] Preserve the current player-visible scene and art direction.
- [ ] Preserve `globalThis.CozyIsland` compatibility.
- [ ] Add `src/host-proof/route-version.js`.
- [ ] Add `RouteVersionResult` for accepted `hero-cloud-4`, stale `hero-cloud-3`, and missing token.
- [ ] Add `src/host-proof/source-profile.js`.
- [ ] Add `SourceProfile` for route token, island, floor, grass, wind, clearing, campfire, smoke, cloud, movement, and rail assumptions.
- [ ] Add `src/host-proof/source-fingerprint.js`.
- [ ] Add deterministic `SourceFingerprint` generation.
- [ ] Add `src/host-proof/scene-source-snapshot.js`.
- [ ] Add `SceneSourceSnapshot` for descriptor outputs only, not Three.js meshes.
- [ ] Add `src/host-proof/action-frame.js`.
- [ ] Add `ActionFrame` normalizer for wheel, pointer, keyboard, and frame tick actions.
- [ ] Add `src/host-proof/action-result.js`.
- [ ] Add `ActionResult` with accepted/rejected/no-op, reason, changedFields, before, and after.
- [ ] Add `src/host-proof/movement-policy-result.js`.
- [ ] Add distinct movement reasons for locked-before-first-person, no-movement-input, clearing-boundary, and campfire-keepout.
- [ ] Add `src/host-proof/camera-rail-snapshot.js`.
- [ ] Add deterministic `CameraRailSnapshot` rows for fixed progress samples.
- [ ] Add `src/host-proof/hero-cloud-snapshot.js`.
- [ ] Add `HeroCloudDescriptorSnapshot` and `HeroCloudCacheSnapshot`.
- [ ] Add `src/host-proof/cloud-drift-result.js`.
- [ ] Add deterministic `CloudDriftResult` reducer rows.
- [ ] Add `src/host-proof/host-snapshot.js`.
- [ ] Add `RenderHostSnapshot` and `CozyIslandHostSnapshot` projection helpers.
- [ ] Add `src/host-proof/fixture-cases.mjs`.
- [ ] Add fixture rows for route, source, action, movement, rail, cloud, render, host, and compatibility records.
- [ ] Run the host-proof fixture without DOM, canvas, Three.js, browser, or static server.
- [ ] Add package script only after the fixture exists.
- [ ] Import proven host-proof helpers into `src/main-cloudform.js`.
- [ ] Splice helper calls beside current descriptor creation, event handlers, rail, movement, cloud drift, render, and global exports.
- [ ] Expose `globalThis.CozyIslandHost` without changing `globalThis.CozyIsland`.
- [ ] Update validation with exact command output.

## Atomic kit split target

```txt
my-cozy-island-host-proof
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
   ├─ cozy-gamehost-diagnostics-kit
   ├─ cozy-host-state-contract-kit
   ├─ cozy-host-snapshot-kit
   ├─ cozy-dom-free-fixture-runner-kit
   └─ cozy-replay-parity-smoke-kit
```

## First implementation shape

```txt
src/host-proof/
├─ route-version.js
├─ source-profile.js
├─ source-fingerprint.js
├─ scene-source-snapshot.js
├─ action-frame.js
├─ action-result.js
├─ movement-policy-result.js
├─ camera-rail-snapshot.js
├─ hero-cloud-snapshot.js
├─ cloud-drift-result.js
├─ host-snapshot.js
└─ fixture-cases.mjs
```

## Consumer splice order

```txt
1. Prove pure host-proof modules through fixture-cases.mjs.
2. Import helper functions in src/main-cloudform.js after local kit imports.
3. Build route/source/fingerprint snapshots after descriptor construction.
4. Wrap wheel/pointer/key/frame actions with ActionFrame / ActionResult records.
5. Wrap valid(next) and fp(dt) with MovementPolicyResult records.
6. Project CameraRailSnapshot records from rail().
7. Project HeroCloudDescriptorSnapshot and HeroCloudCacheSnapshot after heroCloudGroup(contract).
8. Project CloudDriftResult during frame(now) without changing drift math.
9. Project RenderHostSnapshot from renderer, camera, scene, and count facts.
10. Expose globalThis.CozyIslandHost.getState() additively.
```

## Required fixture rows

```txt
cozy-route-version-accepted-001
cozy-route-version-stale-hero-cloud-3-001
cozy-route-version-missing-token-001
cozy-source-profile-hero-cloud-4-001
cozy-source-fingerprint-stable-001
cozy-scene-source-snapshot-001
cozy-wheel-action-progress-001
cozy-pointer-action-yaw-001
cozy-pointer-action-look-001
cozy-keyboard-before-fp-001
cozy-keyboard-no-input-001
cozy-keyboard-clearing-accepted-001
cozy-keyboard-clearing-boundary-rejected-001
cozy-keyboard-campfire-keepout-rejected-001
cozy-camera-rail-samples-001
cozy-cloud-descriptor-001
cozy-cloud-cache-001
cozy-cloud-cache-reuse-001
cozy-cloud-drift-001
cozy-render-host-snapshot-001
cozy-host-snapshot-001
cozy-host-legacy-compatibility-001
cozy-host-dom-free-001
```

## Guardrails

```txt
Do not change art direction during the host-proof pass.
Do not rename hero-cloud-4.
Do not remove local source-domain kits.
Do not remove globalThis.CozyIsland.
Do not tune rail points, movement speed, clearing radius, campfire keepout, grass, foliage, water, smoke, or clouds.
Do not move this proof layer into NexusEngine before local publish proof is stable.
```