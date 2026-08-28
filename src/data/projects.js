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
      "I joined when there was no established mobile architecture or release process, then took ownership of the product from Flutter structure through both store releases.",
    points: [
      "Used Clean Architecture with Bloc and built responsive interfaces from high-fidelity designs.",
      "Integrated JWT APIs, Payfort payments, caching, lazy loading, and Firebase notifications.",
      "Added repository standards, code reviews, and CI/CD. The app launched with no critical post-launch incidents.",
    ],
    tags: ["Flutter", "Bloc", "Clean Architecture", "JWT", "Payfort", "FCM"],
    stories: [
      { label: "Read the Roze Moon delivery story", slug: "roze-moon-end-to-end-delivery" },
    ],
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
      "A product I built across Flutter, React and TypeScript, ASP.NET Core, PostgreSQL, billing, media processing, and self-hosted deployment.",
    points: [
      "Used feature-first Clean Architecture, Cubit, dependency injection, guarded routing, and English and Arabic interfaces.",
      "Built the public React web app and an ASP.NET Core API with PostgreSQL, JWT sessions, RabbitMQ, and Cloudflare R2.",
      "Used RevenueCat as the billing source of truth and pushed changes over WebSockets. ZATCA e-invoicing is still in progress.",
    ],
    tags: ["Flutter", "React", "TypeScript", "ASP.NET Core", "PostgreSQL", "RabbitMQ"],
    stories: [
      { label: "Read the full-stack ownership story", slug: "invoice-star-full-stack-product-ownership" },
    ],
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
      "A self-service donation app built for Android kiosks that may be left unattended for 24 to 48 hours at a time.",
    points: [
      "Donors choose a program and amount, pay by card, and can print a receipt through a USB thermal printer.",
      "Built a separate-process foreground service that reports app, display, and printer problems to the server.",
      "Forked the printer plugin and changed its Kotlin channel so the USB connection could recover by itself.",
    ],
    tags: ["Flutter", "Kotlin", "Kiosk", "Foreground Service", "USB"],
    stories: [
      { label: "Read the reliability story", slug: "khedma-reliability-under-client-constraint" },
      { label: "Read the native Android story", slug: "native-android-debugging" },
    ],
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
      "A location-aware attendance app that registers check-in and check-out automatically and syncs the result to the HR platform in real time.",
    points: [
      "Ties each attendance record to the employee's own settings.",
      "Detects and surfaces travel or commute delays for HR review.",
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
      "An internal app that lets employees order meals from restaurants inside the company and prints the order receipt at the point of purchase.",
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
      "A utility I built for Steam Deck owners who want to check compatibility details across thousands of Steam games.",
    points: [],
    tags: ["Flutter", "REST API", "Gaming"],
    stores: [
      { type: "play-store", label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.negm.deck_verfied_checker" },
    ],
    images: ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png"],
  },
];
