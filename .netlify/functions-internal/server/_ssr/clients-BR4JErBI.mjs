import { r as __toESM } from "../_runtime.mjs";
import { o as getClientLogoUrl } from "./api-Dw9fxolT.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as useSiteContent } from "./site-content-BnJGl2Eq.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as staggerChild, i as Stagger, n as Section } from "./Section-DQv6pgQf.mjs";
import { t as PageHeader } from "./PageHeader-YFSUVt8T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clients-BR4JErBI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Flip card — hover (or tap on mobile) reveals collaboration details. */
function ClientCard({ client }) {
	const logoUrl = getClientLogoUrl(client.logo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		variants: staggerChild,
		className: "group h-64 [perspective:1200px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative size-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl p-6 text-center [backface-visibility:hidden]",
				children: [
					logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block h-20 w-32 overflow-hidden rounded-2xl bg-foreground p-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logoUrl,
							alt: `${client.name} logo`,
							loading: "lazy",
							decoding: "async",
							className: "block h-full w-full object-contain"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-accent grid size-16 place-items-center rounded-2xl font-display text-lg font-bold text-primary-foreground",
						children: client.name.slice(0, 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-semibold",
						children: client.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.18em] text-muted-foreground uppercase",
						children: client.industry
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: client.details
					}),
					client.website ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: client.website,
						target: "_blank",
						rel: "noreferrer",
						className: "min-h-10 text-sm text-primary underline underline-offset-4",
						children: "Visit website"
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass absolute inset-0 flex flex-col justify-center gap-3 rounded-3xl p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-[0.18em] gradient-text uppercase",
						children: "Collaboration"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: client.collaboration
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: ["Partner since ", client.since]
					})
				]
			})]
		})
	});
}
function ClientsPage() {
	const { content } = useSiteContent();
	const [region, setRegion] = (0, import_react.useState)("all");
	const clients = content.clients.filter((client) => client.enabled !== false && (region === "all" || client.region === region)).sort((first, second) => (first.sortOrder ?? 0) - (second.sortOrder ?? 0));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Clients",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Partnerships that ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "gradient-text",
			children: "keep renewing"
		})] }),
		subtitle: "Hover any card to see how we work together. Most of our clients have been with us for more than two years."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-6 flex flex-wrap justify-center gap-2",
		role: "group",
		"aria-label": "Filter clients by region",
		children: [
			"all",
			"domestic",
			"international"
		].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setRegion(value),
			"aria-pressed": region === value,
			className: region === value ? "gradient-accent min-h-11 rounded-xl px-4 text-sm font-semibold text-primary-foreground" : "glass-soft min-h-11 rounded-xl px-4 text-sm text-muted-foreground",
			children: value === "all" ? "All clients" : value === "domestic" ? "India" : "International"
		}, value))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
		className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
		children: clients.map((client) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientCard, { client }, client.id))
	})] })] });
}
//#endregion
export { ClientsPage as component };
