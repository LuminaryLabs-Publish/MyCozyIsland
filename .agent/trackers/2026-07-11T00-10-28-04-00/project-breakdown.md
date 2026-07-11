# Project Breakdown: MyCozyIsland Camera Rail Reset Authority

Timestamp: `2026-07-11T00-10-28-04-00`

## Plan ledger

**Goal:** document the active interaction loop, domains, kit services, and the smallest source-backed correctness gap after the runtime lifecycle boundary.

- [x] Compared the full `LuminaryLabs-Publish` inventory with the central ledger.
- [x] Excluded `TheCavalryOfRome`.
- [x] Confirmed all nine eligible repos were tracked and had root `.agent` state.
- [x] Selected only `LuminaryLabs-Publish/MyCozyIsland` by the oldest central-ledger fallback.
- [x] Read the current route, camera sequence, environment clock, kit catalog, and Node smoke.
- [x] Identified the interaction loop.
- [x] Identified all active domain groups.
- [x] Catalogued all 50 kits and service groups.
- [x] Documented the camera-rail authored-baseline/reset defect.
- [x] Refreshed required root `.agent` files.
- [x] Added timestamped architecture, render, gameplay, interaction, sequence-authority, and deploy audits.
- [x] Kept runtime source unchanged.
- [x] Created no branch or pull request.

## Selected repository

```txt
LuminaryLabs-Publish/MyCozyIsland
```

Selection basis: all eligible repos were already documented; central `MyCozyIsland` remained the oldest direct ledger at `2026-07-10T22-29-21-04-00`.

## Interaction loop

```txt
route boot
  -> catalog validation
  -> renderer/quality startup
  -> deterministic domain composition
  -> GPU/render resource construction
  -> browser input registration
  -> animation loop
  -> scenario clock and camera tick
  -> world/foam update
  -> performance sample
  -> post render
  -> debug/host projection
```

## Main finding

The camera rail stores authored positions as mutable point objects. Pointer drag before first-person mode changes those points in place. Reset restores progress, orientation, key state, and player state but not the control points, so post-reset camera output can differ from construction-time output.

## Next safe ledge

```txt
MyCozyIsland Camera Rail Baseline Authority
+ Drag/Reset Fidelity Fixture Gate
```

Runtime lifecycle remains the first implementation gate. Camera reset is the next bounded correctness slice because future session restart will depend on it.