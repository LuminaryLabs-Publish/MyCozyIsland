# Deploy Audit: Browser Consumer Fixture Check Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-39-07-04-00`

## Current deploy/check surface

`package.json` only exposes:

```json
{
  "scripts": {
    "start": "python3 -m http.server 8080"
  }
}
```

There is no local `check`, `test`, `build`, or fixture script yet.

## Required next validation path

```txt
scripts/cozy-island-browser-consumer-fixture.mjs
npm run check
```

Recommended `npm run check` once fixture exists:

```txt
node scripts/cozy-island-browser-consumer-fixture.mjs
```

## Fixture should prove

```txt
source fingerprint is stable
route token matches index.html
scene source snapshot is generated
grass source count equals grass render instance count
cloud source count equals cloud cache geometry count
movement accepted/rejected rows are explicit
camera rail snapshot can be sampled without DOM
render host snapshot is generated without changing visuals
legacy CozyIsland surface remains present
```

## Validation status this pass

```txt
runtime source changed: no
branch created: no
pull request created: no
npm start: not run
npm run check: not available yet
browser smoke: not run
fixture: not run, fixture does not exist yet
```
