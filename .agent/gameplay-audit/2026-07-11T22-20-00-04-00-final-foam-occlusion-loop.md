# Gameplay Audit: Final Foam Occlusion Loop

Timestamp: `2026-07-11T22-20-00-04-00`

## Summary

The player does not directly command foam, but camera movement changes which shoreline ribbons should be hidden by the island, rocks, vegetation, props, and terrain. The final foam pass is detached from the opaque scene depth, so the gameplay camera-to-visible-shoreline loop has no authoritative occlusion result.

## Current loop

```txt
wheel / drag / WASD
  -> camera rail or first-person state
  -> camera transform
  -> fused base scene renders opaque world and water
  -> rolling fog renders
  -> foam-only scene renders without shared depth
  -> foam alpha-composites over the completed atmosphere color
  -> visible frame
```

## Gameplay-facing risk

As the camera descends or moves inside the clearing, shoreline ribbons can pass behind:

```txt
island slopes
sea-floor rises
rocks
fences and props
vegetation and grass silhouettes
```

The physical foam pass has no admitted opaque-depth binding. The current documentation therefore cannot prove that these world objects occlude the final foam overlay.

## Authority split

```txt
camera/scenario
  owns view transform

world renderer
  owns opaque occluders and base depth

foam renderer
  owns shoreline ribbon geometry/material animation

post pipeline
  owns final alpha composition

missing owner
  decides whether each foam fragment is admitted against current opaque depth,
  water coverage, rolling fog, graph revision, and frame identity
```

## Required gameplay result

```txt
FoamVisibilityResult {
  frameId
  cameraRevision
  worldRevision
  graphRevision
  physicalPlanRevision
  foamBandId
  waterAdmission
  depthAdmission
  fogFactor
  visible
  rejectionReason
}
```

The runtime does not need to emit one result per fragment. The schema defines what the render plan and debug fixtures must be able to prove for representative samples.

## Required fixture route

```txt
camera rail high view
  -> all shoreline bands visible where unobstructed

camera rail low view
  -> island silhouette occludes far-side foam

first-person clearing
  -> terrain, fence, rocks, and vegetation occlude shoreline foam

fog states
  -> foam treatment follows the admitted fog contract
```

## Acceptance conditions

```txt
camera motion cannot reveal foam through opaque world geometry
foam remains final authored scene content
foam does not write depth
foam visibility uses current world/camera/attachment revisions
WebGPU and WebGL2 produce equivalent admission outcomes
visible-frame evidence cites the same result revision
```
