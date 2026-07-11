# Environment Audit: Dynamic Consumer Coherence Contract

Timestamp: `2026-07-11T12-58-06-04-00`

## Canonical frame

```txt
EnvironmentFrame {
  id
  revision
  sessionId
  sessionGeneration
  simulationTickId
  elapsedSeconds
  weather
  wind
  illumination
  clouds
  fog
  ocean
  vegetationWind
  campfireSmoke
  fingerprint
}
```

## Consumer set

```txt
sky gradient
hemisphere light
sun transform/color/intensity
renderer exposure
scene fog
cloud lighting/shadow/horizon
fog advection/density/placement
ocean and foam animation
vegetation sway
campfire smoke direction/response
debug and public observations
```

## Rules

1. Derive all fields from one admitted clock sample.
2. Consumers prepare without mutating live state.
3. Commit every consumer under one environment revision.
4. Roll back every prepared consumer when any commit fails.
5. Reset derives a canonical baseline frame, not independent consumer resets.
6. Stale session, generation, tick and revision commands reject without mutation.
7. One visible render frame acknowledges the committed fingerprint.

## Current violation

The current route mixes a live clock with startup-frozen descriptors. No consumer set, revision, result or acknowledgement proves coherence.
