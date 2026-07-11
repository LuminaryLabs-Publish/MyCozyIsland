# Next Steps: MyCozyIsland

Last updated: `2026-07-10T20-48-55-04-00`

## Goal

Create one route-owned runtime-session boundary that can start, stop, dispose, and restart the current WebGPU scene without changing its visual output.

## Checklist

- [ ] Introduce a session ID and explicit states: `created`, `starting`, `running`, `stopping`, `disposed`, `failed`.
- [ ] Return a host controller from route construction instead of discarding lifecycle authority inside `main()`.
- [ ] Retain the animation-loop callback and stop it with `renderer.setAnimationLoop(null)`.
- [ ] Register every canvas/window listener through one listener ledger.
- [ ] Remove all listeners during stop/dispose and make repeated removal a typed no-op.
- [ ] Add startup rollback for partial failures after renderer initialization.
- [ ] Add child resource owners for sky, world/grass, volume textures, clouds, fog, ocean, foam, post, and renderer.
- [ ] Require every renderer factory to expose `dispose()` and a JSON-safe ownership snapshot.
- [ ] Dispose shared resources exactly once and document shared geometry/material ownership.
- [ ] Publish lifecycle state, session ID, resource counts, and bounded result rows through `CozyIslandHost` or an additive `CozyIsland.lifecycle` surface.
- [ ] Preserve the existing route token, 50-kit catalog, camera behavior, visuals, and WebGL2 fallback.
- [ ] Add DOM-free lifecycle policy tests.
- [ ] Add browser start-stop-dispose-restart smoke coverage.
- [ ] Assert no duplicate listener, animation loop, or live resource counts after restart.
- [ ] Keep the layered-grass consumer/resource ledger as the first child-resource fixture.

## Next safe ledge

```txt
MyCozyIsland Runtime Session Lifecycle Authority + WebGPU Resource Disposal Fixture Gate
```

## Order after this ledge

```txt
1. route session lifecycle and rollback
2. child resource ownership, beginning with layered grass
3. source-consumer and render attribution journals
4. deterministic input/frame correlation
5. visual or content expansion
```

## Do not combine with

- grass density or atlas tuning
- cloud/fog/ocean shader changes
- camera rail retuning
- terrain regeneration changes
- renderer replacement
- new content or route-token changes
