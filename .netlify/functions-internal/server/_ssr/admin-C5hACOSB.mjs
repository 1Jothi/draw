import { r as __toESM } from "../_runtime.mjs";
import { r as api } from "./api-Dw9fxolT.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { r as useSiteContent } from "./site-content-BnJGl2Eq.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { m as createFileRoute, p as lazyRouteComponent, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as Lock } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-C5hACOSB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./admin-B3FXzqOb.mjs");
var Route = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "Admin Panel | Drawvax Infotech" },
		{
			name: "description",
			content: "Internal content management for the Drawvax Infotech website."
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: "Admin Panel | Drawvax Infotech"
		},
		{
			property: "og:description",
			content: "Internal content management."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
function AdminLogin() {
	const store = useSiteContent();
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (store.isAdmin) navigate({ to: "/admin" });
	}, [navigate, store.isAdmin]);
	const submit = async (event) => {
		event.preventDefault();
		setSubmitting(true);
		try {
			await api.signIn(email, password);
			if (!await api.checkAdmin()) {
				await api.signOut();
				toast.error("This account does not have admin access.");
				return;
			}
			toast.success("Welcome back.");
			await navigate({ to: "/admin" });
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Login failed.");
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[100svh] items-center justify-center px-5 pt-28 pb-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
			onSubmit: (event) => void submit(event),
			initial: {
				opacity: 0,
				y: 30,
				scale: .96
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			transition: {
				duration: .6,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			className: "glass w-full max-w-md rounded-3xl p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "gradient-accent grid size-12 place-items-center rounded-2xl text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 font-display text-2xl font-bold",
					children: "Admin sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Sign in with an administrator account provisioned for this site."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: email,
							onChange: (event) => setEmail(event.target.value),
							placeholder: "Email",
							autoComplete: "username",
							required: true,
							className: "w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							value: password,
							onChange: (event) => setPassword(event.target.value),
							placeholder: "Password",
							autoComplete: "current-password",
							required: true,
							className: "w-full rounded-xl bg-input/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
							whileHover: { scale: 1.02 },
							whileTap: { scale: .98 },
							type: "submit",
							disabled: submitting,
							className: "gradient-accent w-full rounded-xl py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-60",
							children: submitting ? "Signing in…" : "Sign in"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { Route as n, AdminLogin as t };
