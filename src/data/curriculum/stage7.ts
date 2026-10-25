import { Stage } from '../../types/curriculum';

export const stage7: Stage = {
  "id": "stage-7",
  "number": 7,
  "title": "Portfolio, Client Work, and Income",
  "subtitle": "High-Value Services, Agency Proposals & The Master Capstone",
  "description": "Monetize your automation engineering skills. Master high-margin service offerings, write winning proposals and retainers, and build the comprehensive Enterprise Multi-Agent Lead & Support Capstone.",
  "badge": "Stage 7 \u2022 Professional & Capstone",
  "accentColor": "#EA4B3C",
  "modules": [
    {
      "id": "module-28",
      "number": 28,
      "stageId": "stage-7",
      "title": "Business Use Cases and Service Opportunities",
      "subtitle": "High-Margin Automation Offerings in Modern Business",
      "description": "Discover where businesses happily pay $3,000 to $15,000 for automation. Deep dives into B2B lead qualification, automated invoice ingestion, churn alerting, and CRM data cleansing.",
      "difficulty": "Professional",
      "estimatedMinutes": 75,
      "lessons": [
        {
          "id": "lesson-28-1",
          "moduleId": "module-28",
          "stageId": "stage-7",
          "title": "High-Margin Automation Service Offerings",
          "subtitle": "Productized services, business problem analysis, and pricing strategies",
          "difficulty": "Professional",
          "estimatedMinutes": 75,
          "prerequisites": [
            "Module 27"
          ],
          "whyItMatters": "Technical skill without commercial positioning is like an engine without wheels. Clients don't buy 'n8n workflows'\u2014they buy reduced payroll costs, faster speed-to-lead, fewer human billing errors, and 24/7 customer support. Understanding high-value business use cases enables you to sell solutions at premium prices.",
          "relatableProblem": "A freelancer pitches: 'I will build you 5 n8n workflows for $500'. Clients ignore them because they don't know what n8n is or why they need it. An agency consultant pitches: 'We implement an Automated Lead Response Pipeline that contacts inbound buyers within 60 seconds, increasing qualified sales calls by 34%'. That consultant closes deals at $5,000 upfront plus $1,000/month retainers.",
          "firstPrinciplesExplanation": "The 4 High-Margin Automation Categories:\n\n1. Revenue Acceleration (Speed-to-Lead & Sales Pipelines):\n   - When an inbound prospect submits a form, qualify them with an AI agent or Clearbit, match them with a sales rep, book a calendar slot, and alert the rep on Slack within 60 seconds.\n   - High value: Directly increases client revenue.\n2. Financial & Accounting Operations (Invoice & Receipt Processing):\n   - Ingest invoice PDFs from billing inboxes, use AI/OCR (Google Document AI / OpenAI Vision) to extract line items, check for duplicate invoice numbers in PostgreSQL, and draft bills in QuickBooks/Xero.\n   - High value: Replaces 20+ hours of tedious human data entry.\n3. Customer Support Triaging & Retention (Churn Prevention):\n   - Monitor incoming tickets or cancellation requests. Categorize urgency with AI, draft personalized responses citing company knowledge, and alert executive account managers for at-risk enterprise accounts.\n4. Bi-Directional ERP & CRM Synchronization:\n   - Keeping inventory, orders, and customer profiles consistent across Shopify, NetSuite, and Salesforce with robust error logging.",
          "visualExplanation": {
            "diagramType": "mermaid",
            "caption": "High-Value Inbound Speed-to-Lead Automation Architecture",
            "mermaidCode": "graph LR\n  FORM[\"Website Form Submission\"] --> ENRICH[\"Clearbit / Apollo API: Extract Company Revenue & Tech Stack\"]\n  ENRICH --> TIER{Evaluate Lead Value<br/>Annual Rev > $5M?}\n  TIER -->|Yes: Enterprise Tier 1| CAL[\"Instantly generate VP Sales Calendar Link\"]\n  TIER -->|No: Standard Tier 2| SDR[\"Assign to Inbound SDR Round-Robin\"]\n  CAL --> SLACK[\"Slack Alert with Full Dossier & One-Click Call Button\"]\n  SDR --> EMAIL[\"Automated Follow-Up Sequence in HubSpot\"]\n\n  style FORM fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC\n  style ENRICH fill:#1E293B,stroke:#94A3B8,stroke-width:1px,color:#F8FAFC\n  style TIER fill:#1E293B,stroke:#F59E0B,stroke-width:2px,color:#F8FAFC\n  style CAL fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC\n  style SLACK fill:#0F172A,stroke:#8B5CF6,stroke-width:2px,color:#F8FAFC"
          },
          "technicalDetails": "Structuring a Productized Service:\nInstead of custom hourly billing, package high-value workflows as fixed-scope offerings:\n- Name: 'Inbound Revenue Acceleration Engine'\n- Deliverables: Webhook form capture + Clearbit enrichment + HubSpot pipeline setup + Slack Block Kit notification + 30 days post-launch monitoring.\n- Price: $4,500 fixed fee + $750/month ongoing maintenance & error alerting.",
          "workedExample": {
            "scenario": "A business case proposal for automated invoice extraction.",
            "inputJson": {
              "clientIndustry": "Logistics & Freight",
              "monthlyInvoices": 1800,
              "manualLaborCostMonthly": 4200
            },
            "transformationLogic": "Replace manual entry with OCR + n8n pipeline costing $120/mo in compute and OCR APIs.",
            "outputJson": {
              "monthlyClientSavings": 4080,
              "annualClientSavings": 48960,
              "recommendedProjectFee": 7500,
              "monthlyRetainer": 1000
            },
            "explanation": "The client saves nearly $49,000 every year, making the $7,500 implementation fee an exceptional commercial return."
          },
          "stepByStepLab": {
            "title": "Building a Live Speed-to-Lead Prototype",
            "goal": "Build an automated lead qualification flow that enriches a lead, assigns priority, and generates an executive Slack card.",
            "steps": [
              {
                "stepNumber": 1,
                "title": "Add Webhook Trigger",
                "instruction": "Set up a Webhook node accepting `{ name: 'Jordan Hayes', company: 'Starlight Tech', budget: 12000 }`."
              },
              {
                "stepNumber": 2,
                "title": "Add Scoring Logic",
                "instruction": "Connect an Edit Fields node computing `leadScore: {{ $json.budget > 10000 ? 95 : 60 }}` and `priority: {{ $json.budget > 10000 ? 'VIP' : 'STANDARD' }}`."
              },
              {
                "stepNumber": 3,
                "title": "Format Slack Notification",
                "instruction": "Format a Slack Block Kit card highlighting the VIP status with direct booking link."
              },
              {
                "stepNumber": 4,
                "title": "Test Latency",
                "instruction": "Execute the flow. Verify that total processing time is under 150 milliseconds."
              }
            ],
            "expectedResult": "A production-speed qualification engine executing in sub-second time."
          },
          "commonMistakes": [
            {
              "mistake": "Selling 'automation hours' instead of business outcomes.",
              "consequence": "Clients view you as a cheap commodity and argue over minutes on an invoice.",
              "correction": "Sell fixed-price packages tied to measurable business metrics (hours saved, revenue accelerated)."
            }
          ],
          "knowledgeCheck": [
            {
              "id": "q28-1",
              "question": "Why is 'Speed-to-Lead' one of the easiest automation solutions to sell to B2B companies?",
              "options": [
                "Because B2B companies do not use email.",
                "Because industry data shows contacting a lead within 5 minutes results in a 9x higher conversion rate than waiting an hour; automating this directly increases client revenue.",
                "Because it requires zero software.",
                "Because leads are free."
              ],
              "correctIndex": 1,
              "explanation": "Speed-to-lead has a direct, measurable impact on top-line revenue. Businesses immediately understand that responding in seconds rather than hours closes more deals."
            }
          ],
          "practicalChallenge": {
            "prompt": "Identify 3 businesses in your local area or network. For each business, write down one manual process that costs them at least 5 hours per week, and outline the n8n automation that solves it.",
            "hints": [
              "Look at dental clinics (appointment reminders), real estate agencies (lead routing), and law firms (intake forms)."
            ],
            "solutionNotes": "This exercise bridges abstract technical knowledge with real-world commercial prospecting."
          },
          "keyTakeaways": [
            "Position your services around business outcomes (revenue gained, hours saved), not technology names.",
            "High-margin areas include Speed-to-Lead, Invoice Processing, and CRM/ERP sync.",
            "Offer productized services with fixed scopes and recurring maintenance retainers."
          ],
          "officialDocLinks": [
            {
              "title": "Official n8n Workflow Templates Library",
              "url": "https://n8n.io/workflows/",
              "note": "Hundreds of pre-built business workflows across sales, marketing, and operations."
            }
          ]
        }
      ]
    },
    {
      "id": "module-29",
      "number": 29,
      "stageId": "stage-7",
      "title": "Client Communication and Delivery",
      "subtitle": "Statements of Work, Retainers, SLAs & Credential Handover",
      "description": "Master the commercial consulting lifecycle. Learn how to draft Statements of Work (SOW), prevent scope creep, set up recurring maintenance retainers, manage client credentials responsibly, and sign off deliverables.",
      "difficulty": "Professional",
      "estimatedMinutes": 70,
      "lessons": [
        {
          "id": "lesson-29-1",
          "moduleId": "module-29",
          "stageId": "stage-7",
          "title": "The Automation Agency Playbook: SOWs, Retainers & SLAs",
          "subtitle": "Contracts, change management, recurring revenue, and responsible handovers",
          "difficulty": "Professional",
          "estimatedMinutes": 70,
          "prerequisites": [
            "Module 27",
            "Module 28"
          ],
          "whyItMatters": "Even the best technical workflow is a failure if the client refuses to pay due to unmanaged expectations or scope creep. Mastering professional client communication\u2014defining exact acceptance criteria, handling change requests, and providing monthly maintenance retainers\u2014is what separates stressed freelancers from thriving automation agencies.",
          "relatableProblem": "An engineer builds a lead routing system. The client says: 'Can we also make it sync to our custom ERP, send SMS via Twilio, and generate PDF contracts?'. Without an SOW, the engineer ends up working 60 extra unpaid hours. With a defined Scope of Work, the engineer politely replies: 'That is a fantastic feature! That falls under Phase 2; here is the change order estimate for $2,500'.",
          "firstPrinciplesExplanation": "The 3 Pillars of Client Project Delivery:\n\n1. The Statement of Work (SOW):\n   - Purpose & Business Objectives.\n   - In-Scope Items: Exact list of nodes, integrations, and triggers included.\n   - Out-of-Scope Items: Explicitly stating what is NOT included (e.g. 'Cleaning existing dirty database records prior to launch').\n   - Acceptance Criteria: Exact tests required for project sign-off and final payment.\n2. The Recurring Maintenance Retainer:\n   - Automations require maintenance: APIs change endpoints, tokens expire, third-party services suffer outages.\n   - Offer a monthly retainer ($500 - $2,500/month) covering: 24/7 uptime monitoring, error investigation, security updates, and up to 3 hours of minor modifications.\n3. Responsible Credential Handover:\n   - Never ask clients to email passwords in plain text.\n   - Use 1Password or Bitwarden share links, or guide the client to create a dedicated restricted API user with least-privilege scopes.",
          "visualExplanation": {
            "diagramType": "mermaid",
            "caption": "The Professional Client Engagement & Delivery Timeline",
            "mermaidCode": "graph LR\n  P1[\"1. Discovery & SOW Sign-off<br/>50% Upfront Deposit\"]\n  P2[\"2. Development & Testing<br/>In Isolated Dev Environment\"]\n  P3[\"3. Client UAT & Demo<br/>Verify Acceptance Criteria\"]\n  P4[\"4. Production Cutover & Sign-Off<br/>Remaining 50% Balance Paid\"]\n  P5[\"5. Transition to Monthly Retainer<br/>Recurring Maintenance & Monitoring\"]\n\n  P1 --> P2 --> P3 --> P4 --> P5\n\n  style P1 fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC\n  style P2 fill:#1E293B,stroke:#94A3B8,stroke-width:1px,color:#F8FAFC\n  style P3 fill:#1E293B,stroke:#F59E0B,stroke-width:2px,color:#F8FAFC\n  style P4 fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC\n  style P5 fill:#0F172A,stroke:#8B5CF6,stroke-width:2px,color:#F8FAFC"
          },
          "technicalDetails": "Service Level Agreement (SLA) Tiers for Retainers:\n- Standard Tier ($500/mo): Incident response within 24 business hours. Bi-weekly error log review.\n- Business Tier ($1,500/mo): Incident response within 4 hours. Automated Slack alerting on workflow failure. Weekly health checks.\n- Enterprise Tier ($3,500/mo): 1-hour critical response SLA. Dedicated on-call engineer. Redundant queue cluster hosting.",
          "workedExample": {
            "scenario": "A professional Scope of Work section detailing In-Scope vs Out-of-Scope.",
            "inputJson": {
              "client": "Apex Horizon Capital",
              "project": "Inbound Deal Flow Pipeline"
            },
            "transformationLogic": "Generate explicit boundary clauses for the contract.",
            "outputJson": {
              "inScope": [
                "Webhook ingestion from Typeform contact form",
                "Normalization of company revenue and jurisdiction",
                "PostgreSQL deal record creation with parameterized queries",
                "Slack Block Kit notification to #partner-deals channel"
              ],
              "outOfScope": [
                "Migrating historical deals from legacy Excel spreadsheets",
                "Building custom web UI portals for applicants",
                "Third-party subscription costs (Typeform, Slack, cloud hosting)"
              ],
              "acceptanceCriteria": "Sign-off occurs when 5 test submissions route successfully to PostgreSQL and Slack with valid deal IDs within 5 seconds."
            },
            "explanation": "Clear boundaries eliminate ambiguity, protect the engineer from scope creep, and give the client complete confidence in deliverables."
          },
          "stepByStepLab": {
            "title": "Creating a Project Handover Documentation Package",
            "goal": "Assemble an executive handover package containing workflow diagrams, runbooks, and credential matrices.",
            "steps": [
              {
                "stepNumber": 1,
                "title": "Generate Architecture Flowchart",
                "instruction": "Use Mermaid or n8n canvas screenshot to document the workflow topology."
              },
              {
                "stepNumber": 2,
                "title": "Draft Credential Ownership Matrix",
                "instruction": "List all connected credentials, their renewal dates, and the client team member who owns the account."
              },
              {
                "stepNumber": 3,
                "title": "Write Emergency Recovery Runbook",
                "instruction": "Document: (1) How to restart the n8n container, (2) Where error logs live, (3) How to re-run failed executions."
              },
              {
                "stepNumber": 4,
                "title": "Prepare Exported Backup JSON",
                "instruction": "Provide clean, exported workflow JSON files in a dedicated `/backups` folder."
              }
            ],
            "expectedResult": "A white-glove delivery dossier that demonstrates senior engineering excellence."
          },
          "commonMistakes": [
            {
              "mistake": "Handing over workflows without an error runbook or maintenance agreement.",
              "consequence": "The moment an external API token expires 3 months later, the client panics and blames you for 'broken code'.",
              "correction": "Educate the client that external APIs change and offer a recurring maintenance retainer to handle updates."
            }
          ],
          "knowledgeCheck": [
            {
              "id": "q29-1",
              "question": "What is the primary role of an 'Out-of-Scope' section in an automation Statement of Work?",
              "options": [
                "To list things the engineer doesn't know how to do.",
                "To explicitly define boundaries and protect against unbilled scope creep by documenting features that are not included in the agreed fixed price.",
                "To reduce the contract length.",
                "It is a legal formality with no practical purpose."
              ],
              "correctIndex": 1,
              "explanation": "Out-of-Scope clauses protect both parties by managing expectations and providing a clear path for billing future feature requests via change orders."
            }
          ],
          "practicalChallenge": {
            "prompt": "Draft a polite, professional response to a client who asks for a major out-of-scope feature 2 days before the scheduled project launch date.",
            "hints": [
              "Validate their idea, reference the current SOW launch date, and present the feature as Phase 2."
            ],
            "solutionNotes": "Example: 'That feature will add tremendous value! To ensure we hit our scheduled launch date on Friday, let's deploy the current approved scope as planned. I have documented this feature and will prepare a Phase 2 proposal for us to review next week.'"
          },
          "keyTakeaways": [
            "Always secure an SOW with defined acceptance criteria and 50% deposit before building.",
            "Clearly document Out-of-Scope items to protect against unpaid scope creep.",
            "Transition project clients into recurring monthly maintenance retainers for stable cash flow."
          ],
          "officialDocLinks": [
            {
              "title": "Official n8n Community Showcases",
              "url": "https://n8n.io/workflows/",
              "note": "Explore real agency architectures and client implementation showcases."
            }
          ]
        }
      ]
    },
    {
      "id": "module-30",
      "number": 30,
      "stageId": "stage-7",
      "title": "Final Professional Capstone",
      "subtitle": "Enterprise Multi-Agent Lead Qualification & Support Routing System",
      "description": "Synthesize all 30 modules into a single enterprise-grade production architecture: Secured Webhook Ingestion, Schema Normalization, PostgreSQL Upserts, Autonomous AI Agent Routing, Human-in-the-Loop Slack Approvals, and Dead-Letter Queues.",
      "difficulty": "Professional",
      "estimatedMinutes": 120,
      "lessons": [
        {
          "id": "lesson-30-1",
          "moduleId": "module-30",
          "stageId": "stage-7",
          "title": "The Master Capstone: Enterprise Intelligent Automation System",
          "subtitle": "End-to-end design, construction, testing, and handover of a production multi-agent system",
          "difficulty": "Professional",
          "estimatedMinutes": 120,
          "prerequisites": [
            "Modules 0 through 29"
          ],
          "whyItMatters": "This is your graduation capstone. You will build a complete, workplace-ready, enterprise automation architecture that proves you can operate as a Senior n8n Automation Architect. It incorporates every discipline: Webhook security, input validation, SQL upserts, LangChain AI agents, human-in-the-loop gates, sub-workflows, and automated error handling.",
          "relatableProblem": "An enterprise SaaS company handles thousands of inbound customer interactions daily\u2014high-value sales inquiries, urgent technical outages, refund demands, and partner requests. Manual triage causes 6-hour delays, lost high-value deals, and refund errors. Your capstone automates this entire lifecycle intelligently with sub-second response times, AI classification, human approval guardrails, and zero data loss.",
          "firstPrinciplesExplanation": "The Capstone System Architecture Components:\n\n1. Input Layer: Secured HTTP Webhook Trigger with HMAC SHA-256 signature verification.\n2. Ingestion & Validation Layer: Code node schema validator, stripping malicious scripts and enforcing E.164 phone and RFC email formats.\n3. Storage Layer: PostgreSQL database upsert using parameterized SQL (`ON CONFLICT (email) DO UPDATE`).\n4. AI Decision Layer: n8n AI Agent equipped with Model, Window Buffer Memory, and CRM Query Tools to classify intent and calculate urgency.\n5. Guardrail & Approval Layer: If intent is a destructive refund > $100, pause execution with a Wait node and dispatch an interactive Slack approval card with 'Approve' / 'Reject' buttons.\n6. Execution Layer: Sub-workflows for CRM deal creation, ticket creation in Zendesk, and personalized email responses.\n7. Resilience Layer: Global Error Workflow with DLQ database logging and automated PagerDuty alerting.",
          "visualExplanation": {
            "diagramType": "mermaid",
            "caption": "The Complete Capstone Production Architecture",
            "mermaidCode": "graph TB\n  subgraph Ingest[\"1. Ingestion & Security Layer\"]\n    WH[\"Secured Webhook (HMAC SHA-256)\"] --> VAL[\"Code Node: Schema & Sanitization\"]\n    VAL --> CID[\"Inject Correlation ID: UUIDv4\"]\n  end\n\n  subgraph Persistence[\"2. Persistence Layer\"]\n    CID --> PG_UPSERT[(\"PostgreSQL: Idempotent Upsert<br/>ON CONFLICT email DO UPDATE\")]\n  end\n\n  subgraph AI_Engine[\"3. AI Classification & Agent Layer\"]\n    PG_UPSERT --> AGENT[\"AI Agent (LangChain ReAct Loop)<br/>Model + Memory + Vector Store\"]\n    AGENT --> INTENT{\"Intent Classifier\"}\n  end\n\n  subgraph Routing[\"4. Business Logic & Action Layer\"]\n    INTENT -->|VIP Sales Lead| SUB_SALES[\"Execute Sub-Workflow: Sales Deal & Slack\"]\n    INTENT -->|Tech Support| SUB_TECH[\"Execute Sub-Workflow: Zendesk Ticket\"]\n    INTENT -->|Refund Request| HITL{\"Is Refund > $100?\"}\n  end\n\n  subgraph Guardrails[\"5. Human-in-the-Loop Guardrail\"]\n    HITL -->|Yes| WAIT[\"Wait Node: Dispatch Slack Approval Card\"]\n    WAIT -->|Admin Clicks Approve| SUB_REFUND[\"Execute Sub-Workflow: Stripe Refund\"]\n    HITL -->|No| SUB_REFUND\n  end\n\n  subgraph Recovery[\"6. Fault Tolerance Layer\"]\n    Ingest -.->|On Failure| DLQ[(\"Dead-Letter Queue Table & Dev Alert\")]\n    Persistence -.->|On Failure| DLQ\n    AI_Engine -.->|On Failure| DLQ\n    Routing -.->|On Failure| DLQ\n  end\n\n  style Ingest fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC\n  style Persistence fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC\n  style AI_Engine fill:#0F172A,stroke:#EC4899,stroke-width:2px,color:#F8FAFC\n  style Routing fill:#0F172A,stroke:#8B5CF6,stroke-width:2px,color:#F8FAFC\n  style Guardrails fill:#0F172A,stroke:#F59E0B,stroke-width:2px,color:#F8FAFC\n  style Recovery fill:#0F172A,stroke:#EF4444,stroke-width:2px,color:#F8FAFC"
          },
          "technicalDetails": "Complete Downloadable Workflow JSON:\nThe complete, valid n8n workflow JSON for this capstone is bundled directly into the Handbook's downloadable Resources and Project Library. It can be imported with one click into any n8n v1.x+ instance.",
          "workedExample": {
            "scenario": "End-to-end execution of a high-value customer inquiry through the Capstone.",
            "inputJson": {
              "customerName": "Victoria Sterling",
              "email": "v.sterling@apex-holdings.co",
              "phone": "+442079460912",
              "message": "We need to deploy your enterprise tier across 450 seats immediately. Please connect me with an executive sponsor.",
              "budgetEstimate": 85000
            },
            "transformationLogic": "Normalized, stored in PostgreSQL, classified by AI Agent as 'ENTERPRISE_SALES_TIER_1', routed to Sub-Sales, executive Slack card posted.",
            "outputJson": {
              "correlationId": "c4b910a2-99e1-4512-b108-984210a",
              "leadId": 10942,
              "classification": {
                "intent": "ENTERPRISE_SALES_TIER_1",
                "urgency": "IMMEDIATE",
                "dealSize": 85000
              },
              "actionsTaken": [
                "PostgreSQL contact record upserted",
                "Deal created in HubSpot: $85,000",
                "Slack alert posted to #enterprise-leads with one-click claim button",
                "Calendar booking invitation dispatched to customer"
              ],
              "processingTimeMs": 340
            },
            "explanation": "The entire transaction completed in 340ms, notifying the executive team before the customer closed their laptop."
          },
          "stepByStepLab": {
            "title": "Assembling and Validating the Master Capstone Workflow",
            "goal": "Build or import the Capstone workflow, execute test suites, and verify each branch and guardrail.",
            "steps": [
              {
                "stepNumber": 1,
                "title": "Import the Capstone Template",
                "instruction": "Download the verified Capstone workflow JSON from the handbook's Resources tab and import it into your n8n workspace."
              },
              {
                "stepNumber": 2,
                "title": "Configure Database and Credentials",
                "instruction": "Set up your PostgreSQL connection (or use the mock data branches provided in the workflow)."
              },
              {
                "stepNumber": 3,
                "title": "Run Test Suite: Positive Tests",
                "instruction": "Trigger the webhook with (1) High-value enterprise lead, (2) Low-value support inquiry, (3) Normal refund request. Confirm accurate routing."
              },
              {
                "stepNumber": 4,
                "title": "Run Test Suite: Negative & Edge-Case Tests",
                "instruction": "Send (1) Malformed JSON, (2) Invalid email, (3) A refund request of $500 to trigger the Human-in-the-Loop Slack approval gate. Verify the gate pauses execution."
              }
            ],
            "expectedResult": "All test scenarios pass cleanly with 100% data integrity and robust failure containment."
          },
          "commonMistakes": [
            {
              "mistake": "Claiming an automation is 'ready for production' without running negative tests (malformed data, network drops).",
              "consequence": "The automation crashes on day 1 when real users submit emojis, missing fields, or weird formatting.",
              "correction": "Always run a full test matrix containing positive, negative, and adversarial test cases before client delivery."
            }
          ],
          "knowledgeCheck": [
            {
              "id": "q30-1",
              "question": "In the Master Capstone architecture, what prevents a customer from exploiting an AI prompt injection to issue an unauthorized $10,000 refund?",
              "options": [
                "The AI is asked nicely in the system prompt.",
                "Programmatic guardrails in code: Refunds > $100 trigger an immutable Human-in-the-Loop Wait node requiring manual Slack approval from an authorized finance admin before any payment API node is called.",
                "Stripe blocks all refunds.",
                "The webhook has a password."
              ],
              "correctIndex": 1,
              "explanation": "Hard programmatic guardrails and human approval gates isolate the AI's proposal from actual destructive execution, making prompt injections powerless to trigger unauthorized financial actions."
            }
          ],
          "practicalChallenge": {
            "prompt": "Export your completed Capstone project, assemble the Handover Dossier (Architecture diagram, credential matrix, and failure runbook), and add it to your professional automation engineering portfolio.",
            "hints": [
              "Review the templates in the Resources tab."
            ],
            "solutionNotes": "This Capstone serves as the centerpiece of your professional automation consulting portfolio."
          },
          "keyTakeaways": [
            "Senior automation architecture combines ingestion security, SQL consistency, AI intelligence, and human guardrails.",
            "Never let probabilistic AI execute destructive operations without deterministic validation or human approval.",
            "A complete test matrix (positive, negative, edge cases) is mandatory for professional certification."
          ],
          "officialDocLinks": [
            {
              "title": "Official n8n Enterprise Architecture Guide",
              "url": "https://docs.n8n.io/hosting/",
              "note": "Production guides for scaling, high availability, and enterprise deployment."
            }
          ]
        }
      ]
    }
  ]
};
