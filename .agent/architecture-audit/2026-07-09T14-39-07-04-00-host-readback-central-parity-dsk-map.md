# Architecture Audit: Host Readback Central Parity DSK Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-39-07-04-00`

## Current architecture

`MyCozyIsland` is a static browser route that loads `src/main-cloudform.js` through `index.html` and composes local source-domain kits into a direct Three.js render host.

The architecture is descriptor-rich but host-proof-light: source descriptors are created, immediately consumed by inline renderer functions, and only the legacy `globalThis.CozyIsland` surface exposes partial diagnostics.

## DSK/domain map

```txt
static route shell
  -> route token domain
  -> loader/error panel domain
  -> source descriptor domains
      -> island landform
      -> ocean floor
      -> foliage graph
      -> fenced clearing
      -> campfire
      -> smoke particles
      -> grass placement
      -> grass wind
      -> mattatz clouds
  -> render consumer domains
      -> terrain mesh
      -> ocean floor mesh
      -> water plane
      -> shoreline foam
      -> path mesh
      -> foliage mesh
      -> fence mesh
      -> campfire mesh
      -> smoke points
      -> grass instancing
      -> hero cloud point cache
  -> input/camera domains
      -> resize
      -> keyboard
      -> wheel progress
      -> pointer look
      -> camera rail
      -> first-person movement
      -> movement validity
  -> frame domain
      -> smoke update
      -> flame scale
      -> cloud drift
      -> renderer submit
  -> diagnostics
      -> globalThis.CozyIsland legacy readback
      -> planned globalThis.CozyIslandHost.getState readback
```

## Current domain issue

The current runtime has no typed source snapshot or consumer readback ledger, so agents cannot reliably prove that the live browser consumer used the source route token, descriptors, cloud cache, grass instances, movement policy, camera rail, and render host state.

## Next architecture cut

```txt
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/input-action-frame.js
src/host-proof/action-result.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/grass-readback.js
src/host-proof/cloud-readback.js
src/host-proof/render-host-snapshot.js
src/host-proof/cozy-island-host-snapshot.js
scripts/cozy-island-browser-consumer-fixture.mjs
```

Keep the cut additive. Do not split renderer modules or rewrite visual systems before the readback fixture exists.
