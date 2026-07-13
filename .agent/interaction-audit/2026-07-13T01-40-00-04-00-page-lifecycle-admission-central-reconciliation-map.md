# Interaction audit: page-lifecycle admission reconciliation

**Timestamp:** `2026-07-13T01-40-00-04-00`

## Summary

Browser lifecycle callbacks bypass command admission and mutate persistence and presentation directly. Input, frame production, save flush, resource retirement and capability revocation do not share one lifecycle result.

## Plan ledger

**Goal:** route every lifecycle event through one admitted command and terminal result before consumers mutate.

- [x] Map browser callbacks to current direct effects.
- [x] Map missing session, generation and duplicate checks.
- [x] Define consumer admission obligations.
- [ ] Implement adapters and rejection fixtures.

## Current map

```txt
pagehide callback
  -> no event envelope
  -> no runtime-session check
  -> no lifecycle-generation check
  -> no persisted/terminal classification
  -> direct localStorage write attempt
  -> direct gameplay disposal
  -> no participant receipts
  -> no terminal result

pageshow
  -> no handler
```

## Required map

```txt
browser event
  -> PageLifecycleCommand
  -> session/generation/duplicate admission
  -> event classification
  -> immutable Suspend, Resume or Retire plan
  -> participant execution in dependency order
  -> PageLifecycleResult
  -> consumer commit or zero-mutation rejection
  -> first resumed visible-frame acknowledgement
```

## Consumer obligations

```txt
input rejects commands while suspending or retired
frame loop cites the active lifecycle generation
save adapter returns write and optional readback receipts
render participants expose retain, validate, rebuild and dispose results
raw global capabilities are revoked after retirement
late predecessor events perform zero mutation
```

## Validation boundary

No lifecycle command or browser interaction fixture was implemented.