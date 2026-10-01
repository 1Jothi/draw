import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as staggerChild } from "./Section-DQv6pgQf.mjs";
import { k as CalendarDays } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/NewsCard-CAidHQ3N.js
var import_jsx_runtime = require_jsx_runtime();
function NewsCard({ post }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
		variants: staggerChild,
		className: "glass overflow-hidden rounded-3xl",
		children: [post.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "aspect-[16/7] overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: post.image,
				alt: post.title,
				loading: "lazy",
				className: "size-full object-cover transition-transform duration-700 hover:scale-105"
			})
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "glass-soft rounded-full px-3 py-1 font-medium text-foreground",
						children: post.category
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3.5" }), new Date(post.publishedAt).toLocaleDateString("en-GB", {
							day: "numeric",
							month: "long",
							year: "numeric"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 text-xl font-semibold",
					children: post.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted-foreground",
					children: post.excerpt
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted-foreground/80",
					children: post.body
				})
			]
		})]
	});
}
//#endregion
export { NewsCard as t };
