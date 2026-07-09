# My Cozy Island Next Steps

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-08T21-58-34-04-00`

## Next safe ledge

Build a browser-consumer source wire and host projection fixture gate around the existing route.

```txt
MyCozyIsland Browser Consumer Source Wire + Host Projection Fixture Gate
```

Preserve the current game first:

```txt
preserve index.html
preserve ./src/main-cloudform.js?v=hero-cloud-4
preserve current Three.js CDN import
preserve current visible route, color, camera rail, and hero cloud look
preserve current globalThis.CozyIsland compatibility fields
preserve current wheel, pointer, keyboard, and first-person threshold behavior
preserve current clearing and campfire movement constraints
preserve current grass, smoke, water, flame, and cloud drift visuals
```

Then add fixture-readable facts around the current behavior:

```txt
create RouteVersionResult from the route script token
create SourceProfile from local descriptor-kit outputs
create SourceFingerprint from source profile facts
create SceneSourceSnapshot from island, clearing, grass, clouds, campfire, smoke, and floor descriptors
create BrowserInputActionFrame for wheel, pointer, and keyboard inputs
create ActionResult for accepted/rejected camera, progress, and movement effects
create MovementPolicyResult from valid(next)
create CameraRailSnapshot from rail()
create GrassInstanceSnapshot from grass placement and InstancedMesh count
create HeroCloudDescriptorSnapshot from the mattatz/cloudform contract
create HeroCloudCacheSnapshot from cloudCache and savedPointClouds
create CloudDriftResult from per-frame cloud delta
create RenderHostSnapshot from renderer/camera/scene/render consumption facts
create CozyIslandHostSnapshot for globalThis.CozyIslandHost.getState()
run DOM-free fixture rows before touching visible behavior
```

## Recommended implementation order

```txt
1. Add pure host-proof source modules under src/host-proof/.
2. Add scripts/my-cozy-island-browser-consumer-fixture.mjs.
3. Prove route/source/fingerprint/scene snapshot rows without DOM or WebGL.
4. Prove input/action/movement rows using plain objects and deterministic inputs.
5. Prove rail, grass, cloud, and render projection rows using snapshot inputs.
6. Add read-only imports to src/main-cloudform.js.
7. Project records beside existing descriptor construction and frame loop.
8. Expose globalThis.CozyIslandHost.getState() additively.
9. Keep globalThis.CozyIsland unchanged.
10. Add npm script only after the fixture script exists.
```

## Target source files

```txt
src/host-proof/route-version-result.js
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/browser-input-action-frame.js
src/host-proof/action-result.js
src/host-proof/input-journal.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/grass-instance-snapshot.js
src/host-proof/hero-cloud-descriptor-snapshot.js
src/host-proof/hero-cloud-cache-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/render-host-snapshot.js
src/host-proof/cozy-island-host-snapshot.js
src/host-proof/browser-consumer-fixture.js
scripts/my-cozy-island-browser-consumer-fixture.mjs
```

## Fixture rows to require

```txt
01_route_version_result_reads_hero_cloud_4
02_source_profile_lists_all_local_descriptor_kits
03_source_fingerprint_is_stable_for_same_inputs
04_scene_source_snapshot_counts_landform_floor_foliage_grass_clearing_fire_smoke_clouds
05_wheel_action_result_changes_progress_and_clamps
06_pointer_action_result_changes_pre_fp_yaw_or_fp_yaw_pitch
07_keyboard_action_result_rejects_before_first_person_threshold
08_movement_policy_accepts_inside_clearing_outside_campfire
09_movement_policy_rejects_outside_clearing
10_movement_policy_rejects_inside_campfire_keepout
11_camera_rail_snapshot_matches_progress_samples
12_grass_instance_snapshot_matches_patch_count_and_instance_count
13_hero_cloud_descriptor_snapshot_matches_cloud_contract
14_hero_cloud_cache_snapshot_matches_saved_point_clouds
15_cloud_drift_result_records_x_z_y_delta_without_webgl
16_render_host_snapshot_reports_scene_renderer_camera_consumers
17_cozy_island_host_get_state_exposes_all_projection_sections
18_legacy_global_cozy_island_remains_compatible
```

## Stop conditions

```txt
stop before visual changes
stop before shared-kit promotion
stop before renderer extraction
stop before changing route token
stop before removing legacy globals
stop when fixture rows pass and host projection is additive
```
