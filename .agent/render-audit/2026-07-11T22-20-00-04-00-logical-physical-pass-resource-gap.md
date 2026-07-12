# Render Audit: Logical and Physical Pass Resource Gap

Timestamp: `2026-07-11T22-20-00-04-00`

## Summary

The six-pass logical graph and four-group physical pipeline agree on broad ordering but not on explicit resource binding. The final foam descriptor names depth, water, shoreline, and fog resources that the physical foam pass does not receive.

## Logical order

```txt
background
opaque-world
water-composite
atmosphere-composite
foam-overlay
output-transform
```

## Reported physical order

```txt
base-scene-fused:background+opaque-world+water-composite
atmosphere-composite
foam-overlay
output-transform
```

## Physical construction

```txt
scenePass
  scene + camera
  OPAQUE_WORLD + WATER_SURFACE + CLOUD_VOLUME
  color + depth

volumetricPass
  scene + camera
  FOG_VOLUME
  depthBuffer: false
  fog material samples scenePass depth

foamPass
  foam-only scene + camera
  FOAM_OVERLAY
  depthBuffer: false
  alpha-composed over atmosphere result
```

## Declared foam inputs

```txt
atmosphere-composited-color
water-mask
water-surface-depth
shoreline-distance
foam-state
fog-transmittance
opaque-depth as depth source
```

## Bound foam inputs visible in source

```txt
foam pass color/alpha output
camera transform
scene fog configuration
foam geometry/material state
```

No explicit binding exists for:

```txt
opaque-depth
water-mask
water-surface-depth
rolling-fog transmittance
```

## Depth contradiction

```txt
foam material: depthTest = true
foam pass: depthBuffer = false
logical depth source: opaque-depth
physical shared-depth attachment: absent
```

The final foam scene cannot prove depth rejection against the opaque island, sea floor, rocks, props, or vegetation. A material flag alone is not a depth-provenance contract.

## Fog contradiction

The logical graph says atmosphere produces `fog-transmittance` and foam consumes it. The physical pipeline computes blurred fog color and adds it to the base scene, but it does not produce or bind a transmittance resource to the foam pass. `foamScene.fog = scene.fog` covers Three.js distance fog, not the rolling volumetric pass described by the graph.

## Water contradiction

The logical graph says water produces `water-mask` and `water-surface-depth`. The physical water is fused into the main scene pass and does not expose named mask or water-depth resources. The foam renderer uses authored shoreline ribbons, but the graph does not classify that as an alternate physical implementation.

## Readback gap

```txt
getPassOrder()
  hard-coded logical strings

getPhysicalPassOrder()
  hard-coded physical strings

CozyIsland.getState()
  returns both arrays
  does not return attachment identities, bindings, compile results, or pass receipts
```

## Required render evidence

```txt
compiled physical plan
named color/depth/mask/transmittance resources
producer and consumer binding table
backend and surface revision
pass execution receipts
final output identity
first visible frame receipt
```

## Required browser captures

```txt
foam behind island ridge
foam behind boulder
foam behind fence/prop
foam behind vegetation
foam at water/shore boundary
foam in zero, medium, and dense rolling fog
WebGPU and WebGL2 comparison
resize and quality-tier transition comparison
```

## Acceptance conditions

```txt
foam never appears through admitted opaque occluders
foam water admission matches the declared or revised contract
rolling-fog treatment matches the declared or revised contract
physical attachment bindings are inspectable
reported order derives from the actual compiled plan
visible frame cites the current plan and resources
```
