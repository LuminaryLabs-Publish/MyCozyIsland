# Lifecycle audit: suspend, resume and retire reconciliation contract

**Timestamp:** `2026-07-13T01-40-00-04-00`

## Summary

The host needs a lifecycle state machine that distinguishes retained suspension from terminal retirement and covers every mandatory participant.

## Plan ledger

**Goal:** define terminal lifecycle results with complete, ordered and exactly-once participant receipts.

- [x] Define lifecycle phases and transitions.
- [x] Define mandatory participant classes.
- [x] Define success, degraded and failure result boundaries.
- [x] Define stale/duplicate handling.
- [ ] Implement and prove the contract.

## Lifecycle phases

```txt
Active
Suspending
Suspended
Resuming
Active successor generation
Retiring
Retired
Degraded
Failed
```

## Mandatory participants

```txt
animation loop and wall-time baseline
input queue, held state and browser listeners
save capture, storage write and readback
world renderer
gameplay renderer
sky geometry/material/textures
air/volume textures
cloud renderer
fog renderer
ocean renderer
foam renderer
post pipeline
WebGPU/WebGL renderer and canvas ownership
debug/HUD callbacks
global capability publication
```

## Suspend contract

```txt
classify event.persisted=true
close current input/frame generation
clear held actions
pause frame production
flush save with typed receipt
retain render resources without destructive disposal
publish Suspended with participant receipts
```

## Resume contract

```txt
validate retained runtime and resources
allocate successor lifecycle/input/frame generation
reset wall-time baseline
rebuild invalid participants transactionally
resume listeners and frame production
publish Resumed
acknowledge first matching visible frame
```

## Retire contract

```txt
stop new input and frames
wait for in-flight work or classify timeout
flush and verify save
retire participants in dependency order
record exactly-once disposal receipts
revoke global capabilities
publish Retired only when mandatory ownership is closed
otherwise publish Degraded or Failed with incomplete participants
```

## Result schema

`PageLifecycleResult` must include command ID, runtime session, predecessor and successor generations, classified event, transition, participant receipts, save receipt, incomplete work, stale/duplicate reason, terminal phase and visible-frame ID when resumed.

## Validation boundary

Contract documentation only. No lifecycle participant implementation was changed.