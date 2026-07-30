---
layout: page
title: Urban Seismic Resilience — Multi-Agent Disaster Response
description: A from-scratch urban earthquake simulator and LLM-commander multi-agent rescue system — hierarchical coordination achieves up to 7.6× higher survival rates.
img: assets/img/projects/seismic_survival_rate.png
importance: 8
category: Advanced ML / AI
---

**UC San Diego**

**Authors:** Adyasha Patra, Satyam Srivastava, Jay Chaudhary, Abhay Jain, Keshav Gupta, Seemandhar Jain

**Report:** [Urban Seismic Resilience: A Testbed for Studying Coordination and Communication in Multi-Agent Systems (PDF)](/assets/pdf/projects/urban_seismic_resilience.pdf)

Large-scale disasters like earthquakes create highly dynamic environments where rescue agents must operate under uncertainty, limited communication, and cascading hazards — building collapses, fires, aftershocks. We built an **urban seismic disaster simulation platform from scratch** to study how coordination and communication strategies affect multi-agent emergency response, and used it to evaluate a hierarchical, LLM-commanded rescue architecture against decentralized alternatives.

## The Testbed

We built a research-ready, grid-based city simulator with procedurally generated layouts, configurable disaster scenarios, measurable metrics, and pluggable coordination strategies. It models:

- **Dynamic hazard events:** structural collapses, spreading fires, aftershocks, and rare "black swan" cascading collapses.
- **Heterogeneous rescue agents:** scouts (exploration), medics and firefighters (task execution), coordinated by a central commander agent.
- **Configurable disaster severity:** building density, earthquake intensity, and civilian survival windows, spanning low-, medium-, and high-disaster conditions.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/seismic_env_visualization.png" title="Live simulation state" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Live view of the urban grid environment mid-disaster: collapsed buildings, active fires, and civilians in various rescue states (alive, rescued, dead) tracked in real time.
</div>

The **commander agent** in the hierarchical architecture is implemented using **gpt-oss-120B**, performing high-level reasoning, planning, and task allocation based on observations reported by field agents, and maintaining an internal "mental map" of the disaster zone that it updates as new reports come in.

## Key Result: Hierarchical Coordination vs. Decentralized Agents

We compared a **hierarchical architecture** — where a central commander aggregates scout observations, maintains a global mental map, and assigns tasks — against a **decentralized architecture** where agents act independently using only local, limited-radius observations.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/seismic_survival_rate.png" title="Survival rate: hierarchical (LLM commander) vs. decentralized" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Mean civilian survival rate across 10 simulations at low/medium/high disaster density. The LLM-commanded hierarchical architecture achieves 84.2% survival at low density vs. 11.1% for decentralized agents — a 7.6× improvement — with the advantage persisting (though narrowing) as disaster density increases.
</div>

- **Low-density scenarios:** hierarchical coordination reaches **~84% survival** vs. **11%** decentralized — a **7.6× improvement**.
- **Medium density:** 51% vs. 18%. **High density:** 30% vs. 18% — the gap narrows as environmental constraints (travel time, simultaneous hazards) start to limit what coordination alone can fix.
- Hierarchical coordination also nearly doubles **global situational awareness**, raising mental-map fidelity from ~48% (decentralized) to ~62% (centralized).

## Robustness Experiments

Beyond the headline result, we stress-tested the system along three more axes:

- **Communication dropout:** as message loss between commander and field agents increases, performance degrades gracefully rather than collapsing — agents fall back on local reactive behavior, maintaining a survival-rate floor of **~54%** even under severe communication failure.
- **Dynamic disaster adaptation:** injecting stochastic aftershocks mid-rescue (new collapses and fires) only drops survival from 66% to 61.4% (a 4.6% reduction), and the commander's mental-map fidelity stays stable (~62%) — the system absorbs new hazards without losing situational awareness.
- **Greedy vs. long-horizon planning:** somewhat counterintuitively, a **greedy** commander policy (rescue the nearest high-value target now) beats a **long-horizon** policy that optimizes exploration coverage before dispatching medics/firefighters — 66% vs. 49% survival, a 34.7% relative improvement — because the extra planning overhead delays rescue actions in a highly time-sensitive environment, even though long-horizon planning slightly improves map fidelity.

## Takeaway

Centralized, LLM-driven coordination with global situational awareness substantially outperforms decentralized decision-making in multi-agent disaster response — but the real value is in _how_ it fails: gracefully, under both communication loss and unexpected new hazards, thanks to agents' local reactive fallback behaviors. This points toward **hybrid coordination** — centralized planning backed by local autonomy — as the right design pattern for resilient disaster-response systems.
