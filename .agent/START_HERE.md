# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-08T02:09:17-04:00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `MyCozyIsland`.

Read this folder before changing implementation code.

## Selection reason

`MyCozyIsland` was selected from the full `LuminaryLabs-Publish` repo list because the central `LuminaryLabs-Dev/LuminaryLabs` ledger already documented the repo, but the actual publish repo was still missing root `.agent/START_HERE.md` when checked in this run.

The current selection rule prefers Publish repos that are new, ledger-absent, undocumented, or missing root `.agent` state before falling back to oldest eligible repo selection.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Current product read

`MyCozyIsland` is a standalone static Three.js cozy island scene.

The app is opened through `index.html` and currently boots `./src/main-cloudform.js?v=hero-cloud-3`.

The repo vendors its runtime domain kits under `src/kits/` so the public app does not depend on `NexusEngine-Experiments` or `NexusRealtime-ProtoKits` at runtime.

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/render-audit/cloudform-render-audit.md
.agent/cloud-system-audit/hero-cloud-cache-and-drift.md
.agent/interaction-audit/host-action-fixture-gate.md
.agent/trackers/2026-07-08T02-09-17-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T02-09-17-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
README.md
index.html
package.json
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
docs/cloud-kits.md
```

## Main rule

Do not let this publish repo become a generic kit foundry.

The repo should compose and prove the cozy island app. Reusable engine, renderer, cloud, terrain, grass, host, and replay logic should move toward `NexusRealtime-ProtoKits` or `NexusEngine` only after the local proof is stable and documented.

## Current next safe ledge

Materialize the host-action fixture gate without changing the public look.

Keep `index.html -> src/main-cloudform.js?v=hero-cloud-3` stable, preserve `globalThis.CozyIsland`, and add additive host diagnostics for route version, source fingerprint, camera rail, movement acceptance/rejection, cloud descriptor/cache state, and cloud drift results.
