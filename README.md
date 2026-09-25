# Drawvax Showcase

Build a unique, highly professional, animation-rich portfolio/agency website for "Drawvax Infotech" — a front-end development & digital services company. The site must feel premium, cinematic, and immersive from the very first second — like entering an "animation world" — while still looking clean, trustworthy, and professional (not gimmicky). Use React + Tailwind CSS + Framer Motion for animations.

IMPORTANT SCOPE NOTE: Build this as a FRONT-END ONLY project for now. Do NOT auto-connect or assume any specific backend/database technology. Structure all dynamic data (services, portfolio items, clients, reviews, news posts, contact form, admin content) using clean placeholder/mock data and a clearly separated data/API layer, so a backend developer can later plug in any backend of their choice (Node.js, Supabase, Firebase, Django, etc.) without rewriting the front end. Add clear comments like "// TODO: connect to backend" wherever real data submission (reviews, contact form, admin edits, chatbot leads) would normally hit an API.

=== MANDATORY SLOGAN RULE ===

- The company slogan MUST always include the exact phrase "Client Satisfaction" as its core message. You may build around it, but never replace or drop it.

- Example directions (pick or adapt one, keep it professional):

  "Client Satisfaction is Our Signature" / "Driven by Client Satisfaction" / "Where Client Satisfaction Meets Innovation" / "Client Satisfaction, Delivered Every Time."

- This slogan must appear in: the navbar (next to logo), the hero section (large, animated reveal), and the footer.

=== GLOBAL FEEL ===

- Dark, modern, professional theme with a signature accent gradient (electric blue/purple) and glassmorphism cards — polished, not childish or cluttered.

- Custom animated cursor visible on every page: a soft glowing dot with a trailing ring that morphs/enlarges when hovering buttons, links, or cards.

- Smooth animated page transitions between every route (fade + slide, ~0.5s) using Framer Motion's AnimatePresence — every page-to-page click should feel cinematic.

- Floating "scroll to top" arrow, bottom-right, appears after scrolling, animates in with a bounce/hover glow.

- 3D tilt-on-hover effect for cards (services, clients, portfolio) that follow mouse position subtly.

- Scroll-triggered animations everywhere: fade-up, stagger-in, slide-in-from-side for every section as the user scrolls — the entire site should feel alive and in motion, not static.

- On first load, hero elements should animate in sequence (headline typing/reveal, slogan fade-in, buttons pop-in) to immediately amaze the visitor.

- Fully responsive across mobile, tablet, and desktop, with animations gracefully scaled down (lighter) on mobile for performance.

=== HEADER / NAVBAR ===

- Sticky, semi-transparent navbar with Drawvax Infotech logo + the mandatory slogan.

- Nav links: Home, About, Services, Portfolio, Reviews, News, Contact — each with animated underline/hover effect.

- Top-right corner: a "News/Updates" bell icon with a small animated popup/toast showing the latest company update a few seconds after page load. Visitor can dismiss it (X); it won't reappear that session.

- Mobile hamburger menu with smooth slide-in animation.

=== HERO SECTION ===

- Full-screen hero with animated headline (typing or word-reveal animation), the mandatory slogan displayed prominently with its own entrance animation, and a short professional subheading about Drawvax Infotech's expertise.

- Animated background: slowly moving gradient blobs, particles, or subtle 3D floating shapes — professional, not distracting.

- Two CTA buttons: "View Our Work" and "Get a Free Quote", each with hover scale/glow animation.

=== ABOUT SECTION ===

- Professional company story for Drawvax Infotech with animated counters (years of experience, projects completed, happy clients, team size) that count up when scrolled into view.

- Infinite auto-scrolling client logo marquee, with logos zooming/glowing slightly on hover.

- Brief "Our Process" mini-timeline with animated step reveals (Discover → Design → Develop → Deliver).

=== FOUNDER SECTION ===

- A dedicated "Meet the Founder" sub-section within About (or its own section right after About).

- Founder name: Santhosh — Founder & CEO of Drawvax Infotech.

- Large professional founder photo (placeholder headshot) with a subtle floating/parallax animation and a soft glowing border/gradient ring on hover.

- Short founder bio/message (2-3 sentences) about his vision for the company and commitment to client satisfaction — write it in a confident, professional tone.

- Include his title, a short quote (e.g. "Client satisfaction isn't a goal, it's our standard." — attributed to Santhosh), and social/contact icons (LinkedIn, email) with hover animation.

- Animate the whole founder card in with a fade-up + scale effect on scroll.

- Make this section editable from the Admin Panel (photo, name, title, bio, quote).

=== SERVICES SECTION ===

- Grid of service cards (Web Development, Digital Marketing, SEO, UI/UX Design, App Development, etc.).

- Each card includes a short looping GIF/animation or icon representing the service, a concise description, and a "Learn More" link to a dedicated service detail page.

- Cards lift with 3D tilt + glow on hover.

- Each service detail page includes an embedded video/GIF walkthrough, a feature/benefits list, and a "Related Work" section pulling from the portfolio, all animated in on scroll.

=== PORTFOLIO / WORK SHOWCASE ===

- Masonry or grid gallery of completed projects as photo thumbnails or video previews (hover to autoplay a short clip).

- Clicking a project opens a detail modal/page with more images, a video walkthrough, description, technologies used, and client name — all animated smoothly.

- Filter tabs (All / Web / Marketing / SEO / Branding) with animated filter transitions.

=== CLIENT LIST SECTION ===

- Dedicated section/page listing clients: photo/logo, company name, industry, short details.

- Staggered fade-in animation on scroll, plus a hover flip-card effect revealing more collaboration details.

=== TESTIMONIALS / PUBLIC REVIEWS ===

- Auto-sliding testimonial carousel (star rating, photo, name, company, comment) with smooth slide animation.

- "Leave a Review" form for visitors (name, star rating selector, comment) with an animated success confirmation.

- New reviews appear in local/mock state marked "pending" (TODO comment for backend integration); approved reviews display publicly with entrance animation.

=== NEWS / UPDATES SECTION ===

- Feed-style page/section for company updates, new projects, new services, announcements — each entry with date, title, short text, optional image/video, animated in as a timeline or card feed.

- Powers the top-right notification popup by pulling the latest entry.

=== AI CHATBOT ===

- Floating chat bubble, bottom-right, visible on every page, with a subtle pulse/glow animation to draw attention.

- Opens into a chat widget answering FAQs (services, pricing ranges, contact info, business hours) and collecting name/email/message for follow-up (mock submission, TODO for backend).

- Friendly animated welcome message auto-appears a few seconds after first visit.

=== CONTACT SECTION ===

- Contact form (name, email, phone, message) with animated success confirmation (mock submission, TODO for backend).

- Drawvax Infotech contact details (address, phone, email, social icons with hover animation) — editable from admin.

- Optional embedded map.

=== FOOTER ===

- Logo + the mandatory slogan, quick links, services list, social icons, contact info, newsletter signup, and "© 2026 Drawvax Infotech. All rights reserved."

- Subtle animated gradient line or particle background.

=== ADMIN PANEL (front-end only, mock auth for now) ===

- Admin login screen (UI only; TODO comment for real backend auth).

- Admin can, in local/mock state:

  - Edit homepage slogan (must always retain "Client Satisfaction"), hero text, and about content

  - Edit founder section (Santhosh's photo, name, title, bio, quote)

  - Add/edit/delete services (title, description, icon, image/GIF/video)

  - Add/edit/delete portfolio items (photos, videos, description, tags)

  - Add/edit/delete client list entries (photo, name, details)

  - Approve/reject/delete public reviews, or manually add reviews

  - Post/edit/delete news & update items (feeds news section + top-right popup)

  - Edit contact details (address, phone, email, social links)

  - View basic form submissions/chatbot leads (mock data for now)

- Regular visitors only get public access (browsing, submitting reviews, contact form, chatbot) — no edit rights.

- Clearly comment in code where each admin action would connect to a real backend later.

=== TECH & QUALITY NOTES ===

- Use professional, high-quality placeholder images/stock photos and realistic sample data so the site looks fully complete and polished on first generation — nothing should look empty or "template-ish."

- Keep all data in a clean, modular data/content layer so a real backend is a simple future swap.

- Animations should feel premium and purposeful — smooth easing, no jank, no overuse that hurts readability or professionalism.

- Structure code into reusable components (Navbar, Hero, AboutSection, FounderSection, ServiceCard, PortfolioCard, ClientCard, ReviewCard, NewsCard, Chatbot, Footer, AdminDashboard).

- Prioritize fast load performance despite the heavy animation — lazy-load videos/images, optimize animation performance for mobile.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://drawvax-effect.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4a7226c3-7bb6-4094-a377-881f195311fc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
