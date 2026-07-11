# Gameplay Audit: Frame Budget and Quality Loop

Timestamp: `2026-07-11T12-50-35-04-00`

## Loop

```txt
one display frame
  -> sample frameMs
  -> advance scenario by clamped dt
  -> move camera and world focus
  -> update animated render consumers
  -> update performance EMA
  -> count one over/under-budget frame
  -> maybe change quality level
  -> render
```

## Gameplay-facing effects

Adaptive quality is presentation policy, but its current timebase is the display frame count. The same sustained condition changes quality at different elapsed times on different refresh rates:

```txt
90-frame degrade dwell
  30 Hz  ~= 3.00 s
  60 Hz  ~= 1.50 s
  120 Hz ~= 0.75 s

360-frame recovery dwell
  30 Hz  ~= 12.00 s
  60 Hz  ~= 6.00 s
  120 Hz ~= 3.00 s
```

This can change visual clarity, fog cost and render resolution more aggressively for high-refresh players even when the elapsed performance evidence is equivalent.

## Required policy

- Use monotonic elapsed-time windows, not raw sample counts.
- Classify hidden, suspended and stalled frames.
- Fence quality changes from reset, stop and disposal.
- Preserve camera and gameplay simulation authority separately from presentation adaptation.
- Publish a typed quality result without mutating gameplay state.
- Prove equivalent decisions under 30, 60, 90 and 120 Hz schedules.
