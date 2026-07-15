# Interaction audit: embed-context command and result map

**Timestamp:** `2026-07-14T20-05-56-04-00`  
**Status:** `embed-context-route-admission-authority-audited`

## Summary

Current messages contain only a `type` and optional payload. Source checks exist, but route intent, parent origin, shell generation, nonce, sequence and expected suspension revision are absent.

## Plan ledger

**Goal:** define one typed interaction protocol from context admission through ready, enter, failure and first visible frame.

- [x] Map current messages.
- [x] Identify missing identities and results.
- [x] Define direct, shell and unsupported outcomes.
- [ ] Implement handshake, replay policy and fixtures.

## Current messages

```txt
child -> parent: cozy-game-progress
child -> parent: cozy-game-ready
parent -> child: cozy-game-enter
child -> parent: cozy-game-entered
child -> parent: cozy-game-failed
```

## Required envelope

```txt
schemaVersion
shellGeneration
embedContextId
messageId
sequence
sourceOrigin
routeIntent
preloadToken
startupRevision
suspensionLeaseId
entryAttemptId
payload
```

## Required result map

```txt
EmbedContextAdmissionCommand -> EmbedContextAdmissionResult
ShellHandshakeCommand -> ShellHandshakeResult
PreloadSuspensionCommand -> PreloadSuspensionResult
GameEntryCommand -> GameEntryResult
DirectPlayCommand -> DirectPlayResult
UnsupportedEmbedCommand -> UnsupportedEmbedResult
FrameSubmission -> FirstContextAdmittedGameFrameAck
```

## Rejection cases

```txt
top-level preload without parent shell
iframe without shell manifest
wrong origin
wrong source window
missing or reused nonce
stale shell generation
duplicate message ID
out-of-order sequence
entry without accepted suspension lease
superseded context or document generation
```