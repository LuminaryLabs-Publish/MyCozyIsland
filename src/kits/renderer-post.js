import * as THREE from "three/webgpu";
import { pass, screenUV, step, uniform, vec4 } from "three/tsl";
import { gaussianBlur } from "three/addons/tsl/display/GaussianBlurNode.js";
import { COZY_RENDER_LAYERS } from "./render-layers.js";

function layersFor(...values) {
  const layers = new THREE.Layers();
  layers.disableAll();
  for (const value of values) layers.enable(value);
  return layers;
}

function copyTransform(source, target) {
  target.position.copy(source.position);
  target.quaternion.copy(source.quaternion);
  target.scale.copy(source.scale);
  target.visible = source.visible;
  target.renderOrder = source.renderOrder;
  target.updateMatrix();
}

function createFoamDepthScene(foamRenderer) {
  const scene = new THREE.Scene();
  scene.name = "Foam Occlusion Depth Scene";
  scene.background = null;

  const root = new THREE.Group();
  root.name = "foam-occlusion-depth-root";
  const depthMaterial = new THREE.MeshDepthMaterial({
    depthPacking: THREE.BasicDepthPacking,
    side: THREE.DoubleSide
  });
  depthMaterial.name = "foam-occlusion-depth-material";
  depthMaterial.depthTest = true;
  depthMaterial.depthWrite = true;
  depthMaterial.colorWrite = false;

  const pairs = (foamRenderer.meshes ?? []).map(source => {
    const target = new THREE.Mesh(source.geometry, depthMaterial);
    target.name = `${source.name}:depth`;
    target.frustumCulled = source.frustumCulled;
    target.layers.disableAll();
    target.layers.enable(COZY_RENDER_LAYERS.FOAM_OVERLAY);
    root.add(target);
    return Object.freeze({ source, target });
  });
  scene.add(root);

  function sync() {
    copyTransform(foamRenderer.group, root);
    for (const pair of pairs) copyTransform(pair.source, pair.target);
  }

  sync();
  return Object.freeze({ scene, root, pairs: Object.freeze(pairs), depthMaterial, sync });
}

export function createWebGPUPostPipeline({
  renderer,
  scene,
  camera,
  fogRenderer,
  foamRenderer,
  layerGraph,
  quality
} = {}) {
  if (!foamRenderer?.group) throw new TypeError("createWebGPUPostPipeline requires a foam renderer for the final scene-content pass.");
  const validation = layerGraph?.validation ?? { valid: true, issues: [] };
  if (!validation.valid) throw new TypeError(`Invalid render-layer graph: ${validation.issues.join(", ")}`);

  const pipeline = new THREE.RenderPipeline(renderer);
  const scenePass = pass(scene, camera);
  scenePass.name = "Background + Opaque World + Anime Water";
  scenePass.setLayers(layersFor(
    COZY_RENDER_LAYERS.OPAQUE_WORLD,
    COZY_RENDER_LAYERS.WATER_SURFACE,
    COZY_RENDER_LAYERS.CLOUD_VOLUME
  ));
  const sceneDepth = scenePass.getTextureNode("depth");
  const opaqueSceneDepth = sceneDepth.sample(screenUV);
  fogRenderer.material.depthNode = opaqueSceneDepth;

  const volumetricPass = pass(scene, camera, { depthBuffer: false });
  volumetricPass.name = "Atmosphere Composite";
  volumetricPass.setLayers(layersFor(COZY_RENDER_LAYERS.FOG_VOLUME));
  volumetricPass.setResolutionScale(quality.fogResolutionScale);
  const denoiseStrength = uniform(quality.postBlur);
  const blurredFog = gaussianBlur(volumetricPass, denoiseStrength);
  const fogIntensity = uniform(1);
  const atmosphereCompositedColor = scenePass.add(blurredFog.mul(fogIntensity));

  const foamScene = new THREE.Scene();
  foamScene.name = "Final Foam Overlay Scene";
  foamScene.background = null;
  foamScene.fog = scene.fog;
  foamScene.add(foamRenderer.group);
  const foamPass = pass(foamScene, camera, { depthBuffer: false });
  foamPass.name = "Final Scene-Content Foam Overlay";
  foamPass.setLayers(layersFor(COZY_RENDER_LAYERS.FOAM_OVERLAY));

  const foamDepthState = createFoamDepthScene(foamRenderer);
  const foamDepthPass = pass(foamDepthState.scene, camera, { depthBuffer: true });
  foamDepthPass.name = "Foam Occlusion Depth";
  foamDepthPass.setLayers(layersFor(COZY_RENDER_LAYERS.FOAM_OVERLAY));
  const foamDepth = foamDepthPass.getTextureNode("depth").sample(screenUV);
  const depthBias = uniform(0.00075);
  const foamVisible = step(foamDepth, opaqueSceneDepth.add(depthBias));
  const visibleFoamAlpha = foamPass.a.mul(foamVisible);
  const visibleFoamRgb = foamPass.rgb.mul(foamVisible);
  const finalRgb = atmosphereCompositedColor.rgb
    .mul(visibleFoamAlpha.oneMinus())
    .add(visibleFoamRgb);
  pipeline.outputNode = vec4(finalRgb, 1);

  return Object.freeze({
    pipeline,
    foamScene,
    foamDepthScene: foamDepthState.scene,
    foamDepthMaterial: foamDepthState.depthMaterial,
    layerGraph,
    render() {
      foamDepthState.sync();
      pipeline.render();
    },
    setFogResolutionScale(value) {
      volumetricPass.setResolutionScale(Math.max(0.12, Math.min(0.65, Number(value) || quality.fogResolutionScale)));
    },
    getPassOrder() {
      return Object.freeze([
        "background",
        "opaque-world",
        "water-composite",
        "atmosphere-composite",
        "foam-overlay",
        "output-transform"
      ]);
    },
    getPhysicalPassOrder() {
      return Object.freeze([
        "base-scene-fused:background+opaque-world+water-composite",
        "atmosphere-composite",
        "foam-occlusion-depth",
        "foam-overlay",
        "output-transform"
      ]);
    }
  });
}
