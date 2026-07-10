# Known Gaps: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-10T01-11-51-04-00`

## Source proof gaps

```txt
No normalized source profile exists.
No stable source fingerprint exists.
No serializable scene-source snapshot exists.
The route token is not included in runtime readback.
Source seed, configured counts, generated counts, and consumer counts are not reconciled in one record.
```

## Interaction proof gaps

```txt
Browser input mutates progress, yaw, pitch, key state, and player position directly.
Wheel clamp outcomes are not recorded.
The pointer inactive range from 0.85 to below 0.985 has no explicit result reason.
Pointer-not-dragging is an implicit no-op.
Movement rejection is silent.
No accepted/rejected/no-change input result exists.
No input result journal exists.
No deterministic rail or first-person camera snapshot exists.
```

## Render proof gaps

```txt
No source-to-render consumption ledger exists.
No terrain/floor/shoreline/path/object count parity exists.
The ocean-floor render contract creates object placements that the active scene does not consume as distinct adapters.
Several foliage source types are projected through the generic rock fallback instead of type-specific adapters.
No grass requested/placed/instanced parity exists.
No grass batch descriptor readback exists.
No normalized renderer/scene/camera snapshot exists.
No proof records whether source exclusions survive renderer adaptation.
```

## Grass proof gaps

```txt
Grass source records bladeCount, patchRadius, batchKey, and geometryTemplateKey.
The active renderer creates one ConeGeometry instance per patch.
Static batch descriptors are not consumed by the renderer.
No skip reason or exclusion parity rows are exposed.
```

## Cloud proof gaps

```txt
Cloud geometry cache keys by id without descriptor fingerprint verification.
No cache hit, miss, or stale-entry result exists.
No descriptor-to-point-count parity row exists.
No fixed-dt cloud drift result exists.
Live cached BufferGeometry objects are exposed through legacy diagnostics and are not serializable.
```

## Host and compatibility gaps

```txt
No globalThis.CozyIslandHost surface exists.
Legacy globalThis.CozyIsland only exposes cloudContract, cloudPointCache, and getScrollProgress.
No automated legacy parity check exists.
No restart/reset path exists for proof state.
```

## Validation and deploy gaps

```txt
package.json only provides npm start.
No npm run check exists.
No DOM-free consumer fixture exists.
No source snapshot fixture exists.
No browser smoke was run in this documentation-only pass.
No CI or Pages gate proves consumer parity before deployment.
```

## Do not start next

```txt
visual rewrite
cloud visual rewrite
grass visual rewrite
camera rail retune
renderer extraction
new route content
source-kit promotion
```

Start with source/consumer proof records and a browser input fixture gate.
