# Capability audit: public host grant and revoke contract

**Timestamp:** `2026-07-13T04-10-37-04-00`

## Summary

A frozen browser-global wrapper is not a capability boundary when it contains live mutable owners. The target contract exposes a read-only public projection by default and issues narrow, expiring, revocable grants only in admitted channels.

## Plan ledger

**Goal:** define the public-host policy, grant model, command envelope, result journal and lifecycle revocation contract.

- [x] Classify current public references as ownership transfer rather than read-only projection.
- [x] Define host channels and capability scopes.
- [x] Define grant, command, result and revoke identities.
- [x] Define reset and renderer-debug restrictions.
- [x] Define lifecycle and visible-frame proof.
- [ ] Implement and validate the contract.

## Host channels

```txt
production
  -> immutable read-only projection only

development
  -> opt-in local diagnostics and declared debug commands

test
  -> deterministic synthetic input and fixture control

support
  -> explicit time-bounded grant with auditable scope
```

## Capability scopes

```txt
inspect-runtime
inspect-render
capture-save
inject-input
invoke-domain-action
request-reset
render-debug
read-journal
```

Raw `engine`, renderer, scene, camera, world model and domain API references are not capabilities. They are internal owners and must remain private.

## Grant contract

```txt
CapabilityGrant
  grantId
  publicHostId
  publicHostGeneration
  channel
  callerSourceId
  scopes
  issuedAt
  expiresAt
  runtimeGeneration
  revokedAt
  revokeReason
```

## Command contract

```txt
PublicCapabilityCommand
  commandId
  sequence
  grantId
  callerSourceId
  scope
  operation
  payload
  expectedRuntimeGeneration
  expectedDomainRevisions
  expectedRenderRevision
  confirmation
```

## Result contract

```txt
PublicCapabilityResult
  resultId
  commandId
  status
  reason
  predecessorRevisions
  committedRevisions
  changedParticipants
  rollback
  observationId
  visibleEffectAckId
```

## Revocation rules

```txt
runtime restart -> revoke predecessor-generation grants
page Suspend -> suspend or revoke channel under explicit policy
page Retire -> revoke all grants and remove global gateway
production build -> issue no mutating grants
expiry -> reject later commands with zero mutation
duplicate command -> replay terminal result without reapplying effect
```

## Reset rules

```txt
requires request-reset scope
requires explicit confirmation token
requires expected runtime generation
requires participant prepare barrier
commits all required participants or rolls back
allocates successor generation
revokes predecessor grants
publishes first visible reset-frame acknowledgement
```

## Observation rules

The journal must be bounded, immutable and redacted. It may contain identities, timings, classifications and revision metadata, but not raw mutable owner references or unbounded save/state payloads.

## Non-claims

No host policy, capability grant, revocation, result or observation journal is implemented.
