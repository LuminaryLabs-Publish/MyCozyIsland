# Validation: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-08T02:09:17-04:00`

## Validation performed in this pass

```txt
repo selection:
  checked full installed LuminaryLabs-Publish repo search results
  compared against central LuminaryLabs-Dev/LuminaryLabs ledger search results
  verified MyCozyIsland central ledger exists
  verified MyCozyIsland root .agent/START_HERE.md was missing before this pass

source inspection:
  read README.md
  read index.html
  read package.json
  read src/main-cloudform.js excerpt
  read src/kits/ocean-island-landform-domain/index.js
  read src/kits/island-foliage-domain/index.js
  read docs/cloud-kits.md
  attempted .github/workflows/deploy.yml and confirmed it was not found through fetch

repo writes:
  created root .agent operating state in LuminaryLabs-Publish/MyCozyIsland on main
  created central internal change-log entry in LuminaryLabs-Dev/LuminaryLabs on main
  updated central MyCozyIsland repo ledger in LuminaryLabs-Dev/LuminaryLabs on main
```

## Runtime validation not performed

```txt
- No browser launch was performed.
- No GitHub Pages URL was opened.
- No local static server was started.
- No Playwright test was run.
- No package test was run because package.json only declares a start script.
- No build command was run because no build script was present in package.json.
```

## Current known command surface

```bash
npm run start
```

Equivalent direct static-server command from README:

```bash
python3 -m http.server 8080
```

Then open:

```txt
http://localhost:8080/
```

## Next validation target

Add a DOM-free fixture script that imports the host-proof/result modules once they exist and verifies:

```txt
- route version resolves to hero-cloud-3
- source fingerprint is deterministic
- camera rail snapshot is deterministic for fixed progress samples
- movement inside the clearing is accepted
- movement outside the clearing is rejected with an explicit reason
- campfire keepout rejection has a distinct reason
- hero cloud descriptor snapshot is stable
- hero cloud cache snapshot reports stable point counts
- cloud drift result is deterministic for fixed dt/tick input
- globalThis.CozyIsland remains additive and not required by fixture tests
```
