# Deploy audit: adaptive-quality fixture gate

**Timestamp:** `2026-07-12T23-08-37-04-00`

## Summary

Current checks do not prove degrade/recover symmetry, participant rollback, diagnostics truth or first-visible-frame correlation on WebGPU, WebGL2 or Pages.

## Plan ledger

**Goal:** block quality-recovery claims until executable browser and deployed fixtures pass.

- [x] Identify missing fixture classes.
- [x] Define backend and deployed parity requirements.
- [ ] Add fixtures to the repository check surface.
- [ ] Run them on `main` and Pages.

## Required fixtures

```txt
level 0 -> 1 degrade
level 1 -> 2 degrade
level 2 -> 1 recover
level 1 -> 0 recover
DPR readback after every transition
cloud/fog/fog-resolution readback after every transition
participant commit failure with full rollback
rollback failure reporting
resize during transition
pagehide during transition
WebGPU and WebGL2 parity
first visible frame matches transition result
source, built output and Pages parity
```

## Gate

Do not claim adaptive recovery, atomic quality transitions, rollback safety, diagnostic truth or deployed parity until all fixtures pass on `main`.

Documentation only.