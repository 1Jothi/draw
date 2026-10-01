import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services._category._sub.index-Dn22Jlc_.js
var $$splitComponentImporter = () => import("./services._category._sub.index-rphLktnu.mjs");
var Route = createFileRoute("/services/$category/$sub/")({
	head: () => ({ meta: [
		{ title: "Services List | Drawvax Infotech" },
		{
			name: "description",
			content: "Individual services offered by Drawvax Infotech in this area."
		},
		{
			property: "og:title",
			content: "Services List | Drawvax Infotech"
		},
		{
			property: "og:description",
			content: "Individual services offered by Drawvax Infotech."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
