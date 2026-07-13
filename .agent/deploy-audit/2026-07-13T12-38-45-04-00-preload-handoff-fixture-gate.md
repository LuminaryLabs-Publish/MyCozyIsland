# Deploy audit: preload handoff fixture gate

**Timestamp:** `2026-07-13T12-38-45-04-00`

## Summary

The current static smoke proves source markers and syntax. It does not execute the two documents, count scheduler chains, verify quiescence, force cross-window races, or inspect a visible post-resume frame.

## Plan ledger

**Goal:** require equivalent terminal preload and entry results in source hosting, built output, and GitHub Pages.

- [x] Inspect current menu/game shell smoke and package wiring.
- [x] Inspect Pages HTML copy coverage.
- [x] Define source, browser, build, and deployed fixture groups.
- [ ] Implement and run the matrix.

## Current coverage

```txt
JavaScript parse checks
root routes to menu
menu canvas, Play gate and iframe exist
game loads adventure and bridge
menu waits for ready and sends enter
bridge contains freeze/resume markers
history replacement marker exists
Pages copies HTML files
```

## Missing executable fixtures

```txt
Source/browser
  exactly one menu RAF chain after repeated visibility transitions
  exactly one game animation loop
  explicit hidden presentation policy
  zero admitted simulation ticks while quiesced
  duplicate/stale ready rejection
  rapid double Play suppression
  bridge failure and entry timeout preserve menu
  renderer failure after resume returns non-entered result
  first visible post-resume frame completes entry
  history/focus/menu retirement commit once

Lifecycle
  iframe reload creates successor generation
  pagehide retires polling and schedulers
  BFCache return does not duplicate loops
  direct game route remains independent

Build/Pages
  index, menu, game, modules and import map resolve
  same-origin messaging remains valid
  source/build/Pages produce equivalent terminal results
  CDN/provider failure reaches bounded visible failure
```

## Gate

Do not mark the handoff production-ready until all fixtures pass on `main` and the deployed Pages origin proves the same generation and visible-frame semantics.