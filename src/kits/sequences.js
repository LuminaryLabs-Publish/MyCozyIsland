import { clamp, clamp01, lerp, smoothstep } from "./determinism.js";

const vec = (x = 0, y = 0, z = 0) => ({ x, y, z });
const lerpVec = (a, b, t) => vec(lerp(a.x, b.x, t), lerp(a.y, b.y, t), lerp(a.z, b.z, t));

function sampleRail(points, progress) {
  const clamped = clamp01(progress);
  const scaled = clamped * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(scaled));
  const local = smoothstep(0, 1, scaled - index);
  return lerpVec(points[index], points[index + 1], local);
}

export function createCameraRailSequence(terrain) {
  let progress = 0.14;
  let yaw = 0;
  let pitch = -0.05;
  const pressed = new Set();
  const player = {
    position: vec(0, terrain.sampleHeight({ x: 0, z: 8 }), 8),
    eyeHeight: 1.72
  };

  const railPositions = [
    vec(0, 215, 430),
    vec(-22, 178, 335),
    vec(-38, 122, 238),
    vec(-24, 74, 142),
    vec(-10, 39, 72),
    vec(0, 17, 30),
    vec(0, player.position.y + player.eyeHeight, 8)
  ];
  const railLooks = [
    vec(0, 18, -34),
    vec(0, 16, -28),
    vec(0, 14, -18),
    vec(0, 11, -8),
    vec(0, 9, 0),
    vec(0, 8, 0),
    vec(0, player.position.y + 1.6, -4)
  ];

  function forward() {
    return vec(-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
  }

  function tick(deltaSeconds = 0) {
    if (progress < 0.985) return;
    const dt = Math.max(0, Number(deltaSeconds) || 0);
    const f = vec(-Math.sin(yaw), 0, -Math.cos(yaw));
    const r = vec(Math.cos(yaw), 0, -Math.sin(yaw));
    let mx = 0;
    let mz = 0;
    if (pressed.has("KeyW")) { mx += f.x; mz += f.z; }
    if (pressed.has("KeyS")) { mx -= f.x; mz -= f.z; }
    if (pressed.has("KeyD")) { mx += r.x; mz += r.z; }
    if (pressed.has("KeyA")) { mx -= r.x; mz -= r.z; }
    const length = Math.hypot(mx, mz);
    if (length <= 1e-5) return;
    const speed = pressed.has("ShiftLeft") || pressed.has("ShiftRight") ? 7.2 : 4.2;
    const next = {
      x: player.position.x + mx / length * speed * dt,
      z: player.position.z + mz / length * speed * dt
    };
    const radial = Math.hypot(next.x, next.z);
    const clearingLimit = terrain.clearingRadius * 1.05;
    if (radial <= clearingLimit && radial >= 2.5) {
      player.position.x = next.x;
      player.position.z = next.z;
      player.position.y = terrain.sampleHeight(next);
    }
  }

  function descriptor() {
    if (progress < 0.985) {
      return Object.freeze({
        id: "camera:cozy-island-rail",
        mode: "rail",
        progress,
        position: Object.freeze(sampleRail(railPositions, progress)),
        lookAt: Object.freeze(sampleRail(railLooks, progress))
      });
    }
    const eye = vec(player.position.x, terrain.sampleHeight(player.position) + player.eyeHeight, player.position.z);
    const f = forward();
    return Object.freeze({
      id: "camera:cozy-island-first-person",
      mode: "first-person",
      progress,
      position: Object.freeze(eye),
      lookAt: Object.freeze(vec(eye.x + f.x, eye.y + f.y, eye.z + f.z))
    });
  }

  const input = Object.freeze({
    wheel(deltaY = 0) {
      progress = clamp01(progress + Number(deltaY) * 0.00072);
    },
    drag(deltaX = 0, deltaY = 0) {
      yaw -= Number(deltaX) * (progress >= 0.985 ? 0.0024 : 0.00115);
      pitch = clamp(pitch - Number(deltaY) * 0.0021, -1.08, 0.92);
      if (progress < 0.985) {
        const orbitInfluence = clamp(Number(deltaX) * 0.00008, -0.035, 0.035);
        for (const point of railPositions) point.x += orbitInfluence * Math.abs(point.z) * 0.02;
      }
    },
    key(code, down) {
      if (down) pressed.add(code);
      else pressed.delete(code);
    },
    clear() {
      pressed.clear();
    }
  });

  return Object.freeze({
    id: "camera-rail-sequence:cozy-island",
    input,
    tick,
    descriptor,
    reset() {
      progress = 0.14;
      yaw = 0;
      pitch = -0.05;
      pressed.clear();
      player.position = vec(0, terrain.sampleHeight({ x: 0, z: 8 }), 8);
    }
  });
}

export function createCozyIslandScenario({ clock, cameraSequence, snapshot } = {}) {
  return Object.freeze({
    id: "scenario:cozy-island-webgpu-v2",
    tick(deltaSeconds = 0) {
      clock?.tick?.(deltaSeconds);
      cameraSequence?.tick?.(deltaSeconds);
    },
    getRenderSnapshot() {
      return Object.freeze({
        ...snapshot,
        clock: clock?.getState?.() ?? { elapsedSeconds: 0 },
        camera: cameraSequence?.descriptor?.() ?? { mode: "static", position: vec(0, 180, 400), lookAt: vec(0, 0, 0) }
      });
    },
    reset() {
      clock?.reset?.();
      cameraSequence?.reset?.();
    }
  });
}
