# Deploy Audit: Adaptive Quality Fixture Gate

Timestamp: `2026-07-11T12-50-35-04-00`

## Required gate

Do not advertise adaptive quality as stable until all of these pass:

```txt
30/60/90/120 Hz cadence parity
irregular frame schedule parity
hidden-tab suspension policy
stalled-frame classification
minimum-level dwell enforcement
0 -> 1 transition completeness
1 -> 2 transition completeness
2 -> 1 recovery completeness
1 -> 0 full recovery including pixel ratio
consumer prepare rejection
consumer commit failure rollback
reset/stop/dispose transition rejection
stale session and renderer generation rejection
duplicate command idempotency
effective-quality fingerprint stability
first visible frame quality acknowledgement
WebGPU and WebGL2 parity
```

## Existing coverage

The current `npm test` chain validates semantic domains, Core World behavior, materialization and isolated renderer utilities. It does not construct the production performance loop or execute adaptive transitions.

## Release blocker

A successful budget callback is not deployment proof. The gate requires a typed committed transition result and one frame receipt containing all effective consumer values.
