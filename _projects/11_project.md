---
layout: page
title: Convex Resource Allocation for Efficient LLM Inference
description: Formulating LLM batch scheduling as a convex fluid-flow relaxation — dual variables as interpretable, online bottleneck signals for compute vs. memory pressure.
img: assets/img/projects/cse203_dual_variables.png
importance: 6
category: Advanced ML / AI
---

**UC San Diego — CSE 203 (Convex Optimization)**

**Authors:** Adyasha Patra, Satyam Srivastava, Jay Chaudhary, Keshav Gupta

**Report:** [Convex Resource Allocation for Efficient LLM Inference (PDF)](/assets/pdf/projects/cse203_convex_llm_scheduling.pdf)

**My contribution:** implementation of the convex solver simulation using **CVXPY**, and analysis of the duality gap and slack variables across resource regimes.

LLM inference serving is a scheduling problem in disguise: a system receives many concurrent requests, each consuming a growing KV-cache footprint as it generates tokens, and at every iteration must decide which requests to admit into the batch under **two scarce resources** — compute (tokens per forward pass) and memory (KV cache capacity). Existing systems like vLLM and Orca solve the _mechanics_ of batching and memory paging extremely well, but still schedule requests via simple FCFS — they don't reason about _which_ requests to prioritize. We asked whether that admission decision itself could be posed as a convex program with a provably optimal, interpretable priority rule.

## From Discrete Scheduling to a Convex Program

We relax the binary decode/no-decode decision for each request at each timestep into a continuous **fluid-flow** variable, turning the scheduling problem into a concave utility-maximization program subject to:

- a **per-step compute constraint** (tokens processed per forward pass), and
- a **cumulative memory constraint** (total KV cache across all active requests must fit in GPU memory).

Deriving the KKT stationarity conditions of this relaxation yields a single unifying equation:

$$U'(x_{i,t}^{*}) = \lambda_t^{*} + m_{block}\sum_{s=t}^{T}\mu_s^{*}$$

Here $\lambda_t^{*}$ is the **instantaneous compute price** and $\sum_s \mu_s^{*}$ is a **cumulative future memory "mortgage."** This one equation explains two well-known scheduling heuristics as special cases: when memory is the binding constraint ($\mu_t^{*} > 0$), the optimal policy reduces to prioritizing requests with the fewest remaining tokens (**shortest-remaining-job-first**); when compute is the binding constraint ($\mu_t^{*} = 0$), it reduces to **max-min fair sharing**. The dual variables $\lambda_t, \mu_t$ act as real-time, interpretable bottleneck-detection signals that FCFS and SJF simply don't have.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/cse203_dual_variables.png" title="Dual variables across six resource regimes" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Dual variable trajectories (λ<sub>t</sub>*, μ<sub>t</sub>*) across six constructed resource regimes: underloaded, compute-bound, moderate memory, both moderate, both tight, and memory-bound. The phase transitions in μ<sub>t</sub>* visibly mark exactly when memory becomes the binding constraint — confirming the KKT-predicted regime boundaries.
</div>

## Experiments

We benchmarked the convex relaxation (solved via **CVXPY** with CLARABEL, SCS, and ECOS backends) against an FCFS baseline across six synthetic scenarios spanning the space of compute/memory tightness — from fully unconstrained to doubly-constrained.

- **Non-memory-bound regimes:** the continuous relaxation is _tight_ — solvers return zero optimality gap, confirming continuous = discrete whenever memory isn't the binding constraint.
- **Compute-bound / doubly-constrained regimes:** the convex-guided policy matches or beats FCFS/SJF throughput, achieving **~6% higher throughput**.
- **Memory-bound regime:** the one place a genuine gap appears. The fluid relaxation can't model the discrete "free the KV-cache the instant a request completes" dynamic — it instead charges memory smoothly over the whole horizon. Our interpolated memory model reduced this gap from **~100% down to 11.5%**, though a residual gap remains because a linear approximation can't fully capture that discrete reclamation event.

## Takeaway

Convex duality turns out to be a genuinely practical lens for LLM scheduling, not just a theoretical exercise: it gives provable optimality guarantees, automatically recovers the correct heuristic (SRJF vs. fair-sharing) for each resource regime, and — because it only touches the _admission_ decision — could plug into existing production engines like vLLM or Sarathi as an admission-control layer on top of their existing PagedAttention memory management, without touching the underlying system at all.
