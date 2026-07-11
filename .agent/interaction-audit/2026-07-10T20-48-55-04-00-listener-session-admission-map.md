# Interaction Audit: Listener and Session Admission Map

Timestamp: `2026-07-10T20-48-55-04-00`

## Installed listeners

```txt
canvas wheel
canvas pointerdown
canvas pointerup
canvas pointercancel
canvas pointermove
window keydown
window keyup
window blur
window resize
```

These listeners are installed through closures inside `main()` and have no route-owned registration ledger or coordinated removal path.

## Current action map

```txt
wheel -> cameraSequence.input.wheel
pointer drag -> cameraSequence.input.drag
keydown -> debug toggle and cameraSequence.input.key(true)
keyup -> cameraSequence.input.key(false)
blur -> cameraSequence.input.clear
resize -> renderer size and camera projection update
```

## Admission gaps

- no listener ID
- no session ID
- no active/disposed admission check
- no typed accepted/rejected/no-op result
- no input sequence number
- no frame-consumption correlation
- no proof that removal occurred
- pointer capture is not coordinated with session stop/disposal

## Required result shape

```txt
{
  sessionId,
  inputSequence,
  type,
  accepted,
  reason,
  stateBefore,
  stateAfter
}
```

Stable reasons should include:

```txt
accepted
ignored-before-running
ignored-after-stop
rejected-disposed-session
no-op-no-drag
no-op-key-state-unchanged
clearing-boundary-rejected
campfire-radius-rejected
```

## Listener lifecycle contract

```txt
register -> active row
stop -> input admission disabled and held keys cleared
dispose -> remove listeners and release pointer capture
second dispose -> typed no-op
restart -> new session-scoped listener rows
```

## Decision

Listener ownership belongs under the route session, not inside individual input closures. Camera and scenario domains should remain browser-agnostic consumers of normalized input results.
