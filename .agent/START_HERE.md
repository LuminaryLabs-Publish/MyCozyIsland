# START HERE: MyCozyIsland

Last aligned: 2026-07-10T14-42-01-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland
Current focus: WebGPU frame-correlation journal and Node proof fixture.

## Current route

```txt
index.html
  -> Three/WebGPU 0.185.0 import map
  -> src/main-cloudform.js?v=webgpu-volumetric-2
  -> validate 50-kit catalog
  -> choose WebGPU/WebGL2 quality
  -> compose deterministic terrain/ocean/vegetation/atmosphere/render snapshot
  -> create camera rail and Cozy Island scenario
  -> create world/ocean/foam/cloud/fog/post consumers
  -> wheel/pointer/keyboard/blur/resize mutate host input state
  -> animation frame ticks scenario
  -> copy scenario camera
  -> update render consumers
  -> sample performance budget
  -> submit post pipeline
  -> refresh aggregate debug state
  -> globalThis.CozyIsland exposes live objects plus aggregate getState()
```

## Current finding

The route has source descriptors and aggregate diagnostics, but no shared frame identity. Input, scenario, camera, volumetric setup, performance transitions, and render submission cannot be correlated into one deterministic proof chain.

Adding isolated readback arrays without a common `frameId`, `sequence`, `sourceRevision`, and `correlationId` would still leave causality ambiguous.

## Read this pass first

```txt
.agent/trackers/2026-07-10T14-42-01-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T14-42-01-04-00.md
.agent/architecture-audit/2026-07-10T14-42-01-04-00-webgpu-frame-correlation-journal-dsk-map.md
.agent/render-audit/2026-07-10T14-42-01-04-00-render-submit-correlation-gap.md
.agent/interaction-audit/2026-07-10T14-42-01-04-00-input-command-correlation-map.md
.agent/gameplay-audit/2026-07-10T14-42-01-04-00-scenario-camera-frame-correlation-loop.md
.agent/grass-system-audit/2026-07-10T14-42-01-04-00-vegetation-source-frame-attribution.md
.agent/cloud-system-audit/2026-07-10T14-42-01-04-00-volume-build-frame-attribution.md
.agent/host-proof-audit/2026-07-10T14-42-01-04-00-cozy-island-frame-journal-contract.md
.agent/deploy-audit/2026-07-10T14-42-01-04-00-node-frame-correlation-fixture-gate.md
```

## Do not start next with

- visual, cloud, ocean, fog, grass, or camera retuning
- renderer replacement
- route-token churn
- new island content
- screenshot automation

## Start next with

```txt
MyCozyIsland WebGPU Frame Correlation Journal + Node Fixture Gate
```

## Required implementation shape

- Define one host frame envelope with monotonically increasing sequence and frame identity.
- Correlate input results, scenario step, camera projection, performance transition, and render submission.
- Attach source revision and kit-catalog fingerprint to every proof run.
- Record atmosphere volume build results as setup records linked to the active source revision.
- Keep a bounded JSON-safe journal.
- Expose additive `globalThis.CozyIslandHost`; preserve legacy `globalThis.CozyIsland`.
- Add a Node fixture proving order, correlation, bounded retention, and JSON serialization without a GPU.

## Validation state

Documentation-only refresh. Runtime source changed: no. Branch created: no. Pull request created: no. Existing tests and the missing frame-correlation fixture were not run.