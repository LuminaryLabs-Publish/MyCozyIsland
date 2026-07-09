# Render Audit: Render / Cloud / Grass Consumer Fixture

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-20-00-04-00`

## Current render path

```txt
canvas#game
  -> new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: high-performance })
  -> pixel ratio capped at 1.5
  -> ACES tone mapping
  -> scene background and exponential fog
  -> hemisphere + directional sun
  -> floor, terrain, water, foam, path, foliage, fence, campfire, smoke, grass, clouds
  -> frame mutates sea, smoke, flame, cloud positions
  -> renderer.render(scene, camera)
```

## Render services

```txt
terrain mesh from island heightfield
floor mesh from ocean-floor heightfield
water plane projection
shoreline foam tube projection
path mesh projection
foliage object projection
fence object projection
campfire/flame/light projection
smoke particle projection
grass InstancedMesh projection
hero cloud point-cloud projection
rail or first-person camera projection
render frame submission
```

## Readback gaps

```txt
No RenderHostSnapshot exists.
No scene object count is exposed.
No grass instance count is exposed through a host snapshot.
No hero cloud point count/cache count is exposed through a stable host snapshot.
No route token is bundled into render readback.
No render fixture proves descriptors were consumed.
```

## Required fixture rows

```txt
render-host-start:
  routeToken: hero-cloud-4
  renderer: webgl
  toneMapping: ACESFilmicToneMapping
  pixelRatioCap: 1.5

render-scene-descriptor-consumption:
  terrain: present
  floor: present
  grass: present
  cloudPointGroups: present

render-camera-modes:
  rail: progress < 0.985
  firstPerson: progress >= 0.985
```

## Main render finding

The route can draw the desired scene, but render acceptance cannot be consumed by automation until it emits stable host snapshots separate from Three.js objects.
