---
layout: page
title: Semantically Cohesive Word Grouping in Indic Languages
description: Word-grouping strategy for cross-lingual syntactic alignment in Indic NLP, improving decomposed machine translation across five Hindi-to-Indic language pairs.
img: assets/img/projects/decomt_alignment_example.png
importance: 9
category: Core Research
---

**IIT Bombay – BharatGen (Nationwide Project)** &nbsp;|&nbsp; **Jan 2024 – May 2025**  
_Advised by [Prof. Ganesh Ramakrishnan](https://www.cse.iitb.ac.in/~ganesh/) (IIT Bombay)_

**Authors:** Adyasha Patra, N J Karthika, Nagasai Saketh Naidu, Arnab Bhattacharya, Ganesh Ramakrishnan, Chaitali Dangarikar (IIT Bombay & IIT Kanpur)

<div class="links mt-2">
  <a href="https://arxiv.org/abs/2501.03988" class="btn btn-sm z-depth-0" role="button" target="_blank">
    <i class="ai ai-arxiv"></i> arXiv Preprint
  </a>
  <a href="assets/pdf/projects/decomt_word_grouping.pdf" class="btn btn-sm z-depth-0" role="button" target="_blank">
    <i class="fa-solid fa-file-pdf"></i> Full Paper (PDF)
  </a>
</div>

Indic languages share deep syntactic similarities — SOV word order, postpositions, agglutination — yet standard NLP pipelines treat them independently, failing to exploit this structural relatedness for cross-lingual transfer. Worse, Hindi's tokenization convention (separating case-markers as standalone "words") makes it a systematic outlier: FLORES-200 Hindi sentences average **25,643 words**, nearly 6,000 more than any other Indic language in the set, even though the underlying content is equally long. This project proposes a **semantically cohesive word-grouping strategy** that merges words with their case-markers and function words into meaning-bearing chunks, unifying sub-sentential structure across Indian languages for better alignment.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/decomt_alignment_example.png" title="Word grouping example: Hindi to Sanskrit" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Alignment of parallel Hindi and Sanskrit sentences after word grouping: case-markers and function words are merged with their heads into cohesive groups, so each group in Hindi maps to a semantically equivalent group in Sanskrit — improving the granularity at which decomposed translation operates. Figure 1 from our paper.
</div>

### Method: Decomposed Machine Translation (DecoMT)

Instead of translating a full sentence in one pass, **DecoMT** translates coherent word groups independently and stitches the results together, reducing the complexity each translation step has to handle. The groups themselves are identified using dependency parses: words connected by case-marking, compounding, or auxiliary relations are merged into a single translation unit, rather than being split at arbitrary token boundaries.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/decomt_dependency_tree.png" title="Dependency-tree based word grouping" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Word groups are derived from dependency-parse structure: a head word together with its case-markers and modifiers forms one cohesive unit, rather than being treated as separate translation tokens. Figure 3 from our paper.
</div>

### Results

Fixing Hindi's word-count outlier problem directly: after grouping, Hindi drops from 25,643 to **18,980** words — now closely matching Marathi (19,046) and Bengali (19,585) instead of towering over them.

| Hindi →   | spBLEU (w/o → w/ grouping) | chrF++ (w/o → w/ grouping) |
| --------- | -------------------------- | -------------------------- |
| Malayalam | 18.9 → **19.4**            | 36.87 → **37.29**          |
| Kannada   | 19.2 → **19.5**            | 37.55 → **38.21**          |
| Sanskrit  | 4.3 → **4.7**              | 19.34 → **20.77**          |
| Bengali   | 19.3 → **19.6**            | 36.35 → **36.69**          |
| Marathi   | 14.0 → **14.6**            | 35.34 → **35.96**          |

Grouping improves both spBLEU and chrF++ on every one of five Hindi-to-Indic language pairs in few-shot DecoMT translation. We also verified the grouping intrinsically: after randomly shuffling word order in sentences (to isolate the effect of grouping from word choice), cosine similarity between shuffled Hindi and its true parallel translations consistently increased with grouping (e.g. 0.867 → 0.899 under full-sentence shuffling), showing that grouped units preserve cross-lingual semantic correspondence even when word order is scrambled.

### Why This Matters

Because the grouping is derived purely from dependency structure — not from any language-pair-specific rules — it generalizes across Indic languages that otherwise have very different tokenization conventions, making it a lightweight, reusable preprocessing step for any Hindi-centric decomposed MT pipeline in the BharatGen initiative.
