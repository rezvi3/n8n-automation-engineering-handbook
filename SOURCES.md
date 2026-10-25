# Authoritative Documentation Sources & Research Log

This file records all authoritative official n8n and technical documentation consulted for **The Complete n8n Automation Engineering Handbook**.

| Source Title | Official URL | Purpose & Topic Covered | Verification Date |
| :--- | :--- | :--- | :--- |
| **Official n8n Documentation** | `https://docs.n8n.io/` | Core platform reference, concepts, architecture | Oct 2026 / Current |
| **n8n Academy Courses** | `https://learn.n8n.io/` (N8N101, N8N102, N8N103) | Official learning path, progressive pedagogical benchmarks | Oct 2026 / Current |
| **Official Workflow Library** | `https://n8n.io/workflows/` | Production workflow patterns, template validation | Oct 2026 / Current |
| **n8n Advanced AI & LangChain** | `https://docs.n8n.io/advanced-ai/` & `https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/` | AI Agent node, tool calling, memory buffers, vector databases, `$fromAI()` dynamic expression helper | Oct 2026 / Current |
| **n8n Hosting & Deployment** | `https://docs.n8n.io/hosting/` | Docker Compose, PostgreSQL config, environment variables, queue mode architecture | Oct 2026 / Current |
| **n8n Security Audit & Hardening**| `https://docs.n8n.io/hosting/securing/security-audit/` | `N8N_ENCRYPTION_KEY`, least privilege, CLI audit (`n8n audit`), webhook protection, credential export | Oct 2026 / Current |
| **Expressions & Data Flow** | `https://docs.n8n.io/data/` & `https://docs.n8n.io/code/` | Modern expression syntax (`{{ $json.field }}`), item linking (`pairedItem`), `$input.all()`, `$input.first()` | Oct 2026 / Current |
| **Edit Fields (Set) Node** | `https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.set/` | Modern Edit Fields node parameters, Keep Only Set, dot notation | Oct 2026 / Current |
| **Code Node Runtime & Task Runners**| `https://docs.n8n.io/code/cookbook/` | JavaScript & Python execution modes, item array format, runtime constraints | Oct 2026 / Current |
| **Scaling & Queue Mode** | `https://docs.n8n.io/hosting/scaling/queue-mode/` | Redis broker, worker concurrency, webhook processor separation | Oct 2026 / Current |

---

## Key Current Terminology & Architectural Notes

1. **Node Naming Evolution**:
   - The legacy `Set` node is officially designated as `Edit Fields (Set)` in n8n v1.x+.
   - Expressions utilize double curly braces: `{{ $json.myProperty }}`.
   - Cross-node referencing is performed using the format `$('Node Name').item.json.field` or `$('Node Name').all()`.

2. **Item Linking & `pairedItem`**:
   - n8n v1 tracks origin indices between inputs and outputs so downstream nodes can map back to previous items even after filtering or transformations.
   - Code node scripts that generate or transform items preserve linking via `pairedItem: { item: index }`.

3. **AI Architecture**:
   - Built on LangChain integration nodes: Root `AI Agent` or `OpenAI Functions Agent`, connecting sub-nodes for `Model`, `Memory` (Window Buffer, Zep, Motorhead), `Tool` (Custom HTTP, Calculator, Workflow Tool), and `Vector Store` / `Retriever`.

4. **Security Hardening**:
   - `N8N_ENCRYPTION_KEY` is mandatory in production to secure credentials at rest.
   - `n8n audit` CLI command scans for unencrypted credentials, vulnerable community nodes, unsafe SQL expressions, and exposed endpoints.
