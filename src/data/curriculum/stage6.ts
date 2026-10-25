import { Stage } from '../../types/curriculum';

export const stage6: Stage = {
  "id": "stage-6",
  "number": 6,
  "title": "Advanced Integrations and Automation Architecture",
  "subtitle": "Enterprise SQL, Custom Node Extensibility & Solution Architecture",
  "description": "Architect mission-critical multi-system integrations. Master ACID database transactions, build custom n8n nodes in TypeScript, design two-way sync patterns, and run client discovery audits.",
  "badge": "Stage 6 \u2022 Architecture",
  "accentColor": "#06B6D4",
  "modules": [
    {
      "id": "module-24",
      "number": 24,
      "stageId": "stage-6",
      "title": "Databases, Queues, and Enterprise Data",
      "subtitle": "ACID Transactions, Parameterized SQL & High-Throughput Buffers",
      "description": "Master enterprise data handling in n8n. Learn relational schema modeling, primary/foreign keys, transactional consistency (BEGIN/COMMIT/ROLLBACK), parameterized queries, and message queue buffers.",
      "difficulty": "Advanced",
      "estimatedMinutes": 75,
      "lessons": [
        {
          "id": "lesson-24-1",
          "moduleId": "module-24",
          "stageId": "stage-6",
          "title": "Enterprise Relational Data Patterns & SQL Engineering",
          "subtitle": "Transactions, relational integrity, parameterized bindings, and bulk ingest",
          "difficulty": "Advanced",
          "estimatedMinutes": 75,
          "prerequisites": [
            "Module 11",
            "Module 20"
          ],
          "whyItMatters": "Enterprise clients do not run their businesses on Google Sheets. They run on PostgreSQL, MySQL, SQL Server, and Oracle databases containing millions of relational rows. If your workflow updates a customer's balance without atomic transactions, a network drop in the middle of execution causes partial writes, corrupting the financial ledger.",
          "relatableProblem": "A workflow deducts 100 inventory units from a product table, then attempts to create an order record. The order insert fails due to an invalid foreign key. Because transactions were not used, the inventory was permanently subtracted, but no order was created, resulting in phantom inventory loss. Atomic transactions prevent this.",
          "firstPrinciplesExplanation": "ACID Guarantees in Automation:\n- Atomicity: 'All or nothing'. Either every database query in the workflow succeeds, or all changes are completely rolled back.\n- Consistency: Database constraints (Foreign keys, UNIQUE indexes, CHECK constraints) must never be violated.\n- Isolation: Concurrent workflow runs cannot read intermediate, uncommitted writes from other executions.\n- Durability: Once a transaction commits, the data survives crashes.\n\nUsing Parameterized SQL:\nNever concatenate variables into SQL strings. Always use parameter bindings:\n```sql\n-- BAD: Vulnerable to SQL Injection!\nSELECT * FROM users WHERE email = '{{ $json.email }}';\n\n-- GOOD: Safe Parameterized Binding\nSELECT * FROM users WHERE email = $1;\n-- Parameters: [ {{ $json.email }} ]\n```",
          "visualExplanation": {
            "diagramType": "mermaid",
            "caption": "Atomic Transaction Lifecycle (BEGIN -> Operations -> COMMIT / ROLLBACK)",
            "mermaidCode": "sequenceDiagram\n  autonumber\n  participant W as n8n Workflow Engine\n  participant DB as PostgreSQL Database\n\n  W->>DB: BEGIN TRANSACTION;\n  W->>DB: UPDATE accounts SET balance = balance - 500 WHERE id = 101;\n  W->>DB: INSERT INTO audit_logs (account_id, delta) VALUES (101, -500);\n  alt All Steps Successful\n    W->>DB: COMMIT;\n    Note over DB: All changes written permanently to disk atomically.\n  else Any Step Fails (e.g. Insufficient Funds Error)\n    W->>DB: ROLLBACK;\n    Note over DB: Database state reverted to exact moment before BEGIN.<br/>Zero partial writes!\n  end"
          },
          "technicalDetails": "Bulk Data Transfers in n8n:\nWhen inserting 5,000 rows into PostgreSQL:\n- Avoid: Executing 5,000 individual `INSERT` queries in a loop (takes 45+ seconds).\n- Use: Batch size of 500 or multi-row insert: `INSERT INTO leads (name, email) VALUES ($1, $2), ($3, $4)...` or use n8n's native PostgreSQL node in 'Insert' mode with multiple incoming items (takes ~300 milliseconds via prepared statements).",
          "workedExample": {
            "scenario": "Executing a financial transfer between two accounts inside an atomic transaction.",
            "inputJson": {
              "sourceAccountId": 401,
              "destAccountId": 802,
              "transferAmount": 250
            },
            "transformationLogic": "Run multi-statement transaction in Postgres node.",
            "outputJson": {
              "transactionStatus": "COMMITTED",
              "sourceNewBalance": 1750,
              "destNewBalance": 3250,
              "auditId": "tx_99124"
            },
            "explanation": "Both balance updates succeed or fail as a single unit, guaranteeing that money cannot vanish between accounts."
          },
          "stepByStepLab": {
            "title": "Executing Safe Parameterized SQL Queries",
            "goal": "Build an n8n query using `$1` bindings and handle foreign key constraint violations cleanly.",
            "steps": [
              {
                "stepNumber": 1,
                "title": "Set Up Postgres Node",
                "instruction": "Add a Postgres node. Operation: 'Execute a SQL Query'."
              },
              {
                "stepNumber": 2,
                "title": "Write Parameterized Query",
                "instruction": "Enter query: `SELECT id, name, email FROM clients WHERE active = $1 AND credit_limit >= $2;`."
              },
              {
                "stepNumber": 3,
                "title": "Bind Parameters",
                "instruction": "Under 'Query Parameters', add Parameter 1: `true`, Parameter 2: `10000`."
              },
              {
                "stepNumber": 4,
                "title": "Test Query",
                "instruction": "Execute the node. Confirm that results are returned safely without string concatenation."
              }
            ],
            "expectedResult": "Records matching criteria return safely with 100% SQL injection immunity."
          },
          "commonMistakes": [
            {
              "mistake": "Using `SELECT * FROM table` without a `LIMIT` clause on a table with 2,000,000 rows.",
              "consequence": "n8n attempts to load 2 million items into Node.js memory at once, crashing the container with an Out of Memory error.",
              "correction": "Always use pagination, filters, and `LIMIT 1000` when querying enterprise database tables."
            }
          ],
          "knowledgeCheck": [
            {
              "id": "q24-1",
              "question": "What is the primary danger of using string concatenation instead of parameterized bindings in SQL nodes?",
              "options": [
                "The database runs slower.",
                "It introduces severe SQL injection vulnerabilities that allow attackers to bypass authentication or drop database tables.",
                "The output is converted to XML.",
                "It requires a paid license."
              ],
              "correctIndex": 1,
              "explanation": "Parameterized bindings ($1, $2) separate SQL code from user data, ensuring that malicious inputs like `'; DROP TABLE users; --` are treated as harmless string values."
            }
          ],
          "practicalChallenge": {
            "prompt": "Design an archival pipeline: Query all order records older than 2 years from PostgreSQL, write them to an S3 cold storage bucket as compressed JSON, and then delete the archived records from PostgreSQL inside a transaction.",
            "hints": [
              "Use Postgres Select -> AWS S3 Put -> Postgres Delete where id IN (...)."
            ],
            "solutionNotes": "This maintains database performance by keeping hot transactional tables small and optimized."
          },
          "keyTakeaways": [
            "Always wrap multi-step financial or inventory updates in atomic database transactions.",
            "Never use raw string interpolation for SQL queries; always use parameterized bindings.",
            "Apply LIMIT and batch processing to protect server memory when dealing with large datasets."
          ],
          "officialDocLinks": [
            {
              "title": "Official n8n Database Best Practices",
              "url": "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.postgres/",
              "note": "Documentation on parameterized queries and connection pooling."
            }
          ]
        }
      ]
    },
    {
      "id": "module-25",
      "number": 25,
      "stageId": "stage-6",
      "title": "Custom Nodes and Extensibility",
      "subtitle": "Building Community Nodes with TypeScript & n8n-node-dev",
      "description": "Learn when and how to extend n8n. Understand declarative vs programmatic node definitions, building custom nodes with TypeScript, creating credentials, and publishing community nodes safely.",
      "difficulty": "Professional",
      "estimatedMinutes": 75,
      "lessons": [
        {
          "id": "lesson-25-1",
          "moduleId": "module-25",
          "stageId": "stage-6",
          "title": "Developing Custom n8n Nodes in TypeScript",
          "subtitle": "Declarative definitions, execute functions, and community packaging",
          "difficulty": "Professional",
          "estimatedMinutes": 75,
          "prerequisites": [
            "Module 8",
            "Module 12"
          ],
          "whyItMatters": "While n8n has 400+ nodes and the generic HTTP Request node, enterprises often need custom-branded nodes for proprietary internal APIs, or agency developers want to publish public community nodes to build authority. Knowing the architecture of custom nodes lets you extend the n8n ecosystem without limits.",
          "relatableProblem": "A SaaS startup wants to make it effortless for their 10,000 customers to connect their platform in n8n. Telling users to configure generic HTTP Request nodes with manual headers and URLs has a 40% user drop-off rate. By building and publishing an official community node (`n8n-nodes-acme`), customers get a beautiful drag-and-drop node with pre-built dropdowns and validated fields.",
          "firstPrinciplesExplanation": "Two Approaches to Building Custom Nodes in n8n:\n\n1. Declarative Nodes (Lightweight):\n   - Best for standard REST APIs.\n   - You define the API endpoints, methods, and parameters in a JSON-like TypeScript description object.\n   - n8n automatically handles making the HTTP requests without writing custom request logic!\n2. Programmatic Nodes (Full Power):\n   - Implements the `INodeType` interface with a custom `execute()` function.\n   - Gives you total programmatic control: You can parse binary files, execute cryptographic calculations, handle complex pagination, and make multiple sequential API calls inside a single node.\n\nCustom Node Package Structure:\n```text\nn8n-nodes-myapi/\n\u251c\u2500\u2500 package.json (with n8n property)\n\u251c\u2500\u2500 tsconfig.json\n\u2514\u2500\u2500 nodes/\n    \u2514\u2500\u2500 MyApi/\n        \u251c\u2500\u2500 MyApi.node.ts (Node definition & execute method)\n        \u251c\u2500\u2500 MyApi.node.json (Icons & metadata)\n        \u2514\u2500\u2500 myApi.svg\n```",
          "visualExplanation": {
            "diagramType": "mermaid",
            "caption": "Custom Node Execution Flow (INodeType Contract)",
            "mermaidCode": "graph LR\n  CANVAS[\"User configures node on Canvas\"] --> EXEC[\"n8n Core invokes execute() function\"]\n  EXEC --> IN[\"Read Items: this.getInputData()\"]\n  IN --> PARAMS[\"Read Params: this.getNodeParameter('fieldName', i)\"]\n  PARAMS --> HTTP[\"Make Request: this.helpers.requestWithAuthentication()\"]\n  HTTP --> OUT[\"Return: this.prepareOutputData(returnData)\"]\n\n  style CANVAS fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC\n  style EXEC fill:#1E293B,stroke:#F59E0B,stroke-width:2px,color:#F8FAFC\n  style HTTP fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC\n  style OUT fill:#0F172A,stroke:#8B5CF6,stroke-width:2px,color:#F8FAFC"
          },
          "technicalDetails": "The `INodeType` Interface Skeleton:\n```typescript\nimport { INodeType, INodeTypeDescription, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';\n\nexport class CustomService implements INodeType {\n  description: INodeTypeDescription = {\n    displayName: 'Custom Service',\n    name: 'customService',\n    icon: 'file:service.svg',\n    group: ['transform'],\n    version: 1,\n    description: 'Consume our internal API',\n    defaults: { name: 'Custom Service' },\n    inputs: ['main'],\n    outputs: ['main'],\n    properties: [\n      {\n        displayName: 'Resource',\n        name: 'resource',\n        type: 'options',\n        options: [{ name: 'User', value: 'user' }],\n        default: 'user'\n      }\n    ]\n  };\n\n  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {\n    const items = this.getInputData();\n    const returnData: INodeExecutionData[] = [];\n    for (let i = 0; i < items.length; i++) {\n      const result = await this.helpers.httpRequest({ url: 'https://api.internal/v1' });\n      returnData.push({ json: result });\n    }\n    return [returnData];\n  }\n}\n```",
          "workedExample": {
            "scenario": "Publishing an internal custom node to a self-hosted n8n instance.",
            "inputJson": {
              "packageName": "n8n-nodes-custom-billing",
              "nodeFolder": "~/.n8n/custom"
            },
            "transformationLogic": "Build with `npm run build` and link into `~/.n8n/custom` volume.",
            "outputJson": {
              "registrationStatus": "LOADED",
              "nodeVisibleOnCanvas": true,
              "category": "Custom Internal Nodes"
            },
            "explanation": "Once mounted, n8n automatically discovers the custom node and presents it in the node search library."
          },
          "stepByStepLab": {
            "title": "Scaffolding a Custom Node with n8n-node-dev",
            "goal": "Generate a custom node project using the official n8n starter template.",
            "steps": [
              {
                "stepNumber": 1,
                "title": "Clone the Starter Template",
                "instruction": "Run: `git clone https://github.com/n8n-io/n8n-nodes-starter.git my-n8n-node && cd my-n8n-node`."
              },
              {
                "stepNumber": 2,
                "title": "Inspect package.json",
                "instruction": "Notice the `n8n` field declaring where node and credential files reside."
              },
              {
                "stepNumber": 3,
                "title": "Build the TypeScript Code",
                "instruction": "Run `npm install && npm run build`. Verify that compiled JavaScript files appear in the `dist/` directory."
              },
              {
                "stepNumber": 4,
                "title": "Link to Local Development",
                "instruction": "Use `npm link` in your custom node folder and `npm link my-n8n-node` in your local `~/.n8n` installation."
              }
            ],
            "expectedResult": "Your custom node appears in the n8n canvas node selector."
          },
          "commonMistakes": [
            {
              "mistake": "Installing unverified, closed-source community nodes on a production finance instance.",
              "consequence": "Community nodes run with the same permissions as the n8n container, creating potential supply-chain risks.",
              "correction": "Always review the source code and security audit of community nodes before installing in production."
            }
          ],
          "knowledgeCheck": [
            {
              "id": "q25-1",
              "question": "What is the difference between a declarative node and a programmatic node in n8n?",
              "options": [
                "Declarative nodes are written in HTML; programmatic nodes are written in C++.",
                "Declarative nodes describe REST API parameters in a configuration object without custom execute logic; programmatic nodes implement full custom execute() functions in TypeScript.",
                "Declarative nodes only work in n8n Cloud.",
                "There is no difference."
              ],
              "correctIndex": 1,
              "explanation": "Declarative nodes provide a low-code specification for standard REST endpoints, while programmatic nodes execute custom TypeScript code inside `execute()` for maximum flexibility."
            }
          ],
          "practicalChallenge": {
            "prompt": "When is writing a custom node justified over simply using the HTTP Request node or a Sub-Workflow?",
            "hints": [
              "Consider developer UX, proprietary authentication, and public distribution."
            ],
            "solutionNotes": "A custom node is justified when: (1) Reusable across dozens of workflows with complex UI parameter dropdowns, (2) Proprietary cryptographic signatures are needed, or (3) Publishing a public integration for an entire product ecosystem."
          },
          "keyTakeaways": [
            "Use the HTTP Request node first; build custom nodes when reusability, complex auth, or packaging demands it.",
            "Declarative nodes are fast for standard REST APIs; programmatic nodes provide full TypeScript power.",
            "Audit community node dependencies to protect production security."
          ],
          "officialDocLinks": [
            {
              "title": "Official n8n Node Development Guide",
              "url": "https://docs.n8n.io/integrations/creating-nodes/",
              "note": "Comprehensive documentation for scaffolding, building, and publishing custom nodes."
            }
          ]
        }
      ]
    },
    {
      "id": "module-26",
      "number": 26,
      "stageId": "stage-6",
      "title": "Systems Integration Patterns",
      "subtitle": "Single Source of Truth, Event Sourcing & Two-Way Synchronization",
      "description": "Architect resilient multi-system data flows. Master Single Source of Truth (SSOT) decisions, bi-directional sync loops, event sourcing, fan-out/fan-in patterns, and rate-limit coordination.",
      "difficulty": "Professional",
      "estimatedMinutes": 80,
      "lessons": [
        {
          "id": "lesson-26-1",
          "moduleId": "module-26",
          "stageId": "stage-6",
          "title": "Distributed Systems Integration & Two-Way Sync",
          "subtitle": "Avoiding infinite sync loops, resolving race conditions, and SSOT architecture",
          "difficulty": "Professional",
          "estimatedMinutes": 80,
          "prerequisites": [
            "Module 14",
            "Module 24"
          ],
          "whyItMatters": "Companies rarely use a single tool. Customer data lives in HubSpot (Sales), Zendesk (Support), Stripe (Billing), and PostgreSQL (Core App). Synchronizing data between these systems without creating infinite loops (HubSpot updates Zendesk -> Zendesk triggers webhook -> updates HubSpot -> triggers webhook...) requires mature systems integration architecture.",
          "relatableProblem": "A business sets up two workflows: 'Sync HubSpot to Salesforce' and 'Sync Salesforce to HubSpot'. Because neither workflow checks who initiated the update, a single contact edit creates an infinite ping-pong loop that makes 50,000 API calls in 10 minutes, maxing out both platforms' API quotas and locking the sales team out for the day. Implementing an 'Origin Stamp' permanently breaks the loop.",
          "firstPrinciplesExplanation": "Core Integration Patterns:\n\n1. Single Source of Truth (SSOT):\n   - Designate one system as the authoritative owner of each data field.\n   - Example: Stripe owns `creditCardExpiry` and `billingStatus`. HubSpot owns `leadStage`. Neither system should attempt to overwrite the other's authoritative domain.\n2. Breaking Two-Way Sync Loops (The Origin Stamp Pattern):\n   - When n8n updates an external system, include an update tag: `updatedBy: 'n8n_sync'` or compare timestamps.\n   - When receiving webhooks, check: `if (event.updatedBy === 'n8n_sync') return;` (Stop execution immediately!).\n3. Fan-Out / Fan-In Pattern:\n   - Fan-Out: A single event (e.g. Order Placed) is dispatched asynchronously to 5 independent systems (Shipping, Invoicing, Analytics, Inventory, Slack).\n   - Fan-In: Waiting for all 5 sub-tasks to complete before sending a unified completion receipt to the customer.\n4. Event Sourcing & Audit Logs:\n   - Rather than merely overwriting current state, record every state change as an immutable event in a log table (`order.created`, `order.paid`, `order.shipped`).",
          "visualExplanation": {
            "diagramType": "mermaid",
            "caption": "The Origin Stamp Pattern to Prevent Infinite Two-Way Sync Loops",
            "mermaidCode": "graph LR\n  subgraph HubSpot[\"HubSpot CRM\"]\n    H_HOOK[\"Contact Updated Webhook\"]\n    H_REC[(\"HubSpot Contact Record\")]\n  end\n\n  subgraph n8n[\"n8n Synchronization Engine\"]\n    CHECK{\"Check 'lastModifiedBy'<br/>Is it 'n8n_sync'?\"}\n    UPDATE_Z[\"Update Zendesk Profile<br/>Stamp: lastModifiedBy='n8n_sync'\"]\n    IGNORE[\"Drop Event: Terminate Loop!\"]\n  end\n\n  subgraph Zendesk[\"Zendesk Support\"]\n    Z_REC[(\"Zendesk User Record\")]\n  end\n\n  H_HOOK --> CHECK\n  CHECK -->|Yes (Echo Loop)| IGNORE\n  CHECK -->|No (Human Edit)| UPDATE_Z\n  UPDATE_Z --> Z_REC\n\n  style HubSpot fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC\n  style n8n fill:#1E293B,stroke:#10B981,stroke-width:2px,color:#F8FAFC\n  style Zendesk fill:#0F172A,stroke:#F59E0B,stroke-width:2px,color:#F8FAFC"
          },
          "technicalDetails": "Timestamp & Version-Based Conflict Resolution:\nWhen syncing records across two systems that can both be edited concurrently:\n- Store a `last_synced_at` ISO timestamp.\n- Compare: If `incoming_event.updated_at > database.updated_at`, proceed with update.\n- If `incoming_event.updated_at < database.updated_at`, discard incoming event as a stale update (LWW: Last-Write-Wins rule).",
          "workedExample": {
            "scenario": "Handling a conflict where an update arrives out of order.",
            "inputJson": {
              "recordId": "usr_99",
              "incomingTimestamp": "2026-10-25T01:00:00.000Z",
              "dbTimestamp": "2026-10-25T01:05:00.000Z"
            },
            "transformationLogic": "Compare timestamps. Since database timestamp is newer, discard the stale update.",
            "outputJson": {
              "action": "DISCARDED",
              "reason": "Stale update: database already has newer version from 01:05:00Z"
            },
            "explanation": "Out-of-order webhook delivery is prevented from overwriting newer user data."
          },
          "stepByStepLab": {
            "title": "Building a Loop-Proof Sync Filter",
            "goal": "Build an n8n webhook listener that detects self-triggered updates and terminates execution.",
            "steps": [
              {
                "stepNumber": 1,
                "title": "Add Webhook Trigger",
                "instruction": "Add a Webhook node simulating an incoming CRM update."
              },
              {
                "stepNumber": 2,
                "title": "Add an If Node Loop Filter",
                "instruction": "Check condition: String `{{ $json.body.modifiedBy }}` Equals `n8n_sync`."
              },
              {
                "stepNumber": 3,
                "title": "Wire Outputs",
                "instruction": "On True: Connect a 'No Operation' or Stop node. On False: Connect your downstream synchronization actions."
              },
              {
                "stepNumber": 4,
                "title": "Test Both Cases",
                "instruction": "Send a payload with `modifiedBy: 'n8n_sync'` and verify it halts immediately."
              }
            ],
            "expectedResult": "Self-triggered sync webhooks are dropped instantly, guaranteeing loop termination."
          },
          "commonMistakes": [
            {
              "mistake": "Setting up two-way sync without an origin identifier or last-modified timestamp.",
              "consequence": "Creates destructive infinite ping-pong loops that rapidly consume API quotas and trigger provider bans.",
              "correction": "Always stamp updates with an automation identifier (`modifiedBy: 'n8n'`) and filter out self-generated events."
            }
          ],
          "knowledgeCheck": [
            {
              "id": "q26-1",
              "question": "What is the primary purpose of the 'Origin Stamp' pattern in two-way automation synchronization?",
              "options": [
                "To translate timestamps into UTC.",
                "To mark updates initiated by the automation itself so downstream webhooks can identify and ignore them, preventing infinite circular loops.",
                "To encrypt customer passwords.",
                "To compress JSON data."
              ],
              "correctIndex": 1,
              "explanation": "Tagging automated updates allows incoming webhook listeners to distinguish between human-initiated changes (which must be synced) and bot-initiated echoes (which must be ignored)."
            }
          ],
          "practicalChallenge": {
            "prompt": "Design a Fan-Out / Fan-In architecture in n8n: When a new enterprise order arrives, fan-out in parallel to (1) Stripe Charge, (2) ShipStation Label, (3) HubSpot Deal Stage, and wait for all three to complete before sending a Slack alert.",
            "hints": [
              "Use branching from the trigger followed by a Merge node in 'Wait for Both' mode."
            ],
            "solutionNotes": "This achieves parallel execution while maintaining synchronization before the final notification."
          },
          "keyTakeaways": [
            "Clearly define the Single Source of Truth (SSOT) for each data attribute.",
            "Always implement an Origin Stamp to prevent infinite two-way sync loops.",
            "Use Last-Write-Wins timestamp checks to handle out-of-order webhook delivery."
          ],
          "officialDocLinks": [
            {
              "title": "Official n8n Merge Node Documentation",
              "url": "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.merge/",
              "note": "Documentation on combining parallel asynchronous execution branches."
            }
          ]
        }
      ]
    },
    {
      "id": "module-27",
      "number": 27,
      "stageId": "stage-6",
      "title": "Professional Automation Assessment",
      "subtitle": "Client Discovery, Feasibility Analysis & Technical Specs",
      "description": "Evaluate real business automation opportunities. Master discovery interviews, technical requirements documents (TRD), calculating ROI and operational payback periods, and building risk matrices.",
      "difficulty": "Professional",
      "estimatedMinutes": 65,
      "lessons": [
        {
          "id": "lesson-27-1",
          "moduleId": "module-27",
          "stageId": "stage-6",
          "title": "Client Discovery, Feasibility & Technical Design Docs",
          "subtitle": "How to evaluate client workflows, calculate ROI, and write technical specifications",
          "difficulty": "Professional",
          "estimatedMinutes": 65,
          "prerequisites": [
            "Module 0",
            "Module 23"
          ],
          "whyItMatters": "Junior automators jump into the canvas and start connecting nodes before understanding the client's actual requirements, leading to scope creep, angry clients, and failed projects. Senior automation consultants conduct structured discovery interviews, map edge cases, calculate financial ROI, and write a Technical Design Document (TDD) that gets signed off before touching a single node.",
          "relatableProblem": "A freelancer agrees to build an automation for a flat $1,000 to 'sync orders to QuickBooks'. Halfway through, they discover QuickBooks requires custom multi-currency tax calculations that take 40 hours of custom code, and the client's QuickBooks tier doesn't even have API access enabled. Conducting a professional feasibility assessment prevents this nightmare.",
          "firstPrinciplesExplanation": "The 5 Phases of Professional Automation Assessment:\n\n1. Process Discovery & Pain Mapping:\n   - Interview stakeholders: Who does the manual work today? How many hours per week? What are the common human errors?\n2. Technical Feasibility Check:\n   - Do all target platforms have public REST APIs or webhooks?\n   - What are their rate limits, authentication methods, and subscription tier requirements?\n3. Financial ROI Calculation:\n   - Formula: `Annual Savings = (Hours Saved/Week * 52 * Hourly Rate) - (Automation Hosting & API Costs)`.\n   - If an automation saves 10 hours/week of an employee making $40/hour, that is $20,800/year in direct savings! Charging $5,000 for the project is an easy sell.\n4. Risk & Edge Case Analysis:\n   - What happens when an API is down? What if a customer inputs emojis or missing fields?\n5. The Technical Requirements Document (TRD):\n   - A 2-page document containing: Scope of Work, Architecture Diagram, Input/Output Schemas, Acceptance Criteria, and Assumptions.",
          "visualExplanation": {
            "diagramType": "mermaid",
            "caption": "The Professional Automation Assessment Lifecycle",
            "mermaidCode": "graph TD\n  D1[\"1. Discovery Interview<br/>Map manual process & pain points\"] --> D2[\"2. API Feasibility Audit<br/>Check endpoints, tiers & rate limits\"]\n  D2 --> D3[\"3. Calculate Business ROI<br/>Hours saved * Wage vs System Cost\"]\n  D3 --> D4[\"4. Write Technical Spec (TRD)<br/>Schemas, edge cases & acceptance criteria\"]\n  D4 --> D5[\"5. Client Sign-Off & Contract<br/>Scope locked before opening canvas\"]\n\n  style D1 fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC\n  style D2 fill:#0F172A,stroke:#F59E0B,stroke-width:2px,color:#F8FAFC\n  style D3 fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC\n  style D4 fill:#0F172A,stroke:#8B5CF6,stroke-width:2px,color:#F8FAFC\n  style D5 fill:#0F172A,stroke:#EC4899,stroke-width:2px,color:#F8FAFC"
          },
          "technicalDetails": "The 6 Mandatory Questions for Every Client Discovery Call:\n1. 'What exact event triggers this process today?'\n2. 'Where does the data originate, and what fields are strictly required vs optional?'\n3. 'What third-party software tiers are you currently subscribed to (Free, Starter, Enterprise)?'\n4. 'How many records or transactions occur per day/month?'\n5. 'What is the acceptable delay between the event happening and the action completing (Sub-second, 5 minutes, overnight)?'\n6. 'Who on your team has admin permissions to grant API tokens?'",
          "workedExample": {
            "scenario": "An ROI calculation for an invoice processing automation proposal.",
            "inputJson": {
              "manualHoursPerWeek": 15,
              "employeeHourlyCost": 35,
              "n8nHostingMonthlyCost": 20,
              "ocrApiMonthlyCost": 30,
              "projectFee": 3500
            },
            "transformationLogic": "Calculate annual gross savings, annual operational expenses, net annual savings, and payback period.",
            "outputJson": {
              "grossAnnualSavings": 27300,
              "annualOpEx": 600,
              "netAnnualSavings": 26700,
              "paybackPeriodMonths": 1.57,
              "roiPercent": "762%"
            },
            "explanation": "Presenting this calculation to the client proves that their $3,500 investment pays for itself in just 6 weeks."
          },
          "stepByStepLab": {
            "title": "Drafting an Automation Technical Requirements Document (TRD)",
            "goal": "Write a standardized 1-page TRD using the provided client discovery template.",
            "steps": [
              {
                "stepNumber": 1,
                "title": "Define Project Scope & Objective",
                "instruction": "State the business problem: 'Automate lead qualification and calendar routing for Inbound Sales'."
              },
              {
                "stepNumber": 2,
                "title": "Document Input & Output Schemas",
                "instruction": "List all JSON fields: `leadEmail`, `budget`, `companySize`, and expected CRM output."
              },
              {
                "stepNumber": 3,
                "title": "List Technical Constraints",
                "instruction": "Specify rate limits (e.g. HubSpot API allows 100 requests / 10s) and authentication requirements."
              },
              {
                "stepNumber": 4,
                "title": "Define Acceptance Criteria",
                "instruction": "State the definition of done: 'A test submission with valid email is delivered to Slack within 3 seconds and appears in HubSpot with deal value'."
              }
            ],
            "expectedResult": "A clear, professional project specification ready for client approval."
          },
          "commonMistakes": [
            {
              "mistake": "Quoting a project price before checking the client's API tier access.",
              "consequence": "You discover the client has a free plan that doesn't permit webhooks or API access, stalling the project.",
              "correction": "Always verify account tiers and API permissions during the discovery phase."
            }
          ],
          "knowledgeCheck": [
            {
              "id": "q27-1",
              "question": "Why should a technical automation engineer calculate financial ROI during client discovery?",
              "options": [
                "To report earnings to the tax authority.",
                "To demonstrate clear financial value to stakeholders, justifying professional project fees and shortening sales cycles.",
                "To determine how many servers to buy.",
                "It is required by n8n software."
              ],
              "correctIndex": 1,
              "explanation": "When you demonstrate that an automation saving 15 hours/week yields $26,000+ in annual savings, a $4,000 project quote is perceived as high-ROI business investment rather than an expense."
            }
          ],
          "practicalChallenge": {
            "prompt": "Review the Client Discovery Template in the Resources tab. Adapt it for an e-commerce brand that wants to automate abandoned cart SMS reminders via Klaviyo and Twilio.",
            "hints": [
              "Consider opt-in consent regulations (TCPA/GDPR) and cart value thresholds."
            ],
            "solutionNotes": "Include mandatory compliance checks: only send SMS to customers who explicitly ticked the marketing opt-in checkbox."
          },
          "keyTakeaways": [
            "Never build before conducting structured technical discovery.",
            "Verify third-party API tiers, rate limits, and authentication scopes upfront.",
            "Use financial ROI calculations to communicate immense business value to clients."
          ],
          "officialDocLinks": [
            {
              "title": "Official n8n Case Studies & ROI",
              "url": "https://n8n.io/workflows/",
              "note": "Production workflow templates and business process automation examples."
            }
          ]
        }
      ]
    }
  ]
};
