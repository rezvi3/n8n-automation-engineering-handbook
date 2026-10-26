import { Stage } from '../../types/curriculum';

export const stage0: Stage = {
  id: 'stage-0',
  number: 0,
  title: 'Understanding Automation',
  subtitle: 'The Automation Mindset & Architecture Foundations',
  description: 'Learn what automation really is through everyday analogies, explore the easiest way to launch n8n in your browser, and build your very first working 3-step automation without writing a single line of code.',
  badge: 'Stage 0 • Fundamentals',
  accentColor: '#3B82F6',
  modules: [
    {
      id: 'module-0',
      number: 0,
      stageId: 'stage-0',
      title: 'Orientation and the Automation Mindset',
      subtitle: 'From Repetitive Daily Tasks to Simple Automated Systems',
      description: 'Discover what workflow automation is, how n8n connects your everyday apps like an orchestra conductor, and how anyone can break down a human task into simple steps without coding.',
      difficulty: 'Beginner',
      estimatedMinutes: 45,
      lessons: [
        {
          id: 'lesson-0-1',
          moduleId: 'module-0',
          stageId: 'stage-0',
          title: 'What is Automation? The Everyday Mindset',
          subtitle: 'How to turn repetitive human chores into simple, reliable steps',
          difficulty: 'Beginner',
          estimatedMinutes: 30,
          prerequisites: ['No prior programming or technical knowledge required'],
          whyDoINeedThis: 'Think about how much time you waste copying text from emails into spreadsheets, sending the same booking link 20 times a day, or typing manual notifications. Automation allows you to create a simple recipe once, and let your computer carry it out 24/7 without fatigue, delays, or typos.',
          relatableProblem: 'Imagine you run a small local bike shop: Whenever a customer fills out the contact form on your website asking to rent a bicycle, you have to stop what you are doing, open your email, write their phone number down in a notebook, check the calendar for available bikes, and email them back a rental quote. If you are busy repairing a bike, the customer waits 4 hours and ends up renting from another shop down the street.',
          firstPrinciplesExplanation: 'You do not need to be a programmer or a computer scientist to understand automation. In fact, you already practice automation every single day in real life!\n\nImagine making a cup of morning tea:\n1. The Trigger (The Event): You wake up in the morning and feel thirsty.\n2. The Ingredients (The Information): You have water, tea leaves, and milk.\n3. The Recipe (The Actions): You boil the water, steep the tea, stir in the milk, and pour it into a cup.\n\nDigital automation in n8n works in the exact same 3-step sequence:\n1. An Event Happens (The Trigger): A customer fills out a website form, a new email arrives, or the clock strikes 9:00 AM on Monday.\n2. Information Arrives (The Data): The customer\'s name, their phone number, and what bicycle they want to rent.\n3. The Steps are Performed (The Actions): n8n automatically records their booking in your spreadsheet, alerts your team on Slack, and sends the customer a confirmation email.\n\nWhat is n8n?\nThink of n8n as an orchestra conductor. Your apps (Google Sheets, Gmail, Slack, WhatsApp, Notion) are musicians in an orchestra. When left on their own, they cannot talk to each other. n8n stands on the podium in the center, waving the baton so all your apps play together in perfect harmony.\n\nBest of all: n8n is completely visual. Instead of typing thousands of lines of cryptic code, you connect visual boxes (called nodes) with simple arrows on a digital canvas.',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Everyday Human Chores vs. A Visual n8n Automation',
            mermaidCode: `graph TD
  subgraph Manual["How Most People Do It Manually (Slow & Tiring)"]
    M1[Customer Fills Out Form] -->|Waits in inbox for hours| M2[Human Manually Reads Email]
    M2 -->|Copies Name & Phone| M3[Pasting into Spreadsheet]
    M3 -->|Manual Typing| M4[Typing Message to Sales Team]
    M4 -->|Manual Drafting| M5[Sending Booking Confirmation]
  end

  subgraph Automated["How n8n Does It Automatically (Takes 300 Milliseconds)"]
    A1[⚡ Form Submitted] --> A2[📝 Save to Google Sheet]
    A2 --> A3[💬 Post Alert in Slack]
    A3 --> A4[✉️ Send Email to Customer]
  end

  style Manual fill:#1E293B,stroke:#EF4444,stroke-width:2px,color:#F8FAFC
  style Automated fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC`
          },
          secondaryVisual: {
            diagramType: 'flow',
            caption: 'The 3 Simple Universal Pieces of Any Automation',
            mermaidCode: `graph LR
    TR["1. THE TRIGGER<br/>'When this event happens...'"] --> DT["2. THE INFORMATION<br/>'Here are the details...'"]
    DT --> AC["3. THE ACTIONS<br/>'Do these steps in order...'"]`
          },
          technicalDetails: 'Key Vocabulary Introduced Gently:\n- Workflow: The complete chain of connected steps (your automation recipe).\n- Node: Each individual box in your workflow that performs one specific job (like sending an email or reading a spreadsheet).\n- Trigger: The very first node on the left that starts the entire process.\n- Execution: A single run of your workflow from beginning to end.',
          optionalAdvancedDetails: {
            title: 'How n8n Compares to Tools Like Zapier & Make',
            content: 'Zapier and Make are popular cloud automation services, but they charge you high monthly fees per task and lock your data inside their proprietary servers. n8n is "fair-code": you can use n8n Cloud for instant setup, or you can self-host n8n for free on your own computer or private server with complete data privacy and unlimited executions.'
          },
          workedExample: {
            scenario: 'Turning a raw website contact inquiry into an organized customer record.',
            inputJson: {
              "full_name": "Alice Smith",
              "email": "alice@example.com",
              "rental_date": "Tomorrow at 10 AM",
              "bike_type": "Mountain Bike"
            },
            transformationLogic: 'Extract the customer details and package them into a clean notification card for the team.',
            outputJson: {
              "customerName": "Alice Smith",
              "contactEmail": "alice@example.com",
              "rentalRequest": "Mountain Bike",
              "status": "Ready for booking confirmation"
            },
            explanation: 'Notice how n8n takes the raw answers the customer typed into your form and neatly packages them so downstream apps (like your email or calendar) can use them instantly.'
          },
          stepByStepLab: {
            title: 'Deconstructing an Everyday Task into 3 Simple Steps',
            goal: 'Pick a repetitive chore from your own life or work and identify its Trigger, Information, and Actions.',
            steps: [
              {
                stepNumber: 1,
                title: 'Identify the Starting Event (The Trigger)',
                instruction: 'Think about when this task starts. Does it begin when someone sends you a message? When an invoice arrives in your inbox? Or every Monday morning at 9:00 AM? Write down: "When [Event] happens..."',
                tip: 'A trigger is always an event in time, never an ongoing state.'
              },
              {
                stepNumber: 2,
                title: 'Identify the Information You Need',
                instruction: 'What details are necessary to complete the task? (For example: customer name, order number, amount, or email address).',
                tip: 'Only collect the fields you actually need to do the job.'
              },
              {
                stepNumber: 3,
                title: 'List the Actions in Numbered Order',
                instruction: 'Write out the exact steps you take, one by one. Step 1: Record in spreadsheet. Step 2: Notify team. Step 3: Send confirmation.',
                tip: 'Keep each action focused on doing one single thing.'
              }
            ],
            expectedResult: 'A clear 3-box outline on paper or in notes describing your task as: [Starting Event] ──► [Information Details] ──► [Next Steps].'
          },
          whatShouldISee: {
            summary: 'You should have a clear mental model of how human actions translate into automated steps.',
            indicators: [
              'You can explain what a Trigger is using an everyday example (like an alarm clock or doorbell).',
              'You understand that each box on the canvas is called a Node.',
              'You know that data moves from left to right through connected arrows.'
            ]
          },
          commonMistakes: [
            {
              mistake: 'Trying to build a 30-step automation on day one.',
              consequence: 'You get overwhelmed, make configuration mistakes, and cannot tell which step caused the issue.',
              correction: 'Always start with a simple 2-step or 3-step workflow. Get it working, verify the output, and only then add more steps.'
            },
            {
              mistake: 'Thinking you need to know how to code in Python or JavaScript.',
              consequence: 'Beginners feel intimidated and give up before testing their first node.',
              correction: '90% of real-world automations require zero code. n8n provides pre-built buttons and forms for nearly every common task.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q0-1-1',
              question: 'In plain English, what is a "Trigger" in an n8n workflow?',
              options: [
                'A complex programming script that calculates numbers.',
                'The starting event that wakes up and begins the workflow.',
                'A password used to log in to your computer.',
                'A button that deletes all your saved files.'
              ],
              correctIndex: 1,
              explanation: 'Just like an alarm clock waking you up or a doorbell ringing, a trigger is the starting event that kicks off your workflow.'
            },
            {
              id: 'q0-1-2',
              question: 'Which of the following best describes what a "Node" is?',
              options: [
                'A physical cable plugged into your router.',
                'A single visual building block or step in a workflow that performs one specific job.',
                'A paid subscription to a web service.',
                'A mathematical formula from advanced calculus.'
              ],
              correctIndex: 1,
              explanation: 'Each box on the n8n canvas is called a node. You connect nodes together like building blocks to create a complete recipe.'
            }
          ],
          practicalChallenge: {
            prompt: 'Look at your own smartphone or computer habits. Name three repetitive tasks you do every week that follow the pattern: [Something Happens] ──► [I copy or move information] ──► [I send a response].',
            hints: [
              'Think about receiving receipts via email and saving them to a tax folder.',
              'Think about getting calendar invitations and adding notes in your to-do app.'
            ],
            solutionNotes: 'Great examples include: (1) Saving email attachments to Google Drive automatically, (2) Posting a message in Slack when a new payment arrives on Stripe, and (3) Sending a reminder email 24 hours before a scheduled appointment.'
          },
          keyTakeaways: [
            'Automation is simply turning everyday human recipes into reliable digital steps.',
            'Every automation consists of 3 pieces: The Trigger (When), The Information (What), and The Actions (Next Steps).',
            'n8n lets you build these workflows visually by connecting nodes with arrows on a canvas.',
            'You do not need to know any programming language to build powerful automations.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n Introduction for Beginners',
              url: 'https://docs.n8n.io/getting-started/',
              note: 'Gentle overview of core concepts directly from the n8n creators.'
            }
          ]
        },
        {
          id: 'lesson-0-2',
          moduleId: 'module-0',
          stageId: 'stage-0',
          title: 'Opening Your n8n Workspace: The Easiest Ways to Start',
          subtitle: 'How to get started in 60 seconds without complex server setup',
          difficulty: 'Beginner',
          estimatedMinutes: 25,
          prerequisites: ['Lesson 0-1'],
          whyDoINeedThis: 'You do not need to purchase a server, configure Linux, or learn complex terminal commands just to learn n8n. Choosing the right, simple setup lets you open your browser and start building workflows right away.',
          relatableProblem: 'Many beginner tutorials immediately tell students to install Docker, configure terminal ports, and edit terminal YAML files. Beginners run into permission errors, get stuck on command prompts, and feel frustrated before they ever see the n8n visual editor. Starting with a zero-friction setup solves this completely.',
          firstPrinciplesExplanation: 'There are two main ways to use n8n:\n\n1. Hosted in the Cloud (Easiest & Recommended for Beginners):\nJust like logging into Gmail, Google Docs, or Canva, n8n runs entirely on the web. You open your web browser (Chrome, Safari, Firefox), sign up for a free trial on n8n.io, and you have an instant, ready-to-use visual canvas in 60 seconds. There is nothing to install, configure, or maintain on your computer.\n\n2. Running on Your Own Computer (For Free Local Experiments):\nIf you already have Node.js on your computer, you can run a single command in your terminal (`npx n8n`) and open `http://localhost:5678` in your browser. This gives you a completely free sandbox that runs locally on your machine.\n\nWhat about Docker and Self-Hosting?\nRunning n8n inside Docker on a private Linux cloud server is the enterprise standard for production companies. But you do NOT need it to learn! We keep advanced Docker setup in a separate optional section so you can focus on mastering workflows first.',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Choosing Your Starting Path: Cloud vs. Local vs. Production',
            mermaidCode: `graph TD
  START[How would you like to start?] --> OPT1[Option A: n8n Cloud<br/>Recommended for Beginners]
  START --> OPT2[Option B: Quick Local Test<br/>npx n8n on your laptop]
  START --> OPT3[Option C: Advanced Self-Hosting<br/>Docker on Linux Server]

  OPT1 -->|Takes 60 seconds| R1[✓ Open browser, start building immediately]
  OPT2 -->|Takes 2 minutes| R2[✓ Free local sandbox on your machine]
  OPT3 -->|For DevOps Engineers| R3[✓ Complete server control & private VPC]

  style OPT1 fill:#065F46,stroke:#10B981,stroke-width:2px,color:#FFFFFF
  style OPT2 fill:#1E293B,stroke:#3B82F6,stroke-width:1px,color:#F8FAFC
  style OPT3 fill:#1E293B,stroke:#64748B,stroke-width:1px,color:#94A3B8`
          },
          technicalDetails: 'Key Interface Landmarks in n8n:\n- Top Bar: Contains your workflow name, the "Active" toggle switch, and the orange "Test workflow" button.\n- Canvas: The large grid in the center where you place and connect your nodes.\n- Add Node Menu: Opened by clicking the "+" button on the canvas or pressing the Tab key.\n- Left Sidebar: Lets you switch between Workflows, Execution history, Credentials, and Settings.',
          optionalAdvancedDetails: {
            title: 'For Developers: Running n8n Locally with Docker',
            content: 'If you already know Docker, you can run:\n`docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n docker.n8n.io/n8nio/n8n`\nThis mounts your local `~/.n8n` directory to ensure your workflows and credentials persist across container restarts. Never expose port 5678 to the public internet without an SSL reverse proxy.'
          },
          workedExample: {
            scenario: 'Navigating to your n8n workspace for the first time.',
            inputJson: {
              "platform": "n8n Cloud or Localhost",
              "workspaceUrl": "http://localhost:5678"
            },
            transformationLogic: 'Log in and land on the blank canvas ready to create your first workflow.',
            outputJson: {
              "status": "Ready",
              "canvasEmpty": true,
              "readyForFirstStep": true
            },
            explanation: 'When you first open n8n, you see an inviting, empty canvas with a "+" button in the center labeled "Add first step".'
          },
          stepByStepLab: {
            title: 'Opening Your n8n Canvas for the Very First Time',
            goal: 'Launch n8n in your web browser and create a blank workflow canvas.',
            steps: [
              {
                stepNumber: 1,
                title: 'Open your n8n Workspace',
                instruction: 'Either open your n8n Cloud account in your browser, or open a terminal and type: npx n8n. Then navigate to http://localhost:5678 in Google Chrome.',
                tip: 'If using Chrome, bookmark the page so you can return to it easily.'
              },
              {
                stepNumber: 2,
                title: 'Set up your Owner Account',
                instruction: 'If this is your first time opening n8n, enter your name, email, and choose a secure password. Click "Next".',
                tip: 'This password is stored safely in your instance and protects your workflows.'
              },
              {
                stepNumber: 3,
                title: 'Create a Blank Workflow',
                instruction: 'Click the "+ Add workflow" button in the top right corner. You will now see a clean canvas with a "+" in the middle.',
                tip: 'Double-click the default title "My workflow" at the top to give it a friendly name, such as "First Experiment".'
              }
            ],
            expectedResult: 'You are looking at an empty n8n canvas with a "+" button in the center ready for your first node.'
          },
          whatShouldISee: {
            summary: 'Your browser displays the n8n visual editor grid.',
            indicators: [
              'The top bar displays your workflow title and a "+ Add first step" button in the center.',
              'The left sidebar shows icons for Workflows, Executions, and Credentials.',
              'No error alerts or warnings are visible on screen.'
            ]
          },
          commonMistakes: [
            {
              mistake: 'Closing the terminal window if running `npx n8n` locally.',
              consequence: 'The n8n server process stops and the browser tab displays "Cannot connect to server".',
              correction: 'Keep the terminal window open in the background while building your workflows locally.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q0-2-1',
              question: 'Do you need to install Docker or manage servers to start learning n8n?',
              options: [
                'Yes, n8n cannot run without complex server administration.',
                'No, you can start immediately with n8n Cloud or a simple local command.',
                'Yes, you must write a backend in C++ first.',
                'No, but you must buy specialized hardware.'
              ],
              correctIndex: 1,
              explanation: 'n8n Cloud lets anyone start directly inside a normal web browser in 60 seconds with zero installation required.'
            }
          ],
          practicalChallenge: {
            prompt: 'Open your n8n canvas, rename the workflow from "My workflow" to "Hello World Lab", and locate the "+" button in the center of the screen.',
            hints: ['Click directly on the text "My workflow" at the top left of the screen to edit it.'],
            solutionNotes: 'Once renamed, click outside the text box or press Enter to save your new workflow title.'
          },
          keyTakeaways: [
            'n8n Cloud is the fastest, zero-friction way for beginners to start.',
            'Local development with `npx n8n` is free and runs directly on your computer.',
            'Advanced Docker self-hosting is an optional track that you can learn later when you are ready.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n Cloud Quickstart',
              url: 'https://docs.n8n.io/getting-started/quickstarts/cloud/',
              note: 'Official guide to launching your first cloud workspace.'
            }
          ]
        },
        {
          id: 'lesson-0-3',
          moduleId: 'module-0',
          stageId: 'stage-0',
          title: 'Project: Your First Automatic Message',
          subtitle: 'Connect 3 simple blocks: Manual Start ──► Set Message ──► See Result',
          difficulty: 'Beginner',
          estimatedMinutes: 30,
          prerequisites: ['Lesson 0-1', 'Lesson 0-2'],
          whyDoINeedThis: 'The fastest way to build confidence is to create something real that works. In this 5-minute project, you will place your first two nodes, connect them with an arrow, run a test, and see live results with your own eyes.',
          relatableProblem: 'When people look at an empty software canvas for the first time, they often worry about clicking the wrong button or accidentally breaking something. By building a safe, self-contained test that does not send real emails or touch external accounts, you learn the exact mechanics of n8n in complete safety.',
          firstPrinciplesExplanation: 'Every workflow in n8n needs at least two things:\n1. A way to start (The Trigger).\n2. Something to do (The Action).\n\nIn this first project, we will build the simplest possible working automation:\n- Step 1 (Trigger): We use a special node called "When clicking \'Test workflow\'". This is a manual trigger. It doesn\'t wait for a customer or a clock—it runs only when YOU explicitly press the button.\n- Step 2 (Action): We connect a node called "Edit Fields (Set)". This node creates a custom piece of information—in our case, a friendly message: "Hello, n8n!".\n- Step 3 (The Result): When we run the workflow, data flows out of the trigger, enters the Edit Fields node, and displays our message in the Output panel on the right side of the screen!\n\nNotice the magic: You didn\'t write code, you didn\'t install complex packages, and you didn\'t configure servers. You connected two visual blocks and watched them execute in milliseconds.',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Your Very First n8n Workflow (3 Simple Steps)',
            mermaidCode: `graph LR
    T["1. When clicking 'Test workflow'<br/>(Manual Trigger)"] -->|Data Flows Right| S["2. Edit Fields (Set)<br/>message = 'Hello, n8n!'"]
    S -->|Inspect Result| O["3. Output Pane<br/>✓ Status: Success!"]

    style T fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#FFFFFF
    style S fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#FFFFFF
    style O fill:#065F46,stroke:#10B981,stroke-width:2px,color:#FFFFFF`
          },
          technicalDetails: 'The Anatomy of a Node on the Canvas:\n- Left Circle (Input Pin): Where information enters from the previous step.\n- Right Circle (Output Pin): Where the processed result exits.\n- The Connecting Line: The arrow that directs data flow from left to right.\n- Double-Clicking a Node: Opens its settings modal where you enter values.',
          workedExample: {
            scenario: 'Creating a test message and inspecting the resulting output.',
            inputJson: {},
            transformationLogic: 'Create a new text field named "greeting" with the value "Hello, n8n! My first automation is working."',
            outputJson: {
              "greeting": "Hello, n8n! My first automation is working.",
              "created_by": "Future Automation Architect",
              "status": "Success ✓"
            },
            explanation: 'The Edit Fields node packages your text into clean, structured data that any downstream node can read.'
          },
          stepByStepLab: {
            title: 'Building Your Very First Working Automation',
            goal: 'Place a Manual Trigger, connect an Edit Fields node, and execute your first successful test.',
            steps: [
              {
                stepNumber: 1,
                title: 'Add the Trigger Node',
                instruction: 'On your blank canvas, click the "+" in the center (or "+ Add first step"). In the search box, type: "When clicking" and select "When clicking \'Test workflow\'".',
                tip: 'This node creates a manual start button on your canvas.'
              },
              {
                stepNumber: 2,
                title: 'Add the Action Node',
                instruction: 'Hover over the right side of your trigger node. Click the small "+" icon on its right output pin. In the search box, type: "Edit Fields" and click on the "Edit Fields (Set)" node.',
                tip: 'Notice how n8n automatically draws a connected line between the two nodes!'
              },
              {
                stepNumber: 3,
                title: 'Configure Your Message',
                instruction: 'In the Edit Fields settings panel that opens on your screen, click the "+ Add Field" button. Choose "String" (which means text). For the Name, type: my_message. For the Value, type: Hello, n8n! My first automation works!',
                tip: 'In computer terms, "String" simply means plain text like names, sentences, or messages.'
              },
              {
                stepNumber: 4,
                title: 'Execute Your First Test Run',
                instruction: 'Click the big orange button labeled "Test step" in the node panel (or click "Test workflow" at the bottom of the canvas). Watch what happens!',
                tip: 'Look for the bright green checkmark that appears above the node.'
              },
              {
                stepNumber: 5,
                title: 'Inspect Your Output',
                instruction: 'Look at the right pane labeled "OUTPUT". You will see your field: my_message: "Hello, n8n! My first automation works!". Congratulations, you just ran your first automation!',
                tip: 'You can switch between "Schema", "Table", and "JSON" views at the top of the output panel.'
              }
            ],
            expectedResult: 'A two-node workflow connected on the canvas with a green checkmark on both nodes, displaying your custom message in the Output window.'
          },
          whatShouldISee: {
            summary: 'A bright green checkmark appears above both nodes, and your message is displayed in the Output panel.',
            indicators: [
              'A green circle with a white checkmark [✓] appears above the Edit Fields node.',
              'The Output panel on the right displays: my_message: "Hello, n8n! My first automation works!"',
              'The bottom canvas bar displays: "Workflow executed successfully".'
            ]
          },
          commonMistakes: [
            {
              mistake: 'Leaving the field name blank in Edit Fields.',
              consequence: 'n8n shows a red warning border because every piece of information needs a label.',
              correction: 'Always give your field a short, descriptive name (like "message", "customer_name", or "status").'
            },
            {
              mistake: 'Clicking outside the node before clicking "Test step".',
              consequence: 'The output panel remains empty because the node hasn\'t executed yet.',
              correction: 'Simply double-click the node to reopen its settings and click the orange "Test step" button.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q0-3-1',
              question: 'Which direction does information flow between nodes in an n8n workflow?',
              options: [
                'From bottom to top.',
                'From left to right along the connected arrows.',
                'From right to left.',
                'In random circles.'
              ],
              correctIndex: 1,
              explanation: 'In n8n, workflows always flow from left to right. Information exits the right pin of one node and enters the left pin of the next.'
            },
            {
              id: 'q0-3-2',
              question: 'What does a bright green checkmark above a node mean?',
              options: [
                'The node has an error and stopped working.',
                'The node executed successfully and produced output data.',
                'The node is deleted.',
                'The node requires a credit card payment.'
              ],
              correctIndex: 1,
              explanation: 'A green checkmark indicates that the step ran smoothly without any errors and is ready for downstream nodes.'
            }
          ],
          practicalChallenge: {
            prompt: 'In your Edit Fields node, add a second field! Click "+ Add Field", choose "Number", name it "my_score", and give it the value 100. Test the step again and confirm both fields appear in the output.',
            hints: ['Make sure to select "Number" instead of "String" when adding the second value.'],
            solutionNotes: 'When you test the step, your Output pane will now show both `my_message` (text) and `my_score: 100` (number) neatly grouped together.'
          },
          keyTakeaways: [
            'Building in n8n is as simple as adding nodes and connecting their pins with arrows.',
            'The Manual Trigger lets you test and experiment safely without affecting real apps.',
            'The Edit Fields node is how you create, rename, and organize data in a workflow.',
            'The Output panel on the right always shows you the exact result produced by the step.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n Node Anatomy Guide',
              url: 'https://docs.n8n.io/workflows/nodes/',
              note: 'Detailed reference on node pins, inputs, and output panels.'
            }
          ]
        }
      ]
    }
  ]
};
