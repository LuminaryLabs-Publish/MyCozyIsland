# Architecture Audit: Host State Readback Ledger Sync DSK Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T05-38-20-04-00`

## Architectural read

`MyCozyIsland` is a single-route static browser application. The route is stable, but the live host boundary is still too implicit for durable DSK promotion.

The runtime constructs source descriptors, render adapters, input handlers, movement policy, camera rail, grass instancing, cloud caching, cloud drift, frame rendering, and legacy diagnostics in `src/main-cloudform.js`.

## Current composition

```txt
index.html
  -> src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> local descriptor kits
  -> inline render adapters
  -> inline input / movement / camera / frame loop
  -> legacy globalThis.CozyIsland
```

## Domain map

```txt
static-browser-route-domain
  owns: index.html, canvas, loader, error panel

route-token-domain
  owns: hero-cloud-4 route script token
  gap: no first-class readback record

source-descriptor-domain
  owns: island, floor, foliage, clearing, fire, smoke, grass, wind, cloud descriptors
  gap: no source profile / fingerprint / fixture snapshot

render-adapter-domain
  owns: terrain, floor, water, foam, path, foliage, fence, fire, smoke, grass, cloud adapters
  gap: no render host snapshot or descriptor consumption report

input-domain
  owns: keyboard Set, wheel progress mutation, pointer drag yaw/pitch mutation
  gap: no browser input action frame or action result

movement-domain
  owns: progress-gated first-person movement and valid(next) policy
  gap: no movement policy result or rejected movement row

camera-rail-domain
  owns: rail() CatmullRom camera path from high sky view to first person
  gap: no camera rail snapshot rows

grass-system-domain
  owns: placement descriptor and InstancedMesh adapter
  gap: patch/instance parity is not exposed through host readback

cloud-system-domain
  owns: Mattatz cloud contract, point geometry cache, shader material, drift frame updates
  gap: descriptor/cache/drift summaries are not fixture-readable

host-proof-domain
  planned owns: additive CozyIslandHost.getState(), source/readback snapshots, fixture rows

central-ledger-sync-domain
  owns: mirrored repo status in LuminaryLabs-Dev/LuminaryLabs
```

## DSK hierarchy

```txt
my-cozy-island-route-domain
├─ route-token-readback-kit
├─ source-profile-kit
├─ source-fingerprint-kit
├─ scene-source-snapshot-kit
├─ browser-input-action-frame-kit
├─ action-result-kit
├─ input-journal-kit
├─ movement-policy-result-kit
├─ camera-rail-snapshot-kit
├─ grass-placement-snapshot-kit
├─ grass-instance-snapshot-kit
├─ hero-cloud-descriptor-snapshot-kit
├─ hero-cloud-cache-snapshot-kit
├─ cloud-drift-result-kit
├─ render-host-snapshot-kit
├─ cozy-island-host-snapshot-kit
├─ browser-consumer-fixture-kit
└─ central-ledger-readback-kit
```

## Services by kit family

```txt
source kits:
  create island state, landform render contract, floor render contract, object graphs, clearing graph, grass placement, smoke descriptor, cloud contract

render adapter kits:
  adapt descriptors into Three.js Mesh/InstancedMesh/Points objects

interaction kits:
  classify wheel / pointer / keyboard input into action frames and bounded results

movement kits:
  compute accepted/rejected movement results using clearing radius and campfire keepout

camera kits:
  project rail and first-person camera snapshots from progress and player pose

grass kits:
  summarize requested patches, accepted patches, batch descriptors, and instance counts

cloud kits:
  summarize cloud descriptors, cached geometry counts, point counts, and per-frame drift deltas

host proof kits:
  combine route/source/action/movement/rail/grass/cloud/render records into `CozyIslandHost.getState()`

fixture kits:
  run DOM-free rows proving source/readback parity without canvas or browser globals
```

## Architecture decision

Do not extract the full renderer or rewrite the visual scene next.

First add narrow proof modules that produce stable records from the current source descriptors and current runtime decisions. Then wire those records into an additive host surface while preserving the legacy route.
