# Architecture Audit: Host Proof Consumer Freeze DSK Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T05-30-27-04-00`

## Scope

Docs-only breakdown of the active `MyCozyIsland` route and the next host-proof cut. Runtime source was not changed.

## Current interaction loop

```txt
index.html
  -> canvas#game, #cloud-loader, #error
  -> src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN
  -> import local domain kits
  -> build source descriptors
  -> build Three.js render objects
  -> install browser input listeners
  -> frame loop mutates sea, smoke, flame, clouds, camera, and player state
  -> renderer.render(scene, camera)
  -> globalThis.CozyIsland exposes legacy cloud diagnostics
```

## Current domain map

```txt
route-domain
  owns index.html, route token, canvas, loader, error panel

source-descriptor-domain
  owns island, ocean floor, foliage, clearing, campfire, smoke, grass, wind, cloud descriptors

render-adapter-domain
  owns terrain/floor/water/foam/path/foliage/fence/campfire/smoke/grass/cloud Three.js object conversion

interaction-domain
  owns key set, wheel progress, pointer drag, yaw, pitch

movement-domain
  owns first-person threshold, forward vector, movement integration, validity check

camera-domain
  owns rail curve sampling and first-person camera handoff

grass-system-domain
  owns grass placement descriptor, wind descriptor, and InstancedMesh projection

cloud-system-domain
  owns cloud descriptor, point geometry cache, shader material, and drift update

host-diagnostics-domain
  owns legacy globalThis.CozyIsland

planned-host-proof-domain
  should own additive source/action/movement/rail/grass/cloud/render/host snapshots
```

## Services offered by current kits

```txt
ocean-island-landform-domain:
  create island source state
  sample island height
  sample island masks
  emit render contract heightfield/shoreline

ocean-floor-domain:
  create ocean floor source state
  emit ocean floor render contract

island-foliage-domain:
  create dense cozy island object graph
  emit path network and object list

fenced-clearing-domain:
  create clearing graph
  expose player anchor
  expose collision boundary and object exclusion zones

grass-object-domain:
  create grass patch placement contract
  honor path and clearing exclusions

grass-wind-domain:
  create grass wind descriptor

campfire-object-domain:
  create campfire object graph

smoke-particle-domain:
  create smoke particle descriptor

mattatz-clouds-domain:
  create cloud source state
  emit cloud render contract

cozy-hero-cloud-form-kit:
  present through local cloud-form route and cloud render descriptors
```

## Implemented kits

```txt
ocean-island-landform-domain
island-foliage-domain
ocean-floor-domain
grass-object-domain
grass-wind-domain
campfire-object-domain
smoke-particle-domain
fenced-clearing-domain
mattatz-clouds-domain
cozy-hero-cloud-form-kit
```

## Runtime-implied kits

```txt
cozy-static-shell-kit
cozy-cloud-loader-kit
cozy-error-panel-kit
cozy-cloudform-entry-kit
cozy-route-script-token-kit
cozy-three-render-host-kit
cozy-scene-composition-kit
cozy-terrain-render-kit
cozy-ocean-floor-render-kit
cozy-water-plane-kit
cozy-shoreline-foam-kit
cozy-path-render-kit
cozy-foliage-render-kit
cozy-fence-render-kit
cozy-campfire-render-kit
cozy-smoke-render-kit
cozy-grass-instanced-render-kit
cozy-hero-cloud-point-cache-kit
cozy-cloud-drift-frame-kit
cozy-resize-consumer-kit
cozy-keyboard-input-kit
cozy-wheel-progress-kit
cozy-pointer-look-kit
cozy-camera-rail-kit
cozy-first-person-movement-kit
cozy-movement-validity-kit
cozy-render-frame-loop-kit
cozy-legacy-host-diagnostics-kit
```

## Next-cut DSK map

```txt
host-proof-domain
├─ route-source-subdomain
│  ├─ route-token-readback-kit
│  ├─ source-profile-kit
│  ├─ source-fingerprint-kit
│  └─ scene-source-snapshot-kit
├─ input-subdomain
│  ├─ browser-input-action-frame-kit
│  ├─ action-result-kit
│  └─ input-journal-kit
├─ movement-subdomain
│  ├─ movement-policy-result-kit
│  └─ camera-rail-snapshot-kit
├─ grass-readback-subdomain
│  ├─ grass-placement-snapshot-kit
│  └─ grass-instance-snapshot-kit
├─ cloud-readback-subdomain
│  ├─ hero-cloud-descriptor-snapshot-kit
│  ├─ hero-cloud-cache-snapshot-kit
│  └─ cloud-drift-result-kit
├─ render-readback-subdomain
│  └─ render-host-snapshot-kit
└─ host-state-subdomain
   ├─ cozy-island-host-snapshot-kit
   └─ browser-consumer-fixture-kit
```

## Architecture finding

`src/main-cloudform.js` is currently the route source, runtime host, renderer, input controller, movement controller, camera controller, and diagnostic host. The next implementation should not extract everything at once; it should add pure host-proof helpers and attach additive readback to the browser route.

## Next safe implementation boundary

```txt
Add host-proof source modules and DOM-free fixture rows first.
Then splice the additive CozyIslandHost into src/main-cloudform.js.
Then wire npm run check.
```
