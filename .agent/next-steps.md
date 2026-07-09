# My Cozy Island Next Steps

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-09T17-48-20-04-00`

## Next safe ledge

```txt
MyCozyIsland Source/Consumer Parity Ledger + Browser Input Result Fixture Gate
```

Build an additive proof layer around the current route. Do not rewrite the visible scene, change the active route token, or replace the existing source kits.

## Preserve

```txt
index.html shell
./src/main-cloudform.js?v=hero-cloud-4 route token
Three.js 0.160.0 CDN import
all explicit source-domain kits
deterministic source seeds and counts
globalThis.CozyIsland legacy surface
progress thresholds 0.85 and 0.985
clearing radius and 2.35 campfire keepout
current grass and cloud visible behavior
```

## Add

```txt
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/input-action-frame.js
src/host-proof/input-result.js
src/host-proof/input-result-journal.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/grass-placement-snapshot.js
src/host-proof/grass-instance-snapshot.js
src/host-proof/cloud-descriptor-snapshot.js
src/host-proof/cloud-cache-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/render-consumption-ledger.js
src/host-proof/render-host-snapshot.js
src/host-proof/cozy-island-host-snapshot.js
scripts/cozy-island-browser-consumer-fixture.mjs
```

## Required result vocabulary

```txt
status: accepted | rejected | no-change
reason:
  progress-updated
  progress-clamped-min
  progress-clamped-max
  pointer-look-first-person
  pointer-yaw-rail
  pointer-inactive-transition-band
  pointer-not-dragging
  movement-accepted
  movement-rejected-clearing-boundary
  movement-rejected-campfire-keepout
  movement-no-input
```

## Fixture rows

```txt
route token and source fingerprint
stable scene-source snapshot
island heightfield resolution and sample count
shoreline segment count
foliage/path source counts
wheel accepted and clamp rows
pointer accepted, clamped, inactive-range, and not-dragging rows
movement accepted and rejected rows with stable reasons
camera rail samples at fixed progress values
first-person threshold transition at 0.985
grass requested/placed/instanced parity
grass batch descriptor parity
cloud descriptor/cache hit/miss/stale parity
cloud fixed-dt drift result
render-consumption ledger for every source family
renderer/scene/camera snapshot
legacy CozyIsland compatibility parity
```

## Host surface

Add an additive surface without removing the current legacy object:

```txt
globalThis.CozyIslandHost = {
  getState(),
  getSourceProfile(),
  getInputJournal(),
  getRenderConsumptionLedger(),
  restartProofState()
}
```

All outputs must be JSON-serializable and must not expose live Three.js objects.

## Validation gate

Add:

```txt
npm run fixture:consumer
npm run check
```

`npm run check` should execute the consumer fixture and any existing static validation without requiring a browser or GPU.

## Stop condition

Stop the ledge when the fixture passes, `CozyIslandHost.getState()` is serializable and additive, source-to-render rows reconcile, accepted/rejected input reasons are stable, legacy diagnostics remain compatible, and no visible scene behavior has changed.