import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useSiteContent } from "./site-content-BnJGl2Eq.mjs";
import { i as Stagger, n as Section } from "./Section-DQv6pgQf.mjs";
import { t as PageHeader } from "./PageHeader-YFSUVt8T.mjs";
import { t as NewsCard } from "./NewsCard-CAidHQ3N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news-D0LWi4de.js
var import_jsx_runtime = require_jsx_runtime();
function NewsPage() {
	const { news, loading } = useSiteContent();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "News & Updates",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["What's happening at ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "gradient-text",
			children: "Drawvax"
		})] }),
		subtitle: "Launches, new services and team milestones. The most recent entry also powers the update popup in the header."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
		className: "grid gap-6 md:grid-cols-2",
		children: news.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsCard, { post }, post.id))
	}), !loading && news.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "glass-soft mx-auto max-w-lg rounded-2xl px-5 py-8 text-center text-sm text-muted-foreground",
		children: "No updates yet — check back soon."
	}) : null] })] });
}
//#endregion
export { NewsPage as component };
