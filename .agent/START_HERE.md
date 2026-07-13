# START HERE: MyCozyIsland public runtime capability audit

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Aligned:** `2026-07-13T04-10-37-04-00`  
**Status:** `public-runtime-capability-authority-audited`  
**Retained statuses:** `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

MyCozyIsland is a NexusEngine-composed procedural island Agriculture and wild-resource adventure with portable saves and WebGPU/WebGL2 presentation.

The active audit isolates the browser-global `CozyIsland` host. The top-level object is frozen, but it exposes mutable renderer, scene, camera, engine, adventure and domain-service references plus direct save capture and multi-domain reset. The host has no build-channel admission, capability grant, caller identity, command generation, revocation, bounded result journal or visible-frame correlation.

## Plan ledger

**Goal:** replace the raw browser-global ownership graph with a minimal, revocable, revision-bound capability gateway whose commands have typed results and visible-frame provenance.

- [x] Compare the ten-repository Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` by the oldest eligible documented-selection rule.
- [x] Re-read startup, engine composition, input, Inventory, Foraging, save/reset and public-host source.
- [x] Preserve all 64 source-backed kit surfaces and their offered services.
- [x] Add the timestamped tracker, turn ledger and capability audit family.
- [x] Refresh the required root `.agent` documents and machine registry.
- [x] Push documentation only to `main`; create no branch or pull request.
- [ ] Runtime gateway implementation and browser/build/Pages fixtures remain future work.

## Read this run first

```txt
.agent/trackers/2026-07-13T04-10-37-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T04-10-37-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-13T04-10-37-04-00-public-runtime-capability-dsk-map.md
.agent/render-audit/2026-07-13T04-10-37-04-00-public-mutation-visible-frame-gap.md
.agent/gameplay-audit/2026-07-13T04-10-37-04-00-global-host-direct-mutation-loop.md
.agent/interaction-audit/2026-07-13T04-10-37-04-00-capability-command-admission-result-map.md
.agent/capability-audit/2026-07-13T04-10-37-04-00-public-host-grant-revoke-contract.md
.agent/deploy-audit/2026-07-13T04-10-37-04-00-production-host-capability-fixture-gate.md
```

## Interaction loop

```txt
startup
  -> construct renderer, scene, camera, adventure and domain services
  -> install browser listeners
  -> start renderer.setAnimationLoop
  -> publish globalThis.CozyIsland with raw participant references

normal input
  -> browser adapter queues input
  -> animation loop ticks NexusEngine
  -> world, Agriculture, Foraging, HUD and render participants update

public-host invocation
  -> console or same-origin script obtains CozyIsland
  -> directly ticks adventure/engine, mutates renderer/scene/camera,
     invokes domain services, captures/restores state or resets the adventure
  -> no capability admission or command receipt
  -> the next normal frame renders whichever state remains

diagnostics
  -> getState captures current domain state
  -> no result identifies the caller, accepted mutation or visible frame
```

## Main finding

```txt
production/debug channel policy: absent
public host session and generation: absent
capability IDs and grants: absent
read versus mutate separation: absent
caller/source identity: absent
command ID and expected revision: absent
stale/duplicate rejection: absent
reset confirmation and participant receipt: absent
public-host revocation: absent
bounded observation journal: absent
first visible capability-effect frame acknowledgement: absent
```

## Required parent domain

`cozy-island-public-runtime-capability-authority-domain`

## Guardrails

- Keep renderer, simulation, domain and persistence ownership separate.
- Do not treat `Object.freeze()` on the wrapper as deep immutability or capability control.
- Do not expose raw `engine`, renderer, scene, camera or mutating domain APIs in a production host.
- Do not let diagnostics call `tick`, `loadSnapshot`, `reset` or resource mutation directly.
- Do not claim a safe public gateway until source, build and Pages fixtures prove grant, rejection, revocation and visible-frame correlation.
