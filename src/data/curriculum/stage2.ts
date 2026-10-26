import { Stage } from '../../types/curriculum';

export const stage2: Stage = {
  id: 'stage-2',
  number: 2,
  title: 'Integrations and Practical Automation',
  subtitle: 'APIs, Webhooks, Credentials, Databases & Messaging',
  description: 'Connect external apps safely, talk to any service on the web with the universal HTTP Request node, capture instant real-time events with webhooks, schedule automatic alarm clocks, and sync spreadsheets and databases without duplicates.',
  badge: 'Stage 2 • Integrations',
  accentColor: '#3B82F6',
  modules: [
    {
      id: 'module-7',
      number: 7,
      stageId: 'stage-2',
      title: 'Connecting Applications and Credentials',
      subtitle: 'Hotel Keycards, Permissions, and Keeping Your Secrets Safe',
      description: 'Connect external services (Google, Slack, Stripe, Airtable) to n8n safely. Understand how credentials work like hotel keycards, why n8n keeps secrets separate from workflow code, and how to grant just enough access without leaking passwords.',
      difficulty: 'Intermediate',
      estimatedMinutes: 55,
      lessons: [
        {
          id: 'lesson-7-1',
          moduleId: 'module-7',
          stageId: 'stage-2',
          title: 'Authentication & Credential Security Made Simple',
          subtitle: 'From API keys to OAuth2 authorization without the confusion',
          difficulty: 'Intermediate',
          estimatedMinutes: 55,
          prerequisites: ['Module 1', 'Module 2'],
          whyDoINeedThis: 'To let n8n read emails, post Slack updates, or update spreadsheets, you need to give n8n permission to log in on your behalf without handing over your personal password. Learning credentials lets you connect any app safely in 2 minutes.',
          whatShouldISee: {
            summary: 'In n8n\'s left sidebar under "Credentials", your connected account displays a green "Connected" badge with a padlock icon.',
            indicators: [
              'A green "Connected" status appears next to your account name in Credentials.',
              'Inside the node modal, the credential dropdown selects your account without red warning banners.',
              'Clicking "Test Connection" returns a success notification.'
            ]
          },
          whyItMatters: 'To automate business platforms (HubSpot, Stripe, Google Workspace, GitHub), n8n must act on your behalf. If you configure credentials incorrectly—such as requesting full admin scopes for a read-only script, or hardcoding an API key into a plain text expression—you create critical security vulnerabilities. Understanding credential models protects your business and client data.',
          relatableProblem: 'Imagine you hire a dog walker. You wouldn\'t give them the master deed to your house or your banking PIN—you give them a physical house key that only unlocks the front door between 1:00 PM and 3:00 PM. In software, if a freelancer hardcodes their client\'s master password into a workflow and shares the workflow JSON file online, anyone who downloads the file now owns the client\'s entire account! n8n\'s Credential Store completely prevents this by locking passwords in a separate encrypted vault.',
          firstPrinciplesExplanation: `Let's break down how n8n connects to other apps in three clear levels:

LEVEL 1: THE HOTEL KEYCARD ANALOGY
When you check into a hotel, the front desk does not give you the keys to the master safe, the manager's office, or every guest room. 
Instead, they issue a plastic keycard programmed with very specific permissions:
1. It unlocks only room 304 and the hotel gym.
2. It stops working automatically at 11:00 AM on Sunday when you check out.

In n8n, a Credential is that hotel keycard:
- When you connect Google Sheets, Google doesn't give n8n your Gmail password. Google gives n8n a digital keycard (called a "Token") that says: "This keycard can only edit spreadsheets, and nothing else."
- If someone steals that token, they cannot access your emails, credit cards, or personal files.

LEVEL 2: HOW N8N SEPARATES CODE FROM SECRETS
n8n uses a brilliant safety design:
- WORKFLOW CANVAS: Contains the instructions ("When a form arrives, send an email"). This is public logic. You can export it, share it with teammates, or post it on GitHub.
- CREDENTIAL VAULT: A separate, encrypted safe inside n8n. It holds the secret passwords, API keys, and tokens.
- THE CONNECTION: The node on the canvas simply says: "Use Keycard #3 from the vault." The actual password NEVER appears on the canvas or in the workflow code!

LEVEL 3: THE TWO COMMON TYPES OF KEYS YOU WILL SEE
1. API Key (Static Key): A secret password string provided by a service (for example: \`sk_test_51Abc...\`). You paste it once into n8n's Credential Store, and n8n sends it securely behind the scenes.
2. OAuth 2.0 (Sign in with Google / Slack): You click a friendly button that says "Sign in with Google". Google asks: "Do you want to allow n8n to view your spreadsheets?" You click "Allow". Google and n8n exchange digital keycards automatically. You never even have to copy and paste a password!`,
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'How n8n Separates Workflow Logic from Secret Credentials',
            mermaidCode: `graph TD
  subgraph PublicCanvas["Workflow Canvas (Safe to Share)"]
    N1["Node: Google Sheets<br/>'Append Row'"]
    N1 -.->|References by ID| CRED["Credential Pointer:<br/>'Google Account #2'"]
  end

  subgraph SecureVault["Encrypted Credential Vault (Never Leaves Server)"]
    CRED --> VAULT["Encrypted Vault (AES-256)<br/>Holds Secret Access Token & Refresh Token"]
  end

  subgraph RemoteService["External Cloud Platform (Google)"]
    VAULT -->|Secured HTTPS Request with Token| API["Google API Server<br/>Verifies Token & Allows Action"]
  end

  style PublicCanvas fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC
  style SecureVault fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC
  style RemoteService fill:#1E293B,stroke:#94A3B8,stroke-width:1px,color:#F8FAFC`
          },
          technicalDetails: 'Key Security Rules for Automation Engineers:\n- Least Privilege: Never request full admin access if a workflow only needs to read data. Choose "read-only" scopes whenever available.\n- Environment Encryption: n8n automatically encrypts all saved credential values using an internal encryption key stored in the server configuration.\n- Test Connection Button: Inside any credential modal in n8n, click "Test Connection" to immediately verify whether your token is active before running workflows.',
          optionalAdvancedDetails: {
            title: 'OAuth 2.0 Token Refresh Handshake & AES-256 Encryption',
            content: 'DEEP DIVE: OAuth 2.0 Token Refresh Handshake\nWhen you log in via OAuth 2.0, the external service returns two tokens:\n1. Access Token: Short-lived (typically expires after 60 minutes for security). Used on every HTTP request header: `Authorization: Bearer <TOKEN>`.\n2. Refresh Token: Long-lived (valid for months or indefinitely).\n\nWhen the 60 minutes expire, the external server returns HTTP 401 Unauthorized. n8n detects this automatically, pauses for 100 milliseconds, sends the Refresh Token to the provider\'s `/oauth/token` endpoint, receives a fresh Access Token, saves it back into its encrypted database, and retries your workflow step—all without any human intervention or interrupted jobs!'
          },
          workedExample: {
            scenario: 'Connecting a custom service securely using Header Auth instead of typing passwords on the canvas.',
            inputJson: {
              "service": "Internal Inventory Service",
              "endpoint": "https://inventory.corp.internal/v1/stock",
              "secretHeader": "X-API-Key",
              "secretValue": "sec_corp_994829103"
            },
            transformationLogic: 'Store the secret in n8n Credentials -> "Header Auth" rather than typing it into the HTTP Request node parameters.',
            outputJson: {
              "credentialType": "httpHeaderAuth",
              "configuredFields": {
                "name": "X-API-Key",
                "value": "••••••••••••••••••••"
              },
              "status": "Saved and Encrypted in Vault"
            },
            explanation: 'By storing the key in the Credential Store, any developer who inspects or exports the workflow will only see `"credentials": { "httpHeaderAuth": { "id": "cred_12" } }`—the secret key is never leaked.'
          },
          stepByStepLab: {
            title: 'Creating and Testing a Reusable Header Auth Credential',
            goal: 'Create an isolated API credential and attach it to an HTTP Request node.',
            steps: [
              {
                stepNumber: 1,
                title: 'Open Credentials Management',
                instruction: 'In the left sidebar of n8n, click "Credentials", then click the orange "+ Add Credential" button in the top right corner.'
              },
              {
                stepNumber: 2,
                title: 'Select Header Auth',
                instruction: 'In the search box, type "Header Auth" and select it. In the "Name" field, type `X-Service-Token`. In the "Value" field, type `mock_secret_token_12345`. Click "Save".'
              },
              {
                stepNumber: 3,
                title: 'Attach to an HTTP Request Node',
                instruction: 'Open your workflow canvas and add an "HTTP Request" node. Under "Authentication", click the dropdown and choose "Predefined Credential Type". Select "Header Auth", and choose the credential you just saved.'
              },
              {
                stepNumber: 4,
                title: 'Verify Headers',
                instruction: 'Set the URL field to `https://httpbin.org/headers`. Click "Test step". Look at the response JSON in the right panel: notice how `X-Service-Token: mock_secret_token_12345` was sent securely by n8n behind the scenes!'
              }
            ],
            expectedResult: 'httpbin.org echoes back the request headers, proving n8n injected your encrypted credential without showing it in plain text on the canvas.'
          },
          commonMistakes: [
            {
              mistake: 'Typing API keys directly into expressions like `Authorization: Bearer my_secret_token`.',
              consequence: 'The secret is stored in plaintext in the workflow JSON. If the workflow is exported, shared, or backed up to Git, your production API key is leaked.',
              correction: 'Always use n8n\'s built-in Credential Store so secrets remain encrypted and decoupled from workflow code.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q7-1',
              question: 'Why does OAuth 2.0 use both an Access Token and a Refresh Token?',
              options: [
                'Access tokens are for reading data; refresh tokens are for deleting data.',
                'Access tokens are short-lived to minimize security risk if intercepted; refresh tokens allow n8n to request a new access token automatically without requiring human login every hour.',
                'Refresh tokens are only used on mobile phones.',
                'It is an outdated legacy requirement.'
              ],
              correctIndex: 1,
              explanation: 'Short-lived access tokens limit exposure if compromised, while long-lived refresh tokens allow automated background systems like n8n to keep running indefinitely without human re-authentication.'
            }
          ],
          practicalChallenge: {
            prompt: 'Explain what happens during a credential rotation event. If a client revokes an API token in Stripe, what steps must an n8n engineer take to update all affected workflows without downtime?',
            hints: ['Remember that workflows point to credential IDs rather than embedding keys directly.'],
            solutionNotes: 'Because n8n decouples credentials, the engineer only needs to update the single Stripe credential entry in n8n. All 25 connected workflows will automatically use the updated token on their next run.'
          },
          keyTakeaways: [
            'Decouple secrets from logic by using the n8n Credential Store.',
            'Always request the minimum necessary OAuth scopes (Least Privilege).',
            'OAuth2 handles background token refreshing automatically without stopping running workflows.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n Credentials Management',
              url: 'https://docs.n8n.io/credentials/',
              note: 'Full documentation on OAuth, API Keys, and credential sharing.'
            }
          ]
        }
      ]
    },
    {
      id: 'module-8',
      number: 8,
      stageId: 'stage-2',
      title: 'HTTP Requests and APIs',
      subtitle: 'The Universal Node: Talking to Any Service on the Internet',
      description: 'Master the HTTP Request node from first principles. Understand the restaurant menu analogy, GET vs POST, query parameters, headers, body formatting, API status codes, and pagination.',
      difficulty: 'Intermediate',
      estimatedMinutes: 75,
      lessons: [
        {
          id: 'lesson-8-1',
          moduleId: 'module-8',
          stageId: 'stage-2',
          title: 'The HTTP Request Node: Your Universal Key to the Internet',
          subtitle: 'The restaurant waiter analogy, REST APIs, and making your first request',
          difficulty: 'Intermediate',
          estimatedMinutes: 75,
          prerequisites: ['Module 4', 'Module 7'],
          whyDoINeedThis: 'n8n has hundreds of pre-built app nodes, but thousands of software tools, local databases, and custom company websites have no built-in node. The HTTP Request node is your universal superpower: if a service exists on the internet with an API, you can connect to it using this single node.',
          whatShouldISee: {
            summary: 'When you click "Test step" on an HTTP Request node, the node pulses briefly and displays a green checkmark.',
            indicators: [
              'A green checkmark appears on the HTTP Request node.',
              'The output panel fills with live JSON records returned from the website.',
              'The response header shows HTTP status 200 OK or 201 Created.'
            ]
          },
          whyItMatters: 'While n8n has hundreds of pre-built app nodes, 40% of real client work involves niche SaaS platforms, proprietary internal microservices, or bleeding-edge API endpoints that don\'t have a dedicated node. If you master the generic HTTP Request node, you can integrate with literally any service on the internet that has an API.',
          relatableProblem: 'A client hires you to automate their order processing in an industry-specific inventory tool called "Fishbowl". You open n8n and search for "Fishbowl"—nothing appears! An amateur automation builder gives up and says "n8n can\'t do that". A professional automation engineer opens Fishbowl\'s public API documentation, adds an HTTP Request node, pastes the URL, and has the entire order pipeline automated in under an hour.',
          firstPrinciplesExplanation: `Let's understand how websites talk to each other using an everyday analogy:

LEVEL 1: THE RESTAURANT WAITER AND MENU ANALOGY
Imagine you visit a restaurant for dinner:
1. You (The Client): You sit at a table. You are not allowed to walk into the kitchen to grab food from the stove yourself.
2. The Menu (The API Documentation): It lists exactly what the kitchen can make, what each item is named, and what options you can choose (e.g. "Burger: choose cheese or bacon").
3. The Waiter (The HTTP Request): You call the waiter over and give your order. The waiter carries your order back to the kitchen.
4. The Kitchen (The Server): The chefs prepare your dish.
5. The Plate (The HTTP Response): The waiter walks back and places the food on your table.

In n8n:
- You are n8n.
- The Waiter is the "HTTP Request" node.
- The Kitchen is the external service (like Stripe, Google, or Shopify).
- The Menu is the service's API documentation.
- The Plate of food is the JSON data that arrives in n8n's output panel!

LEVEL 2: THE 4 MAIN VERBS (WHAT YOU ASK THE WAITER TO DO)
Whenever you use the HTTP Request node, you select a "Method" (an action verb):
- GET ("Bring me the menu or a glass of water"): You are asking to READ data. You do not change anything on the server.
- POST ("Here is my order ticket, please make this"): You are SENDING new data to be created (like creating a new customer or sending an email).
- PUT / PATCH ("Please change my side order from fries to salad"): You are UPDATING an existing record.
- DELETE ("Please clear this dirty plate"): You are REMOVING a record.

LEVEL 3: ANATOMY OF A WEB REQUEST
Every request has 4 simple parts:
1. URL (The Address): Where to send the message (e.g. \`https://api.github.com/users/octocat\`).
2. Method: The verb (\`GET\`, \`POST\`, etc.).
3. Headers: Meta-notes attached to the envelope (e.g. \`Content-Type: application/json\` which means "I am speaking JSON", and \`Authorization: Bearer ...\` which proves who you are).
4. Body (Payload): The actual package being sent (used with POST/PATCH, like \`{ "name": "Alice", "email": "alice@example.com" }\`).`,
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'The Complete HTTP Request and Response Cycle in n8n',
            mermaidCode: `graph LR
  subgraph n8nCanvas["n8n Canvas: HTTP Request Node"]
    REQ["1. Compose Request<br/>• Method: GET or POST<br/>• URL: https://api.service.com<br/>• Headers: Auth Token<br/>• Body: JSON data"]
  end

  subgraph Internet["Secure HTTPS Transit"]
    TRANSIT["Encrypted Web Request (TLS)"]
  end

  subgraph RemoteServer["External Service (e.g. Stripe / Shopify)"]
    PROCESS["2. Server Kitchen<br/>• Verifies Auth Token<br/>• Looks up or Saves Record<br/>• Formats JSON Result"]
  end

  subgraph OutputPanel["n8n Output Data Panel"]
    RESP["3. Response Received<br/>• Status: 200 OK<br/>• Data: Structured JSON Items"]
  end

  REQ --> TRANSIT --> PROCESS --> OutputPanel

  style n8nCanvas fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC
  style Internet fill:#1E293B,stroke:#94A3B8,stroke-width:1px,color:#F8FAFC
  style RemoteServer fill:#1E293B,stroke:#F59E0B,stroke-width:1px,color:#F8FAFC
  style OutputPanel fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC`
          },
          technicalDetails: 'Essential HTTP Request Node Settings:\n- Never Error (Continue On Fail): When enabled under "Options", if the external server returns an error (like 404 Not Found), the node will NOT crash your workflow. Instead, it outputs the error message so your workflow can handle it gently.\n- Send Query Parameters: Key-value pairs appended to the URL (e.g. `?limit=10&status=active`).\n- Response Format: Defaults to JSON. Switch to "File" if you are downloading a PDF, image, or ZIP file.',
          optionalAdvancedDetails: {
            title: 'HTTP Status Codes, Pagination Strategies & Exponential Retries',
            content: 'DEEP DIVE: Status Codes and Pagination\nStatus Code Quick-Reference:\n- 2xx (Success): `200 OK` (read succeeded), `201 Created` (new item saved).\n- 4xx (Your Mistake): `400 Bad Request` (invalid JSON), `401 Unauthorized` (missing/bad API key), `404 Not Found` (wrong URL), `429 Too Many Requests` (rate limit exceeded).\n- 5xx (Their Server Crashed): `500 Internal Error`, `502 Bad Gateway`.\n\nHandling Pagination:\nWhen an API has 5,000 records, it won\'t send them all at once. It sends them in "pages" of 50 or 100. In n8n\'s HTTP Request node, click "Add Option" -> "Pagination". n8n can automatically loop through all pages using Offset (e.g. `page=1, 2, 3`) or Cursor tokens until all records are retrieved!'
          },
          workedExample: {
            scenario: 'Fetching filtered posts for a specific user from a public REST API.',
            inputJson: {
              "targetUserId": 1
            },
            transformationLogic: 'Configure HTTP Request node to GET https://jsonplaceholder.typicode.com/posts with query parameter userId=1.',
            outputJson: [
              {
                "userId": 1,
                "id": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum..."
              },
              {
                "userId": 1,
                "id": 2,
                "title": "qui est esse",
                "body": "est rerum tempore vitae sequi sint nihil reprehenderit dolor..."
              }
            ],
            explanation: 'The external server received the filter, queried its database, and returned an array of matching posts directly into n8n as structured items.'
          },
          stepByStepLab: {
            title: 'Your First Live HTTP Request (No Signup or Keys Needed)',
            goal: 'Query the free public JSONPlaceholder test API and inspect the live data.',
            steps: [
              {
                stepNumber: 1,
                title: 'Add the HTTP Request Node',
                instruction: 'Create a new blank workflow. Click the "+" button on the canvas and search for "HTTP Request". Click it to add it to your canvas.'
              },
              {
                stepNumber: 2,
                title: 'Set Method and URL',
                instruction: 'Keep Method as `GET`. In the URL box, type or paste: `https://jsonplaceholder.typicode.com/posts`.'
              },
              {
                stepNumber: 3,
                title: 'Add a Query Filter',
                instruction: 'Scroll down to "Send Query Parameters" and toggle it ON. Click "Add Parameter". For Name, type `userId`. For Value, type `1`.'
              },
              {
                stepNumber: 4,
                title: 'Click Test Step and Inspect',
                instruction: 'Click the orange "Test step" button at the top of the node modal. Watch the right panel fill with 10 real posts written by user 1! You just made your first real API call.'
              }
            ],
            expectedResult: 'A list of 10 structured JSON items appears in the output panel, each with an id, title, and body.'
          },
          commonMistakes: [
            {
              mistake: 'Passing JSON string literals without selecting "Body Content Type: JSON".',
              consequence: 'The external server rejects the request with HTTP 400 Bad Request or 415 Unsupported Media Type.',
              correction: 'In the HTTP Request node, always select "Body Content Type: JSON" and provide valid key-value pairs or raw JSON.'
            },
            {
              mistake: 'Not handling HTTP 429 Too Many Requests.',
              consequence: 'When calling high-volume APIs, workflows crash when rate limits are exceeded.',
              correction: 'Enable "Retry on Fail" with a 2 to 5-second wait, or insert Split In Batches + Wait before the HTTP Request node.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q8-1',
              question: 'Which HTTP status code category represents a client-side error (such as an incorrect API key or missing parameter)?',
              options: [
                '2xx (e.g. 200, 201)',
                '3xx (e.g. 301, 302)',
                '4xx (e.g. 400 Bad Request, 401 Unauthorized, 404 Not Found)',
                '5xx (e.g. 500 Internal Server Error, 502 Bad Gateway)'
              ],
              correctIndex: 2,
              explanation: 'HTTP 4xx status codes indicate client-side errors (such as wrong API keys, missing required parameters, or invalid endpoint URLs), whereas 5xx codes indicate the external server itself crashed.'
            }
          ],
          practicalChallenge: {
            prompt: 'Configure an HTTP Request node that makes a GET request to `https://httpbin.org/status/404`. Enable "Continue On Fail" in node settings. Connect an If node that checks if `$json.error` exists, and routes to an error logging node.',
            hints: ['Look in Node Settings -> "On Error" -> "Continue Regular Output".'],
            solutionNotes: 'Instead of stopping execution, the node outputs `{ "error": "404 Not Found", "statusCode": 404 }`, allowing your workflow to handle missing records gracefully.'
          },
          keyTakeaways: [
            'The HTTP Request node lets you connect to any REST API on earth, with or without a dedicated n8n node.',
            'Always verify method (GET to read, POST to create, PATCH to update).',
            'Use built-in Pagination and "Continue on Fail" options for enterprise-grade API reliability.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n HTTP Request Node Reference',
              url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/',
              note: 'Complete guide to headers, body parameters, pagination, and retry policies.'
            }
          ]
        }
      ]
    },
    {
      id: 'module-9',
      number: 9,
      stageId: 'stage-2',
      title: 'Webhooks and Event-Driven Automation',
      subtitle: 'Instant Ingestion: The Front Doorbell of Automation',
      description: 'Master event-driven automation using Webhooks. Learn why webhooks are like front doorbells, the difference between Test and Production URLs, how to respond before external timeouts, and duplicate-event handling.',
      difficulty: 'Intermediate',
      estimatedMinutes: 65,
      lessons: [
        {
          id: 'lesson-9-1',
          moduleId: 'module-9',
          stageId: 'stage-2',
          title: 'Webhooks: Instant Real-Time Automation',
          subtitle: 'The front doorbell analogy, Test vs Prod URLs, and instant responses',
          difficulty: 'Intermediate',
          estimatedMinutes: 65,
          prerequisites: ['Module 3', 'Module 8'],
          whyDoINeedThis: 'Instead of running a workflow 1,000 times a day just to ask "did anyone buy anything yet?", a webhook lets external services ring your n8n doorbell the instant an event happens. Your workflows run in zero seconds and cost zero wasted server power.',
          whatShouldISee: {
            summary: 'In test mode, the Webhook node displays a spinning radar circle saying "Listening for test event...". When an event arrives, it instantly turns green and populates the canvas with customer details.',
            indicators: [
              'The Webhook node pulses with an orange radar animation while waiting.',
              'When the test payload arrives, the radar changes to a solid green checkmark.',
              'The output panel displays the received headers and body payload fields.'
            ]
          },
          whyItMatters: 'Webhooks are the backbone of modern real-time internet automation. When someone buys a course on Stripe, books a meeting on Calendly, or opens an issue on GitHub, a webhook fires immediately. If you do not understand webhook security (verifying HMAC signatures) or latency (responding before timeout), malicious actors can spoof events or external servers will drop your webhook connection.',
          relatableProblem: 'Imagine you order a package from Amazon. You don\'t want to walk out to your driveway every 60 seconds all day asking "Is the delivery truck here yet? No. How about now? No." That would be exhausting and wasteful! Instead, you sit on your couch, and when the delivery driver arrives, they ring your front doorbell: DING-DONG! You only get up when something actually arrived. In automation, polling every minute is checking the driveway; a webhook is the front doorbell.',
          firstPrinciplesExplanation: `Let's break down webhooks from simple concepts to production engineering:

LEVEL 1: THE FRONT DOORBELL ANALOGY
A normal API request is you calling an external company: "Hello Google, please give me my spreadsheet."
A Webhook is the reverse: You give the external company your doorbell address. When something happens in their system (e.g. a customer clicks "Buy" in Stripe), Stripe sends a message to your doorbell address: "DING-DONG! Customer Sarah just paid $50!"

n8n wakes up immediately, processes Sarah's order, and goes back to sleep.

LEVEL 2: THE CRITICAL DIFFERENCE BETWEEN TEST URL AND PRODUCTION URL
Inside every n8n Webhook node, you will see two URLs:
1. TEST URL (\`.../webhook-test/...\`):
   - This is a "practice doorbell".
   - It ONLY works when you are sitting in n8n and have clicked the button: "Listen for test event".
   - It captures exactly ONE event so you can inspect the data on your screen, and then it turns off.
2. PRODUCTION URL (\`.../webhook/...\`):
   - This is the real, permanently wired doorbell.
   - It ONLY works when you flip the switch at the top right of the canvas from "Inactive" to "ACTIVE".
   - Once active, it runs 24 hours a day, 7 days a week in the background.

BEGINNER GOLDEN RULE: When connecting Stripe, Shopify, or a website form for real customers, ALWAYS use the Production URL and make sure your workflow is toggled ACTIVE!

LEVEL 3: RESPONDING TO THE DOORBELL RAPIDLY
External services like Stripe and Shopify have a strict 10-second rule: If they ring your doorbell and n8n takes longer than 10 seconds to say "Thank you, I got it!", Stripe assumes your server crashed and will retry sending the same order 12 times!
To prevent duplicate orders, you can set the Webhook node to "Respond Immediately" with a 200 OK receipt in 50 milliseconds, while your workflow continues doing heavy work in the background.`,
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Immediate Webhook Acknowledgment vs. Background Processing',
            mermaidCode: `sequenceDiagram
  autonumber
  participant S as External App (Stripe / Shopify)
  participant W as n8n Webhook Listener
  participant R as Quick Receipt (200 OK)
  participant B as Background Actions (Email, DB, Slack)

  S->>W: POST /webhook/order-created (Sarah paid $50)
  W->>R: Instant Acknowledgment
  R-->>S: HTTP 200 OK: 'Order Received' (Takes 40ms!)
  Note over S: Stripe marks delivery SUCCESS.<br/>No duplicate retries!
  W->>B: Continue Workflow in Background
  B->>B: 1. Save to Google Sheets<br/>2. Send Welcome Email<br/>3. Ping Sales Team in Slack`
          },
          technicalDetails: 'Webhook Node Core Settings:\n- HTTP Method: Almost always set to `POST` for incoming event payloads.\n- Path: The unique slug for this webhook (e.g. `stripe-checkout` or `contact-form`).\n- Response Mode: Choose "Immediately" for high-volume event webhooks, or "Using Respond to Webhook Node" if you need to return dynamic custom data back to the caller.',
          optionalAdvancedDetails: {
            title: 'Securing Webhooks with HMAC Signatures & Test vs Prod Architecture',
            content: 'DEEP DIVE: Securing Webhooks with HMAC Signatures\nAnyone who guesses your public webhook URL can send fake POST data pretending to be Stripe. To guarantee authenticity, services like Stripe, Shopify, and GitHub send a cryptographic hash in the request header (e.g. `X-Hub-Signature-256` or `Stripe-Signature`). In n8n, you can use the Crypto node or the built-in webhook signature verification setting with your secret webhook signing key to reject any unauthorized requests with HTTP 401 Unauthorized.'
          },
          workedExample: {
            scenario: 'Processing an incoming lead submission from a website form with immediate acknowledgment.',
            inputJson: {
              "headers": {
                "host": "automation.company.com",
                "content-type": "application/json"
              },
              "body": {
                "formId": "contact-enterprise",
                "email": "cto@fintech.co",
                "message": "Interested in private cloud migration."
              }
            },
            transformationLogic: 'Return HTTP 200 with ticket ID in under 100ms, then create CRM deal and ping Slack.',
            outputJson: {
              "httpStatus": 200,
              "responseBody": {
                "status": "received",
                "ticketId": "TCK-88214",
                "estimatedResponseTime": "2 hours"
              }
            },
            explanation: 'The Respond to Webhook node dispatches the ticket acknowledgment immediately so the user\'s browser form submits without delay.'
          },
          stepByStepLab: {
            title: 'Creating and Testing Your First Live Webhook',
            goal: 'Set up a Webhook node, put it into listening mode, and send a test payload from your browser or terminal.',
            steps: [
              {
                stepNumber: 1,
                title: 'Add a Webhook Node',
                instruction: 'Create a new blank workflow. Click "+" and add a "Webhook" node. Keep HTTP Method as `POST`. Set Path to `my-test-lead`.'
              },
              {
                stepNumber: 2,
                title: 'Copy the Test URL',
                instruction: 'In the Webhook node modal, look at the "Webhook URLs" section at the top. Click "Test URL" and click the copy icon to copy it to your clipboard.'
              },
              {
                stepNumber: 3,
                title: 'Click Listen for Test Event',
                instruction: 'Click the orange "Listen for test event" button. The node will start displaying a spinning radar icon waiting for an incoming signal.'
              },
              {
                stepNumber: 4,
                title: 'Trigger the Webhook',
                instruction: 'Open your terminal (or an API test tool like Postman/Reqbin) and run:\n```bash\ncurl -X POST <PASTE_YOUR_TEST_URL_HERE> \\\n  -H "Content-Type: application/json" \\\n  -d \'{"customerName": "Elena Rostova", "interest": "Automation"}\'\n```\nSwitch back to n8n: The radar turns into a green checkmark, and Elena\'s data is displayed right on the canvas!'
              }
            ],
            expectedResult: 'The curl command outputs "Workflow got started" and n8n displays the received customer data.'
          },
          commonMistakes: [
            {
              mistake: 'Pasting the "Test URL" into a live production third-party service like Stripe or Shopify.',
              consequence: 'As soon as you close your n8n browser tab, all customer purchases fail with HTTP 404 Not Found!',
              correction: 'Always copy the PRODUCTION webhook URL and toggle the workflow to ACTIVE for live services.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q9-1',
              question: 'Why should you use the Production Webhook URL instead of the Test Webhook URL for live client systems?',
              options: [
                'The Test URL costs $5 per click.',
                'The Test URL only listens when you have the canvas open and click "Listen for test event"; the Production URL runs 24/7 in the background when the workflow is Active.',
                'The Production URL only works on weekends.',
                'There is no difference between them.'
              ],
              correctIndex: 1,
              explanation: 'Test URLs are temporary listeners for development; Production URLs are permanently active listeners tied to the workflow activation toggle.'
            }
          ],
          practicalChallenge: {
            prompt: 'Design a duplicate prevention (deduplication) layer for webhooks: If Stripe sends the exact same `event_id` twice within 10 minutes, how can your workflow detect and ignore the second delivery?',
            hints: ['Query a database or cache using `event_id`. If record exists, stop immediately; else insert and proceed.'],
            solutionNotes: 'This guarantees idempotency: `event_id` acts as the unique idempotency key.'
          },
          keyTakeaways: [
            'Webhooks are real-time doorbells: external services notify n8n the instant something happens.',
            'Test URLs only listen during interactive testing; Production URLs run 24/7 when the workflow is Active.',
            'Acknowledge webhooks rapidly to prevent external services from triggering timeout retries.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n Webhook Node Reference',
              url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/',
              note: 'Detailed guide to webhook URLs, authentication, and response modes.'
            }
          ]
        }
      ]
    },
    {
      id: 'module-10',
      number: 10,
      stageId: 'stage-2',
      title: 'Scheduling, Time, and Business Logic',
      subtitle: 'Automatic Alarm Clocks, Business Hours, and Timezones',
      description: 'Master time-based automation. Understand how to run workflows on recurring intervals, master cron expressions without math anxiety, set explicit timezones to avoid daylight savings bugs, and route tasks during business hours.',
      difficulty: 'Intermediate',
      estimatedMinutes: 50,
      lessons: [
        {
          id: 'lesson-10-1',
          moduleId: 'module-10',
          stageId: 'stage-2',
          title: 'Scheduling: Putting Routine Tasks on Autopilot',
          subtitle: 'The smart alarm clock analogy, friendly presets vs cron expressions',
          difficulty: 'Intermediate',
          estimatedMinutes: 50,
          prerequisites: ['Module 3', 'Module 5'],
          whyDoINeedThis: 'Businesses run on routine schedules: morning briefings at 8:00 AM, Friday invoice reminders, or weekend notification muting. Mastering scheduling lets you put routine business chores on autopilot 365 days a year without you having to press a single button.',
          whatShouldISee: {
            summary: 'When your workflow is toggled to "Active", you will see an "Active" green toggle at the top right of your canvas.',
            indicators: [
              'The workflow toggle switch in the top navigation bar shows green "Active".',
              'The Executions log in the left sidebar records an automatic execution each time the alarm triggers.',
              'No manual "Test step" click is required—the schedule runs autonomously.'
            ]
          },
          whyItMatters: 'Every business runs on a clock: Daily morning reports at 8:00 AM, weekly payroll processing on Fridays at 5:00 PM, monthly invoice reconciliations on the 1st, or routing support tickets differently on weekends. If your automation doesn\'t account for timezones, daylight savings, or overlapping runs, reports will be sent at 3:00 AM or databases will lock under duplicate cron jobs.',
          relatableProblem: 'A marketing manager sets an alarm on their phone every morning at 7:55 AM so they can manually download the daily sales spreadsheet and email it to the CEO before the 8:00 AM executive meeting. One day, the manager gets a flat tire on the freeway. The report isn\'t sent, and the executive meeting starts in chaos. Replacing the human alarm clock with an n8n Schedule Trigger means the report arrives at 8:00:00 AM every single morning without fail, even if the manager is asleep on a beach.',
          firstPrinciplesExplanation: `Let's understand automated scheduling in three easy steps:

LEVEL 1: THE SMART ALARM CLOCK ANALOGY
You already know how an alarm clock works: You set your phone to ring at 7:00 AM on weekdays. You don't have to stay awake all night staring at the clock—your phone watches the time for you and rings when it's time.
In n8n, the "Schedule Trigger" is that alarm clock. You tell it:
- "Wake up every hour."
- "Wake up every morning at 9:00 AM."
- "Wake up on the 1st day of every month."

When the clock strikes that time, n8n wakes up, runs through your workflow nodes, and goes back to sleep until the next alarm.

LEVEL 2: FRIENDLY PRESETS VS. CRON SYNTAX
n8n makes scheduling easy with two modes:
1. Friendly Presets (No coding needed!):
   - You simply pick from dropdowns: "Trigger Interval: Days", "Hour: 09", "Minute: 00". n8n does all the rest.
2. Custom Cron Syntax (For exact precision):
   - When you need complex schedules (like "Every 15 minutes between 9 AM and 5 PM, Monday through Friday"), you use a standard 5-part shorthand code called a "Cron expression".

LEVEL 3: THE GOLDEN TIMEZONE RULE
Never forget timezones! By default, cloud servers run on UTC (London time with no daylight savings).
If your office is in New York or Tokyo, and you set a schedule for "9:00 AM" without setting your workflow's timezone, your workflow will fire at 4:00 AM New York time!
FIX: In n8n, click the gear icon (Workflow Settings) in the top canvas bar, and choose your local timezone (e.g. \`America/New_York\` or \`Asia/Tokyo\`). Now your 9:00 AM schedule will always match your local office clock.`,
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Business Hours Logic: Checking the Clock Before Alerting the Team',
            mermaidCode: `graph TD
  ALARM["Schedule Trigger: Fires Every 30 Minutes"] --> GETTIME["Get Current Time in New York"]
  GETTIME --> CHECK{"Is it Business Hours?<br/>(Mon-Fri, 9am - 5pm)"}
  CHECK -->|YES: Office is Open| LIVE["Post Alert in #sales-live Slack Channel"]
  CHECK -->|NO: Night or Weekend| DIGEST["Save into 'Morning Digest' Spreadsheet<br/>(Don't wake up the team at 2am!)"]

  style ALARM fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC
  style CHECK fill:#1E293B,stroke:#F59E0B,stroke-width:2px,color:#F8FAFC
  style LIVE fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC
  style DIGEST fill:#0F172A,stroke:#8B5CF6,stroke-width:2px,color:#F8FAFC`
          },
          technicalDetails: 'Standard 5-Field Cron Anatomy:\n```text\n┌───────────── Minute (0 - 59)\n│ ┌───────────── Hour (0 - 23)\n│ │ ┌───────────── Day of month (1 - 31)\n│ │ │ ┌───────────── Month (1 - 12)\n│ │ │ │ ┌───────────── Day of week (0 - 6) (0=Sun, 1=Mon, 5=Fri)\n* * * * *\n```\nCommon Examples:\n- `0 9 * * 1-5`: Mon-Fri at 9:00 AM.\n- `*/15 * * * *`: Every 15 minutes.\n- `0 0 1 * *`: First day of every month at midnight.',
          optionalAdvancedDetails: {
            title: 'Luxon Date Math, Timezones & Preventing Overlapping Executions',
            content: 'DEEP DIVE: Luxon Date Math in n8n Expressions\nn8n has the powerful Luxon library built-in via the `$now` variable:\n- `$now.toISO()` -> `2026-10-26T09:00:00.000Z`\n- `$now.setZone("America/New_York").hour` -> Current hour in New York.\n- `$now.minus({ days: 1 }).toFormat("yyyy-MM-dd")` -> Yesterday\'s date formatted for SQL.\n- `$now.weekday` -> 1 for Monday through 7 for Sunday.\n\nEvaluating Business Hours Expression:\n`{{ $now.setZone("America/New_York").weekday <= 5 && $now.setZone("America/New_York").hour >= 9 && $now.setZone("America/New_York").hour < 17 }}`\nReturns `true` during working hours and `false` during nights and weekends.'
          },
          workedExample: {
            scenario: 'Generating a dynamic date filter for querying all sales created in the last 24 hours.',
            inputJson: {
              "scheduledExecution": "2026-10-25T08:00:00.000Z"
            },
            transformationLogic: 'Calculate start and end timestamps for the previous day.',
            outputJson: {
              "timeRange": {
                "startISO": "2026-10-24T00:00:00.000Z",
                "endISO": "2026-10-24T23:59:59.999Z",
                "humanLabel": "Sales for Friday, October 24, 2026"
              }
            },
            explanation: 'Using `{{ $now.minus({ days: 1 }).startOf("day").toISO() }}` and `{{ $now.minus({ days: 1 }).endOf("day").toISO() }}`.'
          },
          stepByStepLab: {
            title: 'Building a Scheduled Workflow with Business Hours Branching',
            goal: 'Set up a recurring schedule that checks whether the office is open or closed.',
            steps: [
              {
                stepNumber: 1,
                title: 'Add a Schedule Trigger',
                instruction: 'Create a new workflow and add a "Schedule Trigger". In the "Trigger Interval" dropdown, choose "Days". Set "At Hour" to `9` and "At Minute" to `00`.'
              },
              {
                stepNumber: 2,
                title: 'Add an If Node to Check Weekdays',
                instruction: 'Connect an "If" node to the trigger. Under Condition, choose "Number". In the first value box, type: `{{ $now.weekday }}`. Set comparison to "Less than or equal to", and second value to `5` (1 to 5 means Monday to Friday).'
              },
              {
                stepNumber: 3,
                title: 'Add Output Actions',
                instruction: 'On the "True" output, connect an Edit Fields node with `status: "Workday: Sending live alerts!"`. On the "False" output, connect one with `status: "Weekend: Holding messages until Monday."`.'
              },
              {
                stepNumber: 4,
                title: 'Test the Node',
                instruction: 'Click "Test step" on the If node. Inspect which branch lights up green based on today\'s actual day of the week!'
              }
            ],
            expectedResult: 'The execution routes cleanly down the appropriate branch according to the calendar day.'
          },
          commonMistakes: [
            {
              mistake: 'Leaving the workflow in UTC when the client expects 9:00 AM local time.',
              consequence: 'Executive morning reports arrive at 4:00 AM or 5:00 AM depending on daylight savings time.',
              correction: 'Open Workflow Settings (gear icon) and set the workflow\'s Timezone explicitly to your client\'s local city.'
            },
            {
              mistake: 'Scheduling a heavy batch job every 1 minute when the workflow takes 90 seconds to finish.',
              consequence: 'Runs overlap, leading to high CPU usage, duplicated database entries, and crashes.',
              correction: 'Increase the interval (e.g. to 5 minutes) so the previous run has ample time to complete.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q10-1',
              question: 'What cron expression represents running every weekday (Monday through Friday) at 8:30 AM?',
              options: [
                '8 30 * * 1-5',
                '30 8 * * 1-5',
                '* * 8 30 1-5',
                '30 8 1-5 * *'
              ],
              correctIndex: 1,
              explanation: 'In standard 5-field cron, field 1 is minute (30), field 2 is hour (8), field 3 is day-of-month (*), field 4 is month (*), and field 5 is day-of-week (1-5 for Mon-Fri).'
            }
          ],
          practicalChallenge: {
            prompt: 'Write an expression that checks if today is the last calendar day of the current month.',
            hints: ['Compare `$now.day` with `$now.endOf("month").day`.'],
            solutionNotes: '`{{ $now.day === $now.endOf("month").day }}` returns true only on the final day of the month.'
          },
          keyTakeaways: [
            'Configure workflow timezones explicitly in Workflow Settings to avoid daylight savings discrepancies.',
            'Use Luxon expressions (`$now.setZone()`) for robust date arithmetic and business hours checking.',
            'Avoid overlapping runs by ensuring execution duration is significantly shorter than the schedule interval.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n Schedule Trigger Guide',
              url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/',
              note: 'Complete guide to interval triggers, cron expressions, and timezone settings.'
            }
          ]
        }
      ]
    },
    {
      id: 'module-11',
      number: 11,
      stageId: 'stage-2',
      title: 'Email, Messaging, Spreadsheets, and Databases',
      subtitle: 'Multi-Channel Pipelines, Upserts & Sync Strategies',
      description: 'Build complete multi-channel integrations across Gmail/SMTP, Google Sheets, Slack/Telegram/Discord, and relational databases (PostgreSQL/MySQL). Master upsert operations, duplicate prevention, and partial failure recovery.',
      difficulty: 'Intermediate',
      estimatedMinutes: 70,
      lessons: [
        {
          id: 'lesson-11-1',
          moduleId: 'module-11',
          stageId: 'stage-2',
          title: 'Spreadsheets, Databases & Alerts: The Core Automation Pipeline',
          subtitle: 'Whiteboards vs filing cabinets, Slack alerts, and the golden rule of Upsert',
          difficulty: 'Intermediate',
          estimatedMinutes: 70,
          prerequisites: ['Module 6', 'Module 8'],
          whyDoINeedThis: 'Most real-world freelance and company workflows boil down to: take incoming data from a form or webhook, save it cleanly into a spreadsheet or database, and ping the team in Slack or by email. Mastering this multi-channel loop makes you capable of building 90% of paid automation projects.',
          whatShouldISee: {
            summary: 'After running the workflow, open your Google Sheet or database: a new row will be neatly populated with the contact information.',
            indicators: [
              'A new record appears in your Google Sheet or SQL table with no duplicate rows.',
              'A styled alert message arrives in your Slack, Discord, or Email inbox.',
              'The execution history shows a 100% green run path through all multi-channel nodes.'
            ]
          },
          whyItMatters: 'Every business stores data in spreadsheets or databases and communicates via Slack, Discord, or email. The ability to listen to form submissions, look up customer records in a SQL database, perform an idempotent upsert (update if exists, insert if new), append a row to Google Sheets, and dispatch a formatted Slack message is the core skillset of freelance and enterprise automation developers.',
          relatableProblem: 'A company tracks VIP event attendees in Google Sheets. Whenever someone submits a form, an automation appends a new row. If an attendee registers twice to fix a typo in their name, two separate rows are created. The welcome team sends two swag bags, and the billing team charges their credit card twice! By changing the operation from a naive "Append" to an "Upsert" based on email address, duplicates are permanently eliminated.',
          firstPrinciplesExplanation: `Let's understand how data storage and messaging work together:

LEVEL 1: THE WHITEBOARD VS. THE FIREPROOF FILING CABINET
- Google Sheets / Airtable (The Whiteboard): Easy for anyone on the team to open, view, sort, and color-code. Perfect for small projects (< 50,000 rows). However, like a physical whiteboard, if 100 people try to write on it simultaneously, they will bump elbows and make a mess (Google Sheets limits you to ~60 requests per minute).
- PostgreSQL / MySQL Database (The Fireproof Filing Cabinet): A professional database built for heavy industrial workloads. It can store millions of customer records, search through them in milliseconds, and handle thousands of simultaneous writes without breaking.
- Slack / Discord / Email (The Loudspeaker): Where you alert humans that something important just happened.

LEVEL 2: WHAT IS AN "UPSERT"? (THE GOLDEN RULE OF SYNCING)
"Upsert" is a combination of two words: UPDATE + INSERT.
Think of your personal phone address book:
- If a contact named "Sarah" is NOT in your contacts, your phone creates a brand new contact card (INSERT).
- If "Sarah" is ALREADY in your contacts, your phone doesn't create a second Sarah—it simply updates her phone number on her existing card (UPDATE).

When n8n syncs customer leads to Google Sheets or PostgreSQL:
- Always use UPSERT (using email as the unique matching key).
- That way, if a customer submits the form three times, you only ever have ONE clean, up-to-date row!

LEVEL 3: CONNECTING THE FULL LOOP
In real business automation, you chain these tools together into a seamless flow:
1. Trigger: A new lead arrives via Webhook or form.
2. Store: Perform an Upsert into Google Sheets or PostgreSQL.
3. Alert: Dispatch a formatted message to Slack with a direct link to the customer record.
4. Confirm: Send a warm confirmation email to the customer.`,
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Multi-Channel Pipeline: Ingestion, Database Upsert, and Team Notification',
            mermaidCode: `graph TD
  IN["1. Incoming Lead: Webhook Form"] --> V["2. Validate Email & Name"]
  V --> DB[("3. Database / Google Sheets:<br/>UPSERT Record<br/>(Update if exists, Insert if new)")]
  DB --> SLACK["4. Slack / Discord Notification:<br/>Rich Alert Card with Lead Info"]
  SLACK --> EMAIL["5. Gmail / SendGrid:<br/>Personalized Welcome Email to Customer"]

  style IN fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC
  style DB fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC
  style SLACK fill:#1E293B,stroke:#8B5CF6,stroke-width:2px,color:#F8FAFC
  style EMAIL fill:#0F172A,stroke:#EC4899,stroke-width:2px,color:#F8FAFC`
          },
          technicalDetails: 'Upsert Configuration in n8n:\n- In Google Sheets Node: Choose Operation: "Append or Update Row" (Upsert). Specify "Column to match on": `Email`.\n- In PostgreSQL Node: Choose Operation: "Execute a SQL Query" with parameterized values ($1, $2) or use the built-in "Upsert" operation.\n- Slack Block Kit: Use structured JSON blocks to render interactive buttons (e.g. "Approve Lead", "Assign to Sales") directly inside Slack messages.',
          optionalAdvancedDetails: {
            title: 'Parameterized SQL Queries, SQL Injection Prevention & Atomic Upserts',
            content: 'DEEP DIVE: Parameterized SQL Queries & Security\nNever concatenate raw text into SQL strings like: `INSERT INTO leads VALUES (\'\' + $json.name + \'\')`. If a malicious user submits their name as `Robert\'); DROP TABLE leads; --`, your entire database table will be deleted (SQL Injection)!\nAlways use parameterized placeholders:\n```sql\nINSERT INTO leads (email, full_name, budget, updated_at)\nVALUES ($1, $2, $3, NOW())\nON CONFLICT (email)\nDO UPDATE SET\n  full_name = EXCLUDED.full_name,\n  budget = EXCLUDED.budget,\n  updated_at = NOW()\nRETURNING id, status;\n```\nParameters mapping: `{{ $json.email }}`, `{{ $json.fullName }}`, `{{ $json.budget }}`.'
          },
          workedExample: {
            scenario: 'Formatting a Slack notification with Block Kit UI buttons.',
            inputJson: {
              "leadId": "LD-501",
              "name": "Sarah Jenkins",
              "company": "Nordic Logistics",
              "annualSpend": 75000
            },
            transformationLogic: 'Create a Slack Block Kit message with interactive buttons for sales reps.',
            outputJson: {
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*🔥 New High-Value Lead:* Sarah Jenkins (*Nordic Logistics*)\n*Estimated Annual Spend:* $75,000"
                  }
                },
                {
                  "type": "actions",
                  "elements": [
                    {
                      "type": "button",
                      "text": { "type": "plain_text", "text": "Claim Lead" },
                      "style": "primary",
                      "value": "claim_LD-501"
                    }
                  ]
                }
              ]
            },
            explanation: 'The Slack node sends this structured payload, rendering an interactive button directly inside the team\'s channel.'
          },
          stepByStepLab: {
            title: 'Building a Lead Ingestion and Alert Pipeline',
            goal: 'Simulate an incoming customer lead, format a Slack alert message, and generate a confirmation email payload.',
            steps: [
              {
                stepNumber: 1,
                title: 'Simulate Incoming Lead',
                instruction: 'Add a Manual Trigger connected to an Edit Fields node with: `name: "Alex Mercer"`, `email: "alex@mercer.dev"`, `company: "Acme Corp"`, `budget: 15000`.'
              },
              {
                stepNumber: 2,
                title: 'Simulate Database Upsert',
                instruction: 'Add an Edit Fields node simulating a database upsert output: `leadId: 1092`, `status: "SAVED_UPSERT"`, `timestamp: {{ $now.toISO() }}`.'
              },
              {
                stepNumber: 3,
                title: 'Format Multi-Channel Notifications',
                instruction: 'Add an Edit Fields node that formats a Slack message string: `🔥 New Lead: {{ $json.name }} from {{ $json.company }} (Budget: ${{ $json.budget }})` and an email subject: `Welcome to the platform, {{ $json.name }}!`.'
              },
              {
                stepNumber: 4,
                title: 'Verify Results',
                instruction: 'Click "Test step" and inspect the output JSON to verify that both personalization fields populated cleanly without syntax errors.'
              }
            ],
            expectedResult: 'A fully mapped multi-channel payload ready for delivery to Slack and email.'
          },
          commonMistakes: [
            {
              mistake: 'Using "Append Row" instead of "Append or Update (Upsert)" for customer syncs.',
              consequence: 'Duplicate rows build up rapidly whenever customers submit multiple times or when sync workflows re-run.',
              correction: 'Always configure Upsert with a unique identifier like Email or Customer ID.'
            },
            {
              mistake: 'Using unparameterized raw SQL string concatenation.',
              consequence: 'Exposes your entire database to catastrophic SQL injection attacks.',
              correction: 'Always use parameterized SQL bindings ($1, $2, etc.) or n8n\'s built-in UI operations.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q11-1',
              question: 'Why should you prefer an "Upsert" operation over an "Append / Insert" operation when syncing records from forms or external APIs?',
              options: [
                'Upserts run 10x faster in SQLite.',
                'Upserts guarantee idempotency: if the record already exists, it updates the data rather than creating redundant duplicates.',
                'Upserts automatically translate text into French.',
                'There is no difference.'
              ],
              correctIndex: 1,
              explanation: 'Upserts prevent duplicate records when users submit multiple times or when sync workflows re-run over overlapping time ranges.'
            }
          ],
          practicalChallenge: {
            prompt: 'Design a workflow that reads 100 rows from a Google Sheet, checks if each email exists in PostgreSQL, and only inserts records that are currently missing.',
            hints: ['Use the PostgreSQL node with operation "Select" followed by a Filter node checking if result is empty.'],
            solutionNotes: 'This is the standard differential synchronization pattern.'
          },
          keyTakeaways: [
            'Use relational databases for high-speed transactions and Google Sheets for human-readable visibility.',
            'Always use parameterized queries for SQL safety.',
            'Idempotent upserts prevent duplicate customer and order records.'
          ],
          officialDocLinks: [
            {
              title: 'Official n8n Postgres Node Guide',
              url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.postgres/',
              note: 'Guide to queries, connection parameters, and upsert operations.'
            }
          ]
        }
      ]
    }
  ]
};
