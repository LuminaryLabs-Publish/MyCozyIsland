# START HERE: MyCozyIsland

Last aligned: `2026-07-11T12-50-35-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: define adaptive quality as an elapsed-time, session-fenced, reversible render transaction with complete recovery and visible-frame proof.

## Summary

MyCozyIsland selects a complete startup quality descriptor, then samples one value per display frame and directly mutates cloud steps, fog steps, fog resolution and pixel ratio when its internal level changes. The path has no transition identity, admission, prepare/commit/rollback, effective-state fingerprint or frame acknowledgement.

Two concrete issues are now the focus of this audit. The 90-frame degrade and 360-frame recovery thresholds run four times faster at 120 Hz than at 30 Hz, and recovery to level 0 does not restore the original pixel ratio because the route only calls `renderer.setPixelRatio(...)` when `level > 0`.

## Plan ledger

**Goal:** document a cadence-independent adaptive-quality transaction while preserving the existing lifecycle, world and render-commit prerequisites.

- [x] Compare all accessible Publish repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland`, the oldest current eligible entry.
- [x] Trace startup quality, frame sampling, level decisions and all mutable consumers.
- [x] Identify the interaction loop, domains, services and all 50 local kits.
- [x] Confirm refresh-rate-dependent dwell behavior.
- [x] Confirm pixel-ratio recovery is incomplete at level 0.
- [x] Define transition, rollback, effective-state, journal and frame-proof kits.
- [x] Add timestamped architecture, render, gameplay, interaction, performance and deploy audits.
- [x] Change no runtime or deployment behavior.
- [x] Push directly to `main`; create no branch or pull request.

## Current interaction loop

```txt
startup
  -> validate kit catalog
  -> initialize WebGPU/WebGL2 renderer
  -> choose startup quality
  -> create world and render graph
  -> create performance budget
  -> install callbacks and animation loop

frame
  -> sample frameMs
  -> tick scenario and camera
  -> update focus and render animation
  -> sample performance budget
  -> maybe invoke direct degrade/recover callback
  -> mutate cloud/fog/post/pixel-ratio consumers
  -> render
  -> materialize cells
  -> project debug/global state
```

## Main finding

```txt
startup quality policy: present
adaptive levels: present
elapsed-time dwell: absent
refresh-rate parity: absent
session/renderer generation fence: absent
transaction identity: absent
consumer prepare/commit/rollback: absent
effective-quality fingerprint: absent
full level-zero recovery: broken for pixel ratio
first visible frame acknowledgement: absent
adaptive transition fixtures: absent
```

## Required authority flow

```txt
PerformanceSample
  -> session, generation, visibility and monotonic-time admission
  -> elapsed-time performance window
  -> QualityDecision
  -> immutable consumer plan
  -> prepare every consumer
  -> commit all or rollback all
  -> EffectiveQualityState + fingerprint
  -> render one frame
  -> consumer and visible-frame acknowledgement
  -> typed result and bounded journal
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
.agent/trackers/2026-07-11T12-50-35-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T12-50-35-04-00.md
.agent/architecture-audit/2026-07-11T12-50-35-04-00-adaptive-quality-transaction-dsk-map.md
.agent/render-audit/2026-07-11T12-50-35-04-00-quality-consumer-frame-correlation-gap.md
.agent/gameplay-audit/2026-07-11T12-50-35-04-00-frame-budget-quality-gameplay-loop.md
.agent/interaction-audit/2026-07-11T12-50-35-04-00-quality-transition-admission-result-map.md
.agent/performance-audit/2026-07-11T12-50-35-04-00-cadence-independent-full-recovery-contract.md
.agent/deploy-audit/2026-07-11T12-50-35-04-00-adaptive-quality-fixture-gate.md
```

## Do not start next with

- patching only the pixel-ratio branch without defining effective quality state;
- keeping frame-count dwell thresholds;
- allowing quality callbacks during reset, stop or disposal;
- treating the internal budget level as proof that all consumers match;
- adding more adaptive consumers before prepare/commit/rollback exists;
- claiming recovery until level 0 restores every original consumer value.
