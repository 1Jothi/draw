import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as useMotionValue, i as useTransform, r as useSpring } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { o as useIsMobile } from "./Section-DQv6pgQf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TiltCard-DROdxUGC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Subtle 3D tilt that follows the pointer. Disabled on touch/mobile. */
function TiltCard({ children, className, intensity = 9 }) {
	const ref = (0, import_react.useRef)(null);
	const isMobile = useIsMobile();
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, {
		stiffness: 180,
		damping: 18
	});
	const sy = useSpring(y, {
		stiffness: 180,
		damping: 18
	});
	const rotateX = useTransform(sy, [-.5, .5], [intensity, -intensity]);
	const rotateY = useTransform(sx, [-.5, .5], [-intensity, intensity]);
	if (isMobile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(className),
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		className: cn("[transform-style:preserve-3d]", className),
		style: {
			rotateX,
			rotateY,
			perspective: 900
		},
		onPointerMove: (event) => {
			const rect = ref.current?.getBoundingClientRect();
			if (!rect) return;
			x.set((event.clientX - rect.left) / rect.width - .5);
			y.set((event.clientY - rect.top) / rect.height - .5);
		},
		onPointerLeave: () => {
			x.set(0);
			y.set(0);
		},
		whileHover: { y: -6 },
		transition: {
			type: "spring",
			stiffness: 220,
			damping: 20
		},
		children
	});
}
//#endregion
export { TiltCard as t };
