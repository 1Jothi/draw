import { r as __toESM } from "../_runtime.mjs";
import { r as api } from "./api-Dw9fxolT.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { g as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Cy8qdYMa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UserLoginPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("sign-in");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const submit = async (event) => {
		event.preventDefault();
		setSubmitting(true);
		try {
			if (mode === "sign-up") {
				const result = await api.signUp(email, password);
				toast.success(result.needsConfirmation ? "Check your email to confirm your account." : "Account created.");
				if (!result.needsConfirmation) await navigate({ to: "/" });
			} else {
				await api.signIn(email, password);
				const isAdmin = await api.checkAdmin();
				toast.success(isAdmin ? "Signed in to the admin dashboard." : "Signed in.");
				await navigate({ to: isAdmin ? "/admin" : "/" });
			}
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Authentication failed.");
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[100svh] items-center justify-center px-4 pt-28 pb-16 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
			onSubmit: (event) => void submit(event),
			initial: {
				opacity: 0,
				y: 16
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { duration: .2 },
			className: "glass w-full max-w-md rounded-2xl p-5 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-bold",
					children: mode === "sign-in" ? "Sign in" : "Create account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Administrator accounts open the dashboard after sign in."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								value: email,
								onChange: (event) => setEmail(event.target.value),
								autoComplete: "email",
								required: true,
								className: "mt-1.5 w-full rounded-lg bg-input/60 px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: password,
								onChange: (event) => setPassword(event.target.value),
								autoComplete: mode === "sign-in" ? "current-password" : "new-password",
								minLength: 8,
								required: true,
								className: "mt-1.5 w-full rounded-lg bg-input/60 px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: submitting,
							className: "gradient-accent w-full rounded-lg py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60",
							children: submitting ? "Please wait…" : mode === "sign-in" ? "Sign in" : "Create account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMode(mode === "sign-in" ? "sign-up" : "sign-in"),
					className: "mt-4 min-h-11 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground",
					children: mode === "sign-in" ? "Create a user account" : "Already have an account? Sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 border-t border-border pt-4 text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/login",
						className: "text-primary hover:underline",
						children: "Administrator sign in"
					})
				})
			]
		})
	});
}
//#endregion
export { UserLoginPage as component };
