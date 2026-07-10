# WebGPU Atmosphere Architecture

## Objective

Render the supplied cozy-island target with materially volumetric cloud and fog systems while protecting frame time through bounded volumes, compute-baked density, early termination, reduced-resolution integration, denoising, instancing, and adaptive quality.

## NexusEngine boundary

```txt
Domain kits
  own deterministic meaning, recipes, seeds, placement, quality policy, and immutable descriptors

Sequence kits
  own the authored aerial reveal and transition into first-person control

Renderer kits
  translate descriptors into Three.js WebGPU / TSL resources and draw calls

Host
  initializes the renderer, maps input, advances the scenario clock, collects snapshots, and renders
```

Renderer code never mutates terrain, weather, placement, or scenario truth. Compute output is visual cache data; the semantic terrain and environment state remain reproducible from seed and configuration.

## Frame composition

```txt
1. Deterministic domain snapshot
2. Stylized opaque scene and sky
3. TSL-displaced ocean and transparent shoreline foam
4. Bounded volumetric clouds
5. Scene color/depth pass
6. Depth-aware rolling-fog volume pass at reduced resolution
7. Gaussian denoise and composition
8. Adaptive performance sampling
```

## Cloud pipeline

### Domain inputs

- Weather coverage and density.
- Stable lobe layout for the hero cloud silhouette.
- Base/detail noise scales and erosion.
- Vertical density profile.
- Warm-top, cool-core, shadow, and silver-lining colors.
- Quality-specific texture size, step count, and early-exit threshold.

### WebGPU compute

`webgpu-compute-atmosphere-renderer-kit` writes one-channel density into a `Storage3DTexture`. Each voxel combines:

```txt
union of ellipsoidal lobes
+ low-frequency procedural noise
- high-frequency erosion noise
- coverage threshold
× bottom and top density gradients
```

The volume is computed once at startup. On the WebGL2 backend, a deterministic CPU path produces a smaller `Data3DTexture` with the same contract.

### Raymarch

`webgpu-volumetric-cloud-renderer-kit` uses a bounded box raymarch rather than marching the entire sky. It performs:

- Texture-space wind drift.
- Adaptive tier-specific steps.
- Smooth density thresholding.
- Two directional density taps for inexpensive self-shadow and edge lighting.
- Front-to-back premultiplied accumulation.
- Early termination near full opacity.
- One high-detail hero volume and lower-step horizon volumes.

## Rolling fog pipeline

Fog is a real bounded volume, not exponential scene fog alone. The fog renderer combines:

- A broad and a detail 3D density sample.
- Wind-driven advection and vertical roll.
- Low-height attenuation.
- An island-exclusion inner radius so the center remains readable.
- A shore-distance emphasis ring.
- A maximum-opacity safety bound.
- Bayer sample jitter to reduce ray-step banding.
- Scene-depth occlusion.
- A reduced-resolution pass and Gaussian blur before composition.

The regular scene fog remains only as inexpensive far-distance aerial perspective.

## Performance controls

| System | Ultra | High | Medium | Low |
|---|---:|---:|---:|---:|
| Cloud density volume | 112³ | 96³ | 80³ | 64³ |
| Hero cloud steps | 52 | 38 | 28 | 20 |
| Fog density volume | 72³ | 64³ | 56³ | 40³ |
| Fog steps | 14 | 11 | 8 | 6 |
| Fog resolution | 0.38× | 0.32× | 0.27× | 0.22× |
| Ocean grid | 224² | 192² | 144² | 96² |
| Shadow map | 2048² | 1536² | 1024² | 768² |

The performance-budget kit reacts only to sustained frame-time pressure. It first lowers volumetric steps and fog resolution, then lowers device pixel ratio. It can recover after a sustained surplus.

## Determinism

Semantic generation uses stable hash-derived random streams. Tests cover stable terrain samples, shoreline contours, placement identities, camera descriptors, and catalog capabilities. GPU-generated density textures are presentation caches and do not alter durable game state.

## Fallback policy

Three.js `WebGPURenderer` selects WebGPU when available and otherwise uses its WebGL2 backend. The fallback path preserves:

- TSL materials and vertex deformation.
- CPU-baked 3D cloud/fog textures.
- Bounded volumetric presentation where supported by the backend.
- Lower automatic quality limits.

Unsupported or constrained devices therefore degrade density, steps, resolution, shadows, and vegetation before removing the atmosphere entirely.
