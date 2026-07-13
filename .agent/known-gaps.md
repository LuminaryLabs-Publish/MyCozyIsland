# Known gaps: MyCozyIsland

**Timestamp:** `2026-07-13T01-40-00-04-00`

## Summary

The active gap is browser page-lifecycle truth. `pagehide` conflates retained suspension with terminal departure, disposes only one renderer subtree, clears gameplay presentation indexes and has no `pageshow` recovery path. Adaptive-quality, durable-save and browser-input gaps remain unresolved.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable proof.

- [ ] Runtime session and lifecycle-generation authority.
- [ ] BFCache-aware suspend/resume classification.
- [ ] Complete terminal-retirement participant registry.
- [ ] Browser input surface, focus, gesture and command ownership.
- [ ] Durable save commit and truthful lifecycle flush authority.
- [ ] Adaptive quality transition and render-generation authority.
- [ ] Agriculture recovery and cross-domain transaction proof.
- [ ] Browser, backend, build and Pages parity fixtures.

## Page-lifecycle gaps

```txt
page lifecycle command ID/session/generation: absent
pagehide persisted-state classification: absent
Suspend versus Retire decision: absent
pageshow resume handler: absent
animation-loop pause/stop receipt: absent
wall-time baseline reset on resume: absent
input-generation close/reopen: absent
complete render participant registry and dependency order: absent
retained participant validation/reconstruction result: absent
complete and exactly-once resource disposal: absent
stale/duplicate lifecycle-event rejection: absent
first resumed visible-frame acknowledgement: absent
BFCache and terminal-retirement fixtures: absent
```

## Concrete consequence

```txt
retained pagehide
  -> save candidate attempted
  -> gameplay renderer disposed
  -> plot/forage/crop maps cleared
  -> retained page returns without pageshow reconstruction
  -> simulation and HUD can resume
  -> visible Agriculture/Foraging state and target lookup can remain stale
  -> once-only pagehide listener cannot process a later departure
```

## Retained adaptive-quality gaps

```txt
quality revision and render generation absent
participant readback and atomic transition absent
DPR recovery mutation absent
rollback and stale-transition rejection absent
first visible quality-frame acknowledgement absent
```

## Retained save gaps

```txt
candidate capture is not durable commit
storage write/readback receipt absent
predecessor slot authority absent
storage error classification absent
truthful rollback result absent
pagehide save receipt absent
visible durable-save frame acknowledgement absent
```

## Retained input gaps

```txt
global keyboard ownership
editable-target exclusion absent
pointer ID and primary-button admission incomplete
lostpointercapture handling absent
permanent input generation 1
duplicate command rejection and consumer receipts absent
first visible input-frame acknowledgement absent
```

## Required lifecycle fixtures

```txt
BFCache round trip after Agriculture mutation
BFCache round trip after Foraging mutation
round trip with active interaction target
repeated back/forward navigation
pagehide during save or quality transition
explicit terminal stop
partial-construction failure retirement
WebGPU/WebGL2 lifecycle parity
source/build/Pages parity
first resumed matching frame
```

## Do not claim

Do not claim BFCache safety, complete cleanup, exactly-once retirement, save-flush truth, visible-state continuity or deployed parity until the required fixtures pass on `main`.