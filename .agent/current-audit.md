# Current audit: MyCozyIsland accessible HUD, progress and interaction projection

**Timestamp:** `2026-07-15T19-58-42-04-00`  
**Status:** `accessible-hud-progress-interaction-projection-authority-audited`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit documentation head:** `dc3ef1a0c638fcef11123e4819af53f71f8aeb5e`

## Summary

MyCozyIsland was selected after a fresh Publish inventory comparison found no new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repository. Its accepted startup and gameplay state is visually rich, but the semantic projection is incomplete and not revision-bound.

## Plan ledger

**Goal:** make startup, objective, resource, stamina, seed, interaction, save and focus state readable as stable semantic results.

- [x] Confirm selection and synchronization.
- [x] Inspect the menu, game document, startup host, HUD updater and focus handoff.
- [x] Identify the semantic projection boundary.
- [x] Preserve all kits and services.
- [x] Define 21 coordinating surfaces.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/MyCozyIsland
selection rule: oldest synchronized central timestamp
prior timestamp: 2026-07-15T15-01-22-04-00
next oldest: LuminaryLabs-Publish/IntoTheMeadow at 2026-07-15T15-41-21-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Source-backed finding

`menu.html` gives the Play button `aria-live="polite"` while it is disabled and uses the button text as a 1–99 percent preload readout. `src/menu.js` rewrites that text for progress, readiness, entry and failure, so one control owns both status and action semantics.

`game.html` exposes the loader as a live region but marks its visual track `aria-hidden`; it has no `role="progressbar"` or `aria-valuenow`. Stamina is a nested visual span, seed slots are class-selected `div` elements, the interaction prompt is not a live/status region, and changing resource/save values have no explicit semantic update contract.

`src/main-adventure.js` calls `updateHud(frame)` on every animation frame and unconditionally rewrites objective, prompt, resource counts, stamina width, save copy and seed-slot classes. There is no semantic snapshot ID, meaningful-change filter, announcement priority, duplicate suppression, accessible result or frame acknowledgement.

The menu-to-game path does attempt focus handoff into the iframe canvas, but there is no typed focus-admission result proving the active document, hidden-state removal and accepted gameplay frame agree.

## Interaction loop

```txt
preload
  -> progress message
  -> disabled live Play button text mutation
  -> ready message
  -> same element becomes enabled action

entry
  -> Play request
  -> iframe aria-hidden removal
  -> delayed iframe/canvas focus
  -> no focus result or semantic entry acknowledgement

gameplay
  -> accepted engine frame
  -> visual WebGPU/WebGL2 frame
  -> RAF-wide DOM rewrite
  -> no revision-bound semantic snapshot
  -> no meaningful-transition announcement result
```

## Domains and census

```txt
menu progress and action-gate semantics
same-origin iframe visibility and focus adoption
Core Startup and playable-entry projection
objective, inventory, stamina, seed and save status
interaction target/prompt/result projection
gameplay canvas alternative and focus state
semantic change filtering and announcement arbitration
accessible-frame acknowledgement
WebGPU/WebGL2 and DOM visible-frame convergence
validation, build and Pages
```

```txt
implemented surfaces: 70
planned accessibility surfaces: 21
```

## Required authority

```txt
cozy-island-accessible-hud-progress-focus-authority-domain
```

```txt
AccessibleProjectionCommand
  -> bind document, route, startup, frame, HUD, interaction and focus revisions
  -> resolve one immutable semantic snapshot
  -> separate progress status from the Play action
  -> expose determinate startup and stamina progress
  -> expose seed selection and resource values
  -> announce authored objective, interaction, save and terminal transitions once
  -> reject duplicate RAF-only rewrites
  -> adopt focus only after the game document and frame are accepted
  -> publish AccessibleProjectionResult
  -> publish FirstAccessibleMenuFrameAck
  -> publish FirstAccessibleGameplayFrameAck
```

## Existing proof boundary

Current Node tests verify shell structure, visual menu composition, preload messages and domain behavior. They do not inspect the accessibility tree, run a screen reader, validate progressbar values, measure announcement duplication, verify semantic seed/stamina state or prove focus after iframe entry.
