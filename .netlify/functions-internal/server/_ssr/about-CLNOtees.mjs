import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as FounderSection, t as AboutSection } from "./FounderSection-jGz1Zzv9.mjs";
import { t as PageHeader } from "./PageHeader-YFSUVt8T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-CLNOtees.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "About us",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["We build with care, and we ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "gradient-text",
				children: "finish what we start"
			})] }),
			subtitle: "Drawvax Infotech is a team of engineers, designers and marketers who believe great software is equal parts craft and accountability."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutSection, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FounderSection, {})
	] });
}
//#endregion
export { AboutPage as component };
