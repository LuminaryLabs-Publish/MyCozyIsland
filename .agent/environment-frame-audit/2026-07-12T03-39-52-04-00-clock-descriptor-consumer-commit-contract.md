# Environment Frame Audit: Clock, Descriptor and Consumer Commit Contract

Timestamp: `2026-07-12T03-39-52-04-00`

## Summary

A complete environment frame must bind one clock revision to every dynamic descriptor and every CPU/GPU render consumer. The current runtime has no such commit boundary.

## Canonical frame contract

```txt
EnvironmentFrameSnapshot {
  environmentFrameId
  environmentRevision
  clockSourceId
  clockRevision
  resetGeneration
  elapsedSeconds
  deltaSeconds
  paused
  timeScale
  wind
  illumination
  vegetationWind
  campfire
  cloud
  fog
  ocean
  fingerprint
}
```

## Required evaluation order

```txt
1. admit EnvironmentFrameCommand
2. validate session, runtime and reset generations
3. advance canonical clock
4. evaluate wind
5. evaluate illumination
6. evaluate cloud and fog state
7. evaluate vegetation and campfire state
8. build immutable snapshot and fingerprint
9. update CPU consumers
10. update canonical GPU uniforms
11. collect required receipts
12. commit environment revision
13. submit visible frame
14. publish visible-frame acknowledgement
```

## Required consumer set

```txt
sky
scene-fog
renderer-exposure
hemisphere-light
sun-light
world-vegetation
campfire
shoreline-foam
ocean
volumetric-clouds
rolling-fog
post-pipeline
```

## Receipt contract

```txt
EnvironmentConsumerReceipt {
  consumerId
  environmentFrameId
  environmentRevision
  clockRevision
  resetGeneration
  canonicalTime
  resourceGeneration
  accepted
  classification
  details
}
```

## Commit rules

```txt
all required consumer IDs are present
all accepted receipts cite the same environment revision
all accepted receipts cite the same reset generation
all canonical times match within exact contract semantics
no stale resource generation is accepted
no duplicate consumer receipt replaces a committed receipt
partial plans remain uncommitted
```

## Pause and time-scale semantics

```txt
pause
  -> canonical elapsed time does not advance
  -> CPU and GPU time inputs remain unchanged
  -> frame revision may advance only for non-time visual policy changes

time scale
  -> one scale applies before all dynamic evaluation
  -> no renderer-specific multiplier bypasses the snapshot
```

## Reset semantics

```txt
increment reset generation
reset canonical clock to admitted baseline
re-evaluate every dynamic descriptor
write canonical time uniform
retire old consumer receipts
commit one new environment revision
acknowledge first visible frame
```

## Failure semantics

```txt
invalid command
  -> no clock or consumer mutation

consumer failure
  -> no environment-frame commit
  -> retain predecessor visible frame

stale callback
  -> reject by runtime, reset, environment or resource generation

backend loss
  -> classify unavailable consumer and preserve predecessor authority
```

## Observation contract

The public read model should expose values, not live renderer or domain references:

```txt
clock source and revision
reset generation
committed environment frame ID and revision
canonical time
frame fingerprint
required and accepted consumers
last result
last visible frame acknowledgement
bounded journal tail
```

## Fixture gate

```txt
clock source divergence
pause parity
scaled-time parity
reset phase parity
dynamic descriptor revision
consumer receipt completeness
stale callback rejection
WebGPU/WebGL2 parity
visible reset frame
```

## Validation boundary

```txt
contract documented: yes
runtime implementation present: no
fixtures present: no
visible-frame proof present: no
```