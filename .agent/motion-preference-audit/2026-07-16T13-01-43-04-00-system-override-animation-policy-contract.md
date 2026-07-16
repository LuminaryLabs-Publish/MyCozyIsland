# Motion preference audit: system, override and animation policy contract

## Plan ledger

**Goal:** define a complete contract from browser capability to menu and gameplay presentation.

- [x] Define policy sources.
- [x] Define classification semantics.
- [x] Define menu and game descriptors.
- [x] Define live-change behavior.
- [ ] Implement the contract.

## Sources

```txt
system preference: no-preference | reduce | unknown
product override: system | normal | reduced
resolved mode: normal | reduced
```

The product override is optional. `system` defers to the current operating-system result.

## Classifications

```txt
essential-input
essential-simulation
optional-camera
optional-environment
optional-transition
optional-decoration
```

Essential input and simulation are preserved. Optional classes consume policy descriptors.

## Descriptor shape

```txt
MotionPolicyDescriptor
  id
  revision
  mode
  source
  menu:
    palmAmplitudeScale
    waterTimeScale
    transitionMilliseconds
    computeWindEnabled
  game:
    aerialIntroMode
    oceanAmplitudeScale
    oceanTimeScale
    foamAmplitudeScale
    cloudTimeScale
    fogTimeScale
    windAmplitudeScale
  issuedForRouteRevision
```

## Reduced defaults

```txt
palmAmplitudeScale: 0
waterTimeScale: 0
transitionMilliseconds: 0
computeWindEnabled: false
aerialIntroMode: static-or-skip
oceanAmplitudeScale: bounded-low
oceanTimeScale: 0
foamAmplitudeScale: 0
cloudTimeScale: 0
fogTimeScale: 0
windAmplitudeScale: 0
```

Exact artistic values remain product decisions, but they must be centralized and revisioned.

## Live changes

```txt
MediaQueryList change
  -> observe new capability revision
  -> resolve product override
  -> issue new policy revision
  -> update descriptors at a frame boundary
  -> acknowledge the first matching frame
```

No renderer recreation or gameplay reset is required.

## Route handoff

The hidden game preload may prepare both normal and reduced-compatible resources, but only the active route may publish a frame acknowledgement. Retired menu policy work is rejected after entry.
