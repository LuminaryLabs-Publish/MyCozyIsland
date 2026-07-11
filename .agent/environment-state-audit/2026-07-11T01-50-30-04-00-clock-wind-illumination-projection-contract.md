# Environment State Audit: Clock, Wind, and Illumination Projection Contract

Timestamp: `2026-07-11T01-50-30-04-00`

## Goal

Separate live environment state from immutable world construction and define a deterministic projection contract.

## Static versus dynamic classification

### Static construction state

```txt
world seed
terrain and biome fields
shoreline
ocean floor
vegetation placement
rocks and props
cloud/fog density texture recipes unless weather resources change
material and archetype catalogs
```

### Dynamic semantic state

```txt
clock elapsed time
wind direction, strength, gust, turbulence
illumination direction, intensity, ambient, sky colors, exposure
cloud drift and lighting projection
fog advection projection
vegetation bend projection
campfire smoke projection
```

### Presentation-only time

```txt
fine cloud detail animation
fog texture offset interpolation
ocean displacement phase
foam breakup
campfire flame pulse
particle interpolation
```

Presentation time can interpolate between semantic frames but cannot replace them.

## Current source behavior

The wind and illumination services read the live clock when queried. Downstream environment descriptor factories query them during startup, then freeze their outputs into the render snapshot. The scenario later provides a current clock but no current environment projection.

## Required cadence policy

```txt
simulation tick:
  authoritative clock progression

environment cadence:
  deterministic semantic sampling
  every tick or a fixed lower frequency

render frame:
  interpolate/present latest committed semantic frame
```

The cadence must be explicit, seeded, and independent of monitor refresh rate.

## Frame and projection fingerprints

```txt
environment fingerprint:
  session + tick + source time + weather + wind + illumination

consumer projection fingerprint:
  environment fingerprint + consumer ID + projection schema version

applied fingerprint:
  projection fingerprint + consumer result
```

## Reset contract

Reset must restore the construction-time initial clock and environment frame, reject stale prior-session frames, apply the reset frame to every active consumer, and publish one aggregate receipt.

## Release contract

Disposal must prevent late environment updates from reaching released renderer consumers.
