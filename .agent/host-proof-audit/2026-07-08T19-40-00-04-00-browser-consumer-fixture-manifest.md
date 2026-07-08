# MyCozyIsland Browser Consumer Fixture Manifest

**Timestamp:** `2026-07-08T19-40-00-04-00`

## Purpose

Define the first source-file manifest for proving `MyCozyIsland` behavior through browser-consumer records without changing the visible scene.

## Source files to add next

```txt
src/host-proof/route-version-result.js
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/action-frame.js
src/host-proof/action-result.js
src/host-proof/input-journal.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/grass-instance-snapshot.js
src/host-proof/hero-cloud-cache-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/render-host-snapshot.js
src/host-proof/cozy-island-host-snapshot.js
src/host-proof/browser-consumer-fixture.js
scripts/my-cozy-island-browser-consumer-fixture.mjs
```

## Additive host surface

Keep existing compatibility surface:

```js
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache,
  getScrollProgress: () => progress
};
```

Add proof surface beside it:

```js
globalThis.CozyIslandHost = {
  getState() {
    return {
      route,
      source,
      actions,
      movement,
      rail,
      grass,
      clouds,
      render,
      compatibility
    };
  }
};
```

## Browser consumer fixture rows

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

## Integration order

```txt
1. Add pure src/host-proof modules.
2. Add DOM-free fixture script.
3. Wire route/source records immediately after descriptor creation.
4. Wire movement and action results beside input handlers and valid(next).
5. Wire rail snapshots beside rail().
6. Wire grass snapshots beside grassMesh(grass).
7. Wire cloud cache/drift snapshots beside heroCloudGeometry/heroCloudGroup/frame drift.
8. Wire render snapshots beside renderer.render(scene, camera).
9. Expose globalThis.CozyIslandHost additively.
10. Run fixture before any visual change.
```

## Non-goals

```txt
no visual redesign
no route token change
no replacement of main-cloudform.js
no removal of globalThis.CozyIsland
no promotion to shared kits before fixture proof
```
