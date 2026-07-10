# START HERE: MyCozyIsland

Last aligned: 2026-07-10T16-08-56-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland
Current focus: adaptive-quality transition authority, reversible recovery, and frame-cost proof.

## Selection result

The complete accessible `LuminaryLabs-Publish` installation contains ten repositories. All nine eligible non-Cavalry repositories are represented in the central ledger and have root `.agent` state. `TheCavalryOfRome` remains excluded.

`MyCozyIsland` was selected as the oldest eligible documented fallback. Its prior central timestamp was `2026-07-10T14-42-01-04-00`; every other eligible repository had a newer central timestamp.

## Current route

```txt
index.html
  -> Three/WebGPU 0.185.0 import map
  -> src/main-cloudform.js?v=webgpu-volumetric-2
  -> validate exactly 50 DomainServiceKit manifests
  -> initialize WebGPURenderer and choose WebGPU/WebGL2 quality
  -> compose deterministic terrain/ocean/vegetation/atmosphere snapshot
  -> create camera rail and Cozy Island scenario
  -> create world/ocean/foam/cloud/fog/post consumers
  -> consume wheel/pointer/keyboard/blur/resize input
  -> scenario.tick(dt)
  -> project camera from scenario render snapshot
  -> update world and foam consumers
  -> sample adaptive-performance budget
  -> submit post pipeline
  -> expose live objects and aggregate state through globalThis.CozyIsland
```

## Current finding

The highest-value next boundary is now narrower than general frame correlation: adaptive-quality transition authority is split between `createPerformanceBudget()` and inline renderer mutation in `src/main-cloudform.js`.

Source-backed issues:

- `frameMs` is callback-to-callback elapsed time and is sampled before `postPipeline.render()`.
- `trackTimestamp: true` is enabled on the renderer, but no GPU timestamp result is consumed by the policy.
- degrade/recover callbacks mutate cloud steps, fog steps, fog resolution, and DPR without an ordered transition result.
- recovery to level `0` restores cloud/fog scales but does not call `renderer.setPixelRatio()`, so a degraded DPR can remain active after full recovery.
- `performanceBudget.getState()` exposes only current aggregates and cannot prove metric source, transition order, applied settings, or reversibility.

## Read this pass first

```txt
.agent/trackers/2026-07-10T16-08-56-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T16-08-56-04-00.md
.agent/architecture-audit/2026-07-10T16-08-56-04-00-adaptive-quality-transition-authority-dsk-map.md
.agent/render-audit/2026-07-10T16-08-56-04-00-frame-cost-submit-recovery-gap.md
.agent/interaction-audit/2026-07-10T16-08-56-04-00-input-frame-load-attribution-map.md
.agent/gameplay-audit/2026-07-10T16-08-56-04-00-scenario-camera-performance-loop.md
.agent/grass-system-audit/2026-07-10T16-08-56-04-00-vegetation-quality-consumption-gap.md
.agent/cloud-system-audit/2026-07-10T16-08-56-04-00-volumetric-step-recovery-contract.md
.agent/host-proof-audit/2026-07-10T16-08-56-04-00-performance-transition-journal-contract.md
.agent/performance-audit/2026-07-10T16-08-56-04-00-dpr-recovery-gpu-timing-gap.md
.agent/deploy-audit/2026-07-10T16-08-56-04-00-node-performance-transition-fixture-gate.md
```

## Do not start next with

- cloud, fog, ocean, vegetation, grass, camera, or lighting retuning
- renderer replacement
- new island content
- route-token churn
- screenshot automation

## Start next with

```txt
MyCozyIsland Adaptive Quality Transition Authority + Frame-Cost Fixture Gate
```

## Required implementation shape

- Define the authoritative frame-cost metric and label its source.
- Make quality application absolute and reversible for every level.
- Restore DPR explicitly when recovering to level `0`.
- Emit JSON-safe degrade/recover results with previous level, next level, reason, sampled metric, and applied settings.
- Correlate each transition with the frame that triggered it and the render submission that consumed it.
- Expose additive host readback without removing `globalThis.CozyIsland`.
- Add a DOM-free Node fixture proving `0 -> 1 -> 2 -> 1 -> 0`, exact restoration, idempotency, serialization, and bounded history.

## Validation state

Documentation-only refresh. Runtime source changed: no. Branch created: no. Pull request created: no. Existing tests and the missing adaptive-quality fixture were not run.