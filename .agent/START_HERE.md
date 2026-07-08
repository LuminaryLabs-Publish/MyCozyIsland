# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-08T13-11-07-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `MyCozyIsland`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against central `LuminaryLabs-Dev/LuminaryLabs` tracking.

No checked non-Cavalry Publish repo was found that was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`MyCozyIsland` was selected as the oldest observed eligible fallback because its last sampled repo-local alignment was `2026-07-08T11-40-00-04-00`, older than the other checked non-excluded roots, and the host-proof fixture seam is still unresolved.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T12-29-17-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T12-01-23-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled alignment 2026-07-08T11-49-04-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest sampled alignment 2026-07-08T12-41-31-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T12-09-27-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest sampled alignment 2026-07-08T12-51-50-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T12-21-20-04-00
LuminaryLabs-Publish/MyCozyIsland        selected fallback / latest sampled alignment 2026-07-08T11-40-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest sampled alignment 2026-07-08T12-59-11-04-00
```

## Current product read

`MyCozyIsland` is a standalone static Three.js cozy island scene with local source-domain kits for island landform, ocean floor, foliage, grass, wind, fenced clearing, campfire, smoke, Mattatz-style clouds, and a hero-cloud form.

The current route is:

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
```

## Current interaction loop

```txt
open route
  -> cloud loader progresses
  -> local source-domain descriptors are created
  -> inline Three.js adapters build the island, ocean, grass, clearing, campfire, smoke, and hero-cloud scene
  -> wheel input advances the sky-to-clearing camera rail
  -> pointer drag mutates yaw/look state
  -> keyboard movement unlocks after first-person threshold
  -> movement is checked against clearing radius and campfire keepout policy
  -> sea, fire, smoke, clouds, camera, and first-person state animate per frame
  -> renderer draws the scene
  -> globalThis.CozyIsland exposes limited compatibility state
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T13-11-07-04-00-host-proof-dsk-breakdown.md
.agent/render-audit/2026-07-08T13-11-07-04-00-render-host-snapshot-readback.md
.agent/interaction-audit/2026-07-08T13-11-07-04-00-action-movement-rail-contract.md
.agent/cloud-system-audit/2026-07-08T13-11-07-04-00-cloud-cache-drift-proof-contract.md
.agent/host-proof-audit/2026-07-08T13-11-07-04-00-fixture-row-contract.md
.agent/trackers/2026-07-08T13-11-07-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T13-11-07-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
README.md
package.json
index.html
src/main-cloudform.js
src/kits/ocean-island-landform-domain/index.js
src/kits/island-foliage-domain/index.js
src/kits/ocean-floor-domain/index.js
src/kits/grass-object-domain/index.js
src/kits/grass-wind-domain/index.js
src/kits/campfire-object-domain/index.js
src/kits/smoke-particle-domain/index.js
src/kits/fenced-clearing-domain/index.js
src/kits/mattatz-clouds-domain/index.js
src/kits/cozy-hero-cloud-form-kit/index.js
```

## Main rule

Keep the visible route and current visuals stable.

Do not turn this publish repo into a generic engine repo.

The next implementation should add pure host-proof modules first, then wire them additively into `src/main-cloudform.js` through `globalThis.CozyIslandHost`.

Do not remove or change the compatibility surface:

```txt
globalThis.CozyIsland
```

## Current next safe ledge

```txt
MyCozyIsland Host Proof Fixture Row Contract + CozyIslandHost Snapshot Gate
```

Stop that ledge when fixture rows prove route version, source profile, source fingerprint, scene source snapshot, action results, movement policy, rail samples, hero-cloud descriptor/cache snapshots, cloud drift, render host snapshot, and additive host diagnostics without requiring DOM, canvas, Three.js, browser, or a static server.
