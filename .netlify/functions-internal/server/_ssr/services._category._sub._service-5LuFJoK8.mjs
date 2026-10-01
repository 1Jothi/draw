import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useSiteContent } from "./site-content-BnJGl2Eq.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as Section } from "./Section-DQv6pgQf.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ArrowRight, O as Check } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-YFSUVt8T.mjs";
import { t as Route } from "./services._category._sub._service-B8fULkiV.mjs";
import { n as NotFoundBlock, t as Breadcrumbs } from "./NotFoundBlock-DaL6mJ41.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services._category._sub._service-5LuFJoK8.js
var import_jsx_runtime = require_jsx_runtime();
var isVideo = (url) => /\.(mp4|webm|mov)(\?|$)/i.test(url);
function ServiceDetail() {
	const params = Route.useParams();
	const { content } = useSiteContent();
	const category = content.services.find((c) => c.slug === params.category);
	const sub = category?.subcategories.find((s) => s.slug === params.sub);
	const service = sub?.services.find((s) => s.slug === params.service);
	if (!category || !sub || !service) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFoundBlock, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: sub.title,
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "gradient-text",
			children: service.title
		}),
		subtitle: service.short
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
		{
			label: sub.title,
			to: "/services/$category/$sub",
			params: {
				category: category.slug,
				sub: sub.slug
			}
		},
		{ label: service.title }
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 24
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { duration: .5 },
			className: "glass min-w-0 rounded-3xl p-6 sm:p-8",
			children: [
				service.media ? isVideo(service.media) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: service.media,
					controls: true,
					preload: "none",
					playsInline: true,
					className: "mb-6 aspect-video w-full rounded-2xl object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: service.media,
					alt: service.title,
					loading: "lazy",
					decoding: "async",
					className: "mb-6 aspect-video w-full rounded-2xl object-cover"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold",
					children: "Overview"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 leading-relaxed text-muted-foreground",
					children: service.description
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 24
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				duration: .5,
				delay: .1
			},
			className: "glass min-w-0 rounded-3xl p-6 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-bold",
					children: "What's included"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: service.features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-primary" }),
							" ",
							feature
						]
					}, feature))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/contact",
					className: "gradient-accent mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-primary-foreground",
					children: ["Discuss this service ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})
			]
		})]
	})] })] });
}
//#endregion
export { ServiceDetail as component };
