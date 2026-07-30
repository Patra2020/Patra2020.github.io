---
layout: page
title: Graph-based Retrieval and Contrastive Learning
description: Stance-aware sentence transformers and a graph-of-passages architecture for multi-hop QA, trained with contrastive learning objectives.
img: assets/img/projects/hoprag_graph_passages.png
importance: 8
category: Advanced ML / AI
---

**Information Retrieval & Representation Learning** &nbsp;|&nbsp; **IIT Bombay**

Multi-hop question answering requires retrieving and reasoning over multiple evidence passages whose relevance is often indirect and stance-dependent. This project builds a **graph-of-passages** retrieval architecture where passages are nodes and semantic or co-referential relationships form edges, enabling multi-hop traversal during inference.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/hoprag_graph_passages.png" title="Graph-of-passages multi-hop retrieval" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Illustration of graph-of-passages retrieval: a multi-hop question is answered by traversing a chain of connected passages (A → D → E) rather than relying on flat top-k similarity, which alone surfaces topically similar but logically disconnected passages (B, C). Image: Liu et al., <a href="https://arxiv.org/abs/2502.12442" target="_blank">"HopRAG: Multi-Hop Reasoning for Logic-Aware Retrieval-Augmented Generation"</a> (arXiv:2502.12442), Figure 1.
</div>

Retrieval is powered by **stance-aware sentence transformers** fine-tuned with **contrastive learning** — positive pairs are passages that together support the correct answer, while negatives are individually relevant but misleading passages. This trains the encoder to capture not just topical similarity but logical coherence across hops. The contrastive objective encourages representations where multi-hop chains cluster tightly, improving both retrieval recall and downstream answer extraction. The system shows strong performance on multi-hop QA benchmarks, demonstrating the value of structure-aware retrieval over flat dense retrieval.
