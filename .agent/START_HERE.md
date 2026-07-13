# START HERE: MyCozyIsland public runtime capability reconciliation

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Aligned:** `2026-07-13T04-21-10-04-00`  
**Status:** `public-runtime-capability-publication-central-reconciled`  
**Technical status:** `public-runtime-capability-authority-audited`  
**Retained statuses:** `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

MyCozyIsland is a NexusEngine-composed procedural island Agriculture and wild-resource adventure with portable saves and WebGPU/WebGL2 presentation. The active finding is that successful browser startup publishes `globalThis.CozyIsland` with live mutable renderer, scene, camera, adventure, raw engine and domain-service owners. The capability audit was newer than central tracking; this entrypoint now routes to the synchronized audit generation.

## Plan ledger

**Goal:** replace raw public ownership with detached projections and revisioned capability commands while keeping repo-local and central documentation synchronized.

- [x] Compare the ten-repository Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Detect MyCozyIsland capability documentation newer than the central ledger.
- [x] Select and modify only `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Re-read global host publication and representative mutating services.
- [x] Preserve all 64 source-backed kit surfaces and their services.
- [x] Add the `2026-07-13T04-21-10-04-00` reconciliation family.
- [x] Refresh required root `.agent` documents and machine state.
- [ ] Implement channel policy, grants, command admission, revocation and fixtures.

## Read this run first

```txt
.agent/trackers/2026-07-13T04-21-10-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T04-21-10-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-13T04-21-10-04-00-public-runtime-capability-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-13T04-21-10-04-00-public-render-owner-visible-frame-reconciliation-gap.md
.agent/gameplay-audit/2026-07-13T04-21-10-04-00-global-host-direct-mutation-reconciliation-loop.md
.agent/interaction-audit/2026-07-13T04-21-10-04-00-capability-command-publication-reconciliation-map.md
.agent/capability-audit/2026-07-13T04-21-10-04-00-public-host-grant-revoke-reconciliation-contract.md
.agent/deploy-audit/2026-07-13T04-21-10-04-00-production-host-capability-central-fixture-gate.md
.agent/central-sync-audit/2026-07-13T04-21-10-04-00-repo-ledger-public-capability-reconciliation.md
```

## Interaction loop

```txt
startup -> compose runtime/render participants -> start frame loop -> publish globalThis.CozyIsland
normal input -> cozy-input -> tick -> domain transitions -> renderer-neutral frame -> visible frame
public caller -> live owners/APIs -> unadmitted mutation -> later normal frame projects remaining state
pagehide -> save + partial renderer disposal -> no public-host revoke result
```

## Main finding

```txt
production/debug/support channel policy: absent
capability manifest and bounded grants: absent
caller and command identity: absent
expected runtime/domain/render revision: absent
duplicate and stale rejection: absent
raw renderer/scene/camera/engine exclusion: absent
participant change and reset receipts: absent
host expiry and terminal revocation: absent
bounded public observations: absent
first visible capability-effect acknowledgement: absent
source/build/Pages capability fixtures: absent
```

## Required parent domain

```txt
cozy-island-public-runtime-capability-authority-domain
```

## Guardrails

```txt
Push only to main.
Create no branch or pull request.
Do not work on TheCavalryOfRome.
Do not publish raw renderer, scene, camera, engine or domain owners as capabilities.
Do not treat Object.freeze on the wrapper as deep immutability.
Do not permit mutating public commands without explicit grants and expected revisions.
Do not claim production safety until source, build and Pages fixtures pass.
```

Page-lifecycle, adaptive-quality, durable-save and browser-input audits remain valid in their timestamped families.