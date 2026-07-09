# MyCozyIsland Host Proof Audit

**Generated:** `2026-07-09T08-29-38-04-00`

## Current host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache,
  getScrollProgress: () => progress
}
```

The existing host surface is useful but too narrow. It cannot explain route token, source profile, descriptor counts, input decisions, movement rejections, rail snapshots, grass render parity, cloud cache parity, or renderer state.

## Required additive host surface

```txt
globalThis.CozyIslandHost.getState()
  -> route
  -> source
  -> input
  -> movement
  -> rail
  -> grass
  -> clouds
  -> render
  -> legacy
```

## Required state shape

```txt
route:
  token: "hero-cloud-4"
  script: "./src/main-cloudform.js?v=hero-cloud-4"

source:
  profile
  fingerprint
  descriptor counts
  source snapshot

input:
  lastActionFrame
  actionResult
  bounded journal summary

movement:
  lastPolicyResult
  accepted/rejected counters
  rejection reason catalog

rail:
  mode
  progress
  eased progress
  camera position summary
  look target summary

grass:
  placement snapshot
  instance snapshot
  requested count
  rendered count

clouds:
  descriptor snapshot
  cache snapshot
  drift result summary

render:
  renderer/camera/scene snapshot
  object counts
  visual route version

legacy:
  cozyIslandPresent
  cloudContractPresent
  cloudPointCacheCount
```

## Fixture rows

```txt
route-token-row
source-fingerprint-row
scene-source-snapshot-row
wheel-action-row
pointer-action-row
movement-accepted-row
movement-rejected-boundary-row
movement-rejected-campfire-row
rail-start-row
rail-mid-row
rail-near-row
grass-placement-row
grass-instance-row
cloud-descriptor-row
cloud-cache-row
cloud-drift-row
render-host-row
legacy-host-row
```

## Central ledger contract

Every repo-local tracker should be mirrored into `LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md` and an `internal-change-log/` entry so future scheduled runs do not repeatedly select stale central state.
