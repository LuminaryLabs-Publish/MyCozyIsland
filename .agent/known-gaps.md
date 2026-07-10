# Known Gaps: MyCozyIsland

Last updated: 2026-07-10T14-42-01-04-00

## Highest-priority gap

The WebGPU route has deterministic source descriptors and aggregate runtime diagnostics, but it has no shared frame identity or causal proof journal.

## Specific gaps

- No normalized route profile or stable source/catalog fingerprint.
- No monotonic host sequence shared by input, scenario, camera, performance, and render records.
- No `frameId` for one animation-loop iteration.
- No `correlationId` linking an input command to its result and downstream frame effects.
- Input handlers mutate camera/input state directly without accepted, rejected, clamped, or no-change records.
- Scenario ticks and camera projections are not retained as source-backed records.
- Atmosphere volume texture creation reports a live object/source value but no JSON-safe build record.
- Performance callbacks change cloud/fog/pixel-ratio state without a transition record.
- Render submission has no record of the source snapshot, camera, quality level, or consumer outcomes it used.
- `globalThis.CozyIsland.getState()` returns current aggregates rather than ordered history.
- Live Three/WebGPU objects are not suitable for deterministic Node assertions.
- No bounded retention policy, reset behavior, or journal-overflow proof.
- No additive JSON-safe `globalThis.CozyIslandHost`.
- No DOM-free Node frame-correlation fixture.

## System-specific gaps

### Vegetation and grass

Placement and ground-contact rows exist at source composition time, but there is no source-revision/frame attribution proving which vegetation graph the world consumer rendered.

### Clouds and fog

Cloud/fog recipes and consumers exist, but texture build, fallback source, step-scale changes, and render submission are not tied to one source revision and frame chain.

### Camera and interaction

Wheel, drag, keyboard, blur, and resize can affect subsequent frames, but there is no command/result-to-camera correlation.

## Deferred work

Do not prioritize visual, cloud, ocean, fog, grass, camera, renderer, route-token, new-content, or screenshot work until the causal proof journal exists.

## Safe next ledge

```txt
MyCozyIsland WebGPU Frame Correlation Journal + Node Fixture Gate
```