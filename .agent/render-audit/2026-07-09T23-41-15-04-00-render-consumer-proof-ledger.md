# Render audit: render consumer proof ledger

Timestamp: `2026-07-09T23-41-15-04-00`

## Current render consumers

`src/main-cloudform.js` adapts source descriptors into:

- terrain mesh;
- ocean floor mesh;
- water plane;
- shoreline foam tube;
- path mesh;
- foliage/tree/rock group;
- fence group;
- campfire group;
- smoke points;
- grass instanced cone mesh;
- hero cloud point groups;
- Three.js renderer, camera, lights, fog, and frame loop.

## Render proof gaps

- No source-to-render consumption ledger exists.
- Ocean-floor object placements are generated but not rendered as distinct reef/coral/rock/boulder adapters.
- Non-tree foliage falls through to a generic rock adapter.
- Grass patch descriptors become one cone instance per patch, with no batch descriptor proof.
- Cloud geometry is cached by `cloud.id`, not descriptor fingerprint.
- `globalThis.CozyIsland.cloudPointCache` exposes live `BufferGeometry` objects, not serializable proof state.

## Required render ledger rows

```txt
source_family
source_id
source_count
consumer_adapter
render_count
accepted_count
ignored_count
fallback_count
reason
fingerprint
```

## Next proof target

Add a render-consumption ledger that can be produced without a browser/GPU. Browser visual smoke can come after this, but should not be the first proof gate.
