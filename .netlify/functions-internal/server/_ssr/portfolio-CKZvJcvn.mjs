import { r as __toESM } from "../_runtime.mjs";
import { s as portfolioCategories } from "./api-Dw9fxolT.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as useSiteContent } from "./site-content-BnJGl2Eq.mjs";
import { s as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as Section } from "./Section-DQv6pgQf.mjs";
import { P as ArrowUpRight, t as X } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-YFSUVt8T.mjs";
import { t as TiltCard } from "./TiltCard-DROdxUGC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portfolio-CKZvJcvn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PortfolioCard({ item, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		type: "button",
		layout: true,
		onClick: () => onOpen(item),
		initial: {
			opacity: 0,
			y: 30,
			scale: .96
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		exit: {
			opacity: 0,
			scale: .94
		},
		transition: {
			duration: .5,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "text-left",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiltCard, {
			intensity: 7,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass group relative overflow-hidden rounded-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-[4/3] overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.image,
							alt: item.title,
							loading: "lazy",
							className: "size-full object-cover transition-transform duration-700 group-hover:scale-110"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent opacity-85" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "glass-soft absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] font-medium",
							children: item.category
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-semibold",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							item.client,
							" · ",
							item.year
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-accent grid size-9 shrink-0 place-items-center rounded-xl text-primary-foreground transition-transform duration-300 group-hover:rotate-45",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })
					})]
				})]
			})
		})
	});
}
function PortfolioPage() {
	const { content } = useSiteContent();
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [active, setActive] = (0, import_react.useState)(null);
	const publishedItems = content.portfolio.filter((item) => item.published !== false).sort((first, second) => (first.sortOrder ?? 0) - (second.sortOrder ?? 0));
	const items = filter === "All" ? publishedItems : publishedItems.filter((item) => item.category === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Portfolio",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Work we're ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "gradient-text",
				children: "proud to sign"
			})] }),
			subtitle: "A selection of recent engagements. Click any project to see the detail, the stack and the outcome."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap justify-center gap-2",
			children: portfolioCategories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
				type: "button",
				onClick: () => setFilter(category),
				whileHover: { scale: 1.05 },
				whileTap: { scale: .96 },
				className: filter === category ? "gradient-accent rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground" : "glass-soft rounded-xl px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground",
				children: category
			}, category))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			layout: true,
			className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "popLayout",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortfolioCard, {
					item,
					onOpen: setActive
				}, item.id))
			})
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "fixed inset-0 z-[100] grid place-items-center bg-background/80 p-4 backdrop-blur-md",
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			onClick: () => setActive(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 40,
					scale: .95
				},
				animate: {
					opacity: 1,
					y: 0,
					scale: 1
				},
				exit: {
					opacity: 0,
					y: 30,
					scale: .96
				},
				transition: {
					type: "spring",
					stiffness: 240,
					damping: 24
				},
				onClick: (event) => event.stopPropagation(),
				className: "glass max-h-[86vh] w-full max-w-3xl overflow-y-auto rounded-[2rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: active.image,
						alt: active.title,
						className: "aspect-[16/9] w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Close",
						onClick: () => setActive(null),
						className: "glass absolute top-4 right-4 grid size-10 place-items-center rounded-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "glass-soft rounded-full px-3 py-1 text-xs",
							children: active.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-2xl font-bold sm:text-3xl",
							children: active.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								active.client,
								" · ",
								active.year
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 leading-relaxed text-muted-foreground",
							children: active.description
						}),
						active.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: active.url,
							target: "_blank",
							rel: "noreferrer",
							className: "mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4",
							children: "Visit project"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 flex flex-wrap gap-2",
							children: active.tech.map((tech) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "glass-soft rounded-lg px-3 py-1.5 text-xs",
								children: tech
							}, tech))
						})
					]
				})]
			})
		}) : null })
	] });
}
//#endregion
export { PortfolioPage as component };
