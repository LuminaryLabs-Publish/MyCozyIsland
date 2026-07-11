# Interaction Audit: Focus Command and Result Map

Timestamp: `2026-07-11T06-50-30-04-00`

## Plan ledger

**Goal:** replace the implicit camera-to-world side effect with a command/result boundary that supports stale rejection, failure reporting, rollback and later renderer correlation.

- [x] Identify focus command producers.
- [x] Identify current admission rules.
- [x] Identify mutation and result points.
- [x] Define a typed command/result map.

## Producers

```txt
scenario camera rail
  -> center focus only

first-person camera
  -> position from scenario state
  -> host calls updateWorldFocus every frame
```

## Current admission

```txt
not prepared
  -> false

same cell and below interval/movement threshold
  -> false

otherwise
  -> commitFocus(target)
  -> true
```

The Boolean result collapses unchanged and unprepared into `false`, while every completed call to `commitFocus` becomes `true` regardless of cell/provider completeness.

## Missing command envelope

```txt
schema
commandId
sessionEpoch
runtimeCommit
worldId
previousFocusRevision
requestedPosition
cameraMode
sourceFrameId
```

## Missing admission results

```txt
rejected-not-prepared
rejected-stale-session
rejected-stale-focus
rejected-invalid-position
unchanged-same-cell
unchanged-threshold
accepted-for-transition
```

## Missing final results

```txt
accepted-complete
accepted-degraded
failed-rolled-back
failed-partial
```

## Required correlation

```txt
input/frame
  -> focus command ID
  -> focus revision
  -> Core World sequence/world revision
  -> cell selection delta
  -> provider results
  -> presentation descriptor revision
  -> render admission/result
  -> committed frame
```

## Required behavior

- The host must never infer success from a Boolean.
- A stale session callback must not move focus or providers.
- An invalid numeric position must be rejected before Core World mutation.
- An unchanged threshold result must not advance revisions.
- A provider failure must return its cell, provider, phase and stable error code.
- A rejected transition must state whether previous focus and provider state were preserved.
- A partial/degraded transition must name every incomplete cell.
- Result journals must be bounded and structured-clone safe.

## Required fixture sequence

```txt
command 1: same-cell unchanged
command 2: cross-cell complete
command 3: duplicate previous revision rejected
command 4: provider failure rolled back or explicitly degraded
command 5: retry complete
restart
command 6 from old session rejected
command 7 from new session complete
```

## Host projection

`CozyIsland.getState()` should expose bounded values only:

```txt
sessionEpoch
runtimeCommit
focusRevision
worldRevision
lastFocusResult
recentFocusResults
activeCellIds
failedCellIds
providerStoreVersions
```

It should not expose mutable Maps, typed arrays, release functions, Three objects or the raw engine as the proof surface.
