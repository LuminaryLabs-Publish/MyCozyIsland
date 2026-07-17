# Architecture audit — Page lifecycle retirement DSK map

**Timestamp:** `2026-07-17T08-01-59-04-00`  
**Authority:** `cozy-island-page-lifecycle-runtime-suspension-retirement-authority-domain`

## Existing ownership graph

```txt
menu shell
  -> menu renderer
  -> preload iframe
  -> game preload bridge

game host
  -> Core Startup
  -> adventure engine and domains
  -> browser input listeners
  -> renderer animation loop
  -> scene and camera
  -> world/gameplay renderers
  -> atmosphere volume textures
  -> cloud/fog/ocean/foam/post resources
  -> save host adapter
  -> global CozyIsland publication
```

Existing components expose partial lifecycle services:

- Menu renderer: loop stop, resize-listener removal, geometry/material/atlas/renderer disposal.
- Gameplay renderer: group geometry/material disposal and map clearing.
- Startup host: global error-listener removal.
- Input domain: held-state clear.
- Preload bridge: simulation and presentation freeze/resume.
- Renderer disposal utility: object geometry/material/texture traversal.

No parent DSK composes those services into one page-lifecycle transaction.

## Proposed parent domain

`cozy-island-page-lifecycle-runtime-suspension-retirement-authority-domain`

### Child kit map

```txt
n:host:lifecycle
├─ admission
│  ├─ page-lifecycle-event-admission-kit
│  ├─ host-session-identity-kit
│  ├─ runtime-generation-identity-kit
│  └─ lifecycle-persisted-classifier-kit
├─ suspension
│  ├─ runtime-suspension-result-kit
│  ├─ renderer-loop-suspension-kit
│  ├─ held-input-retirement-kit
│  └─ frame-clock-rebase-kit
├─ retirement
│  ├─ runtime-retirement-result-kit
│  ├─ listener-lease-retirement-kit
│  ├─ scene-resource-retirement-kit
│  ├─ gpu-renderer-retirement-kit
│  ├─ volume-texture-retirement-kit
│  ├─ post-pipeline-retirement-kit
│  ├─ startup-host-retirement-kit
│  ├─ stale-callback-rejection-kit
│  └─ global-host-publication-retirement-kit
└─ proof
   ├─ first-resumed-frame-ack-kit
   └─ bfcache-browser-artifact-pages-fixture-kit
```

## Command/result ownership

- Browser adapter emits lifecycle facts only.
- Parent lifecycle domain classifies and allocates the transition identity.
- Simulation domains do not read browser events directly.
- Suspension preserves only declared resources.
- Terminal retirement is apply-once and destructive.
- Resume requires the exact suspended generation and a fresh clock baseline.
- Save settlement remains owned by the separate save-durability authority and participates by result.
- Visible readiness is not claimed until `FirstResumedFrameAck`.

## Non-goals

- No broader engine restructure.
- No new renderer architecture.
- No change to Agriculture, Foraging, world generation or menu composition.
- No assumption that all pagehide events are terminal.
