# Deploy audit: source consumer fixture gate

Timestamp: `2026-07-09T23-41-15-04-00`

## Current package scripts

```txt
npm start
```

There is no `npm run check` and no DOM-free fixture command.

## Validation status this pass

```txt
runtime source changed: no
package scripts changed: no
npm run check: unavailable
browser smoke: not run
DOM-free fixture: not run because proof files do not exist yet
```

## Required next validation scripts

```txt
npm run fixture:consumer
npm run check
```

`fixture:consumer` should run a DOM-free proof script that validates source fingerprints, input result rows, movement policy results, grass/cloud parity, render consumption rows, and serializable `CozyIslandHost` snapshots.

## Suggested first fixture

```txt
scripts/cozy-island-browser-consumer-fixture.mjs
```

## Gate recommendation

Do not make a visual rewrite the deploy gate. First make source/consumer proof deterministic, then use browser smoke for visual sanity after the fixture passes.
