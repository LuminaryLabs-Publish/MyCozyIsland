# START HERE: MyCozyIsland

Last aligned: `2026-07-11T19-20-22-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: make browser startup one admitted transaction with an acquisition ledger, atomic world preparation, reverse-order rollback, clean retry and first-frame commit proof.

## Summary

`MyCozyIsland` creates the full browser runtime through one long `main()` procedure. It acquires the renderer/backend, Core World runtime, providers, scene graph, atmosphere textures, render consumers, post pipeline, performance callbacks, listeners, timers and animation loop before publishing the global host.

Any exception reaches `fail(error)`, which only updates the error panel. It does not stop or dispose capabilities already acquired. The Core World wrapper also sets `prepared = true` before the initial focus/provider update succeeds, so a failed prepare can leave a poisoned state that returns a null snapshot on retry.

## Plan ledger

**Goal:** document the exact authority boundary required to turn partial browser construction into a commit-or-rollback transaction.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` as the oldest eligible central entry.
- [x] Trace all startup acquisition and failure phases.
- [x] Identify the interaction loop, domains, providers, kits and services.
- [x] Document the poisoned Core World prepare retry path.
- [x] Define startup command, result, acquisition, rollback and first-frame contracts.
- [x] Add architecture, render, gameplay, interaction, startup and deploy audits.
- [x] Change documentation only and push directly to `main`.
- [ ] Implement startup authority and execute failure-injection fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T19-20-22-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T19-20-22-04-00-browser-startup-failure-rollback-dsk-map.md
.agent/render-audit/2026-07-11T19-20-22-04-00-partial-gpu-resource-startup-leak-gap.md
.agent/gameplay-audit/2026-07-11T19-20-22-04-00-prepare-failure-poisoned-runtime-loop.md
.agent/interaction-audit/2026-07-11T19-20-22-04-00-startup-retry-command-admission-map.md
.agent/startup-authority-audit/2026-07-11T19-20-22-04-00-acquisition-ledger-rollback-contract.md
.agent/deploy-audit/2026-07-11T19-20-22-04-00-startup-failure-injection-fixture-gate.md
.agent/turn-ledger/2026-07-11T19-20-22-04-00.md
.agent/kit-registry.json
```

## Interaction loop

```txt
module boot
  -> main()
  -> validate kit catalog
  -> initialize renderer/backend
  -> create and prepare Core World
  -> derive render snapshot
  -> create scene and render resources
  -> install callbacks, timers and animation loop
  -> render frames
  -> publish global readback

exception today
  -> fail(error)
  -> show error text only
  -> retain partial semantic/browser/GPU ownership
```

## Main findings

```txt
startup transaction ID: absent
startup phase/state: absent
acquisition ledger: absent
partial capability identities: absent
rollback plan/results: absent
reverse-order retirement: absent
clean retry contract: absent
first-frame startup commit: absent
prepare atomicity: absent
prepared=true/null-snapshot rejection: absent
```

Concrete prepare defect:

```txt
prepare sets prepared=true
  -> initial commitFocus throws
  -> prepared remains true
  -> worldSnapshot remains null
  -> later prepare returns null without retrying
```

## Domains in use

```txt
browser module and DOM startup
catalog/config/import admission
renderer backend and startup quality
Core World/providers/focus/prepare
runtime session and startup lifecycle
camera rail, first-person scenario and input
terrain, biome, shoreline and population
scene graph, sky and illumination
world, ocean, foam, cloud and fog rendering
atmosphere volume generation
post processing and adaptive quality
listeners, pointer capture, resize and timers
animation loop and diagnostics
validation and Pages deployment
```

## Implemented kits and services

The source-backed catalog remains exactly 50 local kits. Service families:

```txt
render adapters
  backend fallback, volumes, world/ocean/foam/cloud/fog and post composition

scenario
  camera rail, first-person input, deterministic tick, reset and snapshots

world generation
  terrain fields, biome/shore classification, population, contact and LOD

environment
  deterministic clock, wind, weather, illumination, ocean and atmosphere

Core World
  grid, ordered providers, focus, cell lifecycle, snapshots, materialization and query

host
  startup, callbacks, frame budget, diagnostics, tests and Pages delivery
```

The complete per-kit map remains in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Required startup domain

```txt
cozy-island-browser-startup-authority-domain
  -> startup-transaction-id-kit
  -> startup-phase-kit
  -> startup-config-admission-kit
  -> backend-init-result-kit
  -> startup-acquisition-ledger-kit
  -> startup-capability-lease-kit
  -> world-prepare-transaction-kit
  -> first-frame-readiness-kit
  -> startup-commit-result-kit
  -> startup-failure-result-kit
  -> startup-rollback-plan-kit
  -> reverse-order-retirement-kit
  -> retry-baseline-kit
  -> startup-observation-kit
  -> startup-journal-kit
  -> startup-failure-injection-fixture-kit
  -> browser-backend-startup-smoke-kit
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
MyCozyIsland Browser Startup Admission and Failure Rollback Authority
+ Phase Failure Injection / Reverse Retirement / Clean Retry / First-Frame Commit Fixture Gate
```
