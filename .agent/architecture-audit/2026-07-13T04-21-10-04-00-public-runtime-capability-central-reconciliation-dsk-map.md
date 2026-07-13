# Architecture audit: public runtime capability central reconciliation

**Timestamp:** `2026-07-13T04-21-10-04-00`

## Summary

The browser host currently publishes live simulation and presentation owners as one frozen top-level object. Freezing the property table does not establish least authority, immutable projections, single-writer command admission or revocation.

## Plan ledger

**Goal:** define the bounded DSK that replaces raw-owner publication and align that definition with central tracking.

- [x] Identify host publication and exposed owners.
- [x] Separate read projections from mutating commands.
- [x] Define host, grant, command, result, revocation and observation identities.
- [x] Preserve existing domain ownership instead of moving gameplay into the host.
- [x] Define visible-frame acknowledgement.
- [ ] Implement the DSK and participant adapters.

## Current architecture

```txt
browser startup
  -> construct runtime and render owners
  -> globalThis.CozyIsland = Object.freeze({ live owners and APIs })
  -> any same-realm caller can invoke exposed mutations
  -> existing domain and render services execute outside one admitted host command
```

## Required parent domain

```txt
cozy-island-public-runtime-capability-authority-domain
```

This domain owns publication policy and command admission. It does not own Agriculture, Inventory, Foraging, input, save, camera or rendering semantics.

## Required subdomains and kits

```txt
identity
  public-host-id-kit
  public-host-generation-kit
  caller-source-identity-kit

publication policy
  host-channel-policy-kit
  capability-manifest-kit
  read-only-public-projection-kit

capability lifecycle
  capability-grant-kit
  capability-expiry-kit
  public-host-revoke-kit

command admission
  public-capability-command-kit
  public-capability-admission-kit
  expected-runtime-revision-kit
  duplicate-command-rejection-kit
  stale-command-rejection-kit
  revoked-capability-rejection-kit

results and evidence
  public-capability-result-kit
  participant-change-receipt-kit
  reset-confirmation-kit
  public-capability-observation-kit
  public-capability-journal-kit
  visible-capability-effect-ack-kit

proof
  production-host-policy-fixture-kit
  capability-source-build-pages-parity-fixture-kit
```

## Required command contract

```txt
PublicCapabilityCommand {
  hostId
  hostGeneration
  channel
  grantId
  callerId
  commandId
  sequence
  expectedRuntimeRevision
  expectedDomainRevisions
  capability
  payload
}
```

## Required result contract

```txt
PublicCapabilityResult {
  commandId
  status: committed | rejected | duplicate | stale | revoked | failed
  runtimeRevisionBefore
  runtimeRevisionAfter
  participantReceipts
  rejectionReason
  observationId
  visibleFrameAckId?
}
```

## Ownership rules

```txt
production channel
  -> read-only detached projections by default

development/support channel
  -> explicit bounded grants only

raw renderer, scene, camera, engine and domain service owners
  -> never published as public capabilities

mutating operation
  -> routed to the existing owning domain through one admitted command

host retirement or page lifecycle retirement
  -> revoke grants and make later commands terminally rejected
```

## Reconciliation state

The technical architecture audit was produced at `2026-07-13T04-10-37-04-00`. This file records its publication reconciliation at `2026-07-13T04-21-10-04-00`. Runtime implementation remains absent.