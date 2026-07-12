# Known Gaps: MyCozyIsland

Last updated: `2026-07-12T06-51-27-04-00`

## Summary

Browser wheel, pointer, and keyboard callbacks currently mutate camera state directly. The runtime has no normalized command envelope, command sequence, frame queue, focus and visibility policy, deterministic replay, or visible-frame receipt.

## Identity and ordering

```txt
input session ID: absent
runtime generation: absent
command ID: absent
command sequence: absent
target frame ID: absent
device descriptor: absent
input state revision: absent
camera revision from input: absent
```

## Wheel

```txt
raw deltaY consumed: yes
deltaMode consumed: no
pixel, line, and page normalization: absent
device scaling policy: absent
rail progress result: absent
wheel parity fixture: absent
```

## Pointer

```txt
pointer capture requested: yes
capture lease identity: absent
lost-pointer-capture handling: absent
sample coalescing: absent
per-frame pointer reduction: absent
per-event rail clamp: present
equivalent cadence parity: not guaranteed
drag clear on blur: absent
```

## Keyboard

```txt
ambient pressed Set: present
edge versus hold model: absent
repeat classification: absent
focus target policy: absent
visibility clear policy: absent
clear command and result: absent
runtime-generation fence: absent
```

## Admission and lifecycle

```txt
camera-mode policy: implicit
focus admission: partial
visibility admission: absent
pagehide input retirement: absent
stale callback rejection: absent
listener lease registry: absent
bounded input journal: absent
```

## Frame and observation

```txt
immutable InputFrame: absent
frame-start reduction: absent
input command result: absent
input-to-camera fingerprint: absent
input-to-world-focus correlation: absent
public input read model: absent
input replay: absent
first visible input-frame acknowledgement: absent
```

## Test gaps

```txt
wheel unit normalization fixture: absent
pointer cadence parity fixture: absent
keyboard edge and hold fixture: absent
blur and visibility fixture: absent
pointer-capture-loss fixture: absent
stale runtime-generation fixture: absent
input replay parity fixture: absent
WebGPU and WebGL2 input parity fixture: absent
visible input-frame smoke: absent
```

## Related retained gaps

```txt
browser startup transaction and rollback
runtime session ownership and callback leases
legacy and Core world lifecycle parity
render graph and physical resource binding
foam proxy topology and lifecycle
Core World reset and reprepare
focus transaction authority
materialization readiness
renderer cell commit and disposal
camera rail baseline fidelity
dynamic environment frame coherence
adaptive quality transaction and recovery
```

## Risk ranking

```txt
P0 wheel gestures can produce different rail progress because deltaMode is ignored
P1 equivalent pointer motion can produce different rail geometry because clamping is per event
P1 browser callbacks mutate camera state outside frame admission
P1 drag state is not explicitly cleared by blur or capture loss
P1 prior-generation callbacks have no rejection fence
P1 no replay or frame receipt proves which input produced the visible camera
P2 keyboard edge and hold semantics are implicit
```

## Non-goals

```txt
no input implementation changed
no camera behavior changed
no render behavior changed
no tests or package scripts changed
no dependencies changed
no deployment configuration changed
no runtime correctness claim made
```