---
layout: page
title: Speculative Tool Invocation for Faster LLM Reasoning
description: Speculator–Actor architecture for accelerating tool-augmented LLM agents, benchmarked on GAIA — UCSD WukLab.
importance: 2
category: Core Research
---

**UCSD – WukLab**
_Advised by [Prof. Yiying Zhang](https://cseweb.ucsd.edu/~yiying/) (UCSD)_

**Authors:** Adyasha Patra, Amrita Moturi, Boqin Yuan, Hongrui Zhu, Yen-Ting Lee, Yogesh Prabhu

**Date:** December 2025

**Research Area:** LLM Systems · Agentic AI · Speculative Decoding · Tool-Calling · Efficient Inference

**Code:** `Patra2020/draft-model-finetuning`

---

## Executive Overview

Large Language Model (LLM) agents rely on external tools (search, code interpreters, APIs) to perform multi-step reasoning. However, traditional execution is strictly sequential: the agent reasons, selects a tool, waits for execution, and continues. In complex agent frameworks like _Co-Sight_ or _Open Deep Research_, inference latency accounts for **over 90% of total runtime**.

![LLM](/assets/img/image.png)
Credits: VectorMine / Getty Images

### The Core Idea: Speculative Execution for Actions

Inspired by speculative decoding, **Speculative Tool Calling** decouples tool prediction from actor model reasoning:

1. A small, fast **Draft / Speculator Model** predicts the next tool call and executes it early.
2. Simultaneously, the large, accurate **Actor Model** continues its complete reasoning process.
3. If the actor's final decision matches the pre-executed tool call, the precomputed result is reused (**cache hit**), eliminating execution latency. If not, the system falls back to normal execution.

![Speculative](/assets/img/image-1.png)
Credits: https://medium.com/@genai.works/speed-up-llm-inference-with-speculative-decoding-1fc79701e9d6

## Central Research Question & Key Findings

> _"Can a small model predict what tool a larger model will call before the larger model has finished reasoning?"_

### Key Insights

- **Fine-Tuning Works in Small Toolsets:** Distilling expert traces (**Gemini 2.5 Pro**) into a small draft model (**Qwen3-4B**) jumped prediction accuracy from **1.9% to 51.9%** in a 4-tool environment.
- **Complexity Drops Performance:** Expanding the environment to 17 tools with semantically overlapping functionality caused accuracy to drop sharply to **31.5%**.
- **Unstable Action vs. Failure to Act:** Fine-tuning shifted the model's main failure mode from _inactivity_ to _unstable action_ (repetitive loops, argument hallucination, over-action).

---

## Architecture & Dataset Pipeline

### 1. Distillation via Synthetic GAIA Traces

To align the draft model's structure with the expert actor:

- **Source:** Workflows from the **GAIA benchmark** were parsed into structured synthetic traces:

```json
{
  "thought": "...",
  "action": {
    "tool_name": "...",
    "arguments": {}
  }
}
```

- **Dataset Split:** 90 Training, 28 Validation, 27 Test examples.
- **Fine-Tuning:** Applied **LoRA** (Low-Rank Adaptation) on attention projection layers of **Qwen3-4B** using **Teacher Forcing** and **Assistant-Only Loss** (masking user prompts).

---

## Experimental Setup & Toolset Complexity

The draft model was tested across two tool environments to assess sensitivity to action-space ambiguity:

| Feature             | Configuration A: Small Curated                      | Configuration B: Large Comprehensive                                                                                                       |
| ------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Tool Count**      | 4 tools                                             | 17 tools                                                                                                                                   |
| **Tools Included**  | `search`, `wikipedia`, `calculator`, `final_answer` | `search_with_content`, `file_read`, `calculate`, `code_exec`, `finance.get_world_bank_data`, `python`, `web_search`, `wiki.get_page`, etc. |
| **Ambiguity Level** | Low (Distinct tools)                                | High (Overlapping semantics, e.g., `search` vs `web_search` vs `search_with_content`)                                                      |

---

## Key Experimental Results

### 1. Small Toolset Performance (4 Tools)

| Model                        | Tool Name Accuracy | Improvement |
| ---------------------------- | ------------------ | ----------- |
| **Base Qwen3-4B**            | 1.9%               | Baseline    |
| **LoRA Fine-Tuned Qwen3-4B** | **51.9%**          | **+50.0%**  |

- **LLM-as-a-Judge Outcome:** 37.0% LoRA Wins, 63.0% Ties, 0.0% Base Wins.

### 2. Large Toolset Performance (17 Tools)

| Toolset                         | Tool Name Accuracy | Performance Shift |
| ------------------------------- | ------------------ | ----------------- |
| **Small Curated Toolset**       | 51.9%              | Baseline          |
| **Large Comprehensive Toolset** | **31.5%**          | **-20.4%**        |

- **Qualitative Shift:** LoRA Wins dropped to **11.1%**, while Base Wins rose to **33.3%** because fine-tuning caused the draft model to aggressively make incorrect tool predictions in complex tool spaces.

---

## Primary Failure Modes in Speculative Tool Calling

A correct tool prediction alone is insufficient for a cache hit—the execution requires complete alignment:

```
Successful Speculative Execution Requirements:
Correct Tool + Correct Arguments + Correct Format + Correct Timing + Correct Stopping Behavior

```

1. **Catastrophic Output Loops:** Trapped in infinite sequences of `final_answer → final_answer → ...` without halting.
2. **Tool Mismatch / Substitution:** Predicting `search` when the expert used `search_with_content` (semantically close, but cache miss under exact verification).
3. **Argument Hallucination:** Selecting the correct tool name, but supplying incorrect query parameters.
4. **Generic Tool Collapse:** Defaulting heavily to basic search tools rather than domain-specific functions.

---

## Proposed Future Directions

```
[Full Toolset] ──> [Task-Aware Filtering] ──> [Hierarchical Grouping] ──> [Draft Prediction + Runtime Guardrails]

```

- **Action-Space Regularization:** Dynamically prune irrelevant tools before passing the context to the speculator.
- **Hierarchical Tool Prediction:** Predict in stages: `Action Category` → `Tool Family` → `Specific Tool` → `Arguments`.
- **Semantic Tool Grouping:** Group tools into distinct families (Search, Vision, Wikipedia) to avoid fine-grained confusion.
- **Supervised Stopping Criteria:** Train explicit stop tokens or action budgets to avoid generation loops.
- **Runtime Guardrails:** Terminate speculation early if repetitive tool calls exceed set thresholds.

---

## Stack & Technologies

- **Core Models:** Gemini 2.5 Pro (Expert Actor), Qwen3-4B (Speculator)
- **Frameworks & Techniques:** PyTorch, Hugging Face Transformers, PEFT / LoRA, Teacher Forcing
- **Benchmark:** GAIA Benchmark
