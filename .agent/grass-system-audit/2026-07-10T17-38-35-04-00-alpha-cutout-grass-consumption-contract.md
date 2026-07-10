# Grass System Audit: Alpha-Cutout Consumption Contract

Timestamp: 2026-07-10T17-38-35-04-00

## Source-to-render chain

```txt
terrain surface + biome field + ground contact + seeded placement
  -> vegetation-placement-domain-kit
  -> vegetation instances
  -> byType["grass-patch"]
  -> render snapshot
  -> layered grass wrapper
  -> instance transforms/colors
  -> one instanced grass mesh
```

## Source row shape consumed

The current adapter assumes each row provides:

```txt
position.x
position.y
position.z
rotation
scale
phase
optional tint
```

No row validation is performed before the values are applied to an `Object3D` transform and instance color.

## Current visual policy

```txt
layers: 3
angles: 0, 60, 120 degrees
widths: 0.82, 0.94, 0.76
heights: 0.92, 1.08, 0.84
atlas panels: 3
atlas panel size: 64 x 128
blade counts per panel: 15, 17, 19
colors: #4f963f, #69b84f, #84ca63
alpha clip: 0.52
lighting: unlit
shadows: disabled
fog: enabled
depth write: enabled
animation: static
```

## Consumption result required

```txt
{
  status,
  sourceType: "grass-patch",
  sourceCount,
  acceptedCount,
  rejectedCount,
  rejectedRows,
  suppressedLegacyCount,
  renderedInstanceCount,
  duplicateConsumerDetected,
  policyId,
  policyVersion
}
```

The critical invariant is:

```txt
sourceCount = acceptedCount + rejectedCount
renderedInstanceCount = acceptedCount
suppressedLegacyCount = acceptedCount
duplicateConsumerDetected = false
```

## Wind decision

Placement rows already carry phase and the snapshot contains a vegetation-wind descriptor. The current adapter uses phase only to derive static height variation. Before adding motion, choose one explicit mode:

```txt
static_performance_mode
cpu_matrix_update_mode
gpu_vertex_wind_mode
```

The present implementation should report `static_performance_mode` instead of exposing an ambiguous empty update.

## LOD decision

The current mesh is created once from all startup rows and relies on object-level frustum culling. There is no per-instance distance culling or runtime density change.

That is acceptable as a documented startup policy. Do not add LOD complexity without measuring instance count, visible count, frame cost, and transition behavior.

## Ground-contact decision

Ground contact is resolved before rendering. The adapter adds a fixed `0.012` Y offset. This offset should be part of the render policy so fixture output can prove it is intentional and stable.

## Tint decision

Each instance color is white multiplied by `instance.tint ?? 1`, while geometry already contains per-layer colors. The combined color path should be documented as:

```txt
final vertex color = layer vertex color * instance tint * white material base
```

## Missing proof

- no descriptor fingerprint
- no source row validation
- no rejection vocabulary
- no exact accepted/rendered count readback
- no duplicate-consumer proof
- no static/wind mode declaration
- no LOD mode declaration
- no resource lifecycle
- no deterministic pure fixture

## Next safe ledge

```txt
MyCozyIsland Layered Grass Renderer Authority + Lifecycle Fixture Gate
```

The grass system should not receive more visual complexity until its current source-consumption contract is explicit and testable.
