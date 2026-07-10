# Known Gaps: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-10T05-49-25-04-00`

## Source/readback gaps

```txt
No normalized WebGPU route source profile exists.
No stable source fingerprint exists for the current webgpu-volumetric-2 route.
No serializable source snapshot reconciles kit catalog, domain source rows, render snapshot, and runtime consumers.
The route token is not included in stable host readback.
The current .agent memory had stale hero-cloud-4 / Three 0.160.0 assumptions before this pass.
```

## Interaction/scenario gaps

```txt
Wheel, pointer, keyboard, blur, and resize handlers mutate camera sequence or runtime state directly.
No accepted/rejected/no-change input result exists.
No scenario tick result row exists.
No camera frame readback row records copied scenario camera state.
No debug toggle result row exists.
No input journal exists for Node or browser fixtures.
```

## Render/WebGPU gaps

```txt
No render-consumption ledger maps source families to WebGPU consumers.
No WebGPU renderer config snapshot is normalized for fixtures.
No atmosphere volume texture creation result row exists.
No cloud/fog texture source/size row exists.
No post-pipeline render result row exists.
No performance degrade/recover reason rows exist.
No browser-safe render host snapshot exists.
```

## Vegetation/world gaps

```txt
Vegetation and rock determinism are checked in tests, but not connected to renderer consumption rows.
No ground-contact parity readback exists.
No vegetation LOD consumer readback exists.
No source-family coverage ledger exists for worldRenderer.
```

## Host and compatibility gaps

```txt
globalThis.CozyIsland exposes live Three.js/WebGPU objects.
No additive globalThis.CozyIslandHost surface exists.
No JSON-serializable host snapshot captures source, input, scenario, performance, and render ledgers together.
No legacy parity check ensures CozyIsland remains compatible after adding host proof.
```

## Validation and deploy gaps

```txt
npm test exists and covers static/domain smoke.
No npm run check alias exists.
No DOM-free WebGPU consumer fixture exists.
No browser smoke was run in this documentation-only pass.
No CI or Pages gate proves WebGPU source/consumer parity before deployment.
```

## Do not start next

```txt
visual rewrite
cloud rewrite
fog rewrite
ocean rewrite
camera retune
renderer replacement
route-token churn
new route content
```

Start with WebGPU source/consumer readback and a Node fixture gate.
