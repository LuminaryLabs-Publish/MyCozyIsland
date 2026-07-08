# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-08T07:30:30-04:00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `MyCozyIsland`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

No checked non-Cavalry Publish repo was found that was fully new, central-ledger absent, or missing root `.agent/START_HERE.md` state.

`MyCozyIsland` was selected as a fallback follow-up target because the previous docs identified the correct host-proof fixture direction, but the repo-local acceptance target still needed concrete pass/fail contracts and the kit registry was stale relative to the latest `.agent` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Current product read

`MyCozyIsland` is a standalone static Three.js cozy island scene.

The active route remains:

```txt
index.html -> ./src/main-cloudform.js?v=hero-cloud-3
```

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
.agent/host-proof-audit/fixture-matrix.md
.agent/host-proof-audit/acceptance-ledger.md
.agent/trackers/2026-07-08T07-30-30-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T07-30-30-04-00.md
.agent/kit-registry.json
```

Earlier breakdown entries:

```txt
.agent/trackers/2026-07-08T06-01-57-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T06-01-57-04-00.md
.agent/trackers/2026-07-08T04-10-24-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T04-10-24-04-00.md
.agent/trackers/2026-07-08T02-09-17-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T02-09-17-04-00.md
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

The repo should compose and prove the cozy island app. Reusable engine, renderer, cloud, terrain, grass, host, and replay logic should move toward `NexusRealtime-ProtoKits` or `NexusEngine` only after the local proof is stable, documented, and covered by fixtures.

## Current next safe ledge

```txt
MyCozyIsland Host Proof Acceptance Fixture Gate
```

Keep `index.html -> src/main-cloudform.js?v=hero-cloud-3`, current visuals, and `globalThis.CozyIsland` stable while adding additive host-proof records and DOM-free fixture cases for route version, source profile, source fingerprint, scene source snapshot, action frames/results, movement policy results, camera rail snapshots, hero-cloud descriptor/cache snapshots, cloud drift results, and `globalThis.CozyIslandHost` diagnostics.
