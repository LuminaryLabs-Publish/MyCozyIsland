# Deploy Audit: Browser Input Fixture Gate

Timestamp: `2026-07-12T17-01-09-04-00`

## Summary

The existing Node smoke does not execute browser focus, pointer capture or multi-pointer behavior. Deployment readiness therefore needs a browser-level input gate before the input authority can be considered proven.

## Plan ledger

**Goal:** require the same authoritative input behavior in local browsers and deployed GitHub Pages across WebGPU and WebGL2 fallback.

- [x] Identify current proof boundary.
- [x] Define required browser fixtures.
- [x] Define backend and Pages parity requirements.
- [ ] Implement the fixtures.
- [ ] Add them to CI and deployment gating.

## Required local browser fixtures

```txt
canvas focus acquisition and loss
unfocused keyboard rejection
editable-control keyboard exclusion
primary mouse-button admission
secondary-button rejection
single-pointer look gesture
second-pointer isolation
mismatched pointerup isolation
lostpointercapture cleanup
pointercancel cleanup
wheel focus admission
blur clear generation fence
visibility clear generation fence
duplicate command rejection
stale generation rejection
input-to-player receipt
input-to-camera receipt
first visible input-frame acknowledgement
```

## Backend matrix

```txt
Chromium WebGPU
Chromium forced WebGL2 fallback
mobile/touch pointer path
keyboard/mouse pointer path
```

## Deployment gate

A Pages smoke must load the published route, acquire canvas focus, execute one admitted movement/look sequence, verify one rejected unfocused sequence and confirm that the visible frame cites the accepted input generation.

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

## Conclusion

Static source checks and Node domain smoke are insufficient for DOM input ownership. Deployment proof remains open.