import { Project } from '../types/curriculum';

export const projects: Project[] = [
  {
    "id": "proj-capstone",
    "title": "Master Capstone: Enterprise Multi-Agent System",
    "subtitle": "Secured Webhooks, PostgreSQL Upserts, LangChain AI, HITL Slack Gates & DLQ",
    "difficulty": "Professional",
    "stage": "Stage 7",
    "estimatedHours": 8,
    "problemStatement": "Large enterprises handle thousands of mixed customer inquiries daily. Inbound leads wait hours for SDR response, while refund requests and support emergencies lack governance.",
    "businessValue": "Reduces lead response latency from 4 hours to 340 milliseconds, boosts enterprise conversion by 34%, and eliminates unauthorized refund processing with human approval gates.",
    "prerequisites": [
      "Stages 0 through 6 completion"
    ],
    "architectureDiagramMermaid": "graph LR\n  WH[Secured Webhook] --> CODE[Validate & Clean]\n  CODE --> RESP[HTTP 200 Ack]\n  CODE --> PG[(Postgres Upsert)]\n  PG --> AI[AI Agent Router]\n  AI --> SW{Intent Switch}\n  SW -->|VIP Lead| SLACK[Slack Alert]\n  SW -->|Refund| HITL[Wait Approval]\n  SW -->|Support| DLQ[Ticket Log]",
    "requiredIntegrations": [
      "Webhook",
      "Code Node",
      "PostgreSQL",
      "LangChain AI Agent",
      "Slack",
      "Wait Node"
    ],
    "credentialRequirements": [
      "PostgreSQL DB credentials",
      "OpenAI / Anthropic API token",
      "Slack Bot Token"
    ],
    "nodeByNodeSteps": [
      {
        "nodeName": "Webhook: Inbound Lead & Support",
        "purpose": "Listen for incoming payloads with HMAC verification",
        "config": "POST /lead-intake, responseMode: responseNode"
      },
      {
        "nodeName": "Code: Normalize & Validate",
        "purpose": "Clean whitespace, normalize phone to digits, inject correlation ID",
        "config": "Run once for all items, attach pairedItem"
      },
      {
        "nodeName": "Respond to Webhook",
        "purpose": "Acknowledge request within 50ms with correlation ID",
        "config": "HTTP 200 JSON { status: 'ACKNOWLEDGED' }"
      },
      {
        "nodeName": "PostgreSQL: Idempotent Upsert",
        "purpose": "Store lead with ON CONFLICT (email) DO UPDATE",
        "config": "Execute parameterized SQL with $1-$5 bindings"
      },
      {
        "nodeName": "AI Agent: Intent Classifier",
        "purpose": "Classify message intent into ENTERPRISE_LEAD, REFUND, or SUPPORT",
        "config": "Temperature 0.0 with Window Buffer Memory"
      },
      {
        "nodeName": "Switch: Route By Intent",
        "purpose": "Route item down appropriate execution path",
        "config": "Rules matching on $json.output.intent"
      },
      {
        "nodeName": "Wait: Human Approval Gate",
        "purpose": "Pause refund requests until admin clicks Slack button",
        "config": "Resume on webhook call"
      }
    ],
    "sampleData": {
      "name": "Harrison Wells",
      "email": "h.wells@star-labs.tech",
      "phone": "+1 (555) 019-4820",
      "budget": 25000,
      "message": "We need to deploy your automated data pipeline for our 200-person analytics department."
    },
    "expectedOutput": {
      "status": "PROCESSED",
      "correlationId": "exec_902-1729819200",
      "assignedTier": "ENTERPRISE_LEAD",
      "postgresId": 4091,
      "slackDispatched": true
    },
    "workflowJson": {
      "name": "Enterprise Multi-Agent Lead & Support Architecture (Capstone)",
      "nodes": [
        {
          "parameters": {
            "httpMethod": "POST",
            "path": "lead-intake",
            "responseMode": "responseNode",
            "options": {
              "rawBody": true
            }
          },
          "id": "node-webhook-1",
          "name": "Webhook: Inbound Lead & Support",
          "type": "n8n-nodes-base.webhook",
          "typeVersion": 2,
          "position": [
            200,
            300
          ]
        },
        {
          "parameters": {
            "mode": "runOnceForAllItems",
            "jsCode": "const items = $input.all();\nreturn items.map((item, index) => {\n  const raw = item.json.body || item.json;\n  return {\n    json: {\n      correlationId: $execution.id + '-' + Date.now(),\n      fullName: (raw.name || '').trim(),\n      email: (raw.email || '').toLowerCase().trim(),\n      phone: (raw.phone || '').replace(/\\D/g, ''),\n      message: raw.message || '',\n      budget: Number(raw.budget) || 0,\n      receivedAt: new Date().toISOString()\n    },\n    pairedItem: { item: index }\n  };\n});"
          },
          "id": "node-cleaner-2",
          "name": "Code: Normalize & Validate",
          "type": "n8n-nodes-base.code",
          "typeVersion": 2,
          "position": [
            420,
            300
          ]
        },
        {
          "parameters": {
            "respondWith": "json",
            "responseBody": "={{ JSON.stringify({ status: 'ACKNOWLEDGED', correlationId: $json.correlationId, timestamp: $now.toISO() }) }}",
            "options": {}
          },
          "id": "node-respond-3",
          "name": "Respond to Webhook",
          "type": "n8n-nodes-base.respondToWebhook",
          "typeVersion": 1.1,
          "position": [
            640,
            200
          ]
        },
        {
          "parameters": {
            "operation": "executeQuery",
            "query": "INSERT INTO contacts (correlation_id, name, email, phone, budget, updated_at)\nVALUES ($1, $2, $3, $4, $5, NOW())\nON CONFLICT (email)\nDO UPDATE SET\n  budget = EXCLUDED.budget,\n  updated_at = NOW()\nRETURNING id, name, email, budget;",
            "options": {}
          },
          "id": "node-postgres-4",
          "name": "PostgreSQL: Idempotent Upsert",
          "type": "n8n-nodes-base.postgres",
          "typeVersion": 2.5,
          "position": [
            640,
            420
          ]
        },
        {
          "parameters": {
            "promptType": "define",
            "text": "=Classify this inquiry:\nCustomer: {{ $json.name }}\nBudget: ${{ $json.budget }}\nMessage: {{ $('Code: Normalize & Validate').item.json.message }}\n\nCategorize into INTENT: 'ENTERPRISE_LEAD' (budget > $10k), 'STANDARD_SUPPORT', or 'REFUND_REQUEST'. Calculate urgency (0.0 to 1.0)."
          },
          "id": "node-agent-5",
          "name": "AI Agent: Intent Classifier",
          "type": "n8n-nodes-langchain.agent",
          "typeVersion": 1.7,
          "position": [
            880,
            420
          ]
        },
        {
          "parameters": {
            "dataType": "string",
            "value1": "={{ $json.output.intent }}",
            "rules": {
              "rules": [
                {
                  "operation": "equal",
                  "value2": "ENTERPRISE_LEAD",
                  "output": 0
                },
                {
                  "operation": "equal",
                  "value2": "REFUND_REQUEST",
                  "output": 1
                },
                {
                  "operation": "equal",
                  "value2": "STANDARD_SUPPORT",
                  "output": 2
                }
              ]
            }
          },
          "id": "node-switch-6",
          "name": "Switch: Route By Intent",
          "type": "n8n-nodes-base.switch",
          "typeVersion": 3,
          "position": [
            1120,
            420
          ]
        },
        {
          "parameters": {
            "channel": "#enterprise-leads",
            "text": "=\ud83d\udd25 *Enterprise Lead Arrived!*\nName: {{ $('PostgreSQL: Idempotent Upsert').item.json.name }}\nBudget: ${{ $('PostgreSQL: Idempotent Upsert').item.json.budget }}\nCorrelation ID: {{ $('Code: Normalize & Validate').item.json.correlationId }}"
          },
          "id": "node-slack-7",
          "name": "Slack: Alert Sales Team",
          "type": "n8n-nodes-base.slack",
          "typeVersion": 2.2,
          "position": [
            1360,
            260
          ]
        },
        {
          "parameters": {
            "resume": "webhook",
            "responseMode": "onReceived",
            "options": {}
          },
          "id": "node-wait-8",
          "name": "Wait: Human Approval Gate",
          "type": "n8n-nodes-base.wait",
          "typeVersion": 1.1,
          "position": [
            1360,
            420
          ]
        },
        {
          "parameters": {
            "operation": "toFile",
            "fileFormat": "json"
          },
          "id": "node-dlq-9",
          "name": "DLQ: Dead-Letter Queue Log",
          "type": "n8n-nodes-base.readWriteFile",
          "typeVersion": 1,
          "position": [
            1360,
            600
          ]
        }
      ],
      "connections": {
        "Webhook: Inbound Lead & Support": {
          "main": [
            [
              {
                "node": "Code: Normalize & Validate",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Code: Normalize & Validate": {
          "main": [
            [
              {
                "node": "Respond to Webhook",
                "type": "main",
                "index": 0
              },
              {
                "node": "PostgreSQL: Idempotent Upsert",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "PostgreSQL: Idempotent Upsert": {
          "main": [
            [
              {
                "node": "AI Agent: Intent Classifier",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "AI Agent: Intent Classifier": {
          "main": [
            [
              {
                "node": "Switch: Route By Intent",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Switch: Route By Intent": {
          "main": [
            [
              {
                "node": "Slack: Alert Sales Team",
                "type": "main",
                "index": 0
              }
            ],
            [
              {
                "node": "Wait: Human Approval Gate",
                "type": "main",
                "index": 0
              }
            ],
            [
              {
                "node": "DLQ: Dead-Letter Queue Log",
                "type": "main",
                "index": 0
              }
            ]
          ]
        }
      }
    },
    "testingInstructions": [
      "1. Import workflow JSON into n8n canvas.",
      "2. Send test POST request via curl with high budget ($25,000).",
      "3. Verify PostgreSQL receives upsert and Slack channel receives VIP lead card.",
      "4. Send a test refund request ($500). Verify Wait node pauses and generates resume URL."
    ],
    "failureCases": [
      {
        "symptom": "Webhook returns 404",
        "cause": "Workflow is toggled to Inactive",
        "fix": "Toggle switch in top right to Active"
      },
      {
        "symptom": "Database constraint violation",
        "cause": "Null value in required column",
        "fix": "Ensure Code node enforces fallback values"
      }
    ],
    "securityNotes": [
      "Keep N8N_ENCRYPTION_KEY backed up in vault.",
      "Ensure PostgreSQL connection uses SSL.",
      "Never expose Wait node resume URLs publicly."
    ],
    "extensionChallenges": [
      "Add a Pinecone RAG tool so the AI Agent can quote exact policy clauses.",
      "Add automated SMS dispatch via Twilio for high-priority leads."
    ],
    "definitionOfDone": [
      "Workflow passes positive, negative, and adversarial test cases.",
      "PostgreSQL records are idempotent.",
      "Slack notifications render with interactive buttons."
    ]
  },
  {
    "id": "proj-1",
    "title": "Beginner: Scheduled Health Check Reporter",
    "subtitle": "Hourly system ping with uptime calculations and Slack/Discord alerts",
    "difficulty": "Beginner",
    "stage": "Stage 1",
    "estimatedHours": 1.5,
    "problemStatement": "An IT department needs to know the instant their customer-facing API goes down without paying for Datadog.",
    "businessValue": "Provides zero-cost 24/7 uptime monitoring with sub-minute alert dispatch.",
    "prerequisites": [
      "Modules 0 through 3"
    ],
    "architectureDiagramMermaid": "graph LR\n  SCHED[Schedule: Every 15 Min] --> HTTP[HTTP: Ping Target Endpoint]\n  HTTP --> IF{Status == 200?}\n  IF -->|No| ALERT[Slack: Urgent Alert]\n  IF -->|Yes| LOG[Log Timestamp]",
    "requiredIntegrations": [
      "Schedule Trigger",
      "HTTP Request",
      "If Node",
      "Slack"
    ],
    "credentialRequirements": [
      "Slack Webhook URL"
    ],
    "nodeByNodeSteps": [
      {
        "nodeName": "Schedule Trigger",
        "purpose": "Fires every 15 minutes",
        "config": "Cron: */15 * * * *"
      },
      {
        "nodeName": "HTTP Request",
        "purpose": "Pings website endpoint",
        "config": "GET https://example.com/healthz, Continue on Fail"
      },
      {
        "nodeName": "If Node",
        "purpose": "Checks if status is 200",
        "config": "Number $json.statusCode Equals 200"
      },
      {
        "nodeName": "Slack Alert",
        "purpose": "Alerts dev channel if down",
        "config": "Post message with status code and error details"
      }
    ],
    "sampleData": {
      "statusCode": 503,
      "statusText": "Service Unavailable"
    },
    "expectedOutput": {
      "alertDispatched": true,
      "target": "https://example.com/healthz"
    },
    "workflowJson": {
      "name": "Scheduled Health Check",
      "nodes": []
    },
    "testingInstructions": [
      "Test with httpbin.org/status/200 and httpbin.org/status/500 to verify both branches."
    ],
    "failureCases": [
      {
        "symptom": "Alert fires every 15m while server is fine",
        "cause": "Endpoint requires custom User-Agent header",
        "fix": "Add User-Agent header in HTTP Request node"
      }
    ],
    "securityNotes": [
      "Do not log sensitive endpoint query tokens in public Slack channels."
    ],
    "extensionChallenges": [
      "Calculate rolling 30-day percentage uptime using the Summarize node."
    ],
    "definitionOfDone": [
      "Workflow executes every 15m and alerts on non-200 responses."
    ]
  },
  {
    "id": "proj-2",
    "title": "Intermediate: Inbound Speed-to-Lead Qualification Pipeline",
    "subtitle": "Enrich form leads with revenue data and book sales calls in 60 seconds",
    "difficulty": "Intermediate",
    "stage": "Stage 2",
    "estimatedHours": 3,
    "problemStatement": "Leads submitted on WordPress wait 4 hours for SDR review, causing a 60% drop in booked demo calls.",
    "businessValue": "Increases booked sales meetings by 34% by engaging buyers while they are still on the website.",
    "prerequisites": [
      "Modules 4 through 9"
    ],
    "architectureDiagramMermaid": "graph LR\n  WH[Webhook Form] --> ENRICH[Clearbit Enrichment]\n  ENRICH --> IF{Revenue > $5M?}\n  IF -->|Yes| VIP[HubSpot VIP Deal & Rep Alert]\n  IF -->|No| SDR[Standard Sequence]",
    "requiredIntegrations": [
      "Webhook",
      "HTTP Request (Clearbit)",
      "HubSpot",
      "Slack"
    ],
    "credentialRequirements": [
      "Clearbit API Key",
      "HubSpot OAuth2",
      "Slack Bot Token"
    ],
    "nodeByNodeSteps": [
      {
        "nodeName": "Webhook",
        "purpose": "Capture form submission",
        "config": "POST /inbound-lead"
      },
      {
        "nodeName": "Clearbit HTTP Request",
        "purpose": "Lookup company by domain",
        "config": "GET https://company.clearbit.com/v2/companies/find"
      },
      {
        "nodeName": "If Node",
        "purpose": "Check annual revenue",
        "config": "Number $json.metrics.annualRevenue > 5000000"
      },
      {
        "nodeName": "Slack VIP Alert",
        "purpose": "Post rich card with 'Claim Lead' button",
        "config": "Block Kit formatting"
      }
    ],
    "sampleData": {
      "name": "Elena Torres",
      "email": "elena@globallogistics.com",
      "phone": "+15550192834"
    },
    "expectedOutput": {
      "dealCreated": true,
      "leadTier": "Tier 1 Enterprise"
    },
    "workflowJson": {
      "name": "Speed to Lead Pipeline",
      "nodes": []
    },
    "testingInstructions": [
      "Submit lead with test domain and verify enrichment and HubSpot deal creation."
    ],
    "failureCases": [
      {
        "symptom": "Clearbit returns 404 for unknown company",
        "cause": "Domain not found in database",
        "fix": "Enable Continue on Fail and fallback to self-reported form data"
      }
    ],
    "securityNotes": [
      "Comply with GDPR: allow users to request deletion of enriched data."
    ],
    "extensionChallenges": [
      "Round-robin assign leads among 5 sales reps using a Redis counter."
    ],
    "definitionOfDone": [
      "Lead is enriched, scored, and posted to Slack within 3 seconds."
    ]
  },
  {
    "id": "proj-3",
    "title": "Advanced: Autonomous AI Support Agent with Knowledge RAG",
    "subtitle": "Natural language customer support with Pinecone vector retrieval and human review",
    "difficulty": "Advanced",
    "stage": "Stage 4",
    "estimatedHours": 5,
    "problemStatement": "Support team receives 500 repetitive policy questions daily, burying technicians in trivial tickets.",
    "businessValue": "Deflects 65% of routine tier-1 inquiries automatically with zero human effort while maintaining 98% factual accuracy.",
    "prerequisites": [
      "Modules 16 through 19"
    ],
    "architectureDiagramMermaid": "graph LR\n  MSG[User Chat Message] --> AGENT[AI Agent LangChain]\n  AGENT --> VDB[(Pinecone Vector Store)]\n  AGENT --> CALC[Calculator Tool]\n  AGENT --> CONF{Confidence >= 0.85?}\n  CONF -->|Yes| REPLY[Instant Answer]\n  CONF -->|No| ESCALATE[Escalate to Human Agent]",
    "requiredIntegrations": [
      "AI Agent Node",
      "OpenAI Chat Model",
      "Pinecone Vector Store",
      "Window Buffer Memory",
      "Slack"
    ],
    "credentialRequirements": [
      "OpenAI API Key",
      "Pinecone API Key"
    ],
    "nodeByNodeSteps": [
      {
        "nodeName": "Chat Trigger",
        "purpose": "Accept user chat inquiry",
        "config": "Standard chat input"
      },
      {
        "nodeName": "AI Agent",
        "purpose": "Orchestrates reasoning and tool selection",
        "config": "Temperature 0.0, max iterations 5"
      },
      {
        "nodeName": "Pinecone Vector Store Tool",
        "purpose": "Retrieves verified company knowledge chunks",
        "config": "Top 3 chunks, similarity >= 0.75"
      },
      {
        "nodeName": "Confidence Gate",
        "purpose": "Verifies answer confidence before replying",
        "config": "If confidence < 0.85, route to human queue"
      }
    ],
    "sampleData": {
      "chatInput": "What is the return window for custom enterprise hardware modules?"
    },
    "expectedOutput": {
      "response": "According to Section 4.2 of our Hardware Terms, custom enterprise modules have a 30-day evaluation window."
    },
    "workflowJson": {
      "name": "AI Support Agent RAG",
      "nodes": []
    },
    "testingInstructions": [
      "Ask questions covered in policy documents. Verify cited answers. Ask adversarial jailbreak questions and verify containment."
    ],
    "failureCases": [
      {
        "symptom": "Agent hallucinates answer",
        "cause": "Temperature > 0.0 or prompt missing negative constraints",
        "fix": "Set Temp to 0.0 and add 'Answer ONLY from context' instruction"
      }
    ],
    "securityNotes": [
      "Do not include sensitive customer PII in vector embedding stores."
    ],
    "extensionChallenges": [
      "Add a sentiment analysis sub-node that alerts team leads if a customer is agitated."
    ],
    "definitionOfDone": [
      "Agent answers policy questions with source citations and escalates low-confidence queries."
    ]
  }
];
