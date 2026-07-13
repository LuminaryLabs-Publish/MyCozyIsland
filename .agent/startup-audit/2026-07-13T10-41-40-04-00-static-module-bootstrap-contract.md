# Startup audit: static module bootstrap admission contract

**Timestamp:** `2026-07-13T10-41-40-04-00`

## Summary

Core Startup begins after the browser has loaded and evaluated the complete `main-adventure.js` module graph. This contract defines the missing earlier authority so import-map, provider, parse and evaluation failures become typed terminal results instead of an unchanged loading shell.

## Plan ledger

**Goal:** admit exactly one browser module graph, bind it to one Core Startup launch and prove the first matching visible frame before playable entry.

- [x] Identify the static module tag and provider import map.
- [x] Identify the earliest point where product-owned error handling exists.
- [x] Define bootstrap identities, states and terminal results.
- [x] Define Core Startup binding and visible-frame obligations.
- [ ] Implement and fixture the contract.

## Required identities

```txt
DocumentGeneration
BootstrapAttemptId
BootstrapGeneration
ProviderManifestRevision
ModuleGraphReceiptId
CoreStartupLaunchId
RenderDeviceGeneration
FirstFrameEnvelopeId
VisibleFrameAckId
```

## Required states

```txt
idle
loading-providers
loading-entry
validating-exports
accepted
starting-core
preparing
first-frame-pending
playable
failed
cancelled
retired
```

## Terminal bootstrap results

```txt
Accepted
Rejected
TimedOut
Cancelled
Stale
```

A non-accepted result must create no adventure engine, install no gameplay kit, restore no save, allocate no renderer and enter no playable state.

## Contract

```txt
1. Local document shell installs bounded failure projection.
2. Shell allocates BootstrapAttemptId and generation.
3. Immutable provider manifest identifies Three, NexusEngine and Kits revisions.
4. Entry module is loaded under timeout and cancellation policy.
5. Export contract is validated without adventure mutation.
6. Accepted result binds one module graph to one Core Startup launch.
7. Core Startup preparations execute in product order.
8. First frame returns renderer-derived submission evidence.
9. Matching visible frame is acknowledged.
10. Playable entry commits exactly once.
11. Retry retires the predecessor generation and its listeners/resources.
```

## Required rejection classes

```txt
import-map-invalid
provider-unreachable
provider-version-mismatch
provider-integrity-mismatch
entry-module-unreachable
entry-module-timeout
module-parse-failed
module-evaluation-failed
bootstrap-export-missing
bootstrap-export-invalid
stale-attempt
cancelled-attempt
```

## Existing coverage

The headless startup smoke proves preparation order, continuation, the Core Startup first-frame gate, snapshot roundtrip and structured failure after the host exists. It cannot execute browser import maps, remote provider failures, static module evaluation, renderer device loss or visible canvas acknowledgement.

## Validation boundary

Contract documentation only. No browser bootstrap implementation exists yet.