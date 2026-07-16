# Render audit: semantic and visible frame convergence gap

**Timestamp:** `2026-07-15T19-58-42-04-00`

## Summary

The visible frame and DOM HUD are updated together inside the RAF callback, but no semantic revision proves that assistive state describes the same accepted engine frame.

## Plan ledger

**Goal:** bind semantic projection to the accepted visual frame without announcing visual-only animation.

- [x] Trace render snapshot to `updateHud`.
- [x] Confirm HUD mutation occurs before post-pipeline render each callback.
- [x] Confirm no semantic snapshot ID or accessible-frame acknowledgement.
- [ ] Add convergence receipts and browser fixtures.

## Current path

```txt
adventure.tick(dt)
  -> frame snapshot
  -> camera/light/world/gameplay updates
  -> updateHud(frame)
  -> postPipeline.render()
```

`updateHud` unconditionally writes objective, prompt, resources, stamina width, save copy and hotbar state. There is no distinction between a new semantic state and another visual animation frame.

## Required result

```txt
AccessibleProjectionResult
  sourceFrameRevision
  semanticRevision
  changedFields
  announcementIds
  focusResult
  domCommitRevision

FirstAccessibleGameplayFrameAck
  sourceFrameRevision
  semanticRevision
  visibleFrameId
  accessibilityTreeReceipt
```

## Evidence gap

No fixture currently proves that the accessibility tree, visible HUD and rendered gameplay frame describe the same objective, selected seed, stamina, interaction target or save state.
