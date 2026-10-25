import { Stage } from '../../types/curriculum';

export const stage3: Stage = {
  "id": "stage-3",
  "number": 3,
  "title": "Programming and Advanced Workflow Engineering",
  "subtitle": "The Code Node, Enterprise Architecture, Idempotency & Debugging",
  "description": "Write custom JavaScript inside n8n, master complex array transformations, build resilient sub-workflows with dead-letter queues, and debug with a 20+ case diagnostic catalog.",
  "badge": "Stage 3 \u2022 Engineering",
  "accentColor": "#8B5CF6",
  "modules": [
    {
      "id": "module-12",
      "number": 12,
      "stageId": "stage-3",
      "title": "JavaScript for n8n",
      "subtitle": "The Code Node, $input Methods & Paired Item Preservation",
      "description": "Master JavaScript specifically tailored for automation engineers. Learn variables, array methods (map, filter, reduce), promises, and the official n8n Code node execution models.",
      "difficulty": "Advanced",
      "estimatedMinutes": 80,
      "lessons": [
        {
          "id": "lesson-12-1",
          "moduleId": "module-12",
          "stageId": "stage-3",
          "title": "JavaScript Automation & The Modern Code Node",
          "subtitle": "Run Once for All Items vs Run for Each Item, $input.all(), and pairedItem",
          "difficulty": "Advanced",
          "estimatedMinutes": 80,
          "prerequisites": [
            "Module 4",
            "Module 5"
          ],
          "whyItMatters": "No-code nodes cover 80% of daily requirements, but the remaining 20%\u2014complex data grouping, cryptographic hashing, parsing custom regex, or transforming bizarre nested API responses\u2014requires custom code. The Code node in n8n allows you to run pure JavaScript (and Python) directly inside your pipeline without setting up a separate microservice.",
          "relatableProblem": "A developer needs to calculate the rolling 7-day average sales from an array of 365 daily reports. Chaining 15 low-code nodes together creates a messy, fragile 'spaghetti workflow' that is impossible to maintain. A 10-line JavaScript script in the Code node calculates the rolling average in 2 milliseconds with perfect reliability.",
          "firstPrinciplesExplanation": "The Code node supports two distinct execution modes:\n\n1. 'Run Once for Each Item':\n   - n8n automatically loops over each incoming item.\n   - Access the current item via $input.item.json.\n   - Must return an object: return { json: { ... } };.\n   - Best for simple, row-by-row calculations.\n\n2. 'Run Once for All Items' (The Professional Powerhouse):\n   - Receives the entire array of items at once.\n   - Access all items via $input.all().\n   - Must return an ARRAY of objects: return [ { json: { ... } }, { json: { ... } } ];.\n   - Best for aggregation, grouping, sorting, filtering, and cross-item math.\n\nCRITICAL: PRESERVING ITEM LINKING (pairedItem):\nWhen you transform an array inside a Code node using $input.all(), you should attach pairedItem so downstream nodes can trace each output item back to its input index:\n```javascript\nreturn $input.all().map((item, index) => {\n  return {\n    json: {\n      ...item.json,\n      processed: true\n    },\n    pairedItem: {\n      item: index\n    }\n  };\n});\n```",
          "visualExplanation": {
            "diagramType": "mermaid",
            "caption": "Execution Modes of the n8n Code Node",
            "mermaidCode": "graph TB\n  subgraph ModeA[\"Mode 1: Run Once for Each Item (Iterative Loop)\"]\n    I1[\"Item 0\"] --> C1[\"Code Script Runs (1 item)\"] --> O1[\"Output 0\"]\n    I2[\"Item 1\"] --> C2[\"Code Script Runs (1 item)\"] --> O2[\"Output 1\"]\n  end\n\n  subgraph ModeB[\"Mode 2: Run Once for All Items (Batch Processing & Aggregation)\"]\n    IA[\"All Incoming Items: [ Item 0, Item 1, Item 2 ]\"] --> CALL[\"Single Execution: const all = $input.all();\"]\n    CALL --> AGG[\"Perform Array.reduce() or Group By\"]\n    AGG --> OA[\"Single Output Array: [ Combined Result ]\"]\n  end\n\n  style ModeA fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC\n  style ModeB fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC"
          },
          "technicalDetails": "Modern JavaScript Array Methods in n8n:\n- .map(): Transform each item into a new shape.\n- .filter(): Keep items matching a boolean condition.\n- .reduce(): Accumulate items into a single summary object or total.\n- .find() / .some() / .every(): Search and validate collections.\n- Object Destructuring: const { id, email, ...metadata } = item.json;\n\nRuntime Constraints:\nThe Code node runs in an isolated V8 sandbox (or separate task runner in queue mode). For security, native Node.js filesystem modules (fs, child_process) are blocked by default unless enabled via NODE_FUNCTION_ALLOW_BUILTIN environment variables.",
          "workedExample": {
            "scenario": "Grouping an array of transactions by customer ID and calculating total spend per customer.",
            "inputJson": [
              {
                "json": {
                  "customer": "Alice",
                  "amount": 100
                }
              },
              {
                "json": {
                  "customer": "Bob",
                  "amount": 50
                }
              },
              {
                "json": {
                  "customer": "Alice",
                  "amount": 250
                }
              }
            ],
            "transformationLogic": "Use Array.reduce inside 'Run Once for All Items' to aggregate amounts by customer.",
            "outputJson": [
              {
                "json": {
                  "customer": "Alice",
                  "totalSpend": 350,
                  "orderCount": 2
                }
              },
              {
                "json": {
                  "customer": "Bob",
                  "totalSpend": 50,
                  "orderCount": 1
                }
              }
            ],
            "explanation": "The Code script groups records in memory and returns a clean array where Alice is aggregated into $350 and Bob into $50."
          },
          "stepByStepLab": {
            "title": "Building a Multi-Item Aggregator in the Code Node",
            "goal": "Group order line items, calculate totals, and preserve paired items.",
            "steps": [
              {
                "stepNumber": 1,
                "title": "Add a Code Node in 'Run Once for All Items' Mode",
                "instruction": "Add a Code node. In the top dropdown, select 'Run Once for All Items'."
              },
              {
                "stepNumber": 2,
                "title": "Paste the Aggregation Logic",
                "instruction": "Paste the aggregation script:\n```javascript\nconst items = $input.all();\nconst summary = {};\nfor (const item of items) {\n  const cat = item.json.category || 'Uncategorized';\n  summary[cat] = (summary[cat] || 0) + item.json.price;\n}\nreturn Object.entries(summary).map(([category, total]) => ({\n  json: { category, totalSales: total }\n}));\n```"
              },
              {
                "stepNumber": 3,
                "title": "Test Step",
                "instruction": "Feed sample order data and run the node. Confirm that category totals compute accurately."
              }
            ],
            "expectedResult": "A clean summary list with totaled numbers per category."
          },
          "commonMistakes": [
            {
              "mistake": "Returning a plain object or primitive like return 'done'; or return { name: 'Alice' }; in 'Run Once for All Items'.",
              "consequence": "n8n throws 'Code output must be an array of objects'.",
              "correction": "In 'Run Once for All Items', ALWAYS return an array of objects where each item has a json property: return [ { json: { name: 'Alice' } } ];."
            }
          ],
          "knowledgeCheck": [
            {
              "id": "q12-1",
              "question": "In 'Run Once for All Items' mode, what must the Code node return?",
              "options": [
                "A single boolean string.",
                "An array of objects, where each object has a json property containing the item data.",
                "A raw SQL query.",
                "Nothing; it modifies global variables."
              ],
              "correctIndex": 1,
              "explanation": "n8n's internal contract requires every node to return an array of objects wrapping data inside json: [ { json: { ... } } ]."
            }
          ],
          "practicalChallenge": {
            "prompt": "Write a JavaScript snippet for the Code node that deduplicates an array of incoming items based on the property email, keeping only the first occurrence.",
            "hints": [
              "Use a Set to track seen emails: const seen = new Set(); and filter."
            ],
            "solutionNotes": "const seen = new Set(); return $input.all().filter(i => !seen.has(i.json.email) && seen.add(i.json.email));"
          },
          "keyTakeaways": [
            "Use 'Run Once for All Items' for aggregation, deduplication, and cross-item math.",
            "Always return an array of objects with { json: { ... } }.",
            "Attach pairedItem: { item: index } to preserve lineage for downstream nodes."
          ],
          "officialDocLinks": [
            {
              "title": "Official n8n Code Node Guide",
              "url": "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code/",
              "note": "Complete guide to execution modes, input helpers, and task runner syntax."
            }
          ]
        }
      ]
    },
    {
      "id": "module-13",
      "number": 13,
      "stageId": "stage-3",
      "title": "Complex Data Transformations",
      "subtitle": "Restructuring, Flattening, Aggregating & Binary Files",
      "description": "Master advanced data shaping. Learn how to explode arrays with Split Out, flatten nested JSON hierarchies, normalize inconsistent schemas, and process binary files (CSVs, PDFs, images).",
      "difficulty": "Advanced",
      "estimatedMinutes": 65,
      "lessons": [
        {
          "id": "lesson-13-1",
          "moduleId": "module-13",
          "stageId": "stage-3",
          "title": "Advanced Restructuring, Schema Normalization & Binary Data",
          "subtitle": "From nested JSON trees to clean relational datasets and file handling",
          "difficulty": "Advanced",
          "estimatedMinutes": 65,
          "prerequisites": [
            "Module 12"
          ],
          "whyItMatters": "External APIs don't coordinate their schemas. One billing system sends { 'customer_name': '...' }, while another sends { 'buyer': { 'profile': { 'full': '...' } } }. An automation engineer must normalize differing shapes into an immutable internal schema and manipulate binary attachments like generated invoices or uploaded CSV files.",
          "relatableProblem": "A client receives a monthly CSV file with 10,000 transactions emailed as an attachment. They need to extract the CSV from the email, parse the rows into n8n JSON items, filter out refunds, and upload the clean records into a database. Without understanding binary data handling in n8n, this common task is impossible.",
          "firstPrinciplesExplanation": "Binary Data in n8n:\nIn addition to the json property, n8n items can carry a binary property containing raw file buffers (images, PDFs, spreadsheets):\n```json\n{\n  'json': { 'filename': 'statement.csv' },\n  'binary': {\n    'data': {\n      'data': 'base64EncodedString...',\n      'mimeType': 'text/csv',\n      'fileName': 'statement.csv',\n      'fileExtension': 'csv'\n    }\n  }\n}\n```\nCore Nodes for Binary and Structural Transformations:\n- Spreadsheet File Node: Reads/writes binary Excel or CSV files into JSON items.\n- Split Out Node: Explodes an array of objects inside a single item (e.g. order.items[]) into independent n8n items.\n- Summarize Node: Computes counts, sums, and averages across items without writing custom code.",
          "visualExplanation": {
            "diagramType": "mermaid",
            "caption": "Binary CSV Ingestion to Relational Database Records",
            "mermaidCode": "graph LR\n  EMAIL[\"Email Trigger: Attachment Arrives\"] --> EXTRACT[\"Extract Binary Property: data\"]\n  EXTRACT --> CSV[\"Spreadsheet File Node: Parse CSV to JSON Items\"]\n  CSV --> SPLIT[\"1 Item with Binary -> 500 n8n JSON Items\"]\n  SPLIT --> NORM[\"Edit Fields: Normalize Dates & Currency\"]\n  NORM --> DB[(\"PostgreSQL: Bulk Insert Rows\")]\n\n  style EMAIL fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC\n  style CSV fill:#1E293B,stroke:#F59E0B,stroke-width:2px,color:#F8FAFC\n  style SPLIT fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC\n  style DB fill:#0F172A,stroke:#8B5CF6,stroke-width:2px,color:#F8FAFC"
          },
          "technicalDetails": "Flattening Nested Objects in JavaScript:\nA generic flattening function in the Code node recursively collapses deep hierarchies into dot-notated keys:\n```javascript\nfunction flatten(obj, prefix = '') {\n  return Object.keys(obj).reduce((acc, k) => {\n    const pre = prefix.length ? prefix + '.' : '';\n    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {\n      Object.assign(acc, flatten(obj[k], pre + k));\n    } else {\n      acc[pre + k] = obj[k];\n    }\n    return acc;\n  }, {});\n}\n```",
          "workedExample": {
            "scenario": "Splitting an order with 2 line items into 2 distinct shipping labels.",
            "inputJson": [
              {
                "json": {
                  "orderId": "ORD-771",
                  "recipient": "Rachel Zane",
                  "items": [
                    {
                      "sku": "SHIRT-BLU",
                      "qty": 2
                    },
                    {
                      "sku": "JEANS-BLK",
                      "qty": 1
                    }
                  ]
                }
              }
            ],
            "transformationLogic": "Use the Split Out node on property items, copying orderId and recipient to each child.",
            "outputJson": [
              {
                "json": {
                  "orderId": "ORD-771",
                  "recipient": "Rachel Zane",
                  "sku": "SHIRT-BLU",
                  "qty": 2
                }
              },
              {
                "json": {
                  "orderId": "ORD-771",
                  "recipient": "Rachel Zane",
                  "sku": "JEANS-BLK",
                  "qty": 1
                }
              }
            ],
            "explanation": "The Split Out node explodes the embedded array into individual top-level items while preserving parent metadata."
          },
          "stepByStepLab": {
            "title": "Parsing and Normalizing an Uploaded CSV File",
            "goal": "Read raw binary CSV data, convert to n8n items, and standardize column headers.",
            "steps": [
              {
                "stepNumber": 1,
                "title": "Simulate Binary CSV Data",
                "instruction": "Add an HTTP Request node fetching a sample CSV file or use the Code node to generate base64 binary text."
              },
              {
                "stepNumber": 2,
                "title": "Add Spreadsheet File Node",
                "instruction": "Add Spreadsheet File node. Operation: 'Read from file'. Set Binary Property: data."
              },
              {
                "stepNumber": 3,
                "title": "Inspect Parsed Items",
                "instruction": "Test the step. Observe how the single binary file transforms into an array of distinct JSON items."
              }
            ],
            "expectedResult": "A clean array of JSON items representing each row in the spreadsheet."
          },
          "commonMistakes": [
            {
              "mistake": "Trying to read binary data using JSON expressions like $json.binary.data.",
              "consequence": "Throws undefined or returns raw base64 strings.",
              "correction": "Use binary-aware nodes (Spreadsheet File, Read/Write Files from Disk, or Code node helper $binary)."
            }
          ],
          "knowledgeCheck": [
            {
              "id": "q13-1",
              "question": "Which node should you use to explode an array of sub-items (e.g. order line items) into separate n8n items?",
              "options": [
                "Merge node",
                "Split Out node",
                "Wait node",
                "Schedule node"
              ],
              "correctIndex": 1,
              "explanation": "The Split Out node takes an array nested inside an item and splits each element out into its own independent n8n item."
            }
          ],
          "practicalChallenge": {
            "prompt": "Given an array of raw phone numbers in various formats ((555) 019-2834, 555.019.2834, +15550192834), write a Code node regex transformation that normalizes all numbers to E.164 format (+15550192834).",
            "hints": [
              "Strip all non-digits with replace(/\\D/g, '') and prepend country code."
            ],
            "solutionNotes": "const digits = phone.replace(/\\D/g, ''); return digits.length === 10 ? '+1' + digits : '+' + digits;"
          },
          "keyTakeaways": [
            "n8n handles files via the parallel binary property alongside json.",
            "Use Split Out to explode nested arrays and Summarize to compute totals.",
            "Normalize third-party schemas at the boundary of your workflows before calling core systems."
          ],
          "officialDocLinks": [
            {
              "title": "Official n8n Binary Data Guide",
              "url": "https://docs.n8n.io/data/binary-data/",
              "note": "Comprehensive overview of reading, writing, and transforming binary files."
            }
          ]
        }
      ]
    },
    {
      "id": "module-14",
      "number": 14,
      "stageId": "stage-3",
      "title": "Reliable Workflow Architecture",
      "subtitle": "Sub-Workflows, Idempotency, Retries & Dead-Letter Queues",
      "description": "Design enterprise-grade automations. Learn how to break monoliths into modular sub-workflows, implement correlation IDs, design dead-letter queues (DLQs), and guarantee idempotency.",
      "difficulty": "Advanced",
      "estimatedMinutes": 75,
      "lessons": [
        {
          "id": "lesson-14-1",
          "moduleId": "module-14",
          "stageId": "stage-3",
          "title": "Resilient System Architecture & Modular Design",
          "subtitle": "The sub-workflow pattern, exponential backoff, and idempotency keys",
          "difficulty": "Advanced",
          "estimatedMinutes": 75,
          "prerequisites": [
            "Module 6",
            "Module 11"
          ],
          "whyItMatters": "Amateur workflows look like giant 80-node webs. When one node fails, the entire workflow halts, leaving records half-processed and in an inconsistent state. Senior automation architects build modular, decoupled systems using sub-workflows, unique correlation IDs, and automated dead-letter queues.",
          "relatableProblem": "A giant monolithic workflow does order validation, payment charging, inventory deduction, and customer emailing. During a Black Friday flash sale, the email service times out. Because all steps were inside one giant workflow, the entire execution crashed\u2014meaning the customer was charged, but inventory was not deducted, and no receipt was issued. Splitting this into modular sub-workflows ensures decoupled reliability.",
          "firstPrinciplesExplanation": "The 4 Pillars of Resilient Architecture:\n\n1. Modular Sub-Workflows ('Execute Workflow' Node):\n   - Treat complex tasks as reusable functions.\n   - Main Workflow handles ingestion and orchestrates calls to sub-workflows (e.g. Sub-ChargeCard, Sub-UpdateInventory).\n   - Enables parallel development, testing in isolation, and clean version control.\n2. Idempotency Keys:\n   - Every transaction gets a unique identifier (e.g. order_id_timestamp or UUID).\n   - Before performing a destructive action (like charging money), check if this key was already processed.\n3. Exponential Backoff with Jitter:\n   - When an API fails, retrying immediately can overload the server.\n   - Wait 1s, then 2s, 4s, 8s, with random millisecond variation ('jitter') to prevent thundering herd problems.\n4. Dead-Letter Queue (DLQ):\n   - When a record fails all retry attempts, DO NOT discard it.\n   - Route it to a DLQ (a dedicated database table or Slack alert) with the full payload, error stack trace, and correlation ID for human review.",
          "visualExplanation": {
            "diagramType": "mermaid",
            "caption": "Modular Sub-Workflow Pattern with Dead-Letter Queue (DLQ)",
            "mermaidCode": "graph TD\n  MAIN[\"Main Workflow: Webhook Ingestion\"] --> CID[\"Inject Correlation ID: UUIDv4\"]\n  CID --> SUB1[\"Execute Workflow: Validate & Clean\"]\n  SUB1 --> SUB2[\"Execute Workflow: Charge Payment\"]\n  SUB2 -->|Success| SUB3[\"Execute Workflow: Fulfill Order\"]\n  SUB2 -->|Failure After 3 Retries| DLQ[\"Dead-Letter Queue Sub-Workflow\"]\n  DLQ --> DLQ_DB[(\"Insert Failed Record into DLQ Table\")]\n  DLQ --> DLQ_ALERT[\"Send PagerDuty / Slack Dev Alert with Re-Run Button\"]\n\n  style MAIN fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC\n  style SUB1 fill:#1E293B,stroke:#94A3B8,stroke-width:1px,color:#F8FAFC\n  style SUB2 fill:#1E293B,stroke:#10B981,stroke-width:2px,color:#F8FAFC\n  style SUB3 fill:#1E293B,stroke:#10B981,stroke-width:2px,color:#F8FAFC\n  style DLQ fill:#0F172A,stroke:#EF4444,stroke-width:2px,color:#F8FAFC"
          },
          "technicalDetails": "Correlation IDs in n8n:\nAt the very start of every execution, generate a UUID:\n```javascript\n{{ $execution.id }} // n8n internal execution ID\n// or crypto UUID:\n{{ crypto.randomUUID() }}\n```\nPass this correlation ID to every sub-workflow, database insert, and external log entry. If a customer reports an issue, you can search that single ID across all execution logs.",
          "workedExample": {
            "scenario": "Invoking a sub-workflow to calculate complex enterprise taxes.",
            "inputJson": {
              "correlationId": "corr_8921-391a",
              "grossAmount": 50000,
              "country": "Germany"
            },
            "transformationLogic": "Main workflow uses Execute Workflow node, passing items and receiving the tax calculation sub-workflow response.",
            "outputJson": {
              "correlationId": "corr_8921-391a",
              "taxRate": 0.19,
              "taxAmount": 9500,
              "netAmount": 59500,
              "subWorkflowExecutionId": "exec_40192"
            },
            "explanation": "The sub-workflow operates as an isolated black box with its own unit tests and independent versioning."
          },
          "stepByStepLab": {
            "title": "Building a Parent-Child Sub-Workflow System",
            "goal": "Create an independent sub-workflow and call it from a parent workflow.",
            "steps": [
              {
                "stepNumber": 1,
                "title": "Create the Sub-Workflow",
                "instruction": "Create a new workflow named 'Sub - Tax Calculator'. Add an 'Execute Workflow Trigger' node. Connect an Edit Fields node adding taxRate: 0.20, calculatedTax: {{ $json.subtotal * 0.20 }}. Save it."
              },
              {
                "stepNumber": 2,
                "title": "Create the Parent Workflow",
                "instruction": "Create a new workflow named 'Parent - Order Intake'. Add a Manual Trigger with sample order data { subtotal: 100 }."
              },
              {
                "stepNumber": 3,
                "title": "Add Execute Workflow Node",
                "instruction": "Add the 'Execute Workflow' node. Select 'Sub - Tax Calculator' from the dropdown. Pass input data."
              },
              {
                "stepNumber": 4,
                "title": "Execute and Verify",
                "instruction": "Test the step. Verify that the parent workflow receives the calculated tax from the child workflow."
              }
            ],
            "expectedResult": "The parent workflow seamlessly executes the child workflow and receives the returned data."
          },
          "commonMistakes": [
            {
              "mistake": "Building a single monolithic 100-node workflow.",
              "consequence": "Extremely difficult to debug, impossible for multiple engineers to work on concurrently, and slow canvas loading.",
              "correction": "Decompose workflows into distinct, single-responsibility sub-workflows linked by Execute Workflow nodes."
            }
          ],
          "knowledgeCheck": [
            {
              "id": "q14-1",
              "question": "What is the primary role of a Dead-Letter Queue (DLQ) in automation engineering?",
              "options": [
                "To automatically delete old customer files.",
                "To capture and persist failed records that exhausted all retry attempts so they can be audited, alerted, and replayed safely without data loss.",
                "To speed up Docker startup.",
                "To encrypt passwords."
              ],
              "correctIndex": 1,
              "explanation": "A Dead-Letter Queue ensures that when catastrophic or non-recoverable errors occur, the failed payloads are preserved in a durable state for manual inspection and replay."
            }
          ],
          "practicalChallenge": {
            "prompt": "Design a reconciliation workflow that runs every midnight: It queries the DLQ database table, counts unhandled errors, and sends an alert summary to Slack with a direct link to each failed execution.",
            "hints": [
              "Use Schedule Trigger -> Postgres (Select * from dlq where resolved = false) -> Slack."
            ],
            "solutionNotes": "This guarantees operational visibility and ensures failed records are never silently ignored."
          },
          "keyTakeaways": [
            "Break complex workflows into modular sub-workflows using the Execute Workflow node.",
            "Inject a unique Correlation ID at the start of every execution for end-to-end traceability.",
            "Always capture unrecoverable errors in a durable Dead-Letter Queue."
          ],
          "officialDocLinks": [
            {
              "title": "Official n8n Sub-Workflows Guide",
              "url": "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow/",
              "note": "How to structure parent-child workflows and share data."
            }
          ]
        }
      ]
    },
    {
      "id": "module-15",
      "number": 15,
      "stageId": "stage-3",
      "title": "Error Handling and Debugging",
      "subtitle": "Systematic Troubleshooting & 20+ Real Diagnostic Cases",
      "description": "Master debugging like a senior engineer. Learn execution inspection, reading stack traces, type coercion errors, configuring Error Workflows, and consulting the 20+ case diagnostic catalog.",
      "difficulty": "Advanced",
      "estimatedMinutes": 80,
      "lessons": [
        {
          "id": "lesson-15-1",
          "moduleId": "module-15",
          "stageId": "stage-3",
          "title": "Systematic Debugging & Error Trigger Workflows",
          "subtitle": "From error inspection to automated incident recovery and regression testing",
          "difficulty": "Advanced",
          "estimatedMinutes": 80,
          "prerequisites": [
            "Module 14"
          ],
          "whyItMatters": "Things will break. APIs change schemas, servers return 502 Bad Gateway, rate limits get exceeded, and input data arrives in unexpected formats. The difference between an amateur and a professional automation engineer is that the professional anticipates failure, designs automated containment systems, and knows how to dissect an error stack trace in seconds.",
          "relatableProblem": "A company's overnight payroll workflow crashes due to a network glitch at 2:00 AM. Nobody notices until Friday afternoon when employees don't receive their direct deposits. If the workflow had an Error Trigger attached, an instant alert would have notified the on-call engineer at 2:01 AM with the exact failing node and execution ID.",
          "firstPrinciplesExplanation": "The 3 Levels of Error Handling in n8n:\n\n1. Node-Level Error Handling ('On Error' Setting):\n   - In any node's Settings tab, you can change 'On Error' from 'Stop Workflow' to 'Continue Regular Output' or 'Continue (using error output)'.\n   - This allows local branching: If an email fails to send, route to an SMS fallback node.\n2. Global Error Workflows ('Error Trigger'):\n   - In Workflow Settings -> 'Error Workflow', you assign a dedicated notification workflow.\n   - If ANY unhandled error halts the main workflow, n8n automatically executes the Error Workflow.\n   - The Error Trigger node receives: execution.id, workflow.id, workflow.name, and the exact error message and stack trace.\n3. The 4-Step Systematic Debugging Method:\n   - Step 1: Inspect the Raw Input Data of the failing node. (Is the field missing? Is it null?)\n   - Step 2: Check the Expression Syntax. (Did you forget optional chaining ?. or bracket notation?)\n   - Step 3: Check External API Status & Credentials. (Did the token expire? Are you hitting rate limits?)\n   - Step 4: Reproduce in Isolation using 'Test step' with the cached execution payload.",
          "visualExplanation": {
            "diagramType": "mermaid",
            "caption": "Global Error Trigger Workflow Execution Mechanism",
            "mermaidCode": "sequenceDiagram\n  autonumber\n  participant M as Main Production Workflow\n  participant N as Failing Node (HTTP Request)\n  participant E as n8n Execution Engine\n  participant W as Dedicated Error Workflow\n  participant S as DevOps Alert (Slack / PagerDuty)\n\n  M->>N: Process Item #42\n  N->>N: HTTP 500 Internal Server Error (Crash)\n  N-->>E: Unhandled Exception Thrown\n  E->>E: Mark Execution as FAILED & Save State\n  E->>W: Trigger Assigned Error Workflow\n  W->>W: Error Trigger Ingests Crash Metadata\n  W->>S: Dispatch Alert: Workflow 'Invoice Engine' failed at node 'ChargeCard' (Exec ID: #9821)"
          },
          "technicalDetails": "Common Error Categories and Diagnostic Signatures:\n- TypeError: Cannot read properties of undefined: Accessing a property on an object that does not exist. Fix: Use optional chaining ?..\n- ECONNREFUSED / ETIMEDOUT: Target host server is unreachable or port is blocked by firewall.\n- HTTP 401 Unauthorized / 403 Forbidden: Expired token or insufficient OAuth scopes.\n- HTTP 429 Too Many Requests: Rate limit reached. Fix: Add exponential backoff retries.\n- No item found for index: Expression used item.json but item count changed after a filter.",
          "workedExample": {
            "scenario": "Inspecting the payload delivered to an Error Trigger node.",
            "inputJson": {
              "execution": {
                "id": "90412",
                "url": "https://n8n.internal.co/execution/90412",
                "error": {
                  "message": "Authorization header is invalid",
                  "node": {
                    "name": "HubSpot Create Contact",
                    "type": "n8n-nodes-base.hubspot"
                  },
                  "stack": "NodeApiError: Authorization header is invalid at Object.execute..."
                },
                "lastNodeExecuted": "HubSpot Create Contact",
                "mode": "webhook"
              },
              "workflow": {
                "id": "w_5501",
                "name": "Production Lead Intake"
              }
            },
            "transformationLogic": "Format an urgent Slack webhook alert with direct link to the failing execution.",
            "outputJson": {
              "text": "\ud83d\udea8 *CRITICAL WORKFLOW FAILURE*",
              "attachments": [
                {
                  "color": "#EF4444",
                  "fields": [
                    {
                      "title": "Workflow",
                      "value": "Production Lead Intake (ID: w_5501)"
                    },
                    {
                      "title": "Failing Node",
                      "value": "HubSpot Create Contact"
                    },
                    {
                      "title": "Error Message",
                      "value": "Authorization header is invalid"
                    },
                    {
                      "title": "Execution URL",
                      "value": "https://n8n.internal.co/execution/90412"
                    }
                  ]
                }
              ]
            },
            "explanation": "The Error Trigger provides all diagnostic details automatically, allowing the DevOps team to fix the expired HubSpot token immediately."
          },
          "stepByStepLab": {
            "title": "Configuring a Global Error Alerting Pipeline",
            "goal": "Create an Error Workflow and test it by deliberately triggering an exception in a main workflow.",
            "steps": [
              {
                "stepNumber": 1,
                "title": "Create the Error Handling Workflow",
                "instruction": "Create a new workflow named 'GLOBAL - Error Handler'. Add an 'Error Trigger' node. Connect an Edit Fields node formatting a Slack notification with {{ $json.execution.error.message }}. Save it."
              },
              {
                "stepNumber": 2,
                "title": "Assign in Main Workflow",
                "instruction": "Open your test workflow. Click Workflow Settings (gear icon) -> 'Error Workflow', select 'GLOBAL - Error Handler'. Save."
              },
              {
                "stepNumber": 3,
                "title": "Deliberately Trigger an Error",
                "instruction": "Add a Code node that executes: throw new Error('Simulated Production Outage!');. Toggle the workflow to Active and trigger it."
              },
              {
                "stepNumber": 4,
                "title": "Verify the Alert",
                "instruction": "Open execution history of 'GLOBAL - Error Handler'. Confirm it caught the simulated failure and extracted the error details."
              }
            ],
            "expectedResult": "The Error Workflow fires automatically and captures the crash metadata."
          },
          "commonMistakes": [
            {
              "mistake": "Putting an Error Trigger inside the main workflow itself instead of a separate workflow.",
              "consequence": "Error Triggers do not work inside the same workflow they are monitoring.",
              "correction": "Always build a separate dedicated Error Workflow and link it via Workflow Settings."
            }
          ],
          "knowledgeCheck": [
            {
              "id": "q15-1",
              "question": "When configuring an Error Workflow, where do you assign it so it monitors your primary workflow?",
              "options": [
                "In the Dockerfile environment variables.",
                "Inside the primary workflow's Settings modal under 'Error Workflow'.",
                "By connecting an arrow to the browser window.",
                "Inside the PostgreSQL database."
              ],
              "correctIndex": 1,
              "explanation": "Each workflow has a Settings panel where you designate which dedicated Error Workflow n8n should trigger if an unhandled node crash occurs."
            }
          ],
          "practicalChallenge": {
            "prompt": "Review the 20-case troubleshooting catalog in the Resources tab. Identify the symptoms, causes, and fixes for: (1) ETIMEDOUT, (2) 429 Too Many Requests, and (3) TypeError: Cannot read properties of undefined.",
            "hints": [
              "Consult the interactive Troubleshooting Matrix built into this handbook."
            ],
            "solutionNotes": "Review the detailed diagnostic steps provided in the handbook's interactive troubleshooting catalog."
          },
          "keyTakeaways": [
            "Use node-level 'Continue on Fail' for local branch recovery (fallbacks).",
            "Use global Error Workflows with Error Triggers for production-wide alerting and incident response.",
            "Always inspect raw input JSON and use optional chaining to eliminate undefined property crashes."
          ],
          "officialDocLinks": [
            {
              "title": "Official n8n Error Handling Documentation",
              "url": "https://docs.n8n.io/flow-logic/error-handling/",
              "note": "Complete guide to node errors, retry policies, and Error Workflows."
            }
          ]
        }
      ]
    }
  ]
};
