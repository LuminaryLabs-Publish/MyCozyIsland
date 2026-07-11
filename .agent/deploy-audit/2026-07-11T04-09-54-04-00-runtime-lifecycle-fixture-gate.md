# Deploy Audit: Runtime Lifecycle Fixture Gate

Timestamp: `2026-07-11T04-09-54-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

## Plan ledger

**Goal:** define the executable proof required before route lifecycle, restart, and WebGPU resource-disposal work can be considered deploy-safe.

- [x] Read current package scripts and test surfaces.
- [x] Identify lifecycle behavior absent from current tests.
- [x] Define a DOM-free ownership fixture.
- [x] Define a browser/WebGPU restart smoke.
- [x] Keep deployment configuration unchanged.

## Current proof surface

```txt
npm test
  -> tests/static-check.mjs
  -> tests/domain-smoke.mjs
```

The static check validates the 50-kit catalog, source constraints, renderer feature tokens, import-map version, route script, and error markup.

The domain smoke validates deterministic source composition, terrain/shoreline samples, inner-clearing flatness, placement determinism, atmosphere recipe sizes, and one scenario tick.

Neither test imports or executes `src/main-cloudform.js` in a browser-like environment. They do not observe listener registration, timeouts, animation-loop ownership, partial startup rollback, resource disposal, global publication, or restart.

## Required DOM-free fixture

Proposed script:

```txt
tests/runtime-lifecycle-fixture.mjs
```

Use fake resource adapters rather than Three/WebGPU:

```txt
fake renderer with animation-loop counter and dispose count
fake listener target with add/remove identity tracking
fake timeout scheduler
fake resources with release order and duplicate-release detection
fake global publication host
injectable failure at every acquisition step
```

Required assertions:

```txt
start commits all required acquisitions
start failure rolls back only acquired resources in reverse order
rollback continues after one release failure
stop clears loop and interaction leases
first dispose releases every owned resource exactly once
second dispose returns unchanged
restart advances epoch
stale callback and command are rejected
same seed/options preserve source fingerprint
active resource registry contains only new epoch rows
bounded getState/getJournal are JSON-safe
```

## Required browser smoke

Proposed browser proof:

```txt
start route
capture lifecycle/resource state
stop
verify frame count and scenario clock stop changing
dispose
verify animation loop, listeners, timers and global references retired
restart
verify epoch increments and exactly one loop/listener set is active
repeat restart at least three times
exercise WebGPU and WebGL2 fallback where available
```

Browser assertions should include:

```txt
no duplicate input response
no old loader timeout mutation
no stale debug update
no old performance callback mutation
no disposed-resource render submission
no console error during repeated dispose/restart
resource counts return to expected baseline
```

## Package gate

The future package script should become:

```json
{
  "scripts": {
    "test": "node tests/static-check.mjs && node tests/domain-smoke.mjs && node tests/runtime-lifecycle-fixture.mjs"
  }
}
```

A separate browser smoke may run in CI or a review harness and should not be claimed by the Node fixture.

## Deployment decision

```txt
Pages workflow/configuration change required now: no
runtime lifecycle implementation deployed: no
Node lifecycle fixture available: no
browser restart smoke available: no
current route remains deployable as existing static content: yes
lifecycle/restart readiness claim: blocked
```

## Gate result

Do not add more persistent GPU resources or claim restart-safe route behavior until the lifecycle fixture and browser restart smoke pass with explicit resource and epoch readback.
