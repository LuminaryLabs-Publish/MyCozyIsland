# Deploy audit: source consumer fixture check gate

Timestamp: `2026-07-10T01-04-36-04-00`

## Current package scripts

```txt
npm start
```

There is no `npm run check` yet.

## Current validation gap

The route can be served with Python, but no local script proves:

- route token readback;
- source fingerprint stability;
- input result rows;
- movement rejection reasons;
- camera rail samples;
- grass placement/instance parity;
- cloud descriptor/cache/drift parity;
- render consumption rows;
- serializable `CozyIslandHost` state;
- legacy `globalThis.CozyIsland` compatibility.

## Required next scripts

```txt
npm run fixture:consumer
npm run check
```

Suggested first fixture:

```txt
scripts/cozy-island-browser-consumer-fixture.mjs
```

## Gate order

```txt
source profile and fingerprint fixture
  -> input result fixture
  -> movement policy fixture
  -> camera rail snapshot fixture
  -> grass/cloud parity fixture
  -> render consumption fixture
  -> host readback serialization fixture
  -> npm run check
```

## This pass validation

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: unavailable
browser smoke: not run
DOM-free source/consumer fixture: not run because proof files do not exist yet
```

## Main deploy finding

Do not claim runtime/source-consumer parity until `npm run check` exists and includes the DOM-free consumer fixture.
