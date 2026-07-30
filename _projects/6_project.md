---
layout: page
title: RLHF with Rewrite Feedback
description: Training reward models on synthetic rewrite-based preference datasets to align LLMs using fine-grained, edit-level human feedback signals.
img: assets/img/projects/rlhf_pipeline.png
importance: 7
category: Advanced ML / AI
---

**Reinforcement Learning from Human Feedback** &nbsp;|&nbsp; **IIT Bombay**

Standard RLHF relies on binary preference labels (response A vs. B), which provide weak supervision and are expensive to collect at scale. This project explores a richer feedback signal: **rewrite-based preferences**, where annotators improve a response directly rather than simply ranking two outputs. The delta between original and rewritten responses encodes fine-grained information about what is wrong and how to fix it.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/rlhf_pipeline.png" title="RLHF pipeline" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  The standard RLHF loop: sample completions from a tuned policy, score them with a learned reward model, and update the policy with an RL algorithm (e.g. PPO), regularized by a KL penalty against the base model. We replace binary preference labels in the reward-model training step with rewrite-derived preferences. Image: Hugging Face, <a href="https://huggingface.co/blog/rlhf" target="_blank">"Illustrating Reinforcement Learning from Human Feedback (RLHF)"</a>.
</div>

We construct **synthetic preference datasets** by prompting a strong LLM to rewrite lower-quality responses, then train a **reward model** that scores responses based on alignment with rewrite-inferred preferences. The trained reward model is used in a PPO-style RL loop to fine-tune a base LLM. This approach yields better reward signal density than binary comparisons and naturally captures edit-level feedback — connecting to broader interests in process-level supervision and reasoning-aware alignment.
