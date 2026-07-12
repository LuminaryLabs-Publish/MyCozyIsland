# Project Breakdown: MyCozyIsland Camera Rail Baseline Authority

Timestamp: `2026-07-12T02-10-14-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

## Summary

`MyCozyIsland` was selected as the oldest fully synchronized eligible Publish repository. The camera sequence currently mixes immutable authored rail data with mutable input state: rail-mode drag changes the authored `railPositions` objects in place, while reset does not restore those points.

The result is a reset-fidelity defect. A player or external host can drag the rail, reset the scenario, and receive the initial progress and orientation values on a path that no longer matches the authored baseline. Repeated cycles can accumulate hidden path drift.

## Plan ledger

**Goal:** document the complete game surface and define one camera authority that preserves authored baseline data, orders input commands, restores exact reset state, and proves the first visible camera frame.

- [x] Enumerate the 10 accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare the nine eligible repositories against central ledger timestamps.
- [x] Confirm all eligible repositories have root `.agent` state.
- [x] Select only `MyCozyIsland`.
- [x] Trace active browser input, camera sequence, scenario, render projection, public readback, and tests.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify all 50 cataloged kits, one additional runtime kit, nine providers, and five imported services.
- [x] Define missing camera authority kits and proof gates.
- [x] Update documentation only.
- [ ] Implement runtime and executable fixtures later.

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

## Interaction loop

```txt
boot
  -> validate kit catalog
  -> create Core or legacy world runtime
  -> construct terrain-dependent rail points and look targets
  -> create scenario, renderers, post pipeline and diagnostics
  -> install wheel, pointer, keyboard, blur, resize and RAF callbacks

rail phase
  -> wheel changes progress
  -> pointer drag changes yaw and pitch
  -> pointer drag also changes each authored rail point x value
  -> descriptor interpolates the mutated points
  -> host copies descriptor to the Three.js camera

first-person phase
  -> progress >= 0.985 changes camera mode
  -> existing yaw and pitch define look direction
  -> WASD moves the player within radial bounds
  -> terrain sampling keeps eye height relative to ground

reset
  -> scenario.reset calls clock.reset and cameraSequence.reset
  -> progress, yaw, pitch, keys and player position reset
  -> mutated rail positions survive
  -> next frame renders a nominally reset camera on a non-baseline path
```

## Domains in use

```txt
browser boot, loader, error and debug UI
kit catalog admission and validation
Core and legacy world composition
Core World focus, providers, cells and materialization
camera rail baseline construction
camera rail interpolation and terrain clearance
camera progress, orbit and look input
first-person movement and clearing bounds
scenario tick, clock, reset and snapshots
browser wheel, pointer, keyboard, blur and pointer capture
Three.js camera projection and visible-frame submission
terrain, sea floor, biome, shoreline and ground contact
vegetation, rocks, props, grass, path and campfire
ocean, waves, optics, caustics, foam and underwater atmosphere
cloud, fog, weather, wind, illumination and sky
logical and physical render composition
adaptive performance, resolution and diagnostics
public host, static tests, browser proof and Pages deployment
```

## Implemented kits and services

```txt
50 catalog-admitted kits
  -> rendering, atmosphere, ocean, camera, scenario, terrain, vegetation,
     materials, quality, determinism and environment services

1 extra source-backed runtime kit
  -> cozy-ocean-composition-kit
  -> logical layer graph and validation services

9 Core World providers
  -> terrain, sea floor, biome, shoreline, sea-floor material,
     vegetation, rocks, props and presentation

5 imported NexusEngine services
  -> createEngine
  -> createCoreWorldDomain
  -> createUniformGridPartition
  -> createFlatWorldSurface
  -> defineWorldEffectProvider
```

The exact kit-by-kit map is retained in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Source-backed finding

```txt
railPositions are mutable point objects
input.drag mutates every rail position x while progress < 0.985
mutation magnitude is weighted by abs(point.z)
mutation accumulates across pointer events
reset does not reconstruct railPositions
scenario.reset delegates to the incomplete sequence reset
camera descriptors do not expose baseline or path identity
public host exposes scenario and raw camera descriptor state
```

## Existing proof

```txt
camera ground-clearance test: present
first-person FOV and eye-height test: present
reset-fidelity test: absent
baseline-immutability test: absent
repeated-drift test: absent
stale-command test: absent
multi-pointer test: absent
visible reset-frame receipt: absent
```

## Required parent domain

```txt
cozy-island-camera-rail-baseline-authority-domain
```

## Candidate kit composition

```txt
camera-rail-baseline-descriptor-kit
camera-rail-baseline-fingerprint-kit
camera-rail-path-revision-kit
camera-state-revision-kit
camera-input-command-kit
camera-input-admission-kit
camera-progress-command-kit
rail-orbit-command-kit
first-person-look-command-kit
camera-reset-command-kit
camera-reset-result-kit
camera-transition-result-kit
stale-camera-command-rejection-kit
camera-descriptor-provenance-kit
camera-input-journal-kit
first-visible-camera-frame-ack-kit
rail-reset-fidelity-fixture-kit
repeated-drag-drift-fixture-kit
browser-pointer-wheel-parity-smoke-kit
```

## Required transaction

```txt
admit immutable terrain-bound baseline
  -> fingerprint baseline positions, looks and thresholds
  -> admit ordered camera input command
  -> derive candidate state without mutating baseline data
  -> validate mode, bounds, progress and expected revision
  -> commit one camera state and path revision
  -> return one typed transition result
  -> on reset, rebuild state from the baseline fingerprint
  -> reject stale old-generation commands
  -> render from committed camera state
  -> acknowledge the first visible frame
```

## Files added

```txt
.agent/trackers/2026-07-12T02-10-14-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T02-10-14-04-00.md
.agent/architecture-audit/2026-07-12T02-10-14-04-00-camera-rail-baseline-authority-dsk-map.md
.agent/render-audit/2026-07-12T02-10-14-04-00-reset-camera-visible-path-gap.md
.agent/gameplay-audit/2026-07-12T02-10-14-04-00-drag-descend-reset-replay-loop.md
.agent/interaction-audit/2026-07-12T02-10-14-04-00-camera-input-command-result-map.md
.agent/camera-system-audit/2026-07-12T02-10-14-04-00-baseline-revision-reset-fidelity-contract.md
.agent/deploy-audit/2026-07-12T02-10-14-04-00-camera-baseline-fixture-gate.md
```

## Validation boundary

```txt
runtime code changed: no
camera behavior changed: no
render output changed: no
tests run: no
browser smoke run: no
branch created: no
pull request created: no
```