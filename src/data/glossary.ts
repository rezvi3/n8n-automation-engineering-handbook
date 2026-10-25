import { GlossaryTerm } from '../types/curriculum';

export const glossaryTerms: GlossaryTerm[] = [
  {
    "term": "n8n",
    "category": "Core Concepts",
    "plainEnglishDefinition": "A visual workflow automation platform that connects apps, APIs, and AI models.",
    "technicalDefinition": "A node-based, fair-code workflow automation orchestration platform written in TypeScript/Node.js.",
    "n8nContext": "The core system we use to build, run, and host automations.",
    "relatedTerms": [
      "Workflow",
      "Node",
      "Canvas"
    ]
  },
  {
    "term": "Workflow",
    "category": "Core Concepts",
    "plainEnglishDefinition": "A complete automation recipe consisting of connected steps starting from a trigger.",
    "technicalDefinition": "A directed acyclic graph (DAG) of nodes executing in topological order.",
    "n8nContext": "Represented on the n8n canvas and saved as JSON.",
    "relatedTerms": [
      "Node",
      "Trigger",
      "Execution"
    ]
  },
  {
    "term": "Node",
    "category": "Core Concepts",
    "plainEnglishDefinition": "A single step or building block in a workflow (e.g., an HTTP request, a filter, an email).",
    "technicalDefinition": "An atomic processing unit implementing the INodeType interface.",
    "n8nContext": "Has input pins, output pins, and configuration parameters.",
    "relatedTerms": [
      "Pin",
      "Parameter",
      "Sub-Node"
    ]
  },
  {
    "term": "Trigger",
    "category": "Core Concepts",
    "plainEnglishDefinition": "The starting event that wakes up and initiates a workflow.",
    "technicalDefinition": "A specialized node that mounts an HTTP listener, cron schedule, or message consumer.",
    "n8nContext": "First node on the left of any workflow (e.g. Webhook, Schedule).",
    "relatedTerms": [
      "Webhook",
      "Schedule",
      "Polling"
    ]
  },
  {
    "term": "Execution",
    "category": "Core Concepts",
    "plainEnglishDefinition": "A single historical run of a workflow.",
    "technicalDefinition": "An isolated execution instance with a unique ID, start time, end time, and status.",
    "n8nContext": "Viewable in the Executions tab with full input/output logs.",
    "relatedTerms": [
      "Correlation ID",
      "Status",
      "Execution Data"
    ]
  },
  {
    "term": "Active Workflow",
    "category": "Core Concepts",
    "plainEnglishDefinition": "A workflow that is live and listening 24/7 in the background.",
    "technicalDefinition": "A workflow registered in the n8n active runner registry with persistent listeners.",
    "n8nContext": "Toggled via the Active switch in the top right of the canvas.",
    "relatedTerms": [
      "Production Webhook",
      "Schedule"
    ]
  },
  {
    "term": "JSON",
    "category": "Data & JSON",
    "plainEnglishDefinition": "A standard, human-readable format for sending structured data across the web.",
    "technicalDefinition": "JavaScript Object Notation: lightweight text data-interchange format.",
    "n8nContext": "The native data format used by every n8n node.",
    "relatedTerms": [
      "Object",
      "Array",
      "Schema"
    ]
  },
  {
    "term": "Item Contract",
    "category": "Data & JSON",
    "plainEnglishDefinition": "n8n's rule that all node data must be formatted as a list of objects with a 'json' key.",
    "technicalDefinition": "An array of objects matching INodeExecutionData: [ { json: Record<string, any> } ].",
    "n8nContext": "Understanding this prevents item looping mistakes.",
    "relatedTerms": [
      "$json",
      "$input.all()",
      "Paired Item"
    ]
  },
  {
    "term": "$json",
    "category": "Data & JSON",
    "plainEnglishDefinition": "The shortcut variable representing the current record being processed.",
    "technicalDefinition": "Expression context pointer to the JSON payload of the active item.",
    "n8nContext": "Used inside expressions: {{ $json.customerName }}.",
    "relatedTerms": [
      "Expression",
      "Mapping"
    ]
  },
  {
    "term": "Paired Item",
    "category": "Data & JSON",
    "plainEnglishDefinition": "The invisible thread connecting an output item back to the exact input item that created it.",
    "technicalDefinition": "Lineage metadata { pairedItem: { item: index } } maintained by n8n across transformations.",
    "n8nContext": "Allows $('Node').item.json to grab the matching ancestor record.",
    "relatedTerms": [
      "Item Linking",
      "Code Node"
    ]
  },
  {
    "term": "Binary Data",
    "category": "Data & JSON",
    "plainEnglishDefinition": "Raw file data (images, PDFs, spreadsheets) handled by n8n.",
    "technicalDefinition": "Base64 encoded buffers attached parallel to json under the 'binary' property.",
    "n8nContext": "Created by Spreadsheet File, Read Binary, or HTTP download.",
    "relatedTerms": [
      "Spreadsheet File",
      "MIME Type"
    ]
  },
  {
    "term": "Luxon",
    "category": "Data & JSON",
    "plainEnglishDefinition": "The powerful date and time library built directly into n8n.",
    "technicalDefinition": "Immutable JavaScript DateTime library created by the Moment.js team.",
    "n8nContext": "Accessed via DateTime, $now, and $today in expressions.",
    "relatedTerms": [
      "$now",
      "Timezone",
      "ISO-8601"
    ]
  },
  {
    "term": "Webhook",
    "category": "Protocols & APIs",
    "plainEnglishDefinition": "An automated push notification sent from one server to another via HTTP POST.",
    "technicalDefinition": "A user-defined HTTP callback triggered by an external source event.",
    "n8nContext": "Configured via the Webhook Trigger node.",
    "relatedTerms": [
      "HTTP Request",
      "HMAC",
      "Payload"
    ]
  },
  {
    "term": "REST API",
    "category": "Protocols & APIs",
    "plainEnglishDefinition": "The standardized protocol computers use to talk to each other over the web.",
    "technicalDefinition": "Representational State Transfer over HTTP using standard verbs (GET, POST, PUT, DELETE).",
    "n8nContext": "Consumed via the generic HTTP Request node.",
    "relatedTerms": [
      "Endpoint",
      "Status Code",
      "Headers"
    ]
  },
  {
    "term": "HMAC",
    "category": "Protocols & APIs",
    "plainEnglishDefinition": "A digital cryptographic wax seal proving a webhook really came from who it claims.",
    "technicalDefinition": "Hash-based Message Authentication Code computed with a secret key and SHA-256.",
    "n8nContext": "Used to verify Stripe, Shopify, and GitHub webhooks.",
    "relatedTerms": [
      "Crypto Node",
      "Security",
      "Secret"
    ]
  },
  {
    "term": "Idempotency",
    "category": "Flow & Logic",
    "plainEnglishDefinition": "The guarantee that running an automation twice won't charge a customer twice.",
    "technicalDefinition": "The property that performing an operation multiple times yields the exact same state as once.",
    "n8nContext": "Enforced with idempotency keys, unique database constraints, and deduplication.",
    "relatedTerms": [
      "Deduplication",
      "Upsert",
      "Safe Retries"
    ]
  },
  {
    "term": "Upsert",
    "category": "Flow & Logic",
    "plainEnglishDefinition": "Insert the record if it is new; update it if it already exists.",
    "technicalDefinition": "Atomic SQL operation: INSERT ... ON CONFLICT (key) DO UPDATE.",
    "n8nContext": "Used in Postgres, MySQL, and Google Sheets nodes to prevent duplicates.",
    "relatedTerms": [
      "SQL",
      "Postgres",
      "Primary Key"
    ]
  },
  {
    "term": "Dead-Letter Queue (DLQ)",
    "category": "Flow & Logic",
    "plainEnglishDefinition": "A special holding pen for failed tasks that couldn't be fixed by retrying.",
    "technicalDefinition": "A durable storage queue or table holding unhandled failed payloads for inspection.",
    "n8nContext": "Configured via Error Workflows or error output branches.",
    "relatedTerms": [
      "Error Trigger",
      "Fault Tolerance"
    ]
  },
  {
    "term": "AI Agent",
    "category": "AI & LLMs",
    "plainEnglishDefinition": "An AI system that can reason, choose tools, and perform actions autonomously.",
    "technicalDefinition": "A LangChain-based ReAct loop orchestrating LLM tool calling and memory.",
    "n8nContext": "Built using the AI Agent node with Model, Tool, and Memory sub-nodes.",
    "relatedTerms": [
      "LangChain",
      "Tool",
      "Memory"
    ]
  },
  {
    "term": "RAG",
    "category": "AI & LLMs",
    "plainEnglishDefinition": "Giving an AI access to private company documents so it answers accurately without guessing.",
    "technicalDefinition": "Retrieval-Augmented Generation: Vector search + prompt context injection.",
    "n8nContext": "Implemented using Embeddings, Vector Stores, and Text Splitters.",
    "relatedTerms": [
      "Embeddings",
      "Vector Store",
      "Chunking"
    ]
  },
  {
    "term": "Vector Embeddings",
    "category": "AI & LLMs",
    "plainEnglishDefinition": "Converting text into a list of numbers that represents its meaning.",
    "technicalDefinition": "High-dimensional mathematical coordinate representation of semantic concepts.",
    "n8nContext": "Generated by Embeddings OpenAI sub-node and stored in Pinecone/Qdrant.",
    "relatedTerms": [
      "Vector Store",
      "Cosine Similarity"
    ]
  },
  {
    "term": "Human-in-the-Loop (HITL)",
    "category": "AI & LLMs",
    "plainEnglishDefinition": "Pausing an AI automation until a human clicks 'Approve' or 'Reject'.",
    "technicalDefinition": "An asynchronous approval gate implemented via the n8n Wait node.",
    "n8nContext": "Pauses execution and generates a resumeUrl for Slack or email buttons.",
    "relatedTerms": [
      "Wait Node",
      "Approval Gate",
      "Safety"
    ]
  },
  {
    "term": "Queue Mode",
    "category": "DevOps & Infrastructure",
    "plainEnglishDefinition": "Running n8n across multiple servers so it can handle thousands of tasks at once.",
    "technicalDefinition": "Distributed horizontal scaling architecture using Redis (BullMQ) and worker pools.",
    "n8nContext": "Configured with EXECUTIONS_MODE=queue and 'n8n worker'.",
    "relatedTerms": [
      "Redis",
      "Worker",
      "Scaling"
    ]
  },
  {
    "term": "N8N_ENCRYPTION_KEY",
    "category": "DevOps & Infrastructure",
    "plainEnglishDefinition": "The master secret password that protects all your API tokens in the database.",
    "technicalDefinition": "Cryptographic AES-256 key used to encrypt and decrypt sensitive database columns.",
    "n8nContext": "Set in .env. Mandatory to preserve across backups and worker clusters.",
    "relatedTerms": [
      "Security",
      "Postgres",
      "Credentials Vault"
    ]
  },
  {
    "term": "n8n audit",
    "category": "DevOps & Infrastructure",
    "plainEnglishDefinition": "A built-in scanner that checks your instance for security vulnerabilities.",
    "technicalDefinition": "Native CLI command scanning credentials, database queries, and instance configuration.",
    "n8nContext": "Run via 'n8n audit' inside the Docker container.",
    "relatedTerms": [
      "Security Audit",
      "Hardening",
      "Compliance"
    ]
  }
];
