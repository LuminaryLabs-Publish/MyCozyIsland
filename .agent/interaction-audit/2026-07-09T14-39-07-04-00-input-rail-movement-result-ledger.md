# Interaction Audit: Input Rail Movement Result Ledger

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-39-07-04-00`

## Current interaction flow

```txt
resize -> renderer/camera projection update
keydown/keyup -> keys Set mutation
wheel -> progress mutation
pointerdown/up/move -> drag state and yaw/pitch mutation
progress < 0.985 -> rail camera mode
progress >= 0.985 -> first-person movement mode
fp(dt) -> movement vector -> valid(next) -> player position mutation or no-op
```

## Interaction domains

```txt
resize-consumer-domain
keyboard-input-domain
wheel-progress-domain
pointer-drag-domain
pointer-look-domain
scroll-progress-domain
camera-rail-domain
first-person-movement-domain
movement-validity-domain
input-action-result-domain-next
movement-policy-result-domain-next
input-journal-domain-next
```

## Gap

Input currently mutates local state directly. There is no durable action-result row for:

```txt
wheel progress accepted / clamped
pointer yaw accepted
pointer pitch accepted / clamped
pre-first-person yaw-only pointer move
movement attempted before unlock
movement accepted inside clearing
movement rejected outside clearing
movement rejected inside campfire keepout
rail camera sample emitted
first-person camera sample emitted
```

## Next proof

Add a DOM-free action fixture that feeds synthetic input frames into pure policy functions and asserts accepted/rejected rows before wiring any browser-facing `CozyIslandHost` readback.
