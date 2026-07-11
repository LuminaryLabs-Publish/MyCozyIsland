# Gameplay Audit: Focus, Provider, and Render Loop

Timestamp: `2026-07-11T05-10-36-04-00`

## Player-facing loop

```txt
aerial reveal
  -> wheel/trackpad descends camera rail
  -> pointer drag orbits reveal
  -> landing enters first-person mode
  -> WASD moves inside the central clearing
  -> camera position becomes Core World focus candidate
  -> focus commits at a cell boundary or after the configured 10 Hz/minimum-movement threshold
```

## Semantic loop

```txt
focus commit
  -> locate grid cell
  -> Core World updateWorld
  -> ordered provider prepare/update/release
  -> portable world snapshot
  -> provider store counts and diagnostics update
```

## Presentation loop

```txt
startup only
  -> flatten active provider rows
  -> build one legacy render snapshot
  -> build one whole-island render graph

running
  -> update elapsed-time animation
  -> no world-cell presentation commit
```

## Current practical masking

The active radius is three cells on a 48 m grid, producing a seven-by-seven set around the island. The island is approximately `-108..108` m and first-person movement is constrained to the central clearing. Therefore most current movement does not create a visible content-streaming delta.

This does not eliminate the architectural gap. It means the route cannot yet prove that gameplay focus, semantic active cells, presentation descriptors, and rendered resources remain coherent when the world grows, the movement boundary expands, the active radius changes, or the renderer becomes cell-aware.

## Gameplay integrity requirements

```txt
same admitted focus -> same active cell set
same world revision -> same presentation descriptor fingerprint
accepted world revision -> exactly one render commit
stale or duplicate world revision -> unchanged/rejected result
released semantic cell -> released visual cell after commit
camera/minimap/debug state -> same committed world/render revision
```

## Deferred gameplay changes

- expanding the walkable area
- adding collection, crafting, delivery, or combat loops
- adding streamed islands or off-island travel
- changing camera rail behavior
- changing world generation or content density

The next work should prove current semantics and presentation are correlated before increasing gameplay reach.