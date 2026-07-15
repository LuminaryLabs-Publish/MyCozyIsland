# Known gaps: MyCozyIsland embed-context route admission

**Timestamp:** `2026-07-14T20-05-56-04-00`  
**Status:** `embed-context-route-admission-authority-audited`

## Summary

Route intent, iframe presence and parent-shell ownership are currently collapsed into one boolean. There is no typed context result, shell handshake or guaranteed direct/unsupported behavior before simulation and rendering can be suspended.

## Plan ledger

**Goal:** separate confirmed source behavior from unproved context safety, transport trust and visible-frame guarantees.

- [ ] Route and document generation identity.
- [ ] Parent window and origin identity.
- [ ] Shell manifest, nonce and preload token.
- [ ] Direct, shell-preload and unsupported results.
- [ ] Context-bound suspension and entry.
- [ ] Browser/build/Pages fixture parity.

## Admission gaps

```txt
DocumentGeneration: absent
EmbedContextId: absent
RouteIntent: heuristic
ParentWindowIdentity: implicit
ParentOriginPolicy: absent
ShellGeneration: absent
ShellNonce: absent
PreloadToken: absent
EmbedContextAdmissionResult: absent
```

## Context behavior gaps

```txt
top-level preload rejection/recovery: absent
implicit iframe policy: absent
cross-origin embed policy: absent
direct-play result: absent
unsupported-embed result: absent
visible context failure projection: absent
```

## Protocol gaps

```txt
message schema version: absent
event.origin validation: absent
message ID and sequence: absent
nonce verification: absent
replay/duplicate policy: absent
context and shell revisions: absent
```

## Suspension and frame gaps

```txt
context-bound SuspensionLease: absent
context-bound GameEntryResult: absent
stale context rejection: absent
first direct-play frame acknowledgement: absent
first shell-resumed frame acknowledgement: absent
first unsupported/recovery frame acknowledgement: absent
FirstContextAdmittedGameFrameAck: absent
```

## Validation gaps

```txt
top-level preload browser fixture: absent
same-origin arbitrary iframe fixture: absent
cross-origin iframe fixture: absent
missing/wrong shell fixture: absent
nonce and replay fixture: absent
direct-play frame artifact: absent
unsupported recovery artifact: absent
built-output parity: absent
Pages parity: absent
```

## Retained gaps

```txt
preload suspension lease and resumed-frame authority
postcard atlas cell and backend parity
menu startup failure fallback
complete menu resource/listener retirement
pagehide and BFCache policy
adaptive quality transitions
portable save durability
browser input authority
bounded public capabilities
```

## Dependency order

```txt
route/window classification
  -> shell identity and origin handshake
  -> EmbedContextAdmissionResult
  -> context-bound suspension/entry
  -> first admitted frame
  -> source/build/Pages parity
```

No context safety or production-readiness claim is made.