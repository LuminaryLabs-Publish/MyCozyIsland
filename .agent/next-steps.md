# Next Steps: MyCozyIsland

Last updated: `2026-07-11T01-50-30-04-00`

## Plan ledger

**Goal:** make lifecycle, reset, environment time, and rendering agree on one deterministic session and frame model without changing the current visual composition.

- [ ] Add a route runtime-session owner for startup, running, stop, dispose, restart, and startup rollback.
- [ ] Register animation-loop, listeners, timeouts, GPU resources, Three resources, and global host publication with that owner.
- [ ] Preserve the camera rail as immutable authored data.
- [ ] Separate pointer orbit influence from authored camera control points.
- [ ] Make scenario reset atomic across clock, camera, and later environment frame state.
- [ ] Add an immutable environment-frame schema with session ID, simulation tick, source time, revision, and fingerprint.
- [ ] Sample clock-derived wind and illumination exactly once per committed environment frame.
- [ ] Derive cloud, fog, vegetation, campfire, sky, light, exposure, and optional ocean consumer inputs from that same frame.
- [ ] Add typed consumer apply results with `applied`, `skipped`, `rejected`, or `unchanged`.
- [ ] Add bounded environment-frame and consumer journals to host/debug readback.
- [ ] Define environment update cadence independently from render cadence.
- [ ] Add atomic reset semantics restoring the initial environment frame and consumer state.
- [ ] Add a DOM-free clock/wind/illumination coherence fixture to `npm test`.
- [ ] Add a browser smoke proving sky/light/cloud/fog/world consumers share one environment-frame revision.
- [ ] Implement adaptive-quality transactions only after environment consumer provenance is available.

## Immediate implementation slice

```txt
MyCozyIsland Dynamic Environment Frame Authority
+ Clock/Wind/Illumination Consumer Coherence Fixture Gate
```

This is the third implementation slice. Runtime lifecycle remains first and camera reset remains second.

## Candidate kits

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

## Minimum environment frame

```txt
sessionId
simulationTick
environmentFrameId
revision
sourceElapsedSeconds
weatherId
wind.direction
wind.strength
wind.gust
wind.turbulence
illumination.sunDirection
illumination.sunIntensity
illumination.ambientIntensity
illumination.exposure
fingerprint
```

## Required fixture assertions

```txt
same seed + same clock schedule => identical environment frames
advancing clock changes declared wind and illumination when their functions change
all derived consumers cite one environmentFrameId
no consumer may apply a frame from a stale session or older revision
unchanged semantic values produce explicit unchanged rows, not silent omission
scenario reset restores the initial environment fingerprint
consumer reset returns sky/light/cloud/fog/vegetation/campfire to the initial frame
render cadence variation does not change semantic environment results
bounded JSON readback contains no live renderer or mutable service handles
```

## Deferred

- visual lighting, sky, cloud, fog, wind, ocean, grass, and campfire retuning
- dynamic weather transitions or new presets
- renderer replacement
- faster day/night cycles
- new quality tiers
- new island content
- public kit promotion before local fixture proof
