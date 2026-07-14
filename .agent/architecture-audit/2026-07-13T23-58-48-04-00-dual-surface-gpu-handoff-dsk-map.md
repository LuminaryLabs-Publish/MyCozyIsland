# Architecture audit: dual-surface GPU handoff DSK map

**Timestamp:** `2026-07-13T23-58-48-04-00`  
**Status:** `dual-surface-gpu-handoff-retirement-authority-audited`

## Summary

The menu and game are separate WebGPU-first presentation hosts connected by a same-origin preload protocol. Core Startup owns game readiness, but no domain owns the GPU lease transition from active menu plus sleeping game to active game plus retired menu.

## Plan ledger

**Goal:** define a narrow coordinating domain without moving renderer, startup, protocol or gameplay implementation into one monolith.

- [x] Keep Core Startup as factual game-readiness authority.
- [x] Keep the cross-window protocol as message-admission authority.
- [x] Keep each renderer as owner of its local frame submission and resources.
- [x] Add one composition authority for leases, overlap, retirement and terminal results.
- [ ] Implement the authority and typed participant receipts.

## Current domain graph

```txt
menu route shell
  -> cozy-menu-scene-adapter
     -> Three.js WebGPURenderer
     -> TSL materials
     -> wind storage/compute
     -> RenderPipeline/bloom
     -> menu animation loop
  -> cozy-menu-game-shell-adapter
     -> hidden iframe
     -> progress/ready/entry messages
     -> reveal/history/focus

hidden game route
  -> cozy-startup-host
     -> core-startup-kit
  -> cozy adventure composition
     -> 14 installed core/adventure kits
     -> 50 cataloged world/render kits
     -> cozy-ocean-composition-kit
  -> game WebGPURenderer/post pipeline
  -> cozy-game-preload-bridge-adapter
     -> simulation freeze/resume
     -> presentation sleep/resume
```

## Missing parent domain

```txt
cozy-island-dual-surface-gpu-handoff-retirement-authority-domain
```

It coordinates, but does not replace:

```txt
Core Startup readiness
cross-window protocol admission
menu renderer resource ownership
game renderer resource ownership
browser route/history/focus ownership
page lifecycle ownership
```

## Required services

```txt
allocatePresentationSurfaceGeneration()
registerPresentationLease()
registerResourceManifest()
markGamePresentationSleeping()
prepareGamePresentationResume()
acknowledgeFirstResumedGameFrame()
beginBoundedOverlap()
stopMenuCompute()
stopMenuFrames()
retireMenuResources()
revokeMenuCapability()
commitPresentationHandoff()
readPresentationHandoffState()
snapshot()
reset()
```

## Required command and results

```txt
PresentationHandoffCommand
GamePresentationResumePrepared
FirstResumedGameFrameAck
MenuComputeStopResult
MenuFrameStopResult
MenuResourceRetirementResult
PublicCapabilityRevocationResult
PresentationHandoffResult
```

Terminal classifications:

```txt
Entered
Degraded
Failed
TimedOut
Cancelled
Stale
Superseded
PartiallyRetired
Retired
```

## Participant contract

| Participant | Prepares | Commits | Rolls back or retires |
|---|---|---|---|
| protocol authority | current entry attempt | admitted entry result | rejects stale/duplicate messages |
| Core Startup | playable revision | none | preserves readiness state |
| game bridge | simulation and animation-loop resume | resumed lease | restores sleeping lease on failure |
| game renderer | frame submission evidence | first resumed frame | reports backend/device failure |
| parent shell | crossfade/history/focus candidate | visible route state | restores menu visibility on failure |
| menu renderer | stop and resource manifest | retired state | reports partial retirement |
| public capability host | replacement or revocation | bounded readback | removes disposed raw references |

## Dependency order

```txt
surface and backend generations
  -> resource manifests and leases
  -> game resume preparation
  -> first resumed frame acknowledgement
  -> bounded overlap
  -> menu compute/frame stop
  -> complete menu retirement
  -> capability revocation
  -> reveal/history/focus settlement
```

## Non-goals

```txt
restructuring NexusEngine
moving gameplay into the shell
replacing Three.js resource ownership
removing the existing cross-window protocol audit
claiming WebGPU-only support
```

## Validation boundary

The source establishes the current participants and call order. No executable composition, rollback or retirement fixture exists.