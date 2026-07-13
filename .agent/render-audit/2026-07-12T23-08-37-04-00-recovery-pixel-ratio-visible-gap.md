# Render audit: recovery pixel-ratio visible gap

**Timestamp:** `2026-07-12T23-08-37-04-00`

## Summary

Adaptive degradation lowers renderer DPR together with cloud/fog costs. Recovery restores cloud/fog settings but omits renderer DPR, allowing the visible frame to remain at the lowest reached drawing density while the budget level reports recovery.

## Plan ledger

**Goal:** require the visible frame to carry the exact committed quality revision.

- [x] Trace degrade mutations.
- [x] Trace recover mutations.
- [x] Compare diagnostics with actual participant state.
- [ ] Add render-generation and visible-frame receipts.

## Current asymmetry

```txt
onDegrade:
  cloud step scale
  fog step scale
  fog resolution scale
  renderer pixel ratio

onRecover:
  cloud step scale
  fog step scale
  fog resolution scale
  renderer pixel ratio: missing
```

For high quality and device DPR >= 1.5, level 2 can lower DPR to 1.14. Recovery to level 0 restores cloud/fog values but leaves DPR at 1.14.

## Missing proof

```txt
actual renderer DPR readback
quality revision
render-surface generation
participant commit receipt
first visible matching frame
backend parity fixture
```

Documentation only. No rendered output was changed or measured.