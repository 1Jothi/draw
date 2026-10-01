import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PageHeader-YFSUVt8T.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ eyebrow, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "relative pt-36 pb-6 sm:pt-44",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-7xl px-5 text-center sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
					initial: {
						opacity: 0,
						y: 16
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .15 },
					className: "glass-soft inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gradient-accent size-1.5 rounded-full" }), eyebrow]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
					initial: {
						opacity: 0,
						y: 28,
						filter: "blur(8px)"
					},
					animate: {
						opacity: 1,
						y: 0,
						filter: "blur(0px)"
					},
					transition: {
						duration: .18,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "mx-auto mt-6 max-w-4xl font-display text-3xl leading-[1.08] font-bold text-balance break-words sm:text-5xl lg:text-6xl",
					children: title
				}),
				subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: {
						opacity: 0,
						y: 22
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .18,
						delay: .04
					},
					className: "mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
					children: subtitle
				}) : null
			]
		})
	});
}
//#endregion
export { PageHeader as t };
