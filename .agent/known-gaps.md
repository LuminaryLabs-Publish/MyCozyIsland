# Known Gaps: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-08T07:30:30-04:00`

## Repo-selection gap status

```txt
1. Root .agent state was missing in the publish repo.
   Fixed in the 2026-07-08T02:09:17-04:00 documentation pass.

2. Central ledger already referenced .agent paths before the publish repo had them.
   Corrected by materializing root .agent state and central ledger entries.

3. This pass found no checked non-Cavalry Publish repo that was fully new, central-ledger absent, or missing root .agent/START_HERE.md state.
   MyCozyIsland is now tracked as a follow-up target for host-proof acceptance work rather than a missing-root-agent emergency.

4. Repo-local kit registry was stale relative to the latest host-proof fixture direction.
   Updated in this pass.
```

## Highest-priority product gaps

```txt
1. src/main-cloudform.js is still the dominant host/composition/runtime file.
   It owns source construction, renderer construction, DOM input, animation, cloud cache, movement policy, and diagnostics.

2. Active route version is not a first-class result.
   index.html uses ?v=hero-cloud-3, but the runtime does not expose that value as an inspectable RouteVersionResult.

3. Source profile and source fingerprint are missing.
   Seeds, island radius, cloud point count, cloud placement, camera rail assumptions, and movement bounds are implicit runtime facts.

4. Scene source snapshot is missing.
   The source descriptors are created from local kits, but there is no durable summary fixture that can prove landform, ocean floor, grass, clearing, campfire, smoke, wind, and cloud state without opening the browser.

5. ActionFrame -> ActionResult contract is missing.
   Wheel, pointer, keyboard, and tick actions are handled inline rather than normalized as command/result records.

6. Movement rejection reasons are missing.
   Clearing boundary, first-person lock, and campfire keepout decisions need explicit accepted/rejected result objects.

7. Camera rail snapshots are missing.
   Scroll progress and camera positions are visible at runtime but not fixture-readable.

8. Hero cloud descriptor/cache/drift state is not proof state yet.
   The renderer builds and caches point geometry, but cache summaries and drift updates are not stable diagnostic records.

9. Renderer adapters are local inline functions, not named render-handoff kits.
   This is acceptable for the current publish app but should not be expanded before host-proof records exist.

10. No deploy workflow was found during earlier root-agent passes.
    Pages may still deploy by repository settings, but workflow ownership remains undocumented in this repo.
```

## Visual/render gaps

```txt
- Tree and foliage rendering is still simplified into primitive shapes.
- Grass uses instanced cone geometry rather than textured clumps or varied plane batches.
- Smoke uses points and inline update logic rather than a reusable particle descriptor runtime.
- Cloud point geometry is generated inline and cached in the browser host.
- Water and foam are present but shader depth, refraction, foam breakup, and shoreline material variation remain simple.
```

Do not fix these visual/render gaps before the host-proof acceptance fixture is in place.

## Architecture gaps

```txt
- RouteVersionResult is missing.
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

The app has a coherent visual slice and a useful set of local domain kits. The next pass should make the host layer inspectable before visual expansion continues.
