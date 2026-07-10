# Next Steps: MyCozyIsland

Last updated: 2026-07-10T17-38-35-04-00

## Next safe ledge

```txt
MyCozyIsland Layered Grass Renderer Authority + Lifecycle Fixture Gate
```

## Goal

Turn the newly active layered alpha-cutout grass renderer into an explicit, deterministic, inspectable, and disposable adapter boundary without changing its current visual output.

## Plan ledger

- [ ] Define whether layered grass is a distinct declared DomainServiceKit or a named capability of `webgpu-stylized-material-renderer-kit`.
- [ ] Add a stable capability such as `render:layered-alpha-grass` and document its provider.
- [ ] Extract a pure immutable grass-render policy containing layer count, angles, widths, heights, alpha clip, lighting mode, depth policy, shadow policy, tone-mapping policy, fog policy, and update policy.
- [ ] Extract deterministic atlas and geometry descriptors that can be validated without a DOM or GPU.
- [ ] Keep DOM canvas and Three.js resource creation inside the browser adapter.
- [ ] Define a source-consumption result with source row count, suppressed legacy row count, accepted count, rejected count, rendered instance count, and duplicate-consumer guard.
- [ ] Validate required placement fields before building instance matrices.
- [ ] Define explicit ownership for atlas texture, geometry, material, mesh, group, and any temporary objects.
- [ ] Add `dispose()` and make repeated disposal idempotent.
- [ ] Expose JSON-safe `getState()` or `snapshot()` readback containing policy identity, source counts, resource counts, and disposed state.
- [ ] Decide explicitly whether grass wind animation is unsupported, delegated, or planned; do not leave an empty `update()` ambiguous.
- [ ] Decide explicitly whether vegetation LOD and adaptive quality affect grass instance count or remain startup-only.
- [ ] Preserve the current wrapper behavior that prevents the base renderer from drawing legacy grass.
- [ ] Add a DOM-free fixture proving policy/descriptor determinism, source-count parity, duplicate suppression, serialization, and invalid-row behavior.
- [ ] Add a browser smoke proving one mesh, three geometry layers, one atlas texture, exact instance count, and complete disposal.
- [ ] Extend the existing static check to prove the renderer facade exports the intended adapter and the adapter provides a lifecycle surface.
- [ ] Wire deterministic checks into `npm test` only after they are stable.

## Candidate files

```txt
src/grass/layered-grass-render-policy.js
src/grass/layered-grass-atlas-descriptor.js
src/grass/layered-grass-geometry-descriptor.js
src/grass/layered-grass-consumption-result.js
src/grass/layered-grass-readback.js
src/kits/renderer-world-layered-grass.js
src/kits/renderers.js
src/kits/catalog.js
tests/layered-grass-contract-smoke.mjs
tests/layered-grass-browser-smoke.mjs
package.json
```

## Required invariants

```txt
one authoritative consumer for grass-patch rows
source count equals accepted plus rejected
suppressed legacy count equals accepted source count when wrapper owns grass
rendered instance count equals accepted count
policy descriptor is immutable and JSON-safe
atlas and geometry descriptors are deterministic
browser-only APIs do not leak into pure descriptor modules
current visual policy remains three unlit alpha-cutout layers
same snapshot produces the same transforms and policy identity
resource ownership is explicit
dispose is complete and idempotent
readback contains no live Three.js objects
legacy base world remains available behind the wrapper
```

## Suggested status vocabulary

```txt
grass_source_accepted
grass_source_rejected_invalid
grass_legacy_suppressed
grass_instances_created
grass_resource_created
grass_resource_disposed
grass_dispose_noop
grass_policy_unsupported_wind
grass_policy_startup_lod_only
grass_contract_valid
grass_contract_invalid
```

## Not next

- changing blade shapes, atlas colors, alpha threshold, layer count, or placement density
- adding wind animation before the update contract is explicit
- cloud, fog, ocean, terrain, camera, lighting, or scenario retuning
- renderer replacement or broad extraction
- new island content
- route-token changes
- screenshot automation