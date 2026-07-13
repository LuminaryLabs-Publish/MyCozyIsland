# Deploy audit: production host capability fixture gate

**Timestamp:** `2026-07-13T04-10-37-04-00`

## Summary

The deployed page currently publishes the same raw `CozyIsland` ownership graph as the source host. Deployment proof must verify that production exposes only the declared read-only projection and that development/test capability surfaces do not leak into the built Pages artifact.

## Plan ledger

**Goal:** make public-host policy a build and deployment gate rather than a source-only convention.

- [x] Identify the unconditional browser-global publication.
- [x] Identify raw simulation and presentation owners in the public object.
- [x] Define source/build/Pages policy checks.
- [x] Define capability and visible-effect fixtures.
- [ ] Add and execute the fixture gate.

## Required gate

```txt
source inspection
  -> global host policy declared
  -> raw owners absent from production projection

build inspection
  -> production bundle contains no mutating grant bootstrap
  -> debug/test channel disabled by default
  -> public projection schema matches source contract

browser smoke
  -> read-only projection available
  -> engine/renderer/scene/camera/domain APIs unavailable
  -> mutating command rejected without grant
  -> grant/revoke fixtures work in admitted test mode

Pages smoke
  -> same production policy
  -> no raw-owner escape
  -> no reset or tick bypass
  -> visible diagnostics cite committed frame revision
```

## Fixture matrix

```txt
production source host policy
production build global keys
raw owner exclusion
read-only snapshot immutability
unknown capability rejection
expired/revoked capability rejection
duplicate/stale command rejection
page lifecycle host revocation
reset confirmation and generation
WebGPU/WebGL2 visible-effect parity
first visible capability-effect acknowledgement
```

## CI evidence required

```txt
command
exit code
source commit
built artifact hash
public-host schema snapshot
browser backend
fixture result matrix
Pages URL and deployed commit
first visible frame evidence
```

## Validation boundary

No build, browser, backend or Pages fixture was run. Deployment configuration and runtime source are unchanged.
