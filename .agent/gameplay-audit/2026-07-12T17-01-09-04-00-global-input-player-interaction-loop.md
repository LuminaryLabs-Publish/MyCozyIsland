# Gameplay Audit: Global Input to Player and Interaction Loop

Timestamp: `2026-07-12T17-01-09-04-00`

## Summary

Player movement and contextual actions consume one deterministic input frame, but the browser can populate that frame without proving game-surface focus or current pointer ownership.

## Plan ledger

**Goal:** show exactly where browser input becomes gameplay mutation and define the zero-mutation rejection boundary.

- [x] Trace keyboard movement and one-shot actions.
- [x] Trace pointer look into player state.
- [x] Trace input into seed selection and contextual interaction.
- [x] Identify stale and duplicate action paths.
- [ ] Add phase-admitted gameplay input results.

## Current gameplay loop

```txt
WASD / Shift
  -> held key map
  -> axis and sprint fields
  -> player movement and stamina

pointer drag
  -> look deltas
  -> player yaw and pitch
  -> camera descriptor

E
  -> interactPressed
  -> nearest plot or forage target
  -> Agriculture or Foraging transaction

Q / 1-4
  -> cycle or select seed
  -> Inventory selection mutation

Space / Enter / movement / E
  -> skip intro
```

## Gameplay risks

### Unfocused movement

Window-level keyboard admission allows held movement or one-shot actions while another page surface owns focus.

### Foreign pointer look

A pointer that did not begin the active drag can contribute look deltas because pointer ID is not checked on move.

### Duplicate one-shot action

Repeated command IDs are accepted. A caller can replay an `E`, `Q`, digit or intro-skip command without a duplicate result at the input boundary.

### Post-clear reactivation

A clear command can be followed by later commands in the same queue. Those later commands can re-establish held movement or one-shot actions despite the lifecycle boundary that requested the clear.

## Required gameplay admission

```txt
accepted InputAdmissionResult
  -> one committed InputFrame
  -> player receipt
  -> interaction receipt when applicable
  -> camera receipt
  -> visible-frame acknowledgement

rejected result
  -> no held-state change
  -> no player revision caused by the command
  -> no inventory selection change
  -> no Agriculture or Foraging action
  -> no camera change
```

## Validation boundary

No gameplay code changed and no browser gameplay event sequence was executed.