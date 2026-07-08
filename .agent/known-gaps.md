# Known Gaps: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-08T04:10:24-04:00`

## Repo-selection gap status

```txt
1. Root .agent state was missing in the publish repo.
   Fixed in the 2026-07-08T02:09:17-04:00 documentation pass.

2. Central ledger already referenced .agent paths before the publish repo had them.
   Corrected by materializing the root .agent state and central ledger entry.

3. This follow-up found no checked non-Cavalry Publish repo that was fully new, central-ledger-absent, or missing root .agent/START_HERE.md state.
   MyCozyIsland is now being tracked as an oldest eligible follow-up target rather than a missing-root-agent emergency.
```

## Highest-priority product gaps

```txt
1. src/main-cloudform.js is still the dominant host/composition/runtime file.
   It owns source construction, renderer construction, DOM input, animation, cloud cache, movement policy, and diagnostics.

2. There is no explicit active route version authority.
   index.html uses ?v=hero-cloud-3, but the runtime does not expose that as a first-class descriptor/result.

3. There is no DOM-free action result fixture gate.
   Movement acceptance/rejection and camera rail behavior are visible at runtime but not yet replayed through a fixture script.

4. There is no first-class ActionFrame -> ActionResult contract.
   Pointer, wheel, keyboard, and tick input are handled inline rather than normalized as command frames.

5. There is no formal movement rejection reason output.
   Clearing boundary and campfire keepout decisions need explicit result objects.

6. Hero cloud descriptor/cache/drift state is useful but not snapshotted as stable host data.
   The renderer has cache behavior, but replay/diagnostic parity is not yet formalized.

7. Renderer adapters are local inline functions, not named render-handoff kits.
   This is acceptable for the current publish app but should be isolated before more visual complexity is added.

8. No GitHub Actions deploy workflow was found during the earlier root-agent pass.
   Pages may still deploy by repository settings, but workflow ownership is not documented in this repo.
```

## Visual/render gaps

```txt
- Tree and foliage rendering is still simplified into primitive shapes.
- Grass uses instanced cone geometry rather than textured clumps or varied plane batches.
- Smoke uses points and inline update logic rather than a reusable particle descriptor runtime.
- Cloud point geometry is generated inline and cached in the browser host.
- Water and foam are present but shader depth, refraction, foam breakup, and shoreline material variation remain simple.
```

## Architecture gaps

```txt
- Source profile is implicit.
- Source fingerprint is missing.
- Scene source snapshot is missing.
- Host state contract is missing.
- Action journal is missing.
- Input journal is missing.
- Replay parity smoke is missing.
- Diagnostics are limited to legacy globalThis.CozyIsland.
- The planned additive globalThis.CozyIslandHost surface does not exist yet.
```

## Safe interpretation

The repo is not broken by these gaps.

The app has moved faster than its operating memory and proof layer. The next pass should add host/action/replay proof without changing the route or visuals.
