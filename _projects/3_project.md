---
layout: page
title: Code-Switched Speech Language Identification
description: PEFT-based multilingual speech LID with improved embedded English detection — accepted at EACL 2026.
importance: 3
category: Core Research
---

**IIT Bombay | CSALT Lab | Accepted at EACL 2026**
_Advised by [Prof. Preethi Jyothi](https://www.cse.iitb.ac.in/~pjyothi/) (IIT Bombay)_

**Authors:** Adyasha Patra, Dhiraj Kumar Sah, Preethi Jyothi (IIT Bombay, India)

**Accepted at:** EACL 2026 Findings | **Paper Link:** [ACL Anthology (2026.findings-eacl.242)](https://aclanthology.org/2026.findings-eacl.242/)

## Overview: The Code-Switching Dilemma

In multilingual communities, speakers frequently switch between languages within a single conversation or sentence: a phenomenon known as **code-switching**. While state-of-the-art Spoken Language Identification (LID) models perform exceptionally well on purely monolingual speech, they struggle when handling code-switched audio.

Specifically, pretrained LID models often fail to detect **English when spoken with the accent of the primary (matrix) language** (e.g., Hindi-accented English, Bengali-accented English, or Arabic-accented English).

---

## The Core Problem: Why Direct Code-Switched Finetuning Fails

When trying to teach a model to identify embedded English in code-switched speech, the obvious baseline is to finetune the model directly on code-switched speech samples. However, this leads to a critical trade-off:

1. **Failure to Act (Baseline):** Pretrained models are confused by non-native accents and fail to predict English altogether during code-switching.

2. **Language Overfitting (Direct CS Finetuning):** Finetuning on code-switched speech causes the model to "over-predict" English, incorrectly hallucinating English even when presented with purely monolingual speech in the native language.

![alt text](/assets/img/image-2.png)

_Figure 1: Language identification (LID) models are eval-
uated on a code-switched Hindi–English and a mono-
lingual Hindi utterance. (a) Without any finetuning, the
model does not predict English in a code-switched input.
(b) Finetuning on code-switched data causes English to
be mistakenly predicted, even for monolingual Hindi.
(c) Finetuning on accented English (our proposal) iden-
tifies English only when it truly occurs._

---

## Our Key Insight & Proposed Solution

Instead of finetuning on scarce, hard-to-collect code-switched audio, **we finetune pretrained LID models on small amounts of accented English audio** using **Low-Rank Adaptation (LoRA)**.

### Why Accented English?

- **More Scalable & Accessible:** Public datasets like _Mozilla Common Voice_, _Speech Accent Archive_, and _L2-Arctic_ already contain diverse, accent-labeled English audio.

- **Preserves Monolingual Capabilities:** Training on small subsets (e.g., just 80 utterances) of matrix-language-accented English teaches the model how English sounds when spoken by native speakers of that matrix language, without corrupting its ability to recognize pure monolingual speech.

We build our approach on top of Meta's **Massively Multilingual Speech (MMS-LID)** model (48 Transformer layers, covering 126 languages) using parameter-efficient fine-tuning (PEFT).

---

## Introducing `LangRank`: Beyond Traditional Metrics

Standard evaluation metrics like **Exact Match (EM)** or Accuracy evaluate whether target languages appear in the top $k$ predictions, but they fail to capture rank order and over-prediction errors:

- On code-switched speech, EM ignores predictions where English is ranked just outside the top-2.

- On monolingual speech, EM ignores spurious over-predictions of English as long as the matrix language remains #1.

To solve this, we introduce **LangRank (LR)**, a rank-based evaluation metric defined as the reciprocal average rank of a language across all test samples:

$$LR_l = \frac{1}{N} \sum_{i=1}^{N} \frac{1}{r_{i,l}}$$

- **Higher $LR_{en}$ on Code-Switched Speech** $\rightarrow$ Better English detection.

- **Lower $LR_{en}$ on Monolingual Speech** $\rightarrow$ Less spurious over-prediction / overfitting.

---

<div align="center">
  <img src="/assets/img/image-3.png" alt="alt text" width="75%">
</div>
*Figure 2: Trade-off between English LangRank (LRen)
on code-switched vs monolingual non-English speech.
Each subplot corresponds to a different matrix language
(Hi, Bn, Ar, Zh). LoRA (green) consistently achieves
the smallest Euclidean distance to the oracle (davg =
0.31)*

## Key Results Across Language Pairs

We evaluated our approach across four diverse code-switching pairs: **Hindi-English (hi-en)**, **Bengali-English (bn-en)**, **Arabic-English (ar-en)**, and **Mandarin-English (zh-en)**.

### The Code-Switched vs. Monolingual Trade-Off

### Key Findings:

1. **LoRA Strikes the Best Balance:** As shown above, models adapted with **LoRA on 80 accented English samples** achieve the closest proximity to the ideal **Oracle**.

2. **Adapters & Whisper Overfit:** Full adapter modules and baseline Whisper models achieve high Exact Match scores on code-switched data, but severely over-predict English on purely monolingual data.

3. **Accent Alignment Matters:** Finetuning on Hindi-accented English significantly improved Hindi-English and Bengali-English LID due to shared phonetic structures, whereas US-accented English provided virtually no improvement.

---

## Impact & Future Directions

This work demonstrates that **targeted parameter-efficient adaptation using accented monolingual data** is a highly effective, low-resource strategy for improving code-switched LID.

- **Data-Efficient:** Requires as few as **80 speech samples** and ~4 minutes of GPU training.

- **Future Work:** Extending to non-English code-switched pairs, exploring multi-accent mixtures, and integrating acoustic switch-point constraints.

---

## Citation

If you find our paper or metric useful in your research, please cite:

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
