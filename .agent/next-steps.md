# My Cozy Island Next Steps

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-08T19-40-00-04-00`

## Next safe ledge

Build a browser-consumer fixture gate and additive host proof snapshot around the existing route.

```txt
MyCozyIsland Browser Consumer Fixture Gate + Host Proof Snapshot
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
create ActionFrame for wheel, pointer, and keyboard inputs
create ActionResult for accepted/rejected camera and movement effects
create MovementPolicyResult from valid(next)
create CameraRailSnapshot from rail()
create GrassInstanceSnapshot from grass placement and InstancedMesh count
create HeroCloudCacheSnapshot from cloudCache and savedPointClouds
create CloudDriftResult from per-cloud drift deltas
create RenderHostSnapshot from renderer, camera, scene, and frame metadata
expose additive globalThis.CozyIslandHost.getState()
add DOM-free fixture rows for route/source/action/movement/rail/grass/cloud/render/host
```

## Implementation checklist

- [ ] Add `src/host-proof/route-version-result.js`.
- [ ] Add `src/host-proof/source-profile.js`.
- [ ] Add `src/host-proof/source-fingerprint.js`.
- [ ] Add `src/host-proof/scene-source-snapshot.js`.
- [ ] Add `src/host-proof/action-frame.js`.
- [ ] Add `src/host-proof/action-result.js`.
- [ ] Add `src/host-proof/input-journal.js`.
- [ ] Add `src/host-proof/movement-policy-result.js`.
- [ ] Add `src/host-proof/camera-rail-snapshot.js`.
- [ ] Add `src/host-proof/grass-instance-snapshot.js`.
- [ ] Add `src/host-proof/hero-cloud-cache-snapshot.js`.
- [ ] Add `src/host-proof/cloud-drift-result.js`.
- [ ] Add `src/host-proof/render-host-snapshot.js`.
- [ ] Add `src/host-proof/cozy-island-host-snapshot.js`.
- [ ] Add `src/host-proof/browser-consumer-fixture.js`.
- [ ] Add `scripts/my-cozy-island-browser-consumer-fixture.mjs`.
- [ ] Wire route/source snapshots additively into `src/main-cloudform.js` after descriptor construction.
- [ ] Record movement policy results beside `valid(next)` without changing acceptance behavior.
- [ ] Record rail snapshots beside `rail()` without changing camera values.
- [ ] Record grass snapshots beside `grassMesh(grass)` without changing instances.
- [ ] Record cloud cache/drift snapshots beside `heroCloudGeometry`, `heroCloudGroup`, and frame drift.
- [ ] Record render host snapshots beside `renderer.render(scene, camera)`.
- [ ] Keep `globalThis.CozyIsland` unchanged and add `globalThis.CozyIslandHost` as an additive proof surface.
- [ ] Add fixture rows for DOM-free route/source/action/movement/rail/grass/cloud/render/host proof.
- [ ] Update `.agent/validation.md` with exact fixture command and browser checks after source files exist.

## DSK extraction order

```txt
1. cozy-active-route-version-kit
2. cozy-route-version-result-kit
3. cozy-source-profile-kit
4. cozy-source-fingerprint-kit
5. cozy-scene-source-snapshot-kit
6. cozy-action-frame-contract-kit
7. cozy-action-result-contract-kit
8. cozy-input-journal-kit
9. cozy-movement-policy-result-kit
10. cozy-clearing-boundary-result-kit
11. cozy-campfire-keepout-result-kit
12. cozy-rail-state-kit
13. cozy-camera-rail-snapshot-kit
14. cozy-grass-instance-snapshot-kit
15. cozy-hero-cloud-cache-snapshot-kit
16. cozy-cloud-drift-result-kit
17. cozy-render-host-snapshot-kit
18. cozy-host-snapshot-kit
19. cozy-browser-consumer-fixture-kit
20. cozy-dom-free-fixture-runner-kit
21. cozy-replay-parity-smoke-kit
```

## Fixture rows to create first

```txt
01_route_version_result_reads_cloudform_token
02_source_profile_projects_all_local_descriptor_kits
03_source_fingerprint_is_stable_for_same_descriptor_inputs
04_scene_source_snapshot_contains_island_floor_grass_clearing_clouds_fire_smoke
05_wheel_action_frame_changes_scroll_progress
06_pointer_action_frame_changes_yaw_or_look
07_keyboard_action_frame_unlocks_only_after_first_person_threshold
08_movement_policy_result_accepts_inside_clearing_and_outside_campfire_keepout
09_movement_policy_result_rejects_outside_clearing_or_inside_campfire_keepout
10_camera_rail_snapshot_matches_rail_position_and_look
11_grass_instance_snapshot_matches_placement_count_and_instanced_mesh_count
12_hero_cloud_cache_snapshot_matches_saved_point_clouds
13_cloud_drift_result_records_frame_delta_without_requiring_webgl
14_render_host_snapshot_reports_renderer_camera_scene_frame
15_cozy_island_host_get_state_exposes_route_source_action_movement_rail_grass_cloud_render
16_legacy_global_cozy_island_remains_compatible
```

## Do not do next

```txt
- Do not redesign the island visuals before host proof exists.
- Do not replace main-cloudform.js in one pass.
- Do not remove globalThis.CozyIsland.
- Do not change the route token unless the route proof is intentionally updated.
- Do not promote to shared kits before DOM-free fixture proof exists.
- Do not create branches.
```
