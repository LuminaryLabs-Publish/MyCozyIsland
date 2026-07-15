# Known gaps: MyCozyIsland device-control action coverage

**Timestamp:** `2026-07-15T01-04-57-04-00`  
**Status:** `device-control-surface-action-coverage-authority-audited`

## Summary

The source does not expose a complete touch action surface. Rendering and camera drag can work on touch devices while core traversal and farming actions remain unreachable.

## Plan ledger

**Goal:** separate confirmed keyboard/pointer behavior from unproved touch playability, semantic controls and action-effect convergence.

- [ ] Device capability and viewport policy.
- [ ] Complete action-map descriptors.
- [ ] Semantic touch-control surfaces.
- [ ] Gesture ownership and cancellation.
- [ ] Device admission and visible-frame results.
- [ ] Browser/build/Pages device parity.

## Action coverage gaps

```txt
touch movement axes: absent
touch sprint: absent
touch interact: absent
touch seed cycle: absent
touch direct seed selection: absent
touch intro skip: absent
complete DeviceActionMap: absent
DeviceControlAdmissionResult: absent
```

## Presentation gaps

```txt
narrow-screen control instructions: hidden
movement control surface: absent
interaction control surface: absent
sprint control surface: absent
seed slots: non-actionable divs
hotbar pointer policy: pointer-events:none
semantic labels and focus behavior: absent for touch actions
safe-area control layout receipt: absent
```

## Gesture gaps

```txt
movement-stick pointer owner: absent
look-region pointer owner: implicit full canvas
multi-touch arbitration: absent
control generation identity: absent
stale gesture rejection: absent
pointer-cancel held-action settlement: absent
viewport/orientation retirement result: absent
```

## Frame gaps

```txt
FirstDeviceControlSurfaceFrameAck: absent
FirstDeviceActionEffectFrameAck: absent
device/action revision correlation: absent
semantic control artifact: absent
mobile HUD/world action artifact: absent
```

## Validation gaps

```txt
coarse-pointer browser fixture: absent
phone portrait fixture: absent
phone landscape fixture: absent
tablet fixture: absent
hybrid-input fixture: absent
multi-touch movement/look fixture: absent
touch interaction and seed fixture: absent
source/build/Pages parity: absent
```

## Retained gaps

```txt
embed-context route admission
preload suspension lease and resumed-frame authority
postcard atlas cell and backend parity
menu startup failure fallback
complete menu resource/listener retirement
pagehide and BFCache policy
adaptive quality transitions
portable save durability
browser input generation authority
bounded public capabilities
```

## Dependency order

```txt
action map and device capability
  -> semantic control layout
  -> gesture arbitration
  -> normalized command production
  -> DeviceControlAdmissionResult
  -> control/action frame acknowledgements
  -> source/build/Pages parity
```

No mobile, touch-control or production-readiness claim is made.