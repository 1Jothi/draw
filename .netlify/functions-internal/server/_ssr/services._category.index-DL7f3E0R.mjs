import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useSiteContent } from "./site-content-BnJGl2Eq.mjs";
import { i as Stagger, n as Section } from "./Section-DQv6pgQf.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PageHeader } from "./PageHeader-YFSUVt8T.mjs";
import { t as Route } from "./services._category.index-kbgUvGuY.mjs";
import { n as HierarchyCard } from "./ServiceCard-BRKCC8gP.mjs";
import { n as NotFoundBlock, t as Breadcrumbs } from "./NotFoundBlock-DaL6mJ41.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services._category.index-DL7f3E0R.js
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { category: slug } = Route.useParams();
	const { content } = useSiteContent();
	const category = content.services.find((c) => c.slug === slug);
	if (!category) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFoundBlock, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Services",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "gradient-text",
			children: category.title
		}),
		subtitle: category.short
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{
		label: "Services",
		to: "/services"
	}, { label: category.title }] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
		className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
		children: category.subcategories.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HierarchyCard, {
			icon: category.icon,
			title: sub.title,
			text: sub.short,
			meta: `${sub.services.length} services`,
			link: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/services/$category/$sub",
				params: {
					category: category.slug,
					sub: sub.slug
				},
				className: "after:absolute after:inset-0",
				children: "View services"
			})
		}, sub.id))
	})] })] });
}
//#endregion
export { CategoryPage as component };
