# Embed-context audit: top-level query, iframe and parent contract

**Timestamp:** `2026-07-14T20-05-56-04-00`  
**Status:** `embed-context-route-admission-authority-audited`

## Summary

The current bridge uses:

```js
const embeddedPreload = parameters.get("preload") === "1" || window.parent !== window;
const targetOrigin = location.origin;
```

This conflates route intent with window hierarchy and assumes the parent shares the child origin before proving it.

## Plan ledger

**Goal:** replace the boolean heuristic with an explicit three-way context contract that cannot silently freeze a playable game.

- [x] Enumerate context combinations.
- [x] Classify transport and lifecycle consequences.
- [x] Define required admission result.
- [ ] Implement the contract and execute the matrix.

## Context matrix

| Query | Window | Current classification | Current risk | Required result |
|---|---|---|---|---|
| none | top-level | direct | normal | `DirectPlayAccepted` |
| `preload=1` | top-level | preload | freezes with no parent shell | reject or recover to direct play |
| none | same-origin iframe | preload | implicit shell authority | require handshake or standalone policy |
| `preload=1` | same-origin menu iframe | preload | intended path but unversioned | admitted shell preload |
| none | cross-origin iframe | preload | outgoing target origin mismatch | unsupported/standalone result |
| `preload=1` | cross-origin iframe | preload | readiness cannot reach parent | rejected shell preload |

## Contract

```txt
DirectPlayAccepted
  -> HUD, input, simulation and renderer remain active

ShellPreloadAccepted
  -> exact parent window, origin, shell generation and nonce bound
  -> readiness messages admitted
  -> suspension lease allowed

UnsupportedEmbedResolved
  -> explicit standalone or visible failure policy
  -> never silent suspension
```

## Security and reliability boundary

Checking `event.source === window.parent` is necessary but not enough. The admitted channel must also validate `event.origin`, schema, nonce, sequence and shell generation. The parent must use the admitted parent origin rather than the child origin when receiving child messages across origins.