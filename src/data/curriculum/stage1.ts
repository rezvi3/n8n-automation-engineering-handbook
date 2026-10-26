import { Stage } from '../../types/curriculum';

export const stage1: Stage = {
  id: 'stage-1',
  number: 1,
  title: 'Core n8n Foundations',
  subtitle: 'The Canvas, Data Flow, JSON & Expression Mastery',
  description: 'Master the visual canvas, understand input/output pins, learn how JSON organizes digital information without confusion, and connect data between nodes using simple drag-and-drop expressions.',
  badge: 'Stage 1 • Core Foundations',
  accentColor: '#10B981',
  modules: [
    {
      id: 'module-2',
      number: 2,
      stageId: 'stage-1',
      title: 'Mastering the n8n Interface',
      subtitle: 'The Canvas, Node Anatomy, and Status Indicators',
      description: 'Learn how to navigate the visual canvas, understand connection pins, read the three-pane node window, and understand status checkmarks.',
      difficulty: 'Beginner',
      estimatedMinutes: 35,
      lessons: [
        {
          id: 'lesson-2-1',
          moduleId: 'module-2',
          stageId: 'stage-1',
          title: 'The Visual Canvas & Node Anatomy',
          subtitle: 'Understanding pins, execution panels, and state indicators',
          difficulty: 'Beginner',
          estimatedMinutes: 35,
          prerequisites: ['Module 0'],
          whyDoINeedThis: 'The n8n editor is like a visual workbench. Once you know what each circle, button, and color means, you will never feel lost or confused about where your information is going.',
          relatableProblem: 'A beginner connects two nodes on the screen, clicks "Test step", but the screen stays empty. They wonder: "Did I break it? Is it broken?" Usually, the explanation is simple: they wired into an error pin, or the node was waiting for data that hasn\'t been sent yet. Learning the canvas anatomy prevents this confusion.',
          firstPrinciplesExplanation: 'In n8n, workflows always flow from left to right along connection lines between nodes.\n\nEvery node on the canvas has 4 essential parts:\n1. Input Pin (The circle on the left): Where data enters the node from the previous step. Think of it like a letter slot on a door.\n2. Output Pin (The circle on the right): Where processed results exit to the next step.\n3. The 3-Pane Node Window: Double-clicking any node opens a window with 3 clear areas:\n   - Left Pane (INPUT): Shows the data arriving from the previous node.\n   - Center Pane (PARAMETERS): Where you choose settings, type messages, or select options.\n   - Right Pane (OUTPUT): Shows the exact result produced by this node after you test it.\n4. Node Status Indicators:\n   - Green Checkmark [✓]: The step executed successfully!\n   - Red Exclamation [!]: Something needs attention (e.g. a missing setting or invalid password).\n   - Grey / Blank: The step has not run yet.',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Anatomy of an n8n Node: Input Pin, Parameters, and Output Pin',
            mermaidCode: `graph LR
    IN((● Input Pin<br/>Data Enters)) --> PARAMS["⚙️ Node Parameters<br/>(Your settings & options)"]
    PARAMS --> OUT((● Output Pin<br/>Result Exits))

    style IN fill:#3B82F6,stroke:#1D4ED8,stroke-width:2px,color:#FFFFFF
    style PARAMS fill:#0F172A,stroke:#64748B,stroke-width:2px,color:#FFFFFF
    style OUT fill:#10B981,stroke:#047857,stroke-width:2px,color:#FFFFFF`
          },
          secondaryVisual: {
            diagramType: 'flow',
            caption: 'The 3 Panes Inside Every n8n Node Window',
            mermaidCode: `graph LR
    P1["1. INPUT PANE (Left)<br/>What data came into this step?"] --> P2["2. SETTINGS PANE (Center)<br/>What should this step do with it?"]
    P2 --> P3["3. OUTPUT PANE (Right)<br/>What did this step produce?"]`
          },
          technicalDetails: 'Testing vs. Active Modes:\n- Test step: Runs only the node you are currently editing, using cached data from the step before it.\n- Test workflow: Runs your entire workflow from the very first trigger node all the way to the end.\n- Active (Production) Mode: The toggle switch in the top right. When ON, n8n listens in the background 24/7 without needing you to press any buttons.',
          workedExample: {
            scenario: 'Opening an Edit Fields node to inspect input vs output data.',
            inputJson: {
              "customer_name": "Marcus Vance",
              "item_ordered": "Standing Desk"
            },
            transformationLogic: 'Read the customer name from the left pane and output a friendly status message.',
            outputJson: {
              "customer_name": "Marcus Vance",
              "item_ordered": "Standing Desk",
              "status": "Order verified and ready for fulfillment"
            },
            explanation: 'The left pane showed the raw customer order. In the center, we added a status label. The right pane immediately showed the updated customer record.'
          },
          stepByStepLab: {
            title: 'Exploring the 3 Panes of a Node Window',
            goal: 'Open a node window, identify the Input, Settings, and Output panes, and test a step.',
            steps: [
              {
                stepNumber: 1,
                title: 'Open Your Existing Workflow',
                instruction: 'Open your n8n workspace and click on the workflow you created in Module 0 (or create a new one with a Manual Trigger and an Edit Fields node).'
              },
              {
                stepNumber: 2,
                title: 'Double-Click the Action Node',
                instruction: 'Double-click the "Edit Fields" node. Notice how the large 3-pane modal opens over the canvas.'
              },
              {
                stepNumber: 3,
                title: 'Locate the Input Pane (Left)',
                instruction: 'Look at the left column. If your trigger has run, you will see the incoming items here. If empty, click "Test step" on the trigger node first.'
              },
              {
                stepNumber: 4,
                title: 'Test and Inspect the Output Pane (Right)',
                instruction: 'Click the orange "Test step" button in the center pane. Observe how the right pane instantly updates with your processed output data.'
              }
            ],
            expectedResult: 'You can comfortably navigate between the canvas and the 3-pane node modal.'
          },
          whatShouldISee: {
            summary: 'You can clearly identify where incoming data sits, where settings are configured, and where results appear.',
            indicators: [
              'Left column shows: "INPUT" with your incoming data.',
              'Center column shows: "PARAMETERS" with fields you can edit.',
              'Right column shows: "OUTPUT" with a green checkmark.'
            ]
          },
          commonMistakes: [
            {
              mistake: 'Double-clicking the canvas background instead of the node icon.',
              consequence: 'Nothing opens or the screen zooms in and out.',
              correction: 'Always double-click directly on the node box or its icon to open its settings.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q2-1',
              question: 'In the n8n node modal, where do you see the data produced by the current step after testing?',
              options: [
                'In the left pane (Input).',
                'In the right pane (Output).',
                'In your computer\'s trash can.',
                'Inside your browser history.'
              ],
              correctIndex: 1,
              explanation: 'The right pane always displays the Output produced by the node.'
            }
          ],
          practicalChallenge: {
            prompt: 'Practice dragging a node on the canvas. Click and hold a node with your mouse, move it around, and observe how the connection line stretches smoothly without breaking.',
            hints: ['You can also use your mouse scroll wheel or two fingers on a trackpad to zoom in and out of the canvas.'],
            solutionNotes: 'The canvas is an infinite whiteboard. You can arrange nodes in clean horizontal lines for maximum readability.'
          },
          keyTakeaways: [
            'Workflows flow from left to right: data enters the left pin and exits the right pin.',
            'Double-clicking any node opens its 3 panes: Input (left), Settings (center), and Output (right).',
            'A green checkmark means the step ran successfully.'
          ],
          officialDocLinks: [
            {
              title: 'Official Canvas Navigation Guide',
              url: 'https://docs.n8n.io/workflows/canvas/',
              note: 'Tips for organizing, aligning, and navigating large workflow canvases.'
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
      subtitle: 'The Alarm Clocks vs. The Helping Hands',
      description: 'Understand the difference between Triggers (the starting event) and Actions (the work being done), and learn when to use test runs vs. live active workflows.',
      difficulty: 'Beginner',
      estimatedMinutes: 40,
      lessons: [
        {
          id: 'lesson-3-1',
          moduleId: 'module-3',
          stageId: 'stage-1',
          title: 'Triggers vs. Actions: How Workflows Wake Up',
          subtitle: 'The difference between starting events and the steps that follow',
          difficulty: 'Beginner',
          estimatedMinutes: 40,
          prerequisites: ['Module 2'],
          whyDoINeedThis: 'Every automation must start somewhere. Knowing the difference between manual triggers, scheduled alarms, and instant webhooks ensures your automations wake up at the exact right moment.',
          relatableProblem: 'A beginner builds a wonderful workflow to send a daily sales summary email. But they use a Manual Trigger instead of a Schedule Trigger. The next morning, no email is sent because nobody was there to manually click the "Test" button. Understanding trigger types prevents this mistake.',
          firstPrinciplesExplanation: 'There are only two major categories of nodes in n8n:\n\n1. TRIGGER NODES (The Alarm Clocks):\n- These always sit on the far left of your workflow.\n- Their only job is to detect when something happens and wake up the workflow.\n- Common examples:\n  • Manual Trigger: Wakes up when YOU click "Test workflow" (for building and testing).\n  • Schedule Trigger: Wakes up at a specific time (e.g. Every Monday at 9:00 AM, or every 15 minutes).\n  • Webhook Trigger: Wakes up the exact millisecond an external app pushes data (e.g. Stripe payment received, form submitted).\n\n2. ACTION NODES (The Helping Hands):\n- These sit after your trigger node.\n- Their job is to do the actual work with the data.\n- Common examples:\n  • Edit Fields (Set): Creates or cleans up data.\n  • Google Sheets: Appends a new row to your spreadsheet.\n  • Slack / Gmail: Sends a notification or email.\n  • If Node: Makes a decision (e.g. Is order total > $100?).\n\nThink of it this way: The Trigger is the doorbell ringing; the Actions are you walking to the door, opening it, and greeting your guest.',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Triggers (When) vs. Actions (Do)',
            mermaidCode: `graph LR
    subgraph TriggerZone["1. THE TRIGGER (The Alarm Clock)"]
      T1["🔔 When clicking 'Test workflow'<br/>OR ⏰ Every morning at 9am<br/>OR 🚀 When form is submitted"]
    end

    subgraph ActionZone["2. THE ACTIONS (The Helping Hands)"]
      A1["📝 Prepare Data"] --> A2["📊 Save in Spreadsheet"]
      A2 --> A3["💬 Send Notification"]
    end

    T1 -->|Wakes Up Workflow| A1

    style TriggerZone fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#FFFFFF
    style ActionZone fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#FFFFFF`
          },
          technicalDetails: 'Workflow Execution Lifecycle:\n1. Trigger awakens: Produces initial item(s).\n2. Downstream nodes execute one by one in topological order.\n3. If any node encounters an unhandled error, execution stops and the node turns red.\n4. You can inspect the entire history under the "Executions" tab in the left sidebar.',
          workedExample: {
            scenario: 'Comparing a Manual Trigger with a Schedule Trigger.',
            inputJson: {
              "trigger_type": "Schedule",
              "interval": "Every day at 8:00 AM"
            },
            transformationLogic: 'Automatically run every morning to fetch weather data and send a brief.',
            outputJson: {
              "scheduled_time": "08:00:00",
              "brief_sent": true
            },
            explanation: 'Unlike a manual trigger that requires human clicks, a Schedule Trigger runs automatically on your server while you sleep.'
          },
          stepByStepLab: {
            title: 'Replacing a Manual Trigger with a Schedule Trigger',
            goal: 'See how easily you can swap the starting trigger of a workflow.',
            steps: [
              {
                stepNumber: 1,
                title: 'Add a Schedule Trigger',
                instruction: 'On your canvas, click "+ Add first step". Search for "Schedule" and choose "Schedule Trigger".'
              },
              {
                stepNumber: 2,
                title: 'Set the Interval',
                instruction: 'In the trigger settings, set "Trigger Interval" to "Hours" and set "Hours between triggers" to 1 (or choose "Days" at 09:00 AM).'
              },
              {
                stepNumber: 3,
                title: 'Connect it to an Action Node',
                instruction: 'Connect the output pin of your Schedule Trigger to an Edit Fields node that sets `status = "Daily check completed"`.'
              },
              {
                stepNumber: 4,
                title: 'Test the Step',
                instruction: 'Click "Test step" to simulate the trigger firing right now without waiting for the clock.'
              }
            ],
            expectedResult: 'A workflow that knows how to run automatically on a timer.'
          },
          whatShouldISee: {
            summary: 'Your schedule node executes and passes the current date and time to downstream nodes.',
            indicators: [
              'Schedule trigger shows a clock icon on the canvas.',
              'Testing produces a timestamp: `timestamp: "2026-10-26T..."`'
            ]
          },
          commonMistakes: [
            {
              mistake: 'Forgetting to switch the workflow to "Active" when using a Schedule or Webhook trigger.',
              consequence: 'The schedule only runs when you press Test in your browser, not automatically in the background.',
              correction: 'When your workflow is finished and tested, flip the "Active" toggle switch in the top right corner to ON.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q3-1',
              question: 'Where do Trigger nodes sit in an n8n workflow?',
              options: [
                'In the very middle of the workflow.',
                'At the very end on the right.',
                'On the far left as the very first node.',
                'Inside your computer settings.'
              ],
              correctIndex: 2,
              explanation: 'Because workflows flow from left to right, the trigger is always the first node on the far left.'
            }
          ],
          practicalChallenge: {
            prompt: 'Look at the trigger options in n8n. Open the Add Node menu, click "Trigger", and see how many different services (Slack, Stripe, Typeform, Webhook, Schedule) can wake up an n8n workflow.',
            hints: ['Type "trigger" in the search box to view all available starters.'],
            solutionNotes: 'n8n includes hundreds of pre-built triggers for popular web applications.'
          },
          keyTakeaways: [
            'Trigger nodes wake up the workflow; Action nodes do the work.',
            'Manual Triggers are for testing; Schedule and Webhook triggers are for 24/7 production.',
            'Remember to toggle the Active switch to ON when your workflow is ready for live use.'
          ],
          officialDocLinks: [
            {
              title: 'Official Triggers Guide',
              url: 'https://docs.n8n.io/workflows/components/',
              note: 'Overview of triggers, actions, and sub-nodes.'
            }
          ]
        }
      ]
    },
    {
      id: 'module-4',
      number: 4,
      stageId: 'stage-1',
      title: 'Understanding JSON Without Confusion',
      subtitle: 'The Universal Language of Digital Information',
      description: 'Learn what JSON really is through simple everyday analogies (like address cards and receipts), understand curly braces and quotes, and master how n8n organizes records.',
      difficulty: 'Beginner',
      estimatedMinutes: 45,
      lessons: [
        {
          id: 'lesson-4-1',
          moduleId: 'module-4',
          stageId: 'stage-1',
          title: 'JSON Explained for Complete Beginners',
          subtitle: 'The address card analogy: how computers write down information',
          difficulty: 'Beginner',
          estimatedMinutes: 45,
          prerequisites: ['Module 2'],
          whyDoINeedThis: 'When computers share information (like a customer submitting a form), they need a tidy, organized format so nothing gets mixed up. That format is called JSON. Once you understand its 4 basic punctuation marks, you will be able to read any data on the internet with ease.',
          relatableProblem: 'Beginners open an API response, see lots of curly braces `{ }`, quotes `" "`, colons `:`, and commas `,`, and think: "This looks like matrix code, I cannot understand this!" In reality, JSON is as simple as filling out a paper index card.',
          firstPrinciplesExplanation: 'Think of an index card in an old-fashioned paper rolodex:\n\nName: Alex Smith\nAge: 28\nEmail: alex@example.com\nIs Member: Yes\n\nHow does a computer write that exact same card?\n```json\n{\n  "name": "Alex Smith",\n  "age": 28,\n  "email": "alex@example.com",\n  "isMember": true\n}\n```\n\nLet\'s break down every single character so it makes total sense:\n1. The Curly Braces `{ }`: Think of them as the front and back of the paper card. Everything inside the `{ }` belongs to this one record.\n2. The Quotes `" "`: Tell the computer: "This is a word or a label, not a math equation".\n3. The Colon `:`: Simply means "is". So `"name": "Alex"` means: "The name is Alex".\n4. The Comma `,`: Separates each line, just like writing a grocery list.\n\nWhat about Lists (Arrays)?\nWhen you have multiple things (like a shopping list of fruits), computers wrap them in square brackets `[ ]`:\n```json\n[\n  "Apples",\n  "Bananas",\n  "Oranges"\n]\n```\n\nThat is 95% of what you need to know about JSON! A curly brace `{ }` holds an item with labels; a square bracket `[ ]` holds a list of items.',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Everyday Address Card vs. Its Clean JSON Representation',
            mermaidCode: `graph LR
    subgraph Human["How a Human Sees It (Paper Card)"]
      H1["Name: Alex Smith<br/>City: London<br/>Orders: 3"]
    end

    subgraph Computer["How a Computer Reads It (JSON)"]
      C1["{<br/>&nbsp;&nbsp;'name': 'Alex Smith',<br/>&nbsp;&nbsp;'city': 'London',<br/>&nbsp;&nbsp;'orders': 3<br/>}"]
    end

    H1 -->|Identical Information| C1

    style Human fill:#1E293B,stroke:#94A3B8,stroke-width:1px,color:#F8FAFC
    style Computer fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC`
          },
          secondaryVisual: {
            diagramType: 'flow',
            caption: 'The 4 Punctuation Marks of JSON',
            mermaidCode: `graph TD
    B1["{ } Curly Braces: The Envelope/Card"] --> B2["' ' Quotes: Plain text/words"]
    B2 --> B3[": Colon: Means 'is'"]
    B3 --> B4[", Comma: Separates items on the list"]`
          },
          technicalDetails: 'The n8n Item Rule:\nIn n8n, information always travels as a list of items wrapped with a `json` label:\n```json\n[\n  {\n    "json": {\n      "name": "Alex",\n      "city": "London"\n    }\n  }\n]\n```\nBecause n8n sees a list of items, if you pass 5 customer records to a node, n8n will automatically run the node 5 times (once for each customer).',
          workedExample: {
            scenario: 'Reading a simple customer order in JSON format.',
            inputJson: {
              "order_id": 1042,
              "customer": "Sarah Jenkins",
              "items": ["Coffee Beans", "Oat Milk"],
              "total_price": 24.50,
              "paid": true
            },
            transformationLogic: 'Identify the customer name, order total, and payment status.',
            outputJson: {
              "customer": "Sarah Jenkins",
              "total_price": 24.50,
              "paid": true
            },
            explanation: 'Notice how easy this is to read once you know the 4 symbols! The customer is Sarah, total is 24.50, and paid is true.'
          },
          stepByStepLab: {
            title: 'Inspecting JSON Views Inside n8n',
            goal: 'Toggle between Table view and JSON view inside the n8n Output panel.',
            steps: [
              {
                stepNumber: 1,
                title: 'Open Your Test Workflow',
                instruction: 'Open your workflow from Lesson 0-3 and click "Test workflow".'
              },
              {
                stepNumber: 2,
                title: 'Inspect the Table View',
                instruction: 'In the Output panel on the right, look at the default view. You will see your data presented like a clean spreadsheet table with columns and rows.'
              },
              {
                stepNumber: 3,
                title: 'Switch to JSON View',
                instruction: 'At the top of the Output panel, click the button labeled "{ } JSON". Notice how the exact same information appears with curly braces `{ }` and quotes.'
              },
              {
                stepNumber: 4,
                title: 'Compare the Two Views',
                instruction: 'Switch back and forth between "Table" and "JSON". Realize that they are the exact same data shown in two different visual styles!'
              }
            ],
            expectedResult: 'You can freely switch between Table and JSON view without feeling intimidated by curly braces.'
          },
          whatShouldISee: {
            summary: 'Your output panel clearly displays the structured JSON record.',
            indicators: [
              'The JSON begins with `{` and ends with `}`.',
              'Field names are highlighted in colors with clean values.'
            ]
          },
          commonMistakes: [
            {
              mistake: 'Forgetting a comma between fields.',
              consequence: 'The computer shows a "Syntax Error" because it doesn\'t know where one field ends and the next begins.',
              correction: 'Always ensure there is a comma `,` after every line except the last one.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q4-1',
              question: 'In JSON, what do curly braces `{ }` represent?',
              options: [
                'A mathematical division problem.',
                'A single record or object holding labeled information.',
                'A link to a website.',
                'An error message.'
              ],
              correctIndex: 1,
              explanation: 'Curly braces hold an object (like a single address card or receipt).'
            }
          ],
          practicalChallenge: {
            prompt: 'Write out a small 3-line JSON snippet representing your favorite food: include its name, price, and whether you like it spicy (true or false).',
            hints: ['Remember quotes for text, numbers with no quotes, and true/false for boolean.'],
            solutionNotes: '{\n  "food": "Tacos",\n  "price": 8.50,\n  "isSpicy": true\n}'
          },
          keyTakeaways: [
            'JSON is just an organized digital index card.',
            'Curly braces `{ }` hold objects; square brackets `[ ]` hold lists.',
            'Colons `:` mean "is", and commas `,` separate fields.',
            'In n8n, you can view your data as a friendly table or as raw JSON whenever you choose.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n Data Structure Guide',
              url: 'https://docs.n8n.io/data/data-structure/',
              note: 'How n8n handles JSON records and item lists.'
            }
          ]
        }
      ]
    },
    {
      id: 'module-5',
      number: 5,
      stageId: 'stage-1',
      title: 'Data Mapping and Expressions Without Code',
      subtitle: 'Passing Information Between Steps Using Drag-and-Drop',
      description: 'Learn how to take a customer\'s name from Step 1 and use it in Step 2 without programming. Master visual drag-and-drop mapping and understand simple expressions.',
      difficulty: 'Beginner',
      estimatedMinutes: 45,
      lessons: [
        {
          id: 'lesson-5-1',
          moduleId: 'module-5',
          stageId: 'stage-1',
          title: 'How to Connect Information Between Nodes',
          subtitle: 'The drag-and-drop superpower: {{ $json.name }} explained gently',
          difficulty: 'Beginner',
          estimatedMinutes: 45,
          prerequisites: ['Module 4'],
          whyDoINeedThis: 'The real magic of automation happens when Step 2 can reuse information from Step 1—like taking a customer\'s name from a form and inserting it into an email that says: "Hi [Name], thank you for reaching out!". Expressions make this happen automatically.',
          relatableProblem: 'Imagine you want to send a personalized confirmation email. If you type "Hi customer", it feels robotic. But how do you tell n8n: "Grab whatever name arrived in the form and insert it here"? That is exactly what an expression does.',
          firstPrinciplesExplanation: 'Think of "Mail Merge" in Microsoft Word or Google Docs:\nYou type: "Hello {{First Name}}, your appointment is ready."\nWhen the letter is printed, the computer replaces `{{First Name}}` with "Alex" or "Sarah".\n\nn8n uses the exact same idea!\nWhenever you see double curly braces `{{ ... }}`, it tells n8n:\n"Do NOT type the literal letters inside here—look inside the incoming data and grab the real value!"\n\nHow do you write an expression?\nThe best part is: YOU DO NOT EVEN HAVE TO TYPE IT!\nIn n8n, you can simply DRAG AND DROP:\n1. Open the node settings.\n2. Look at the left INPUT pane.\n3. Click and hold the field you want (e.g. `customer_name`).\n4. Drag your mouse across the screen and drop it into the setting field on the right!\n5. n8n automatically fills in `{{ $json.customer_name }}` for you!\n\nWhat does `$json` mean?\n`$json` is simply shorthand for: "The data entering this node right now". So `$json.customer_name` means: "Grab the customer_name from the current data".',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Visual Drag-and-Drop: Moving Data from Left Input to Right Settings',
            mermaidCode: `graph LR
    subgraph LeftPane["1. INPUT PANE (Left)"]
      D1["customer_name: 'Alex Smith'"]
      D2["order_total: 150"]
    end

    subgraph CenterPane["2. PARAMETERS PANE (Center)"]
      M1["Email Body:<br/>'Hello {{ $json.customer_name }}, thanks for your order!'"]
    end

    subgraph RightPane["3. OUTPUT PANE (Right)"]
      R1["'Hello Alex Smith, thanks for your order!'"]
    end

    D1 -->|🖱️ Drag & Drop with Mouse| M1
    M1 -->|Evaluates at Runtime| R1

    style LeftPane fill:#1E293B,stroke:#3B82F6,stroke-width:1px,color:#F8FAFC
    style CenterPane fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC
    style RightPane fill:#065F46,stroke:#10B981,stroke-width:2px,color:#FFFFFF`
          },
          technicalDetails: 'Referencing Data from Earlier Nodes:\nIf you want to grab data from a node that is 2 or 3 steps behind, you write:\n`{{ $("Node Name").item.json.field }}`\nn8n also supports simple math directly inside expressions: `{{ $json.price * 1.20 }}` (adds 20% tax).',
          workedExample: {
            scenario: 'Generating a personalized email subject line from incoming form data.',
            inputJson: {
              "prospect_name": "Elena Rostova",
              "service_requested": "Website Audit"
            },
            transformationLogic: 'Create a subject line: "Quote for [service] - [name]". Expression: `Quote for {{ $json.service_requested }} - {{ $json.prospect_name }}`.',
            outputJson: {
              "email_subject": "Quote for Website Audit - Elena Rostova"
            },
            explanation: 'The expression dynamically substituted Elena\'s name and her requested service into a clean, professional email subject.'
          },
          stepByStepLab: {
            title: 'Creating Your First Dynamic Expression',
            goal: 'Use drag-and-drop to insert a dynamic name into a sentence.',
            steps: [
              {
                stepNumber: 1,
                title: 'Set Up Sample Input Data',
                instruction: 'In your first Edit Fields node, make sure you have a field named `first_name` set to "Maya". Click "Test step".'
              },
              {
                stepNumber: 2,
                title: 'Add a Second Edit Fields Node',
                instruction: 'Connect a second Edit Fields node after the first one. Open its settings.'
              },
              {
                stepNumber: 3,
                title: 'Drag the Name from Left to Right',
                instruction: 'Look at the INPUT pane on the left. Find `first_name`. Click and drag it directly into the "Value" box on the right. Notice how n8n automatically writes `{{ $json.first_name }}`.'
              },
              {
                stepNumber: 4,
                title: 'Add Friendly Text Around It',
                instruction: 'Edit the box so it reads: Welcome to our team, {{ $json.first_name }}! We are excited to work with you.'
              },
              {
                stepNumber: 5,
                title: 'Test and Verify',
                instruction: 'Click "Test step". Look at the Output pane on the right: It will say: "Welcome to our team, Maya! We are excited to work with you."'
              }
            ],
            expectedResult: 'A personalized sentence successfully generated using dynamic data from the previous step.'
          },
          whatShouldISee: {
            summary: 'Your expression evaluates in real-time, showing Maya\'s name inserted into the sentence.',
            indicators: [
              'Below the expression box, n8n displays a live preview showing the evaluated sentence.',
              'The output pane confirms the full message with the name replaced.'
            ]
          },
          commonMistakes: [
            {
              mistake: 'Typing single curly braces `{ $json.name }` instead of double `{{ $json.name }}`.',
              consequence: 'n8n treats it as literal text and prints "{ $json.name }" instead of the real name.',
              correction: 'Always use double curly braces `{{ }}` for dynamic expressions, or simply drag and drop with your mouse.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q5-1',
              question: 'What do double curly braces `{{ }}` tell n8n to do?',
              options: [
                'Print a smiley face icon.',
                'Look inside the incoming data and substitute the real value dynamically.',
                'Cancel the workflow.',
                'Send a password to Google.'
              ],
              correctIndex: 1,
              explanation: 'Double curly braces signal a dynamic expression, telling n8n to fetch the real data value at runtime.'
            }
          ],
          practicalChallenge: {
            prompt: 'In your expression, try doing simple math! Set `subtotal = 50`. In the next node, write: `{{ $json.subtotal + 10 }}` and test the step. What appears in the output?',
            hints: ['n8n will calculate 50 + 10 and display 60.'],
            solutionNotes: 'Expressions can combine text and perform calculations effortlessly.'
          },
          keyTakeaways: [
            'Expressions allow steps to reuse information from earlier steps.',
            'You can create expressions effortlessly by dragging fields from the left Input pane into settings on the right.',
            'Double curly braces `{{ $json.field }}` tell n8n to insert the live data value.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n Expressions Guide',
              url: 'https://docs.n8n.io/data/expressions/',
              note: 'Comprehensive guide to mapping, formulas, and syntax.'
            }
          ]
        }
      ]
    },
    {
      id: 'module-6',
      number: 6,
      stageId: 'stage-1',
      title: 'Essential Decision Nodes: If, Switch, and Merge',
      subtitle: 'Teaching Your Workflow How to Make Smart Choices',
      description: 'Make your workflows intelligent by adding decision forks (If node), multi-path categorization (Switch node), and combining parallel streams (Merge node).',
      difficulty: 'Beginner',
      estimatedMinutes: 50,
      lessons: [
        {
          id: 'lesson-6-1',
          moduleId: 'module-6',
          stageId: 'stage-1',
          title: 'Making Decisions: The If & Switch Nodes',
          subtitle: 'Forks in the road: routing data based on simple rules',
          difficulty: 'Beginner',
          estimatedMinutes: 50,
          prerequisites: ['Module 5'],
          whyDoINeedThis: 'Not every customer or task is identical. You might want to send a discount coupon to customers who spend over $100, but send a standard receipt to everyone else. Decision nodes give your workflow a brain so it can choose the right path automatically.',
          relatableProblem: 'A business sends the exact same emergency notification to their engineering team whether a website issue is a minor typo or a complete server crash. Engineers get overwhelmed by alerts and ignore real emergencies. Adding a simple decision filter fixes this immediately.',
          firstPrinciplesExplanation: 'In real life, you make decisions based on conditions:\n"If it is raining outside, grab an umbrella; otherwise wear sunglasses."\n\nIn n8n, you do this with the IF NODE:\n- The If node has 1 input pin on the left and 2 output pins on the right:\n  • Top Output (True): Data goes here if your condition is met.\n  • Bottom Output (False): Data goes here if your condition is NOT met.\n\nExample Rule:\nValue 1: `{{ $json.order_total }}`\nComparison: is greater than\nValue 2: `100`\n\nIf the order is $150, n8n sends it down the True branch (where you connect a "Send VIP Gift" node). If the order is $40, n8n sends it down the False branch (where you connect a standard receipt node).\n\nWhat if you have more than 2 choices?\nUse the SWITCH NODE! The Switch node is like a mailroom sorting rack with multiple pigeonholes: one branch for "Sales", one for "Support", and one for "Billing".',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'The If Node: A Fork in the Road for Your Data',
            mermaidCode: `graph LR
    IN[Incoming Order] --> IF{"If Node:<br/>Order Total > $100?"}
    IF -->|YES (True)| VIP["🎁 Send VIP Thank You & Discount"]
    IF -->|NO (False)| STD["📄 Send Standard Order Receipt"]

    style IF fill:#0F172A,stroke:#F59E0B,stroke-width:2px,color:#FFFFFF
    style VIP fill:#065F46,stroke:#10B981,stroke-width:2px,color:#FFFFFF
    style STD fill:#1E293B,stroke:#64748B,stroke-width:1px,color:#F8FAFC`
          },
          technicalDetails: 'Branching Behavior in n8n:\nWhen an If node routes data down the True branch, the False branch receives 0 items. That means any nodes connected to the False branch will simply sit quiet and not run. This is completely normal and intentional!',
          workedExample: {
            scenario: 'Routing customer inquiries by urgency.',
            inputJson: {
              "customer": "David",
              "urgency": "Urgent",
              "message": "Payment system is down!"
            },
            transformationLogic: 'Check if urgency equals "Urgent". If true, route to on-call phone alert.',
            outputJson: {
              "routed_to": "On-Call Emergency Slack Channel",
              "priority": "P1 High"
            },
            explanation: 'Because urgency was "Urgent", the If node activated the True branch and bypassed regular support tickets.'
          },
          stepByStepLab: {
            title: 'Building a Simple Decision Branch with the If Node',
            goal: 'Connect an If node that routes high-value orders to a special VIP notification step.',
            steps: [
              {
                stepNumber: 1,
                title: 'Create Sample Order Data',
                instruction: 'Add an Edit Fields node with two fields: `customer = "Sam"` and `order_total = 120` (Number). Click "Test step".'
              },
              {
                stepNumber: 2,
                title: 'Add the If Node',
                instruction: 'Click the "+" on the right output pin of your Edit Fields node. Search for "If" and select the If node.'
              },
              {
                stepNumber: 3,
                title: 'Set Your Condition',
                instruction: 'In the If node parameters, drag `order_total` into Value 1. Set the comparison operator to "is greater than", and type 100 in Value 2.'
              },
              {
                stepNumber: 4,
                title: 'Test the If Node',
                instruction: 'Click "Test step". Notice that under the "true" output pin you see 1 item, while under "false" you see 0 items!'
              },
              {
                stepNumber: 5,
                title: 'Connect Downstream Actions',
                instruction: 'Connect an Edit Fields node to the "true" output pin that sets `status = "VIP Customer"`. Test the workflow to see it light up with green checkmarks.'
              }
            ],
            expectedResult: 'A branching workflow where orders over 100 take the top path and lower orders take the bottom path.'
          },
          whatShouldISee: {
            summary: 'The top True branch lights up with a green checkmark while the bottom branch remains inactive.',
            indicators: [
              'The If node evaluates: 120 > 100 = true.',
              '1 item moves down the True branch.',
              '0 items move down the False branch.'
            ]
          },
          commonMistakes: [
            {
              mistake: 'Comparing a Number with text comparison (e.g. comparing "120" as text instead of a Number).',
              consequence: 'Computers compare text alphabetically (where "9" is greater than "100"), causing incorrect branching.',
              correction: 'Always ensure numerical fields are set to "Number" in the comparison settings.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q6-1',
              question: 'If an If node sends data down the "true" output pin, what happens to the nodes connected to the "false" pin?',
              options: [
                'They throw an error and crash n8n.',
                'They receive 0 items and do not execute.',
                'They delete your workflow.',
                'They run twice.'
              ],
              correctIndex: 1,
              explanation: 'Nodes only run if data enters them. When a branch receives 0 items, connected downstream nodes stay quiet.'
            }
          ],
          practicalChallenge: {
            prompt: 'Change the `order_total` in your first node to 45. Re-test the If node and observe how the data now automatically switches and flows down the False branch instead!',
            hints: ['Change the value, test step 1, then test the If node.'],
            solutionNotes: 'This proves your workflow is truly dynamic: different inputs automatically take different paths!'
          },
          keyTakeaways: [
            'The If node is a fork in the road that divides data into True and False branches.',
            'The Switch node lets you route data across 3 or more paths.',
            'Branches with 0 items do not execute downstream nodes.'
          ],
          officialDocLinks: [
            {
              title: 'Official If Node Documentation',
              url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.if/',
              note: 'Detailed reference on conditions and comparisons.'
            }
          ]
        }
      ]
    }
  ]
};
