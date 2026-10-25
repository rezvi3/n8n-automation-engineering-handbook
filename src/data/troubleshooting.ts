import { TroubleshootingCase } from '../types/curriculum';

export const troubleshootingCases: TroubleshootingCase[] = [
  {
    "id": "tb-1",
    "category": "HTTP & APIs",
    "symptom": "HTTP 429 Too Many Requests returned by external API",
    "errorCode": "429 Too Many Requests",
    "rootCause": "The workflow is sending requests faster than the API rate limit allows (e.g., sending 100 requests/second to an endpoint that only allows 10/second).",
    "diagnosticSteps": [
      "Check the external API documentation for rate limits (requests per second or minute).",
      "Inspect the HTTP response headers in n8n for 'Retry-After' or 'X-RateLimit-Reset'.",
      "Check whether multiple workflow executions are running concurrently."
    ],
    "concreteFix": "Insert a 'Split In Batches' node configured to 10-25 items, followed by a 'Wait' node set to 1,000ms. Enable 'Retry On Fail' inside the HTTP Request node options with 3 retries and exponential backoff.",
    "codeOrExpressionFix": "// In HTTP Request Options -> Batching or Wait node: 1000ms",
    "preventativeMeasures": "Always design batch throttling and exponential backoff for high-volume API integrations."
  },
  {
    "id": "tb-2",
    "category": "Expressions & Data",
    "symptom": "TypeError: Cannot read properties of undefined (reading 'email')",
    "errorCode": "TypeError: Cannot read properties of undefined",
    "rootCause": "An expression like $json.customer.email attempted to access 'email' on an item where 'customer' was null, missing, or undefined.",
    "diagnosticSteps": [
      "Open the failing node and inspect the Input Data pane.",
      "Check if any incoming item is missing the 'customer' object.",
      "Identify which specific record caused the failure."
    ],
    "concreteFix": "Use JavaScript optional chaining (?.) and nullish coalescing (??) in your expression: {{$json.customer?.email ?? 'no-email@domain.com'}}.",
    "codeOrExpressionFix": "{{ $json?.customer?.email ?? 'N/A' }}",
    "preventativeMeasures": "Always assume external API payloads can have optional or missing fields; use optional chaining across all nested properties."
  },
  {
    "id": "tb-3",
    "category": "Execution & Memory",
    "symptom": "FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory",
    "errorCode": "OOM (Out Of Memory)",
    "rootCause": "A node attempted to load an enormous payload (e.g. 50,000 records or a 200MB binary file) into single-thread V8 memory.",
    "diagnosticSteps": [
      "Check the volume of items returned by the trigger or database query.",
      "Check memory usage of the n8n Docker container with 'docker stats'.",
      "Look for unbounded SELECT * queries."
    ],
    "concreteFix": "Paginate database queries with LIMIT 500. Configure Docker environment variable: NODE_OPTIONS='--max-old-space-size=4096' to increase V8 heap size, or switch to Queue Mode.",
    "codeOrExpressionFix": "environment:\n  - NODE_OPTIONS=--max-old-space-size=4096",
    "preventativeMeasures": "Never fetch full database tables into memory; stream or batch records."
  },
  {
    "id": "tb-4",
    "category": "Webhooks & Network",
    "symptom": "External service reports 'Webhook Delivery Failed: 404 Not Found'",
    "errorCode": "404 Not Found",
    "rootCause": "The external service was configured with the Test Webhook URL (/webhook-test/...) instead of the Production Webhook URL (/webhook/...), or the workflow is not set to ACTIVE.",
    "diagnosticSteps": [
      "Check if the workflow toggle in the top right of the canvas is set to 'Active'.",
      "Check the URL configured in the sending service: Does it contain '-test'?",
      "Verify that WEBHOOK_URL environment variable matches your public domain."
    ],
    "concreteFix": "Copy the Production URL from the Webhook node, update the webhook setting in the sending service, and toggle the workflow to Active.",
    "codeOrExpressionFix": "WEBHOOK_URL=https://automation.yourdomain.com/",
    "preventativeMeasures": "Document the strict rule: Test URLs are for canvas debugging only; Production URLs are for live deployments."
  },
  {
    "id": "tb-5",
    "category": "Credentials & Auth",
    "symptom": "HTTP 401 Unauthorized / Token Expired on Google or HubSpot nodes",
    "errorCode": "401 Unauthorized",
    "rootCause": "The OAuth 2.0 access token has expired and n8n was unable to refresh it because the refresh token was revoked or N8N_ENCRYPTION_KEY changed.",
    "diagnosticSteps": [
      "Open the Credentials modal in n8n and click 'Reconnect / Sign In'.",
      "Check if N8N_ENCRYPTION_KEY in .env was modified or regenerated.",
      "Check if the user account was downgraded or password changed."
    ],
    "concreteFix": "Re-authenticate the OAuth2 credential in n8n. If running in Queue Mode, verify that N8N_ENCRYPTION_KEY is identical across all workers.",
    "codeOrExpressionFix": "export N8N_ENCRYPTION_KEY=\"your_consistent_64char_key\"",
    "preventativeMeasures": "Back up your N8N_ENCRYPTION_KEY in a secure enterprise vault."
  },
  {
    "id": "tb-6",
    "category": "Expressions & Data",
    "symptom": "Expression error: 'No item found for index X'",
    "errorCode": "ItemIndexError",
    "rootCause": "A downstream node referenced $('Node').item.json, but the upstream node output fewer items than the current node due to an unaligned filter or split.",
    "diagnosticSteps": [
      "Check item counts between the referenced node and the current node.",
      "Check if a Split Out or Code node changed the total number of items without preserving pairedItem."
    ],
    "concreteFix": "Use $('Node').first().json if you only need global metadata from the first item, or attach 'pairedItem: { item: index }' inside the Code node.",
    "codeOrExpressionFix": "{{ $('Trigger').first().json.companyName }}",
    "preventativeMeasures": "Always return pairedItem metadata when transforming item arrays in the Code node."
  },
  {
    "id": "tb-7",
    "category": "HTTP & APIs",
    "symptom": "ECONNREFUSED / ETIMEDOUT when calling an internal microservice",
    "errorCode": "ECONNREFUSED",
    "rootCause": "The host name or IP address is incorrect, or the microservice is on a different Docker bridge network without port mapping.",
    "diagnosticSteps": [
      "Test connectivity from inside the container: 'docker exec -it n8n ping microservice'.",
      "Check if using 'localhost' instead of the Docker service name (e.g. 'postgres' or 'host.docker.internal')."
    ],
    "concreteFix": "Replace 'http://localhost:8080' with 'http://host.docker.internal:8080' or link both containers on a shared Docker network.",
    "codeOrExpressionFix": "networks:\n  - internal_app_net",
    "preventativeMeasures": "Use Docker service names on shared networks rather than localhost for inter-container communication."
  },
  {
    "id": "tb-8",
    "category": "AI & LLM Nodes",
    "symptom": "AI Agent gets stuck in infinite loop until 'Max Iterations Reached'",
    "errorCode": "MaxIterationsError",
    "rootCause": "The tool descriptions provided to the agent are ambiguous or overlapping, causing the LLM to repeatedly invoke tools without converging on a final answer.",
    "diagnosticSteps": [
      "Inspect execution logs to see which tools were repeatedly called.",
      "Check the system prompt: Did you instruct the agent on when to stop?",
      "Review tool descriptions for overlapping responsibilities."
    ],
    "concreteFix": "Make tool descriptions hyper-specific with explicit input parameters, and set 'Max Iterations' to 5 in Agent settings.",
    "codeOrExpressionFix": "Tool Description: 'Use this tool ONLY to lookup user credit balance by email. Do not use for refunds.'",
    "preventativeMeasures": "Write mutually exclusive, explicit descriptions for all agent tools."
  },
  {
    "id": "tb-9",
    "category": "Execution & Memory",
    "symptom": "Database locks: 'deadlock detected' in PostgreSQL during concurrent runs",
    "errorCode": "40P01 Deadlock",
    "rootCause": "Multiple concurrent workflow executions are updating the exact same database rows in reverse order.",
    "diagnosticSteps": [
      "Check PostgreSQL logs for 'Process X waits for ShareLock on transaction Y'.",
      "Inspect the order in which tables are updated across workflows."
    ],
    "concreteFix": "Ensure all workflows acquire locks and update tables in the exact same deterministic order, or use PostgreSQL 'SELECT FOR UPDATE' with explicit ordering.",
    "codeOrExpressionFix": "SELECT * FROM orders WHERE id = $1 FOR UPDATE;",
    "preventativeMeasures": "Enforce consistent table access ordering and keep transactions short."
  },
  {
    "id": "tb-10",
    "category": "Webhooks & Network",
    "symptom": "Stripe/Shopify retries webhooks 10+ times, causing duplicate workflow runs",
    "errorCode": "Webhook Timeout Retry",
    "rootCause": "The n8n workflow takes longer than 10 seconds to finish before responding to the webhook, causing the sender to assume packet loss.",
    "diagnosticSteps": [
      "Check total workflow execution time in the Executions tab.",
      "Check Webhook node 'Respond' setting: Is it set to 'When Last Node Finishes'?"
    ],
    "concreteFix": "Set Webhook node 'Respond' to 'Immediately' or insert a 'Respond to Webhook' node before any slow operations (AI, emails, heavy SQL).",
    "codeOrExpressionFix": "Webhook Node -> Respond: 'Immediately'",
    "preventativeMeasures": "Always acknowledge incoming webhooks within 500ms and process business logic asynchronously."
  },
  {
    "id": "tb-11",
    "category": "Credentials & Auth",
    "symptom": "Git push failed: 'fatal: could not read Username for https://github.com'",
    "errorCode": "Git Auth Error",
    "rootCause": "The GitHub node or Git CLI was configured without a Personal Access Token with 'repo' scope.",
    "diagnosticSteps": [
      "Check GitHub token permissions in GitHub Settings -> Developer Settings.",
      "Verify the token has not expired."
    ],
    "concreteFix": "Generate a fine-grained GitHub PAT with read/write access to the repository and attach it in n8n Credentials.",
    "codeOrExpressionFix": "Authorization: token ghp_yourSecretPersonalAccessToken",
    "preventativeMeasures": "Set calendar reminders before corporate PAT tokens expire."
  },
  {
    "id": "tb-12",
    "category": "Expressions & Data",
    "symptom": "Date offset bug: Timestamps are 4 or 5 hours off from actual business time",
    "errorCode": "TimezoneMismatch",
    "rootCause": "Workflow is running on container UTC time instead of the localized business timezone.",
    "diagnosticSteps": [
      "Check Workflow Settings (gear icon) -> Timezone.",
      "Check Docker environment variable GENERIC_TIMEZONE."
    ],
    "concreteFix": "Set Workflow Settings Timezone to 'America/New_York' (or local zone), and use $now.setZone('America/New_York') in expressions.",
    "codeOrExpressionFix": "{{ $now.setZone('America/New_York').toFormat('yyyy-MM-dd HH:mm') }}",
    "preventativeMeasures": "Always set the workflow timezone explicitly on creation."
  },
  {
    "id": "tb-13",
    "category": "HTTP & APIs",
    "symptom": "HTTP 400 Bad Request: 'Missing required field in JSON payload'",
    "errorCode": "400 Bad Request",
    "rootCause": "The HTTP Request node body was sent as a string literal instead of valid JSON, or key names contained typos.",
    "diagnosticSteps": [
      "Switch HTTP Request node 'Body Content Type' to 'JSON'.",
      "Inspect the outgoing raw request in the execution view.",
      "Validate the JSON payload with a linter."
    ],
    "concreteFix": "Use the visual parameter builder or ensure raw JSON is valid with JSON.stringify().",
    "codeOrExpressionFix": "{{ JSON.stringify({ email: $json.email, name: $json.name }) }}",
    "preventativeMeasures": "Test JSON payloads with httpbin.org before sending to live production APIs."
  },
  {
    "id": "tb-14",
    "category": "Execution & Memory",
    "symptom": "Docker container exits with code 137",
    "errorCode": "Exit 137 (OOMKilled)",
    "rootCause": "Linux kernel Out-Of-Memory killer terminated the n8n container because it exceeded the host or container RAM limit.",
    "diagnosticSteps": [
      "Run 'docker inspect n8n | grep -i oom'.",
      "Review system logs with 'dmesg -T | grep -i oom'."
    ],
    "concreteFix": "Allocate more RAM to the container in docker-compose.yml: mem_limit: 4g, and enable workflow execution data pruning.",
    "codeOrExpressionFix": "deploy:\n  resources:\n    limits:\n      memory: 4096M",
    "preventativeMeasures": "Monitor container memory with Prometheus / Grafana and set alerts at 80% RAM."
  },
  {
    "id": "tb-15",
    "category": "AI & LLM Nodes",
    "symptom": "AI model returns hallucinated JSON keys not specified in prompt",
    "errorCode": "SchemaDrift",
    "rootCause": "Model temperature is above 0.0 or the system prompt did not enforce JSON Schema mode.",
    "diagnosticSteps": [
      "Check temperature in the Model sub-node.",
      "Check if JSON mode / Structured Outputs is enabled."
    ],
    "concreteFix": "Set Temperature to 0.0, use models with native JSON Schema support (e.g. gpt-4o, claude-3-5-sonnet), and validate with a Code node schema parser.",
    "codeOrExpressionFix": "temperature: 0.0\nresponse_format: { type: 'json_object' }",
    "preventativeMeasures": "Never feed unparsed LLM output directly into database write operations."
  },
  {
    "id": "tb-16",
    "category": "Webhooks & Network",
    "symptom": "Invalid HMAC signature error: 'Signature verification failed'",
    "errorCode": "HMACMismatch",
    "rootCause": "The HMAC signature was calculated using parsed JSON rather than the exact raw unparsed byte body, or trailing whitespace differed.",
    "diagnosticSteps": [
      "Check if the Webhook node has 'Raw Body' enabled in options.",
      "Check if the secret key has leading or trailing spaces."
    ],
    "concreteFix": "Enable 'Raw Body' in the Webhook node and pass $json.rawBody directly to the Crypto node HMAC calculation.",
    "codeOrExpressionFix": "crypto.createHmac('sha256', secret).update($json.rawBody).digest('hex')",
    "preventativeMeasures": "Always verify cryptographic signatures against raw unparsed payload buffers."
  },
  {
    "id": "tb-17",
    "category": "Credentials & Auth",
    "symptom": "Salesforce / HubSpot API: 'INSUFFICIENT_ACCESS_OR_READONLY'",
    "errorCode": "403 Forbidden",
    "rootCause": "The API user account lacks write permissions for the target object (e.g. Deals or Custom Objects).",
    "diagnosticSteps": [
      "Inspect user roles in Salesforce/HubSpot administration settings.",
      "Verify connected OAuth scopes include write/edit permissions."
    ],
    "concreteFix": "Grant the integration user required object permissions in the target CRM and re-authorize OAuth.",
    "codeOrExpressionFix": "Required Scopes: crm.objects.deals.write, crm.objects.contacts.write",
    "preventativeMeasures": "Audit CRM role permissions before running live sync workflows."
  },
  {
    "id": "tb-18",
    "category": "Expressions & Data",
    "symptom": "Array items joined as string: '[object Object],[object Object]'",
    "errorCode": "ObjectStringCoercion",
    "rootCause": "JavaScript attempted to concatenate an array of objects into a string without mapping properties or using JSON.stringify().",
    "diagnosticSteps": [
      "Check where the variable is interpolated: Did you write 'Items: ' + $json.items?",
      "Inspect the data type of the property."
    ],
    "concreteFix": "Use .map() and .join(): {{$json.items.map(i => i.name).join(', ')}} or JSON.stringify($json.items, null, 2).",
    "codeOrExpressionFix": "{{ $json.items.map(i => i.name).join(', ') }}",
    "preventativeMeasures": "Never concatenate raw objects directly into message strings without formatting."
  },
  {
    "id": "tb-19",
    "category": "Execution & Memory",
    "symptom": "Workflow execution history shows 'Running' indefinitely for hours",
    "errorCode": "StuckExecution",
    "rootCause": "An external HTTP Request or Code node did not specify a timeout, and the remote server hung without closing the TCP connection.",
    "diagnosticSteps": [
      "Check execution details to identify the stuck node.",
      "Check if Timeout settings are configured."
    ],
    "concreteFix": "In the HTTP Request node, configure Options -> 'Timeout' to 30,000ms (30 seconds). In Workflow Settings, set a global execution timeout (e.g. 300 seconds).",
    "codeOrExpressionFix": "Options -> Timeout: 30000",
    "preventativeMeasures": "Always configure sensible timeouts on all network operations."
  },
  {
    "id": "tb-20",
    "category": "HTTP & APIs",
    "symptom": "SSL Certificate Error: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE'",
    "errorCode": "SelfSignedSSLError",
    "rootCause": "Target internal API is using a self-signed SSL certificate not recognized by the default Node.js certificate trust store.",
    "diagnosticSteps": [
      "Check if calling an internal company domain with private CA.",
      "Verify if certificate has expired."
    ],
    "concreteFix": "In HTTP Request node Options, toggle 'Ignore SSL Issues' to ON (for internal dev only) or install the root CA cert into the n8n Docker image with NODE_EXTRA_CA_CERTS.",
    "codeOrExpressionFix": "environment:\n  - NODE_EXTRA_CA_CERTS=/etc/ssl/certs/internal-ca.crt",
    "preventativeMeasures": "Install corporate CA certificates into the Docker container rather than ignoring SSL in production."
  }
];
