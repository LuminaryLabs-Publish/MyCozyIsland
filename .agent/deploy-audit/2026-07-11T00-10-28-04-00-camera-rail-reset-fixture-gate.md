# Deploy Audit: Camera Rail Reset Fixture Gate

Timestamp: `2026-07-11T00-10-28-04-00`

## Existing gate

```txt
npm test
  -> tests/static-check.mjs
  -> tests/domain-smoke.mjs
```

The existing smoke validates deterministic world composition and one scenario tick. It does not validate sequence interaction or reset fidelity.

## Required new fixture

```txt
tests/camera-rail-reset-fixture.mjs
```

Recommended flow:

```txt
compose terrain and sequence
capture construction descriptor/state fingerprint
apply deterministic wheel/drag/key sequence
verify runtime state changed
reset
assert post-reset descriptor/state equals construction baseline
repeat 10 cycles
assert every reset fingerprint is identical
compose scenario
advance clock and camera
reset scenario
assert atomic clock/camera baseline
emit bounded JSON summary
```

## Package gate

Add the fixture to `npm test` only when the runtime contract exists.

## Browser smoke

A later browser smoke should confirm that pointer events, loader completion, stop/dispose/restart, and the rendered camera frame agree with the fixture result.

## Current validation

```txt
fixture exists: no
fixture run: no
npm test run in this docs pass: no
runtime changed: no
deploy workflow changed: no
```