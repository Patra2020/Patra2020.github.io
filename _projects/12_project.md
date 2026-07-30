---
layout: page
title: Inverse Rendering with Gaussian Scene Representations
description: Extending single-view inverse rendering with 2D Gaussian Splatting for higher-fidelity relighting and novel view synthesis of indoor scenes — UCSD CSE 274.
img: assets/img/projects/cse274_teaser.jpeg
importance: 7
category: Advanced ML / AI
---

**UC San Diego — CSE 274 (Advanced Computer Graphics)**

**Authors:** Keshav Gupta, Adyasha Patra

**Report:** [Inverse Rendering with Gaussian Scene Representations (PDF)](/assets/pdf/projects/cse274_inverse_rendering.pdf)

Inverse rendering recovers a scene's geometry, materials, and lighting from images — the inverse of the standard graphics pipeline — so that a scene can later be relit, re-textured, or re-viewed from a new camera position. This is especially hard for indoor scenes, where lighting is complex (direct + indirect illumination), surfaces have diverse materials, and only a **sparse set of input views** is available, leaving geometry and lighting estimation badly underconstrained.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/cse274_teaser.jpeg" title="Forward vs. inverse rendering" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Inverse rendering recovers scene parameters — geometry, materials, camera, lights, textures — from a rendered image, inverting the standard forward-rendering pipeline.
</div>

## From Per-Pixel Prediction to Gaussian Scene Representations

We first re-implemented a baseline single/sparse-view inverse rendering approach that factorizes an image into intrinsic components (albedo, normals, lighting) via per-pixel neural predictions. This works, but per-pixel predictions have no notion of scene-level geometric consistency — errors and artifacts from the learned network propagate independently at every pixel.

We then **replaced the per-pixel formulation with a structured 2D Gaussian Splatting representation**, building on **InstantSplat**, a sparse-view novel-view-synthesis method. Representing the scene as 2D Gaussians (rather than 3D) lets us read a Gaussian's surface normal directly off its orientation, and each Gaussian carries albedo and illumination coefficients that are jointly optimized alongside geometry — giving us a single coherent, scene-level representation instead of independent per-pixel estimates.

## Quantitative Results

We evaluated on the **Intrinsic Images in the Wild (IIW)** benchmark, measuring **WHDR** (Weighted Human Disagreement Rate, lower = better albedo quality) and **PSNR** (reconstruction fidelity, higher = better):

| Method                        | WHDR ↓ | PSNR (reconstruction) ↑ |
| ----------------------------- | ------ | ----------------------- |
| Baseline (image as albedo)    | 0.524  | ∞ (trivial)             |
| NIR (per-pixel baseline)      | 0.409  | 20.26                   |
| **Gaussian Splatting (ours)** | 0.411  | **48.28**               |

Both methods perform comparably on albedo estimation, but the Gaussian-based representation delivers **dramatically better reconstruction fidelity** (+28 dB PSNR) — structured, scene-level representations propagate far less error than independent per-pixel predictions.

## Relighting & Novel View Synthesis

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include video.liquid path="assets/video/projects/cse274_relighting_1.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include video.liquid path="assets/video/projects/cse274_relighting_2.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
</div>
<div class="caption">
  Relighting results: swapping in novel environment maps ("Glacier," "Grace Cathedral," "Ennis-Brown House" lighting) after decomposing sparse-view images into geometry, albedo, and illumination.
</div>

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/cse274_relighting_results.png" title="Predicted image, albedo, and normal decomposition" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Decomposition of a dining-room scene into predicted image, predicted albedo, and predicted surface normals.
</div>

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include video.liquid path="assets/video/projects/cse274_envmap_interp.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
</div>
<div class="caption">
  Smooth interpolation between two environment maps (Ennis-Brown House → Banff Glacier lighting) on the Ballroom scene after adding a specular component — the model produces visually coherent renders across the full lighting transition, including under high-frequency, out-of-distribution illumination.
</div>

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include video.liquid path="assets/video/projects/cse274_novel_view_1.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include video.liquid path="assets/video/projects/cse274_novel_view_2.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true %}
  </div>
</div>
<div class="caption">
  Novel view synthesis: the rendered novel viewpoint closely matches ground truth in both structure and appearance, confirming accurate geometry and appearance recovery from sparse observations — including under combined novel-view + relighting conditions.
</div>

## Limitations & Future Work

Our current method models **direct illumination only**; artifacts in more complex lighting scenes (e.g., Grace Cathedral) trace back to a low-resolution environment map (18×36) and the lack of an indirect-lighting module, so high-contrast light sources create discrete light-patch artifacts the 2D Gaussians can't smoothly interpolate. Extending the framework with differentiable multi-bounce light transport, and tighter multi-view supervision, is a natural next step toward fully realistic indoor relighting.
