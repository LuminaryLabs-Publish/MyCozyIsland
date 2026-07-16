# Accessibility audit: semantic HUD, progress and focus contract

**Timestamp:** `2026-07-15T19-58-42-04-00`

## Summary

The game needs a small semantic surface that mirrors accepted state, not a second UI and not a live announcement for every frame.

## Plan ledger

**Goal:** define exact browser semantics for menu, startup and gameplay.

- [x] Classify current elements.
- [x] Define replacements and update policies.
- [x] Define focus lifecycle.
- [x] Define proof requirements.
- [ ] Implement and test.

## Menu contract

```txt
preload status:
  independent role=status
  determinate role=progressbar
  aria-valuemin=0
  aria-valuemax=100
  aria-valuenow from accepted preload progress

Play:
  stable button identity
  disabled until ready
  label changes only for action state
  not used as the progress live region
```

## Game startup contract

```txt
loader:
  status label for current preparation
  determinate overall progressbar
  failure uses role=alert
  completion removes busy state after first accepted frame
```

## Gameplay HUD contract

```txt
objective:
  labeled current objective
  polite announcement only when objective revision changes

resources:
  stable labeled values
  queryable without automatic per-frame announcements

stamina:
  role=progressbar
  aria-valuemin=0
  aria-valuemax=100
  rounded aria-valuenow
  announcement only at authored thresholds if desired

seed selection:
  stable group/listbox semantics
  selected option state
  key shortcut included in accessible name/description

interaction:
  polite status for target/prompt transitions
  accepted result receipt announced once
  unavailable/no-op frame state stays quiet

save:
  announce failure/conflict
  successful autosave remains quiet unless user-requested
```

## Focus contract

```txt
menu owns focus before entry
Play activation admits one entry generation
iframe is revealed and aria-hidden removed
game document confirms playable frame
canvas or authored first gameplay control receives focus
FocusAdmissionResult publishes accepted target
retired menu controls become inert
```

## Prohibited shortcut

Do not attach `aria-live` to every HUD value while `updateHud` still runs every RAF callback. That would convert render cadence into announcement cadence.
