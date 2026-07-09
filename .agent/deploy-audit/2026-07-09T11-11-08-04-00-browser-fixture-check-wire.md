# Deploy Audit: Browser Fixture Check Wire

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-11-08-04-00`

## Summary

The repo is a static browser route. Deployment should remain simple, but validation needs a DOM-free fixture before the static route is considered proof-backed.

## Current deploy / validation state

```txt
index.html is the static entry.
package.json currently exposes npm start only.
No npm run check script exists.
No DOM-free browser consumer fixture exists.
No runtime source changed in this pass.
No browser smoke was run in this pass.
No GitHub Pages smoke was run in this pass.
```

## Required fixture wire

```txt
scripts/my-cozy-island-browser-consumer-fixture.mjs
  -> import host-proof pure modules
  -> build canonical descriptor fixture facts without browser globals
  -> assert route token hero-cloud-4
  -> assert source fingerprint stability
  -> assert scene source descriptor counts
  -> assert input action result rows
  -> assert movement policy rows
  -> assert camera rail rows
  -> assert grass placement/instance parity
  -> assert cloud descriptor/cache parity
  -> assert render host snapshot shape
```

## Required package script

```json
{
  "scripts": {
    "check": "node scripts/my-cozy-island-browser-consumer-fixture.mjs"
  }
}
```

If the repo keeps `npm start`, add `check` without changing `start`.

## Deployment guard

```txt
1. Add pure host-proof modules.
2. Add fixture script.
3. Add npm run check.
4. Run npm run check.
5. Only then consider Pages/browser smoke.
6. Do not alter the visible route during the fixture cut.
```

## Validation not run in this pass

```txt
npm install
npm run check
npm start
static server smoke
browser smoke
GitHub Pages smoke
fixture script
```

## Next safe ledge

```txt
MyCozyIsland Host Proof Ledger Parity + Browser Consumer Fixture Gate
```