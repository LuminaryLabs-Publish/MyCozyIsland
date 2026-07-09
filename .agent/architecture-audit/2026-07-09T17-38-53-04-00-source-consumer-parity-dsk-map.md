# My Cozy Island Source/Consumer Parity DSK Map

**Timestamp:** `2026-07-09T17-38-53-04-00`

## Current composition

```txt
cozy-island-route
├─ static-shell-domain
│  ├─ route-script-token
│  ├─ loader-progress-projection
│  └─ error-projection
├─ source-domain-composition
│  ├─ ocean-island-landform-domain
│  ├─ island-foliage-domain
│  ├─ ocean-floor-domain
│  ├─ grass-object-domain
│  ├─ grass-wind-domain
│  ├─ campfire-object-domain
│  ├─ smoke-particle-domain
│  ├─ fenced-clearing-domain
│  └─ mattatz-clouds-domain
├─ browser-consumer-domain
│  ├─ three-render-host
│  ├─ scene-composition
│  ├─ terrain/floor/water/foam/path consumers
│  ├─ foliage/fence/campfire/smoke consumers
│  ├─ grass-instanced consumer
│  ├─ hero-cloud point/cache consumer
│  ├─ resize/keyboard/wheel/pointer consumers
│  ├─ camera-rail policy
│  ├─ first-person movement policy
│  ├─ movement-validity policy
│  └─ render-frame loop
└─ diagnostics-domain
   └─ legacy globalThis.CozyIsland surface
```

## Ownership problem

`src/main-cloudform.js` is the composition root, renderer adapter, input adapter, movement authority, camera policy, animation loop, and diagnostic surface. Source kits are separated, but their consumption contracts are not.

The architectural gap is therefore not another scene kit. It is a proof boundary between source descriptors and browser consumers.

## Recommended proof composition

```txt
cozy-island-proof-domain
├─ source-profile-domain
│  ├─ route-token-readback-kit
│  ├─ source-profile-kit
│  ├─ source-fingerprint-kit
│  └─ scene-source-snapshot-kit
├─ interaction-result-domain
│  ├─ browser-input-action-frame-kit
│  ├─ input-result-kit
│  ├─ input-result-journal-kit
│  ├─ movement-policy-result-kit
│  └─ camera-rail-snapshot-kit
├─ render-consumption-domain
│  ├─ grass-placement-snapshot-kit
│  ├─ grass-instance-snapshot-kit
│  ├─ hero-cloud-descriptor-snapshot-kit
│  ├─ hero-cloud-cache-snapshot-kit
│  ├─ cloud-drift-result-kit
│  ├─ render-consumption-ledger-kit
│  └─ render-host-snapshot-kit
├─ host-readback-domain
│  └─ cozy-island-host-snapshot-kit
└─ validation-domain
   ├─ browser-consumer-fixture-kit
   └─ central-ledger-readback-kit
```

## Contract rules

```txt
source descriptors remain immutable inputs
browser adapters return explicit accepted/rejected/no-change results
generated render objects expose normalized counts and source ids
cache rows expose hit/miss and source fingerprint
render rows identify consumed, unsupported, or fallback fields
CozyIslandHost is additive and does not replace globalThis.CozyIsland
fixture modules remain DOM-free and Three-free where possible
```

## Boundary order

1. Freeze route/source profile.
2. Add normalized source fingerprint and snapshot.
3. Convert input and movement policy into pure result-producing helpers.
4. Add grass/cloud/render consumption rows.
5. Project the proof state through `globalThis.CozyIslandHost.getState()`.
6. Gate with a DOM-free fixture under `npm run check`.

## Deferred work

Do not rewrite visuals, terrain, clouds, grass, camera path, renderer, or movement constraints until the source/consumer parity rows are fixture-proven.
