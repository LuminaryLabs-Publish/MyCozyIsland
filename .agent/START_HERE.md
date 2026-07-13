# START HERE: MyCozyIsland page-lifecycle central reconciliation

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Aligned:** `2026-07-13T01-40-00-04-00`  
**Status:** `browser-page-lifecycle-authority-central-reconciled`

## Summary

MyCozyIsland is a NexusEngine-composed procedural island Agriculture and wild-resource adventure with portable saves and WebGPU/WebGL2 presentation.

The active audit is browser page lifecycle ownership. A once-only `pagehide` handler always attempts a save and disposes only `gameplayRenderer`; it does not distinguish BFCache suspension from terminal departure, has no `pageshow` path, and leaves the animation loop, listeners and remaining resources outside one lifecycle transaction. Gameplay disposal clears the plot, forage and crop indexes required by later presentation updates.

## Plan ledger

**Goal:** classify every lifecycle event and commit one generation-fenced Suspend, Resume or Retire result covering runtime, input, save and all render participants.

- [x] Compare the ten-repository Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only MyCozyIsland because its repo-local lifecycle audit was newer than central tracking.
- [x] Re-read pagehide, animation-loop, listener and gameplay-disposal source.
- [x] Preserve all 64 source-backed kit surfaces and their services.
- [x] Add the `2026-07-13T01-40-00-04-00` reconciliation family.
- [x] Refresh required root `.agent` documents and machine state.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement and execute lifecycle fixtures.

## Read this run first

```txt
.agent/trackers/2026-07-13T01-40-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T01-40-00-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-13T01-40-00-04-00-browser-page-lifecycle-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-13T01-40-00-04-00-bfcache-visible-state-central-reconciliation-gap.md
.agent/gameplay-audit/2026-07-13T01-40-00-04-00-pagehide-resume-central-reconciliation-loop.md
.agent/interaction-audit/2026-07-13T01-40-00-04-00-page-lifecycle-admission-central-reconciliation-map.md
.agent/lifecycle-audit/2026-07-13T01-40-00-04-00-suspend-resume-retire-central-reconciliation-contract.md
.agent/deploy-audit/2026-07-13T01-40-00-04-00-page-lifecycle-central-fixture-gate.md
.agent/central-sync-audit/2026-07-13T01-40-00-04-00-repo-ledger-page-lifecycle-reconciliation.md
```

## Interaction loop

```txt
startup -> construct adventure and render participants -> install listeners -> start animation loop
frame -> tick -> project world/Agriculture/Foraging/HUD -> render -> periodic save
pagehide -> save attempt -> destructive gameplay-only disposal -> no typed result
retained return -> no pageshow reconstruction -> possible frames against cleared indexes
terminal departure -> no complete stop, save receipt or ordered resource retirement
```

## Main finding

```txt
pagehide persisted classification: absent
Suspend versus Retire decision: absent
pageshow Resume path: absent
animation-loop and listener lifecycle ownership: absent
complete renderer participant registry: absent
save-flush terminal receipt: absent
exactly-once resource retirement: absent
first resumed visible-frame acknowledgement: absent
```

## Required parent domain

```txt
cozy-island-browser-page-lifecycle-authority-domain
```

## Guardrails

```txt
Push only to main.
Create no branch or pull request.
Do not work on TheCavalryOfRome.
Do not treat pagehide as proof of terminal unload.
Do not destructively dispose retained-page participants during suspension.
Do not report Retired while mandatory participants remain owned.
Do not claim lifecycle safety until browser and Pages fixtures pass.
```

Prior adaptive-quality, durable-save and browser-input audits remain valid in their timestamped families.