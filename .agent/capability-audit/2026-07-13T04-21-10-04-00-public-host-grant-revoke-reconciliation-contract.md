# Capability audit: public-host grant and revoke reconciliation contract

**Timestamp:** `2026-07-13T04-21-10-04-00`

## Summary

MyCozyIsland currently publishes one unrestricted same-realm host object. The required replacement is a channel-aware host generation with detached projections, explicit grants, bounded commands, expiry and terminal revocation.

## Plan ledger

**Goal:** define the minimum grant lifecycle that can safely support diagnostics, tests or support tooling without transferring runtime ownership.

- [x] Define host and generation identity.
- [x] Define channel policy and capability manifest.
- [x] Define grant creation, expiry and revocation.
- [x] Define command/result binding.
- [x] Define lifecycle retirement behavior.
- [ ] Implement grants and fixtures.

## Host lifecycle

```txt
create host generation
  -> select channel policy: production | development | test | support
  -> publish detached manifest
  -> issue zero or more bounded grants
  -> admit commands against the current generation
  -> expire or explicitly revoke grants
  -> revoke the complete host during terminal lifecycle retirement
```

## Grant contract

```txt
CapabilityGrant {
  grantId
  hostId
  hostGeneration
  channel
  callerId
  capabilities[]
  issuedAt
  expiresAt?
  maxCommands?
  allowedExpectedRevisionDrift
  status
}
```

## Production baseline

```txt
allowed
  detached health/status projection
  detached runtime revision
  detached renderer backend and quality projection
  detached save status

not allowed by default
  raw renderer, scene, camera, adventure or engine
  domain service objects
  tick or input injection
  Inventory, Agriculture or Foraging mutation
  snapshot load, restore or reset
```

## Revocation contract

```txt
RevokePublicHostCommand
  -> validate current host generation
  -> prevent new grants
  -> revoke active grants
  -> reject queued or later commands
  -> publish PublicHostRevocationResult
  -> remove or replace global publication with a terminal detached projection
```

## Required proof

```txt
production host exposes no mutable owner
development grant permits only listed capabilities
expired and revoked grants perform zero mutation
host generation change rejects predecessor commands
reset requires explicit scope and confirmation
page lifecycle retirement revokes the host
source, built output and Pages expose equivalent policy
```

## Validation boundary

Documentation only. No runtime grant, expiry or revocation implementation exists.