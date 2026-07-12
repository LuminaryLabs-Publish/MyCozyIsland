# START HERE: MyCozyIsland Browser Input Ownership and Gesture Admission

Last updated: `2026-07-12T17-01-09-04-00`

## Summary

MyCozyIsland is a NexusEngine-composed island adventure with official Agriculture, Inventory, wild Foraging, deterministic world generation, first-person movement, portable saves and WebGPU/WebGL2 presentation.

The current audit isolates browser input ownership. Keyboard listeners are attached to `window` and admit gameplay commands regardless of canvas focus. Pointer drag state records one pointer ID, but move and release handlers do not require that ID, primary-pointer status or a primary button. The input DSK also uses a permanent generation value of `1`, has no gesture/focus epoch, does not reject duplicate command IDs and allows commands queued after a blur/visibility clear to reactivate input in the same frame.

The prior Agriculture recovery, host-save persistence and adaptive-quality audits remain valid upstream dependencies.

## Plan ledger

**Goal:** make every gameplay input command prove current canvas ownership, focus, pointer gesture, command identity and input generation before it can affect player, interaction, camera or the visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` as the oldest eligible central entry.
- [x] Inspect browser keyboard, pointer, wheel, focus, blur and visibility handlers.
- [x] Inspect `cozy-input-domain-kit` queue normalization and frame admission.
- [x] Trace admitted input into player movement, camera and contextual interaction.
- [x] Preserve the complete 64-surface kit and service census.
- [x] Add timestamped architecture, render, gameplay, interaction, input and deployment audits.
- [x] Refresh all required root `.agent` documents and the machine registry.
- [x] Push `LuminaryLabs-Publish/MyCozyIsland` only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime input authority and executable browser fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

MyCozyIsland       2026-07-12T14-59-01-04-00 selected
TheUnmappedHouse   2026-07-12T15-08-07-04-00
AetherVale         2026-07-12T15-18-50-04-00
TheOpenAbove       2026-07-12T15-31-24-04-00
IntoTheMeadow      2026-07-12T15-49-09-04-00
PhantomCommand     2026-07-12T16-00-03-04-00
PrehistoricRush    2026-07-12T16-20-55-04-00
HorrorCorridor     2026-07-12T16-39-35-04-00
ZombieOrchard      2026-07-12T16-51-47-04-00
TheCavalryOfRome   excluded
```

## Active route

```txt
index.html
  -> src/main-adventure.js browser adapters
  -> src/adventure/composition-runtime.js
  -> cozy-input-domain-kit
  -> player / interaction / camera consumers
  -> renderer-neutral frame
  -> Three.js WebGPU/WebGL2 presentation
```

## Read order

1. `trackers/2026-07-12T17-01-09-04-00/project-breakdown.md`
2. `turn-ledger/2026-07-12T17-01-09-04-00.md`
3. `architecture-audit/2026-07-12T17-01-09-04-00-browser-input-ownership-authority-dsk-map.md`
4. `input-system-audit/2026-07-12T17-01-09-04-00-focus-pointer-command-generation-contract.md`
5. `interaction-audit/2026-07-12T17-01-09-04-00-browser-event-input-command-result-map.md`
6. `gameplay-audit/2026-07-12T17-01-09-04-00-global-input-player-interaction-loop.md`
7. `render-audit/2026-07-12T17-01-09-04-00-input-camera-visible-frame-provenance-gap.md`
8. `deploy-audit/2026-07-12T17-01-09-04-00-browser-input-fixture-gate.md`
9. `current-audit.md`
10. `known-gaps.md`
11. `next-steps.md`
12. `validation.md`

## Interaction loop

```txt
browser event
  -> global key listener or canvas pointer/wheel listener
  -> enqueue command with permanent generation 1
  -> input phase sorts by sequence and admits every generation-1 command
  -> held keys and one-shot actions become one InputFrame
  -> player consumes movement/look/intro input
  -> interaction consumes seed/action input
  -> camera derives from player state
  -> render snapshot and visible frame

focus loss
  -> enqueue clear command
  -> later same-frame commands can still be admitted
  -> no focus generation fences the successor commands
```

## Main findings

```txt
keyboard ownership
  window listeners accept gameplay keys when the canvas is not focused
  preventDefault can affect unrelated future controls

pointer ownership
  pointerdown accepts any button and pointer
  pointermove does not match drag.pointerId
  pointerup from any pointer clears the active drag
  lostpointercapture has no recovery handler

command admission
  generation is always 1
  duplicate command IDs are not rejected
  rejectedCommands is never advanced
  clear does not close the queue generation

proof
  no focus, gesture, command-result or visible-frame acknowledgement
  Node smoke does not dispatch real browser input
```

## Kit census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits:     50
additional runtime composition kit:    1
source-backed kit surfaces:            64
active route kit surfaces:             62
retained inactive catalog entries:      2
ordered Core World providers:           9
```

## Required authority

```txt
cozy-island-browser-input-ownership-authority-domain
```

It must own input-session and surface identity, focus generations, primary pointer/button policy, gesture and pointer-capture lifecycle, command IDs and duplicate rejection, clear/fence generations, typed admission results, consumer receipts, stale-command rejection and first-visible-input-frame acknowledgement.

## Ownership boundary

```txt
browser input authority -> DOM event ownership and command admission
cozy-input-domain-kit   -> normalized renderer-neutral input frames
player                  -> movement, view and stamina
interaction             -> seed and contextual actions
camera                  -> projection from committed player state
renderer                -> visible-frame projection only
```

## Next safe ledge

Implement the browser authority as an adapter in front of `cozy-input-domain-kit`. Keep DOM event details out of Agriculture, Inventory, player and rendering domains.