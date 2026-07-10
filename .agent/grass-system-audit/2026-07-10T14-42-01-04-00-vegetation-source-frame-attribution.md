# Grass and Vegetation Audit: Source-to-Frame Attribution

Timestamp: 2026-07-10T14-42-01-04-00

## Existing system

Vegetation is composed from archetype catalog, terrain/biome sampling, ground-contact service, deterministic placement seed, quality tier, wind descriptor, and vegetation LOD. Rocks and props share the terrain/ground-contact source boundary.

## Existing services

- archetype descriptors
- deterministic placement graph
- terrain height/normal contact
- biome filtering
- wind response descriptor
- quality-dependent LOD
- rock and prop graph composition

## Proof gap

The source snapshot contains vegetation and ground-contact rows, and the world renderer consumes the snapshot, but no frame record identifies the vegetation source revision used by a submitted render. There is also no consumer status indicating accepted, culled, fallback, unsupported, or skipped vegetation groups.

## Required attribution

```txt
sourceRevision
vegetationGraphFingerprint
groundContactFingerprint
qualityTier
worldConsumerStatus
frameId
renderSubmitSequence
```

## Decision

Do not alter grass geometry, density, placement, layers, or wind. First connect the existing vegetation graph to source revision and render-submit proof.