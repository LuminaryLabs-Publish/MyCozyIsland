# Grass System Audit: Vegetation Ground Contact Consumer Ledger

Timestamp: 2026-07-10T07-29-12-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland

## Current vegetation source surface

The WebGPU route now sources vegetation through DomainServiceKit rows instead of the older single grass-cone path. The active source families include vegetation archetypes, placement graph, ground contact, wind, LOD, rocks, props, and campfire atmosphere.

## Consumer surface

The render route adapts vegetation and world descriptors into the stylized world renderer and surrounding WebGPU scene consumers.

## Current gap

The source descriptors are deterministic, but host readback does not prove source-to-consumer parity for vegetation rows. A fixture cannot yet inspect which vegetation placements were accepted, rejected, grounded, culled, or consumed by a renderer.

## Required ledger rows

```txt
VegetationConsumerRow
  sourceFingerprint
  placementId
  archetypeId
  groundContactStatus
  lodBucket
  windProfileId
  accepted
  reason
  consumerId
  renderFrameId
```

## Main finding

Do not rewrite grass, vegetation art, or ground placement next. Add proof rows that connect existing vegetation source families to their WebGPU consumers and host readback.

## Next safe ledge

```txt
MyCozyIsland WebGPU Host Proof Ledger Refresh + Node Consumer Fixture Gate
```
