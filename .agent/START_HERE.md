# START HERE: MyCozyIsland

Last aligned: `2026-07-11T12-58-06-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: define one deterministic Dynamic Environment Frame that synchronizes clock, wind, weather, illumination, cloud, fog, ocean, vegetation, campfire and visible rendering.

## Summary

MyCozyIsland advances its environment clock every frame, but most environment descriptors are sampled once during startup. The scenario returns the current clock and camera while retaining startup-frozen illumination, wind-derived, cloud and fog descriptors.

The route therefore mixes live elapsed animation with frozen sun/sky/exposure, vegetation wind, campfire smoke wind, cloud weather/lighting/shadow and fog advection. No environment revision, fingerprint, consumer transaction, reset result or visible-frame receipt proves that dynamic consumers agree.

## Plan ledger

**Goal:** document the missing environment-frame authority while preserving runtime-session, Core World and render-commit prerequisites.

- [x] Compare all accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` because repo-local audit state was newer than central tracking.
- [x] Trace clock, wind, weather, illumination, cloud, fog, ocean, vegetation, campfire and render consumers.
- [x] Identify the interaction loop, domains, services and all 50 local kits.
- [x] Confirm scenario snapshots update only clock and camera.
- [x] Define frame identity, prepare/commit/rollback, reset and visible-frame proof.
- [x] Add timestamped architecture, render, gameplay, interaction, environment and deploy audits.
- [x] Change no runtime or deployment behavior.
- [x] Push directly to `main`; create no branch or pull request.

## Current interaction loop

```txt
startup
  -> create clock, wind and illumination services
  -> sample environment-dependent descriptors once
  -> freeze render snapshot
  -> construct scene and render consumers

frame
  -> tick clock and camera
  -> return static snapshot + current clock/camera
  -> animate selected consumers from elapsedSeconds
  -> render with mixed live and frozen environment values

reset
  -> reset clock and camera
  -> no environment revision or consumer acknowledgement
```

## Main finding

```txt
clock: live
wind and illumination services: live when queried
scenario environment projection: startup-frozen
shared EnvironmentFrame: absent
environment revision/fingerprint: absent
consumer prepare/commit/rollback: absent
reset baseline result: absent
first visible frame acknowledgement: absent
```

## Required authority flow

```txt
ClockSample
  -> session/generation/tick admission
  -> derive immutable EnvironmentFrame
  -> assign revision and fingerprint
  -> prepare every dynamic consumer
  -> commit all or rollback all
  -> render one frame
  -> collect consumer and visible-frame acknowledgement
  -> publish typed result and bounded journal
```

## Priority order

```txt
1. Runtime Session Lifecycle Authority
2. Core World Reset / Re-prepare Authority
3. Pinned Core World Focus Transaction Authority
4. Live Materialization Readiness Commit Authority
5. Core World Render Commit Authority
6. Camera Rail Baseline Authority
7. Dynamic Environment Frame Authority
8. Adaptive Quality Transaction Authority
```

## Read this pass first

```txt
.agent/trackers/2026-07-11T12-58-06-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T12-58-06-04-00.md
.agent/architecture-audit/2026-07-11T12-58-06-04-00-dynamic-environment-frame-dsk-map.md
.agent/render-audit/2026-07-11T12-58-06-04-00-environment-consumer-frame-correlation-gap.md
.agent/gameplay-audit/2026-07-11T12-58-06-04-00-clock-environment-coherence-loop.md
.agent/interaction-audit/2026-07-11T12-58-06-04-00-environment-frame-admission-result-map.md
.agent/environment-audit/2026-07-11T12-58-06-04-00-dynamic-consumer-coherence-contract.md
.agent/deploy-audit/2026-07-11T12-58-06-04-00-dynamic-environment-fixture-gate.md
```

## Do not start next with

- adding more visual time effects without an EnvironmentFrame;
- independently sampling wind in each consumer;
- updating only the sun while cloud, fog and smoke remain stale;
- treating elapsed seconds as proof of consumer coherence;
- resetting consumers separately without a baseline frame result;
- exposing raw mutable clock or renderer authority through the global host.
