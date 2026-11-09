# Cursor-Reactive 3D GPU Fur Simulation

An interactive 3D WebGL2 / GPGPU fur physics and Marschner hair shading simulation built with Three.js. Features 7 fully procedural 3D creature models with cursor-reactive fur combing, eye tracking, boop squish dynamics, and interactive smiling facial animations.

## ✨ Features

- **100% Procedural 3D Models:** No external 3D files (GLTF/OBJ) required. All meshes, shapes, and facial features are dynamically sculpted in code.
- **7 Unique Creatures with Diverse Facial Anatomies:**
  - 🌸 **Mochi-Puff (Eyes Only):** Mysterious plush cloud critter with huge expressive glossy anime eyes and glowing cheek blush—no nose or mouth.
  - 🐰 **Lop Bunny (Eyes & Nose):** Chubby cheeks, long floppy lop ears, doe eyes, and a cute pink Y-cleft nose button.
  - 🐮 **Highland Calf (Eyes & Muzzle):** Broad head, horn nubs, shaggy forehead bangs, doe eyes, and a wide damp cow muzzle with nostrils.
  - 🐉 **Dragon Baby (Eyes & Horns):** Luminous reptilian slit eyes, swept-back horns, nostril pits, and wing-nubs.
  - 🦉 **Forest Owlbear (Eyes & Beak):** Giant amber eyes inside facial feather discs and a hooked raptor beak that chirps on hover.
  - 🦊 **Kitsune Fox (Full Face):** Alert pointed fox ears, almond eyes, black nose button, and an interactive smiling mouth that opens with a pink tongue on hover.
  - 🐻 **Plush Teddy (Full Face):** Round cup bear ears, dark glass button eyes, stitched snout pad, and an interactive smiling mouth on hover.
- **Cursor & Mouse Interactivity:**
  - **Pet & Comb:** Dragging the cursor grooms and parts the fur in real time based on pointer velocity.
  - **Interactive Facial Expressions on Hover:**
    - On full-face models (Kitsune, Teddy), hovering causes the mouth to curve into a happy beaming smile and open with a cute pink tongue!
    - On eyes-only / minimal models (Mochi, Bunny, Calf, Dragon, Owlbear), hovering squints the eyes into happy joyful crescents `(^‿^)`, sparks the catchlights, blooms cheek blush, or chirps the beak!
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
