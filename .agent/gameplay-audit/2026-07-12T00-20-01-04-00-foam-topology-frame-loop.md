# Gameplay Audit: Foam Topology Frame Loop

Timestamp: `2026-07-12T00-20-01-04-00`

## Active loop

```txt
startup snapshot
  -> create foam source meshes
  -> create one fixed source/proxy pair list

frame
  -> tick scenario
  -> update foam source animation
  -> copy source transforms into fixed proxy pairs
  -> render base depth
  -> render proxy depth
  -> mask foam color
  -> render output
```

## Gameplay-facing risk

The shoreline foam is part of environmental readability. The proxy pair list has no topology revision, so any future reset, world-mode replacement, shoreline rebuild, quality rebuild, or runtime foam mesh change can leave:

```txt
visible foam without a depth proxy
retired foam with a surviving depth proxy
proxy transforms sourced from stale objects
frame readback that reports the expected pass names but not the actual membership
```

Current runtime construction is mostly static, so this is an authority and future-change hazard rather than a reproduced active visual failure.

## Required state

```txt
foamSourceTopologyRevision
foamProxyTopologyRevision
foamMembershipResult
foamTransformSyncFrameId
foamDepthBindingRevision
foamVisibleFrameReceipt
foamProxyDisposalResult
```
