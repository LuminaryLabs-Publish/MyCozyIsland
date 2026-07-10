# START HERE: MyCozyIsland

Last aligned: 2026-07-10T07-29-12-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland
Current focus: WebGPU host-proof ledger and source-consumer readback.

## Read this first

This repo is currently a WebGPU volumetric Cozy Island route. Do not use the older Three `0.160.0` / `hero-cloud-4` assumptions as the live route source of truth.

## Current route

```txt
index.html
  -> canvas#game + loader + debug + error panel
  -> importmap: three / three-webgpu / three-tsl at 0.185.0
  -> ./src/main-cloudform.js?v=webgpu-volumetric-2
  -> validate 50 DomainServiceKit manifests
  -> compose deterministic environment / terrain / ocean / vegetation / atmosphere / render snapshots
  -> create WebGPURenderer, volumetric cloud/fog renderers, WebGPU ocean/foam, and post pipeline
  -> wheel / pointer / keyboard / blur / resize consumers mutate camera-sequence and scenario state
  -> animation loop ticks scenario, copies camera, updates renderers, samples performance, renders post pipeline
  -> globalThis.CozyIsland legacy diagnostics expose live runtime objects plus aggregate getState()
```

## Current finding

The source-domain layer is useful and tested by `npm test`, but the browser host proof layer is still missing. `globalThis.CozyIsland` exposes live objects and aggregate diagnostics, not a stable JSON-safe ledger.

## Do not start next with

- visual rewrite
- cloud rewrite
- ocean rewrite
- fog rewrite
- camera retune
- renderer replacement
- route-token churn
- new route content

## Start next with

```txt
MyCozyIsland WebGPU Host Proof Ledger Refresh + Node Consumer Fixture Gate
```

## Required next implementation shape

- Add stable route/source fingerprints.
- Add kit catalog readback rows.
- Normalize render snapshot rows.
- Add input accepted/rejected/no-change results.
- Add scenario tick and camera frame readback rows.
- Add cloud/fog/atmosphere volume texture result rows.
- Add performance degrade/recover reason rows.
- Add render-consumption ledger rows.
- Add additive JSON-safe `globalThis.CozyIslandHost` beside legacy `globalThis.CozyIsland`.
- Add a Node fixture that proves these rows without requiring browser WebGPU capture.

## Most recent tracker

```txt
.agent/trackers/2026-07-10T07-29-12-04-00/project-breakdown.md
```

## Current audit files

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/turn-ledger/2026-07-10T07-29-12-04-00.md
.agent/architecture-audit/2026-07-10T07-29-12-04-00-webgpu-host-proof-ledger-dsk-map.md
.agent/render-audit/2026-07-10T07-29-12-04-00-webgpu-render-consumption-host-proof-gap.md
.agent/interaction-audit/2026-07-10T07-29-12-04-00-input-scenario-result-journal.md
.agent/gameplay-audit/2026-07-10T07-29-12-04-00-scenario-camera-host-proof-loop.md
.agent/grass-system-audit/2026-07-10T07-29-12-04-00-vegetation-ground-contact-consumer-ledger.md
.agent/cloud-system-audit/2026-07-10T07-29-12-04-00-volume-texture-cloud-fog-proof.md
.agent/host-proof-audit/2026-07-10T07-29-12-04-00-cozy-island-host-proof-ledger-contract.md
.agent/deploy-audit/2026-07-10T07-29-12-04-00-node-webgpu-consumer-fixture-gate.md
```

## Validation state

Docs-only refresh. Runtime source changed: no. Branch created: no. Pull request created: no. `npm test`: not run in this pass.
