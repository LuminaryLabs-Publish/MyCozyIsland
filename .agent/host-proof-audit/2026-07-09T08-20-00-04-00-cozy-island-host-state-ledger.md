# Host Proof Audit: Cozy Island Host State Ledger

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T08-20-00-04-00`

## Existing host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache,
  getScrollProgress
}
```

## Missing host surface

```txt
globalThis.CozyIslandHost.getState()
```

## Required additive state shape

```txt
{
  route: RouteTokenReadback,
  source: SourceProfile,
  fingerprint: SourceFingerprint,
  scene: SceneSourceSnapshot,
  input: {
    lastActionFrame,
    lastActionResult,
    journalSummary
  },
  movement: {
    lastPolicyResult,
    playerSnapshot
  },
  rail: CameraRailSnapshot,
  grass: {
    placement,
    instances
  },
  clouds: {
    descriptors,
    cache,
    lastDrift
  },
  render: RenderHostSnapshot,
  validation: {
    fixtureVersion,
    lastFixtureResult
  }
}
```

## Acceptance

```txt
legacy CozyIsland remains present
CozyIslandHost is additive
getState returns serializable records
no Three.js object references are required for fixture assertions
host state differentiates source descriptors from rendered consumers
host state records accepted and rejected input/movement decisions
```

## Main implementation ledge

```txt
MyCozyIsland Host State Cloud/Grass Readback Ledger Refresh + Browser Fixture Gate
```
