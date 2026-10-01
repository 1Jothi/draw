import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useSiteContent } from "./site-content-BnJGl2Eq.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as staggerChild, i as Stagger, n as Section } from "./Section-DQv6pgQf.mjs";
import { t as PageHeader } from "./PageHeader-YFSUVt8T.mjs";
import { n as Testimonials, t as ReviewCard } from "./Testimonials-COYSM-Ip.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reviews-Doayg8lY.js
var import_jsx_runtime = require_jsx_runtime();
function ReviewsPage() {
	const { reviews } = useSiteContent();
	const approved = reviews.filter((review) => review.status === "approved");
	const average = approved.length ? (approved.reduce((sum, review) => sum + review.rating, 0) / approved.length).toFixed(1) : "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Reviews",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Rated ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "gradient-text",
					children: [average, "/5"]
				}),
				" by our clients"
			] }),
			subtitle: "Every review below comes from a real engagement. New reviews are published after a quick verification."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
			className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
			children: approved.map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				variants: staggerChild,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewCard, { review })
			}, review.id))
		}) })
	] });
}
//#endregion
export { ReviewsPage as component };
