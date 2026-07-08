# Host Proof Audit — Fixture Row Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T13-11-07-04-00`

## Purpose

Define the next implementation gate as a row-based fixture contract, not a broad runtime rewrite.

The fixture should prove route/source/interaction/movement/rail/cloud/render/host records in pure modules before the browser runtime is wired to expose `globalThis.CozyIslandHost`.

## Required fixture groups

```txt
route-version
source-profile
source-fingerprint
scene-source-snapshot
action-frame
action-result
movement-policy
camera-rail
hero-cloud-descriptor
hero-cloud-cache
cloud-drift
render-host-snapshot
cozy-island-host-snapshot
legacy-compatibility
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

## Required row result shape

```txt
FixtureRowResult
  id
  group
  accepted
  reason
  input
  expected
  actual
  changedFields
  snapshot
```

## Additive browser host target

```txt
globalThis.CozyIslandHost = {
  route,
  source,
  actions,
  movement,
  rail,
  cloud,
  render,
  host,
  fixtures,
  getState()
}
```

The existing compatibility surface must remain:

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache,
  getScrollProgress
}
```

## Stop condition

Stop the next implementation when:

```txt
1. fixture-cases.mjs runs without DOM/canvas/Three.js/browser/static server
2. hero-cloud-4 is accepted as current route token
3. hero-cloud-3 is rejected as stale
4. movement rejection reasons are explicit
5. rail samples are deterministic
6. cloud cache and drift summaries are deterministic
7. globalThis.CozyIsland remains compatible
8. globalThis.CozyIslandHost is additive and fixture-shaped
```
