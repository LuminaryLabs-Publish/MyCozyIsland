# Architecture Audit: Dynamic Environment Frame DSK Map

Timestamp: `2026-07-11T12-58-06-04-00`

## Current split

```txt
environment-clock-domain-kit
  -> mutable elapsedSeconds

wind-field-domain-kit
illumination-domain-kit
  -> live functions when queried

legacy-world-composition
  -> queries live services once
  -> freezes vegetation wind, campfire wind, cloud, fog and illumination descriptors

cozy-island-scenario-kit
  -> updates clock and camera only

render consumers
  -> mix elapsed animation with startup-frozen environment values
```

## Missing parent domain

```txt
cozy-island-dynamic-environment-frame-authority-domain
  -> environment-frame-schema-kit
  -> environment-frame-id-kit
  -> environment-clock-sample-kit
  -> environment-frame-admission-kit
  -> wind-frame-kit
  -> weather-frame-kit
  -> illumination-frame-kit
  -> cloud-environment-frame-kit
  -> fog-environment-frame-kit
  -> ocean-environment-frame-kit
  -> vegetation-wind-frame-kit
  -> campfire-smoke-frame-kit
  -> environment-consumer-plan-kit
  -> environment-consumer-prepare-kit
  -> environment-consumer-commit-kit
  -> environment-consumer-rollback-kit
  -> environment-frame-result-kit
  -> environment-frame-fingerprint-kit
  -> environment-frame-ack-kit
  -> environment-reset-baseline-kit
  -> environment-frame-journal-kit
  -> environment-consumer-coherence-fixture-kit
  -> environment-reset-replay-fixture-kit
  -> browser-environment-frame-smoke-kit
```

## Required contract

Every accepted simulation tick produces at most one immutable `EnvironmentFrame`. Every dynamic consumer must either commit that same frame revision or preserve the prior revision. A render frame is not authoritative until the consumer set and visible frame acknowledge the environment fingerprint.

## Dependencies

```txt
Runtime Session Lifecycle Authority
  -> Core World reset/re-prepare
  -> render commit identity
  -> Dynamic Environment Frame Authority
  -> Adaptive Quality Transaction Authority
```
