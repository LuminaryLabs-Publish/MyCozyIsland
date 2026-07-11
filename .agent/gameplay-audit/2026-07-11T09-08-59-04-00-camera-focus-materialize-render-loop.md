# Gameplay Audit: Camera Focus Materialize Render Loop

Timestamp: `2026-07-11T09-08-59-04-00`

## Summary

The player-facing loop now combines camera movement, Core World focus, compatibility rendering, and lazy provider work. The semantic world can advance behind the camera without any gameplay-visible acknowledgement that the newly ready cell data was consumed.

## Loop

```txt
rail or first-person input
  -> scenario tick
  -> camera descriptor
  -> focus target selection
  -> throttled Core World focus update
  -> compatibility world frame
  -> lazy materialization step
  -> aggregate progress readback
```

## Current behavior

- Rail mode keeps world focus at the island origin.
- First-person mode uses camera position for cell priority and focus updates.
- Focus commits can add and release active cells.
- Materializer synchronization removes released states and adds new active states.
- One candidate provider stage advances after the visible frame.
- Gameplay continues on the compatibility island regardless of provider readiness.

## Gameplay integrity gap

```txt
camera enters cell
  -> cell becomes active
  -> semantic provider work begins
  -> cell may become ready
  -> visible scene does not change
  -> no gameplay event or frame acknowledgement identifies readiness
```

There is no rule for whether movement may enter an unready cell, whether compatibility data is authoritative during partial work, or when collision/ground contact/rendering should switch to materialized cell data.

## Required policy

```txt
cell state:
  registered
  materializing
  ready-semantic
  preparing-render
  visible
  degraded
  failed
  released
```

For each state, declare:

```txt
movement admission
ground-contact source
collision source
visual source
interaction source
fallback policy
diagnostic projection
```

## Required fixture

```txt
camera crosses into a new cell
  -> focus revision accepted
  -> materialization priority changes
  -> compatibility gameplay remains stable
  -> readiness revision commits
  -> render revision commits
  -> visible frame acknowledges switch
  -> released prior cell retires exactly once
```
