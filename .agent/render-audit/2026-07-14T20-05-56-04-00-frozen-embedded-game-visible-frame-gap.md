# Render audit: frozen embedded-game visible-frame gap

**Timestamp:** `2026-07-14T20-05-56-04-00`  
**Status:** `embed-context-route-admission-authority-audited`

## Summary

Any iframe makes the game a preload candidate. Once Core Startup is playable, the bridge can clear the renderer animation loop even when no admitted shell exists to request entry. The resulting canvas may retain an old prepared frame while simulation and presentation remain asleep.

## Plan ledger

**Goal:** prevent renderer suspension until the current document has an admitted shell-preload context and guarantee a matching visible frame for every other context.

- [x] Trace renderer ownership from startup through freeze and entry.
- [x] Identify top-level-query, same-origin iframe and cross-origin iframe cases.
- [x] Preserve WebGPU/WebGL2 and first-frame ownership.
- [ ] Add context-bound renderer leases and browser frame fixtures.

## Gap

```txt
route or iframe classifier
  -> no shell handshake
  -> descriptor.playable
  -> setAnimationLoop(null)
  -> no guaranteed entry command
  -> no FirstContextAdmittedGameFrameAck
```

## Required evidence

```txt
ContextAdmissionId
RendererRevision
AnimationLoopRevision
ShellGeneration or DirectPlayGeneration
suspension decision receipt
first submitted frame receipt
iframe visibility receipt when shell-owned
FirstContextAdmittedGameFrameAck
```

## Acceptance cases

```txt
top-level game.html stays live
top-level game.html?preload=1 does not silently freeze
admitted menu iframe sleeps and resumes
same-origin arbitrary iframe follows explicit standalone policy
cross-origin iframe follows explicit unsupported/standalone policy
wrong parent cannot acquire entry authority
first frame matches the admitted context generation
```

No rendering behavior changed in this audit.