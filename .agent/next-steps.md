# Next Steps: MyCozyIsland

Last updated: `2026-07-10T22-29-21-04-00`

## Goal

Create one route-owned runtime session, then place adaptive quality behind an atomic target/apply/observe contract that can prove complete degradation and complete recovery.

## Gate 1 checklist: runtime-session lifecycle authority

- [ ] Introduce a session ID and lifecycle states.
- [ ] Return a host controller from route construction.
- [ ] Retain and stop the renderer animation loop.
- [ ] Register and remove all canvas/window listeners through one ledger.
- [ ] Add partial-start rollback.
- [ ] Add route and child resource owners.
- [ ] Make disposal ordered and idempotent.
- [ ] Publish JSON-safe lifecycle and resource observations.
- [ ] Add start-stop-dispose-restart fixtures.

## Gate 2 checklist: adaptive-quality transaction authority

- [ ] Define immutable applied-quality targets for levels 0, 1, and 2.
- [ ] Include pixel ratio, cloud steps, fog steps, fog-resolution scale, and quality source in each target.
- [ ] Separate requested level, admitted level, applied level, and observed renderer state.
- [ ] Replace sequential anonymous mutations with one application transaction.
- [ ] Always apply the full target, including restoring pixel ratio at level 0.
- [ ] Capture per-control before/after observations.
- [ ] Return typed `applied`, `no_change`, `rejected`, `partial_failure`, and `rolled_back` results.
- [ ] Roll back prior controls when a later control application fails.
- [ ] Define `?quality=` policy as lock, ceiling, floor, or startup hint.
- [ ] Publish applied controls and a bounded transition journal through host diagnostics.
- [ ] Update the H overlay to distinguish startup tier from dynamic applied level.
- [ ] Add a DOM-free performance-budget state-machine fixture.
- [ ] Add a renderer-control spy fixture covering 0→1→2→1→0.
- [ ] Assert final pixel ratio equals the startup target after recovery to level 0.
- [ ] Assert duplicate target application returns a typed no-op.
- [ ] Preserve current visual tuning and threshold values during the authority refactor.

## Ordered safe ledges

```txt
1. MyCozyIsland Runtime Session Lifecycle Authority
   + WebGPU Resource Disposal Fixture Gate

2. MyCozyIsland Adaptive Quality Transaction Authority
   + Full-Recovery Fixture Gate
```

## Do not combine with

- new quality tiers or threshold retuning
- grass density/atlas changes
- cloud/fog/ocean shader changes
- camera rail changes
- terrain regeneration
- renderer replacement
- new route content
