# Architecture audit: accessible HUD and progress projection DSK map

**Timestamp:** `2026-07-15T19-58-42-04-00`  
**Status:** `accessible-hud-progress-interaction-projection-authority-audited`

## Summary

Gameplay domains should remain authoritative for state. The missing layer is a renderer-neutral semantic projection domain between accepted snapshots and DOM/accessibility effects.

## Plan ledger

**Goal:** define ownership without coupling simulation to ARIA or browser focus APIs.

- [x] Keep startup truth in Core Startup.
- [x] Keep objective, stamina, inventory, seed and interaction truth in their current domains.
- [x] Keep visual projection in Three.js and DOM adapters.
- [x] Add semantic snapshot, change classification, announcement and focus results between them.
- [ ] Implement and prove the boundary.

## Domain map

```txt
Core Startup + gameplay domains
  -> cozy-render-snapshot-domain-kit
     -> accepted visual frame descriptor
     -> AccessibleSemanticSnapshot

accessible projection authority
  -> semantic revision
  -> meaningful-change classification
  -> progress/resource/selection descriptors
  -> announcement arbitration
  -> document/focus admission
  -> AccessibleProjectionResult

browser accessibility adapter
  -> progressbar/status/alert/list semantics
  -> labels and values
  -> focus adoption
  -> accessibility-tree update

proof
  -> FirstAccessibleMenuFrameAck
  -> FirstAccessibleGameplayFrameAck
```

## Existing ownership

The repository retains 14 engine-installed kits, 50 cataloged world/render/host kits, one ocean-composition kit and five browser/product adapters. Their complete IDs and services are preserved in the timestamped tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
cozy-island-accessible-hud-progress-focus-authority-domain
```

## DSK split

```txt
semantic-state subdomain
  accessible-semantic-snapshot-kit
  accessible-semantic-revision-kit
  semantic-change-classification-kit

startup/menu subdomain
  menu-progress-status-kit
  menu-play-action-identity-kit
  startup-progressbar-projection-kit

gameplay HUD subdomain
  stamina-progressbar-projection-kit
  resource-group-semantic-kit
  seed-selection-semantic-kit
  interaction-status-projection-kit
  gameplay-canvas-alternative-kit

announcement subdomain
  objective-announcement-policy-kit
  save-status-announcement-policy-kit
  failure-alert-policy-kit
  announcement-deduplication-kit
  announcement-rate-policy-kit

focus/proof subdomain
  document-focus-identity-kit
  focus-admission-result-kit
  first-accessible-menu-frame-ack-kit
  first-accessible-gameplay-frame-ack-kit
  accessibility-source-build-pages-fixture-kit
```
