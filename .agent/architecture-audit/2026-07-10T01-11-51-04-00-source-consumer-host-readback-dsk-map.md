# Architecture Audit: Source Consumer Host Readback DSK Map

**Timestamp:** `2026-07-10T01-11-51-04-00`

## Current architecture

`MyCozyIsland` is a static browser route. It has modular source-domain kits but a monolithic browser consumer in `src/main-cloudform.js`.

## DSK/domain flow

```txt
index.html
  -> route token ./src/main-cloudform.js?v=hero-cloud-4
  -> source-domain kits create descriptors
  -> main-cloudform adapts descriptors into Three.js objects
  -> browser event handlers mutate runtime state directly
  -> frame loop mutates animation, cloud drift, camera, and render submission
  -> globalThis.CozyIsland exposes limited legacy diagnostics
```

## Source domains

```txt
island landform
ocean floor
path network
foliage graph
fenced clearing
campfire object graph
smoke particle descriptor
grass wind descriptor
grass patch placement
cloud state and hero cloud render contract
```

## Consumer domains

```txt
terrain mesh adapter
floor mesh adapter
water adapter
foam adapter
path adapter
foliage adapter
fence adapter
campfire adapter
smoke point adapter
grass InstancedMesh adapter
cloud point cache adapter
keyboard, wheel, and pointer consumers
camera rail consumer
movement policy consumer
render frame consumer
legacy host diagnostics consumer
```

## Proof domains missing

```txt
route-token readback
source profile
source fingerprint
scene source snapshot
input action frame
input result
input result journal
movement policy result
camera rail snapshot
grass placement snapshot
grass instance snapshot
cloud descriptor snapshot
cloud cache snapshot
cloud drift result
render consumption ledger
render host snapshot
CozyIslandHost snapshot
browser consumer fixture
central ledger readback
```

## Architecture finding

Do not rewrite the scene first. The architecture already has useful source kits. Add proof at the source-to-consumer boundary so future cloud, fog, grass, renderer, and camera upgrades can be validated without guessing.
