# Deploy Audit: Browser Input Replay Fixture Gate

Timestamp: `2026-07-12T06-51-27-04-00`

## Current validation surface

`npm test` covers static checks, domain/world behavior, provider order, world query and population parity, snapshot portability, cell lifecycle, lazy materialization, render layers, terrain separation, camera ground clearance, first-person FOV and eye height, foam occlusion, renderer cache, and resource disposal.

It does not execute the production browser listener path or prove normalized input semantics.

## Required Node fixtures

```txt
wheel-delta-mode-normalization.mjs
pointer-cadence-parity.mjs
keyboard-edge-hold.mjs
input-replay-parity.mjs
stale-input-generation.mjs
```

## Required browser fixtures

```txt
browser-input-focus-visibility.html
browser-pointer-capture-loss.html
browser-input-visible-frame.html
browser-input-backend-parity.html
```

## Fixture matrix

```txt
wheel units
  pixel, line, and page representations produce equivalent progress

pointer cadence
  single and segmented sample streams produce equivalent rail and look state

keyboard
  repeat does not create duplicate edges; held movement remains dt based

focus and visibility
  blur and hidden page clear or reject state exactly once

capture loss
  drag lease is revoked and later stale movement is rejected

runtime generation
  old callbacks cannot mutate replacement input state

replay
  normalized command stream reproduces camera descriptors and player position

visible frame
  first output cites input, camera, and world-focus revisions

backend parity
  WebGPU and WebGL2 publish equivalent input results
```

## Pages gate

The deployed route must prove:

```txt
active script cache key matches documented route
listener set is installed once
wheel unit normalization is active
pointer cadence parity holds
focus and capture cleanup is observable
public readback is detached
visible-frame acknowledgement is emitted
```

## Failure gate

Deployment validation fails when:

```txt
raw deltaY reaches camera progress
pointer outcome differs by equivalent event segmentation
focus or capture loss leaves held or drag state active
stale-generation input mutates current state
replay diverges
visible frame omits input and camera revisions
```

## Current status

```txt
new fixtures implemented: no
npm test run in this documentation pass: no
browser smoke run: no
Pages smoke run: no
runtime behavior changed: no
```