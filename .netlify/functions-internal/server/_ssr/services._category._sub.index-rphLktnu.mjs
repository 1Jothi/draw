import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useSiteContent } from "./site-content-BnJGl2Eq.mjs";
import { i as Stagger, n as Section } from "./Section-DQv6pgQf.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PageHeader } from "./PageHeader-YFSUVt8T.mjs";
import { t as Route } from "./services._category._sub.index-Dn22Jlc_.mjs";
import { n as HierarchyCard } from "./ServiceCard-BRKCC8gP.mjs";
import { n as NotFoundBlock, t as Breadcrumbs } from "./NotFoundBlock-DaL6mJ41.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services._category._sub.index-rphLktnu.js
var import_jsx_runtime = require_jsx_runtime();
function SubCategoryPage() {
	const { category: cSlug, sub: sSlug } = Route.useParams();
	const { content } = useSiteContent();
	const category = content.services.find((c) => c.slug === cSlug);
	const sub = category?.subcategories.find((s) => s.slug === sSlug);
	if (!category || !sub) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFoundBlock, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: category.title,
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "gradient-text",
			children: sub.title
		}),
		subtitle: sub.short
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [
		{
			label: "Services",
			to: "/services"
		},
		{
			label: category.title,
			to: "/services/$category",
			params: { category: category.slug }
		},
		{ label: sub.title }
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
		className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
		children: sub.services.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HierarchyCard, {
			icon: category.icon,
			title: service.title,
			text: service.short,
			link: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/services/$category/$sub/$service",
				params: {
					category: category.slug,
					sub: sub.slug,
					service: service.slug
				},
				className: "after:absolute after:inset-0",
				children: "Details"
			})
		}, service.id))
	})] })] });
}
//#endregion
export { SubCategoryPage as component };
