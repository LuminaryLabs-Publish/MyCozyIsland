# Next steps: MyCozyIsland host-clock fixed-step simulation

**Timestamp:** `2026-07-15T05-00-28-04-00`  
**Status:** `host-clock-fixed-step-simulation-authority-audited`

## Summary

Add one application-owned fixed-step accumulator between RAF timestamps and NexusEngine ticks. Preserve all existing gameplay DSKs and route accepted fixed steps through the current engine schedule.

## Plan ledger

**Goal:** deliver stable wall-time pacing, bounded overload handling and clock-aligned presentation without adding a second simulation path.

- [ ] Define a versioned host-clock manifest.
- [ ] Choose and document `fixedStepSeconds`.
- [ ] Choose and document `maxStepsPerFrame`.
- [ ] Choose and document `maxAccumulatedSeconds`.
- [ ] Classify active, suspended, resumed, overload and invalid intervals.
- [ ] Add a monotonic RAF timestamp adapter.
- [ ] Add a fixed-step accumulator with residual retention.
- [ ] Execute zero or more fixed engine steps per RAF callback.
- [ ] Publish explicit discarded-time receipts when policy drops elapsed time.
- [ ] Roll the clock generation on lifecycle suspension and resume.
- [ ] Reject stale, duplicate and non-monotonic clock commands.
- [ ] Bind scenario, player, Agriculture and Foraging to accepted simulation revisions.
- [ ] Declare whether autosave cadence uses wall time or simulation time.
- [ ] Publish `HostClockFrameResult`.
- [ ] Publish interpolation alpha for presentation.
- [ ] Publish `FirstClockAlignedFrameAck`.
- [ ] Preserve preload suspension and direct-play behavior.
- [ ] Preserve deterministic Node-domain tests.
- [ ] Add source, built-output and Pages browser fixtures.

## Minimal implementation order

```txt
1. host-clock manifest
2. timestamp and lifecycle classifier
3. fixed-step accumulator
4. bounded step budget
5. clock command/result identity
6. domain simulation revision binding
7. autosave time-source policy
8. render interpolation descriptor
9. FirstClockAlignedFrameAck
10. browser timing matrix
11. source/build/Pages parity
```

## Target files

```txt
src/main-adventure.js
src/adventure/composition-runtime.js
src/adventure/runtime-domains.js
src/adventure/resource-domains.js
src/adventure/persistence-render-domains.js
src/adventure/host-clock-domain.js
tests/host-clock-browser.fixture.mjs
tests/adventure-domains-smoke.mjs
package.json
.github/workflows/pages.yml
```

## Acceptance matrix

```txt
60 FPS steady state
30 FPS steady state
20 FPS clamp boundary
10 FPS bounded catch-up
5 FPS overload policy
100 ms callback gap
250 ms callback gap
500 ms callback gap
2000 ms callback gap
preload suspension/resume
visibility hidden/resume
BFCache pagehide/pageshow
clock generation rollover
autosave cadence
WebGPU/WebGL2 frame correlation
source/build/Pages parity
```

## Ownership constraints

The browser host owns timestamp capture and lifecycle events. The host-clock authority owns elapsed-time admission, step extraction and overload receipts. NexusEngine and existing product DSKs retain simulation truth. The renderer only projects accepted revisions and interpolation descriptors.