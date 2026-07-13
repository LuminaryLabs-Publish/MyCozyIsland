# Known gaps: MyCozyIsland

**Timestamp:** `2026-07-13T01-31-36-04-00`

## Summary

The newest gap is browser page lifecycle truth. `pagehide` conflates retained-page suspension with terminal departure, disposes only one renderer subtree, clears gameplay presentation indexes and has no `pageshow` recovery path. Adaptive-quality, durable-save and browser-input gaps remain unresolved.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable proof.

- [ ] Runtime session and lifecycle-generation authority.
- [ ] BFCache-aware suspend/resume classification.
- [ ] Complete terminal-retirement participant registry.
- [ ] Browser input surface, focus, gesture and command ownership.
- [ ] Durable save commit and truthful lifecycle flush authority.
- [ ] Adaptive quality transition and render-generation authority.
- [ ] Agriculture recovery and cross-domain transaction proof.
- [ ] Browser, backend and Pages parity fixtures.

## Page-lifecycle gaps

```txt
page lifecycle command ID: absent
runtime session and lifecycle generation: absent
pagehide persisted-state classification: absent
Suspend versus Retire decision: absent
pageshow resume handler: absent
animation-loop pause/stop receipt: absent
wall-time baseline reset on resume: absent
input-generation close/reopen: absent
complete render participant registry: absent
participant dependency order: absent
retained participant validation: absent
reconstruction result: absent
complete resource disposal: absent
exactly-once retirement receipt: absent
stale/duplicate lifecycle-event rejection: absent
first resumed visible-frame acknowledgement: absent
BFCache and terminal-retirement fixtures: absent
```

## Concrete consequence

```txt
pagehide for retained navigation
  -> save candidate is written
  -> gameplayRenderer.dispose clears plot/forage/crop indexes
  -> page returns with no pageshow reconstruction
  -> simulation and HUD can resume
  -> gameplay world updates cannot resolve cleared indexes
  -> target marker lookup can disappear
  -> once-only pagehide listener cannot handle a later departure
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
pointer ID not enforced on move/up
primary pointer/button policy absent
lostpointercapture handling absent
permanent input generation 1
duplicate command rejection absent
consumer receipts absent
first visible input-frame acknowledgement absent
```

## Other retained gaps

- `globalThis.CozyIsland` exposes raw engine, renderer and domain capabilities without lifecycle revocation.
- Agriculture recovery and cross-domain settlement need failure fixtures.
- WebGPU/WebGL2 and deployed parity evidence remains incomplete.

## Required lifecycle fixtures

```txt
BFCache round trip after Agriculture mutation
BFCache round trip after Foraging mutation
round trip with active interaction target
repeated back/forward navigation
pagehide during save activity
pagehide during quality transition
explicit terminal stop
partial-construction failure retirement
WebGPU/WebGL2 lifecycle parity
source/build/Pages parity
first resumed matching frame
```

## Dependency order

```txt
runtime session and lifecycle generation
  -> lifecycle event admission
  -> suspend/resume/retire plan
  -> input/frame and save participants
  -> renderer participant registry
  -> retain/rebuild/dispose receipts
  -> terminal result
  -> first resumed visible-frame acknowledgement
  -> browser/backend/Pages parity
```

## Do not claim

Do not claim BFCache safety, complete cleanup, exactly-once retirement, save-flush truth, visible-state continuity or deployed parity until the required fixtures pass on `main`.