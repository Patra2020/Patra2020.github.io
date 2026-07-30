---
layout: page
title: Image to 3D Interactive Worlds
description: An agentic framework that lifts a single RGB image + text prompt into a physically simulated, editable Blender scene — UCSD CSE 252D.
img: assets/img/projects/cse252d_architecture.png
importance: 5
category: Advanced ML / AI
---

**UC San Diego — CSE 252D (Advanced Computer Vision)**

**Authors:** Adyasha Patra, Gaurav Joshi, Jay Chaudhary, Keshav Gupta

**Report:** [Image to 3D Interactive Worlds (PDF)](/assets/pdf/projects/cse252d_image_to_3d.pdf)

Generating simulation-ready 3D environments from a single image is a fundamental challenge at the intersection of computer vision and embodied AI. Instead of training a monolithic image-to-3D model, we built a **modular agentic pipeline**: a set of specialized agents that perceive, reconstruct, and physically reason about a scene, then hand off a structured representation to a Blender-based physics simulator.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/cse252d_architecture.png" title="Agentic image-to-simulation pipeline" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Overview of the proposed agentic image-to-simulation pipeline. Stage 1 agents handle semantic filtering, SAM3D-based 3D reconstruction, validation, and iterative mesh refinement. Stage 2 agents assign material properties, infer forces from the language prompt, and drive an MPM-based physics simulation engine. (Figure from our technical report.)
</div>

## Pipeline

**Stage 1 — Scene Understanding & 3D Reconstruction.** A **Semantic Relevance Agent** filters the input image down to the objects actually referenced by the prompt, invoking SAM2 for segmentation. A **3D Reconstruction Agent** (SAM3D-based) then generates object-level meshes and spatial properties, which a **Validation Agent** and **Refinement Agent** iteratively clean up — repairing overlaps, holes, and misclassifications — before the scene is committed to a centralized JSON scene representation (objects, meshes, materials, states).

**Stage 2 — Physical Reasoning & Simulation.** A **Material Classification Agent** assigns Blender-compatible physical attributes to every object — mass, friction, restitution, damping, and collision shape — rather than just a semantic material label. A **Force Inference Agent** reads the natural-language prompt to determine initial velocities and directions of motion (e.g., "drop the teddy bear and throw the plushy toward it" becomes two objects with distinct, causally linked motion states). Finally, a **Material Point Method (MPM) simulation engine** (Taichi Elements) evolves the scene forward, handling rigid-body collisions, fluids, and deformable materials in a physically consistent way.

Crucially, the output is an **editable Blender script**, not just a rendered video — users can tune mass, friction, damping, initial force, or collision shape and re-simulate without repeating the reconstruction pipeline.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/cse252d_results.png" title="Qualitative result: a stack of boxes toppling" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Given a single RGB image of a child standing beside an unstable stack of cardboard boxes, the pipeline reconstructs approximate 3D geometry and simulates the stack toppling over time (frames 1, 6, 12) — motion that is not scripted, but emerges from the physics engine acting on the reconstructed geometry.
</div>

## Results

We compared against strong image/video-generation baselines (Runway Gen-3, MOFA-Video, Pika 1.5, Kling 1.0, DragAnything, PhysGen3D) on two metrics: **PhotoReal** (visual realism) and **Align** (how well the generated scene matches the prompt's intended objects and interaction).

- Our method scores **PhotoReal = 0.410** — lower than neural video generators, which are trained end-to-end for photorealistic pixel synthesis, while we currently rely on basic Blender materials and simple lighting.
- Our method scores **Align = 0.600** — competitive with, and in some cases close to, the strongest video-generation baselines — showing the agentic pipeline reliably identifies the right objects and initializes physically sensible interactions from the prompt.

The core trade-off: our renders are less photorealistic today, but the scene is **structured, editable, and physically interpretable** — a property no pixel-only video generator offers. That controllability is the whole point: a downstream embodied agent (or a human) can inspect, tweak, and re-simulate the exact physical parameters that produced a given outcome.
