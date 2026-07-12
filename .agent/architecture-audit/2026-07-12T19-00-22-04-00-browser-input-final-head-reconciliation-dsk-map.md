# Architecture audit: browser-input final-head reconciliation DSK map

**Timestamp:** `2026-07-12T19-00-22-04-00`

## Summary

The browser host currently converts DOM events directly into commands for `cozy-input-domain-kit` without one authoritative surface, focus, gesture, command-generation or duplicate-admission boundary. The input DSK should remain renderer-neutral; browser ownership belongs in a host-facing parent authority.

## Plan ledger

**Goal:** define the exact DSK boundary between browser evidence and normalized input frames while preserving Agriculture, Inventory, player, interaction, camera and renderer ownership.

- [x] Preserve all existing gameplay and render domains.
- [x] Keep DOM event semantics outside `cozy-input-domain-kit`.
- [x] Define input session, surface, focus, gesture and command identities.
- [x] Define stale, duplicate and mismatched evidence rejection.
- [x] Define consumer and visible-frame receipts.
- [ ] Implement and prove the authority.

## Parent domain

```txt
cozy-island-browser-input-ownership-authority-domain
```

## Ownership map

```txt
browser-input authority
  -> DOM surface identity
  -> focus generation
  -> primary pointer/button policy
  -> pointer gesture and capture lifecycle
  -> browser sample IDs
  -> command IDs and input generations
  -> typed admission/rejection results

cozy-input-domain-kit
  -> renderer-neutral command queue
  -> held action state
  -> one-shot action state
  -> normalized InputFrame

player domain
  -> movement, look, grounding and stamina consumption

interaction domain
  -> seed selection and contextual action consumption

camera domain
  -> camera descriptor from committed player state

render snapshot / renderer
  -> visible projection only
```

## Candidate kits

```txt
input-session-id-kit
input-surface-id-kit
input-surface-revision-kit
input-focus-generation-kit
input-focus-admission-kit
pointer-gesture-id-kit
pointer-primary-policy-kit
pointer-button-policy-kit
pointer-capture-lifecycle-kit
pointer-sample-kit
keyboard-sample-kit
wheel-sample-kit
input-command-id-kit
input-command-envelope-kit
input-command-deduplication-kit
input-generation-fence-kit
input-clear-result-kit
input-admission-result-kit
input-rejection-reason-kit
input-consumer-receipt-kit
input-observation-journal-kit
input-visible-frame-ack-kit
keyboard-focus-fixture-kit
multi-pointer-isolation-fixture-kit
lost-pointer-capture-fixture-kit
blur-clear-fence-fixture-kit
duplicate-command-fixture-kit
browser-input-smoke-kit
pages-input-smoke-kit
```

## Required transaction

```txt
DOM event
  -> current surface/focus admission
  -> pointer/button/gesture admission when applicable
  -> sample identity
  -> command identity and current input generation
  -> duplicate/stale/mismatch rejection
  -> typed admission result
  -> normalized InputFrame commit
  -> player/interaction/camera receipts
  -> renderer-neutral frame
  -> first visible input-frame acknowledgement
```

## Non-claims

This audit does not claim the parent domain, candidate kits, typed results, generation fencing, consumer receipts or visible-frame acknowledgement are implemented.