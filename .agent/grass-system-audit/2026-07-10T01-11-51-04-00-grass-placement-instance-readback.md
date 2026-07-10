# Grass System Audit: Placement Instance Readback

**Timestamp:** `2026-07-10T01-11-51-04-00`

## Current source

`grass-object-domain` creates path-aware and exclusion-aware grass patch placements plus static batch descriptors.

Current request count is `140`.

## Current consumer

`grassMesh(placement)` creates one `THREE.InstancedMesh` with one cone per patch.

## Source fields that need readback

```txt
seed
requested count
placed count
patch id
position
rotation
scale
bladeCount
patchRadius
batchKey
geometryTemplateKey
excluded zones
skip reasons
```

## Consumer fields that need readback

```txt
instance count
source patch id
matrix position
matrix scale
material id
geometry kind
accepted count
rejected count
```

## Main gap

The source describes richer grass than the renderer proves. Static batch descriptors and blade counts are not consumed by the visible renderer.

## Next gate

Add grass placement and grass instance snapshots, then include them in the DOM-free browser consumer fixture.
