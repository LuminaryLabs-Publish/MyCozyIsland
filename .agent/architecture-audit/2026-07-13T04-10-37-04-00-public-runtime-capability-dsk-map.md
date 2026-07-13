# Architecture audit: public runtime capability DSK map

**Timestamp:** `2026-07-13T04-10-37-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

## Summary

The browser host currently collapses diagnostics, support control, simulation ownership and presentation ownership into one public object. The correct architecture preserves each existing owner and adds a coordinating capability domain in front of any browser-global surface.

## Plan ledger

**Goal:** define a least-authority DSK boundary without moving gameplay, rendering or persistence semantics into the host adapter.

- [x] Preserve NexusEngine ownership of domain state and ticks.
- [x] Preserve domain APIs as internal service owners.
- [x] Preserve renderer ownership of Three.js resources.
- [x] Preserve save ownership of capture, validation, restore and reset.
- [x] Define one host-channel and capability authority.
- [x] Define identities, commands, results, revocation and proof.
- [ ] Implement and validate the authority.

## Current ownership

```txt
NexusEngine and 13 installed kits
  -> simulation, domain state, commands, snapshots and services

renderer/scene/camera and render participants
  -> browser presentation resources and visible frames

cozy-save-domain-kit
  -> capture, migration, restore, rollback and reset

main-adventure host
  -> browser events, animation loop, storage adapter and global publication
```

## Current architectural violation

```txt
globalThis.CozyIsland
  -> raw renderer
  -> raw scene
  -> raw camera
  -> raw adventure and engine
  -> raw domain APIs
  -> direct save capture and reset
```

The wrapper is frozen, but it transfers live ownership references rather than bounded capabilities.

## Missing parent domain

`cozy-island-public-runtime-capability-authority-domain`

## Required identities

```txt
RuntimeSessionId
RuntimeGeneration
PublicHostId
PublicHostGeneration
HostChannel
CapabilityManifestId
CapabilityGrantId
CallerSourceId
PublicCapabilityCommandId
CommandSequence
ExpectedDomainRevision
ExpectedRenderRevision
PublicCapabilityResultId
VisibleCapabilityEffectAckId
```

## Required commands

```txt
ReadPublicProjectionCommand
GrantCapabilityCommand
RevokeCapabilityCommand
InspectStateCommand
CaptureSaveCommand
InjectInputCommand
RequestResetCommand
ReadCapabilityJournalCommand
AcknowledgeCapabilityEffectCommand
```

## Required results

```txt
PublicProjectionResult
CapabilityGrantResult
CapabilityRevokeResult
PublicCapabilityAdmissionResult
PublicCapabilityResult
ParticipantChangeReceipt
ResetResult
CapabilityObservation
VisibleCapabilityEffectAck
```

## Candidate kits

| Kit | Responsibility |
|---|---|
| `public-host-id-kit` | Stable host identity |
| `public-host-generation-kit` | Reissue and stale-host fencing |
| `host-channel-policy-kit` | Production, development, test and support policy |
| `capability-manifest-kit` | Declared operations and scopes |
| `capability-grant-kit` | Grant identity, holder and scope |
| `capability-expiry-kit` | Expiry and lease handling |
| `read-only-public-projection-kit` | Immutable safe default projection |
| `public-capability-command-kit` | Typed command envelope |
| `public-capability-admission-kit` | Channel, grant and revision validation |
| `caller-source-identity-kit` | Console, test, support or host adapter source |
| `duplicate-command-rejection-kit` | Apply-once behavior |
| `stale-command-rejection-kit` | Session/generation/revision fencing |
| `revoked-capability-rejection-kit` | Zero-mutation rejection after revoke |
| `public-capability-result-kit` | Terminal accepted/rejected/failed result |
| `participant-change-receipt-kit` | Changed domains/resources/surfaces |
| `reset-confirmation-kit` | Explicit destructive-operation admission |
| `public-host-revoke-kit` | Lifecycle and restart revocation |
| `public-capability-observation-kit` | Immutable operation observation |
| `public-capability-journal-kit` | Bounded diagnostic history |
| `visible-capability-effect-ack-kit` | First matching visible frame |
| `production-host-policy-fixture-kit` | Production surface proof |
| `capability-source-build-pages-parity-fixture-kit` | Deployment parity proof |

## Required transaction

```txt
caller intent
  -> channel and host-generation admission
  -> capability-grant validation
  -> command identity and expected-revision validation
  -> detached participant plan
  -> atomic bounded commit or zero mutation
  -> terminal result and participant receipts
  -> bounded journal entry
  -> first visible effect acknowledgement
```

## Non-claims

No capability, gateway, revocation, result, journal or frame-acknowledgement kit is implemented by this documentation pass.
