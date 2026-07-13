# Architecture audit: Core Startup and static bootstrap admission DSK map

**Timestamp:** `2026-07-13T10-41-40-04-00`

## Summary

Core Startup is now correctly composed as factual launch state inside the same NexusEngine instance as the adventure. The missing architecture sits outside that domain: a small browser-host authority must admit the static module graph before Core Startup can exist, then bind the accepted module/provider generation to the Core Startup launch and first visible frame.

## Plan ledger

**Goal:** preserve Core Startup as a neutral readiness domain while assigning browser module admission, provider failure and visible-frame proof to explicit host-side kits.

- [x] Map current startup ownership.
- [x] Map all engine-installed domains and presentation adapters.
- [x] Separate Core Startup facts from product copy and DOM rendering.
- [x] Identify the pre-Core static-module gap.
- [x] Define command, result, generation and proof boundaries.
- [ ] Implement without moving product wording or renderer implementation into Core.

## Current composition

```txt
index.html/import map
  -> static module graph
  -> cozy-startup-host
      -> core-startup-kit
      -> browser-startup-presentation-adapter
  -> renderer/composition/continuation/world/input preparations
  -> first render call
  -> playable entry
```

## Current bounded domains

| Domain | Current owner |
|---|---|
| launch/preparation/readiness/failure | `n:core-startup` |
| product preparation order and wording | `cozy-startup-host` |
| loading DOM and CSS | browser startup presentation adapter plus `index.html` |
| renderer/backend initialization | Three.js browser host |
| adventure service installation | `createCozyAdventure()` |
| save continuation selection | cozy save domain plus startup host |
| world construction | renderer/host kits |
| input readiness | cozy input domain plus browser adapters |
| playable frame loop | `src/main-adventure.js` |
| static module/provider admission | unowned |
| visible first-frame proof | unowned |

## Required parent domain

```txt
cozy-island-static-module-bootstrap-admission-authority-domain
```

This is a product/browser-host authority, not a new generic gameplay domain and not a reason to expand Core Startup with DOM or network-provider implementation.

## Required command and result flow

```txt
StaticBootstrapCommand
  -> BootstrapGeneration
  -> immutable ProviderManifest
  -> local failure projection installed
  -> bounded browser module load
  -> ModuleGraphAdmissionResult
      Accepted
      Rejected
      TimedOut
      Cancelled
      Stale
  -> BootstrapExportContractResult
  -> CoreStartupLaunchBinding
  -> Core Startup preparations
  -> FirstRenderSubmitResult
  -> VisibleStartupFrameAck
  -> PlayableEntryResult
```

## Required kits

```txt
bootstrap-generation-kit
bootstrap-provider-manifest-kit
bootstrap-command-kit
static-shell-failure-projection-kit
module-import-timeout-kit
module-graph-admission-result-kit
provider-source-receipt-kit
provider-version-integrity-kit
bootstrap-export-contract-kit
core-startup-launch-binding-kit
stale-bootstrap-rejection-kit
duplicate-bootstrap-rejection-kit
bootstrap-cancellation-kit
bootstrap-retry-policy-kit
bootstrap-fallback-policy-kit
bootstrap-observation-kit
bootstrap-journal-kit
first-render-submit-result-kit
visible-startup-frame-kit
first-visible-startup-ack-kit
bootstrap-disposal-kit
```

## Invariants

```txt
no Core Startup launch before module admission
no adventure engine mutation after rejected bootstrap
one accepted bootstrap generation owns one Core Startup launch
one launch uses one shared engine for startup and gameplay
product copy remains outside Core Startup
DOM remains outside Core Startup
playable entry requires accepted module graph, ready preparations,
accepted first-render submission and matching visible-frame acknowledgement
stale bootstrap callbacks cannot mutate the successor generation
```

## Existing kit/service inventory impact

Core Startup increases the engine-installed kit count from 13 to 14 and the source-backed kit total from 64 to 65. The existing 50 cataloged world/render/host kits and one ocean composition kit remain unchanged. `browser-startup-presentation-adapter` and `cozy-startup-host` are adapters outside the kit census.

## Validation boundary

Architecture documentation only. No DSK, adapter, runtime, package or deployment implementation changed.