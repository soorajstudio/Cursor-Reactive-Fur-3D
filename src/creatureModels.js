import * as THREE from 'three';

// Utility helper functions
function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

function normalize3(x, y, z) {
  const l = Math.sqrt(x * x + y * y + z * z) || 1.0;
  return [x / l, y / l, z / l];
}

function createTaperedTube(curve, tubularSegments, baseRadius, tipRadius, radialSegments = 14) {
  const geom = new THREE.TubeGeometry(curve, tubularSegments, baseRadius, radialSegments, false);
  const pos = geom.attributes.position;
  const stride = radialSegments + 1;
  for (let i = 0; i <= tubularSegments; i++) {
    const t = i / tubularSegments;
    const center = curve.getPointAt(t);
    const radiusScale = (baseRadius * (1.0 - t) + tipRadius * t) / baseRadius;
    for (let j = 0; j <= radialSegments; j++) {
      const idx = i * stride + j;
      const x = pos.getX(idx);
      const y = pos.getY(idx);
      const z = pos.getZ(idx);
      pos.setXYZ(
        idx,
        center.x + (x - center.x) * radiusScale,
        center.y + (y - center.y) * radiusScale,
        center.z + (z - center.z) * radiusScale
      );
    }
  }
  geom.computeVertexNormals();
  return geom;
}

// =============================================================================
// CREATURE DEFINITIONS & METADATA (DIVERSE FACIAL ANATOMY)
// =============================================================================

export const CREATURE_MODELS = [
  {
    id: 'mochi',
    name: 'Mochi-Puff',
    icon: '🌸',
    tagline: 'Plush cloud critter with expressive anime eyes & glowing blush (Eyes Only)',
    defaultSettings: {
      baseColor: '#4c1d68',
      tipColor: '#fbcfe8',
      furLength: 0.28,
      furDensity: 0.80,
      roughness: 0.77,
      specular: 0.24,
      clumping: 0.35,
      curliness: 0.23,
      skinColor: '#36154b'
    }
  },
  {
    id: 'bunny',
    name: 'Lop Bunny',
    icon: '🐰',
    tagline: 'Floppy lop ears with pink inner hollows, doe eyes & twitchy cleft nose (Eyes & Nose)',
    defaultSettings: {
      baseColor: '#54413b',
      tipColor: '#fdf2e9',
      furLength: 0.34,
      furDensity: 0.90,
      roughness: 0.74,
      specular: 0.25,
      clumping: 0.42,
      curliness: 0.44,
      skinColor: '#382b26'
    }
  },
  {
    id: 'highland',
    name: 'Highland Calf',
    icon: '🐮',
    tagline: 'Inward curved horns, honey bangs, doe eyes & damp bovine muzzle pad (Eyes & Muzzle)',
    defaultSettings: {
      baseColor: '#56270b',
      tipColor: '#f59e0b',
      furLength: 0.38,
      furDensity: 0.92,
      roughness: 0.82,
      specular: 0.22,
      clumping: 0.75,
      curliness: 0.68,
      skinColor: '#331707'
    }
  },
  {
    id: 'dragon',
    name: 'Dragon Baby',
    icon: '🐉',
    tagline: 'Reptilian slit eyes, swept-back ribbed horns & scalloped fin ears (Eyes & Horns)',
    defaultSettings: {
      baseColor: '#7c2d28',
      tipColor: '#fb923c',
      furLength: 0.30,
      furDensity: 0.85,
      roughness: 0.70,
      specular: 0.34,
      clumping: 0.55,
      curliness: 0.28,
      skinColor: '#451715'
    }
  },
  {
    id: 'owlbear',
    name: 'Forest Owl',
    icon: '🦉',
    tagline: 'Layered concentric feather eye discs, amber eyes & hooked raptor beak (Eyes & Beak)',
    defaultSettings: {
      baseColor: '#1e261f',
      tipColor: '#eab308',
      furLength: 0.32,
      furDensity: 0.88,
      roughness: 0.78,
      specular: 0.25,
      clumping: 0.62,
      curliness: 0.32,
      skinColor: '#101a14'
    }
  },
  {
    id: 'kitsune',
    name: 'Kitsune Fox',
    icon: '🦊',
    tagline: 'White cheek ruffs, eyebrow spots, alert black-tipped ears & smiling mouth (Full Face)',
    defaultSettings: {
      baseColor: '#6c220a',
      tipColor: '#ea580c',
      furLength: 0.32,
      furDensity: 0.88,
      roughness: 0.74,
      specular: 0.28,
      clumping: 0.46,
      curliness: 0.22,
      skinColor: '#431407'
    }
  },
  {
    id: 'teddy',
    name: 'Plush Teddy',
    icon: '🐻',
    tagline: 'Biscuit-beige muzzle dome, stitched button nose & smiling mouth (Full Face)',
    defaultSettings: {
      baseColor: '#452310',
      tipColor: '#fde047',
      furLength: 0.34,
      furDensity: 0.94,
      roughness: 0.80,
      specular: 0.22,
      clumping: 0.68,
      curliness: 0.58,
      skinColor: '#281308'
    }
  }
];

// =============================================================================
// ANATOMICAL FEATURE REFERENCE COORDINATES
// =============================================================================

const CREATURE_COORDS = {
  mochi: {
    eyeX: 0.31, eyeY: 0.16, eyeZ: 0.95
  },
  bunny: {
    eyeX: 0.31, eyeY: 0.15, eyeZ: 0.98,
    noseX: 0.0, noseY: 0.04, noseZ: 1.09
  },
  highland: {
    eyeX: 0.39, eyeY: 0.15, eyeZ: 0.96,
    noseX: 0.0, noseY: -0.08, noseZ: 1.18
  },
  dragon: {
    eyeX: 0.32, eyeY: 0.17, eyeZ: 0.98,
    noseX: 0.0, noseY: 0.04, noseZ: 1.24
  },
  owlbear: {
    eyeX: 0.34, eyeY: 0.16, eyeZ: 0.93,
    noseX: 0.0, noseY: 0.03, noseZ: 1.12
  },
  kitsune: {
    eyeX: 0.31, eyeY: 0.17, eyeZ: 0.98,
    noseX: 0.0, noseY: 0.045, noseZ: 1.38,
    mouthX: 0.0, mouthY: -0.055, mouthZ: 1.33
  },
  teddy: {
    eyeX: 0.31, eyeY: 0.17, eyeZ: 0.98,
    noseX: 0.0, noseY: 0.08, noseZ: 1.26,
    mouthX: 0.0, mouthY: -0.06, mouthZ: 1.22
  }
};

// =============================================================================
// SCULPTING ALGORITHMS FOR EACH CREATURE BODY
// =============================================================================

function sculptVertex(id, u, v, w) {
  let x = u;
  let y = v;
  let z = w;

  switch (id) {
    case 'kitsune': {
      const belly = 1.0 + 0.16 * Math.exp(-Math.pow((y + 0.25) / 0.55, 2.0));
      x *= belly;
      z *= 0.95 + 0.12 * Math.exp(-Math.pow((y + 0.2) / 0.6, 2.0));
      y *= 0.98;

      if (y < -0.55) {
        const t = (-0.55 - y) / 0.45;
        y = -0.55 - Math.tanh(t * 1.15) * 0.32;
      }

      // Pointed alert fox ears
      const leftEarDir = normalize3(-0.46, 0.85, 0.18);
      const rightEarDir = normalize3(0.46, 0.85, 0.18);
      const dotLEar = Math.max(0.0, u * leftEarDir[0] + v * leftEarDir[1] + w * leftEarDir[2]);
      const dotREar = Math.max(0.0, u * rightEarDir[0] + v * rightEarDir[1] + w * rightEarDir[2]);
      const earProfile = Math.pow(Math.max(dotLEar, dotREar), 15.0) * 0.58;
      x += u * earProfile * 0.85;
      y += v * earProfile * 1.45;
      z += w * earProfile * 0.65;

      // Forward fox snout
      if (z > 0.05 && y > -0.25 && y < 0.28) {
        const muzzleTaper = Math.exp(-Math.pow((y - 0.02) / 0.22, 2.0)) * Math.max(0, z - 0.05);
        z += muzzleTaper * 0.46;
        x *= (1.0 - muzzleTaper * 0.28);
      }

      // Cheek tufts
      const cheekTuftDist = Math.hypot(Math.abs(x) - 0.65, y + 0.02, z - 0.5);
      if (cheekTuftDist < 0.48) {
        const tuft = (1.0 - cheekTuftDist / 0.48) * 0.24;
        x += Math.sign(x) * tuft * 1.1;
      }

      // Bushy tail mound
      const tailDist = Math.hypot(x, y + 0.42, z + 0.82);
      if (tailDist < 0.58) {
        const tailBoost = (1.0 - tailDist / 0.58) * 0.32;
        z -= tailBoost * 0.85;
        y += tailBoost * 0.38;
      }
      break;
    }

    case 'highland': {
      const broadHead = y > 0.0 ? 1.0 + 0.18 * (y / 1.0) : 1.0;
      x *= broadHead * (1.0 + 0.24 * Math.exp(-Math.pow((y + 0.2) / 0.6, 2.0)));
      z *= 0.96;
      y *= 0.94;

      if (y < -0.55) {
        const t = (-0.55 - y) / 0.45;
        y = -0.55 - Math.tanh(t * 1.15) * 0.32;
      }

      // Droopy horizontal ears
      const leftEarDir = normalize3(-0.88, 0.05, 0.12);
      const rightEarDir = normalize3(0.88, 0.05, 0.12);
      const dotLEar = Math.max(0.0, u * leftEarDir[0] + v * leftEarDir[1] + w * leftEarDir[2]);
      const dotREar = Math.max(0.0, u * rightEarDir[0] + v * rightEarDir[1] + w * rightEarDir[2]);
      const earProfile = Math.pow(Math.max(dotLEar, dotREar), 12.0) * 0.48;
      x += u * earProfile * 1.5;
      y -= Math.abs(v) * earProfile * 0.45;

      // Wide cow muzzle
      if (z > 0.1 && y > -0.32 && y < 0.15) {
        const snout = Math.exp(-Math.pow((y + 0.08) / 0.26, 2.0)) * Math.max(0, z - 0.1);
        z += snout * 0.34;
        x *= (1.0 + snout * 0.15);
      }

      // Horn base bumps
      const leftHornDir = normalize3(-0.48, 0.82, -0.05);
      const rightHornDir = normalize3(0.48, 0.82, -0.05);
      const dotLHorn = Math.max(0.0, u * leftHornDir[0] + v * leftHornDir[1] + w * leftHornDir[2]);
      const dotRHorn = Math.max(0.0, u * rightHornDir[0] + v * rightHornDir[1] + w * rightHornDir[2]);
      const hornBase = Math.pow(Math.max(dotLHorn, dotRHorn), 18.0) * 0.25;
      x += u * hornBase * 0.8;
      y += v * hornBase * 0.9;
      break;
    }

    case 'dragon': {
      const bellyWidth = 1.0 + 0.24 * Math.exp(-Math.pow((y + 0.26) / 0.58, 2.0));
      x *= bellyWidth;
      z *= (0.92 + 0.15 * Math.exp(-Math.pow((y + 0.24) / 0.6, 2.0)));
      y *= 0.95;

      if (y < -0.55) {
        const t = (-0.55 - y) / 0.45;
        y = -0.55 - Math.tanh(t * 1.15) * 0.32;
      }

      // Chibi dragon snout
      if (z > 0.15 && y > -0.22 && y < 0.2) {
        const snout = Math.exp(-Math.pow((y + 0.02) / 0.22, 2.0)) * Math.max(0, z - 0.12);
        z += snout * 0.35;
      }

      // Swept-back horns
      const leftHornDir = normalize3(-0.38, 0.78, -0.42);
      const rightHornDir = normalize3(0.38, 0.78, -0.42);
      const dotLHorn = Math.max(0.0, u * leftHornDir[0] + v * leftHornDir[1] + w * leftHornDir[2]);
      const dotRHorn = Math.max(0.0, u * rightHornDir[0] + v * rightHornDir[1] + w * rightHornDir[2]);
      const hornProfile = Math.pow(Math.max(dotLHorn, dotRHorn), 14.0) * 0.52;
      x += u * hornProfile * 0.8;
      y += v * hornProfile * 1.25;
      z -= Math.abs(w) * hornProfile * 0.85;

      // Dorsal spine
      if (z < 0.1 && Math.abs(x) < 0.28) {
        const spine = Math.exp(-Math.pow(x / 0.18, 2.0)) * (0.12 + 0.1 * Math.max(0, y + 0.5));
        z -= spine;
      }

      // Wing-nub buds
      const leftWingDir = normalize3(-0.75, 0.15, -0.45);
      const rightWingDir = normalize3(0.75, 0.15, -0.45);
      const dotLWing = Math.max(0.0, u * leftWingDir[0] + v * leftWingDir[1] + w * leftWingDir[2]);
      const dotRWing = Math.max(0.0, u * rightWingDir[0] + v * rightWingDir[1] + w * rightWingDir[2]);
      const wingProfile = Math.pow(Math.max(dotLWing, dotRWing), 16.0) * 0.32;
      x += u * wingProfile * 1.1;
      z -= Math.abs(w) * wingProfile * 0.9;
      break;
    }

    case 'bunny': {
      const belly = 1.0 + 0.28 * Math.exp(-Math.pow((y + 0.22) / 0.52, 2.0));
      const cheek = 1.0 + 0.22 * Math.exp(-Math.pow((y + 0.08) / 0.34, 2.0)) * Math.max(0, z);
      x *= belly * cheek;
      z *= (0.95 + 0.12 * Math.exp(-Math.pow((y + 0.2) / 0.6, 2.0)));
      y *= 0.94;

      if (y < -0.55) {
        const t = (-0.55 - y) / 0.45;
        y = -0.55 - Math.tanh(t * 1.15) * 0.32;
      }

      // Lop ears draping downward
      const leftLopDir = normalize3(-0.65, -0.45, 0.12);
      const rightLopDir = normalize3(0.65, -0.45, 0.12);
      const dotLLop = Math.max(0.0, u * leftLopDir[0] + (v + 0.2) * leftLopDir[1] + w * leftLopDir[2]);
      const dotRLop = Math.max(0.0, u * rightLopDir[0] + (v + 0.2) * rightLopDir[1] + w * rightLopDir[2]);
      const lopProfile = Math.pow(Math.max(dotLLop, dotRLop), 11.0) * 0.58;
      x += u * lopProfile * 1.15;
      y -= Math.abs(v) * lopProfile * 0.95;
      z += w * lopProfile * 0.45;

      // Cotton-ball tail
      const tailDist = Math.hypot(x, y + 0.5, z + 0.88);
      if (tailDist < 0.42) {
        const tailBoost = (1.0 - tailDist / 0.42) * 0.32;
        z -= tailBoost * 0.9;
        y += tailBoost * 0.4;
      }
      break;
    }

    case 'owlbear': {
      const roundness = 1.0 + 0.14 * Math.exp(-Math.pow((y + 0.1) / 0.6, 2.0));
      x *= roundness;
      z *= 0.94;
      y *= 1.02;

      if (y < -0.55) {
        const t = (-0.55 - y) / 0.45;
        y = -0.55 - Math.tanh(t * 1.15) * 0.32;
      }

      // Feathery ear horns
      const leftTuftDir = normalize3(-0.52, 0.82, -0.05);
      const rightTuftDir = normalize3(0.52, 0.82, -0.05);
      const dotLTuft = Math.max(0.0, u * leftTuftDir[0] + v * leftTuftDir[1] + w * leftTuftDir[2]);
      const dotRTuft = Math.max(0.0, u * rightTuftDir[0] + v * rightTuftDir[1] + w * rightTuftDir[2]);
      const tuftProfile = Math.pow(Math.max(dotLTuft, dotRTuft), 14.0) * 0.46;
      x += u * tuftProfile * 0.9;
      y += v * tuftProfile * 1.35;

      // Facial discs
      const lx = x + 0.34;
      const rx = x - 0.34;
      const ey = y - 0.16;
      const ez = z - 0.86;
      const dEyeDisc = Math.min(Math.hypot(lx, ey, ez), Math.hypot(rx, ey, ez));
      if (dEyeDisc < 0.42) {
        const discR = dEyeDisc / 0.42;
        const discIndent = Math.sin(discR * Math.PI) * 0.085;
        z -= discIndent;
      }

      // Wing-arms
      const leftWingDir = normalize3(-0.92, -0.15, 0.1);
      const rightWingDir = normalize3(0.92, -0.15, 0.1);
      const dotLWing = Math.max(0.0, u * leftWingDir[0] + v * leftWingDir[1] + w * leftWingDir[2]);
      const dotRWing = Math.max(0.0, u * rightWingDir[0] + v * rightWingDir[1] + w * rightWingDir[2]);
      const wingProfile = Math.pow(Math.max(dotLWing, dotRWing), 16.0) * 0.34;
      x += u * wingProfile * 1.25;
      y += v * wingProfile * 0.55;
      break;
    }

    case 'teddy': {
      const belly = 1.0 + 0.22 * Math.exp(-Math.pow((y + 0.24) / 0.56, 2.0));
      x *= belly;
      z *= (0.95 + 0.14 * Math.exp(-Math.pow((y + 0.22) / 0.6, 2.0)));
      y *= 0.96;

      if (y < -0.55) {
        const t = (-0.55 - y) / 0.45;
        y = -0.55 - Math.tanh(t * 1.15) * 0.32;
      }

      // Round cup teddy ears
      const leftEarDir = normalize3(-0.52, 0.78, 0.04);
      const rightEarDir = normalize3(0.52, 0.78, 0.04);
      const dotLEar = Math.max(0.0, u * leftEarDir[0] + v * leftEarDir[1] + w * leftEarDir[2]);
      const dotREar = Math.max(0.0, u * rightEarDir[0] + v * rightEarDir[1] + w * rightEarDir[2]);
      const earProfile = Math.pow(Math.max(dotLEar, dotREar), 12.0) * 0.44;
      x += u * earProfile * 1.1;
      y += v * earProfile * 1.05;
      z += w * earProfile * 0.8;

      // Protruding teddy muzzle
      const snoutDist = Math.hypot(x, y + 0.02, z - 0.86);
      if (snoutDist < 0.42) {
        const snoutBoost = (1.0 - snoutDist / 0.42) * 0.26;
        z += snoutBoost * 1.1;
      }

      // Chunky paws
      const leftArmDir = normalize3(-0.94, -0.12, 0.25);
      const rightArmDir = normalize3(0.94, -0.12, 0.25);
      const dotLArm = Math.max(0.0, u * leftArmDir[0] + v * leftArmDir[1] + w * leftArmDir[2]);
      const dotRArm = Math.max(0.0, u * rightArmDir[0] + v * rightArmDir[1] + w * rightArmDir[2]);
      const armProfile = Math.pow(Math.max(dotLArm, dotRArm), 16.0) * 0.26;
      x += u * armProfile * 1.15;
      y += v * armProfile * 0.65;
      break;
    }

    case 'mochi':
    default: {
      const bellyWidth = 1.0 + 0.22 * Math.exp(-Math.pow((y + 0.24) / 0.55, 2.0));
      const cheekPuff = 1.0 + 0.14 * Math.exp(-Math.pow((y + 0.05) / 0.38, 2.0)) * Math.max(0, z);
      x *= bellyWidth * cheekPuff;
      z *= (0.94 + 0.12 * Math.exp(-Math.pow((y + 0.22) / 0.6, 2.0)));
      y *= 0.96;

      if (y < -0.55) {
        const t = (-0.55 - y) / 0.45;
        y = -0.55 - Math.tanh(t * 1.15) * 0.32;
      }

      const leftEarDir = normalize3(-0.46, 0.86, 0.06);
      const rightEarDir = normalize3(0.46, 0.86, 0.06);
      const dotLEar = Math.max(0.0, u * leftEarDir[0] + v * leftEarDir[1] + w * leftEarDir[2]);
      const dotREar = Math.max(0.0, u * rightEarDir[0] + v * rightEarDir[1] + w * rightEarDir[2]);
      const earProfile = Math.pow(Math.max(dotLEar, dotREar), 14.0) * 0.44;
      x += u * earProfile * 0.75;
      y += v * earProfile * 1.15;
      z += w * earProfile * 0.55;

      const leftArmDir = normalize3(-0.94, -0.08, 0.28);
      const rightArmDir = normalize3(0.94, -0.08, 0.28);
      const dotLArm = Math.max(0.0, u * leftArmDir[0] + v * leftArmDir[1] + w * leftArmDir[2]);
      const dotRArm = Math.max(0.0, u * rightArmDir[0] + v * rightArmDir[1] + w * rightArmDir[2]);
      const armProfile = Math.pow(Math.max(dotLArm, dotRArm), 18.0) * 0.24;
      x += u * armProfile * 1.1;
      y += v * armProfile * 0.6;
      z += w * armProfile * 0.9;
      break;
    }
  }

  // Smooth eye-socket recess across all models so eyes sit cleanly in face
  const coords = CREATURE_COORDS[id] || CREATURE_COORDS.mochi;
  const lx = x + coords.eyeX;
  const rx = x - coords.eyeX;
  const ey = y - coords.eyeY;
  const ez = z - coords.eyeZ;
  const dEye = Math.min(Math.hypot(lx, ey, ez), Math.hypot(rx, ey, ez));
  if (dEye < 0.36) {
    const indent = (1.0 - smoothstep(0.0, 0.36, dEye)) * 0.075;
    z -= indent;
  }

  return [x, y, z];
}

// =============================================================================
// FOLLICLE DENSITY MASK FOR EACH CREATURE
// =============================================================================

function evaluateFollicleMaskFor(id, x, y, z) {
  const c = CREATURE_COORDS[id] || CREATURE_COORDS.mochi;

  // 1. Eye clearance for all models (zero fur on corneas)
  const minEyeDist = Math.min(
    Math.hypot(x + c.eyeX, y - c.eyeY, z - c.eyeZ),
    Math.hypot(x - c.eyeX, y - c.eyeY, z - c.eyeZ)
  );
  if (minEyeDist < 0.22) {
    return 0.0;
  }
  const eyeMask = smoothstep(0.22, 0.42, minEyeDist);

  // 2. Nose/Muzzle clearance (only for models that have a nose, muzzle, or beak)
  let noseMask = 1.0;
  const hasNoseOrBeak = id === 'kitsune' || id === 'highland' || id === 'bunny' || id === 'teddy' || id === 'owlbear' || id === 'dragon';
  if (hasNoseOrBeak && c.noseZ) {
    const noseDist = Math.hypot(x / 1.3, y - c.noseY, z - c.noseZ);
    if (noseDist < 0.18) {
      return 0.0;
    }
    noseMask = smoothstep(0.18, 0.38, noseDist);
  }

  // 3. Mouth clearance (only for models with an interactive smiling mouth)
  let mouthMask = 1.0;
  const hasMouth = id === 'kitsune' || id === 'teddy';
  if (hasMouth && c.mouthZ) {
    const mouthDist = Math.hypot(x / 1.4, y - c.mouthY, z - c.mouthZ);
    if (mouthDist < 0.16) {
      return 0.0;
    }
    mouthMask = smoothstep(0.16, 0.34, mouthDist);
  }

  // 4. Ground contact pad
  const bottomMask = smoothstep(-1.05, -0.72, y);

  // 5. Model-specific fluffy zones (cheeks, bangs, crests, tails)
  let fluffBoost = 1.0;
  if (id === 'kitsune') {
    const cheekDist = Math.min(Math.hypot(x + 0.65, y + 0.02, z - 0.62), Math.hypot(x - 0.65, y + 0.02, z - 0.62));
    const tailDist = Math.hypot(x, y + 0.45, z + 0.85);
    fluffBoost = 1.0 + 0.35 * (1.0 - smoothstep(0.0, 0.45, cheekDist)) + 0.30 * (1.0 - smoothstep(0.0, 0.5, tailDist));
  } else if (id === 'highland') {
    const fringeDist = Math.hypot(x, y - 0.42, z - 0.72);
    fluffBoost = 1.0 + 0.45 * (1.0 - smoothstep(0.0, 0.48, fringeDist));
  } else if (id === 'dragon') {
    const spineFluff = z < 0.1 ? 1.0 + 0.42 * (1.0 - smoothstep(0.0, 0.28, Math.abs(x))) : 1.0;
    fluffBoost = spineFluff;
  } else if (id === 'bunny') {
    const tailDist = Math.hypot(x, y + 0.52, z + 0.88);
    fluffBoost = 1.0 + 0.35 * (tailDist < 0.35 ? 1.0 : 0.0);
  } else if (id === 'owlbear') {
    const chestDist = Math.hypot(x, y + 0.18, z - 0.88);
    fluffBoost = 1.0 + 0.30 * (1.0 - smoothstep(0.0, 0.36, chestDist));
  } else if (id === 'mochi') {
    const cheekDist = Math.min(Math.hypot(x + 0.56, y - 0.02, z - 0.68), Math.hypot(x - 0.56, y - 0.02, z - 0.68));
    fluffBoost = 1.0 + 0.22 * (1.0 - smoothstep(0.0, 0.42, cheekDist));
  }

  return Math.max(0.0, Math.min(1.35, eyeMask * noseMask * mouthMask * bottomMask * fluffBoost));
}

// =============================================================================
// GROOMING FLOW VECTOR FOR EACH CREATURE
// =============================================================================

function evaluateGroomFlowFor(id, x, y, z, nx, ny, nz) {
  let fx = x * 0.25;
  let fy = -0.85;
  let fz = (z - 0.15) * 0.25;

  const c = CREATURE_COORDS[id] || CREATURE_COORDS.mochi;

  // Sweep smoothly around eye sockets for all creatures
  const eyeCenters = [
    [-c.eyeX, c.eyeY, c.eyeZ - 0.08],
    [c.eyeX, c.eyeY, c.eyeZ - 0.08]
  ];
  for (let i = 0; i < 2; i++) {
    const [ex, ey, ez] = eyeCenters[i];
    const dx = x - ex;
    const dy = y - ey;
    const dz = z - ez;
    const d = Math.sqrt(dx * dx + dy * dy + dz * dz) + 1e-5;
    if (d < 0.48) {
      const vortex = 1.0 - d / 0.48;
      const sign = i === 0 ? 1.0 : -1.0;
      fx += (-dy / d) * vortex * 0.85 * sign;
      fy += (dx / d) * vortex * 0.85 * sign;
      fz += (dz / d) * vortex * 0.35;
    }
  }

  if (id === 'kitsune' && z > 0.2) {
    fx = x * 1.35;
    fy = -0.50;
    fz = -0.40;
  } else if (id === 'highland' && y > 0.18 && z > 0.22) {
    fx = x * 0.12;
    fy = -1.35;
    fz = 0.70;
  } else if (id === 'dragon' && Math.abs(x) < 0.32) {
    fx = x * 0.1;
    fy = -0.45;
    fz = -0.95;
  }

  const dot = fx * nx + fy * ny + fz * nz;
  fx -= dot * nx;
  fy -= dot * ny;
  fz -= dot * nz;

  const len = Math.sqrt(fx * fx + fy * fy + fz * fz) || 1.0;
  return [fx / len, fy / len, fz / len];
}

// =============================================================================
// ANATOMICAL COLOR ZONING FOR EACH CREATURE
// =============================================================================

function evaluateZoneColorFor(id, x, y, z) {
  const c = CREATURE_COORDS[id] || CREATURE_COORDS.mochi;

  switch (id) {
    case 'kitsune': {
      // 1. Two distinct white circular eyebrow spots (Maro marks)
      const leftBrowDist = Math.hypot(x + (c.eyeX - 0.04), y - (c.eyeY + 0.22), z - (c.eyeZ + 0.02));
      const rightBrowDist = Math.hypot(x - (c.eyeX - 0.04), y - (c.eyeY + 0.22), z - (c.eyeZ + 0.02));
      const browDist = Math.min(leftBrowDist, rightBrowDist);
      if (browDist < 0.14) {
        const w = 1.0 - smoothstep(0.06, 0.14, browDist);
        return [1.0, 0.98, 0.96, w];
      }

      // 2. Flared white cheek ruffs on left and right sides
      const leftCheekDist = Math.hypot(x + 0.65, y + 0.02, z - 0.55);
      const rightCheekDist = Math.hypot(x - 0.65, y + 0.02, z - 0.55);
      const cheekDist = Math.min(leftCheekDist, rightCheekDist);
      if (cheekDist < 0.48 && z > 0.05) {
        const w = (1.0 - smoothstep(0.15, 0.48, cheekDist)) * 0.98;
        return [1.0, 0.98, 0.95, w];
      }

      // 3. White muzzle bib & chin undercoat
      if (z > 0.35 && y < 0.10 && Math.abs(x) < 0.35) {
        const muzzleDist = Math.hypot(x / 1.15, y + 0.06, z - 1.1);
        const w = (1.0 - smoothstep(0.08, 0.45, muzzleDist)) * 0.96;
        if (w > 0.01) return [1.0, 0.98, 0.96, w];
      }

      // 4. Black / dark espresso fox ear tips
      if (y > 0.90 && Math.abs(x) > 0.30) {
        const earTipH = smoothstep(0.90, 1.25, y);
        return [0.06, 0.04, 0.04, earTipH * 0.95];
      }

      // 5. White belly patch
      if (y < -0.15 && z > 0.45 && Math.abs(x) < 0.40) {
        const bellyW = smoothstep(0.45, 0.75, z) * (1.0 - smoothstep(0.0, 0.40, Math.abs(x))) * 0.88;
        return [0.98, 0.96, 0.94, bellyW];
      }
      break;
    }

    case 'owlbear': {
      // Intricate concentric feather discs around eyes!
      const dL = Math.hypot(x + c.eyeX, y - c.eyeY, z - c.eyeZ);
      const dR = Math.hypot(x - c.eyeX, y - c.eyeY, z - c.eyeZ);
      const dEye = Math.min(dL, dR);

      if (dEye < 0.34) {
        // Inner disc: soft warm cream plumage
        const w = smoothstep(0.18, 0.24, dEye) * (1.0 - smoothstep(0.30, 0.34, dEye));
        if (w > 0.01) return [0.96, 0.92, 0.80, w * 0.98];
      } else if (dEye < 0.48) {
        // Mid disc: vibrant golden ochre plumage
        const w = (1.0 - Math.abs(dEye - 0.41) / 0.07);
        if (w > 0.01) return [0.88, 0.60, 0.16, Math.min(1.0, Math.max(0.0, w)) * 0.95];
      } else if (dEye < 0.64) {
        // Outer disc rim: deep espresso plumage
        const w = (1.0 - Math.abs(dEye - 0.56) / 0.08);
        if (w > 0.01) return [0.10, 0.07, 0.05, Math.min(1.0, Math.max(0.0, w)) * 0.94];
      }

      // Chevron chest feather plumage
      if (z > 0.45 && y < 0.12 && y > -0.65) {
        const chevron = Math.abs(Math.abs(x) - Math.abs(y * 0.45));
        if (chevron < 0.16) {
          const w = (1.0 - chevron / 0.16) * 0.78;
          return [0.95, 0.92, 0.86, w];
        }
      }
      break;
    }

    case 'highland': {
      // 1. Honey / golden fringe bangs cascading over forehead
      if (y > 0.14 && y < 0.65 && z > 0.42 && Math.abs(x) < 0.44) {
        const bangDist = Math.hypot(x / 1.2, (y - 0.38) / 1.5, z - 0.85);
        const w = (1.0 - smoothstep(0.10, 0.52, bangDist)) * 0.94;
        if (w > 0.01) return [0.98, 0.84, 0.42, w];
      }
      // 2. Warm soft tan on the lower muzzle
      if (y < 0.05 && y > -0.38 && z > 0.65 && Math.abs(x) < 0.48) {
        const muzzleW = (1.0 - smoothstep(0.0, 0.48, Math.abs(x))) * 0.72;
        return [0.86, 0.68, 0.54, muzzleW];
      }
      break;
    }

    case 'teddy': {
      // Biscuit-beige muzzle dome
      const snoutDist = Math.hypot(x / 1.25, (y + 0.06) / 1.1, z - 1.05);
      if (snoutDist < 0.44) {
        const w = (1.0 - smoothstep(0.18, 0.44, snoutDist)) * 0.96;
        return [0.90, 0.78, 0.62, w];
      }
      // Inner cup of teddy bear ears
      if (y > 0.75 && Math.abs(x) > 0.42 && z > -0.1) {
        return [0.88, 0.75, 0.58, 0.82];
      }
      break;
    }

    case 'dragon': {
      // 1. Coral / peach spiky crest along midline
      if (Math.abs(x) < 0.22 && (z < 0.25 || y > 0.5)) {
        const ridgeW = (1.0 - Math.abs(x) / 0.22) * 0.90;
        return [0.96, 0.38, 0.32, ridgeW];
      }
      // 2. Ivory chest bib / underbelly
      if (z > 0.50 && y < 0.05 && Math.abs(x) < 0.35) {
        const bibW = (1.0 - smoothstep(0.0, 0.35, Math.abs(x))) * 0.88;
        return [0.98, 0.94, 0.86, bibW];
      }
      break;
    }

    case 'bunny': {
      // 1. Soft baby pink inner ear folds
      if (Math.abs(x) > 0.62 && y < 0.18 && y > -0.55 && z > 0.0) {
        const earW = smoothstep(0.62, 0.85, Math.abs(x)) * (1.0 - smoothstep(-0.55, 0.18, y));
        return [0.98, 0.78, 0.85, earW * 0.88];
      }
      // 2. Snow white chin & tummy bib
      if (y < -0.10 && z > 0.55 && Math.abs(x) < 0.34) {
        const bibW = (1.0 - smoothstep(0.0, 0.34, Math.abs(x))) * 0.80;
        return [0.98, 0.98, 0.98, bibW];
      }
      break;
    }

    case 'mochi': {
      const cheekL = Math.hypot(x + 0.5, y + 0.02, z - 0.7);
      const cheekR = Math.hypot(x - 0.5, y + 0.02, z - 0.7);
      const dCheek = Math.min(cheekL, cheekR);
      if (dCheek < 0.40) {
        const w = (1.0 - dCheek / 0.40) * 0.68;
        return [1.0, 0.72, 0.88, w];
      }
      break;
    }
  }

  return [0.0, 0.0, 0.0, 0.0];
}

// =============================================================================
// GEOMETRY GENERATOR
// =============================================================================

export function createCreatureGeometry(modelId, widthSegments = 96, heightSegments = 72) {
  const geom = new THREE.SphereGeometry(1.0, widthSegments, heightSegments);
  const posAttr = geom.attributes.position;
  const count = posAttr.count;

  for (let i = 0; i < count; i++) {
    const u = posAttr.getX(i);
    const v = posAttr.getY(i);
    const w = posAttr.getZ(i);
    const [sx, sy, sz] = sculptVertex(modelId, u, v, w);
    posAttr.setXYZ(i, sx, sy, sz);
  }

  geom.computeVertexNormals();

  const normAttr = geom.attributes.normal;
  const follicleMaskArray = new Float32Array(count);
  const groomTangentArray = new Float32Array(count * 3);
  const zoneColorArray = new Float32Array(count * 4);

  for (let i = 0; i < count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    const nx = normAttr.getX(i);
    const ny = normAttr.getY(i);
    const nz = normAttr.getZ(i);

    follicleMaskArray[i] = evaluateFollicleMaskFor(modelId, x, y, z);
    const [tx, ty, tz] = evaluateGroomFlowFor(modelId, x, y, z, nx, ny, nz);
    groomTangentArray[i * 3] = tx;
    groomTangentArray[i * 3 + 1] = ty;
    groomTangentArray[i * 3 + 2] = tz;

    const [zr, zg, zb, zw] = evaluateZoneColorFor(modelId, x, y, z);
    zoneColorArray[i * 4] = zr;
    zoneColorArray[i * 4 + 1] = zg;
    zoneColorArray[i * 4 + 2] = zb;
    zoneColorArray[i * 4 + 3] = zw;
  }

  geom.setAttribute('aFollicleMask', new THREE.BufferAttribute(follicleMaskArray, 1));
  geom.setAttribute('aGroomTangent', new THREE.BufferAttribute(groomTangentArray, 3));
  geom.setAttribute('aZoneColor', new THREE.BufferAttribute(zoneColorArray, 4));

  return geom;
}

// =============================================================================
// FACIAL FEATURES BUILDER (Eyes Only vs Eyes+Nose vs Eyes+Beak vs Full Face)
// =============================================================================

function buildFacialFeatures(modelId, faceGroup, root) {
  faceGroup.renderOrder = 8;

  const c = CREATURE_COORDS[modelId] || CREATURE_COORDS.mochi;
  const eyes = [];

  const eyeMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(modelId === 'dragon' ? '#0d1a14' : (modelId === 'owlbear' ? '#140c04' : '#120d1a')),
    roughness: 0.03,
    metalness: 0.06,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    reflectivity: 1.0
  });

  const irisColor = {
    mochi: '#4d2d7c',
    kitsune: '#d97706',
    highland: '#4a2810',
    dragon: '#10b981',
    bunny: '#8b5cf6',
    owlbear: '#f59e0b',
    teddy: '#2b1810'
  }[modelId] || '#4d2d7c';

  const irisMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(irisColor) });
  const highlightMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffffff') });
  const warmHighlightMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffe4f2') });

  const eyeScale = modelId === 'owlbear' ? [1.16, 1.16, 0.72] : (modelId === 'bunny' ? [1.05, 1.12, 0.68] : (modelId === 'mochi' ? [1.02, 1.14, 0.70] : [0.98, 1.08, 0.68]));

  // 1. All models have expressive, glossy 3D eyes!
  for (const side of [-1, 1]) {
    const eyePivot = new THREE.Group();
    eyePivot.position.set(side * c.eyeX, c.eyeY, c.eyeZ);
    eyePivot.rotation.y = side * 0.22;
    eyePivot.renderOrder = 8;

    const eyeballGeo = new THREE.SphereGeometry(0.18, 32, 24);
    eyeballGeo.scale(...eyeScale);
    const eyeball = new THREE.Mesh(eyeballGeo, eyeMaterial);
    eyeball.renderOrder = 8;
    eyePivot.add(eyeball);

    // Iris
    const irisGeo = new THREE.SphereGeometry(0.13, 24, 16);
    if (modelId === 'dragon') {
      irisGeo.scale(0.42, 1.15, 0.38); // Reptilian vertical slit pupil
    } else {
      irisGeo.scale(0.92, 0.95, 0.38);
    }
    const iris = new THREE.Mesh(irisGeo, irisMaterial);
    iris.position.set(0, -0.015, 0.095);
    iris.renderOrder = 9;
    eyePivot.add(iris);

    // Round pupil
    if (modelId !== 'dragon') {
      const pupilGeo = new THREE.SphereGeometry(0.065, 18, 12);
      pupilGeo.scale(0.9, 0.95, 0.35);
      const pupil = new THREE.Mesh(pupilGeo, new THREE.MeshBasicMaterial({ color: '#000000' }));
      pupil.position.set(0, -0.015, 0.125);
      pupil.renderOrder = 10;
      eyePivot.add(pupil);
    }

    // Catchlights
    const catchlightMainGeo = new THREE.SphereGeometry(0.048, 16, 12);
    catchlightMainGeo.scale(1.0, 1.18, 0.32);
    const catchlightMain = new THREE.Mesh(catchlightMainGeo, highlightMat);
    catchlightMain.position.set(-side * 0.042, 0.052, 0.125);
    catchlightMain.renderOrder = 11;
    eyePivot.add(catchlightMain);

    const catchlightSubGeo = new THREE.SphereGeometry(0.024, 14, 10);
    catchlightSubGeo.scale(1.0, 1.0, 0.32);
    const catchlightSub = new THREE.Mesh(catchlightSubGeo, warmHighlightMat);
    catchlightSub.position.set(side * 0.048, -0.052, 0.122);
    catchlightSub.renderOrder = 11;
    eyePivot.add(catchlightSub);

    faceGroup.add(eyePivot);
    eyes.push({ pivot: eyePivot, basePos: eyePivot.position.clone(), catchlightMain, catchlightSub, side });
  }

  // 2. Rosy Cheek Blush (for Mochi, Bunny, Kitsune)
  const hasBlush = modelId === 'mochi' || modelId === 'bunny' || modelId === 'kitsune';
  const blushMat = hasBlush ? new THREE.MeshBasicMaterial({ color: new THREE.Color('#ff5c93'), transparent: true, opacity: 0.55, depthWrite: false }) : null;
  const blushes = [];
  if (hasBlush) {
    for (const side of [-1, 1]) {
      const blushGeo = new THREE.SphereGeometry(0.12, 20, 16);
      blushGeo.scale(1.35, 0.72, 0.35);
      const blush = new THREE.Mesh(blushGeo, blushMat);
      blush.position.set(side * (c.eyeX + 0.18), c.eyeY - 0.16, c.eyeZ + 0.02);
      blush.rotation.y = side * 0.32;
      blush.renderOrder = 8;
      faceGroup.add(blush);
      blushes.push(blush);
    }
  }

  // 3. Selective Noses / Horns / Beaks (NOT on Mochi which is Eyes Only!)
  let beakMesh = null;
  switch (modelId) {
    case 'mochi': {
      // EYES ONLY: Pure plush cloud critter with expressive anime eyes & glowing blush!
      break;
    }
    case 'bunny': {
      // Eyes & Nose: Cute pink cleft nose & long floppy lop ears with baby-pink inner lining
      const noseGeo = new THREE.ConeGeometry(0.045, 0.058, 14);
      noseGeo.scale(1.25, 0.85, 0.75);
      const noseMesh = new THREE.Mesh(noseGeo, new THREE.MeshPhysicalMaterial({ color: '#f472b6', roughness: 0.25, clearcoat: 0.7 }));
      noseMesh.position.set(c.noseX, c.noseY, c.noseZ);
      noseMesh.rotation.x = Math.PI * 0.5;
      noseMesh.renderOrder = 9;
      faceGroup.add(noseMesh);

      const cleftGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.04, 6);
      const cleft = new THREE.Mesh(cleftGeo, new THREE.MeshBasicMaterial({ color: '#be185d' }));
      cleft.position.set(c.noseX, c.noseY - 0.025, c.noseZ + 0.01);
      cleft.renderOrder = 10;
      faceGroup.add(cleft);

      // Long heavy floppy lop ears
      for (const side of [-1, 1]) {
        const earGroup = new THREE.Group();
        earGroup.position.set(side * 0.62, 0.42, 0.08);
        earGroup.rotation.z = side * 0.15;
        earGroup.renderOrder = 8;

        const earCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(side * 0.16, -0.22, 0.04),
          new THREE.Vector3(side * 0.24, -0.52, 0.08),
          new THREE.Vector3(side * 0.20, -0.78, 0.12),
          new THREE.Vector3(side * 0.12, -0.98, 0.10)
        ]);
        const earGeo = createTaperedTube(earCurve, 24, 0.13, 0.075, 14);
        const earMesh = new THREE.Mesh(earGeo, new THREE.MeshStandardMaterial({ color: '#54413b', roughness: 0.82 }));
        earMesh.renderOrder = 8;
        earGroup.add(earMesh);

        // Soft pink inner ear hollow lining
        const innerCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(side * 0.04, -0.12, 0.06),
          new THREE.Vector3(side * 0.18, -0.38, 0.10),
          new THREE.Vector3(side * 0.16, -0.68, 0.12)
        ]);
        const innerGeo = createTaperedTube(innerCurve, 16, 0.08, 0.04, 12);
        const innerMesh = new THREE.Mesh(innerGeo, new THREE.MeshBasicMaterial({ color: '#fbcfe8' }));
        innerMesh.renderOrder = 9;
        earGroup.add(innerMesh);

        faceGroup.add(earGroup);
      }
      break;
    }
    case 'highland': {
      // Eyes & Muzzle: Inward curved horns, droopy furry ears, damp cow muzzle pad & nostrils
      const muzzleMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#4c2e22'),
        roughness: 0.35,
        clearcoat: 0.7,
        clearcoatRoughness: 0.15
      });
      const muzzleGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.16, 24);
      muzzleGeo.scale(1.65, 0.88, 1.15);
      const muzzle = new THREE.Mesh(muzzleGeo, muzzleMat);
      muzzle.position.set(c.noseX, c.noseY, c.noseZ);
      muzzle.rotation.x = Math.PI * 0.36;
      muzzle.renderOrder = 9;
      faceGroup.add(muzzle);

      // Philtrum vertical groove
      const philtrumGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.14, 8);
      const philtrum = new THREE.Mesh(philtrumGeo, new THREE.MeshBasicMaterial({ color: '#25140d' }));
      philtrum.position.set(0, c.noseY, c.noseZ + 0.11);
      philtrum.rotation.x = Math.PI * 0.36;
      philtrum.renderOrder = 10;
      faceGroup.add(philtrum);

      // Deep sculpted nostril cavities with dark interiors
      for (const side of [-1, 1]) {
        const nostril = new THREE.Mesh(
          new THREE.SphereGeometry(0.044, 16, 12),
          new THREE.MeshBasicMaterial({ color: '#160a04' })
        );
        nostril.scale.set(1.4, 0.75, 0.45);
        nostril.position.set(side * 0.16, c.noseY + 0.02, c.noseZ + 0.10);
        nostril.renderOrder = 10;
        faceGroup.add(nostril);
      }

      // Elegant inward-curved Scottish Highland horns!
      for (const side of [-1, 1]) {
        const hornCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(side * 0.44, 0.60, 0.05),
          new THREE.Vector3(side * 0.70, 0.72, 0.08),
          new THREE.Vector3(side * 0.84, 0.94, 0.04),
          new THREE.Vector3(side * 0.74, 1.14, -0.02),
          new THREE.Vector3(side * 0.54, 1.22, -0.06)
        ]);
        const hornGeo = createTaperedTube(hornCurve, 28, 0.082, 0.014, 16);
        const hornMat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#f0e6ce'),
          roughness: 0.28,
          metalness: 0.04,
          clearcoat: 0.5,
          clearcoatRoughness: 0.2
        });
        const hornMesh = new THREE.Mesh(hornGeo, hornMat);
        hornMesh.renderOrder = 9;
        faceGroup.add(hornMesh);

        // Horn growth rings at base
        const ringGeo = new THREE.TorusGeometry(0.086, 0.018, 10, 20);
        const ringMesh = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({ color: '#543b23', roughness: 0.6 }));
        ringMesh.position.set(side * 0.45, 0.61, 0.05);
        ringMesh.rotation.y = side * 0.35;
        ringMesh.rotation.z = -side * 0.5;
        ringMesh.renderOrder = 9;
        faceGroup.add(ringMesh);

        // Droopy furry calf ears under horns
        const earGroup = new THREE.Group();
        earGroup.position.set(side * 0.68, 0.44, 0.06);
        earGroup.rotation.z = side * 0.45;
        earGroup.rotation.y = side * 0.32;
        earGroup.rotation.x = -0.15;

        const outerEarGeo = new THREE.SphereGeometry(0.18, 18, 14);
        outerEarGeo.scale(1.3, 0.58, 0.45);
        const outerEar = new THREE.Mesh(outerEarGeo, new THREE.MeshStandardMaterial({ color: '#56270b', roughness: 0.8 }));
        outerEar.renderOrder = 8;
        earGroup.add(outerEar);

        const innerEarGeo = new THREE.SphereGeometry(0.14, 16, 12);
        innerEarGeo.scale(1.15, 0.45, 0.25);
        const innerEar = new THREE.Mesh(innerEarGeo, new THREE.MeshBasicMaterial({ color: '#e8a598' }));
        innerEar.position.set(0, 0, 0.06);
        innerEar.renderOrder = 9;
        earGroup.add(innerEar);

        faceGroup.add(earGroup);
      }
      break;
    }
    case 'dragon': {
      // Eyes & Horns: Nostril pits + swept-back ribbed horns + scalloped fin ears
      for (const side of [-1, 1]) {
        const n = new THREE.Mesh(new THREE.SphereGeometry(0.032, 14, 10), new THREE.MeshBasicMaterial({ color: '#160806' }));
        n.scale.set(0.75, 1.35, 0.5);
        n.position.set(side * 0.08, c.noseY, c.noseZ);
        n.renderOrder = 10;
        faceGroup.add(n);
      }

      for (const side of [-1, 1]) {
        const dragonHornCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(side * 0.32, 0.70, -0.12),
          new THREE.Vector3(side * 0.44, 0.92, -0.36),
          new THREE.Vector3(side * 0.48, 1.12, -0.65),
          new THREE.Vector3(side * 0.40, 1.25, -0.92)
        ]);
        const hornGeo = createTaperedTube(dragonHornCurve, 28, 0.088, 0.014, 16);
        const hornMat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#fdf2f0'),
          roughness: 0.18,
          clearcoat: 0.95,
          clearcoatRoughness: 0.08
        });
        const horn = new THREE.Mesh(hornGeo, hornMat);
        horn.renderOrder = 9;
        faceGroup.add(horn);

        // Decorative ribbed horn rings
        for (let r = 0; r < 3; r++) {
          const tRing = 0.22 + r * 0.24;
          const pt = dragonHornCurve.getPointAt(tRing);
          const ringGeo = new THREE.TorusGeometry(0.075 * (1.0 - tRing * 0.6), 0.014, 8, 16);
          const ring = new THREE.Mesh(ringGeo, new THREE.MeshPhysicalMaterial({ color: '#fb923c', roughness: 0.2, clearcoat: 0.8 }));
          ring.position.copy(pt);
          ring.lookAt(dragonHornCurve.getPointAt(tRing + 0.05));
          ring.renderOrder = 10;
          faceGroup.add(ring);
        }

        // Scalloped webbed fin ears
        const earGroup = new THREE.Group();
        earGroup.position.set(side * 0.72, 0.38, 0.08);
        earGroup.rotation.y = side * 0.42;
        earGroup.rotation.z = -side * 0.25;
        earGroup.renderOrder = 9;

        for (let r = 0; r < 3; r++) {
          const angle = -0.45 + r * 0.45;
          const rayLen = 0.32 - Math.abs(r - 1) * 0.05;
          const rayGeo = new THREE.ConeGeometry(0.018, rayLen, 10);
          rayGeo.translate(0, rayLen * 0.5, 0);
          const ray = new THREE.Mesh(rayGeo, new THREE.MeshPhysicalMaterial({ color: '#f87171', roughness: 0.3, clearcoat: 0.8 }));
          ray.rotation.z = side * angle;
          ray.renderOrder = 9;
          earGroup.add(ray);
        }

        const webGeo = new THREE.CircleGeometry(0.28, 16, 0, Math.PI * 0.75);
        webGeo.scale(side, 1.0, 1.0);
        const webMat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#fca5a5'),
          roughness: 0.35,
          transmission: 0.4,
          opacity: 0.82,
          transparent: true,
          side: THREE.DoubleSide
        });
        const web = new THREE.Mesh(webGeo, webMat);
        web.position.set(0, 0.04, 0.01);
        web.renderOrder = 9;
        earGroup.add(web);

        faceGroup.add(earGroup);
      }
      break;
    }
    case 'owlbear': {
      // Eyes & Beak: Concentric 3D feather discs around eyes, hooked raptor beak, brow tufts
      for (const side of [-1, 1]) {
        const discGroup = new THREE.Group();
        discGroup.position.set(side * c.eyeX, c.eyeY, c.eyeZ - 0.02);
        discGroup.rotation.y = side * 0.22;
        discGroup.renderOrder = 7;

        // Inner cream ring
        const innerRingGeo = new THREE.TorusGeometry(0.21, 0.022, 12, 28);
        const innerRing = new THREE.Mesh(innerRingGeo, new THREE.MeshStandardMaterial({ color: '#f5edd6', roughness: 0.7 }));
        innerRing.renderOrder = 7;
        discGroup.add(innerRing);

        // Mid ochre ring
        const midRingGeo = new THREE.TorusGeometry(0.26, 0.028, 12, 32);
        const midRing = new THREE.Mesh(midRingGeo, new THREE.MeshStandardMaterial({ color: '#d97706', roughness: 0.65 }));
        midRing.renderOrder = 7;
        discGroup.add(midRing);

        // Outer dark plumage rim
        const outerRingGeo = new THREE.TorusGeometry(0.32, 0.032, 12, 36);
        const outerRing = new THREE.Mesh(outerRingGeo, new THREE.MeshStandardMaterial({ color: '#140c06', roughness: 0.85 }));
        outerRing.renderOrder = 7;
        discGroup.add(outerRing);

        // Owl feather horn tufts on top brow
        const tuftGeo = new THREE.ConeGeometry(0.045, 0.24, 12);
        tuftGeo.scale(1.2, 1.0, 0.4);
        const tuft = new THREE.Mesh(tuftGeo, new THREE.MeshStandardMaterial({ color: '#2b1b11', roughness: 0.8 }));
        tuft.position.set(side * 0.08, 0.32, 0.02);
        tuft.rotation.z = -side * 0.38;
        tuft.rotation.x = -0.15;
        tuft.renderOrder = 8;
        discGroup.add(tuft);

        faceGroup.add(discGroup);
      }

      // Hooked raptor beak
      const beakCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(c.noseX, c.noseY + 0.12, c.noseZ - 0.05),
        new THREE.Vector3(c.noseX, c.noseY + 0.04, c.noseZ + 0.08),
        new THREE.Vector3(c.noseX, c.noseY - 0.06, c.noseZ + 0.14),
        new THREE.Vector3(c.noseX, c.noseY - 0.18, c.noseZ + 0.11)
      ]);
      const beakGeo = createTaperedTube(beakCurve, 20, 0.068, 0.012, 14);
      beakMesh = new THREE.Mesh(beakGeo, new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#101014'),
        roughness: 0.14,
        clearcoat: 0.92,
        clearcoatRoughness: 0.06
      }));
      beakMesh.renderOrder = 9;
      faceGroup.add(beakMesh);
      break;
    }
    case 'kitsune': {
      // Full Face: White 3D eyebrow spots, sculpted cream muzzle wedge, tiered cheek ruffs, nose & smiling mouth
      for (const side of [-1, 1]) {
        const browGeo = new THREE.SphereGeometry(0.055, 16, 12);
        browGeo.scale(1.25, 0.85, 0.45);
        const brow = new THREE.Mesh(browGeo, new THREE.MeshBasicMaterial({ color: '#ffffff' }));
        brow.position.set(side * (c.eyeX - 0.04), c.eyeY + 0.22, c.eyeZ + 0.02);
        brow.rotation.z = -side * 0.18;
        brow.renderOrder = 10;
        faceGroup.add(brow);
      }

      const muzzleWedgeGeo = new THREE.ConeGeometry(0.18, 0.36, 18);
      muzzleWedgeGeo.scale(1.3, 0.72, 1.0);
      const muzzleWedge = new THREE.Mesh(muzzleWedgeGeo, new THREE.MeshStandardMaterial({ color: '#fffbf5', roughness: 0.85 }));
      muzzleWedge.position.set(c.noseX, c.noseY - 0.04, c.noseZ - 0.12);
      muzzleWedge.rotation.x = Math.PI * 0.52;
      muzzleWedge.renderOrder = 8;
      faceGroup.add(muzzleWedge);

      for (const side of [-1, 1]) {
        const ruffGroup = new THREE.Group();
        ruffGroup.position.set(side * 0.74, 0.0, 0.48);
        ruffGroup.rotation.y = side * 0.55;
        ruffGroup.renderOrder = 8;
        for (let t = 0; t < 3; t++) {
          const tuftGeo = new THREE.ConeGeometry(0.05, 0.22 - t * 0.03, 10);
          tuftGeo.scale(1.4, 1.0, 0.5);
          const tuft = new THREE.Mesh(tuftGeo, new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.85 }));
          tuft.position.set(0, (t - 1) * 0.09, 0);
          tuft.rotation.z = side * (0.65 - t * 0.2);
          ruffGroup.add(tuft);
        }
        faceGroup.add(ruffGroup);
      }

      const noseMat = new THREE.MeshPhysicalMaterial({ color: '#111111', roughness: 0.12, clearcoat: 0.9 });
      const noseGeo = new THREE.SphereGeometry(0.048, 16, 12);
      noseGeo.scale(1.3, 0.85, 1.0);
      const noseMesh = new THREE.Mesh(noseGeo, noseMat);
      noseMesh.position.set(c.noseX, c.noseY, c.noseZ);
      noseMesh.renderOrder = 9;
      faceGroup.add(noseMesh);
      break;
    }
    case 'teddy': {
      // Full Face: Biscuit-beige muzzle dome + stitched nose & philtrum + round cup ears + smiling mouth
      const muzzleMat = new THREE.MeshStandardMaterial({ color: '#cf9c6b', roughness: 0.78 });
      const muzzleGeo = new THREE.SphereGeometry(0.24, 24, 20);
      muzzleGeo.scale(1.42, 1.05, 0.92);
      const muzzle = new THREE.Mesh(muzzleGeo, muzzleMat);
      muzzle.position.set(c.noseX, c.noseY - 0.07, c.noseZ - 0.08);
      muzzle.renderOrder = 9;
      faceGroup.add(muzzle);

      const noseGeo = new THREE.SphereGeometry(0.058, 16, 12);
      noseGeo.scale(1.4, 0.82, 0.65);
      const noseMesh = new THREE.Mesh(noseGeo, new THREE.MeshPhysicalMaterial({ color: '#1a0c06', roughness: 0.25, clearcoat: 0.6 }));
      noseMesh.position.set(c.noseX, c.noseY, c.noseZ + 0.02);
      noseMesh.renderOrder = 10;
      faceGroup.add(noseMesh);

      const stitchGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.075, 8);
      const stitch = new THREE.Mesh(stitchGeo, new THREE.MeshBasicMaterial({ color: '#2a1208' }));
      stitch.position.set(c.noseX, c.noseY - 0.045, c.noseZ + 0.02);
      stitch.renderOrder = 10;
      faceGroup.add(stitch);

      for (const side of [-1, 1]) {
        const earGroup = new THREE.Group();
        earGroup.position.set(side * 0.58, 0.82, 0.08);
        earGroup.rotation.y = side * 0.25;
        earGroup.renderOrder = 8;

        const outerCupGeo = new THREE.SphereGeometry(0.18, 18, 14);
        outerCupGeo.scale(1.0, 1.0, 0.55);
        const outerCup = new THREE.Mesh(outerCupGeo, new THREE.MeshStandardMaterial({ color: '#452310', roughness: 0.85 }));
        earGroup.add(outerCup);

        const innerCupGeo = new THREE.SphereGeometry(0.13, 16, 12);
        innerCupGeo.scale(0.9, 0.9, 0.35);
        const innerCup = new THREE.Mesh(innerCupGeo, new THREE.MeshBasicMaterial({ color: '#cf9c6b' }));
        innerCup.position.set(0, 0, 0.05);
        innerCup.renderOrder = 9;
        earGroup.add(innerCup);

        faceGroup.add(earGroup);
      }
      break;
    }
  }

  // 4. Interactive Smiling Mouth Component (Only for Kitsune and Teddy!)
  const hasMouth = modelId === 'kitsune' || modelId === 'teddy';
  let mouthGroup = null;
  let mouthOpenGroup = null;
  const mouthArcs = [];

  if (hasMouth && c.mouthZ) {
    mouthGroup = new THREE.Group();
    mouthGroup.position.set(c.mouthX, c.mouthY, c.mouthZ);
    mouthGroup.renderOrder = 9;

    const mouthMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#3a102e') });
    for (const side of [-1, 1]) {
      const arcGeo = new THREE.TorusGeometry(0.046, 0.013, 10, 20, Math.PI * 0.92);
      const arc = new THREE.Mesh(arcGeo, mouthMat);
      arc.position.set(side * 0.043, 0, 0);
      arc.rotation.x = Math.PI + 0.15;
      arc.rotation.y = side * 0.14;
      arc.renderOrder = 9;
      mouthGroup.add(arc);
      mouthArcs.push({ mesh: arc, side });
    }

    mouthOpenGroup = new THREE.Group();
    mouthOpenGroup.position.set(0, -0.02, 0.005);
    mouthOpenGroup.scale.set(0.001, 0.001, 0.001);
    mouthOpenGroup.renderOrder = 10;

    const cavityGeo = new THREE.SphereGeometry(0.055, 16, 12);
    cavityGeo.scale(1.15, 0.85, 0.4);
    const cavityMesh = new THREE.Mesh(cavityGeo, new THREE.MeshBasicMaterial({ color: '#2a0c16' }));
    cavityMesh.renderOrder = 10;
    mouthOpenGroup.add(cavityMesh);

    const tongueGeo = new THREE.SphereGeometry(0.034, 14, 10);
    tongueGeo.scale(1.1, 0.7, 0.4);
    const tongueMesh = new THREE.Mesh(tongueGeo, new THREE.MeshBasicMaterial({ color: '#ff6b91' }));
    tongueMesh.position.set(0, -0.016, 0.02);
    tongueMesh.renderOrder = 11;
    mouthOpenGroup.add(tongueMesh);

    mouthGroup.add(mouthOpenGroup);
    faceGroup.add(mouthGroup);
  }

  return {
    eyes,
    blushes,
    blushMat,
    beakMesh,
    mouthArcs,
    mouthOpenGroup,
    mouthGroup,
    baseMouthY: c.mouthY || 0
  };
}

// =============================================================================
// MAIN CREATURE FACTORY
// =============================================================================

export function createCreature(modelId = 'mochi') {
  const modelMeta = CREATURE_MODELS.find(m => m.id === modelId) || CREATURE_MODELS[0];
  const root = new THREE.Group();
  root.name = `Creature_${modelMeta.id}`;

  const bodyGeometry = createCreatureGeometry(modelMeta.id, 96, 72);

  const skinMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(modelMeta.defaultSettings.skinColor || '#332233'),
    roughness: 0.78,
    metalness: 0.02
  });

  const bodyMesh = new THREE.Mesh(bodyGeometry, skinMaterial);
  bodyMesh.name = `CreatureBodyMesh_${modelMeta.id}`;
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  root.add(bodyMesh);

  const faceGroup = new THREE.Group();
  faceGroup.name = 'FacialFeatures';
  root.add(faceGroup);

  const facialAnim = buildFacialFeatures(modelMeta.id, faceGroup, root);

  const animState = {
    time: 0,
    baseScale: 1.0,
    baseX: 0.0,
    baseY: 0.0,
    baseZ: 0.0,
    blinkTimer: 0,
    nextBlink: 2.8,
    boopImpulse: 0,
    boopPhase: 0,
    smileProgress: 0,
    prevPosition: new THREE.Vector3(),
    velocity: new THREE.Vector3(),
    angularVelocity: new THREE.Vector3(),
    targetLook: new THREE.Vector2(0, 0),
    currentLook: new THREE.Vector2(0, 0)
  };

  const anchorPos = new THREE.Vector3(0, 0, 0);
  const targetAnchorPos = new THREE.Vector3(0, 0, 0);
  const startAnchorPos = new THREE.Vector3(0, 0, 0);
  let isPlaced = false;
  let isPlacing = false;
  let placeProgress = 1.0;
  let placeHopHeight = 0.0;
  let facingYaw = 0.0;
  let facingPitch = 0.0;
  let targetFacingYaw = 0.0;
  let targetFacingPitch = 0.0;
  let faceViewerHoldTimer = 0.0;

  function placeAt(targetWorldPos, normal, animate = true, cameraPos = null) {
    if (!targetWorldPos) return;
    isPlaced = true;
    const s = animState.baseScale;
    const targetCenterY = targetWorldPos.y + 0.94 * s;
    animState.targetLook.set(0, 0);
    animState.currentLook.set(0, 0);
    faceViewerHoldTimer = 1.4;

    if (cameraPos) {
      const dx = cameraPos.x - targetWorldPos.x;
      const dy = cameraPos.y - targetCenterY;
      const dz = cameraPos.z - targetWorldPos.z;
      const horizDist = Math.max(0.001, Math.hypot(dx, dz));
      targetFacingYaw = Math.atan2(dx, dz);
      targetFacingPitch = -Math.atan2(dy, horizDist) * 0.72;
      if (!animate) {
        facingYaw = targetFacingYaw;
        facingPitch = targetFacingPitch;
      }
    }

    if (animate) {
      startAnchorPos.copy(anchorPos);
      targetAnchorPos.set(targetWorldPos.x, targetCenterY, targetWorldPos.z);
      placeProgress = 0.0;
      isPlacing = true;
      placeHopHeight = Math.min(0.65, Math.max(0.18, startAnchorPos.distanceTo(targetAnchorPos) * 0.22));
      animState.boopImpulse = 0.85;
      animState.boopPhase = 0.0;
    } else {
      anchorPos.set(targetWorldPos.x, targetCenterY, targetWorldPos.z);
      targetAnchorPos.copy(anchorPos);
      isPlacing = false;
      placeProgress = 1.0;
    }
  }

  function resetPlacement(animate = true) {
    isPlaced = false;
    targetFacingYaw = 0.0;
    targetFacingPitch = 0.0;
    faceViewerHoldTimer = 0.0;
    animState.targetLook.set(0, 0);
    animState.currentLook.set(0, 0);
    const s = animState.baseScale;
    const ox = animState.baseX || 0.0;
    const oz = animState.baseZ || 0.0;
    const targetY = -0.94 + 0.94 * s;
    if (animate) {
      startAnchorPos.copy(anchorPos);
      targetAnchorPos.set(ox, targetY, oz);
      placeProgress = 0.0;
      isPlacing = true;
      placeHopHeight = Math.min(0.55, Math.max(0.18, startAnchorPos.distanceTo(targetAnchorPos) * 0.22));
      animState.boopImpulse = 0.85;
      animState.boopPhase = 0.0;
    } else {
      anchorPos.set(ox, targetY, oz);
      targetAnchorPos.set(ox, targetY, oz);
      startAnchorPos.set(ox, targetY, oz);
      facingYaw = 0.0;
      facingPitch = 0.0;
      isPlacing = false;
      placeProgress = 1.0;
      animState.boopImpulse = 0.0;
      animState.boopPhase = 0.0;
    }
  }

  function setEnvironmentScale(scale, offsetX = 0.0, offsetZ = 0.0) {
    const s = Number.isFinite(scale) && scale > 0 ? scale : 1.0;
    const ox = Number.isFinite(offsetX) ? offsetX : 0.0;
    const oz = Number.isFinite(offsetZ) ? offsetZ : 0.0;
    animState.baseScale = s;
    animState.baseX = ox;
    animState.baseY = -0.94 * (1.0 - s);
    animState.baseZ = oz;
    if (!isPlaced) {
      anchorPos.set(ox, -0.94 + 0.94 * s, oz);
      targetAnchorPos.copy(anchorPos);
      startAnchorPos.copy(anchorPos);
      facingYaw = 0.0;
      facingPitch = 0.0;
      targetFacingYaw = 0.0;
      targetFacingPitch = 0.0;
    }
  }

  function triggerBoop() {
    animState.boopImpulse = 1.0;
    animState.boopPhase = 0.0;
  }

  function update(dt, pointerNDC, cameraPos = null, isARMode = false, isHovered = false) {
    const safeDt = Math.min(Math.max(dt, 0.001), 0.05);
    animState.time += safeDt;

    if (faceViewerHoldTimer > 0) {
      faceViewerHoldTimer = Math.max(0, faceViewerHoldTimer - safeDt);
    }

    if (pointerNDC && faceViewerHoldTimer <= 0) {
      animState.targetLook.set(pointerNDC.x * 0.35, pointerNDC.y * 0.25);
    } else if (faceViewerHoldTimer > 0) {
      animState.targetLook.set(0, 0);
    }
    animState.currentLook.lerp(animState.targetLook, Math.min(1.0, safeDt * 7.5));

    if (animState.boopImpulse > 0.001) {
      animState.boopPhase += safeDt * 14.0;
      animState.boopImpulse *= Math.exp(-safeDt * 3.6);
    } else {
      animState.boopImpulse = 0.0;
    }

    // Interactive Hover Smile Animation
    const targetSmile = (isHovered || animState.boopImpulse > 0.15) ? 1.0 : 0.0;
    animState.smileProgress += (targetSmile - animState.smileProgress) * Math.min(1.0, safeDt * 10.0);
    const sp = animState.smileProgress;

    let hop = 0.0;
    if (isPlacing) {
      placeProgress += safeDt * 3.4;
      if (placeProgress >= 1.0) {
        placeProgress = 1.0;
        isPlacing = false;
        anchorPos.copy(targetAnchorPos);
        triggerBoop();
      } else {
        const p = placeProgress;
        anchorPos.lerpVectors(startAnchorPos, targetAnchorPos, p);
        hop = Math.sin(p * Math.PI) * placeHopHeight;
      }
    }

    if ((isPlaced || isARMode) && cameraPos) {
      const dx = cameraPos.x - anchorPos.x;
      const dy = cameraPos.y - anchorPos.y;
      const dz = cameraPos.z - anchorPos.z;
      const horizDist = Math.max(0.001, Math.hypot(dx, dz));
      targetFacingYaw = Math.atan2(dx, dz);
      targetFacingPitch = -Math.atan2(dy, horizDist) * 0.72;
    } else if (!isPlaced) {
      targetFacingYaw = 0.0;
      targetFacingPitch = 0.0;
    }

    const yawDiff = Math.atan2(Math.sin(targetFacingYaw - facingYaw), Math.cos(targetFacingYaw - facingYaw));
    facingYaw += yawDiff * Math.min(1.0, safeDt * 12.0);
    facingPitch += (targetFacingPitch - facingPitch) * Math.min(1.0, safeDt * 12.0);

    const s = animState.baseScale;
    const breath = Math.sin(animState.time * 2.3) * 0.035;
    const bodyLookScale = (isPlaced || isARMode) ? (faceViewerHoldTimer > 0 ? 0.0 : 0.06) : 1.0;
    const swayX = (Math.sin(animState.time * 1.35) * 0.06 + animState.currentLook.x * 0.15 * bodyLookScale) * s;
    const jumpY =
      (Math.sin(animState.time * 2.3) * 0.045 +
        Math.abs(Math.sin(animState.boopPhase)) * animState.boopImpulse * 0.32) *
      s;

    const squash =
      1.0 +
      breath +
      Math.cos(animState.boopPhase * 2.0) * animState.boopImpulse * 0.14;

    const prevX = root.position.x;
    const prevY = root.position.y;
    const prevZ = root.position.z;
    const prevRotZ = root.rotation.z;
    const prevRotY = root.rotation.y;

    root.position.set(
      anchorPos.x + swayX,
      anchorPos.y + jumpY + hop,
      anchorPos.z
    );
    root.scale.set((1.0 / Math.sqrt(squash)) * s, squash * s, (1.0 / Math.sqrt(squash)) * s);
    root.rotation.y = facingYaw + animState.currentLook.x * 0.38 * bodyLookScale + Math.sin(animState.time * 0.9) * (isPlaced ? 0.03 : 0.08);
    root.rotation.x = facingPitch - animState.currentLook.y * 0.22 * bodyLookScale + Math.cos(animState.time * 1.8) * (isPlaced ? 0.02 : 0.04);
    root.rotation.z = -(swayX / s) * 0.35 + Math.sin(animState.boopPhase) * animState.boopImpulse * 0.18;

    animState.velocity.set(
      (root.position.x - prevX) / (safeDt * s),
      (root.position.y - prevY) / (safeDt * s),
      (root.position.z - prevZ) / (safeDt * s)
    );
    animState.angularVelocity.set(
      0,
      (root.rotation.y - prevRotY) / safeDt,
      (root.rotation.z - prevRotZ) / safeDt
    );

    // Blinking
    animState.blinkTimer += safeDt;
    let blinkScaleY = 1.0;
    if (animState.blinkTimer > animState.nextBlink) {
      const blinkProgress = (animState.blinkTimer - animState.nextBlink) / 0.16;
      if (blinkProgress < 1.0) {
        blinkScaleY = Math.max(0.08, Math.abs(Math.cos(blinkProgress * Math.PI)));
      } else {
        animState.blinkTimer = 0;
        animState.nextBlink = 2.4 + Math.random() * 2.5;
      }
    }
    if (animState.boopImpulse > 0.25) {
      blinkScaleY = Math.min(blinkScaleY, 0.18);
    }

    // 1. Eye tracking & happy squint
    const happyEyeSquint = 1.0 - sp * 0.26;
    for (const eye of facialAnim.eyes) {
      eye.pivot.scale.y = blinkScaleY * happyEyeSquint;
      eye.catchlightMain.position.x = -eye.side * 0.042 + animState.currentLook.x * 0.028;
      eye.catchlightMain.position.y = 0.052 + animState.currentLook.y * 0.025;
      eye.catchlightMain.scale.setScalar(1.0 + sp * 0.22);
    }

    // 2. Interactive Smiling Mouth (if present on this model)
    if (facialAnim.mouthOpenGroup) {
      const openS = Math.max(0.001, sp * 1.15);
      facialAnim.mouthOpenGroup.scale.set(openS, openS, openS);
    }
    for (const arcData of facialAnim.mouthArcs) {
      arcData.mesh.rotation.z = arcData.side * (0.08 + sp * 0.28);
    }
    if (facialAnim.mouthGroup) {
      facialAnim.mouthGroup.position.y = facialAnim.baseMouthY + sp * 0.015;
    }

    // 3. Beak chirp animation on hover (for Owlbear)
    if (facialAnim.beakMesh) {
      facialAnim.beakMesh.rotation.x = Math.PI * 0.58 + sp * 0.12;
    }

    // 4. Cheeks blush glow when smiling
    for (const blush of facialAnim.blushes) {
      blush.scale.setScalar(1.0 + sp * 0.28);
    }
    if (facialAnim.blushMat) {
      facialAnim.blushMat.opacity = 0.52 + sp * 0.35;
    }
  }

  function dispose() {
    root.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    });
  }

  return {
    meta: modelMeta,
    root,
    bodyMesh,
    bodyGeometry,
    skinMaterial,
    animState,
    evaluateFollicleMask: (x, y, z) => evaluateFollicleMaskFor(modelMeta.id, x, y, z),
    evaluateGroomFlow: (x, y, z, nx, ny, nz) => evaluateGroomFlowFor(modelMeta.id, x, y, z, nx, ny, nz),
    setEnvironmentScale,
    triggerBoop,
    placeAt,
    resetPlacement,
    isPlaced: () => isPlaced,
    getAnchorPosition: () => anchorPos,
    update,
    dispose
  };
}
