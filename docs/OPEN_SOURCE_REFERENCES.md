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

The browser imports the pinned `src/engine.js` and `src/core-domains/core-world-domain/index.js` entry points directly. It intentionally avoids the broad root index because that surface also exports Node-only headless-editor modules.

## Three.js

Repository: `mrdoob/three.js`  
License: MIT, copyright the Three.js authors.

Reviewed implementation areas:

- `examples/webgpu_volume_cloud.html`: bounded volume raymarching and early termination.
- `examples/webgpu_compute_texture_3d.html`: storage 3D textures and compute dispatch.
- `examples/webgpu_volume_lighting.html`: depth-aware reduced-resolution volumetrics and denoising.
- `examples/webgpu_compute_water.html`: TSL displacement and normal reconstruction.
- `examples/jsm/tsl/utils/Raymarching.js`: bounded box traversal.

The runtime pins Three.js `0.185.0` through the browser import map.

## Sebastian Lague — Clouds

Repository: `SebLague/Clouds`  
License: MIT, copyright Sebastian Lague.

Reviewed as a conceptual reference for readable raymarched cloud volumes and the separation between large-scale cloud shape and density detail. The production implementation here is written in Three.js TSL/WebGPU and follows the project’s own cloud-domain descriptors.

## Attribution rule

The application retains this reference record and the upstream license information. Three.js and NexusEngine remain external pinned dependencies; their source files are not vendored into this repository.
