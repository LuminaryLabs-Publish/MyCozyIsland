# Source/Consumer Central Catch-up DSK Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T17-48-20-04-00`

## Architecture summary

The repository has a useful descriptor-first source layer and a browser-monolithic consumer layer.

```txt
source kits
  -> deterministic states, object graphs, placements, and render contracts
  -> src/main-cloudform.js
  -> inline Three.js adapters
  -> inline input/camera/movement/frame consumers
  -> legacy diagnostics
```

The immediate architecture goal is not more kit extraction for its own sake. It is a proof boundary that records exactly what each source kit emitted and what each browser consumer accepted.

## Current DSK map

```txt
my-cozy-island-domain
├─ route-domain
│  ├─ static-shell-kit
│  ├─ cloud-loader-kit
│  ├─ error-panel-kit
│  └─ route-script-token-kit
├─ island-source-domain
│  ├─ ocean-island-landform-domain
│  │  ├─ landform-state-kit
│  │  ├─ height-sampler-kit
│  │  ├─ mask-sampler-kit
│  │  ├─ heightfield-contract-kit
│  │  └─ shoreline-contract-kit
│  ├─ island-foliage-domain
│  │  ├─ path-network-kit
│  │  ├─ foliage-object-graph-kit
│  │  └─ foliage-render-contract-kit
│  ├─ ocean-floor-domain
│  │  ├─ floor-state-kit
│  │  ├─ floor-height-sampler-kit
│  │  ├─ floor-heightfield-kit
│  │  ├─ floor-object-placement-kit
│  │  └─ floor-render-contract-kit
│  ├─ fenced-clearing-domain
│  │  ├─ fence-object-kit
│  │  ├─ player-anchor-kit
│  │  ├─ collision-boundary-kit
│  │  └─ exclusion-zone-kit
│  ├─ campfire-object-domain
│  │  ├─ campfire-root-kit
│  │  ├─ campfire-collision-kit
│  │  ├─ flame-emitter-kit
│  │  ├─ smoke-anchor-kit
│  │  └─ warm-light-kit
│  ├─ smoke-particle-domain
│  │  └─ smoke-emitter-descriptor-kit
│  ├─ grass-domain
│  │  ├─ grass-wind-domain
│  │  ├─ grass-object-domain
│  │  ├─ grass-placement-kit
│  │  └─ grass-batch-descriptor-kit
│  └─ cloud-domain
│     ├─ mattatz-clouds-domain
│     ├─ cozy-hero-cloud-form-kit
│     ├─ cloud-layer-kit
│     └─ cloud-render-contract-kit
├─ browser-consumer-domain
│  ├─ three-render-host-kit
│  ├─ scene-composition-kit
│  ├─ terrain-adapter-kit
│  ├─ ocean-floor-adapter-kit
│  ├─ water-adapter-kit
│  ├─ shoreline-adapter-kit
│  ├─ path-adapter-kit
│  ├─ foliage-adapter-kit
│  ├─ fence-adapter-kit
│  ├─ campfire-adapter-kit
│  ├─ smoke-adapter-kit
│  ├─ grass-instance-adapter-kit
│  ├─ hero-cloud-point-adapter-kit
│  ├─ cloud-cache-kit
│  └─ render-frame-kit
├─ interaction-domain
│  ├─ keyboard-input-kit
│  ├─ wheel-progress-kit
│  ├─ pointer-look-kit
│  ├─ camera-rail-kit
│  ├─ first-person-movement-kit
│  └─ movement-validity-kit
└─ proof-domain-next
   ├─ source-profile-kit
   ├─ source-fingerprint-kit
   ├─ scene-source-snapshot-kit
   ├─ input-result-kit
   ├─ movement-policy-result-kit
   ├─ render-consumption-ledger-kit
   ├─ cozy-island-host-snapshot-kit
   └─ browser-consumer-fixture-kit
```

## Boundary quality

### Strong boundaries

```txt
Landform sampling is deterministic and source-owned.
Foliage placement is deterministic and source-owned.
Grass placement respects source masks, paths, and exclusion zones.
Cloud shape and placement are descriptor-owned.
Renderer-boundary metadata exists on the hero-cloud contract.
Campfire and clearing graphs separate data from Three.js objects.
```

### Weak boundaries

```txt
src/main-cloudform.js owns every adapter and consumer in one module.
Input handlers mutate runtime state directly.
Camera and movement policies return no result records.
Render adapters return live Three.js objects without normalized consumption records.
Frame simulation mutates smoke, flame, sea, and cloud objects directly.
Legacy diagnostics expose live geometry references.
```

## Structural drift found

### Ocean-floor placement drift

`createOceanFloorRenderContract()` produces both a heightfield and object placements. The active route consumes the heightfield and water material but does not project the generated reef, coral, rock, or boulder placements.

### Foliage adapter drift

The foliage source emits broadleaf trees, young trees, palms, bushes, ferns, fallen logs, rocks, driftwood, and reefs. The active adapter explicitly handles tree-like objects; every other type falls through to the same dodecahedron rock mesh.

### Grass batch drift

The source kit can emit batch descriptors, but the active route only consumes `placement.patches` and creates one `InstancedMesh`. Batch descriptor parity is not checked.

### Cloud cache drift

The geometry cache key is `cloud.id`. Changes to point count, silhouette, scale, or seed can reuse geometry created for an older descriptor with the same id.

## Recommended proof boundary

Each source/consumer pair should produce one serializable row:

```txt
{
  sourceDomain,
  sourceId,
  sourceFingerprint,
  requestedCount,
  generatedCount,
  consumedCount,
  skippedCount,
  skipReasons,
  adapterId,
  status
}
```

Input and movement consumers should use:

```txt
{
  action,
  before,
  after,
  status,
  reason,
  changedFields
}
```

## Implementation order

1. Extract pure source profile and fingerprint helpers.
2. Snapshot all source contract counts before creating Three.js objects.
3. Wrap renderer adapters with consumption rows.
4. Convert wheel, pointer, and movement policies into pure result-producing functions.
5. Add an additive serializable host snapshot.
6. Add a DOM-free fixture.
7. Wire `npm run fixture:consumer` and `npm run check`.
8. Only then consider renderer extraction or visual changes.

## Next safe ledge

```txt
MyCozyIsland Source/Consumer Parity Ledger + Browser Input Result Fixture Gate
```