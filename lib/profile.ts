/**
 * Single source of truth for site content.
 * Sourced from ChetanLinkedInProfile.pdf — edit here, the whole site follows.
 */

export const profile = {
  name: "Chetan Mohite",
  initials: "CM",
  role: "Senior Engineer — FX & CCE Technology",
  company: "Westpac Institutional Bank",
  location: "Greater Sydney Area, Australia",
  email: "cmohite@gmail.com",
  linkedin: "https://www.linkedin.com/in/chetanmmohite",
  linkedinLabel: "linkedin.com/in/chetanmmohite",
  availability: "Open to AI engineering conversations",
  tagline:
    "Senior engineer building the high-stakes systems behind global foreign exchange.",
  metaDescription:
    "Chetan Mohite — Senior Engineer on the FX & CCE technology team at Westpac Institutional Bank. Core Java, Spring Boot, Kafka and SQL Server across 24 years of retail, corporate and institutional banking.",
} as const;

export const stats = [
  { value: "24", suffix: "yrs", label: "In banking technology" },
  { value: "16", suffix: "yrs", label: "At Westpac Institutional" },
  { value: "4", suffix: "", label: "Continents delivered on" },
  { value: "4", suffix: "", label: "Core banking rollouts" },
] as const;

export const marquee = [
  "Core Java",
  "Spring Boot",
  "Apache Kafka",
  "MS SQL Server",
  "Foreign Exchange",
  "C / C++",
  "Oracle",
  "FLEXCUBE",
  "Systems Integration",
  "Machine Learning",
  "Low-Latency Systems",
  "Corporate Banking",
] as const;

export const about = {
  lead:
    "I build the software that moves money — and I have been doing it since core banking ran on green screens.",
  paragraphs: [
    "I am a Senior Engineer with deep expertise in Core Java, Spring Boot, Kafka and MS SQL Server, with hands-on experience in C and C++. I work in the FX (Foreign Exchange) domain at Westpac Institutional Bank, where I specialise in robust, scalable, high-performance systems that power critical financial operations.",
    "Before Westpac I spent nearly a decade as a techno-functional consultant across retail and corporate banking — delivering end-to-end implementations and translating between what the business needs and what the technology can actually do. That work took me from Sydney to India, Bangladesh, Panama and Benin.",
    "Today I am pointing that same problem-solving instinct at Artificial Intelligence and Machine Learning, actively building the skills to grow as an AI Engineer. Financial technology, AI-driven solutions and thoughtful system design are where I want to spend the next chapter.",
  ],
  strengths: [
    "Deep domain knowledge",
    "Cross-technology fluency",
    "Problem-solving mindset",
    "Continuous learner",
  ],
  interests: ["Financial technology", "AI-driven solutions", "Innovative system design"],
} as const;

export type Role = {
  company: string;
  title: string;
  period: string;
  start: string;
  end: string;
  duration: string;
  location?: string;
  current?: boolean;
  summary: string;
  points: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    company: "Westpac Institutional Bank",
    title: "FX & CCE Technology Team Member",
    period: "Feb 2010 — Present",
    start: "2010",
    end: "Now",
    duration: "16 yrs 8 mos",
    location: "Sydney, Australia",
    current: true,
    summary:
      "Engineering inside the Foreign Exchange and CCE technology group — the systems that price, route and settle institutional currency flow.",
    points: [
      "Build and maintain robust, scalable, high-performance services underpinning critical FX operations.",
      "Core Java and Spring Boot services, Kafka-based event streaming, and MS SQL Server data platforms.",
      "Long-run ownership of production-critical banking systems where correctness and uptime are non-negotiable.",
    ],
    tags: ["Core Java", "Spring Boot", "Kafka", "MS SQL Server", "FX", "CCE"],
  },
  {
    company: "Finance Application Systems Limited",
    title: "Senior Consultant",
    period: "Jun 2009 — Dec 2009",
    start: "2009",
    end: "2009",
    duration: "7 mos",
    summary:
      "Senior consulting engagement in the banking application space.",
    points: [
      "Consulted on financial application delivery across the banking product stack.",
    ],
    tags: ["Banking Systems", "Consulting"],
  },
  {
    company: "Oracle Financial Services Software",
    title: "Senior Consultant — PMO Practice",
    period: "Feb 2007 — Feb 2009",
    start: "2007",
    end: "2009",
    duration: "2 yrs 1 mo",
    summary:
      "Senior Consultant within the PMO practice area of the Oracle Financial Services Consulting Group.",
    points: [
      "FLEXCUBE Corporate implementation at Ecobank, Benin.",
      "Programme and delivery governance across the consulting group PMO practice.",
    ],
    tags: ["FLEXCUBE", "Corporate Banking", "PMO", "Oracle"],
  },
  {
    company: "i-flex Solutions",
    title: "Consultant — Retail & Corporate Banking Products",
    period: "May 2001 — Jan 2007",
    start: "2001",
    end: "2007",
    duration: "5 yrs 9 mos",
    summary:
      "Techno-functional consultant in the Retail and Corporate Banking Product Division — development, support and on-the-ground implementation.",
    points: [
      "FLEXCUBE Retail & Corporate development and support assignments.",
      "FLEXCUBE Retail implementation at Syndicate Bank, India.",
      "FLEXCUBE Retail implementation at EBL, Dhaka, Bangladesh.",
      "FLEXCUBE Corporate implementation at BLADEX, Republic of Panama.",
    ],
    tags: ["FLEXCUBE", "Retail Banking", "C / C++", "Oracle", "Implementation"],
  },
];

export const deployments = [
  { org: "Westpac Institutional Bank", place: "Sydney, Australia" },
  { org: "Ecobank", place: "Cotonou, Benin" },
  { org: "BLADEX", place: "Panama City, Panama" },
  { org: "Eastern Bank Ltd", place: "Dhaka, Bangladesh" },
  { org: "Syndicate Bank", place: "India" },
] as const;

export const skillGroups = [
  {
    id: "01",
    label: "Languages",
    items: ["Core Java", "C", "C++", "SQL", "R"],
  },
  {
    id: "02",
    label: "Frameworks & Platforms",
    items: ["Spring Boot", "Apache Kafka", "REST Services", "Event Streaming"],
  },
  {
    id: "03",
    label: "Data",
    items: ["MS SQL Server", "Oracle", "Data Modelling", "Query Optimisation"],
  },
  {
    id: "04",
    label: "Domain",
    items: [
      "Foreign Exchange",
      "CCE",
      "Corporate Banking",
      "Retail Banking",
      "FLEXCUBE",
      "Business Process",
      "Integration",
    ],
  },
  {
    id: "05",
    label: "AI & Machine Learning",
    items: [
      "Machine Learning",
      "Exploratory Data Analysis",
      "Getting & Cleaning Data",
      "Reproducible Research",
      "R Programming",
    ],
  },
  {
    id: "06",
    label: "Ways of Working",
    items: [
      "Techno-functional consulting",
      "End-to-end delivery",
      "Production support",
      "On-site implementation",
    ],
  },
] as const;

export const education = [
  {
    title: "Bachelor's Degree, Computer Science",
    org: "Walchand College of Engineering, Sangli",
    note: "B.E. Computer Science",
  },
  {
    title: "SCJP 6.0",
    org: "Sun Certification",
    note: "Sun Certified Java Programmer",
  },
] as const;

export const certifications = [
  "Machine Learning",
  "Exploratory Data Analysis",
  "R Programming",
  "Getting and Cleaning Data",
  "Reproducible Research",
] as const;

export const awards = [
  { title: "Quarterly StarTech Award Winner", org: "Westpac" },
  { title: "Quarterly Super.Tech Team Award", org: "Westpac" },
] as const;

export const nav = [
  { href: "#about", label: "About", index: "01" },
  { href: "#career", label: "Career", index: "02" },
  { href: "#capabilities", label: "Capabilities", index: "03" },
  { href: "#portfolio", label: "Portfolio", index: "04" },
  { href: "#twin", label: "Ask AI", index: "05" },
  { href: "#contact", label: "Contact", index: "06" },
] as const;
