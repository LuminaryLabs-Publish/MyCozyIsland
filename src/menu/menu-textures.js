import * as THREE from "three/webgpu";

function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createTextureFromCanvas(canvas, name) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.name = name;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

export function createPalmFrondAtlas({ variants = 4 } = {}) {
  const cellWidth = 384;
  const height = 320;
  const canvas = document.createElement("canvas");
  canvas.width = cellWidth * variants;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not create the palm frond atlas.");

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineCap = "round";
  context.lineJoin = "round";

  const palettes = [
    ["#255c3b", "#4e9451", "#9dce6e"],
    ["#2e6540", "#5ca259", "#b1d97b"],
    ["#214f35", "#438646", "#87bf60"],
    ["#346d47", "#68aa5d", "#bfdf89"]
  ];

  for (let variant = 0; variant < variants; variant += 1) {
    const random = seededRandom(0x91e10da5 + variant * 92821);
    const cellX = variant * cellWidth;
    const rootX = cellX + 18;
    const tipX = cellX + cellWidth - 16;
    const centerY = height * (0.49 + (variant - 1.5) * 0.012);
    const [dark, mid, light] = palettes[variant % palettes.length];

    const ribGradient = context.createLinearGradient(rootX, centerY, tipX, centerY + 28);
    ribGradient.addColorStop(0, "#466f37");
    ribGradient.addColorStop(0.45, mid);
    ribGradient.addColorStop(1, light);
    context.strokeStyle = ribGradient;
    context.lineWidth = 9;
    context.beginPath();
    context.moveTo(rootX, centerY);
    context.bezierCurveTo(
      cellX + cellWidth * 0.34,
      centerY - 10,
      cellX + cellWidth * 0.72,
      centerY + 5,
      tipX,
      centerY + 24 + variant * 2
    );
    context.stroke();

    const leafletCount = 27;
    for (let index = 2; index < leafletCount; index += 1) {
      const t = index / leafletCount;
      const baseX = rootX + (tipX - rootX) * t;
      const arc = 24 * t * t;
      const baseY = centerY + arc;
      const fullness = Math.sin(Math.PI * t);
      const length = (42 + fullness * 82) * (0.91 + random() * 0.18);
      const width = 5.2 + fullness * 10.5;
      const lean = 8 + t * 18;
      const damage = random();
      const tearScale = damage > 0.91 ? 0.54 : damage > 0.82 ? 0.76 : 1;

      for (const side of [-1, 1]) {
        const sideLength = length * tearScale * (0.92 + random() * 0.12);
        const tipY = baseY + side * sideLength;
        const tipOffsetX = lean + random() * 9;
        const fill = context.createLinearGradient(baseX, baseY, baseX + tipOffsetX, tipY);
        fill.addColorStop(0, dark);
        fill.addColorStop(0.44, mid);
        fill.addColorStop(1, light);

        context.fillStyle = fill;
        context.beginPath();
        context.moveTo(baseX - width * 0.36, baseY);
        context.quadraticCurveTo(
          baseX + tipOffsetX * 0.28,
          baseY + side * sideLength * 0.42,
          baseX + tipOffsetX,
          tipY
        );
        context.quadraticCurveTo(
          baseX + tipOffsetX * 0.57,
          baseY + side * sideLength * 0.38,
          baseX + width * 0.45,
          baseY + side * 1.6
        );
        context.closePath();
        context.fill();

        context.globalAlpha = 0.3;
        context.strokeStyle = side > 0 ? "#e8efae" : "#173f2c";
        context.lineWidth = Math.max(1, width * 0.12);
        context.beginPath();
        context.moveTo(baseX, baseY);
        context.quadraticCurveTo(
          baseX + tipOffsetX * 0.4,
          baseY + side * sideLength * 0.48,
          baseX + tipOffsetX * 0.94,
          tipY - side * 3
        );
        context.stroke();
        context.globalAlpha = 1;
      }
    }

    context.globalAlpha = 0.1;
    context.strokeStyle = "#fff7c5";
    context.lineWidth = 1.2;
    for (let vein = 0; vein < 16; vein += 1) {
      const y = 30 + vein * 17 + random() * 8;
      context.beginPath();
      context.moveTo(cellX + 16, y);
      context.lineTo(cellX + cellWidth - 22, y + 6 + random() * 8);
      context.stroke();
    }
    context.globalAlpha = 1;
  }

  return createTextureFromCanvas(canvas, "menu-palm-frond-atlas");
}

export function createFlowerAtlas() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 160;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not create the flower atlas.");

  const palettes = [
    ["#ed93af", "#ffe2ea", "#cd6c8c"],
    ["#eccd6e", "#fff0ac", "#c09b3f"],
    ["#eee9df", "#fffef8", "#cec1b4"],
    ["#c4a1e8", "#eee3ff", "#8f6bb8"]
  ];

  for (let variant = 0; variant < palettes.length; variant += 1) {
    const originX = variant * 128;
    const [petal, highlight, center] = palettes[variant];
    context.globalAlpha = 0.72;
    for (let flower = 0; flower < 6; flower += 1) {
      const x = originX + 15 + flower * 19 + (flower % 2) * 4;
      const y = 104 - (flower % 3) * 12;
      const radius = 8 + (flower % 2) * 2.5;
      context.fillStyle = petal;
      for (let petalIndex = 0; petalIndex < 5; petalIndex += 1) {
        const angle = petalIndex / 5 * Math.PI * 2;
        context.beginPath();
        context.ellipse(
          x + Math.cos(angle) * radius * 0.76,
          y + Math.sin(angle) * radius * 0.76,
          radius * 0.58,
          radius * 0.34,
          angle,
          0,
          Math.PI * 2
        );
        context.fill();
      }
      context.fillStyle = highlight;
      context.beginPath();
      context.arc(x - 2, y - 2, radius * 0.28, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = center;
      context.beginPath();
      context.arc(x, y, radius * 0.21, 0, Math.PI * 2);
      context.fill();
    }

    context.globalAlpha = 0.26;
    context.strokeStyle = "#4f7657";
    context.lineWidth = 3.5;
    context.beginPath();
    context.moveTo(originX + 8, 151);
    context.quadraticCurveTo(originX + 62, 111, originX + 122, 147);
    context.stroke();
  }
  context.globalAlpha = 1;

  return createTextureFromCanvas(canvas, "menu-flower-atlas");
}
