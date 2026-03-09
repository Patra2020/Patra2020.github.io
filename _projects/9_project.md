---
layout: page
title: Semantically Cohesive Word Grouping in Indic Languages
description: Novel word-grouping strategy for cross-lingual syntactic alignment in Indic NLP, improving Hindi-to-Indic MT BLEU by 3.5% — BharatGen, IIT Bombay.
importance: 5
category: Core Research
---

**IIT Bombay – BharatGen (Nationwide Project) | Jan 2024 – May 2025**  
_Advised by [Prof. Ganesh Ramakrishnan](https://www.cse.iitb.ac.in/~ganesh/) (IIT Bombay)_

Indic languages share deep syntactic similarities — SOV word order, postpositions, agglutination — yet standard NLP pipelines treat them independently, failing to exploit this structural relatedness for cross-lingual transfer. This project proposes a **novel word-grouping strategy** that identifies semantically and syntactically cohesive word clusters within sentences, unifying sub-sentential structure across Indian languages for better alignment.

The groupings are used to guide **decomposed machine translation (DecoMT)**: rather than translating a full sentence in one pass, the model translates coherent word groups independently and combines them, reducing the complexity of each translation step. Applied to Hindi-to-Indic language translation, this approach yields a **+3.5% improvement in BLEU score** over strong baselines by improving the fidelity of translated word groups and reducing error propagation across long sentences.

<div class="links mt-2">
  <a href="https://arxiv.org/abs/2501.03988" class="btn btn-sm z-depth-0" role="button" target="_blank">
    <i class="ai ai-arxiv"></i> arXiv Preprint
  </a>
</div>
