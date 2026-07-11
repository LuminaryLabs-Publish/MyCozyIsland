# Gameplay Audit: Clock and Environment Coherence Loop

Timestamp: `2026-07-11T12-58-06-04-00`

## Loop

```txt
scenario.tick(dt)
  -> clock advances
  -> camera advances
  -> render snapshot reports new clock
  -> world/foam animate by elapsedSeconds
  -> lighting, wind-derived descriptors, cloud and fog remain startup-frozen
```

## Gameplay impact

The player can move through a world whose reported time advances while visual wind, smoke direction, sun/sky and atmosphere do not share that time. Reset rewinds the clock and camera without a typed environment reset or consumer acknowledgement.

## Required behavior

```txt
accepted tick
  -> one EnvironmentFrame
  -> all gameplay/render consumers commit same revision

reset
  -> canonical baseline EnvironmentFrame
  -> all consumers restore baseline
  -> first visible baseline frame acknowledged
```

## Fixtures

- equal seed and tick sequence produces equal environment fingerprints;
- wind-dependent consumers agree at each frame;
- illumination consumers match the frame state;
- reset reproduces the initial environment frame;
- stale or duplicate frames do not mutate consumers.
