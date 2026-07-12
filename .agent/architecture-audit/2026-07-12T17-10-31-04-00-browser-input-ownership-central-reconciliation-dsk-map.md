# Architecture Audit: Browser Input Ownership Central Reconciliation DSK Map

Timestamp: `2026-07-12T17-10-31-04-00`

## Summary

The repo already normalizes browser events through `cozy-input-domain-kit`, but browser ownership remains outside the DSK boundary. This map preserves the required parent domain and separates DOM evidence from renderer-neutral input frames.

## Plan ledger

**Goal:** define one composition boundary that admits browser evidence before gameplay input is committed.

- [x] Identify the current host, DSK, consumer and renderer boundaries.
- [x] Preserve existing kit ownership.
- [x] Define the missing parent authority.
- [x] Define candidate coordinating and fixture kits.
- [ ] Implement the authority.
- [ ] Prove browser and deployment parity.

## Current composition

```txt
browser host
  -> global keyboard listeners
  -> canvas pointer and wheel listeners
  -> blur and visibility clear requests

cozy-input-domain-kit
  -> sequence commands
  -> accept generation 1
  -> produce InputFrame

consumers
  -> cozy-player-domain-kit
  -> cozy-interaction-domain-kit
  -> cozy-camera-domain-kit
  -> cozy-render-snapshot-domain-kit
  -> Three.js presentation
```

## Required parent domain

```txt
cozy-island-browser-input-ownership-authority-domain
```

## Candidate coordinating kits

```txt
input-session-id-kit
input-surface-id-kit
input-surface-revision-kit
input-focus-generation-kit
input-focus-admission-kit
keyboard-sample-kit
pointer-sample-kit
wheel-sample-kit
pointer-gesture-id-kit
pointer-primary-policy-kit
pointer-button-policy-kit
pointer-capture-lifecycle-kit
input-command-id-kit
input-command-envelope-kit
input-command-deduplication-kit
input-generation-fence-kit
input-clear-result-kit
input-admission-result-kit
input-rejection-reason-kit
input-consumer-receipt-kit
input-observation-kit
input-journal-kit
input-visible-frame-ack-kit
```

## Candidate fixture kits

```txt
keyboard-focus-fixture-kit
editable-target-exclusion-fixture-kit
primary-button-fixture-kit
multi-pointer-isolation-fixture-kit
mismatched-pointerup-fixture-kit
lost-pointer-capture-fixture-kit
blur-clear-fence-fixture-kit
visibility-clear-fence-fixture-kit
duplicate-command-fixture-kit
stale-generation-fixture-kit
input-consumer-receipt-fixture-kit
visible-input-frame-fixture-kit
webgpu-input-smoke-kit
webgl2-input-smoke-kit
pages-input-smoke-kit
```

## Ownership rules

```txt
browser input authority
  owns DOM surface, focus, pointer and capture evidence

cozy-input-domain-kit
  owns normalized renderer-neutral input frames

player, interaction and camera
  own domain-specific consumption only

renderer
  owns projection only and must not infer input authority
```

## Required transaction

```txt
BrowserInputSample
  -> bind surface and focus generation
  -> bind pointer gesture and capture when applicable
  -> allocate command identity
  -> reject duplicates, stale generations and invalid ownership
  -> publish typed admission result
  -> commit normalized InputFrame
  -> collect consumer receipts
  -> attach provenance to renderer-neutral frame
  -> acknowledge first visible effect
```

## Non-goals

```txt
moving DOM event types into gameplay domains
moving Agriculture or Inventory under input authority
letting the renderer decide focus or gesture validity
using input authority as a generic UI framework
```

The parent domain is a browser-adapter authority in front of the existing input DSK, not a replacement for the input, player, interaction, camera or renderer domains.