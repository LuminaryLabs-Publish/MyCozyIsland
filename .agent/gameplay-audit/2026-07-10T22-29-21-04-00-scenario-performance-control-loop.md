# Gameplay Audit: Scenario and Performance Control Loop

Timestamp: `2026-07-10T22-29-21-04-00`

## Current frame order

```txt
scenario.tick(dt)
  -> camera projection
  -> world update
  -> foam update
  -> performanceBudget.sample(frameMs)
  -> possible quality mutation
  -> postPipeline.render()
```

## Gameplay relationship

Adaptive quality does not currently change semantic terrain, collision, clearing bounds, rail progress, movement speed, or scenario clock. It changes presentation controls immediately before render.

That separation is desirable, but it is undocumented and unproven because:

- no source frame ID identifies the frame that triggered a transition
- no committed-frame row identifies the first render using the new target
- no transition result is correlated with scenario state
- a partial quality application can affect one frame with mixed controls
- recovery state cannot be reconstructed from the aggregate host snapshot

## Required boundary

```txt
scenario state remains authoritative and deterministic
adaptive quality consumes frame timing only
quality transitions never mutate semantic world state
one committed render frame observes either the old target or the new target
mixed partial target frames are rejected or rolled back
```

## Fixture expectation

A headless control-spy fixture should run deterministic sample sequences while asserting that scenario snapshots remain unchanged except for normal clock progression.
