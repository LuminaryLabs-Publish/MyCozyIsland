# Deploy audit: pointer gesture browser fixture gate

**Timestamp:** `2026-07-16T18-41-23-04-00`

## Plan ledger

**Goal:** block pointer-gesture correctness claims until source, built and deployed browser behavior proves owner-only look input and exact settlement.

- [x] Define required browser matrices.
- [x] Define source, artifact and Pages parity evidence.
- [x] Define frame acknowledgement evidence.
- [ ] Implement fixtures.
- [ ] Execute fixtures against source, built output and deployed Pages.

## Required fixtures

```txt
single mouse drag
single pen drag
single touch drag
secondary pointer while owner remains active
secondary pointerup while owner remains active
owner pointerup
owner pointercancel
lostpointercapture
blur during drag
document hidden during drag
route retirement during drag
canvas resize during drag
delayed stale move after settlement
owner replacement policy
FirstPointerLookFrameAck correlation
```

## Acceptance criteria

- Only the admitted owner changes yaw or pitch.
- Secondary pointers do not overwrite coordinates or terminate the owner.
- Capture loss settles exactly once.
- Stale events are rejected without emitting input deltas.
- Input, player, camera and frame revisions correlate.
- Source, artifact and Pages produce the same results.

## Current evidence

```txt
npm test: not run
single-pointer fixture: unavailable
multi-pointer fixture: unavailable
lost-capture fixture: unavailable
lifecycle retirement fixture: unavailable
FirstPointerLookFrameAck fixture: unavailable
built-output smoke: not run
Pages-origin smoke: not run
```

No deployment or production-readiness claim is made.