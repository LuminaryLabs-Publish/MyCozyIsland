# START HERE: MyCozyIsland

Last aligned: `2026-07-12T06-51-27-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: place wheel, pointer, keyboard, focus, visibility, and camera-mode input behind one normalized, frame-admitted command authority.

## Summary

The browser host currently sends raw DOM events directly into `cameraSequence.input`. Wheel input ignores `WheelEvent.deltaMode`, pointer deltas are applied immediately per browser event, and keyboard state mutates an ambient `Set` outside the frame transaction.

This makes equivalent physical input device- and cadence-dependent. A line-mode wheel and a pixel-mode trackpad can advance the rail by different magnitudes. Pointer segmentation also changes rail orbit because each event is clamped independently before mutating the canonical rail points.

## Plan ledger

**Goal:** preserve responsive camera control while making input units, ordering, focus state, camera-mode policy, command results, replay, and visible-frame ownership deterministic.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `MyCozyIsland` as the oldest eligible repository.
- [x] Trace browser listeners, wheel progress, pointer drag, keyboard holds, blur clearing, camera mode, scenario tick, render projection, public readback, and tests.
- [x] Identify the complete interaction loop, all active domains, all 50 cataloged kits, one source-backed composition kit, nine providers, and five imported NexusEngine services.
- [x] Confirm wheel units are consumed without `deltaMode` normalization.
- [x] Confirm pointer event segmentation changes the clamped rail-orbit result.
- [x] Confirm browser events mutate input state outside a frame-scoped command queue.
- [x] Define input normalization, admission, reduction, leases, results, replay, fixtures, and visible-frame proof.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh all required root `.agent` files and the machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable input fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

MyCozyIsland       2026-07-12T05-00-19-04-00 selected oldest
TheOpenAbove       2026-07-12T05-11-46-04-00
PrehistoricRush    2026-07-12T05-21-52-04-00
IntoTheMeadow      2026-07-12T05-39-42-04-00
PhantomCommand     2026-07-12T05-49-04-00
HorrorCorridor     2026-07-12T05-59-28-04-00
ZombieOrchard      2026-07-12T06-19-56-04-00
TheUnmappedHouse   2026-07-12T06-30-34-04-00
AetherVale         2026-07-12T06-41-32-04-00
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
.agent/trackers/2026-07-12T06-51-27-04-00/project-breakdown.md
.agent/architecture-audit/2026-07-12T06-51-27-04-00-browser-input-command-authority-dsk-map.md
.agent/render-audit/2026-07-12T06-51-27-04-00-input-camera-visible-frame-provenance-gap.md
.agent/gameplay-audit/2026-07-12T06-51-27-04-00-rail-first-person-input-loop.md
.agent/interaction-audit/2026-07-12T06-51-27-04-00-browser-event-admission-result-map.md
.agent/input-audit/2026-07-12T06-51-27-04-00-unit-cadence-focus-command-contract.md
.agent/deploy-audit/2026-07-12T06-51-27-04-00-input-replay-fixture-gate.md
.agent/turn-ledger/2026-07-12T06-51-27-04-00.md
```

## Interaction loop

```txt
wheel event
  -> prevent default
  -> pass raw deltaY to input.wheel
  -> mutate rail progress immediately

pointer drag
  -> retain browser client coordinates
  -> calculate one delta per pointermove event
  -> mutate yaw and pitch immediately
  -> while on rail, clamp each event and mutate canonical rail points

keyboard
  -> keydown/keyup mutate an ambient pressed Set
  -> blur clears the Set

animation frame
  -> scenario.tick reads the current Set
  -> camera descriptor reads already-mutated rail, yaw, pitch, progress, and player state
  -> world focus follows the descriptor
  -> render submits the frame
```

## Main finding

```txt
wheel delta mode normalization: absent
input command ID and sequence: absent
session and runtime generation: absent
frame target: absent
pointer coalescing policy: absent
keyboard edge versus hold model: absent
focus and visibility admission: partial blur-only clear
pointer-capture lease and loss result: absent
camera-mode input policy: implicit
input result and state revision: absent
input replay: absent
first visible input-frame acknowledgement: absent
```

## Implemented surface

```txt
50 catalog-admitted DomainKit entries
1 source-backed render-composition kit outside the catalog
9 ordered Core World providers
5 imported NexusEngine services
```

The complete kit and service map is in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Required parent domain

```txt
cozy-island-browser-input-command-authority-domain
```

## Ordered implementation queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. Browser Input Command and Camera Control Authority
4. World Lifecycle Contract and Legacy/Core Mode Parity Authority
5. Render Layer Graph Admission and Physical Resource Binding Authority
5a. Foam Depth Proxy Topology and Lifecycle Authority
6. Core World Reset / Re-prepare Authority
7. Pinned Core World Focus Transaction Authority
8. Live Materialization Readiness Commit Authority
9. Core World Render Commit Authority
10. Camera Rail Baseline Authority
11. Dynamic Environment Frame Authority
12. Adaptive Quality Transaction Authority
```

## Validation boundary

```txt
runtime source changed by this pass: no
input behavior changed by this pass: no
camera behavior changed by this pass: no
render output changed by this pass: no
package scripts changed by this pass: no
dependencies changed by this pass: no
deployment changed by this pass: no
branch created: no
pull request created: no
npm test: not run
browser input smoke: not run
input replay fixtures: unavailable
visible input-frame receipt: unavailable
```