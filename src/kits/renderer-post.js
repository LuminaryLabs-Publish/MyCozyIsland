import * as THREE from "three/webgpu";
import { pass, screenUV, uniform } from "three/tsl";
import { gaussianBlur } from "three/addons/tsl/display/GaussianBlurNode.js";

export function createWebGPUPostPipeline({ renderer, scene, camera, fogRenderer, quality } = {}) {
  const pipeline = new THREE.RenderPipeline(renderer);
  const scenePass = pass(scene, camera);
  const sceneDepth = scenePass.getTextureNode("depth");
  fogRenderer.material.depthNode = sceneDepth.sample(screenUV);

  const volumetricLayer = new THREE.Layers();
  volumetricLayer.disableAll();
  volumetricLayer.enable(fogRenderer.layer);
  const volumetricPass = pass(scene, camera, { depthBuffer: false });
  volumetricPass.name = "Rolling Volumetric Fog";
  volumetricPass.setLayers(volumetricLayer);
  volumetricPass.setResolutionScale(quality.fogResolutionScale);
  const denoiseStrength = uniform(quality.postBlur);
  const blurredFog = gaussianBlur(volumetricPass, denoiseStrength);
  const intensity = uniform(1);
  pipeline.outputNode = scenePass.add(blurredFog.mul(intensity));

  return Object.freeze({
    pipeline,
    render() { pipeline.render(); },
    setFogResolutionScale(value) {
      volumetricPass.setResolutionScale(Math.max(0.12, Math.min(0.65, Number(value) || quality.fogResolutionScale)));
    }
  });
}
