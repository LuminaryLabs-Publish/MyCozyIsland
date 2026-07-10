# Cloud and Fog Audit: Volume Build and Frame Attribution

Timestamp: 2026-07-10T14-42-01-04-00

## Existing system

Cloud and fog source kits produce weather, density, lighting, LOD, shadow, horizon, advection, and placement descriptors. `createAtmosphereVolumeTextures()` builds cloud/fog textures using WebGPU compute or fallback generation. Cloud and fog consumers then render those textures and accept adaptive step-scale changes.

## Proof gap

- no JSON-safe atmosphere build result
- no recipe/source fingerprint linked to generated textures
- no explicit compute-versus-fallback reason record
- no build sequence linked to the active source revision
- no transition record when cloud/fog step scale changes
- no frame submission record identifying active texture build and step scale

## Required setup record

```txt
kind: volume-build
sequence
sourceRevision
cloudRecipeFingerprint
fogRecipeFingerprint
backend
source: webgpu-compute | fallback-bake
status: setup_complete | setup_fallback | setup_failed
reason
```

## Required frame attribution

Each render-submit record should reference the active volume-build sequence plus cloud/fog step scale and consumer status.

## Decision

Do not rewrite volumetrics. Instrument setup and consumption so future visual work has deterministic before/after evidence.