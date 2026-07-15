# Architecture audit: embed-context route admission DSK map

**Timestamp:** `2026-07-14T20-05-56-04-00`  
**Status:** `embed-context-route-admission-authority-audited`

## Summary

The bridge decides preload ownership from a query flag or raw iframe presence before establishing shell identity, parent origin, route intent or a message-channel handshake. Context admission must precede suspension authority.

## Plan ledger

**Goal:** place route intent, window hierarchy, parent identity and transport admission ahead of Core Startup suspension and entry work.

- [x] Map current route and window classifiers.
- [x] Map shell, startup, engine, renderer and gameplay participants.
- [x] Preserve existing domain ownership.
- [x] Define the smallest coordinating authority.
- [ ] Implement or execute it.

## Current architecture

```txt
URLSearchParams + window.parent !== window
  -> embeddedPreload boolean
  -> background-preload DOM mode
  -> Core Startup polling
  -> simulation and renderer freeze
  -> unversioned parent messaging
  -> entry restore
```

## Required parent domain

```txt
cozy-island-embed-context-route-admission-authority-domain
```

## Domain boundaries

| Domain | Owns | Must not own |
|---|---|---|
| Route intent | direct, shell-preload or unsupported-embed classification | gameplay truth |
| Shell identity | parent origin, window identity, nonce and generation | Core Startup readiness |
| Message channel | schema, sequence, source/origin and replay policy | suspension decisions |
| Core Startup | game preparation, continuation and playable readiness | embed trust |
| Suspension authority | context-bound simulation/presentation lease | route classification |
| Shell | progress, Play, reveal, history and recovery controls | engine or renderer truth |
| Adventure domains | world, player, Inventory, Agriculture, Foraging and save state | shell routing |
| Renderer adapters | frame submission and readback | playable or route admission |

## Planned DSK surfaces

```txt
embed-context-manifest-kit
route-intent-parser-kit
window-hierarchy-classifier-kit
shell-origin-policy-kit
shell-nonce-kit
parent-window-identity-kit
embed-context-admission-kit
direct-play-admission-kit
shell-preload-admission-kit
unsupported-embed-policy-kit
message-channel-handshake-kit
message-schema-kit
message-sequence-kit
preload-token-kit
context-bound-suspension-kit
context-bound-entry-kit
context-failure-projection-kit
direct-route-recovery-kit
first-context-frame-ack-kit
embed-context-diagnostics-kit
embed-context-browser-fixture-kit
source-build-pages-context-parity-kit
```

## Admission transaction

```txt
EmbedContextAdmissionCommand
  -> parse route intent
  -> classify top-level or framed context
  -> resolve parent origin and shell manifest
  -> validate nonce, source, origin and document generation
  -> publish DirectPlay, ShellPreload or UnsupportedEmbed result
  -> only ShellPreload may request a suspension lease
  -> publish FirstContextAdmittedGameFrameAck
```

## Retained systems

All 14 installed adventure kits, 50 cataloged world/render/host kits, the ocean composition kit and five adapters remain unchanged.