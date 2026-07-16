# Deploy audit: accessibility browser fixture gate

**Timestamp:** `2026-07-15T19-58-42-04-00`

## Summary

Node smoke tests cannot prove accessibility-tree state, announcement behavior or cross-document focus.

## Plan ledger

**Goal:** gate source, built artifact and Pages on the same semantic behavior.

- [ ] Run existing `npm test`.
- [ ] Add a browser accessibility-tree snapshot.
- [ ] Verify menu progressbar values and stable Play identity.
- [ ] Verify loader busy/progress completion.
- [ ] Verify stamina and selected-seed semantics.
- [ ] Verify interaction announcement deduplication.
- [ ] Verify iframe/canvas focus after entry.
- [ ] Verify hidden preload is absent from the active accessibility tree.
- [ ] Run keyboard-only traversal.
- [ ] Run at least one screen-reader smoke.
- [ ] Build/download the Pages artifact.
- [ ] Repeat the fixture against the deployed origin.

## Required fixture matrix

```txt
source route
built artifact
Pages origin

menu loading
menu ready
entry transition
new game
restored game
interaction target change
accepted agriculture action
accepted forage action
save success
startup failure
reduced motion
```

## Release gate

Do not claim accessible menu or gameplay until the same semantic revisions and focus results pass across source, artifact and Pages.
