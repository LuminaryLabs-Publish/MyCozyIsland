# Architecture audit: source consumer host fixture DSK map

**Timestamp:** `2026-07-10T02-31-58-04-00`

## Current architecture

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
      -> source-domain kits
      -> Three.js renderer adapters
      -> browser input mutation
      -> rail / first-person camera policy
      -> movement validity
      -> grass instancing
      -> cloud point-cache and drift
      -> frame render loop
      -> globalThis.CozyIsland legacy diagnostics
```

## DSK boundary read

| Boundary | Current source owner | Current consumer | Gap |
| --- | --- | --- | --- |
| Route token | `index.html` | browser module loader | Not included in serializable host readback |
| Landform | `ocean-island-landform-domain` | terrain mesh and shoreline foam adapters | No source/render parity ledger |
| Ocean floor | `ocean-floor-domain` | floor mesh and water adapter | Object placement contract not consumed as distinct adapters |
| Foliage | `island-foliage-domain` | `objGroup()` | Non-tree foliage falls to generic rock shape |
| Clearing | `fenced-clearing-domain` | fence adapter, movement validity | Accepted/rejected movement not recorded |
| Campfire | `campfire-object-domain` | campfire mesh, light, movement keepout | Keepout rejection not first-class |
| Smoke | `smoke-particle-domain` | PointsMaterial simulation | No fixed-dt drift/result rows |
| Grass | `grass-object-domain` | one cone instance per patch | Static batch descriptors ignored |
| Clouds | `cozy-hero-cloud-form-kit` through `mattatz-clouds-domain` | cached point cloud geometry | Cache key is cloud id, not descriptor fingerprint |
| Input | browser listeners | direct progress/yaw/pitch/pose mutation | No input result journal |
| Host | `globalThis.CozyIsland` | ad hoc diagnostics | Live Three.js geometries exposed, no serializable proof surface |

## Target host-proof shape

```txt
source profile
  -> source fingerprint
  -> scene-source snapshot
  -> input action frame
  -> input result journal
  -> movement policy result
  -> grass placement/instance parity
  -> cloud descriptor/cache/drift parity
  -> render consumption ledger
  -> render host snapshot
  -> CozyIslandHost.getState()
  -> DOM-free browser consumer fixture
```

## First implementation files

```txt
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/input-action-frame.js
src/host-proof/input-result.js
src/host-proof/input-result-journal.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/grass-placement-snapshot.js
src/host-proof/grass-instance-snapshot.js
src/host-proof/cloud-descriptor-snapshot.js
src/host-proof/cloud-cache-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/render-consumption-ledger.js
src/host-proof/render-host-snapshot.js
src/host-proof/cozy-island-host-snapshot.js
scripts/cozy-island-browser-consumer-fixture.mjs
```

## Do not start with

```txt
visual rewrite
cloud visual rewrite
grass visual rewrite
camera retune
renderer extraction
new route content
source-kit promotion
```
