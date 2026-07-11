# Deploy Audit: Runtime Lifecycle Browser Fixture Gate

Timestamp: `2026-07-11T17-50-37-04-00`

## Summary

The existing Node test chain covers domain behavior, Core World behavior, materialization, renderer cell caching and disposal utilities. It does not construct the production route, trigger real page lifecycle events, inspect WebGPU/WebGL2 resource retirement, verify listener removal, or prove a clean restart frame.

## Plan ledger

**Goal:** define the executable local and deployed evidence required before claiming runtime session lifecycle correctness.

- [x] Inspect the current package test chain.
- [x] Identify missing lifecycle tests.
- [x] Define pure ownership and browser fixture layers.
- [x] Define bfcache, disposal and restart evidence.
- [x] Define Pages acceptance conditions.
- [ ] Implement and execute the fixture gate.

## Existing test surface

```txt
static-check.mjs
domain-smoke.mjs
world-baseline.mjs
core-world-runtime.mjs
world-provider-order.mjs
world-query-parity.mjs
world-population-parity.mjs
world-snapshot-portability.mjs
world-cell-lifecycle.mjs
lazy-world-materialization.mjs
renderer-cell-cache.mjs
renderer-resource-disposal.mjs
```

Useful existing proof:

```txt
semantic-domain construction
Core World normal-path behavior
provider order
world/query/population parity
snapshot portability
cell lifecycle and materialization utilities
renderer cache and disposal helper behavior
```

Missing production-route proof:

```txt
session/generation state machine
renderer animation-loop stop
anonymous listener removal
loader timeout cancellation
pagehide persisted policy
pageshow resume/restart
scene/post/volume/renderer retirement
global readback revocation
duplicate stop/dispose idempotency
stale callback rejection
first restarted frame acknowledgement
```

## Required pure fixtures

```txt
lifecycle state transition table
command admission and duplicate handling
generation-based stale callback fence
listener registry install/remove parity
timeout registry cancel parity
resource inventory deduplication
retirement dependency order
best-effort failure reporting
restart generation monotonicity
```

## Required browser fixtures

```txt
1. cold-start ownership
   one animation loop
   expected listener/timer/resource counts
   running session observation

2. explicit stop
   loop stops
   input/resize callbacks no longer mutate
   timers cancelled
   stopped result published

3. explicit dispose
   scene/post/volume/renderer resources retire
   Core World and materializer retire
   global readback revoked
   no console unhandled errors

4. duplicate disposal
   second request is idempotent
   no double-disposal error

5. persisted pagehide/pageshow
   exercise declared suspend/resume or dispose/restart policy
   reset frame-time baseline
   no stale input
   correct first resumed frame generation

6. non-persisted pagehide
   final disposal completes
   no active animation/listener/timer lease remains

7. restart
   new sessionId and generation
   one new loop/listener set
   Core World prepared
   first restarted frame acknowledged
   old callbacks rejected

8. WebGPU and WebGL2
   equivalent lifecycle result model
   backend-specific resource counts and retirement
```

## Required deployed Pages smoke

```txt
load deployed route
record session observation
trigger controlled stop/dispose through test-only admitted harness
verify canvas stops changing
verify listener/timer/resource receipts
restart or reload through declared policy
verify first clean frame
record console, network, uncaptured GPU and unhandled rejection output
repeat at least two cycles
```

## Acceptance

```txt
one and only one animation-loop lease while running
zero active loop/listener/timer leases after final dispose
no old-generation callback mutates state
all required render and world resources have retirement receipts
pagehide/pageshow behavior matches the declared persisted-page policy
restart creates a new generation and first-frame receipt
WebGPU and WebGL2 lifecycle observations use the same schema
no uncaptured GPU, console or unhandled promise failures
```

## Current status

```txt
runtime implementation: unchanged
lifecycle state machine fixture: absent
production-route browser fixture: absent
pagehide/pageshow fixture: absent
GPU retirement fixture: absent
restart fixture: absent
Pages lifecycle smoke: absent
```

No lifecycle correctness claim should be made until this gate is implemented and passes.
