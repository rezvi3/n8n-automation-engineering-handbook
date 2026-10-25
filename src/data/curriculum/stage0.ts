import { Stage } from '../../types/curriculum';

export const stage0: Stage = {
  id: 'stage-0',
  number: 0,
  title: 'Understanding Automation',
  subtitle: 'The Automation Mindset & Architecture Foundations',
  description: 'Deconstruct manual business workflows into deterministic, event-driven automated systems. Understand how n8n compares to legacy tools and learn how to safely set up your local development environment.',
  badge: 'Stage 0 • Fundamentals',
  accentColor: '#3B82F6',
  modules: [
    {
      id: 'module-0',
      number: 0,
      stageId: 'stage-0',
      title: 'Orientation and the Automation Mindset',
      subtitle: 'From Repetitive Tasks to Scalable Systems',
      description: 'Understand what workflow automation is, how n8n differs from traditional code and SaaS tools like Zapier/Make, and how professional automation engineers break down business logic.',
      difficulty: 'Beginner',
      estimatedMinutes: 45,
      lessons: [
        {
          id: 'lesson-0-1',
          moduleId: 'module-0',
          stageId: 'stage-0',
          title: 'The Automation Mindset: Deconstructing Business Workflows',
          subtitle: 'How to think like a professional automation architect',
          difficulty: 'Beginner',
          estimatedMinutes: 45,
          prerequisites: ['No prior technical knowledge required'],
          whyItMatters: 'Every business wastes hundreds of human hours every month on "digital swivel-chair work"—manually copying leads from forms to spreadsheets, drafting notification emails, and updating CRM records. If you understand how to translate human operations into atomic, deterministic triggers and actions, you can build reliable automation systems that run 24/7 without mistakes.',
          relatableProblem: 'Imagine a small B2B consulting company: Whenever a prospective client fills out a website contact form, an office manager has to check their inbox, open Salesforce, check whether the company already exists, copy-paste the contact information, compose a Slack alert to the sales team, and manually send a booking calendar link. If the manager is on lunch, sick, or busy, the lead waits 4 hours. By that time, 78% of B2B buyers have already booked a call with a competitor.',
          firstPrinciplesExplanation: 'At its core, all digital workflow automation is founded on three fundamental components:\n1. The Trigger (The Event): "When this happens in the outside world..." (e.g. an HTTP webhook arrives, a timer fires, or a file is uploaded).\n2. The Data (The Payload): A structured parcel of digital information (almost universally formatted as JSON in modern computing) that describes the event.\n3. The Actions (The Deterministic Steps): A chain of sequential or parallel transformations, database queries, API requests, and conditional checks that operate on that data.\n\nTraditional programming accomplishes this by writing backend servers in Python, Node.js, or Go from scratch. While powerful, pure code requires maintaining server infrastructure, boilerplate OAuth token refresh routines, and custom error handling. SaaS tools like Zapier or Make offer drag-and-drop ease but lock your data into proprietary closed-source clouds with prohibitive per-task pricing.\n\nn8n bridges this gap: It is a node-based, fair-code workflow automation platform that gives you the visual clarity of a canvas with the full programmatic power of custom JavaScript, Docker self-hosting, database access, and advanced AI agent capabilities.',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Manual Human Swivel-Chair Work vs. Deterministic n8n Workflow',
            mermaidCode: `graph TD
  subgraph Manual["Traditional Manual Swivel-Chair Process (High Latency, Prone to Fatigue)"]
    A[Prospect Submits Web Form] -->|Waits in Inbox 1-4 hrs| B[Human Reads Email]
    B -->|Manual Alt-Tab| C[Search CRM for Duplicate]
    C -->|Manual Copy-Paste| D[Create Contact Record]
    D -->|Manual Message| E[Type Alert in Slack Channel]
    E -->|Manual Email| F[Send Welcome Email]
  end

  subgraph Automated["n8n Deterministic Workflow (Execution Time: 340 milliseconds)"]
    T1[Webhook Trigger: Form Submission] --> N1[Edit Fields: Normalize Phone & Email]
    N1 --> N2{If: Lead Exists in CRM?}
    N2 -->|No| N3[HubSpot: Create New Lead]
    N2 -->|Yes| N4[HubSpot: Append Note & Timestamp]
    N3 --> N5[Slack: Post Rich Lead Card with Accept Button]
    N4 --> N5
    N5 --> N6[Email: Send Dynamic Calendar Link]
  end

  style Manual fill:#1E293B,stroke:#EF4444,stroke-width:2px,color:#F8FAFC
  style Automated fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC`
          },
          secondaryVisual: {
            diagramType: 'flow',
            caption: 'The Five Atomic Pillars of Any Automation',
            mermaidCode: `graph LR
    TR[1. Trigger<br/>Event Initiator] --> DP[2. Data Payload<br/>Structured JSON]
    DP --> LG[3. Logic & Rules<br/>If / Switch / Filters]
    LG --> TF[4. Transformations<br/>Map, Calculate, Clean]
    TF --> AC[5. Actions<br/>APIs, DBs, Notifications]`
          },
          technicalDetails: 'When designing automations, engineers must distinguish between:\n- Event-Driven Triggers: Activated instantaneously via incoming HTTP POST webhooks, message bus queues, or database change data capture (CDC).\n- Polling / Scheduled Triggers: Activated on a defined chronometric interval (e.g., cron `0 9 * * 1-5` for business mornings) that queries an external API for records created since the last checkpoint.\n\nKey Automation Guardrails:\n- Determinism: Given the exact same input payload, your workflow must produce the exact same outcome every time.\n- Idempotency: Running the automation twice with the same record should not create duplicate invoices, double-charge a credit card, or send duplicate emails.\n- Graceful Degradation: If an external API (like Slack) is temporarily down, the workflow must catch the error, log the payload, and queue it for retry rather than silently dropping customer data.',
          workedExample: {
            scenario: 'Processing a raw contact form submission into a normalized sales notification payload.',
            inputJson: {
              "full_name": "  alice smith  ",
              "email_address": "ALICE@AcmeCorp.COM",
              "budget": "$15,000",
              "phone": " +1 (555) 019-2834 ",
              "interest": "Enterprise Custom Implementation"
            },
            transformationLogic: 'Trim whitespace, lowercase email, parse budget currency string into an integer (15000), format international phone number (E.164 standard), and assign priority routing flag.',
            outputJson: {
              "leadId": "lead_98234",
              "customer": {
                "name": "Alice Smith",
                "email": "alice@acmecorp.com",
                "phone": "+15550192834"
              },
              "qualification": {
                "budgetAmount": 15000,
                "tier": "Tier 1 High Value",
                "requiresExecutiveSponsor": true
              },
              "processedAt": "2026-10-25T00:00:00.000Z"
            },
            explanation: 'Notice how the raw input contains messy whitespace, non-standard capitalization, and string-formatted currency. Before any downstream CRM or Slack node touches this data, n8n normalizes it into a reliable data structure.'
          },
          stepByStepLab: {
            title: 'Deconstructing a Real-World Repetitive Workflow',
            goal: 'Analyze a messy business process and document its exact triggers, inputs, decision branches, and outputs.',
            steps: [
              {
                stepNumber: 1,
                title: 'Identify the Trigger Event',
                instruction: 'Determine what kicks off the process. Is it an employee action, a customer purchase, a cron schedule, or an incoming webhook? Document the exact data fields that arrive at this moment.'
              },
              {
                stepNumber: 2,
                title: 'Map Data Transformations and Cleanups',
                instruction: 'List all fields that need sanitization: trimming spaces, standardizing date formats to ISO-8601, hashing passwords, or parsing phone numbers.'
              },
              {
                stepNumber: 3,
                title: 'Define the Decision Matrix',
                instruction: 'Document every conditional rule. For example: "If budget > $10,000, assign to Senior VP; else assign to Inbound SDR pool."'
              },
              {
                stepNumber: 4,
                title: 'Document External System Side-Effects',
                instruction: 'List every system that will be modified: which database table receives an INSERT, which Slack channel receives a webhook, and what customer email is dispatched.'
              }
            ],
            expectedResult: 'A complete architectural blueprint that is ready to be implemented directly onto the n8n canvas.'
          },
          commonMistakes: [
            {
              mistake: 'Automating a broken or undefined manual process.',
              consequence: 'The automation will simply execute mistakes at 1,000 times the speed of a human, causing massive data corruption in production systems.',
              correction: 'Standardize and document the manual process with human stakeholders first. Ensure the decision tree has no ambiguous "gut feeling" steps before touching n8n.'
            },
            {
              mistake: 'Assuming external APIs will never fail or change shape.',
              consequence: 'Workflows fail silently in the middle of the night; customer orders are lost with no error trail.',
              correction: 'Always configure error handling branches, retries with backoff, and alerting webhooks for non-2xx API responses.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q0-1',
              question: 'Which of the following describes the difference between an event-driven trigger and a polling trigger?',
              options: [
                'Event-driven triggers execute on a fixed clock timer; polling triggers execute when a user presses Enter.',
                'Event-driven triggers run immediately upon receiving an incoming HTTP push; polling triggers query an external API on a scheduled interval to check for new records.',
                'Polling triggers are only used for AI models; event-driven triggers are only used for databases.',
                'There is no difference; all triggers in n8n are event-driven.'
              ],
              correctIndex: 1,
              explanation: 'Event-driven triggers (such as webhooks) listen passively and execute the millisecond a payload is pushed by an external provider. Polling triggers (such as checking Google Sheets every 15 minutes) actively query the external service on a timer.'
            },
            {
              id: 'q0-2',
              question: 'Why is idempotency a mandatory requirement in professional automation engineering?',
              options: [
                'It ensures that workflows run faster by skipping JavaScript compilation.',
                'It prevents duplicate side effects (such as double-charging a customer or duplicating records) if an execution is triggered multiple times with the same input payload.',
                'It allows n8n to connect to non-HTTP servers.',
                'It automatically translates English prompts into SQL queries.'
              ],
              correctIndex: 1,
              explanation: 'Idempotency guarantees that executing an operation multiple times with identical parameters produces the exact same state as executing it once, preventing critical production bugs like double billing or duplicate CRM entries.'
            }
          ],
          practicalChallenge: {
            prompt: 'Audit your current daily work or a client business. Write down a 5-step automation specification for an invoice intake workflow: Identify (1) Trigger, (2) Input Payload schema, (3) Data validation checks, (4) Decision branches, and (5) External system side-effects.',
            hints: [
              'Consider what happens if an invoice email arrives without an attached PDF.',
              'Think about duplicate invoice numbers from the same vendor.'
            ],
            solutionNotes: 'A robust design triggers on "New Email with Attachment in Billing Inbox", validates that the file is a PDF < 10MB, hashes the file or extracts the vendor ID + invoice number to query PostgreSQL for duplicates, routes invoices > $5,000 to CFO Slack for approval, and inserts approved records into QuickBooks.'
          },
          keyTakeaways: [
            'Automation engineering is about translating human operational intent into deterministic, testable software pipelines.',
            'Every automation requires a Trigger, Data Payload, Transformation Logic, Decision Rules, and External Side-Effects.',
            'n8n combines the visual speed of a node canvas with the enterprise power of custom code, Docker hosting, and privacy compliance.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n Introduction & Concepts',
              url: 'https://docs.n8n.io/getting-started/',
              note: 'High-level conceptual overview of workflows, nodes, and executions.'
            },
            {
              title: 'n8n Academy Course 101',
              url: 'https://learn.n8n.io/',
              note: 'Official certification course covering basic nodes and flow logic.'
            }
          ]
        }
      ]
    },
    {
      id: 'module-1',
      number: 1,
      stageId: 'stage-0',
      title: 'Setting Up n8n',
      subtitle: 'Cloud, Docker, and Safe Local Development',
      description: 'Master the differences between n8n Cloud, local development, and self-hosted Docker environments. Learn how to configure ports, persistent volumes, environment variables, and encryption keys without exposing insecure instances to the web.',
      difficulty: 'Beginner',
      estimatedMinutes: 60,
      lessons: [
        {
          id: 'lesson-1-1',
          moduleId: 'module-1',
          stageId: 'stage-0',
          title: 'n8n Deployment Options & Safe Local Setup',
          subtitle: 'From zero to running your first secure local instance',
          difficulty: 'Beginner',
          estimatedMinutes: 60,
          prerequisites: ['Basic familiarity with running terminal commands'],
          whyItMatters: 'Before building workflows, you need an environment. Unlike closed SaaS platforms where you just click sign-up, n8n gives you the superpower of running on your own machine or private cloud. Knowing how to set up Docker, manage environment variables, and configure volumes guarantees your data and credentials remain secure and persistent across restarts.',
          relatableProblem: 'A beginner installs n8n locally using a temporary command without persistent volumes. After spending 8 hours building 10 complex customer workflows and configuring API credentials, they shut down their laptop or terminate the Docker container. The next morning, the container is destroyed, the auto-generated encryption key is lost, and all credentials and workflows have vanished. Understanding persistence prevents this catastrophe.',
          firstPrinciplesExplanation: 'n8n is a Node.js application that stores workflows, execution history, and encrypted credentials in a database (SQLite for lightweight local development; PostgreSQL for production). It can run in three primary ways:\n\n1. n8n Cloud: Hosted and managed directly by n8n. Perfect for rapid prototyping or teams that do not want to manage Linux servers.\n2. Local npm Execution: Running `npx n8n` directly on your machine. Excellent for quick experiments, but depends on your host machine\'s Node.js runtime version.\n3. Docker Container (The Professional Standard): An isolated Linux container running the official `docker.n8n.io/n8nio/n8n` image. Ensures consistent runtime behavior regardless of operating system, binds a persistent volume on your host drive, and allows complete environment isolation.\n\nCrucial Security Rule: Local development instances must bind to `127.0.0.1` (localhost). Never expose an unauthenticated local development port `5678` to `0.0.0.0` or open router ports to the public internet without an SSL reverse proxy and strong authentication.',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Comparison of n8n Deployment Architectures',
            mermaidCode: `graph TB
  subgraph LocalDev["1. Local Docker Development (Zero Cost, Complete Privacy)"]
    D1[Developer Browser] -->|http://localhost:5678| C1[n8n Container: Port 5678]
    C1 --> V1[(Host Volume: ~/.n8n<br/>Workflows & SQLite DB)]
    C1 --> K1[Env: N8N_ENCRYPTION_KEY]
  end

  subgraph ProductionCloud["2. Production Self-Hosted (Scalable, High Availability)"]
    U[External Webhooks & Users] -->|HTTPS 443| RP[Reverse Proxy: Caddy / Nginx / Traefik]
    RP -->|Internal Network| NMAIN[n8n Main Webhook & Editor]
    NMAIN --> REDIS[(Redis Queue Broker)]
    REDIS --> W1[n8n Worker 1]
    REDIS --> W2[n8n Worker 2]
    NMAIN --> PG[(PostgreSQL Production DB)]
    W1 --> PG
    W2 --> PG
  end

  style LocalDev fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC
  style ProductionCloud fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC`
          },
          technicalDetails: 'Key Environment Variables for n8n Initialization:\n- `N8N_ENCRYPTION_KEY`: A 32+ character cryptographic secret string used to encrypt API tokens and passwords in the database at rest with AES-256-GCM. If this key is lost, stored credentials CANNOT be recovered.\n- `N8N_PORT`: Default is `5678`.\n- `N8N_LISTEN_ADDRESS`: Set to `127.0.0.1` in development to ensure external network interfaces cannot access your canvas.\n- `WEBHOOK_URL`: The public root URL (e.g. `https://automation.yourdomain.com/`) that external webhooks use to reach your instance.\n- `EXECUTIONS_DATA_PRUNE`: Set to `true` in production to prevent SQLite or PostgreSQL from growing to hundreds of gigabytes over time.',
          workedExample: {
            scenario: 'Creating a production-grade local Docker Compose file for development.',
            inputJson: {
              "service": "n8n-dev",
              "volumePath": "./n8n_data",
              "port": 5678,
              "encryptionKeyProvided": true
            },
            transformationLogic: 'Translate configuration requirements into a robust docker-compose.yml definition with healthchecks and restart policies.',
            outputJson: {
              "version": "3.8",
              "services": {
                "n8n": {
                  "image": "docker.n8n.io/n8nio/n8n:latest",
                  "restart": "unless-stopped",
                  "ports": ["127.0.0.1:5678:5678"],
                  "environment": {
                    "N8N_ENCRYPTION_KEY": "YOUR_DEFINED_HEX_ENCRYPTION_SECRET_32_CHARS",
                    "N8N_HOST": "localhost",
                    "N8N_PORT": "5678",
                    "N8N_PROTOCOL": "http",
                    "NODE_ENV": "production",
                    "EXECUTIONS_DATA_PRUNE": "true",
                    "EXECUTIONS_DATA_MAX_AGE": "168"
                  },
                  "volumes": ["./n8n_data:/home/node/.n8n"]
                }
              }
            },
            explanation: 'Notice how the ports line binds to `127.0.0.1:5678:5678`. This blocks any unauthorized user on your local WiFi network from accessing your n8n canvas.'
          },
          stepByStepLab: {
            title: 'Launching a Resilient Local Docker Instance',
            goal: 'Launch an official n8n Docker container with persistent storage and a custom encryption key on your workstation.',
            steps: [
              {
                stepNumber: 1,
                title: 'Create Project Directory and Volume Folder',
                instruction: 'Open your terminal and run:\n```bash\nmkdir -p ~/n8n-local/n8n_data\ncd ~/n8n-local\n```'
              },
              {
                stepNumber: 2,
                title: 'Generate a Cryptographic Encryption Key',
                instruction: 'Generate a secure 64-character random string:\n```bash\nopenssl rand -hex 32\n```\nCopy this value. You will supply it as your N8N_ENCRYPTION_KEY.'
              },
              {
                stepNumber: 3,
                title: 'Create docker-compose.yml',
                instruction: 'Create `docker-compose.yml` and paste the configuration. Ensure `./n8n_data` is mounted to `/home/node/.n8n`.'
              },
              {
                stepNumber: 4,
                title: 'Start the Container',
                instruction: 'Run `docker compose up -d` and inspect the logs using `docker compose logs -f n8n`. When you see "Editor is now accessible via: http://localhost:5678", open it in your browser and complete the initial owner account setup.'
              }
            ],
            expectedResult: 'You see the n8n visual canvas at http://localhost:5678 with persistent storage mapped to your local disk.'
          },
          commonMistakes: [
            {
              mistake: 'Running `docker run -d -p 5678:5678 n8nio/n8n` without a volume mount `-v`.',
              consequence: 'All workflows, executions, and configured credentials are lost whenever the container stops or is updated.',
              correction: 'Always provide a persistent volume: `-v n8n_data:/home/node/.n8n` or use docker-compose.'
            },
            {
              mistake: 'Failing to back up `N8N_ENCRYPTION_KEY`.',
              consequence: 'If you move your database to another server without the original key, n8n will fail to decrypt your credentials, rendering every credential useless.',
              correction: 'Store your `N8N_ENCRYPTION_KEY` in a secure password manager or enterprise vault.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q1-1',
              question: 'What happens if you deploy n8n in Docker without mounting a persistent volume to `/home/node/.n8n`?',
              options: [
                'n8n automatically uploads your data to the n8n Cloud.',
                'The instance will work while running, but all workflows and credentials will be permanently erased if the container is recreated or upgraded.',
                'Docker will refuse to start.',
                'n8n will prompt you for an S3 bucket.'
              ],
              correctIndex: 1,
              explanation: 'Docker containers are ephemeral by design. Without an explicit bind-mount or Docker volume mapped to `/home/node/.n8n`, container recreation wipes out the SQLite database file and local config.'
            },
            {
              id: 'q1-2',
              question: 'Why is `127.0.0.1:5678:5678` safer than `0.0.0.0:5678:5678` during local development?',
              options: [
                'It runs faster because of local caching.',
                'It limits network packet reception exclusively to the loopback interface of your local machine, preventing devices on the same LAN or WiFi from reaching your canvas.',
                'It automatically provides an SSL certificate.',
                'It enables Python task runners in n8n.'
              ],
              correctIndex: 1,
              explanation: 'Binding to `127.0.0.1` guarantees that only processes running on the exact same physical machine can connect, protecting your sensitive workflow credentials from other devices on the same network.'
            }
          ],
          practicalChallenge: {
            prompt: 'Draft an operational runbook for backing up your local n8n instance. What files need to be copied? How can you export all workflows and credentials using the n8n CLI?',
            hints: [
              'Check the `n8n export:workflows` and `n8n export:credentials` CLI commands in the official documentation.',
              'Remember that credentials require `--decrypted` to be human-readable or transferable across instances with different encryption keys.'
            ],
            solutionNotes: 'A complete backup strategy includes (1) copying the entire `n8n_data` directory while the container is paused, (2) storing the `N8N_ENCRYPTION_KEY`, and (3) using `docker exec -u node <container_id> n8n export:workflows --all --output=/home/node/.n8n/workflows_backup.json`.'
          },
          keyTakeaways: [
            'Docker Compose with persistent volumes is the industry gold standard for running n8n development environments.',
            'Never leave `N8N_ENCRYPTION_KEY` unset or unbacked; it is the cryptographic root of trust for all credentials in your database.',
            'Keep development instances bound to localhost (`127.0.0.1`) until you configure an HTTPS reverse proxy with valid TLS certificates.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n Docker Hosting Guide',
              url: 'https://docs.n8n.io/hosting/installation/docker/',
              note: 'Recommended Docker Compose configuration and volume setup.'
            },
            {
              title: 'n8n Environment Variables Reference',
              url: 'https://docs.n8n.io/hosting/configuration/environment-variables/',
              note: 'Complete listing of all security, networking, and execution configuration options.'
            }
          ]
        }
      ]
    }
  ]
};
