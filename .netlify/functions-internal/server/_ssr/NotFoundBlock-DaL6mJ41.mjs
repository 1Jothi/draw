import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as ChevronRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/NotFoundBlock-DaL6mJ41.js
var import_jsx_runtime = require_jsx_runtime();
function Breadcrumbs({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Breadcrumb",
		className: "mb-8 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground sm:text-sm",
		children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex min-w-0 items-center gap-1.5",
			children: [index > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5 shrink-0" }) : null, item.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: item.to,
				params: item.params,
				className: "truncate hover:text-foreground",
				children: item.label
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate text-foreground",
				children: item.label
			})]
		}, `${item.label}-${index}`))
	});
}
function NotFoundBlock() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-5 pt-40 pb-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold",
				children: "Service not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "It may have been renamed or removed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/services",
				className: "gradient-accent mt-6 inline-flex rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground",
				children: "Back to services"
			})
		]
	});
}
//#endregion
export { NotFoundBlock as n, Breadcrumbs as t };
