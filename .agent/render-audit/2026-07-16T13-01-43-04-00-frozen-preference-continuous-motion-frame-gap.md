# Render audit: frozen preference and continuous-motion frame gap

## Plan ledger

**Goal:** prove which visible motion is not bound to a live preference or matching frame revision.

- [x] Inspect menu shader-time motion.
- [x] Inspect entry transition timing.
- [x] Inspect game ocean and foam motion.
- [x] Inspect frame update ordering.
- [ ] Implement and capture matching reduced-motion frames.

## Menu frame

```txt
module load
  -> frozen reducedMotion boolean
  -> palm deformation amplitude selected
  -> water shader still consumes global time
  -> compute wind may continue
  -> RenderPipeline presents frame
```

The water strip has no reduced-motion branch. The entry delay uses the initial boolean and cannot adopt a later OS change.

## Game frame

```txt
adventure.tick(dt)
  -> camera rail may advance
  -> worldRenderer.update(elapsed)
  -> foamRenderer.update(elapsed)
  -> ocean shader consumes time
  -> postPipeline.render()
```

No frame descriptor includes a motion-policy revision. No receipt proves that all visible motion consumers applied one accepted policy.

## Required frame contract

```txt
MotionBoundFrameDescriptor
  routeRevision
  frameRevision
  motionPolicyRevision
  cameraMotionDescriptorId
  environmentMotionDescriptorIds
  preservedSimulationRevision
```

```txt
FirstReducedMotionMenuFrameAck
FirstReducedMotionGameplayFrameAck
```

## Visible proof requirements

- Menu palm is static or strongly attenuated.
- Menu water is static or uses an approved low-motion descriptor.
- Entry transition follows the accepted policy.
- Aerial intro is skipped or reduced without changing save/gameplay truth.
- Ocean, foam, cloud, fog and wind use the same policy revision.
- Direct player movement and look remain responsive.
