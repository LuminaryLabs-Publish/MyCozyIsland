# Gameplay Audit — Menu Readiness and Frame-Budget Loop

The menu is part of player entry even though it does not own simulation truth.

```txt
menu starts
  -> renderer allocates one startup-selected quality tier
  -> hidden game preload begins
  -> Play remains gated by Core Startup readiness
  -> menu animation continues while preload work progresses
  -> player points, hovers and waits
  -> Play resumes the prepared game
```

A static high-cost menu tier can compete with background game preparation on constrained devices. The current host can suspend the menu when hidden or entering, but it does not adapt menu cost from sustained frame pressure or preload contention.

The proposed authority must keep readiness factual: quality adaptation may reduce presentation cost, but it must not mark the game ready, alter gameplay state or bypass the existing Play gate.