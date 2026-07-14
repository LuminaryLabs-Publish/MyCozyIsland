# Known gaps: MyCozyIsland shell startup fault isolation

**Timestamp:** `2026-07-14T05-02-03-04-00`  
**Publication status:** `menu-failure-game-bootstrap-fallback-authority-audited`

## Summary

The primary game route is still launched only after successful menu rendering preparation. The shell has no independent preload lane, menu-failure classification, degraded loading state, retry isolation or first visible fallback-game-frame result.

## Plan ledger

**Goal:** keep the open work dependency ordered and distinguish confirmed source behavior from unimplemented fallback guarantees.

- [ ] Independent shell-owned game preload.
- [ ] Shell, menu and game attempt identity.
- [ ] Menu provider and renderer preparation results.
- [ ] Menu failure timeout and classification.
- [ ] DOM-only degraded progress and controls.
- [ ] Isolated menu and game retries.
- [ ] Current-revision direct game entry.
- [ ] First fallback-game-frame acknowledgement.
- [ ] Partial menu-candidate retirement.
- [ ] Stale and duplicate result fencing.
- [ ] Browser/build/Pages fault-injection proof.

## Bootstrap identity gaps

```txt
ShellGeneration: absent
MenuPresentationAttemptId: absent
GamePreloadAttemptId: absent
EntryAttemptId: absent
ShellProjectionRevision: absent
TerminalShellBootstrapResult: absent
```

## Lane-isolation gaps

```txt
iframe src before menu success: absent
shell-owned preload launch: absent
menu/game parallel preparation contract: absent
primary-game capability policy: absent
menu failure classified as recoverable: absent
game preload retained during menu retry: absent
menu retained during game retry: absent
```

## Menu preparation gaps

```txt
static provider import result: absent
static provider import application error handler: absent
renderer initialization result: absent
renderer initialization timeout: absent
scene preparation result: absent
RenderPipeline preparation result: absent
menu first-frame acknowledgement: absent
partial-candidate resource manifest: absent
partial-candidate retirement result: absent
```

## Degraded projection gaps

```txt
DOM-only loading fallback: absent
degraded-menu mode: absent
game progress after menu failure: absent
accessible menu retry: absent
accessible game retry: absent
direct game entry control: absent
failure-specific copy: absent
```

`reportFailure()` disables Play and writes `Could Not Start`. It does not distinguish menu-only failure from game failure and does not start the game lane.

## Game-entry gaps

```txt
direct entry bound to GamePreloadAttemptId: absent
expected Core Startup revision: absent
first fallback-game-frame acknowledgement: absent
fallback entry terminal result: absent
late child result rejection: absent
repeated fallback Play idempotency: absent
```

## Provider-sharing gaps

Both menu and game import Three.js from the same CDN revision. A network or CDN failure may affect both lanes, but the shell cannot currently distinguish:

```txt
menu-only preparation failure
shared provider failure
game-only NexusEngine or Agriculture provider failure
recoverable transient failure
terminal incompatibility
```

## Validation gaps

```txt
menu module import interception: absent
TSL/Bloom import failure fixture: absent
renderer init rejection fixture: absent
renderer init timeout fixture: absent
scene construction failure fixture: absent
pipeline construction failure fixture: absent
menu-failure/game-success fixture: absent
game-failure/menu-success fixture: absent
both-fail fixture: absent
retry isolation fixture: absent
first fallback frame fixture: absent
source/build/Pages parity fixture: absent
```

## Retained GPU handoff gaps

```txt
presentation surface generations
menu and game leases
first resumed normal-game frame
bounded overlap
complete menu resource retirement
listener/timer retirement
CozyMenu capability revocation
```

Fault isolation does not replace those requirements. A healthy or degraded shell still needs correct presentation handoff and cleanup.

## Retained protocol and lifecycle gaps

```txt
versioned cross-window envelopes
origin and sequence admission
pagehide and BFCache policy
stale callbacks
adaptive quality transitions
portable save durability
browser input authority
bounded public capabilities
```

## Dependency order

```txt
shell-owned preload launch
  -> shell and attempt identity
  -> independent menu/game results
  -> menu fault classification
  -> degraded progress and controls
  -> retry isolation
  -> direct entry against current game revision
  -> first fallback-game-frame acknowledgement
  -> GPU handoff and retirement settlement
  -> browser/build/Pages parity
```

## Do not claim

Do not claim menu fault tolerance, independent game startup, degraded entry, retry safety, fallback-frame proof or production readiness until the relevant fixtures pass on `main`.
