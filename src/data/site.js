// Single source of truth for everything that isn't a project.
// Edit here, then run `npm run build`.

export const site = {
  name: "Abdelrahman Negm",
  headline: "Mobile Engineer (Flutter)",
  location: "6th of October, Egypt",
  email: "bodinegem@gmail.com",
  phone: "+20 102 3741643",
  phoneHref: "+201023741643",
  linkedin: "https://linkedin.com/in/abdelrahman-negm-374b20201",
  github: "https://github.com/najm101",
  resumeUrl: "resume.md",

  // Hero thesis — the most characteristic thing about the work.
  thesis:
    "I ship Flutter apps that reach real users — six and counting live on the App Store and Play Store, owned end to end from the UI down to the self-hosted backend.",

  summary:
    "Mobile Engineer with 2+ years shipping 6+ production apps for Android and iOS in Flutter/Dart. Strong in Clean Architecture, Bloc/GetX, REST APIs, and Firebase. I own features end to end, lead code reviews, mentor juniors, and build CI/CD for App Store and Play Store releases across e-commerce, HR, and utility domains — comfortable owning the full stack, from Flutter clients down to self-hosted .NET/PostgreSQL backends and Dockerized VPS deployments.",

  // Quick stats for the hero.
  stats: [
    { value: "6+", label: "Apps shipped to stores" },
    { value: "2+ yrs", label: "Production Flutter" },
    { value: "40%", label: "Shorter release cycles" },
  ],

  experience: [
    {
      company: "Tuwaiq",
      role: "Junior Mobile Engineer",
      location: "Al Sheikh Zayed, Egypt",
      period: "Apr 2024 – Jan 2026",
      points: [
        "Led end-to-end development of the Roze Moon Flutter e-commerce app, using analytics to refine UI/UX and boost retention.",
        "Built a CI/CD pipeline that cut release cycles by 40%.",
        "Took over the team's VPS hosting the .NET backend: containerized backend and database with Docker, set up CI/CD for backend deploys, provisioned a separate dev environment, and self-hosted the deployment platform with Dokploy.",
        "Mentored developers and streamlined Agile workflows in Jira.",
      ],
    },
    {
      company: "Vimigo Technologies",
      role: "Intern Flutter Developer",
      location: "Kuala Lumpur, Malaysia",
      period: "Jul 2023 – Oct 2023",
      points: [
        "Built high-performance Flutter features and integrated REST APIs with backend teams.",
        "Used analytics to drive improvements while keeping a clean, reliable codebase with Git.",
      ],
    },
    {
      company: "Pioneer4ss",
      role: "Intern Flutter Developer",
      location: "Cyberjaya, Malaysia",
      period: "Nov 2021 – Jan 2022",
      points: [
        "Managed and updated website content management systems.",
        "Engineered a dedicated Android client that consumed the company's WordPress REST API, extending web functionality to mobile users.",
      ],
    },
  ],

  skills: [
    {
      group: "Flutter",
      items: [
        "Bloc & GetX",
        "Clean Architecture",
        "Platform Channels",
        "Flutter Web",
        "Provider",
        "Offline Caching",
        "Responsive Design",
        "Background Services",
        "Isolates",
        "GeoData & Maps",
      ],
    },
    {
      group: "UI / UX & Design",
      items: [
        "Figma",
        "Adobe Illustrator",
        "Material Design 3",
        "Cupertino Style",
        "User Behavior Analysis",
      ],
    },
    {
      group: "Backend & Infra",
      items: [
        "RESTful APIs",
        "ASP.NET Core",
        "Firebase Suite",
        "AWS Foundations",
        "SQL & NoSQL",
        "PHP Integration",
        "Linux",
      ],
    },
    {
      group: "DevOps",
      items: [
        "Docker",
        "Dokploy",
        "VPS Administration",
        "CI/CD Pipelines",
        "Dev / Prod Environments",
        "Self-hosting",
      ],
    },
    {
      group: "Languages & Tools",
      items: [
        "Dart",
        "Kotlin",
        "Java",
        "C++",
        "Git & GitHub Flow",
        "Jira / Agile",
        "System Design",
      ],
    },
  ],

  achievements: [
    {
      title: "Deployment automation",
      body: "Architected CI/CD pipelines for automated App Store and Play Store publishing, eliminating manual build errors.",
    },
    {
      title: "Performance engineering",
      body: "Resolved critical UI freezing on budget devices by refactoring the native camera implementation.",
    },
    {
      title: "Data visualization",
      body: "Integrated complex geo-data visualization using mapping APIs (Nominatim / Geoboundaries).",
    },
    {
      title: "Offline sync",
      body: "Implemented robust offline-first data layers using Drift and SQLite for low-connectivity environments.",
    },
    {
      title: "System integration",
      body: "Engineered background task schedulers to optimize resource usage on Desktop and Web platforms.",
    },
    {
      title: "Native features",
      body: "Built custom Home Screen Widgets to drive user engagement and accessibility.",
    },
  ],

  education: {
    school: "Multimedia University, Malaysia",
    degree: "Bachelor of Computer Science (Software Engineering)",
    period: "2019 – 2023",
  },

  certifications: [
    { name: "AWS Academy Cloud Foundations", detail: "AWS Academy Graduate" },
  ],

  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Fluent" },
  ],
};
