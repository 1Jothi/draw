/**
 * Drawvax Infotech — content / data layer.
 *
 * This file holds ALL site content as typed mock data. It is intentionally the
 * single source of truth for the front end so a backend developer can later
 * replace `src/data/api.ts` with real network calls (Node, Supabase, Firebase,
 * Django, ...) without touching any component.
 */

import founderPhoto from "@/assets/founder.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";

/* ---------------------------------- types --------------------------------- */

export type SiteSettings = {
  companyName: string;
  /** MUST always contain the exact phrase "Client Satisfaction". */
  slogan: string;
  heroHeadlineWords: string[];
  heroSubheading: string;
  aboutTitle: string;
  aboutBody: string;
  stats: { label: string; value: number; suffix: string }[];
};

export type Founder = {
  name: string;
  title: string;
  photo: string;
  bio: string;
  quote: string;
  linkedin: string;
  email: string;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  icon: string;
  short: string;
  description: string;
  media: string;
  features: string[];
  benefits: string[];
  priceFrom: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  client: string;
  category: "Web" | "Marketing" | "SEO" | "Branding";
  image: string;
  /** Short looping preview played on hover (optional). */
  video?: string;
  description: string;
  tech: string[];
  year: string;
};

export type Client = {
  id: string;
  name: string;
  industry: string;
  logoText: string;
  details: string;
  collaboration: string;
  since: string;
};

export type Review = {
  id: string;
  name: string;
  company: string;
  rating: number;
  comment: string;
  avatar: string;
  status: "approved" | "pending";
  date: string;
};

export type NewsPost = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  tag: string;
  image?: string;
};

export type ContactDetails = {
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapQuery: string;
  socials: { label: string; url: string }[];
};

export type Lead = {
  id: string;
  source: "Contact form" | "Chatbot" | "Newsletter";
  name: string;
  email: string;
  message: string;
  date: string;
};

export type SiteContent = {
  settings: SiteSettings;
  founder: Founder;
  services: Service[];
  portfolio: PortfolioItem[];
  clients: Client[];
  reviews: Review[];
  news: NewsPost[];
  contact: ContactDetails;
  leads: Lead[];
};

/* --------------------------------- content -------------------------------- */

export const SLOGAN_REQUIRED_PHRASE = "Client Satisfaction";

const settings: SiteSettings = {
  companyName: "Drawvax Infotech",
  slogan: "Client Satisfaction is Our Signature",
  heroHeadlineWords: ["We", "craft", "digital", "experiences", "that", "move", "people."],
  heroSubheading:
    "Drawvax Infotech is a front-end engineering and digital growth studio. We design, build and scale interfaces that load fast, convert better and feel unmistakably premium.",
  aboutTitle: "A studio built around one obsession",
  aboutBody:
    "Founded to close the gap between beautiful design and engineering that actually performs, Drawvax Infotech partners with founders, brands and enterprises to ship products people enjoy using. Our team blends front-end craftsmanship, motion design, SEO and performance marketing under one roof — so strategy, pixels and code never drift apart. Every engagement runs on transparent communication, measurable outcomes and a simple promise: we are not finished until you are genuinely satisfied.",
  stats: [
    { label: "Years of experience", value: 8, suffix: "+" },
    { label: "Projects completed", value: 240, suffix: "+" },
    { label: "Happy clients", value: 130, suffix: "+" },
    { label: "Team members", value: 32, suffix: "" },
  ],
};

const founder: Founder = {
  name: "Santhosh",
  title: "Founder & CEO, Drawvax Infotech",
  photo: founderPhoto,
  bio: "Santhosh started Drawvax Infotech with a simple conviction: technology should feel effortless to the people who use it, and honest to the people who pay for it. Over the last decade he has led front-end and growth teams across fintech, retail and SaaS, shipping products used by millions. He still personally reviews every engagement to make sure the work leaving the studio meets the standard our clients were promised.",
  quote: "Client satisfaction isn't a goal, it's our standard.",
  linkedin: "https://www.linkedin.com/",
  email: "santhosh@drawvax.com",
};

const services: Service[] = [
  {
    id: "s1",
    slug: "web-development",
    title: "Web Development",
    icon: "Code2",
    short: "Blazing-fast, accessible websites and web apps engineered in React.",
    description:
      "From marketing sites to complex dashboards, we build production-grade front ends with React, TypeScript and modern tooling. Component-driven, fully responsive, and tuned for Core Web Vitals from day one.",
    media: work1,
    features: [
      "React + TypeScript component architecture",
      "Pixel-accurate responsive implementation",
      "Core Web Vitals & Lighthouse optimisation",
      "CMS / headless backend integration ready",
      "Accessibility (WCAG AA) baked in",
    ],
    benefits: [
      "Pages that load in under a second",
      "A codebase your future team can extend",
      "Higher conversion from faster experiences",
    ],
    priceFrom: "$2,400",
  },
  {
    id: "s2",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    icon: "PenTool",
    short: "Interface design and motion systems that make products feel premium.",
    description:
      "We design end-to-end: research, flows, wireframes, high-fidelity UI and a motion language that ties it together. Every screen ships with a documented design system your developers can build from.",
    media: work2,
    features: [
      "User research & journey mapping",
      "Design systems in Figma",
      "Interactive prototypes",
      "Motion & micro-interaction specs",
      "Design QA through to launch",
    ],
    benefits: [
      "Fewer revisions, faster builds",
      "A consistent brand across every screen",
      "Interfaces users instinctively understand",
    ],
    priceFrom: "$1,800",
  },
  {
    id: "s3",
    slug: "digital-marketing",
    title: "Digital Marketing",
    icon: "Megaphone",
    short: "Performance campaigns that turn attention into pipeline.",
    description:
      "Paid social, search and lifecycle marketing run by a team that reads the analytics daily. We build the funnel, the creative and the reporting, then optimise relentlessly against your cost per acquisition.",
    media: work1,
    features: [
      "Google, Meta & LinkedIn ad management",
      "Landing page + funnel design",
      "Creative production and A/B testing",
      "Attribution and dashboard reporting",
      "Email & lifecycle automation",
    ],
    benefits: ["Lower cost per qualified lead", "Clear ROI reporting", "Campaigns that compound"],
    priceFrom: "$1,200/mo",
  },
  {
    id: "s4",
    slug: "seo",
    title: "SEO",
    icon: "Search",
    short: "Technical and content SEO that earns durable organic traffic.",
    description:
      "We audit, fix and grow. Technical SEO, structured data, internal linking and a content engine built around the queries your customers actually search for.",
    media: work2,
    features: [
      "Technical audit & Core Web Vitals fixes",
      "Keyword and SERP opportunity research",
      "On-page and schema optimisation",
      "Authority and link strategy",
      "Monthly ranking reports",
    ],
    benefits: ["Traffic that doesn't stop when ads stop", "Higher intent visitors", "Compounding growth"],
    priceFrom: "$900/mo",
  },
  {
    id: "s5",
    slug: "app-development",
    title: "App Development",
    icon: "Smartphone",
    short: "Cross-platform mobile apps with native-grade feel.",
    description:
      "React Native and PWA builds that share one codebase across iOS, Android and web — with offline support, push notifications and animation quality users notice.",
    media: work1,
    features: [
      "React Native / PWA builds",
      "Offline-first data strategy",
      "Push notifications & deep links",
      "App Store & Play Store release support",
      "Crash and performance monitoring",
    ],
    benefits: ["One codebase, every platform", "Faster time to market", "Lower long-term maintenance"],
    priceFrom: "$5,000",
  },
  {
    id: "s6",
    slug: "brand-identity",
    title: "Brand & Identity",
    icon: "Sparkles",
    short: "Logos, systems and guidelines that make you unmistakable.",
    description:
      "Positioning, visual identity, typography, colour and a usage guide — everything required to look like the category leader across every touchpoint.",
    media: work2,
    features: [
      "Brand positioning workshop",
      "Logo and identity system",
      "Typography & colour systems",
      "Collateral and social templates",
      "Brand guideline document",
    ],
    benefits: ["Instant recognition", "Consistency across teams", "Premium perceived value"],
    priceFrom: "$1,500",
  },
];

const portfolio: PortfolioItem[] = [
  {
    id: "p1",
    title: "Nexora Analytics Platform",
    client: "Nexora Labs",
    category: "Web",
    image: work1,
    description:
      "A real-time analytics dashboard handling millions of events per day. We rebuilt the front end in React, cut initial load from 6.2s to 0.9s and introduced a motion system that makes data feel alive.",
    tech: ["React", "TypeScript", "Tailwind", "Recharts", "Motion"],
    year: "2026",
  },
  {
    id: "p2",
    title: "Aurelia Commerce Redesign",
    client: "Aurelia Retail",
    category: "Web",
    image: work2,
    description:
      "A full storefront redesign across mobile, tablet and desktop. Checkout friction dropped by 31% and mobile conversion rose 24% within the first quarter.",
    tech: ["React", "Headless CMS", "Stripe", "Tailwind"],
    year: "2025",
  },
  {
    id: "p3",
    title: "Veltra Growth Engine",
    client: "Veltra Fintech",
    category: "Marketing",
    image: work1,
    description:
      "Paid acquisition and landing page system for a fintech launch. 4.1x return on ad spend across the first six months with a unified reporting dashboard.",
    tech: ["Meta Ads", "Google Ads", "GA4", "Landing Pages"],
    year: "2025",
  },
  {
    id: "p4",
    title: "Orbit Health SEO Program",
    client: "Orbit Health",
    category: "SEO",
    image: work2,
    description:
      "Technical remediation plus a 60-article content engine. Organic sessions grew 312% year on year and 47 primary keywords now rank on page one.",
    tech: ["Technical SEO", "Schema", "Content Strategy"],
    year: "2026",
  },
  {
    id: "p5",
    title: "Lumen Studio Identity",
    client: "Lumen Studio",
    category: "Branding",
    image: work1,
    description:
      "A complete identity system for an architecture practice — mark, typography, motion signature and a 48-page guideline document.",
    tech: ["Brand Strategy", "Identity", "Motion"],
    year: "2024",
  },
  {
    id: "p6",
    title: "Kavi Logistics Portal",
    client: "Kavi Logistics",
    category: "Web",
    image: work2,
    description:
      "An internal operations portal replacing six spreadsheets. Dispatch teams now schedule 1,200 shipments a week from a single animated interface.",
    tech: ["React", "TanStack", "Tailwind", "Charts"],
    year: "2026",
  },
  {
    id: "p7",
    title: "Halo Beauty Campaign",
    client: "Halo Beauty",
    category: "Marketing",
    image: work1,
    description:
      "Launch campaign across paid social and influencer channels, supported by a conversion-optimised microsite. Sold out the first production run in 11 days.",
    tech: ["Paid Social", "Microsite", "Creative"],
    year: "2025",
  },
  {
    id: "p8",
    title: "Terra Foods Rebrand",
    client: "Terra Foods",
    category: "Branding",
    image: work2,
    description:
      "Repositioning and packaging identity for a sustainable food brand entering retail, extended into an e-commerce design system.",
    tech: ["Positioning", "Packaging", "Web Design"],
    year: "2024",
  },
];

const clients: Client[] = [
  {
    id: "c1",
    name: "Nexora Labs",
    industry: "Data & Analytics",
    logoText: "NEXORA",
    details: "Enterprise analytics platform serving 400+ B2B customers across three continents.",
    collaboration: "Front-end rebuild, design system and ongoing performance retainer since 2023.",
    since: "2023",
  },
  {
    id: "c2",
    name: "Aurelia Retail",
    industry: "E-commerce",
    logoText: "AURELIA",
    details: "Premium fashion retailer with 12 physical stores and a fast-growing online channel.",
    collaboration: "Storefront redesign, checkout optimisation and seasonal campaign landing pages.",
    since: "2024",
  },
  {
    id: "c3",
    name: "Veltra Fintech",
    industry: "Financial Services",
    logoText: "VELTRA",
    details: "Digital lending platform operating in four markets with a mobile-first customer base.",
    collaboration: "Growth marketing, funnel design and a conversion reporting dashboard.",
    since: "2024",
  },
  {
    id: "c4",
    name: "Orbit Health",
    industry: "Healthcare",
    logoText: "ORBIT",
    details: "Telehealth provider connecting patients to specialists across regional clinics.",
    collaboration: "Technical SEO remediation and a long-form content engine.",
    since: "2025",
  },
  {
    id: "c5",
    name: "Lumen Studio",
    industry: "Architecture",
    logoText: "LUMEN",
    details: "Award-winning architecture practice known for adaptive reuse projects.",
    collaboration: "Brand identity, guidelines and a portfolio website with cinematic transitions.",
    since: "2022",
  },
  {
    id: "c6",
    name: "Kavi Logistics",
    industry: "Supply Chain",
    logoText: "KAVI",
    details: "Regional freight operator moving 1,200+ shipments each week.",
    collaboration: "Internal operations portal and dispatch dashboard.",
    since: "2025",
  },
  {
    id: "c7",
    name: "Halo Beauty",
    industry: "Consumer Goods",
    logoText: "HALO",
    details: "Direct-to-consumer skincare brand with a strong community following.",
    collaboration: "Launch campaign, creative production and microsite build.",
    since: "2025",
  },
  {
    id: "c8",
    name: "Terra Foods",
    industry: "Food & Beverage",
    logoText: "TERRA",
    details: "Sustainable food producer expanding from farmers' markets into national retail.",
    collaboration: "Rebrand, packaging system and e-commerce design.",
    since: "2022",
  },
];

const reviews: Review[] = [
  {
    id: "r1",
    name: "Priya Raghavan",
    company: "Nexora Labs",
    rating: 5,
    comment:
      "Drawvax rebuilt our entire dashboard front end in ten weeks. Load times dropped by six seconds and our customers immediately noticed. The communication was the best we've had from any agency.",
    avatar: "PR",
    status: "approved",
    date: "2026-08-14",
  },
  {
    id: "r2",
    name: "Daniel Osei",
    company: "Aurelia Retail",
    rating: 5,
    comment:
      "They treated our conversion rate like it was their own revenue. Checkout friction is down, mobile sales are up 24%, and the design still looks gorgeous.",
    avatar: "DO",
    status: "approved",
    date: "2026-07-02",
  },
  {
    id: "r3",
    name: "Meera Kulkarni",
    company: "Veltra Fintech",
    rating: 5,
    comment:
      "4.1x ROAS in six months, but honestly the reporting clarity impressed me more. We always knew exactly where the money went and why.",
    avatar: "MK",
    status: "approved",
    date: "2026-06-19",
  },
  {
    id: "r4",
    name: "James Whitfield",
    company: "Orbit Health",
    rating: 4,
    comment:
      "Organic traffic tripled within a year. Onboarding took a little longer than planned, but the results more than made up for it.",
    avatar: "JW",
    status: "approved",
    date: "2026-05-08",
  },
  {
    id: "r5",
    name: "Aisha Rahman",
    company: "Lumen Studio",
    rating: 5,
    comment:
      "The motion work on our portfolio site gets commented on in almost every client meeting. It genuinely wins us projects.",
    avatar: "AR",
    status: "approved",
    date: "2026-04-21",
  },
  {
    id: "r6",
    name: "Tobias Lang",
    company: "Kavi Logistics",
    rating: 5,
    comment:
      "Our dispatch team went from six spreadsheets to one screen. Adoption was instant because the interface is that clear.",
    avatar: "TL",
    status: "pending",
    date: "2026-09-10",
  },
];

const news: NewsPost[] = [
  {
    id: "n1",
    title: "Drawvax Infotech opens a dedicated motion design lab",
    date: "2026-09-18",
    tag: "Announcement",
    excerpt:
      "A new in-house team focused entirely on interface motion, cinematic transitions and performance-safe animation.",
    body: "Our new motion lab brings interaction designers and front-end engineers into one room. Every client project now ships with a documented motion language — timing curves, choreography and reduced-motion fallbacks — so animation enhances usability instead of fighting it.",
    image: work1,
  },
  {
    id: "n2",
    title: "Nexora Analytics platform goes live with a 0.9s load time",
    date: "2026-09-02",
    tag: "Project",
    excerpt:
      "The rebuilt Nexora dashboard launched this month after a ten-week engineering sprint.",
    body: "We replaced a legacy front end with a React and TypeScript architecture, introduced route-level code splitting and reduced initial payload by 71%. Median load time is now 0.9 seconds on a 4G connection.",
    image: work2,
  },
  {
    id: "n3",
    title: "New service: conversion-focused SEO retainers",
    date: "2026-08-12",
    tag: "New Service",
    excerpt:
      "Technical SEO, content and CRO packaged into a single monthly programme with transparent reporting.",
    body: "Rankings only matter if they turn into revenue. Our new retainer combines technical remediation, a content engine and continuous conversion testing, reported through one dashboard your whole team can read.",
  },
  {
    id: "n4",
    title: "Team milestone: 240 projects delivered",
    date: "2026-07-25",
    tag: "Milestone",
    excerpt: "Eight years, 130+ clients and a client satisfaction score we're genuinely proud of.",
    body: "Thank you to every client who trusted us with their product. We're marking the milestone by expanding our support team so response times stay under two hours during business hours.",
  },
];

const contact: ContactDetails = {
  address: "4th Floor, Prestige Tech Park, Outer Ring Road, Bengaluru 560103, India",
  phone: "+91 80 4718 2200",
  email: "hello@drawvax.com",
  hours: "Monday – Friday, 9:30am – 6:30pm IST",
  mapQuery: "Prestige Tech Park, Bengaluru",
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
    { label: "X", url: "https://x.com/" },
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "GitHub", url: "https://github.com/" },
  ],
};

const leads: Lead[] = [
  {
    id: "l1",
    source: "Contact form",
    name: "Rohan Mehta",
    email: "rohan@brightfold.io",
    message: "Looking for a marketing site rebuild before our Series A announcement in November.",
    date: "2026-09-20",
  },
  {
    id: "l2",
    source: "Chatbot",
    name: "Elena Fischer",
    email: "elena@studioverde.de",
    message: "What are your typical timelines for a UI/UX engagement?",
    date: "2026-09-19",
  },
  {
    id: "l3",
    source: "Newsletter",
    name: "Subscriber",
    email: "marcus.lee@outlook.com",
    message: "Newsletter signup",
    date: "2026-09-17",
  },
];

export const initialContent: SiteContent = {
  settings,
  founder,
  services,
  portfolio,
  clients,
  reviews,
  news,
  contact,
  leads,
};

export const portfolioCategories = ["All", "Web", "Marketing", "SEO", "Branding"] as const;

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    text: "Workshops, audits and analytics review so we solve the real problem, not the assumed one.",
  },
  {
    step: "02",
    title: "Design",
    text: "Flows, interfaces and a motion language, prototyped and validated before a line of code.",
  },
  {
    step: "03",
    title: "Develop",
    text: "Component-driven front-end engineering with weekly demos and open staging environments.",
  },
  {
    step: "04",
    title: "Deliver",
    text: "Launch, measure, iterate. Handover documentation and a support window on every project.",
  },
];

export const chatbotFaqs = [
  {
    keywords: ["service", "offer", "do you"],
    answer:
      "We offer Web Development, UI/UX Design, Digital Marketing, SEO, App Development and Brand Identity. Which one are you exploring?",
  },
  {
    keywords: ["price", "pricing", "cost", "budget", "quote"],
    answer:
      "Websites typically start around $2,400, design engagements from $1,800, and marketing or SEO retainers from $900/month. Share your scope and we'll send an exact quote.",
  },
  {
    keywords: ["time", "timeline", "how long", "deadline"],
    answer:
      "A marketing site usually takes 3–5 weeks, a web app 8–12 weeks. Retainers start within a week of kickoff.",
  },
  {
    keywords: ["contact", "email", "phone", "call", "reach"],
    answer:
      "You can reach us at hello@drawvax.com or +91 80 4718 2200. We reply within two business hours.",
  },
  {
    keywords: ["hours", "open", "timing", "available"],
    answer: "Our team is available Monday to Friday, 9:30am – 6:30pm IST.",
  },
  {
    keywords: ["portfolio", "work", "case study", "example"],
    answer:
      "Have a look at our Portfolio page — Nexora, Aurelia and Orbit Health are good places to start.",
  },
];
