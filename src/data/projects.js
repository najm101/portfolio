// Each project becomes one card with a swipeable screenshot gallery.
//
// `frame` controls how each screenshot is presented:
//   "phone"  -> raw screen capture wrapped in our phone bezel
//   "tablet" -> raw screen capture wrapped in our tablet bezel
//   "framed" -> image already includes a device frame, shown as-is
//
// To add or change screenshots: drop files into src/assets/img/<slug>/ and list
// their filenames (in order) in that project's `images` array, then `npm run build`.

export const projects = [
  {
    slug: "roze-moon",
    name: "Roze Moon",
    tagline: "E-commerce app, iOS & Android",
    category: "E-commerce",
    period: "Jul 2024 – Present",
    status: "live",
    frame: "framed",
    blurb:
      "A polished shopping experience built on Clean Architecture and Bloc, with pixel-perfect responsive UIs from high-fidelity designs.",
    points: [
      "Secure REST APIs with JWT auth; caching and lazy loading for performance.",
      "Payfort payment gateway and Firebase Cloud Messaging push notifications.",
      "Led repo management with enforced commit standards and reviews.",
    ],
    tags: ["Flutter", "Bloc", "Clean Architecture", "JWT", "Payfort", "FCM"],
    stores: [
      { type: "app-store", label: "App Store", url: "https://apps.apple.com/us/app/roze-moon/id6739536345" },
      { type: "play-store", label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.rozemoon.app" },
    ],
    images: ["01.jpg", "02.jpg", "03.jpg"],
  },
  {
    slug: "invoice-star",
    name: "Invoice Star",
    tagline: "Full-stack invoicing & billing",
    category: "Fintech",
    period: "2026 – Present",
    status: "live",
    frame: "phone",
    blurb:
      "A feature-first invoicing app backed by a self-built ASP.NET Core 10 + PostgreSQL API, with real-time billing pushed to clients over WebSockets.",
    points: [
      "Client: flutter_bloc (Cubit), get_it, auto_route guards, Dio, Forui, en/ar localization.",
      "Backend: JWT multi-device sessions, RabbitMQ async processing, Cloudflare R2 storage.",
      "RevenueCat as billing source of truth; invoice reconciliation and pluggable ZATCA e-invoicing.",
    ],
    tags: ["Flutter", "Cubit", "ASP.NET Core", "PostgreSQL", "RevenueCat", "WebSockets"],
    stores: [
      { type: "app-store", label: "App Store", url: "https://apps.apple.com/app/id6757845435" },
      { type: "web", label: "invoicestar.online", url: "https://invoicestar.online" },
    ],
    images: ["01.png", "02.png", "03.png", "04.png", "05.png"],
  },
  {
    slug: "khedma",
    name: "Khedma",
    tagline: "Self-service POS donations",
    category: "POS / Kiosk",
    period: "Aug 2025 – Present",
    status: "live",
    frame: "tablet",
    blurb:
      "A self-service point-of-sale app that makes donating quick and fully autonomous — built for kiosks, charity events, and standalone tablets.",
    points: [
      "Browse donation programs, pick a preset or custom amount, and complete the flow by touch.",
      "Designed for unattended kiosk use with a streamlined, distraction-free journey.",
    ],
    tags: ["Flutter", "Kiosk", "POS", "Touch UI"],
    stores: [
      { type: "play-store", label: "Play Store", url: "https://play.google.com/store/apps/details?id=online.amaal.khedma" },
      { type: "github", label: "Releases", url: "https://github.com/najm101/khedma-releases" },
    ],
    images: ["01.png", "02.png", "03.png"],
  },
  {
    slug: "tawqet",
    name: "Tawqet",
    tagline: "Attendance app for HR",
    category: "HR",
    period: "Feb 2025 – Present",
    status: "live",
    frame: "framed",
    blurb:
      "A location-aware attendance app that registers check-in and check-out automatically — no manual punch — and syncs to the HR platform in real time.",
    points: [
      "Ties each record to per-employee settings.",
      "Automatically detects and surfaces travel / commute delays for HR review.",
    ],
    tags: ["Flutter", "Geolocation", "Background Services", "Real-time Sync"],
    stores: [
      { type: "app-store", label: "App Store", url: "https://apps.apple.com/app/id6742491484" },
      { type: "play-store", label: "Play Store", url: "https://play.google.com/store/apps/details?id=online.amaal.app" },
    ],
    images: ["01.png", "02.png", "03.png"],
  },
  {
    slug: "wgbah",
    name: "Wgbah",
    tagline: "Internal food ordering",
    category: "Internal tools",
    period: "Apr 2025 – Present",
    status: "live",
    frame: "phone",
    blurb:
      "An internal app that lets employees order meals from restaurants within the company, generating and printing order receipts instantly.",
    points: [
      "Instant receipt generation and printing at point of order.",
    ],
    tags: ["Flutter", "Receipt Printing", "Ordering"],
    stores: [
      { type: "app-store", label: "App Store", url: "https://apps.apple.com/app/id6744456485" },
      { type: "play-store", label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.wgbah.app" },
    ],
    images: ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png"],
  },
  {
    slug: "steamdeck-checker",
    name: "SteamDeck: Game Compatibility",
    tagline: "Compatibility checker for gamers",
    category: "Utility",
    period: "Oct 2022 – Present",
    status: "live",
    frame: "framed",
    blurb:
      "An app for Steam Deck owners providing verified compatibility details for thousands of Steam games.",
    points: [],
    tags: ["Flutter", "REST API", "Gaming"],
    stores: [
      { type: "play-store", label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.negm.deck_verfied_checker" },
    ],
    images: ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png"],
  },
];
