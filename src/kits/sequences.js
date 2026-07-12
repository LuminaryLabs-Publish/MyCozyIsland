import { clamp, clamp01, lerp, smoothstep } from "./determinism.js";

const PLAYER_EYE_HEIGHT = 2;
const RAIL_START_FOV = 55;
const FIRST_PERSON_FOV = 80;
const FIRST_PERSON_THRESHOLD = 0.985;

const vec = (x = 0, y = 0, z = 0) => ({ x, y, z });
const lerpVec = (a, b, t) => vec(lerp(a.x, b.x, t), lerp(a.y, b.y, t), lerp(a.z, b.z, t));

function sampleRail(points, progress) {
  const clamped = clamp01(progress);
  const scaled = clamped * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(scaled));
  const local = smoothstep(0, 1, scaled - index);
  return lerpVec(points[index], points[index + 1], local);
}

function pointAboveTerrain(terrain, x, z, clearance) {
  return vec(x, terrain.sampleHeight({ x, z }) + clearance, z);
}

function clampPointAboveTerrain(terrain, point, clearance) {
  const ground = terrain.sampleHeight({ x: point.x, z: point.z });
  return vec(point.x, Math.max(point.y, ground + clearance), point.z);
}

export function createCameraRailSequence(terrain) {
  let progress = 0.14;
  let yaw = 0;
  let pitch = -0.05;
  const pressed = new Set();
  const player = {
    position: vec(0, terrain.sampleHeight({ x: 0, z: 8 }), 8),
    eyeHeight: PLAYER_EYE_HEIGHT
  };

  const railPositions = [
    vec(0, 215, 430),
    vec(-22, 178, 335),
    vec(-38, 122, 238),
    vec(-24, 74, 142),
    pointAboveTerrain(terrain, -10, 72, 18),
    pointAboveTerrain(terrain, 0, 30, 9),
    pointAboveTerrain(terrain, 0, 16, 4.5),
    pointAboveTerrain(terrain, 0, 8, PLAYER_EYE_HEIGHT)
  ];
  const railLooks = [
    vec(0, 18, -34),
    vec(0, 16, -28),
    vec(0, 14, -18),
    pointAboveTerrain(terrain, 0, -8, 3.5),
    pointAboveTerrain(terrain, 0, 0, 2.6),
    pointAboveTerrain(terrain, 0, 4, 2.2),
    pointAboveTerrain(terrain, 0, -4, PLAYER_EYE_HEIGHT),
    pointAboveTerrain(terrain, 0, -4, PLAYER_EYE_HEIGHT)
  ];

  function forward() {
    return vec(-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
  }

  function tick(deltaSeconds = 0) {
    if (progress < FIRST_PERSON_THRESHOLD) return;
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
    if (progress < FIRST_PERSON_THRESHOLD) {
      const landingBlend = smoothstep(0.72, FIRST_PERSON_THRESHOLD, progress);
      const requiredClearance = lerp(8, PLAYER_EYE_HEIGHT, landingBlend);
      const sampledPosition = sampleRail(railPositions, progress);
      const sampledLookAt = sampleRail(railLooks, progress);
      const safePosition = clampPointAboveTerrain(terrain, sampledPosition, requiredClearance);
      const safeLookAt = clampPointAboveTerrain(
        terrain,
        sampledLookAt,
        lerp(1.2, PLAYER_EYE_HEIGHT, landingBlend)
      );
      const fov = lerp(
        RAIL_START_FOV,
        FIRST_PERSON_FOV,
        smoothstep(0.76, FIRST_PERSON_THRESHOLD, progress)
      );
      return Object.freeze({
        id: "camera:cozy-island-rail",
        mode: "rail",
        progress,
        fov,
        position: Object.freeze(safePosition),
        lookAt: Object.freeze(safeLookAt)
      });
    }
    const eye = vec(
      player.position.x,
      terrain.sampleHeight({ x: player.position.x, z: player.position.z }) + PLAYER_EYE_HEIGHT,
      player.position.z
    );
    const f = forward();
    return Object.freeze({
      id: "camera:cozy-island-first-person",
      mode: "first-person",
      progress,
      fov: FIRST_PERSON_FOV,
      eyeHeight: PLAYER_EYE_HEIGHT,
      position: Object.freeze(eye),
      lookAt: Object.freeze(vec(eye.x + f.x, eye.y + f.y, eye.z + f.z))
    });
  }

  const input = Object.freeze({
    wheel(deltaY = 0) {
      progress = clamp01(progress + Number(deltaY) * 0.00072);
    },
    drag(deltaX = 0, deltaY = 0) {
      yaw -= Number(deltaX) * (progress >= FIRST_PERSON_THRESHOLD ? 0.0024 : 0.00115);
      pitch = clamp(pitch - Number(deltaY) * 0.0021, -1.08, 0.92);
      if (progress < FIRST_PERSON_THRESHOLD) {
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
        camera: cameraSequence?.descriptor?.() ?? {
          mode: "static",
          fov: RAIL_START_FOV,
          position: vec(0, 180, 400),
          lookAt: vec(0, 0, 0)
        }
      });
    },
    reset() {
      clock?.reset?.();
      cameraSequence?.reset?.();
    }
  });
}
