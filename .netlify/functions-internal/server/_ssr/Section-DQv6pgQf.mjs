import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Section-DQv6pgQf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = import_react.useState(void 0);
	import_react.useEffect(() => {
		const mql = window.matchMedia(`(max-width: 767px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
var offsets = {
	up: { y: 40 },
	down: { y: -40 },
	left: { x: -48 },
	right: { x: 48 },
	scale: { scale: .94 }
};
/** Scroll-triggered entrance. Animation distance is reduced on mobile. */
function Reveal({ children, direction = "up", delay = 0, className, once = true }) {
	const isMobile = useIsMobile();
	const base = offsets[direction];
	const scaled = isMobile ? {
		x: (base.x ?? 0) / 2.5,
		y: (base.y ?? 0) / 2.5,
		scale: base.scale ?? 1
	} : {
		x: base.x ?? 0,
		y: base.y ?? 0,
		scale: base.scale ?? 1
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className,
		initial: {
			opacity: 0,
			...scaled
		},
		whileInView: {
			opacity: 1,
			x: 0,
			y: 0,
			scale: 1
		},
		viewport: {
			once,
			margin: "-80px"
		},
		transition: {
			duration: isMobile ? .45 : .7,
			delay,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		children
	});
}
var staggerParent = {
	hidden: {},
	show: { transition: {
		staggerChildren: .03,
		delayChildren: 0
	} }
};
var staggerChild = {
	hidden: {
		opacity: 0,
		y: 12
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .2,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	}
};
/** Staggered container — children should use `staggerChild`. */
function Stagger({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: cn(className),
		variants: staggerParent,
		initial: "hidden",
		whileInView: "show",
		viewport: {
			once: true,
			margin: "-70px"
		},
		children
	});
}
function Section({ id, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		className: cn("section-pad relative", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto w-full max-w-7xl px-5 sm:px-8",
			children
		})
	});
}
function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left"),
		children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				direction: "up",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "glass-soft inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gradient-accent size-1.5 rounded-full" }), eyebrow]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				direction: "up",
				delay: .08,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-5 text-3xl leading-[1.1] font-bold text-balance sm:text-4xl md:text-5xl",
					children: title
				})
			}),
			subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				direction: "up",
				delay: .16,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-base leading-relaxed text-muted-foreground md:text-lg",
					children: subtitle
				})
			}) : null
		]
	});
}
//#endregion
export { staggerChild as a, Stagger as i, Section as n, useIsMobile as o, SectionHeading as r, Reveal as t };
