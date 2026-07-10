# Next Steps: MyCozyIsland

Last updated: `2026-07-10T19-11-19-04-00`

## Next safe ledge

```txt
MyCozyIsland Layered Grass Consumer Ledger + Resource Ownership Fixture Gate
```

## Goal

Make the active layered grass path a single authoritative, deterministic, inspectable, and disposable render consumer without changing its current three-layer unlit alpha-cutout appearance.

## Plan ledger

- [ ] Decide whether layered grass is a dedicated declared DomainServiceKit or an explicit capability of `webgpu-stylized-material-renderer-kit`.
- [ ] Name the active capability, such as `render:layered-alpha-grass`, and identify its provider in the catalog or a validated internal adapter map.
- [ ] Extract an immutable JSON-safe grass render policy.
- [ ] Extract deterministic atlas and geometry descriptors that require no DOM, Three.js, browser, or GPU.
- [ ] Add a source validator for `position`, `rotation`, `scale`, `phase`, and optional `tint`.
- [ ] Add a source-consumption ledger with source, accepted, rejected, suppressed-legacy, and rendered counts.
- [ ] Prove one-and-only-one ownership of every accepted `grass-patch` row.
- [ ] Retain direct handles for atlas texture, geometry, material, mesh, and group.
- [ ] Define a resource owner that reports created, live, disposed, and dispose-noop states.
- [ ] Add idempotent `dispose()` to the grass renderer.
- [ ] Compose grass disposal into the outer world renderer lifecycle.
- [ ] Define whether the base world renderer also receives a general disposal traversal or keeps a narrower explicit owner list.
- [ ] Add immutable `getState()` readback for policy identity, source reconciliation, resource counts, and disposed state.
- [ ] Expose only JSON-safe grass readback through an additive `globalThis.CozyIsland` host surface.
- [ ] Replace the ambiguous no-op update with an explicit update policy such as `static-startup-only`.
- [ ] State whether vegetation wind, vegetation LOD, adaptive quality, shadows, and tone mapping are unsupported, delegated, or startup-only.
- [ ] Preserve the filtered snapshot behavior without mutating the original snapshot.
- [ ] Add a DOM-free source/descriptor fixture.
- [ ] Add a browser lifecycle smoke for exact resource creation and complete disposal.
- [ ] Extend static checks to prove the facade selects the layered adapter and that the adapter exposes lifecycle/readback methods.
- [ ] Add stable fixtures to `npm test` only after they are deterministic.

## Candidate files

```txt
src/grass/layered-grass-render-policy.js
src/grass/layered-grass-source-validator.js
src/grass/layered-grass-consumption-ledger.js
src/grass/layered-grass-atlas-descriptor.js
src/grass/layered-grass-geometry-descriptor.js
src/grass/layered-grass-resource-owner.js
src/grass/layered-grass-readback.js
src/kits/renderer-world-layered-grass.js
src/kits/renderer-world.js
src/kits/renderers.js
src/kits/catalog.js
src/main-cloudform.js
tests/layered-grass-consumer-smoke.mjs
tests/layered-grass-browser-lifecycle-smoke.mjs
package.json
```

## Required invariants

```txt
one authoritative consumer owns accepted grass-patch rows
sourceCount = acceptedCount + rejectedCount
suppressedLegacyCount = acceptedCount
renderedInstanceCount = acceptedCount
zero source rows produce zero mesh resources and a valid empty ledger
source snapshot remains unchanged
policy and descriptors are immutable and JSON-safe
same source snapshot produces the same descriptors and source fingerprint
DOM and Three.js APIs remain outside pure descriptor modules
current visual policy remains three unlit alpha-cutout layers
atlas texture, geometry, material, mesh, and group have named ownership
all owned resources are released exactly once
dispose is idempotent
readback contains no live Three.js objects
outer world renderer composes grass lifecycle rather than discarding it
```

## Suggested result vocabulary

```txt
grass_source_accepted
grass_source_rejected_invalid
grass_legacy_suppressed
grass_instances_created
grass_empty_source
grass_resource_created
grass_resource_live
grass_resource_disposed
grass_dispose_noop
grass_update_static_startup_only
grass_policy_valid
grass_contract_valid
grass_contract_invalid
```

## Not next

- blade-shape, atlas-color, alpha-threshold, layer-count, or placement-density tuning
- wind animation before update authority is explicit
- cloud, fog, ocean, terrain, camera, lighting, or scenario retuning
- renderer replacement or broad extraction
- new island content
- route-token changes
- screenshot automation