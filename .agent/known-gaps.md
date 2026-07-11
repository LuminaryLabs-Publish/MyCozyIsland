# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T16-10-58-04-00`

## Summary

Adaptive quality can degrade and recover its numeric level, but it does not own a complete quality transaction. Recovery to level 0 fails to restore renderer pixel ratio, transition timing depends on qualifying frame counts, and four render consumers are mutated sequentially without rollback or a committed-frame receipt.

Startup, runtime-session, Core World, render-commit and environment authority gaps remain prerequisites.

## Concrete adaptive-quality defect

```txt
level 1 -> level 0
cloud step scale: restored
fog step scale: restored
fog resolution scale: restored
renderer pixel ratio: not restored
reported performance level: 0
visible resolution: still degraded
```

Cause:

```txt
renderer.setPixelRatio(...) executes only when level > 0
```

## Policy gaps

```txt
versioned quality policy: absent
immutable level-0 applied baseline: absent
elapsed-time degrade threshold: absent
elapsed-time recovery threshold: absent
visibility sample policy: absent
long-stall policy: absent
cadence parity proof: absent
backend-specific mutable capability set: absent
startup-fixed versus runtime-mutable declaration: absent
```

## Transition gaps

```txt
transition command: absent
transition ID: absent
quality revision: absent
candidate plan: absent
admission result: absent
consumer command/result contract: absent
atomic commit: absent
rollback: absent
stale-result rejection: absent
idempotent duplicate handling: absent
partial-failure classification: absent
```

## Consumer gaps

```txt
cloud steps typed acknowledgement: absent
fog steps typed acknowledgement: absent
fog resolution typed acknowledgement: absent
pixel ratio typed acknowledgement: absent
actual pixel-ratio readback: absent
actual fog-resolution readback: absent
consumer clamp observation: absent
rebuild-required classification: absent
consumer failure injection: absent
```

## Render and observation gaps

```txt
quality revision in render state: absent
quality fingerprint in frame state: absent
first visible frame for revision: absent
committed versus pending transition projection: absent
actual renderer pixel ratio in debug state: absent
actual fog resolution in debug state: absent
per-consumer result in diagnostics: absent
bounded transition journal: absent
```

## Lifecycle gaps

```txt
runtime session identity: absent
animation-loop lease: absent
visibility baseline reset: absent
quality work cancellation on stop: absent
quality revision reset on restart: absent
stale callback fencing: absent
```

## Retained upstream gaps

```txt
browser startup admission and rollback
runtime session lifecycle
Core World reset and re-prepare
focus transaction authority
materialization generation and readiness
renderer cell commit and disposal
camera baseline authority
dynamic environment frame authority
committed visible-frame acknowledgement
```

## Missing fixtures

```txt
30/60/120 Hz cadence parity
level 0 -> 1 -> 0 full recovery
level 0 -> 1 -> 2 -> 1 -> 0 full recovery
pixel-ratio baseline restoration
partial consumer failure rollback
consumer clamp result
hidden-tab sampling
long-stall sampling
resize during transition
stale revision rejection
WebGPU/WebGL2 capability parity
visible-frame quality revision parity
Pages quality smoke
```

## Risk ranking

```txt
P0  startup failure and resource rollback authority
P0  runtime session ownership and stale callback fencing
P1  Core World lifecycle and render commit authority
P1  dynamic environment coherence
P1  adaptive quality false-recovery and partial-commit risk
P2  detached diagnostic completeness
```

## Non-goals of this documentation run

```txt
no runtime code changed
no performance thresholds changed
no renderer behavior changed
no package scripts changed
no dependencies changed
no workflow or deployment changed
```
