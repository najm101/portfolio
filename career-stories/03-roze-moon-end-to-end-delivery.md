# Roze Moon: End-to-End Mobile Product Delivery

## Short version

I joined Tuwaiq as a junior mobile engineer when there was no established mobile team, architecture, or release process. I took ownership of Roze Moon from Flutter architecture and UI implementation through JWT APIs, Payfort payments, Firebase notifications, GitHub standards, code reviews, CI/CD, and App Store and Play Store delivery.

## Detailed story in my voice

When I joined Tuwaiq, I joined as a junior mobile engineer, but there was no established mobile team, process, or consistent architecture. Roze Moon was becoming a production e-commerce application, so I gradually took responsibility for the full mobile delivery instead of working only on isolated screens.

### Establishing the application structure

As the codebase started growing, state and business behavior could easily become mixed into the widgets. I did not want every new feature to make the application harder to understand, so I chose Clean Architecture with Bloc.

I separated the code into data, domain, and presentation layers, wrote an architecture guide, and reinforced the structure through pull-request reviews. The codebase grew beyond 10 screens without returning to scattered state or losing the layer boundaries.

One thing I would change is introducing feature flags earlier. The need became clear when a feature had to be released incrementally, but feature flags were not part of the original structure.

### Building the product experience

I developed responsive Flutter interfaces from high-fidelity designs and worked on making the implementation closely match the intended UI. I integrated secure REST APIs using JWT authentication and used caching and lazy loading where they were needed for performance.

I also used analytics to refine the UI and user experience and support retention improvements. There is no recorded retention percentage in the current material, so I describe the direction and the work without inventing a metric.

Firebase Cloud Messaging was used for push notifications. I also led the GitHub repository management by introducing commit standards and using code reviews to keep the implementation consistent.

### Payfort payment integration

The Payfort payment contract was owned by the backend team rather than the Flutter team, so the integration required coordination rather than only client-side implementation.

I worked with the backend team to align on the API contract and JWT flow. I implemented the mobile integration, covered payment failure states with integration tests, handled token refresh, and handled gateway errors. The payment integration shipped with no payment-processing errors reported during the first month after launch.

The first implementation did not include graceful retry behavior for transient network failures. If I were building it again, I would include that retry strategy from the first version rather than adding it after the basic gateway flow.

### Automating releases

The original release process was manual, error-prone, and unpredictable. I built a CI/CD pipeline that handled the mobile build, signing, and store-submission process for both the App Store and Play Store.

This reduced the release cycle and removed manual build errors. There is no defensible percentage for the reduction, so I describe it as a faster and more reliable release process rather than attaching a number.

The first version of the pipeline did not have a proper failure-notification layer. This meant a failed pipeline could remain silent. If I built it again, failure alerts would be included from the beginning.

### Result

Roze Moon shipped to both the App Store and Play Store with active users. The recorded story material states that there were no critical post-launch incidents. The application had a consistent architecture, integrated payments and notifications, repository standards, review practices, and an automated release path.

The important part for me is that I entered the role with a junior title, but the work developed into end-to-end product ownership. I was making decisions about architecture, integration, repository quality, release automation, and production delivery rather than only implementing assigned UI tasks.

### Reflection

I would maintain Architecture Decision Records from the beginning. The architecture guide helped, but a living ADR would make it clearer why each decision was made and would reduce reliance on verbal or tribal knowledge when another developer joins.

I would also introduce feature flags, transient-failure retry behavior, and pipeline alerts earlier. These were not theoretical improvements. They were gaps that became visible as the application and the release process matured.

## Technical inventory

- Flutter and Dart.
- Clean Architecture with data, domain, and presentation layers.
- Bloc state management.
- Responsive interfaces based on high-fidelity designs.
- JWT-secured REST API integration.
- Caching and lazy loading.
- Payfort payment gateway.
- Firebase Cloud Messaging.
- Analytics-informed UI and UX refinement.
- GitHub repository management, commit standards, and PR reviews.
- CI/CD for App Store and Play Store delivery.

## Best questions for this story

- Tell me about a product you owned end-to-end.
- Tell me about a time your responsibilities grew beyond your title.
- How do you structure a production Flutter application?
- Tell me about a complex third-party integration.
- How have you improved a release process?
- Tell me about a technical decision you would make differently now.

## Factual boundaries

- Always describe my total production-app count as 6+.
- Do not invent a percentage for release-cycle improvement or retention improvement.
- The recorded payment result is zero payment-processing errors during the first month after launch.
- The recorded overall result is zero critical post-launch incidents.
- The first release pipeline did not include failure notifications.
- Retry handling for transient payment-network failures was a later lesson, not a capability claimed for the first version.

