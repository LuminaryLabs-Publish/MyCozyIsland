# Architecture Audit: WebGPU Frame Correlation Journal DSK Map

Timestamp: 2026-07-10T14-42-01-04-00

## Existing composition

```txt
source domains
  deterministic seed / clock / environment
  terrain / ocean / vegetation / atmosphere
  materials / render archetypes / quality / fallback
  camera rail / scenario
    -> render snapshot
    -> browser host adapters
    -> WebGPU/WebGL2 consumers
    -> live aggregate diagnostics
```

## Existing domain boundaries

- Source authority: deterministic descriptors and snapshots.
- Interaction authority: camera-rail input object mutated by browser events.
- Gameplay authority: `cozy-island-scenario-kit` owns ticking and render-state projection.
- Render authority: world, ocean, foam, cloud, fog, and post consumers.
- Performance authority: budget sampling plus degrade/recover callbacks.
- Diagnostics authority: debug overlay and `globalThis.CozyIsland.getState()`.

## Architectural fault line

The browser host is the only place where all authorities meet, but it has no explicit host-proof domain. Consequently, causal information is discarded at each adapter boundary.

```txt
input mutation
  X no command/result record
scenario.tick
  X no step record
camera copy
  X no projection record
performance callback
  X no transition record
postPipeline.render
  X no submission record
```

## Required DSK boundary

```txt
host-frame-sequence-kit
  -> allocates sequence and frameId
frame-correlation-record-kit
  -> defines common record header
input-command-record-kit
  -> records intent and result
scenario-step-record-kit
  -> records dt and scenario state identity
camera-projection-record-kit
  -> records consumed camera values
volume-build-record-kit
  -> records setup source/fallback identity
performance-transition-record-kit
  -> records degrade/recover transitions
render-submit-record-kit
  -> records consumer and submission outcome
bounded-proof-journal-kit
  -> append/read/reset/capacity/eviction
cozy-island-host-readback-kit
  -> JSON-safe public projection
node-frame-correlation-fixture-kit
  -> deterministic proof without GPU
```

## Record header

```txt
sequence
frameId
correlationId
kind
status
reason
sourceRevision
catalogFingerprint
recordedAt
payload
```

## Ownership rule

Source kits remain pure descriptor producers. Render kits remain consumers. The new host-proof kits own observation and correlation only; they must not retune source descriptors or render behavior.

## Conclusion

Create the host-proof composition boundary before any further renderer or scene expansion. It is the missing architectural seam between deterministic DSK sources and browser-side consumption.