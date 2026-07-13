# START HERE: MyCozyIsland browser page-lifecycle authority

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Aligned:** `2026-07-13T01-31-36-04-00`  
**Status:** `browser-page-lifecycle-suspension-retirement-authority-audited`

## Summary

MyCozyIsland is a NexusEngine-composed procedural island Agriculture and wild-resource adventure with portable saves and WebGPU/WebGL2 presentation.

The newest audit isolates browser page lifecycle ownership. A once-only `pagehide` handler always saves and disposes only `gameplayRenderer`. It does not distinguish BFCache suspension from terminal departure, has no `pageshow` reconstruction path and leaves the animation loop, listeners and remaining GPU resources outside one retirement contract. Because gameplay disposal clears plot, forage and crop indexes, a retained-page return can resume simulation and HUD updates against stale world presentation.

## Plan ledger

**Goal:** make every page lifecycle transition a classified, generation-fenced suspend, resume or retire transaction with complete participant receipts.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm no new, missing or substantively unsynchronized repository takes priority.
- [x] Select only MyCozyIsland as the oldest eligible synchronized repository.
- [x] Trace pagehide, save, gameplay disposal and the absent pageshow path.
- [x] Preserve the complete 64-kit and service inventory.
- [x] Add the timestamped lifecycle audit family.
- [x] Refresh required root documents and machine registry.
- [x] Push only to `main` and create no branch or pull request.
- [ ] Implement and execute lifecycle fixtures.

## Read this run first

```txt
.agent/trackers/2026-07-13T01-31-36-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T01-31-36-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-13T01-31-36-04-00-browser-page-lifecycle-dsk-map.md
.agent/render-audit/2026-07-13T01-31-36-04-00-bfcache-resume-visible-state-gap.md
.agent/gameplay-audit/2026-07-13T01-31-36-04-00-pagehide-dispose-resume-loop.md
.agent/interaction-audit/2026-07-13T01-31-36-04-00-pagehide-pageshow-admission-map.md
.agent/lifecycle-audit/2026-07-13T01-31-36-04-00-suspend-resume-retire-contract.md
.agent/deploy-audit/2026-07-13T01-31-36-04-00-page-lifecycle-browser-fixture-gate.md
```

## Interaction loop

```txt
startup
  -> choose backend and quality
  -> install NexusEngine adventure
  -> restore save and construct render participants
  -> install input/lifecycle listeners
  -> start animation loop

frame
  -> tick simulation
  -> update camera, world, Agriculture, Foraging and HUD
  -> sample quality budget
  -> render post pipeline
  -> periodically save changed state

pagehide today
  -> store save
  -> dispose gameplay renderer
  -> clear plot/forage/crop indexes
  -> no event classification or lifecycle result

retained-page return today
  -> no pageshow handler
  -> no renderer reconstruction
  -> no timing/input generation reset
  -> animation and simulation may resume against cleared presentation indexes
```

## Main findings

```txt
pagehide persisted-state classification: absent
suspend versus terminal-retire policy: absent
pageshow resume command: absent
animation-loop lifecycle ownership: absent
complete renderer participant registry: absent
save-flush terminal receipt: absent
exactly-once resource retirement: absent
wall-time baseline reset on resume: absent
first resumed visible-frame acknowledgement: absent
BFCache and terminal-retirement fixtures: absent
```

## Required parent domain

```txt
cozy-island-browser-page-lifecycle-authority-domain
```

## Required flow

```txt
browser lifecycle event
  -> classify persisted suspension, resume or terminal retirement
  -> validate runtime session and expected lifecycle generation
  -> build participant plan
  -> suspend without destructive disposal
     or resume with timing/input reset
     or retire every participant exactly once
  -> publish PageLifecycleResult
  -> acknowledge first resumed visible frame when applicable
```

## Guardrails

```txt
Push only to main.
Create no branch or pull request.
Do not work on TheCavalryOfRome.
Do not treat pagehide as proof of terminal unload.
Do not dispose retained-page renderer indexes during suspension.
Do not report Retired while mandatory participants remain owned.
Do not claim lifecycle safety until real browser and Pages fixtures pass.
```

The prior adaptive-quality, durable-save and browser-input audits remain valid in their timestamped audit families.