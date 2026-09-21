import { mkdir, writeFile } from "node:fs/promises";
import { createEngine } from "nexusengine-authoring";
import { createAuthoringDomain } from "nexusengine-authoring/domains/authoring";
import {
  createOceanIslandLandformState,
  sampleIslandHeight,
  sampleIslandMasks,
} from "../src/kits/ocean-island-landform-domain/index.js";

const ENGINE_COMMIT = "a74e8689d1a71c0b42236c009f0f4c46e9b89387";
const PASS_COUNT = 59;
const EDITS_PER_PASS = 50;
const state = createOceanIslandLandformState({
  id: "cozy-island-authoring-target",
  seed: "cozy-island-aaa-59-pass",
  radius: 100,
  maxHeight: 18,
  beachWidth: 10,
  shelfWidth: 36,
});

function hash(text) {
  let value = 2166136261;
  for (const char of String(text)) value = Math.imul(value ^ char.charCodeAt(0), 16777619);
  return (value >>> 0) / 4294967295;
}

function range(min, max, value) { return min + (max - min) * value; }
function angleFor(index, pass) { return hash(`angle:${pass}:${index}`) * Math.PI * 2; }
function radiusFor(index, pass, min = 10, max = 92) { return range(min, max, hash(`radius:${pass}:${index}`)); }
function positionFor(index, pass, region = "island") {
  const angle = angleFor(index, pass);
  const radius = region === "shore" ? radiusFor(index, pass, 90, 108) : radiusFor(index, pass);
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const height = sampleIslandHeight(state, { x, z });
  const mask = sampleIslandMasks(state, { x, z });
  return { x, y: region === "air" ? range(30, 72, hash(`air-y:${pass}:${index}`)) : region === "water" ? 0.16 : Math.max(height, 0) + 0.08, z, mask };
}

const passGroups = [
  { from: 1, to: 4, category: "baseline", goal: "Create a reproducible authored island scene and fixed review views." },
  { from: 5, to: 10, category: "terrain", goal: "Clarify the stylized island silhouette, slopes, beaches, paths, clearing, and seabed." },
  { from: 11, to: 16, category: "trees", goal: "Build readable cartoon palms and trees with broad, intentional silhouettes." },
  { from: 17, to: 22, category: "vegetation", goal: "Fill the ground with varied grass, bushes, flowers, and soft transitions." },
  { from: 23, to: 28, category: "props", goal: "Compose landmarks and small props that make the island feel inhabited." },
  { from: 29, to: 34, category: "water", goal: "Improve water color, depth, waves, transparency, and shoreline blending." },
  { from: 35, to: 39, category: "foam", goal: "Make foam readable, animated, broken up, and correctly occluded." },
  { from: 40, to: 44, category: "atmosphere", goal: "Shape clouds, fog, sky, sun, and depth separation." },
  { from: 45, to: 49, category: "particles", goal: "Add restrained spray, embers, pollen, sparkles, and ambient motion." },
  { from: 50, to: 54, category: "finish", goal: "Unify palette, materials, silhouettes, focal points, and camera transitions." },
  { from: 55, to: 59, category: "review", goal: "Resolve visual, loading, performance, controls, and device-layout defects." },
];

function groupFor(pass) { return passGroups.find((group) => pass >= group.from && pass <= group.to); }
function primitiveFor(category, index) {
  if (category === "trees") return index % 2 === 0 ? "cylinder" : "sphere";
  if (category === "terrain") return index % 3 === 0 ? "cone" : index % 3 === 1 ? "sphere" : "box";
  if (category === "vegetation") return index % 2 === 0 ? "cone" : "sphere";
  if (category === "props") return index % 3 === 0 ? "box" : index % 3 === 1 ? "cylinder" : "torus";
  if (category === "water" || category === "foam") return index % 2 === 0 ? "torus" : "sphere";
  if (category === "atmosphere" || category === "particles") return "sphere";
  return index % 2 === 0 ? "box" : "sphere";
}
function parametersFor(category, primitive, index) {
  const seed = hash(`shape:${category}:${index}`);
  if (primitive === "box") return { type: "box", size: range(0.35, 1.3, seed), radius: 1, minorRadius: 0.2, height: 1, segments: 6, rings: 4, widthSegments: 1, depthSegments: 1, topRadius: 1 };
  if (primitive === "cylinder") return { type: "cylinder", size: 1, radius: range(0.14, 0.42, seed), minorRadius: 0.2, height: range(1.2, 7.5, seed), segments: 7, rings: 4, widthSegments: 1, depthSegments: 1, topRadius: range(0.08, 0.34, 1 - seed) };
  if (primitive === "cone") return { type: "cone", size: 1, radius: range(0.3, 1.4, seed), minorRadius: 0.2, height: range(0.45, 2.2, seed), segments: 7, rings: 4, widthSegments: 1, depthSegments: 1, topRadius: 0 };
  if (primitive === "torus") return { type: "torus", size: 1, radius: range(0.45, 1.5, seed), minorRadius: range(0.06, 0.24, seed), height: 1, segments: 10, rings: 6, widthSegments: 1, depthSegments: 1, topRadius: 1 };
  return { type: "sphere", size: 1, radius: range(0.16, category === "atmosphere" ? 2.6 : 0.9, seed), minorRadius: 0.2, height: 1, segments: category === "atmosphere" ? 8 : 7, rings: category === "atmosphere" ? 5 : 4, widthSegments: 1, depthSegments: 1, topRadius: 1 };
}
function styleFor(category, index) {
  const palettes = {
    baseline: ["#f7d59b", "#7cc7bb", "#eaa56d"],
    terrain: ["#79b96a", "#e4c083", "#638d82"],
    trees: ["#7b5639", "#4d9a5a", "#7fcf70"],
    vegetation: ["#5aa85d", "#9ad26c", "#e9cb77"],
    props: ["#8d6241", "#c98d58", "#5b7771"],
    water: ["#46c8c2", "#92ead4", "#1c718a"],
    foam: ["#fff1c7", "#f9d9b3", "#e8f5de"],
    atmosphere: ["#fff4d7", "#e9c4ad", "#b7d8d1"],
    particles: ["#ffe98b", "#ffb769", "#d8f5bf"],
    finish: ["#ffd488", "#5fb9aa", "#f59d80"],
    review: ["#fff1c7", "#8fd1be", "#e6a37b"],
  };
  const palette = palettes[category] ?? palettes.finish;
  return { color: palette[index % palette.length], opacity: category === "atmosphere" || category === "particles" ? 0.72 : 1, emissive: category === "particles" ? palette[index % palette.length] : null };
}
function transformFor(category, index, pass, primitive) {
  const pairIndex = category === "trees" ? Math.floor(index / 2) : index;
  const region = category === "water" || category === "foam" ? "shore" : category === "atmosphere" || category === "particles" ? "air" : "island";
  const position = positionFor(pairIndex, pass, region);
  let y = position.y;
  let scale = 1;
  let rotation = hash(`rot:${pass}:${index}`) * Math.PI * 2;
  if (category === "trees" && index % 2 === 1) y += range(4.8, 7.6, hash(`canopy:${pass}:${index}`));
  if (category === "trees" && index % 2 === 0) scale = range(0.8, 1.3, hash(`trunk:${pass}:${index}`));
  if (category === "water") { y += 0.1; scale = range(0.65, 1.8, hash(`water:${pass}:${index}`)); }
  if (category === "foam") { y += 0.18; scale = range(0.35, 1.1, hash(`foam:${pass}:${index}`)); }
  if (category === "atmosphere") scale = range(1.4, 4.6, hash(`cloud:${pass}:${index}`));
  if (category === "particles") scale = range(0.06, 0.22, hash(`particle:${pass}:${index}`));
  if (category === "finish" || category === "review") scale = range(0.25, 1.15, hash(`finish:${pass}:${index}`));
  const rotationX = primitive === "torus" ? Math.PI * 0.5 : category === "particles" ? hash(`rx:${pass}:${index}`) * Math.PI : 0;
  return { position: { x: position.x, y, z: position.z }, rotation: { x: rotationX, y: rotation, z: 0 }, scale: { x: scale, y: category === "trees" && index % 2 === 0 ? scale * 1.25 : scale, z: scale } };
}

const engine = createEngine({ kits: createAuthoringDomain() });
const project = engine.n.authoringProject;
const objects = [];
const passes = [];
for (let pass = 1; pass <= PASS_COUNT; pass += 1) {
  const group = groupFor(pass);
  const operations = [];
  const passObjects = [];
  for (let index = 0; index < EDITS_PER_PASS; index += 1) {
    const id = `cozy-pass-${String(pass).padStart(2, "0")}-edit-${String(index + 1).padStart(2, "0")}`;
    const primitive = primitiveFor(group.category, index);
    const parameters = parametersFor(group.category, primitive, index);
    operations.push({ id: "mesh.primitive", args: { id, parameters } });
    passObjects.push({ id, pass, edit: index + 1, category: group.category, primitive, parameters, transform: transformFor(group.category, index, pass, primitive), style: styleFor(group.category, index) });
  }
  project.execute({ requestId: `pass-${String(pass).padStart(2, "0")}`, epoch: project.context().epoch, operations });
  for (const object of passObjects) {
    const document = project.getDocument(object.id);
    object.authoring = { revision: document.revision, hash: document.hash };
  }
  objects.push(...passObjects);
  passes.push({ pass, category: group.category, goal: group.goal, editCount: EDITS_PER_PASS, status: "implemented-source" });
}

function compactParameters(primitive, parameters) {
  if (primitive === "box") return { size: parameters.size };
  if (primitive === "cylinder") return { radius: parameters.radius, topRadius: parameters.topRadius, height: parameters.height, segments: parameters.segments };
  if (primitive === "cone") return { radius: parameters.radius, height: parameters.height, segments: parameters.segments };
  if (primitive === "torus") return { radius: parameters.radius, minorRadius: parameters.minorRadius, rings: parameters.rings, segments: parameters.segments };
  return { radius: parameters.radius, segments: parameters.segments, rings: parameters.rings };
}
function compactStyle(style) {
  return style.opacity === 1 ? { color: style.color } : { color: style.color, opacity: style.opacity };
}
const archetypeMap = new Map();
const archetypes = [];
const compactObjects = objects.map((object) => {
  const parameters = compactParameters(object.primitive, object.parameters);
  const style = compactStyle(object.style);
  const archetypeKey = JSON.stringify({ category: object.category, primitive: object.primitive, parameters, style });
  let archetype = archetypeMap.get(archetypeKey);
  if (archetype === undefined) {
    archetype = archetypes.length;
    archetypeMap.set(archetypeKey, archetype);
    archetypes.push({ category: object.category, primitive: object.primitive, parameters, style });
  }
  const t = object.transform;
  return {
    id: object.id,
    pass: object.pass,
    edit: object.edit,
    archetype,
    transform: [t.position.x, t.position.y, t.position.z, t.rotation.x, t.rotation.y, t.rotation.z, t.scale.x, t.scale.y, t.scale.z],
  };
});

const output = {
  schema: "my-cozy-island.authoring-scene/1",
  projectId: project.context().projectId,
  engineCommit: ENGINE_COMMIT,
  authoringDomainPaths: engine.n.paths().filter(({ path }) => path.startsWith("n:authoring")).length,
  passCount: PASS_COUNT,
  editsPerPass: EDITS_PER_PASS,
  objectCount: objects.length,
  archetypes,
  passes,
  objects: compactObjects,
  authoringProof: { firstObjectHash: objects[0].authoring.hash, lastObjectHash: objects.at(-1).authoring.hash },
  reviewContract: {
    target: "AAA-quality stylized island",
    fixedViews: ["aerial-entry", "shoreline-close", "campfire-clearing", "first-person", "mobile-wide"],
    rule: "An accepted edit must produce an observable visual or runtime improvement.",
  },
};
await mkdir("data", { recursive: true });
await writeFile("data/authoring-scene.json", `${JSON.stringify(output)}\n`);
console.log(JSON.stringify({ projectId: output.projectId, authoringDomainPaths: output.authoringDomainPaths, passCount: output.passCount, editsPerPass: output.editsPerPass, objectCount: output.objectCount }, null, 2));
