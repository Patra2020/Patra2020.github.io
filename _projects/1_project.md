---
layout: page
title: Improving Reasoning of Math Prover Models
description: RL (GRPO) training pipeline for robust math-proving LLM verifiers — Qwen-3-4B, Qwen-3.5-4B, and GPT-OSS-20B — UCSD Rose-STL Lab.
img: assets/img/projects/ppo_vs_grpo.png
importance: 5
category: Core Research
---

**UCSD – Rose-STL Lab** &nbsp;|&nbsp; <span class="badge badge-warning">Ongoing Project</span>
_Advised by [Prof. Rose Yu](https://roseyu.com/) (UCSD)_

The goal of this project is to build **robust math reasoning verifiers**: models that can reliably judge whether a mathematical proof step is correct, and drive reinforcement learning for LLMs that generate proofs. Verifier quality is often the bottleneck in RL-for-reasoning pipelines — a policy can only get as good as the reward signal guiding it — so we focus on making the RL loop itself scalable and stable enough to train verifiers on real proof data at scale.

## RL Training Pipeline

I built an RL training pipeline for mathematical reasoning models using **GRPO (Group Relative Policy Optimization)**, training **Qwen-3-4B**, **Qwen-3.5-4B**, and **GPT-OSS-20B**. Unlike PPO, which requires a learned value model to estimate advantages, GRPO estimates advantages directly from the relative reward ranking within a group of sampled completions for the same prompt — removing the value model entirely and making large-scale RL for reasoning meaningfully cheaper to run.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/ppo_vs_grpo.png" title="PPO vs. GRPO" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  PPO estimates the advantage <i>A</i> using a learned value model and GAE. GRPO instead samples a group of completions {o₁, ..., o_G} per prompt and computes advantages directly from their relative rewards, removing the value model. Image: Shao et al., <a href="https://arxiv.org/abs/2402.03300" target="_blank">"DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models"</a> (arXiv:2402.03300), Figure 4.
</div>

## Making Large-Scale RL Actually Run

A large part of this project was systems engineering — getting RL training to run reliably at the scale needed for real proof data:

- **Stable multi-GPU distributed training** with gradient checkpointing, bf16 mixed precision, sequence packing, and efficient rollout generation, eliminating out-of-memory failures while supporting **80K-token contexts**.
- Built on top of **Unsloth**, **verl**, and **TRL**, which provided the fast kernels, distributed rollout/training infrastructure, and RL trainer abstractions that made training models at this scale tractable.
- **Scalable data generation pipelines** for both RL rollouts and verifier training, producing high-quality reasoning trajectories that continually improve the math prover models as training progresses.

This is an active research effort in the Rose-STL Lab — a technical report and code will be linked here as the project progresses.
