# Validation: MyCozyIsland preload suspension lease and resumed-frame authority

**Timestamp:** `2026-07-14T15-01-54-04-00`

## Scope

Documentation-only inspection of the hidden game preload bridge, parent reveal path, source smoke, participant ownership, and first resumed-frame proof boundary. No runtime behavior was modified or executed.

## Plan ledger

**Goal:** distinguish confirmed source implementation from unproved suspension, restoration, timeout and visible-entry guarantees.

- [x] Compare the full Publish inventory with the central ledger.
- [x] Confirm every eligible repository head matches its recorded documentation head.
- [x] Select MyCozyIsland through the oldest synchronized timestamp rule.
- [x] Inspect the parent shell and child preload bridge.
- [x] Inspect source-pattern test coverage.
- [x] Preserve 65 source-backed kits and five adapters.
- [x] Query combined commit status.
- [ ] Run `npm test` independently.
- [ ] Execute real-browser suspension and restoration fixtures.
- [ ] Execute built-output and Pages fixtures.

## Source-backed observations

```txt
reviewed runtime revision: 6c5e465b7b431ff6758f78e7ceb25d0f763f658f
reviewed pre-audit repository head: fc5a119eefc7aad5e062b15df6325e2dc28a421a
hidden game readiness source: Core Startup descriptor.playable
simulation sleep: replace engine.tick and engine.step
presentation sleep: capture animation callback and setAnimationLoop(null)
entry restoration: restore captured methods and callback
entry acknowledgement: posted synchronously after restoration calls
parent fallback reveal: 900 ms
suspension lease identity: absent
participant revisions: absent
atomic restoration result: absent
restore rollback receipt: absent
first resumed simulation receipt: absent
FirstResumedGameFrameAck: absent
message origin/schema/sequence admission: absent
```

## Existing executable coverage

`npm test` is configured to run:

```txt
tests/menu-game-shell-smoke.mjs
tests/startup-domain-smoke.mjs
tests/adventure-domains-smoke.mjs
```

The shell smoke parses source files and checks regular-expression markers. It confirms that freeze and resume functions exist, the hidden renderer loop is cleared, and `cozy-game-entered` is referenced. It does not instantiate a browser engine or renderer, execute the message protocol, replace participants, inject restoration failure, or capture a resumed frame.

## Required fixtures

```txt
normal WebGPU suspension and entry
normal WebGL2 suspension and entry
engine tick/step identity before and after entry
renderer and animation callback identity before and after entry
first resumed simulation step
first resumed render submission
first visible iframe frame
repeated Play and duplicate entry
stale suspension lease
engine replacement while suspended
renderer replacement while suspended
missing or changed animation callback
restore exception and rollback
message delay, duplication and reordering
wrong origin and wrong source
900 ms timeout classification
pagehide and BFCache during suspension
reduced-motion path
source/build/Pages semantic parity
```

## Combined status

The GitHub combined-status endpoint returned no status entries for pre-audit repository head `fc5a119eefc7aad5e062b15df6325e2dc28a421a`.

## Validation result

```txt
documentation changed: yes
runtime JavaScript changed by audit: no
HTML or CSS changed by audit: no
gameplay changed by audit: no
render behavior changed by audit: no
dependencies changed by audit: no
package scripts changed by audit: no
test behavior changed by audit: no
workflow changed by audit: no
deployment changed by audit: no
branch created: no
pull request created: no

source files inspected: yes
repository selection compared: yes
package test wiring inspected: yes
combined status checks reported: none
npm test independently run: no
browser suspension fixture: not run
browser restoration fixture: not run
first resumed-frame fixture: not run
built-output smoke: not run
Pages smoke: not run
```

No suspension atomicity, restoration coherence, timeout safety, visible-frame convergence, deployed parity, or production-readiness claim is made.
