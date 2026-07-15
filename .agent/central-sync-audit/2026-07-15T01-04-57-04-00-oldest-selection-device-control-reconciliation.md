# Central sync audit: oldest-selection device-control reconciliation

**Timestamp:** `2026-07-15T01-04-57-04-00`  
**Status:** `device-control-surface-action-coverage-authority-audited`

## Summary

The current Publish inventory contains 11 repositories. After excluding TheCavalryOfRome, all ten eligible repositories retain central-ledger and root `.agent` coverage, and each current head matches its recorded repo-local documentation head. MyCozyIsland had the oldest central timestamp and was the only selected repository.

## Plan ledger

**Goal:** preserve deterministic one-repository selection and define the exact central updates for this device-control finding.

- [x] Enumerate the organization inventory.
- [x] Compare ledger coverage.
- [x] Confirm root `.agent` coverage from unchanged documented heads.
- [x] Compare eligible current and documented heads.
- [x] Apply priority classes before timestamp fallback.
- [x] Select MyCozyIsland only.
- [x] Record repo-local additions and refreshed root files.
- [x] Identify the central ledger and internal change-log targets.
- [x] Create no branch or pull request.

## Selection order

```txt
MyCozyIsland       2026-07-14T20-05-56-04-00  selected
IntoTheMeadow      2026-07-14T20-40-50-04-00
HorrorCorridor     2026-07-14T20-58-46-04-00
ZombieOrchard      2026-07-14T21-41-41-04-00
TheUnmappedHouse   2026-07-14T22-01-31-04-00
TheOpenAbove       2026-07-14T22-39-00-04-00
AetherVale         2026-07-14T23-00-09-04-00
PhantomCommand     2026-07-14T23-38-29-04-00
PrehistoricRush    2026-07-15T00-00-35-04-00
TheLongHaul        2026-07-15T00-38-54-04-00
```

## Central targets

```txt
repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
internal-change-log/2026-07-15T01-04-57-04-00-my-cozy-island-device-control-action-coverage.md
```

## Reconciliation state

```txt
repo-local status: device-control-surface-action-coverage-authority-audited
central target status: device-control-surface-action-coverage-authority-central-reconciled
source inventory retained: 65 kits + 1 composition kit + 5 adapters
runtime behavior changed: no
```