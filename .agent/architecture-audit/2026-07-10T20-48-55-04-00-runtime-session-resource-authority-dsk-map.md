# Architecture Audit: Runtime Session and Resource Authority DSK Map

Timestamp: `2026-07-10T20-48-55-04-00`

## Current ownership graph

```txt
main-cloudform.js
  -> validates kit catalog
  -> constructs domain snapshot
  -> constructs renderer and scene consumers
  -> installs browser listeners
  -> starts animation loop
  -> exposes global host object
```

The catalog describes domain boundaries well, but the host adapter layer has no parent lifecycle domain that owns construction, rollback, running, stopping, disposal, and restart.

## Existing DSK groups

```txt
platform-host-adapters: 10 kits
authored-sequences: 2 kits
large domains: 2 kits
atomic/shared domains: 36 kits
```

## Missing parent domain

Candidate:

```txt
cozy-island-runtime-session-domain
```

Required services:

```txt
session:create
session:start
session:stop
session:dispose
session:restart
session:state
session:result-journal
listener:register/remove/snapshot
frame-loop:start/stop/snapshot
resource:register/release/snapshot
startup:rollback
host:lifecycle-readback
```

## Candidate focused kits

```txt
cozy-island-runtime-session-authority-kit
cozy-island-lifecycle-state-kit
cozy-island-startup-transaction-kit
cozy-island-animation-loop-owner-kit
cozy-island-listener-ledger-kit
cozy-island-resource-ledger-kit
cozy-island-partial-start-rollback-kit
cozy-island-ordered-disposal-kit
cozy-island-session-result-journal-kit
cozy-island-host-lifecycle-readback-kit
cozy-island-lifecycle-fixture-kit
```

These are candidates, not implemented kits. Existing DomainServiceKit descriptors remain unchanged in this documentation pass.

## Child-resource composition order

```txt
session owner
  -> renderer owner
  -> sky owner
  -> world owner
     -> layered grass owner
  -> ocean owner
  -> foam owner
  -> atmosphere texture owner
  -> cloud owner
  -> fog owner
  -> post-pipeline owner
  -> debug-overlay owner
```

Shared resources must have one explicit owner. Consumers may hold references but must not independently dispose shared geometry, materials, or textures.

## Required invariants

```txt
one session ID per construction attempt
one active animation loop per running session
one registered listener row per installed listener
all allocations registered before exposure
partial start failure releases prior allocations in reverse order
stop is distinct from dispose
dispose is idempotent
restart produces a new session ID
host snapshots contain no live Three objects
```

## Decision

Implement lifecycle authority before adding more visual systems or resources. Preserve the current 50-kit catalog until candidate lifecycle boundaries are proven and intentionally promoted.
