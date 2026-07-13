# Architecture audit: browser page-lifecycle DSK map

**Timestamp:** `2026-07-13T01-31-36-04-00`  
**Status:** `browser-page-lifecycle-suspension-retirement-authority-audited`

## Summary

MyCozyIsland has browser lifecycle effects but no domain that owns their meaning. `pagehide` directly combines persistence with one partial renderer disposal. The correct boundary is a parent lifecycle authority that distinguishes retained-page suspension from terminal retirement and coordinates runtime, input, save and rendering participants under one generation.

## Plan ledger

**Goal:** define a fiction-neutral lifecycle transaction that can suspend, resume or retire the complete browser host without partial ownership.

- [x] Identify current event sources and mutations.
- [x] Separate lifecycle classification from participant execution.
- [x] Define identities, states, results and participant contracts.
- [x] Preserve gameplay domains as lifecycle consumers rather than owners.
- [x] Define BFCache and terminal-retirement proof gates.
- [ ] Implement the DSK and participant adapters.

## Current ownership map

```txt
window/page lifecycle
  -> src/main-adventure.js owns pagehide directly
  -> storeSave owns localStorage transport directly
  -> gameplayRenderer.dispose owns only one presentation subtree
  -> no parent lifecycle state or participant registry

NexusEngine adventure
  -> continues to own simulation and domain snapshots
  -> receives no Suspend, Resume or Retire command

renderer host
  -> owns animation loop, listeners and GPU objects
  -> exposes no aggregate stop/dispose result
```

## Required parent domain

```txt
cozy-island-browser-page-lifecycle-authority-domain
```

### Owns

```txt
runtime session and lifecycle generation
page event classification
Running, Suspending, Suspended, Resuming, Retiring, Retired, Degraded and Failed states
suspend, resume and retirement plans
participant registry and dependency order
save-flush barrier
frame and input admission by lifecycle state
exactly-once retirement receipts
stale lifecycle-event rejection
bounded observations and journal
first resumed visible-frame acknowledgement
```

### Does not own

```txt
Agriculture, Foraging or Inventory meaning
save serialization schema
Three.js renderer implementation details
world content or render descriptors
browser navigation policy
```

## DSK composition

```txt
cozy-island-browser-page-lifecycle-authority-domain
├─ page-lifecycle-command-id-kit
├─ page-lifecycle-generation-kit
├─ page-lifecycle-event-classifier-kit
├─ bfcache-persistence-classifier-kit
├─ page-lifecycle-state-machine-kit
├─ page-suspend-plan-kit
├─ page-resume-plan-kit
├─ page-retirement-plan-kit
├─ animation-loop-lifecycle-participant-kit
├─ input-lifecycle-participant-kit
├─ save-flush-lifecycle-participant-kit
├─ renderer-lifecycle-participant-registry-kit
├─ gameplay-renderer-lifecycle-participant-kit
├─ world-renderer-lifecycle-participant-kit
├─ atmosphere-resource-lifecycle-participant-kit
├─ ocean-resource-lifecycle-participant-kit
├─ foam-resource-lifecycle-participant-kit
├─ post-pipeline-lifecycle-participant-kit
├─ sky-texture-lifecycle-participant-kit
├─ lifecycle-drain-barrier-kit
├─ resource-disposal-receipt-kit
├─ stale-lifecycle-event-rejection-kit
├─ page-lifecycle-result-kit
├─ page-lifecycle-observation-kit
├─ page-lifecycle-journal-kit
└─ first-resumed-frame-ack-kit
```

## Command model

```txt
PageLifecycleCommand {
  commandId
  runtimeSessionId
  expectedLifecycleGeneration
  source: pagehide | pageshow | explicit-stop | renderer-failure
  persisted?: boolean
  timestampMs
}
```

## State model

```txt
PageLifecycleState {
  runtimeSessionId
  generation
  phase
  activeFrameGeneration
  inputGeneration
  participantRevision
  lastResultId
}
```

## Required transaction

```txt
classify command
  -> validate expected lifecycle generation
  -> reject duplicate or stale event
  -> allocate successor generation

pagehide persisted=true
  -> enter Suspending
  -> clear held input
  -> pause animation/frame admission
  -> flush save with receipt
  -> retain renderer and resource participants
  -> enter Suspended

pageshow after Suspended
  -> enter Resuming
  -> validate participant continuity
  -> reset wall-time and input generations
  -> resume frame admission
  -> enter Running
  -> publish first resumed visible-frame ack

terminal pagehide or explicit stop
  -> enter Retiring
  -> stop frame production
  -> detach listeners
  -> flush and verify save
  -> dispose registered participants in dependency order
  -> collect exactly-once receipts
  -> revoke global capabilities
  -> enter Retired, Degraded or Failed
```

## Participant dependency order

```txt
1. reject new input and lifecycle-sensitive commands
2. stop animation-loop frame admission
3. flush save and wait for receipt
4. detach browser and canvas listeners
5. dispose post pipeline and depth-pass resources
6. dispose gameplay/world/atmosphere/ocean/foam scene resources
7. dispose sky and volume textures
8. dispose renderer/backend resources
9. revoke global debug/capability surface
10. publish terminal result and journal entry
```

## Typed results

```txt
PageLifecycleResult
  AcceptedSuspended
  AcceptedResumed
  AcceptedRetired
  Duplicate
  Stale
  Rejected
  Degraded
  Failed
```

Each accepted result must include predecessor/successor generations, participant receipts, save-flush result, frame/input state and any incomplete retirement work.

## Proof boundary

```txt
BFCache round trip preserves live renderer indexes
resume resets timing baseline
resume produces one matching visible frame
repeated pagehide/pageshow remains idempotent
terminal retirement stops all frame production
all registered resources retire exactly once
save flush result is truthful
WebGPU and WebGL2 have equivalent lifecycle semantics
source, served build and Pages behavior agree
```