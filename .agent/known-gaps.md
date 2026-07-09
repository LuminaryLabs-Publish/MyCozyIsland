# Known Gaps: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-09T17-38-53-04-00`

## Selection and ledger

```txt
No eligible non-Cavalry Publish repo was new, ledger-absent, missing recorded root .agent state, or otherwise undocumented.
MyCozyIsland was selected under the oldest documented-selection fallback.
TheCavalryOfRome remains excluded.
```

## Source proof gaps

```txt
No normalized source profile exists.
No stable source fingerprint exists.
No serializable scene-source snapshot exists.
The route token is not included in runtime readback.
```

## Interaction proof gaps

```txt
Browser input mutates progress, yaw, pitch, and key state directly.
The pointer inactive range from 0.85 to below 0.985 has no explicit result reason.
Movement rejection is silent.
No accepted/rejected/no-change input result exists.
No input journal exists.
No deterministic rail or first-person camera snapshot exists.
```

## Render proof gaps

```txt
No source-to-render consumption ledger exists.
No terrain/floor/shoreline/path/object count parity exists.
No grass placement-to-instance parity exists.
Cloud geometry cache keys by id without descriptor fingerprint verification.
No cloud cache hit/miss or stale-entry row exists.
No cloud drift result row exists.
No normalized renderer/scene/camera snapshot exists.
```

## Host and compatibility gaps

```txt
No globalThis.CozyIslandHost surface exists.
Legacy globalThis.CozyIsland only exposes cloudContract, cloudPointCache, and getScrollProgress.
No automated legacy parity check exists.
```

## Validation gaps

```txt
package.json only provides npm start.
No npm run check exists.
No DOM-free fixture exists.
No browser smoke was run in this documentation-only pass.
```
