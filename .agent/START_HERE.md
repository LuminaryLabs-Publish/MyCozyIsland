# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-09T14-28-45-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `MyCozyIsland`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` organization repo list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, missing sampled root `.agent/START_HERE.md` state, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`MyCozyIsland` was selected as the oldest eligible documented fallback and central-ledger/pointer repair target. This pass advances the repo-local audit pointer to `2026-07-09T14-28-45-04-00` after same-hour catch-up work.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T12-30-09-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T14-16-00-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T13-38-15-04-00
LuminaryLabs-Publish/MyCozyIsland         selected / host-readback pointer repair
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T13-00-37-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T12-00-36-04-00
```

## Current route

```txt
index.html
  -> canvas#game, #cloud-loader, #error
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> local source-domain descriptor kits
  -> inline renderer/input/movement/camera/smoke/flame/cloud/grass consumers
  -> globalThis.CozyIsland legacy diagnostics
```

## Current interaction loop

```txt
static browser route
  -> load src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN and local source-domain kits
  -> construct island, ocean floor, foliage graph, clearing graph, grass placement, grass wind, campfire, smoke, clouds, and hero-cloud descriptors
  -> create Three.js renderer, scene, camera, lights, fog, water, terrain, floor, foam, path, foliage, fence, campfire, smoke, grass, and point-cloud clouds
  -> install resize, keyboard, wheel, pointerdown, pointerup, and pointermove handlers
  -> wheel mutates scroll progress directly
  -> pointer mutates yaw before first-person and yaw/pitch after first-person
  -> rail() samples the sky-to-eye camera curve while progress < 0.985
  -> keyboard movement unlocks at progress >= 0.985
  -> valid(next) accepts or rejects movement by clearing radius and campfire keepout only
  -> frame updates sea bob, first-person movement or rail camera, smoke, flame, cloud drift, flame scale, and renderer
  -> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
```

## Latest files

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-09T14-28-45-04-00-host-readback-pointer-repair-dsk-map.md
.agent/render-audit/2026-07-09T14-28-45-04-00-render-cloud-grass-host-readback.md
.agent/interaction-audit/2026-07-09T14-28-45-04-00-input-rail-movement-result-map.md
.agent/cloud-system-audit/2026-07-09T14-28-45-04-00-cloud-cache-drift-readback-contract.md
.agent/grass-system-audit/2026-07-09T14-28-45-04-00-grass-placement-instance-readback-contract.md
.agent/host-proof-audit/2026-07-09T14-28-45-04-00-cozy-island-host-state-contract.md
.agent/deploy-audit/2026-07-09T14-28-45-04-00-browser-consumer-fixture-check-map.md
.agent/trackers/2026-07-09T14-28-45-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T14-28-45-04-00.md
.agent/kit-registry.json
```

## Next safe ledge

```txt
MyCozyIsland Host Readback Pointer Repair + Browser Consumer Fixture Gate
```

## Operating rules

```txt
Only push to main.
Do not create branches.
Do not work on TheCavalryOfRome.
Keep scheduled repo breakdowns moving; do not pause the loop.
```
