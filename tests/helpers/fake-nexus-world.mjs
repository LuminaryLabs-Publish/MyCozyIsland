function stableCellId(worldId, partitionId, x, z) {
  return `${worldId}:${partitionId}:${x}:${z}`;
}

export function createFakeNexusWorldRuntime() {
  const trace = [];

  function defineWorldEffectProvider(options = {}) {
    return Object.freeze({
      id: options.id,
      kind: options.kind ?? options.id,
      phase: options.phase ?? "population",
      critical: Boolean(options.critical),
      provides: Object.freeze([...(options.provides ?? [])]),
      requires: Object.freeze([...(options.requires ?? [])]),
      prepareCell: options.prepareCell ?? options.build,
      updateCell: options.updateCell ?? options.prepareCell ?? options.build,
      releaseCell: options.releaseCell ?? options.release ?? (() => {}),
      getEffectDescriptor: options.getEffectDescriptor ?? (() => null),
      snapshot: options.snapshot ?? (() => null),
      restoreSnapshot: options.restoreSnapshot ?? (() => {}),
      reset: options.reset ?? (() => {})
    });
  }

  function createTerrainProviderAdapter({ terrain, id = "terrain-provider", critical = true } = {}) {
    const cells = new Map();
    return defineWorldEffectProvider({
      id,
      kind: "terrain",
      phase: "foundation",
      critical,
      provides: ["terrain-height", "terrain-normal", "terrain-material", "terrain-descriptor"],
      prepareCell({ world, cell, surface }) {
        const result = terrain.prepareCell({ worldId: world.id, cell, surface, seed: `${cell.seed}:terrain` });
        cells.set(cell.id, result);
        return { id: `${cell.id}:terrain`, kind: "terrain", capabilities: ["terrain-descriptor"], descriptor: result.descriptor };
      },
      updateCell({ world, cell, surface }) {
        const result = terrain.updateCell({ worldId: world.id, cell, surface, seed: `${cell.seed}:terrain` });
        cells.set(cell.id, result);
        return { id: `${cell.id}:terrain`, kind: "terrain", capabilities: ["terrain-descriptor"], descriptor: result.descriptor };
      },
      releaseCell({ cell }) {
        terrain.releaseCell(cell.id);
        cells.delete(cell.id);
      },
      getEffectDescriptor(cellId) { return cells.get(cellId)?.descriptor ?? null; },
      snapshot() { return { cells: [...cells.keys()].sort() }; },
      reset() { cells.clear(); terrain.resetCells?.(); }
    });
  }

  function createUniformGridPartition(options = {}) {
    const id = options.id ?? "uniform-grid";
    const cellSize = Number(options.cellSize ?? 256);
    const radius = Number(options.radius ?? 2);
    return Object.freeze({
      id,
      kind: "uniform-grid",
      locateCell(position = {}) {
        return [Math.floor(Number(position.x ?? 0) / cellSize), Math.floor(Number(position.z ?? 0) / cellSize)];
      },
      selectCells({ worldId, worldSeed, focus = {} }) {
        const [cx, cz] = this.locateCell(focus.position ?? focus);
        const cells = [];
        for (let dz = -radius; dz <= radius; dz += 1) {
          for (let dx = -radius; dx <= radius; dx += 1) {
            const x = cx + dx;
            const z = cz + dz;
            cells.push(Object.freeze({
              id: stableCellId(worldId, id, x, z),
              seed: `${worldSeed}:${id}:${x}:${z}`,
              worldId,
              partitionId: id,
              coordinates: Object.freeze([x, z]),
              bounds: Object.freeze({ minX: x * cellSize, minZ: z * cellSize, maxX: (x + 1) * cellSize, maxZ: (z + 1) * cellSize }),
              lod: Math.max(Math.abs(dx), Math.abs(dz)),
              level: 0,
              priority: radius - Math.max(Math.abs(dx), Math.abs(dz))
            }));
          }
        }
        return cells;
      },
      snapshot: () => ({ id, kind: "uniform-grid", cellSize, radius })
    });
  }

  function createFlatWorldSurface(options = {}) {
    return Object.freeze({ id: options.id ?? "flat", kind: "flat", toWorld: (p, elevation = 0) => ({ x: p.u, y: elevation, z: p.v }) });
  }

  function createEngine() {
    const worlds = new Map();
    const api = {
      registerWorld(definition) {
        worlds.set(definition.id, { definition, focus: { position: { x: 0, y: 0, z: 0 } }, active: new Map(), diagnostics: [] });
      },
      setFocus(worldId, focus) { worlds.get(worldId).focus = focus; },
      updateWorld(worldId) {
        const record = worlds.get(worldId);
        const { definition } = record;
        const nextCells = definition.partition.selectCells({
          worldId,
          worldSeed: definition.seed,
          focus: record.focus,
          previousCells: [...record.active.values()].map((entry) => entry.cell)
        });
        const nextIds = new Set(nextCells.map((cell) => cell.id));
        for (const [cellId, active] of record.active) {
          if (!nextIds.has(cellId)) {
            [...definition.providers].reverse().forEach((provider) => {
              trace.push(`${provider.phase}:${provider.id}:release:${cellId}`);
              provider.releaseCell({ world: definition, cell: active.cell, surface: definition.surface, effect: null });
            });
            record.active.delete(cellId);
          }
        }
        for (const cell of nextCells) {
          const previous = record.active.get(cell.id);
          const effects = [];
          for (const provider of definition.providers) {
            const action = previous ? "update" : "prepare";
            trace.push(`${provider.phase}:${provider.id}:${action}:${cell.id}`);
            const result = previous
              ? provider.updateCell({ world: definition, cell, previousCell: previous.cell, surface: definition.surface, changes: {}, effect: null })
              : provider.prepareCell({ world: definition, cell, surface: definition.surface });
            effects.push(result);
          }
          record.active.set(cell.id, { cell, state: "active", effects });
        }
        return Object.freeze({
          id: worldId,
          activeCells: Object.freeze([...record.active.values()].sort((a, b) => a.cell.id.localeCompare(b.cell.id)))
        });
      },
      getDiagnostics(worldId) { return worlds.get(worldId)?.diagnostics ?? []; },
      snapshotWorld(worldId) {
        const record = worlds.get(worldId);
        return {
          id: worldId,
          activeCells: [...record.active.values()].map((entry) => ({ cell: entry.cell, state: entry.state, effects: entry.effects })),
          providerSnapshots: Object.fromEntries(record.definition.providers.map((provider) => [provider.id, provider.snapshot()]))
        };
      },
      getState() {
        return { worlds: Object.fromEntries([...worlds].map(([id, record]) => [id, { focus: record.focus, activeCellIds: [...record.active.keys()].sort() }])) };
      },
      resetWorlds() {
        for (const record of worlds.values()) {
          for (const active of record.active.values()) {
            [...record.definition.providers].reverse().forEach((provider) => provider.releaseCell({ world: record.definition, cell: active.cell, surface: record.definition.surface }));
          }
          record.active.clear();
          record.definition.providers.forEach((provider) => provider.reset());
        }
      },
      reset() { this.resetWorlds(); worlds.clear(); }
    };
    return { n: { coreWorld: api } };
  }

  return Object.freeze({
    createEngine,
    createCoreWorldDomain: () => Object.freeze({ id: "core-world-domain" }),
    createUniformGridPartition,
    createFlatWorldSurface,
    createTerrainProviderAdapter,
    defineWorldEffectProvider,
    trace
  });
}
