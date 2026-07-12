# Validation: MyCozyIsland

Last updated: `2026-07-11T20-51-14-04-00`

## Documentation pass result

```txt
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest stable eligible entry after full Publish/ledger comparison; active PrehistoricRush runtime work skipped
runtime source changed by this pass: no
rendering output changed by this pass: no
package scripts changed by this pass: no
dependencies changed by this pass: no
deployment configuration changed by this pass: no
branch created: no
pull request created: no
repo-local documentation pushed to main: yes
```

## Plan ledger

**Goal:** separate source-backed lifecycle-contract findings from executable proof and define the exact legacy/Core parity, reset/reprepare, terminal-disposal and frame-correlation gate.

- [x] Inspect active route and world-mode selection.
- [x] Inspect both `world-runtime.js` branches.
- [x] Inspect prepare, reset, dispose, query and state semantics.
- [x] Inspect pagehide and global host exposure.
- [x] Inspect package test chain and Core World runtime test.
- [x] Confirm lifecycle phase and generation are absent.
- [x] Confirm legacy/Core disposal semantics diverge.
- [x] Confirm post-dispose admission is undefined.
- [x] Document commands, results, leases and fixture contracts.
- [x] Change documentation only.
- [ ] Implement and run lifecycle parity fixtures.
- [ ] Run browser replacement-frame and pagehide fixtures.

## Source-backed checks

```txt
same wrapper method names in legacy/core: yes
legacy reset/dispose only clear prepared: yes
legacy prepare after dispose structurally allowed: yes
core reset calls resetWorlds: yes
core dispose calls reset then Core World domain reset: yes
core wrapper has disposed flag: no
world lifecycle phase exists: no
world generation exists: no
typed reset/dispose results exist: no
use-after-dispose rejection exists: no
query lease/revocation exists: no
```

## Render and host checks

```txt
compatibility snapshot created once at startup: yes
animation loop lifecycle-bound to world generation: no
pagehide calls domains.dispose: yes
pagehide revokes globalThis.CozyIsland: no
pagehide stops renderer loop in route: no
frame receipt includes world phase/generation: no
```

## Existing validation surface

```txt
static architecture checks: present
semantic domain tests: present
Core World initial preparation test: present
provider ordering/lifecycle tests: present
lazy materialization tests: present
renderer disposal utility tests: present
legacy/core lifecycle parity fixture: absent
reset/reprepare fixture: absent
use-after-dispose fixture: absent
query lease fixture: absent
first replacement-frame fixture: absent
browser pagehide lifecycle fixture: absent
```

## Required fixture matrix

```txt
1. legacy lifecycle
   prepare, duplicate prepare, reset, prepare, duplicate dispose

2. Core lifecycle
   prepare 49 cells, reset, retain/re-register definition, prepare new generation

3. terminal disposal
   duplicate dispose and deterministic rejection of later mutations

4. read models
   stale query, diagnostics and snapshot lease rejection

5. retirement
   exact provider/materializer release counts and unresolved ownership reporting

6. generation
   stale focus/materialization result rejection

7. rendering
   no DISPOSED world frame and first READY replacement-frame receipt

8. browser lifecycle
   pagehide disposal, loop stop and global readback revocation

9. parity
   legacy/Core/WebGPU/WebGL2 result-schema parity
```

## Commands not run

```txt
npm test
browser/WebGPU lifecycle smoke
browser/WebGL2 lifecycle smoke
reset/reprepare fixture
use-after-dispose fixture
query lease fixture
first replacement-frame capture
Pages live smoke
```

## Reason executable validation was not claimed

This run used source inspection and GitHub documentation writes. The runtime does not yet expose lifecycle phases, generations, typed commands/results, query leases or injectable reset/dispose adapters required to execute the proposed parity and terminal-state fixtures.

## Acceptance gate

```txt
READY always has a committed snapshot
RESET is reusable in both modes
DISPOSED is terminal in both modes
legacy and core return the same lifecycle result classes
successful reprepare advances generation
stale generation work cannot commit
query/diagnostic leases are revoked on reset/dispose
pagehide retires the runtime and public readback
first replacement frame identifies the new generation
```
