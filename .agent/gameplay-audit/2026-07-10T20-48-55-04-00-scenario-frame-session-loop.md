# Gameplay Audit: Scenario Frame and Session Loop

Timestamp: `2026-07-10T20-48-55-04-00`

## Current gameplay loop

```txt
frame delta
  -> cozy-island scenario tick
  -> environment clock tick
  -> camera rail tick
  -> constrained first-person movement after rail completion
  -> render snapshot projection
  -> camera transform
  -> visual updates
  -> render submission
```

## Player-state authority

The camera rail sequence owns:

```txt
rail progress
yaw
pitch
pressed-key set
player position
eye height
clearing and campfire movement admission
```

The scenario owns composition of clock and camera progression. The browser host owns the actual frame cadence and input event forwarding.

## Gap

Gameplay state can reset through sequence/scenario methods, but the running browser session cannot be atomically reset or replaced. There is no session ID binding input, scenario state, frame commits, and render resources.

## Required session-aware loop

```txt
session start result
  -> accepted inputs tagged with sessionId and inputSequence
  -> scenario tick tagged with frameId
  -> committed camera/gameplay snapshot
  -> render-consumption row
  -> stop result
  -> dispose result
```

## Required invariants

- inputs from a disposed session are rejected
- held keys are cleared on stop, blur, dispose, and restart
- no scenario ticks occur after stop/dispose
- reset affects only the active session
- restart begins from the authored rail/player initial state
- frame delta clamping remains unchanged
- clearing and campfire movement constraints remain unchanged

## Decision

Do not retune movement, rail timing, camera limits, or authored world bounds until session-scoped input and frame ownership are proven.
