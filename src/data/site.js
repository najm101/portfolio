// Single source of truth for everything that isn't a project.
// Edit here, then run `npm run build`.

export const site = {
  name: "Abdelrahman Negm",
  headline: "Mobile Engineer (Flutter)",
  location: "6th of October, Egypt",
  email: "bodinegem@gmail.com",
  phone: "+20 102 3741643",
  phoneHref: "+201023741643",
  whatsapp: "https://wa.me/201023741643?text=Hi%20Abdelrahman%2C%20I%20saw%20your%20portfolio%20and%20I'd%20like%20to%20chat.",
  linkedin: "https://linkedin.com/in/abdelrahman-negm-374b20201",
  github: "https://github.com/najm101",
  resumeUrl: "resume.md",

  // Hero thesis: the most characteristic thing about the work.
  thesis:
    "I have shipped 6+ production Flutter apps for iOS and Android, and I take ownership beyond the client when the product needs a backend, web surface, billing flow, or deployment work.",

  summary:
    "I am a Mobile Engineer with 3 years of experience shipping 6+ production Flutter apps for Android and iOS. I usually own the full delivery path, from architecture and UI through API integration, store releases, and post-launch support. When a product needs more than the mobile client, I am comfortable building the React web surface, ASP.NET Core backend, billing flow, or deployment setup as well.",

  // Quick stats for the hero.
  stats: [
    { value: "6+", label: "Production apps shipped" },
    { value: "3 yrs", label: "Production delivery" },
    { value: "3", label: "Apps shipped solo" },
  ],

  experience: [
    {
      company: "Osmacc (Amaal)",
      role: "Flutter Developer (Sole Mobile Engineer)",
      location: "Remote · Part-time",
      period: "Feb 2025 – Present",
      points: [
        "I own the mobile function for a cloud business-management platform that has served about 500 enterprise clients over more than 20 years.",
        "I built and shipped Tawqet, Wgbah, and Khedma from architecture and Flutter UI through REST API integration, store submission, and post-launch support.",
        "For Khedma, I also built unattended-device telemetry and changed a Flutter plugin's Kotlin layer so its USB printer connection could recover by itself.",
      ],
    },
    {
      company: "Tuwaiq",
      role: "Junior Mobile Engineer",
      location: "Al Sheikh Zayed, Egypt",
      period: "Apr 2024 – Jan 2026",
      points: [
        "I took ownership of Roze Moon from Flutter architecture and high-fidelity UI through JWT APIs, Payfort payments, notifications, and both store releases.",
        "I built the mobile CI/CD pipeline, which made releases faster and removed manual build errors.",
        "I took over an undocumented VPS, containerized the .NET backend and database, added backend CI/CD, created a development environment, and set up Dokploy without taking production down.",
        "I led code reviews, wrote architecture guidance, and mentored developers as the mobile work grew.",
      ],
    },
    {
      company: "Vimigo Technologies",
      role: "Intern Flutter Developer",
      location: "Kuala Lumpur, Malaysia",
      period: "Jul 2023 – Oct 2023",
      points: [
        "I built Flutter features and integrated REST APIs with a backend team working across countries and time zones.",
        "I used analytics to check how those features behaved and kept the Git history clean enough for asynchronous review and handoff.",
      ],
    },
    {
      company: "Pioneer4ss",
      role: "Intern Flutter Developer",
      location: "Cyberjaya, Malaysia",
      period: "Nov 2021 – Jan 2022",
      points: [
        "I managed and updated website content-management systems.",
        "I built a dedicated Android client that used the company's WordPress REST API and brought the website's functionality to mobile users.",
      ],
    },
  ],

  skills: [
    {
      group: "Flutter and mobile",
      items: [
        "Bloc & GetX",
        "Clean Architecture",
        "Platform Channels",
        "Background Services",
        "Offline Data",
        "Isolates",
        "Responsive UI",
        "Maps & Geodata",
        "Store Releases",
      ],
    },
    {
      group: "Web frontend",
      items: [
        "React 19",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "React Router",
        "Bilingual Interfaces",
        "Flutter Web",
      ],
    },
    {
      group: "Backend and data",
      items: [
        "ASP.NET Core",
        "C#",
        "PostgreSQL & EF Core",
        "RabbitMQ",
        "WebSockets",
        "REST APIs & JWT",
        "Firebase Suite",
      ],
    },
    {
      group: "Cloud and DevOps",
      items: [
        "Docker",
        "GitHub Actions",
        "Dokploy",
        "Cloudflare R2",
        "AWS EC2",
        "VPS Administration",
        "Dev & Prod Environments",
      ],
    },
    {
      group: "Native Android",
      items: [
        "Kotlin",
        "Java",
        "USB & Printer Integration",
        "Flutter Plugin Forks",
        "Android Process Lifecycle",
        "Native Camera Debugging",
      ],
    },
    {
      group: "Product and workflow",
      items: [
        "Figma",
        "Analytics",
        "Code Reviews",
        "Mentoring",
        "Git & GitHub Flow",
        "Jira / Agile",
        "Claude Code & Codex",
      ],
    },
  ],

  education: {
    school: "Multimedia University, Cyberjaya, Malaysia",
    degree: "Bachelor of Computer Science (Honours) · Software Engineering",
    period: "2019 – Nov 2023",
  },

  certifications: [
    { name: "AWS Academy Cloud Foundations", detail: "AWS Academy Graduate" },
  ],

  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Fluent" },
  ],
};
