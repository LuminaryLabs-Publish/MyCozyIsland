# My Cozy Island Kit Catalog

The WebGPU rebuild composes **50 Nexus-style kits** exposing **59 capabilities**. The executable source of truth is `src/kits/catalog.js`; this file summarizes review boundaries without duplicating every manifest field.

## Contract

Every kit has a stable `-kit` ID, one domain boundary, explicit `provides`/`requires`, snapshot/reset policy, and an honest renderer-specific flag. Semantic domains are deterministic and renderer-independent; WebGPU/Three.js code is limited to adapter/renderer kits.

| Metric | Value |
|---|---:|
| Kits | 50 |
| Capabilities | 59 |
| Renderer-specific | 11 |
| Cadence-owning | 8 |

## adapter-domain

- **`debug-overlay-host-kit`** — Displays backend, active quality, frame timing, volumetric budgets, and domain count without owning simulation state. Provides `host:debug-overlay`; requires `render:performance-budget`.
- **`webgl2-fallback-renderer-kit`** — Defines a deterministic CPU-volume and reduced-ray fallback while preserving the renderer descriptor contracts. Provides `render:webgl2-fallback`; requires `render:quality`.
- **`webgpu-compute-atmosphere-renderer-kit`** — Bakes cloud and fog density into reusable three-dimensional storage textures through WebGPU compute. Provides `render:atmosphere-volume-textures`, `render:webgpu-compute`; requires `cloud:density-recipe`, `fog:density-recipe`, `render:quality`, `render:webgl2-fallback`.
- **`webgpu-foam-renderer-kit`** — Renders layered shoreline foam contours with stable geometry, animated breakup, and transparent depth handling. Provides `render:webgpu-shore-foam`; requires `ocean:foam-contours`, `ocean:wave-state`, `environment:wind-field`.
- **`webgpu-ocean-renderer-kit`** — Displaces and shades the ocean through TSL wave nodes, reconstructed normals, Fresnel response, and sun glitter. Provides `render:webgpu-ocean`; requires `ocean:wave-state`, `ocean:optics`, `ocean:sun-glitter`, `render:quality`.
- **`webgpu-performance-budget-kit`** — Tracks sustained frame cost and progressively reduces volumetric steps, resolution, and device-pixel ratio. Provides `render:performance-budget`; requires `render:quality`.
- **`webgpu-post-processing-renderer-kit`** — Composes the opaque scene, shared depth, reduced-resolution fog, denoising, and final atmospheric output. Provides `render:webgpu-post-pipeline`, `render:scene-depth`; requires `render:rolling-volumetric-fog`, `render:quality`.
- **`webgpu-rolling-fog-renderer-kit`** — Integrates terrain-adjacent rolling fog with three-dimensional noise, wind advection, depth clipping, and ray jitter. Provides `render:rolling-volumetric-fog`; requires `render:atmosphere-volume-textures`, `fog:density-recipe`, `fog:advection`, `fog:volume-placement`, `render:quality`.
- **`webgpu-stylized-material-renderer-kit`** — Builds the toon-shaded island, seabed, instanced vegetation, rocks, props, paths, and campfire from descriptors. Provides `render:webgpu-stylized-world`; requires `render:snapshot`, `render:stylized-materials`, `render:archetypes`, `vegetation:wind-descriptor`.
- **`webgpu-volumetric-cloud-renderer-kit`** — Raymarches bounded cloud volumes with density erosion, directional light sampling, early exit, and horizon LODs. Provides `render:volumetric-clouds`; requires `render:atmosphere-volume-textures`, `cloud:lighting-profile`, `cloud:lod-policy`, `cloud:horizon-band`.

## content-domain

- **`camera-rail-sequence-kit`** — Owns the authored aerial reveal and deterministic transition into grounded first-person island exploration. Provides `sequence:camera-rail`; requires `terrain:height-sampler`.
- **`cozy-island-scenario-kit`** — Composes reusable environmental domains into the My Cozy Island validation route and exposes render snapshots. Provides `scenario:cozy-island`; requires `render:snapshot`, `sequence:camera-rail`, `environment:clock`.

## large-domain

- **`terrain-surface-domain-kit`** — Generates a domain-warped island surface together with slope, curvature, moisture, exposure, and coast fields. Provides `terrain:surface`, `terrain:height-sampler`, `terrain:field-sampler`; requires `seed:world`.
- **`vegetation-placement-domain-kit`** — Places vegetation through biome suitability, slope limits, clearing exclusions, and deterministic blue-noise spacing. Provides `vegetation:placement-graph`; requires `vegetation:archetypes`, `terrain:biome-field`, `placement:ground-contact`, `seed:world`.

## mid-domain

- **`aerial-perspective-domain-kit`** — Defines distance haze, horizon blending, extinction tint, and exposure compensation shared by distant rendering. Provides `atmosphere:aerial-perspective`; requires `environment:illumination`, `environment:weather-state`.
- **`campfire-atmosphere-domain-kit`** — Provides central fire, warm local light, ember, and wind-reactive smoke descriptors for presentation. Provides `campfire:descriptor`, `campfire:smoke-descriptor`; requires `terrain:height-sampler`, `environment:wind-field`.
- **`cloud-density-field-domain-kit`** — Defines cloud volume dimensions, lobe structure, base and detail noise, erosion, and density thresholds. Provides `cloud:density-recipe`; requires `cloud:weather-state`, `seed:world`.
- **`cloud-horizon-band-domain-kit`** — Describes distant inexpensive cloud volumes that continue the atmosphere beyond the hero cloud bank. Provides `cloud:horizon-band`; requires `cloud:weather-state`, `cloud:lod-policy`.
- **`cloud-lighting-domain-kit`** — Defines warm sunlit tops, cool undersides, silver lining, extinction, and ambient sky contribution. Provides `cloud:lighting-profile`; requires `environment:illumination`, `cloud:density-recipe`.
- **`cloud-lod-domain-kit`** — Defines volume texture size, primary ray steps, opacity termination, horizon policy, and quality cadence. Provides `cloud:lod-policy`; requires `render:quality`.
- **`cloud-shadow-domain-kit`** — Defines projected cloud-shadow scale, opacity, motion, and low-frequency update cadence over the island. Provides `cloud:shadow-descriptor`; requires `cloud:weather-state`, `cloud:lod-policy`, `environment:illumination`.
- **`cloud-weather-domain-kit`** — Maps the weather and wind state into cloud coverage, base altitude, depth, drift, and evolution intent. Provides `cloud:weather-state`; requires `environment:weather-state`, `environment:wind-field`.
- **`fog-advection-domain-kit`** — Maps deterministic wind and clock state into rolling fog offsets, speeds, curl, and dissipation rates. Provides `fog:advection`; requires `environment:wind-field`, `environment:clock`.
- **`fog-field-domain-kit`** — Defines fog density, height falloff, shoreline concentration, terrain adherence, and quality-scaled sampling. Provides `fog:density-recipe`; requires `environment:weather-state`, `terrain:field-sampler`, `shoreline:signed-distance`, `render:quality`.
- **`fog-volume-placement-domain-kit`** — Places bounded lowland, shoreline, and ocean fog volumes without letting presentation own weather meaning. Provides `fog:volume-placement`; requires `fog:density-recipe`, `terrain:field-sampler`, `shoreline:signed-distance`.
- **`ground-contact-domain-kit`** — Seats generated objects against terrain height and rejects placements that exceed slope or burial constraints. Provides `placement:ground-contact`; requires `terrain:height-sampler`, `terrain:field-sampler`.
- **`illumination-domain-kit`** — Owns the deterministic sunrise illumination descriptor: sun direction, sky colors, ambient intensity, and exposure. Provides `environment:illumination`; requires `environment:clock`, `environment:weather-state`.
- **`ocean-caustics-domain-kit`** — Provides shallow-water caustic projection frequency, intensity, attenuation, and quality disable thresholds. Provides `ocean:caustics-descriptor`; requires `ocean:wave-state`, `ocean:floor-surface`.
- **`ocean-floor-profile-domain-kit`** — Builds the island shelf, submerged mound, reef belt, and deep-ocean floor used by water optics. Provides `ocean:floor-surface`; requires `terrain:surface`.
- **`ocean-optics-domain-kit`** — Describes depth absorption, Fresnel reflection, shallow color, refraction strength, roughness, and clearcoat. Provides `ocean:optics`; requires `environment:weather-state`, `ocean:floor-surface`.
- **`ocean-wave-domain-kit`** — Defines a compact multidirectional wave spectrum consumed by displacement, normal reconstruction, foam, and glitter. Provides `ocean:wave-state`; requires `environment:clock`, `environment:wind-field`.
- **`prop-archetype-domain-kit`** — Creates stable fence, driftwood, path-marker, clearing, and campfire prop descriptors from world fields. Provides `world:prop-graph`; requires `terrain:height-sampler`, `shoreline:signed-distance`, `seed:world`.
- **`render-archetype-domain-kit`** — Maps semantic object types to shared geometry factories, material IDs, shadows, instancing groups, and layers. Provides `render:archetypes`; requires `render:stylized-materials`.
- **`render-quality-domain-kit`** — Selects a WebGPU-first quality tier from explicit override, backend, memory hints, viewport, DPR, and motion preference. Provides `render:quality`; requires none.
- **`render-snapshot-domain-kit`** — Collects immutable terrain, ocean, vegetation, atmospheric, lighting, and material descriptors for the renderer. Provides `render:snapshot`; requires `terrain:surface`, `terrain:biome-field`, `shoreline:signed-distance`, `ocean:wave-state`, `ocean:optics`, `ocean:foam-state`, `vegetation:placement-graph`, `world:rock-graph`, `world:prop-graph`, `cloud:density-recipe`, `cloud:lighting-profile`, `fog:density-recipe`, `environment:illumination`.
- **`rock-archetype-domain-kit`** — Produces seeded boulder, shore-rock, reef-rock, and submerged-rock descriptors from terrain suitability fields. Provides `world:rock-graph`; requires `terrain:field-sampler`, `placement:ground-contact`, `seed:world`.
- **`shoreline-field-domain-kit`** — Exposes signed shore distance, wetness, breaker likelihood, coast normal, and rock-contact influence. Provides `shoreline:signed-distance`, `shoreline:breaker-field`; requires `terrain:field-sampler`.
- **`shoreline-foam-domain-kit`** — Creates layered breaker contours, contact foam, breakup parameters, current advection, and deterministic decay. Provides `ocean:foam-state`, `ocean:foam-contours`; requires `shoreline:signed-distance`, `shoreline:breaker-field`, `ocean:wave-state`.
- **`stylized-material-descriptor-domain-kit`** — Defines reusable anime-inspired palettes with shadow tint, roughness, rim response, and outline classes. Provides `render:stylized-materials`; requires `environment:illumination`.
- **`sun-glitter-domain-kit`** — Describes a view-dependent wave-normal glitter lobe without spawning expensive individual sparkle particles. Provides `ocean:sun-glitter`; requires `ocean:wave-state`, `environment:weather-state`.
- **`terrain-biome-field-domain-kit`** — Converts continuous surface fields into blended sand, wet sand, grass, soil, forest, moss, and rock weights. Provides `terrain:biome-field`; requires `terrain:field-sampler`.
- **`terrain-lod-domain-kit`** — Defines terrain mesh density, material detail, shadow, and culling budgets by backend and quality tier. Provides `terrain:lod-policy`; requires `render:quality`.
- **`underwater-atmosphere-domain-kit`** — Defines underwater haze, caustic attenuation, color shift, extinction, and camera transition thresholds. Provides `ocean:underwater-atmosphere`; requires `ocean:optics`.
- **`vegetation-archetype-domain-kit`** — Defines broadleaf, palm, sapling, bush, fern, and grass silhouettes with scale, canopy, wind, and LOD metadata. Provides `vegetation:archetypes`; requires `terrain:biome-field`.
- **`vegetation-lod-domain-kit`** — Defines near geometry, simplified middle silhouettes, far impostor intent, and cull distances by vegetation family. Provides `vegetation:lod-policy`; requires `render:quality`.
- **`vegetation-wind-domain-kit`** — Maps the shared wind field into bend frequency, gust response, root stiffness, and per-instance phase parameters. Provides `vegetation:wind-descriptor`; requires `environment:wind-field`, `vegetation:archetypes`.
- **`weather-state-domain-kit`** — Owns the sunrise-haze weather preset and exposes stable atmosphere, cloud, fog, and precipitation intent. Provides `environment:weather-state`; requires `environment:clock`, `environment:wind-field`.
- **`wind-field-domain-kit`** — Defines shared low-frequency wind direction, gust envelope, and vertical turbulence for environment consumers. Provides `environment:wind-field`; requires `seed:world`, `environment:clock`.

## small-domain

- **`deterministic-seed-domain-kit`** — Creates scoped deterministic random streams, stable identities, and reproducible unit hashes for every generated artifact. Provides `seed:world`, `random:seeded`, `identity:stable`; requires none.
- **`environment-clock-domain-kit`** — Advances deterministic environment time from engine delta without consulting wall-clock APIs inside domain logic. Provides `environment:clock`; requires none.

## Promotion status

The deterministic seed and environment clock foundations are marked stable. Visual atmosphere, ocean, procedural-placement, sequence, and renderer kits remain ProtoKits until they are proven in a second scene and pass browser/GPU regression checks across WebGPU and WebGL2 fallback backends.
