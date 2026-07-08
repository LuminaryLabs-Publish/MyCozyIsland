# Host Proof Audit: Fixture Matrix

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T06:01:57-04:00`

## Purpose

This audit defines the next proof boundary for `MyCozyIsland`.

The current route and visuals should stay stable. The next work should add fixture-readable host proof records around route version, scene source, action results, movement rejection reasons, camera rail state, hero cloud cache state, and cloud drift.

## Current source anchors

```txt
index.html
  ./src/main-cloudform.js?v=hero-cloud-3

src/main-cloudform.js
  imports Three.js from CDN
  imports local domain kits from src/kits/
  creates source descriptors
  creates Three.js render objects inline
  updates smoke, campfire, camera, movement, and cloud drift in frame loop
```

## Why this is needed

The app is visually and compositionally useful, but most host decisions are still implicit browser runtime facts.

Examples:

```txt
- Route version is a query token in index.html, not a result object.
- Source profile is a set of inline constants, not a stable descriptor.
- Scene source state is composed at runtime, but not snapshotted.
- Movement acceptance/rejection happens through inline policy checks, but no MovementPolicyResult exists.
- Cloud geometry is cached, but cache state is not a host-readable snapshot.
- Cloud drift is animated, but drift outcomes are not deterministic result records.
- globalThis.CozyIsland is a compatibility surface, not a complete proof surface.
```

## Fixture matrix

| Case | Input | Expected result | Why it matters |
|---|---|---|---|
| route-version | `./src/main-cloudform.js?v=hero-cloud-3` | `version: hero-cloud-3` | Prevents stale route script confusion. |
| source-profile | fixed default seed/radius/cloud settings | stable `SourceProfile` | Gives source constants one authority. |
| source-fingerprint | same profile twice | identical fingerprint | Enables regression proof. |
| scene-source-snapshot | fixed profile | landform/floor/grass/clearing/campfire/smoke/cloud summaries present | Separates source truth from renderer truth. |
| wheel-action | positive wheel delta | accepted `ActionResult` and changed rail progress | Proves camera rail commands without DOM. |
| pointer-action | drag delta | accepted `ActionResult` and changed yaw | Proves look input without pointer events. |
| move-accepted | movement inside clearing | accepted movement result | Proves movement command path. |
| move-rejected-boundary | movement outside clearing radius | rejected with `clearing-boundary` | Makes rejection explicit. |
| move-rejected-campfire | movement into campfire keepout | rejected with `campfire-keepout` | Distinguishes local obstacle reason from boundary reason. |
| rail-snapshot | fixed progress samples | deterministic camera rail records | Proves camera state without Three.js camera. |
| cloud-descriptor | fixed cloud contract | stable id, point count, lobe count, placement, scale | Proves cloud source descriptor. |
| cloud-cache | generated geometry metadata | stable saved geometry count and point count | Makes cache behavior observable. |
| cloud-drift | fixed dt/time | deterministic position delta | Proves frame update logic. |
| host-diagnostics | runtime baseline | `globalThis.CozyIslandHost` additive state exists | Adds proof without breaking compatibility. |

## Proposed file split

```txt
src/host-proof/
├─ route-version.js
├─ source-profile.js
├─ source-fingerprint.js
├─ scene-source-snapshot.js
├─ action-frame.js
├─ action-result.js
├─ movement-policy-result.js
├─ camera-rail-snapshot.js
├─ hero-cloud-snapshot.js
├─ cloud-drift-result.js
└─ fixture-cases.mjs
```

## Integration rule

Keep `src/main-cloudform.js` as the browser composition file for now.

Add the host-proof helpers as pure modules and have the browser runtime consume them additively.

Do not move Three.js rendering, DOM input, canvas setup, loader UI, or error panel behavior into reusable proof helpers.

## Stop condition

The next implementation pass should stop when a DOM-free fixture can prove all matrix cases and the public route still loads through:

```txt
index.html -> ./src/main-cloudform.js?v=hero-cloud-3
```

## Non-goals

```txt
- No art direction change.
- No route rename.
- No cloud visual rewrite.
- No terrain rewrite.
- No external kit extraction before local proof exists.
- No removal of globalThis.CozyIsland compatibility.
```
