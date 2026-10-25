import { Stage } from '../../types/curriculum';

export const stage2: Stage = {
  id: 'stage-2',
  number: 2,
  title: 'Integrations and Practical Automation',
  subtitle: 'APIs, Webhooks, Credentials, Databases & Messaging',
  description: 'Connect third-party platforms, master the generic HTTP Request node, secure event-driven webhooks with HMAC signatures, schedule recurring workflows, and synchronize databases.',
  badge: 'Stage 2 • Integrations',
  accentColor: '#3B82F6',
  modules: [
    {
      id: 'module-7',
      number: 7,
      stageId: 'stage-2',
      title: 'Connecting Applications and Credentials',
      subtitle: 'OAuth2, API Keys, Scopes, and Secrets Management',
      description: 'Master authentication mechanisms in n8n. Learn how OAuth2 handshakes work, how to manage Bearer tokens, enforce least-privilege access, rotate API secrets, and diagnose expired token failures.',
      difficulty: 'Intermediate',
      estimatedMinutes: 55,
      lessons: [
        {
          id: 'lesson-7-1',
          moduleId: 'module-7',
          stageId: 'stage-2',
          title: 'Authentication Architectures & Credential Security',
          subtitle: 'From API keys to OAuth2 authorization code flows',
          difficulty: 'Intermediate',
          estimatedMinutes: 55,
          prerequisites: ['Module 1', 'Module 2'],
          whyItMatters: 'To automate business platforms (HubSpot, Stripe, Google Workspace, GitHub), n8n must act on your behalf. If you configure credentials incorrectly—such as requesting full admin scopes for a read-only script, or hardcoding an API key into a plain text expression—you create critical security vulnerabilities. Understanding credential models protects your business and client data.',
          relatableProblem: 'A freelancer connects a client\'s Google Drive using OAuth, but leaves the default n8n encryption key unconfigured. Six months later, the server is migrated, the encryption key breaks, and 40 active client workflows fail simultaneously because none of the Google OAuth tokens can be decrypted. Understanding credential architecture prevents production collapse.',
          firstPrinciplesExplanation: 'n8n isolates credentials from workflow logic. Workflows define *what* to do; Credentials define *how to authenticate*. This allows you to share or export workflows without exposing private API keys.\n\nThe 3 Core Authentication Patterns:\n1. API Keys & Bearer Tokens: A static secret string provided by the service (e.g. `sk_live_...`). Sent in the HTTP headers (e.g. `Authorization: Bearer <TOKEN>`) or query parameters.\n2. Basic Authentication: Standard HTTP auth using base64-encoded `username:password`.\n3. OAuth 2.0 (Authorization Code Flow): The modern standard for human user accounts (Google, Slack, Salesforce). Instead of sharing your master password with n8n, you authorize n8n via a consent screen. The service issues an Access Token (short-lived, e.g. 1 hour) and a Refresh Token (long-lived). n8n automatically handles refreshing the expired access token in the background without interrupting workflows.\n\nPrinciple of Least Privilege:\nAlways restrict credential scopes. If a workflow only needs to read spreadsheet rows, grant `drive.readonly` or `spreadsheets.readonly`, never full drive administration access.',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'The OAuth 2.0 Token Refresh Flow Inside n8n',
            mermaidCode: `sequenceDiagram
  autonumber
  participant N8N as n8n Execution Engine
  participant VAULT as Encrypted Credential Vault (AES-256)
  participant API as External Service (Google / HubSpot)

  N8N->>VAULT: Fetch Credentials for Node
  VAULT-->>N8N: Decrypt Access Token & Refresh Token
  N8N->>API: HTTP Request with Header Authorization: Bearer {Token}
  alt Token is Valid
    API-->>N8N: HTTP 200 OK (Data Payload)
  else Token Expired (HTTP 401 Unauthorized)
    API-->>N8N: HTTP 401 Token Expired
    N8N->>API: POST /oauth/token (Exchange Refresh Token)
    API-->>N8N: Issue New Access Token
    N8N->>VAULT: Re-encrypt and Save New Access Token
    N8N->>API: Retry Original HTTP Request with New Token
    API-->>N8N: HTTP 200 OK (Data Payload)
  end`
          },
          technicalDetails: 'Credential Storage in n8n:\n- Encrypted at Rest: All stored credential records in the database have their secret fields encrypted with AES-256-GCM using `N8N_ENCRYPTION_KEY`.\n- Credential Sharing: In n8n Enterprise/Team plans, credentials can be shared across project workspaces with role-based access control (Admin, Member, Viewer).\n- Testing Connections: The credential modal includes a "Test Connection" button that makes a lightweight diagnostic probe request to verify validity before you wire the node.',
          workedExample: {
            scenario: 'Configuring a generic Header Auth credential for a custom internal microservice.',
            inputJson: {
              "service": "Internal Inventory Service",
              "endpoint": "https://inventory.corp.internal/v1/stock",
              "secretHeader": "X-API-Key",
              "secretValue": "sec_corp_994829103"
            },
            transformationLogic: 'Store the secret in n8n Credentials -> "Header Auth" rather than typing it in the HTTP Request node parameters.',
            outputJson: {
              "credentialType": "httpHeaderAuth",
              "configuredFields": {
                "name": "X-API-Key",
                "value": "••••••••••••••••••••"
              },
              "status": "Saved and Encrypted with AES-256"
            },
            explanation: 'By storing `X-API-Key` in the Credential Store, any developer who inspects or exports the workflow JSON will only see `"credentials": { "httpHeaderAuth": { "id": "cred_12" } }`—the secret value is never leaked in the code.'
          },
          stepByStepLab: {
            title: 'Creating and Testing a Reusable Header Auth Credential',
            goal: 'Create an isolated API credential and attach it to an HTTP Request node.',
            steps: [
              {
                stepNumber: 1,
                title: 'Open Credentials Management',
                instruction: 'In the left sidebar of n8n, click "Credentials", then click "+ Add Credential".'
              },
              {
                stepNumber: 2,
                title: 'Select Header Auth',
                instruction: 'Search for "Header Auth". Set Name: `X-Service-Token`, and Value: `mock_secret_token_12345`. Click "Save".'
              },
              {
                stepNumber: 3,
                title: 'Attach to an HTTP Request Node',
                instruction: 'Create a new workflow, add an HTTP Request node. Under Authentication, select "Predefined Credential Type", choose "Header Auth", and select your newly created credential.'
              },
              {
                stepNumber: 4,
                title: 'Verify Headers',
                instruction: 'Set the URL to `https://httpbin.org/headers`. Click "Test step". Inspect the response JSON and verify that `X-Service-Token: mock_secret_token_12345` was transmitted securely.'
              }
            ],
            expectedResult: 'httpbin.org echoes back the headers confirming n8n injected your encrypted credential.'
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
      subtitle: 'The Universal Node: REST, Endpoints, Pagination & Retries',
      description: 'Master the HTTP Request node from first principles. Understand GET, POST, PUT, PATCH, DELETE, query parameters, headers, body formatting, API status codes, pagination, and exponential backoff retries.',
      difficulty: 'Intermediate',
      estimatedMinutes: 75,
      lessons: [
        {
          id: 'lesson-8-1',
          moduleId: 'module-8',
          stageId: 'stage-2',
          title: 'The HTTP Request Node: The Swiss Army Knife of Automation',
          subtitle: 'REST architectures, query parameters, pagination, and resilience',
          difficulty: 'Intermediate',
          estimatedMinutes: 75,
          prerequisites: ['Module 4', 'Module 7'],
          whyItMatters: 'While n8n has hundreds of pre-built app nodes, 40% of real client work involves niche SaaS platforms, proprietary internal microservices, or bleeding-edge API endpoints that don\'t have a dedicated node. If you master the generic HTTP Request node, you can integrate with literally any service on the internet that has an API.',
          relatableProblem: 'A client uses an industry-specific ERP called Fishbowl. There is no "Fishbowl" node in n8n. An amateur tells the client n8n can\'t do it. A professional automation architect opens Fishbowl\'s REST API docs, configures an HTTP Request node with custom headers and JSON body parameters, handles pagination, and builds the entire integration in two hours.',
          firstPrinciplesExplanation: 'An HTTP Request is a standardized electronic letter sent across the internet. It consists of:\n1. HTTP Method (The Verb):\n   - `GET`: Retrieve data without altering server state.\n   - `POST`: Create a new resource or submit a form.\n   - `PUT`: Completely replace an existing resource.\n   - `PATCH`: Partially update specific fields on an existing resource.\n   - `DELETE`: Remove a resource.\n2. URL & Endpoint: The address (`https://api.github.com/repos/owner/repo/issues`).\n3. Headers: Metadata about the request (e.g. `Content-Type: application/json`, `Authorization: Bearer ...`).\n4. Query Parameters: Key-value filters appended to the URL (`?status=open&limit=100`).\n5. Body (Payload): The actual data being transmitted (usually formatted as JSON).\n\nHandling Pagination:\nAPIs rarely return 10,000 records in one call; they return them in "pages" of 25 or 100 with pagination metadata (e.g. `page=1`, `cursor="dXNlcl8xMDI="`, or a `Link` header). The n8n HTTP Request node includes built-in Pagination settings (Offset-based, Cursor-based, or Next-URL-based) to automatically loop and retrieve all pages.',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'The Anatomy of an HTTP Request & Response Cycle in n8n',
            mermaidCode: `graph LR
  subgraph Request["Outgoing HTTP Request Node"]
    M["Method: POST"]
    U["URL: https://api.stripe.com/v1/refunds"]
    H["Headers: Authorization, Content-Type"]
    B["Body: { 'charge_id': 'ch_102', 'amount': 4500 }"]
  end

  subgraph Server["External SaaS Server"]
    P["API Gateway & Router"]
    DB[(Production DB)]
  end

  subgraph Response["Incoming HTTP Response Payload"]
    SC["Status Code: 200 OK (or 400/401/429/500)"]
    RB["JSON Body: { 'id': 're_99', 'status': 'succeeded' }"]
  end

  Request -->|Encrypted HTTPS TLS 1.3| Server
  Server -->|Processes Logic & Persists| DB
  Server -->|Returns Structured Parcel| Response

  style Request fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC
  style Server fill:#1E293B,stroke:#94A3B8,stroke-width:1px,color:#F8FAFC
  style Response fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC`
          },
          technicalDetails: 'Essential HTTP Request Node Settings:\n- Never Error (Continue On Fail): When enabled under "Options", the node will not halt the workflow if the API returns a 4xx or 5xx error. Instead, it outputs the error response object, allowing your workflow logic to inspect the error and branch cleanly.\n- Retry on Fail: Automatically retries the request up to 3 times with exponential backoff if a temporary network timeout or HTTP 502/503 occurs.\n- Response Format: Defaults to JSON. Can be switched to "File" when downloading PDFs, images, or ZIPs.\n- Pagination Rules: Configure "Pagination" -> Complete when `{{ $response.body.has_more === false }}`.',
          workedExample: {
            scenario: 'Fetching paginated users from a REST API using cursor-based pagination.',
            inputJson: {
              "pageSize": 50,
              "initialCursor": null
            },
            transformationLogic: 'Configure HTTP Request node to loop while `$response.body.next_cursor` exists, appending all items into a single array.',
            outputJson: [
              { "userId": "usr_01", "name": "Elena Rostova", "role": "Engineer" },
              { "userId": "usr_02", "name": "Kenji Sato", "role": "Architect" }
            ],
            explanation: 'The node evaluates the pagination expression on each iteration, automatically passing the cursor into `?starting_after={{ $response.body.next_cursor }}` until all records are collected.'
          },
          stepByStepLab: {
            title: 'Interacting with a Live REST API and Handling Query Parameters',
            goal: 'Query the public JSONPlaceholder API, filter results, and handle non-200 responses gracefully.',
            steps: [
              {
                stepNumber: 1,
                title: 'Add an HTTP Request Node',
                instruction: 'Create a new workflow and add an HTTP Request node. Set Method: `GET`, URL: `https://jsonplaceholder.typicode.com/posts`.'
              },
              {
                stepNumber: 2,
                title: 'Configure Query Parameters',
                instruction: 'Under "Send Query Parameters", add parameter `userId` with value `1`. Click "Test step". Notice how it returns only 10 posts belonging to user 1.'
              },
              {
                stepNumber: 3,
                title: 'Simulate a POST Request',
                instruction: 'Change Method to `POST`. Toggle "Send Body" to ON. Body Content Type: `JSON`. Add fields: `title: "n8n Automation Mastery"`, `body: "Automating workflows with HTTP requests"`, `userId: 1`.'
              },
              {
                stepNumber: 4,
                title: 'Test and Inspect',
                instruction: 'Click Test step. Confirm that the API returns HTTP 201 Created with an assigned `id: 101`.'
              }
            ],
            expectedResult: 'A successful HTTP 201 response containing your created record ID.'
          },
          commonMistakes: [
            {
              mistake: 'Passing JSON string literals without parsing or forgetting `Content-Type: application/json`.',
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
              question: 'Which HTTP status code category represents a client-side error (such as invalid parameters or unauthorized credentials)?',
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
            'Always verify method (GET/POST/PATCH), query parameters, and headers.',
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
      subtitle: 'Instant Ingestion, HMAC Verification & Test vs Production URLs',
      description: 'Master event-driven architectures using Webhooks. Understand Test vs Production webhook URLs, HTTP response modes, HMAC cryptographic signature verification, and duplicate-event handling.',
      difficulty: 'Intermediate',
      estimatedMinutes: 65,
      lessons: [
        {
          id: 'lesson-9-1',
          moduleId: 'module-9',
          stageId: 'stage-2',
          title: 'Event-Driven Webhook Engineering',
          subtitle: 'Test vs Prod URLs, HMAC verification, and sub-second responses',
          difficulty: 'Intermediate',
          estimatedMinutes: 65,
          prerequisites: ['Module 3', 'Module 8'],
          whyItMatters: 'Webhooks are the backbone of modern real-time internet automation. When someone buys a course on Stripe, books a meeting on Calendly, or opens an issue on GitHub, a webhook fires immediately. If you do not understand webhook security (verifying HMAC signatures) or latency (responding before timeout), malicious actors can spoof events or external servers will drop your webhook connection.',
          relatableProblem: 'A SaaS company connects a Stripe payment webhook to n8n. In the workflow, they place a 45-second AI summarization node BEFORE the webhook response is sent. Stripe has a strict 10-second timeout limit. Because n8n did not return HTTP 200 within 10 seconds, Stripe marks the webhook as failed and retries sending it 12 times over the next 24 hours. The customer receives 12 duplicate confirmation emails and 12 welcome bonuses. Understanding webhook response modes completely solves this.',
          firstPrinciplesExplanation: 'A webhook is a "reverse API": Instead of n8n calling an external server, the external server calls n8n via an HTTP POST request the instant an event occurs.\n\nCRITICAL CONCEPTS:\n1. Test URL vs. Production URL:\n   - The Test URL (`/webhook-test/...`) ONLY listens when an engineer has clicked "Listen for test event" on the canvas. It captures a single event for debugging, then shuts off.\n   - The Production URL (`/webhook/...`) runs 24/7 in the background when the workflow is toggled to ACTIVE. It never shuts off.\n2. Response Modes:\n   - "Immediately": n8n responds with HTTP 200 the instant the payload arrives (under 50ms), and then processes the rest of the workflow asynchronously. This is the recommended pattern for Stripe, Shopify, and GitHub.\n   - "When Last Node Finishes": n8n holds the HTTP connection open until the final node completes and returns dynamic JSON back to the caller.\n   - "Using \'Respond to Webhook\' Node": Gives you granular control over exactly when and what HTTP status/body to return in the middle of a workflow.\n3. HMAC Signature Verification:\n   Anyone who guesses your webhook URL can send fake POST requests. Services like Shopify, GitHub, and Stripe include an HMAC-SHA256 signature header (e.g. `X-Hub-Signature-256`) computed using your shared secret. n8n must verify this signature to guarantee the payload is authentic.',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Immediate Webhook Response vs. Deferred Asynchronous Processing',
            mermaidCode: `sequenceDiagram
  autonumber
  participant S as External Service (Shopify)
  participant W as n8n Webhook Listener
  participant R as Respond to Webhook Node
  participant B as Heavy Async Pipeline (DB, AI, Slack)

  S->>W: POST /webhook/order-created (Payload + HMAC Header)
  W->>W: Validate HMAC Signature
  alt Signature Invalid
    W-->>S: 401 Unauthorized (Drop Request)
  else Signature Valid
    W->>R: Hand off to Responder
    R-->>S: 200 OK { "received": true } (Response time: 42ms!)
    Note over S: Shopify marks webhook as SUCCESS.<br/>No timeouts or retries!
    W->>B: Continue Async Execution
    B->>B: Query Database, Generate Invoice, Dispatch Slack Notification
  end`
          },
          technicalDetails: 'Securing Webhooks with HMAC Verification in n8n:\n- The Webhook node allows you to set "Authentication" to "Header Auth" or use the Crypto node to compute `crypto.createHmac("sha256", secret).update(rawBody).digest("hex")`.\n- Compare the calculated hash against `headers["x-signature"]`. If they do not match, immediately terminate execution with a Stop and Error node.',
          workedExample: {
            scenario: 'Processing an incoming lead submission from a website form with immediate acknowledgment.',
            inputJson: {
              "headers": {
                "host": "automation.company.com",
                "x-forwarded-for": "198.51.100.24",
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
            title: 'Creating and Testing a Real Webhook Endpoint',
            goal: 'Set up a Webhook Trigger, test it with curl, and inspect the incoming payload.',
            steps: [
              {
                stepNumber: 1,
                title: 'Add a Webhook Trigger Node',
                instruction: 'Add a Webhook node. Set HTTP Method: `POST`, Path: `test-lead`. Under "Respond", choose "Using \'Respond to Webhook\' Node".'
              },
              {
                stepNumber: 2,
                title: 'Add a Respond to Webhook Node',
                instruction: 'Connect "Respond to Webhook" to the trigger. Set Response Code: `200`, and Response Body: `JSON` with `{{ JSON.stringify({ success: true, timestamp: $now.toISO() }) }}`.'
              },
              {
                stepNumber: 3,
                title: 'Listen for Test Event',
                instruction: 'Click "Listen for test event". Copy the Test URL (e.g. `http://localhost:5678/webhook-test/test-lead`).'
              },
              {
                stepNumber: 4,
                title: 'Send a Test Payload via Terminal',
                instruction: 'In your terminal, run:\n```bash\ncurl -X POST http://localhost:5678/webhook-test/test-lead \\\n  -H "Content-Type: application/json" \\\n  -d \'{"leadName": "Julian Gray", "budget": 20000}\'\n```\nInspect n8n: The canvas catches the event and displays the incoming body!'
              }
            ],
            expectedResult: 'The curl command outputs the JSON acknowledgment and n8n displays the received lead record.'
          },
          commonMistakes: [
            {
              mistake: 'Using the Test Webhook URL in a production third-party integration (e.g. inside Stripe settings).',
              consequence: 'As soon as the developer closes the n8n browser tab, all incoming webhooks return HTTP 404 Not Found.',
              correction: 'Always copy the PRODUCTION webhook URL and toggle the workflow to ACTIVE for live services.'
            }
          ],
          knowledgeCheck: [
            {
              id: 'q9-1',
              question: 'Why should you use "Respond Immediately" or a "Respond to Webhook" node early in workflows triggered by webhooks from services like Stripe or Shopify?',
              options: [
                'Because n8n cannot process more than 1 node without a response.',
                'Because external webhook senders enforce strict 5-10 second timeout windows; failing to acknowledge receipt promptly causes them to retry repeatedly, resulting in duplicate processing.',
                'It reduces your AWS electricity bill.',
                'It encrypts the payload with SSL.'
              ],
              correctIndex: 1,
              explanation: 'External webhook providers require rapid HTTP 2xx acknowledgment (typically within 5 to 10 seconds). Deferring the response while running slow downstream operations causes the sender to trigger retry storms.'
            }
          ],
          practicalChallenge: {
            prompt: 'Design a duplicate prevention (deduplication) layer for webhooks: If Stripe sends the exact same `event_id` twice within 10 minutes, how can your workflow detect and ignore the second delivery?',
            hints: ['Query a Redis cache or PostgreSQL database using `event_id`. If record exists, stop immediately; else insert and proceed.'],
            solutionNotes: 'This guarantees idempotency: `event_id` acts as the unique idempotency key.'
          },
          keyTakeaways: [
            'Test URLs only listen during interactive canvas debugging; Production URLs run 24/7 when the workflow is Active.',
            'Acknowledge webhooks rapidly to prevent external timeout retries.',
            'Always verify HMAC signatures when handling sensitive financial or e-commerce webhooks.'
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
      subtitle: 'Cron Syntax, Timezones, and Business Hours Routing',
      description: 'Master time-based automation. Understand cron expressions, timezone management, avoiding overlapping executions, interval jitter, and building business hours routing rules.',
      difficulty: 'Intermediate',
      estimatedMinutes: 50,
      lessons: [
        {
          id: 'lesson-10-1',
          moduleId: 'module-10',
          stageId: 'stage-2',
          title: 'Chronometric Scheduling & Timezone Engineering',
          subtitle: 'Cron expressions, interval design, and business calendar routing',
          difficulty: 'Intermediate',
          estimatedMinutes: 50,
          prerequisites: ['Module 3', 'Module 5'],
          whyItMatters: 'Every business runs on a clock: Daily morning reports at 8:00 AM, weekly payroll processing on Fridays at 5:00 PM, monthly invoice reconciliations on the 1st, or routing support tickets differently on weekends. If your automation doesn\'t account for timezones, daylight savings, or overlapping runs, reports will be sent at 3:00 AM or databases will lock under duplicate cron jobs.',
          relatableProblem: 'A London-based marketing team sets a daily report for "9:00 AM". When Daylight Savings occurs (BST to GMT), the workflow continues firing in UTC, meaning the report now arrives at 10:00 AM during their morning executive standup. Explicit timezone configuration fixes this permanently.',
          firstPrinciplesExplanation: 'The Schedule Trigger in n8n provides both friendly presets (e.g. "Every Day at 09:00") and standard 5-field cron syntax:\n```text\n┌───────────── minute (0 - 59)\n│ ┌───────────── hour (0 - 23)\n│ │ ┌───────────── day of month (1 - 31)\n│ │ │ ┌───────────── month (1 - 12)\n│ │ │ │ ┌───────────── day of week (0 - 6) (Sunday to Saturday)\n* * * * *\n```\nExamples:\n- `0 9 * * 1-5`: Mon-Fri at 9:00 AM.\n- `*/15 * * * *`: Every 15 minutes.\n- `0 0 1 * *`: First day of every month at midnight.\n\nCRUCIAL TIMEZONE RULE:\nIn Workflow Settings (accessible via the gear icon in the canvas), always set the workflow\'s Timezone explicitly (e.g. `America/New_York` or `Europe/London`). Never rely on the host container\'s default UTC clock for localized business schedules.',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Business Hours Evaluation Logic Flow',
            mermaidCode: `graph TD
  START[Schedule Trigger: Every 15 Minutes] --> TZ[Set Timezone: America/New_York]
  TZ --> CHECK{Is Business Hours?<br/>Mon-Fri, 9am - 5pm}
  CHECK -->|Yes| REG[Dispatch to Live Slack Channel]
  CHECK -->|No| QUEUE[Queue Record in 'After-Hours' Table]
  QUEUE --> DELAY[Notify On-Call Support via PagerDuty If Critical]

  style START fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC
  style CHECK fill:#1E293B,stroke:#F59E0B,stroke-width:2px,color:#F8FAFC
  style REG fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC
  style QUEUE fill:#0F172A,stroke:#8B5CF6,stroke-width:2px,color:#F8FAFC`
          },
          technicalDetails: 'Business Hours Expression Formula in n8n:\nTo evaluate if the current execution is within business hours in New York:\n```javascript\n{{ \n  (() => {\n    const now = $now.setZone("America/New_York");\n    const hour = now.hour;\n    const weekday = now.weekday; // 1 = Monday, 7 = Sunday\n    return weekday >= 1 && weekday <= 5 && hour >= 9 && hour < 17;\n  })()\n}}\n```\nReturns `true` during business hours and `false` during nights and weekends.',
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
            title: 'Building a Business-Hours Notification Gate',
            goal: 'Build a workflow that checks the current time and routes to different message channels.',
            steps: [
              {
                stepNumber: 1,
                title: 'Add a Schedule Trigger',
                instruction: 'Add a Schedule Trigger configured for every 30 minutes.'
              },
              {
                stepNumber: 2,
                title: 'Add an If Node with Time Expression',
                instruction: 'Connect an If node. In the value field, enter the business hours expression provided in the technical details above. Set Condition: Boolean Equals `true`.'
              },
              {
                stepNumber: 3,
                title: 'Wire the True and False Outputs',
                instruction: 'On True, connect an Edit Fields node with `channel: "#sales-live"`. On False, connect one with `channel: "#sales-night-digest"`.'
              },
              {
                stepNumber: 4,
                title: 'Test the Node',
                instruction: 'Click Test step. Confirm that the node correctly branches based on the current time in New York.'
              }
            ],
            expectedResult: 'The execution routes cleanly down the appropriate branch according to the clock.'
          },
          commonMistakes: [
            {
              mistake: 'Scheduling a heavy batch job every 1 minute when the workflow takes 90 seconds to run.',
              consequence: 'Runs overlap, leading to CPU saturation, database deadlocks, and container crashes.',
              correction: 'Increase the interval (e.g. to 5 minutes) or design sub-workflows that acquire a distributed lock.'
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
          title: 'Multi-System Integration & Database Synchronization',
          subtitle: 'Sheets vs Databases, Slack blocks, and atomic upserts',
          difficulty: 'Intermediate',
          estimatedMinutes: 70,
          prerequisites: ['Module 6', 'Module 8'],
          whyItMatters: 'Every business stores data in spreadsheets or databases and communicates via Slack, Discord, or email. The ability to listen to form submissions, look up customer records in a SQL database, perform an idempotent upsert (update if exists, insert if new), append a row to Google Sheets, and dispatch a formatted Slack message is the core skillset of freelance and enterprise automation developers.',
          relatableProblem: 'A company keeps track of VIP clients in Google Sheets. Whenever an automation runs, it inserts a new row. If a client submits their phone number twice, the sheet gets duplicate entries. Later, the billing department charges the client twice. By changing the operation from a naive "Append" to an "Upsert" based on email, duplicates are permanently prevented.',
          firstPrinciplesExplanation: 'When integrating multi-channel systems, consider the storage hierarchy:\n\n1. Google Sheets / Airtable: Excellent for non-technical team visibility and simple CRM trackers (< 100,000 rows). Drawback: Slow API rate limits (Google Sheets allows only ~60 read/write requests per user per minute).\n2. Relational Databases (PostgreSQL / MySQL): The industry standard for high-volume, ACID-compliant transactions. Supports millions of rows, sub-millisecond indexed lookups, and atomic `UPSERT` queries (`INSERT ... ON CONFLICT (id) DO UPDATE ...`).\n3. Messaging (Slack / Discord / Telegram): The operational alert layer. Use rich JSON formatting (Slack Block Kit) to provide interactive action buttons (e.g. "Approve Refund", "Reject Lead") directly inside chat channels.\n\nWHAT IS AN UPSERT?\n"Upsert" = UPDATE + INSERT. When synchronizing a customer into a database:\n- If the email does NOT exist -> INSERT a new row.\n- If the email ALREADY exists -> UPDATE the existing row with the new timestamp and metadata.',
          visualExplanation: {
            diagramType: 'mermaid',
            caption: 'Multi-System Lead Ingestion, SQL Upsert, and Alerting Architecture',
            mermaidCode: `graph TD
  IN[New Lead Ingestion: Webhook] --> V[Validate Email & Phone]
  V --> DB[(PostgreSQL: Upsert Lead Record<br/>ON CONFLICT email DO UPDATE)]
  DB --> SHEET[Google Sheets: Append Audit Log Row]
  SHEET --> SLACK[Slack: Post Rich Block Kit Alert<br/>With 'Claim Lead' Button]
  SLACK --> EMAIL[SendGrid / SMTP: Send Personalized Welcome Email]

  style IN fill:#0F172A,stroke:#3B82F6,stroke-width:2px,color:#F8FAFC
  style DB fill:#0F172A,stroke:#10B981,stroke-width:2px,color:#F8FAFC
  style SHEET fill:#1E293B,stroke:#F59E0B,stroke-width:2px,color:#F8FAFC
  style SLACK fill:#1E293B,stroke:#8B5CF6,stroke-width:2px,color:#F8FAFC
  style EMAIL fill:#0F172A,stroke:#EC4899,stroke-width:2px,color:#F8FAFC`
          },
          technicalDetails: 'SQL Upsert Pattern in n8n:\nIn the Postgres node, choose Operation: "Execute a SQL Query". Always use parameterized expressions to prevent SQL injection:\n```sql\nINSERT INTO leads (email, full_name, budget, status, updated_at)\nVALUES ($1, $2, $3, $4, NOW())\nON CONFLICT (email) \nDO UPDATE SET \n  budget = EXCLUDED.budget,\n  status = EXCLUDED.status,\n  updated_at = NOW()\nRETURNING id, status;\n```\nParameters mapping: `{{ $json.email }}`, `{{ $json.fullName }}`, `{{ $json.budget }}`, `{{ $json.status }}`.',
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
            title: 'Building an Idempotent Multi-Channel Notification Flow',
            goal: 'Accept a customer lead, format a Slack message, append to a spreadsheet, and send a confirmation email.',
            steps: [
              {
                stepNumber: 1,
                title: 'Simulate Incoming Lead',
                instruction: 'Add a Code node that returns: `{ "name": "Alex Mercer", "email": "alex@mercer.dev", "plan": "Enterprise" }`.'
              },
              {
                stepNumber: 2,
                title: 'Add Google Sheets or Mock Storage Node',
                instruction: 'Add an Edit Fields node simulating a database upsert returning `{ "dbId": 1092, "actionTaken": "INSERTED" }`.'
              },
              {
                stepNumber: 3,
                title: 'Format Multi-Channel Notifications',
                instruction: 'Add an Edit Fields node that formats both a Slack message string and an HTML email body using `{{ $json.name }}` and `{{ $json.plan }}`.'
              },
              {
                stepNumber: 4,
                title: 'Verify Results',
                instruction: 'Execute the pipeline and inspect the output JSON to verify that personalization values populated cleanly without syntax errors.'
              }
            ],
            expectedResult: 'A fully mapped multi-channel payload ready for delivery.'
          },
          commonMistakes: [
            {
              mistake: 'Using unparameterized raw SQL string concatenation like `INSERT INTO users VALUES (\'\' + $json.name + \'\')`.',
              consequence: 'Severe SQL injection vulnerability that allows attackers to delete or dump your database.',
              correction: 'Always use parameterized SQL bindings ($1, $2, etc.) or n8n\'s built-in "Insert/Update" UI operations.'
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
