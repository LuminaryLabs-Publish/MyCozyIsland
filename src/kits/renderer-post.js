import * as THREE from "three/webgpu";
import { pass, screenUV, uniform, vec4 } from "three/tsl";
import { gaussianBlur } from "three/addons/tsl/display/GaussianBlurNode.js";
import { COZY_RENDER_LAYERS } from "./render-layers.js";

function layersFor(...values) {
  const layers = new THREE.Layers();
  layers.disableAll();
  for (const value of values) layers.enable(value);
  return layers;
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
  fogRenderer.material.depthNode = sceneDepth.sample(screenUV);

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

  const finalRgb = atmosphereCompositedColor.rgb.mul(foamPass.a.oneMinus()).add(foamPass.rgb);
  pipeline.outputNode = vec4(finalRgb, 1);

  return Object.freeze({
    pipeline,
    foamScene,
    layerGraph,
    render() { pipeline.render(); },
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
        "foam-overlay",
        "output-transform"
      ]);
    }
  });
}
