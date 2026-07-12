# Render Audit: Sticky Pixel Ratio and Visible Quality Frame Gap

Timestamp: `2026-07-12T05-00-19-04-00`

## Finding

`applyPerformanceLevel(level)` always updates cloud steps, fog steps, and fog resolution. It updates renderer pixel ratio only when `level > 0`.

```txt
level 0
  activeScale = 1
  cloud step scale = 1
  fog step scale = 1
  fog resolution = base
  renderer.setPixelRatio = not called
```

A renderer that previously degraded can therefore remain at a reduced DPR after all other controls report full recovery.

## Example

For a high base tier with a 1.5 DPR cap:

```txt
startup level 0 -> 1.50 cap
level 1         -> 1.32 cap
level 2         -> 1.14 cap
recover level 1 -> 1.32 cap
recover level 0 -> no DPR write; remains 1.32
```

The exact effective DPR is bounded by device DPR, but the recovery path still does not restore the base policy.

## Visible-state mismatch

```txt
performance level: 0
cloud/fog controls: base values
base quality tier: high
renderer DPR: retained degraded value
canvas resolution: lower than base tier implies
visible frame: no quality revision or receipt exposes mismatch
```

## Additional render gaps

```txt
base and active quality descriptors are not separated
quality-dependent startup resources are not classified immutable
resize does not create a quality policy revision
debug overlay does not display active DPR or transition reason
post pipeline has no quality-consumer receipt
first frame using a changed quality level is not acknowledged
```

## Required render contract

```txt
QualityConsumerPlan
  -> exact target DPR
  -> cloud step scale
  -> fog step scale
  -> fog resolution scale
  -> explicitly immutable resource set

apply plan
  -> each adapter returns measured resulting state
  -> compare receipt against target
  -> commit quality revision only after complete receipt set
  -> render frame with quality revision
  -> publish VisibleQualityFrameAck
```

## Required proof

```txt
level 0 startup DPR is recorded
level 1 and level 2 lower DPR as policy declares
level 2 -> 1 -> 0 restores exact startup DPR
canvas backing size matches committed DPR after resize
base tier and active level remain distinct but coherent
first visible frame reports the accepted quality revision
```