---
layout: page
title: Code-Switched Speech Language Identification
description: PEFT-based multilingual speech LID with improved embedded English detection — accepted at EACL 2026 Findings.
img: assets/img/projects/codeswitch_lid_finetuning_comparison.png
importance: 3
category: Core Research
---

**IIT Bombay** &nbsp;|&nbsp; **CSALT Lab** &nbsp;|&nbsp; **Accepted at EACL 2026 Findings**  
_Advised by [Prof. Preethi Jyothi](https://www.cse.iitb.ac.in/~pjyothi/) (IIT Bombay)_

**Authors:** Adyasha Patra, Dhiraj Kumar Sah, Preethi Jyothi (IIT Bombay, India)

<div class="links mt-2">
  <a href="https://aclanthology.org/2026.findings-eacl.242/" class="btn btn-sm z-depth-0" role="button" target="_blank">
    <i class="fa-solid fa-file-lines"></i> ACL Anthology (2026.findings-eacl.242)
  </a>
</div>

In multilingual communities, speakers frequently switch between languages within a single conversation or sentence — **code-switching**. State-of-the-art spoken Language Identification (LID) models handle purely monolingual speech well, but fail on code-switched audio: specifically, they struggle to detect **English spoken with the accent of the primary (matrix) language** (Hindi-accented English, Bengali-accented English, Arabic-accented English, and so on).

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/codeswitch_lid_finetuning_comparison.png" title="Three finetuning regimes for code-switched LID" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Language identification models evaluated on a code-switched Hindi–English utterance and a monolingual Hindi utterance. Without finetuning, the model never predicts English during code-switching (top-left). Finetuning directly on code-switched data fixes this but causes English to be hallucinated even on monolingual Hindi (bottom-left). Finetuning on <i>accented English</i> instead — our proposal — identifies English only when it truly occurs (right). Figure from our EACL 2026 paper.
</div>

### The Problem with the Obvious Fix

The natural baseline — fine-tuning directly on code-switched speech — creates a trade-off: without any fine-tuning, pretrained models are confused by non-native accents and simply never predict English during code-switching; fine-tuned directly on code-switched data, the model over-corrects and starts hallucinating English even on purely monolingual native-language speech.

### Our Approach: Finetune on Accented English, Not Code-Switched Speech

Instead of finetuning on scarce, hard-to-collect code-switched audio, we finetune pretrained LID models on **small amounts of accented English audio** using **LoRA**, built on top of Meta's **Massively Multilingual Speech (MMS-LID)** model (48 Transformer layers, 126 languages). Public accent-labeled corpora — Mozilla Common Voice, Speech Accent Archive, L2-Arctic — make this data far more accessible than code-switched speech, and because we're only teaching the model what English _sounds like_ when spoken by native speakers of the matrix language, its monolingual recognition capability stays intact even with as few as **80 training utterances**.

### A Better Metric: LangRank

Standard metrics like Exact Match ignore rank order and over-prediction errors, so we introduce **LangRank (LR)** — the reciprocal average rank of a language across test samples, $LR_l = \frac{1}{N}\sum_{i=1}^N \frac{1}{r_{i,l}}$ — where a higher $LR_{en}$ on code-switched speech means better English detection, and a lower $LR_{en}$ on monolingual speech means less spurious over-prediction.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/codeswitch_langrank_tradeoff.png" title="LangRank trade-off across four language pairs" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Trade-off between code-switched English LangRank and monolingual (spurious) English LangRank across four matrix languages (Hindi, Bengali, Arabic, Mandarin). LoRA-tuned MMS (green) sits consistently closest to the ideal Oracle point, while adapter-based finetuning and baseline Whisper (red/orange) achieve high code-switched detection only by badly over-predicting English on monolingual speech. Figure from our EACL 2026 paper.
</div>

### Results Across Four Language Pairs

Evaluated on Hindi–English, Bengali–English, Arabic–English, and Mandarin–English: **LoRA on 80 accented-English samples** consistently achieves the smallest Euclidean distance to the oracle trade-off point across all four pairs, while full-adapter finetuning and baseline Whisper achieve high code-switched Exact Match only by severely over-predicting English on monolingual data. Accent alignment matters — finetuning on Hindi-accented English improved both Hindi-English _and_ Bengali-English LID (shared phonetic structure), whereas US-accented English gave virtually no improvement. The whole approach needs as few as 80 speech samples and about **4 minutes of GPU training**.

### Citation

```bibtex
@inproceedings{patra-etal-2026-improving,
    title = "Improving Language Identification for Code-Switched Speech: The Pivotal Role of Accented English",
    author = "Patra, Adyasha and Sah, Dhiraj Kumar and Jyothi, Preethi",
    booktitle = "Findings of the Association for Computational Linguistics: EACL 2026",
    year = "2026",
    publisher = "Association for Computational Linguistics",
    url = "https://aclanthology.org/2026.findings-eacl.242/"
}
```
