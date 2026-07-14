# Deploy audit: dual-surface GPU fixture gate

**Timestamp:** `2026-07-13T23-58-48-04-00`

## Summary

Current menu tests parse source and match implementation markers. They do not launch a browser, create two GPU presentation surfaces, verify the hidden game sleeps, measure entry overlap, force fallback paths or prove complete retirement in source, built output and Pages.

## Plan ledger

**Goal:** require executable evidence before claiming the WebGPU menu and hidden game handoff is bounded, recoverable and deployment-equivalent.

- [x] Inspect `package.json` test wiring.
- [x] Inspect `tests/menu-game-shell-smoke.mjs`.
- [x] Record current static coverage and missing browser evidence.
- [ ] Add browser fixtures for WebGPU and WebGL2.
- [ ] Add built-output and deployed-origin parity checks.

## Existing coverage

```txt
node --check for menu and bridge
WebGPU import markers
WebGPURenderer construction marker
RenderPipeline and bloom markers
TSL position deformation marker
StorageBufferAttribute marker
renderer.compute marker
hidden game sleep/resume markers
entry message and history markers
Pages static copy marker
```

## Missing fixture matrix

```txt
menu WebGPU backend initializes
menu WebGL2 fallback initializes
hidden game initializes independently
hidden game animation loop sleeps after ready
hidden game simulation remains frozen while waiting
Play resumes game once
first resumed game frame is observed
menu/game overlap duration remains within policy
menu compute stops at retirement
menu frame submission stops at retirement
resize after retirement is harmless
listeners and timers are retired
CozyMenu capability is revoked or replaced
WebGPU device loss during menu
WebGPU device loss during handoff
WebGL2 context loss during menu
pipeline or renderer disposal failure
pagehide during preload and entry
reduced-motion zero-delay path
source, built output and Pages return equivalent terminal results
```

## Required proof outputs

```txt
browser backend and surface generations
ready and entry attempt IDs
first resumed game frame receipt
overlap start/end timestamps
menu retirement participant receipts
post-retirement frame/compute counters
capability state
console and page errors
source/build/Pages fingerprints
```

## Gate

A deployment may be called handoff-ready only when both WebGPU and WebGL2 paths produce one terminal semantic result and no predecessor menu frame, compute callback, resize callback or raw public capability remains active afterward.

## Validation boundary

No test or workflow was executed or changed by this documentation pass. The current commit has no reported combined status checks.