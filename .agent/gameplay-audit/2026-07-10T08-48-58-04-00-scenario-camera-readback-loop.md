# Gameplay audit: scenario camera readback loop

Timestamp: `2026-07-10T08-48-58-04-00`

## Current gameplay loop

```txt
load route
  -> camera rail sequence starts in aerial reveal
  -> wheel descends through authored progress
  -> pointer drag orbits/look input
  -> WASD keys feed grounded exploration after landing
  -> scenario.tick(dt) advances clock and scenario state
  -> scenario.getRenderSnapshot() emits camera/world/clock render state
  -> main-cloudform copies camera position/lookAt into THREE camera
  -> world, foam, clouds, fog, post, and debug update per frame
```

## Existing proof

`tests/domain-smoke.mjs` proves deterministic source composition for selected rows:

```txt
terrain samples
shoreline samples
vegetation instances
rock instances
foam bands
cloud texture size
fog texture size
scenario tick into rail mode
```

## Missing proof

The browser host does not journal:

```txt
input action frame
scenario tick result
camera frame readback
rail-to-ground transition result
grounded movement accepted/rejected/clamped result
render-state copy result
```

## Risk

Camera or movement work can regress because browser behavior is only visible through runtime side effects. The domain smoke test proves the source can compose, not that the browser host consumes it correctly.

## Required fixture target

A DOM-free fixture should prove:

```txt
scenario starts in expected world id
initial camera mode is rail
representative wheel input changes progress with a result row
representative pointer drag emits clamped/accepted row
representative key input emits accepted/no-change row
scenario tick emits serializable state delta
camera frame readback includes position/lookAt/mode/progress
host state is JSON-safe
```
