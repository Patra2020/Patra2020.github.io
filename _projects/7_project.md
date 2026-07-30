---
layout: page
title: "Team WeightWatchers: Testing the Tamper-Resistance of Open-Weight LLMs"
description: Mechanistic analysis of Llama's refusal behavior via activation patching and refusal-direction ablation — bypassing TAR safety training with an 85%+ attack success rate.
img: assets/img/projects/ww_refusal_ablation.jpeg
importance: 4
category: Advanced ML / AI
---

**LLM Security & Interpretability | UC San Diego**

**Authors:** Adyasha Patra, Sania Edlabadkar, Zhirui Xia, Stephanie Xu

**Report:** [Team WeightWatchers: Testing the Tamper-Resistance of Open-Weight LLMs (PDF)](/assets/pdf/projects/weightwatchers_tar.pdf)

Open-weight LLMs need safeguards that survive an adversary who can directly fine-tune the weights. **Tampering Attack Resistance (TAR)** is the state-of-the-art defense: a meta-learning method that trains a model to resist safety removal even after hundreds of steps of adversarial fine-tuning. We asked a simpler question — does TAR actually erase hazardous knowledge and refusal behavior, or does it just make that behavior harder to reach through gradient descent?

## Finding the Refusal Direction

We applied the **refusal-direction methodology** of Arditi et al. (2024) to `Llama3-8B-Instruct-TAR`. Using a difference-in-means estimator over residual-stream activations on harmful vs. harmless instruction sets (AdvBench, JailbreakBench, HarmBench, TDC2023, MaliciousInstruct, StrongREJECT vs. Alpaca), we computed a candidate refusal direction $r^{(l,p)} = \mu_h^{(l,p)} - \mu_s^{(l,p)}$ at every layer $l$ and token position $p$, then selected the direction with the lowest ablation refusal score after filtering out late-layer and high-KL-divergence candidates.

At inference time, ablating this direction from an activation $x$ is a simple linear projection:

$$x' = x - \hat{r}\hat{r}^{T}x$$

No weight modification, no fine-tuning — just a rank-1 subtraction applied on the fly during the forward pass.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/ww_refusal_ablation.jpeg" title="Refusal score vs. layer/position of the ablated direction" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Refusal score on harmful instructions as the refusal direction is ablated at different layers and token positions. Ablating directions from mid-network layers collapses the refusal score well below the un-intervened baseline — the model stops refusing almost entirely. (Figure from our technical report.)
</div>

## Bypassing TAR Without Any Fine-Tuning

Despite TAR being explicitly trained to resist hundreds of steps of adversarial fine-tuning, it was never trained to resist an **inference-time, representation-space** intervention. Ablating a single refusal direction achieved a **>85% attack success rate** (LlamaGuard2-assessed) on JailbreakBench, dramatically outperforming much more expensive fine-tuning-based jailbreak baselines while requiring orders of magnitude less compute:

| Condition                  | Substring-Matching ASR | LlamaGuard2 ASR |
| -------------------------- | ---------------------- | --------------- |
| Baseline (no intervention) | 22%                    | 16%             |
| k = 1 direction ablation   | **100%**               | **85%**         |
| k = 5 direction ablation   | 99%                    | 88%             |

We confirmed the direction is a genuine causal mediator of refusal — not a spurious correlate — by **steering** with it (ActAdd): adding the direction to harmless prompts _induces_ refusal, while ablating it from harmful prompts _removes_ refusal. We also verified minimal collateral damage to general capability, measuring perplexity/cross-entropy on Alpaca to confirm the intervention doesn't meaningfully degrade the model's benign language modeling.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/ww_category_success.png" title="LlamaGuard2 attack success rate by harm category" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Attack success rate by harm category (LlamaGuard2 classifier): baseline vs. ablating 1 direction vs. ablating 5 directions. Categories like economic harm, government, and privacy go from largely blocked to essentially fully bypassed.
</div>

## Neuron-Level Interventions Aren't Enough

We also tried the more surgical alternative: patching individual MLP neurons instead of the global residual-stream direction. This consistently failed to invert safety behavior in a stable way — strong neuron patches broke output coherence before they broke refusal, while weak patches left refusal intact. This asymmetry suggests that **safety in TAR-hardened models is encoded as a distributed, architecture-wide linear feature, not a small set of sparse neuronal circuits** — alignment training changes the model everywhere at once, and no single neuron is a reliable lever.

## Takeaway

TAR's "durability" claim is really a claim about robustness to **gradient-based optimization**. By intervening directly on the model's internal representations at inference time, we sidestep the optimization landscape TAR was hardened against entirely. This suggests that truly durable safety needs to defend not just against fine-tuning attacks, but against representation-space manipulation as well.

## Citation

```bibtex
@techreport{patra2025weightwatchers,
  title  = {Team WeightWatchers: Testing the Tamper-Resistance of Open-Weight LLMs},
  author = {Patra, Adyasha and Edlabadkar, Sania and Xia, Zhirui and Xu, Stephanie},
  institution = {University of California, San Diego},
  year   = {2025}
}
```
