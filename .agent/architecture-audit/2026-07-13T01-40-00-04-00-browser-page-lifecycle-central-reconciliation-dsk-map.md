# Architecture audit: browser page-lifecycle central reconciliation

**Timestamp:** `2026-07-13T01-40-00-04-00`

## Summary

The page host directly owns lifecycle side effects that cross runtime, input, persistence and presentation boundaries. The missing parent domain is `cozy-island-browser-page-lifecycle-authority-domain`.

## Plan ledger

**Goal:** make suspend, resume and retire one generation-fenced transaction with complete participant receipts.

- [x] Map browser event adapters and current direct effects.
- [x] Map lifecycle participants and dependency order.
- [x] Separate suspension from destructive retirement.
- [x] Define typed results and visible-frame proof.
- [ ] Implement the authority and fixtures.

## Current ownership

```txt
main-adventure host
  owns pagehide callback
  owns save write adapter
  owns animation loop
  owns canvas/window listeners
  owns renderer and presentation participants
  exposes raw global capabilities

pagehide
  directly saves
  directly disposes one participant
  publishes no lifecycle command or result
```

## Required parent domain

```txt
cozy-island-browser-page-lifecycle-authority-domain
```

## Required bounded subdomains

```txt
lifecycle identity and event admission
BFCache persistence classification
suspend planning and commit
resume planning, timing reset and reconstruction
terminal retirement and dependency ordering
input/frame lifecycle ownership
save-flush and readback receipts
renderer participant registration and disposal
stale/duplicate lifecycle-event rejection
lifecycle observation and journaling
resumed visible-frame acknowledgement
browser/backend/Pages fixture proof
```

## Required transaction

```txt
PageLifecycleCommand
  -> validate runtime session and expected generation
  -> classify event and transition
  -> construct immutable participant plan
  -> execute Suspend, Resume or Retire
  -> collect mandatory participant receipts
  -> preserve predecessor on failed candidate transition where possible
  -> publish terminal PageLifecycleResult
  -> acknowledge first resumed frame when applicable
```

## Required invariants

```txt
persisted pagehide never performs destructive disposal
resume resets wall-time and input generations
retirement stops frame production before resource disposal
listeners detach exactly once
mandatory save failure remains visible in the terminal result
resources retire in dependency order and exactly once
stale or duplicate lifecycle events perform zero mutation
Retired is impossible while mandatory participants remain owned
first resumed frame cites the successor lifecycle generation
```

## Candidate kits

```txt
page-lifecycle-command-id-kit
page-lifecycle-generation-kit
page-lifecycle-event-classifier-kit
bfcache-persistence-classifier-kit
page-lifecycle-state-machine-kit
page-suspend-plan-kit
page-resume-plan-kit
page-retirement-plan-kit
animation-loop-lifecycle-participant-kit
input-lifecycle-participant-kit
save-flush-lifecycle-participant-kit
renderer-lifecycle-participant-registry-kit
gameplay-renderer-lifecycle-participant-kit
world-renderer-lifecycle-participant-kit
atmosphere-resource-lifecycle-participant-kit
ocean-resource-lifecycle-participant-kit
foam-resource-lifecycle-participant-kit
post-pipeline-lifecycle-participant-kit
sky-texture-lifecycle-participant-kit
lifecycle-drain-barrier-kit
resource-disposal-receipt-kit
stale-lifecycle-event-rejection-kit
page-lifecycle-result-kit
page-lifecycle-observation-kit
page-lifecycle-journal-kit
first-resumed-frame-ack-kit
```

## Validation boundary

Architecture documentation only. No lifecycle implementation or executable proof changed.