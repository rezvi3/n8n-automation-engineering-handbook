import { Stage } from '../../types/curriculum';

export const stage5: Stage = {
  "id": "stage-5",
  "number": 5,
  "title": "Production, Infrastructure, and Operations",
  "subtitle": "Docker, Reverse Proxies, Security Audits, Queue Scaling & Git CI/CD",
  "description": "Deploy, harden, and scale n8n in production. Master PostgreSQL database configuration, SSL reverse proxies, n8n audit compliance, Redis queue mode, and client delivery SOPs.",
  "badge": "Stage 5 \u2022 DevOps & Ops",
  "accentColor": "#F59E0B",
  "modules": [
    {
      "id": "module-20",
      "number": 20,
      "stageId": "stage-5",
      "title": "Self-Hosting and Deployment",
      "subtitle": "Docker Compose, PostgreSQL & Caddy Reverse Proxy with TLS",
      "description": "Build an enterprise self-hosted n8n infrastructure. Configure Docker Compose with persistent volumes, set up production PostgreSQL, and automate HTTPS certificates with Caddy.",
      "difficulty": "Advanced",
      "estimatedMinutes": 80,
      "lessons": [
        {
          "id": "lesson-20-1",
          "moduleId": "module-20",
          "stageId": "stage-5",
          "title": "Production Deployment: Docker Compose, PostgreSQL & TLS",
          "subtitle": "Architecting a production-grade self-hosted n8n server from scratch",
          "difficulty": "Advanced",
          "estimatedMinutes": 80,
          "prerequisites": [
            "Module 1"
          ],
          "whyItMatters": "Running n8n in production requires more than a temporary terminal command. You need persistent databases, automatic restart on system reboot, valid SSL/TLS certificates for webhooks, and secure network isolation. Deploying via Docker Compose with PostgreSQL and Caddy provides an enterprise-ready stack that costs under $15/month on any cloud VPS (Hetzner, DigitalOcean, AWS).",
          "relatableProblem": "A developer deploys n8n on a VPS using SQLite and HTTP without a reverse proxy. When Stripe attempts to deliver live payment webhooks, Stripe rejects the connection because Stripe strictly requires valid HTTPS with a trusted certificate. Furthermore, when the server experiences a power cycle, the container fails to restart. Following a standardized Docker Compose + Caddy architecture solves both issues permanently.",
          "firstPrinciplesExplanation": "The 3 Pillars of Production n8n Hosting:\n\n1. PostgreSQL Database:\n   - SQLite is single-threaded and locks the database file during concurrent writes, causing crashes when multiple webhooks arrive simultaneously.\n   - PostgreSQL provides robust ACID transactions, connection pooling, and multi-threaded throughput.\n2. Caddy Reverse Proxy:\n   - Exposes ports 80 and 443 to the internet.\n   - Automatically provisions and renews free Let's Encrypt TLS certificates with zero manual intervention.\n   - Proxies incoming HTTPS traffic to n8n's internal port 5678.\n3. Docker Compose with Named Volumes & Restart Policies:\n   - `restart: unless-stopped` guarantees containers come back up automatically after host reboots.\n   - Named volumes preserve database files across image updates.",
          "visualExplanation": {
            "diagramType": "mermaid",
            "caption": "Production Self-Hosted n8n Architecture with PostgreSQL and Caddy",
            "mermaidCode": "graph TB\n  subgraph Internet[\"Public Internet\"]\n    CLIENT[\"Browser / External Webhooks (Stripe / GitHub)\"]\n  end\n\n  subgraph VPS[\"Linux Production VPS (Docker Network)\"]\n    CADDY[\"Caddy Reverse Proxy (Ports 80 & 443)<br/>Automated Let's Encrypt SSL/TLS\"]\n    N8N_APP[\"n8n Core Container (Port 5678 internal)<br/>N8N_ENCRYPTION_KEY & WEBHOOK_URL\"]\n    POSTGRES[(\"PostgreSQL 16 Database<br/>Isolated Internal Network\")]\n    VOL_N8N[(\"Volume: n8n_data\")]\n    VOL_PG[(\"Volume: postgres_data\")]\n  end\n\n  CLIENT -->|HTTPS Port 443| CADDY\n  CADDY -->|Reverse Proxy HTTP:5678| N8N_APP\n  N8N_APP -->|Internal TCP 5432| POSTGRES\n  N8N_APP --- VOL_N8N\n  POSTGRES --- VOL_PG\n\n  style Internet fill:#0F172A,stroke:#94A3B8,stroke-width:1px,color:#F8FAFC\n  style VPS fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC\n  style CADDY fill:#1E293B,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC\n  style N8N_APP fill:#1E293B,stroke:#EC4899,stroke-width:2px,color:#F8FAFC\n  style POSTGRES fill:#1E293B,stroke:#F59E0B,stroke-width:2px,color:#F8FAFC"
          },
          "technicalDetails": "Production Environment Variables:\n- `DB_TYPE=postgresdb`\n- `DB_POSTGRESDB_HOST=postgres`\n- `DB_POSTGRESDB_PORT=5432`\n- `DB_POSTGRESDB_DATABASE=n8n`\n- `DB_POSTGRESDB_USER=n8n_user`\n- `DB_POSTGRESDB_PASSWORD=your_strong_db_password`\n- `N8N_ENCRYPTION_KEY=your_64char_hex_encryption_key`\n- `WEBHOOK_URL=https://automation.yourdomain.com/`\n- `N8N_SECURE_COOKIE=true`\n- `EXECUTIONS_DATA_PRUNE=true`\n- `EXECUTIONS_DATA_MAX_AGE=168` (Prunes records older than 7 days)",
          "workedExample": {
            "scenario": "A complete, production-ready docker-compose.yml definition.",
            "inputJson": {
              "domain": "automation.client.com",
              "caddyEmail": "admin@client.com"
            },
            "transformationLogic": "Generate unified Compose definition with Caddy and PostgreSQL services.",
            "outputJson": {
              "services": [
                "caddy",
                "n8n",
                "postgres"
              ],
              "networks": [
                "internal"
              ],
              "volumes": [
                "caddy_data",
                "n8n_data",
                "postgres_data"
              ]
            },
            "explanation": "Caddy automatically negotiates TLS for automation.client.com and forwards traffic to n8n:5678 on the shared internal Docker network."
          },
          "stepByStepLab": {
            "title": "Deploying the Production Compose Stack",
            "goal": "Write and spin up a multi-container Docker Compose stack with n8n and PostgreSQL.",
            "steps": [
              {
                "stepNumber": 1,
                "title": "Set Up Directory and .env",
                "instruction": "Create directory `~/n8n-production` and create `.env` storing `N8N_ENCRYPTION_KEY` and `POSTGRES_PASSWORD`."
              },
              {
                "stepNumber": 2,
                "title": "Create docker-compose.yml",
                "instruction": "Assemble services `postgres` (image: postgres:16-alpine) and `n8n` (image: docker.n8n.io/n8nio/n8n:latest). Link them on a shared bridge network."
              },
              {
                "stepNumber": 3,
                "title": "Launch the Stack",
                "instruction": "Run `docker compose up -d`. Inspect logs with `docker compose logs -f n8n`. Verify database connection succeeds."
              },
              {
                "stepNumber": 4,
                "title": "Test Healthcheck",
                "instruction": "Execute `curl -f http://localhost:5678/healthz`. Confirm it returns HTTP 200 OK."
              }
            ],
            "expectedResult": "The stack boots cleanly with PostgreSQL handling all persistent state."
          },
          "commonMistakes": [
            {
              "mistake": "Running production n8n with SQLite on an NFS or network drive.",
              "consequence": "SQLite file locking fails over network filesystems, causing corruption and database crashes.",
              "correction": "Always use PostgreSQL for production multi-user and high-volume workloads."
            }
          ],
          "knowledgeCheck": [
            {
              "id": "q20-1",
              "question": "Why is Caddy frequently chosen as the reverse proxy for self-hosted n8n instances?",
              "options": [
                "Caddy is written in JavaScript.",
                "Caddy automatically provisions, configures, and renews SSL/TLS certificates from Let's Encrypt with zero manual configuration.",
                "Caddy replaces the PostgreSQL database.",
                "It makes Docker run faster."
              ],
              "correctIndex": 1,
              "explanation": "Caddy has native, automatic HTTPS. You simply specify your domain name in the Caddyfile, and it acquires and renews SSL certificates automatically."
            }
          ],
          "practicalChallenge": {
            "prompt": "Write a bash backup script that runs nightly via cron: It runs `docker exec postgres pg_dump -U n8n n8n` and saves a compressed .sql.gz archive with date stamps.",
            "hints": [
              "Use `pg_dump -U n8n n8n | gzip > /backups/n8n_$(date +%Y%m%d).sql.gz`."
            ],
            "solutionNotes": "This produces a reliable snapshot of all workflows, credentials, and settings that can be uploaded to offsite S3 storage."
          },
          "keyTakeaways": [
            "Use PostgreSQL for production database concurrency and stability.",
            "Use Caddy or Nginx for automated HTTPS and reverse proxy routing.",
            "Always configure `EXECUTIONS_DATA_PRUNE` to prevent unbounded disk growth."
          ],
          "officialDocLinks": [
            {
              "title": "Official n8n Docker Compose Production Guide",
              "url": "https://docs.n8n.io/hosting/installation/docker-compose/",
              "note": "Production-tested Compose file templates and configuration flags."
            }
          ]
        }
      ]
    },
    {
      "id": "module-21",
      "number": 21,
      "stageId": "stage-5",
      "title": "Security and Governance",
      "subtitle": "Encryption Keys, Instance Hardening & n8n Security Audits",
      "description": "Harden your n8n instances against attack. Master N8N_ENCRYPTION_KEY management, audit stored credentials with the n8n audit CLI, enforce least privilege, and sanitize execution logs.",
      "difficulty": "Professional",
      "estimatedMinutes": 70,
      "lessons": [
        {
          "id": "lesson-21-1",
          "moduleId": "module-21",
          "stageId": "stage-5",
          "title": "Enterprise Security Hardening & The n8n Audit CLI",
          "subtitle": "Credential encryption, least privilege, audit compliance, and data pruning",
          "difficulty": "Professional",
          "estimatedMinutes": 70,
          "prerequisites": [
            "Module 20"
          ],
          "whyItMatters": "n8n instances hold the 'keys to the kingdom'\u2014API tokens for Stripe, administrative access to HubSpot, database passwords, and customer PII. If an n8n instance is breached or misconfigured, attackers can extract credentials or execute malicious code. Implementing strict security controls and running regular audits is a non-negotiable professional duty.",
          "relatableProblem": "A client hires a consultant to audit their n8n instance. The consultant runs the built-in `n8n audit` CLI command and discovers 14 active workflows running with expired credentials, 3 database nodes executing raw unescaped SQL expressions, and an exposed webhook accepting unauthorized POST requests. Hardening these vectors prevents catastrophic security incidents.",
          "firstPrinciplesExplanation": "The 4 Layers of n8n Defense:\n\n1. At-Rest Cryptography (`N8N_ENCRYPTION_KEY`):\n   - All credential values stored in PostgreSQL are encrypted using AES-256-GCM.\n   - Never commit this key to Git; inject it exclusively as an environment variable.\n2. Instance Hardening:\n   - Set `N8N_SECURE_COOKIE=true` to force HTTPS-only session cookies.\n   - Block risky community packages by keeping community node installation restricted.\n   - Disable debug logging in production to prevent sensitive tokens from leaking to stdout.\n3. Execution Data Minimization (GDPR/HIPAA Compliance):\n   - By default, n8n saves input and output JSON for every execution. If customer credit cards or health data flow through nodes, this data is stored in your database.\n   - Configure 'Save successful execution data' to 'None' or 'Errors only' for workflows handling PII.\n4. Running Security Audits (`n8n audit`):\n   - n8n includes a native CLI command: `n8n audit` (or POST `/audit` API) that generates an automated vulnerability report checking credentials, database expressions, and webhook exposures.",
          "visualExplanation": {
            "diagramType": "mermaid",
            "caption": "The n8n Security Hardening Architecture",
            "mermaidCode": "graph LR\n  subgraph IngestionSec[\"Ingestion Security\"]\n    HTTPS[\"TLS 1.3 / HTTPS\"]\n    HMAC[\"HMAC Webhook Signatures\"]\n  end\n\n  subgraph ExecutionSec[\"Execution Security\"]\n    SANDBOX[\"Isolated Code Sandbox\"]\n    PARAM_SQL[\"Parameterized SQL\"]\n    HITL[\"Human-in-the-Loop Gates\"]\n  end\n\n  subgraph AtRestSec[\"At-Rest Storage Security\"]\n    AES[\"AES-256-GCM Vault (N8N_ENCRYPTION_KEY)\"]\n    PRUNE[\"Nightly Data Pruning (EXECUTIONS_DATA_PRUNE)\"]\n    AUDIT[\"Automated CLI Audit (n8n audit)\"]\n  end\n\n  IngestionSec --> ExecutionSec --> AtRestSec\n\n  style IngestionSec fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC\n  style ExecutionSec fill:#0F172A,stroke:#F59E0B,stroke-width:2px,color:#F8FAFC\n  style AtRestSec fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC"
          },
          "technicalDetails": "Running the n8n Audit Tool:\nInside your Docker container, execute:\n```bash\ndocker exec -it n8n_container n8n audit\n```\nCategories Checked:\n- `credentials`: Flags credentials that are unused or assigned to inactive workflows.\n- `database`: Detects unescaped SQL expressions vulnerable to injection.\n- `filesystem`: Identifies nodes with host filesystem access permissions.\n- `instance`: Checks outdated n8n versions with known CVEs and insecure cookies.",
          "workedExample": {
            "scenario": "Reviewing an automated audit report generated by n8n audit.",
            "inputJson": {
              "command": "n8n audit --output=json"
            },
            "transformationLogic": "Parse findings and prioritize remediation tickets.",
            "outputJson": {
              "auditSummary": {
                "totalChecks": 28,
                "passed": 25,
                "warnings": 2,
                "critical": 1
              },
              "criticalFinding": {
                "category": "database",
                "nodeName": "Execute Postgres Query",
                "workflowId": "wf_891",
                "issue": "Raw expression concatenation detected in SQL parameter."
              }
            },
            "explanation": "The audit instantly points the engineer to the exact vulnerable SQL expression in workflow wf_891."
          },
          "stepByStepLab": {
            "title": "Executing a Security Audit and Hardening Execution Retention",
            "goal": "Run `n8n audit` inside a container and configure execution data pruning.",
            "steps": [
              {
                "stepNumber": 1,
                "title": "Configure Pruning in Docker Compose",
                "instruction": "Add environment variables: `EXECUTIONS_DATA_PRUNE=true` and `EXECUTIONS_DATA_MAX_AGE=72` (prune after 3 days)."
              },
              {
                "stepNumber": 2,
                "title": "Restart Container",
                "instruction": "Run `docker compose up -d` to apply new pruning settings."
              },
              {
                "stepNumber": 3,
                "title": "Run n8n audit",
                "instruction": "Execute: `docker compose exec n8n n8n audit`. Review the output in your terminal."
              },
              {
                "stepNumber": 4,
                "title": "Remediate Unused Credentials",
                "instruction": "If the audit flags unused credentials, open the Credentials tab in n8n and delete obsolete tokens."
              }
            ],
            "expectedResult": "A clean audit report with zero critical security warnings."
          },
          "commonMistakes": [
            {
              "mistake": "Leaving execution data logging enabled for workflows handling customer credit cards or health data.",
              "consequence": "Violates PCI-DSS and HIPAA compliance regulations; plain-text credit cards sit indefinitely in the database.",
              "correction": "In Workflow Settings, set 'Save Successful Executions' to 'Never'."
            }
          ],
          "knowledgeCheck": [
            {
              "id": "q21-1",
              "question": "What happens if you run an n8n instance without setting `EXECUTIONS_DATA_PRUNE=true`?",
              "options": [
                "Workflows run in reverse order.",
                "Every execution payload is stored forever, eventually filling up the host hard drive and causing database failure.",
                "The encryption key expires.",
                "n8n locks all nodes."
              ],
              "correctIndex": 1,
              "explanation": "Without automatic data pruning, high-volume production instances accumulate gigabytes of execution history every week, eventually exhausting disk space and crashing PostgreSQL."
            }
          ],
          "practicalChallenge": {
            "prompt": "Create an automated Security Audit workflow inside n8n: Use the n8n node with Resource 'Audit' and Operation 'Generate' to run weekly on Mondays and post a compliance report to the #devops-security Slack channel.",
            "hints": [
              "Look up the built-in 'n8n' node which can manage the instance itself."
            ],
            "solutionNotes": "This implements automated continuous compliance monitoring without human intervention."
          },
          "keyTakeaways": [
            "Always back up and secure `N8N_ENCRYPTION_KEY` outside the server.",
            "Turn on automatic execution data pruning to prevent disk exhaustion.",
            "Use `n8n audit` regularly to uncover insecure SQL expressions and orphaned credentials."
          ],
          "officialDocLinks": [
            {
              "title": "Official n8n Security Audit Reference",
              "url": "https://docs.n8n.io/hosting/securing/security-audit/",
              "note": "Documentation on the n8n audit CLI tool and security best practices."
            }
          ]
        }
      ]
    },
    {
      "id": "module-22",
      "number": 22,
      "stageId": "stage-5",
      "title": "Monitoring, Maintenance, and Scaling",
      "subtitle": "Queue Mode, Redis Brokers, Worker Pools & Performance Tuning",
      "description": "Scale n8n to millions of executions. Understand the difference between single-process mode and distributed queue mode. Configure Redis message brokers, worker pools, and memory profiling.",
      "difficulty": "Professional",
      "estimatedMinutes": 80,
      "lessons": [
        {
          "id": "lesson-22-1",
          "moduleId": "module-22",
          "stageId": "stage-5",
          "title": "Horizontal Scaling with Queue Mode & Redis",
          "subtitle": "Decoupling webhook listeners, worker processes, and message queues",
          "difficulty": "Professional",
          "estimatedMinutes": 80,
          "prerequisites": [
            "Module 20",
            "Module 21"
          ],
          "whyItMatters": "In standard mode, a single n8n process handles the web UI, webhook listening, and CPU-intensive workflow execution. If someone uploads a 50MB CSV or runs an intensive AI loop, the entire server's event loop blocks, causing incoming webhooks to drop. In Queue Mode, n8n scales horizontally across a cluster of independent worker containers managed by Redis.",
          "relatableProblem": "An e-commerce store runs a flash sale generating 1,200 orders per minute. Their single-process n8n container spikes to 100% CPU and memory crashes with 'JavaScript heap out of memory'. By transitioning to Queue Mode with 4 worker containers and a Redis broker, incoming webhooks are acknowledged in 20ms and placed on the Redis queue, where workers process them smoothly without downtime.",
          "firstPrinciplesExplanation": "Queue Mode Architecture in n8n:\n\n1. Webhook Processors (`n8n webhook`):\n   - Lightweight, dedicated HTTP listeners that do ONLY one thing: receive incoming webhook POST requests, push them onto a Redis queue, and immediately return HTTP 200 to the caller.\n2. Message Broker (Redis):\n   - High-speed in-memory queue (BullMQ) holding execution jobs waiting for processing.\n3. Worker Pool (`n8n worker`):\n   - Stateless background containers that pull jobs off the Redis queue, execute the workflow nodes, and write results to PostgreSQL.\n   - Scale from 1 to 50+ workers based on CPU load!\n4. Editor Process (`n8n`):\n   - Dedicated solely to rendering the UI canvas and serving admin users, completely isolated from high-volume webhook spikes.",
          "visualExplanation": {
            "diagramType": "mermaid",
            "caption": "n8n High-Availability Horizontal Scaling Architecture (Queue Mode)",
            "mermaidCode": "graph TB\n  subgraph Inbound[\"External Traffic\"]\n    WH_TRAFFIC[\"High-Volume Webhooks (1,000 req/sec)\"]\n    ADMIN_TRAFFIC[\"DevOps Engineers Canvas Access\"]\n  end\n\n  subgraph LoadBalancer[\"Load Balancer / Reverse Proxy (Caddy / HAProxy)\"]\n    ROUTER{\"Route /webhook/* to Webhook Nodes<br/>Route other to Editor\"}\n  end\n\n  subgraph n8nCluster[\"Distributed n8n Cluster\"]\n    WEBHOOK_POOL[\"n8n Webhook Container 1 & 2\"]\n    REDIS[(\"Redis Queue Broker (BullMQ)\")]\n    WORKER_1[\"n8n Worker 1 (CPU Thread 1)\"]\n    WORKER_2[\"n8n Worker 2 (CPU Thread 2)\"]\n    WORKER_3[\"n8n Worker 3 (CPU Thread 3)\"]\n    EDITOR[\"n8n Editor Container\"]\n    PG[(\"PostgreSQL Database Cluster\")]\n  end\n\n  WH_TRAFFIC --> ROUTER\n  ADMIN_TRAFFIC --> ROUTER\n  ROUTER -->|/webhook/*| WEBHOOK_POOL\n  ROUTER -->|/| EDITOR\n  WEBHOOK_POOL -->|Push Job| REDIS\n  REDIS -->|Pull Job| WORKER_1\n  REDIS -->|Pull Job| WORKER_2\n  REDIS -->|Pull Job| WORKER_3\n  WORKER_1 --> PG\n  WORKER_2 --> PG\n  WORKER_3 --> PG\n  EDITOR --> PG\n\n  style n8nCluster fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC\n  style REDIS fill:#1E293B,stroke:#EF4444,stroke-width:2px,color:#F8FAFC\n  style WEBHOOK_POOL fill:#1E293B,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC\n  style EDITOR fill:#1E293B,stroke:#8B5CF6,stroke-width:2px,color:#F8FAFC"
          },
          "technicalDetails": "Queue Mode Configuration Flags:\n- `EXECUTIONS_MODE=queue`\n- `QUEUE_BULL_REDIS_HOST=redis`\n- `QUEUE_BULL_REDIS_PORT=6379`\n- `QUEUE_BULL_REDIS_PASSWORD=strong_redis_password`\n- `N8N_ENCRYPTION_KEY`: Must be IDENTICAL across the Editor, Webhook nodes, and all Worker nodes!",
          "workedExample": {
            "scenario": "Scaling docker-compose workers to 4 instances on demand.",
            "inputJson": {
              "currentWorkers": 1,
              "targetWorkers": 4
            },
            "transformationLogic": "Execute `docker compose up -d --scale n8n-worker=4`.",
            "outputJson": {
              "activeWorkers": 4,
              "throughputIncrease": "400%",
              "queueLatency": "Reduced from 12.4s to 0.18s"
            },
            "explanation": "Docker Compose spins up 3 additional worker containers that instantly connect to Redis and begin picking up backlog jobs."
          },
          "stepByStepLab": {
            "title": "Configuring Redis and Queue Mode in Docker Compose",
            "goal": "Add a Redis service and configure n8n worker containers.",
            "steps": [
              {
                "stepNumber": 1,
                "title": "Add Redis Service",
                "instruction": "In docker-compose.yml, add `redis: image: redis:7-alpine` with persistent volume."
              },
              {
                "stepNumber": 2,
                "title": "Add Worker Service",
                "instruction": "Define a service `n8n-worker` with command `n8n worker`. Set `EXECUTIONS_MODE=queue`."
              },
              {
                "stepNumber": 3,
                "title": "Configure Main n8n Node",
                "instruction": "Set `EXECUTIONS_MODE=queue` and provide Redis credentials."
              },
              {
                "stepNumber": 4,
                "title": "Test Concurrency",
                "instruction": "Trigger 50 parallel webhook calls. Inspect Redis and verify jobs distribute across workers."
              }
            ],
            "expectedResult": "Workers consume tasks in parallel without blocking the main editor."
          },
          "commonMistakes": [
            {
              "mistake": "Setting different N8N_ENCRYPTION_KEY values on the worker containers than the main editor.",
              "consequence": "Workers cannot decrypt credentials when picking up jobs from Redis, causing all worker executions to fail.",
              "correction": "Ensure `N8N_ENCRYPTION_KEY` is shared identically across all containers in the cluster."
            }
          ],
          "knowledgeCheck": [
            {
              "id": "q22-1",
              "question": "What is the primary benefit of deploying n8n in Queue Mode with Redis?",
              "options": [
                "It enables AI image generation.",
                "It separates webhook reception from workflow execution, allowing horizontal scaling across multiple worker threads and preventing server crashes during high traffic.",
                "It removes the need for PostgreSQL.",
                "It makes n8n free of licensing restrictions."
              ],
              "correctIndex": 1,
              "explanation": "Queue mode decouples the system: Webhook listeners accept traffic instantly, Redis buffers the queue, and a pool of stateless workers executes workflows in parallel without exhausting the main web server."
            }
          ],
          "practicalChallenge": {
            "prompt": "How can you monitor n8n's queue depth and health using Prometheus and Grafana?",
            "hints": [
              "Look up `N8N_METRICS=true` in n8n documentation."
            ],
            "solutionNotes": "Enabling `N8N_METRICS=true` exposes a `/metrics` Prometheus endpoint tracking active workflows, execution duration histograms, and queue lengths."
          },
          "keyTakeaways": [
            "Use Queue Mode when throughput exceeds ~20 executions per second or for mission-critical reliability.",
            "All nodes in a queue cluster must share the exact same `N8N_ENCRYPTION_KEY`.",
            "Workers can be scaled up or down elastically based on Redis queue depth."
          ],
          "officialDocLinks": [
            {
              "title": "Official n8n Queue Mode Documentation",
              "url": "https://docs.n8n.io/hosting/scaling/queue-mode/",
              "note": "Complete architecture guide for Redis brokers, workers, and webhook processors."
            }
          ]
        }
      ]
    },
    {
      "id": "module-23",
      "number": 23,
      "stageId": "stage-5",
      "title": "Professional Delivery and Environment Management",
      "subtitle": "Dev/Staging/Prod, Git Versioning & Client Handover SOPs",
      "description": "Deliver automations like a professional agency. Master environment separation (Development, Staging, Production), version control with Git, workflow exports, and client handover procedures.",
      "difficulty": "Professional",
      "estimatedMinutes": 65,
      "lessons": [
        {
          "id": "lesson-23-1",
          "moduleId": "module-23",
          "stageId": "stage-5",
          "title": "Multi-Environment CI/CD & Client Handover SOPs",
          "subtitle": "Git version control, workflow migration, and professional delivery runbooks",
          "difficulty": "Professional",
          "estimatedMinutes": 65,
          "prerequisites": [
            "Module 20",
            "Module 21"
          ],
          "whyItMatters": "Amateurs build and edit workflows directly on the client's live production instance. One syntax error in an expression stops customer orders instantly. Professional automation engineers work across isolated environments (Dev -> Staging -> Production), commit workflows to Git, and provide comprehensive documentation and rollback procedures upon delivery.",
          "relatableProblem": "An engineer edits a live payment workflow on a client's production server at 3:00 PM. A mistyped variable halts all checkout processing for 45 minutes until the client calls furious. A proper Git-backed staging-to-production deployment pipeline prevents live-editing catastrophes completely.",
          "firstPrinciplesExplanation": "The 3-Environment Delivery Lifecycle:\n\n1. Development (Local / Dev Server):\n   - Where engineers experiment, test with mock datasets, and build new features.\n   - Uses sandbox API keys (e.g. Stripe Test Mode).\n2. Staging (Pre-Production):\n   - Mirrors production configuration.\n   - Connected to staging databases and staging webhooks.\n   - Used for end-to-end user acceptance testing (UAT) with the client before go-live.\n3. Production:\n   - Live business traffic.\n   - Strict change control: Never edited directly on the canvas.\n   - Updated only by importing tested workflow JSON releases.\n\nVersioning Workflows with Git:\nUse the n8n CLI to export workflows into a Git repository on every commit:\n```bash\nn8n export:workflows --backup --output=/git-repo/workflows/\n```\nThis gives your team complete Git history, commit messages, diffs, and instant rollback capability.",
          "visualExplanation": {
            "diagramType": "mermaid",
            "caption": "Professional Multi-Environment CI/CD Pipeline for n8n",
            "mermaidCode": "graph LR\n  DEV[\"1. Development Instance<br/>Local Docker / Mock Data\"] -->|Test Passed| GIT[(\"Git Repository<br/>Versioned Workflow JSON\")]\n  GIT -->|Pull Request & Code Review| STAGE[\"2. Staging Instance<br/>Client UAT Testing\"]\n  STAGE -->|Client Sign-Off| PROD[\"3. Production Instance<br/>Live Customer Traffic\"]\n  PROD -.->|Emergency Rollback| GIT\n\n  style DEV fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC\n  style GIT fill:#1E293B,stroke:#F59E0B,stroke-width:2px,color:#F8FAFC\n  style STAGE fill:#0F172A,stroke:#8B5CF6,stroke-width:2px,color:#F8FAFC\n  style PROD fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC"
          },
          "technicalDetails": "The Professional Client Handover Dossier:\nEvery client automation project must be delivered with:\n1. Architecture Diagram: Clean visual map of all connected systems.\n2. Technical Requirements Document (TRD): Documenting triggers, transformations, and error handling.\n3. Credential Checklist: Stating which third-party accounts are connected and who owns them.\n4. Failure Runbook: Step-by-step instructions for what to do if an API changes or fails.\n5. Rollback Workflow JSON: Stored in a separate backup folder for one-click restoration.",
          "workedExample": {
            "scenario": "Exporting all workflows from development to prepare for client delivery.",
            "inputJson": {
              "sourceInstance": "dev-n8n.internal",
              "exportDestination": "./client-release-v1.0"
            },
            "transformationLogic": "Run `n8n export:workflows --all --output=./client-release-v1.0/workflows.json`.",
            "outputJson": {
              "exportedWorkflows": 12,
              "exportStatus": "SUCCESS",
              "credentialsIncluded": false,
              "safetyAudit": "PASSED - Zero plaintext secrets exported"
            },
            "explanation": "Because credentials are decoupled, the exported workflow JSON can be safely committed to the client's private GitHub repository without leaking tokens."
          },
          "stepByStepLab": {
            "title": "Exporting, Versioning, and Re-importing a Workflow",
            "goal": "Export a workflow to JSON, inspect its structure, and import it into another instance.",
            "steps": [
              {
                "stepNumber": 1,
                "title": "Export via Editor",
                "instruction": "Open any workflow. Click the three dots (...) in the top right -> 'Download'. Save the JSON file to your computer."
              },
              {
                "stepNumber": 2,
                "title": "Inspect the JSON File",
                "instruction": "Open the JSON in a text editor. Notice the `nodes` array, `connections` object, and observe that credentials contain only IDs, not raw secret keys."
              },
              {
                "stepNumber": 3,
                "title": "Import as a New Workflow",
                "instruction": "Create a new blank workflow. Click (...) -> 'Import from File'. Select your JSON. Confirm all nodes and connections render perfectly."
              }
            ],
            "expectedResult": "The complete workflow is restored with all node configurations intact."
          },
          "commonMistakes": [
            {
              "mistake": "Editing production workflows live during business hours.",
              "consequence": "A single syntax error breaks customer transactions in real time with no rollback history.",
              "correction": "Always make changes in Development, test in Staging, and import the tested JSON to Production."
            }
          ],
          "knowledgeCheck": [
            {
              "id": "q23-1",
              "question": "When you export a workflow to JSON from n8n, why are secret API keys and passwords omitted from the file?",
              "options": [
                "Because of a file export bug.",
                "Because n8n decouples workflow logic from credential storage, allowing safe sharing and Git versioning without leaking sensitive secrets.",
                "Because credentials must be purchased separately.",
                "Only Enterprise plans export credentials."
              ],
              "correctIndex": 1,
              "explanation": "n8n's architecture separates workflows from credentials. Workflows only store references (IDs) to credentials, keeping the JSON code safe for Git commits and team sharing."
            }
          ],
          "practicalChallenge": {
            "prompt": "Create an automated GitHub Backup Workflow in n8n: Use Schedule Trigger (Daily at 2:00 AM) -> HTTP Request (Query n8n internal API for all workflows) -> GitHub Node (Commit and push workflow JSON files to client repository).",
            "hints": [
              "Use the n8n public REST API (`GET /api/v1/workflows`) with an API key."
            ],
            "solutionNotes": "This provides automated, zero-touch daily Git backups of all client workflows."
          },
          "keyTakeaways": [
            "Never edit production workflows live on the canvas.",
            "Use Git to version and track workflow JSON changes over time.",
            "Always provide an architecture diagram, credential matrix, and failure runbook upon client handover."
          ],
          "officialDocLinks": [
            {
              "title": "Official n8n CLI Export Documentation",
              "url": "https://docs.n8n.io/hosting/configuration/cli-commands/",
              "note": "Complete guide to `n8n export:workflows` and `n8n import:workflows`."
            }
          ]
        }
      ]
    }
  ]
};
