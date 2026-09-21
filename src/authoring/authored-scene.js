import * as THREE from "three/webgpu";
import { COZY_RENDER_LAYERS, assignRenderLayer } from "../kits/render-layers.js";

const DEFAULT_URL = "./data/authoring-scene.json";

function primitiveGeometry(THREERef, primitive, parameters) {
  if (primitive === "box") return new THREERef.BoxGeometry(parameters.size, parameters.size, parameters.size);
  if (primitive === "cylinder") return new THREERef.CylinderGeometry(parameters.topRadius, parameters.radius, parameters.height, parameters.segments, 1);
  if (primitive === "cone") return new THREERef.ConeGeometry(parameters.radius, parameters.height, parameters.segments, 1);
  if (primitive === "torus") return new THREERef.TorusGeometry(parameters.radius, parameters.minorRadius, parameters.rings, parameters.segments);
  return new THREERef.SphereGeometry(parameters.radius, parameters.segments, parameters.rings);
}

function materialFor(category, style) {
  const transparent = Number(style.opacity ?? 1) < 0.99;
  const material = category === "atmosphere" || category === "particles"
    ? new THREE.MeshBasicNodeMaterial({ color: style.color, transparent, opacity: style.opacity ?? 1, depthWrite: false })
    : new THREE.MeshToonNodeMaterial({ color: style.color, transparent, opacity: style.opacity ?? 1 });
  material.depthTest = true;
  material.depthWrite = !transparent;
  material.toneMapped = category !== "particles";
  return material;
}

export async function loadAuthoredScene(url = DEFAULT_URL) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Authoring scene manifest failed: ${response.status} ${response.statusText}`);
  const manifest = await response.json();
  if (manifest.schema !== "my-cozy-island.authoring-scene/1") throw new Error("Unsupported Authoring scene manifest.");
  if (manifest.passCount !== 59 || manifest.editsPerPass !== 50 || manifest.objectCount !== 2950) throw new Error("Authoring scene manifest does not satisfy the 59-pass contract.");
  return manifest;
}

export function createAuthoredSceneRenderer(manifest) {
  const root = new THREE.Group();
  root.name = "nexus-authoring-59-pass-scene";
  root.renderOrder = 24;
  assignRenderLayer(root, COZY_RENDER_LAYERS.OPAQUE_WORLD, true);
  const buckets = new Map();
  for (const object of manifest.objects) {
    const archetype = manifest.archetypes[object.archetype];
    const key = `${archetype.category}:${archetype.primitive}:${archetype.style.color}:${archetype.style.opacity ?? 1}`;
    let bucket = buckets.get(key);
    if (!bucket) {
      const geometry = primitiveGeometry(THREE, archetype.primitive, archetype.parameters);
      const material = materialFor(archetype.category, archetype.style);
      bucket = { category: archetype.category, primitive: archetype.primitive, geometry, material, style: archetype.style, objects: [] };
      buckets.set(key, bucket);
    }
    bucket.objects.push(object);
  }
  const entries = [];
  const dummy = new THREE.Object3D();
  for (const bucket of buckets.values()) {
    const replacement = new THREE.InstancedMesh(bucket.geometry, bucket.material, bucket.objects.length);
    replacement.name = `authored-${bucket.category}-${bucket.primitive}`;
    replacement.castShadow = bucket.category !== "atmosphere" && bucket.category !== "particles";
    replacement.receiveShadow = replacement.castShadow;
    replacement.renderOrder = 24;
    bucket.objects.forEach((object, index) => {
      const transform = object.transform;
      dummy.position.set(transform[0], transform[1], transform[2]);
      dummy.rotation.set(transform[3], transform[4], transform[5]);
      dummy.scale.set(transform[6], transform[7], transform[8]);
      dummy.updateMatrix();
      replacement.setMatrixAt(index, dummy.matrix);
      replacement.setColorAt(index, new THREE.Color(bucket.style.color));
    });
    replacement.instanceMatrix.needsUpdate = true;
    if (replacement.instanceColor) replacement.instanceColor.needsUpdate = true;
    root.add(replacement);
    entries.push({ mesh: replacement, category: bucket.category, phase: entries.length * 0.73 });
  }
  const authoringEvidence = Object.freeze({
    projectId: manifest.projectId,
    engineCommit: manifest.engineCommit,
    passCount: manifest.passCount,
    editsPerPass: manifest.editsPerPass,
    objectCount: manifest.objectCount,
    authoringDomainPaths: manifest.authoringDomainPaths
  });
  function update(elapsedSeconds = 0) {
    for (const entry of entries) {
      if (entry.category === "particles") entry.mesh.position.y = Math.sin(elapsedSeconds * 0.9 + entry.phase) * 0.22;
      if (entry.category === "water") entry.mesh.rotation.y = Math.sin(elapsedSeconds * 0.25 + entry.phase) * 0.025;
      if (entry.category === "foam") entry.mesh.position.y = Math.sin(elapsedSeconds * 1.4 + entry.phase) * 0.035;
    }
  }
  function dispose() {
    for (const child of root.children) {
      child.geometry?.dispose?.();
      child.material?.dispose?.();
    }
  }
  return Object.freeze({ group: root, evidence: authoringEvidence, update, dispose });
}
