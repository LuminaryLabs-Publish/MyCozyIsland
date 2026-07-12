# Validation: MyCozyIsland

Last updated: `2026-07-12T06-51-27-04-00`

## Documentation pass result

```txt
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest eligible synchronized central entry
runtime source changed by this pass: no
input behavior changed by this pass: no
camera behavior changed by this pass: no
render output changed by this pass: no
package scripts changed by this pass: no
dependencies changed by this pass: no
deployment changed by this pass: no
branch created: no
pull request created: no
repo-local documentation pushed to main: yes
```

## Plan ledger

**Goal:** distinguish source-backed browser-input defects from executable proof and define the exact unit, cadence, focus, capture, replay, and visible-output gate.

- [x] Inspect the active route and browser listener installation.
- [x] Inspect wheel progress, pointer drag, key holds, blur clear, camera mode, scenario tick, world focus, render projection, and public readback.
- [x] Inspect current camera and package test coverage.
- [x] Confirm `deltaMode` is not consumed.
- [x] Confirm pointer orbit clamping occurs per browser event.
- [x] Confirm no frame-scoped input command or result exists.
- [x] Document normalization, admission, queue, result, replay, and frame-proof fixtures.
- [x] Change documentation only.
- [ ] Implement and run the new executable fixtures.

## Source-backed checks

```txt
wheel listener on canvas: yes
wheel default prevented: yes
raw deltaY forwarded: yes
deltaMode forwarded: no
pointer capture requested: yes
lostpointercapture listener: no
pointer samples coalesced per frame: no
rail orbit clamp applied per pointer event: yes
keyboard held state uses Set: yes
keydown repeat classified: no
blur clears held keys: yes
blur clears host drag record: no
visibilitychange input policy: no
input command ID: no
input state revision: no
input replay: no
visible input-frame acknowledgement: no
```

## Existing test surface

```txt
npm test chain: present
camera rail ground-clearance test: present
camera first-person contract test: present
wheel delta-mode normalization test: absent
pointer cadence parity test: absent
focus and capture lifecycle test: absent
input replay test: absent
browser visible-frame input smoke: absent
```

## Existing tests do not prove

```txt
pixel, line, and page wheel equivalence
single-event and segmented pointer equivalence
keyboard edge and hold semantics
blur and hidden-page state retirement
pointer-capture-loss behavior
stale prior-generation event rejection
input replay parity
input, camera, world-focus, and visible-frame correlation
```

## Required fixture matrix

```txt
1. wheel unit normalization
   equivalent pixel, line, and page samples commit equivalent rail progress

2. pointer cadence parity
   one large delta and equivalent segmented deltas commit the same camera result

3. keyboard edge and hold
   repeat does not create duplicate edges and held movement remains dt based

4. focus and visibility
   blur and hidden-page transitions clear or reject held and drag state

5. pointer capture loss
   capture loss produces one clear result and no later stale drag mutation

6. runtime replacement
   commands from a prior generation are rejected

7. replay
   recorded input commands reproduce camera descriptors and player positions

8. mode policy
   rail, transition, and first-person modes admit only their declared commands

9. backend parity
   WebGPU and WebGL2 expose equivalent command and result semantics

10. visible frame
    first rendered frame cites committed input, camera, and world-focus revisions

11. deployed route
    Pages reproduces wheel, pointer, focus, replay, and frame-proof behavior
```

## Commands not run

```txt
npm test
wheel unit normalization fixture
pointer cadence parity fixture
keyboard edge and hold fixture
focus and visibility fixture
pointer capture loss fixture
stale generation fixture
input replay fixture
WebGPU browser smoke
WebGL2 browser smoke
Pages input smoke
```

## Acceptance gate

```txt
wheel input is unit normalized
pointer outcome is independent of event segmentation
browser callbacks do not mutate canonical camera state outside frame admission
focus, visibility, capture, and runtime generation gate input
keyboard edge and hold semantics are explicit
input results and revisions are detached and observable
replay reproduces camera and player state
first visible frame carries input, camera, and world-focus revisions
```