# Next Steps: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-08T06:01:57-04:00`

## Next safe ledge

```txt
Add the MyCozyIsland Host Proof Fixture Matrix.
```

This should preserve the current route and visuals while adding proofable host state around route version, source identity, scene source snapshots, camera rail state, movement policy, hero cloud descriptors, cache state, and cloud drift.

## Implementation checklist

- [ ] Preserve `index.html -> ./src/main-cloudform.js?v=hero-cloud-3`.
- [ ] Preserve the current player-visible scene.
- [ ] Preserve `globalThis.CozyIsland` compatibility.
- [ ] Add an additive `globalThis.CozyIslandHost` diagnostics surface.
- [ ] Extract route version into a descriptor/result.
- [ ] Add `SourceProfile` constants.
- [ ] Add deterministic `SourceFingerprint` generation.
- [ ] Add `SceneSourceSnapshot` for island, floor, grass, clearing, campfire, smoke, wind, and cloud source descriptors.
- [ ] Add `ActionFrame` normalizer for wheel, pointer, keyboard, and tick actions.
- [ ] Add `ActionResult` for accepted/rejected action outcomes.
- [ ] Add `MovementPolicyResult` with explicit rejection reasons.
- [ ] Add `CameraRailSnapshot` for fixed scroll/progress samples.
- [ ] Add `HeroCloudDescriptorSnapshot`.
- [ ] Add `HeroCloudCacheSnapshot`.
- [ ] Add `CloudDriftResult`.
- [ ] Add action and input journals.
- [ ] Add a DOM-free fixture script.
- [ ] Add replay parity smoke for the host result objects.
- [ ] Update `.agent/validation.md` with exact commands and outcomes.

## Atomic kit split target

```txt
my-cozy-island-host-proof
├─ route-authority
│  ├─ cozy-active-route-version-kit
│  └─ cozy-route-script-token-kit
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

## First fixture cases

```txt
1. route token resolves to hero-cloud-3
2. source profile has stable seed/radius/cloud profile
3. source fingerprint is deterministic
4. scene source snapshot contains landform, floor, grass, clearing, campfire, smoke, wind, and cloud summaries
5. wheel action changes rail progress through an ActionResult
6. pointer drag action changes yaw through an ActionResult
7. keyboard movement inside clearing is accepted
8. keyboard movement outside clearing is rejected with clearing-boundary reason
9. keyboard movement into campfire keepout is rejected with campfire-keepout reason
10. cloud descriptor snapshot reports stable point count/lobe count/placement
11. cloud cache snapshot reports saved geometry count and point count
12. cloud drift result is deterministic for fixed dt/time
```

## Guardrails

```txt
- Do not change art direction during the host-proof pass.
- Do not rename the active route token unless the route authority kit also updates index.html and docs together.
- Do not remove the current local domain kits.
- Do not turn this publish repo into a generic engine repo.
- Prefer additive diagnostics and fixture files over risky runtime rewrites.
- Keep renderer, DOM, browser input, and Three.js adapters outside reusable proof helpers where possible.
```
