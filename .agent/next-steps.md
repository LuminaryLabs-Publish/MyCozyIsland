# Next Steps: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-08T10-28-44-04-00`

## Next safe ledge

```txt
MyCozyIsland Route Version Authority Sync + Host Proof Fixture Gate
```

Preserve the current route and visuals while adding proofable host state around route version, source identity, scene source snapshots, camera rail state, movement policy, hero cloud descriptors, cache state, and cloud drift.

The first source-proof target is now `hero-cloud-4`, not `hero-cloud-3`.

## Implementation checklist

- [ ] Preserve `index.html -> ./src/main-cloudform.js?v=hero-cloud-4`.
- [ ] Preserve the current player-visible scene.
- [ ] Preserve `globalThis.CozyIsland` compatibility.
- [ ] Add an additive `globalThis.CozyIslandHost` diagnostics surface.
- [ ] Add `src/host-proof/route-version.js`.
- [ ] Add `RouteVersionResult` with `hero-cloud-4` acceptance and stale-token mismatch reasons.
- [ ] Add route fixture rows for accepted `hero-cloud-4`, rejected `hero-cloud-3`, and missing query token.
- [ ] Add `src/host-proof/source-profile.js`.
- [ ] Add `SourceProfile` constants for route token, island, floor, cloud, movement, and camera rail assumptions.
- [ ] Add `src/host-proof/source-fingerprint.js`.
- [ ] Add deterministic `SourceFingerprint` generation.
- [ ] Add `src/host-proof/scene-source-snapshot.js`.
- [ ] Add `SceneSourceSnapshot` for island, floor, grass, clearing, campfire, smoke, wind, and cloud source descriptors.
- [ ] Add `src/host-proof/action-frame.js`.
- [ ] Add `ActionFrame` normalizer for wheel, pointer, keyboard, and tick actions.
- [ ] Add `src/host-proof/action-result.js`.
- [ ] Add `ActionResult` for accepted/rejected/no-op action outcomes.
- [ ] Add `src/host-proof/movement-policy-result.js`.
- [ ] Add `MovementPolicyResult` with explicit rejection reasons.
- [ ] Add `src/host-proof/camera-rail-snapshot.js`.
- [ ] Add `CameraRailSnapshot` for fixed scroll/progress samples.
- [ ] Add `src/host-proof/hero-cloud-snapshot.js`.
- [ ] Add `HeroCloudDescriptorSnapshot`.
- [ ] Add `HeroCloudCacheSnapshot`.
- [ ] Add `src/host-proof/cloud-drift-result.js`.
- [ ] Add `CloudDriftResult` for fixed `dt/time` inputs.
- [ ] Add action and input journals.
- [ ] Add `src/host-proof/fixture-cases.mjs`.
- [ ] Add fixture IDs from the route-version sync and host-proof acceptance ledgers.
- [ ] Add replay parity smoke for the host result objects.
- [ ] Wire `src/main-cloudform.js` only after the pure fixture modules pass.
- [ ] Update `.agent/validation.md` with exact commands and outcomes.

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
│  └─ cozy-action-journal-kit
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
└─ proof-authority
   ├─ cozy-gamehost-diagnostics-kit
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
└─ fixture-cases.mjs
```

Additive integration point:

```txt
src/main-cloudform.js
  -> imports or calls host-proof helpers
  -> writes globalThis.CozyIslandHost
  -> keeps globalThis.CozyIsland unchanged
```

## Wire-map order

```txt
1. Implement pure route-version helper first.
2. Prove hero-cloud-4 acceptance and hero-cloud-3 stale-token rejection.
3. Implement pure source-profile and source-fingerprint helpers.
4. Implement pure source/action/movement/rail/cloud snapshot helpers.
5. Run fixture-cases.mjs without DOM, canvas, Three.js, browser, or static server.
6. Add a stable package script only after fixture-cases.mjs exists.
7. Wire main-cloudform additively.
8. Confirm route token remains hero-cloud-4.
9. Confirm existing globalThis.CozyIsland remains compatible.
10. Confirm new globalThis.CozyIslandHost is additive and fixture-shaped.
```

## Required fixture cases

```txt
cozy-route-version-001
cozy-route-version-mismatch-001
cozy-route-version-missing-001
cozy-source-profile-001
cozy-source-fingerprint-001
cozy-scene-source-001
cozy-wheel-action-001
cozy-pointer-action-001
cozy-keyboard-before-fp-001
cozy-keyboard-clearing-001
cozy-keyboard-boundary-001
cozy-keyboard-campfire-001
cozy-camera-rail-001
cozy-cloud-descriptor-001
cozy-cloud-cache-001
cozy-cloud-drift-001
cozy-host-snapshot-001
```

## Guardrails

```txt
- Do not change art direction during the host-proof pass.
- Do not rename the active route token unless the route authority kit also updates index.html and docs together.
- Do not remove the current local domain kits.
- Do not turn this publish repo into a generic engine repo.
- Prefer additive diagnostics and fixture files over risky runtime rewrites.
- Keep renderer, DOM, browser input, and Three.js adapters outside reusable proof helpers where possible.
- Stop after the DOM-free host-proof fixture runs and the public route remains stable.
```
