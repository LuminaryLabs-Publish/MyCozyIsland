# Deploy audit: consumer fixture check gate

**Timestamp:** `2026-07-10T02-31-58-04-00`

## Current package scripts

```txt
npm start
```

There is no `npm run check` yet.

## Missing validation gate

```txt
npm run fixture:consumer
npm run check
```

## Required fixture file

```txt
scripts/cozy-island-browser-consumer-fixture.mjs
```

## Fixture should prove

```txt
route token and source fingerprint
stable scene-source snapshot
wheel accepted and clamp rows
pointer accepted, no-change, and inactive-band rows
movement accepted and rejected rows
camera rail fixed progress snapshots
grass requested/placed/instanced parity
grass batch descriptor parity
cloud descriptor/cache hit/miss/stale parity
cloud fixed-dt drift rows
render-consumption rows
serializable CozyIslandHost state
legacy CozyIsland compatibility
```

## Validation status for this pass

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: unavailable
browser smoke: not run
DOM-free fixture: not run because proof files do not exist yet
```

## Deploy guidance

Do not claim source/consumer parity from a visual browser smoke. Add DOM-free proof first, then use browser smoke for final route confidence.
