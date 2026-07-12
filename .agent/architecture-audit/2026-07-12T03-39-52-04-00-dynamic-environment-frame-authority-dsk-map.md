# Architecture Audit: Dynamic Environment Frame Authority DSK Map

Timestamp: `2026-07-12T03-39-52-04-00`

## Summary

The current composition has dynamic clock and wind services, but it does not assemble them into one environment-frame authority. CPU render updates, TSL shader time, and startup-frozen descriptors are separate ownership paths.

## Current ownership map

```txt
cozy-island-scenario-kit
  -> environment-clock-domain-kit.tick(dt)
  -> camera-rail-sequence-kit.tick(dt)
  -> spread static render snapshot
  -> replace clock and camera only

legacy-world-composition
  -> sample illumination once
  -> sample vegetation wind once
  -> sample campfire wind once
  -> sample cloud and fog state once
  -> freeze render snapshot

browser render host
  -> worldRenderer.update(scenarioTime)
  -> foamRenderer.update(scenarioTime)
  -> ocean shader uses TSL time
  -> cloud shader uses TSL time
  -> fog shader uses TSL time
  -> submit post-composited frame
```

## Missing parent domain

```txt
cozy-island-dynamic-environment-frame-authority-domain
```

This parent domain should be the only authority allowed to advance environment time, derive dynamic descriptors, bind renderer uniforms, commit consumer receipts, reset environment generations, and publish visible-frame provenance.

## Proposed composition

```txt
cozy-island-dynamic-environment-frame-authority-domain
  identity
    environment-frame-id-kit
    environment-frame-revision-kit
    environment-reset-generation-kit

  command and admission
    environment-frame-command-kit
    environment-clock-source-kit
    environment-clock-revision-kit
    stale-environment-frame-rejection-kit

  evaluation
    environment-frame-snapshot-kit
    dynamic-wind-evaluation-kit
    dynamic-illumination-evaluation-kit
    dynamic-atmosphere-evaluation-kit
    dynamic-campfire-environment-kit

  rendering
    canonical-render-time-uniform-kit
    environment-render-plan-kit
    environment-consumer-receipt-kit
    environment-frame-commit-kit

  observation and proof
    environment-frame-observation-kit
    environment-frame-journal-kit
    environment-clock-source-divergence-fixture-kit
    environment-reset-phase-parity-fixture-kit
    environment-visible-frame-parity-smoke-kit
```

## Required service boundaries

```txt
environment clock service
  owns canonical elapsed time, scale, pause, reset and revision

environment evaluation service
  derives wind, illumination, cloud, fog, vegetation and campfire state

environment render plan service
  projects one snapshot to CPU objects and GPU uniforms

consumer receipt service
  records which renderer generation consumed which environment revision

environment commit service
  rejects partial or stale plans and publishes one committed revision

environment observation service
  exposes clone-safe state without renderer, shader or mutable domain references
```

## Required invariant

```txt
For any visible frame F:
  every dynamic environment consumer cites one EnvironmentFrameSnapshot E
  E cites one clock source, clock revision and reset generation
  no consumer may evaluate ambient time outside E
```

## Reset transaction

```txt
EnvironmentResetCommand
  -> increment reset generation
  -> reset canonical clock
  -> derive fresh dynamic descriptors
  -> update canonical TSL time uniform
  -> update CPU consumers
  -> collect required receipts
  -> commit EnvironmentFrameSnapshot
  -> acknowledge first visible reset frame
```

## Migration boundary

The first implementation can preserve all existing visual recipes. The architectural change is to replace ambient reads with explicit frame inputs:

```txt
Three TSL global time
  -> canonical-render-time-uniform-kit

startup wind/illumination snapshots
  -> per-frame evaluation or explicitly revisioned immutable policy

renderer-specific updates
  -> environment-render-plan-kit receipts
```

## Non-goals

```txt
no new weather presets
no art-direction change
no new shaders required
no adaptive-quality redesign
no world-provider rewrite
no camera implementation change
```