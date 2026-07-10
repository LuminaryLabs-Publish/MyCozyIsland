# Architecture audit: host proof fixture catch-up DSK map

Timestamp: `2026-07-09T23-41-15-04-00`

## Current architecture

```txt
index.html
  -> src/main-cloudform.js
     -> source kits create descriptor contracts
     -> same module adapts descriptors into Three.js objects
     -> same module owns input, camera, movement, animation, render, and diagnostics
```

## DSK map

```txt
source descriptor kits
  -> ocean-island-landform-domain
  -> island-foliage-domain
  -> ocean-floor-domain
  -> grass-object-domain
  -> grass-wind-domain
  -> fenced-clearing-domain
  -> campfire-object-domain
  -> smoke-particle-domain
  -> mattatz-clouds-domain
  -> cozy-hero-cloud-form-kit

browser consumer kits inside main-cloudform.js
  -> render host
  -> mesh adapters
  -> browser input
  -> camera rail
  -> movement policy
  -> grass instance adapter
  -> cloud cache and drift
  -> frame loop
  -> legacy diagnostics

missing proof kits
  -> source fingerprint
  -> input result journal
  -> movement policy result
  -> render consumption ledger
  -> grass/cloud parity snapshots
  -> serializable CozyIslandHost snapshot
  -> DOM-free fixture
```

## Boundary issue

The source kits are deterministic, but the consumer boundary is opaque. The active host builds, consumes, mutates, renders, and exports diagnostics from one browser module. The next cut should add proof rows around the current behavior before visual or architecture rewrites.

## Required fixture proof

- Source descriptors are generated with stable fingerprints.
- Browser input actions produce accepted, rejected, or no-change result rows.
- Movement policy exposes clearing-boundary and campfire-keepout reasons.
- Grass placements reconcile with instanced render counts.
- Cloud descriptors reconcile with cache entries and fixed-dt drift rows.
- Render submission records source family consumption.
- `CozyIslandHost.getState()` returns JSON-serializable proof data without live Three.js objects.
