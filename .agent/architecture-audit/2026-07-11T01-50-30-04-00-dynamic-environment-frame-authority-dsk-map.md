# Architecture Audit: Dynamic Environment Frame Authority DSK Map

Timestamp: `2026-07-11T01-50-30-04-00`

## Goal

Define the smallest authority layer that converts the live environment clock into one deterministic, versioned environment frame and proves which consumers applied it.

## Existing dependency graph

```txt
environment-clock-domain-kit
  -> wind-field-domain-kit
  -> illumination-domain-kit
  -> weather-state-domain-kit

wind-field-domain-kit
  -> vegetation-wind-domain-kit
  -> campfire-atmosphere-domain-kit
  -> cloud-weather-domain-kit
  -> fog-advection-domain-kit
  -> ocean-wave-domain-kit intent

illumination-domain-kit
  -> cloud-lighting-domain-kit
  -> cloud-shadow-domain-kit intent
  -> aerial-perspective-domain-kit intent
  -> stylized-material-descriptor-domain-kit intent

render-snapshot-domain-kit
  -> one immutable startup aggregate
```

The catalog declares loop ownership and clock dependencies for several domains, but source composition collapses them into startup descriptors.

## Missing parent domain

```txt
dynamic-environment-frame-authority
```

This parent should own only coordination and proof:

```txt
session and simulation-tick admission
environment update cadence
one clock sample
one wind sample
one illumination sample
derived descriptor revision
environment frame ID and fingerprint
consumer application results
bounded observation
reset and stale-frame rules
```

It should not own terrain, vegetation placement, cloud volume textures, renderer objects, or GPU resources.

## Candidate child kits

```txt
environment-frame-authority-kit
environment-frame-identity-kit
environment-frame-sampler-kit
dynamic-illumination-state-kit
dynamic-wind-state-kit
environment-consumer-projection-kit
sky-lighting-consumer-kit
cloud-lighting-consumer-kit
fog-advection-consumer-kit
vegetation-wind-consumer-kit
campfire-wind-consumer-kit
environment-staleness-observation-kit
environment-frame-coherence-fixture-kit
```

## Proposed frame contract

```js
{
  sessionId,
  simulationTick,
  environmentFrameId,
  revision,
  sourceElapsedSeconds,
  weatherId,
  wind: {
    direction,
    strength,
    gust,
    turbulence
  },
  illumination: {
    sunDirection,
    sunColor,
    sunIntensity,
    ambientIntensity,
    skyTop,
    skyHorizon,
    exposure
  },
  fingerprint
}
```

## Provider contract

```txt
prepare(session)
  -> prepared result + initial frame

update(tick)
  -> generated | unchanged | rejected

applyConsumer(consumer, environmentFrame)
  -> applied | unchanged | skipped | rejected

reset(session)
  -> initial frame + reset receipt

release(session)
  -> release receipt
```

## Admission rules

- reject frames from another session
- reject revisions older than the last applied revision
- treat duplicate fingerprints as explicit `unchanged`
- do not sample different wind values independently for each consumer
- do not let render cadence determine semantic environment cadence
- do not expose live renderer handles in snapshots
- keep shader-time animation separate from semantic environment state

## Dependency order

```txt
runtime session authority
  -> environment frame authority
  -> renderer consumer application
  -> adaptive-quality transaction
```

Camera baseline/reset remains a separate sequence authority under the same session.
