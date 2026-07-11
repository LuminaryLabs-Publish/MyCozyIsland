# Project Breakdown: MyCozyIsland Browser Startup Admission

Timestamp: `2026-07-11T14-41-28-04-00`

## Summary

`MyCozyIsland` was selected as the oldest eligible centrally tracked Publish repository. The audit found a split startup failure model: static CDN module failures occur before `main().catch(fail)`, while later stage failures are visible but do not roll back acquired renderer, world or GPU resources.

## Plan ledger

**Goal:** document one startup authority from module-source admission through first visible frame, with reverse rollback and explicit retry.

- [x] List all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with central ledger timestamps and root `.agent` state.
- [x] Select only `MyCozyIsland`.
- [x] Read route, import map, startup host, Core World runtime, renderer factories and test entrypoint.
- [x] Identify interaction loop, domains, services, 50 local kits, six imported NexusEngine services and seven providers.
- [x] Add architecture, render, gameplay, interaction, startup and deploy audits.
- [x] Refresh all required root `.agent` documents.
- [x] Push only to `main`; create no branch or pull request.

## Selection comparison

```txt
MyCozyIsland      2026-07-11T12-58-06-04-00 selected
TheOpenAbove      2026-07-11T13-10-35-04-00
HorrorCorridor    2026-07-11T13-20-45-04-00
PhantomCommand    2026-07-11T13-28-37-04-00
ZombieOrchard     2026-07-11T13-41-23-04-00
TheUnmappedHouse  2026-07-11T13-49-30-04-00
AetherVale        2026-07-11T14-00-01-04-00
IntoTheMeadow     2026-07-11T14-08-51-04-00
PrehistoricRush   2026-07-11T14-31-27-04-00
TheCavalryOfRome  excluded
```

## Interaction loop

```txt
import map and module fetch
  -> route module evaluation
  -> main()
  -> renderer init and backend inference
  -> quality selection
  -> Core World create/prepare
  -> scene and GPU resource creation
  -> input/listener installation
  -> loader timers
  -> animation loop
  -> pagehide callback
  -> global host
```

## Domains

```txt
module-source and route admission
startup staging and rollback
renderer backend and startup quality
runtime session lifecycle
Core World and providers
semantic island world
environment and atmosphere
scenario and input
rendering and post processing
adaptive performance and diagnostics
validation and Pages deployment
```

## Main finding

```txt
static module failure before main(): unhandled by route UI
partial startup rollback: absent
backend admission result: absent
startup generation and retry: absent
first-frame readiness receipt: absent
```

## Files reviewed

```txt
index.html
package.json
src/main-cloudform.js
src/world/world-runtime.js
src/kits/index.js
src/kits/renderers.js
src/kits/renderer-atmosphere.js
tests/static-check.mjs
.agent existing routing and registry files
central Publish ledgers
```

## Runtime change boundary

Documentation only. No runtime, dependency, rendering, deployment, branch or pull-request change was made.