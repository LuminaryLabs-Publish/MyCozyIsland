export const COZY_ADVENTURE_VERSION = "1.0.0";
export const COZY_WORLD_SEED = "cozy-island-adventure-v1";

export const COZY_WORLD_CONFIG = Object.freeze({
  id: "world:cozy-island-adventure-v1",
  seed: COZY_WORLD_SEED,
  radius: 152,
  maxHeight: 30,
  beachWidth: 15,
  clearingRadius: 27,
  submergedShelfWidth: 7,
  submergedShelfDepth: -5.5,
  minimumCoastDepth: -8,
  walkableSlope: 0.54,
  minimumWalkableShoreDistance: 1.4,
  farm: Object.freeze({
    rows: 3,
    columns: 4,
    spacingX: 4.2,
    spacingZ: 4.4,
    plotWidth: 3.3,
    plotDepth: 3.5,
    origin: Object.freeze({ x: -6.3, z: 1.2 })
  })
});

export const CROP_DEFINITIONS = Object.freeze({
  taro: Object.freeze({
    id: "taro",
    label: "Taro",
    seedItemId: "taro-seed",
    harvestItemId: "taro-root",
    growthSeconds: 42,
    stageCount: 4,
    yieldMin: 2,
    yieldMax: 4,
    color: "#78a85b",
    fruitColor: "#9c79a8",
    description: "A dependable island staple with broad, friendly leaves."
  }),
  "sweet-potato": Object.freeze({
    id: "sweet-potato",
    label: "Sweet Potato",
    seedItemId: "sweet-potato-slip",
    harvestItemId: "sweet-potato",
    growthSeconds: 56,
    stageCount: 4,
    yieldMin: 2,
    yieldMax: 5,
    color: "#76a958",
    fruitColor: "#cb765c",
    description: "Warm, quick-growing vines for a golden-hour garden."
  }),
  pineapple: Object.freeze({
    id: "pineapple",
    label: "Pineapple",
    seedItemId: "pineapple-crown",
    harvestItemId: "pineapple",
    growthSeconds: 74,
    stageCount: 5,
    yieldMin: 1,
    yieldMax: 2,
    color: "#6ca34d",
    fruitColor: "#efbf45",
    description: "A bright tropical crop that rewards patient tending."
  }),
  coconut: Object.freeze({
    id: "coconut",
    label: "Coconut Palm",
    seedItemId: "coconut-sprout",
    harvestItemId: "coconut",
    growthSeconds: 96,
    stageCount: 5,
    yieldMin: 2,
    yieldMax: 4,
    color: "#5b9d52",
    fruitColor: "#8d6845",
    description: "A young palm grown from a sprout for future island food."
  })
});

export const ITEM_DEFINITIONS = Object.freeze({
  "taro-seed": Object.freeze({ id: "taro-seed", label: "Taro Seeds", category: "seed" }),
  "sweet-potato-slip": Object.freeze({ id: "sweet-potato-slip", label: "Sweet Potato Slips", category: "seed" }),
  "pineapple-crown": Object.freeze({ id: "pineapple-crown", label: "Pineapple Crowns", category: "seed" }),
  "coconut-sprout": Object.freeze({ id: "coconut-sprout", label: "Coconut Sprouts", category: "seed" }),
  "taro-root": Object.freeze({ id: "taro-root", label: "Taro Root", category: "food" }),
  "sweet-potato": Object.freeze({ id: "sweet-potato", label: "Sweet Potato", category: "food" }),
  pineapple: Object.freeze({ id: "pineapple", label: "Pineapple", category: "food" }),
  coconut: Object.freeze({ id: "coconut", label: "Coconut", category: "food" }),
  hoe: Object.freeze({ id: "hoe", label: "Island Hoe", category: "tool" }),
  "watering-can": Object.freeze({ id: "watering-can", label: "Watering Can", category: "tool" })
});

export const INITIAL_INVENTORY = Object.freeze({
  "taro-seed": 6,
  "sweet-potato-slip": 5,
  "pineapple-crown": 4,
  "coconut-sprout": 3,
  "taro-root": 0,
  "sweet-potato": 0,
  pineapple: 0,
  coconut: 0,
  hoe: 1,
  "watering-can": 1
});

export const SEED_CYCLE = Object.freeze([
  "taro-seed",
  "sweet-potato-slip",
  "pineapple-crown",
  "coconut-sprout"
]);

export const clone = (value) => value === undefined ? undefined : structuredClone(value);
export const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
export const clamp01 = (value) => clamp(value, 0, 1);
export const lerp = (a, b, t) => a + (b - a) * t;

export function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
}

export function hashText(value) {
  let hash = 2166136261;
  for (const character of String(value)) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function operationId(prefix, sequence, ...parts) {
  return [prefix, sequence, ...parts].map((value) => String(value)).join(":");
}

export function cropFromSeedItem(itemId) {
  return Object.values(CROP_DEFINITIONS).find((crop) => crop.seedItemId === itemId) ?? null;
}
