# Known Gaps: MyCozyIsland

Last updated: `2026-07-10T20-48-55-04-00`

## Highest-priority gap

The active route has no authoritative runtime-session owner. `main()` creates the renderer, scene, listeners, animation loop, render resources, and host exposure, but no object owns the complete stop/dispose/restart transaction.

## Lifecycle gaps

- no session ID or lifecycle state machine
- no retained stop or dispose controller
- no coordinated listener removal
- no animation-loop cancellation contract
- no startup rollback after partial allocation
- no idempotent disposal result
- no restart or hot-reload proof
- no lifecycle state in host readback

## Resource ownership gaps

- sky `CanvasTexture`, material, and sphere geometry are not retained by a route resource owner
- atmosphere storage/data textures and compute nodes expose no disposal contract
- cloud renderer shares geometry and materials without explicit reference ownership
- fog geometry/material ownership is implicit
- ocean geometry/material ownership is implicit
- foam geometry/material ownership is implicit
- post-processing targets/nodes are not represented in a route resource ledger
- base world and layered grass resources do not compose one disposal boundary
- renderer disposal is not coordinated with child resources

## Interaction and frame gaps

- listener registrations have no typed IDs or session association
- input calls return no accepted/rejected/no-op result rows
- frame IDs are absent
- input sequences are not correlated with committed frames
- performance degrade/recover decisions are not journaled
- diagnostic drawing is periodic latest-state only

## Host proof gaps

`globalThis.CozyIsland` exposes live renderer objects and a latest aggregate snapshot. It does not expose:

```txt
sessionId
lifecycleState
start/stop/dispose results
listener counts
animation-loop ownership
resource family counts
resource release counts
partial-start rollback results
bounded lifecycle journal
JSON-safe source/consumer proof rows
```

## Validation gaps

The current `npm test` gate validates the 50-kit catalog, deterministic-source restrictions, renderer feature tokens, import map, route script, and alert markup. It does not instantiate or dispose the browser route and cannot detect duplicate loops, listeners, or leaked GPU resources.

## Preserved prior gap

The layered-grass consumer ledger and resource-owner fixture remain required. They should be implemented as the first child owner beneath the route session instead of as an isolated lifecycle system.
