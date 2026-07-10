# Architecture Audit: Source Consumer Parity Host DSK Map

**Timestamp:** `2026-07-10T04-29-10-04-00`

## DSK read

```txt
Data:
  island, floor, foliage, clearing, campfire, smoke, grass, wind, and cloud descriptors
  route token ./src/main-cloudform.js?v=hero-cloud-4
  player pose, progress, key set, drag state
  legacy globalThis.CozyIsland diagnostics

Services:
  source-domain creation and sampling
  Three.js adapter creation
  browser input mutation
  camera rail and first-person camera projection
  movement validity policy
  grass instance projection
  cloud point generation and cache
  cloud drift update
  smoke/flame/sea animation
  renderer submission

Knowledge:
  source seeds and configured counts
  progress thresholds 0.85 and 0.985
  clearing radius and campfire keepout
  descriptor-to-render consumption expectations
  host-readback compatibility constraints
```

## Current boundary

The source-domain kits are separate, but `src/main-cloudform.js` composes the source graph and consumes it in one browser module. There is no normalized source profile, fingerprint, source snapshot, render ledger, or serializable host snapshot.

## Architecture finding

The next boundary should not move visuals. It should add proof records between the existing source descriptors and the existing browser consumers.

## Required next proof rows

```txt
route token row
source fingerprint row
scene source snapshot row
terrain/floor/shoreline/path/foliage/fence/campfire/smoke/grass/cloud consumption rows
input action frame rows
movement policy result rows
camera rail snapshot rows
grass placement to instance parity rows
cloud descriptor/cache/drift rows
render host snapshot row
legacy host compatibility row
```

## Safe next ledge

```txt
MyCozyIsland Source Consumer Parity Host Refresh + Input Fixture Gate
```
