# Interaction Audit: Camera, Player, Reset and Terrain Revision Map

Timestamp: `2026-07-11T02-02-59-04-00`

## Input map

```txt
wheel
  -> camera rail progress

pointer drag
  -> rail/orbit look mutation

WASD
  -> first-person player movement after rail completion

Shift
  -> movement speed modifier

H
  -> diagnostics visibility

blur
  -> clear pressed-key state

resize
  -> renderer size and camera projection
```

## Terrain-coupled interactions

```txt
camera rail creation -> terrain service
first-person movement -> camera sequence terrain sampling
scenario reset -> clock and camera reset
world props -> terrain startup sampling
diagnostics -> no terrain revision projection
```

## Missing command/result boundary

Input methods mutate camera/input state and return no typed result. Scenario reset also returns no structured result. The route therefore cannot correlate:

```txt
input command
camera/player mutation
terrain revision sampled
resulting transform
rendered frame
reset restoration
```

## Terrain revision risk

The runtime currently creates one terrain service for the session, so mismatches are unlikely within an unchanged startup. The contract becomes unsafe when any of the following is introduced:

```txt
runtime reset that rebuilds terrain
seed selection
quality-driven terrain rebuild
editor mutation
hot reload
save/load
world-layer replacement
```

Without terrain identity, an old camera/player baseline or placement snapshot can remain accepted after a new surface is produced.

## Proposed interaction result

```txt
InteractionResult {
  commandId
  inputType
  status
  reason
  sessionId
  terrainRevision
  before
  after
  sourceFrameId
}
```

## Reset result requirements

```txt
clock reset status
camera baseline fingerprint
player transform
terrain revision
initial clearing descriptor fingerprint
environment frame revision when available
consumer reset rows
```

## Fixture cases

```txt
wheel before rail completion
pointer drag before and after rail completion
WASD before and after first-person admission
Shift movement
blur key clearing
reset from center
reset after moving to fence edge
stale terrain-revision command rejection
```

## Recommendation

Keep input behavior unchanged. Add detached command/result observations and terrain revision correlation rather than embedding new terrain logic in input handlers.
