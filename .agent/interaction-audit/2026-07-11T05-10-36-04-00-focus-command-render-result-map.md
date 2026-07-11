# Interaction Audit: Focus Command to Render Result Map

Timestamp: `2026-07-11T05-10-36-04-00`

## Current input path

```txt
wheel
  -> cameraSequence.input.wheel

pointer drag
  -> cameraSequence.input.drag

keyboard
  -> cameraSequence.input.key

frame
  -> scenario.tick
  -> scenario render snapshot
  -> updateWorldFocus(camera.position, camera.mode, dt)
```

`updateWorldFocus()` returns only a Boolean indicating whether a focus commit occurred.

## Missing result chain

```txt
input result
  -> camera transition result
  -> focus admission result
  -> world update result
  -> provider result rows
  -> presentation descriptor result
  -> render commit result
  -> frame correlation
```

The route has no command or result identity connecting a player action to the semantic and visual world states it affected.

## Required focus result

```txt
commandId
sessionEpoch
cameraMode
previousFocus
requestedFocus
admittedFocus
previousCellKey
nextCellKey
status
reason
worldRevision
activeCellIds
providerResults
sourceFingerprint
```

## Required render result

```txt
commandId
worldRevision
previousRenderRevision
renderRevision
status
reason
preparedCellIds
updatedCellIds
releasedCellIds
resourceDelta
renderFingerprint
```

## Admission rules

- Ignore focus updates before world preparation.
- Treat movement below the cell and configured threshold as unchanged.
- Reject non-finite positions.
- Reject stale session epochs after lifecycle authority is added.
- Admit a world revision only once.
- Commit the associated presentation revision at most once.
- Preserve a deterministic reason for every unchanged, rejected, or failed result.

## Debug projection

`CozyIsland.getState()` should expose bounded recent focus/world/render results rather than only aggregate active-cell counts. No live provider, Three.js, GPU, function, Map, Set, or typed-array handle should cross that boundary.