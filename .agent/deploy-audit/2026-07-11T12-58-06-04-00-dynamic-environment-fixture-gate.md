# Deploy Audit: Dynamic Environment Fixture Gate

Timestamp: `2026-07-11T12-58-06-04-00`

## Required pre-deploy proof

```txt
same seed + same tick sequence
  -> same EnvironmentFrame fingerprints

one tick
  -> all environment consumers commit one revision

wind sample
  -> vegetation, campfire, cloud and fog consumers agree

illumination sample
  -> sky, sun, hemisphere, exposure and fog agree

reset
  -> canonical initial frame restored
  -> no old-frame consumer remains active

consumer failure
  -> prior frame preserved
  -> rollback receipts complete

render
  -> first visible frame acknowledges environment revision
```

## Required test surfaces

- DOM-free environment frame derivation fixture;
- consumer prepare/commit/rollback failure injection;
- reset replay fingerprint fixture;
- stale session/generation/revision rejection fixture;
- WebGPU and WebGL2 consumer parity fixture;
- browser visible-frame acknowledgement smoke;
- deployed Pages smoke with detached diagnostic readback.

## Current status

No executable dynamic-environment frame fixture exists. Existing static and provider tests do not prove live consumer coherence.
