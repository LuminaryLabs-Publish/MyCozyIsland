# Architecture audit: cross-window preload and entry protocol DSK map

**Timestamp:** `2026-07-13T19-40-56-04-00`

## Summary

The parent menu and hidden game iframe currently exchange six informal message types. Transport targeting is same-origin, but semantic admission is not versioned or generation-bound. This audit defines one product protocol authority above the existing shell and preload bridge adapters.

## Plan ledger

**Goal:** separate transport, protocol admission, startup readiness, entry settlement and visible presentation into composable ownership boundaries.

- [x] Map current parent and child message producers/consumers.
- [x] Preserve Core Startup ownership of factual readiness.
- [x] Preserve the shell's ownership of Play intent, history and visibility.
- [x] Preserve the game bridge's ownership of simulation resume and player preparation.
- [x] Add one protocol parent domain rather than embedding policy in DOM handlers.
- [ ] Implement typed command/result surfaces.

## Current message graph

```txt
parent -> child: cozy-game-enter
child -> parent: cozy-game-progress
child -> parent: cozy-game-ready
child -> parent: cozy-game-entered
child -> parent: cozy-game-failed
```

## Required domain

```txt
cozy-island-cross-window-preload-entry-protocol-authority-domain
```

### Parent responsibilities

```txt
protocol version and immutable envelope contract
shell, frame, preload and entry generations
allowed origin and source-window binding
message identity, sequence and replay suppression
schema validation and payload fingerprints
progress/ready/failure admission
entry request/prepared/frame/commit correlation
timeout, cancellation, stale and retirement results
bounded protocol observations and diagnostics
```

### Child domains that remain independent

```txt
Core Startup: factual preparation, continuation and playable readiness
cozy-game-preload-bridge-adapter: descriptor observation, freeze/resume and player preparation
cozy-menu-game-shell-adapter: Play intent, iframe visibility, history and focus
menu presentation lifecycle authority: menu renderer and resource retirement
browser page lifecycle authority: pagehide, BFCache and route retirement
```

## Proposed kit surfaces

```txt
preload-protocol-version-kit
preload-protocol-envelope-kit
preload-protocol-message-id-kit
preload-protocol-sequence-kit
shell-generation-kit
iframe-generation-kit
preload-attempt-id-kit
entry-attempt-id-kit
protocol-origin-policy-kit
protocol-source-window-binding-kit
protocol-schema-validation-kit
protocol-payload-fingerprint-kit
protocol-replay-suppression-kit
preload-progress-result-kit
preload-ready-result-kit
preload-failure-result-kit
entry-request-command-kit
entry-prepared-result-kit
entry-frame-ack-kit
entry-commit-result-kit
protocol-timeout-result-kit
protocol-cancellation-kit
protocol-retirement-kit
protocol-observation-kit
protocol-reload-race-fixture-kit
protocol-bfcache-fixture-kit
protocol-timeout-fixture-kit
browser-build-pages-protocol-smoke-kit
```

## Command/result flow

```txt
OpenPreloadProtocol
  -> bind shell/frame/origin/source/version
  -> allocate PreloadAttemptId
  -> publish ProtocolOpened

Progress|Ready|Failed envelope
  -> validate envelope and source
  -> reject malformed/foreign/stale/duplicate/out-of-order
  -> publish admitted result

RequestPlayerEntry
  -> bind current ready revision
  -> allocate EntryAttemptId
  -> child prepares and resumes once
  -> child publishes EntryPrepared
  -> renderer publishes EntryFrameAck
  -> parent atomically reveals, focuses and rewrites history
  -> publish EntryCommitted
```

## Composition rule

The protocol authority does not own gameplay, renderer mechanics or generic messaging. It owns only the semantic transaction crossing the menu/game document boundary.