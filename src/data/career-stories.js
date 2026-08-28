// Ordering and presentation metadata for the Markdown stories in /career-stories.
// The story title, lead, and body stay in the Markdown files as the prose source.

export const careerStories = [
  {
    source: "01-khedma-reliability-under-client-constraint.md",
    slug: "khedma-reliability-under-client-constraint",
    theme: "Reliability and constraints",
    tags: ["Android", "Kiosks", "Telemetry"],
    cardSummary:
      "Khedma runs on unattended Android kiosks for 24 to 48 hours. When the client rejected Device Owner and MDM because they wanted to keep control of their hardware, I built a separate-process foreground service that reports app, display, and printer problems to the server.",
  },
  {
    source: "02-invoice-star-full-stack-product-ownership.md",
    slug: "invoice-star-full-stack-product-ownership",
    theme: "Full-stack ownership",
    tags: ["Flutter", "React", "ASP.NET Core"],
    cardSummary:
      "I built Invoice Star across Flutter, React and TypeScript, ASP.NET Core, PostgreSQL, billing, media processing, and deployment. The result is one product with mobile, web, and API surfaces that can change independently.",
  },
  {
    source: "03-roze-moon-end-to-end-delivery.md",
    slug: "roze-moon-end-to-end-delivery",
    theme: "Product delivery",
    tags: ["Architecture", "Payments", "CI/CD"],
    cardSummary:
      "When I joined Tuwaiq, there was no established mobile architecture or release process. I took ownership of Roze Moon from Flutter structure and UI through payments, notifications, code reviews, CI/CD, and both store releases.",
  },
  {
    source: "04-undocumented-production-vps-takeover.md",
    slug: "undocumented-production-vps-takeover",
    theme: "Infrastructure ownership",
    tags: ["Docker", "VPS", "Deployments"],
    cardSummary:
      "The team depended on an undocumented production VPS with no CI/CD or development environment. I containerized the .NET backend and database, added Dokploy and a separate development environment, then automated deployments without taking production down.",
  },
  {
    source: "06-native-android-debugging.md",
    slug: "native-android-debugging",
    theme: "Native debugging",
    tags: ["Kotlin", "Platform Channels", "USB"],
    cardSummary:
      "I use two native Android examples: a camera freeze on budget devices and a USB printer connection that could drop during unattended kiosk use. In both cases, the problem crossed the Flutter boundary, so I traced it into the native layer and fixed it there.",
  },
];
