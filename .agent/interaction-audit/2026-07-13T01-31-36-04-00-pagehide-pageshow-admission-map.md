# Interaction audit: pagehide/pageshow admission map

**Timestamp:** `2026-07-13T01-31-36-04-00`

## Summary

Browser lifecycle events currently bypass command admission and mutate save/presentation state directly. They need explicit classification, expected-generation checks and idempotent terminal results before any simulation, input or rendering participant changes state.

## Plan ledger

**Goal:** convert raw browser events into admitted lifecycle commands with zero mutation for stale, duplicate or unsupported transitions.

- [x] Identify raw event sources.
- [x] Map current direct effects.
- [x] Define admission states and rejection rules.
- [x] Define participant receipts and first-frame proof.
- [ ] Implement event adapters and fixtures.

## Current map

```txt
pagehide
  -> no event payload inspection
  -> storeSave
  -> gameplayRenderer.dispose
  -> no result

pageshow
  -> no listener
  -> no resume command

visibilitychange hidden
  -> input.clear only
  -> no runtime/render suspension

blur
  -> input.clear only
```

## Required event adapter

```txt
BrowserPageLifecycleEnvelope {
  eventId
  type: pagehide | pageshow | visibilitychange | explicit-stop
  persisted?: boolean
  visibilityState?: string
  timestampMs
  runtimeSessionId
  observedLifecycleGeneration
}
```

## Admission matrix

```txt
Running + pagehide persisted=true   -> Suspend candidate
Running + pagehide persisted=false  -> Retire candidate
Suspended + pageshow persisted=true -> Resume candidate
Running + duplicate pagehide        -> Duplicate, zero mutation
Retired + pageshow                   -> Stale/Rejected, zero mutation
newer generation + late predecessor -> Stale, zero mutation
visibility hidden                    -> policy-driven input/frame suspension only
explicit stop                        -> Retire candidate
```

## Participant receipts

```txt
InputLifecycleReceipt
AnimationLoopLifecycleReceipt
SaveFlushReceipt
RendererParticipantReceipt[]
GlobalCapabilityRevocationReceipt
PageLifecycleResult
ResumedVisibleFrameAck
```

## Interaction guardrails

```txt
do not dispose retained participants during BFCache suspension
do not resume before held input and wall-time baseline are reset
do not retire the same participant twice
do not accept a late pageshow from an older generation
do not report Saved from capture alone
do not expose Running before the first resumed frame is ready
```

## Proof cases

```txt
single BFCache round trip
repeated back/forward round trips
duplicate pagehide delivery
late pageshow after explicit retirement
visibility hide/show without navigation
pagehide during an adaptive-quality transition
pagehide during save activity
```