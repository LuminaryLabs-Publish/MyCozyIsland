# Known gaps: MyCozyIsland

**Timestamp:** `2026-07-12T23-08-37-04-00`

## Summary

The newest gap is adaptive render-quality transition truth. Degrade and recover do not mutate the same participant set, and no shared revision, verification, rollback or visible-frame receipt proves the applied quality state. Durable-save and browser-input gaps remain unresolved.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable proof.

- [ ] Runtime session and run-generation authority.
- [ ] Browser input surface, focus, gesture and command ownership.
- [ ] Durable save commit and truthful restore authority.
- [ ] Adaptive quality transition and render-generation authority.
- [ ] Renderer participant readback and rollback.
- [ ] First visible quality-frame provenance.
- [ ] Agriculture recovery and cross-domain transaction proof.
- [ ] Browser, backend and Pages parity fixtures.

## Adaptive-quality gaps

```txt
transition command ID: absent
transition source classification: absent
quality revision: absent
render-surface generation: absent
participant registry: absent
participant capabilities: absent
current-value readback: incomplete
detached target plan: absent
atomic multi-participant commit: absent
verification: absent
rollback: absent
stale transition rejection: absent
DPR recovery mutation: absent
actual DPR diagnostics: absent
actual fog-resolution diagnostics: absent
terminal transition result: absent
first visible quality-frame acknowledgement: absent
```

## Concrete consequence

```txt
level 2 degrade lowers cloud/fog costs and renderer DPR
  -> sustained recovery lowers budget level to 1 and then 0
  -> cloud/fog settings recover
  -> renderer DPR remains at level-2 scale
  -> debug surface can imply recovered quality without showing actual DPR
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

- Renderer and browser listeners lack one coordinated retirement transaction.
- `globalThis.CozyIsland` exposes raw engine and domain capabilities.
- Agriculture recovery and cross-domain settlement need failure fixtures.
- WebGPU/WebGL2 and deployed parity evidence remains incomplete.

## Required quality fixtures

```txt
level 0 -> 1 degrade
level 1 -> 2 degrade
level 2 -> 1 recover
level 1 -> 0 recover
DPR and participant readback
participant failure rollback
rollback failure reporting
resize/pagehide during transition
WebGPU/WebGL2 parity
first visible matching frame
source/build/Pages parity
```

## Dependency order

```txt
runtime session and render generation
  -> quality command and expected revision
  -> detached participant plan
  -> atomic commit and verification
  -> rollback and terminal result
  -> diagnostics from actual readback
  -> visible-frame acknowledgement
  -> browser/backend/Pages parity
```

## Do not claim

Do not claim adaptive-quality recovery, atomic transitions, rollback safety, diagnostic truth, visible-frame correlation or deployed parity until the required fixtures pass on `main`.