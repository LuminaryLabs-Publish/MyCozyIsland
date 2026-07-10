# Known Gaps: MyCozyIsland

Last updated: `2026-07-10T19-11-19-04-00`

## Highest-priority gap

The active layered alpha-cutout grass path has no authoritative source-consumption ledger or GPU-resource owner. It creates browser resources successfully, but it cannot prove who owns each source row, who owns each allocated resource, or whether those resources were released.

## Specific gaps

- `src/kits/renderers.js` redirects the public world-renderer facade to `renderer-world-layered-grass.js` without naming the adapter capability.
- The declared 50-kit catalog does not identify a layered-grass provider or `render:layered-alpha-grass` capability.
- `createSnapshotWithoutLegacyGrass()` suppresses legacy grass but emits no proof that the same rows were consumed exactly once by the new renderer.
- No source validator checks required placement fields before creating instance matrices.
- No source fingerprint distinguishes identical, changed, duplicated, or stale grass inputs.
- The procedural atlas is created through a DOM canvas inside the material factory.
- `createUnlitGrassMaterial()` loses the atlas as a first-class named ownership handle.
- Geometry, material, mesh, texture, and group ownership are implicit local conventions.
- The zero-row path has a different object shape from the non-empty path.
- The inner grass renderer may return `mesh`, but the outer world renderer discards the grass renderer object after attaching its group.
- The outer world renderer exposes only `group` and `update()`.
- The base world renderer also exposes only `group` and `update()`.
- Neither layer exposes `dispose()`.
- Repeated scene construction can allocate new grass resources without a release contract.
- `mesh.userData.grassRenderPolicy` is not a validated immutable public contract.
- No JSON-safe readback exposes policy identity, source counts, resource counts, or disposed state.
- Grass `update()` is empty, so static behavior is implied rather than declared.
- Placement phase affects startup height variation only.
- Vegetation-wind and vegetation-LOD descriptors are not consumed by the layered grass path.
- Adaptive-quality transitions do not report whether grass remains startup-only.
- Current Node tests do not import or execute the browser renderer.
- No browser integration smoke checks creation, composition, exact instance count, or disposal.

## System-specific gaps

### Grass source authority

`vegetation-placement-domain-kit` owns source production, while the wrapper owns suppression and rendering. There is no formal handoff result between these boundaries.

### Resource lifecycle

The atlas texture is reachable only through `material.map`; geometry and material are reachable through the mesh; the mesh is reachable through the grass group; the grass group is attached to the base world group. No object is designated as the lifecycle authority for the complete chain.

### Wrapper composition

The outer wrapper calls both `baseRenderer.update()` and `grassRenderer.update()`, but it does not retain or expose the grass renderer for diagnostics or cleanup.

### Empty source behavior

When no grass rows exist, the inner renderer returns `{ group, update }`; when rows exist, it returns `{ group, mesh, update }`. A stable readback and lifecycle surface should not depend on source count.

### Wind and LOD

The current static result may be appropriate for performance. The missing part is not animation itself; it is an explicit policy stating `static-startup-only`, plus proof that wind and LOD are intentionally unsupported or delegated.

### Host proof

`globalThis.CozyIsland.getState()` exposes backend, quality, camera, clock, performance, volumetric steps, and kit count. It exposes no grass source ledger, policy, resource owner, or disposal result.

## Deferred work

Do not prioritize visual grass tuning, wind animation, density expansion, cloud/fog/ocean/terrain/camera changes, renderer replacement, new content, route-token changes, or screenshots until source ownership and resource lifecycle are explicit.

## Safe next ledge

```txt
MyCozyIsland Layered Grass Consumer Ledger + Resource Ownership Fixture Gate
```