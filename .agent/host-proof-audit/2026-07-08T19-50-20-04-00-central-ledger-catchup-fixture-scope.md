# MyCozyIsland Central Ledger Catch-up Fixture Scope

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T19-50-20-04-00`

## Purpose

This audit defines the host-proof fixture scope and central-ledger catch-up rule for `MyCozyIsland`.

## Current host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache,
  getScrollProgress
}
```

## Required additive host surface

```txt
globalThis.CozyIslandHost = {
  getState() -> CozyIslandHostSnapshot
}
```

## CozyIslandHostSnapshot shape

```txt
route:
  token
  script
  status

source:
  profile
  fingerprint
  sceneSourceSnapshot

action:
  latestActionFrame
  latestActionResult
  inputJournalSummary

movement:
  latestMovementPolicyResult
  clearingBoundary
  campfireKeepout

rail:
  latestCameraRailSnapshot

grass:
  latestGrassInstanceSnapshot

clouds:
  descriptorSnapshot
  cacheSnapshot
  latestDriftResults

render:
  latestRenderHostSnapshot

legacy:
  cozyIslandPresent
  cloudContractPresent
  cloudPointCacheCount
  getScrollProgressPresent
```

## Fixture scope

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
17_central_ledger_points_to_latest_repo_local_agent_state
```

## Central sync rule

Every future repo-local `.agent` update must also update:

```txt
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
LuminaryLabs-Dev/LuminaryLabs:internal-change-log/<timestamp>-my-cozy-island-*.md
```

## Stop line

Stop before visual redesign, route-token change, renderer replacement, shared-kit promotion, or any removal of `globalThis.CozyIsland`.
