# Invoice Star: Full-Stack Product Ownership

## Short version

Invoice Star is a full-stack invoicing and billing product that I built across mobile, web, backend, infrastructure, billing, and media processing. I used feature-first Clean Architecture in Flutter, React and TypeScript for the public web experience, ASP.NET Core with PostgreSQL for the API, RevenueCat and WebSockets for billing state, RabbitMQ and Cloudflare R2 for asynchronous media processing, and Docker, GitHub Actions, Dokploy, and separate environments for deployment.

## Detailed story in my voice

So, Invoice Star began as an invoicing application, but I knew that it would not remain a simple mobile client. Authentication, subscriptions, billing, invoice sharing, payments, refunds, media uploads, and e-invoicing all needed to evolve, and they would not necessarily change at the same time.

Because I was building the product solo, I wanted the boundaries to be clear. If I changed subscription handling, I did not want to rewrite unrelated invoice screens. If I changed e-invoicing, I wanted that implementation to remain behind an interface instead of spreading its requirements across the application.

### Flutter client

For the mobile client, I chose feature-first Clean Architecture. Each feature owns its relevant layers and uses a Cubit through `flutter_bloc` for state management. I used `get_it` for dependency injection, `auto_route` for navigation, and Dio for API communication. Authentication and subscription checks are implemented as routing guards, which means screens do not each need to reproduce the same access logic.

The application supports English and Arabic. The interface uses Forui, and the client is designed around independent features rather than one large shared presentation layer.

The benefit of the routing and dependency boundaries is that features remain replaceable. For example, the subscription guard and billing synchronization can change without requiring unrelated features to be rewritten. The ZATCA e-invoicing work is also designed behind a pluggable interface, although that integration is still in progress.

### Backend

I built the backend using ASP.NET Core 10 with PostgreSQL and Entity Framework Core. It provides the REST API used by the client and includes JWT authentication with support for multiple device sessions.

The backend also uses RabbitMQ for work that should not block the request path, WebSockets for real-time updates, and Cloudflare R2 for object storage. My deployment style is container-based, using Docker on a self-hosted VPS rather than AWS serverless services.

### Billing

For subscription billing, RevenueCat is the source of truth. Instead of making the client repeatedly poll the server to check whether the subscription changed, the updated billing state is pushed to the clients through WebSockets.

The reason I preferred this design is that subscription state affects access to the application. I wanted the routing layer to react to the current state without every screen independently asking whether the user is subscribed.

### Media-processing pipeline

Users can upload receipt images and payment proofs. Processing those images inside the original API request would make the request slower, and storing the original full-size files permanently would increase storage cost.

The client uploads the full image to storage. The API then places an `AssetProcessingMessage` on RabbitMQ. A background consumer processes that message and creates two derived versions: a thumbnail and a compressed full-size image. The processed files are written to Cloudflare R2 and are served through presigned download URLs.

This keeps the heavy image work outside the request path. It also reduces storage cost compared with retaining only raw, full-size uploads, while presigned URLs provide controlled access to the stored assets.

### React and TypeScript web application

Invoice Star also has a public web application built with React 19 and TypeScript. It uses Vite, Tailwind CSS, and `react-router-dom`, and includes an ErrorBoundary and SEO support.

The web application contains the public landing site and the shareable invoice and receipt pages that customers open using a link. It also contains the privacy, terms, help, and account-deletion pages. Like the mobile application, it supports both English and Arabic.

The web application is containerized with Docker and served behind nginx. This is production React and TypeScript work on the same product as the Flutter client and ASP.NET Core backend, not a separate tutorial or sample project.

### Deployment and operations

GitHub Actions pipelines cover all three surfaces of the product:

- The ASP.NET Core API, including production and development image workflows.
- The React web application, including production and development image workflows.
- The mobile release path.

The backend and database run in Docker, deployment is managed through Dokploy, and there is a separate development environment. This means I do not only build the product code. I also own how the API, website, and mobile client are built and released.

### Result and reflection

The result is one product with three real surfaces: mobile, web, and API. The feature boundaries make the client modules easier to replace or evolve, the billing state can update without polling, and the media pipeline keeps expensive work out of the request path.

What I learned is that designing the seams early costs some time at the beginning, but it saves much more work when the product starts expanding. Guard-based routing and dependency injection gave me a practical structure for reusable modules without turning the application into an unnecessarily complicated framework.

## Technical inventory

- Flutter and Dart mobile client.
- Feature-first Clean Architecture.
- `flutter_bloc` with a Cubit per feature.
- `get_it` dependency injection.
- `auto_route` with authentication and subscription guards.
- Dio API client.
- English and Arabic interfaces.
- React 19 and TypeScript web application.
- Vite, Tailwind CSS, and `react-router-dom`.
- ASP.NET Core 10 REST API.
- PostgreSQL and Entity Framework Core.
- JWT authentication with multi-device sessions.
- RabbitMQ asynchronous processing.
- WebSocket updates.
- RevenueCat billing.
- Cloudflare R2 object storage and presigned URLs.
- Docker, GitHub Actions, Dokploy, and a self-hosted VPS.
- Separate development and production workflows.

## Best questions for this story

- Tell me about the most complete product you have built.
- Tell me about a system you designed from the beginning.
- How do you structure a large Flutter application?
- Tell me about your backend or full-stack experience.
- How have you used queues or background workers?
- How do you keep billing state synchronized?
- Tell me about a technical trade-off you made early in a product.

## Factual boundaries

- ZATCA e-invoicing and cryptographic signing are in progress, not completed production features.
- React is the web stack. Do not describe the web application as Vue.
- EC2 and Cloudflare R2 are hands-on cloud experience. Do not claim production Lambda, API Gateway, Step Functions, or another AWS serverless stack.
- Claude Code and Codex are development tools in my workflow. This is not evidence that Invoice Star contains LLM, RAG, evaluation, or agent features.
- The current material says compression significantly reduces storage cost, but it does not contain a precise percentage.

