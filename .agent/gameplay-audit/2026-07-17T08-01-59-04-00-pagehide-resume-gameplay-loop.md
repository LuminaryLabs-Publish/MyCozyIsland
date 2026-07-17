# Gameplay audit — Pagehide and resume loop

**Timestamp:** `2026-07-17T08-01-59-04-00`

## Current loop

```txt
gameplay frame
  -> input admission
  -> adventure.tick(dt)
  -> camera/light/world/gameplay/HUD projection
  -> performance sample
  -> render
  -> autosave check

pagehide
  -> capture and store save
  -> dispose gameplay renderer
  -> no simulation suspension result
  -> no input retirement
  -> no clock rebase

persisted pageshow
  -> no explicit handling
```

## Gameplay implications

- Held movement or sprint state has no page-lifecycle retirement.
- The next `dt` is clamped, but the host does not explicitly discard unavailable time or publish a clock-rebase result.
- A resumed simulation can continue while its farm/forage presentation subtree has been disposed.
- The terminal save attempt is not correlated with runtime retirement.
- Repeated pagehide/pageshow has no idempotency or generation boundary.

## Required gameplay contract

`RuntimeSuspensionCommand` must clear held input and stop simulation/frame advancement. `RuntimeResumeCommand` must use a fresh monotonic baseline and the exact retained runtime generation. `RuntimeRetirementCommand` must settle the save result and make further gameplay callbacks ineligible.

No gameplay bug was reproduced; this audit documents missing lifecycle authority.
