import { n as SLOGAN, t as POWER_TAGLINE } from "./api-Dw9fxolT.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useSiteContent } from "./site-content-BnJGl2Eq.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { i as Stagger, n as Section, r as SectionHeading } from "./Section-DQv6pgQf.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ArrowRight, a as Sparkles } from "../_libs/lucide-react.mjs";
import { n as FounderSection, t as AboutSection } from "./FounderSection-jGz1Zzv9.mjs";
import { t as NewsCard } from "./NewsCard-CAidHQ3N.mjs";
import { n as Testimonials } from "./Testimonials-COYSM-Ip.mjs";
import { n as HierarchyCard, t as CategoryLink } from "./ServiceCard-BRKCC8gP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DgK76JR6.js
var import_jsx_runtime = require_jsx_runtime();
function Hero() {
	const { content } = useSiteContent();
	const { settings } = content;
	const words = settings.heroHeadline.split(" ").filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-7xl px-5 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
					initial: {
						opacity: 0,
						y: 18
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .6 },
					className: "glass-soft inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-primary" }), settings.heroEyebrow]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-7 max-w-4xl font-display text-[2.2rem] sm:text-5xl leading-[1.05] font-bold tracking-tight md:text-6xl lg:text-7xl",
					children: words.map((word, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						initial: {
							opacity: 0,
							y: 34,
							filter: "blur(8px)"
						},
						animate: {
							opacity: 1,
							y: 0,
							filter: "blur(0px)"
						},
						transition: {
							delay: .15 + index * .09,
							duration: .7,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "mr-[0.28em] inline-block",
						children: index >= words.length - 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "gradient-text",
							children: word
						}) : word
					}, `${word}-${index}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: {
						opacity: 0,
						scale: .94,
						y: 20
					},
					animate: {
						opacity: 1,
						scale: 1,
						y: 0
					},
					transition: {
						delay: .95,
						duration: .8,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "mt-7 font-display text-2xl font-semibold sm:text-3xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-text",
						children: SLOGAN
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						delay: 1.15,
						duration: .7
					},
					className: "mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
					children: settings.heroSubheading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						scale: .9
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: {
						delay: 1.35,
						type: "spring",
						stiffness: 220,
						damping: 18
					},
					className: "mt-9 flex flex-wrap items-center gap-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						whileHover: { scale: 1.05 },
						whileTap: { scale: .96 },
						children: settings.heroButtonLink.startsWith("https://") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: settings.heroButtonLink,
							target: "_blank",
							rel: "noreferrer",
							className: "gradient-accent glow-ring inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-primary-foreground",
							children: [
								settings.heroButtonText,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: settings.heroButtonLink,
							className: "gradient-accent glow-ring inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-primary-foreground",
							children: [
								settings.heroButtonText,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
							]
						})
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			"aria-hidden": true,
			className: "absolute bottom-8 left-1/2 hidden h-12 w-6 -translate-x-1/2 rounded-full border border-border md:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				className: "mx-auto mt-2 block size-1.5 rounded-full bg-primary",
				animate: {
					y: [
						0,
						18,
						0
					],
					opacity: [
						1,
						.3,
						1
					]
				},
				transition: {
					duration: 1.8,
					repeat: Infinity
				}
			})
		})]
	});
}
function Home() {
	const { content, news, loading } = useSiteContent();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutSection, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FounderSection, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			id: "services",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "What we do",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Services built to make you ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "gradient-text",
					children: "unmissable"
				})] }),
				subtitle: "Technical services, marketing & creative, and manpower support — all under one roof."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
				className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: content.services.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HierarchyCard, {
					icon: category.icon,
					title: category.title,
					text: category.short,
					meta: `${category.subcategories.length} sub-categories`,
					animatedIcon: true,
					link: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryLink, {
						slug: category.slug,
						children: "Explore"
					})
				}, category.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			id: "news",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "News & Updates",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Latest from the ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-text",
						children: "studio"
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
					className: "mt-12 grid gap-5 md:grid-cols-2",
					children: news.slice(0, 2).map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsCard, { post }, post.id))
				}),
				!loading && news.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "glass-soft mx-auto mt-6 max-w-lg rounded-2xl px-5 py-6 text-center text-sm text-muted-foreground",
					children: "Fresh updates from the studio are coming soon."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/news",
						className: "glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold",
						children: ["All updates ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-primary" })]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95
			},
			whileInView: {
				opacity: 1,
				scale: 1
			},
			viewport: { once: true },
			transition: {
				duration: .7,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			className: "glass relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute inset-0 opacity-25",
				style: { background: "var(--gradient-accent)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold text-balance sm:text-5xl",
						children: content.settings.ctaHeadline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-xl text-muted-foreground",
						children: content.settings.ctaText
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-5 max-w-xl font-display text-base font-semibold sm:text-lg",
						children: POWER_TAGLINE
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						whileHover: { scale: 1.05 },
						className: "mt-8 inline-block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "gradient-accent glow-ring inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold text-primary-foreground",
							children: ["Get a Free Quote ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-display text-lg font-semibold gradient-text sm:text-xl",
						children: SLOGAN
					})
				]
			})]
		}) })
	] });
}
//#endregion
export { Home as component };
