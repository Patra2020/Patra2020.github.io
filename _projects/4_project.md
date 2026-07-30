---
layout: page
title: ASR for Dysarthric Speech
description: Single-Utterance Test-Time Adaptation (SUTA) for Wav2Vec2, improving ASR word error rate on dysarthric speakers from the TORGO corpus.
img: assets/img/projects/suta_architecture.png
importance: 4
category: Core Research
---

**IIT Bombay – CSALT Lab**
_Advised by [Prof. Preethi Jyothi](https://www.cse.iitb.ac.in/~pjyothi/) (IIT Bombay)_

Automatic speech recognition systems such as Whisper and Wav2Vec2 achieve strong performance on standard benchmarks but degrade sharply on **pathological speech** — dysarthria, stuttering, and other speech disorders that introduce substantial variability in articulation, phonation, and speaking rate. This project studies **Single-Utterance Test-Time Adaptation (SUTA)**: a lightweight, label-free method that adapts a small subset of an ASR model's parameters _at inference time, using only the incoming utterance_, with no fine-tuning data or clinical labels required.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/suta_architecture.png" title="SUTA architecture" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  SUTA adapts a pre-trained CTC-based ASR encoder at test time on a single utterance, with no labels: it iteratively minimizes prediction entropy and class confusion, backpropagating only into the CNN feature extractor and encoder layer-norm parameters. Image: Lin et al., <a href="https://arxiv.org/abs/2203.14222" target="_blank">"Listen, Adapt, Better WER: Source-free Single-utterance Test-time Adaptation for Automatic Speech Recognition"</a> (arXiv:2203.14222), Figure 1.
</div>

<div class="links mt-2">
  <a href="{{ '/assets/pdf/projects/asr_disabilities_report.pdf' | relative_url }}" class="btn btn-sm z-depth-0" role="button" target="_blank">
    <i class="fa-solid fa-file-pdf"></i> Full Technical Report (PDF)
  </a>
</div>

### Why Test-Time Adaptation

Clinical speech data is scarce and tightly access-restricted, so large-scale fine-tuning per speaker or per disorder is rarely feasible, and models adapted to one speaker often fail to generalize to another even under the same condition. SUTA sidesteps both problems: it minimizes an **entropy loss** over the CTC output distribution (encouraging confident predictions on the current utterance) combined with a **Minimum Class Confusion (MCC)** regularizer that discourages the model from collapsing onto a narrow set of output tokens, restricting the update to the feature extractor and layer-normalization parameters so the model's core linguistic knowledge stays intact.

### Setup

We evaluate on the **TORGO** dysarthric speech corpus — 19 speakers total (8 with dysarthria across very-low/low/medium severity, 11 age-matched controls) — adapting a `facebook/wav2vec2-base-960h` `Wav2Vec2ForCTC` checkpoint with AdamW (lr = 2e-5) and comparing against zero-shot **Whisper-tiny/medium/large-v3** using Word Error Rate (WER).

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/suta_wer_vs_steps.png" title="WER vs. number of adaptation steps" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  WER drops sharply within the first few test-time adaptation iterations before plateauing — most of the SUTA gain is captured in just a handful of gradient steps per utterance, matching the trend we observe on TORGO speakers.
</div>

### Results

| Model             | F01       | F03       | M01        | M02       |
| ----------------- | --------- | --------- | ---------- | --------- |
| Whisper-tiny      | 108.0     | 61.0      | 316.0      | 341.0     |
| Whisper-medium    | 86.0      | 57.0      | 69.0       | 236.0     |
| Whisper-large-v3  | 80.0      | 45.2      | 76.0       | 81.0      |
| **SUTA (TTA-10)** | **87.05** | **49.04** | **110.12** | **86.20** |

_WER (%) on non-standard (dysarthric) TORGO speakers._

SUTA substantially closes the gap to Whisper-medium/large using only 10 unsupervised adaptation steps and no labeled data — with the largest relative gains on the smallest, cheapest-to-deploy Whisper model, and on control speakers SUTA still improves over Whisper-tiny (though the larger zero-shot models remain stronger there, since control speech already matches their training distribution). Ablating the **feature extractor update** shows it provides additional gains specifically for speakers with more severe articulatory deviation (e.g., M02), confirming that adapting low-level acoustic representations — not just layer-norm scaling — matters for the hardest cases. Across TTA step counts, nearly all of the improvement is captured within the first 3–5 adaptation steps, meaning SUTA can personalize to a new speaker with minimal per-utterance compute overhead — a key property for real-time assistive speech technology.

These findings point toward lightweight, inference-time personalization as a practical path to more inclusive, accessible ASR systems for underrepresented and pathological speech populations, without the data and privacy burden of full model fine-tuning.
