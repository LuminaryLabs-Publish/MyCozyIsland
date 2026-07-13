# START HERE: MyCozyIsland adaptive render-quality authority

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Aligned:** `2026-07-12T23-08-37-04-00`  
**Status:** `adaptive-render-quality-transition-authority-audited`

## Summary

MyCozyIsland is a NexusEngine-composed procedural island adventure with official Agriculture, Inventory, wild Foraging, first-person movement, portable saves, renderer-neutral snapshots and WebGPU/WebGL2 presentation.

The newest audit isolates adaptive render-quality transitions. Degrade changes cloud steps, fog steps, fog resolution and renderer pixel ratio. Recover restores cloud/fog settings but omits renderer pixel ratio, so a recovered quality level can remain visibly bound to the lowest drawing density reached earlier.

## Plan ledger

**Goal:** make each adaptive-quality change one revisioned, verified and rollback-safe render-generation transaction.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm no substantive unsynchronized repository took priority.
- [x] Select only MyCozyIsland as the oldest eligible synchronized repository.
- [x] Trace quality selection, performance sampling, degrade, recover, render mutation and diagnostics.
- [x] Identify the interaction loop, domains, all 64 kit surfaces and offered services.
- [x] Add the timestamped tracker and audit family.
- [x] Refresh required root documents and the machine registry.
- [x] Synchronize the central ledger and internal change log on `main`.
- [x] Create no branch or pull request.
- [ ] Implement and execute adaptive-quality fixtures.

## Read this run first

```txt
.agent/trackers/2026-07-12T23-08-37-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T23-08-37-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-12T23-08-37-04-00-adaptive-render-quality-dsk-map.md
.agent/render-audit/2026-07-12T23-08-37-04-00-recovery-pixel-ratio-visible-gap.md
.agent/gameplay-audit/2026-07-12T23-08-37-04-00-frame-budget-degrade-recover-loop.md
.agent/interaction-audit/2026-07-12T23-08-37-04-00-quality-signal-plan-commit-result-map.md
.agent/quality-system-audit/2026-07-12T23-08-37-04-00-participant-revision-rollback-contract.md
.agent/deploy-audit/2026-07-12T23-08-37-04-00-adaptive-quality-fixture-gate.md
```

## Interaction loop

```txt
startup
  -> choose static quality tier
  -> configure renderer and render participants
  -> install 13 engine kits
  -> construct world and begin animation loop

frame
  -> tick adventure
  -> update camera, world, gameplay and HUD
  -> sample frame duration
  -> possibly run degrade or recover callback
  -> render post pipeline

quality transition
  -> mutate cloud steps
  -> mutate fog steps
  -> mutate fog resolution
  -> mutate DPR only on degrade
  -> publish no typed result or visible-frame receipt
```

## Main findings

```txt
quality transition command/revision: absent
render generation: absent
multi-participant plan: absent
atomic commit and rollback: absent
DPR recovery mutation: absent
actual DPR diagnostics: absent
stale transition rejection: absent
first visible quality-frame acknowledgement: absent
```

## Required parent domain

```txt
cozy-island-adaptive-render-quality-transition-authority-domain
```

## Required flow

```txt
performance signal
  -> admitted transition command
  -> detached participant plan
  -> capability validation
  -> atomic commit
  -> readback verification
  -> rollback on failure
  -> AdaptiveQualityTransitionResult
  -> truthful diagnostics
  -> first matching visible-frame acknowledgement
```

## Guardrails

```txt
Push only to main.
Create no branch or pull request.
Do not work on TheCavalryOfRome.
Do not treat callback completion as committed quality.
Do not report recovery unless every degraded participant is restored.
Do not claim adaptive-quality correctness until browser and Pages fixtures pass.
```

The prior durable-save and browser-input audits remain valid and are retained in their timestamped audit families.