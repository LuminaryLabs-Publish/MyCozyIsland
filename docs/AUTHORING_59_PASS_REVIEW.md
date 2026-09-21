# My Cozy Island Authoring Review

My Cozy Island now carries a deterministic Authoring source manifest generated with the pinned NexusEngine Authoring domain.

- Engine source: `a74e8689d1a71c0b42236c009f0f4c46e9b89387`
- Authoring paths installed: `19`
- Passes: `59`
- Authored edits per pass: `50`
- Authored object records: `2,950`
- Fixed review views: aerial entry, shoreline close-up, campfire clearing, first-person, and mobile-wide

The generator is `scripts/generate-authoring-scene.mjs`. It creates each mesh through `mesh.primitive` operations with a stable object ID, records the Authoring revision and hash, and writes `data/authoring-scene.json`.

The browser renderer loads the manifest through `src/authoring/authored-scene.js`. It groups the authored records into instanced low-poly meshes so the source remains object-by-object while the browser render stays bounded.

Every pass has a goal and exactly 50 source edits. A pass is visually accepted only after fixed-view renders, regression inspection, and performance checks. The manifest is therefore an implemented source plan and render input; it does not claim that the AAA quality target has already been proven.

## Commands

```sh
npm run authoring:generate
npm run test:authoring
npm test
```

No GitHub workflow YAML files are part of this implementation.
