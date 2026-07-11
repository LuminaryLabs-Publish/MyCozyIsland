# Deploy Audit: Terrain Layer Fixture Gate

Timestamp: `2026-07-11T02-02-59-04-00`

## Current validation path

```txt
npm test
  -> node tests/static-check.mjs
  -> node tests/domain-smoke.mjs
```

The route deploys as a static browser application. The current checks validate source structure, the 50-kit catalog, deterministic composition, and inner-clearing flatness.

## Existing clearing proof

```txt
center plus twelve samples at 0.68 × clearingRadius
maximum inner variation below 0.5 m
same seed produces the same center height
```

## Missing deployment gate

A successful build/test can still ship:

```txt
transition-edge slope or normal spikes
fence posts and rails mis-seated on the blend edge
campfire or player baseline using stale surface data
biome discontinuity at the clearing boundary
placement snapshot generated from a different terrain revision
terrain grid generated from a different algorithm revision
path spans floating over or cutting through the blend
```

## Required Node fixture

Add a DOM-free terrain-layer fixture that emits one JSON packet and fails on:

```txt
descriptor nondeterminism
plateau aggregate mismatch
inner variation budget violation
edge continuity violation
biome weight normalization failure
fence/campfire seating error
stale terrain revision acceptance
terrain/render probe mismatch
```

## Required browser smoke

The deployed route should expose detached readback containing:

```txt
terrainRevision
clearingDescriptorFingerprint
terrain grid consumption fingerprint
placement consumption fingerprints
maximum seating error
edge continuity summary
```

The smoke must not depend on live Three objects or function handles.

## Suggested package gate

```txt
npm test
  -> static-check
  -> domain-smoke
  -> terrain-layer-coherence
```

A later browser gate should initialize WebGPU when available and WebGL2 fallback otherwise, then compare browser readback with the Node fixture fingerprint.

## Deployment policy

Do not block the current docs-only push on unavailable future fixtures. Do block future terrain, clearing, biome, fence, grass, path or placement changes once the fixture is added.

## Validation state

```txt
runtime source changed: no
workflow changed: no
package scripts changed: no
npm test: not run during connector-only documentation pass
terrain-layer fixture: unavailable
browser smoke: not run
```
