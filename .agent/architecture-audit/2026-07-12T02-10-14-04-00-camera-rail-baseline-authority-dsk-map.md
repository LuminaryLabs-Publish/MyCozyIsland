# Architecture Audit: Camera Rail Baseline Authority DSK Map

Timestamp: `2026-07-12T02-10-14-04-00`

## Summary

The current `camera-rail-sequence-kit` owns authored rail points, mutable orbit state, progress, first-person movement, input adapters, descriptor projection, and reset inside one closure. The principal architecture defect is that authored baseline objects and session mutations are not separated.

## Plan ledger

**Goal:** define one parent domain that admits an immutable terrain-bound baseline and composes command, transition, reset, revision, journal, and frame-proof kits around it.

- [x] Map current responsibilities.
- [x] Identify the shared mutable boundary.
- [x] Separate baseline, session state, commands, results, reset, readback, and proof.
- [x] Define candidate kits and ownership.
- [ ] Implement the domain later.

## Current composition

```txt
createCameraRailSequence(terrain)
  -> creates authored rail positions and look targets
  -> stores mutable progress, yaw, pitch and player
  -> stores pressed-key set
  -> accepts wheel, drag, key and clear calls
  -> mutates authored points during rail drag
  -> samples camera descriptors
  -> resets only part of owned state
```

## Required parent domain

```txt
cozy-island-camera-rail-baseline-authority-domain
```

## Proposed composition

```txt
cozy-island-camera-rail-baseline-authority-domain
  -> camera-rail-baseline-descriptor-kit
  -> camera-rail-baseline-fingerprint-kit
  -> camera-rail-path-revision-kit
  -> camera-state-revision-kit
  -> camera-input-command-kit
  -> camera-input-admission-kit
  -> camera-progress-command-kit
  -> rail-orbit-command-kit
  -> first-person-look-command-kit
  -> camera-reset-command-kit
  -> camera-reset-result-kit
  -> camera-transition-result-kit
  -> stale-camera-command-rejection-kit
  -> camera-descriptor-provenance-kit
  -> camera-input-journal-kit
  -> first-visible-camera-frame-ack-kit
  -> rail-reset-fidelity-fixture-kit
  -> repeated-drag-drift-fixture-kit
  -> browser-pointer-wheel-parity-smoke-kit
```

## Ownership boundaries

```txt
baseline authority owns
  authored position points
  authored look points
  thresholds and FOV policy
  eye height
  terrain revision
  baseline ID and fingerprint

session camera state owns
  progress
  orbit offset or derived path transform
  yaw and pitch
  player position
  pressed keys
  path revision
  camera revision
  reset generation

browser adapters own
  event observation only
  pointer identity and coordinates
  wheel delta and key state
  conversion to typed commands

render projection owns
  applying an admitted descriptor
  frame correlation
  first-visible-camera-frame acknowledgement
```

## Required invariants

```txt
authored baseline objects are immutable after admission
session input cannot mutate baseline points
one command consumes one expected camera revision
one accepted command publishes one next camera revision
reset reconstructs state from the admitted baseline
old reset generations cannot mutate current state
camera descriptors cite baseline, path, reset and state revisions
visible frames cite the descriptor revision used for rendering
```

## Migration path

```txt
1. extract pure baseline construction
2. deep-freeze baseline points and looks
3. introduce mutable CameraSessionState separate from baseline
4. represent rail orbit as derived transform, not point mutation
5. route wheel, drag, key and clear through CameraInputCommand
6. add typed transition and reset results
7. add revisioned descriptor projection
8. add browser and headless fixtures
9. add visible-frame acknowledgement
```

## Validation gate

```txt
baseline deep-freeze fixture
initial/post-reset fingerprint equality
100-cycle repeated drag/reset zero-drift fixture
stale command rejection fixture
multi-pointer isolation fixture
rail/FPS transition fixture
browser/headless result parity
first visible reset-frame acknowledgement
```