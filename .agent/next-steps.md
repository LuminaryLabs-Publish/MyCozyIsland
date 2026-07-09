# My Cozy Island Next Steps

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-09T17-38-53-04-00`

## Next safe ledge

```txt
MyCozyIsland Source/Consumer Parity Ledger + Input Result Fixture Gate
```

Build an additive proof layer around the current route. Do not rewrite scene visuals.

## Preserve

```txt
index.html shell
./src/main-cloudform.js?v=hero-cloud-4 route token
Three.js 0.160.0 CDN import
all explicit source-domain kits
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

## Fixture rows

```txt
route token and source fingerprint
stable scene-source snapshot
wheel accepted and clamp rows
pointer accepted, clamped, and inactive-range rows
movement accepted and rejected rows with reasons
camera rail samples at fixed progress values
first-person threshold transition
grass source/instance parity
cloud descriptor/cache hit/miss/stale parity
cloud drift fixed-dt result
render-host snapshot
legacy CozyIsland parity
```

## Validation gate

Add:

```txt
npm run fixture:consumer
npm run check
```

## Stop condition

Stop the ledge when the fixture passes, `CozyIslandHost.getState()` is serializable and additive, legacy diagnostics remain compatible, and no visible scene behavior has changed.
