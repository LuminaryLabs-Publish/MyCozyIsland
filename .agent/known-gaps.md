# Known Gaps: MyCozyIsland

Last updated: 2026-07-10T17-38-35-04-00

## Highest-priority gap

The active layered alpha-cutout grass renderer is implemented as an implicit facade substitution rather than an explicit kit/capability with source-consumption, lifecycle, and readback contracts.

## Specific gaps

- `src/kits/renderers.js` redirects `createStylizedWorldRenderer()` to the wrapper without identifying the new adapter at the call site.
- The exact 50-kit catalog does not declare `render:layered-alpha-grass` or a dedicated layered-grass provider.
- `createSnapshotWithoutLegacyGrass()` suppresses the base renderer's grass rows, but no result proves that the wrapper consumed those rows exactly once.
- No validation checks the required `position`, `rotation`, `scale`, `phase`, or optional `tint` fields before instance creation.
- The procedural atlas is built with a DOM canvas inside resource construction, so policy and atlas intent cannot be tested headlessly.
- Layer angles, dimensions, colors, alpha clip, depth policy, shadow policy, fog policy, and tone-mapping policy are hard-coded inside the adapter rather than represented by an immutable descriptor.
- Atlas texture, geometry, material, mesh, and group ownership are implicit.
- The renderer exposes no `dispose()` method.
- Repeated route creation would allocate new GPU resources without a defined release path.
- The wrapper exposes only `group` and `update()`; there is no JSON-safe policy/resource snapshot.
- `mesh.userData.grassRenderPolicy` is local mutable-object metadata and is not surfaced through `globalThis.CozyIsland`.
- `grassRenderer.update()` is empty, so the contract does not state whether wind is intentionally unsupported or accidentally unwired.
- Grass placement phase is used only for static height variation.
- Vegetation LOD and adaptive-quality state do not alter the layered grass consumer after startup.
- The static check sees the file but does not prove the facade targets it, that legacy grass is suppressed, or that resources can be disposed.
- The domain smoke never imports browser renderer modules and therefore cannot validate layered grass behavior.
- No browser integration smoke checks instance count, geometry layers, atlas creation, alpha policy, or cleanup.

## System-specific gaps

### Grass source authority

`vegetation-placement-domain-kit` owns grass descriptor production. The wrapper currently assumes every `grass-patch` row is valid and treats all rows as renderable. There is no acceptance/rejection ledger or source fingerprint.

### Render composition

The wrapper shallow-copies the snapshot to prevent base grass rendering, then adds its own group to the base group. The composition is practical but opaque: host diagnostics cannot prove base grass suppression, wrapper ownership, or exact draw contribution.

### Resource lifecycle

The generated `CanvasTexture`, `BufferGeometry`, `MeshBasicNodeMaterial`, and `InstancedMesh` have no named owner and no disposal protocol. This is currently masked by one-shot static-page startup.

### Wind and animation

The world snapshot contains vegetation-wind descriptors and instances contain phase data, but the layered grass consumer has a no-op update. The lack of motion may be intentional for performance, but that decision is not encoded.

### LOD and performance

The renderer uses every startup grass row in one instanced mesh. It has frustum culling but no distance-band instance reduction, quality transition, or host-visible count policy. These should remain explicitly startup-only until a measured need exists.

### Host proof

`globalThis.CozyIsland.getState()` reports aggregate backend, quality, camera, clock, performance, volumetric steps, and kit count. It does not report grass source count, rendered count, layer count, alpha policy, resource state, or disposal state.

## Deferred work

Do not prioritize more grass visual tuning, wind animation, density expansion, cloud/fog/ocean/terrain/camera changes, renderer replacement, new content, route-token changes, or screenshot work until the layered grass adapter has an explicit contract and fixture gate.

## Safe next ledge

```txt
MyCozyIsland Layered Grass Renderer Authority + Lifecycle Fixture Gate
```