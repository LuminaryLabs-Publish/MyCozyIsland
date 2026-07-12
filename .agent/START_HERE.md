# START HERE: MyCozyIsland

Last aligned: `2026-07-12T02-10-14-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: make the camera rail an immutable, revisioned baseline so drag, descent, reset, and replay cannot accumulate hidden path drift.

## Summary

The active camera sequence stores its rail as mutable point objects. While the camera is still on the aerial rail, every drag directly changes every rail point's `x` coordinate. `reset()` restores progress, yaw, pitch, pressed keys, and the player position, but it does not rebuild or restore the mutated rail points.

A drag followed by reset therefore does not return the camera to the original authored path. Repeated rail drags can accumulate permanent path displacement for the lifetime of the sequence, while public descriptors expose no baseline fingerprint, path revision, reset generation, input result, or visible-frame acknowledgement.

## Plan ledger

**Goal:** preserve the authored aerial descent and first-person handoff while making rail baselines, input admission, reset fidelity, camera revisions, diagnostics, and visible-frame proof deterministic.

- [x] Compare all 10 accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` as the oldest fully synchronized eligible repository.
- [x] Trace browser wheel, pointer, keyboard, blur, scenario tick, camera descriptor, reset, and existing camera tests.
- [x] Identify the interaction loop, all domains, all 50 cataloged kits, one extra runtime kit, nine providers, and five imported NexusEngine services.
- [x] Confirm rail drag mutates the authored point array and reset leaves those mutations intact.
- [x] Define camera baseline, command, reset-result, revision, journal, fixture, and frame-proof contracts.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh required root `.agent` files and the machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable camera fidelity fixtures remain future work.

## Selection comparison

```txt
MyCozyIsland       2026-07-12T00-20-01-04-00  selected
PrehistoricRush    2026-07-12T00-30-49-04-00
TheOpenAbove       2026-07-12T00-39-05-04-00
IntoTheMeadow      2026-07-12T00-58-12-04-00
HorrorCorridor     2026-07-12T01-08-06-04-00
PhantomCommand     2026-07-12T01-20-00-04-00
ZombieOrchard      2026-07-12T01-30-07-04-00
TheUnmappedHouse   2026-07-12T01-41-56-04-00
AetherVale         2026-07-12T01-58-43-04-00
TheCavalryOfRome   excluded
```

## Runtime identity

```txt
route:               index.html -> src/main-cloudform.js?v=foam-depth-camera-1
package:             0.4.1
Three.js:            0.185.0
NexusEngine commit:  481cbf6df742e81279bd42245c4238c6a1fc69f2
world id:            world:cozy-island-webgpu-v4
cataloged kits:      50
extra runtime kits:  1
providers:           9
default world mode:  core
fallback mode:       legacy
```

## Read this pass first

```txt
.agent/trackers/2026-07-12T02-10-14-04-00/project-breakdown.md
.agent/architecture-audit/2026-07-12T02-10-14-04-00-camera-rail-baseline-authority-dsk-map.md
.agent/render-audit/2026-07-12T02-10-14-04-00-reset-camera-visible-path-gap.md
.agent/camera-system-audit/2026-07-12T02-10-14-04-00-baseline-revision-reset-fidelity-contract.md
.agent/gameplay-audit/2026-07-12T02-10-14-04-00-drag-descend-reset-replay-loop.md
.agent/interaction-audit/2026-07-12T02-10-14-04-00-camera-input-command-result-map.md
.agent/deploy-audit/2026-07-12T02-10-14-04-00-camera-baseline-fixture-gate.md
.agent/turn-ledger/2026-07-12T02-10-14-04-00.md
```

## Interaction loop

```txt
startup
  -> construct terrain-dependent authored rail points
  -> initialize progress, yaw, pitch, keys, and player position
  -> install wheel, pointer, keyboard, blur, resize, and RAF callbacks

rail interaction
  -> wheel mutates progress directly
  -> pointer drag mutates yaw and pitch
  -> while progress < 0.985, the same drag also mutates every rail point x value
  -> descriptor samples the now-mutated rail

first-person
  -> threshold switches mode
  -> WASD moves the player inside clearing bounds
  -> prior rail drag yaw and pitch become first-person view orientation

reset
  -> reset progress, yaw, pitch, keys, and player position
  -> retain all accumulated rail point mutations
  -> next descriptor reports a reset progress on a non-baseline path
```

## Main finding

```txt
immutable authored rail baseline: absent
rail baseline fingerprint: absent
rail path revision: absent
input command identity: absent
drag result: absent
reset command/result: absent
reset generation: absent
stale input rejection: absent
camera descriptor provenance: absent
first visible reset-frame acknowledgement: absent
```

The existing camera tests verify terrain clearance, first-person eye height, and FOV. They do not compare pre-drag and post-reset descriptors, repeat drag/reset cycles, verify zero cumulative drift, or correlate the reset with the first rendered camera frame.

## Implemented surface

```txt
50 catalog-admitted DomainKit entries
1 source-backed composition kit outside the catalog
9 ordered Core World providers
5 imported NexusEngine services
```

The complete per-kit service map is in `.agent/current-audit.md`, `.agent/kit-registry.json`, and the current tracker.

## Required parent domain

```txt
cozy-island-camera-rail-baseline-authority-domain
```

## Ordered implementation queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. World Lifecycle Contract and Legacy/Core Mode Parity Authority
4. Render Layer Graph Admission and Physical Resource Binding Authority
4a. Foam Depth Proxy Topology and Lifecycle Authority
5. Core World Reset / Re-prepare Authority
6. Pinned Core World Focus Transaction Authority
7. Live Materialization Readiness Commit Authority
8. Core World Render Commit Authority
9. Camera Rail Baseline Authority
10. Dynamic Environment Frame Authority
11. Adaptive Quality Transaction Authority
```

## Validation boundary

```txt
runtime source changed by this pass: no
camera behavior changed by this pass: no
render output changed by this pass: no
package scripts changed by this pass: no
dependencies changed by this pass: no
deployment changed by this pass: no
branch created: no
pull request created: no
npm test: not run
camera baseline fixture: unavailable
repeated drag/reset fixture: unavailable
browser pointer/wheel parity smoke: not run
first visible reset-frame receipt: unavailable
```