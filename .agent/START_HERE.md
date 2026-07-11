# START HERE: MyCozyIsland

Last aligned: `2026-07-11T16-10-58-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: make adaptive quality a revisioned, reversible and observable transaction across volumetric steps, fog resolution, pixel ratio and the visible frame.

## Summary

`MyCozyIsland` chooses one immutable startup quality descriptor and then runs a frame-sampled performance budget. The budget can lower and recover its numeric level, but the host applies quality changes through four independent setters with no transaction identity, no rollback and no visible-frame acknowledgement.

The concrete recovery bug is in `applyPerformanceLevel()`: pixel ratio is changed only when `level > 0`. A transition from level 1 back to level 0 restores cloud steps, fog steps and fog resolution, but leaves the renderer at the degraded pixel ratio. The performance state can therefore report full recovery while the visible resolution remains reduced.

## Plan ledger

**Goal:** preserve adaptive performance while ensuring each quality transition is complete, reversible, stale-safe and correlated with the rendered frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` as the oldest eligible aligned repository.
- [x] Trace startup quality selection, frame sampling, degrade/recover thresholds and every runtime quality setter.
- [x] Identify the level-0 pixel-ratio recovery defect.
- [x] Identify frame-count cadence dependence and partial-application risk.
- [x] Inventory all active domains, kits and kit services.
- [x] Define the adaptive-quality transaction DSK and fixture gate.
- [x] Change no runtime source, dependency, workflow or deployment configuration.
- [x] Push directly to `main` without a branch or pull request.
- [ ] Implement startup and runtime-session prerequisites.
- [ ] Implement adaptive-quality transaction authority and executable fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T16-10-58-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T16-10-58-04-00-adaptive-quality-transaction-dsk-map.md
.agent/render-audit/2026-07-11T16-10-58-04-00-level-recovery-visible-resolution-gap.md
.agent/gameplay-audit/2026-07-11T16-10-58-04-00-frame-budget-quality-transition-loop.md
.agent/interaction-audit/2026-07-11T16-10-58-04-00-quality-command-admission-result-map.md
.agent/quality-system-audit/2026-07-11T16-10-58-04-00-quality-revision-recovery-contract.md
.agent/deploy-audit/2026-07-11T16-10-58-04-00-adaptive-quality-fixture-gate.md
.agent/turn-ledger/2026-07-11T16-10-58-04-00.md
.agent/kit-registry.json
```

## Product interaction loop

```txt
startup
  -> detect renderer backend
  -> choose immutable startup quality tier
  -> configure pixel ratio, shadows, geometry and atmosphere
  -> create performance budget at level 0

one rendered frame
  -> sample RAF interval in milliseconds
  -> update exponential moving average
  -> count consecutive over-budget or under-budget frames
  -> after 90 slow frames, increase level
  -> after 360 fast frames, decrease level
  -> callback applies cloud steps
  -> callback applies fog steps
  -> callback applies fog render-target scale
  -> callback may apply renderer pixel ratio
  -> render post pipeline
  -> publish detached diagnostics later
```

## Main finding

```txt
level 0 startup
  pixel ratio = quality.pixelRatioCap

level 0 -> level 1
  cloud/fog/fog-resolution reduced
  pixel ratio reduced to 0.88 of cap

level 1 -> level 0
  cloud/fog/fog-resolution restored
  pixel-ratio setter skipped because level is 0
  performance level reports 0
  renderer remains at degraded pixel ratio
```

Additional authority gaps:

```txt
quality transition ID: absent
quality revision: absent
candidate plan: absent
consumer acknowledgements: absent
rollback: absent
stale transition rejection: absent
actual renderer pixel-ratio observation: absent
visible-frame acknowledgement: absent
background/visibility sampling barrier: absent
elapsed-time threshold policy: absent
```

## Domains in use

```txt
browser module and startup admission
renderer backend and startup quality selection
runtime session and animation-loop ownership
frame-time sampling and adaptive budget policy
quality transition planning and admission
cloud and fog raymarch quality consumers
fog render-target quality consumer
renderer pixel-ratio consumer
static shadow, terrain, ocean and vegetation quality consumers
Core World, providers and materialization
camera rail and first-person scenario
semantic terrain, ocean and atmosphere
WebGPU/WebGL2 rendering and post processing
diagnostics, validation and Pages deployment
```

## Implemented kits

The source-backed catalog remains exactly 50 local kits. The performance-critical set is:

```txt
render-quality-domain-kit
webgpu-performance-budget-kit
webgpu-volumetric-cloud-renderer-kit
webgpu-rolling-fog-renderer-kit
webgpu-post-processing-renderer-kit
webgpu-stylized-material-renderer-kit
webgpu-ocean-renderer-kit
webgpu-foam-renderer-kit
webgl2-fallback-renderer-kit
debug-overlay-host-kit
```

The complete 50-kit inventory and provider/service map are in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Kit services

```txt
render-quality-domain-kit
  startup tier selection, capability policy and immutable quality descriptor

webgpu-performance-budget-kit
  frame sampling, moving average, FPS estimate, degrade/recover level and callbacks

cloud/fog renderers
  mutable raymarch step scales and current-step observation

post-processing renderer
  mutable fog render-target resolution scale

browser quality host
  renderer pixel ratio mutation, callback orchestration and public diagnostics

remaining render/domain kits
  startup-fixed shadow, geometry, population, texture and post parameters
```

## Required quality domain

```txt
cozy-island-adaptive-quality-transaction-authority-domain
  -> quality-policy-descriptor-kit
  -> quality-sample-command-kit
  -> visibility-sample-barrier-kit
  -> quality-transition-id-kit
  -> quality-revision-kit
  -> quality-transition-admission-kit
  -> quality-candidate-plan-kit
  -> quality-consumer-capability-kit
  -> quality-consumer-command-kit
  -> quality-consumer-result-kit
  -> quality-transition-commit-kit
  -> quality-transition-rollback-kit
  -> full-recovery-policy-kit
  -> stale-quality-result-rejection-kit
  -> quality-visible-frame-ack-kit
  -> quality-observation-kit
  -> quality-journal-kit
  -> cadence-parity-fixture-kit
  -> full-recovery-fixture-kit
  -> partial-failure-rollback-fixture-kit
  -> browser-quality-frame-smoke-kit
```

## Ordered implementation queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. Core World Reset / Re-prepare Authority
4. Pinned Core World Focus Transaction Authority
5. Live Materialization Readiness Commit Authority
6. Core World Render Commit Authority
7. Camera Rail Baseline Authority
8. Dynamic Environment Frame Authority
9. Adaptive Quality Transaction Authority
```

## Next safe ledge

```txt
MyCozyIsland Adaptive Quality Transaction Authority
+ Cadence Parity / Full Recovery / Partial Failure / Visible-Frame Fixture Gate
```

This remains ninth in implementation order, but it is now fully specified. It must consume startup generation, runtime session identity and committed-frame acknowledgement rather than creating parallel identity models.