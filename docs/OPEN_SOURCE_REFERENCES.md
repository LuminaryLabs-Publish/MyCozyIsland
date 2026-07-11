# Open-Source References

The rebuild was designed after reviewing upstream implementations. No third-party project was copied wholesale; the application uses its own NexusEngine domain contracts and scene composition.

## NexusEngine Core World

Repository: `LuminaryLabs-Dev/NexusEngine`  
Pinned commit: `38229f59c22cb40024ffd13a9f48040de759f5d7`

Imported capabilities:

- `createCoreWorldDomain`
- `createUniformGridPartition`
- `createFlatWorldSurface`
- `createTerrainProviderAdapter`
- `defineWorldEffectProvider`

The Core World domain coordinates portable world identity, cells, focus, provider phases, lifecycle, and snapshots. MyCozyIsland retains ownership of terrain generation, biome classification, population data, Three.js objects, GPU buffers, and visual effects.

## Three.js

Repository: `mrdoob/three.js`  
License: MIT, copyright the Three.js authors.

Reviewed implementation areas:

- `examples/webgpu_volume_cloud.html`
  - `WebGPURenderer`
  - `Data3DTexture`
  - bounded `RaymarchingBox`
  - front-to-back alpha accumulation and early termination
- `examples/webgpu_compute_texture_3d.html`
  - `Storage3DTexture`
  - TSL `textureStore`
  - compute dispatch for 3D volume generation
- `examples/webgpu_volume_lighting.html`
  - `VolumeNodeMaterial`
  - Bayer dithering
  - scene-depth occlusion
  - reduced-resolution volumetric pass
  - Gaussian denoising
- `examples/webgpu_compute_water.html`
  - TSL vertex displacement
  - normal reconstruction from procedural height derivatives
- `examples/jsm/tsl/utils/Raymarching.js`
  - bounded box intersection and step traversal

The runtime pins Three.js `0.185.0` through the browser import map.

## Sebastian Lague — Clouds

Repository: `SebLague/Clouds`  
License: MIT, copyright Sebastian Lague.

Reviewed as a conceptual reference for readable raymarched cloud volumes and the separation between large-scale cloud shape and density detail. The production implementation here is written in Three.js TSL/WebGPU and follows the project’s own cloud-domain descriptors.

## Attribution rule

The application retains this reference record and the upstream license information. Three.js and NexusEngine remain external pinned dependencies; their source files are not vendored into this repository.
