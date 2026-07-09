# Deploy Audit: Browser Consumer Fixture Check Wire

**Timestamp:** `2026-07-09T08-11-12-04-00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

## Current deploy / validation surface

`package.json` currently exposes only:

```txt
npm start -> python3 -m http.server 8080
```

There is no `npm run check`, no DOM-free fixture script, and no CI gate proving the route/source/host state contract.

## Current static route

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
```

## Required validation wire

```txt
scripts/my-cozy-island-browser-consumer-fixture.mjs
  -> import pure host-proof helpers
  -> build source profile/fingerprint from static descriptors
  -> simulate browser input action frames without DOM
  -> assert movement policy accepted/rejected rows
  -> assert camera rail snapshot rows
  -> assert grass source/render count rows
  -> assert cloud descriptor/cache/drift rows
  -> assert render host snapshot shape
  -> assert CozyIslandHost snapshot shape

package.json
  -> "check": "node scripts/my-cozy-island-browser-consumer-fixture.mjs"
```

## Required fixture rows

```txt
route-token-hero-cloud-4
source-fingerprint-stable
scene-source-snapshot-descriptor-counts
input-wheel-action-frame
input-pointer-action-frame
movement-locked-before-handoff
movement-accepted-inside-clearing
movement-rejected-outside-clearing
movement-rejected-campfire-keepout
rail-snapshot-start
rail-snapshot-mid
rail-snapshot-near-handoff
first-person-camera-snapshot
grass-requested-140-patches
grass-instance-count-matches-placement
cloud-descriptor-cache-counts
cloud-drift-result-frame
render-host-snapshot-shape
cozy-island-host-snapshot-shape
legacy-CozyIsland-preserved
```

## Deployment caution

Do not add a build process that changes the static route. The app is currently a direct static page; validation should be additive.

## Main finding

The deploy gate should prove the current browser route contract before any visual changes. `npm run check` should become the source-of-truth smoke for host-state proof.
