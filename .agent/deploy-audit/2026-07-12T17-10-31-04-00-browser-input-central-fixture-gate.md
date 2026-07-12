# Deploy Audit: Browser Input Central Reconciliation Fixture Gate

Timestamp: `2026-07-12T17-10-31-04-00`

## Summary

The current Node smoke does not execute browser focus, pointer capture, multiple pointers, blur, visibility, WebGPU/WebGL2 backend parity, or the published Pages route. The input authority therefore remains unproven at deployment time.

## Plan ledger

**Goal:** require executable browser evidence before the input authority can be considered production-ready.

- [x] Identify the current proof boundary.
- [x] Define local browser fixtures.
- [x] Define backend parity requirements.
- [x] Define the GitHub Pages gate.
- [ ] Implement the browser fixture harness.
- [ ] Add it to CI and deployment gating.

## Required local browser fixtures

```txt
canvas focus acquisition
unfocused keyboard rejection
editable-control keyboard exclusion
primary mouse-button admission
secondary-button rejection
single-pointer look gesture
second-pointer isolation
mismatched pointerup isolation
pointercancel cleanup
lostpointercapture cleanup
wheel focus admission
blur generation fence
visibility generation fence
pagehide generation fence
duplicate command rejection
stale generation rejection
player consumer receipt
interaction consumer receipt
camera consumer receipt
first visible input-frame acknowledgement
```

## Backend matrix

```txt
Chromium WebGPU
Chromium forced WebGL2 fallback
keyboard and mouse
mobile or touch pointer path
```

## Pages gate

The deployed route must acquire canvas focus, admit one movement and look sequence, reject one unfocused sequence, reject one mismatched pointer sequence, close one generation on blur, and prove that the first visible frame cites only the accepted successor generation.

## Current status

```txt
npm test: not run
browser fixture harness: absent
WebGPU input smoke: not run
WebGL2 input smoke: not run
mobile pointer smoke: not run
Pages input smoke: not run
workflow changed: no
```

No deployment-readiness claim is made for browser input ownership.