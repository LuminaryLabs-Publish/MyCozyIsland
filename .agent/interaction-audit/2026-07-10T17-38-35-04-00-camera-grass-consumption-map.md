# Interaction Audit: Camera and Grass Consumption Map

Timestamp: 2026-07-10T17-38-35-04-00

## Player interaction loop

```txt
wheel
  -> camera rail input zoom
pointer drag
  -> camera rail input orbit/look intent
keyboard
  -> camera movement/debug intent
blur
  -> clear held input
resize
  -> renderer size and camera projection
scenario tick
  -> camera render snapshot
camera projection
  -> scene visibility and grass frustum result
```

## Grass interaction boundary

The player does not directly pick, trample, bend, cut, or collide with grass. Grass is currently a presentation consumer only.

Camera and movement can still affect grass rendering indirectly:

```txt
camera position/orientation
  -> object-level frustum culling
  -> visible grass mesh contribution
viewport/DPR
  -> pixel cost of alpha-tested grass
performance level
  -> DPR changes, but no grass density or geometry change
```

## Current gap

No host record links input/camera state to grass renderer state. The world renderer reports neither grass instance count nor visible/cull state, and the grass adapter has no frame readback.

This does not justify adding interaction mechanics. The safe addition is readback only:

```txt
frameId
cameraMode
grassSourceCount
grassRenderedCount
grassUpdateMode
grassLodMode
resourceState
```

## Do not add yet

- grass collision
- grass touch bending
- player footprints modifying grass
- per-blade interaction
- camera-dependent rebuilds
- input-driven density changes

## Next safe ledge

Preserve the current presentation-only relationship and make the adapter state observable before introducing any player/grass interaction.
