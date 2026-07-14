# Interaction audit: menu frame admission result map

**Timestamp:** `2026-07-14T09-39-44-04-00`

## Plan ledger

**Goal:** replace implicit menu readiness with typed visual-admission and retirement results.

- [x] Map current function calls and implicit state.
- [x] Define required commands and terminal results.
- [ ] Implement and execute them.

## Current implicit map

```txt
main()
  -> renderer.init()
  -> create atlases and scene
  -> create RenderPipeline
  -> setAnimationLoop(render)
  -> publish CozyMenu
  -> schedule startPreload()

render()
  -> optional compute dispatch
  -> pipeline render
  -> no frame ID or result

revealGame()
  -> timer
  -> stop loop
  -> dispose pipeline and renderer
  -> no participant receipts
```

## Required commands

```txt
PrepareMenuPostcardCommand
SubmitMenuPostcardFrameCommand
RetireMenuPostcardCommand
```

## Required result families

```txt
MenuPostcardPreparationResult
  Prepared | Degraded | Failed | TimedOut | Stale | Superseded

MenuPostcardFrameResult
  Admitted | Rejected | Failed | Stale

MenuPostcardRetirementResult
  Retired | PartiallyRetired | Failed | Stale
```

## Required identity

```txt
ShellGeneration
MenuPresentationAttemptId
VisualRevision
ProviderRevision
BackendId
ViewportRevision
AtlasRevision
SceneRevision
MenuFrameId
RetirementAttemptId
```

## Required participant receipts

```txt
provider admission
renderer initialization
frond atlas generation and validation
flower atlas generation and validation
scene graph preparation
compute storage preparation
pipeline preparation
frame submission
artifact capture
animation-loop stop
resize-listener removal
scene traversal disposal
texture disposal
compute-storage disposal
renderer disposal
CozyMenu revocation
```

## Admission rule

Preload independence remains owned by the shell-startup authority. A failed optional menu frame may produce a degraded shell result, but it must not masquerade as a successful menu presentation. A successful result must cite one exact frame and visual revision.