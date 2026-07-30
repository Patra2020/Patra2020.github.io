---
layout: page
title: FinSight — Dynamic Agentic RAG with Pathway
description: Gold Medal at Inter-IIT Tech Meet 13.0 — a LangGraph-based multi-agent RAG system built on Pathway's dynamic vector database for multi-hop financial question answering.
img: assets/img/projects/finsight_architecture.png
importance: 1
category: Advanced ML / AI
---

**Inter-IIT Tech Meet 13.0** &nbsp;|&nbsp; **Team 24** &nbsp;|&nbsp; **Gold Medal**

FinSight is a domain-specialized, multi-agent Retrieval-Augmented Generation system for financial question answering, built for the Inter-IIT Tech Meet 13.0 problem statement in partnership with **Pathway** — a dynamic vector database designed for real-time, adaptive information retrieval. Unlike a single-pass RAG pipeline, FinSight routes every query through a **LangGraph**-orchestrated agent graph that decomposes complex, multi-hop financial questions, retrieves and grades evidence, reasons from multiple analyst "personas," and computes financial KPIs directly from filings such as 10-Ks — all while tracking hallucination, faithfulness, and citation integrity.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/finsight_architecture.png" title="FinSight end-to-end agentic workflow" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  End-to-end workflow: an incoming query passes through safety checking and conversation-history contextualization, then a path decider routes it to a general LLM, web search, decomposer-based RAG agent, persona-based reasoning agent, or a dedicated financial analysis (KPI) agent — each backed by Pathway's vector database. Figure from our Inter-IIT final report.
</div>

### Why Financial QA Is Hard

Financial documents mix narrative, dense tabular data, and domain-specific terminology, and real analyst queries rarely resolve in a single retrieval step. Some questions decompose in **parallel** (comparing a metric across companies), others in **series** (identifying revenue sources before analyzing their effect on margins), and some **recursively** — a parallel sub-question can itself expand into a dependent chain. Existing systems like BloombergGPT struggle with multimodal (chart/table) inputs, FinGPT suffers from data sparsity on niche topics, and FishNet/FinRobot lack persona-driven, context-sensitive insight generation. FinSight was built specifically to close these gaps.

### Specialized Agentic Workflows

- **Decomposed RAG (RRR — Recursive Residual Resolution):** our novel framework decomposes a query into up to five sub-questions, resolves each via retrieval + generation + hallucination/answer grading, and recursively re-decomposes any unresolved residual questions (up to depth 3) until the full query is answered. RRR outperformed Naive RAG on multi-hop questions by **39%**.
- **Persona-based reasoning:** dynamically generated financial personas (trader, analyst, investor, ...) each independently query a decomposed-RAG tool from their own perspective; answers are combined either in parallel or via a supervised sequential workflow.
- **KPI-based financial analysis:** given companies, years, and requested analyses, the agent retrieves the underlying values via the RAG pipeline, then generates and executes code to compute the requested KPIs — with results cached via Pathway's UDF wrapper.

<div class="row">
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/finsight_persona_workflow.png" title="Persona-based reasoning workflow" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/finsight_kpi_agent.png" title="KPI-based financial analysis agent" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Left: independent analyst "personas" each interrogate the RAG agent from a distinct perspective before answers are combined. Right: the financial analysis agent fans out per company/year, retrieves the underlying values, and drives a code-based calculator to compute each requested KPI. Figures from our Inter-IIT final report.
</div>

### Retrieval, Indexing & Reliability Engineering

Documents are ingested through Pathway's connector → table → transformation pipeline: OpenParse extracts text, tables, and **table-value maps** (row/column/significance) to recover numerical structure that standard chunking loses — this alone improved answer correctness by **19%**. Retrieval combines **BM25 + dense KNN** in a hybrid indexer (which beat either method alone across all metrics), with metadata filters for company, year, and topic tags, and a **semantic cache** to avoid redundant computation. We ran ablations across embedding models (ada-002, voyage-finance-2, bge-m3), top-k values, and retrieval components (reranker, doc-relevance grading, HyDE, answer grading) — settling on **k=5** and **bge-m3** embeddings, since RRR's performance was empirically embedding-model-agnostic. To keep the system responsive while large documents are being indexed, we built a **dual-server architecture** — a fast, lightweight indexer answers queries immediately while a slower, more precise indexer builds the full index in the background, with a reverse proxy and health-check endpoint switching clients over once indexing completes.

We evaluated on a hand-built simple single-hop QA set (200+ questions across 20 companies), a synthesized complex multi-hop set (100+ questions, generated by grouping semantically similar question pairs with GPT-4o), and the public **Financial-QA-10k** benchmark, tracking **context precision, correctness, faithfulness, response relevancy, latency, and token usage** via LangSmith tracing. Responsible-AI mechanisms include hallucination mitigation via citation-integrity checks, safety-compliance screening of incoming queries, and a human-in-the-loop clarification stage for ambiguous requests.

### Result

FinSight won the **Gold Medal at Inter-IIT Tech Meet 13.0**, with our enhanced RAG framework showing substantial gains over a Naive RAG baseline across correctness, faithfulness, and response relevancy on the Financial-QA-10k benchmark, while remaining consistent (within ~2%) across different underlying LLMs and embedding models — demonstrating that the architecture, not any single model choice, drives the performance gain.

<div class="caption">
  <b>Team 24, Inter-IIT Tech Meet 13.0</b> — FinSight: Dynamic Agentic RAG with Pathway.
</div>
