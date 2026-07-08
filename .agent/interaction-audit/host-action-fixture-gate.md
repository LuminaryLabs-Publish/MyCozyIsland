# Interaction Audit: Host Action Fixture Gate

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-08T02:09:17-04:00`

## Current interaction loop

```txt
wheel input
  -> scroll progress
  -> camera rail sample
  -> first-person threshold

pointer drag
  -> yaw/look state
  -> camera orientation

keyboard input
  -> first-person movement intent
  -> clearing boundary check
  -> campfire keepout check
  -> accepted/rejected movement mutation
```

## Current issue

The interaction loop works as a browser behavior, but the app does not yet expose stable host-action results.

This makes it hard for future scheduled work to know whether movement, camera rail, cloud drift, or rejection policies are still correct after visual changes.

## Required host-action boundary

```txt
InputEvent / fixture command
  -> ActionFrame
  -> host reducer
  -> ActionResult
  -> optional scene mutation
  -> journal entry
  -> diagnostics snapshot
```

## ActionFrame target

```txt
{
  type: "wheel" | "pointer-drag" | "keyboard-move" | "tick",
  dtMs: number,
  payload: object,
  source: "dom" | "fixture",
  sequence: number
}
```

## ActionResult target

```txt
{
  accepted: boolean,
  actionType: string,
  reason: string | null,
  before: object,
  after: object,
  diagnostics: object
}
```

## Explicit rejection reasons needed

```txt
movement-not-enabled-yet
outside-clearing-boundary
inside-campfire-keepout
invalid-action-frame
no-state-change
```

## Fixture gate target

Add a script that can run without DOM/WebGL and verify:

```txt
- wheel action changes rail progress
- pointer action changes yaw snapshot
- keyboard action is gated before first-person threshold
- valid movement in clearing is accepted
- movement outside clearing is rejected
- campfire keepout is rejected separately
- tick action produces cloud drift result
- all actions write deterministic journal entries
```

## Compatibility rule

Keep browser events as adapters.

Do not let DOM event objects become the domain contract.

The reusable contract is `ActionFrame -> ActionResult`; DOM, keyboard, pointer, and wheel are only one source of frames.
