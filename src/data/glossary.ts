import { GlossaryTerm } from '../types/curriculum';

export const glossaryTerms: GlossaryTerm[] = [
  {
    "term": "Workflow",
    "category": "Core Concepts",
    "plainEnglishDefinition": "A complete automation recipe made of connected steps starting from a trigger.",
    "technicalDefinition": "A directed acyclic graph (DAG) of nodes executing in topological order.",
    "n8nContext": "Represented on the n8n canvas and saved as a JSON document.",
    "analogy": "Imagine brewing a cup of tea: boil water, add tea leaves, pour milk, serve. A workflow is that exact sequence of steps, except digital apps do the work automatically.",
    "visualDiagram": "[Start / Event] ──► [Step 1: Get Info] ──► [Step 2: Do Something] ──► [Finish]",
    "relatedTerms": ["Node", "Trigger", "Execution"]
  },
  {
    "term": "Node",
    "category": "Core Concepts",
    "plainEnglishDefinition": "A single step or building block in a workflow (like a LEGO brick).",
    "technicalDefinition": "An atomic processing unit implementing the INodeType interface with input/output pins.",
    "n8nContext": "Each box on the canvas is a node (e.g., 'Edit Fields', 'Gmail', 'Slack', 'If').",
    "analogy": "Think of a node like a worker at an assembly line. One worker opens the envelope, the next worker stamps the document, the third worker files it in a drawer.",
    "visualDiagram": "┌──────── Input Pin\n▼\n[ Node: Does One Task ]\n▲\n└──────── Output Pin",
    "relatedTerms": ["Pin", "Parameter", "Trigger", "Action"]
  },
  {
    "term": "Trigger",
    "category": "Core Concepts",
    "plainEnglishDefinition": "The starting event or alarm clock that wakes up and begins a workflow.",
    "technicalDefinition": "A specialized start node that mounts an HTTP listener, cron schedule, or message consumer.",
    "n8nContext": "Always the very first node on the left of an n8n workflow.",
    "analogy": "Think of a motion sensor or a doorbell. The lights don't stay on all day—they turn on the moment someone walks by. A trigger detects when something happened so the workflow can begin.",
    "visualDiagram": "🔔 EVENT HAPPENS (Form submitted) ──► ⚡ TRIGGER WAKES UP WORKFLOW",
    "relatedTerms": ["Webhook", "Schedule", "Manual Trigger"]
  },
  {
    "term": "Manual Trigger",
    "category": "Core Concepts",
    "plainEnglishDefinition": "A trigger that runs only when you explicitly click the 'Test workflow' button.",
    "technicalDefinition": "An on-demand execution trigger used strictly for building and testing workflows in development.",
    "n8nContext": "Named 'When clicking \"Test workflow\"'. Perfect for learning and experimenting without needing live apps.",
    "analogy": "Like a physical test button on a smoke detector. You press it with your finger to verify everything works before mounting it on the ceiling.",
    "visualDiagram": "[ You Click 'Test workflow' ] ──► [ Workflow Runs Once for Testing ]",
    "relatedTerms": ["Trigger", "Execution", "Active Workflow"]
  },
  {
    "term": "Action",
    "category": "Core Concepts",
    "plainEnglishDefinition": "A node that performs work (such as sending a message, updating a spreadsheet, or calculating a total).",
    "technicalDefinition": "A downstream node that consumes incoming execution data and performs a side-effect or transformation.",
    "n8nContext": "Any node placed after a trigger (e.g. Slack, Google Sheets, Edit Fields).",
    "analogy": "If the trigger is the alarm clock ringing, the action is you getting out of bed and making coffee.",
    "visualDiagram": "[ Trigger: Ring Alarm ] ──► [ Action: Make Coffee ] ──► [ Action: Read News ]",
    "relatedTerms": ["Node", "Trigger", "Workflow"]
  },
  {
    "term": "JSON",
    "category": "Data & JSON",
    "plainEnglishDefinition": "A standard, human-readable way for computers to organize and exchange information.",
    "technicalDefinition": "JavaScript Object Notation: lightweight text data-interchange format composed of key-value pairs.",
    "n8nContext": "The universal digital language spoken by every node inside n8n.",
    "analogy": "Think of an address book card or a store receipt. It lists fields with clear labels: Name: Alex, Age: 28, City: London.",
    "visualDiagram": "{\n  \"name\": \"Alex\",\n  \"age\": 28,\n  \"email\": \"alex@example.com\"\n}",
    "relatedTerms": ["Object", "Array", "Expression", "$json"]
  },
  {
    "term": "Expression",
    "category": "Data & JSON",
    "plainEnglishDefinition": "A dynamic formula that lets you reuse information from earlier steps inside later steps.",
    "technicalDefinition": "A JavaScript snippet wrapped in double curly braces `{{ }}` evaluated at runtime.",
    "n8nContext": "Allows you to write `{{ $json.name }}` to insert the customer's actual name into an email template.",
    "analogy": "Like mail merge in word processors where you write 'Dear {{First Name}}', and the computer fills in 'Dear Alex' or 'Dear Sarah' automatically.",
    "visualDiagram": "Step 1 has: { \"city\": \"Tokyo\" }\nStep 2 template: \"Weather in {{ $json.city }}\"\nResult: \"Weather in Tokyo\"",
    "relatedTerms": ["$json", "Mapping", "JSON"]
  },
  {
    "term": "$json",
    "category": "Data & JSON",
    "plainEnglishDefinition": "The shortcut keyword in n8n that points directly to the data arriving into the current node.",
    "technicalDefinition": "Expression context pointer to the active item's JSON payload.",
    "n8nContext": "Used inside expressions like `{{ $json.email }}` or `{{ $json.orderTotal }}`.",
    "analogy": "Like saying 'the letter currently on my desk'. Whatever record just entered this node, `$json` is the shorthand way to look inside it.",
    "visualDiagram": "$json ──► refers to ──► { \"customer\": \"Maya\", \"amount\": 150 }",
    "relatedTerms": ["Expression", "Item Contract", "Mapping"]
  },
  {
    "term": "Webhook",
    "category": "Protocols & APIs",
    "plainEnglishDefinition": "An instant digital notification sent from one application to another the moment an event happens.",
    "technicalDefinition": "A user-defined HTTP callback triggered by an external source event via HTTP POST.",
    "n8nContext": "Configured via the Webhook Trigger node with unique Test and Production URLs.",
    "analogy": "Think of a doorbell or a text message. Instead of you constantly checking the front porch every 10 seconds to see if a package arrived, the delivery driver rings your doorbell the instant they drop it off.",
    "visualDiagram": "[ Customer Buys Item ] ──► 🚀 Webhook pushed immediately ──► [ n8n Starts ]",
    "relatedTerms": ["HTTP Request", "API", "Trigger"]
  },
  {
    "term": "API",
    "category": "Protocols & APIs",
    "plainEnglishDefinition": "A digital menu that allows two different computer programs to talk and exchange data.",
    "technicalDefinition": "Application Programming Interface: structured endpoints and protocol contracts (REST, GraphQL).",
    "n8nContext": "Consumed using built-in app nodes (Slack, Stripe) or the generic HTTP Request node.",
    "analogy": "Think of a waiter in a restaurant. You (n8n) look at the menu, tell the waiter what you want (Request), the waiter goes to the kitchen, and brings back your meal (Response).",
    "visualDiagram": "[ Your Workflow ] ──► (1. Request: 'Get weather for Paris') ──► [ Weather Server ]\n[ Your Workflow ] ◄── (2. Response: '22°C, Sunny') ◄────────── [ Weather Server ]",
    "relatedTerms": ["HTTP Request", "Webhook", "Endpoint"]
  },
  {
    "term": "HTTP Request",
    "category": "Protocols & APIs",
    "plainEnglishDefinition": "A node that lets n8n talk to virtually any online service on the internet.",
    "technicalDefinition": "A versatile node that issues GET, POST, PUT, PATCH, and DELETE network requests over HTTP/HTTPS.",
    "n8nContext": "The universal Swiss Army knife node when n8n does not have a dedicated pre-built integration.",
    "analogy": "Like making a phone call to a business to ask for information (GET) or to place an order (POST).",
    "visualDiagram": "[ HTTP Request Node ] ──► Calls URL ──► Gets JSON Response",
    "relatedTerms": ["API", "REST API", "Headers"]
  },
  {
    "term": "Execution",
    "category": "Core Concepts",
    "plainEnglishDefinition": "A single run or history record of a workflow.",
    "technicalDefinition": "An isolated runtime instance with an execution ID, timestamp, status, and node payloads.",
    "n8nContext": "Inspectable in the Executions sidebar tab with full debugging views.",
    "analogy": "Like a single flight log entry for an airplane. It records when the flight departed, when it landed, and whether anything went wrong.",
    "visualDiagram": "Execution #1042: Started 10:00:01 AM ──► Finished in 240ms ──► Status: SUCCESS ✓",
    "relatedTerms": ["Workflow", "Status", "Manual Trigger"]
  },
  {
    "term": "Active Workflow",
    "category": "Core Concepts",
    "plainEnglishDefinition": "A workflow switched ON to listen and run in the background 24 hours a day, 7 days a week.",
    "technicalDefinition": "A workflow registered in n8n's active listener engine with persistent webhook listeners or cron jobs.",
    "n8nContext": "Controlled by the 'Active' toggle switch in the top right of the workflow editor.",
    "analogy": "Like turning on a home security alarm before you go to sleep. It stays on watch continuously.",
    "visualDiagram": "[ Inactive / Off ] ── (Toggle Switch) ──► [ Active / Live 24/7 🟢 ]",
    "relatedTerms": ["Workflow", "Execution", "Production Webhook"]
  },
  {
    "term": "If Node",
    "category": "Flow & Logic",
    "plainEnglishDefinition": "A decision node that checks a condition and sends data down one of two paths (True or False).",
    "technicalDefinition": "A binary conditional branching node with two output pins based on boolean evaluation.",
    "n8nContext": "Used for rules like: 'If total > 100, send discount; otherwise send standard receipt'.",
    "analogy": "A fork in the road or an umbrella check: 'Is it raining outside? Yes → Grab umbrella. No → Wear sunglasses.'",
    "visualDiagram": "               ┌──► [ True Branch: VIP Customer ]\n[ If Node: Total > 100? ]\n               └──► [ False Branch: Regular Customer ]",
    "relatedTerms": ["Switch", "Filter", "Logic"]
  },
  {
    "term": "Switch Node",
    "category": "Flow & Logic",
    "plainEnglishDefinition": "A multi-way decision node that sorts items into different categories based on their value.",
    "technicalDefinition": "A multi-output conditional router routing items across N numbered output pins.",
    "n8nContext": "Used when you have 3 or more paths (e.g. Department = 'Billing', 'Sales', or 'Support').",
    "analogy": "Like a mailroom sorting rack with separate cubbies for letters going to Sales, Accounting, and HR.",
    "visualDiagram": "                 ┌──► [ Output 0: Sales ]\n[ Switch: Department ] ─┼──► [ Output 1: Support ]\n                 └──► [ Output 2: Billing ]",
    "relatedTerms": ["If Node", "Filter", "Routing"]
  },
  {
    "term": "Credentials",
    "category": "Protocols & APIs",
    "plainEnglishDefinition": "The secure digital keys, passwords, or tokens n8n uses to safely log in to your external apps.",
    "technicalDefinition": "Encrypted authentication assets (API keys, OAuth2 tokens) stored securely in n8n's database.",
    "n8nContext": "Configured once under Credentials and reused across any number of nodes.",
    "analogy": "Think of a hotel keycard. It lets you into your room securely without having to change the lock every day.",
    "visualDiagram": "[ Secret API Key ] ──► Encrypted in n8n ──► Safely unlocks external service",
    "relatedTerms": ["API", "OAuth2", "Security"]
  },
  {
    "term": "AI Agent",
    "category": "AI & LLMs",
    "plainEnglishDefinition": "A smart assistant that can understand plain English instructions and choose which tools to use.",
    "technicalDefinition": "An autonomous LLM-driven orchestrator operating in an iterative think-act-observe loop with tool calling.",
    "n8nContext": "Configured using the 'AI Agent' node connected to a language model and tool sub-nodes.",
    "analogy": "A regular AI is like a smart calculator (you ask a question, it writes an answer). An AI Agent is like a human intern with hands (you ask it to solve a problem, and it can open Google, search your database, and draft an email).",
    "visualDiagram": "[ User Question ] ──► [ AI Agent ] ◄──► [ Tools: Search / DB / Calculator ]\n                          └──► [ Final Smart Answer ]",
    "relatedTerms": ["Language Model", "Tools", "Memory"]
  },
  {
    "term": "Docker",
    "category": "DevOps & Infrastructure",
    "plainEnglishDefinition": "A tool that packages an application and all its dependencies into an isolated container so it runs identically on any computer.",
    "technicalDefinition": "An open platform for developing, shipping, and running applications using OS-level virtualization.",
    "n8nContext": "The most popular and recommended way to self-host n8n on a server or VPS.",
    "analogy": "Think of a standardized shipping container on a cargo ship. It doesn't matter what is inside—the crane lifts it the exact same way anywhere in the world.",
    "visualDiagram": "[ Shipping Container ] ──► Contains: n8n + Node.js + Database ──► Runs on any OS",
    "relatedTerms": ["Self-Hosting", "Volume", "Environment Variables"]
  },
  {
    "term": "Database",
    "category": "DevOps & Infrastructure",
    "plainEnglishDefinition": "An organized digital filing cabinet where information is stored permanently and safely.",
    "technicalDefinition": "A structured electronic system for storing and managing data (e.g. PostgreSQL, SQLite, MySQL).",
    "n8nContext": "Used by n8n internally to store your workflows, and by your workflows to store business records.",
    "analogy": "Like a giant library where every book has an exact shelf number so you can find it in milliseconds.",
    "visualDiagram": "[ App / Form ] ──► [ Write to Database ] ──► [ Stored Permanently in Rows & Columns ]",
    "relatedTerms": ["PostgreSQL", "SQLite", "Table"]
  },
  {
    "term": "Idempotency",
    "category": "Flow & Logic",
    "plainEnglishDefinition": "The guarantee that running an automation twice by accident will not duplicate records or charge customers twice.",
    "technicalDefinition": "A property of operations where executing multiple times produces the exact same state as running once.",
    "n8nContext": "Enforced using unique IDs, duplicate checks, and upsert operations.",
    "analogy": "Pressing the 'Call Elevator' button. Whether you press it once or press it ten times impatiently, the elevator only comes once.",
    "visualDiagram": "Input 'Order #101' (1st time) ──► Creates invoice\nInput 'Order #101' (2nd time) ──► Sees existing invoice, DOES NOT duplicate!",
    "relatedTerms": ["Upsert", "Deduplication", "Safety"]
  }
];
