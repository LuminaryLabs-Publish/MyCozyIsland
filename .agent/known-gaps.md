# Known gaps: MyCozyIsland

**Timestamp:** `2026-07-13T04-21-10-04-00`  
**Publication status:** `public-runtime-capability-publication-central-reconciled`

## Summary

The active gap is public runtime capability authority. The browser-global host exposes raw mutable simulation and presentation owners without channel policy, grant, command admission, revocation or visible-frame proof. Page lifecycle, adaptive quality, durable save, browser input and Agriculture transaction gaps remain unresolved.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable proof.

- [ ] Runtime session and lifecycle-generation authority.
- [ ] Public/debug/support channel and capability authority.
- [ ] BFCache-aware suspend/resume classification.
- [ ] Complete terminal-retirement participant registry.
- [ ] Browser input surface, focus, gesture and command ownership.
- [ ] Durable save commit and truthful lifecycle flush authority.
- [ ] Adaptive quality transition and render-generation authority.
- [ ] Agriculture recovery and cross-domain transaction proof.
- [ ] Browser, backend, build and Pages parity fixtures.

## Public capability gaps

```txt
public host identity and generation: absent
build-channel policy: absent
capability manifest and grants: absent
read-only versus mutate separation: absent
raw engine exposure: present
raw renderer/scene/camera exposure: present
raw domain API exposure: present
caller/source identity: absent
command ID/sequence/expected revision: absent
stale/duplicate/expired/revoked rejection: absent
reset confirmation and scope: absent
participant commit/rollback receipts: absent
bounded observation journal: absent
public host revocation: absent
first visible capability-effect frame acknowledgement: absent
source/build/Pages capability proof: absent
```

## Concrete consequence

```txt
external caller obtains globalThis.CozyIsland
  -> calls adventure.tick, raw engine/domain mutation or direct presentation mutation
  -> normal animation loop remains active
  -> no single-writer admission or capability result exists
  -> domain and/or visible state changes
  -> next frame renders the remaining state
  -> getState cannot prove which external operation caused the visible result
```

This is a source-derived reachable path, not a claim of production misuse.

## Retained lifecycle gaps

```txt
pagehide persisted-state classification absent
Suspend versus Retire decision absent
pageshow resume handler absent
animation-loop and listener lifecycle ownership absent
complete resource retirement absent
public-host revocation on retirement absent
first resumed visible-frame acknowledgement absent
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

## Required capability fixtures

```txt
production host policy
read-only public projection
raw-owner exclusion
capability grant, expiry and revocation
unknown/stale/duplicate/revoked command rejection
single-writer tick rejection
reset confirmation and participant result
host retirement and successor-generation reissue
visible effect correlation
source/build/Pages parity
```

## Dependency order

```txt
runtime session and lifecycle generation
  -> public host channel policy
  -> capability grants and command admission
  -> participant commit results
  -> host revocation
  -> visible-frame acknowledgement
  -> deployment proof
```

## Do not claim

Do not claim least authority, safe public diagnostics, deterministic external control, host revocation, reset safety or visible-effect provenance until the required fixtures pass on `main`.