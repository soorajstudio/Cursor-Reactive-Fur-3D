# Cursor-Reactive 3D GPU Fur Simulation

An interactive 3D WebGL2 / GPGPU fur physics and Marschner hair shading simulation built with Three.js. Features 7 fully procedural 3D creature models with cursor-reactive fur combing, eye tracking, boop squish dynamics, and interactive smiling facial animations.

## ✨ Features

- **100% Procedural 3D Models:** No external 3D files (GLTF/OBJ) required. All meshes, shapes, and facial features are dynamically sculpted in code.
- **7 Unique Creatures:**
  - 🌸 **Mochi-Puff:** Original pear blob with perky cat ears and rosy cheeks.
  - 🦊 **Kitsune Fox:** Alert pointed fox ears, tapered snout, black nose, and flared cheek whiskers.
  - 🐮 **Highland Calf:** Broad stocky head, curved horn nubs, droopy ears, and shaggy bangs.
  - 🐉 **Dragon Baby:** Chibi dragon snout, swept-back horns, wing-nubs, spine crest, and reptilian slit eyes.
  - 🐰 **Lop Bunny:** Chubby cheeks, long floppy lop ears draping downwards, Y-nose, and cotton-ball tail.
  - 🦉 **Forest Owlbear:** Concave facial feather discs, horned ear tufts, hooked beak, and wing-arms.
  - 🐻 **Plush Teddy:** Round cup bear ears, protruding stitched snout, and woolly fleece.
- **Cursor & Mouse Interactivity:**
  - **Pet & Comb:** Dragging the cursor grooms and parts the fur in real time based on pointer velocity.
  - **Interactive Smiling Face:** Hovering the cursor over the creature causes it to smile, open its mouth with a cute pink tongue, squint happily, and blush!
  - **Boop & Hop:** Clicking on the creature triggers squash & stretch physics, jump recoil, and a fur shockwave.
  - **Eye & Gaze Tracking:** Glossy anime eyes track the cursor across 3D space.
  - **360° Orbit:** Full mouse/touch camera orbit controls.
- **Dual Pipeline Fur Rendering:**
  - **WebGPU Fur Mode (Default):** 64-layer volumetric shells + 60,000 instanced tapered 3D hair strands with GPGPU Verlet physics.
  - **WebGL Mode:** Lightweight analytical spring-damper inertia.
- **Multi-Environment Support:** Studio, Sunny Meadow, Cozy Highrise, and Live AR Camera View.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/soorajstudio/Cursor-Reactive-Fur-3D.git
   cd Cursor-Reactive-Fur-3D
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start local development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000` (or `http://localhost:3001`).

## 🛠️ Tech Stack

- **Three.js** (WebGL2 & GPGPU)
- **Vite** (Dev server & bundler)
- **Custom GLSL Shaders** (Marschner/Kajiya-Kay Dual Specular, Volumetric Shells, Instanced Strands)
