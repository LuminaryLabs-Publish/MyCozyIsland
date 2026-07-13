# Known gaps: MyCozyIsland cross-window preload and entry protocol

**Timestamp:** `2026-07-13T19-40-56-04-00`  
**Publication status:** `cross-window-preload-entry-protocol-authority-audited`

## Summary

The parent menu and hidden game communicate through same-origin `postMessage`, but the protocol is unversioned and not bound to shell, iframe, preload or entry generations. Messages have no identity or sequence, entry can be acknowledged before a visible frame, and the parent can reveal after a timeout without a terminal child result.

## Plan ledger

**Goal:** keep protocol, gameplay, rendering and lifecycle gaps dependency ordered and tied to executable proof.

- [ ] Versioned immutable message envelope.
- [ ] Shell, frame, preload and entry generations.
- [ ] Inbound origin plus source-window verification.
- [ ] Closed payload schemas and fingerprints.
- [ ] Message IDs, sequence and replay suppression.
- [ ] Typed malformed/foreign/stale/duplicate/out-of-order results.
- [ ] Ready-revision-bound entry request.
- [ ] Idempotent resume and player preparation.
- [ ] Preparation failure and rollback result.
- [ ] Renderer-derived entry-frame receipt.
- [ ] First visible game-frame acknowledgement.
- [ ] Explicit timeout/degraded policy.
- [ ] Atomic reveal/history/focus commit.
- [ ] Timer/port/generation retirement on navigation and page lifecycle.
- [ ] Browser, build and Pages fixture parity.

## Protocol identity gaps

```txt
ProtocolVersion: absent
ShellGeneration: absent
FrameGeneration: absent
PreloadAttemptId: absent
EntryAttemptId: absent
MessageId: absent
MessageSequence: absent
PayloadFingerprint: absent
ReadyRevision: absent
ProtocolRetirementResult: absent
```

## Admission gaps

```txt
outbound targetOrigin: location.origin on both sides
expected source-window check: present on both sides
inbound event.origin check: absent on both sides
closed message-type registry: absent
payload schema validation: absent
size/depth limits: absent
stale generation rejection: absent
duplicate/replay rejection: absent
out-of-order rejection: absent
unknown-message observation: absent
```

The source-window check is useful, but it does not identify the producing document generation or semantic attempt. A current message cannot be distinguished from a delayed predecessor after iframe reload, shell restoration or future reuse.

## Preload gaps

```txt
protocol HELLO/negotiation: absent
progress sequence: unversioned
ready terminal result: unversioned
failure terminal result: unversioned
progress after terminal classification: absent
child timer stops at ready: no
preload cancellation: absent
reload supersession result: absent
```

The bridge interval continues after readiness until entry or failure, even though ready is already terminal for preparation.

## Entry gaps

```txt
entry request identity: absent
expected ready revision: absent
single resume receipt: absent
player snapshot before/after: absent
input-clear receipt: absent
preparation exception terminal result: absent
rollback to frozen-ready state: absent
duplicate entry result: absent
entry commit result: absent
```

`preparePlayerEntry()` catches errors, warns and allows entry acknowledgement to continue.

## Visible-frame gaps

```txt
post-resume simulation revision: absent
render snapshot revision: absent
renderer/device generation: absent
frame submission ID: absent
iframe visibility generation: absent
FirstVisibleGameFrameAck: absent
```

`cozy-game-entered` is posted immediately after resume and state preparation. It does not prove a successor frame was submitted or visible.

## Timeout and fallback gaps

```txt
entry timeout identity: absent
timeout cancellation receipt: absent
fallback policy descriptor: absent
TimedOut versus Degraded result: absent
parent/child terminal convergence: absent
```

The parent reveals after 900 ms when `entering` is still false. This is a product fallback, but it is not represented as a distinguishable terminal result.

## Lifecycle gaps

```txt
message listener registry: absent
poll interval generation: absent
entry timeout generation: absent
port retirement: absent
iframe navigation retirement: absent
pagehide cancellation result: absent
BFCache restoration policy: absent
late message count/rejection: absent
```

## Validation gaps

```txt
wrong-origin fixture: absent
wrong-source fixture: absent
malformed-payload fixture: absent
stale-generation fixture: absent
duplicate/replay fixture: absent
out-of-order fixture: absent
reload-during-preload fixture: absent
reload-during-entry fixture: absent
preparation-exception fixture: absent
timeout/degraded fixture: absent
first-visible-frame fixture: absent
pagehide/BFCache fixture: absent
built-output protocol smoke: absent
Pages protocol smoke: absent
```

## Retained architecture gaps

```txt
provider-independent hidden preload
Three.js menu first-frame and full retirement
static game-module bootstrap admission
multi-participant resource settlement
browser page lifecycle
portable save durability
browser input authority
adaptive render-quality transitions
bounded public runtime capabilities
```

## Dependency order

```txt
protocol envelope and generations
  -> message admission and sequencing
  -> preload terminal results
  -> entry attempt and preparation
  -> post-resume frame acknowledgement
  -> reveal/history/focus commit
  -> menu retirement and game-only lifecycle
  -> build/Pages parity
```

## Do not claim

Do not claim protocol integrity, stale-message rejection, duplicate suppression, atomic entry, visible-frame completion, BFCache convergence or production readiness until the relevant fixture matrices pass on `main`.