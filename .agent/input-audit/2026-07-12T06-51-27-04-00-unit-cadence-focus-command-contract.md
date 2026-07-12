# Input Audit: Unit, Cadence, Focus, and Command Contract

Timestamp: `2026-07-12T06-51-27-04-00`

## Unit contract

Wheel samples must identify `deltaMode` and normalize into one semantic unit before sensitivity is applied.

```txt
DOM_DELTA_PIXEL
DOM_DELTA_LINE
DOM_DELTA_PAGE
  -> normalizedWheelUnits
  -> railProgressDelta
```

Line height and page size must come from an explicit policy rather than browser-specific ambient assumptions.

## Cadence contract

Pointer samples must be accumulated or coalesced before clamping and camera mutation.

```txt
samples during frame interval
  -> ordered/coalesced pointer delta
  -> one sensitivity transform
  -> one policy clamp
  -> one camera mutation
```

The result must be invariant under equivalent segmentation of the same ordered motion.

## Keyboard contract

```txt
keydown first occurrence -> edge down
keydown repeat -> held observation, not a new edge
keyup -> edge up
frame start -> immutable held-key snapshot
```

Movement consumes the held snapshot with frame dt. Mode changes and clears are ordered commands.

## Focus and capture contract

Input is admitted only when the runtime owns the appropriate lease.

```txt
keyboard lease -> focused and visible page
pointer drag lease -> focused page plus active pointer capture
wheel lease -> active canvas interaction policy
```

Loss of focus, visibility, capture, or runtime generation emits one clear command and revokes the lease.

## Command contract

```txt
InputCommandEnvelope {
  sessionId
  runtimeGeneration
  commandId
  sequence
  timestamp
  source
  deviceId
  targetFrameId
  payload
}
```

Commands are immutable, ordered, at-most-once, and journaled as detached observations.

## Camera policy contract

```txt
rail mode
  accepts normalized wheel and pointer orbit
  rejects first-person movement effects

transition mode
  applies explicit policy for wheel reversal and pointer behavior

first-person mode
  accepts look and movement commands
  applies declared policy for returning to rail
```

## Clear precedence

A clear command caused by focus, visibility, capture, stop, or disposal overrides older queued held and drag state. Later commands require a new valid lease.

## Replay contract

A replay consumes normalized commands, not raw DOM events. Given the same initial camera state, terrain policy, command stream, and dt sequence, it must reproduce the same camera descriptors and player positions.

## Observation contract

Public state may expose:

```txt
input revision
last result
held semantic actions
camera mode
focus/visibility/capture lease status
last committed frame ID
```

It must not expose mutable event objects, the pressed Set, listener callbacks, or camera owners.