# Gameplay Audit: Clearing Ground Contact and Exploration Loop

Timestamp: `2026-07-11T02-02-59-04-00`

## Gameplay loop

```txt
scroll wheel advances the authored camera rail
  -> camera approaches the island and clearing
  -> rail completion enables first-person clearing mode
  -> WASD changes player X/Z
  -> camera sequence samples terrain height for player/camera placement
  -> player explores inside the fenced clearing
  -> campfire, fence, grass and terrain provide the visual spatial boundary
```

## Terrain dependency

The clearing is not decorative only. It is the gameplay floor and affects:

```txt
landing/readability of the camera reveal
first-person eye height
perceived walkability
fence boundary readability
campfire placement
path arrival
central grass/soil composition
object grounding
```

## Current improvement

The terrain-relative plateau removes the artificial crater and better aligns the central play area with the surrounding island elevation. Slight deterministic variation retains a natural surface rather than an exact plane.

## Missing gameplay authority

The scenario and camera sequence receive the terrain service but do not expose a terrain revision in their state. A reset result cannot prove that the player baseline, camera eye height and central world objects were restored against the same surface revision.

The current test does not execute:

```txt
rail completion
first-person movement
center-to-fence traversal
terrain-relative eye-height checks
reset after movement
campfire collision/contact
fence contact or boundary behavior
```

## Required deterministic gameplay probes

```txt
spawn/landing point at clearing center
four cardinal inner-clearing points
all fence cardinal points
outer blend boundary probes
path arrival point
campfire center
repeated reset after player movement
```

Each probe should record:

```txt
terrainRevision
position X/Z
surface height
surface normal
player baseline or object seat
expected offset
actual offset
status
```

## Acceptance rules

```txt
player baseline follows authoritative terrain height
camera eye offset remains constant relative to player baseline
reset restores initial player and camera terrain-relative transforms
campfire remains seated at center with declared inset
fence posts remain seated within tolerance
walkable clearing slope remains below the gameplay limit
transition edge does not create an unintended step or trench
```

## Gameplay recommendation

Do not add more exploration mechanics or retune movement until the clearing floor, camera/player reset and object seating share one terrain revision and pass the same fixture.
