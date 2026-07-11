# Next Steps: MyCozyIsland

Last updated: `2026-07-11T02-02-59-04-00`

## Plan ledger

**Goal:** preserve the terrain-relative clearing while making terrain generation, biome derivation, object seating, and render consumption agree on one deterministic terrain revision.

- [ ] Add a route runtime-session owner for startup, running, stop, dispose, restart, and startup rollback.
- [ ] Register animation-loop, listeners, timeouts, GPU resources, Three resources, and global host publication with that owner.
- [ ] Preserve the camera rail as immutable authored data and separate pointer orbit state from authored points.
- [ ] Add an immutable terrain-clearing descriptor with algorithm revision and fingerprint.
- [ ] Expose the natural source samples, plateau aggregate, blend thresholds, and surface-variation policy.
- [ ] Attach one terrain revision to biome, ground-contact, vegetation, rock, prop, campfire, path, and render-snapshot outputs.
- [ ] Add typed consumer results with `applied`, `unchanged`, `skipped`, or `rejected`.
- [ ] Add deterministic continuity checks across the inner clearing, fence radius, blend edge, and source-sample ring.
- [ ] Prove fence posts, rails, campfire, player baseline, grass, and paths seat against the same terrain revision.
- [ ] Prove render terrain positions and placement snapshots share one terrain fingerprint.
- [ ] Add a DOM-free terrain-layer coherence fixture to `npm test`.
- [ ] Add a browser smoke that reads terrain revision and consumer rows without exposing live renderer objects.
- [ ] Add dynamic environment-frame authority only after terrain and camera reset identities are stable.
- [ ] Implement adaptive-quality transactions only after lifecycle and semantic consumer provenance exist.

## Immediate implementation slice

```txt
MyCozyIsland Terrain Clearing Surface Authority
+ Edge/Seating/Layer-Coherence Fixture Gate
```

Runtime lifecycle remains first and camera reset remains second. This terrain slice is the first world-layer contract after those foundations.

## Candidate kits

```txt
terrain-source-revision-kit
terrain-clearing-descriptor-kit
terrain-source-sample-kit
terrain-plateau-aggregation-kit
terrain-blend-policy-kit
terrain-surface-variation-kit
terrain-field-frame-kit
terrain-biome-consumer-kit
ground-contact-consumer-kit
world-placement-consumer-kit
terrain-render-consumer-kit
terrain-consumer-result-kit
terrain-layer-observation-kit
terrain-layer-coherence-fixture-kit
```

## Minimum clearing descriptor

```txt
terrainRevision
algorithmVersion
seed
clearingRadius
sourceSampleRadius
sourceSamples[]
plateauHeight
innerBlendRadius
outerBlendRadius
variationSeed
variationAmplitude
fingerprint
```

## Required fixture assertions

```txt
same seed + same options => identical descriptor and fingerprint
plateau height equals the declared source-sample aggregate
inner clearing variation remains within the declared budget
height and normal changes remain bounded across the blend edge
fence radius is explicitly covered by the edge fixture
campfire and every fence post cite the same terrain revision
ground-contact and biome samples cite the same terrain revision
placement graphs and render snapshot reject stale terrain revisions
terrain grid vertices match authoritative height samples at probe coordinates
biome weights remain normalized through center, edge, beach, and slope probes
algorithm revision changes invalidate dependent cached snapshots
bounded JSON readback contains no live functions or Three objects
```

## Deferred

- further plateau, clearing-radius, blend, soil, grass, or fence tuning
- erosion and terrain-system replacement
- visual lighting, sky, cloud, fog, ocean, wind, and campfire retuning
- dynamic weather transitions or new presets
- renderer replacement
- new quality tiers
- new island content
- public kit promotion before local fixture proof
