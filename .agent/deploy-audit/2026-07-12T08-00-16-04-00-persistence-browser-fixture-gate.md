# Deploy Audit: Persistence Browser Fixture Gate

Timestamp: `2026-07-12T08:00:16-04:00`

## Current gate

`npm test` runs the legacy world/render fixture chain. The new `tests/adventure-domains-smoke.mjs` exists but is not included in the package script.

## Required pre-deploy gate

```txt
node --loader ./tests/nexus-loader.mjs tests/adventure-domains-smoke.mjs
idle-autosave fixture
storage-failure fixture
atomic-restore rollback fixture
operation-ID reload fixture
reset-generation fixture
browser localStorage reload smoke
Pages first-restored-frame smoke
```

## Browser matrix

```txt
WebGPU current browser
WebGL2 fallback
localStorage enabled
localStorage unavailable or quota failure
reload after successful save
reload with corrupt save
two-tab slot conflict
pagehide/page restore
```

## Release block

Do not claim persistence readiness until:

- the adventure smoke is wired into `npm test`;
- adapter failure cannot project `Saved`;
- idle play does not write continuously;
- restore is atomic;
- command identity is reload-safe;
- the first restored frame is acknowledged.
