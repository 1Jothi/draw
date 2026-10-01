import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as staggerChild } from "./Section-DQv6pgQf.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Briefcase, C as CodeXml, P as ArrowUpRight, a as Sparkles, c as Search, d as PenTool, m as Megaphone, n as Users, o as Smartphone } from "../_libs/lucide-react.mjs";
import { t as TiltCard } from "./TiltCard-DROdxUGC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ServiceCard-BRKCC8gP.js
var import_jsx_runtime = require_jsx_runtime();
var serviceIcons = {
	Code2: CodeXml,
	PenTool,
	Megaphone,
	Search,
	Smartphone,
	Sparkles,
	Users,
	Briefcase
};
/** Generic hierarchy card used for categories, sub-categories and services. */
function HierarchyCard({ icon = "Sparkles", title, text, meta, link, animatedIcon = false }) {
	const Icon = serviceIcons[icon] ?? Sparkles;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		variants: staggerChild,
		className: "min-w-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiltCard, {
			className: "h-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-shadow duration-500 hover:shadow-[0_0_60px_-20px_color-mix(in_oklab,var(--primary)_75%,transparent)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "absolute -top-16 -right-16 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60",
						style: { background: "var(--gradient-accent)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						...animatedIcon ? {
							animate: {
								y: [
									0,
									-6,
									0
								],
								rotate: [
									0,
									6,
									0
								]
							},
							transition: {
								duration: 3.2,
								repeat: Infinity,
								ease: "easeInOut"
							}
						} : {},
						className: "gradient-accent grid size-12 place-items-center rounded-2xl text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 text-xl font-semibold",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 flex-1 text-sm leading-relaxed text-muted-foreground",
						children: text
					}),
					meta ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: meta
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold gradient-text",
						children: [
							link,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-primary" })
						]
					})
				]
			})
		})
	});
}
function CategoryLink({ slug, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/services/$category",
		params: { category: slug },
		className: "after:absolute after:inset-0",
		children
	});
}
//#endregion
export { HierarchyCard as n, CategoryLink as t };
