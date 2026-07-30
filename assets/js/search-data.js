// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "Look at my recent publications to know more about my latest reserach interests",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of your cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "dropdown-bookshelf",
              title: "bookshelf",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/books/";
              },
            },{id: "dropdown-blog",
              title: "blog",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/blog/";
              },
            },{id: "post-thinkedit-fixing-the-39-too-short-to-think-39-problem-in-reasoning-models",
        
          title: 'ThinkEdit: Fixing the &#39;Too Short to Think&#39; Problem in Reasoning Models <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "Reasoning LLMs sometimes cut their chain-of-thought short right when a problem needs more deliberation. This post digs into why that happens and how targeted activation edits can fix it.",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@2003adyasha/thinkedit-fixing-the-too-short-to-think-problem-in-reasoning-models-88c31e199bb3", "_blank");
          
        },
      },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-worked-as-a-student-researcher-at-tu-braunschweig-germany-developing-computational-imaging-methods-for-lensless-microscopy",
          title: 'Worked as a Student Researcher at TU Braunschweig, Germany, developing computational imaging methods...',
          description: "",
          section: "News",},{id: "news-elected-as-the-general-secretary-of-the-cse-department-at-iit-bombay",
          title: 'Elected as the General Secretary of the CSE department at IIT Bombay.',
          description: "",
          section: "News",},{id: "news-completed-a-summer-analyst-internship-at-goldman-sachs-developing-scalable-backend-systems-for-enterprise-inventory-workflows",
          title: 'Completed a Summer Analyst internship at Goldman Sachs, developing scalable backend systems for...',
          description: "",
          section: "News",},{id: "news-led-iit-bombay-s-team-to-a-gold-medal-at-the-13th-interiit-tech-meet-designing-a-dynamic-agentic-rag-system-for-financial-domain-reasoning-problem-statement-by-pathway",
          title: 'Led IIT Bombay’s team to a Gold Medal at the 13th InterIIT Tech...',
          description: "",
          section: "News",},{id: "news-graduated-from-iit-bombay-with-a-b-tech-in-computer-science-honors-in-cs-and-a-minor-in-ai-amp-amp-data-science-gpa-9-24-10",
          title: 'Graduated from IIT Bombay with a B.Tech in Computer Science, Honors in CS...',
          description: "",
          section: "News",},{id: "news-joined-zingle-ai-as-a-research-intern-analyzing-agentic-coding-tools-and-ide-workflows-for-large-scale-codebases",
          title: 'Joined Zingle AI as a Research Intern, analyzing agentic coding tools and IDE...',
          description: "",
          section: "News",},{id: "news-completed-a-technical-internship-at-prodigal-yc-w18-cto-office-working-on-multi-agent-autonomous-systems-for-data-and-analytics-workflows",
          title: 'Completed a Technical Internship at Prodigal (YC W18) CTO Office, working on multi-agent...',
          description: "",
          section: "News",},{id: "news-started-my-ms-in-computer-science-at-the-university-of-california-san-diego",
          title: 'Started my MS in Computer Science at the University of California, San Diego....',
          description: "",
          section: "News",},{id: "news-celebrating-my-first-first-author-paper-accepted-at-eacl-findings-2026",
          title: 'Celebrating my first first-author paper, accepted at EACL(Findings) 2026 🎉',
          description: "",
          section: "News",},{id: "news-joined-linkedin-as-an-ai-ml-intern",
          title: 'Joined LinkedIn as an AI/ML Intern.',
          description: "",
          section: "News",},{id: "news-attended-the-y-combinator-summer-school-in-san-francisco",
          title: 'Attended the Y Combinator Summer School in San Francisco.',
          description: "",
          section: "News",},{id: "projects-image-to-3d-interactive-worlds",
          title: 'Image to 3D Interactive Worlds',
          description: "An agentic framework that lifts a single RGB image + text prompt into a physically simulated, editable Blender scene — UCSD CSE 252D.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/10_project/";
            },},{id: "projects-convex-resource-allocation-for-efficient-llm-inference",
          title: 'Convex Resource Allocation for Efficient LLM Inference',
          description: "Formulating LLM batch scheduling as a convex fluid-flow relaxation — dual variables as interpretable, online bottleneck signals for compute vs. memory pressure.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/11_project/";
            },},{id: "projects-inverse-rendering-with-gaussian-scene-representations",
          title: 'Inverse Rendering with Gaussian Scene Representations',
          description: "Extending single-view inverse rendering with 2D Gaussian Splatting for higher-fidelity relighting and novel view synthesis of indoor scenes — UCSD CSE 274.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/12_project/";
            },},{id: "projects-urban-seismic-resilience-multi-agent-disaster-response",
          title: 'Urban Seismic Resilience — Multi-Agent Disaster Response',
          description: "A from-scratch urban earthquake simulator and LLM-commander multi-agent rescue system — hierarchical coordination achieves up to 7.6× higher survival rates.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/13_project/";
            },},{id: "projects-improving-reasoning-of-math-prover-models",
          title: 'Improving Reasoning of Math Prover Models',
          description: "RL (GRPO) training pipeline for robust math-proving LLM verifiers — Qwen-3-4B, Qwen-3.5-4B, and GPT-OSS-20B — UCSD Rose-STL Lab.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-speculative-tool-invocation-for-faster-llm-reasoning",
          title: 'Speculative Tool Invocation for Faster LLM Reasoning',
          description: "Speculator–Actor architecture for accelerating tool-augmented LLM agents, benchmarked on GAIA — UCSD WukLab.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-code-switched-speech-language-identification",
          title: 'Code-Switched Speech Language Identification',
          description: "PEFT-based multilingual speech LID with improved embedded English detection — accepted at EACL 2026 Findings.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-asr-for-dysarthric-speech",
          title: 'ASR for Dysarthric Speech',
          description: "Single-Utterance Test-Time Adaptation (SUTA) for Wav2Vec2, improving ASR word error rate on dysarthric speakers from the TORGO corpus.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-finsight-dynamic-agentic-rag-with-pathway",
          title: 'FinSight — Dynamic Agentic RAG with Pathway',
          description: "Gold Medal at Inter-IIT Tech Meet 13.0 — a LangGraph-based multi-agent RAG system built on Pathway&#39;s dynamic vector database for multi-hop financial question answering.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-rlhf-with-rewrite-feedback",
          title: 'RLHF with Rewrite Feedback',
          description: "Training reward models on synthetic rewrite-based preference datasets to align LLMs using fine-grained, edit-level human feedback signals.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-team-weightwatchers-testing-the-tamper-resistance-of-open-weight-llms",
          title: 'Team WeightWatchers: Testing the Tamper-Resistance of Open-Weight LLMs',
          description: "Mechanistic analysis of Llama&#39;s refusal behavior via activation patching and refusal-direction ablation — bypassing TAR safety training with an 85%+ attack success rate.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-graph-based-retrieval-and-contrastive-learning",
          title: 'Graph-based Retrieval and Contrastive Learning',
          description: "Stance-aware sentence transformers and a graph-of-passages architecture for multi-hop QA, trained with contrastive learning objectives.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-semantically-cohesive-word-grouping-in-indic-languages",
          title: 'Semantically Cohesive Word Grouping in Indic Languages',
          description: "Word-grouping strategy for cross-lingual syntactic alignment in Indic NLP, improving decomposed machine translation across five Hindi-to-Indic language pairs.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/example_pdf.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%64%70%61%74%72%61@%75%63%73%64.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Patra2020", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/adyasha-patra", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=gaSrC_kAAAAJ&hl", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
