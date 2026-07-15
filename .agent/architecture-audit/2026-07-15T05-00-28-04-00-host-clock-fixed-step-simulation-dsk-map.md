# Architecture audit: host-clock fixed-step simulation DSK map

**Timestamp:** `2026-07-15T05-00-28-04-00`  
**Status:** `host-clock-fixed-step-simulation-authority-audited`

## Summary

MyCozyIsland has deterministic domain systems, but the browser host supplies one clipped variable delta per RAF callback. Clock ownership is therefore split between browser timing, host clipping, composition clipping, the NexusEngine clock and each consuming domain.

## Plan ledger

**Goal:** establish one semantic authority boundary for elapsed-time admission, fixed-step execution, overload handling and clock-aligned presentation.

- [x] Map current clock producers and consumers.
- [x] Preserve current DSK ownership.
- [x] Separate wall-clock admission from deterministic simulation steps.
- [x] Define typed commands, results and receipts.
- [x] Define first matching frame evidence.
- [ ] Implement the authority.

## Current ownership map

```txt
browser RAF host
  owns callback timestamps and local `last`

main-adventure host
  owns frame-gap clipping, simulation-delta clipping,
  render invocation and autosave accumulation

composition runtime
  owns a second delta clamp and engine tick call

NexusEngine clock
  exposes world.__nexusClock.delta

cozy-input
  admits queued input once per engine tick

cozy-scenario and environment-clock
  advance elapsed island time

cozy-player
  advances intro, movement, distance and stamina

Agriculture
  advances crop growth and perennial timing

cozy-foraging
  advances wild-node respawn

render snapshot and renderer
  project the latest accepted state once per RAF callback
```

## Gap

No participant owns the complete transaction:

```txt
wall interval
  -> suspension/overload classification
  -> accumulated elapsed time
  -> fixed-step count
  -> bounded catch-up
  -> retained residual
  -> discarded-time receipt
  -> simulation revision
  -> interpolation alpha
  -> matching rendered frame
```

## Required parent domain

```txt
cozy-island-host-clock-fixed-step-simulation-authority-domain
```

### Command

```txt
HostClockFrameCommand {
  documentGeneration
  runtimeGeneration
  rafGeneration
  clockGeneration
  previousRafTimestamp
  currentRafTimestamp
  expectedSimulationRevision
  fixedStepSeconds
  maxStepsPerFrame
  maxAccumulatedSeconds
}
```

### Result

```txt
HostClockFrameResult {
  commandId
  accepted
  classification
  elapsedWallSeconds
  admittedSeconds
  executedSteps
  fixedStepSeconds
  residualSeconds
  discardedSeconds
  previousSimulationRevision
  simulationRevision
  interpolationAlpha
  reason
}
```

### Frame acknowledgement

```txt
FirstClockAlignedFrameAck {
  clockCommandId
  simulationRevision
  renderRevision
  frameId
  interpolationAlpha
  backend
}
```

## Planned kits and services

```txt
host-clock-manifest-kit
  fixed-step descriptor, overload policy, pause policy

raf-timestamp-adapter-kit
  monotonic timestamp capture, generation binding

elapsed-time-classifier-kit
  active, suspended, resumed, overload and invalid classification

fixed-step-accumulator-kit
  elapsed accumulation, step extraction, residual retention

step-budget-policy-kit
  maximum steps, maximum accumulated time, bounded work

catch-up-policy-kit
  catch-up admission and recovery strategy

dropped-time-receipt-kit
  explicit discarded-time accounting and diagnostics

pause-suspension-classifier-kit
  visibility, preload suspension and BFCache clock policy

simulation-clock-generation-kit
  generation identity and stale callback rejection

clock-admission-kit
  command validation and atomic frame admission

clock-step-result-kit
  typed per-frame clock result

interpolation-alpha-kit
  residual-to-render interpolation descriptor

scenario-clock-binding-kit
  accepted-step binding for island time

player-clock-binding-kit
  accepted-step binding for intro, movement and stamina

agriculture-clock-binding-kit
  accepted-step binding for crop and perennial growth

foraging-clock-binding-kit
  accepted-step binding for wild-node respawn

autosave-wall-clock-policy-kit
  explicit simulation-time or wall-time save cadence

first-clock-aligned-frame-ack-kit
  accepted simulation/render convergence receipt

clock-browser-fixture-kit
  60, 30, 20, 10, 5 FPS and long-gap browser fixtures

source-build-pages-clock-parity-kit
  provider and artifact parity checks
```

## Existing kit preservation

The 14 engine-installed kits, 50 cataloged world/render/host kits, one ocean composition kit and five browser/product adapters remain unchanged. The full service inventory is recorded in the timestamped project breakdown and `.agent/kit-registry.json`.

## Dependency order

```txt
clock manifest
  -> timestamp and lifecycle classification
  -> fixed-step accumulator and work budget
  -> clock admission result
  -> domain bindings
  -> render interpolation
  -> FirstClockAlignedFrameAck
  -> source/build/Pages fixtures
```

No runtime implementation is claimed.