# Known Gaps: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-08T10-28-44-04-00`

## Repo-selection gap status

```txt
1. Root .agent state was missing in the publish repo.
   Fixed in the 2026-07-08T02:09:17-04:00 documentation pass.

2. Central ledger already referenced .agent paths before the publish repo had them.
   Corrected by materializing root .agent state and central ledger entries.

3. This pass found no checked non-Cavalry Publish repo that was fully new, central-ledger absent, undocumented, or missing root .agent/START_HERE.md state.
   MyCozyIsland remains an eligible fallback follow-up target.

4. Prior docs defined the host-proof acceptance cases and implementation wire map.
   This pass found that those docs were stale on route token: source is hero-cloud-4, prior docs said hero-cloud-3.
```

## Highest-priority product gaps

```txt
1. Active route token is not a first-class result.
   index.html uses ?v=hero-cloud-4, but the runtime does not expose that value as an inspectable RouteVersionResult.

2. Some docs/registry entries were stale on route token.
   They referenced hero-cloud-3 even though the active script is hero-cloud-4.

3. src/main-cloudform.js is still the dominant host/composition/runtime file.
   It owns source construction, renderer construction, DOM input, animation, cloud cache, movement policy, and diagnostics.

4. Source profile and source fingerprint are missing.
   Seeds, island radius, cloud point count, cloud placement, camera rail assumptions, movement bounds, and route token are implicit runtime facts.

5. Scene source snapshot is missing.
   The source descriptors are created from local kits, but there is no durable summary fixture that can prove landform, ocean floor, grass, clearing, campfire, smoke, wind, and cloud state without opening the browser.

6. ActionFrame -> ActionResult contract is missing.
   Wheel, pointer, keyboard, and tick actions are handled inline rather than normalized as command/result records.

7. Movement rejection reasons are missing.
   Clearing boundary, first-person lock, and campfire keepout decisions need explicit accepted/rejected result objects.

8. Camera rail snapshots are missing.
   Scroll progress and camera positions are visible at runtime but not fixture-readable.

9. Hero cloud descriptor/cache/drift state is not proof state yet.
   The renderer builds and caches point geometry, but cache summaries and drift updates are not stable diagnostic records.

10. Renderer adapters are local inline functions, not named render-handoff kits.
    This is acceptable for the current publish app but should not be expanded before host-proof records exist.

11. No deploy workflow was found during earlier root-agent passes.
    Pages may still deploy by repository settings, but workflow ownership remains undocumented in this repo.
```

## Wire-map gaps to close next

```txt
- route-version helper must accept hero-cloud-4 as the current route token.
- route-version helper must reject hero-cloud-3 as a stale route token unless index.html is intentionally rolled back.
- source-profile helper must centralize current seeds, radii, cloud profile, movement profile, rail profile, and active route token.
- source-fingerprint helper must produce a stable hash over source-profile inputs.
- scene-source-snapshot helper must summarize descriptors, not Three.js meshes.
- action-frame helper must normalize wheel, pointer, keyboard, and tick inputs.
- action-result helper must report accepted/rejected/no-op results and changed fields.
- movement-policy-result helper must preserve locked-before-first-person, inside-clearing, clearing-boundary, and campfire-keepout reasons.
- camera-rail-snapshot helper must sample progress values without a camera object.
- hero-cloud-snapshot helper must summarize descriptors and cache facts without depending on WebGL.
- cloud-drift-result helper must reduce fixed dt/time inputs deterministically.
- fixture-cases.mjs must run without DOM, canvas, Three.js, or a static server.
- src/main-cloudform.js must wire helpers additively and keep globalThis.CozyIsland compatibility unchanged.
```

## Visual/render gaps

```txt
- Tree and foliage rendering is still simplified into primitive shapes.
- Grass uses instanced cone geometry rather than textured clumps or varied plane batches.
- Smoke uses points and inline update logic rather than a reusable particle descriptor runtime.
- Cloud point geometry is generated inline and cached in the browser host.
- Water and foam are present but shader depth, refraction, foam breakup, and shoreline material variation remain simple.
```

Do not fix these visual/render gaps before the route/host-proof fixture gate is in place.

## Architecture gaps

```txt
- RouteVersionResult is missing.
- Route token mismatch reasons are missing.
- SourceProfile is missing.
- SourceFingerprint is missing.
- SceneSourceSnapshot is missing.
- HostSnapshot is missing.
- ActionFrame is missing.
- ActionResult is missing.
- MovementPolicyResult is missing.
- ClearingBoundaryResult is missing.
- CampfireKeepoutResult is missing.
- CameraRailSnapshot is missing.
- HeroCloudDescriptorSnapshot is missing.
- HeroCloudCacheSnapshot is missing.
- CloudDriftResult is missing.
- Action journal is missing.
- Input journal is missing.
- Replay parity smoke is missing.
- Diagnostics are limited to legacy globalThis.CozyIsland.
- The planned additive globalThis.CozyIslandHost surface does not exist yet.
```

## Safe interpretation

The repo is not broken by these gaps.

The active source route is `hero-cloud-4`; the next implementation should make that route token fixture-readable before adding visual expansion or shared-kit promotion.
