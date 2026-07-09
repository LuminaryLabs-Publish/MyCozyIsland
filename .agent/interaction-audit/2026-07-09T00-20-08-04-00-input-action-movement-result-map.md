# Interaction Audit: Input Action + Movement Result Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T00-20-08-04-00`

## Current input loop

```txt
wheel event
  -> preventDefault
  -> progress = clamp01(progress + deltaY * -0.0014)

pointerdown
  -> drag = { x, y }

pointermove while drag
  -> if progress >= 0.985, mutate player yaw and pitch
  -> else if progress < 0.85, mutate player yaw only
  -> update drag origin

keydown / keyup
  -> mutate Set of key codes

frame
  -> if progress >= 0.985 call fp(dt)
  -> else call rail()

fp(dt)
  -> read keyboard Set
  -> compute movement vector
  -> sample terrain height
  -> valid(next)
  -> mutate player.position only if valid
```

## Current policy issue

`valid(next)` returns only a boolean. It does not explain whether movement was rejected because the player left the clearing boundary or entered the campfire keepout.

## Needed records

```txt
BrowserInputActionFrame:
  source event type
  normalized delta
  progress before/after
  yaw before/after
  pitch before/after
  first-person gate state
  keyboard movement vector

ActionResult:
  action id
  status accepted/rejected/noop
  reason
  before snapshot
  after snapshot

MovementPolicyResult:
  candidate position
  sampled height
  accepted boolean
  rejection reason
  clearing boundary distance
  campfire distance
```

## Fixture rows

```txt
wheel increases progress and clamps
wheel decreases progress and clamps
pointer yaw before first-person threshold
pointer yaw/pitch after first-person threshold
keyboard rejected before first-person threshold
movement accepted inside clearing and outside campfire keepout
movement rejected outside clearing
movement rejected inside campfire keepout
```

## Finding

The current input behavior is simple and should remain intact. The next change should wrap it with source-owned result records before any gameplay expansion.