import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useSiteContent } from "./site-content-BnJGl2Eq.mjs";
import { i as Stagger, n as Section } from "./Section-DQv6pgQf.mjs";
import { t as PageHeader } from "./PageHeader-YFSUVt8T.mjs";
import { n as HierarchyCard, t as CategoryLink } from "./ServiceCard-BRKCC8gP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services.index-D4kGR2t1.js
var import_jsx_runtime = require_jsx_runtime();
function ServicesIndex() {
	const { content } = useSiteContent();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Services",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Everything your business needs to ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "gradient-text",
			children: "grow"
		})] }),
		subtitle: "Choose a category to explore its sub-categories and individual services."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
		className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
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
	}) })] });
}
//#endregion
export { ServicesIndex as component };
