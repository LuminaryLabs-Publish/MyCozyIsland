# World Provider Audit: Provider Cell Consumption Contract

Timestamp: `2026-07-11T05-10-36-04-00`

## Provider order

```txt
FOUNDATION
  cozy-island-terrain-provider

CLASSIFICATION
  biome-classification-provider
  shoreline-classification-provider

POPULATION
  vegetation-provider
  rock-provider
  prop-provider

PRESENTATION
  cell-presentation-provider
```

## Services

### Terrain provider

- maps 48 m world cells to deterministic terrain arrays
- preserves the existing island height and field samplers
- stores heavy runtime arrays outside portable Core World descriptors

### Biome provider

- derives per-cell biome classification from terrain source data
- stores classification records by cell

### Shoreline provider

- derives shore distance, wetness, breaker, and coast descriptors by cell

### Vegetation provider

- partitions the deterministic global vegetation graph into cell-owned rows
- preserves stable instance identities and ordering

### Rock provider

- partitions deterministic rock instances into cell-owned rows

### Prop provider

- partitions fence, driftwood, path marker, clearing, and campfire rows

### Presentation provider

- combines terrain, classification, population, and prop records into portable presentation descriptors

## Current consumption state

```txt
provider output                         semantic consumer       render consumer
terrain runtime rows                   world query              legacy whole-island terrain source
biome runtime rows                     presentation provider    startup compatibility snapshot
shoreline runtime rows                 presentation provider    startup compatibility snapshot
vegetation runtime rows                bridge                   startup compatibility snapshot or global fallback
rock runtime rows                      bridge                   startup compatibility snapshot or global fallback
prop runtime rows                      bridge                   startup compatibility snapshot or global fallback
presentation descriptors               diagnostics/list API     no production render consumer
```

## Contract gap

The presentation provider is the logical final semantic phase, but its descriptors are not the production renderer input. The renderer is built from a legacy snapshot that may use provider rows or silently fall back to the global composition.

## Required consumption ledger

For every world revision, record:

```txt
providerId
phase
cellId
providerRevision
status
reason
sourceFingerprint
presentationDescriptorId
presentationRevision
consumerId
consumerStatus
renderRevision
```

Required invariants:

- every active presentation descriptor has one authoritative render-consumer result
- every released descriptor receives one release result
- no cell is rendered from both authoritative cell rows and compatibility global rows
- fallback use is explicit by kind and revision
- provider and renderer fingerprints are comparable without GPU handles
- provider reset/dispose invalidates outstanding render commands from that world epoch

## Compatibility policy

```txt
legacy
  global composition is authoritative

shadow-cell-consumer
  legacy remains visible; cell consumer builds non-visible proof state

cell-authoritative
  provider presentation descriptors own visible cell resources
```

The policy must be explicit in host state and fixtures. Silent per-kind fallback should not be treated as successful cell authority.