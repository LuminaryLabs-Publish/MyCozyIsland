export function pointInBounds(point = {}, bounds = {}) {
  const x = Number(point.x ?? 0);
  const z = Number(point.z ?? 0);
  return x >= Number(bounds.minX) && x < Number(bounds.maxX)
    && z >= Number(bounds.minZ) && z < Number(bounds.maxZ);
}

export function cellCoordinatesForPosition(position = {}, cellSize = 48) {
  return [
    Math.floor(Number(position.x ?? 0) / cellSize),
    Math.floor(Number(position.z ?? 0) / cellSize)
  ];
}

export function cellKeyFromCoordinates(coordinates = []) {
  return `${Number(coordinates[0] ?? 0)},${Number(coordinates[1] ?? 0)}`;
}

export function indexWorldItems(items = []) {
  return items.map((value, index) => Object.freeze({ index, value }));
}

export function filterIndexedItemsForBounds(indexedItems = [], bounds = {}) {
  return indexedItems.filter((entry) => pointInBounds(entry.value.position, bounds));
}

export function flattenIndexedCellItems(records = []) {
  return records
    .flatMap((record) => record?.items ?? [])
    .sort((a, b) => a.index - b.index)
    .map((entry) => entry.value);
}

export function groupByType(items = []) {
  return Object.freeze(items.reduce((output, item) => {
    (output[item.type] ??= []).push(item);
    return output;
  }, {}));
}

export function activeCellIdsFromSnapshot(snapshot = {}) {
  return (snapshot.activeCells ?? [])
    .map((entry) => String(entry?.cell?.id ?? entry?.id ?? ""))
    .filter(Boolean);
}
