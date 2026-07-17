# Next steps: page lifecycle runtime suspension and retirement

## Checklist

- [ ] Add one product-level lifecycle authority without moving browser events into simulation domains.
- [ ] Allocate `HostSessionId`, `RuntimeGeneration`, `RendererGeneration` and `LifecycleTransitionId`.
- [ ] Classify `pagehide.persisted`, terminal `pagehide`, hidden visibility and persisted `pageshow`.
- [ ] Route BFCache entry through `RuntimeSuspensionCommand`.
- [ ] Stop the gameplay animation loop before suspended or terminal settlement.
- [ ] Clear held input, drag ownership and queued one-shot input.
- [ ] Rebase `last` and simulation timing before a resumed frame.
- [ ] Retain only resources explicitly proven BFCache-safe.
- [ ] Route terminal unload through `RuntimeRetirementCommand`.
- [ ] Remove wheel, pointer, keyboard, blur, visibility and resize listeners.
- [ ] Call `startupHost.dispose()` and retire preload-bridge listeners/timers.
- [ ] Dispose world, gameplay, cloud, fog, ocean, foam, post, sky, volume textures and renderer ownership exactly once.
- [ ] Clear or replace `globalThis.CozyIsland` only after retirement settlement.
- [ ] Reject stale animation, preload and lifecycle callbacks from retired generations.
- [ ] Reuse the save-durability command/result path before terminal retirement.
- [ ] Publish `RuntimeSuspensionResult`, `RuntimeRetirementResult` and `RuntimeResumeResult`.
- [ ] Publish `FirstResumedFrameAck` after the first matching resumed frame.
- [ ] Add repeat-hide/show, BFCache back/forward, reload and terminal-close fixtures.
- [ ] Add WebGPU/WebGL2 resource-count and context-loss/recovery observations.
- [ ] Validate source, static artifact and Pages-origin lifecycle parity.
- [ ] Retain save-durability, menu ready-handoff, adaptive-quality and pointer-gesture work as separate unresolved authorities.

## Implementation order

1. Lifecycle identity, persisted classification and command/results.
2. Loop/input/listener suspension.
3. Full apply-once terminal retirement.
4. BFCache resource validation and clock rebase.
5. Save-retirement settlement and stale-callback rejection.
6. First resumed-frame acknowledgement.
7. Browser, artifact and Pages fixtures.
