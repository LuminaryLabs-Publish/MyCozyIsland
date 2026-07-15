# Render audit: touch-control visible-frame gap

**Timestamp:** `2026-07-15T01-04-57-04-00`  
**Status:** `device-control-surface-action-coverage-authority-audited`

## Summary

The game can render a complete WebGPU/WebGL2 adventure frame on a narrow touch viewport while presenting no visible actionable movement or interaction controls. The existing first-frame receipt proves rendering, not controllability.

## Plan ledger

**Goal:** require the first admitted touch-control surface and the first matching action-effect frame before declaring touch play ready.

- [x] Inspect responsive HUD and control CSS.
- [x] Inspect touch/pointer event projection.
- [x] Inspect startup first-frame publication.
- [x] Identify missing control-frame evidence.
- [ ] Implement and execute touch visual fixtures.

## Current visible state

```txt
canvas: visible and pointer-capturing
world: rendering
HUD: visible
hotbar: visible but pointer-inert
instructions: hidden on narrow viewport
touch movement controls: absent
touch interaction controls: absent
touch seed controls: absent
```

`startupHost.presentFirstFrame()` runs after the world render call and before any proof that the active device has a complete control surface.

## Required evidence

```txt
ControlSurfaceRevision
DeviceCapabilityRevision
ActionMapRevision
visible semantic control descriptors
layout and safe-area receipt
pointer-region ownership receipt
FirstDeviceControlSurfaceFrameAck
FirstDeviceActionEffectFrameAck
```

## Acceptance

A mobile browser artifact must show the admitted movement, look and action surfaces, then demonstrate that one touch command reaches `cozyInput`, changes the matching authoritative state revision and appears in the next rendered HUD/world frame.