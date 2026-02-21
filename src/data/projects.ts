export interface Project {
  name: string;
  description: string;
  tech: string[];
  link: string;
}

export interface ProjectCategory {
  title: string;
  projects: Project[];
}

export const projectCategories: ProjectCategory[] = [
  {
    title: "Generative AI & Evaluation",
    projects: [
      {
        name: "genai-eval-framework",
        description: "Hallucination detection (NLI), factual accuracy verification, content safety scoring, A/B benchmarking",
        tech: ["Python", "Hugging Face", "W&B"],
        link: "https://github.com/DevDizzle/genai-eval-framework"
      },
      {
        name: "lora-finetune-lab",
        description: "Parameter-efficient fine-tuning of Mistral-7B using QLoRA — 4-bit quantization, PEFT, W&B experiment tracking",
        tech: ["Python", "PyTorch", "PEFT", "bitsandbytes"],
        link: "https://github.com/DevDizzle/lora-finetune-lab"
      },
      {
        name: "diffusion-style-transfer",
        description: "Text-to-image generation with SDXL — style transfer, brand consistency scoring (CLIP), content safety rating",
        tech: ["Python", "Diffusers", "CLIP"],
        link: "https://github.com/DevDizzle/diffusion-style-transfer"
      },
      {
        name: "whisper-multimodal-pipeline",
        description: "Cross-modal AI pipeline — Whisper speech-to-text, Gemini analysis, structured output generation",
        tech: ["Python", "Whisper", "Gemini"],
        link: "https://github.com/DevDizzle/whisper-multimodal-pipeline"
      }
    ]
  },
  {
    title: "Production ML & Data Engineering",
    projects: [
      {
        name: "gammarips-engine",
        description: "End-to-end serverless AI platform on GCP — processes 10GB daily through autonomous pipelines, BigQuery, Cloud Workflows",
        tech: ["Python", "GCP", "BigQuery", "Pub/Sub"],
        link: "https://github.com/DevDizzle/gammarips-engine"
      },
      {
        name: "gammarips-mcp",
        description: "MCP server with 18+ tools for real-time financial intelligence — Cloud Run, tool orchestration, agent integration",
        tech: ["Python", "FastAPI", "Cloud Run", "MCP"],
        link: "https://github.com/DevDizzle/gammarips-mcp"
      },
      {
        name: "gammarips-webapp",
        description: "Next.js 15 analytics platform with MCP-based AI chat interface for conversational market analysis",
        tech: ["TypeScript", "Next.js", "Firebase"],
        link: "https://github.com/DevDizzle/gammarips-webapp"
      }
    ]
  },
  {
    title: "Computer Vision & Research",
    projects: [
      {
        name: "yolov9-object-detection-guide",
        description: "Custom YOLOv9 fine-tuning guide — dataset preparation, training, evaluation, inference",
        tech: ["Python", "PyTorch", "YOLOv9"],
        link: "https://github.com/DevDizzle/yolov9-object-detection-guide"
      },
      {
        name: "synthetic-data-GANerator",
        description: "GANs for synthetic medical image generation — malignant skin lesion augmentation",
        tech: ["Python", "TensorFlow", "GANs"],
        link: "https://github.com/DevDizzle/synthetic-data-GANerator"
      },
      {
        name: "sci-paper-chat",
        description: "GCP-native RAG service for scientific paper analysis — FastAPI, Gemini, arXiv integration",
        tech: ["Python", "FastAPI", "Gemini", "RAG"],
        link: "https://github.com/DevDizzle/sci-paper-chat"
      }
    ]
  },
  {
    title: "Applied AI Projects",
    projects: [
      {
        name: "ttb-verifier",
        description: "AI-powered alcohol label compliance checker — full-stack verification against TTB regulations",
        tech: ["Python", "HTML", "CV"],
        link: "https://github.com/DevDizzle/ttb-verifier"
      },
      {
        name: "prompt-engineering",
        description: "Iterative prompt optimization pipeline for high-quality content generation",
        tech: ["Python"],
        link: "https://github.com/DevDizzle/prompt-engineering"
      },
      {
        name: "smart-city",
        description: "UrbanNexus — governed multi-agent reasoning system for urban planning decisions",
        tech: ["Python", "Multi-Agent"],
        link: "https://github.com/DevDizzle/smart-city"
      }
    ]
  }
];
