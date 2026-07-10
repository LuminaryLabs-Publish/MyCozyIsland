# Known Gaps: MyCozyIsland

Last updated: 2026-07-10T16-08-56-04-00

## Highest-priority gap

Adaptive quality is not represented as one authoritative, reversible transaction. Policy state lives in `createPerformanceBudget()`, while renderer mutation lives inline in `src/main-cloudform.js`.

## Specific gaps

- The policy samples callback-to-callback `frameMs`, not an explicitly named render or GPU cost.
- Sampling occurs before `postPipeline.render()`, so the current sample cannot represent the submission that follows it.
- `trackTimestamp: true` is enabled, but timestamp results are not consumed.
- No source field distinguishes RAF interval, CPU submit duration, GPU timestamp duration, or fallback timing.
- No immutable descriptor defines the complete target settings for quality levels `0`, `1`, and `2`.
- Quality mutation is incremental and split across cloud, fog, post, and renderer objects.
- Recovery to level `0` does not call `renderer.setPixelRatio()`, so reduced DPR can persist after reported recovery.
- No transition result records previous level, next level, reason, metric, thresholds, or applied settings.
- No apply result proves that every consumer accepted the requested state.
- `performanceBudget.getState()` omits over-budget and under-budget counters.
- No bounded performance transition history exists.
- The debug overlay labels aggregate FPS but does not identify metric source or quality transition history.
- No frame identity links a performance decision to scenario state, camera projection, input, or render submission.
- `globalThis.CozyIsland` exposes mutable live objects and aggregate state rather than JSON-safe transition proof.
- No DOM-free adaptive-quality fixture exists.

## System-specific gaps

### Clouds and fog

Cloud step scale, fog step scale, and fog render resolution are adapted, but there is no absolute applied-state readback. The fixed cloud/fog volume texture dimensions and source are not included in transition results.

### Vegetation and grass

Vegetation density and geometry are selected during initial snapshot composition from `quality.vegetationScale`. Runtime degrade/recover levels do not alter vegetation, so the current performance level is only a partial quality state and cannot be interpreted as a complete scene LOD level.

### Ocean and world rendering

Ocean segment count, terrain resolution, shadow-map size, and world geometry remain startup decisions. They should be explicitly marked unchanged in runtime quality states rather than silently omitted.

### Camera and interaction

Wheel, drag, movement, resize, and debug toggles can affect frame load, but no correlation record identifies whether a load spike followed an input or viewport change.

### Host proof

No additive host surface reports metric source, transition order, absolute settings, apply results, or exact recovery.

## Deferred work

Do not prioritize visual, cloud, fog, ocean, vegetation, grass, camera, renderer, route-token, new-content, or screenshot work until adaptive quality is deterministic, reversible, and fixture-backed.

## Safe next ledge

```txt
MyCozyIsland Adaptive Quality Transition Authority + Frame-Cost Fixture Gate
```