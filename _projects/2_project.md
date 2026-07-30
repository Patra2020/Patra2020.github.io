---
layout: page
title: Speculative Tool Invocation for Faster LLM Reasoning
description: Speculator–Actor architecture for accelerating tool-augmented LLM agents, benchmarked on GAIA — UCSD WukLab.
img: assets/img/projects/speculative_decoding_draft_target.png
importance: 4
category: Core Research
---

**UCSD – WukLab**  
_Advised by [Prof. Yiying Zhang](https://cseweb.ucsd.edu/~yiying/) (UCSD)_

**Authors:** Adyasha Patra, Amrita Moturi, Boqin Yuan, Hongrui Zhu, Yen-Ting Lee, Yogesh Prabhu &nbsp;|&nbsp; **Date:** December 2025 &nbsp;|&nbsp; **Code:** [`Patra2020/draft-model-finetuning`](https://github.com/Patra2020/draft-model-finetuning)

Large Language Model (LLM) agents rely on external tools — search, code interpreters, APIs — to perform multi-step reasoning, but execution is strictly sequential: the agent reasons, selects a tool, waits for it to run, then continues. In complex agent frameworks like _Co-Sight_ and _Open Deep Research_, tool-execution latency accounts for **over 90% of total runtime**. This project asks whether we can borrow the core idea of **speculative decoding** — using a small, fast model to pre-compute what a larger model will do — and apply it to _tool calls_ instead of tokens.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/speculative_decoding_draft_target.png" title="Speculative decoding: draft then verify" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  The classic speculative decoding recipe we build on: a cheap draft model proposes several tokens autoregressively, and the large target model verifies them in a single parallel pass, keeping the ones it agrees with. We apply this same draft-then-verify pattern to <i>tool selection</i> rather than token generation. Image via <a href="https://medium.com/@genai.works/speed-up-llm-inference-with-speculative-decoding-1fc79701e9d6" target="_blank">GenAI Works, "Speed up LLM inference with speculative decoding"</a>.
</div>

### The Core Idea

**Speculative Tool Calling** decouples tool prediction from actor-model reasoning: a small, fast **Draft/Speculator model** predicts the next tool call and executes it early, while the large, accurate **Actor model** continues its full reasoning process in parallel. If the actor's final decision matches the pre-executed call, the precomputed result is reused (a **cache hit**) and execution latency disappears entirely; if not, the system falls back to normal sequential execution with no correctness cost.

> _"Can a small model predict what tool a larger model will call before the larger model has finished reasoning?"_

### Method: Distilling Expert Traces from GAIA

We distilled expert reasoning traces from **Gemini 2.5 Pro** on the **GAIA benchmark**, parsing each trajectory into structured `{thought, action: {tool_name, arguments}}` records (90 train / 28 val / 27 test examples), then fine-tuned **Qwen3-4B** as the speculator using **LoRA** on attention projection layers, with teacher forcing and an assistant-only loss that masks user-prompt tokens.

### Results

| Setting                                | Tool Name Accuracy | Result                       |
| -------------------------------------- | ------------------ | ---------------------------- |
| Base Qwen3-4B (4 tools)                | 1.9%               | baseline                     |
| **LoRA fine-tuned Qwen3-4B (4 tools)** | **51.9%**          | **+50.0 pts**                |
| LoRA fine-tuned Qwen3-4B (17 tools)    | 31.5%              | −20.4 pts vs. 4-tool setting |

Fine-tuning a small draft model on distilled expert traces jumped tool-prediction accuracy from 1.9% to **51.9%** in a curated 4-tool environment (LLM-as-judge: 37% draft wins, 63% ties, 0% base wins) — a strong signal that speculative tool calling is viable. But expanding to a semantically overlapping 17-tool environment (e.g. `search` vs. `web_search` vs. `search_with_content`) dropped accuracy to 31.5%, and shifted the dominant failure mode from _inactivity_ to _unstable action_: repetitive `final_answer` loops, argument hallucination, and collapse onto generic tools. This matters because a cache hit requires exact alignment on tool **+** arguments **+** format **+** timing **+** stopping behavior — near-misses (like `search` vs. `search_with_content`) still count as a miss.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/llm_agent_tools_overview.png" title="LLM agent tool-use loop" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  The general LLM-agent loop our speculator sits inside: at each step the agent chooses to query/retrieve, call a tool, or read/write memory before producing output — our speculator specifically targets the "call/response" tool edge. Image: VectorMine, via Getty Images.
</div>

### Why It's Hard, and What's Next

A correct tool-name prediction alone isn't sufficient for a cache hit — the full call must match. Our error analysis surfaced four recurring failure modes: catastrophic output loops, tool-name substitution among semantically close tools, argument hallucination, and collapse onto a small set of generic tools under toolset ambiguity. We're now exploring **action-space regularization** (pruning irrelevant tools from context before speculation), **hierarchical tool prediction** (category → family → specific tool → arguments), **semantic tool grouping**, and **runtime guardrails** that halt speculation once repetitive calls exceed a threshold — aiming to make speculative tool calling robust even in large, ambiguous toolsets.

**Stack:** Gemini 2.5 Pro (expert actor), Qwen3-4B (speculator), PyTorch, Hugging Face Transformers, PEFT/LoRA, GAIA benchmark.
