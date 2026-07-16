# Architecture audit: motion preference live projection DSK map

## Plan ledger

**Goal:** place motion preference in a semantic authority that coordinates browser capability, product policy and presentation adapters without owning gameplay truth.

- [x] Identify current capability reads.
- [x] Identify current presentation consumers.
- [x] Separate authoritative simulation from presentation policy.
- [x] Define commands, results, revisions and acknowledgements.
- [ ] Implement the DSK composition.

## Current ownership

```txt
menu CSS
  owns selected transition adaptation

menu module constant
  owns startup preference sampling
  affects palm deformation and entry delay

menu shader time
  owns water motion independently

game camera/player domain
  owns automatic aerial progression

game render adapters
  own ocean, foam, cloud, fog and world motion
```

No single domain publishes the accepted policy.

## Proposed domain tree

```txt
cozy-island-motion-preference-live-animation-projection-authority-domain
├─ motion-capability-observer-kit
├─ motion-preference-revision-kit
├─ product-motion-override-kit
├─ motion-policy-resolution-kit
├─ essential-motion-classification-kit
├─ menu-motion-descriptor-kit
├─ menu-frond-motion-adapter-kit
├─ menu-water-motion-adapter-kit
├─ menu-transition-motion-adapter-kit
├─ aerial-intro-motion-adapter-kit
├─ gameplay-camera-motion-adapter-kit
├─ ocean-motion-adapter-kit
├─ foam-motion-adapter-kit
├─ cloud-motion-adapter-kit
├─ fog-motion-adapter-kit
├─ world-wind-motion-adapter-kit
├─ live-preference-change-settlement-kit
├─ stale-motion-policy-rejection-kit
├─ first-reduced-motion-frame-ack-kit
└─ motion-preference-source-build-pages-fixture-kit
```

## Authority boundary

The parent domain may own:

```txt
observed OS preference
product override
policy revision
route revision
motion classifications
projection descriptors
surface acknowledgements
```

It must not own:

```txt
player position or look truth
Inventory, Agriculture or Foraging truth
scenario time or crop growth
save state
renderer backend selection
```

## Service contract

```txt
observeSystemPreference()
setProductOverride(mode)
getResolvedPolicy()
classifyMotion(surfaceId, classification)
getProjectionDescriptor(surfaceId)
settleLiveChange(command)
acknowledgeFrame(receipt)
getSnapshot()
reset()
```

## Scheduling

```txt
browser evidence
  -> capability phase
  -> policy admission
  -> simulation executes unchanged
  -> render snapshot binds policy revision
  -> adapters project descriptors
  -> frame acknowledgement
```

## Dependency map

```txt
browser matchMedia
  -> motion capability observer
  -> policy resolver
  -> menu shell and game adventure composition

cozy-player / cozy-camera
  -> aerial intro adapter only

cozy-render-snapshot
  -> motion policy revision in frame descriptor

menu renderer / ocean / foam / cloud / fog / wind
  -> consume descriptors only
```

## Failure behavior

Unknown capability defaults to a documented conservative policy. A stale policy or retired route result is rejected. A failed adapter reports a typed projection failure without mutating gameplay state.
