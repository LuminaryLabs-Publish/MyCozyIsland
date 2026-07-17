# Validation: device input action coverage audit

**Timestamp:** `2026-07-17T18-38-56-04-00`

## Completed

- [x] Full `LuminaryLabs-Publish` inventory compared.
- [x] `LuminaryLabs-Publish/TheCavalryOfRome` excluded.
- [x] Ten eligible central ledgers and root `.agent` states confirmed.
- [x] All eligible `main` heads matched their documented repo-local heads.
- [x] No new, missing, undocumented, or runtime-ahead repository found.
- [x] MyCozyIsland selected by the oldest synchronized documented-selection rule.
- [x] Interaction loop, domains, kits, adapters, and offered services documented.
- [x] 85 implemented surfaces preserved.
- [x] 20 proposed device-input authority surfaces defined.
- [x] Required timestamped `.agent` documents added.
- [x] Required root `.agent` indexes refreshed.
- [ ] Semantic input authority implemented.
- [ ] Touch-only and mixed-input browser fixtures executed.

## Change boundary

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML or CSS changed: no
gameplay, simulation, input, or save behavior changed: no
renderer behavior changed: no
tests or package scripts changed: no
workflow or deployment changed: no
branch created: no
pull request created: no
```

## Source evidence inspected

```txt
game.html
src/main-adventure.js
src/adventure/composition-runtime.js
src/adventure/runtime-domains.js
src/kits/catalog.js
src/kits/index.js
tests/adventure-domains-smoke.mjs
package.json
previous .agent tracker and kit registry
central MyCozyIsland ledger
current Publish repository heads and root .agent files
```

## Source-backed assertions

- `game.html` declares mobile viewport and `touch-action:none`.
- The hotbar uses non-button elements under a pointer-inert HUD.
- Compact-screen CSS hides the control legend.
- The browser adapter maps pointer input to look and maps core gameplay actions to keyboard codes.
- `n:cozy-input` accepts key, pointer, wheel, and clear commands and derives semantic fields from key codes.
- The domain smoke test exercises gameplay actions through `enqueueKey()`.

## Executable evidence

```txt
npm test: not run
npm build: no build script declared
touch-only browser gameplay fixture: unavailable
mixed keyboard/touch fixture: unavailable
pointer-cancel held-action fixture: unavailable
mobile accessibility fixture: unavailable
InputCapabilityManifestResult fixture: unavailable
FirstInputActionBoundFrameAck fixture: unavailable
built-output smoke: not run
Pages-origin smoke: not run
```

External DNS access was unavailable, so validation was limited to source inspection through the GitHub connector.

## Claims withheld

No touch-complete gameplay, mobile-complete action coverage, semantic input correctness, mixed-source correctness, accessibility conformance, artifact parity, Pages parity, or production readiness is claimed.