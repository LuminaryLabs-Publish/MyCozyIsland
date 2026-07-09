# Host Proof Audit: Host State Source Readback Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-26-56-04-00`

## Current host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache,
  getScrollProgress
}
```

This legacy surface is useful but too narrow. It does not expose route token, source fingerprint, source descriptor summaries, input/action results, movement policy decisions, rail snapshots, render host readback, or fixture rows.

## Additive target surface

```txt
globalThis.CozyIslandHost = {
  getState() => {
    route,
    source,
    input,
    movement,
    cameraRail,
    grass,
    clouds,
    render,
    validation
  }
}
```

## Required state sections

```txt
route:
  - routeToken: hero-cloud-4
  - html: index.html
  - source: src/main-cloudform.js

source:
  - sourceProfile
  - sourceFingerprint
  - sceneSourceSnapshot

input:
  - latest BrowserInputActionFrame
  - action result journal tail

movement:
  - movement policy result
  - accepted/rejected reason summary

cameraRail:
  - progress
  - easedProgress
  - mode: rail | first-person
  - position/look snapshots

grass:
  - placement snapshot
  - instance snapshot

clouds:
  - descriptor snapshot
  - cache snapshot
  - drift result

render:
  - renderer/camera/scene summary
  - frame count

validation:
  - fixtureAvailable
  - browserConsumerFixtureRows
```

## Fixture expectation

The first fixture should run without DOM/browser globals and should prove stable row shapes for route/source, input/action, movement policy, rail, grass, cloud, render, and host snapshot output.

## Main finding

Host proof must be additive. Do not remove or rename `globalThis.CozyIsland` while adding `CozyIslandHost.getState()`.
