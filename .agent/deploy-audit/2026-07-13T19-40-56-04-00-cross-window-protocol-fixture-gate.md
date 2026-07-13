# Deploy audit: cross-window protocol fixture gate

**Timestamp:** `2026-07-13T19-40-56-04-00`

## Summary

Current `npm test` coverage is structural. It does not execute the parent/iframe protocol, reload races, stale messages, duplicate entry, timeout policy, BFCache restoration or first visible game-frame correlation.

## Plan ledger

**Goal:** require equivalent terminal protocol results from source serving, built output and GitHub Pages before claiming handoff readiness.

- [x] Inspect package test wiring.
- [x] Identify protocol paths absent from structural smoke.
- [x] Define browser and deployment fixture cases.
- [ ] Add the fixtures to the check chain.
- [ ] Run source, build and Pages parity.

## Required fixture matrix

```txt
normal preload progress -> ready -> entry -> visible frame -> commit
malformed payload
foreign origin
foreign source window
wrong protocol version
stale iframe generation
stale preload attempt
out-of-order progress after ready
replayed ready message
duplicate Play/entry request
child reload during preload
child reload during entry
entry preparation exception
entered message delayed beyond timeout
explicit degraded reveal policy
first visible frame delayed
pagehide during preload
pagehide during entry
BFCache restore with predecessor timers/messages
menu retirement after committed entry
direct game route without parent protocol
```

## Deployment gate

```txt
source server terminal result
  == built artifact terminal result
  == GitHub Pages terminal result
```

The comparison must include status, generation IDs, admitted/rejected message counts, final startup/entry revision and visible-frame acknowledgement. Secrets, arbitrary payloads and unbounded event logs must not be published.

## Current validation

```txt
npm test independently run: no
browser protocol fixture: unavailable
built-output protocol fixture: unavailable
Pages protocol fixture: unavailable
```

No deployment parity or production-readiness claim is made.