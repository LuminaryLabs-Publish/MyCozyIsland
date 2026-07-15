# Gameplay audit: low-FPS slow-simulation loop

**Timestamp:** `2026-07-15T05-00-28-04-00`  
**Status:** `host-clock-fixed-step-simulation-authority-audited`

## Summary

Gameplay pacing is coupled to callback frequency once RAF intervals exceed 50 ms. The game remains responsive enough to render, but movement, sprint stamina, intro progress, island time, crop growth, wild-resource respawn and autosave cadence advance slower than wall time.

## Plan ledger

**Goal:** preserve deterministic gameplay while making elapsed-time handling explicit, bounded and consistent across supported frame rates.

- [x] Trace admitted delta into gameplay consumers.
- [x] Separate player-perceived wall time from accepted simulation time.
- [x] Identify low-FPS and long-gap cases.
- [x] Define gameplay clock receipts.
- [ ] Implement and validate fixed-step pacing.

## Current low-FPS loop

```txt
10 RAF callbacks per wall second
  -> each gap is about 100 ms
  -> host admits 50 ms
  -> ten engine ticks advance about 500 ms

result
  -> walking covers about half intended wall-time distance
  -> sprint drains/regenerates about half intended wall-time amount
  -> intro progresses about half speed
  -> day clock progresses about half speed
  -> Agriculture growth takes about twice as long
  -> Foraging respawn takes about twice as long
  -> five-second autosave cadence takes about ten wall seconds
```

The exact effect depends on browser scheduling and callback rate. The source proves discarded elapsed time; physical-device pacing was not executed.

## Gameplay consumers

```txt
cozy-scenario-domain-kit
  environment clock and day progress

cozy-player-domain-kit
  intro, movement, distance and stamina

agriculture-domain-kit
  crop and perennial growth

cozy-foraging-domain-kit
  respawn countdown

main-adventure host
  autosave accumulator
```

## Missing gameplay evidence

```txt
fixed simulation step descriptor
maximum step budget
catch-up policy
discarded-time policy
pause versus overload classification
per-frame clock result
per-domain accepted clock revision
autosave time-source policy
low-FPS gameplay parity fixture
first clock-aligned gameplay frame acknowledgement
```

## Required behavior

```txt
elapsed wall time
  -> classified and accumulated
  -> zero or more fixed gameplay steps
  -> bounded work budget
  -> retained residual or explicit discard receipt
  -> one accepted simulation revision
  -> one matching render acknowledgement
```

No real-time gameplay pacing, growth timing, respawn timing or autosave cadence claim is made.