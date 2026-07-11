export function createProviderRuntimeStore(providerId) {
  const cells = new Map();
  let version = 0;

  function set(cellId, value) {
    version += 1;
    const record = { ...value, cellId: String(cellId), storeVersion: version };
    cells.set(String(cellId), record);
    return record;
  }

  function get(cellId) {
    return cells.get(String(cellId)) ?? null;
  }

  function remove(cellId) {
    return cells.delete(String(cellId));
  }

  function clear() {
    cells.clear();
    version += 1;
  }

  function list() {
    return [...cells.values()].sort((a, b) => a.cellId.localeCompare(b.cellId));
  }

  function snapshot() {
    return {
      providerId,
      version,
      cells: list().map((record) => ({
        cellId: record.cellId,
        handleId: record.handleId ?? null,
        descriptor: record.descriptor ?? null
      }))
    };
  }

  return Object.freeze({ providerId, set, get, remove, clear, list, snapshot, get size() { return cells.size; } });
}
