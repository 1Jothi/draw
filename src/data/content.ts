/**
 * Drawvax Infotech — content types + default content.
 *
 * Editable sections (settings, founder, contact, services, portfolio, clients)
 * live in the `site_content` table as JSON. Anything the admin has not saved
 * yet falls back to the defaults below. Reviews, news and leads live in their
 * own tables (see src/data/api.ts).
 */
import founderPhoto from "@/assets/founder.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";

/** Locked slogan — never altered or removed. */
export const SLOGAN = "Client Satisfaction. Company Satisfaction.";
export const POWER_TAGLINE = "Impossible Make Possible — That's the Power of Drawvax Infotech.";

/* ---------------------------------- types --------------------------------- */

export type Stat = { label: string; value: number; suffix: string };
export type ProcessStep = { step: string; label: string; title: string; text: string };

export type SiteSettings = {
  companyName: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheading: string;
  heroButtonText: string;
  heroButtonLink: string;
  aboutTitle: string;
  aboutBody: string;
  yearsExperience: number;
  projectsCompleted: number;
  ongoingProjects: string;
  teamBreakdown: { label: string; count: string }[];
  teamTotal: number;
  ctaHeadline: string;
  ctaText: string;
};

export type Founder = {
  name: string;
  title: string;
  photo: string;
  bio: string;
  highlight: string;
  quote: string;
  linkedin: string;
  email: string;
  phone: string;
  website: string;
  credit: string;
};

export type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  short: string;
  description: string;
  media: string;
  features: string[];
};

export type SubCategory = {
  id: string;
  slug: string;
  title: string;
  short: string;
  services: ServiceItem[];
};

export type ServiceCategory = {
  id: string;
  slug: string;
  title: string;
  icon: string;
  short: string;
  media: string;
  subcategories: SubCategory[];
};

export type PortfolioItem = {
  id: string;
  title: string;
  client: string;
  category: string;
  image: string;
  video: string;
  gallery: string[];
  description: string;
  tech: string[];
  year: string;
  url?: string;
  published?: boolean;
  sortOrder?: number;
};

export type Client = {
  id: string;
  name: string;
  industry: string;
  region: "domestic" | "international";
  logo: string;
  details: string;
  collaboration: string;
  since: string;
  website?: string;
  enabled?: boolean;
  sortOrder?: number;
};

export type ContactDetails = {
  legalName: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapQuery: string;
  linkedin: string;
  instagram: string;
};

export type Review = {
  id: string;
  name: string;
  company: string;
  rating: number;
  comment: string;
  fullStory: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  avatar?: string;
  companyLogo?: string;
  sortOrder?: number;
};

export type NewsPost = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  image: string;
  publishedAt: string;
};

export type Lead = {
  id: string;
  source: "Contact form" | "Chatbot";
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

export type CmsContent = {
  settings: SiteSettings;
  founder: Founder;
  contact: ContactDetails;
  process: ProcessStep[];
  services: ServiceCategory[];
  portfolio: PortfolioItem[];
  clients: Client[];
};

export type CmsKey = keyof CmsContent;

/* -------------------------------- helpers --------------------------------- */

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const newId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const clientLogoAssets: Record<string, string> = {
  "azil-healthcare.png": "/clients/azil-healthcare.png",
  "5g-mobiles.png": "/clients/5g-mobiles.png",
  "royal-mobiles.png": "/clients/royal-mobiles.png",
  "hydraulic-operation-training-institute.png": "/clients/hydraulic-operation-training-institute.png",
  "bangalore-defence-academy.png": "/clients/bangalore-defence-academy.png",
  "banjos-beverages.png": "/clients/banjos-beverages.png",
  "sri-sakthi-computers.png": "/clients/sri-sakthi-computers.png",
  "sri-hari-properties.png": "/clients/sri-hari-properties.png",
  "super-cakes.png": "/clients/super-cakes.png",
};

export function getClientLogoUrl(url: string): string {
  if (!url.includes("/__l5e/assets-v1/")) return url;
  const filename = url.split(/[?#]/, 1)[0]?.split("/").pop();
  return filename ? clientLogoAssets[filename] ?? url : url;
}

function svc(title: string, area: string): ServiceItem {
  return {
    id: `s-${slugify(area)}-${slugify(title)}`,
    slug: slugify(title),
    title,
    short: `${title} delivered by the Drawvax ${area} team — planned around your goals and budget.`,
    description: `We start by understanding your business and requirements, then plan, build and deliver ${title.toLowerCase()} with a focus on quality, value and long-term support.`,
    media: "",
    features: [
      "Requirement discussion & clear scope",
      "Budget-friendly, transparent pricing",
      "Quality delivery with review before launch",
      "Ongoing support after handover",
    ],
  };
}

function sub(title: string, short: string, items: string[]): SubCategory {
  return {
    id: `sc-${slugify(title)}`,
    slug: slugify(title),
    title,
    short,
    services: items.map((item) => svc(item, title)),
  };
}

/* --------------------------------- defaults ------------------------------- */

const settings: SiteSettings = {
  companyName: "Drawvax Infotech",
  heroEyebrow: "Front-end development & digital growth",
  heroHeadline: "We craft digital experiences that move people.",
  heroSubheading:
    "Drawvax Infotech is a front-end engineering & digital growth studio — websites, apps, marketing and branding built around your requirements and your budget.",
  heroButtonText: "View Our Work",
  heroButtonLink: "/portfolio",
  aboutTitle: "A studio built on listening first",
  aboutBody:
    "For more than five years we've helped shops, academies, clinics, builders and trading companies in India and Kuwait grow online. We understand each client's requirements, work according to their budget, and deliver the best possible quality — then stay on to support them.",
  yearsExperience: 5,
  projectsCompleted: 130,
  ongoingProjects: "5–10",
  teamTotal: 177,
  teamBreakdown: [
    { label: "Managers", count: "5" },
    { label: "Team Managers", count: "7" },
    { label: "Team Leaders", count: "15" },
    { label: "Staff", count: "150" },
  ],
  ctaHeadline: "Let's build something your users remember",
  ctaText:
    "Tell us about your project. We'll schedule a meeting, understand your requirements and come back with a practical plan that fits your budget.",
};

const founder: Founder = {
  name: "Murugu Santhosh RS",
  title: "Founder & CEO, Drawvax infotech & Digital",
  photo: founderPhoto,
  bio: "I’m an MCA graduate with 5+ years of experience in website development and digital solutions. My approach has always been simple — understand each client’s requirements, work according to their budget, and deliver the best possible quality.\n\nMy main motive is “Client satisfaction and company satisfaction”, not just the amount involved. I believe in supporting businesses, especially those facing challenges, by helping them grow through practical and affordable digital solutions.\n\nFor any questions or verification, my official website, professional links and contact details are provided below, and you can contact me directly.",
  highlight: "Client satisfaction and company satisfaction",
  quote: "Client satisfaction isn't a goal, it's our standard.",
  linkedin: "https://www.linkedin.com/in/murugu-santhosh-193057365/",
  email: "drawvaxinfotech.off@gmail.com",
  phone: "+91 6374025393",
  website: "https://drawvax-effect.lovable.app",
  credit: "This website was personally built and managed under his direction.",
};

const contact: ContactDetails = {
  legalName: "Drawvax Infotech and Digital",
  address: "Ponnamaravathy, Pudukottai District, Tamil Nadu, PIN: 622407",
  phone: "+91 6374025393",
  email: "drawvaxinfotech.off@gmail.com",
  hours: "Monday – Saturday, 9:30am – 6:30pm IST",
  mapQuery: "Ponnamaravathy, Pudukottai, Tamil Nadu 622407",
  linkedin: "https://www.linkedin.com/in/murugu-santhosh-193057365/",
  instagram: "",
};

const services: ServiceCategory[] = [
  {
    id: "cat-technical",
    slug: "technical-services",
    title: "Technical Services",
    icon: "Code2",
    short: "Websites, software, apps, cloud and UI/UX — engineered to be fast, secure and easy to use.",
    media: "",
    subcategories: [
      sub("Website & Web Development", "Websites and web apps that load fast and convert.", [
        "Business Website", "E-commerce Website", "Portfolio Website", "Landing Page", "CMS / WordPress Development", "Web App Development",
      ]),
      sub("Software Development", "Custom software that fits the way you work.", [
        "Custom Software", "CRM / ERP", "Inventory Management", "Booking Systems",
      ]),
      sub("Mobile & App Development", "Android, iOS and cross-platform apps.", [
        "Android / iOS App Development", "Cross-Platform App Development", "App Maintenance",
      ]),
      sub("Cloud, Hosting & Infrastructure", "Reliable domains, hosting and servers.", [
        "Domain Registration", "Hosting Setup", "Server Management", "SSL", "Backup & Recovery",
      ]),
      sub("UI/UX & Technical Solutions", "Interfaces people understand at a glance.", [
        "UI Design", "UX Research", "Wireframing", "Prototyping", "Admin Dashboard Design",
      ]),
    ],
  },
  {
    id: "cat-non-technical",
    slug: "non-technical-services",
    title: "Non-Technical Services",
    icon: "Megaphone",
    short: "Marketing, SEO, social media, branding and content that bring real enquiries.",
    media: "",
    subcategories: [
      sub("Digital Marketing & SEO", "Be found by the customers already searching for you.", [
        "Digital Marketing Strategy", "SEO", "Local SEO", "Keyword Research", "Google Ads",
      ]),
      sub("Social Media Marketing", "Campaigns and communities that grow your brand.", [
        "Social Media Strategy", "Facebook / Instagram / LinkedIn Ads", "Community Management",
      ]),
      sub("Branding & Creative", "A professional identity across every touchpoint.", [
        "Logo Design", "Brand Guidelines", "Letterhead", "Business Cards", "Poster / Flyer Design",
      ]),
      sub("Content & Media", "Words, videos and motion that tell your story.", [
        "Content Writing", "Blog Writing", "Video Editing", "Reels / Shorts", "Motion Graphics",
      ]),
      sub("Business Growth & Marketing Support", "Systems that keep new leads coming.", [
        "Lead Generation", "Email Marketing", "WhatsApp Marketing", "Marketing Automation",
      ]),
    ],
  },
  {
    id: "cat-manpower",
    slug: "manpower-and-business-support",
    title: "Manpower & Business Support",
    icon: "Users",
    short: "Skilled professionals and dependable support staff for your business.",
    media: "",
    subcategories: [
      sub("Skilled Manpower — IT & Technical Professionals", "Vetted technical talent.", [
        "Developers", "Designers", "QA Engineers", "DevOps Engineers",
      ]),
      sub("Business & Professional Support", "Office professionals who keep work moving.", [
        "HR Executive", "Recruiter", "Accountant", "Admin Officer", "Customer Support", "Sales",
      ]),
      sub("Security & Facility Support", "Safe, clean and well-kept premises.", [
        "Security Guard", "Housekeeping", "Watchman",
      ]),
      sub("General & Office Support", "Reliable everyday support staff.", [
        "Office Assistant", "Driver", "Delivery Staff", "Domestic Help",
      ]),
    ],
  },
];

const portfolio: PortfolioItem[] = [
  {
    id: "p1",
    title: "Azil Healthcare Digital Growth",
    client: "Azil Healthcare",
    category: "Marketing",
    image: work1,
    video: "",
    gallery: [],
    description:
      "Consistent digital marketing and brand building that helped Azil Healthcare grow from having no office to owning one.",
    tech: ["Digital Marketing", "Social Media", "Branding"],
    year: "2024",
  },
  {
    id: "p2",
    title: "Bangalore Defence Academy Admissions",
    client: "Bangalore Defence Academy",
    category: "SEO",
    image: work2,
    video: "",
    gallery: [],
    description: "Admissions marketing and SEO that grew the academy from 15 to 120 students.",
    tech: ["SEO", "Lead Generation", "Social Ads"],
    year: "2024",
  },
  {
    id: "p3",
    title: "Royal Mobiles Branch Promotions",
    client: "Royal Mobiles",
    category: "Marketing",
    image: work1,
    video: "",
    gallery: [],
    description: "Promotional campaigns executed across all seven Royal Mobiles branches.",
    tech: ["Campaigns", "Poster Design", "Social Media"],
    year: "2023",
  },
  {
    id: "p4",
    title: "Banjo's Beverages Brand Shoot",
    client: "Banjo's Beverages",
    category: "Branding",
    image: work2,
    video: "",
    gallery: [],
    description: "Professional photos, videos and a complete brand identity for a growing beverage brand.",
    tech: ["Photography", "Video", "Brand Identity"],
    year: "2025",
  },
  {
    id: "p5",
    title: "Maniemakz Construction Website",
    client: "Maniemakz Construction",
    category: "Web",
    image: work1,
    video: "",
    gallery: [],
    description: "A professional, mobile-friendly company website for a construction firm.",
    tech: ["React", "Responsive Design", "SEO"],
    year: "2025",
  },
  {
    id: "p6",
    title: "Manwax Education SEO & Branding",
    client: "Manwax Education",
    category: "SEO",
    image: work2,
    video: "",
    gallery: [],
    description: "Improved SEO and branding that made admissions easier for Manwax Education.",
    tech: ["SEO", "Branding", "Content"],
    year: "2025",
  },
];

function client(
  id: string,
  name: string,
  industry: string,
  region: Client["region"],
  logo = "",
  details = "",
): Client {
  return {
    id,
    name,
    industry,
    region,
    logo,
    details: details || `${industry} client of Drawvax Infotech.`,
    collaboration: "Digital marketing, branding and ongoing support tailored to their goals.",
    since: "",
  };
}

const clients: Client[] = [
  client("c1", "Azil Healthcare", "Healthcare", "domestic", clientLogoAssets["azil-healthcare.png"], "Grew from no office to owning one."),
  client("c2", "5G Mobiles", "Mobile Retail", "domestic", clientLogoAssets["5g-mobiles.png"], "Started and grew to a team of 5."),
  client("c3", "Royal Mobiles", "Mobile Retail", "domestic", clientLogoAssets["royal-mobiles.png"], "Mobile retail chain with 7 branches."),
  client("c4", "Hydraulic Operation Training Institute", "Education & Training", "domestic", clientLogoAssets["hydraulic-operation-training-institute.png"], "Vocational training for machinery operators."),
  client("c5", "Bangalore Defence Academy", "Education", "domestic", clientLogoAssets["bangalore-defence-academy.png"], "Grew from 15 to 120 students."),
  client("c6", "Banjo's Beverages", "Food & Beverage", "domestic", clientLogoAssets["banjos-beverages.png"], "Beverage brand with a growing following."),
  client("c7", "Sri Sakthi Computers", "IT & Training", "domestic", clientLogoAssets["sri-sakthi-computers.png"], "Pivoted successfully into student courses."),
  client("c8", "Sri Hari Properties", "Real Estate", "domestic", clientLogoAssets["sri-hari-properties.png"], "Sold multiple plots after marketing support."),
  client("c9", "Meet & Eat", "Restaurant", "domestic"),
  client("c10", "Super Cakes", "Bakery", "domestic", clientLogoAssets["super-cakes.png"], "Stable growth through consistent marketing."),
  client("c11", "Blumine Tours & Travels", "Travel", "domestic"),
  client("c12", "Mogo Pvt Ltd", "Business", "domestic"),
  client("c13", "Blessing Tours & Travels", "Travel", "domestic"),
  client("c14", "Vinayaga Architecture", "Architecture", "domestic"),
  client("c15", "Big Chips", "Food Products", "domestic"),
  client("c16", "Agni Training Academy", "Education", "domestic"),
  client("c17", "Manwax Education", "Education", "domestic"),
  client("c18", "Maniemakz Construction", "Construction", "domestic"),
  client("c19", "Delibux", "Business", "domestic"),
  client("c20", "Mantralaya Jewellery", "Jewellery", "domestic"),
  client("c21", "Sumangali Jewellers", "Jewellery", "domestic"),
  client("c22", "G-Tech", "Technology", "domestic"),
  client("k1", "Almas Hospital", "Healthcare", "international"),
  client("k2", "Anwaar Al Kuwait Factory Company", "Manufacturing", "international"),
  client("k3", "Packco – Kuwait Packaging Services Company", "Packaging", "international"),
  client("k4", "Samba Kuwait General Trading Company", "General Trading", "international"),
  client("k5", "Emmanuelle Ladies Beauty Salon & Spa", "Beauty & Wellness", "international"),
  client("k6", "Wonder Zone Kuwait", "Entertainment", "international"),
  client("k7", "Yaccomaricard Kuwait", "Retail", "international"),
  client("k8", "Al-Nafaa Group (ALN)", "Business Group", "international"),
  client("k9", "Al Watani Factory for Fiberglass Co.", "Manufacturing", "international"),
  client("k10", "SAMA International Co.", "Trading & Contracting", "international"),
  client("k11", "PJR Group", "Business Group", "international"),
  client("k12", "Kuwait Swedish General Trading & Contracting Co.", "Trading & Contracting", "international"),
  client("k13", "Maccari", "Retail", "international"),
  client("k14", "Packaging & Plastic Industries Co. KSCC", "Manufacturing", "international"),
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    label: "Understand",
    title: "Share Your Requirements",
    text: "We schedule a meeting to understand your business, goals, requirements and expectations.",
  },
  {
    step: "02",
    label: "Plan",
    title: "Build the Right Plan",
    text: "We create a practical strategy based on your requirements and budget, focusing on the best possible quality and value.",
  },
  {
    step: "03",
    label: "Approve",
    title: "Review & Confirm",
    text: "Before starting the work, we present the proposed plan, scope and requirements for your review and approval.",
  },
  {
    step: "04",
    label: "Deliver",
    title: "Execute & Deliver",
    text: "We build, test, launch and hand over the finished work, then provide ongoing support to make sure everything runs smoothly.",
  },
];

export const defaultContent: CmsContent = { settings, founder, contact, process: processSteps, services, portfolio, clients };

export const portfolioCategories = ["All", "Web", "Marketing", "SEO", "Branding"] as const;

export const chatbotFaqs = [
  {
    keywords: ["service", "offer", "do you"],
    answer:
      "We offer Technical Services (websites, software, apps, hosting, UI/UX), Non-Technical Services (digital marketing, SEO, social media, branding, content) and Manpower & Business Support. Which one are you exploring?",
  },
  {
    keywords: ["price", "pricing", "cost", "budget", "quote"],
    answer:
      "We always work according to your budget. Share your requirements and we'll send a practical plan with a clear quote.",
  },
  {
    keywords: ["time", "timeline", "how long", "deadline"],
    answer: "A business website usually takes 1–3 weeks; larger apps and software depend on scope. We confirm timelines before starting.",
  },
  {
    keywords: ["contact", "email", "phone", "call", "reach"],
    answer: "You can reach us at drawvaxinfotech.off@gmail.com or +91 6374025393.",
  },
  {
    keywords: ["hours", "open", "timing", "available"],
    answer: "Our team is available Monday to Saturday, 9:30am – 6:30pm IST.",
  },
  {
    keywords: ["portfolio", "work", "case study", "example"],
    answer: "Have a look at our Portfolio and Clients pages — we've worked with 35+ businesses in India and Kuwait.",
  },
];
