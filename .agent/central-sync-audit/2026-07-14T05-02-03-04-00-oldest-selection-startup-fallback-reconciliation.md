# Central sync audit: oldest selection and startup fallback reconciliation

**Timestamp:** `2026-07-14T05-02-03-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Status:** `menu-failure-game-bootstrap-fallback-authority-audited`

## Summary

All eligible Publish repositories were already tracked, had root `.agent` state and matched their recorded documentation heads. MyCozyIsland was selected as the oldest eligible entry. This audit adds the shell-startup fault-isolation finding and prepares the central ledger update.

## Plan ledger

**Goal:** preserve exact selection evidence and synchronize the repo-local audit into `LuminaryLabs-Dev/LuminaryLabs` without changing runtime code.

- [x] Enumerate 11 Publish repositories.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible central ledgers.
- [x] Confirm ten eligible root `.agent` states.
- [x] Confirm no eligible repository is runtime-ahead.
- [x] Select only MyCozyIsland by oldest timestamp.
- [x] Add the timestamped repo-local audit family.
- [x] Refresh required root audit files and machine registry.
- [ ] Record the final repo-local documentation head in the central ledger.
- [ ] Add one central internal change-log entry.

## Comparison result

```txt
new eligible: 0
ledger missing: 0
root .agent missing: 0
runtime ahead: 0
selected: LuminaryLabs-Publish/MyCozyIsland
previous central timestamp: 2026-07-13T23-58-48-04-00
reviewed pre-audit head: b7edce0ac6c7fc7005be56f649141e31690e4eee
```

## Reconciled finding

```txt
menu presentation is optional product presentation
primary game route has its own Core Startup authority
current shell starts the game route only after menu success
menu import/init/pipeline failure blocks the primary startup attempt
```

## Central files

```txt
repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
internal-change-log/2026-07-14T05-02-03-04-00-my-cozy-island-shell-startup-fault-isolation.md
```

## Change boundary

```txt
runtime JavaScript changed: no
HTML or CSS changed: no
tests or scripts changed: no
dependencies changed: no
workflow or deployment changed: no
branch created: no
pull request created: no
```

The central entry must record the final repo-local documentation head after all repo-local writes complete.
