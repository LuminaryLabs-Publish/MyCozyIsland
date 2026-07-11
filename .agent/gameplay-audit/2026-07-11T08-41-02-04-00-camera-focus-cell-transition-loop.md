# Gameplay Audit: Camera Focus and Cell Transition Loop

Timestamp: `2026-07-11T08-41-02-04-00`

## Summary

Gameplay movement drives world focus only in first-person mode. The central clearing usually limits travel, but any accepted cell crossing can release and prepare provider rows. That transition currently has no typed gameplay result.

## Plan ledger

**Goal:** map the player-to-world transition so gameplay state never assumes a cell move completed when provider coordination failed or degraded.

- [x] Trace camera rail and first-person modes.
- [x] Trace movement threshold and update cadence.
- [x] Trace cell crossing through Core World providers.
- [x] Identify gameplay-visible outcomes and missing results.
- [x] Keep gameplay unchanged.

## Current loop

```txt
wheel/pointer/WASD input
  -> scenario.tick(dt)
  -> camera render snapshot
  -> if first-person, use camera position as focus target
  -> locate target cell
  -> if cell changed or cadence+distance threshold passed
       commit focus
       update Core World cells/providers
       return true
  -> continue frame regardless of result detail
```

## Gameplay risk

```txt
player crosses cell boundary
  -> Core World focus commits
  -> provider transition fails or degrades
  -> updateWorldFocus throws or returns only Boolean
  -> scenario/camera keep advanced position
  -> visible world remains startup graph
  -> no gameplay state indicates incomplete world support
```

The movement boundary currently masks much of this risk, but expanding exploration later would make it a primary gameplay consistency problem.

## Required gameplay result consumption

```txt
committed-complete
  -> movement and world revision remain accepted

committed-degraded
  -> continue only under explicit degraded-world policy

rejected-stale / rejected-state
  -> ignore old focus command

failed and rolled back
  -> retain previous accepted world revision; camera policy may remain visual-only

failed partial
  -> pause new world-affecting movement or constrain to accepted cells
```

## Required correlation

```txt
scenario tick sequence
camera mode
camera position
focus command ID
session epoch
expected world revision
cell key
focus transaction status
accepted world revision
rendered world revision
```

## Acceptance

```txt
camera movement cannot silently imply a completed world transition
cell crossing has one immutable result
stale frame focus cannot mutate a newer session
failed focus does not poison later retries
future expanded movement consumes only accepted world/render revisions
```
