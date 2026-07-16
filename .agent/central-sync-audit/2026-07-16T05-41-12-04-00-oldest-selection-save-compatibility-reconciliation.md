# Central sync audit: oldest selection and save compatibility reconciliation

**Timestamp:** `2026-07-16T05-41-12-04-00`  
**Publish repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Central repository:** `LuminaryLabs-Dev/LuminaryLabs`  
**Branches:** `main` only

## Summary

The current Publish inventory contains 11 accessible repositories. Ten are eligible after excluding TheCavalryOfRome. All ten had central ledger and root `.agent` coverage, and no eligible runtime was ahead of its documented head. MyCozyIsland was the oldest synchronized eligible repository and was selected alone.

## Plan ledger

**Goal:** preserve deterministic selection evidence and define the exact central records required after repo-local documentation completes.

- [x] Enumerate the full Publish installation inventory.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm central and root-agent coverage.
- [x] Confirm no higher-priority repository class exists.
- [x] Select only MyCozyIsland.
- [x] Add the save/world/content compatibility audit family.
- [ ] Bind the final repo-local documentation head in the central ledger.
- [ ] Add the central internal change-log entry.

## Selection evidence

```txt
MyCozyIsland      2026-07-16T00-59-16-04-00 selected
IntoTheMeadow     2026-07-16T01-38-56-04-00
PrehistoricRush   2026-07-16T02-03-42-04-00
HorrorCorridor    2026-07-16T02-40-29-04-00
TheOpenAbove      2026-07-16T03-03-22-04-00
ZombieOrchard     2026-07-16T03-41-28-04-00
TheUnmappedHouse  2026-07-16T04-02-40-04-00
PhantomCommand    2026-07-16T04-27-44-04-00
AetherVale        2026-07-16T04-40-16-04-00
TheLongHaul       2026-07-16T05-01-43-04-00
TheCavalryOfRome  excluded
```

## Central records

```txt
repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
internal-change-log/2026-07-16T05-41-12-04-00-my-cozy-island-save-world-content-compatibility.md
```

## Reconciliation boundary

The central record must identify the documentation-only nature of the run, preserve the 70-surface inventory, record the compatibility finding and authority, bind the final repo-local documentation head and avoid any runtime, migration or readiness claim.