# Deploy Audit: Environment Frame Coherence Fixture Gate

Timestamp: `2026-07-11T01-50-30-04-00`

## Goal

Extend the static test gate with deterministic environment-frame proof before dynamic environment consumption is treated as complete.

## Current package gate

```txt
npm test
  -> tests/static-check.mjs
  -> tests/domain-smoke.mjs
```

Current tests prove descriptor shape, kit count, deterministic static composition, renderer source tokens, and one clock/camera scenario tick. They do not prove temporal environment coherence.

## Required DOM-free fixture

```txt
tests/environment-frame-coherence.mjs
```

Minimum matrix:

```txt
same seed, same clock schedule, same frames
different render cadence, same semantic frames
clock advance, deterministic wind/illumination revisions
unchanged values, explicit unchanged result
reset, exact initial fingerprint restoration
stale session, rejected
older revision, rejected
duplicate revision/fingerprint, idempotent
consumer rows, all reference one frame ID
bounded journal, deterministic JSON
```

Wire the fixture into `npm test` only after the authority contract exists.

## Required browser fixture

- initialize WebGPU when available and WebGL2 fallback otherwise
- capture initial environment frame
- advance a controlled clock schedule
- prove sky/light/cloud/fog/world/campfire consumers applied the same latest frame
- reset and prove initial consumer fingerprints return
- dispose and prove later frames are rejected
- retain no second animation loop or stale listener/session

## Deployment rule

Do not block the current static Pages route on nonexistent tests. Once implemented, the normal test/deploy path must fail closed when environment-frame or consumer-coherence fixtures fail.

## Validation this pass

Documentation only. No package script, workflow, source, build artifact, or deployed route changed.
