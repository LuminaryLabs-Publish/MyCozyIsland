# Gameplay Audit: Scenario and Presentation Separation Loop

Timestamp: 2026-07-10T17-38-35-04-00

## Current gameplay loop

```txt
authored aerial reveal
  -> camera rail advances from deterministic environment time
  -> player input transitions toward grounded exploration
  -> first-person movement remains inside the island clearing/world bounds
  -> scenario exposes camera, clock, and world snapshot state
  -> renderer presents terrain, vegetation, ocean, clouds, fog, and props
  -> loop continues as scenic exploration
```

## Gameplay authority

`createCozyIslandScenario()` owns scenario time, camera mode, movement, reset behavior, and render snapshots.

The layered grass adapter does not mutate gameplay state. It consumes presentation descriptors only.

## Recent change classification

The unlit layered alpha-cutout grass change is a render-adapter substitution, not a gameplay mechanic.

```txt
unchanged:
  scenario tick
  camera rail
  first-person movement
  world identity
  deterministic vegetation placement
  objective structure
  save/progression behavior

changed:
  visual consumption of grass-patch descriptors
```

## Separation invariant

```txt
identical scenario and vegetation source snapshot
  -> identical gameplay/camera state
  -> renderer may change visual representation
  -> no renderer mutation may feed back into scenario state
```

The next fixture should preserve this separation by comparing source snapshot counts before and after renderer construction and by ensuring the wrapper's shallow copy does not mutate the original snapshot.

## Missing proof

- no assertion that `createSnapshotWithoutLegacyGrass()` leaves the original snapshot unchanged
- no assertion that scenario render snapshots are identical regardless of base or layered grass adapter
- no host record identifying the active grass adapter
- no teardown/recreate test proving scenario state survives renderer disposal

## Not next

Do not add grass collection, stamina, collision, objectives, progression, or environmental reactions. The current product loop is intentionally simple scenic exploration.

## Next safe ledge

Make the grass adapter explicit and fixture-backed while keeping scenario/gameplay authority unchanged.
