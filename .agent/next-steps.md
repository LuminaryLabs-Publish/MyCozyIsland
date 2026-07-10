# Next Steps: MyCozyIsland

Last updated: 2026-07-10T14-42-01-04-00

## Next safe ledge

```txt
MyCozyIsland WebGPU Frame Correlation Journal + Node Fixture Gate
```

## Goal

Add an additive, bounded, JSON-safe proof journal that correlates source identity, input, scenario, camera, atmosphere setup, performance transitions, and render submission without changing the visual route.

## Plan ledger

- [ ] Add `webgpu-route-profile` and stable source/catalog fingerprints.
- [ ] Add a monotonic host sequence and deterministic frame identity.
- [ ] Define a common record header: `sequence`, `frameId`, `correlationId`, `kind`, `sourceRevision`, `time`, `status`, `reason`.
- [ ] Wrap wheel, pointer, keyboard, blur, debug toggle, and resize with command/result records.
- [ ] Record one scenario-step result per animation frame.
- [ ] Record the camera projection consumed by that frame.
- [ ] Record atmosphere volume texture build results against the source revision that created them.
- [ ] Record performance degrade/recover transitions, including previous and next levels.
- [ ] Record render submission with source snapshot hash, camera frame, quality level, and consumer statuses.
- [ ] Store records in a bounded journal with deterministic retention behavior.
- [ ] Expose additive `globalThis.CozyIslandHost`; preserve `globalThis.CozyIsland`.
- [ ] Add a Node fixture proving order, correlation, serialization, reset, and retention.
- [ ] Wire the fixture into `npm test` only after it is deterministic.

## Candidate files

```txt
src/host-proof/webgpu-route-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/host-frame-sequence.js
src/host-proof/frame-correlation-record.js
src/host-proof/bounded-proof-journal.js
src/host-proof/kit-catalog-readback.js
src/host-proof/render-snapshot-normalizer.js
src/host-proof/input-command-record.js
src/host-proof/input-result.js
src/host-proof/scenario-step-record.js
src/host-proof/camera-projection-record.js
src/host-proof/volume-build-record.js
src/host-proof/performance-transition-record.js
src/host-proof/render-submit-record.js
src/host-proof/cozy-island-host.js
scripts/cozy-island-frame-correlation-fixture.mjs
```

## Required invariants

```txt
sequence strictly increases
frameId identifies one animation-loop iteration
correlationId links command/result/consumers
sourceRevision is stable for the proof run
all records are JSON-safe
journal capacity and eviction are deterministic
legacy CozyIsland surface remains available
fixture requires no DOM, browser GPU, screenshot, or WebGPU capture
```

## Suggested status vocabulary

```txt
accepted
rejected_invalid_payload
rejected_no_active_host
no_change_duplicate_input
no_change_disabled
clamped_scroll
clamped_pitch
setup_complete
setup_fallback
quality_degraded
quality_recovered
render_submitted
render_skipped
```

## Not next

- visual polish or new island content
- cloud, ocean, fog, grass, or camera retuning
- renderer replacement or extraction
- screenshot automation
- route-token changes