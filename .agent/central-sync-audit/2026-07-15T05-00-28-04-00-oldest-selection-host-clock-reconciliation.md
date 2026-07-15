# Central-sync audit: oldest-selection host-clock reconciliation

**Timestamp:** `2026-07-15T05-00-28-04-00`  
**Status:** `host-clock-fixed-step-simulation-authority-audited`

## Summary

The current Publish inventory contains 11 repositories. Ten remain eligible after excluding TheCavalryOfRome. Each eligible repository has a central ledger, a root `.agent` state and a current `main` head matching its documented repo-local head. MyCozyIsland was the oldest synchronized eligible repository.

## Plan ledger

**Goal:** preserve deterministic selection and provide the exact payload needed for central reconciliation.

- [x] Enumerate all accessible Publish repositories.
- [x] Compare against `LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/`.
- [x] Verify root `.agent` coverage.
- [x] Compare current and documented heads.
- [x] Exclude TheCavalryOfRome.
- [x] Select only MyCozyIsland.
- [x] Record files added, files refreshed and findings.
- [ ] Complete the central ledger and change-log write.

## Selection state

```txt
inventory: 11
eligible: 10
new: 0
ledger missing: 0
root agent missing: 0
undocumented: 0
runtime ahead: 0
selected: LuminaryLabs-Publish/MyCozyIsland
prior central timestamp: 2026-07-15T01-04-57-04-00
prior repo-local documentation head: a8733b506ecbd43190a280942790cdaa0bd1b983
```

## Finding to reconcile

```txt
one clipped variable step per RAF callback
maximum admitted step: 0.05 seconds
no fixed-step accumulator
no bounded catch-up result
no discarded-time receipt
no interpolation alpha
no FirstClockAlignedFrameAck
```

Time consumers include scenario/environment time, player intro/movement/stamina, Agriculture growth, Foraging respawn and autosave cadence.

## Repo-local files added

```txt
.agent/trackers/2026-07-15T05-00-28-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-15T05-00-28-04-00.md
.agent/architecture-audit/2026-07-15T05-00-28-04-00-host-clock-fixed-step-simulation-dsk-map.md
.agent/render-audit/2026-07-15T05-00-28-04-00-clock-aligned-render-frame-gap.md
.agent/gameplay-audit/2026-07-15T05-00-28-04-00-low-fps-slow-simulation-loop.md
.agent/interaction-audit/2026-07-15T05-00-28-04-00-host-clock-command-result-map.md
.agent/simulation-clock-audit/2026-07-15T05-00-28-04-00-raf-delta-accumulator-contract.md
.agent/deploy-audit/2026-07-15T05-00-28-04-00-host-clock-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-15T05-00-28-04-00-oldest-selection-host-clock-reconciliation.md
```

## Root files refreshed

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Central target

```txt
repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
internal-change-log/2026-07-15T05-00-28-04-00-my-cozy-island-host-clock-fixed-step-simulation.md
```

No runtime or deployment change is claimed.