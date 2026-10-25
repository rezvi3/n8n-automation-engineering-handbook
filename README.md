# The Complete n8n Automation Engineering Handbook

[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-brightgreen)](https://rezvi3.github.io/n8n-automation-engineering-handbook/)
[![n8n Version](https://img.shields.io/badge/n8n-v1.75%2B%20Verified-EA4B3C?logo=n8n)](https://n8n.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **The Ultimate Zero-to-Professional n8n Automation Learning Book**  
> A complete, beautifully designed, highly visual, practical web platform taking developers and engineers from zero fundamentals to elite enterprise workflow orchestration.

---

## 🌟 Live Demo

👉 **[Launch The n8n Handbook Online](https://rezvi3.github.io/n8n-automation-engineering-handbook/)**

Toggle effortlessly between **Dark Mode** (Obsidian Archival) and **Light Mode** (Paper Cream) with instant client-side persistence and URL theme sharing (`?theme=dark` / `?theme=light`).

---

## 🎨 Architectural Design System

Inspired by the visual design language of [thestoryarchive.net](https://thestoryarchive.net/#):

- **DM Mono Universal Typography**: Clean, high-legibility archival typography.
- **Architectural 2px Ink Rules**: Sharp, high-contrast borders and dividers.
- **Parametric Double-Pass Scribble Ring**: Hand-drawn pencil loop effect wrapping active navigation and section anchors.
- **Card Lift Physics**: Micro-interactions with translation elevation and shadow pop.
- **Android Mobile Optimized**: Full responsive layout built for `390×844` viewports, featuring:
  - Quick-switch bottom dock (Home, Reader, Tools, Projects, More)
  - Horizontally scrollable sticky section navigator ("On This Page")
  - Floating chapter dock with Prev / Next / Mark Complete controls
  - Zero margin clipping or text truncation

---

## 📚 Complete Curriculum Archive (8 Stages // 31 Modules)

Every module includes:
1. **The Real-World Business Problem**: Practical operational context.
2. **First-Principles Concept Explanation**: Deterministic streaming mechanics & DAG concepts.
3. **Interactive Mermaid Architecture Diagrams**: Visual node topologies and data flow.
4. **Concrete Step-by-Step Build Walkthrough**: Exact node parameters and production flags.
5. **The n8n JSON Contract**: Realistic input/output schemas illustrating paired-item linking.
6. **Enterprise Edge Cases & Traps**: Race conditions, timeouts, rate limits, and memory leaks.
7. **Self-Healing & Troubleshooting Tips**: Dead Letter Queues, Error Triggers, and retry policies.
8. **Hands-on Exercise Lab**: Practical challenges with interactive solution reveals.
9. **Knowledge Assessment Quiz**: Interactive multiple-choice questions with instant scoring.

| Stage | Modules | Description & Topics |
| :--- | :--- | :--- |
| **Stage 00** | **M0 – M1** | **Understanding Automation**: Mindset shift, SaaS vs code, Docker vs Cloud vs npm, volumes |
| **Stage 01** | **M2 – M6** | **Core n8n Foundations**: Visual canvas, JSON contract, expressions, paired items, Switch/If/Merge |
| **Stage 02** | **M7 – M11** | **Integrations & APIs**: OAuth2 & Credentials, HTTP Request, Webhooks, HMAC, Cron schedules, Databases |
| **Stage 03** | **M12 – M15** | **Advanced Logic & Data**: JavaScript Code node, JMESPath/Lodash, Sub-workflows, DLQ, Error Triggers |
| **Stage 04** | **M16 – M19** | **AI & Autonomous Agents**: LangChain AI Agents, Tools (`$fromAI()`), RAG pipelines, Vector Stores, HITL |
| **Stage 05** | **M20 – M23** | **Production DevOps & Security**: Docker Compose, Traefik SSL, `n8n audit`, Queue Mode (BullMQ + Redis), Git CI/CD |
| **Stage 06** | **M24 – M27** | **Enterprise Architecture & Consulting**: SQL transactions, custom node development, 2-way sync, TRD & SOW |
| **Stage 07** | **M28 – M30** | **Business Mastery & Capstone**: Packaging & retainers, Enterprise Multi-Agent Lead & Support Architecture |

---

## 🛠️ Interactive Developer Lab

Built-in visual engineering tools:

1. **JSON Explorer & Path Extractor**:
   - Interactive tree view with one-click n8n expression generator (`$json.path` & `$input.item.json.path`).
   - Built-in presets: Stripe Checkout, HubSpot Lead, Jira Webhook, Shopify Order.
2. **Expression Sandbox**:
   - Live browser evaluator supporting `$json`, `$input.first()`, `$input.all()`, ternaries, and array chaining.
3. **Node Selection Decision Tree**:
   - Diagnostic branching wizard answering *"Which node should I use?"* across Data, Logic, APIs, and AI.
4. **20+ Case Troubleshooting Matrix**:
   - Diagnostic database covering real-world traps, root causes, and verified code fixes.

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Quick Start
```bash
# Clone the repository
git clone https://github.com/rezvi3/n8n-automation-engineering-handbook.git
cd n8n-automation-engineering-handbook

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📦 Project Architecture

```
n8n-automation-engineering-handbook/
├── .github/workflows/deploy.yml   # GitHub Actions automated Pages deployment
├── src/
│   ├── components/
│   │   ├── common/                # ScribbleRing, LineageBadge, etc.
│   │   ├── layout/                # Header, Sidebar, MobileNav, SearchModal
│   │   ├── reader/                # LessonReader, QuizCard, ExerciseLab, CodeBlock
│   │   └── views/                 # HomeDashboard, ToolsView, ProjectLibrary, etc.
│   ├── data/                      # 31 curriculum modules, 20+ projects, 60+ terms glossary
│   ├── hooks/                     # useTheme, useProgress, useSearch
│   ├── types/                     # Full TypeScript interfaces
│   ├── App.tsx                    # Core application routing & layout
│   └── index.css                  # Archival design tokens, CSS variables & keyframes
├── index.html                     # Zero-FOUT bootstrap header
├── tailwind.config.js             # DM Mono typography & archival theme mapping
├── vite.config.ts                 # Relative base path configuration
└── package.json
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
