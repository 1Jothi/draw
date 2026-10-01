import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services._category._sub._service-B8fULkiV.js
var $$splitComponentImporter = () => import("./services._category._sub._service-5LuFJoK8.mjs");
var Route = createFileRoute("/services/$category/$sub/$service")({
	head: () => ({ meta: [
		{ title: "Service Details | Drawvax Infotech" },
		{
			name: "description",
			content: "What's included, how we work and how to get started with Drawvax Infotech."
		},
		{
			property: "og:title",
			content: "Service Details | Drawvax Infotech"
		},
		{
			property: "og:description",
			content: "What's included and how to get started."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
