# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T12-50-35-04-00`

## Summary

The production route has an adaptive frame-budget controller, but no adaptive-quality authority. Decisions are tied to rendered-frame counts, consumers mutate directly, full recovery is incomplete, and no quality revision is correlated with a visible frame.

The earlier lifecycle, Core World reset, focus, materialization and render-commit gaps remain prerequisites.

## Adaptive policy gaps

```txt
versioned quality policy: absent
policy revision/fingerprint: absent
elapsed-time dwell windows: absent
refresh-rate parity: absent
visibility/suspension policy: absent
minimum-level dwell: absent
monotonic sample identity: absent
```

The current 90-frame degrade and 360-frame recovery counters react at different elapsed times on different refresh rates.

## Transition authority gaps

```txt
transition command: absent
command id/sequence: absent
expected quality revision: absent
session and renderer generation admission: absent
duplicate/stale rejection: absent
prepare phase: absent
atomic commit: absent
rollback: absent
typed transition result: absent
bounded transition journal: absent
```

## Consumer-state gaps

```txt
canonical effective quality state: absent
consumer-complete fingerprint: absent
cloud step acknowledgement: absent
fog step acknowledgement: absent
fog resolution getter/acknowledgement: absent
pixel ratio in quality observation: absent
consumer revision matching: absent
```

## Concrete recovery defect

`applyPerformanceLevel()` changes pixel ratio only when `level > 0`. Returning from level 1 to level 0 restores cloud steps, fog steps and fog resolution, but leaves the reduced pixel ratio active.

```txt
0 -> 1: pixel ratio reduced
1 -> 0: pixel ratio not restored
```

## Partial-commit risk

The route mutates consumers sequentially:

```txt
cloud steps
fog steps
fog resolution
pixel ratio
```

If a later mutation fails, earlier changes have no rollback path.

## Render-proof gaps

```txt
qualityRevision on render frame: absent
qualityFingerprint on render frame: absent
consumer acknowledgement set: absent
first visible frame receipt: absent
debug overlay effective-state parity: absent
```

The budget level is not proof that every render consumer matches that level.

## Lifecycle interaction gaps retained

- Performance callbacks are not fenced from reset, stop or disposal.
- The renderer animation loop has no session generation admission.
- The global host exposes the raw performance controller and renderer.
- Pagehide does not retire the full render graph.
- Old callbacks cannot be revoked after restart.

## Core World and render gaps retained

- Reset clears world definitions without re-registration.
- Focus updates return Boolean rather than a typed revision.
- Materialization lacks session/world/focus generation fencing.
- Provider readiness is not a canonical version set.
- Cell resources have no prepare/commit/rollback transaction.
- Visible cell rendering remains disconnected from prepared descriptors.
- No committed frame correlates world, renderer, environment and quality revisions.

## Validation gaps

```txt
30/60/90/120 Hz cadence parity
irregular frame schedule parity
hidden-tab and suspension policy
full 0 -> 1 -> 2 -> 1 -> 0 recovery
pixel-ratio restoration
consumer prepare rejection
consumer commit failure rollback
stale session/revision rejection
duplicate transition handling
reset/stop/dispose fencing
WebGPU/WebGL2 parity
effective-quality fingerprint stability
first visible frame acknowledgement
```

## Deployment blockers

```txt
frame-count-based dwell policy
partial direct consumer mutation
broken level-zero pixel-ratio recovery
no effective quality fingerprint
no transition result or rollback
no quality-frame acknowledgement
no adaptive-quality fixtures
```

## Not currently blocked by

- startup quality tier selection;
- the immutable quality descriptor table;
- cloud and fog step-scaling setters;
- fog-resolution scaling setter;
- the existing debug overlay;
- the 50 local kit catalog;
- the seven provider order;
- pinned Three.js and NexusEngine revisions;
- GitHub Pages configuration.
