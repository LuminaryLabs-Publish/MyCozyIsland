# Central sync audit: oldest selection and save-writer reconciliation

**Timestamp:** `2026-07-15T15-01-22-04-00`

## Summary

The full Publish inventory contained 11 repositories. After excluding TheCavalryOfRome, all ten eligible repositories had central ledgers and root `.agent` state, and no runtime head was ahead of its documented head. MyCozyIsland had the oldest synchronized central timestamp.

## Plan ledger

**Goal:** record why only MyCozyIsland was changed and what central state must be updated.

- [x] Compare organization inventory with `LuminaryLabs-Dev/LuminaryLabs/repo-ledger`.
- [x] Check priority classes before using oldest-selection fallback.
- [x] Select one repository only.
- [x] Preserve prior authority statuses.
- [x] Add the `2026-07-15T15-01-22-04-00` repo-local audit family.
- [ ] Bind the final repo-local documentation head in the central ledger.
- [ ] Add the central internal change log.

## Comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/MyCozyIsland
selection rule: oldest synchronized central timestamp
prior timestamp: 2026-07-15T10-01-08-04-00
next oldest: LuminaryLabs-Publish/IntoTheMeadow at 2026-07-15T10-40-17-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Central updates

```txt
repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
internal-change-log/2026-07-15T15-01-22-04-00-my-cozy-island-save-writer-lease-revision.md
```
