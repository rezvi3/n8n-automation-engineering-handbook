import { Stage } from '../../types/curriculum';

export const stage1: Stage = {
  id: 'stage-1',
  number: 1,
  title: 'Core n8n Foundations',
  subtitle: 'The Canvas, Data Flow, JSON & Expression Mastery',
  description: 'Master the n8n visual editor, the core execution engine, the n8n JSON items contract, paired-item linking, and modern expression syntax.',
  badge: 'Stage 1 • Core Foundations',
  accentColor: '#10B981',
  modules: [
    {
      id: 'module-2',
      number: 2,
      stageId: 'stage-1',
      title: 'Mastering the n8n Interface',
      subtitle: 'The Canvas, Node Anatomy, and Execution States',
      description: 'Navigate the visual canvas, understand input/output connection pins, configure node panels, read execution data, and understand the difference between test runs and active workflows.',
      difficulty: 'Beginner',
      estimatedMinutes: 50,
      lessons: [
        {
          id: 'lesson-2-1',
          moduleId: 'module-2',
          stageId: 'stage-1',
          title: 'The Visual Canvas & Node Anatomy',
          subtitle: 'Understanding pins, execution panels, and state indicators',
          difficulty: 'Beginner',
          estimatedMinutes: 50,
          prerequisites: ['Module 0', 'Module 1'],
          whyItMatters: 'The n8n editor is not just a diagramming tool—it is an interactive debugging IDE. Every node displays its live input and output data directly inside its modal. Mastering the canvas allows you to diagnose data shape issues instantly without jumping between logs and code.',
          relatableProblem: 'A new user connects two nodes, clicks "Test step", but sees an empty output. They do not realize that in n8n, a node will not produce an output if the preceding node sent 0 items, or if the connection was wired into the secondary (error) output pin. Understanding node pin types and execution states eliminates this frustration.',
          firstPrinciplesExplanation: 'In n8n, workflows flow from left to right along connection paths between nodes. A node has four essential parts:\n1. Input Pin (Left): Where data enters the node from an upstream node. Most action nodes have one input, but Merge nodes can have multiple.\n2. Output Pin (Right): Where transformed data exits to downstream nodes. Conditional nodes like `If` or `Switch` have multiple output pins representing different branches (e.g. `true` vs `false`).\n3. Node Configuration Modal: Double-clicking any node opens its parameters, credential selectors, and side-by-side data viewer (Input Data on the left, Output Data on the right).\n4. Node Status Indicators: A green checkmark indicates successful execution with output items; a red exclamation mark indicates a runtime error; a grey indicator means the node was skipped because prior branching did not send items to it.\n\nCrucial Distinction: "Test step" executes ONLY that specific node using the cached data from the preceding node. "Test workflow" runs the entire chain from the trigger. "Active workflow" runs in the background 24/7 reacting to external events.',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Anatomy of an n8n Node and Connection Pins',
            mermaidCode: `graph LR
  subgraph Upstream["Preceding Node"]
    U_OUT((Out Pin))
  end

  subgraph CurrentNode["Current Action Node (e.g. Edit Fields)"]
    direction TB
    IN_PIN((In Pin)) --> PARAMS["Parameters & Expressions"]
    PARAMS --> OUT_PIN((Out Pin))
    PARAMS -.-> ERR_PIN((Error Pin<br/>If 'Continue on Fail'))
  end

  subgraph Downstream["Success Branch"]
    D_IN((In Pin))
  end

  subgraph ErrorHandler["Error Branch"]
    E_IN((In Pin))
  end

  U_OUT -->|Array of Items| IN_PIN
  OUT_PIN -->|Transformed Items| D_IN
  ERR_PIN -->|Error Object Payload| E_IN

  style CurrentNode fill:#1E293B,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC
  style Downstream fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC
  style ErrorHandler fill:#0F172A,stroke:#EF4444,stroke-width:2px,color:#F8FAFC`
          },
          technicalDetails: 'Node Modes in n8n:\n- Manual Testing Mode: Executions triggered via the canvas button. Execution logs are stored temporarily with full debug payloads.\n- Active (Production) Mode: The toggle switch in the top right. When set to Active, webhook listeners are registered in the router, schedule cron tasks are mounted in memory, and production execution policies apply.\n- Execution Settings: Under "Settings" in the top bar, you can configure "Save failed executions", "Save successful executions", and assign dedicated Error Workflows.',
          workedExample: {
            scenario: 'Inspecting input vs output data inside the Edit Fields node modal.',
            inputJson: [
              {
                "json": {
                  "raw_first_name": "Marcus",
                  "raw_last_name": "Vance",
                  "order_total": 450
                }
              }
            ],
            transformationLogic: 'Combine first and last names into a unified `fullName` property and format currency string.',
            outputJson: [
              {
                "json": {
                  "fullName": "Marcus Vance",
                  "formattedTotal": "$450.00"
                }
              }
            ],
            explanation: 'In the modal, the left pane displays the 3 raw fields. In the center, we configure the expressions `{{ $json.raw_first_name }} {{ $json.raw_last_name }}` and `\${{ $json.order_total }}.00`. The right pane immediately previews the resulting object.'
          },
          stepByStepLab: {
            title: 'Navigating the Canvas and Running Your First Test',
            goal: 'Create a new workflow, place a Manual Trigger, connect an Edit Fields node, and inspect execution data.',
            steps: [
              {
                stepNumber: 1,
                title: 'Create a New Blank Workflow',
                instruction: 'Open http://localhost:5678, click "+ Add workflow" in the top right, and name it "Lab 1 - Canvas Exploration".'
              },
              {
                stepNumber: 2,
                title: 'Add a Manual Trigger',
                instruction: 'Click the "+" button on the canvas or press Tab. Search for "When clicking \'Test workflow\'" (Manual Trigger) and click to add it.'
              },
              {
                stepNumber: 3,
                title: 'Add and Configure an Edit Fields Node',
                instruction: 'Drag from the output pin of the trigger and add "Edit Fields (Set)". Add a string field named `status` with value `Hello from n8n!`, and a number field named `timestamp` with expression `{{ Date.now() }}`.'
              },
              {
                stepNumber: 4,
                title: 'Execute and Inspect',
                instruction: 'Click "Test step". Switch between Schema view, Table view, and JSON view in the right-hand output pane. Observe how n8n formats the output.'
              }
            ],
            expectedResult: 'A green checkmark appears on both nodes, and the output pane shows your structured JSON item.'
          },
          commonMistakes: [
            {
              mistake: 'Leaving a workflow Inactive while expecting external webhooks to trigger it.',
              consequence: 'External webhooks receive 404 Not Found or 400 Bad Request because the production listener is disabled.',
              correction: 'Always flip the "Active" toggle switch in the top right to ON when ready to receive live webhook traffic.'
            },
            {
              mistake: 'Testing only downstream nodes without upstream data cached.',
              consequence: 'The editor throws "No data found from previous node".',
              correction: 'Run the preceding nodes first or click "Test workflow" to populate the canvas cache.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q2-1',
              question: 'What is the primary difference between "Test step" and "Test workflow"?',
              options: [
                'Test step deletes the workflow; Test workflow saves it.',
                'Test step executes only the currently open node using cached data from the prior node; Test workflow runs the entire pipeline from the trigger node.',
                'Test step only works for JavaScript code.',
                'There is no difference.'
              ],
              correctIndex: 1,
              explanation: 'Test step isolates the single node you are editing and runs it against cached input, enabling fast iteration. Test workflow triggers the complete sequence from the beginning.'
            }
          ],
          practicalChallenge: {
            prompt: 'In your test workflow, add a second Edit Fields node connected to the first. Extract the `timestamp` field from the first node and transform it into a human-readable ISO date string using JavaScript.',
            hints: ['Use the expression `{{ new Date($json.timestamp).toISOString() }}` in the new field.'],
            solutionNotes: 'The output will contain an ISO timestamp string like `2026-10-25T00:45:00.000Z` linked back to the original item.'
          },
          keyTakeaways: [
            'n8n nodes flow left to right, processing arrays of JSON items.',
            'Double-clicking any node gives you a real-time data inspector with Input (left) and Output (right).',
            'Workflows must be toggled to Active to execute on automated schedules or live webhooks.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n Workflow Editor Guide',
              url: 'https://docs.n8n.io/canvas/canvas-navigation/',
              note: 'Full guide to keyboard shortcuts, pan/zoom, and node selection.'
            }
          ]
        }
      ]
    },
    {
      id: 'module-3',
      number: 3,
      stageId: 'stage-1',
      title: 'Nodes, Triggers, and Workflow Execution',
      subtitle: 'The Core Engine Lifecycle and Branching Logic',
      description: 'Understand the four categories of triggers (Manual, Schedule, Webhook, App Events), how nodes execute in topological order, and how branching works.',
      difficulty: 'Beginner',
      estimatedMinutes: 55,
      lessons: [
        {
          id: 'lesson-3-1',
          moduleId: 'module-3',
          stageId: 'stage-1',
          title: 'Triggers & Execution Topology',
          subtitle: 'From event receipt to branching and completion',
          difficulty: 'Beginner',
          estimatedMinutes: 55,
          prerequisites: ['Module 2'],
          whyItMatters: 'Every workflow starts with a trigger. If you pick the wrong trigger type (e.g. polling every 1 minute instead of using an instant webhook), you waste compute resources, hit API rate limits, and introduce unwanted latency into business operations.',
          relatableProblem: 'A company wants instant notifications when a Stripe charge fails. A developer sets up a Schedule trigger that queries Stripe every 5 minutes. During high-volume sales events, Stripe rate-limits the requests, and customers whose payments fail have to wait up to 5 minutes before receiving a retry link. Switching to a Stripe Webhook Trigger makes the response instant (under 500ms) with zero polling overhead.',
          firstPrinciplesExplanation: 'n8n triggers fall into four architectural archetypes:\n1. Manual Trigger: Used exclusively for interactive design and debugging inside the editor.\n2. Schedule Trigger: Based on node-cron. Executes on defined chronometric intervals (every X minutes, daily at 9am in specific timezones, or custom cron expressions).\n3. Webhook Trigger: Exposes an HTTP endpoint on your n8n server. An external system (Stripe, GitHub, Typeform) makes an HTTP POST/GET request to this URL, immediately waking up the workflow.\n4. App-Specific Event Triggers: Nodes with pre-built polling or webhook-subscription management (e.g., Slack "On Message Posted", Gmail "On Email Received").\n\nExecution Order:\nn8n executes nodes according to directed acyclic graph (DAG) topological sorting. When a node has multiple outgoing branches, n8n executes the branches sequentially or in parallel depending on the execution mode, passing the array of output items down each connected branch.',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Execution Flow and Branching Lifecycle',
            mermaidCode: `sequenceDiagram
  autonumber
  actor User as External Event (Stripe)
  participant WH as Webhook Trigger
  participant IF as If Node (Condition)
  participant S1 as Success Branch (Email)
  participant S2 as Failure Branch (Alert)

  User->>WH: HTTP POST /webhook/stripe-charge
  WH->>WH: Parse Payload into JSON Item Array
  WH->>IF: Pass [ { json: { status: 'failed' } } ]
  IF->>IF: Evaluate Condition ($json.status === 'succeeded')
  alt Condition False
    IF->>S2: Output pin 1 (False Branch)
    S2->>S2: Send PagerDuty / Slack Alert
  else Condition True
    IF->>S1: Output pin 0 (True Branch)
    S1->>S1: Send Receipt Email
  end`
          },
          technicalDetails: 'Key Workflow Settings:\n- Error Trigger: Allows you to designate a global error-handling workflow that automatically catches unhandled node crashes across the entire execution.\n- Timezone: Configurable per workflow under Workflow Settings -> Timezone. Always set this explicitly when using Schedule triggers to avoid daylight savings or UTC discrepancies.\n- Timeout: Maximum execution time in seconds. By default, workflows run until complete, but long-running tasks should have a timeout (e.g. 300s) to prevent memory leaks.',
          workedExample: {
            scenario: 'Routing customer feedback by sentiment score.',
            inputJson: [
              {
                "json": {
                  "customer": "Sarah Connor",
                  "sentimentScore": 0.2,
                  "feedback": "System crashed during checkout."
                }
              }
            ],
            transformationLogic: 'Branch on `sentimentScore < 0.4` to route critical complaints to escalation Slack channel.',
            outputJson: [
              {
                "json": {
                  "routedTo": "Escalation Support Queue",
                  "priority": "CRITICAL",
                  "customer": "Sarah Connor",
                  "sentimentScore": 0.2
                }
              }
            ],
            explanation: 'The If node evaluates the expression `{{ $json.sentimentScore < 0.4 }}`. Since 0.2 < 0.4 is true, the item is pushed out of Output 0 (True), triggering the Escalation branch while the standard acknowledgment branch receives 0 items.'
          },
          stepByStepLab: {
            title: 'Building a Multi-Branch Scheduled Diagnostic Reporter',
            goal: 'Build a scheduled workflow that checks server health metrics and routes to different actions based on memory thresholds.',
            steps: [
              {
                stepNumber: 1,
                title: 'Add a Schedule Trigger',
                instruction: 'Add a Schedule Trigger set to trigger every 1 hour (for testing, you can use the Manual Trigger button).'
              },
              {
                stepNumber: 2,
                title: 'Add a Mock Metrics Node',
                instruction: 'Add an Edit Fields node simulating server stats: `cpuLoad: 88`, `memoryUsedPercent: 92`, `host: "prod-db-01"`.'
              },
              {
                stepNumber: 3,
                title: 'Add an If Node',
                instruction: 'Connect an If node. Condition: Number `{{ $json.memoryUsedPercent }}` Greater Than `85`.'
              },
              {
                stepNumber: 4,
                title: 'Connect Both Branches',
                instruction: 'On the True output, connect an Edit Fields node setting `alertLevel: "EMERGENCY"`. On the False output, connect one setting `alertLevel: "NORMAL"`. Test the step and confirm which branch activates.'
              }
            ],
            expectedResult: 'The True branch activates with the EMERGENCY status because 92 > 85.'
          },
          commonMistakes: [
            {
              mistake: 'Connecting two branches back into an action node without a Merge node.',
              consequence: 'The downstream node executes twice—once for each incoming branch—or fails if data shapes differ.',
              correction: 'Use the `Merge` node when you want to join multiple diverging branches back into a single unified stream.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q3-1',
              question: 'When an If node evaluates an item and routes it down the "true" branch, what happens to the "false" output pin?',
              options: [
                'It sends an empty error object.',
                'It outputs 0 items, meaning connected downstream nodes on that branch do not execute.',
                'It halts the entire workflow with an exception.',
                'It pauses until the true branch finishes.'
              ],
              correctIndex: 1,
              explanation: 'In n8n, if a branch receives 0 items, subsequent nodes on that branch are not invoked. This is the foundation of conditional execution.'
            }
          ],
          practicalChallenge: {
            prompt: 'Upgrade the If node to a Switch node with 3 routing rules: Memory > 90 (Critical), Memory between 70 and 90 (Warning), and Memory < 70 (Healthy).',
            hints: ['Use the Switch node in "Rules" mode with multiple routing output conditions.'],
            solutionNotes: 'The Switch node produces 3 distinct output pins, allowing granular multi-way routing without chaining nested If nodes.'
          },
          keyTakeaways: [
            'Triggers define when and how a workflow awakens: on a schedule, via webhooks, or from app events.',
            'Data travels down branches as arrays of items; branches with 0 items do not execute downstream nodes.',
            'Always set explicit workflow timezones and configure global error handling workflows.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n Triggers Overview',
              url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/',
              note: 'Detailed reference for Schedule and Webhook triggers.'
            }
          ]
        }
      ]
    },
    {
      id: 'module-4',
      number: 4,
      stageId: 'stage-1',
      title: 'Understanding JSON and Data Structures',
      subtitle: 'The Universal Language of Modern Automation',
      description: 'Master JSON objects, arrays, keys, nested hierarchies, and the strict n8n data contract: an array of objects, each containing a "json" property.',
      difficulty: 'Beginner',
      estimatedMinutes: 65,
      lessons: [
        {
          id: 'lesson-4-1',
          moduleId: 'module-4',
          stageId: 'stage-1',
          title: 'JSON Mastery & The n8n Item Contract',
          subtitle: 'Why everything in n8n is an Array of Items with a json key',
          difficulty: 'Beginner',
          estimatedMinutes: 65,
          prerequisites: ['Module 2'],
          whyItMatters: '90% of beginner errors in n8n come from misunderstanding JSON structures—confusing an object with an array, failing to access nested child properties, or not knowing why a node executed 5 times instead of once. Once you master JSON and n8n’s item schema, building automations becomes intuitive.',
          relatableProblem: 'A developer queries an API that returns a list of 50 customers. When they pass it to the Slack node, the Slack node sends 50 separate spam messages to the channel within 1 second. Why? Because the API returned 50 distinct n8n items, and n8n nodes execute *once for each incoming item* by default. Understanding item arrays is the difference between clean automation and catastrophic spam.',
          firstPrinciplesExplanation: 'JSON (JavaScript Object Notation) has 6 fundamental data types:\n1. String: text wrapped in quotes (`"hello"`)\n2. Number: integer or floating-point (`42`, `3.14`)\n3. Boolean: `true` or `false`\n4. Null: explicit absence of value (`null`)\n5. Object: unordered key-value pairs wrapped in curly braces (`{ "name": "Alice", "age": 30 }`)\n6. Array: ordered list of elements wrapped in square brackets (`[ "apple", "banana" ]` or `[ { "id": 1 }, { "id": 2 } ]`)\n\nTHE CRITICAL N8N DATA CONTRACT:\nEvery single node in n8n expects and outputs a top-level ARRAY of objects. Furthermore, each item in that array MUST contain a `json` key containing the actual record fields:\n```json\n[\n  {\n    "json": {\n      "id": 101,\n      "name": "Acme Corp"\n    }\n  },\n  {\n    "json": {\n      "id": 102,\n      "name": "Stark Industries"\n    }\n  }\n]\n```\nIf an upstream node returns 10 items in this array, downstream nodes will loop and execute 10 times automatically unless you aggregate them with an Edit Fields, Code, or Summarize node.',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Visual Hierarchy: Raw Data vs. n8n Items Contract',
            mermaidCode: `graph TD
  subgraph RawAPI["External Raw API Response"]
    R1["{
  'company': 'Acme',
  'users': ['Alice', 'Bob', 'Charlie']
}"]
  end

  subgraph n8nContract["n8n Internal Items Contract (Array of Objects)"]
    A1["Top-Level Array [ ... ]"]
    A1 --> I1["Item 0: { json: { company: 'Acme', userCount: 3 } }"]
    A1 --> I2["Item 1: { json: { company: 'Beta', userCount: 1 } }"]
  end

  subgraph LoopBehavior["Downstream Node Execution Behavior"]
    I1 --> E1["Execution 1: Processes Item 0"]
    I2 --> E2["Execution 2: Processes Item 1"]
  end

  style RawAPI fill:#1E293B,stroke:#94A3B8,stroke-width:1px,color:#F8FAFC
  style n8nContract fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC
  style LoopBehavior fill:#1E293B,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC`
          },
          secondaryVisual: {
            diagramType: 'json_diff',
            caption: 'Before & After: Converting a Nested List into n8n Items',
            beforeAfter: {
              beforeTitle: 'Raw API Output (Single Item with Array Property)',
              beforeData: {
                "order_id": 501,
                "items": [
                  { "sku": "A1", "price": 10 },
                  { "sku": "B2", "price": 25 }
                ]
              },
              afterTitle: 'Normalized n8n Items (Split Into Independent Records)',
              afterData: [
                { "order_id": 501, "sku": "A1", "price": 10 },
                { "order_id": 501, "sku": "B2", "price": 25 }
              ]
            }
          },
          technicalDetails: 'Key n8n JSON Rules:\n- Property Access: In expressions, `$json.customer.address.city` accesses nested object keys.\n- Bracket Notation: If a key contains hyphens, spaces, or dots (e.g. `order-id`), access it with brackets: `$json["order-id"]`.\n- Optional Chaining: To prevent "Cannot read properties of undefined" errors when a nested object might be missing, use `?.`: `$json?.customer?.address?.city`.\n- Nullish Coalescing: To provide a safe fallback for missing values: `$json.phone ?? "N/A"`.\n- Binary Data: If an item contains a file (PDF, image, CSV), n8n adds a parallel `binary` property alongside `json`: `{ "json": { ... }, "binary": { "data": { ... } } }`.',
          workedExample: {
            scenario: 'Inspecting messy e-commerce webhook data and navigating deep keys.',
            inputJson: [
              {
                "json": {
                  "event": "charge.successful",
                  "data": {
                    "customer": {
                      "billing_details": {
                        "address": {
                          "postal_code": "94103",
                          "country": "US"
                        }
                      }
                    },
                    "line_items": [
                      { "title": "Pro Plan Subscription", "amount_cents": 4900 }
                    ]
                  }
                }
              }
            ],
            transformationLogic: 'Extract deep postal code and calculate dollar amount with safe fallbacks.',
            outputJson: [
              {
                "json": {
                  "postalCode": "94103",
                  "country": "US",
                  "firstItemTitle": "Pro Plan Subscription",
                  "amountDollars": 49.00
                }
              }
            ],
            explanation: 'We access `postalCode` with `{{ $json.data.customer.billing_details.address.postal_code }}` and the first line item with `{{ $json.data.line_items[0].title }}`.'
          },
          stepByStepLab: {
            title: 'Deconstructing Nested JSON with the Edit Fields Node',
            goal: 'Take a complex nested invoice payload and flatten it into clean, flat CRM-ready fields.',
            steps: [
              {
                stepNumber: 1,
                title: 'Add a Code Node to Simulate API Data',
                instruction: 'Add a Code node set to "Run Once for All Items" returning the sample nested e-commerce payload shown above.'
              },
              {
                stepNumber: 2,
                title: 'Add an Edit Fields Node',
                instruction: 'Connect an Edit Fields (Set) node. Toggle "Keep Only Set Fields" to ON.'
              },
              {
                stepNumber: 3,
                title: 'Map Properties',
                instruction: 'Add a field `customerPostal`: `{{ $json.data.customer.billing_details.address.postal_code }}`. Add a field `totalAmount`: `{{ $json.data.line_items[0].amount_cents / 100 }}`.'
              },
              {
                stepNumber: 4,
                title: 'Test and Inspect',
                instruction: 'Click Test step. Confirm that the messy nested hierarchy has been transformed into a clean, flat 2-field record.'
              }
            ],
            expectedResult: 'A clean 1-item array containing only `customerPostal` and `totalAmount`.'
          },
          commonMistakes: [
            {
              mistake: 'Using `$json.items.price` when `items` is an array of objects.',
              consequence: 'Returns `undefined` because an array does not possess a direct property named `price`.',
              correction: 'Specify the index: `$json.items[0].price`, or use an array method like `$json.items.map(i => i.price)` or the "Split Out" node.'
            },
            {
              mistake: 'Trying to access `$json.order-id` without bracket notation.',
              consequence: 'JavaScript interprets the hyphen as a subtraction operator (`$json.order` minus `id`), causing NaN or syntax errors.',
              correction: 'Always wrap hyphenated or spaced keys in brackets: `$json["order-id"]`.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q4-1',
              question: 'Why does an action node execute 5 times if the preceding node outputs an array of 5 items?',
              options: [
                'It is an error in n8n configuration.',
                'By default, n8n executes action nodes once for every individual item present in the incoming items array.',
                'The workflow is stuck in an infinite loop.',
                'The API sent duplicate webhooks.'
              ],
              correctIndex: 1,
              explanation: 'n8n is fundamentally item-based. Each element in the incoming array represents an independent business record (e.g., an order, a user, a lead), so nodes iterate over them automatically.'
            },
            {
              id: 'q4-2',
              question: 'Given an object with potential missing data, which expression safely retrieves the city without crashing if `shipping` is null?',
              options: [
                '{{ $json.customer.shipping.city }}',
                '{{ $json.customer?.shipping?.city ?? "Default City" }}',
                '{{ city.shipping.customer }}',
                '{{ $json[city] }}'
              ],
              correctIndex: 1,
              explanation: 'Optional chaining (`?.`) gracefully returns undefined instead of throwing a TypeError if an intermediate property is null or undefined, and nullish coalescing (`??`) provides a reliable fallback.'
            }
          ],
          practicalChallenge: {
            prompt: 'Given an array of 3 line items inside `$json.cart.items`, write an expression that calculates the sum of all item prices using the native JavaScript array `.reduce()` method.',
            hints: ['Use `{{ $json.cart.items.reduce((total, item) => total + item.price, 0) }}`.'],
            solutionNotes: 'This calculates the grand total directly inside an expression without needing a separate Code or Loop node.'
          },
          keyTakeaways: [
            'All data in n8n is strictly formatted as an array of objects with a top-level `json` key.',
            'Nodes execute once per item in the array unless aggregated.',
            'Use optional chaining `?.` and bracket notation `$json["key-name"]` to prevent expression crashes.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n Data Structure & Item Linking Guide',
              url: 'https://docs.n8n.io/data/data-structure/',
              note: 'Core explanation of items, JSON structure, and paired items.'
            }
          ]
        }
      ]
    },
    {
      id: 'module-5',
      number: 5,
      stageId: 'stage-1',
      title: 'Data Mapping and Expressions',
      subtitle: 'Expressions, Item Linking, and Modern Syntax',
      description: 'Master the n8n expression engine. Learn how to cross-reference data from earlier nodes using `$("Node Name")`, master `pairedItem` linking, and manipulate dates using Luxon.',
      difficulty: 'Intermediate',
      estimatedMinutes: 60,
      lessons: [
        {
          id: 'lesson-5-1',
          moduleId: 'module-5',
          stageId: 'stage-1',
          title: 'Modern Expressions & Paired-Item Linking',
          subtitle: 'Referencing past nodes, handling paired items, and Luxon dates',
          difficulty: 'Intermediate',
          estimatedMinutes: 60,
          prerequisites: ['Module 4'],
          whyItMatters: 'In complex multi-step workflows, an action node at step 6 frequently needs data from step 1 (like the original customer email) as well as data from step 5 (like a generated invoice PDF ID). If you don\'t understand cross-node referencing and paired-item mechanics, your expressions will pull the wrong customer\'s data or throw indexing errors.',
          relatableProblem: 'You have a workflow that fetches 10 leads, enriches each lead with Clearbit, and creates a record in HubSpot. In the HubSpot node, you reference the original form submission using `$("Form Trigger").item.json.email`. Without understanding item pairing, if Clearbit filtered out 2 invalid leads, lead #5 might be accidentally updated with lead #7\'s email address. Item linking prevents this catastrophic data misalignment.',
          firstPrinciplesExplanation: 'In n8n, expressions are wrapped in double curly braces: `{{ ... }}`.\n\nKey Expression Global Variables:\n1. `$json`: References the JSON data of the *current item* entering the node.\n2. `$("Node Name").item.json.field`: References the *paired item* from an upstream node named "Node Name".\n3. `$("Node Name").all()`: Returns the entire array of all items output by that node.\n4. `$("Node Name").first().json`: Shorthand to grab the first item from that node regardless of current item index.\n5. `DateTime`: Built-in instance of the Luxon library for advanced date and time manipulation.\n6. `$now` / `$today`: Quick Luxon helpers for the current timestamp.\n\nWHAT IS PAIRED-ITEM LINKING?\nWhen an upstream node outputs 5 items and passes them to a Filter node that drops 2 items, the output array now has 3 items. Behind the scenes, n8n maintains a `pairedItem` index linking output item 0 back to its original input item (e.g. index 2). When you write `$("Trigger").item.json.email`, n8n uses this internal link to retrieve the exact matching ancestor item, NOT just whatever happens to be at index 0!',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'How n8n Tracks Item Linking (pairedItem) Across Filtering Nodes',
            mermaidCode: `graph LR
  subgraph Step1["Step 1: Webhook Trigger (5 Incoming Items)"]
    T0["Item 0: Alice ($100)"]
    T1["Item 1: Bob ($20)"]
    T2["Item 2: Charlie ($250)"]
    T3["Item 3: Dave ($15)"]
    T4["Item 4: Eve ($500)"]
  end

  subgraph Step2["Step 2: Filter Node (> $50)"]
    F0["Item 0 (Alice)<br/>pairedItem: 0"]
    F1["Item 1 (Charlie)<br/>pairedItem: 2"]
    F2["Item 2 (Eve)<br/>pairedItem: 4"]
  end

  subgraph Step3["Step 3: Slack Notification"]
    N0["$('Webhook').item retrieves Alice"]
    N1["$('Webhook').item retrieves Charlie"]
    N2["$('Webhook').item retrieves Eve"]
  end

  T0 --> F0 --> N0
  T2 --> F1 --> N1
  T4 --> F2 --> N2

  style Step1 fill:#1E293B,stroke:#94A3B8,stroke-width:1px,color:#F8FAFC
  style Step2 fill:#0F172A,stroke:#F59E0B,stroke-width:2px,color:#F8FAFC
  style Step3 fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC`
          },
          technicalDetails: 'Essential Luxon Date Formatting in n8n Expressions:\n- Current Date ISO: `{{ $now.toISO() }}`\n- Custom Format: `{{ $now.toFormat("yyyy-MM-dd HH:mm:ss") }}`\n- Add 7 Days: `{{ $now.plus({ days: 7 }).toFormat("yyyy-MM-dd") }}`\n- Parse an incoming timestamp: `{{ DateTime.fromISO($json.createdAt).setZone("America/New_York").toFormat("ff") }}`\n- Difference in days: `{{ DateTime.fromISO($json.dueDate).diff($now, "days").days }}`',
          workedExample: {
            scenario: 'Generating a personalized contract notification combining data from Step 1 (Client Info) and Step 3 (Calculated Proposal).',
            inputJson: [
              {
                "json": {
                  "proposalId": "PROP-9021",
                  "calculatedTotal": 12500,
                  "paymentTermsDays": 30
                }
              }
            ],
            transformationLogic: 'Reference the client company name from the initial trigger node and calculate the exact invoice due date.',
            outputJson: [
              {
                "json": {
                  "slackMessage": "Proposal PROP-9021 for Acme Global generated for $12,500. Payment due on 2026-11-24.",
                  "metadata": {
                    "dueDate": "2026-11-24",
                    "clientName": "Acme Global"
                  }
                }
              }
            ],
            explanation: 'The expression for `slackMessage` is:\n`Proposal {{ $json.proposalId }} for {{ $("Webhook Trigger").item.json.company }} generated for \${{ $json.calculatedTotal.toLocaleString() }}. Payment due on {{ $now.plus({ days: $json.paymentTermsDays }).toFormat("yyyy-MM-dd") }}.`'
          },
          stepByStepLab: {
            title: 'Cross-Node Data Mapping with Paired Items',
            goal: 'Build a 3-node workflow that passes data through a filter and reliably pulls data from the original trigger.',
            steps: [
              {
                stepNumber: 1,
                title: 'Create Multi-Item Trigger Mock',
                instruction: 'Add a Code node with 3 items: Alice (score: 95), Bob (score: 40), Charlie (score: 85).'
              },
              {
                stepNumber: 2,
                title: 'Add a Filter Node',
                instruction: 'Filter where `{{ $json.score }}` is Greater than or equal to `70`.'
              },
              {
                stepNumber: 3,
                title: 'Add an Edit Fields Node',
                instruction: 'Create field `congratulations`: `Dear {{ $json.name }}, your score of {{ $json.score }} passed!` Also add `originalInputTimestamp`: `{{ $("Mock Trigger").item.json.timestamp }}`.'
              },
              {
                stepNumber: 4,
                title: 'Verify Item Linking',
                instruction: 'Run the step and verify that only Alice and Charlie exist in the output, and each record correctly matches its original metadata.'
              }
            ],
            expectedResult: '2 output items with accurate, matched student data.'
          },
          commonMistakes: [
            {
              mistake: 'Using `$("Trigger").all()[0].json.email` inside a loop processing multiple items.',
              consequence: 'Every single item receives the email of item 0, overwriting all customer data with the first customer\'s email.',
              correction: 'Use `$("Trigger").item.json.email` so n8n automatically tracks the paired item index for each iteration.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q5-1',
              question: 'What is the purpose of `$("NodeName").item.json.propertyName` in n8n expressions?',
              options: [
                'It always grabs the very last item in the database.',
                'It retrieves the specific property from the upstream node that corresponds to the current item being processed via paired-item linking.',
                'It executes the upstream node again.',
                'It converts the property to upper-case.'
              ],
              correctIndex: 1,
              explanation: 'The `.item` syntax relies on n8n\'s internal paired-item engine to retrieve the exact parent item from an upstream node that gave birth to the current item.'
            }
          ],
          practicalChallenge: {
            prompt: 'Write an expression that formats an incoming date `$json.trialStarted` by adding 14 days and outputting it as "DD/MM/YYYY" in the "Europe/London" timezone.',
            hints: ['Use `DateTime.fromISO($json.trialStarted).setZone("Europe/London").plus({ days: 14 }).toFormat("dd/MM/yyyy")`.'],
            solutionNotes: 'This uses Luxon’s immutable date-time manipulation directly within the n8n expression parser.'
          },
          keyTakeaways: [
            'Use `$json` for the current item and `$("Node Name").item.json` for parent node items.',
            'Paired-item linking prevents data cross-contamination when workflows filter or split items.',
            'Luxon (`DateTime`, `$now`) provides native, timezone-aware date arithmetic in all expressions.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n Expressions Documentation',
              url: 'https://docs.n8n.io/data/expressions/',
              note: 'Comprehensive expression syntax guide, methods, and built-in variables.'
            }
          ]
        }
      ]
    },
    {
      id: 'module-6',
      number: 6,
      stageId: 'stage-1',
      title: 'Essential Nodes and Flow Logic',
      subtitle: 'Routing, Merging, Looping, and Batching Data',
      description: 'Master the core flow logic nodes: Edit Fields (Set), Filter, If, Switch, Merge, Split in Batches, Loop on Items, and Wait. Learn which node to choose for any business requirement.',
      difficulty: 'Intermediate',
      estimatedMinutes: 65,
      lessons: [
        {
          id: 'lesson-6-1',
          moduleId: 'module-6',
          stageId: 'stage-1',
          title: 'Flow Control & Routing Mastery',
          subtitle: 'Choosing between If, Switch, Merge, and Batching Loops',
          difficulty: 'Intermediate',
          estimatedMinutes: 65,
          prerequisites: ['Module 4', 'Module 5'],
          whyItMatters: 'Real-world business logic is rarely linear. You must categorize leads, merge order items with customer profiles, batch 10,000 records to respect API rate limits, and pause executions until an external webhook or human approval arrives. Mastering core logic nodes gives you total architectural control over data flow.',
          relatableProblem: 'You need to upload 5,000 new inventory items to Shopify. If you pass all 5,000 items directly to the Shopify node, Shopify immediately rejects the request with HTTP 429 Too Many Requests (rate limit exceeded) and your workflow crashes halfway through. By inserting a "Split In Batches" node configured for 50 items with a 1-second "Wait" node, the workflow runs smoothly without ever hitting rate limits.',
          firstPrinciplesExplanation: 'Core Flow Logic Nodes & Their Purposes:\n\n1. Edit Fields (Set): The fundamental data transformation node. Creates, renames, modifies, or drops properties. Toggle "Keep Only Set Fields" to strip unwanted payload clutter.\n2. Filter: Discards items that do not meet specific criteria (e.g. drop inactive users). Only items that evaluate to true proceed.\n3. If: Binary branching (True pin vs False pin).\n4. Switch: Multi-way branching (e.g. Route A, Route B, Route C, or Fallback) based on values or complex rules.\n5. Merge: Combines data from two different incoming streams. Can combine by matching a shared key (SQL JOIN style), append items together, or wait for both branches to complete.\n6. Split In Batches / Loop: Chunks a large array of items into bite-sized batches (e.g. 25 at a time) to prevent memory overload and comply with third-party API rate limits.\n7. Wait: Pauses execution for a set duration (e.g. 5 minutes) or until an external webhook callback resumes it (human-in-the-loop approvals).',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Looping with Split In Batches and Rate-Limit Throttling',
            mermaidCode: `graph LR
  IN[1,000 Items In] --> SIB[Split In Batches<br/>Batch Size: 50]
  SIB -->|Batch of 50| API[HTTP Request: Shopify API]
  API --> W[Wait: 1000ms Throttle]
  W -->|Loop Back| SIB
  SIB -->|Done (All Batches Finished)| DONE[Final Summary Notification]

  style SIB fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC
  style API fill:#1E293B,stroke:#10B981,stroke-width:2px,color:#F8FAFC
  style W fill:#1E293B,stroke:#F59E0B,stroke-width:2px,color:#F8FAFC
  style DONE fill:#0F172A,stroke:#8B5CF6,stroke-width:2px,color:#F8FAFC`
          },
          technicalDetails: 'The Merge Node Modes:\n- Combine / Join: Matches items from Input 1 and Input 2 using a common identifier field (e.g. `customerId`), appending fields together like an inner or outer join.\n- Append: Simply concatenates Input 2 items onto the end of Input 1.\n- Choose Branch: Passes through whichever branch finished first.\n- Wait for Both: Pauses until both branches have finished executing before continuing.',
          workedExample: {
            scenario: 'Joining order records with customer billing addresses using the Merge node.',
            inputJson: {
              "branch1_orders": [{ "orderId": 801, "userId": "usr_99", "total": 120 }],
              "branch2_users": [{ "userId": "usr_99", "email": "dave@example.com", "tier": "Gold" }]
            },
            transformationLogic: 'Merge node configured with Mode: "Combine", Join Type: "Enrich", matching on property `userId`.',
            outputJson: [
              {
                "json": {
                  "orderId": 801,
                  "userId": "usr_99",
                  "total": 120,
                  "email": "dave@example.com",
                  "tier": "Gold"
                }
              }
            ],
            explanation: 'The Merge node matches `usr_99` across both incoming branches and outputs a unified object containing the order details and the customer profile.'
          },
          stepByStepLab: {
            title: 'Building a Throttled Batch Sync Pipeline',
            goal: 'Simulate batch processing 100 records in groups of 10 with a wait throttle.',
            steps: [
              {
                stepNumber: 1,
                title: 'Generate 100 Mock Records',
                instruction: 'Add a Code node generating 100 items: `return Array.from({length: 100}, (_, i) => ({ json: { id: i + 1, name: "User " + (i + 1) } }));`'
              },
              {
                stepNumber: 2,
                title: 'Add Split In Batches',
                instruction: 'Connect "Split In Batches" with Batch Size set to `10`.'
              },
              {
                stepNumber: 3,
                title: 'Add Action and Wait',
                instruction: 'Connect an Edit Fields node to the batch output, then connect a Wait node set to `500 milliseconds`.'
              },
              {
                stepNumber: 4,
                title: 'Wire the Loop Back',
                instruction: 'Drag a connection line from the output of the Wait node back to the input of the Split In Batches node. Connect a Slack/Notification node to the "done" output of Split In Batches.'
              }
            ],
            expectedResult: 'The workflow loops 10 times cleanly, processing 10 items per cycle, and then triggers the done branch.'
          },
          commonMistakes: [
            {
              mistake: 'Forgetting to connect the loop back to the Split In Batches node.',
              consequence: 'The workflow only processes the very first batch of 10 items and terminates prematurely, leaving 90 items unhandled.',
              correction: 'Always ensure the terminal node in your processing loop connects back to the top-level loop node.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q6-1',
              question: 'When should you choose a Switch node instead of an If node?',
              options: [
                'When you have 3 or more distinct conditional branches or routing cases based on a property value.',
                'Only when working with Python code.',
                'When you want to merge two databases.',
                'Switch nodes are deprecated.'
              ],
              correctIndex: 0,
              explanation: 'While an If node is strictly binary (True or False), the Switch node cleanly supports multiple routing paths (e.g. categorizing orders into New, Processing, Shipped, or Cancelled) without cumbersome nesting.'
            }
          ],
          practicalChallenge: {
            prompt: 'Design a workflow that receives 50 customer leads, filters for leads with a valid phone number, merges each lead with their assigned sales rep based on territory, and batches the output in groups of 5.',
            hints: ['Use Filter -> Merge (Join on territory) -> Split In Batches.'],
            solutionNotes: 'This architecture cleanly separates sanitization, relational enrichment, and rate-limited dispatch.'
          },
          keyTakeaways: [
            'Use Edit Fields to shape records and strip unwanted payload properties.',
            'Use Split In Batches and Wait to avoid hitting third-party API rate limits.',
            'The Merge node enables SQL-like joins between diverging asynchronous branches.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n Flow Logic Nodes',
              url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches/',
              note: 'Official documentation for Split In Batches, Merge, and Switch.'
            }
          ]
        }
      ]
    }
  ]
};
