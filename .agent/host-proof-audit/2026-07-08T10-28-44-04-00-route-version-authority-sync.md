# Route Version Authority Sync

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T10-28-44-04-00`

## Finding

`index.html` currently loads:

```txt
./src/main-cloudform.js?v=hero-cloud-4
```

Several existing `.agent` docs and the kit registry still describe the route as:

```txt
./src/main-cloudform.js?v=hero-cloud-3
```

This is not a runtime failure. It is a proof-planning failure: a future host-proof fixture would validate the wrong route token unless the route version becomes first-class source data.

## Required contract

```txt
RouteScriptToken
  input:
    html route script src
    expected entry basename
    accepted version token
  output:
    scriptPath
    queryVersion
    acceptedVersion
    status
    reason
```

```txt
RouteVersionResult
  accepted:
    status = accepted
    reason = route-version-current
    queryVersion = hero-cloud-4

  rejected:
    status = rejected
    reason = route-version-mismatch | missing-script | missing-version-token | malformed-script-src
```

## Source profile update

`SourceProfile` must carry the active route token so every later snapshot is traceable to the loaded route.

```txt
SourceProfile.route:
  entryScript: ./src/main-cloudform.js
  activeVersion: hero-cloud-4
  routeFile: index.html
  compatibilityGlobal: globalThis.CozyIsland
  additiveProofGlobal: globalThis.CozyIslandHost
```

## Fixture acceptance rows

```txt
cozy-route-version-001:
  input: ./src/main-cloudform.js?v=hero-cloud-4
  expected status: accepted
  expected reason: route-version-current
  expected queryVersion: hero-cloud-4

cozy-route-version-mismatch-001:
  input: ./src/main-cloudform.js?v=hero-cloud-3
  expected status: rejected
  expected reason: route-version-mismatch
  expected queryVersion: hero-cloud-3
  expected acceptedVersion: hero-cloud-4

cozy-route-version-missing-001:
  input: ./src/main-cloudform.js
  expected status: rejected
  expected reason: missing-version-token
```

## Files to change in next source pass

```txt
src/host-proof/route-version.js
src/host-proof/source-profile.js
src/host-proof/fixture-cases.mjs
src/main-cloudform.js
package.json, only if adding a fixture script
.agent/validation.md, after commands run
```

## Files not to change in next source pass

```txt
index.html, unless there is a deliberate route-token migration
visual shader/material constants
terrain/floor/water/foam/path render adapters
foliage/fence/campfire/smoke/grass/cloud rendering
public scene layout
legacy globalThis.CozyIsland compatibility shape
```

## Stop line

Stop when route authority and host-proof fixtures agree on `hero-cloud-4`, the browser route still loads, and `globalThis.CozyIsland` remains backward compatible.
